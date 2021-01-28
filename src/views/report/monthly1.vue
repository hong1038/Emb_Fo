<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left2></Left2>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>월말 보고</p>
                    <div class="monthlyDateCheck container-fluid">
                        <b-row>
                            <b-col cols="9">
                                <div>월 선택</div>
                                <div class="dateSelect">
                                    <!--<v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dateFr" transition="scale-transition" offset-y max-width="290px" min-width="290px">
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
                                    </v-menu>-->
                                    <!--<datetime type="date" v-model="dateFr" class="datetime"></datetime>-->
                                    <vue-monthly-picker v-model="dateFr" inputClass="dateSelectInput" dateFormat="YYYY-MM"
                                    :monthLabels="['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']">
                                    </vue-monthly-picker>
                                </div>
                            </b-col>
                            <b-col cols="3">
                                <input type="button" class="repM_btn01" value="조회" v-on:click="getList01">
                                <input type="button" class="repM_btn02" value="엑셀" v-on:click="excelBtn">
                            </b-col>
                        </b-row>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="monthlyTableWrap">
                        <div class="monthlyTable monthlyTable01">
                            <div style="display:flex;justify-content: space-between;">
                                <p>1. 월말 보고 Summary</p>
                                <!-- <button class="ex_button" @click="excelBtn1()" >Excel</button> -->
                            </div>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="summaryFields" :rowData="summaryList" :pagination="true" :gridOptions="gridOptions1" ></ag-grid-vue>
                        </div>
                        <div class="monthlyTable monthlyTable02">
                            <div style="display:flex;justify-content: space-between;">
                                <p>2. 운전 현황(월간 통계)</p>
                                <!-- <button class="ex_button" @click="excelBtn2()" >Excel</button> -->
                            </div>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="operFields" :rowData="operList" :pagination="true" :gridOptions="gridOptions2"></ag-grid-vue>
                        </div>
                        <div class="monthlyTable monthlyTable03">
                            <div style="display:flex;justify-content: space-between;">
                                <p>3. 배출시설(방지시설 전단) 트렌드 분석 : 이상점(농도 상승) 확인 및 조치 사항</p>
                                <!-- <button class="ex_button" @click="excelBtn3()" >Excel</button> -->
                            </div>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="preventFields" :rowData="preventList" :pagination="true" :gridOptions="gridOptions3">
                            </ag-grid-vue>
                        </div>
                        <div class="monthlyTable monthlyTable04">
                            <div style="display:flex;justify-content: space-between;">
                                <p>4. 배출구 초과이력 관리</p>
                                <!-- <button class="ex_button" @click="excelBtn4()" >Excel</button> -->
                            </div>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="outletFields" :rowData="outletList" :pagination="true" :gridOptions="gridOptions4" >
                            </ag-grid-vue>
                        </div>
                        <div class="monthlyTable monthlyTable05">
                            <div style="display:flex;justify-content: space-between;">
                                <p>5. 설비적/기계적 문제 발생 및 대응 현황</p>
                                <!-- <button class="ex_button" @click="excelBtn5()" >Excel</button> -->
                            </div>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="errorFields" :rowData="errorList" :pagination="true" :gridOptions="gridOptions5">
                            </ag-grid-vue>
                        </div>
                        <div class="monthlyTable monthlyTable06">
                            <div style="display:flex;justify-content: space-between;">
                                <p>6. 운영 특이사항</p>
                                <!-- <button class="ex_button" @click="excelBtn6()" >Excel</button> -->
                            </div>
                            <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-alpine-dark" :columnDefs="etcFields" :rowData="etcList" :pagination="true" :gridOptions="gridOptions6">
                            </ag-grid-vue>
                        </div>
                    </div>
                    <div v-if="graphDatas1.length > 0" class="reportgraph1">
                        <p>운전 현황(월간 통계)</p>
                        <div v-for="(item , index) in graphDatas1" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                            <p>{{item[0].equipment_inner_nm}}</p>
                            <canvas :id="'line-graph1_'+index" width="1500" height="200">{{index}}</canvas>
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
import Left2 from '@/components/Left2.vue'
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
import VueMonthlyPicker from 'vue-monthly-picker'
import Chart from 'chart.js'
// Vue.use(Datetime)
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left2,
        Main,
        AgGridVue,
        VueMonthlyPicker
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

            selectWorkplace: "",
            dateFr: store.state.curMmFr,
            date: store.state.curMmFr,
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            pageSz:store.state.paginationPageSize,

            gridOptions1:{},
            gridOptions2:{},
            gridOptions3:{},
            gridOptions4:{},
            gridOptions5:{},
            gridOptions6:{},

            //1. 월말 보고 Summary
            summaryListCount: 0,
            summaryList: [],
            summaryFields: [
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'problem',
                    headerName: '문제점/이슈사항',
                    width: '600px',
                    cellStyle: {textAlign: 'left'}
                },
                {
                    field: 'action',
                    headerName: '대응방안',
                    width: '600px',
                    cellStyle: {textAlign: 'left'}
                },
                {
                    field: 'prevention_date',
                    headerName: '개선일정',
                    width: '180px',
                    cellStyle: {textAlign: 'center'}
                },
            ],

            //2. 운전현황(월간통계)
            operListCount:0,
            operList:[],
            operFields: [
                                {
                    field: 'prevention_date',
                    headerName: '일자',
                    width: '150px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'category_cd',
                    headerName: '분야',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치',
                    width: '260px',
                    cellStyle: {textAlign: 'center'}
                },
                // {
                //     field: 'internal_name',
                //     headerName: '항목',
                //     width: '250px'
                // },
                {
                    field: 'unit',
                    headerName: '단위',
                    width: '100px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: '',
                    headerName: '후단',
                    children: [{
                            field: 'outlet_standard_value',
                            headerName: '기준',
                            type: 'number',
                            width: '120px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'outlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '120px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'outlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '120px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'outlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '120px',
                            cellStyle: {textAlign: 'center'}
                        },
                        {
                            field: 'occur',
                            headerName: '초과횟수',
                            type: 'number',
                            width: '140px',
                            cellStyle: {textAlign: 'center'}
                        },
                    ]
                },
                {
                    field: 'procRate',
                    headerName: '방지시설 효율(%)',
                    width: '220px',
                    cellStyle: {textAlign: 'center'}
                },
            ],

            //3. 배출시설(방지시설 전단) 트렌드 분석 : 이상점(농도 상승) 확인 및 조치 사항
            preventListCount:0,
            preventList:[],
            preventFields: [
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'rc_date',
                    headerName: '발생일자',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'server_name',
                    headerName: '공정명',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치명',
                    width: '150px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'cause',
                    headerName: '변경점/이상점 확인 결과 원인',
                    width : '415',
                    cellStyle: {textAlign: 'left'}
                },
                {
                    field: 'action',
                    headerName: '조치사항',
                    width: '415px',
                    cellStyle: {textAlign: 'left'}
                },
                {
                    field: 'action_date',
                    headerName: '조치 완료일자',
                    width: '200px',
                    cellStyle: {textAlign: 'center'}
                },
            ],

            //4. 배출구 초과이력 관리
            outletListCount:0,
            outletList:[],
            outletFields: [
                {
                    field: 'category_cd',
                    headerName: '구분',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'prevention_date',
                    headerName: '발생일자',
                    width: '110px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '방지시설명',
                    width: '130px',
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
                            width: '110px',
                            cellStyle: {textAlign: 'center'}
                        },
                    ]
                },
                {
                    field: 'pre_rate',
                    headerName: '방지시설 처리효율(%)',
                    width : '190',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'abn_type',
                    headerName: '유형',
                    width: '90px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'cause',
                    headerName: '초과사항 확인결과 원인',
                    width: '250px',
                    cellStyle: {textAlign: 'left'}
                },
                {
                    field: 'action',
                    headerName: '조치사항',
                    width: '130px',
                    cellStyle: {textAlign: 'left'}
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
                    width: '140px',
                    cellStyle: {textAlign: 'center'}
                },
            ],

            //5. 설비적/기계적 문제 발생 및 대응 현황
            errorListCount:0,
            errorList:[],
            errorFields: [
                {
                    field: 'rs_date',
                    headerName: '일자',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '175px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'abn_type',
                    headerName: '유형',
                    width: '100px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'rs_date',
                    headerName: '발생일자',
                    width: '130px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: '',
                    headerName: '문제점 개선 계획',
                    children: [{
                            field: 'cause',
                            headerName: '문제점/이슈사항',
                            type: 'number',
                            width: '390px',
                            cellStyle: {textAlign: 'left'}
                        },
                        {
                            field: 'action',
                            headerName: '대응 방안',
                            type: 'number',
                            width: '390px',
                            cellStyle: {textAlign: 'left'}
                        },
                        {
                            field: 'action_date',
                            headerName: '일정',
                            type: 'number',
                            width: '130px',
                            cellStyle: {textAlign: 'center'}
                        },
                    ]
                },
                {
                    field: 'action_type',
                    headerName: '완료상태',
                    width : '110',
                    cellStyle: {textAlign: 'center'}
                },
            ],

            //6.운영 특이사항
            etcListCount:0,
            etcList:[],
            etcFields: [
                {
                    field: 'prevention_date',
                    headerName: '일자',
                    width: '150px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'category_cd',
                    headerName: '분야',
                    width: '150px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '150px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'issue',
                    headerName: '특이사항',
                    width: '1050px',
                    cellStyle: {textAlign: 'left'}
                },
            ],
            graphDatas1:[],
        }
    },
    beforeDestroy() {
      this.clearTimeout()
    },
    watch: {
        selectWorkplace() {

        },
        date() {

        }
    },
    methods: {
        excelBtn(){
            console.log("이상해씨")
        },

        // excelBtn1(){
        //     this.gridOptions1.api.exportDataAsExcel({});
        // },
        // excelBtn2(){
        //     this.gridOptions2.api.exportDataAsExcel({});
        // },
        // excelBtn3(){
        //     this.gridOptions3.api.exportDataAsExcel({});
        // },
        // excelBtn4(){
        //     this.gridOptions4.api.exportDataAsExcel({});     
        // },
        // excelBtn5(){
        //     this.gridOptions5.api.exportDataAsExcel({});
        // },
        // excelBtn6(){
        //     this.gridOptions6.api.exportDataAsExcel({});
        // },
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

        // handleVisibility(isVisible) {
        //     this.isVisible = isVisible
        // },

        async getList01() {
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
            this.$Axios.post("/api/daedan/cj/ems/report/reportDataMonList", {
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
                        that.summaryList = res.data.data
                        that.summaryListCount = res.data.totalCount
                    }
                }
            })
            .catch(err => {
                alert("센서테이터목록 추출 실패 \n" + err);
            })
            this.busy = false;
            
            this.getList02();
        },

        async getList02() {

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/report/excessDataMonList", {
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
                        console.log(res.data)
                        this.operList = []
                        let test = []
                        let list2 = []
                        let listStandart = []
                        test = res.data.data.reduce((acc,v) => {
                            // console.log( Object.values(v).slice(0,30))
                            let key = Object.values(v).slice(0,25).filter((e,idx)=> idx === 0 || idx === 13 || idx === 17).join('')
                            listStandart.push(key)
                            acc[key] = acc[key] ? [...acc[key], v] : [v]
                            return acc
                        }, [])


                        listStandart = [...new Set(listStandart)]
                        listStandart.map(e => {
                            list2.push(test[e])
                        })
                        list2.map(e=>{
                            if (e.length === 1) {
                                e[0].procRate = '-'
                                e[0].occur = '-'
                                if (e[0].place === 512) {
                                    // console.log(e[0].inlet_avg_value,e[0].outlet_avg_value)
                                    // e[0].procRate = Math.floor((e[0].inlet_avg_value - e[0].outlet_avg_value) / e[0].inlet_avg_value*100) + "%",
                                    e[0].occur = e[0].outlet_max_value >= e[0].outlet_standard_value ? 1 : 0
                                }
                                if (e[0].place === 511) {
                                    e[0].occur = e[0].midlet_max_value >= e[0].midlet_standard_value ? 1 : 0
                                    e[0].outlet_standard_value = e[0].midlet_standard_value
                                    e[0].outlet_max_value = e[0].midlet_max_value 
                                    e[0].outlet_avg_value = e[0].midlet_avg_value 
                                    e[0].outlet_min_value = e[0].midlet_min_value 
                                }
                                that.operList.push(e[0])        
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
                                            'unit':outval.unit,
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':outval.inlet_max_value,
                                            'inlet_avg_value':outval.inlet_avg_value,
                                            'inlet_min_value':outval.inlet_min_value,
                                            'inoccur':outval.inoccur,
                                            'inlet_standard_value':outval.inlet_standard_value,
                                            'outlet_max_value':outval.midlet_max_value,
                                            'outlet_avg_value':outval.midlet_avg_value,
                                            'outlet_min_value':outval.midlet_min_value,
                                            'outoccur':outval.outoccur,
                                            'outlet_standard_value':outval.midlet_standard_value,
                                            'occur':outval.midlet_max_value >= outval.midlet_standard_value ? 1 : 0,
                                            'procRate':'-',
                                        }                                      
                                    }else{       
                                        objectitem = {
                                            'unit':outval.unit,
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':inval.inlet_max_value,
                                            'inlet_avg_value':inval.inlet_avg_value,
                                            'inlet_min_value':inval.inlet_min_value,
                                            'inoccur':inval.inoccur,
                                            'inlet_standard_value':inval.inlet_standard_value,
                                            'outlet_max_value':outval.outlet_max_value,
                                            'outlet_avg_value':outval.outlet_avg_value,
                                            'outlet_min_value':outval.outlet_min_value,
                                            'outoccur':outval.outoccur,
                                            'outlet_standard_value':outval.outlet_standard_value,
                                            'occur':outval.outlet_max_value >= outval.outlet_standard_value ? 1 : 0,
                                            'procRate':Math.floor((inval.inlet_avg_value - outval.outlet_avg_value) / inval.inlet_avg_value*100) + "%",
                                        }
                                    }

                                that.operList.push(objectitem)   
                            }

                            
                        })

                        // that.operList = res.data.data
                        that.operListCount = res.data.totalCount

                        let graph1Eqkey = []

                        that.operList.map(e => {
                            if (e.equipment_key !== undefined && e.equipment_key !== '' && e.equipment_key !== null) {    
                                graph1Eqkey.push(e.equipment_key)
                            }
                        })
                        graph1Eqkey = [...new Set(graph1Eqkey)] 

                        let graphDatas = []
                        graph1Eqkey.map(e => {
                            graphDatas.push(this.operList.filter(item => item.equipment_key === e))
                        })
                        console.log(graphDatas)
                        this.graphDatas1 = graphDatas;
                        setTimeout(() => {
                            this.graph1()
                        }, 500);
                    }
                }
            })
            .catch(err => {
                alert("센서테이터목록 추출 실패 \n" + err);
            })

            this.busy = false;
            
            this.getList03();
        } ,
        async getList03(){

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/report/changeDataMonList", {
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
                        that.preventList = res.data.data
                        that.preventListCount = res.data.totalCount
                    }
                }
            })
            .catch(err => {
                alert("센서테이터목록 추출 실패 \n" + err);
            })

            this.busy = false;

            this.getList04();
        },
        async getList04(){

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/report/overOutletList", {
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
                        this.outletList = []
                        let test = []
                        let list2 = []
                        let listStandart = []
                        console.log(res)
                        test = res.data.data.reduce((acc,v) => {
                            console.log(Object.values(v).slice(0,25))

                            let key = Object.values(v).slice(0,25).filter((e,idx)=> idx === 0 || idx === 13 || idx === 16).join('')
                            listStandart.push(key)
                            acc[key] = acc[key] ? [...acc[key], v] : [v]
                            return acc
                        }, [])


                        listStandart = [...new Set(listStandart)]
                        listStandart.map(e => {
                            list2.push(test[e])
                        })
                        list2.map(e=>{
                            if (e.length === 1) {
                                e[0].procRate = '-'
                                e[0].occur = '-'
                                if (e[0].place === 512) {
                                    // console.log(e[0].inlet_avg_value,e[0].outlet_avg_value)
                                    // e[0].procRate = Math.floor((e[0].inlet_avg_value - e[0].outlet_avg_value) / e[0].inlet_avg_value*100) + "%",
                                    e[0].occur = e[0].outlet_max_value >= e[0].outlet_standard_value ? 1 : 0
                                }
                                if (e[0].place === 511) {
                                    e[0].occur = e[0].midlet_max_value >= e[0].midlet_standard_value ? 1 : 0
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
                                            'unit':outval.unit,
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':outval.inlet_max_value,
                                            'inlet_avg_value':outval.inlet_avg_value,
                                            'inlet_min_value':outval.inlet_min_value,
                                            'inoccur':outval.inoccur,
                                            'inlet_standard_value':outval.inlet_standard_value,
                                            'outlet_max_value':outval.midlet_max_value,
                                            'outlet_avg_value':outval.midlet_avg_value,
                                            'outlet_min_value':outval.midlet_min_value,
                                            'outoccur':outval.outoccur,
                                            'outlet_standard_value':outval.midlet_standard_value,
                                            'occur':outval.midlet_max_value >= outval.midlet_standard_value ? 1 : 0,
                                            'procRate':'-',
                                        }                                      
                                    }else{       
                                        objectitem = {
                                            'unit':outval.unit,
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':inval.inlet_max_value,
                                            'inlet_avg_value':inval.inlet_avg_value,
                                            'inlet_min_value':inval.inlet_min_value,
                                            'inoccur':inval.inoccur,
                                            'inlet_standard_value':inval.inlet_standard_value,
                                            'outlet_max_value':outval.outlet_max_value,
                                            'outlet_avg_value':outval.outlet_avg_value,
                                            'outlet_min_value':outval.outlet_min_value,
                                            'outoccur':outval.outoccur,
                                            'outlet_standard_value':outval.outlet_standard_value,
                                            'occur':outval.outlet_max_value >= outval.outlet_standard_value ? 1 : 0,
                                            'procRate':Math.floor((inval.inlet_avg_value - outval.outlet_avg_value) / inval.inlet_avg_value*100) + "%",
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

            this.getList05();
        },
        async getList05(){

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/report/systemDataMonList", {
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

            this.getList06();
        },

        async getList06(){

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/report/manageDataMonList", {
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

        graph1(){
            this.graphDatas1.map((e,idx) => {
                
                let graphLabel = []
                let graphDataAvg = []
                let graphDataMax = []
                let graphDataMin = []

                e.map(item => {
                    graphLabel.push(item.prevention_date)
                    graphDataAvg.push(item.outlet_avg_value)
                    graphDataMax.push(item.outlet_max_value)
                    graphDataMin.push(item.outlet_min_value)
                })
                
                this.ctxDaily = document.getElementById('line-graph1_' + idx).getContext('2d');

                this.ctxDaily.height = "100%";
                this.ctxDaily.width = "100%";
                let ctxFontSize = 14
                if (this.winWidth === 3840) {
                    ctxFontSize = 26
                }
                this.ctxConfig = {
                    type: 'line',
                    options: {
 
                        responsive: false,
                        scales: {
                            
                            yAxes: [{

                                ticks: {
                                    min: 0,
                                    beginAtZero: true,
                                    fontSize: ctxFontSize
                                    
                                },
                            }],
                            xAxes: [{
                                gridLines : {
                                    display : false
                                },
                                ticks: {
                                    fontSize: ctxFontSize
                                }
                            }]
                        },
                        plugins: {
                            datalabels: {
                                color: '#444',
                                align: 'center',
                                anchor: 'end',
                                font: {
                                    family: 'Roboto',
                                    size: 14,
                                    weight: 700
                                },
                                // display: function(context) {
                                //     return context.dataset.data[context.dataIndex] > 0;
                                // },

                                //backgroundColor: 'rgba(255.255.255,0.8)',
                                borderRadius: 4
                            }
                        },
                        maintainAspectRatio: false,
                        // legend: {display: false},
                    },
                    data: {

                        labels: graphLabel,
                        datasets: [
                            {
                                label: '평균',
                                borderColor: '#42f13f',
                                backgroundColor: '#42f13f',
                                fill:false,
                                pointRadius: 1,
                                data: graphDataAvg,
                                borderWidth:5,
                                // data:dailyChartData
                            },
                            {
                                label: '최대',
                                borderColor: '#f13f3f',
                                backgroundColor: '#f13f3f',
                                fill:false,
                                pointRadius: 1,
                                data: graphDataMax,
                                borderWidth:5,
                                // data:dailyChartData
                            },
                            {
                                label: '최소',
                                borderColor: '#3f5df1',
                                backgroundColor: '#3f5df1',
                                fill:false,
                                pointRadius: 1,
                                data: graphDataMin,
                                borderWidth:5,
                                // data:dailyChartData
                            },
                        ]
                    },
                }
                this.Chart = new Chart(this.ctxDaily, this.ctxConfig);
                this.Chart.update()
            })
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
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

/* Top dailyDateCheck , search and Excel Save*/
.monthlyDateCheck {
    width: 100%;
    height: 50px;
}

.monthlyDateCheck>div>div>div {
    float: left;
}

.monthlyDateCheck>div>div>div:nth-child(1){
    width: 80px;
    font-size: 16px;
}

.monthlyDateCheck>div>div>.dateSelect {
    width: 150px;
    font-size: 14px;
}

.v-input__prepend-outer {
    display: none;
}

.repM_btn01 {
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
    background:white;
    box-shadow: 0px 0px 3px blue;
    font-size: 16px;
}

.repM_btn02 {
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
    background:white;
    box-shadow: 0px 0px 3px blue;
    font-size: 16px;
}

.repM_btn01:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}


.monthlyTableWrap{
    width:100%;
    /* height:700px; */
    border-radius: 7px;
}

.monthlyTableWrap .monthlyTable{
    width:100%;
    height:100%;
}

.monthlyTableWrap .monthlyTable p{
    height:50px;
    line-height:50px;
    font-size:20px;
    font-family:CjFontTitleMedium;
    margin-bottom:0;
}

/* Contents */

.ag-header-group-text{
    display:block;
    margin:0 auto;
    font-size:16px;
}
.monthlyTable .ag-header-cell-label {
   justify-content: center !important;
}

.monthlyTable01 .ag-header-cell:nth-child(2) .ag-header-cell-label,
.monthlyTable01 .ag-header-cell:nth-child(3) .ag-header-cell-label,
.monthlyTable03 .ag-header-cell:nth-child(5) .ag-header-cell-label,
.monthlyTable03 .ag-header-cell:nth-child(6) .ag-header-cell-label,
.monthlyTable04 .ag-header-cell:nth-child(9) .ag-header-cell-label,
.monthlyTable04 .ag-header-cell:nth-child(10) .ag-header-cell-label,
.monthlyTable05 .ag-header-cell:nth-child(5) .ag-header-cell-label,
.monthlyTable05 .ag-header-cell:nth-child(6) .ag-header-cell-label,
.monthlyTable06 .ag-header-cell:nth-child(4) .ag-header-cell-label{
    justify-content: left !important;
}

.ex_button{
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
    margin-top:10px;
    margin-right:5px;
}
.reportgraph1 > p{
    margin-top: 15px;
    font-family: CjFontTitleBold;
    font-size: 20px;
}
.reportgraph1 > div:not(:nth-child(2)){
    margin-top:50px;
}
.reportgraph1 > div > p{
    font-family: CjFontTitleBold;
    font-size: 16px;
}
</style>
