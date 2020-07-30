<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules">
        <el-form-item label="菜单名称" label-width="80px" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" prop="logo" label-width="80px" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="80px" v-else>
          <el-select v-model="form.url">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
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
  requestMonuAdd,
  requestMenuDetail,
  requestMenuUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";

import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  components: {},
  data() {
    let checkAge = (rule, value, callback) => {
      if (value.length == "") {
        return callback(new Error("名称不能为空"));
      } else {
        callback();
      }
    };
    let gobtn = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名称不能为空"));
      }
    };
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      rules: {
        title: [
          //  { required: true, message: '请输入菜单名称', trigger: 'blur' },
          // { required: true, message: '请输入活动名称' },
          { validator: checkAge, message: "菜单名称不能为空", trigger: "blur" },
        ],
      },
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
        "/cate",
        "/spec",
        "/goods",
        "/banner",
        "/seckill",
        "/member",
      ],
    };
  },
  mounted() {},
  methods: {
    // checkNum() {
    //   if (this.form.title != "") {
    //     warningAlert("名称不能为空");
    //   }
    // },
    ...mapActions({
      requestList: "menu/requestList",
    }),
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
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
      if (!this.form.title) {
        warningAlert("请输入菜单名称");
        return;
      } else if (!this.form.icon) {
        warningAlert("请选中图标");
        return;
      }
      requestMonuAdd(this.form).then((res) => {
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
      requestMenuDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    update() {
      requestMenuUpdate(this.form).then((res) => {
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
      list: "menu/list",
    }),
  },
  watch: {
    "form.title": {
      handler(newname, oldname) {
        console.log(11);
      },
    },
  },
};
</script>

<style scoped>
</style>
