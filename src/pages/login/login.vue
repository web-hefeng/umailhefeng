<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input class="input" v-model="form.username" clearable></el-input>
      <el-input class="input" v-model="form.password" clearable show-password></el-input>
      <div class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template> 

<script>
import {mapGetters,mapActions} from "vuex"
import { requestLogin } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      requestLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.changeUser(res.data.list)
          this.$router.push("/home")
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  ...mapActions({
    "changeUser":"changeUser"
  })
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303d60);
}
.con {
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  line-height: 60px;
  font-size: 30px;
  text-align: center;
}
.input {
  margin-bottom: 20px;
}
.btn-box {
  text-align: center;
}
</style>
