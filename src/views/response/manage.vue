<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid">
                    <p>운영 특이사항</p>
                    <div class="manageDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-7">
                                <div>기간 선택</div>
                                <div class="dateSelect">
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div>
                                <div> ~ </div>
                                <div class="dateSelect dateSelectTo">
                                    <datetime type="date" v-model="dateTo" class="datetime"></datetime>
                                </div>
                            </div>
                            <div class="col-5">
                                <input type="button" value="조회" class="m_btn01" v-on:click="getList">
                                <input type="button" value="등록" class="m_btn02" v-on:click="addOn2">
                                <input type="button" value="엑셀 저장" class="m_btn03" v-on:click="excelBtn">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="Loadbusy" rounded opacity="0.7" spinner-variant="primary" @hidden="onLoadHidden">
                    <div class="manageTableWrap mt-4 container-fluid" style="display:flex">
                        <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" rowSelection="single" @row-clicked="addOn" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize"/>
                    <b-card class="right_list" v-if="show">
                                <b-row>
                                    <b-col class="popUpTitle">운영 특이사항 등록</b-col>
                                    <input type="button" class="systemSaveBtn btn btn-success btn-sm" v-on:click="saveInfo" value="저장">
                                    <input type="button" class="systemListBtn btn btn-primary btn-sm" v-on:click="showblock" value="목록">
                                    <input type="button" class="systemListBtn btn btn-danger btn-sm" v-on:click="dropInfo" value="삭제">
                                </b-row>
                                <div>
                                    <b-row>
                                        <b-col class="regiName col-4">사업장</b-col>
                                        <b-form-select class="col" v-model="server_key" :options="comboServers" size="sm"></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">분야</b-col>
                                        <b-form-select class="col" v-model="category" :options="comboCategories" size="sm" ></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">측정위치</b-col>
                                        <b-form-select class="col" v-model="equipment_key" :options="comboEquipments" size="sm"></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">측정일시</b-col>
                                        <b-form-input class="col" type="date" size="sm" v-model="prevention_date"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">특이사항</b-col>
                                    </b-row>
                                        <b-form-textarea class="col" style="max-height:306px;min-height:306px" type="text" size="sm" v-model="issue"></b-form-textarea>
                                </div>
                        </b-card>
                    </div>
                    </b-overlay>
                </div>
            </div>
        </div>
    </div>

    <b-overlay :show="busyPop" no-wrap @shown="onShown" @hidden="onHidden">
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
import store from "@/store/index";
import axios from 'axios';
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

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Datetime)
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        AgGridVue
        // DatePicker,
        // BootstrapVue,
    },
    data() {
        return {
            Loadbusy:false,
            timeout : null,
            busyPop: false,

            config: {},
            mode: 'single', //날짜선택방법

            onRowClicked: "",
            busy: false,
            processing: false,
            altMsg: '',
            workTp: '',

            comboServers: null, //사업장   
            comboCategories: null, //측청분야     
            comboEquipments: null, //측정위치
            comboFacilities: null, //시설분류
            comboLocations: null, //위치분류

            sensors: null,
            usedSensors: [], //선택된분석항목(센서)

            measurementInfo: {},
            prevention_date:null,
            action:null,
            mno: null, //관리번호
            server_key: null, //사업장
            equipment_key: null, //측정위치
            category: null, //측정분야명
            category_cd: null, //측정분야코드
            facility: null, //시설분류
            location: null, //위치분류
            legal_standard: null, //법적기준
            manage_standard: null, //관리기준
            unit: null, //단위
            internal_name: null, //내부관리명
            internal_number: null, //내부관리번호
            public_name: null, //공정명
            odor_number: null, //악취방지시설고유일련번호
            sensorList: [], //분석항목리스트

            date: "",
            show: false,

            gridOptions: {

            },

            paginationPageSize: store.state.paginationPageSize,


            dateFr: store.state.szCurMmFr,
            // dateFr: "",
            dateTo: store.state.szCurMmTo,
            // dateTo: "",
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            pageSz: 13,
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
                //     field: 'category',
                //     hidden: true
                // },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '130px'
                },
                {
                    field: 'category_cd',
                    headerName: '분야',
                    width: '100px'
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '250px'
                },
                {
                    field: 'prevention_date',
                    headerName: '날짜',
                    width: '150px'
                },
                {
                    field: 'issue',
                    headerName: '특이사항',
                    width: '880px'
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
    watch:{
        server_key(){
            this.getEquips()
        }
    
    },
    beforeMount() {        
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
        this.gridOptions.api.sizeColumnsToFit()
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
            },500)
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

        test() {
            console.log(this.gridOptions.api)
        },
        onShown() {
            this.$refs.dialog.focus()
        },
        onHidden() {

        },
        onCancel() {
            this.busyPop = false
        },
        saveblock() {
            this.show = !this.show
            this.resizing()
        },
        showblock() {
            this.show = !this.show
            this.resizing()
        },
        resetPageNo() {
            this.pageNo = 1;
        },
        resizing() {
            setTimeout(() => {
                this.gridOptions.api.sizeColumnsToFit()
            }, 1);
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
                        }
                    }
                })
                .catch(err => {
                    alert("서버목록/수집분야(악취,수질,대기) 추출 실패 \n" + err);
                    console.log(err)
                })

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
                            if (that.measurementInfo.equipment_key) {
                                console.log(res.data.data)
                                that.equipment_key = that.measurementInfo.equipment_key;
                            }
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
            this.$Axios.post("/api/daedan/cj/ems/response/manageDataList", {
                    serverKey:this.server_key,
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
                    serverList: store.state.ckServer,
                    // cateList: store.state.ckCate,
                    // equipList: store.state.ckEquip,
                    // sensorList: store.state.ckSensor,
                    findTp: this.findTp,
                    findSz: this.findSz,
                    pageNo: this.pageNo,
                    pageSz: 10000,
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
            console.log();
        },
        addOn(obj) {
            console.log(obj)
            this.rm_key = obj.data.rm_key;
            this.equipment_key = obj.data.equipment_key; //측정위치
            this.category = obj.data.category; //측정분야명
            this.category_cd = obj.data.category_cd; //측정분야코드
            this.prevention_date = obj.data.prevention_date
            this.issue = obj.data.issue
            this.server_key = obj.data.server_key; //사업장
            this.showblock();
        },
        // 등록버튼 클릭시
        addOn2() {
            this.rm_key = null;
            this.equipment_key = null; //측정위치
            this.category = null; //측정분야명
            this.category_cd = null; //측정분야코드
            this.prevention_date = null
            this.issue = null
            this.server_key = null; //사업장
            this.showblock();
        },
        saveInfo() {
            if (!this.server_key) {
                alert("사업자는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.category) {
                alert("분야는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.equipment_key) {
                alert("측정위치는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.prevention_date) {
                alert("측정일시는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.issue) {
                alert("특이사항은 필수 선택 항목 입니다.")
                return;
            }
            this.busyPop = true;
            this.altMsg = "처리중인 등록정보를 저장 하시겠습니까 ? ";
            this.workTp = "SAVE_INFO"
        },
        async saveInfoProc() {
            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/response/manageDataSave", {
                    rm_key:this.rm_key,
                    server_key: this.server_key,
                    equipment_key: this.equipment_key,
                    category_cd: this.category_cd,
                    category: this.category,
                    prevention_date:this.prevention_date,
                    issue:this.issue,                    
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
                    alert("운영 특이사항 정보저장 실패 \n" + err);
                })
            this.busyPop = false;
        },
        dropInfo() {
            this.busyPop = true;
            this.altMsg = "처리중인 기준정보를 샥제 하시겠습니까 ? ";
            this.workTp = "DROP_INFO"
        },
        async dropInfoProc() {
            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/response/manageDel", {
                    rmKey: this.rm_key,
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
                    alert("측정기별기준정보삭제 실패 \n" + err);
                })
            this.busyPop = false;
        },
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
.manageDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.manageDateCheck>div>div>div {
    float: left;
}

.manageDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.manageDateCheck>div>div>div:nth-child(2),
.manageDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.manageDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.manageDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.v-application a {
    color: black;
    text-decoration: none;
}

.m_btn01,
.m_btn02,
.m_btn03 {
    position: absolute;
    top: 0;
    width: 150px;
    height: 30px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
    font-size: 16px;
    text-decoration: none;
}

.m_btn01 {
    right: 360px;
}

.m_btn02 {
    right: 190px;
    line-height: 30px;
}

.m_btn03 {
    right: 20px;
}

.m_btn01:hover,
.m_btn02:hover,
.m_btn03:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

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
.reportDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.reportDateCheck>div>div>div {
    float: left;
}

.reportDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.reportDateCheck>div>div>div:nth-child(2),
.reportDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.reportDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align:center;
}

.reportDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.v-application a {
    color: black;
}

.dateSelect input {
    box-sizing: border-box;
    padding-left: 10px;
}
.manageTableWrap .row:not(.line1_box)>input,
.manageTableWrap .row>select {
    max-width: 210px;
}

.manageTableWrap .line1_box>input {
    max-width: 210px;
}
.manageTableWrap .right_list {
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
.manageTableWrap .right_list .popUpTitle {
    font-size: 18px;
}
.manageTableWrap .right_list .btn {
    margin-right: 7px;
    font-size: 15px;
    height: 30px;
    margin-top: 20px;
}
.manageTableWrap .right_list .regiName {
    font-size: 16px;
    word-break: keep-all;
}

.manageTableWrap .right_list .regiName+input,
.manageTableWrap .right_list .regiName+select {
    height: 30px;
    margin-top: 10px;
    font-size:14px;
}

.manageTableWrap textarea{
    font-size:16px;
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
</style>
