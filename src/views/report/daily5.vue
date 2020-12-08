<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>일일 관리일지</p>
                    <div class="dailyDateCheck container-fluid">
                        <b-row>
                            <b-col cols="9" class="col-9">
                                <div>날짜 선택</div>
                                <div class="dateSelect">
                                    <!-- <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field :placeholder="currentDate" v-model="date" label="" prepend-icon=" mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu> -->
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div>
                                <!-- <div>~</div>
                                <div class="dateSelect dateSelectTo">
                                    <datetime type="date" v-model="dateTo" class="datetime"></datetime>
                                </div> -->
                            </b-col>
                            <b-col cols="3" class="col-3">
                                <input type="button" class="d_btn01" value="조회" v-on:click="getList5">
                            </b-col>
                        </b-row>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="dailyTableSelectBox container-fluid">
                        <div>
                            <!-- <div class="clickBtnWrap"><span class="tabbtn clickBtn" v-on:click="monitorBtn">1. 일일 모니터링 통계</span></div> -->
                            <div><router-link class="tabbtn clickBtn" :to="{name: 'daily1'}">1. 일일 모니터링 통계</router-link> </div>
                            <!-- <div><span class="tabbtn" v-on:click="inletBtn">2. 배출시설(흡입구) 트렌드 분석 : 이상점(농도 상승) 확인 및 조치 사항</span></div> -->
                            <div><router-link class="tabbtn clickBtn" :to="{name: 'daily2'}">2. 배출시설(흡입구) 트렌드 분석 : 이상점(농도 상승) 확인 및 조치 사항</router-link> </div>
                            <!-- <div><span class="tabbtn" v-on:click="outletBtn">3. 배출구 초과이력 관리</span></div> -->
                            <div><router-link class="tabbtn clickBtn" :to="{name: 'daily3'}">3. 배출구 초과이력 관리</router-link> </div>
                            <!-- <div><span class="tabbtn" v-on:click="errorBtn">4. 설비적/기계적 문제 발생 및 대응 현황</span></div> -->
                            <div><router-link class="tabbtn clickBtn" :to="{name: 'daily4'}">4. 설비적/기계적 문제 발생 및 대응 현황</router-link> </div>
                            <!-- <div><span class="tabbtn" v-on:click="etcBtn">5. 운영 특이사항</span></div> -->
                            <div class="clickBtnWrap"><router-link class="tabbtn clickBtn" :to="{name: 'daily5'}">5. 운영 특이사항</router-link> </div>
                        </div>
                    </div>
                    <div class="con_tableWrap container-fluid">
                        <!--<div class="con_table" id="con_table01">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="monitorFields" :rowData="monitorList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                        <div class="con_table" id="con_table02">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="inletFields" :rowData="inletList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                        <div class="con_table" id="con_table03">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="outletFields" :rowData="outletList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                        <div class="con_table" id="con_table04">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="errorFields" :rowData="errorList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>-->
                        <div class="con_table" id="con_table05">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="etcFields" :rowData="etcList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                    </div>
                    <!--<div class="con_tableWrap container-fluid" v-show="show02">
                        <div class="con_table con_table02" v-b-visible="handleVisibility">
                            1
                        </div>
                    </div>
                    <div class="con_tableWrap container-fluid" v-show="show03">
                        <div class="con_table con_table01" v-b-visible="handleVisibility">
                            1
                        </div>
                    </div>
                    <div class="con_tableWrap container-fluid" v-show="show04">
                        <div class="con_table con_table01" v-b-visible="handleVisibility">
                            1
                        </div>
                    </div>
                    <div class="con_tableWrap container-fluid" v-show="show05">
                        <div class="con_table con_table01" v-b-visible="handleVisibility">
                            1
                        </div>
                    </div>-->
                    
                    </b-overlay>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
