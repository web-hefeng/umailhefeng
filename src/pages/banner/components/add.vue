<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px" >
          <el-upload
            class="avatar-uploader"
            action="#"
            list-type="picture-card"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  requestbannerAdd,
  requestbannerDetail,
  requestbannerUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";

import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //上传完成的时候图片的地址
      imageUrl: "",
      form: {
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      requestList: "banner/requestList",
    }),
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
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    add() {
      requestbannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据
          this.empty();
          //提交数据弹框消失
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestbannerDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img
      });
    },
    update() {
      requestbannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  filter: {},
  computed: {
    ...mapGetters({
      list: "cate/list",
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
