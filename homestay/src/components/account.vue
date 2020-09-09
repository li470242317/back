<template>
    <!--<div>这是账号表</div>-->
  <div><!--
    <h1>员工管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-button type="primary" round @click="showDialog2()">添加</el-button>
    <el-table :data="acc.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="acc_id" label="编号"></el-table-column>
      <el-table-column prop="acc_name" label="账号"></el-table-column>
      <el-table-column prop="acc_pwd" label="密码"></el-table-column>
      <el-table-column prop="acc_state" label="状态">
        <template slot-scope="scope">
          {{scope.row.acc_state==1?'可用':'不可用'}}
        </template>
      </el-table-column>
      <el-table-column prop="emp_name" label="员工名称"></el-table-column>
      <el-table-column label="操作" fixed="right" width="300px">
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" icon="el-icon-edit"  @click="showDialog(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"  @click="updateAccountPwd(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    <!--添加模态框-->
    <el-dialog width="40%" title="添加账号" :visible="addVisible">
      <el-form label-width="100px" label-suffix="：" :model="account" class="form"  ref="fm" :rules="rules">
        <el-form-item label="账号" prop="acc_name">
          <el-input v-model="account.acc_name" name="acc_name" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="acc_pwd">
          <el-input v-model="account.acc_pwd" name="acc_pwd" type="123456"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="acc_state">
          <!--<el-input v-model="account.acc_state" name="acc_state"></el-input>-->
          <el-radio v-model="account.acc_state" label="0">可用</el-radio>
          <el-radio v-model="account.acc_state" label="1">不可用</el-radio>
        </el-form-item>
        <el-form-item label="员工名称" prop="emp_id">
          <el-select v-model="account.emp_id" placeholder="请选择">
            <el-option
              v-for="item in this.listemp"
              :key="item.emp_id"
              :label="item.emp_name"
              :value="item.emp_id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAccount();addVisible=false">添 加</el-button>
        <el-button type="success" @click="addVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!--修改账号-->
    <el-dialog width="40%" title="修改账号" :visible="updateVisible">
      <el-form label-width="100px" label-suffix="：" :model="account" class="form"  ref="fm" :rules="rules">
        <el-form-item label="" prop="acc_id">
          <el-input v-model="account.acc_id" name="acc_id" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="acc_pwd">
          <el-input v-model="account.acc_pwd" name="acc_pwd"></el-input>
        </el-form-item>
        <el-form-item label="员工状态" prop="acc_state">
          <el-radio-group v-model="account.acc_state">
            <el-radio :label="1">可用</el-radio>
            <el-radio :label="0">不可用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateAccount();updateVisible=false">修 改</el-button>
        <el-button type="success" @click="updateVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      addVisible: false,
      updateVisible: false,
      account: {
        acc_name: '',
        acc_pwd: ''
      },
      listemp: {},
      acc: [],
      rules: {
        acc_name: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '员工账号不能为空', trigger: 'blur'},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') == -1) {
                callback()
              } else {
                callback(new Error('员工账号不能包含_特殊字符'))
              }
            }
          }
        ],
        acc_pwd: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '账号密码不能为空', trigger: 'blur'},
          {min: 8, max: 16, message: '长度为必须为8-16位', trigger: ['change', 'blur']},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') == -1) {
                callback()
              } else {
                callback(new Error(''))
              }
            }
          }
        ]
      },
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 30],
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      queryname: []
    }
  },
  created: function () {
    this.listAll()
  },
  methods: {
    listAll: function () {
      this.$axios.post('http://localhost:8088/springboot/account/account_listAll')
        .then(res => {
          this.acc = res.data
          this.totalCount = res.data.length
        })
    },
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange (val) {
      // 改变默认的页数
      this.currentPage = val
    },
    showDialog: function (row) {
      // 显示模态窗口
      this.updateVisible = true
      this.account = row
    },
    empfun: function () {
      this.$axios.post('http://localhost:8088/springboot/employee/employee_query')
        .then(response => {
          console.log(response.data)
          this.listemp = response.data
        })
    },
    showDialog2: function () {
      // 显示模态窗口
      this.addVisible = true
      this.account = {}
      this.empfun()
    },
    addAccount: function () {
      this.$axios.post('http://localhost:8088/springboot/account/queryname').then(response => {
        this.queryname = response.data
        for (var i = 0; i < this.queryname.length; i++) {
          var name1 = this.queryname[i].acc_name
          if (this.account.acc_name === name1) {
            this.$message({
              showClose: true,
              message: '该账号已存在！',
              type: 'error'
            })
            return false
          }
        }
        if (this.account.acc_name == null || this.account.acc_name == '' || this.account.acc_pwd == null || this.account.acc_pwd == '') {
          this.$message({
            message: '字段不能为空',
            type: 'error'
          })
          return false
        } else {
          this.$axios.post('http://localhost:8088/springboot/account/account_add', this.$qs.stringify(this.account))
            .then(response => {
              if (response.data = 1) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，添加成功',
                  type: 'success'
                })
                this.listAll()
              } else {
                this.$message({
                  showClose: true,
                  message: '添加失败！',
                  type: 'error'
                })
              }
            })
        }
      })
    },
    updateAccount: function () {
      if (this.account.acc_pwd == null || this.account.acc_pwd == '') {
        this.$message({
          message: '字段不能为空',
          type: 'error'
        })
        this.listAll()
        return false
      } else {
        console.info(this.account)
        this.$axios.post('http://localhost:8088/springboot/account/account_update', this.$qs.stringify(this.account))
          .then(response => {
            if (response.data = 1) {
              this.$message({
                showClose: true,
                message: '恭喜你，修改成功',
                type: 'success'
              })
              this.listAll()
            } else {
              this.$message({
                showClose: true,
                message: '修改失败！',
                type: 'error'
              })
            }
          })
      }
    },
    updateAccountPwd: function (row) {
      this.$axios.post('http://localhost:8088/springboot/account/account_updatePwd', this.$qs.stringify(row))
        .then(response => {
          console.log(1)
          if (response.data = 1) {
            this.$message({
              showClose: true,
              message: '恭喜你，重置成功',
              type: 'success'
            })
            this.listAll()
          } else {
            this.$message({
              showClose: true,
              message: '重置失败！',
              type: 'error'
            })
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
