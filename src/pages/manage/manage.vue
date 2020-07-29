<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  props: {},
  data() {
    return {
      info: {
        show: false,
        title: "添加管理员",
        isAdd: true,
      },
    };
  },
  mounted() {},
  methods: {
    add() {
      this.info.show = true;
      this.info.title = "添加管理员";
      this.info.isAdd=true
    },
    edit(id) {
      this.info.show = true;
      this.info.title = "管理员编辑";
      this.info.isAdd = false;
      this.$refs.add.getDetail(id)
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>