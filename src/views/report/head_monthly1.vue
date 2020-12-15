<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <div class="inner">
            <div class="con headMonthlyCon">
                <div class="con_box_right container-fluid">
                    <p>본부 월말 보고 통계</p>
                    <div class="container-fluid">
                        <b-row class="hmDateSelect">
                            <b-col cols="1">
                                <span style="padding-left:10px; line-height:10px;">월 선택</span>
                            </b-col>
                            <b-col cols="2">
                                <div class="dateSelect">
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dateFr" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="dateFr" label="" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
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
                                </div>
                            </b-col>
                            <v-spacer></v-spacer>
                            <b-col cols="1">
                                <v-btn class="hmPlus" v-on:click="getList1">조회</v-btn>
                            </b-col>
                            
                        </b-row>
                    </div>
                    <div class="hmTableWrap">
                        <div class="hmTable hmTable01">
                            <p>1. 전체 통계</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="tsFields" :rowData="tsList" :pagination="true" v-b-visible="handleVisibility"></ag-grid-vue>
                        </div>
                        <div class="hmTable hmTable02">
                            <p>2. 유형별 통계</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="ttfields" :rowData="ttList" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                        </ag-grid-vue>
                        </div>
                        <div class="hmTable hmTable03">
                            <p>3. 문제점 / 이슈사항</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="eiFields" :rowData="eiList" :pagination="true" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                        <div class="hmTable hmTable04">
                            <p>4. 이상점 및 비정상 대응확인</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="erFields" :rowData="erList" :pagination="true" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                    </div>
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
import 'vue-good-table/dist/vue-good-table.css'
import vue from 'vue'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        vue,
        Left,
        Main,
        AgGridVue,
    },
    data() {
        return {
            selectWorkplace: "",
            dateFr: store.state.curMmFr,
            date: store.state.curMmFr,
            pageNo:1,
            pageSz:store.state.paginationPageSize,
            list:[],
            listCount:0,

            //1. 전체통계
            tsList:[],
            tsListCount:0,
            tsFields: [
                {
                    field: 'category',
                    headerName: '대분류',
                    width: '140px'
                },
                {
                    field: '',
                    headerName: '소분류',
                    width: '140px'
                },
                {
                    field: '',
                    headerName: '단위',
                    width: '80px'
                },
                {
                    field: '',
                    headerName: '경인권',
                    width: '190px'
                },
                {
                    field: '',
                    headerName: '중부권',
                    width : '190'
                },
                {
                    field: '',
                    headerName: '남부권',
                    width: '190px'
                },
                {
                    field: '',
                    headerName: '영남권',
                    width : '190'
                },
                {
                    field: '',
                    headerName: '계열사',
                    width: '190px'
                },
                {
                    field: '',
                    headerName: '합계',
                    width : '190'
                },
            ],

            //2. 유형별 통계
            ttList:[],
            ttListCount:0,
            ttfields: [
                {
                    field: '',
                    headerName: '권역',
                    width: '100px'
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '130px'
                },
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '80px'
                },
                {
                    field: 'unit',
                    headerName: '단위',
                    width: '80px'
                },
                {
                    field: '',
                    headerName: '환경모니터링',
                    children:[
                        {
                            field : '',
                            headerName : '측정기, 방지시설 문제/이슈대응(기계적 문제)',
                            children : [
                                {
                                    field : '',
                                    headerName : '센서 이상',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '통신 이상',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '설비 이상',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width : '80'
                                },
                            ]
                        }
                    ]
                },
                {
                    field: '',
                    headerName: '모니터링 이상 대응',
                    children : [
                        {
                            field : '',
                            headerName : '악취',
                            children : [
                                {
                                    field : '',
                                    headerName : '농도 상승',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '수치 오류',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width : '80'
                                },
                            ]
                        },
                        {
                            field : '',
                            headerName : '수질',
                            children : [
                                {
                                    field : '',
                                    headerName : '농도 상승',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '수치 오류',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width : '80'
                                },
                            ]
                        },
                        {
                            field : '',
                            headerName : '대기',
                            children : [
                                {
                                    field : '',
                                    headerName : '농도 상승',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '수치 오류',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width : '80'
                                },
                            ]
                        },
                        {
                            field : '',
                            headerName : '합계',
                            children : [
                                {
                                    field : '',
                                    headerName : '농도 상승',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '수치 오류',
                                    width : '109'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width : '80'
                                },
                            ]
                        },
                    ]
                        
                },
            ],

            //3. 문제점/이슈사항
            eiList:[],
            eiListCount:0,
            eiFields: [
                // {
                //     field: 'prevention_mon',
                //     headerName: '년월',
                //     width: '120px'
                // },
                {
                    field: 'area',
                    headerName: '권역',
                    width: '100px'
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '120px'
                },
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '80px'
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치',
                    width: '190px'
                },
                {
                    field: '',
                    headerName: '유형',
                    width : '80'
                },
                {
                    field: 'rs_date',
                    headerName: '발생 일자',
                    width: '120px'
                },
                {
                    field: '',
                    headerName: '문제점 개선 계획',
                    children : [
                        {
                            field : 'cause',
                            headerName : '문제점/이슈사항',
                            width: '418'
                        },
                        {
                            field : 'action',
                            headerName : '대응 방안',
                            width: '470'
                        },
                        {
                            field : 'action_date',
                            headerName : '일정',
                            width: '110'
                        },
                    ]
                },
                {
                    field: 'action_type',
                    headerName: '완료 상태',
                    width: '120px'
                },
            ],

            //4. 이상점 및 비정상 대응확인
            erList:[],
            erListCount:0,
            erFields: [
                // {
                //     field: 'prevention_mon',
                //     headerName: '년월',
                //     width: '120px'
                // },
                {
                    field: 'area',
                    headerName: '권역',
                    width: '100px'
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '120px'
                },
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '80px'
                },
                {
                    field: 'rc_date',
                    headerName: '발생일자',
                    width: '110px'
                },
                {
                    field: 'public_name',
                    headerName: '공정명',
                    width : '200'
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '방지시설명',
                    width: '200px'
                },
                {
                    field: '',
                    headerName: '유형',
                    width : '110'
                },
                {
                    field: 'cause',
                    headerName: '초과사항 확인결과 원인',
                    width: '315px'
                },
                {
                    field: 'action',
                    headerName: '조치사항',
                    width : '300'
                },
                {
                    field: 'action_type',
                    headerName: '조치여부',
                    width : '110'
                },
                {
                    field: 'action_date',
                    headerName: '조치 완료 일자',
                    width : '140'
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
    methods:{
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
            // this.$refs.pin.focus()
        },
        onClick() {
            this.busy = true
            // Simulate an async request
            this.setTimeout(() => {
                this.busy = false
            })
        },

        async getList1() {
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }
            this.onClick();
            console.log(this);
            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            await this.$Axios.post("/api/daedan/cj/ems/report/excessDataList", {
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
                            that.tsList = res.data.data
                            that.tsListCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
                this.busy = false;
                this.getList2()
        },
        async getList2() {
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            await this.$Axios.post("/api/daedan/cj/ems/report/changeDataList", {
                    dateFr: this.dateFr,
                    pageNo: this.pageNo,
                    pageSz: this.pageSz,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.ttList = res.data.data
                            that.ttListCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
                this.busy = false;
                this.getList3()
        },
        async getList3() {
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            await this.$Axios.post("/api/daedan/cj/ems/report/problemList", {
                    dateFr: this.dateFr,
                    pageNo: this.pageNo,
                    pageSz: this.pageSz,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.eiList = res.data.data
                            that.eiListCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
                this.busy = false;
                this.getList4()
        },
        async getList4() {
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            await this.$Axios.post("/api/daedan/cj/ems/report/changeOccurList", {
                    dateFr: this.dateFr,
                    pageNo: this.pageNo,
                    pageSz: this.pageSz,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.erList = res.data.data
                            that.erListCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
                this.busy = false;
        },


    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}


.headMonthlyCon{
    width:1900px;
}

/* title */
.con_box_right {
    box-sizing: border-box;
    position: relative;
}


.headMonthlyCon .con_box_right>p {
    width:400px;
    height: 50px;
    font-family: CjFontTitleBold;
    font-size: 24px;
    box-sizing: border-box;
    border-bottom: 5px solid rgb(172, 172, 172);
    padding-left: 10px;
    text-align: left;
    margin-bottom:10px;
}

.hmDateSelect{
    height:50px;
    font-size:20px;
}

.hmDateSelect > div:nth-child(2){
    position: relative;
    left:-20px;
}

.hmDateSelect > div:last-child{
    height:100%;
}

.hmDateSelect .v-input{
    width:60%;
}

.hmDateSelect .v-input input{
    padding-left:5px;
    font-size:16px;
}

.hmDateSelect .hmPlus{
    position:absolute;
    top:0px;
    right:20px;
    width:150px;
    height:30px;
    background: rgb(187, 231, 248) !important;
    box-shadow: 0px 0px 3px blue;
}

.hmDateSelect button span{
    font-size:16px;
}

.hmTableWrap{
    width:100%;
    border-radius: 7px;
}

.hmTableWrap .hmTable{
    width:100%;
    margin-top:10px;
}

.hmTableWrap .hmTable p{
    height:50px;
    line-height:50px;
    font-size:20px;
    font-family:CjFontTitleMedium;
    margin-bottom:0;
}
</style>
