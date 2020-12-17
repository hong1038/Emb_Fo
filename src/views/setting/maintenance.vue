<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner maintenanceInner">
            <div class="con mtConBox">
                <div class="con_box_right container-fluid">
                    <p>측정기별 유지보수 계약 정보</p>
                    <div class="maintenanceDateCheck container-fluid mt-3">
                        <b-row>
                            <b-col cols="7">
                                <!-- <div>날짜 선택 </div>
                                <div class="dateSelect"> 
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div> -->
                            </b-col>
                            <b-col cols="5">
                                <input class="mt_btn02" type="button" v-on:click="getList" value="조회">
                                <!-- <input class="mt_btn02" type="button"  v-on:click="addOn" value="등록"> -->
                                <input class="mt_btn03" type="button" v-on:click="excelBtn" value="엑셀 저장">
                            </b-col>
                        </b-row>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                        <div class="mt-4 container-fluid maintenanceTable" style="display:flex;">
                            <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark"  rowSelection="single" @row-clicked="addOn" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions">
                            </ag-grid-vue>
                            <b-card class="right_list" v-if="show">
                                <b-row>
                                    <b-col class="popUpTitle">측정기별 유지보수<br>계약 정보</b-col>
                                    <input type="button" class="systemSaveBtn btn btn-success btn-sm" v-on:click="saveInfo" value="저장">
                                    <input type="button" class="systemListBtn btn btn-primary btn-sm" v-on:click="showblock" value="목록">
                                    <!-- <input type="button" class="systemListBtn btn btn-danger btn-sm" v-on:click="dropInfo" value="삭제"> -->
                                </b-row>
                                <div>
                                    <b-row>
                                        <b-col class="regiName col-4">사업장</b-col>
                                        <b-form-select class="col" v-model="server_key" :options="comboServers" size="sm" disabled></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">측정위치</b-col>
                                        <b-form-input class="col" v-model="equipment_inner_nm" :options="comboEquipments" size="sm" disabled></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">구분</b-col>
                                        <b-form-input class="col" v-model="category_cd" :options="comboCategories" size="sm" disabled></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">시설분류</b-col>
                                        <b-form-select class="col" v-model="facility" :options="comboFacilities" size="sm" disabled></b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">위치분류</b-col>
                                        <b-form-input class="col" v-model="location" :options="comboLocations" size="sm" disabled></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-2">계약 시작일자</b-col>
                                        <b-form-input class="col" type="date" size="sm" v-model="fr_dt"></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-2">계약 종료일자</b-col>
                                        <b-form-input class="col" type="date" size="sm" v-model="to_dt"></b-form-input>
                                    </b-row>
                                    <b-row class="line1_box">
                                        <b-col class="regiName col-4">계약여부</b-col>
                                        <b-col class="col-8">
                                            <b-form-radio-group id="radio-group-1" v-model="contact_yn" :options="ctSelectOptions" value-field="ynItem" text-field="contactName" size="lg" name="radio-sub-component">
                                              
                                            </b-form-radio-group>
                                        </b-col>
                                    </b-row>
                                    <b-row class="line2_box">
                                        <b-col class="regiName col-4">완료여부</b-col>
                                        <b-col class="col-8">
                                            <b-form-radio-group id="radio-group-2" v-model="success_yn" :options="scSelectOptions" value-field="ynItem" text-field="contactName" size="lg" name="aradio-sub-component">
                                              
                                            </b-form-radio-group>
                                        </b-col>
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
import Vue from "vue";
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'

// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

