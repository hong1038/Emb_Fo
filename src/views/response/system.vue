<template>
<b-container fluid>
    <div class="inner">
        <Header></Header>
        <div style="display:flex">
            <Left></Left>
            <div class="inner">
                <div class="con">
                    <div class="con_box_right container-fluid">
                        <p>측정기/설비 이상 대응</p>
                        <div class="systemDateCheck container-fluid mt-4">
                            <div class="row">
                                <div class="col-7">
                                    <div>기간 선택 : </div>
                                    <div class="dateSelect">
                                        <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                    </div>
                                    <div>~</div>
                                    <div class="dateSelect dateSelectTo">
                                        <datetime type="date" v-model="dateTo" class="datetime"></datetime>
                                    </div>
                                </div>
                                <div class="col-5">
                                    <input type="button" value="조회" class="s_btn01" v-on:click="getList">
                                    <input type="button" value="등록" class="s_btn02" v-on:click="insertBtn">
                                    <input type="button" value="엑셀 저장" class="s_btn03" v-on:click="excelBtn">              
                                </div>
                            </div>
                        </div>
                        <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                        <div class="systemtableWrap mt-4 container-fluid" style="display:flex">
                            <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" rowSelection="single" @row-clicked="getList" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" :onRowClicked="onRowClicked" />
                            <!--
                        <b-card class="elevation-5"  bg-variant="light"  img-alt="Image" img-top height="100%" tag="article" v-if="show">  
                        -->
                            <b-card class="right_list" v-if="show">
                                <b-row>
                                    <b-col class="popUpTitle">측정기 / 설비 이상<br>대응 정보 등록</b-col>
                                    <input type="button" class="systemSaveBtn btn btn-success btn-sm" v-on:click="saveInfo" value="저장">
                                    <input type="button" class="systemListBtn btn btn-primary btn-sm" v-on:click="showblock" value="목록">
                                    <input type="button" class="systemListBtn btn btn-danger btn-sm" v-on:click="dropInfo" value="삭제">
                                </b-row>
                                <div>
                                    <b-row v-if="hide">
                                        <b-col class="regiName col-4">키값</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="erInfo.rs_key"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">사업장</b-col>
                                        <b-form-select class="col" v-model="erInfo.server_key" :options="comboServers" size="sm"/>
                                    </b-row>

                                    <b-row>
                                        <b-col class="regiName col-4">분야</b-col>
                                        <b-form-select class="col" v-model="erInfo.category_cd" :options="comboCategories" size="sm"> 
                                        </b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">측정위치</b-col>
                                        <b-form-select class="col" v-model="erInfo.equipment_key" :options="comboEquipments" size="sm"></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">유형</b-col>
                                        <b-form-select class="col" v-model="erInfo.abnormal_type" size="sm">
                                            <option disabled value="">==선택==</option>
                                            <option>센서이상</option>
                                            <option>통신이상</option>
                                            <option>방지시설이상</option>
                                            <option>PC이상</option>
                                        </b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">발생일자</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="erInfo.rs_date"></b-form-input>
                                    </b-row>

                                    <b-row>
                                        <b-col class="regiName col-4">문제점 / 이슈사항</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="erInfo.cause"></b-form-input>
                                    </b-row>
                                    <b-row class="line1_box">
                                        <b-col class="regiName col-4">대응방안</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="erInfo.action"></b-form-input>
                                    </b-row>

                                    <b-row>
                                        <b-col class="regiName col-4">개선일정</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="erInfo.action_date"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">완료여부</b-col>
                                        <b-form-select class="col" v-model="erInfo.action_type" size="sm">
                                            <option value="진행">진행</option>
                                            <option value="완료">완료</option>
                                        </b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">완료일자</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="erInfo.complete_date"></b-form-input>
                                    </b-row>
                                </div>
                            </b-card>
                        </div>
                        </b-overlay>
                    </div>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
