<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change="cPage" :total="total" :page-size="size" ></el-pagination>
  </div>
</template>

<script>
import {  requestManagedelete } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {
    this.requestList();
    this.requestTotal();

  },
  methods: {

    ...mapActions({
      requestList: "manage/requestList",
      requestTotal: "manage/requestTotal",
      changePage:"manage/changePage"
    }),
    cPage(a){
        this.changePage(a)
        //获取列表
        this.requestList()
    },
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          requestManagedelete({ uid: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.requestList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  filter: {},
  computed: {
    ...mapGetters({
      list: "manage/list",
      total: "manage/total",
      size: "manage/size",
    }),
  },
  watch: {},
};
</script>

<style scoped>
</style>
