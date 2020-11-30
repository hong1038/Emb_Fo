<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>월말 보고</p>
                    <div class="monthlyDateCheck container-fluid">
                        <b-row>
                            <b-col cols="9">
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
                                    <!--<datetime type="date" v-model="dateFr" class="datetime"></datetime>-->
                                </div>
                            </b-col>
                            <b-col cols="3">
                                <input type="button" class="m_btn01" value="조회" v-on:click="getList">
                            </b-col>
                        </b-row>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="monthlyTableSelectBox container-fluid">
                        <div>
                            <!-- <div><button type="button" class="tabbtn" v-on:click="summaryBtn">1. 월말 보고 Summary</button></div>
                            <div><button type="button" class="tabbtn" v-on:click="operBtn">2. 운전 현황(월간 통계)</button></div>
                            <div><button type="button" class="tabbtn" v-on:click="preventBtn">3. 배출시설(방지시설 전단) 트렌드 분석 : 이상점(농도 상승) 확인 및 조치 사항</button></div>
                            <div><button type="button" class="tabbtn" v-on:click="outletBtn">4. 배출구 초과이력 관리</button></div>
                            <div><button type="button" class="tabbtn" v-on:click="errorBtn">5. 설비적/기계적 문제 발생 및 대응 현황</button></div>
                            <div><button type="button" class="tabbtn" v-on:click="etcBtn">6. 운영 특이사항</button></div> -->
                            
                            <div><router-link :to="{name:'monthly1'}">1. 월말 보고 Summary</router-link></div>
                            <div><router-link :to="{name:'monthly2'}">2. 운전 현황(월간 통계)</router-link></div>
                            <div><router-link :to="{name:'monthly3'}">3. 배출시설(방지시설 전단) 트렌드 분석 : 이상점(농도 상승) 확인 및 조치 사항</router-link></div>
                            <div><router-link :to="{name:'monthly4'}">4. 배출구 초과이력 관리</router-link></div>
                            <div><router-link :to="{name:'monthly5'}">5. 설비적/기계적 문제 발생 및 대응 현황</router-link></div>
                            <div class="clickBtnWrap"><router-link :to="{name:'monthly6'}">6. 운영 특이사항</router-link></div>
                        </div>
                    </div>

                    <div class="con_tableWrap">
                        <!--<div class="con_table" id="con_table01">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="summaryFields" :rowData="summaryList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                        <div class="con_table" id="con_table02">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="operFields" :rowData="operList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                        <div class="con_table" id="con_table03">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="preventFields" :rowData="preventList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                        <div class="con_table" id="con_table04">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="outletFields" :rowData="outletList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                        <div class="con_table" id="con_table05">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="errorFields" :rowData="errorList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>-->
                        <div class="con_table" id="con_table06">
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="etcFields" :rowData="etcList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                    </div>
                    </b-overlay>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
import store from "@/store/index";
import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
import Main from '@/components/main.vue'
// import Vue from 'vue'

// import Datetime from 'vue-datetime'
// import 'vue-datetime/dist/vue-datetime.css'
// // import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

