<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号"  width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称"  width="180"></el-table-column>
      <el-table-column  label="图片">
        <template  slot-scope="scope">
         <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="状态">
          <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
              <el-button type="info" v-else>禁用</el-button>
          </template>
      </el-table-column>
       <el-table-column  label="操作">
           <template slot-scope="scope">
              <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {requestcatedelete} from "../../../util/request"
import {mapGetters,mapActions} from "vuex"
import { successAlert, warningAlert } from '../../../util/alert';
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  mounted() {
    this.requestList()
  },
  methods: {
    ...mapActions({
      requestList:"cate/requestList"
    }),
    edit(id){
      this.$emit("edit",id)
    },
    del(id){
       this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(()=>{
        requestcatedelete({id:id}).then(res=>{
          if(res.data.code == 200){
            successAlert(res.data.msg)
            this.requestList()
          }else {
            warningAlert(res.data.msg)
          }
        })
      }).catch(()=>{
        this.$message({
            type: "info",
            message: "已取消删除",
          });
      })
    }
  },
  filter: {},
  computed: {
    ...mapGetters({
      list:"cate/list"
    })
  },
  watch: {}
};
</script>

<style scoped>
.nn {
  text-align: center;
}
.dd {
  font-size: 30px;
  margin-left: 65px;
}
img {
  width: 80px;
  height: 80px;
}
</style>
