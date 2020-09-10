<template>
    <!--<div>这是员工表</div>-->
  <div>
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-input prop="emp_name" v-model="emp_name" type="text" placeholder="请输入" style="width:200px;height:30px;"></el-input>
    <el-button @click="listAll()">搜索</el-button>
    <el-button type="primary" round @click="showDialog2()">添加</el-button>
    <el-table :data="emp.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="emp_id" label="员工编号"></el-table-column>
      <el-table-column prop="emp_name" label="员工名称"></el-table-column>
      <el-table-column prop="emp_sex" label="性别">
        <template slot-scope="scope">
          {{scope.row.emp_sex==1?'女':'男'}}
        </template>
      </el-table-column>
      <el-table-column prop="emp_age" label="年龄"></el-table-column>
      <el-table-column prop="emp_phone" label="电话"></el-table-column>
      <el-table-column prop="emp_address" label="住址"></el-table-column>
      <el-table-column prop="emp_card" label="身份证号"></el-table-column>
      <el-table-column prop="hiredate" label="入职时间"></el-table-column>
      <el-table-column prop="dimission" label="离职时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="showDialog(scope.row)">修改</el-button>
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

    <!--添加员工-->
    <el-dialog width="40%" title="添加员工" :visible="addVisible">
      <el-form label-width="100px" label-suffix="：" class="form"  ref="fm" :model="employee" :rules="rules">
        <el-form-item label="员工名称" prop="emp_name">
          <el-input v-model="employee.emp_name" name="emp_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="emp_sex">
          <!--<el-input v-model="employee.emp_sex" name="emp_sex"></el-input>-->
          <el-radio v-model="employee.emp_sex" label="1">女</el-radio>
          <el-radio v-model="employee.emp_sex" label="0">男</el-radio>
        </el-form-item>
        <el-form-item label="年龄" prop="emp_age">
          <el-input v-model="employee.emp_age" name="emp_age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="emp_phone">
          <el-input v-model="employee.emp_phone" name="emp_phone"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="emp_address">
          <el-input v-model="employee.emp_address" name="emp_address"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="emp_card">
          <el-input v-model="employee.emp_card" name="emp_card"></el-input>
        </el-form-item>
        <template>
          <div class="block">
            <span class="demonstration">入职时间</span>
            <el-date-picker
              v-model="employee.hiredate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </template>
        <!--<el-form-item label="离职时间" prop="dimission">
        <el-input v-model="employee.dimission" name="dimission"></el-input>
      </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addEmployee();addVisible=false">添 加</el-button>
        <el-button type="success" @click="addVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!--修改员工-->
    <el-dialog width="40%" title="修改员工" :visible="updateVisible">
      <el-form label-width="100px" label-suffix="：" class="form"  ref="fm" :model="employee" :rules="rules">
        <el-form-item label="员工名称" prop="emp_name">
          <el-input v-model="employee.emp_name" name="emp_name"></el-input>
        </el-form-item>
        <!--<el-form-item label="性别" prop="emp_sex">
          &lt;!&ndash;<el-input v-model="employee.emp_sex" name="emp_sex"></el-input>&ndash;&gt;
          <el-radio v-model="employee.emp_sex" label="1">女</el-radio>
          <el-radio v-model="employee.emp_sex" label="0">男</el-radio>
        </el-form-item>-->
        <!--<el-form-item label="性别" prop="emp_sex">
          <el-radio-group v-model="employee.emp_sex">
            <el-radio :label="1">女</el-radio>
            <el-radio :label="0">男</el-radio>
          </el-radio-group>
        </el-form-item>-->
        <template>
          <div>
            <label><input v-model="employee.emp_sex" type="radio" value="0" @change="getRadioVal">男</label>
            <label><input v-model="employee.emp_sex" type="radio" value="1" @change="getRadioVal">女</label>
          </div>
        </template>
        <el-form-item label="年龄" prop="emp_age">
          <el-input v-model="employee.emp_age" name="emp_age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="emp_phone">
          <el-input v-model="employee.emp_phone" name="emp_phone"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="emp_address">
          <el-input v-model="employee.emp_address" name="emp_address"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="emp_card">
          <el-input v-model="employee.emp_card" name="emp_card"></el-input>
        </el-form-item>
        <!--<template>
          <div class="block">
            <span class="demonstration">入职时间</span>
            <el-date-picker
              v-model="employee.hiredate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </template>-->
        <template>
          <div class="block">
            <span class="demonstration">离职时间</span>
            <el-date-picker
              v-model="employee.dimission"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </template>
        <!--<el-form-item label="离职时间" prop="dimission">
        <el-input v-model="employee.dimission" name="dimission"></el-input>
      </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateEmployee();updateVisible=false">修 改</el-button>
        <el-button type="success" @click="updateVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'employee',
  data () {
    return {
      addVisible: false,
      updateVisible: false,
      employee: {
        emp_name: '',
        emp_age: '',
        emp_phone: '',
        emp_address: '',
        emp_card: ''
      },
      employee: {},
      emp_name: '',
      emp_sex: 0,
      rules: {
        emp_name: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '员工名称不能为空', trigger: 'blur'},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') == -1) {
                callback()
              } else {
                callback(new Error('员工性别不能包含_特殊字符'))
              }
            }
          }
        ],
        emp_age: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '员工年龄不能为空', trigger: 'blur'},
          /* {min: 1, max: 3, message: '年龄必须是数字', trigger: ['change', 'blur']}, */
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value && !(/^[1-9]\d*$/).test(value)) {
                callback(new Error('只能填写数字'))
              } else {
                callback()
              }
            }
          }
        ],
        emp_phone: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '员工手机号不能为空', trigger: 'blur'},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value && (!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/).test(value))) {
                callback(new Error('电话号码不符合规范'))
              } else {
                callback()
              }
            }
          }
        ],
        emp_address: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '员工地址不能为空', trigger: 'blur'},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') == -1) {
                callback()
              } else {
                callback(new Error('不能包含特殊符号'))
              }
            }
          }
        ],
        emp_card: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '员工身份证号不能为空', trigger: 'blur'},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
                callback(new Error('身份证号码不符合规范'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      emp: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 30],
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      hiredate: ''
    }
  },
  created: function () {
    this.listAll()
  },
  methods: {
    getRadioVal () {
      console.log(this.radioVal)
    },
    listAll: function () {
      this.$axios.post('http://localhost:8088/springboot/employee/employee_query?emp_name=' + this.emp_name)
        .then(res => {
          this.emp = res.data
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
    showDialog2: function () {
      // 显示模态窗口
      this.addVisible = true
      this.employee = {}
    },
    showDialog: function (row) {
      // 显示模态窗口
      this.updateVisible = true
      this.employee = row
    },
    addEmployee: function () {
      if (this.employee.emp_name == null || this.employee.emp_name == '' || this.employee.emp_age == null || this.employee.emp_age == '' || this.employee.emp_phone == null || this.employee.emp_phone == '' || this.employee.emp_address == null || this.employee.emp_address == '' || this.employee.emp_card == null || this.employee.emp_card == '') {
        this.$message({
          message: '字段不能为空',
          type: 'error'
        })
        return false
      } else {
        console.info(this.employee)
        this.$axios.post('http://localhost:8088/springboot/employee/employee_add', this.$qs.stringify(this.employee))
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
    },
    updateEmployee: function () {
      if (this.employee.emp_name == null || this.employee.emp_name == '' || this.employee.emp_age == null || this.employee.emp_age == '' || this.employee.emp_phone == null || this.employee.emp_phone == '' || this.employee.emp_address == null || this.employee.emp_address == '' || this.employee.emp_card == null || this.employee.emp_card == '') {
        this.$message({
          message: '字段不能为空',
          type: 'error'
        })
        this.listAll()
        return false
      } else {
        console.info(this.employee)
        this.$axios.post('http://localhost:8088/springboot/employee/employee_update', this.$qs.stringify(this.employee))
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
    }
  }
}
</script>

<style scoped>

</style>
