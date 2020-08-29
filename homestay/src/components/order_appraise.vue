<template>
  <div>
  <!--<h1>部门管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
  <!-- data:绑定数据  height:声明之后会固定表头-->
  <el-table :data="oa.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true" border>
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
    <el-table-column prop="or_cover" label="图片评价"></el-table-column>
    <el-table-column prop="oa_date" label="评价时间"></el-table-column>
    <el-table-column prop="or_details" label="评价详情"></el-table-column>
    <!--<template slot-scope="scope">-->
      <!--<el-button type="text" @click="deleteOrder_appraise(scope.row)">删除</el-button>-->
    <!--</template>-->
    <el-table-column label="操作" fixed="right" width="100px">
      <template slot-scope="scope">
        <el-button type="text" @click="deleteOrder_appraise(scope.row)">删除</el-button>
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
  name: 'order_appraise',
  data () {
    return {
      updateVisible: false,
      addVisible: false,
      order_appraise: {},
      oa: [],
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
      this.$axios.post('http://localhost:8088/springboot/Order_appraise/Order_appraise_query')
        .then(response => {
          this.oa = response.data
          this.totalCount = response.data.length
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
    },
    showDialog: function (row) {
      // 显示模态窗口
      this.updateVisible = true
      this.order_appraise = row
    },
    deleteOrder_appraise: function (row) {
      console.log(this.row)
      this.$axios.post('http://localhost:8088/springboot/Order_appraise/Order_appraise_delete?oa_id=' + row.oa_id)
        .then(response => {
          if (response.data = 1) {
            alert('删除成功')
            this.listAll()
          } else {
            alert('删除失败')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
