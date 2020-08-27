<template>
  <div>
    <el-container>
      <el-header>
        <el-dropdown style="float: right" @command="handlerCommand">
          <span class="a">欢迎{{$route.params.u}}</span>
          <i class="el-icon-arrow-down"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Personal">个人信息</el-dropdown-item>
            <el-dropdown-item command="Logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <!--
              default-active=index：默认激活
              router:当行菜单是否启用路由，启用之后，item作为route-link来使用
          -->
          <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
            <!-- 可展开的导航 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-aim"></i>
                <span>人事管理</span>
              </template>
              <!-- 启用之后，item作为router-link来使用 route:匹配要访问的路由路径-->
              <el-menu-item index="1-1" :route="{name:'manager'}">
                <i class="el-icon-camera"></i>
                <span @click="showManager">部门管理</span>
              </el-menu-item>
              <el-menu-item index="1-2" :route="{name:'employee'}">
                <i class="el-icon-dessert"></i>
                <span @click="showEmployee">员工管理</span>
              </el-menu-item>
              <el-menu-item index="1-3" :route="{name:'position'}">
                <i class="el-icon-dessert"></i>
                <span @click="showPosition">职位管理</span>
              </el-menu-item>
            </el-submenu>
              <el-menu-item index="2" :route="{name:'account'}">
                  <i class="el-icon-aim"></i>
                  <span @click="showAccount">账号管理</span>
              </el-menu-item>
              <el-menu-item index="3" :route="{name:'client'}">
                  <i class="el-icon-attract"></i>
                  <span @click="showClient">客户管理</span>
              </el-menu-item>
              <el-menu-item index="4" :route="{name:'room_type'}">
                  <i class="el-icon-attract"></i>
                  <span @click="showRoom_type">民宿类型管理</span>
            </el-menu-item>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-aim"></i>
                <span>房间管理</span>
              </template>
              <!-- 启用之后，item作为router-link来使用 route:匹配要访问的路由路径-->
              <el-menu-item index="5-1" :route="{name:'house'}">
                <i class="el-icon-aim"></i>
                <span>房间管理</span>
              </el-menu-item>
              <el-menu-item index="5-2">
                <i class="el-icon-camera"></i>
                <span>房间评价</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="6" :route="{name:'water'}">
              <i class="el-icon-dessert"></i>
              <span>平台流水查看</span>
            </el-menu-item>
            <el-menu-item index="7" :route="{name:'orders'}">
              <i class="el-icon-dessert"></i>
              <span @click="showOrders">订单管理</span>
            </el-menu-item>
          </el-menu>
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
      list: []
    }
  },
  create: function () {
    this.selectName()
  },
  methods: {
    selectName: function () {
      console.log(this.$route.params.u.acc_id)
      this.$axios.post('http://localhost:8088/springboot/power/SelectName', this.$route.params.u)
        .then(response => {
          console.log(response.data)
          this.list = response.data
        })
    },
    handlerCommand: function (command) {
      this.$router.push({name: command})
      // 路径写全
      // this.$router.push({path:'/home/personal'});
    },
    showManager: function () {
      this.$axios.post('http://localhost:8088/springboot/manager/manager_query')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'manager', query: {manager: response.data}})
          }
        })
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
    showEmployee: function () {
      this.$axios.post('http://localhost:8088/springboot/employee/employee_query')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'employee', query: {employee: response.data}})
          }
        })
    },
    showClient: function () {
      this.$axios.post('http://localhost:8088/springboot/client/client_listAll')
        .then(response => {
          console.log(response.data)
          console.log(1)
          if (response.data != null) {
            this.$router.push({name: 'client', query: {client: response.data}})
          }
        })
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
    showRoom_type: function () {
      this.$axios.post('http://localhost:8088/springboot/room_type/room_listAll')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'room_type', query: {room_type: response.data}})
          }
        })
    },
    showOrders: function () {
      this.$axios.post('http://localhost:8088/springboot/orders/orders_query')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'orders', query: {orders: response.data}})
          }
        })
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
