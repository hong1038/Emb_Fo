import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  
  state: {
    userInfo : null, 
    userToken : null,
    wetherData: null,
    szCurDt:null,
    curDt:null,
    szCurMmFr:null,
    curMmFr:null,
    szCurMMTo:null,
    curMmTo:null,
    ckServer: [],
    ckCate: [],
    ckEquip: [],
    ckSensor: [],
    paginationPageSize:1000,
    serverKey:0,
    serverName:null,
    areaCode:0,
    bgImg:null,
  },
 
  mutations: {
    loginSuccess(state,userInfo) {
      state.isLogin = true;
      state.userInfo = userInfo;
      
      state.szCurDt = userInfo.szCurDt;
      state.szCurMmFr = userInfo.szCurMmFr;
      state.szCurMmTo = userInfo.szCurMmTo;

      state.curDt = userInfo.curDt;
      state.curMmFr = userInfo.curMmFr;
      state.curMmTo = userInfo.curMMTo;
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
       
    saveUserToken(state,token) {
      state.userToken=token;
    },
  },
  actions: {
    loginSuccess({commit}, signObj) {
      //console.log("stor.actions.login.signObj = " +  signObj.userNm);
      commit("loginSuccess",signObj);
      this.$Axios.defaults.headers.common['authorization'] = signObj.token;
      this.$router.push({ name: 'measurementData' });
    },
    logout({commit}) {
      commit("logout");
      this.$router.push({ name: 'login' });
    },

    loginFail({commit}) {
      commit("loginFail");
    },

    readFail({commit}) {
      commit("readFail");
    },

    saveUserToken({commit},token) {
      commit('saveUserToken',token);
    },

  },
  modules: {
  }
})
