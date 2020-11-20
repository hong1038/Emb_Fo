<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex;">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>초과이력 대응</p>
                    <div class="measurementDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-7">
                                <div>기간 선택</div>
                                <v-date-picker value="range" is-range />
                                <div class="dateSelect">
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div>
                                <div>~</div>
                                <div class="dateSelect dateSelectTo">
                                    <datetime type="date" v-model="dateTo" class="datetime"></datetime>
                                </div>
                            </div>
                            <div class="col-5">
                                <input class="md_btn01" type="button" v-on:click="getList" value="조회">
                                <input class="md_btn02" type="button" v-on:click="addOn" value="등록">
                                <input class="md_btn03" type="button" v-on:click="excelBtn" value="엑셀 저장">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                        <div class="mt-4 container-fluid excessTable" style="display:flex;">
                            <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize">
                            </ag-grid-vue>
                            <b-card class="right_list" v-if="show">
                                <b-row>
                                    <b-col class="popUpTitle">초과이력 대응 등록</b-col>
                                    <input type="button" class="mmSaveBtn btn btn-success btn-sm" v-on:click="saveInfo" value="저장">
                                    <input type="button" class="mmListBtn btn btn-primary btn-sm" v-on:click="showblock" value="목록">
                                    <input type="button" class="mmListBtn btn btn-danger btn-sm" v-on:click="dropInfo" value="삭제">
                                </b-row>
                                <div>
                                    <b-row>
                                        <b-col class="regiName col-4">일자</b-col>
                                        <b-form-input class="col" v-model="mno" size="sm" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">사업장</b-col>
                                        <b-form-select class="col" v-model="server_key" :options="comboServers" size="sm" disabled></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">분야</b-col>
                                        <b-form-select class="col" v-model="category_cd" :options="comboCategories" size="sm" disabled></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">측정위치</b-col>
                                        <b-form-select class="col" v-model="equipment_name" :options="comboFacilities" size="sm" disabled></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">흡입구 최대</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_max"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">흡입구 평균</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_avg"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">흡입구 최소</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_min"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-3">흡입구 이상점 발생횟수</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">배출구 최대</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="outlet_max"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">배출구 평균</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="outlet_avg"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">배출구 최소</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="outlet_min"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-3">배출구 이상점 발생횟수</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="outlet_"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-2">방지시설 처리효율</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="cause"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-2">조치사항 원인</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="action"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">조치여부</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="action_type"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-2">조치 완료일자</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="action_date"></b-form-input>
                                    </b-row>
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
import Vue from "vue";
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
// import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

Vue.use(Datetime)

//달력관련
//import DatePicker from "v-calendar/lib/components/date-picker.umd"

