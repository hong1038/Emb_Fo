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
                            </b-col>
                            <b-col cols="3" class="col-3">
                                <input type="button" class="d_btn02" value="프린트" @click="print">
                                <input type="button" class="d_btn01" value="조회" v-on:click="getList1">
                            </b-col>
                       
                        </b-row>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="dailyTableWrap"  id="printMe">
                        <div class="dailyTable dailyTable01">
                            <p>1. 일일 모니터링 통계</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" id='FirstGrid' :dataSource='monitorList' :toolbar='toolbarOptions' :allowExcelExport='true' :toolbarClick='toolbarClick' :columnDefs="monitorFields" :rowData="monitorList" :pagination="true" v-b-visible="handleVisibility"></ag-grid-vue>
                            <canvas style="background:white" id="chart1" width="1550px" height="550" ></canvas>
                        </div>
                        <div class="dailyTable dailyTable02">
                            <p>2. 배출시설(흡입구) 트렌드 분석 : 이상점(농도 상승) 확인 및 조치 사항</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" id='SecondGrid' :dataSource='inletList' :allowExcelExport='true' :columnDefs="inletFields" :rowData="inletList" :pagination="true" v-b-visible="handleVisibility"></ag-grid-vue>
                            <canvas style="background:white" id="chart2" width="1550px" height="550" ></canvas>
                        </div>
                        <div class="dailyTable dailyTable03">
                            <p>3. 배출구 초과이력 관리</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="outletFields" :rowData="outletList" :pagination="true" v-b-visible="handleVisibility"></ag-grid-vue>
                            <canvas style="background:white" id="chart3" width="1550px" height="550" ></canvas>
                        </div>
                        <div class="dailyTable dailyTable04">
                            <p>4. 설비적/기계적 문제 발생 및 대응 현황</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="errorFields" :rowData="errorList" :pagination="true" v-b-visible="handleVisibility">
                            </ag-grid-vue>
                        </div>
                        <div class="dailyTable dailyTable05">
                            <p>5. 운영 특이사항</p>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="etcFields" :rowData="etcList" :pagination="true" v-b-visible="handleVisibility">
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
import axios from 'axios';
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'
import Main from '@/components/main.vue'
import Vue from 'vue'


