<template>
<b-container fluid>
    <Header></Header>
    <Left></Left>
    <div style="display:flex">
        <div class="inner settingInner">
            <div class="con">
                <div class="con_box_right workplaceBox container-fluid float-left">
                    <p>사업장 기준 정보</p>
                    <b-row>
                        <input type="button" class="measurementLookup" v-on:click="getList" value="조회">
                        <input type="button" class="measurementPlus" v-on:click="showblock" value="등록">
                    </b-row>
                    <div class="mmtableWrap container-fluid" style="display:flex">
                        <ag-grid-vue style="width: 100%; height: 715px;" class="ag-theme-alpine-dark" rowSelection="single" @row-clicked="getInfo" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" :onRowClicked="onRowClicked" />
                        <!--
                        <b-card class="elevation-5"  bg-variant="light"  img-alt="Image" img-top height="100%" tag="article" v-if="show">  
                        -->

                        <b-card class="right_list" v-if="show">
                            <b-row>
                                <b-col class="popUpTitle">사업장 기준 정보 등록</b-col>
                                <input type="button" class="mmSaveBtn btn btn-success btn-sm" v-on:click="saveInfo" value="저장">
                                <input type="button" class="mmListBtn btn btn-primary btn-sm" v-on:click="showblock" value="목록">
                                <input type="button" class="mmListBtn btn btn-danger btn-sm" v-on:click="dropInfo" value="삭제">
                            </b-row>
                            <div>
                                <b-row>
                                    <b-col class="regiName col-4">사업장번호</b-col>
                                    <b-form-input class="col" v-model="pid" size="sm" readonly></b-form-input>
                                </b-row>

                                <b-row>
                                    <b-col class="regiName col-4">사업장명</b-col>
                                    <b-form-input class="col" v-model="name1" size="sm"></b-form-input>
                                </b-row>

                                <b-row>
                                    <b-col class="regiName col-4">사업장명(약식)</b-col>
                                    <b-form-input class="col" type="text" size="sm" v-model="name2"></b-form-input>
                                </b-row>
                                <b-row>
                                    <b-col class="regiName col-4">주소</b-col>
                                    <b-form-input class="col" type="text" size="sm" v-model="addr"></b-form-input>
                                </b-row>
                                <b-row>
                                    <b-col class="col-4 regiName">영역</b-col>
                                    <b-form-select class="col" v-model="parAreaCode" :options="comboParAreaCode" size="sm"> </b-form-select>
                                </b-row>
                                <b-row>
                                    <b-col class="col-4 regiName">지역</b-col>
                                    <b-form-select class="col" v-model="areaCode" :options="comboAreaCode" size="sm"> </b-form-select>
                                </b-row>
                                
                                <b-row>
                                    <b-col class="col-4 regiName">관리서버</b-col>
                                    <b-form-select class="col" v-model="serverKey" :options="comboServer" size="sm"> </b-form-select>
                                </b-row>
                                <b-row>
                                    <b-col class="col-4 regiName">관리자명</b-col>
                                    <b-form-input class="col" type="text" size="sm" v-model="name"></b-form-input>
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
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'

import Vue from 'vue'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"
import VueConfirmDialog from "vue-confirm-dialog"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import store from '@/store/index';

