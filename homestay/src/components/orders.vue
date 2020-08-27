<template>
  <div>
  <!--<h1>部门管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
  <!-- data:绑定数据  height:声明之后会固定表头-->
  <el-table :data="this.$route.query.orders" width="100%" height="550px" :stripe="true" border>
    <!-- prop显示绑定的数据的属性 -->
    <el-table-column prop="or_id" label="订单编号"></el-table-column>
    <el-table-column prop="od_name" label="入住人姓名"></el-table-column>
    <el-table-column prop="hou_name" label="房源名称"></el-table-column>
    <el-table-column prop="cli_name" label="房东"></el-table-column>
    <el-table-column prop="hou_address" label="房子地址"></el-table-column>
    <el-table-column prop="hou_row" label="街道"></el-table-column>
    <el-table-column prop="hou_details" label="详细地址"></el-table-column>
    <el-table-column prop="od_card" label="身份证号"></el-table-column>
    <el-table-column prop="or_date" label="下单时间"></el-table-column>
    <el-table-column prop="or_checkdate" label="入住时间"></el-table-column>
    <el-table-column prop="or_outdate" label="退房时间"></el-table-column>
    <el-table-column prop="or_checkcount" label="入住人数"></el-table-column>
    <el-table-column prop="or_needprice" label="需付款"></el-table-column>
    <el-table-column prop="or_trueprice" label="实付款"></el-table-column>
    <el-table-column prop="or_state" label="订单状态">
      <template slot-scope="{row:{or_state}}">
        <span v-if="+or_state===2">已退款</span>
        <span v-if="+or_state===3">已付款</span>
        <span v-if="+or_state===4">已完成</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'orders',
  data () {
    return {
      updateVisible: false,
      addVisible: false,
      orders: {}
    }
  },
  methods: {
    showDialog: function (row) {
      // 显示模态窗口
      this.updateVisible = true
      this.orders = row
    }
  }
}
</script>

<style scoped>

</style>
