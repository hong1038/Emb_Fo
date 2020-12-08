<template>
<b-container fluid>
    <div class="inner">
        <Header></Header>
        <Left></Left>
        <div style="display:flex">
            <div class="inner">
                <div class="con">
                    <div class="con_box_right container-fluid float-left">
                        <p>변경점 대응</p>
                        <div class="changeDateCheck container-fluid mt-4">
                            <div class="row">
                                <div class="col-9">
                                    <div>기간 선택 : </div>
                                    <div class="dateSelect">
                                        <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                    </div>
                                    <div>~</div>
                                    <div class="dateSelect dateSelectTo">
                                        <datetime type="date" v-model="dateTo" class="datetime"></datetime>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <input type="button" class="c_btn01" value="조회" v-on:click="getList">
                                    <input type="button" class="c_btn02" value="등록" v-on:click="addOn2">
                                    <input type="button" class="c_btn03" value="엑셀 저장" v-on:click="excelBtn">
                                </div>
                            </div>
                        </div>
                        <b-overlay :show="Loadbusy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                        <div class="mt-4 container-fluid changeTableWrap" style="display:flex">
                            <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" rowSelection="single" @row-clicked="addOn" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" />
                            <b-card class="right_list" v-if="show">
                                <b-row>
                                    <b-col class="popUpTitle">변경점<br>대응 등록</b-col>
                                    <input type="button" class="systemSaveBtn btn btn-success btn-sm" v-on:click="saveInfo" value="저장">
                                    <input type="button" class="systemListBtn btn btn-primary btn-sm" v-on:click="showblock" value="목록">
                                    <input type="button" class="systemListBtn btn btn-danger btn-sm" v-on:click="dropInfo" value="삭제">
                                </b-row>
                                <div>
                                    <b-row>
                                        <b-col class="regiName col-4">일자</b-col>
                                        <b-form-input class="col" v-model="prevention_date" size="sm" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">사업장</b-col>
                                        <b-form-select class="col" v-model="server_key" :options="comboServers" size="sm" disabled> 
                                        </b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">구분</b-col>
                                        <b-form-select class="col" v-model="category_cd" :options="comboCategories" size="sm" disabled></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">측정위치</b-col>
                                        <b-form-select class="col" v-model="equipment_key" :options="comboEquipments" size="sm" disabled></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">흡입구 최대</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_max_value" readonly></b-form-input>
                                    </b-row>

                                    <b-row>
                                        <b-col class="regiName col-4">흡입구 평균</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_avg_value" readonly></b-form-input>
                                    </b-row>
                                    <b-row class="line1_box">
                                        <b-col class="regiName col-4">흡입구 최소</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_min_value" readonly></b-form-input>
                                    </b-row>

                                    <b-row>
                                        <b-col class="regiName col-4 lh-3">흡입구 이상점 발생여부</b-col>
                                        <b-form-select class="col" v-model="occur" :options="occurBox" size="sm" disabled>
                                        </b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-4">변경점 / 이상점 확인결과 원인</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="cause"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">조치사항</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="action"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">조치여부</b-col>
                                        <b-form-select class="col" v-model="action_type" size="sm">
                                            <option value="진행">진행</option>
                                            <option value="완료">완료</option>
                                        </b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-2">조치 완료일자</b-col>
                                        <b-form-input class="col" type="date" size="sm" v-model="action_date"></b-form-input>
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
import axios from 'axios';
import store from "@/store/index";
import Vue from "vue";
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

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
            Loadbusy:false,
            timeout : null,
            show:false,
            hide:false,
            busyPop: false,

            comboServers: null, //사업장   
            comboCategories: null, //측청분야     
            comboEquipments: null, //측정위치
            comboFacilities: null, //시설분류
            comboLocations: null, //위치분류

            equipment_key: null, //측정위치
            measurementInfo: {},
            chInfo:{},
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
                    field: 'prevention_date',
                    headerName: '일자',
                    width: '120px'
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '100px'
                },
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '80px'
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
                            width: '80px'
                        },
                        {
                            field: 'inlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: 'inlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: 'procRate',
                            headerName: '이상점 발생여부',
                            type: 'number',
                            width: '150px'
                        },
                    ]
                },
                // {
                //     field: 'cause',
                //     headerName: '변경점 / 이상점 확인결과 원인',
                //     width: '230px'
                // },
                // {
                //     field: 'action',
                //     headerName: '조치사항',
                //     width: '170px'
                // },
                // {
                //     field: 'action_type',
                //     headerName: '조치여부',
                //     width: '165px'
                // },
                // {
                //     field: 'action_date',
                //     headerName: '조치 완료일자',
                //     width: '170px'
                // },
            ],
        }
    },
    watch: {
        server_key() {
            if (!this.server_key) return;
            this.getEquips();
        },
        category_cd() {
            if (!this.category_cd) return;
            this.getFacPos();
        },
        equipment_key() {
            if (!this.server_key) return;
            if (!this.equipment_key) return;
            this.getSensors();
        },
        //usedSensors(){
        //    console.log("usedSensor = " + this.usedSensors)
        //},
    },
    mounted() {
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
    beforeMount(){
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
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
            },200)
            // 시간 변경
        },
        onHidden() {
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
        onCancel() {
            this.busyPop = false
        },
        addOn(obj) {
            this.server_key = obj.data.server_key
            this.equipment_key = obj.data.equipment_key
            this.equipment_name = obj.data.equipment_name
            this.prevention_date = obj.data.prevention_date
            this.server_name = obj.data.server_name
            this.category = obj.data.category
            this.category_cd = obj.data.category_cd
            this.inlet_max_value = obj.data.inlet_max_value
            this.inlet_min_value = obj.data.inlet_max_value
            this.inlet_avg_value = obj.data.inlet_avg_value
            this.cause = obj.data.cause
            this.action = obj.data.action
            this.action_type = obj.data.action_type
            this.action_date = obj.data.action_date
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
        addOn2(){
            this.showblock();
        },
        showblock() {
            this.show = !this.show
            // this.resizing()
        },
        resizing() {
            setTimeout(() => {
                this.gridOptions.api.sizeColumnsToFit()
            }, 1);
        },
        resetPageNo() {
            this.pageNo = 1;
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
            //console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/response/changeList", {
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
                    serverList: store.state.ckServer,
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
                    alert("변경점대응목록 추출 실패 \n" + err);
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
        saveInfo() {
            // if (!this.server_key) {
            //     alert("측정장소는 필수 선택 항목 입니다.")
            //     return;
            // }
            // if (!this.equipment_key) {
            //     alert("설치장소는 필수 선택 항목 입니다.")
            //     return;
            // }
            // if (!this.category_cd) {
            //     alert("분야는 필수 선택 항목 입니다.")
            //     return;
            // }
            // if (!this.facility) {
            //     alert("시설분류는 필수 선택 항목 입니다.")
            //     return;
            // }
            // if (!this.location) {
            //     alert("측정위치는 필수 선택 항목 입니다.")
            //     return;
            // }
            // if (!this.usedSensors) {
            //     alert("선택된 분석항목이 없습니다.")
            //     return;
            // }
            this.busyPop = true;
            this.altMsg = "처리중인 기준정보를 저장 하시겠습니까 ? ";
            this.workTp = "SAVE_INFO"
        },
        async saveInfoProc() {
            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/response/changeSave", {
                    // mno: this.mno,
                    server_key: this.server_key,
                    equipment_key: this.equipment_key,
                    category: this.category_cd,
                    prevention_date: this.prevention_date,
                    inlet_max_value: this.inlet_max_value,
                    inlet_avg_value: this.inlet_avg_value,
                    inlet_min_value: this.inlet_min_value,
                    occur:this.occur,
                    cause:this.cause,
                    action:this.action,
                    action_type:this.action_type,
                    action_date:this.action_date,
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

.changeDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.changeDateCheck>div>div>div {
    float: left;
    height: 100%;
}

.changeDateCheck>div>div>div:nth-child(1) {
    width: 70px;
    font-size: 16px;
    line-height: 22px;
    margin-right: 10px;
}

.changeDateCheck>div>div>div:nth-child(2),
.changeDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.changeDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
}

.changeDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.c_btn01,
.c_btn02,
.c_btn03 {
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

.c_btn01 {
    right: 360px;
}

.c_btn02 {
    right: 190px;
}
.c_btn03{
    right:20px;
}

.c_btn01:hover,
.c_btn02:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}


.changeTableWrap .right_list {
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

.changeTableWrap .right_list .popUpTitle {
    font-size: 18px;
}

.changeTableWrap .right_list .btn {
    margin-right: 7px;
    font-size: 15px;
    height: 30px;
    margin-top: 20px;
}
.changeTableWrap .right_list .regiName {
    font-size: 16px;
    word-break: keep-all;
}

.changeTableWrap .right_list .regiName+input,
.changeTableWrap .right_list .regiName+select {
    height: 30px;
    margin-top: 10px;
}

.changeTableWrap .right_list .lh-2+input,
.changeTableWrap .right_list .lh-2+select {
    margin-top:20px;
}

.changeTableWrap .right_list .lh-3+input,
.changeTableWrap .right_list .lh-3+select {
    margin-top:35px;
}
.changeTableWrap .right_list .lh-4+input,
.changeTableWrap .right_list .lh-4+select {
    margin-top:50px;
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

.ag-header-group-text{
    display:block;
    margin:0 auto;
}
</style>
