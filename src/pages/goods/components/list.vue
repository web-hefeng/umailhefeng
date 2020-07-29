<template>
  <div class="list">
    <el-table :data="list" border style="width: 100%" >
      <el-table-column prop="id" label="商品编号" width="78"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="100"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="是否新品"  width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖"  width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- =============分页器========= -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      :total="total"
      @current-change="cPage"
    ></el-pagination>
  </div>
</template>
<script>
import { requestGoodsdelete} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size"
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "goods/requestList",
      changePage: "goods/changePage",
      requestTotal: "goods/requestTotal",
    }),
    //改变页数时===================================
    cPage(a) {
      this.changePage(a);
      this.requestList();
    },
    //编辑=======================================
    edit(id) {
      this.$emit("edit", id);
    },
    //删除=======================================
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          requestGoodsdelete({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              // 当前页面删完页数减一
              // if (
              //   res.data.list.length % this.size == 0 &&
              //   res.data.list.length > 0
              // ) {
              //   this.changePage(this.page - 1);
              // }
              this.requestTotal();
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
  mounted() {
    this.requestTotal();
    this.requestList();
  },
};
</script>
<style scoped>
img {
  width:80px;
  height: 80px;
}
</style>