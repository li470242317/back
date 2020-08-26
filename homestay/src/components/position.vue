<template>
  <div>
    <!--<h1>部门管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-button round @click="showDialog2()">添加</el-button>
    <el-table :data="this.$route.query.position" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="pos_id" label="职位编号"></el-table-column>
      <el-table-column prop="pos_name" label="职位名称"></el-table-column>
      <el-table-column prop="man_name" label="部门名称"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--修改模态框-->
    <el-dialog width="40%" title="修改职位" :visible="updateVisible">
      <el-form label-width="100px" label-suffix="：" :model="position" class="form"  ref="fm">
        <el-form-item label="" prop="pos_id">
          <el-input v-model="position.pos_id" name="pos_id" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" prop="pos_name">
          <el-input v-model="position.pos_name" name="pos_name"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="man_id">
          <el-select v-model="position.man_id" placeholder="请选择" >
            <el-option
              v-for="item in this.manlist"
              :key="item.man_id"
              :label="item.man_name"
              :value="item.man_id"/>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePosition();updateVisible=false">修 改</el-button>
        <el-button type="success" @click="updateVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--添加员工-->
    <!--添加模态框-->
    <el-dialog width="40%" title="添加职位" :visible="addVisible">
      <el-form label-width="100px" label-suffix="：" class="form"  ref="fm">
        <el-form-item label="职位名称" prop="pos_name">
          <el-input v-model="position.pos_name" name="pos_name"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="man_id">
          <el-select v-model="position.man_id" placeholder="请选择" >
            <el-option
              v-for="item in this.manlist"
              :key="item.man_id"
              :label="item.man_name"
              :value="item.man_id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPosition();addVisible=false">添 加</el-button>
        <el-button type="success" @click="addVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'position',
  data () {
    return {
      updateVisible: false,
      addVisible: false,
      position: {}
    }
  },
  methods: {
    showDialog: function (row) {
      // 显示模态窗口
      this.updateVisible = true
      this.position = row
    },
    funman: function () {
      this.$axios.post('http://localhost:8088/springboot/manager/manager_query')
        .then(response => {
          this.manlist = response.data
        })
    },
    showDialog2: function () {
      // 显示模态窗口
      this.addVisible = true
      this.position = {}
      this.funman()
    },
    updatePosition: function () {
      console.log(this.position)
      this.$axios.post('http://localhost:8088/springboot/position/position_update', this.$qs.stringify(this.position))
        .then(response => {
          if (response.data = 1) {
            alert('修改成功')
          } else {
            alert('修改失败')
          }
        })
    },
    addPosition: function () {
      this.$axios.post('http://localhost:8088/springboot/position/position_add', this.$qs.stringify(this.position))
        .then(response => {
          if (response.data = 1) {
            alert('添加成功')
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
