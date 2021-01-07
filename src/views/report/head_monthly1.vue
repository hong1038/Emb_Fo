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
                                    <!--<v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dateFr" transition="scale-transition" offset-y max-width="290px" min-width="290px">
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
                                    </v-menu>-->
                                    <vue-monthly-picker v-model="dateFr" inputClass="dateSelectInput" dateFormat="YYYY-MM"
                                    :monthLabels="['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']">
                                    </vue-monthly-picker>
                                </div>
                            </b-col>
                            <v-spacer></v-spacer>
                            <b-col cols="1">
                                <button type="button" class="hmPlus" v-on:click="getList1">조회</button>
                                <!-- <input class="mtz_btn01" type="button" v-on:click="excelBtn" value="엑셀 저장"> -->
                            </b-col>
                            
                        </b-row>
                    </div>
                    <div class="hmTableWrap">
                        <div class="hmTable hmTable01">
                            <p>1. 전체 통계</p>
                            <!--<ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="tsFields" :rowData="tsList" :pagination="true" ></ag-grid-vue>-->
                            <div class="hmTotalTable">
                                <div class="float-left tableLeft">
                                    <div class="tableTitle">
                                        <div class="float-left"><span>대분류</span></div>
                                        <div class="float-left"><span>소분류</span></div>
                                        <div class="float-left"><span>단위</span></div>
                                    </div>
                                    <div class="mainCate" v-for="item in items" v-bind:key="item.mainKey">
                                        <div class="float-left"><span>{{item.headerName}}</span></div>
                                        <div class="float-left"><span>{{item.subCate}}</span></div>
                                        <div class="float-left"><span>{{item.subCate02}}</span></div>
                                        <div class="float-left"><span>{{item.unit}}</span></div>
                                    </div>
                                </div>
                                <div class="float-left tableRight">
                                    <div class="tableMonth">
                                        <div class="float-left" v-for="item in month" v-bind:key="item.mainKey"><p><span>{{item.monthName}}</span>월</p></div>
                                    </div>
                                    <div class="tableArea">
                                        <div class="float-left" v-for="item in area" v-bind:key="item.mainKey"><span>{{item.areaName}}</span></div>
                                    </div>
                                    <div class="tableBody">
                                        <div class="float-left" v-for='item in measureBody_01' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                        <div class="float-left" v-for='item in measureBody_02' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                        <div class="float-left" v-for='item in measureBody_03' v-bind:key="item.num"><span>{{item.num}}</span></div>

                                        <div class="float-left" v-for='item in odorBody_01' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                        <div class="float-left" v-for='item in odorBody_02' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                        <div class="float-left" v-for='item in odorBody_03' v-bind:key="item.num"><span>{{item.num}}</span></div>

                                        <div class="float-left" v-for='item in waterBody_01' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                        <div class="float-left" v-for='item in waterBody_02' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                        <div class="float-left" v-for='item in waterBody_03' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                        
                                        <div class="float-left" v-for='item in airBody_01' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                        <div class="float-left" v-for='item in airBody_02' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                        <div class="float-left" v-for='item in airBody_03' v-bind:key="item.num"><span>{{item.num}}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hmTable hmTable02">
                            <p>2. 유형별 통계</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="ttfields" :rowData="ttListA" :gridOptions="gridOptions" :pagination="true" >
                        </ag-grid-vue>
                        </div>
                        <div class="hmTable hmTable03">
                            <p>3. 문제점 / 이슈사항</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="eiFields" :rowData="eiList" :pagination="true" >
                            </ag-grid-vue>
                        </div>
                        <div class="hmTable hmTable04">
                            <p>4. 이상점 및 비정상 대응확인</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="erFields" :rowData="erList" :pagination="true" >
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

