<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <div class="inner mailInner">
            <div class="con">
                <b-card class="right_list" v-if="show">
                    <div class="con_box_right mailCreateConBox container-fluid float-left">
                        <p>메일 수신자 등록</p>
                        <router-link :to="{ name: 'mailreceiver'}" class="mailSave">저장</router-link>
                        <router-link :to="{ name: 'mailreceiver'}" class="mailList">목록</router-link>
                    </div>
                    <div>
                        <b-row>
                            <b-col class="regiName col-4">사업장</b-col>
                            <b-form-select class="col" v-model="server_key" :options="comboServers" size="sm">
                            </b-form-select>
                        </b-row>
                        <b-row>
                            <b-col class="regiName col-4">사용자명</b-col>
                            <b-form-input class="col" type="text" size="sm" v-model="user_name"></b-form-input>
                        </b-row>
                        <b-row>
                            <b-col class="regiName col-4">사용자 메일</b-col>
                            <b-form-input class="col" type="text" size="sm" v-model="user_mail"></b-form-input>
                        </b-row>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
import Main from '@/components/main.vue'
import 'vue-good-table/dist/vue-good-table.css'
import vue from 'vue'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"

// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import store from '@/store/index';
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        Main,
        vue,
        // DatePicker,
        // BootstrapVue,
    },
    data() {
        return {

            comboServers: null, //사업장   
            comboCategories: null, //측청분야     

            mode: 'single',
            pageNo: 1,
            perPage: 10,
            perCodeNo: 1,
        }
    },
    computed: {},

    beforeMount() {
        store.state.ckServer = [];
    },
    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        this.getConditionList();
    },
    methods: {
        onHidden() {
            // Return focus to the button once hidden
            this.$refs.pin.focus()
        },
        onClick() {
            this.busy = true
            // Simulate an async request
            this.setTimeout(() => {
            this.busy = false
            })
        },
        async getConditionList() {
            let that = this;
            await axios.post("/api/daedan/cj/ems/setting/conditionList", {
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.comboServers = res.data.data.serverList; //사업장
                        }
                    }
                })
                .catch(err => {
                    alert("서버목록/수집분야(악취,수질,대기) 추출 실패 \n" + err);
                    console.log(err)
                })

        },
        saveInfo() {
            if (!this.user_name) {
                alert("성명은 필수 입력 항목 입니다.")
                return;
            }
            this.busy = true;
            this.altMsg = "처리중인 기준정보를 저장 하시겠습니까 ? ";
            this.workTp = "SAVE_INFO"
        },
        async saveInfoProc() {
            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/setting/mailSave", {
                    user_name: this.user_name,
                    server_key:this.server_key,
                    user_mail:this.user_mail,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.saveblock();
                            that.getList();
                        }
                    }
                })
                .catch(err => {
                    alert("측정기별기준정보저장 실패 \n" + err);
                })
    },
        axLen3(e) { //최대 3자 이하로구성
            return String(e).substring(0, 3);
        },
        maxLen10(e) { //최대 10자이하로 구성
            return String(e).substring(0, 10);
        },

    },
    // 조회버튼 클릭
    searchBtn() {

    },
    // 엑셀저장버튼 클릭
    excelBtn() {

    },
    // 그래프버튼 클릭
    graphBtn() {

    }

}
</script>

<style>
@font-face {
    font-family: "CJ Onlyone Medium";
    src: url(/fonts/CJOnlyoneMedium.ttf);
    font-weight: 400;
}

@font-face {
    font-family: "CJ Onlyone Bold";
    src: url(/fonts/CJOnlyoneBold.ttf);
    font-weight: bold;
}

* {
    margin: 0;
    padding: 0;
}

.mailInner,
.mailConBox {
    margin: 0 auto;
}

.mailCreateConBox {
    width: 800px;
    margin: 0 auto;
    margin-left: 375px;
}

.con_box_right {
    box-sizing: border-box;
    font-family: "CJ Onlyone Medium";
    position: relative;
}

.con_box_right>p {
    width: 400px;
    height: 50px;
    font-family: "CJ Onlyone Bold";
    font-size: 24px;
    box-sizing: border-box;
    border-bottom: 5px solid rgb(172, 172, 172);
    padding-left: 10px;
    text-align: left;
}

.mailSave,
.mailList {
    position: absolute;
    top: 20px;
    width: 100px;
    height: 40px;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
    font-size: 14px;
    text-decoration: none;
    line-height: 40px;
    text-align: center;
    color: black;
}

.mailSave {
    right: 120px;
}

.mailList {
    right: 15px;
}

.mailSave:hover,
.mailList:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
    text-decoration: none;
}

/* Contents */
.mail_con {
    height: 210px;
    border: 1px solid #d7dadd;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #f9fcff;
}

.mail_con>div {
    height: inherit;
    line-height: 70px;
    font-family: "CJ Onlyone Bold";
}

.mail_con>div>div {
    font-size: 18px;
}

.mail_con>div {
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
}

.mail_con>div>div {
    float: left;
    width: 30%;
    height: 100%;
}

.mail_con>div>div:nth-child(2) {
    width: 70%;
}

.mail_con>div>div>input,
.mail_con>div>div>select {
    width: 70%;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 7px;
    font-size: 14px;
}

.mail_con>div>div>select {
    overflow-y: hidden;
}
</style>
