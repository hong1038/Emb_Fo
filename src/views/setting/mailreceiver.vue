<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <div class="inner mailInner">
            <div class="con">
                <div class="con_box_right mailConBox container-fluid">
                    <p>메일 수신자</p>
                    <router-link :to="{ name: 'mailreceiverCreate'}" class="mailRPlus">수신자 등록</router-link>
                    <div class="mailCon mt-4 text-center container-fluid" v-for="mail in MailList" :key="mail.id">
                        <b-row class="mailCon_title">
                            <b-col cols="3">사업장</b-col>
                            <b-col cols="3">시용자명</b-col>
                            <b-col cols="6">메일</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">{{mail.servername}}</b-col>
                            <b-col cols="3">{{mail.username}}</b-col>
                            <b-col cols="6">{{mail.usermail}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">{{mail.servername}}</b-col>
                            <b-col cols="3">{{mail.username}}</b-col>
                            <b-col cols="6">{{mail.usermail}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3">{{mail.servername}}</b-col>
                            <b-col cols="3">{{mail.username}}</b-col>
                            <b-col cols="6">{{mail.usermail}}</b-col>
                        </b-row>
                    </div>
                    <div>
                        <!-- <vue-good-table class="elevation-5" mode="remote" :line-numbers="true" :columns="fields" :rows="list" :totalRows="listCount" :pagination-options="{
                                    enabled: true,
                                    mode: 'records',
                                    perPage: perPage,
                                    position: 'top',
                                    perPageDropdown: [10],
                                    dropdownAllowAll: false,
                                    setCurrentPage: 1,
                                    nextLabel: '다음',
                                    prevLabel: '이전',
                                    rowsPerPageLabel: 'Rows per page',
                                    ofLabel: 'of',
                                    pageLabel: 'page', // for 'pages' mode
                                    allLabel: 'All',

                                }" @on-row-click="onRowClick" @on-page-change="onPageChange" theme="black-rhino" /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
import Vue from 'vue'
import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"

// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import store from '@/store/index';

Vue.use(VueGoodTablePlugin);
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        // DatePicker,
        // BootstrapVue,
    },
    data() {
        return {
            mode: 'single',
            info: {},
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            findTp: 'codeNm',
            findSz: '',
            perCodeNo: 1,
            MailList: [],
            fields: [{
                    field: 'server_key',
                    hidden: true
                },
                // {
                //     field: 'equipment_key',
                //     hidden: true
                // },
                // {
                //     field: 'sensor_key',
                //     hidden: true
                // },
                {
                    field: 'server_name',
                    label: '사업장'
                },
                {
                    field: 'user_name',
                    label: '사용자명'
                },
                {
                    field: 'user_mail',
                    label: '메일'
                },
            ],

        }
    },
    computed: {},

    beforeMount() {

    },
    created() {
        this.getConditionList();
    },

    methods: {
        getConditionList() {
            //this.config = { headers : { "authorization" : this.$Axios.defaults.headers.common["authorization"] }   }
            // let that = this;
            axios.post("/api/daedan/cj/ems/setting/MailList", {
                    userId: store.state.userInfo.userId
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            this.MailList = res.data.data;

                            // that.state.servers = res.data.data.servers; //사업장
                            // that.state.typies = res.data.data.typies; //수집분야(악취,대기,수질)
                            //that.state.equipPos = res.data.data.equipPos; //측정위치
                        }
                    }
                })
                .catch(err => {
                    alert("검색조건추출 실패 \n" + err);
                    console.log(err)
                })

        }

    },

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

.mailConBox {
    width: 800px;
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

.mailRPlus {
    position: absolute;
    top: 20px;
    right: 15px;
    width: 150px;
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

.mailRPlus:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
    text-decoration: none;
}

/* Contents */

.mailCon>div {
    border: 1px solid #d7dadd;
    border-top: none;
    background: #f9fcff;
}

.mailCon>div {
    height: inherit;
    font-family: "CJ Onlyone Bold";
    font-size: 14px;
    text-align: center;
}

.mailCon>div:nth-child(1) {
    background: #4b5054;
    font-size: 18px;
    font-weight: bold;
}

.mailCon>div:nth-child(1)>div {
    color: white;
}
</style>
