<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="80px">
          <el-date-picker
            v-model="con"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFirstCateId()">
            <el-option label="--请选择--" value disabled></el-option>
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
          <el-select v-model="form.second_cateid" @change="changeFirstGoodsId()">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in attr2"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestseckillAdd,
  requestseckillDetail,
  requestseckillUpdate,
  requestGoodsList,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";

import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //二级分类的数组
      secondCateArr: [],
      //商品
      attr2: [],
      con: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value1: "",
    };
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.requestCateList();
    }
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/requestList",
      requestseckill: "seckill/requestList",
    }),
    changeFirstCateId(bool) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    changeFirstGoodsId(bool) {
      requestGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.attr2 = res.data.list;
        }
      });
    },
    changeImg(e) {
      console.log(e);
      var file = e.raw;

      if (e.size > 2 * 1024 * 1024) {
        warningAlert("上传的图片不能超过2M");
        return;
      }
      var extname = e.name.slice(e.name.lastIndexOf("."));
      //   console.log(extname)
      var extArr = [".jpg", ".png", ".gif", ".jpeg"];
      if (!extArr.some((item) => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }

      //生成一个URL地址，赋值给imageUrl,展示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    empty() {
      this.secondCateArr = [];
      //商品
      this.attr2 = [];
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    add() {
      this.form.begintime = JSON.stringify(new Date(this.con[0]).getTime());
      this.form.endtime = JSON.stringify(new Date(this.con[1]).getTime());

      //   console.log(date.getTime(this.value1),date.getTime(this.value2))
      requestseckillAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据
          this.empty();
          //提交数据弹框消失
          this.cancel();
          this.requestseckill();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestseckillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.changeFirstCateId(true);
        this.changeFirstGoodsId(true);
        this.con = [
          new Date(parseInt(res.data.list.begintime)),
          new Date(parseInt(res.data.list.endtime))
        ]
      });
    },
    update() {
      this.form.begintime = JSON.stringify(new Date(this.con[0]).getTime());
      this.form.endtime = JSON.stringify(new Date(this.con[1]).getTime());
      requestseckillUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestseckill();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  filter: {},
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  watch: {},
};
</script>

<style scoped lang="stylus">
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
