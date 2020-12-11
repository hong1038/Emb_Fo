<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <div class="inner mailInner">
            <div class="con">
                <div class="con_box_right mailConBox container-fluid">
                    <p>메일 수신자</p>
                    <input type="button" class="mailPlus" v-on:click="showblock" value="등록">
                    <input type="button" class="mailList" v-on:click="getList" value="조회">
                    <div class="mailCon mt-4 text-center container-fluid" v-for="mail in MailList" :key="mail.id">
                        <b-row class="mailCon_title">
                            <b-col cols="3">사업장</b-col>
                            <b-col cols="3">시용자명</b-col>
                            <b-col cols="6">메일</b-col>
                        </b-row>
                    </div>
                    <div class="mailTableWrap" style="display:flex;">
                        <!--<vue-good-table class="elevation-5" mode="remote" :line-numbers="true" :columns="fields" :rows="list" :totalRows="listCount" :pagination-options="{
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
                                }" @on-row-click="onRowClick" @on-page-change="onPageChange" theme="black-rhino" />-->

                        <ag-grid-vue style="width: 100%; height: 670px;" class="ag-theme-alpine-dark" 
                                :columnDefs="fields" 
                                :rowData="list" 
                                :gridOptions="gridOptions" 
                                :pagination="true" 
                                :paginationPageSize="paginationPageSize">
                        </ag-grid-vue>

                    
                        <b-card class="right_list" v-if="show">
                            <b-row>
                                <b-col class="popUpTitle">메일 수신자 등록</b-col>
                                <input type="button" class="mailBtn btn btn-success btn-sm" v-on:click="saveInfo" value="저장">
                                <input type="button" class="mailBtn btn btn-primary btn-sm" v-on:click="showblock" value="목록">
                                <input type="button" class="mailBtn btn btn-danger btn-sm" v-on:click="dropInfo" value="삭제">
                            </b-row>
                            <div>
                                <b-row>
                                    <b-col class="regiName col-4">소속(사업장명)</b-col>
                                    <b-form-input class="col" v-model="server_key" size="sm"></b-form-input>
                                </b-row>
                                <b-row>
                                    <b-col class="regiName col-4">사용자명</b-col>
                                    <b-form-input class="col" v-model="name" size="sm"></b-form-input>
                                </b-row>
                                <!-- <b-row>
                                    <b-col class="regiName col-4">전화번호</b-col>
                                    <b-form-input class="col" v-model="emInfo.tell" size="sm"></b-form-input>
                                </b-row>
                                <b-row>
                                    <b-col class="regiName col-4">핸드폰번호</b-col>
                                    <b-form-input class="col" v-model="emInfo.hp" size="sm"></b-form-input>
                                </b-row> -->
                                <b-row>
                                    <b-col class="regiName col-4">메일</b-col>
                                    <b-form-input class="col" v-model="email" size="sm"></b-form-input>
                                </b-row>
                            </div>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
        <template v-slot:overlay>
            <div v-if="processing" class="text-center p-4 bg-primary text-light rounded">
                <b-icon icon="cloud-upload" font-scale="4"></b-icon>
                <div class="mb-3">Processing...</div>
                <b-progress min="1" max="20" :value="counter" variant="success" height="3px" class="mx-n4 rounded-0"></b-progress>
            </div>
            <div v-else ref="dialog" tabindex="-1" role="dialog" aria-modal="false" aria-labelledby="form-confirm-label" class="text-center p-3 popUpMessage">
                <p><strong id="form-confirm-label">{{altMsg}}</strong></p>
                <div class="d-flex">
                    <b-row>
                        <b-col cols="6" align="center" v-if="workTp ==='SAVE_INFO'" class="popUpInfo">
                            <b-button v-on:click="saveInfoProc" variant="success" size="sm">저장</b-button>
                        </b-col>
                        <b-col cols="6" align="center" class="popUpInfo">
                            <b-button variant="primary" @click="onCancel" size="sm">취소</b-button>
                        </b-col>
                        <b-col cols="6" align="center" v-if="workTp ==='DROP_INFO'" class="popUpInfo">
                            <b-button v-on:click="dropInfoProc" variant="danger" size="sm">삭제</b-button>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </template>
    </b-overlay>
</b-container>
</template>

<script>
import Vue from 'vue'
import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
// import VueGoodTablePlugin from 'vue-good-table';
// import 'vue-good-table/dist/vue-good-table.css'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import store from '@/store/index';