import store from "@/store/index";
import Vue from "vue";
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(Datetime)
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        AgGridVue,
        // DatePicker,
        // BootstrapVue,
    },
    data() {
        return {
            busy:false,
            timeout : null,

            erInfo:{},
            gridOptions:{},
            config: {},
            mode: 'single', //날짜선택방법
            // dateFr: store.state.szCurMmFr,
            dateFr: "",
            // dateTo: store.state.szCurMmTo,
            dateTo: "",

            show: false,
            hide: false,

            paginationPageSize: store.state.paginationPageSize,

            comboServers: [], //사업장   
            comboCategories: [], //분야     
            comboEquipments: [], //측정위치
            comboFacilities: [], //시설분류
            comboLocations: [], //위치분류

            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [
                // {
                //     field: 'serverKey',
                //     hidden: true
                // },
                // {
                //     field: 'equipmentKey',
                //     hidden: true
                // },
                // {
                //     field: 'sensorKey',
                //     hidden: true
                // },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '140px'
                },
                {
                    field: 'category',
                    headerName: '분야',
                    width: '160px'
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '180px'
                },
                {
                    field: 'abnormal_type',
                    headerName: '유형',
                    width: '160px'
                },
                {
                    field: 'response_date',
                    headerName: '발생일자',
                    width: '140px'
                },
                {
                    field: '',
                    headerName: '문제점 개선 계획',
                    children: [
                        {
                            field: 'cause',
                            headerName: '문제점/이슈사항',
                            width: '180px'
                        },
                        {
                            field: 'action',
                            headerName: '대응방안',
                            width: '180px'
                        },
                        {
                            field: 'action_date',
                            headerName: '개선일정',
                            width: '120px'
                        },
                    ]
                },
                {
                    field: 'action_type',
                    headerName: '완료여부',
                    width: '120px'
                },
                {
                    field: 'complete_date',
                    headerName: '완료일자',
                    width: '120px'
                },
            ],
        }
    },
    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        this.getConditionList();
    },
    beforeDestroy() {
      this.clearTimeout()
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
                            that.comboCategories = res.data.data.cateList; //수집분야(악취,대기,수질)
                            that.category_cd = res.data.data.category_cd
                        }
                    }
                })
                .catch(err => {
                    alert("서버목록/수집분야(악취,수질,대기) 추출 실패 \n" + err);
                    console.log(err)
                })
                // this.getEquips()
        },
        async getEquips() {
            console.log("getEquips.server_key = " + this.server_key)
            let that = this;

            await axios.post("/api/daedan/cj/ems/cmmn/comboEquipPosList", {
                    serverKey: this.server_key,
                    userId: store.state.userInfo.userId

                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.comboEquipments = res.data.data.equipPos; //측정위치
                        }
                    }
                })
                .catch(err => {
                    alert("측정위치추출 실패 \n" + err);
                    console.log(err)
                })
        },
        async getFacPos() {
            console.log("getFacPos.category_cd = " + this.category_cd)
            let that = this;

            await axios.post("/api/daedan/cj/ems/cmmn/comboFacPosList", {
                    category: this.category_cd,
                    userId: store.state.userInfo.userId

                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.comboFacilities = res.data.data.facilities; //서설분륳
                            that.comboLocations = res.data.data.locations; //위치분류
                            if (that.measurementInfo.facility) {
                                that.facility = that.measurementInfo.facility; //시설분류 설정    
                            }
                            if (that.measurementInfo.location) {
                                that.location = that.measurementInfo.location; //위치분류 설정    
                            }
                        }
                    }
                })
                .catch(err => {
                    alert("시설및위치분류추출 실패 \n" + err);
                    console.log(err)
                })
        },
        async getSensors() {
            //console.log("getSensors.server_key = " + this.server_key)
            //console.log("getSensors.equipment_key = " + this.equipment_key)
            let that = this;

            await axios.post("/api/daedan/cj/ems/cmmn/comboSensorList", {
                    serverKey: this.server_key,
                    equipmentKey: this.equipment_key,
                    userId: store.state.userInfo.userId

                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.sensors = res.data.data.sensors; //센서목록
                        }
                    }
                })
                .catch(err => {
                    alert("측정위치별센서추출 실패 \n" + err);
                    console.log(err)
                })
        },
        resetPageNo() {
            this.pageNo = 1;
        },
        getList() { //구매품의중인 자재목록
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            if (this.dateFr === null || this.dateTo === null || this.dateFr === "" || this.dateTo === "") {
                alert("날짜를 선택해주세요.")
                return;
            }
            
            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/response/systemDataList", {
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
                    serverList: store.state.ckServer,
                    pageNo: this.pageNo,
                    pageSz: this.perPage,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.list = res.data.data
                            that.listCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
        },

        saveInfo(){
            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/response/systemDataSave", {
                    erInfo:this.erInfo,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.erInfo = res.data.data
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
        },
        dropInfo(){
            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/response/systemDataSave", {
                    erInfo:this.erInfo,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.erInfo = res.data.data
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
        },
        onPageChange(params) {
            this.pageNo = params.currentPage;
            this.getList();
        },
        onRowClick: function (obj) {
            console.log("onRowClck.obj = " + obj);
        },
        // 엑셀저장버튼 클릭
        excelBtn() {
            this.gridOptions.api.exportDataAsExcel({});
        },
        // 그래프버튼 클릭
        graphBtn() {

        },
        insertBtn() {
            this.show = true

        },
        showblock() {
            this.show = false
        },
        onRowClicked() {
            this.busy = true
        }
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

