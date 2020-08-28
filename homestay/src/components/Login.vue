<template>
 <div>
   <el-form label-width="100px" label-suffix=":" :model="account" class="form" :rules="rules" ref="fm">
     <el-form-item label="用户名" prop="acc_name">
       <!--必须去声明绑定的数据模型-->
       <el-input v-model="account.acc_name"></el-input>
     </el-form-item>
     <el-form-item label="密码" prop="acc_pwd">
       <el-input show-password v-model="account.acc_pwd"></el-input>
     </el-form-item>
     <span id="pwderror"></span>
     <el-button type="success" @click="login">登录</el-button>
   </el-form>
 </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      account: {},
      rules: {
        acc_name: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '账号不能为空', trigger: 'blur'},
          {min: 2, max: 6, message: '账号为3-6位', trigger: ['change', 'blur']},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') == -1) {
                callback()
              } else {
                callback(new Error('用户名不能包含_特殊字符'))
              }
            }
          }
        ],
        acc_pwd: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login: function () {
      this.$refs['fm'].validate(valid => {
        if (valid) {
          this.$axios.post('http://localhost:8088/springboot/account/Login', this.account)
            .then(response => {
              if (response.data != '') {
                this.$message('登陆成功')
                let u = response.data
                // 登陆成功
                // 携带参数信息时,只能使用name
                this.$router.push({name: 'home', params: {u: u}})
              } else {
                this.$message('登陆失败,账号或密码错误')
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
  .form {
    border: 1px solid gray;
    margin: 100px auto;
    width: 30%;
    border-radius: 25px;
    box-shadow: 0 0 25px lightskyblue;
    padding: 30px 50px;
    text-align: center;
  }
</style>