// Vue.use(Datetime)
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
            let s = new Date().toLocaleDateString().slice(0, 8);
            return s;
        }
    },
    data() {
        return {
            busy:false,
            timeout : null,

            checkList1: ["cloudmain", "인천1", "성남", "부산", "인천2", "논산", "인천냉동", "진천", "진안", "인천3", "안산", "공주", "남원"],
            selectWorkplace: "",
            dateFr: '',
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,

            etcListCount:0,
            etcList:[],
            etcFields: [
                {
                    field: '',
                    headerName: '일자',
                    width: '150px'
                },
                {
                    field: '',
                    headerName: '분야',
                    width: '150px'
                },
                {
                    field: '',
                    headerName: '측정위치',
                    width: '150px'
                },
                {
                    field: '',
                    headerName: '특이사항',
                    width: '1050px'
                },
            ],
        }
    },
    beforeDestroy() {
      this.clearTimeout()
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
        // tabSelectBtn(){
        //     let tab = new Array();
        //     let tabBtn = new Array();
        //     tab = document.getElementsByClassName('con_table');
        //     tabBtn = document.getElementsByClassName('tabbtn');
        //     for (let i = 0; i< tab.length; i++){
        //         tab[i].style.display = 'none';
        //         tabBtn[i].style.fontWeight = "400";
        //         tabBtn[i].style.backgroundColor = "transparent";
        //     }
        //     let div1 = document.getElementById(this);
        //     let align = div1.getAttribute("value");
        //     console.log(align);
        //     tab[0].style.display = "block"
        // },
        
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
        //     tab[5].style.display = "block"
        //     tabBtn[5].style.fontWeight = "bold";
        //     tabBtn[5].style.backgroundColor = "white";
        // },

        getList() {
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
                    cateList: store.state.ckCate,
                    equipList: store.state.ckEquip,
                    sensorList: store.state.ckSensor,
                    pageNo: this.pageNo,
                    pageSz: this.pageSz,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.inletList = res.data.data
                            that.inletListCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
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

/* Top DateCheck , search and Excel Save*/

.monthlyDateCheck {
    width: 100%;
    height: 30px;
    font-family: "CJ Onlyone Medium";
    margin-top: 10px;
}

.monthlyDateCheck>div {
    position: relative;
    height: 100%;
    line-height: 30px;
    padding: 0;
    text-align: left;
}

.monthlyDateCheck>div>div>div {
    float: left;
    margin-left: 10px;
}

.monthlyDateCheck>div>div>div:nth-child(1),
.monthlyDateCheck>div>div>div:nth-child(3) {
    display: block;
    width: 70px;
    float: left;
    text-align: center;
    font-size: 14px;
}

.monthlyDateCheck>div>div>div>select {
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

.monthlyDateCheck>div>div>div>input[type=text] {
    font-family: 'Arial';
    cursor: pointer;
}

.monthlyDateCheck>div>div>.dateSelect {
    width: 150px;
}

.monthlyDateCheck>div>div>.dateSelect input[type="text"]{
    font-size:14px;
    height:30px;
}

.v-input__prepend-outer {
    display: none;
}

.m_btn01 {
    position: absolute;
    top: 0px;
    right: 20px;
    width: 150px;
    height: 30px;
    font-size: 16px;
    padding-left: 0;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
}

.m_btn01:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

/*Table Select */
.monthlyTableSelectBox {
    width: 100%;
    height: 35px;
    margin-top: 50px;
}

.monthlyTableSelectBox>div>div {
    float: left;
    width: 190px;
    height: 35px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #99C5F2;
    cursor: pointer;
}

.monthlyTableSelectBox>div>div:nth-child(3) {
    width: 450px;
}

.monthlyTableSelectBox>div>div:nth-child(5) {
    width: 270px;
}

.monthlyTableSelectBox>div>div:nth-child(6) {
    width: 170px;
}

/*.monthlyTableSelectBox>div>div>button {
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

.monthlyTableSelectBox>div>div:nth-child(3)>button {
    width: 430px;
}

.monthlyTableSelectBox>div>div:nth-child(5)>button {
    width: 250px;
}

.monthlyTableSelectBox>div>div:nth-child(6)>button {
    width: 150px;
}

.monthlyTableSelectBox>div>div>button:focus{
    outline:none;
    border:none;
}*/

.monthlyTableSelectBox>div>div>a {
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
    text-decoration: none;
    color:black;
}
.monthlyTableSelectBox>div>div:nth-child(3)>a {
    width: 430px;
}

.monthlyTableSelectBox>div>div:nth-child(5)>a {
    width: 250px;
}

.monthlyTableSelectBox>div>div:nth-child(6)>a {
    width: 150px;
}

.monthlyTableSelectBox>div>.clickBtnWrap>a{
    background:white;
    font-weight:bold;
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
.v-text-field__slot:after{
    width:0;
}

</style>
