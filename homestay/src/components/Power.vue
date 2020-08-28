<template>
  <div>
    <el-button @click="tableDatas={};addvisible=true"
               size="mini"
               icon="el-icon-plus"
               type="primary"
               style="float: left;background-color: cadetblue;border-color: cadetblue"
    >新增父级模块</el-button>
    <el-table
      :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      style="width: 100%;margin-bottom: 20px;"
      row-key="pow_id"
      :header-cell-style="rowClass"
      :cell-style="cellStyle"
      :tree-props="{children: 'listTwo', hasChildren: 'hasChildren'}">
      <el-table-column prop="pow_id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="pow_name" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="pow_url" label="地址" width="180">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="300px">
        <template slot-scope="scope">
          <el-row>
            <el-button style="background-color:darkgrey;border-color: darkgrey" type="primary" size="mini" icon="el-icon-edit" @click="updatevisible=true;showPermissionDialog(scope.row)"></el-button>
            <el-button style="background-color: indianred;border-color: indianred" type="danger" size="mini" class="el-icon-delete" @click="deletePermission(scope.row)"></el-button>
            <el-button v-if="scope.row.power_ids ==0" type="primary" size="mini" icon="el-icon-plus"
                       class="add" @click="addtwovisible=true;showTwoMenu(scope.row)">添加子级
            </el-button>
          </el-row>
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
    <!--添加一级菜单-->
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" ref="dialogForm" top="3vh" center class="home-dialog" :visible.sync="addvisible" title="添加菜单">
      <el-form ref="configForm" :model="tableDatas" size="small" label-width="100px" style="width: 50%" class="form">

        <el-form-item label="模块名称" prop="pow_name">
          <el-input clearable v-model="tableData.pow_name" name="pow_name" size="small" placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="模块路径" prop="pow_url">
          <el-input clearable v-model="tableData.pow_url" name="pow_url" size="small" placeholder="请输入菜单路径"/>
        </el-form-item>
        <el-form-item>
          <el-button :loading="addBtnLoading" type="primary" size="small" @click="addPermission">立即提交
          </el-button>
        </el-form-item>
        <el-form-item label="" prop="power_ids">
          <el-input type="hidden" clearable name="power_ids" size="small" v-model="tableData.power_ids"/>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--添加二级菜单-->
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" ref="dialogForm" top="3vh" center class="home-dialog" :visible.sync="addtwovisible" title="添加菜单">

      <el-form ref="configForm" :model="twolist" size="small" label-width="100px" style="width: 50%" class="form">
        <el-form-item label="父级模块" prop="">
          <el-input :disabled="true" clearable v-model="onelist.name" name="" size="small" placeholder=""/>
        </el-form-item>

        <el-form-item label="模块名称" prop="per_name">
          <el-input clearable v-model="twolist.pow_name" name="pow_name" size="small" placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="模块路径" prop="per_url">
          <el-input  clearable v-model="twolist.pow_url" name="pow_url" size="small" placeholder="请输入菜单路径"/>
        </el-form-item>
        <el-form-item>
          <el-button :loading="addBtnLoading" type="primary" size="small" @click="addTwoPermission">立即提交
          </el-button>
        </el-form-item>
        <el-form-item label="" prop="power_ids">
          <el-input clearable type="hidden" name="power_ids" size="small" v-model="twolist.power_ids"/>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--修改菜单-->
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" ref="dialogForm" top="3vh" center class="home-dialog" :visible.sync="updatevisible" title="修改菜单">
      <el-form ref="configForm" :model="tableDatas" size="small" label-width="100px" style="width: 50%" class="form">

        <el-form-item label="模块名称" prop="per_name">
          <el-input clearable v-model="tableDatas.pow_name" name="pow_name" size="small" placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="模块路径" prop="per_url">
          <el-input clearable v-model="tableDatas.pow_url" name="pow_url" size="small" placeholder="请输入菜单路径"/>
        </el-form-item>
        <el-form-item>
          <el-button :loading="addBtnLoading" type="primary" size="small" @click="updatePermission">立即提交
          </el-button>
        </el-form-item>
        <el-form-item label="" prop="power_ids">
          <el-input type="hidden" clearable name="power_ids" size="small" v-model="tableData.power_ids"/>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'Power',
  data () {
    return {
      tableData: [],
      addvisible: false,
      addBtnLoading: false,
      updatevisible: false,
      addtwovisible: false,
      onelist: {
        name: ''
      },
      twolist: {},
      tableDatas: {},
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
      this.$axios.post('http://localhost:8088/springboot/power/query')
        .then(res => {
          this.tableData = res.data
          this.totalCount = res.data.length
        })
    },
    // 设置表头的颜色
    rowClass () {
      return 'background:#545c64;color:white'
    },
    // 设置指定行、列、具体单元格颜色
    cellStyle () {
      return 'background:#545c64;color:white'
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
    showPermissionDialog: function (row) {
      console.log(row)
      this.tableDatas = row
    },
    showTwoMenu: function (row) {
      this.twolist.power_ids = row.pow_id
      this.onelist.name = row.pow_name
    },
    addTwoPermission: function () {
      this.$axios.post('http://localhost:8088/springboot/power/insert', this.$qs.stringify(this.twolist))
        .then(response => {
          if (response.data>= 1) {
            this.$message({
              showClose: true,
              message: '恭喜你，添加成功',
              type: 'success'
            })
            this.addtwovisible = false
          } else {
            this.$message({
              showClose: true,
              message: '添加失败！',
              type: 'error'
            })
          }
        })
    },
    addPermission: function () {
      this.tableData.per_parent = 0
      this.$axios.post('http://localhost:8088/springboot/power/insert', this.$qs.stringify(this.tableDatas))
        .then(response => {
          if (response.data >= 1) {
            this.$message({
              showClose: true,
              message: '恭喜你，添加成功',
              type: 'success'
            })
            this.addvisible = false
          } else {
            this.$message({
              showClose: true,
              message: '添加失败！',
              type: 'error'
            })
          }
        })
    },
    updatePermission: function () {
      this.$axios.post('http://localhost:8088/springboot/power/update', this.$qs.stringify(this.tableDatas))
        .then(response => {
          if (response.data >= 1) {
            this.$message({
              showClose: true,
              message: '恭喜你，修改成功',
              type: 'success'
            })
            this.updatevisible = false
          } else {
            this.$message({
              showClose: true,
              message: '修改失败！',
              type: 'error'
            })
          }
        })
    },
    deletePermission: function (row) {
      console.log(row.per_id)
      this.$axios.post('http://localhost:8088/springboot/power/delete?pow_id=' + row.pow_id)
        .then(response => {
          if (response.data >= 1) {
            this.$message({
              showClose: true,
              message: '恭喜你，删除成功',
              type: 'success'
            })
            this.updatevisible = false
          } else {
            this.$message({
              showClose: true,
              message: '删除失败！',
              type: 'error'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
  .el-table [class*=el-table__row--level] .el-table__expand-icon {
    display:inline-block;
    width:20px;
    line-height:20px;
    height:20px;
    text-align:center;
    margin-right:3px;
    color: white;
  }

</style>
