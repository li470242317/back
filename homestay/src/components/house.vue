<template>
    <!--<div>这是房间信息</div>-->
  <div>
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-button round @click="showDialog2()">添加</el-button>
    <el-table :data="this.hou" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="hou_id" label="房间编号"></el-table-column>
      <el-table-column prop="hou_name" label="房间名称"></el-table-column>
      <el-table-column prop="hou_address" label="地址"></el-table-column>
      <el-table-column prop="hou_row" label="街道"></el-table-column>
      <el-table-column prop="hou_details" label="详细地址"></el-table-column>
      <el-table-column prop="hou_bdcount" label="卧室数量"></el-table-column>
      <el-table-column prop="hou_drcount" label="客厅数量"></el-table-column>
      <el-table-column prop="hou_kitcount" label="厨房数量"></el-table-column>
      <el-table-column prop="hou_ipcount" label="独卫数量"></el-table-column>
      <el-table-column prop="hou_cmcount" label="公卫数量"></el-table-column>
      <el-table-column prop="hou_letcount" label="出租类型"></el-table-column>
      <el-table-column prop="rt_name" label="房间类型"></el-table-column>
      <el-table-column prop="hou_checkcount" label="入住人数"></el-table-column>
      <el-table-column prop="hou_bedcount" label="床位数量"></el-table-column>
      <el-table-column prop="cli_name" label="房东名称"></el-table-column>
      <el-table-column prop="ru_price" label="日价"></el-table-column>
      <el-table-column prop="ru_checkdate" label="入住时间"></el-table-column>
      <el-table-column prop="ru_outdate" label="退房时间"></el-table-column>
      <el-table-column prop="fac_prc" label="图片"></el-table-column>
      <el-table-column prop="fac_photoprc" label="证件照"></el-table-column>
      <el-table-column prop="fac_expiredate" label="到期时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'house',
  data () {
    return {
      house: {},
      hou: []
    }
  },
  created: function () {
    this.listAll()
  },
  methods: {
    listAll: function () {
      this.$axios.post('http://localhost:8088/springboot/house/house_listAll')
        .then(res => {
          this.hou = res.data
        })
    }
  }
}
</script>

<style scoped>

</style>
