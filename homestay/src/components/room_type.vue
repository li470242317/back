<template>
    <!--<div>这是民宿类型表</div>-->
  <div><!--
    <h1>员工管理  <el-button type="success" @click="showDialogadd">添加</el-button></h1>-->
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-button type="primary" round @click="showDialog2()">添加</el-button>
    <el-table :data="room.slice((currentPage-1)*PageSize,currentPage*PageSize)" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="rt_id" label="类型编号"></el-table-column>
      <el-table-column prop="rt_name" label="类型名称"></el-table-column>
      <el-table-column prop="rt_rec" label="类型介绍"></el-table-column>
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

    <!--添加民宿类型-->
    <!--添加模态框-->
    <el-dialog width="40%" title="添加民宿类型" :visible="addVisible">
      <el-form label-width="100px" label-suffix="：" :model="room_type" class="form"  ref="fm" :rules="rules">
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
      addVisible: false,
      room_type: {
        rt_name: '',
        rt_rec: ''
      },
      rules: {
        rt_name: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '类型不能为空不能为空', trigger: 'blur'},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') == -1) {
                callback()
              } else {
                callback(new Error('类型不能包含_特殊字符'))
              }
            }
          }
        ],
        rt_rec: [
          // require:进行校验,默认校验非空 message:提示信息 trigger:触发校验的时间
          {required: true, message: '类型介绍不能为空不能为空', trigger: 'blur'},
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') == -1) {
                callback()
              } else {
                callback(new Error('类型介绍不能包含_特殊字符'))
              }
            }
          }
        ]
      },
      room: [],
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
      this.$axios.post('http://localhost:8088/springboot/room_type/room_listAll')
        .then(response => {
          this.room = response.data
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
    showDialog2: function () {
      // 显示模态窗口
      this.addVisible = true
      this.room_type = {}
    },
    addRoom_type: function () {
      if (this.room.rt_name == null || this.room.rt_name == '' || this.room.rt_rec == null || this.room.rt_rec == '') {
        this.$message({
          message: '字段不能为空',
          type: 'error'
        })
        return false
      } else {
        this.$axios.post('http://localhost:8088/springboot/room_type/room_add', this.$qs.stringify(this.room_type))
          .then(response => {
            if (response.data = 1) {
              this.$message({
                showClose: true,
                message: '恭喜你,添加成功',
                type: 'success'
              })
              this.listAll()
            } else {
              this.$message({
                showClose: true,
                message: '添加失败！',
                type: 'error'
              })
            }
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
