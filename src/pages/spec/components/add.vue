<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 商品名称 -->
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="80px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'规格属性'"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
             required: true, message: '属性不能为空', trigger: 'blur'}"
          >
            <div class="item">
              <el-input v-model="domain.value" class="input"></el-input>
              <el-button
                @click.prevent="removeDomain(domain)"
                class="del"
                type="danger"
                v-if="index"
              >删除</el-button>
              <el-button type="primary" @click="addDomain" class="add" v-if="!index">新增属性</el-button>
            </div>
          </el-form-item>
        </el-form>

        <!-- 开关 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
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
  requestspecAdd,
  requestspecDetail,
  requestspecUpdate,
  requestspecList,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      arr: [],
      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
        ],
        email: "",
      },

      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  methods: {
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
    },
    cancel() {
      this.info.show = false;
      this.arr = [];
      this.dynamicValidateForm.domains = [
        {
          value: "",
        },
      ];
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 添加属性规格=======================================
    add() {
      //循环取到添加的属性
      for (var i = 0; i < this.dynamicValidateForm.domains.length; i++) {
        this.arr[i] = this.dynamicValidateForm.domains[i].value;
      }
      //转换为接口需要的字符创
      this.form.attrs = JSON.stringify(this.arr);
      //发送添加请求
      requestspecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          // 刷新页面
          this.requestTotal();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条详细信息==========================================================
    getDetail(id) {
      requestspecDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.arr = JSON.parse(this.form.attrs);
        this.dynamicValidateForm.domains =[];
        this.arr.forEach((item, index) => {
           this.dynamicValidateForm.domains.push({
             value:item
           })
        });
       
      });
    },
    update() {
      //循环取到添加的属性
      for (var i = 0; i < this.dynamicValidateForm.domains.length; i++) {
        this.arr[i] = this.dynamicValidateForm.domains[i].value;
      }
      //转换为接口需要的字符创
      this.form.attrs = JSON.stringify(this.arr);
      requestspecUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel(), this.empty();
          //重新请求数据
          this.requestTotal();
          this.requestList();
        }
      });
    },
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
    }),
  },
  mounted() {},
};
</script>

<style scoped>
.item {
  display: flex;
}
.item .input,
.add,
.del {
  flex-grow: 1;
}
</style>