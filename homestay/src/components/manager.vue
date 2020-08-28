<template>
  <div>
  <!--<h1>部门管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
  <!-- data:绑定数据  height:声明之后会固定表头-->
  <el-button round @click="showDialog2()">添加</el-button>
  <el-table :data="this.$route.query.manager" width="100%" height="550px" :stripe="true" border>
    <!-- prop显示绑定的数据的属性 -->
    <el-table-column prop="man_id" label="部门编号"></el-table-column>
    <el-table-column prop="man_name" label="部门名称"></el-table-column>
    <el-table-column label="操作" fixed="right" width="100px">
      <template slot-scope="scope">
        <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>

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
      manager: {}
    }
  },
  methods: {
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
    showManager: function () {
      this.$axios.post('http://localhost:8088/springboot/manager/manager_query')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'manager', query: {manager: response.data}})
          }
        })
    },
    updateManager: function () {
      console.log(this.manager)
      this.$axios.post('http://localhost:8088/springboot/manager/manager_update', this.$qs.stringify(this.manager))
        .then(response => {
          if (response.data = 1) {
            alert('修改成功')
            this.showManager()
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
            this.showManager()
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