// Vue.use(VueGoodTablePlugin);
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        Vue,
        AgGridVue
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
            paginationPageSize: store.state.paginationPageSize,
            gridOptions:{},
            Loadbusy:false,
            busy:false,
            show : false,


            fields: [
                // {
                //     field: 'server_key',
                //     hidden: true
                // },
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
                    headerName: '사업장',
                    width:'500'
                },
                {
                    field: 'user_name',
                    headerName: '사용자명',
                    width:'500'
                },
                {
                    field: 'user_mail',
                    headerName: '메일',
                    width:'500'
                },
            ],

        }
    },
    computed: {},

    beforeMount() {

    },
    created() {
        this.getConditionList();
        // this.getList();
    },

    methods: {
        clearTimeout() {
            if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null
            }
        },
        setTimeout(callback) {
            this.clearTimeout()
            this.timeout = setTimeout(() => {
            this.clearTimeout()
            callback()
            },10000)
            // 시간 변경
        },
        onLoadHidden() {
            // Return focus to the button once hidden
            this.$refs.pin.focus()
        },
        onClick() {
            this.Loadbusy = true
            // Simulate an async request
            this.setTimeout(() => {
                this.Loadbusy = false
            })
        },
        onShown() {
            this.$refs.dialog.focus()
        },
        onHidden() {},
        onCancel() {
            this.busy = false
        },
        saveblock() {
            this.show = !this.show
            this.resizing()
        },
        showblock() {
            this.show = !this.show
            this.resizing()
        },
        
        resizing() {
            setTimeout(() => {
                this.gridOptions.api.sizeColumnsToFit()
            }, 1);
        },
        getConditionList() {
            //this.config = { headers : { "authorization" : this.$Axios.defaults.headers.common["authorization"] }   }
            // let that = this;
            this.onClick();
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
        },
        getList() {
            
            // if (store.state.ckServer.length == 0) {
            //     alert("사업장은 필수 선택 항목 입니다.")
            //     return;
            // }
            this.onClick();

            axios.post("/api/daedan/cj/ems/setting/MailList", {
                    serverKey:this.comboServers[0].id,
                    pageNo:this.pageNo,
                    pageSz:this.pageSz,
                    userId: store.state.userInfo.userId
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            console.log(res.data.data)
                            this.list = res.data.data;
                            this.listCount = res.data.totalCount;
                              }
                    }
                })
                .catch(err => {
                    alert("검색조건추출 실패 \n" + err);
                    console.log(err)
                })

        },
        saveInfo() {
            // if (!this.user_name) {
            //     alert("성명은 필수 입력 항목 입니다.")
            //     return;
            // }
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
            this.busy = false;
        },
        dropInfo() {
            this.busy = true;
            this.altMsg = "처리중인 기준정보를 삭제 하시겠습니까 ? ";
            this.workTp = "DROP_INFO"
        },
        async dropInfoProc() {
            // let that = this;
            //     await this.$Axios.post("/api/daedan/cj/ems/setting/measurementDrop", {
            //             mno: this.mno,
            //             userId: store.state.userInfo.userId
            //         }, this.config)
            //         .then(res => {
            //             if (res.status === 200) {
            //                 if (res.data.statusCode === 200) {
            //                     that.saveblock();
            //                     that.getList();
            //                 }
            //             }
            //         })
            //         .catch(err => {
            //             alert("측정기별기준정보삭제 실패 \n" + err);
            //         })
            this.busy = false;
        }
    
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.mailInner,
.mailConBox {
    margin: 0 auto;
}


.con_box_right {
    box-sizing: border-box;
    position: relative;
}

.con_box_right>p {
    width: 400px;
    height: 50px;
    font-family: CjFontTitleBold;
    font-size: 24px;
    box-sizing: border-box;
    border-bottom: 5px solid rgb(172, 172, 172);
    padding-left: 10px;
    text-align: left;
}

.mailPlus,.mailList {
    position: absolute;
    top: 30px;
    right: 20px;
    width: 150px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
    text-decoration: none;
    color: black;
}

.mailList{
    right:190px;
}

.mailPlus:hover,
.mailList:hover {
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
    font-family: CjFontBodyRegular;
    font-weight:400;
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

.mailTableWrap .right_list {
    position: relative;
    left: 10px;
    width: 500px;
    height: 670px;
    margin-left: 10px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0;
    box-shadow: 0px 0px 10px 1px #ccc;
}

.mailTableWrap .right_list .popUpTitle {
    font-size: 18px;
}

.mailTableWrap .right_list .btn {
    margin-right: 7px;
    font-size: 15px;
}

.mailTableWrap .card-body>div:nth-child(2)>div {
    margin-top: 20px;
}

.mailBtn {
    height: 30px;
    margin-top: 10px;
}

.mailTableWrap .popUpTitle{
    font-size:18px;
}

.mailTableWrap input{
    max-width: 230px;
    height: 30px;
    margin-top: 10px;
    font-size:14px;
}

.mailTableWrap .regiName {
    font-size: 14px;
    width: 100px;
}


.popUpMessage #form-confirm-label {
    font-size: 28px;
}

.popUpMessage .popUpInfo>button {
    width: 80px;
    height: 50px;
    font-size: 16px;
    border-radius: 7px;
}
</style>
