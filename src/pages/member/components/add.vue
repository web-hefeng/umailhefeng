<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone"></el-input>
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
  requestMemberDetail,
  requestMemberUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        nickname: "",
        randstr: "",
        password: "",
        phone: "",
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
      requestMemberList: "member/requestList",
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
        nickname: "",
        randstr: "",
        password: "",
        phone: "",
        status: 1,
      };
    },
    add() {
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
      requestMemberDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    update() {
      requestMemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestMemberList()
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
