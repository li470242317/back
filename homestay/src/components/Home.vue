<template>
  <div>
    <el-container>
      <el-header>
        <el-dropdown style="float: right" @command="handlerCommand">
          <span class="a">欢迎:{{this.admins.data[0].acc_name}}</span>
          <i class="el-icon-arrow-down"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Personal">个人信息</el-dropdown-item>
            <el-dropdown-item command="Logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu default-active="1" background-color="#545c64" text-color="#fff" active-text-color="#red">
            <div v-for='c in acc_one.data'>
            <el-submenu :index="c.pow_id.toString()" :route="{name:c.pow_url}">
              <template slot="title">
                <i :class="c.pow_url" style="color:white"></i>
                <span >{{c.pow_name}}</span>
              </template>
              <div v-for="z in c.childrenList">
                <el-menu-item :index="z.pow_id.toString()" :route="{name:z.pow_url}" >
                  <template slot="title">
                    <i :class="z.pow_url" style="color:white;font-size:small" ></i>
                    <span style="font-size:small"  @click="Mg(z.pow_url)">
                      {{z.pow_name}}
                    </span>
                  </template>
                </el-menu-item>
              </div>
            </el-submenu>
            </div>
          </el-menu>
          <!--
              default-active=index：默认激活
              router:当行菜单是否启用路由，启用之后，item作为route-link来使用
          -->
        </el-aside>
        <el-main>
          <!-- 二级路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer height="30px">

      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      acc_one: '',
      admins: ''
    }
  },
  created: function () {
    this.admins = JSON.parse(localStorage.getItem('admins'))
    this.acc_one = JSON.parse(localStorage.getItem('acc_one'))
    this.selectName()
  },
  methods: {
    selectName: function () {
      let u = JSON.parse(this.$route.query.u)
    },
    Mg: function (clickname) {
      this.acc_one = JSON.parse(localStorage.getItem('acc_one'))
      this.admins = JSON.parse(localStorage.getItem('admins') || '[]')
      // this.$axios.post('http://localhost:8088/springboot/power/query')
      //   .then(response => {
      //     this.$router.push({name: 'power', query: {acc_one: response.data}})
      //   })
      this.$router.push({name: clickname})
    },
    handlerCommand: function (command) {
      this.$router.push({name: command})
      // 路径写全
      // this.$router.push({path:'/home/personal'});
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: lavender;
    line-height: 60px;
  }

  .el-aside {
    height: 600px;
  }

  .el-main {
    background-color: lavenderblush;
  }

  .a{
    color: #409EFF;
    cursor: pointer;
  }
</style>