Vue.use(Datetime)
import store from '@/store/index';
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
   
            mode: 'single',
            info: {},
            dateFr: store.state.szCurMmTo,
            findTp: '',
            findSz: '',

            fr_dt:'',
            to_dt:'',
            
            gridOptions: {},
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,

            measurementInfo:{},
            Loadbusy:false,
            timeout : null,
            show:false,
            hide:false,
            busyPop: false,
            busy:false,

            contact_yn:null,
            success_yn:null,
            equipment_key:null,
            equipment_inner_nm:null,
            category_cd:null,
            facility:null,
            location:null,

            mno:null,
            comboServers: null, //사업장   
            comboCategories: null, //측청분야     
            comboEquipments: null, //측정위치
            comboFacilities: null, //시설분류
            comboLocations: null, //위치분류
            scSelectOptions:[
                {ynItem:'Y', contactName:'Y'},
                {ynItem:'N', contactName:'N'},
            ],
            ctSelectOptions:[
                {ynItem:'Y', contactName:'Y'},
                {ynItem:'N', contactName:'N'},
            ],
            fields: [
                {
                    field: 'server_name',
                    headerName: '사업장'
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치',
                    width:'400'
                },
                {
                    field: 'category_cd',
                    headerName: '구분'
                },
                {
                    field: 'facility_nm',
                    headerName: '시설분류',
                    width:'350'
                },
                {
                    field: 'location',
                    headerName: '위치분류',
                    width:'240'
                },
                {
                    field: 'contact_yn',
                    headerName: '계약여부',
                    width: '110px',
                },
            ],
        }
    },
    watch: {
        server_key() {
            if (!this.server_key) return;
            this.getEquips();
        },
        category_cd() {
            console.log("hi")
            if (!this.category_cd) return;
            this.getFacPos();
        },
        equipment_key() {
            if (!this.server_key) return;
            if (!this.equipment_key) return;
            this.getSensors();
        },
        facility(){
            if (this.facility === 201) {
                this.general_air = "부지경계"
                this.hide = true
            }else{
                this.general_air = null
                this.hide = false
            }
        },
        usedSensors(){
           console.log("usedSensor = " + this.usedSensors)
        },
    },
    computed: {},

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
        this.getConditionList();
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
         onShown() {
            // this.$refs.dialog.focus()
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
        showblock() {
            this.show = !this.show
            this.resizing()
        },
        resizing() {
            setTimeout(() => {
                this.gridOptions.api.sizeColumnsToFit()
            }, 1);
        },
       async getConditionList() {
            let that = this;
            console.log(this.category)
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
                            console.log(res.data.data.equipPos)
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
            this.getFacPos();
        },
        async getFacPos() {
            console.log(this)
            let that = this;

            await axios.post("/api/daedan/cj/ems/cmmn/comboFacPosList", {
                    category: this.category,
                    userId: store.state.userInfo.userId

                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.comboFacilities = res.data.data.facilities; //서설분류
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
            this.getSensors();
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

            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick()

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/setting/maintenanceList", {
                    dateFr: this.dateFr,
                    serverList: store.state.ckServer,
                    findTp: this.findTp,
                    findSz: this.findSz,
                    pageNo: this.pageNo,
                    pageSz: store.state.paginationPageSize,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.list = res.data.data
                            console.log(this.list)
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
        // 등록버튼 클릭
        addOn(obj) {
            console.log(obj)
            this.mno = obj.data.mno;
            this.fr_dt = obj.data.fr_dt;
            this.to_dt = obj.data.to_dt;
            this.server_key = obj.data.server_key;
            this.server_name = obj.data.server_name;
            this.equipment_key = obj.data.equipment_key;
            this.equipment_inner_nm = obj.data.equipment_inner_nm; //측정위치
            this.category = obj.data.category; //측정분야명
            this.category_cd = obj.data.category_cd; //측정분야코드
            this.facility = obj.data.facility
            this.place = obj.data.place
            this.location = obj.data.location
            this.contact_yn = obj.data.contact_yn;
            this.success_yn = obj.data.success_yn;

            console.log(this.server_key,this.server_name,this.equipment_inner_nm,this.category,this.category_cd,this.facility,this.place,this.location,this.contact_yn)
            this.getEquips();
            this.showblock();
        },
        // 엑셀저장버튼 클릭
        excelBtn() {
            this.gridOptions.api.exportDataAsExcel({});
        },
        saveInfo() {
            if (!this.server_key) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            if (!this.equipment_inner_nm) {
                alert("측정위치는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.category_cd) {
                alert("구분은 필수 선택 항목 입니다.")
                return;
            }
            if (!this.facility) {
                alert("시설분류는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.location) {
                alert("위치분류는 필수 선택 항목 입니다.")
                return;
            }
            console.log(this.contact_yn,this.success_yn)
            if (!this.contact_yn) {
                alert("계약여부는 필수 선택 항목 입니다.")
                return;
            }
            if (!this.success_yn) {
                alert("완료여부는 필수 선택 항목 입니다.")
                return;
            }
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

            await this.$Axios.post("/api/daedan/cj/ems/setting/maintenanceSave", {
                    mno: this.mno,
                    server_key:this.server_key,
                    equipment_key:this.equipment_key,
                    fr_dt:this.fr_dt,
                    to_dt:this.to_dt,
                    category:this.category,
                    facility:this.facility,
                    place:this.place,
                    contact_yn:this.contact_yn,   
                    success_yn:this.success_yn,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.getList();
                        }
                    }
                })
                .catch(err => {
                    alert("측정기별기준정보저장 실패 \n" + err);
                })
            this.showblock();
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

/* Top DateCheck , search and Excel Save*/
.maintenanceDateCheck {
    width: 100%;
    height: 50px;
}

.maintenanceDateCheck>div>div>div {
    float: left;
    
}

.maintenanceDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.maintenanceDateCheck>div>div>div:nth-child(2),
.maintenanceDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
}

.maintenanceDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.maintenanceDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.mt_btn01,
.mt_btn02,
.mt_btn03 {
    position: absolute;
    top: -15px;
    width: 150px;
    height: 30px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: white;
    box-shadow: 0px 0px 3px blue;
    font-size: 16px;
}

.mt_btn01 {
    right: 360px;
}

.mt_btn02 {
    right: 190px;
}

.mt_btn03 {
    right: 20px;
}

.maintenanceDateCheck>div>div:nth-child(2)>input:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.dateSelect input {
    box-sizing: border-box;
    padding-left: 10px;
}



.maintenanceTable .right_list {
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

.maintenanceTable .right_list .popUpTitle {
    font-size: 18px;
}

.maintenanceTable .right_list .btn {
    margin-right: 7px;
    font-size: 15px;
    height: 30px;
    margin-top: 20px;
}
.maintenanceTable .right_list .regiName {
    font-size: 16px;
    word-break: keep-all;
}

.maintenanceTable .right_list .regiName+input,
.maintenanceTable .right_list .regiName+select {
    height: 30px;
    margin-top: 10px;
    font-size:14px;
}

.maintenanceTable .right_list .lh-2+input,
.maintenanceTable .right_list .lh-2+select {
    margin-top:20px;
}

.maintenanceTable .right_list .lh-3+input,
.maintenanceTable .right_list .lh-3+select {
    margin-top:35px;
}
.maintenanceTable .right_list .lh-4+input,
.maintenanceTable .right_list .lh-4+select {
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

.v-input__prepend-outer {
    display: none;
}
</style>
