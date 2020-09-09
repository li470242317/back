<template>
    <!--<div>这是平台流水</div>-->
  <div>
    <el-table :data="wat.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="wat_id" label="编号"></el-table-column>
      <el-table-column prop="wat_money" label="金额"></el-table-column>
      <el-table-column prop="wat_date" label="时间"></el-table-column>
      <el-table-column prop="or_id" label="订单编号"></el-table-column>
      <el-table-column prop="wat_state" label="状态">
        <template slot-scope="scope">
          {{scope.row.wat_state==1?'支出':'收入'}}
        </template>
      </el-table-column>
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
  name: 'water',
  data () {
    return {
      water: {},
      wat: [],
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
      this.$axios.post('http://localhost:8088/springboot/water/water_listAll')
        .then(res => {
          this.wat = res.data
          this.totalCount = res.data.length
        })
    },
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      // 显示第几页
      // 改变默认的页数
      this.currentPage = val
    }
  }
}
</script>

<style scoped>

</style>
