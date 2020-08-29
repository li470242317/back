<template>
    <!--<div>这是客户表</div>-->
  <div><!--
    <h1>员工管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-table :data="cli.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="cli_id" label="客户编号"></el-table-column>
      <el-table-column prop="cli_name" label="客户名称"></el-table-column>
      <el-table-column prop="cli_sex" label="性别"></el-table-column>
      <el-table-column prop="cli_phone" label="手机号"></el-table-column>
      <el-table-column prop="cli_date" label="出生日期"></el-table-column>
      <el-table-column prop="cli_place" label="所在城市"></el-table-column>
      <el-table-column prop="cli_money" label="消费总金额"></el-table-column>
      <el-table-column prop="cli_email" label="电子邮箱"></el-table-column>
      <el-table-column prop="cli_sparephone" label="备用电话"></el-table-column>
      <el-table-column prop="cli_qq" label="QQ"></el-table-column>
      <el-table-column prop="cli_wechat" label="微信"></el-table-column>
      <el-table-column prop="cli_referral" label="个人介绍"></el-table-column>
      <el-table-column prop="cli_prc" label="头像"></el-table-column>
      <el-table-column prop="cli_rank" label="级别">
        <template slot-scope="scope">
          {{scope.row.cli_rank==1?'房东':'用户'}}
        </template>
      </el-table-column>
      <el-table-column prop="ba_name" label="账号"></el-table-column>
      <el-table-column prop="cli_price" label="租币"></el-table-column>
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
  </div>
</template>

<script>
export default {
  name: 'client',
  data () {
    return {
      client: {},
      cli: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 30],
      // 默认每页显示的条数（可修改）
      PageSize: 5
    }
  },
  created: function () {
    this.listAll()
  },
  methods: {
    listAll: function () {
      this.$axios.post('http://localhost:8088/springboot/client/client_listAll')
        .then(res => {
          this.cli = res.data
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
    }
  }
}
</script>

<style scoped>

</style>
