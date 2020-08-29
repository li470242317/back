<template>
    <!--<div>这是员工表</div>-->
  <div>
    <!-- data:绑定数据  height:声明之后会固定表头-->
    <el-button round @click="showDialog2()">添加</el-button>
    <el-table :data="this.emp" width="100%" height="550px" :stripe="true" border>
      <!-- prop显示绑定的数据的属性 -->
      <el-table-column prop="emp_id" label="员工编号"></el-table-column>
      <el-table-column prop="emp_name" label="员工名称"></el-table-column>
      <el-table-column prop="emp_sex" label="性别"></el-table-column>
      <el-table-column prop="emp_age" label="年龄"></el-table-column>
      <el-table-column prop="emp_phone" label="电话"></el-table-column>
      <el-table-column prop="emp_address" label="住址"></el-table-column>
      <el-table-column prop="emp_card" label="身份证号"></el-table-column>
      <el-table-column prop="hiredate" label="入职时间"></el-table-column>
      <el-table-column prop="dimission" label="离职时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--&lt;!&ndash;分页&ndash;&gt;-->
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="3"
      :pager-count="11"
      layout="prev, pager, next"
      :total="this.$route.query.Ph.totalCount">
    </el-pagination>

    <!--添加员工-->
    <el-dialog width="40%" title="添加员工" :visible="addVisible">
      <el-form label-width="100px" label-suffix="：" class="form"  ref="fm">
        <el-form-item label="员工名称" prop="emp_name">
          <el-input v-model="employee.emp_name" name="emp_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="emp_sex">
          <el-input v-model="employee.emp_sex" name="emp_sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="emp_age">
          <el-input v-model="employee.emp_age" name="emp_age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="emp_phone">
          <el-input v-model="employee.emp_phone" name="emp_phone"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="emp_address">
          <el-input v-model="employee.emp_address" name="emp_address"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="emp_card">
          <el-input v-model="employee.emp_card" name="emp_card"></el-input>
        </el-form-item>
        <template>
          <div class="block">
            <span class="demonstration">入职时间</span>
            <el-date-picker
              v-model="employee.hiredate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </template>
        <!--<el-form-item label="离职时间" prop="dimission">
        <el-input v-model="employee.dimission" name="dimission"></el-input>
      </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addEmployee();addVisible=false">添 加</el-button>
        <el-button type="success" @click="addVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'employee',
  data () {
    return {
      addVisible: false,
      updateVisible: false,
      employee: {},
      emp: [],
      pageNum: 1,
      pageSize: 3,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      hiredate: ''
    }
  },
  created: function () {
    this.listAll()
  },
  methods: {
    listAll: function () {
      this.$axios.post('http://localhost:8088/springboot/employee/emp_query2')
        .then(res => {
          this.emp = res.data
        })
    },
    handleCurrentChange (val) {
      console.log(`当前页 ${val} `)
      this.$axios.post('http://localhost:8088/springboot/employee/employee_query?pageNum=' + val + '')
        .then(response => {
          console.log(response.data)
          if (response.data != null) {
            this.$router.push({name: 'employee', query: {Ph: response.data}})
          }
        })
    },
    showDialog: function (row) {
      // 显示模态窗口
      this.updateVisible = true
      this.employee = row
    },
    showDialog2: function () {
      // 显示模态窗口
      this.addVisible = true
      this.employee = {}
    },
    addEmployee: function () {
      this.$axios.post('http://localhost:8088/springboot/employee/employee_add', this.$qs.stringify(this.employee))
        .then(response => {
          if (response.data = 1) {
            alert('添加成功')
          } else {
            alert('添加失败')
          }
        })
    },
    updateAccount: function () {
      this.$axios.post('http://localhost:8088/springboot/account/account_update', this.$qs.stringify(this.account))
        .then(response => {
          if (response.data = 1) {
            alert('修改成功')
          } else {
            alert('修改失败')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
