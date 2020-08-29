<template>
    <!--<div>这是民宿类型表</div>-->
  <div><!--
    <h1>员工管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-button round @click="showDialog2()">添加</el-button>
    <el-table :data="this.room" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="rt_id" label="类型编号"></el-table-column>
      <el-table-column prop="rt_name" label="类型名称"></el-table-column>
      <el-table-column prop="rt_rec" label="类型介绍"></el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="3"
      :pager-count="11"
      layout="prev, pager, next"
      :total="this.$route.query.Ph.totalCount">
    </el-pagination>

    <!--添加民宿类型-->
    <!--添加模态框-->
    <el-dialog width="40%" title="添加民宿类型" :visible="addVisible">
      <el-form label-width="100px" label-suffix="：" class="form"  ref="fm">
        <el-form-item label="类型名称" prop="rt_name">
          <el-input v-model="room_type.rt_name" name="rt_name"></el-input>
        </el-form-item>
        <el-form-item label="类型介绍" prop="rt_rec">
          <el-input v-model="room_type.rt_rec" name="rt_rec"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRoom_type();addVisible=false">添 加</el-button>
        <el-button type="success" @click="addVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'room_type',
  data () {
    return {
      pageNum: 1,
      pageSize: 3,
      addVisible: false,
      room_type: {},
      room: []
    }
  },
  created: function () {
    this.listAll()
  },
  methods: {
    listAll: function () {
      this.$axios.post('http://localhost:8088/springboot/room_type/room_listAll?pageNum=' + val + '')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'room_type', query: {Ph: response.data}})
          }
        })
    },
    handleCurrentChange (val) {
      console.log(`当前页 ${val} `)
      this.$axios.post('http://localhost:8088/springboot/room_type/room_listAll?pageNum=' + val + '')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'room_type', query: {Ph: response.data}})
          }
        })
    },
    showDialog2: function () {
      // 显示模态窗口
      this.addVisible = true
      this.room_type = {}
    },
    /* showRoom_type: function () {
      this.$axios.post('http://localhost:8088/springboot/room_type/room_listAll')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'room_type', query: {room_type: response.data}})
          }
        })
    }, */
    addRoom_type: function () {
      this.$axios.post('http://localhost:8088/springboot/room_type/room_add', this.$qs.stringify(this.room_type))
        .then(response => {
          if (response.data = 1) {
            alert('添加成功')
            this.showRoom_type()
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
