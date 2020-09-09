<template>
  <div>
    <!--<h1>部门管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-button type="primary" round @click="showDialog2()">添加</el-button>
    <el-table :data="this.pos" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="pos_id" label="职位编号"></el-table-column>
      <el-table-column prop="pos_name" label="职位名称"></el-table-column>
      <el-table-column prop="man_name" label="部门名称"></el-table-column>
      <el-table-column label="操作" fixed="right" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit"  @click="showDialog(scope.row)">修改</el-button>
          <el-button type="success" size="mini" icon="el-icon-share" @click="authorityVisible=true;setAuthority(scope.row)">
            权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--修改模态框-->
    <el-dialog width="40%" title="修改职位" :visible="updateVisible">
      <el-form label-width="100px" label-suffix="：" :model="position" class="form"  ref="fm" :rules="rules">
        <el-form-item label="" prop="pos_id">
          <el-input v-model="position.pos_id" name="pos_id" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" prop="pos_name">
          <el-input v-model="position.pos_name" name="pos_name"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="man_id">
          <el-select v-model="position.man_id" placeholder="请选择" >
            <el-option
              v-for="item in this.manlist"
              :key="item.man_id"
              :label="item.man_name"
              :value="item.man_id"/>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePosition();updateVisible=false">修 改</el-button>
        <el-button type="success" @click="updateVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--添加员工-->
    <!--添加模态框-->
    <el-dialog width="40%" title="添加职位" :visible="addVisible">
      <el-form label-width="100px" label-suffix="：" :model="position" class="form"  ref="fm"  :rules="rules">
        <el-form-item label="职位名称" prop="pos_name">
          <el-input v-model="position.pos_name" name="pos_name"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="man_id">
          <el-select v-model="position.man_id" placeholder="请选择" >
            <el-option
              v-for="item in this.manlist"
              :key="item.man_id"
              :label="item.man_name"
              :value="item.man_id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPosition();addVisible=false">添 加</el-button>
        <el-button type="success" @click="addVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--权限分配-->
    <el-dialog title="编辑角色" :close-on-press-escape="false" :close-on-click-modal="false" ref="dialogForm" top="3vh" center class="home-dialog" :visible.sync="authorityVisible">
      <el-form ref="configForm" :model="poss" size="small" label-width="100px" style="width:50%" class="form">
          <el-tree :data="authorityList"
                   show-checkbox
                   default-expand-all
                   node-key="pow_id"
                   ref="tree"
                   highlight-current
                   :props="defaultProps"></el-tree>
      </el-form>
      <el-button :loading="addBtnLoading" type="primary" size="small" @click="getCheckedKeys()">
        立即提交
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'position',
  data () {
    return {
      addBtnLoading: false,
      updateVisible: false,
      addVisible: false,
      authorityVisible: false,
      position: {
        pos_name: ''
      },
      rules: {
        pos_name: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '职位账号不能为空', trigger: 'blur'},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') == -1) {
                callback()
              } else {
                callback(new Error('职位账号不能包含_特殊字符'))
              }
            }
          }
        ]
      },
      manlist: {},
      pos: [],
      authorityList: [],
      pos_id: 0,
      poss: {},
      defaultProps: {
        children: 'twoList',
        label: 'pow_name'
      }

    }
  },
  created: function () {
    this.listAll()
  },
  methods: {
    listAll: function () {
      this.$axios.post('http://localhost:8088/springboot/position/position_query')
        .then(response => {
          this.pos = response.data
        })
    },
    showDialog: function (row) {
      // 显示模态窗口
      this.updateVisible = true
      this.position = row
    },
    getCheckedKeys () {
      let str = ''
      for (let p = 0; p < this.$refs.tree.getCheckedKeys().length; p++) {
        console.log(this.$refs.tree.getCheckedKeys()[p])
        if (p < this.$refs.tree.getCheckedKeys().length - 1) {
          str += this.$refs.tree.getCheckedKeys()[p] + ','
        } else {
          str += this.$refs.tree.getCheckedKeys()[p]
        }
      }
      this.$axios.get('http://localhost:8088/springboot/position/saveId', {
        params: {pos_id: this.pos_id, pow_id: str}
      })
        .then(response => {
          if (response.data >= 1) {
            this.$message({
              showClose: true,
              message: '恭喜你,修改成功',
              type: 'success'
            })
            this.listAll()
            this.authorityVisible = false
          } else {
            this.$message({
              showClose: true,
              message: '修改失败',
              type: 'error'
            })
          }
        })
    }, // 设置状态
    setAuthority: function (row) {
      this.pos_id = row.pos_id
    },
    setAuthority: function (row) {
      this.pos_id = row.pos_id
      this.$axios.post('http://localhost:8088/springboot/power/queryAll')
        .then(response => {
          if (response.data != null) {
            this.authorityList = response.data
            this.$axios.post('http://localhost:8088/springboot/position/queryId?pos_id=' + this.pos_id)
              .then(response2 => {
                for (let p = 0; p < response2.data.length; p++) {
                  this.$refs.tree.setChecked(response2.data[p].pow_id, true, false)
                }
              })
          }
        })
    },
    funman: function () {
      this.$axios.post('http://localhost:8088/springboot/manager/manager_query')
        .then(response => {
          this.manlist = response.data
        })
    },
    showDialog2: function () {
      // 显示模态窗口
      this.addVisible = true
      this.position = {}
      this.funman()
    },
    showPosition: function () {
      this.$axios.post('http://localhost:8088/springboot/position/position_query')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'position', query: {position: response.data}})
          }
        })
    },
    updatePosition: function () {
      if (this.position.pos_name == null || this.position.pos_name == '') {
        this.$message({
          message: '名称不能为空',
          type: 'error'
        })
        this.listAll()
        return false
      } else {
        console.log(this.position)
        this.$axios.post('http://localhost:8088/springboot/position/position_update', this.$qs.stringify(this.position))
          .then(response => {
            if (response.data === 1) {
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
    addPosition: function () {
      if (this.position.pos_name == null || this.position.pos_name == '') {
        this.$message({
          message: '名称不能为空',
          type: 'error'
        })
        return false
      } else {
        this.$axios.post('http://localhost:8088/springboot/position/position_add', this.$qs.stringify(this.position))
          .then(response => {
            if (response.data === 1) {
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
    }
  }

}
</script>

<style scoped>

</style>
