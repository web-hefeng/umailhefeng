import { requestspecList, requestspeccount } from "../../util/request"

const state = {
    list: [],
    //一页的数量
    size: 2,
    //数据总数量
    total: 0,
    //当前的页码
    page: 1
}

const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    //修改总页数
    changeTotal(state, num) {
        state.total = num
    },
    //修改当前页码
    changePage(state, page) {
        state.page = page
    }
}
const actions = {
    //发送请求获取获取管理员;列表
    requestList(context, bool) {
        var params = {}
        if (bool) {
            params = {}
        } else {
            params = {
                page: context.state.page,
                size: context.state.size
            }
        }
        requestspecList({ params }).then(res => {
            if (res.data.list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1);
                context.dispatch("requestList")
                return;
            }
            context.commit('changeList', res.data.list)
        })
    },
    //获取总数量
    requestTotal(context) {
        requestspeccount().then(res => {

            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    //获取设置当前页数
    changePage(context, page) {
        context.commit('changePage', page)
    }

}
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total;
    },
    size(state) {
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}