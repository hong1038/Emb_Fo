import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        userInfo: null,
        userToken: null,
        wetherData: null,
        szCurDt: null,
        curDt: null,
        szCurMmFr: null,
        curMmFr: null,
        szCurMMTo: null,
        curMmTo: null,
        ckServer: [],
        ckCate: [],
        ckEquip: [],
        ckSensor: [],
        paginationPageSize: 10000,
        serverKey: 0,
        serverName: null,
        baseAreaCode: 100,
        areaCode: 0,
        bgImg: null,
        sInlet: 510,
        sMidlet: 511,
        sOutlet: 512,
        gArea: 1000, // 경인권역
        mArea: 1001, // 중부권역
        yArea: 1003, // 영남권역
        cArea: 1004, // 계열사
        bArea: 1005 // 바이오
    },

    mutations: {
        loginSuccess(state, userInfo) {
            state.isLogin = true;
            state.userInfo = userInfo;

            state.szCurDt = userInfo.szCurDt;
            state.szCurMmFr = (new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + "02";
            state.szCurMmTo = (new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 1);

            state.curDt = userInfo.curDt;
            state.curMmFr = (new Date().getFullYear()) + "-" + (new Date().getMonth() + 1);
            // state.curMmTo = userInfo.curMMTo;
            state.curYFr = (new Date().getFullYear())
            console.log(state.curYFr)

            state.areaCode = userInfo.areaCode;
            router.push({ name: "Main" });
        },

        logout(state) {
            state.isLogin = false;
            state.userInfo = null;
            router.push({ name: "login" });
        },
        loginFail(state) {
            state.isLogin = false;
            alert("사용자정보를 확인할 수 없습니다.")
            state.userInfo = null;
            router.push({ name: "login" });
        },


        readFail() {
            router.push({ name: "readError" });
        },

        saveUserToken(state, token) {
            state.userToken = token;
        },
    },
    actions: {
        loginSuccess({ commit }, signObj) {
            //console.log("stor.actions.login.signObj = " +  signObj.userNm);
            commit("loginSuccess", signObj);
            this.$Axios.defaults.headers.common['authorization'] = signObj.token;
            this.$router.push({ name: 'measurementData' });
        },
        logout({ commit }) {
            commit("logout");
            this.$router.push({ name: 'login' });
        },

        loginFail({ commit }) {
            commit("loginFail");
        },

        readFail({ commit }) {
            commit("readFail");
        },

        saveUserToken({ commit }, token) {
            commit('saveUserToken', token);
        },

    },
    modules: {}
})