import VueMonthlyPicker from 'vue-monthly-picker'
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        vue,
        Left,
        Main,
        AgGridVue,
        VueMonthlyPicker
    },
    data() {
        return {
            selectWorkplace: "",
            dateFr: store.state.curMmFr,
            date: store.state.curMmFr,
            pageNo:1,
            pageSz:store.state.paginationPageSize,
            testList:[],
            list:[],
            listCount:0,
            
            //1. 전체통계
            items:[
                {mainKey: '1', headerName : '환경모니터링', subCate : '설비적/기계적 문제 발생 및 대응 현황', subCate02 : '발생', unit:'배'},
                {mainKey: '2', headerName : '환경모니터링', subCate : '설비적/기계적 문제 발생 및 대응 현황', subCate02 : '조치', unit:'배'},
                {mainKey: '3', headerName : '환경모니터링', subCate : '설비적/기계적 문제 발생 및 대응 현황', subCate02 : '조치율', unit:'%'},
                {mainKey: '4', headerName : '악취', subCate : '모니터링 이상 대응', subCate02 : '발생', unit:'배'},
                {mainKey: '5', headerName : '악취', subCate : '모니터링 이상 대응', subCate02 : '조치', unit:'배'},
                {mainKey: '6', headerName : '악취', subCate : '모니터링 이상 대응', subCate02 : '조치율', unit:'%'},
                {mainKey: '7', headerName : '수질', subCate : '모니터링 이상 대응', subCate02 : '발생', unit:''},
                {mainKey: '8', headerName : '수질', subCate : '모니터링 이상 대응', subCate02 : '조치', unit:''},
                {mainKey: '9', headerName : '수질', subCate : '모니터링 이상 대응', subCate02 : '조치율', unit:'%'},
                {mainKey: '10', headerName : '대기', subCate : '모니터링 이상 대응', subCate02 : '발생', unit:''},
                {mainKey: '11', headerName : '대기', subCate : '모니터링 이상 대응', subCate02 : '조치', unit:''},
                {mainKey: '12', headerName : '대기', subCate : '모니터링 이상 대응', subCate02 : '조치율', unit:'%'},
            ],
            month:[
                {mainKey : '1', monthName : ''},
                {mainKey : '2', monthName : ''},
                {mainKey : '3', monthName : ''},
                {mainKey : '4', monthName : ''},
                {mainKey : '5', monthName : ''},
                {mainKey : '6', monthName : ''},
                {mainKey : '7', monthName : ''},
            ],
            area:[
                {mainKey : '1', areaName : '경인권'},
                {mainKey : '2', areaName : '중부권'},
                {mainKey : '3', areaName : '영남권'},
                {mainKey : '4', areaName : '계열사'},
                {mainKey : '5', areaName : '바이오'},
                {mainKey : '6', areaName : '남부권'},
                {mainKey : '7', areaName : '합계'},
            ],
            measureBody_01:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            measureBody_02:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            measureBody_03:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            odorBody_01:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            odorBody_02:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            odorBody_03:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            waterBody_01:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            waterBody_02:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            waterBody_03:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            airBody_01:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            airBody_02:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            airBody_03:[
                {mainKey : '1', num : ''},
                {mainKey : '2', num : ''},
                {mainKey : '3', num : ''},
                {mainKey : '4', num : ''},
                {mainKey : '5', num : ''},
                {mainKey : '6', num : ''},
                {mainKey : '7', num : ''},
            ],
            tsListA:[],
            tsListB:[],
            //1. 전체통계
            
            // tsListCount:0,
            // tsFields: [
            //     {
            //         field: 'category',
            //         headerName: '대분류',
            //         width: '140px'
            //     },
            //     {
            //         field: '',
            //         headerName: '소분류',
            //         width: '140px'
            //     },
            //     {
            //         field: '',
            //         headerName: '단위',
            //         width: '80px'
            //     },
            //     {
            //         field: '',
            //         headerName: '경인권',
            //         width: '190px'
            //     },
            //     {
            //         field: '',
            //         headerName: '중부권',
            //         width : '190'
            //     },
            //     {
            //         field: '',
            //         headerName: '남부권',
            //         width: '190px'
            //     },
            //     {
            //         field: '',
            //         headerName: '영남권',
            //         width : '190'
            //     },
            //     {
            //         field: '',
            //         headerName: '계열사',
            //         width: '190px'
            //     },
            //     {
            //         field: '',
            //         headerName: '합계',
            //         width : '190'
            //     },
            // ],

            //2. 유형별 통계
            ttListA:[],
            ttListB:[],
            ttListCount:0,
            ttfields: [
                {
                    field: 'area',
                    headerName: '권역',
                    width: '105px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
                // {
                //     field: 'category_cd',
                //     headerName: '구분',
                //     width: '80px'
                // },
                // {
                //     field: 'unit',
                //     headerName: '구분',
                //     width: '80px'
                // },
                {
                    field: '',
                    headerName: '환경모니터링',
                    children:[
                        {
                            field : '',
                            headerName : '측정기, 방지시설 문제/이슈대응(기계적 문제)',
                            children : [
                                {
                                    field : 's1',
                                    headerName : '센서이상',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 't1',
                                    headerName : '통신이상',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'f1',
                                    headerName : '설비이상',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'sv_occur_to',
                                    headerName : '소계',
                                    width : '80',
                                    cellStyle: {textAlign: 'center' }
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
                                    field : 'ob1',
                                    headerName : '농도상승',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'ob2',
                                    headerName : '수치오류',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'sv_obor_occur_to',
                                    headerName : '소계',
                                    width : '80',
                                    cellStyle: {textAlign: 'center'}
                                },
                            ]
                        },
                        {
                            field : '',
                            headerName : '수질',
                            children : [
                                {
                                    field : 'wat1',
                                    headerName : '농도상승',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'wat2',
                                    headerName : '수치오류',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'sv_wat_occur_to',
                                    headerName : '소계',
                                    width : '80',
                                    cellStyle: {textAlign: 'center'}
                                },
                            ]
                        },
                        {
                            field : '',
                            headerName : '대기',
                            children : [
                                {
                                    field : 'air1',
                                    headerName : '농도상승',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'air2',
                                    headerName : '수치오류',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'sv_air_occur_to',
                                    headerName : '소계',
                                    width : '80',
                                    cellStyle: {textAlign: 'center'}
                                },
                            ]
                        },
                        {
                            field : '',
                            headerName : '합계',
                            children : [
                                {
                                    field : 'all1',
                                    headerName : '농도상승',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'all2',
                                    headerName : '수치오류',
                                    width : '112',
                                    cellStyle: {textAlign: 'center'}
                                },
                                {
                                    field : 'all_occur_to',
                                    headerName : '소계',
                                    width : '80',
                                    cellStyle: {textAlign: 'center'}
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
                    width: '100px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '110px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치',
                    width: '220px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'abn_type',
                    headerName: '유형',
                    width : '110',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'rs_date',
                    headerName: '발생 일자',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: '',
                    headerName: '문제점 개선 계획',
                    children : [
                        {
                            field : 'cause',
                            headerName : '문제점/이슈사항',
                            width: '418',
                            cellStyle: {textAlign: 'left'}
                        },
                        {
                            field : 'action',
                            headerName : '대응 방안',
                            width: '470',
                            cellStyle: {textAlign: 'left'}
                        },
                        {
                            field : 'action_date',
                            headerName : '일정',
                            width: '120',
                            cellStyle: {textAlign: 'center'}
                        },
                    ]
                },
                {
                    field: 'action_type',
                    headerName: '완료 상태',
                    width: '110px',
                    cellStyle: {textAlign: 'center'}
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
                    width: '100px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 're_date',
                    headerName: '발생일자',
                    width: '110px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'public_name',
                    headerName: '공정명',
                    width : '140',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '방지시설명',
                    width: '200px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'abn_type',
                    headerName: '유형',
                    width : '140',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'cause',
                    headerName: '초과사항 확인결과 원인',
                    width: '320px',
                    cellStyle: {textAlign: 'left'}
                },
                {
                    field: 'action',
                    headerName: '조치사항',
                    width : '400',
                    cellStyle: {textAlign: 'left'}
                },
                {
                    field: 'action_type',
                    headerName: '조치여부',
                    width : '105',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'action_date',
                    headerName: '조치 완료 일자',
                    width : '140',
                    cellStyle: {textAlign: 'center'}
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
        filterDate(date){
            let getDate = date.split('-');

            this.month = this.month.filter(function(item){
                return item.monthName = getDate[1]
            })
        },
        filterValue(item){
            console.log(item)
            //악취 발생
            if(item[0].n6 == "" || item[0].n6 == null){
                item[0].n6 = 0;
            }

            //설비적/기계적 문제 발생 및 대응 현황
            this.measureBody_01[0].num = item[0].n1
            this.measureBody_01[1].num = item[0].n2
            this.measureBody_01[2].num = item[0].n3
            this.measureBody_01[3].num = item[0].n4
            this.measureBody_01[4].num = item[0].n5
            this.measureBody_01[5].num = item[0].n6
            

            let SumVal_01 = item[0].n1 + item[0].n2 + item[0].n3 + item[0].n4 + item[0].n5 + item[0].n6
            this.measureBody_01[6].num = SumVal_01
            
            //설비적/기계적 문제 발생 및 대응 현황 조치
            if(item[0].p6 == "" || item[0].p6 == null){
                item[0].p6 = 0;
            }
            this.measureBody_02[0].num = item[0].p1
            this.measureBody_02[1].num = item[0].p2
            this.measureBody_02[2].num = item[0].p3
            this.measureBody_02[3].num = item[0].p4
            this.measureBody_02[4].num = item[0].p5
            this.measureBody_02[5].num = item[0].p6
            
            let SumVal_02 = item[0].p1 + item[0].p2 + item[0].p3 + item[0].p4 + item[0].p5 + item[0].p6
            this.measureBody_02[6].num = SumVal_02

            //설비적/기계적 문제 발생 및 대응 현황 조치율
            let measurePer_01 = (item[0].p1 / item[0].n1) * 100;
            let measurePer_02 = (item[0].p2 / item[0].n2) * 100;
            let measurePer_03 = (item[0].p3 / item[0].n3) * 100;
            let measurePer_04 = (item[0].p4 / item[0].n4) * 100;
            let measurePer_05 = (item[0].p5 / item[0].n5) * 100;
            let measurePer_06 = (item[0].p6 / item[0].n6) * 100;
            let measurePer_07 = (this.measureBody_02[6].num / this.measureBody_01[6].num) * 100;
            
            if(isNaN){
                measurePer_01 = '0';
                measurePer_02 = '0';
                measurePer_03 = '0';
                measurePer_04 = '0';
                measurePer_05 = '0';
                measurePer_06 = '0';
                measurePer_07 = '0';
            }

            this.measureBody_03[0].num = measurePer_01;
            this.measureBody_03[1].num = measurePer_02;
            this.measureBody_03[2].num = measurePer_03;
            this.measureBody_03[3].num = measurePer_04;
            this.measureBody_03[4].num = measurePer_05;
            this.measureBody_03[5].num = measurePer_06;
            this.measureBody_03[6].num = measurePer_07;

        },


        filterValu2(item){
            console.log(item)
            //악취 발생
            if(item[0].a6 == "" || item[0].a6 == null){
                item[0].a6 = 0;
            }

            if(item[0].c6 == "" || item[0].c6 == null){
                item[0].c6 = 0;
            }

            if(item[0].e6 == "" || item[0].e6 == null){
                item[0].e6 = 0;
            }


            if(item[0].b6 == "" || item[0].b6 == null){
                item[0].b6 = 0;
            }

            if(item[0].d6 == "" || item[0].d6 == null){
                item[0].d6 = 0;
            }

            if(item[0].f6 == "" || item[0].f6 == null){
                item[0].f6 = 0;
            }
            //악취 

            this.odorBody_01[0].num = item[0].a1
            this.odorBody_01[1].num = item[0].a2
            this.odorBody_01[2].num = item[0].a3
            this.odorBody_01[3].num = item[0].a4
            this.odorBody_01[4].num = item[0].a5
            this.odorBody_01[5].num = item[0].a6

            this.odorBody_02[0].num = item[0].b1
            this.odorBody_02[1].num = item[0].b2
            this.odorBody_02[2].num = item[0].b3
            this.odorBody_02[3].num = item[0].b4
            this.odorBody_02[4].num = item[0].b5
            this.odorBody_02[5].num = item[0].b6
            
            this.odorBody_01[6].num = item[0].obor_occur_to
            this.odorBody_02[6].num = item[0].obor_ms_to

            let odorPer_01 = (item[0].b1 / item[0].a1) * 100;
            let odorPer_02 = (item[0].b2 / item[0].a2) * 100;
            let odorPer_03 = (item[0].b3 / item[0].a3) * 100;
            let odorPer_04 = (item[0].b4 / item[0].a4) * 100;
            let odorPer_05 = (item[0].b5 / item[0].a5) * 100;
            let odorPer_06 = (item[0].b6 / item[0].a6) * 100;
            let odorPer_07 = (this.odorBody_02[6].num / this.odorBody_01[6].num) * 100;
            
            if(isNaN){
                odorPer_01 = '0';
                odorPer_02 = '0';
                odorPer_03 = '0';
                odorPer_04 = '0';
                odorPer_05 = '0';
                odorPer_06 = '0';
                odorPer_07 = '0';
            }

            this.odorBody_03[0].num = odorPer_01;
            this.odorBody_03[1].num = odorPer_02;
            this.odorBody_03[2].num = odorPer_03;
            this.odorBody_03[3].num = odorPer_04;
            this.odorBody_03[4].num = odorPer_05;
            this.odorBody_03[5].num = odorPer_06;
            this.odorBody_03[6].num = odorPer_07;

            //수질

            this.waterBody_01[0].num = item[0].c1
            this.waterBody_01[1].num = item[0].c2
            this.waterBody_01[2].num = item[0].c3
            this.waterBody_01[3].num = item[0].c4
            this.waterBody_01[4].num = item[0].c5
            this.waterBody_01[5].num = item[0].c6

            this.waterBody_02[0].num = item[0].d1
            this.waterBody_02[1].num = item[0].d2
            this.waterBody_02[2].num = item[0].d3
            this.waterBody_02[3].num = item[0].d4
            this.waterBody_02[4].num = item[0].d5
            this.waterBody_02[5].num = item[0].d6
            
            this.waterBody_01[6].num = item[0].wat_occur_to
            this.waterBody_02[6].num = item[0].wat_ms_to

            let waterPer_01 = (item[0].d1 / item[0].c1) * 100;
            let waterPer_02 = (item[0].d2 / item[0].c2) * 100;
            let waterPer_03 = (item[0].d3 / item[0].c3) * 100;
            let waterPer_04 = (item[0].d4 / item[0].c4) * 100;
            let waterPer_05 = (item[0].d5 / item[0].c5) * 100;
            let waterPer_06 = (item[0].d6 / item[0].c6) * 100;
            let waterPer_07 = (this.waterBody_02[6].num / this.waterBody_01[6].num) * 100;
            
            if(isNaN){
                waterPer_01 = '0';
                waterPer_02 = '0';
                waterPer_03 = '0';
                waterPer_04 = '0';
                waterPer_05 = '0';
                waterPer_06 = '0';
                waterPer_07 = '0';
            }

            this.waterBody_03[0].num = waterPer_01;
            this.waterBody_03[1].num = waterPer_02;
            this.waterBody_03[2].num = waterPer_03;
            this.waterBody_03[3].num = waterPer_04;
            this.waterBody_03[4].num = waterPer_05;
            this.waterBody_03[5].num = waterPer_06;
            this.waterBody_03[6].num = waterPer_07;

            //대기

            this.airBody_01[0].num = item[0].e1
            this.airBody_01[1].num = item[0].e2
            this.airBody_01[2].num = item[0].e3
            this.airBody_01[3].num = item[0].e4
            this.airBody_01[4].num = item[0].e5
            this.airBody_01[5].num = item[0].e6

            this.airBody_02[0].num = item[0].f1
            this.airBody_02[1].num = item[0].f2
            this.airBody_02[2].num = item[0].f3
            this.airBody_02[3].num = item[0].f4
            this.airBody_02[4].num = item[0].f5
            this.airBody_02[5].num = item[0].f6
            
            this.airBody_01[6].num = item[0].air_occur_to
            this.airBody_02[6].num = item[0].air_ms_to

            let airPer_01 = (item[0].f1 / item[0].e1) * 100;
            let airPer_02 = (item[0].f2 / item[0].e2) * 100;
            let airPer_03 = (item[0].f3 / item[0].e3) * 100;
            let airPer_04 = (item[0].f4 / item[0].e4) * 100;
            let airPer_05 = (item[0].f5 / item[0].e5) * 100;
            let airPer_06 = (item[0].f6 / item[0].e6) * 100;
            let airPer_07 = (this.airBody_02[6].num / this.airBody_01[6].num) * 100;
            
            if(isNaN){
                airPer_01 = '0';
                airPer_02 = '0';
                airPer_03 = '0';
                airPer_04 = '0';
                airPer_05 = '0';
                airPer_06 = '0';
                airPer_07 = '0';
            }

            this.airBody_03[0].num = airPer_01;
            this.airBody_03[1].num = airPer_02;
            this.airBody_03[2].num = airPer_03;
            this.airBody_03[3].num = airPer_04;
            this.airBody_03[4].num = airPer_05;
            this.airBody_03[5].num = airPer_06;
            this.airBody_03[6].num = airPer_07;

        },
        async getList1() {
            if(String(this.dateFr._d).length > 15){
                let y = String(this.dateFr._d).substring(11,15);
                let m = String(this.dateFr._d).substring(4,7);
                if(m == "Jan"){
                    m = "01"
                }
                else if(m == "Feb"){
                    m = "02"
                }
                else if(m == "Feb"){
                    m = "02"
                }
                else if(m == "Mar"){
                    m = "03"
                }
                else if(m == "Apr"){
                    m = "04"
                }
                else if(m == "May"){
                    m = "05"
                }
                else if(m == "Jun"){
                    m = "06"
                }
                else if(m == "Jul"){
                    m = "07"
                }
                else if(m == "Aug"){
                    m = "08"
                }
                else if(m == "Sep"){
                    m = "09"
                }
                else if(m == "Oct"){
                    m = "10"
                }
                else if(m == "Nov"){
                    m = "11"
                }
                else if(m == "Dec"){
                    m = "12"
                }
                this.dateFr = y +"-"+ m   
            }
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }
            this.onClick();
            this.filterDate(this.dateFr);

            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/report/areaCount", {
                    dateFr: this.dateFr,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.tsListA = res.data.data
                            this.filterValue(this.tsListA);
                            this.getList11()
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
                
                
                this.busy = false;

        },
        async getList11() {
            this.onClick();
            this.filterDate(this.dateFr);

            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/report/categoryOccurCount", {
                    dateFr: this.dateFr,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            // console.log(res.data.data)
                            that.tsListB = res.data.data
                            this.filterValu2(that.tsListB)
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
                this.getList2()
                // this.filterValue(this.tsListB);
                this.busy = false;
                
        },
        async getList2() {
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            await this.$Axios.post("/api/daedan/cj/ems/report/caseStatisticsA", {
                    dateFr: this.dateFr,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            res.data.data.map(e => {
                                e.sv_occur_to = e.s1 + e.t1 + e.f1
                                e.sv_obor_occur_to = e.ob1 + e.ob2
                                e.sv_wat_occur_to = e.wat1 + e.wat2 
                                e.sv_air_occur_to = e.air1 + e.air2

                                e.all1 = e.ob1 + e.wat1 + e.air1
                                e.all2 = e.ob2 + e.wat2 + e.air2
                                e.all_occur_to = e.sv_air_occur_to + e.sv_obor_occur_to + e.sv_wat_occur_to
                            })
                            that.ttListA = res.data.data
                            console.log(that.ttListA)

                        }
                    }
                })
                .catch(err => {
                    alert("유형별 통계목록 추출 실패 \n" + err);
                })
                this.busy = false;
                this.getList22()
        },
        async getList22() {
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            await this.$Axios.post("/api/daedan/cj/ems/report/caseStatisticsB", {
                    dateFr: this.dateFr,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.ttListB = res.data.data
                        }
                    }
                })
                .catch(err => {
                    alert("유형별 통계목록 추출 실패 \n" + err);
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
    },
    // 엑셀저장버튼 클릭
        excelBtn() {
            this.gridOptions.api.exportDataAsExcel({});
        },
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

// .mtz_btn01 {
//     position: absolute;
//     top: 0;
//     right:200px;
//     width: 150px;
//     height: 30px;
//     display: inline-block;
//     text-align: center;
//     cursor: pointer;
//     transition: all 0.3s;
//     box-sizing: border-box;
//     border-radius: 10px;
//     background: white;
//     box-shadow: 0px 0px 3px blue;
//     font-size: 16px;
// }

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
    background:white;
    border-radius: 10px;
    box-shadow: 0px 0px 3px blue;
    transition:all 0.3s;
    font-size:16px;
}

.hmDateSelect .hmPlus:hover{
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.hmDateSelect button span{
    font-size:14px;
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

.hmTableWrap .hmTable .hmTotalTable{
    width:100%;
    height:600px;
    font-size:14px;
    .tableLeft{
        width:40%;
        height:100%;
        background:rgb(34,38,40);
        .tableTitle{
            height:45px;
            line-height:45px;
            margin-top:45px;
            font-weight:bold;
            >div{
                box-sizing: border-box;
                &:nth-child(1){
                    width:30%;
                    height:100%;
                }
                &:nth-child(2){
                    width:60%;
                    height:100%;
                }
                &:nth-child(3){
                    width:10%;
                    height:100%;
                }
                >span{
                    display:block;
                    width:100%;
                    height:100%;
                    text-align: center;
                    color:white;
                    border:0.5px solid rgb(102, 102, 102);
                }
            }
        }
        .mainCate{
            height:40px;
            line-height:40px;
            >div{
                box-sizing: border-box;
                border:0.5px solid rgb(102, 102, 102);
                &:nth-child(1){
                    width:30%;
                    height:100%;
                }
                &:nth-child(2){
                    width:50%;
                    height:100%;
                }
                &:nth-child(3){
                    width:10%;
                    height:100%;
                }
                &:nth-child(4){
                    width:10%;
                    height:100%;
                }
                >span{
                    display:block;
                    width:100%;
                    height:100%;
                    text-align: center;
                    color:white;
                }
            }
        }
    }
    .tableRight{
            width:60%;
            height:100%;
            background:rgb(34,38,40);
            .tableMonth{
                height:45px;
                >div{
                    width:calc(100% / 7);
                    height:100%;
                    >p{
                        width:100%;
                        height:100%;
                        text-align:center;
                        font-size:14px;
                        border:0.5px solid rgb(102, 102, 102);
                        border-bottom:none;
                        color:white;
                        line-height:45px;
                        >span{
                            line-height:40px;
                            color:white;
                            text-align:center;
                            
                        }
                    }
                }
                
            }

            .tableArea{
            height:45px;
            line-height:45px;
            font-weight:bold;
                >div{
                    width:calc(100% / 7);
                    height:100%;
                    >span{
                        display:block;
                        width:100%;
                        height:100%;
                        color:white;
                        text-align:center;
                        border:0.5px solid rgb(102, 102, 102);
                    }
                }
            }
            .tableBody{
                height:40px;
                line-height:40px;
                >div{
                    width:calc(100% / 7);
                    height:100%;
                    >span{
                        display:block;
                        width:100%;
                        height:100%;
                        color:white;
                        text-align: center;
                        border:0.5px solid rgb(102, 102, 102);
                    }
                }
            }
        }
}

.hmTable .ag-header-cell-label {
   justify-content: center !important;
}

.hmTable03 .ag-header-cell:nth-child(7) .ag-header-cell-label,
.hmTable03 .ag-header-cell:nth-child(8) .ag-header-cell-label,
.hmTable04 .ag-header-cell:nth-child(8) .ag-header-cell-label,
.hmTable04 .ag-header-cell:nth-child(9) .ag-header-cell-label {
   justify-content: left !important;
}
</style>
