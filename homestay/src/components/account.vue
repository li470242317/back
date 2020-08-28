<template>
    <!--<div>这是账号表</div>-->
  <div><!--
    <h1>员工管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-button round @click="showDialog2()">添加</el-button>
    <el-table :data="this.$route.query.account" width="100%" height="550px" :stripe="true" border>
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
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
          <el-button type="text" @click="updateAccountPwd(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加模态框-->
    <el-dialog width="40%" title="添加账号" :visible="addVisible">
      <el-form label-width="100px" label-suffix="：" class="form"  ref="fm">
        <el-form-item label="账号" prop="acc_name">
          <el-input v-model="account.acc_name" name="acc_name"></el-input>
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
      <el-form label-width="100px" label-suffix="：" class="form"  ref="fm">
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
      state: 1,
      addVisible: false,
      updateVisible: false,
      account: {}
    }
  },
  methods: {
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
    showAccount: function () {
      this.$axios.post('http://localhost:8088/springboot/account/account_listAll')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'account', query: {account: response.data}})
          }
        })
    },
    addAccount: function () {
      this.$axios.post('http://localhost:8088/springboot/account/account_add', this.$qs.stringify(this.account))
        .then(response => {
          if (response.data = 1) {
            alert('添加成功')
            this.showAccount()
          } else {
            alert('添加失败')
          }
        })
    },
    updateAccount: function () {
      this.$axios.post('http://localhost:8088/springboot/account/account_update', this.$qs.stringify(this.account))
        .then(response => {
          if (response.data = 1) {
            alert('修改成功')
            this.showAccount()
          } else {
            alert('修改失败')
          }
        })
    },
    updateAccountPwd: function (row) {
      this.$axios.post('http://localhost:8088/springboot/account/account_updatePwd', this.$qs.stringify(row))
        .then(response => {
          console.log(1)
          if (response.data = 1) {
            alert('重置成功')
            this.showAccount()
          } else {
            alert('重置失败')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