import store from "@/store/index";
import axios from 'axios';
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'
import Main from '@/components/main.vue'
import Vue from 'vue'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"
// import BootstrapVue from 'bootstrap-vue'

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'ag-grid-enterprise';
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
        Main,
        AgGridVue,
    },
    computed: {
        currentDate() {
            let s = new Date().toLocaleDateString();
            return s;
        }
    },
    data() {
        return {
            show01:false,
            show02:false,
            show03:false,
            show04:false,
            show05:false,
            isVisible:false,

            busy:false,
            timeout : null,

            serverList: null,
            comboServers: null,
            selectWorkplace: "",
            dateFr: '',

            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            
            pageSz:store.state.paginationPageSize,

            etcListCount:0,
            etcList:[],
            etcFields: [
                {
                    field: 'category_nm',
                    headerName: '분야',
                    width: '200px'
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '200px'
                },
                {
                    field: '',
                    headerName: '특이사항',
                    width: '1100px'
                },
            ],
        }
    },
    beforeDestroy() {
        this.clearTimeout()
    },
    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        this.getConditionList()
    },
    watch: {
        selectWorkplace() {
            console.log(this.selectWorkplace)
        },
        date() {
            console.log(this.date)
        }
    },
    methods: {
        getConditionList() {
            let that = this;
            axios.post("/api/daedan/cj/ems/setting/conditionList", {
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

        handleVisibility(isVisible) {
            this.isVisible = isVisible
        },
        
        // etcBtn(){
        //     let tab = new Array();
        //     let tabBtn = new Array();
        //     tab = document.getElementsByClassName('con_table');
        //     tabBtn = document.getElementsByClassName('tabbtn');
        //     for(let i=0; i<tab.length; i++){
        //         tab[i].style.display = 'none';
        //         tabBtn[i].style.fontWeight = "400";
        //         tabBtn[i].style.backgroundColor = "transparent";
        //     }
        //     document.getElementById('con_table05').style.display = "block";
        //     tabBtn[4].style.fontWeight = "bold";
        //     tabBtn[4].style.backgroundColor = "white";

        // },
        getList5() {
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/report/manageDataList", {
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
                    serverList: store.state.ckServer,
                    pageNo: this.pageNo,
                    pageSz: this.pageSz,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.etcList = res.data.data
                            that.etcListCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
                this.busy = false;
        },
        getList() {
            // if (store.state.ckServer.length == 0) {
            //     alert("사업장은 필수 선택 항목 입니다.")
            //     return;
            // }
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            this.$Axios.post("/api/daedan/cj/ems/measurements/measurementsByDayList", {
                dateFr: this.dateFr,
            })
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

/* Top dailyDateCheck , search and Excel Save*/
.dailyDateCheck {
    width: 100%;
    height: 30px;
    font-family: "CJ Onlyone Medium";
    margin-top: 10px;
}

.dailyDateCheck>div {
    position: relative;
    height: 100%;
    line-height: 30px;
    padding: 0;
    text-align: left;
}

.dailyDateCheck>div>div>div {
    float: left;
    margin-left: 10px;
}

.dailyDateCheck>div>div>div:nth-child(1),
.dailyDateCheck>div>div>div:nth-child(3) {
    display: block;
    width: 70px;
    float: left;
    text-align: center;
    font-size: 14px;
}

.dailyDateCheck>div>div>div>select {
    width: 120px;
    height: 30px;
    text-align: left;
    float: left;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    padding-left: 7px;
    font-size: 14px;
    font-family: 'Noto Sans KR';
    cursor: pointer;
}

.dailyDateCheck>div>div>div>input[type=text] {
    font-family: 'Arial';
    cursor: pointer;
    font-size:14px;
}

.dailyDateCheck>div>div>.dateSelect {
    width: 150px;
}

.dailyDateCheck>div>div>.dateSelect input[type="text"]{
    font-size:14px;
}

.v-input__prepend-outer {
    display: none;
}

.d_btn01 {
    position: absolute;
    top: 0px;
    right: 20px;
    width: 150px;
    height: 30px;
    padding-left: 0;
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

.d_btn01:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

/*Table Select */
.dailyTableSelectBox {
    width: 100%;
    height: 35px;
    margin-top: 50px;
}

.dailyTableSelectBox>div>div {
    float: left;
    width: 180px;
    height: 35px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #99C5F2;
    cursor: pointer;
}

.dailyTableSelectBox>div>.clickBtnWrap>span{
    background:white;
    font-weight:bold;
}

.dailyTableSelectBox>div>div:nth-child(2) {
    width: 480px;
}

.dailyTableSelectBox>div>div:nth-child(3) {
    width: 190px;
}

.dailyTableSelectBox>div>div:nth-child(4) {
    width: 290px;
}

.dailyTableSelectBox>div>div:nth-child(5) {
    width: 170px;
}

.dailyTableSelectBox>div>div>span {
    display: block;
    width: 170px;
    height: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: inherit;
    font-size: 14px;
    margin: 5px 0px 0px 5px;
    line-height: 30px;
    transition: all 0.3s;
    box-sizing: border-box;
    text-align: center;
}

.dailyTableSelectBox>div>div:nth-child(2)>span {
    width: 470px;
}

.dailyTableSelectBox>div>div:nth-child(3)>span {
    width: 180px;
}

.dailyTableSelectBox>div>div:nth-child(4)>span {
    width: 280px;
}

.dailyTableSelectBox>div>div:nth-child(5)>span {
    width: 150px;
}

/* Contents */

.con_tableWrap {
    width: 100%;
    height:600px;
}

.con_table {
    position:absolute;
    width:100%;
    height:100%;
    background: #f9fcff;
    box-sizing: border-box;
    border: 1px solid #d7dadd;
}

.ag-header-group-text{
    display:block;
    margin:0 auto;
    font-size:16px;
}
</style>
