<template>
  <div>
  <!--<h1>部门管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
  <!-- data:绑定数据  height:声明之后会固定表头-->
  <el-button round @click="showDialog2()">添加</el-button>
  <el-table :data="man.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true" border>
    <!-- prop显示绑定的数据的属性 -->
    <el-table-column prop="man_id" label="部门编号"></el-table-column>
    <el-table-column prop="man_name" label="部门名称"></el-table-column>
    <el-table-column label="操作" fixed="right" width="100px">
      <template slot-scope="scope">
        <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
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
  <!--修改模态框-->
  <el-dialog width="40%" title="修改部门" :visible="updateVisible">
    <el-form label-width="100px" label-suffix="：" :model="manager" class="form"  ref="fm">
      <el-form-item label="" prop="man_id">
        <el-input v-model="manager.man_id" name="man_id" type="hidden"></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="man_name">
        <el-input v-model="manager.man_name" name="man_name"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateManager();updateVisible=false">修 改</el-button>
      <el-button type="success" @click="updateVisible = false">取 消</el-button>
    </div>
  </el-dialog>
  <!--添加员工-->
  <!--添加模态框-->
  <el-dialog width="40%" title="添加部门" :visible="addVisible">
    <el-form label-width="100px" label-suffix="：" class="form"  ref="fm">
      <el-form-item label="部门名称" prop="man_name">
        <el-input v-model="manager.man_name" name="man_name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addManager();addVisible=false">添 加</el-button>
      <el-button type="success" @click="addVisible = false">取 消</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'manager',
  data () {
    return {
      updateVisible: false,
      addVisible: false,
      manager: {},
      // pageNum: 1,
      // pageSize: 3,
      man: [],
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
      this.$axios.post('http://localhost:8088/springboot/manager/manager_query')
        .then(response => {
          this.man = response.data
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
      this.manager = row
    },
    showDialog2: function () {
      // 显示模态窗口
      this.addVisible = true
      this.manager = {}
    },
    updateManager: function () {
      console.log(this.manager)
      this.$axios.post('http://localhost:8088/springboot/manager/manager_update', this.$qs.stringify(this.manager))
        .then(response => {
          if (response.data = 1) {
            alert('修改成功')
            this.listAll()
          } else {
            alert('修改失败')
          }
        })
    },
    addManager: function () {
      this.$axios.post('http://localhost:8088/springboot/manager/manager_add', this.$qs.stringify(this.manager))
        .then(response => {
          if (response.data = 1) {
            alert('添加成功')
            this.listAll()
          } else {
            alert('添加失败')
          }
        })
    }
  }

}
</script>

<style scoped>

</style>