/* Top DateCheck , search and Excel Save*/
.systemDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.systemDateCheck>div>div>div {
    float: left;
    height: 100%;
}

.systemDateCheck>div>div>div:nth-child(1) {
    width: 70px;
    font-size: 16px;
    line-height: 22px;
    margin-right: 10px;
}

.systemDateCheck>div>div>div:nth-child(2),
.systemDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.systemDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
}

.systemDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.s_btn01,
.s_btn02,
.s_btn03 {
    position: absolute;
    top: -10px;
    display: block;
    width: 150px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
    font-size: 16px;
}

.s_btn01 {
    right: 360px;
}

.s_btn02 {
    right: 190px;
}

.s_btn03 {
    right: 20px;
}

.s_btn01:hover,
.s_btn02:hover,
.s_btn03:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.systemtableWrap .right_list {
    position: relative;
    left: 10px;
    width: 500px;
    height: 635px;
    margin-left: 10px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0;
    overflow-y: scroll;
    box-shadow: 0px 0px 10px 1px #ccc;
}

.systemtableWrap .right_list .popUpTitle {
    font-size: 18px;
}

.systemtableWrap .right_list .btn {
    margin-right: 7px;
    font-size: 15px;
    height: 30px;
    margin-top: 20px;
}

.measurementPlus:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
    text-decoration: none;
}

.systemtableWrap .row:not(.line1_box)>input,
.systemtableWrap .row>select {
    max-width: 210px;
}

.systemtableWrap .line1_box>input {
    max-width: 210px;
}

.systemtableWrap .right_list .regiName {
    font-size: 16px;
    word-break: keep-all;
}

.systemtableWrap .right_list .regiName+input,
.systemtableWrap .right_list .regiName+select {
    height: 30px;
    margin-top: 10px;
}

.measurementBox .check_list {
    position: relative;
    left: -45px;
}

.popUpMessage #form-confirm-label {
    font-size: 28px;
    font-family: 'Noto Sans KR';
}

.popUpMessage .popUpInfo>button {
    width: 80px;
    height: 50px;
    font-size: 16px;
    border-radius: 7px;
}

.right_list::-webkit-scrollbar {
    width: 8px;
    border-radius: 10px;
}

.right_list::-webkit-scrollbar-track {
    background-color: #cacaca;
    border-radius: 10px;
}

.right_list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #1467d3;
}

.right_list::-webkit-scrollbar-button {
    width: 0;
    height: 0;
}
</style>
