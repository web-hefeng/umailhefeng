import axios from "axios"
import qs from "qs"
import router from "../router"
import store from "../store"
import {warningAlert} from "./alert"
axios.interceptors.response.use(res => {
    console.group("本次路径：" + res.config.url)
    console.log(res)
    if (res.data.msg === "登录已过期或访问权限受限") {
        warningAlert("登录已过期或访问权限受限")
        router.push("/login");
        return;
    }
    return res
})
axios.interceptors.request.use(config => {
    if (config.url != baseUrl + '/api/userlogin') {
        config.headers.authorization = store.state.user.token;
    }
    return config
})

// const baseUrl = "/api"
const baseUrl = ""
export const requestMonuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestMonuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: params
    })
}
export const requestMenuDetail = (params) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params
    })
}
export const requestMenuUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestMenudelete = (params) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get"
    })
}
export const requestRoleDetail = (params) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params
    })
}
export const requestRoleUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestRoledelete = (params) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestManageAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestManagecount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",

    })
}
export const requestManageList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params
    })
}
export const requestManageDetail = (params) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params
    })
}
export const requestManageUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestManagedelete = (params) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}
//会员管理
export const requestMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get"
    })
}
export const requestMemberDetail = (params) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params
    })
}
export const requestMemberUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(params)
    })
}
//分类
export const requestcateAdd = (params) => {
    var formData = new FormData();
    for (let i in params) {
        formData.append(i, params[i]);
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: formData
    })
}
export const requestcateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}
export const requestcateDetail = (params) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params
    })
}
export const requestcateUpdate = (params) => {
    var formData = new FormData();
    for (let i in params) {
        formData.append(i, params[i]);
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: formData
    })
}
export const requestcatedelete = (params) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(params)
    })
}

export const requestspecAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestspeccount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}
export const requestspecList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params
    })
}
export const requestspecDetail = (params) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        method: "get",
        params
    })
}
export const requestspecUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestspecdelete = (params) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

export const requestGoodsAdd = (params) => {
    var formData = new FormData();
    for (let i in params) {
        formData.append(i, params[i]);
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: formData
    })
}
export const requestGoodscount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}
export const requestGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params
    })
}
export const requestGoodDetail = (params) => {
    return axios({
        url: baseUrl + '/api/goodsinfo',
        method: "get",
        params
    })
}
export const requestGoodsUpdate = (params) => {
    var formData = new FormData();
    for (let i in params) {
        formData.append(i, params[i]);
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: formData
    })
}
export const requestGoodsdelete = (params) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

// 轮播图
export const requestbannerAdd = (params) => {
    var formData = new FormData();
    for (let i in params) {
        formData.append(i, params[i]);
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: formData
    })
}
export const requestbannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}
export const requestbannerDetail = (params) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params
    })
}
export const requestbannerUpdate = (params) => {
    var formData = new FormData();
    for (let i in params) {
        formData.append(i, params[i]);
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: formData
    })
}
export const requestbannerdelete = (params) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//秒杀
export const requestseckillAdd = (params) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestseckillList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}
export const requestseckillDetail = (params) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params
    })
}
export const requestseckillUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(params)
    })
}
export const requestseckilldelete = (params) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(params)
    })
}