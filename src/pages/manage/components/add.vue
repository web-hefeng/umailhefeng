<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
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
import { mapGetters, mapActions } from "vuex";
import {
  requestManageAdd,
  requestManageDetail,
  requestManageUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/,
            min: 6,
            max: 11,
            message: "请输入纯数字，纯字母，纯特殊字符",
            trigger: "blur",
          },
        ],
      },
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  mounted() {
    if (this.roleList.length === 0) {
      this.requestRoleList();
      this.requestTotal();
    }
  },
  methods: {
    ...mapActions({
      requestManageList: "manage/requestList",
      requestRoleList: "role/requestList",
      requestTotal: "manage/requestTotal",
    }),
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      if(!this.form.roleid){
        warningAlert("请选择角色")
        return
      }else if(!this.form.username){
        warningAlert("用户名不能为空")
        return
      }else if(!this.form.password){
        warningAlert("密码不能为空")
        return
      }
      //发起添加角色的请求
      requestManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestManageList();
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestManageDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    update() {
      requestManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  filter: {},
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  watch: {},
};
</script>

<style scoped>
</style>
