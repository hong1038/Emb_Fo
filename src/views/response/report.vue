<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid">
                    <p>월말 보고</p>
                    <div class="reportDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-7">
                                <div>월 선택</div>
                                <div class="dateSelect">
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dateFr" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="date" label="" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" type="month" no-title scrollable locale="ko">
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                    <!-- <datetime type="date" v-model="dateFr" class="datetime"></datetime> -->
                                </div>
                            </div>
                            <div class="col-5 report_clickBox">
                                <input type="button" value="조회" class="r_btn01" v-on:click="getList">
                                    <input type="button" value="등록" class="r_btn02" v-on:click="insertBtn">
                                    <input type="button" value="엑셀 저장" class="r_btn03" v-on:click="excelBtn">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="Loadbusy" rounded opacity="0.7" spinner-variant="primary" @hidden="onLoadHidden">
                    <div class="systemtableWrap mt-4 container-fluid" style="display:flex">
                        <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" rowSelection="single" @row-clicked="addOn" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize"/>
                        <b-card class="right_list" v-if="show">
                                <b-row>
                                    <b-col class="popUpTitle">월말 보고<br>등록</b-col>
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
                                        <b-form-select class="col" v-model="category_cd" :options="comboCategories" size="sm" ></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">문제점 / 이슈사항</b-col>
                                        <b-form-input class="col" v-model="problem" size="sm"></b-form-input>
                                    </b-row>
                                    <b-row class="line1_box">
                                        <b-col class="regiName col-4">대응방안</b-col>
                                        <b-form-input class="col" v-model="action" size="sm"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">개선일정</b-col>
                                        <b-form-input class="col" type="date" size="sm" v-model="prevention_date"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">완료여부</b-col>
                                        <b-form-select class="col" v-model="abnormal_type" size="sm">
                                            <option value="진행">진행</option>
                                            <option value="완료">완료</option>
                                        </b-form-select>
                                    </b-row>
                                    <!-- <b-row>
                                        <b-col class="regiName col-4">측정구분</b-col>
                                        <b-form-select class="col" v-model="category_cd" :options="comboServers" size="sm">
                                        </b-form-select>
                                    </b-row>  -->
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
        Vue,
        AgGridVue
        // DatePicker,
        // BootstrapVue,
    },
    computed: {
        currentDate() {
            let s = new Date().toLocaleDateString().slice(0, 8);
            return s;
        }
    },
    data() {
        return {
            Loadbusy:false,
            timeout : null,
            busyPop : false,


            onRowClicked: "",
            busy: false,
            processing: false,
            altMsg: '',
            workTp: '',
            config: {},

            comboServers: null, //사업장   
            comboCategories: null, //측청분야     
            comboEquipments: null, //측정위치
            comboFacilities: null, //시설분류
            comboLocations: null, //위치분류

            sensors: null,
            usedSensors: [], //선택된분석항목(센서)

            measurementInfo: {},
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

            gridOptions: {},

            paginationPageSize: store.state.paginationPageSize,

            mode: 'single', //날짜선택방법
            dateFr: '',
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            // perPage: 13,
            pageSz:store.state.paginationPageSize,
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
                    width: '250px'
                },
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '250px'
                },
                {
                    field: 'problem',
                    headerName: '문제점/이슈사항',
                    width: '400px'
                },
                {
                    field: 'action',
                    headerName: '대응방안',
                    width: '300px'
                },
                {
                    field: 'prevention_date',
                    headerName: '개선일정',
                    width: '150px'
                },
                {
                    field: 'abnormal_type',
                    headerName: '완료여부',
                    width: '150px'
                },
            ],
        }
    },

    beforeMount() {
        this.gridOptions.api.sizeColumnsToFit()
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
        getList() { //구매품의중인 자재목록
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            if (this.dateFr == null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }
            

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/response/reportDataList", {
                    dateFr: this.dateFr,
                    serverList: store.state.ckServer,
                    cateList: store.state.ckCate,
                    // equipList: store.state.ckEquip,
                    // sensorList: store.state.ckSensor,
                    findTp: this.findTp,
                    findSz: this.findSz,
                    pageNo: this.pageNo,
                    pageSz: this.pageSz,
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
        addOn(obj) {
            this.server_key = obj.data.server_key
            this.category_cd = obj.data.category_cd
            this.problem = obj.data.problem
            this.prevention_date = obj.data.prevention_date
            this.abnormal_type = obj.data.abnormal_type
            this.action = obj.data.action
            this.showblock();
        },
        // 엑셀저장버튼 클릭
        excelBtn() {
            this.gridOptions.api.exportDataAsExcel({});
        },
        // 그래프버튼 클릭
        graphBtn() {
            console.log()
        },
        insertBtn() {
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
        saveInfo(){
            if (!this.server_key) {
                alert("사업자는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.category_cd) {
                alert("구분은 필수 선택 항목 입니다.")
                return;
            }
            if (!this.problem) {
                alert("문제점/이슈사항은 필수 선택 항목 입니다.")
                return;
            }
            if (!this.action) {
                alert("대응방안은 필수 선택 항목 입니다.")
                return;
            }
            if (!this.prevention_date) {
                alert("개선일정은 필수 선택 항목 입니다.")
                return;
            }
            if (!this.abnormal_type) {
                alert("완료여부는 필수 선택 항목 입니다.")
                return;
            }
            this.busyPop = true;
            this.altMsg = "처리중인 기준정보를 저장 하시겠습니까 ? ";
            this.workTp = "SAVE_INFO"
        },
        async saveInfoProc() {
            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/response/reportDataSave", {
                    server_key: this.server_key,
                    equipment_key:this.equipment_key,
                    category_cd:this.category_cd,
                    problem:this.problem,
                    action:this.action,
                    prevention_date:this.prevention_date,
                    abnormal_type:this.abnormal_type,
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
            this.busyPop = false;

        },
        dropInfo() {
            this.busyPop = true;
            this.altMsg = "처리중인 기준정보를 샥제 하시겠습니까 ? ";
            this.workTp = "DROP_INFO"
        },
        async dropInfoProc() {
        //     let that = this;
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
.reportDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.reportDateCheck>div>div>div {
    float: left;
    height: 100%;
}

.reportDateCheck>div>div>div:nth-child(1) {
    width: 70px;
    font-size: 16px;
    line-height: 32px;
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
}

.reportDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.r_btn01,
.r_btn02,
.r_btn03 {
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

.r_btn01 {
    right: 360px;
}

.r_btn02 {
    right: 190px;
    text-decoration: none;
    color: black;
    line-height: 30px;
}

.v-application a {
    color: black;
}

.r_btn03 {
    right: 20px;
}

.r_btn01:hover,
.r_btn02:hover,
.r_btn03:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
    text-decoration: none;
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

.dateSelect input {
    box-sizing: border-box;
    padding-left: 10px;
}
.systemtableWrap .row:not(.line1_box)>input,
.systemtableWrap .row>select {
    max-width: 210px;
}

.systemtableWrap .line1_box>input {
    max-width: 210px;
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
.systemtableWrap .right_list .regiName {
    font-size: 16px;
    word-break: keep-all;
}

.systemtableWrap .right_list .regiName+input,
.systemtableWrap .right_list .regiName+select {
    height: 30px;
    margin-top: 10px;
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
