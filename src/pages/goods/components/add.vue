<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
        <!-- 商品名称 -->
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFirstCateId()">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" @change="changeSpecsId()">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <!-- 开关 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestGoodsAdd,
  requestGoodDetail,
  requestGoodsUpdate,
  requestspecList,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import E from "wangeditor";
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      editor: null,
      secondCateArr: [],
      attrsArr: [],
      imageUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList: "spec/list",
    }),
  },
  methods: {
    changeFirstCateId(bool) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    empty() {
      this.secondCateArr = [];
      this.attrsArr = [];
      this.imageUrl = "";
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.editor.txt.html("");
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //图片发生改变
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    changeSpecsId(bool) {
      let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );

      this.attrsArr = JSON.parse(this.specList[index].attrs);
      if (!bool) {
        this.form.specsattr = [];
      }
    },
    // 添加属性规格=======================================
    add() {
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      //发送添加请求
      requestGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          // 刷新页面
          this.requestGoodsCount();
          this.requestGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条详细信息==========================================================
    getDetail(id) {
      requestGoodDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;

        this.imageUrl = this.$imgPre + this.form.img;
        this.changeFirstCateId(true);
        this.changeSpecsId(true);
        this.form.specsattr = JSON.parse(this.form.specsattr);
      });
    },
    update() {
      this.form.description = this.editor.txt.html();
      //转换为接口需要的字符创
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      requestGoodsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          //重新请求数据
          this.requestGoodsList();
        }
      });
    },
    ...mapActions({
      requestSpecList: "spec/requestList",
      requestCateList: "cate/requestList",
      requestGoodsList: "goods/requestList",
      requestGoodsCount: "goods/requestTotal",
    }),
  },
  mounted() {
    this.requestCateList();
    this.requestSpecList(true);
  },
};
</script>

<style scoped lang="stylus" >
.item {
  display: flex;
}

.item .input, .add, .del {
  flex-grow: 1;
}

// 穿透
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>