import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { GridPlugin, Toolbar, ExcelExport } from "@syncfusion/ej2-vue-grids";
import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue,
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
            output: null,
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
            dateFr: store.state.szCurMmTo,

            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            
            pageSz:store.state.paginationPageSize,

            //1. 일일 모니터링 통계

            chart1inletMax:[],
            chart1inletAvg:[],
            chart1inletMin:[],
            chart1standard:[],
            chart1outletMax:[],
            chart1outletAvg:[],
            chart1outletMin:[],
            chart1label:[],
            monitorListCount:0,
            monitorList:[],
            monitorFields: [
                // {
                //     field: 'server_key',
                //     hidden: true
                // },
                // {
                //     field: 'equipment_key',
                //     hidden: true
                // },
                // {
                //     field: 'sensor_key',
                //     hidden: true
                // },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'category_cd',
                    headerName: '분야',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치',
                    width: '357px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'unit',
                    headerName: '단위',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: '',
                    headerName: '흡입구',
                    children: [{
                            field: 'inlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '80',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'inlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '80',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'inlet_max_value',
                            headerName: '최소',
                            type: 'number',
                            width: '80',
                            cellStyle: {textAlign: 'center'}
                        },
                    ]
                },
                {
                    field: '',
                    headerName: '배출구',
                    children: [
                        {
                            field: 'outlet_standard_value',
                            headerName: '기준',
                            type: 'number',
                            width: '80px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'outlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '80px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'outlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '80px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'outlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '80px',
                            cellStyle: {textAlign: 'center'}
                        },
                    ]
                },
                {
                    field: '',
                    headerName: '초과횟수',
                    type: 'number',
                    width: '110px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'procRate',
                    headerName: '방지시설 효율(%)',
                    width:'200',
                    cellStyle: {textAlign: 'center'}
                },
            ],

            //2. 배출시설(흡입구) 트렌드 분석 : 이상점(농도 상승) 확인 및 조치 사항

            chart2inletMax:[],
            chart2inletAvg:[],
            chart2inletMin:[],
            chart2abel:[],
            inletListCount:0,
            inletList: [],
            inletFields: [
                {
                    field: 'category_cd',
                    headerName: '분야',
                    width: '140px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치',
                    width: '200px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: '',
                    headerName: '흡입구',
                    children: [{
                            field: 'inlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '100px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'inlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '100px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'inlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '100px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'occur_yn',
                            headerName: '이상점 발생 횟수',
                            type: 'number',
                            width: '160px',
                            cellStyle: {textAlign: 'center'}
                        },
                    ]
                },
                {
                    field: 'cause',
                    headerName: '변경점/이상점 확인결과 원인',
                    width: '230px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'action',
                    headerName: '조치사항',
                    width: '170px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'action_type',
                    headerName: '조치 여부',
                     width: '110px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'action_date',
                    headerName: '조치 완료일자',
                    width:'195',
                    cellStyle: {textAlign: 'center'}
                },
            ],

            //3. 배출구 초과이력 관리
            chart3standard:[],
            chart3outletMax:[],
            chart3label:[],

            outletListCount:0,
            outletList:[],
            outletFields: [
                {
                    field: 'category_cd',
                    headerName: '분야',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치',
                    width: '248px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: '',
                    headerName: '배출구',
                    children: [{
                            field: 'outlet_standard_value',
                            headerName: '기준',
                            type: 'number',
                            width: '80px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'outlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '80px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'occur',
                            headerName: '초과횟수',
                            type: 'number',
                            width: '160px',
                            cellStyle: {textAlign: 'center'}
                        },
                    ]
                },
                {
                    field: 'pre_rate',
                    headerName: '방지시설 처리효율(%)',
                    width: '190px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'abn_type',
                    headerName: '유형',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'cause',
                    headerName: '초과사항 확인결과 원인',
                    width: '220px',
                    cellStyle: {textAlign: 'left'}
                },
                {
                    field: 'action',
                    headerName: '조치사항',
                    width:'120',
                    cellStyle: {textAlign: 'left'}
                },
                {
                    field: 'action_type',
                    headerName: '조치여부',
                    width:'110',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'prevention_date',
                    headerName: '조치 완료일자',
                    width:'140',
                    cellStyle: {textAlign: 'center'}
                },
            ],
            
            //4. 설비적/기계적 문제 발생 및 대응 현황
            errorListCount:0,
            errorList:[],
            errorFields: [
                {
                    field: 'category_cd',
                    headerName: '분야',
                    width: '100px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '200px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'abn_type',
                    headerName: '유형',
                    width: '190px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'rs_date',
                    headerName: '발생 일자',
                    width: '140px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: '',
                    headerName: '문제점 개선 계획',
                    children: [{
                            field: 'cause',
                            headerName: '문제점/이슈사항',
                            type: 'number',
                            width: '310px',
                            cellStyle: {textAlign: 'left'}
                        },
                        {
                            field: 'action',
                            headerName: '대응 방안',
                            type: 'number',
                            width: '305px',
                            cellStyle: {textAlign: 'left'}
                        },
                        {
                            field: 'action_date',
                            headerName: '일정',
                            type: 'number',
                            width: '140px',
                            cellStyle: {textAlign: 'center'}
                        },
                    ]
                },
                {
                    field: 'action_type',
                    headerName: '완료 여부',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
            ],

            //5. 운영 특이사항
            etcListCount:0,
            etcList:[],
            etcFields: [
                {
                    field: 'category_cd',
                    headerName: '분야',
                    width: '200px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '200px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'issue',
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
        this.getConditionList();
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
          toolbarClick: function (args) {
          if (args.item.id === 'FirstGrid_excelexport') { // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
            let appendExcelExportProperties = {
                multipleExport: { type: 'AppendToSheet', blankRows: 2 }
            };

            let firstGridExport = this.$refs.grid1.excelExport(appendExcelExportProperties, true);
            firstGridExport.then((fData) => {
                this.$refs.grid2.excelExport(appendExcelExportProperties, false, fData);
            });
        }
      },
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
            console.log(that.comboServers)

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
        async getList1() {
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
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
                            // console.log(res.data.data)
                            that.monitorList = []
                            let test = []
                            let list2 = []
                            let listStandart = []
                            test = res.data.data.reduce((acc,v) => {
                                // console.log(Object.values(v).slice(0,30 ))

                                let key = Object.values(v).slice(0,25).filter((e,idx)=> idx === 0 || idx === 17).join('')
                                listStandart.push(key)
                                acc[key] = acc[key] ? [...acc[key], v] : [v]
                                return acc
                            }, [])
                            // console.log(test)

                            listStandart = [...new Set(listStandart)]
                            listStandart.map(e => {
                                list2.push(test[e])
                            })
                            list2.map(e=>{
                                if (e.length === 1) {
                                    e[0].procRate = '-'
                                    if (e[0].place === 511) {
                                        e[0].outlet_standard_value = e[0].midlet_standard_value
                                        e[0].outlet_max_value = e[0].midlet_max_value 
                                        e[0].outlet_avg_value = e[0].midlet_avg_value 
                                        e[0].outlet_min_value = e[0].midlet_min_value 
                                    }
                                    that.monitorList.push(e[0])        
                                }else if (e.length === 2) {
                                    let outval = []
                                    let inval = []
                                    // console.log(e)
                                    e.map(item => {

                                        if (item.place === 510) {
                                            inval = item;
                                        }else if (item.place === 512 || item.place === 511 ) {
                                            // item.action_type = item.action_type !== null ? item.action_type : null 
                                            outval = item;
                                        }
                                    })
                                    let objectitem = {}
                                    
                                    if (outval.place === 511) {
                                        objectitem = {
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':outval.inlet_max_value,
                                            'inlet_avg_value':outval.inlet_avg_value,
                                            'inlet_min_value':outval.inlet_min_value,
                                            'inoccur':outval.inoccur,
                                            'unit':outval.unit,
                                            'outlet_standard_value':outval.midlet_standard_value,
                                            'outlet_max_value':outval.midlet_max_value,
                                            'outlet_avg_value':outval.midlet_avg_value,
                                            'outlet_min_value':outval.midlet_min_value,
                                            'outoccur':outval.outoccur,
                                            // 'proc_rt':(Math.floor(inval.inlet_avg_value - outval.outlet_avg_value) / (inval.inlet_avg_value*100)).toFixed(2) + "%",
                                            'procRate':"-",
                                        }                                      
                                    }else{       
                                        objectitem = {
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':inval.inlet_max_value,
                                            'inlet_avg_value':inval.inlet_avg_value,
                                            'inlet_min_value':inval.inlet_min_value,
                                            'inoccur':inval.inoccur,
                                            'unit':outval.unit,
                                            'outlet_standard_value':outval.outlet_standard_value,
                                            'outlet_max_value':outval.outlet_max_value,
                                            'outlet_avg_value':outval.outlet_avg_value,
                                            'outlet_min_value':outval.outlet_min_value,
                                            'outoccur':outval.outoccur,
                                            'procRate':(Math.floor(inval.inlet_avg_value - outval.outlet_avg_value) / inval.inlet_avg_value*100).toFixed(2) + "%",
                                        }
                                    }
                                    that.monitorList.push(objectitem)   
                                }

                                
                            })



                            // that.monitorList = res.data.data
                            that.monitorListCount = res.data.totalCount
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
            await this.$Axios.post("/api/daedan/cj/ems/report/changeDataList", {
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
                            this.inletList = []
                            let test = []
                            let list2 = []
                            let listStandart = []
                            test = res.data.data.reduce((acc,v) => {
                                // console.log(Object.values(v).slice(0,30 ))

                                let key = Object.values(v).slice(0,25).filter((e,idx)=> idx === 0 || idx === 16).join('')
                                listStandart.push(key)
                                acc[key] = acc[key] ? [...acc[key], v] : [v]
                                return acc
                            }, [])
                            // console.log(test)

                            listStandart = [...new Set(listStandart)]
                            listStandart.map(e => {
                                list2.push(test[e])
                            })
                            list2.map(e=>{
                                console.log(e)
                                if (e.length === 1) {
                                    e[0].procRate = '-'
                                    e[0].occur_yn = e[0].inlet_max_value >= e[0].inlet_standard_value ? "Y" : "N"
                                    if (e[0].place === 511) {
                                        e[0].outlet_standard_value = e[0].midlet_standard_value
                                        e[0].outlet_max_value = e[0].midlet_max_value 
                                        e[0].outlet_avg_value = e[0].midlet_avg_value 
                                        e[0].outlet_min_value = e[0].midlet_min_value 
                                    }
                                    
                                    that.inletList.push(e[0])        
                                }else if (e.length === 2) {
                                    let outval = []
                                    let inval = []
                                    // console.log(e)
                                    e.map(item => {
                                        if (item.place === 511) {
                                            console.log(e,2)
                                        }
                                        if (item.place === 510) {
                                            inval = item;
                                        }else if (item.place === 512 || item.place === 511 ) {
                                            // item.action_type = item.action_type !== null ? item.action_type : null 
                                            outval = item;
                                        }
                                    })
                                    let objectitem = {}
                                    
                                    if (outval.place === 511) {
                                        objectitem = {
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':outval.inlet_max_value,
                                            'inlet_avg_value':outval.inlet_avg_value,
                                            'inlet_min_value':outval.inlet_min_value,
                                            'inoccur':outval.inoccur,
                                            'unit':outval.unit,
                                            'outlet_standard_value':outval.midlet_standard_value,
                                            'outlet_max_value':outval.midlet_max_value,
                                            'outlet_avg_value':outval.midlet_avg_value,
                                            'outlet_min_value':outval.midlet_min_value,
                                            'outoccur':outval.outoccur,
                                            'occur_yn':inval.inlet_max_value >= inval.inlet_standard_value ? "Y" : "N",
                                            // 'proc_rt':(Math.floor(inval.inlet_avg_value - outval.outlet_avg_value) / (inval.inlet_avg_value*100)).toFixed(2) + "%",
                                            'procRate':"-",
                                        }                                      
                                    }else{       
                                        objectitem = {
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':inval.inlet_max_value,
                                            'inlet_avg_value':inval.inlet_avg_value,
                                            'inlet_min_value':inval.inlet_min_value,
                                            'inoccur':inval.inoccur,
                                            'unit':outval.unit,
                                            'outlet_standard_value':outval.outlet_standard_value,
                                            'outlet_max_value':outval.outlet_max_value,
                                            'outlet_avg_value':outval.outlet_avg_value,
                                            'outlet_min_value':outval.outlet_min_value,
                                            'occur_yn':outval.occur_yn,
                                            'outoccur':inval.inlet_max_value >= inval.inlet_standard_value ? "Y" : "N",
                                            'procRate':(Math.floor(inval.inlet_avg_value - outval.outlet_avg_value) / inval.inlet_avg_value*100).toFixed(2) + "%",
                                        }
                                    }
                                    that.inletList.push(objectitem)   
                                }


                                
                            })

                            // that.inletList = res.data.data
                            that.inletListCount = res.data.totalCount
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
            await this.$Axios.post("/api/daedan/cj/ems/report/excessDayList", {
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
                            console.log(res)
                            this.outletList = []
                            let test = []
                            let list2 = []
                            let listStandart = []
                            test = res.data.data.reduce((acc,v) => {
                                console.log(Object.values(v).slice(0,25))

                                let key = Object.values(v).slice(0,25).filter((e,idx)=> idx === 0 || idx === 13).join('')
                                listStandart.push(key)
                                acc[key] = acc[key] ? [...acc[key], v] : [v]
                                return acc
                            }, [])
                            console.log(test)

                            listStandart = [...new Set(listStandart)]
                            listStandart.map(e => {
                                list2.push(test[e])
                            })
                                                                   
                            list2.map(e=>{
                                console.log(e)
                                if (e.length === 1) {
                                    // e[0].pre_rate = '-'
                                    if (e[0].place === 512) {
                                        e[0].occur = e[0].outlet_max_value >= e[0].outlet_standard_value ? 1:0
                                    }
                                    if (e[0].place === 511) {
                                        e[0].occur = e[0].midlet_max_value >= e[0].midlet_standard_value ? 1:0
                                        e[0].outlet_standard_value = e[0].midlet_standard_value
                                        e[0].outlet_max_value = e[0].midlet_max_value 
                                        e[0].outlet_avg_value = e[0].midlet_avg_value 
                                        e[0].outlet_min_value = e[0].midlet_min_value 
                                    }
                                    that.outletList.push(e[0])        
                                }else if (e.length === 2) {
                                    let outval = []
                                    let inval = []
                                    // console.log(e)
                                    e.map(item => {

                                        if (item.place === 510) {
                                            inval = item;
                                        }else if (item.place === 512 || item.place === 511 ) {
                                            // item.action_type = item.action_type !== null ? item.action_type : null 
                                            outval = item;
                                        }
                                    })
                                    let objectitem = {}
                                    
                                    if (outval.place === 511) {
                                        objectitem = {
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':outval.inlet_max_value,
                                            'inlet_avg_value':outval.inlet_avg_value,
                                            'inlet_min_value':outval.inlet_min_value,
                                            'inoccur':outval.inoccur,
                                            'unit':outval.unit,
                                            'outlet_standard_value':outval.midlet_standard_value,
                                            'outlet_max_value':outval.midlet_max_value,
                                            'outlet_avg_value':outval.midlet_avg_value,
                                            'outlet_min_value':outval.midlet_min_value,
                                            'outoccur':outval.outoccur,
                                            // 'proc_rt':(Math.floor(inval.inlet_avg_value - outval.outlet_avg_value) / (inval.inlet_avg_value*100)).toFixed(2) + "%",
                                            'pre_rate':"-",
                                            'occur':outval.midlet_max_value >= outval.midlet_standard_value ? 1:0
                                            // 'pre_rate':outval.pre_rate,
                                        }                                      
                                    }else{       
                                        objectitem = {
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':inval.inlet_max_value,
                                            'inlet_avg_value':inval.inlet_avg_value,
                                            'inlet_min_value':inval.inlet_min_value,
                                            'inoccur':inval.inoccur,
                                            'unit':outval.unit,
                                            'outlet_standard_value':outval.outlet_standard_value,
                                            'outlet_max_value':outval.outlet_max_value,
                                            'outlet_avg_value':outval.outlet_avg_value,
                                            'outlet_min_value':outval.outlet_min_value,
                                            'outoccur':outval.outoccur,
                                            'occur':outval.midlet_max_value >= outval.midlet_standard_value ? 1:0,
                                            'pre_rate':(Math.floor(inval.inlet_avg_value - outval.outlet_avg_value) / inval.inlet_avg_value*100).toFixed(2) + "%",
                                            // 'pre_rate':outval.pre_rate,
                                        }
                                    }
                                    that.outletList.push(objectitem)   
                                }

                                
                            })


                            // that.outletList = res.data.data
                            that.outletListCount = res.data.totalCount
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
            await this.$Axios.post("/api/daedan/cj/ems/report/systemDataList", {
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
                            that.errorList = res.data.data
                            that.errorListCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
                this.busy = false;
                this.getList5()
        },
        async getList5() {
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
            await this.$Axios.post("/api/daedan/cj/ems/report/manageDataList", {
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

        print () {
            let app = document.getElementById('header')
            let app2 = document.getElementById('left2')  
            // const printContents = elementRef.innerHTML 
            let printDiv = document.createElement('DIV')
            document.body.appendChild(printDiv) 
            // printDiv.innerHTML = printContents 
            app.style.display = 'none' 
            app2.style.display = 'none' 
            window.print() 
            app.style.display = 'block' 
            app2.style.display = 'block' 
            printDiv.style.display = 'none' 
            printDiv.innerHTML = ''


        }
        
    },
    provide: {
        grid: [Toolbar, ExcelExport]
  }
}
</script>

<style>
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

/* Top dailyDateCheck , search and Excel Save*/
.dailyDateCheck {
    width: 100%;
    height: 50px;
}

.dailyDateCheck>div>div>div {
    float: left;
}

.dailyDateCheck>div>div>div:nth-child(1){
    width: 80px;
    font-size: 16px;
}

.dailyDateCheck>div>div>.dateSelect {
    width: 150px;
    font-size: 14px;
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
    background: white;
    box-shadow: 0px 0px 3px blue;
    font-size: 16px;
}
.d_btn02{
    position: absolute;
    top: 0px;
    right: 180px;
    width: 150px;
    height: 30px;
    padding-left: 0;
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

.d_btn02:hover, .d_btn01:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

/*Table Select */
.dailyTableWrap{
    width:100%;
    height:700px;
    border-radius: 7px;
}

.dailyTableWrap .dailyTable{
    width:100%;
    height:100%;
}

.dailyTableWrap .dailyTable p{
    height:50px;
    line-height:50px;
    font-size:20px;
    font-family:CjFontTitleMedium;
    margin-bottom:0;
}

/* Contents */

.con_tableWrap {
    width: 100%;
    height:600px;
}

.ag-header-group-text{
    display:block;
    margin:0 auto;
    font-size:16px;
}
.dailyTable  canvas{
    display:none;
}

.dailyTable .ag-header-cell-label {
   justify-content: center !important;
}

.dailyTable05 .ag-header-cell:nth-child(3) .ag-header-cell-label{
    justify-content: left !important;
}
</style>
