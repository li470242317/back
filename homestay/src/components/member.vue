<template>
    <!--<div>这是平台流水</div>-->
  <div>
    <el-table :data="mem.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="mem_id" label="编号"></el-table-column>
      <el-table-column prop="mem_name" label="名称"></el-table-column>
      <el-table-column prop="mem_power" label="权利"></el-table-column>
      <el-table-column prop="mem_condition" label="条件"></el-table-column>
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
  name: 'member',
  data () {
    return {
      member: {},
      mem: [],
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
      this.$axios.post('http://localhost:8088/springboot/member/member_listAll')
        .then(res => {
          this.mem = res.data
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
