<template>
  <div>
     <el-button type="primary" @click="add">添加</el-button>
     <!--添加弹框-->
      <v-add :info="info" ref="add"></v-add>
     <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
  components: {
    vList,
    vAdd
  },
  props: {},
  data() {
    return {
      info: {
        //弹框的出现状态
        show: false,
        title:"秒杀活动添加",
        isAdd:true
      },
    };
  },
  mounted() {},
  methods: {
    add() {
      this.info.show = true;
      this.info.title="秒杀活动添加",
      this.info.isAdd=true
    },
    edit(id){
      this.info.show=true
      this.info.title="秒杀活动编辑"
      this.info.isAdd=false
      this.$refs.add.getDetail(id)
    }
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>

</style>