export default {
    components: {
        Header,
        Left,
        AgGridVue,
        // vue,
        // DatePicker  
    },
    data() {
        return {
            busy:false,
            timeout : null,
            busyPop: false,
            processing: false,
            show:false,

            exInfo: {},
            config: {},
            mode: 'single', //날짜선택방법
            findTps: [{
                value: 'pnelNm',
                text: '판넬명'
            }],
            // dateFr: store.state.szCurMmFr,
            dateFr: "",
            // dateTo: store.state.szCurMmTo,
            dateTo: "",
            gridOptions:{}, 
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [
                {
                    field: '',
                    headerName: '일자',
                    width: '70px'
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '80px'
                },
                {
                    field: 'category',
                    headerName: '분야',
                    width: '70px'
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '120px'
                },
                {
                    field: '',
                    headerName: '흡입구',
                    children: [
                        {
                            field: 'inlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '60px'
                        },
                        {
                            field: 'inlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '60px'
                        },
                        {
                            field: 'inlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '60px'
                        },
                        {
                            field: '',
                            headerName: '이상점 발생횟수',
                            type: 'number',
                            width: '120px'
                        },
                    ]
                },
                {
                    field: '',
                    headerName: '배출구',
                    children: [
                        {
                            field: 'outlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '60px'
                        },
                        {
                            field: 'outlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '60px'
                        },
                        {
                            field: 'outlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '60px'
                        },
                        {
                            field: '',
                            headerName: '이상점 발생횟수',
                            type: 'number',
                            width: '120px'
                        },
                    ]
                },
                {
                    field: 'cause',
                    headerName: '방지시설 처리효율(%)',
                    width: '150px'
                },
                {
                    field: 'action',
                    headerName: '조치사항ㆍ원인',
                    width: '170px'
                },
                {
                    field: 'action_type',
                    headerName: '조치여부',
                    width: '120px'
                },
                {
                    field: 'action_date',
                    headerName: '조치 완료일자',
                    width: '120px'
                },
            ]
        }
    },

    beforeMount() {
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
    },

    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        
        //this.getList(); 여기서 실행하면 최초 실행시 -1일식 차감해서 검색일자가 설정되는 오류 발생됨.
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
            },300)
            // 시간 변경
        },
        onHidden() {
            // Return focus to the button once hidden
            // this.$refs.pin.focus()
        },
        onClick() {
            this.busy = true
            // Simulate an async request
            this.setTimeout(() => {
            this.busy = false
            })
        },
        onCancel() {
            this.busyPop = false
        },
        addOn() {
            // this.mno = null; //관리번호
            // //this.server_key = null; //사업장
            // this.equipment_key = null; //측정위치
            // this.category = null; //측정분야명
            // this.category_cd = null; //측정분야코드
            // this.facility = null; //시설분류
            // this.location = null; //위치분류
            // this.legal_standard = null; //법적기준
            // this.manage_standard = null; //관리기준
            // this.unit = null; //단위
            // this.internal_name = null; //내부관리명
            // this.internal_number = null; //내부관리번호
            // this.public_name = null; //공정명
            // this.odor_number = null; //악취방지시설고유일련번호
            // this.sensors = [];
            this.showblock();
        },
        showblock() {
            this.show = !this.show
        },
        saveblock() {
            this.show = !this.show
        },

        resetPageNo() {
            this.pageNo = 1;
        },
        getList() {
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            if (store.state.ckCate.length == 0) {
                alert("분야는 필수 선택 항목 입니다.")
                return;
            }
            if (this.dateFr === null || this.dateTo === null || this.dateFr === "" || this.dateTo === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            //console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/measurements/measurementsList", {
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
                    serverList: store.state.ckServer,
                    cateList: store.state.ckCate,
                    equipList: store.state.ckEquip,
                    sensorList: store.state.ckSensor,
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
        },eChange(params) {
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
        saveInfo() {
            if (!this.server_key) {
                alert("사업자는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.equipment_key) {
                alert("설치장소는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.category_cd) {
                alert("분야는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.facility) {
                alert("시설분류는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.location) {
                alert("측정위치는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.usedSensors) {
                alert("선택된 분석항목이 없습니다.")
                return;
            }

            let that = this;
            this.$Axios.post("/api/daedan/cj/ems/response/excessSave", {
                    exInfo:this.exInfo,
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

            this.busyPop = true;
            this.altMsg = "처리중인 기준정보를 저장 하시겠습니까 ? ";
            this.workTp = "SAVE_INFO"
        },
        async saveInfoProc() {
            // let that = this;
            // await this.$Axios.post("/api/daedan/cj/ems/setting/measurementSave", {
            //         mno: this.mno,
            //         server_key: this.server_key,
            //         equipment_key: this.equipment_key,
            //         category: this.category_cd,
            //         place: this.location,
            //         facility: this.facility,
            //         public_name : this.public_name,
            //         internal_name: this.internal_name,
            //         internal_numger: this.internal_numger,
            //         legal_standard: this.legal_standard,
            //         manage_standard: this.manage_standard,
            //         ordr_no: this.odor_no,
            //         unit: this.unit,
            //         usedSensors: this.usedSensors,
                    
            //         userId: store.state.userInfo.userId
            //     }, this.config)
            //     .then(res => {
            //         if (res.status === 200) {
            //             if (res.data.statusCode === 200) {
            //                 that.saveblock();
            //                 that.getList();
            //             }
            //         }
            //     })
            //     .catch(err => {
            //         alert("측정기별기준정보저장 실패 \n" + err);
            //     })
            this.busyPop = false;

        },
        dropInfo() {
            this.busyPop = true;
            this.altMsg = "처리중인 기준정보를 샥제 하시겠습니까 ? ";
            this.workTp = "DROP_INFO"
        },
        async dropInfoProc() {
            // let that = this;
            // await this.$Axios.post("/api/daedan/cj/ems/setting/measurementDrop", {
            //         mno: this.mno,
            //         userId: store.state.userInfo.userId
            //     }, this.config)
            //     .then(res => {
            //         if (res.status === 200) {
            //             if (res.data.statusCode === 200) {
            //                 that.saveblock();
            //                 that.getList();
            //             }
            //         }
            //     })
            //     .catch(err => {
            //         alert("측정기별기준정보삭제 실패 \n" + err);
            //     })
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

.measurementDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.measurementDateCheck>div>div>div {
    float: left;
    height: 100%;
}

.measurementDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.measurementDateCheck>div>div>div:nth-child(2),
.measurementDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.measurementDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.measurementDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.md_btn01,
.md_btn02,
.md_btn03 {
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
}

.md_btn01 {
    right: 360px;
}

.md_btn02 {
    right: 190px;
}
.md_btn03{
    right: 20px;
}

.measurementDateCheck>div>div:nth-child(2)>input:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.excessTable *{
    font-size:12px;
}

.ag-header-group-text{
    display:block;
    margin:0 auto;
}
.excessTable .ag-header-group-cell-label{
    overflow:auto;
}

.excessTable .ag-icon{
    display:none;
}

.excessTable .right_list {
    position: relative;
    left: 10px;
    width: 500px;
    height: 650px;
    margin-left: 10px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0;
    overflow-y: scroll;
    box-shadow: 0px 0px 10px 1px #ccc;
}
.excessTable .right_list .popUpTitle {
    font-size: 18px;
}
.excessTable .right_list .btn {
    margin-right: 7px;
    font-size: 15px;
    height: 30px;
    margin-top: 20px;
}
.excessTable .right_list .regiName {
    font-size: 16px;
    word-break: keep-all;
}

.excessTable .right_list .regiName+input,
.excessTable .right_list .regiName+select {
    height: 30px;
    margin-top: 10px;
}


.excessTable .right_list .lh-2+input, .excessTable .right_list .lh-2+select{
    margin-top:25px;
}

.excessTable .right_list .lh-3+input, .excessTable .right_list .lh-3+select{
    margin-top:35px;
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