Vue.use(VueConfirmDialog)
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Left,
        Header,
        AgGridVue,
    },
    data() {
        return {
            onRowClicked: "",
            busy: false,
            processing: false,
            altMsg: '',
            workTp: '',

            pid:'',
            addr:'',//주소
            name1:'', //사업장명
            name2:'',  //사업장명(약식)
            parAreaCode:'',
            areaCode:'',
            sererKey:'',

            comboParAreaCode:[],
            comboServer:[],

            paginationPageSize: store.state.paginationPageSize,
            config: {},
            pageNo: 1,
            pagerSz: 13,
            list: [],
            listCount: 0,
            // comboServers: null, //사업장   
            // comboCategories: null, //측청분야     
            // comboEquipments: null, //측정위치
            // comboFacilities: null, //시설분류
            // comboLocations: null, //위치분류

            // sensors: null,
            // usedSensors: [], //선택된분석항목(센서)

            eqInfo: {},
            // mno: null, //관리번호
            // server_key: null, //사업장
            // equipment_key: null, //측정위치
            // category: null, //측정분야명
            // category_cd: null, //측정분야코드
            // facility: null, //시설분류
            // location: null, //위치분류
            // legal_standard: null, //법적기준
            // manage_standard: null, //관리기준
            // unit: null, //단위
            // internal_name: null, //내부관리명
            // internal_number: null, //내부관리번호
            // public_name: null, //공정명
            // odor_number: null, //악취방지시설고유일련번호
            // sensorList: [], //분석항목리스트

            date: "",
            show: false,

            gridOptions: {

            },

        }
    },
    watch: {
        parAreaCode() {
            this.getComboSubAreaCode();
        },

        areaCode() {
            this.getComboServers();
        },
        server_key() {
            if (!this.server_key) return;
            this.getEquips();
        },
        // category_cd() {
        //     if (!this.category_cd) return;
        //     this.getFacPos();
        // },
        // equipment_key() {
        //     if (!this.server_key) return;
        //     if (!this.equipment_key) return;
        //     this.getSensors();
        // },
        //usedSensors(){
        //    console.log("usedSensor = " + this.usedSensors)
        //},
    },

    beforeMount() {
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
        this.fields = [
            { field: 'pid'      , headerName: '사업장번호'   , hide: true },
            { field: 'area_name'    , headerName: '권역구분' },
            { field: 'name1'    , headerName: '사업장명' },
            { field: 'name2'    , headerName: '사업장명(약식)' },
            { field: 'area'     , headerName: '지역'         },
        ]
      
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
        this.getComboServers();
        this.getComboAreaCode();
    },
    methods: {
        async getComboServers() {
            let that = this;
            if (!this.areaCode) return;
            await axios.post("/api/daedan/cj/ems/setting/WorkplaceComboServer", {
                areaCode: this.areaCode,
                userId: store.state.userInfo.userId
            }, this.config)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.statusCode === 200) {
                        that.comboServer = res.data.data;
                    }
                }
            })
            .catch(err => {
                alert("사업장 기준정보 처리용 관리서버 콤보 추출 실패 \n" + err);
            })
        },

        getComboAreaCode() {
            let that = this;
            //alert("workplace.getComboAreaCode.store.state.baseAreaCode = " + store.state.baseAreaCode);//kill
            axios.post("/api/daedan/cj/ems/setting/workplaceComboArea", {
                parCodeNo: store.state.baseAreaCode,
                userId: store.state.userInfo.userId
            }, this.config)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.statusCode === 200) {
                        that.comboParAreaCode = res.data.data;
                        if (that.comboParAreaCode) {
                            that.parAreaCode = that.comboParAreaCode[0].value
                        }
                    }
                }
            })
            .catch(err => {
                alert("사업장 기준정보 처리용 부모관리영역 콤보 추출 실패 \n" + err);
            })
        },
        getComboSubAreaCode() {
            let that = this;
            //alert("workplace.getComboSubAreaCode = " + this.areaCode);//kill
            axios.post("/api/daedan/cj/ems/setting/workplaceComboArea", {
                parCodeNo: this.parAreaCode,
                userId: store.state.userInfo.userId
            }, this.config)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.statusCode === 200) {
                        that.comboAreaCode = res.data.data;
                        if (that.comboAreaCode) {
                            that.areaCode = that.comboAreaCode[0].value
                        }
                    }
                }
            })
            .catch(err => {
                alert("사업장 기준정보 처리용 관리영역 콤보 추출 실패 \n" + err);
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
        // async getConditionList() {
        //     let that = this;
        //     await axios.post("/api/daedan/cj/ems/setting/conditionList", {
        //             userId: store.state.userInfo.userId
        //         }, this.config)
        //         .then(res => {
        //             if (res.status === 200) {
        //                 if (res.data.statusCode === 200) {
        //                     that.comboServers = res.data.data.serverList; //사업장
        //                     // that.comboCategories = res.data.data.cateList; //수집분야(악취,대기,수질)
        //                 }
        //             }
        //         })
        //         .catch(err => {
        //             alert("서버목록/수집분야(악취,수질,대기) 추출 실패 \n" + err);
        //             console.log(err)
        //         })

        // },
        // async getEquips() {
        //     console.log("getEquips.server_key = " + this.server_key)
        //     let that = this;

        //     await axios.post("/api/daedan/cj/ems/cmmn/comboEquipPosList", {
        //             serverKey: this.server_key,
        //             userId: store.state.userInfo.userId

        //         }, this.config)
        //         .then(res => {
        //             if (res.status === 200) {
        //                 if (res.data.statusCode === 200) {
        //                     that.comboEquipments = res.data.data.equipPos; //측정위치
        //                     // if (that.eqInfo.equipment_key) {
        //                     //     that.equipment_key = that.eqInfo.equipment_key;
        //                     // }
        //                 }
        //             }
        //         })
        //         .catch(err => {
        //             alert("측정위치추출 실패 \n" + err);
        //             console.log(err)
        //         })
        // },
        // async getFacPos() {
        //     console.log("getFacPos.category_cd = " + this.category_cd)
        //     let that = this;

        //     await axios.post("/api/daedan/cj/ems/cmmn/comboFacPosList", {
        //             category: this.category_cd,
        //             userId: store.state.userInfo.userId

        //         }, this.config)
        //         .then(res => {
        //             if (res.status === 200) {
        //                 if (res.data.statusCode === 200) {
        //                     that.comboFacilities = res.data.data.facilities; //서설분륳
        //                     that.comboLocations = res.data.data.locations; //위치분류
        //                     if (that.eqInfo.facility) {
        //                         that.facility = that.eqInfo.facility; //시설분류 설정    
        //                     }
        //                     if (that.eqInfo.location) {
        //                         that.location = that.eqInfo.location; //위치분류 설정    
        //                     }
        //                 }
        //             }
        //         })
        //         .catch(err => {
        //             alert("시설및위치분류추출 실패 \n" + err);
        //             console.log(err)
        //         })
        // },
        // async getSensors() {
        //     //console.log("getSensors.server_key = " + this.server_key)
        //     //console.log("getSensors.equipment_key = " + this.equipment_key)
        //     let that = this;

        //     await axios.post("/api/daedan/cj/ems/cmmn/comboSensorList", {
        //             serverKey: this.server_key,
        //             // equipmentKey: this.equipment_key,
        //             userId: store.state.userInfo.userId

        //         }, this.config)
        //         .then(res => {
        //             if (res.status === 200) {
        //                 if (res.data.statusCode === 200) {
        //                     that.sensors = res.data.data.sensors; //센서목록
        //                 }
        //             }
        //         })
        //         .catch(err => {
        //             alert("측정위치별센서추출 실패 \n" + err);
        //             console.log(err)
        //         })
        // },
        async getList() {
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            let that = this;
            //console.log("store.state.ckServer = " + store.state.ckServer)
            await axios.post("/api/daedan/cj/ems/setting/WorkplaceList", {
                    serverList: store.state.ckServer,
                    // cateList: store.state.ckCate,
                    // equipList: store.state.ckEquip,
                    // sensorList: store.state.ckSensor,
                    pageNo: this.pageNo,
                    pageSz: this.paginationPageSize,
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
                    alert("측정기별기준정보목록 추출 실패 \n" + err);
                })
        },
        async getInfo() {
            let that = this;
            //console.log("workplace.getInfo.pid = " +   event.data.pid)
            await this.$Axios.post("/api/daedan/cj/ems/setting/WorkplaceInfo", {
                    mno: this.mno,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.eqInfo = res.data.data;
                            // console.log("that.eqInfo.equipment_key = " + that.eqInfo.equipment_key)
                            // that.server_key = res.data.data.server_key
                            // that.category_cd = res.data.data.category_cd
                            // that.equipment_key = res.data.equipment_key

                            // that.internal_name = res.data.data.internal_name
                            // that.internal_numger = res.data.data.internal_numger
                            // that.legal_standard = res.data.data.legal_standard
                            // that.manage_standard = res.data.data.manage_standard
                            // that.location = res.data.data.location
                            // that.public_name = res.data.data.public_name
                            // that.ordr_no = res.data.data.odor_no
                            // that.unit = res.data.data.unit
                            //that.eqInfo.order_no = res.data.data.order_no
                            that.show = true;
                            // if (oldServerKey === that.server_key) {
                            //     that.getEquips();
                            // }
                        }
                    }
                })
                .catch(err => {
                    alert("측정기별기준정보목록 추출 실패 \n" + err);
                })

        },
        saveInfo() {
            if (!this.server_key) {
                alert("사업자는 필수 선택 항목 입니다.")
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
            this.busy = true;
            this.altMsg = "처리중인 기준정보를 저장 하시겠습니까 ? ";
            this.workTp = "SAVE_INFO"
        },
        async saveInfoProc() {
            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/setting/measurementSave", {
                    mno: this.mno,
                    server_key: this.server_key,
                    // equipment_key: this.equipment_key,
                    category: this.category_cd,
                    place: this.location,
                    facility: this.facility,
                    internal_name: this.internal_name,
                    internal_numger: this.internal_numger,
                    legal_standard: this.legal_standard,
                    manage_standard: this.manage_standard,
                    public_name: this.public_name,
                    ordr_no: this.odor_no,
                    unit: this.unit,
                    usedSensors: this.usedSensors,
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
            this.altMsg = "처리중인 기준정보를 샥제 하시겠습니까 ? ";
            this.workTp = "DROP_INFO"
        },
        async dropInfoProc() {
            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/setting/measurementDrop", {
                    mno: this.mno,
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
            this.busy = false;
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

.col {
    font-size: 16px;
}

/* .row {
    justify-content: space-around;
    align-items: center;
} */

.ag-theme-alpine-dark * {

    color: white;
}

/* datePicker */

.ui-datepicker {
    width: 250px;
    height: 280px;
}

.ui-datepicker th {
    font-size: 0.8rem;
}

.ui-datepicker td span,
.ui-datepicker td a {
    font-size: 0.8rem;
}

.ui-datepicker-prev span.ui-icon,
.ui-datepicker-next span.ui-icon {
    /*background: url(../imgs/common/leftArrow.png) no-repeat center center;*/
    background-size: 10px 10px;
}

.ui-datepicker-prev span.ui-icon {
    transform: rotateZ(180deg);
}

/* title */
.settingInner {
    margin: 0 auto;
}

.workplaceBox {
    margin: 0 auto;
}

.con_box_right {
    box-sizing: border-box;
    font-family: "CJ Onlyone Medium";
    position: relative;
}

.con_box_right>p {
    width: 500px;
    height: 50px;
    font-family: "CJ Onlyone Bold";
    font-size: 24px;
    box-sizing: border-box;
    border-bottom: 5px solid rgb(172, 172, 172);
    padding-left: 10px;
    text-align: left;
}

.measurementLookup {
    position: absolute;
    top: 30px;
    right: 190px;
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

.measurementPlus {
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

.measurementPlus:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
    text-decoration: none;
}

.mmtableWrap {
    width: 100%;
}

/*팝업*/

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.measurementCreate_popup {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    padding: 20px;
    box-sizing: border-box;
}

.measurementCreate_popup>div {
    position: relative;
    width: 1000px;
    height: 600px;
    background: rgb(255, 255, 255);
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px yellow;
    border-radius: 10px;
    margin: 0px auto;
    margin-top: 50px;
}

.measurementCreate_popup>div>p {
    width: 500px;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    border-bottom: 5px solid #ccc;
    box-sizing: border-box;
    padding-left: 7px;
}

.measurementCreate_popup>div>input {
    position: absolute;
    top: 40px;
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

.mmSaveBtn {
    right: 160px;
}

.mmListBtn {
    right: 40px;
}

.mmSaveBtn:hover,
.mmListBtn:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.measurementRegister {
    width: 100%;
    height: 480px;
    margin-top: 20px;
    padding-top: 10px;
}

.measurementRegister>div {
    float: left;
    width: 50%;
    height: 440px;
}

.measurementRegister>div>div {
    height: 60px;
}

.measurementRegister>div>div>div {
    float: left;
    width: 50%;
    height: 50px;
    font-size: 14px;
    line-height: 50px;

}

.measurementRegister>div>div>div:nth-child(1) {
    width: 30%;
    border-radius: 5px;
}

.measurementRegister>div>div>div:nth-child(2) {
    width: 70%;
}

/*분석항목*/
.measurementRegister>div>.line1_box {
    height: 140px;
}

.measurementRegister>div>div>.line2 {
    line-height: 25px;
}

.measurementRegister>div>.line1_box>.line1 {
    line-height: 140px;
    height: 140px;
}

/*분석항목 체크박스*/
.measurementRegister>div>.line1_box>div:nth-child(2) {
    height: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    line-height: 30px;
}

/*왼쪽 분류 이름*/
.workplaceBox>div>div>.regiName {
    background: rgb(255, 235, 235);
    box-shadow: 0px 0px 4px black;
}

.measurementRegister>div>div>div>select,
.measurementRegister>div>div>div>input {
    width: 260px;
    height: 50px;
    box-sizing: border-box;
    padding-left: 7px;
    font-size: 12px;
    border: 1px solid rgb(199, 187, 255);
    border-radius: 5px;
}

.measurementRegister>div>div>div>input {
    margin: 0 auto;
}

.measurementRegister>div>div>div>input[type=checkbox] {
    width: 12px;
    height: 12px;
    margin: 5px;
}

.right_list {
    position: relative;
    left: 10px;
    width: 500px;
    height: 715px;
    margin-left: 10px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0;
    overflow-y: scroll;
    box-shadow: 0px 0px 10px 1px #ccc;
}

.right_list .popUpTitle {
    font-size: 18px;
}

.right_list .btn {
    margin-right: 7px;
    font-size: 15px;
}

.workplaceBox .right_list .btn {
    margin-right: 7px;
    font-size: 15px;
    height: 30px;
    margin-top: 12px;
}

.workplaceBox .row>input,
.workplaceBox .row>select {
    max-width: 210px;
}

.workplaceBox .right_list .regiName {
    font-size: 16px;
    word-break: keep-all;
}

.workplaceBox .right_list .regiName+input,
.workplaceBox .right_list .regiName+select {
    max-width: 260px;
    height: 30px;
    margin-top: 10px;
}

.workplaceBox .right_list .line03+input{
    margin-top:25px;
}

.workplaceBox .check_list {
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

.regiName {
    word-break: keep-all;
}
</style>
