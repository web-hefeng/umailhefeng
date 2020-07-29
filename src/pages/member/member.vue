<template>
  <div>
      <v-add :info="info" ref="add"></v-add>
      <v-list  @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add"
import vList from "./components/list"
export default {
  components: {
    vAdd,
    vList
  },
  props: {},
  data() {
    return {
       info: {
        show: false,
        title: "添加会员",
        isAdd: true,
      }
    };
  },
  mounted() {},
  methods: {
     edit(id) {
      this.info.show = true;
      this.info.title = "会员编辑";
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
