<template>
    <!--<div>这是房间信息</div>-->
  <div>
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-input prop="hou_name" v-model="hou_name" type="text" placeholder="请输入" style="width:200px;height:30px;"></el-input>
    <el-button @click="listAll()">搜索</el-button>
    <el-table :data="hou.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true" border>
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
      <el-table-column prop="fac_prc" label="图片">

      </el-table-column>
      <el-table-column prop="fac_photoprc" label="证件照">

      </el-table-column>
      <el-table-column prop="fac_expiredate" label="到期时间"></el-table-column>
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
  name: 'house',
  data () {
    return {
      house: {},
      hou_name: '',
      hou: [],
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
      this.$axios.post('http://localhost:8088/springboot/house/house_listAll?hou_name=' + this.hou_name)
        .then(res => {
          console.info(this.hou[0])
          this.hou = res.data
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
