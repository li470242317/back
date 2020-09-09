<template>
 <div class="aaaa">
   <el-form label-width="100px" label-suffix=":" :model="account" class="login-page" :rules="rules" ref="fm">
     <h3 class="title">系统登录</h3>
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
              if (response != '') {
                this.$message('登陆成功')
                let u = response.data
                this.$axios.post('http://localhost:8088/springboot/power/SelectName?pos_id=' + u[0].pos_id)
                  .then(response2 => {
                    this.$router.push({name: 'home', query: {u: JSON.stringify(u)}})
                    localStorage.setItem('acc_one', JSON.stringify(response2))
                    localStorage.setItem('admins', JSON.stringify(response))
                  })
                // 登陆成功
                // 携带参数信息时,只能使用name
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
  /*.form {
    border: 1px solid gray;
    margin: 100px auto;
    width: 30%;
    border-radius: 25px;
    box-shadow: 0 0 25px lightskyblue;
    padding: 30px 50px;
    text-align: center;
  }*/
  .login-page{
    /*-webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 0px auto;
    width: 350px;
    padding: 20px 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    align-items: center;
    text-align: center;*/
    border: 1px solid gray;
    margin: 100px auto;
    width: 30%;
    border-radius: 25px;
    box-shadow: 0 0 25px lightskyblue;
    /*padding: 30px 50px;*/
    text-align: center;
    align-items: center;
    padding: 20px 35px 35px 15px;
  }
  label.el-checkbox.rememberme{
    margin: 0px 0px 15px;
    text-align: left;
  }

  .aaaa{
    position: absolute;
    top: 0;
    bottom:0;
    left:0;
    right: 0;
    height: 100%;
    width: 100%;
    background-position: center;
    background-size: cover;
    background-image: url(../assets/img/322293.jpg);
  }
</style>
