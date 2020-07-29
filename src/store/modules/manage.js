import { requestManageList, requestManagecount } from "../../util/request"

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
    changeTotal(state, num) {
        state.total = num;
    },
    changeList(state, arr) {
        state.list = arr
    },
    changePage(state, page) {
        state.page = page
    }
}
const actions = {
    requestList(context) {
        const params = {
            page: context.state.page,
            size: context.state.size
        }
        requestManageList(params).then(res => {
            if(!res.data.list.length&&context.state.page>0){
                context.commit("changePage",context.state.page-1)
                context.dispatch("requestList")
                return;
            }
            context.commit("changeList", res.data.list)
        })
    },
    requestTotal(context) {
        requestManagecount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    //页面修改页码
    changePage(context, page) {
        context.commit("changePage", page)
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