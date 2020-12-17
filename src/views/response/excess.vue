<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex;">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>초과이력 대응</p>
                    <div class="measurementDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-7">
                                <div>기간 선택</div>
                                <v-date-picker value="range" is-range />
                                <div class="dateSelect">
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div>
                                <div>~</div>
                                <div class="dateSelect dateSelectTo">
                                    <datetime type="date" v-model="dateTo" class="datetime"></datetime>
                                </div>
                            </div>
                            <div class="col-5">
                                <input class="e_btn02" type="button" v-on:click="getList" value="조회">
                                <!-- <input class="md_btn02" type="button" v-on:click="addOn" value="등록"> -->
                                <input class="e_btn01" type="button" v-on:click="excelBtn" value="엑셀 저장">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                        <div class="mt-4 container-fluid excessTable" style="display:flex;">
                            <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" rowSelection="single" @row-clicked="addOn" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" >
                            </ag-grid-vue>
                            <b-card class="right_list" v-if="show">
                                <b-row>
                                    <b-col class="popUpTitle">초과이력 대응 등록</b-col>
                                    <input type="button" class="mmSaveBtn btn btn-success btn-sm" v-on:click="saveInfo" value="저장">
                                    <input type="button" class="mmListBtn btn btn-primary btn-sm" v-on:click="showblock" value="목록">
                                    <!-- <input type="button" class="mmListBtn btn btn-danger btn-sm" v-on:click="dropInfo" value="삭제"> -->
                                </b-row>
                                <div>
                                    <b-row>
                                        <b-col class="regiName col-4">일자</b-col>
                                        <b-form-input class="col" v-model="prevention_date" size="sm" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">사업장</b-col>
                                        <b-form-input class="col" v-model="server_name" size="sm" disabled> 
                                        </b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">구분</b-col>
                                        <b-form-input class="col" v-model="category_cd" size="sm" disabled></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">측정위치</b-col>
                                        <b-form-input class="col" v-model="equipment_inner_nm" size="sm" disabled></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">흡입구 최대</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_max_value" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">흡입구 평균</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_avg_value" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">흡입구 최소</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inlet_min_value" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-3">흡입구 이상점 발생여부</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="inoccur" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">배출구 최대</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="outlet_max_value" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">배출구 평균</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="outlet_avg_value" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">배출구 최소</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="outlet_min_value" readonly></b-form-input>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-3">배출구 이상점 발생여부</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="outoccur" readonly></b-form-input>
                                    </b-row>
                                    <!-- <b-row>
                                        <b-col class="regiName col-4 lh-2">방지시설 처리효율</b-col>
                                        <b-form-input class="col" type="text" size="sm" v-model="procRate" readonly></b-form-input>
                                    </b-row> -->
                                    <b-row>
                                        <b-col class="regiName col-4 lh-2">조치사항</b-col>
                                        <b-form-textarea class="col" style="height:120px" type="text" size="sm" v-model="action"></b-form-textarea>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4 lh-2">조치사항 원인</b-col>
                                        <b-form-textarea class="col" style="height:120px" type="text" size="sm" v-model="cause"></b-form-textarea>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">조치여부</b-col>
                                        <b-form-select class="col" v-model="action_type" size="sm">
                                            <option value="진행">진행</option>
                                            <option value="완료">완료</option>
                                        </b-form-select>
                                    </b-row>
                                    <b-row>
                                        <b-col class="regiName col-4">유형</b-col>
                                        <b-form-select class="col" v-model="abnormal_type" :options="comboabnormal" size="sm"></b-form-select>
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
    <!-- <div class="small" style="z-index:10">
        <div> -->
            <!-- <button v-on:click="chartImage()">IMG</button> -->
            <div class="responseGraph" v-if="show" style="width:1550px;height:650px">
                <span>{{prevention_date}} {{server_name}}<h1>{{equipment_inner_nm}}</h1></span>
                <canvas style="background:white" id="daily-chart" width="1550px" height="550" ></canvas>
            </div>
        <!-- </div>
    </div> -->
    <b-overlay :show="busyPop" no-wrap @show="onShow" @hidden="onHidden">
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

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
// import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"
import Chart from 'chart.js'
Vue.use(Datetime)

//달력관련
//import DatePicker from "v-calendar/lib/components/date-picker.umd"

export default {
    components: {
        Header,
        Left,
        AgGridVue,
        // vue,
        // DatePicker  
    },
    data() {
        return {
            inletgraphDataMin:[],
            inletgraphDataAvg:[],
            inletgraphDataMax:[],
            outletgraphDataMin:[],
            outletgraphDataAvg:[],
            outletgraphDataMax:[],
            busy:false,
            timeout : null,
            busyPop: false,
            processing: false,
            show:false,

            exInfo: {},
            config: {},
            comboabnormal:[],//유형
            mode: 'single', //날짜선택방법
            findTps: [{
                value: 'pnelNm',
                text: '판넬명'
            }],
            graphTitle:null,
            ctxConfig: null,
            dailyChart: null,
            dateFr: store.state.szCurMmFr,
            // dateFr: "",
            dateTo: store.state.szCurMmTo,
            // dateTo: "",
            gridOptions:{}, 
            list: [],
            list2: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [
                {
                    field: 'prevention_date',
                    headerName: '일자',
                    width: '118px'
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '120px'
                },
                {
                    field: 'category_cd',
                    headerName: '분야',
                    width: '80px'
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '방지시설명',
                    width: '200px'
                },
                {
                    field: '',
                    headerName: '흡입구',
                    children: [
                        {
                            field: 'inlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '100px'
                        },
                        {
                            field: 'inlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '100px'
                        },
                        {
                            field: 'inlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '100px'
                        },
                        // {
                        //     field: 'inoccur',
                        //     headerName: '이상점 발생여부',
                        //     type: 'number',
                        //     width: '140px'
                        // },
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
                            width: '100px'
                        },
                        {
                            field: 'outlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '100px'
                        },
                        {
                            field: 'outlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '100px'
                        },
                        {
                            field: 'outlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '100px'
                        },
                        {
                            field: 'outoccur',
                            headerName: '이상점 발생여부',
                            type: 'number',
                            width: '140px'
                        },
                    ]
                },
                {
                    field: 'procRate',
                    headerName: '방지시설 처리효율(%)',
                    width: '150px'
                },
                // {
                //     field: 'action',
                //     headerName: '조치사항ㆍ원인',
                //     width: '170px'
                // },
                // {
                //     field: 'action_type',
                //     headerName: '조치여부',
                //     width: '120px'
                // },
                // {
                //     field: 'action_date',
                //     headerName: '조치 완료일자',
                //     width: '120px'
                // },
            ]
        }
    },

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
        this.getcAbnormalType()
        //this.getList(); 여기서 실행하면 최초 실행시 -1일식 차감해서 검색일자가 설정되는 오류 발생됨.
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
            },300)
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
        onCancel() {
            this.busyPop = false
        },

        getcAbnormalType() {
            this.$Axios.post("/api/daedan/cj/ems/cmmn/eAbnormalType", {
                    serverKey:store.state.ckServer,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            console.log(res.data.data.abnormal)
                            this.comboabnormal = res.data.data.abnormal
                        }
                    }
                })
                .catch(err => {
                    alert("센서이상, 통신이상, 방지시설이상 추출 실패 \n" + err);
                    console.log(err)
                })
                // this.getEquips()
        },

        addOn(obj) {
            console.log(obj)
            this.prevention_date = obj.data.prevention_date
            // this.mno = obj.data.mno; //관리번호
            this.server_key = obj.data.server_key; //사업장
            this.server_name = obj.data.server_name
            this.equipment_name = obj.data.equipment_name; //측정위치
            this.equipment_inner_nm = obj.data.equipment_inner_nm
            this.equipment_key = obj.data.equipment_key
            this.category = obj.data.category; //측정분야명
            this.category_cd = obj.data.category_cd; //측정분야코드
            this.cause = obj.data.cause


            this.action_type = obj.data.action_type
            this.action_date = obj.data.action_date
            this.action = obj.data.action


            this.place = obj.data.place
            this.abnormal_type = obj.data.abnormal_type
            // this.facility = obj.data.facility; //시설분류
            // this.location = obj.data.location; //위치분류
            this.outlet_standard_value = obj.data.outlet_standard_value; //배출구 법적기준
            this.inlet_standard_value = obj.data.inlet_standard_value; //흡입구 법적기준
            this.inlet_min_value = obj.data.inlet_min_value
            this.inlet_max_value = obj.data.inlet_max_value
            this.inlet_avg_value = obj.data.inlet_avg_value
            this.outlet_min_value = obj.data.outlet_min_value
            this.outlet_max_value = obj.data.outlet_max_value
            this.outlet_avg_value = obj.data.outlet_avg_value
            this.re_key = obj.data.re_key
            this.inoccur = obj.data.inoccur
            this.outoccur = obj.data.outoccur
            this.procRate = obj.data.procRate

            this.unit = obj.data.unit; //단위
            // this.internal_name = null; //내부관리명
            // this.internal_number = null; //내부관리번호
            // this.public_name = null; //공정명
            // this.odor_number = null; //악취방지시설고유일련번호
            // this.sensors = [];
            this.showblock();
            this.excessInfo(obj)
        },
        excessInfo(obj){
            console.log(obj)
            this.$Axios.post("/api/daedan/cj/ems/response/excessInfo", {
                serverKey:obj.data.server_key,
                equipmentInnerNm:obj.data.equipment_inner_nm,
                category:obj.data.category,
                dateTime:obj.data.prevention_date
            }, this.config)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.statusCode === 200) {

                        this.inletgraphDataMin = []
                        this.inletgraphDataAvg = []
                        this.inletgraphDataMax = []
                        this.outletgraphDataMin = []
                        this.outletgraphDataAvg = []
                        this.outletgraphDataMax = []

                        let data = []
                        let listStandart = []
                        data = res.data.data.reduce((acc,v) => {
                            console.log(Object.values(v).slice(0,35))
                            let key = Object.values(v).slice(0,30).filter((e,idx)=> idx === 24).join('')
                            listStandart.push(key)
                            acc[key] = acc[key] ? [...acc[key], v] : [v]
                            return acc
                        }, [])
                        listStandart = [...new Set(listStandart)]
                        listStandart.map((e) => {
                            data[e].map(item => {
                                if (data[e].length === 1) {
                                    this.inletgraphDataMin.push(item.inlet_min_value)
                                    this.inletgraphDataAvg.push(item.inlet_avg_value)
                                    this.inletgraphDataMax.push(item.inlet_max_value)
                                    this.outletgraphDataMin.push(item.outlet_min_value)
                                    this.outletgraphDataAvg.push(item.outlet_avg_value)
                                    this.outletgraphDataMax.push(item.outlet_max_value)
                                }else{

                                    if (item.place === 510) {
                                            // inval.push(item.inlet_avg_value)
                                        this.inletgraphDataMin.push(item.inlet_min_value)
                                        this.inletgraphDataAvg.push(item.inlet_avg_value)
                                        this.inletgraphDataMax.push(item.inlet_max_value)

                                    }else if (item.place === 512) {
                                        // outval.push(item.outlet_avg_value)
                                            
                                        this.outletgraphDataMin.push(item.outlet_min_value)
                                        this.outletgraphDataAvg.push(item.outlet_avg_value)
                                        this.outletgraphDataMax.push(item.outlet_max_value)
                                    }
                                }
                            })
                        })
                        this.graph(listStandart)
                    }
                }
            })
            .catch(err => {
                alert("센서테이터목록 추출 실패 \n" + err);
            })
        },
        graph(listStandart){
            if (this.show === false) {
                return false
            }
            if (this.dailyChart) {
                this.dailyChart.destroy();
            }
            this.ctxDaily = document.getElementById('daily-chart').getContext('2d');
            this.ctxDaily.height = "100%";
            this.ctxDaily.width = "100%";
            // this.ctxDaily.font = "5rem";
            // console.log(this.dailyChartLabel,this.dailyChartData)
            let ctxFontSize = 14
            if (this.winWidth === 3840) {
                ctxFontSize = 26
            }
            console.log(listStandart)
            this.ctxConfig = {
                type: 'line',
                options: {
                    position: 'bottom',
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

                            backgroundColor: 'white',
                            borderRadius: 4
                        }
                    },
                    maintainAspectRatio: false,
                },
                data: {
                    labels:listStandart,
                    datasets: [
   {
                            label: '흡입최대',
                            borderColor: '#f13f3f',
                            backgroundColor: 'transparent',
                            data: this.inletgraphDataMax
                            // data:this.dailyChartData
                        },
                        {
                            label: '흡입평균',
                            borderColor: '#42f13f',
                            backgroundColor: 'transparent',
                            data: this.inletgraphDataAvg
                            // data:this.dailyChartData
                        },

                        {
                            label: '흡입최소',
                            borderColor: '#3f5df1',
                            backgroundColor: 'transparent',
                            data: this.inletgraphDataMin
                            // data:this.dailyChartData
                        },

                        {
                            label: '배출최대',
                            borderColor: '#9966ff',
                            backgroundColor: 'transparent',
                            data: this.outletgraphDataMax
                            // data:this.dailyChartData
                        },
                        {
                            label: '배출평균',
                            borderColor: '#ffcd56',
                            backgroundColor: 'transparent',
                            data: this.outletgraphDataAvg
                            // data:this.dailyChartData
                        },

                        {
                            label: '배출최소',
                            borderColor: '#c9cbcf',
                            backgroundColor: 'transparent',
                            data: this.outletgraphDataMin
                            // data:this.dailyChartData
                        },

                    ]
                },
            }
            this.dailyChart = new Chart(this.ctxDaily, this.ctxConfig);
            this.dailyChart.update()
        },
        showblock() {
            this.show = !this.show
        },
        saveblock() {
            this.show = !this.show
        },

        resetPageNo() {
            this.pageNo = 1;
        },
        getList() {
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            // if (store.state.ckCate.length == 0) {
            //     alert("분야는 필수 선택 항목 입니다.")
            //     return;
            // }
            if (this.dateFr === null || this.dateTo === null || this.dateFr === "" || this.dateTo === "") {
                alert("날짜를 선택해주세요.")
                return;
            }
            this.onClick();

            let that = this;
            //console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/response/rExcessList", {
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
                    serverList: store.state.ckServer,
                    cateList: store.state.ckCate,
                    equipList: store.state.ckEquip,
                    sensorList: store.state.ckSensor,
                    findTp: this.findTp,
                    findSz: this.findSz,
                    pageNo: this.pageNo,
                    pageSz: 10000,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            res.data.data.map(e => {
                                e.inoccur = e.inlet_max_value >= e.inlet_standard_value ? "Y" : "N";
                                e.outoccur = e.outlet_max_value >= e.outlet_standard_value ? "Y" : "N";
                            })
                            this.list = []
                            this.list2 = []
                            let test = []
                            let listStandart = []
                            test = res.data.data.reduce((acc,v) => {
                                console.log(Object.values(v).slice(0,35))
                                let key = Object.values(v).slice(0,30).filter((e,idx)=> idx === 0 || idx === 12 || idx === 24).join('')
                                listStandart.push(key)
                                acc[key] = acc[key] ? [...acc[key], v] : [v]
                                return acc
                            }, [])

                            listStandart = [...new Set(listStandart)]
                            listStandart.map(e => {
                                this.list2.push(test[e])
                            })
                            this.list2.map(e=>{
                                if (e.length === 1) {
                                    e[0].procRate = '-';
                                    if (e[0].place === 511) {
                                        e[0].inoccur = '-'
                                        e[0].outlet_standard_value = e[0].midlet_standard_value
                                        e[0].outlet_max_value = e[0].midlet_max_value 
                                        e[0].outlet_avg_value = e[0].midlet_avg_value 
                                        e[0].outlet_min_value = e[0].midlet_min_value 
                                    }
                                    that.list.push(e[0])        
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
                                            item.action_type = item.action_type !== null ? item.action_type.trim() : null 
                                            outval = item;
                                        }
                                    })
                                    // console.log(outval,inval)
                                    let objectitem = {

                                    }

                                    if (outval.place === 511) {
                                        objectitem = {
                                            'abnormal_type':outval.abnormal_type,
                                            'action':outval.action, 
                                            'action_date':outval.action_date, 
                                            'action_type':outval.action_type, 
                                            'cause':outval.cause, 
                                            'place':outval.place,
                                            'category':outval.category,
                                            'server_key':outval.server_key,
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_key':outval.equipment_key,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':outval.inlet_max_value,
                                            'inlet_avg_value':outval.inlet_avg_value,
                                            'inlet_min_value':outval.inlet_min_value,
                                            'inoccur':outval.inoccur,
                                            'outlet_max_value':outval.midlet_max_value,
                                            'outlet_avg_value':outval.midlet_avg_value,
                                            'outlet_min_value':outval.midlet_min_value,
                                            'outoccur':outval.outoccur,
                                            'procRate':'-',
                                            'outlet_standard_value':outval.midlet_standard_value
                                        }                                      
                                    }else{       
                                        objectitem = {
                                            'abnormal_type':outval.abnormal_type,
                                            'action':outval.action, 
                                            'action_date':outval.action_date, 
                                            'action_type':outval.action_type, 
                                            'cause':outval.cause, 
                                            'place':outval.place,
                                            'category':outval.category,
                                            'server_key':outval.server_key,
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category_cd':outval.category_cd,
                                            'equipment_key':outval.equipment_key,
                                            'equipment_inner_nm':outval.equipment_inner_nm,
                                            'inlet_max_value':inval.inlet_max_value,
                                            'inlet_avg_value':inval.inlet_avg_value,
                                            'inlet_min_value':inval.inlet_min_value,
                                            'inoccur':inval.inoccur,
                                            'outlet_max_value':outval.outlet_max_value,
                                            'outlet_avg_value':outval.outlet_avg_value,
                                            'outlet_min_value':outval.outlet_min_value,
                                            'outoccur':outval.outoccur,
                                            'procRate':Math.floor((inval.inlet_avg_value - outval.outlet_avg_value) / inval.inlet_avg_value*100) + "%",
                                            'outlet_standard_value':outval.outlet_standard_value
                                        }
                                    }
                                    console.log(objectitem)
                                    that.list.push(objectitem)   
                                }
                            })
                            // that.list = res.data.data
                            that.listCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
        },eChange(params) {
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


            this.busyPop = true;
            this.altMsg = "처리중인 기준정보를 저장 하시겠습니까 ? ";
            this.workTp = "SAVE_INFO"
        },
        async saveInfoProc() {
            let that = this;
            this.$Axios.post("/api/daedan/cj/ems/response/excessSave", {
                    exInfo:this.exInfo,
                    place: this.place,
                    re_key:this.re_key,
                    server_key: this.server_key,
                    equipment_key: this.equipment_key,
                    category_cd: this.category_cd,
                    category:this.category,
                    re_date: this.prevention_date,
                    occur:this.occur,
                    cause:this.cause,
                    action:this.action,
                    occur_yn:this.outoccur,
                    action_type:this.action_type,
                    action_date:this.action_date,
                    abnormal_type:this.abnormal_type,
                    pre_rate:Math.floor((this.inlet_avg_value - this.outlet_avg_value) / this.inlet_avg_value*100),
                    // 넘기는 키 : 
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
                    alert("센서테이터목록 추출 실패 \n" + err);
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
    }
}
</script>

<style>
.responseGraph {
   margin-left:296px;
}
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

.measurementDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.measurementDateCheck>div>div>div {
    float: left;
}

.measurementDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.measurementDateCheck>div>div>div:nth-child(2),
.measurementDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.measurementDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.measurementDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.e_btn01,
.e_btn02{
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
    background: white;
    box-shadow: 0px 0px 3px blue;
    font-size: 16px;
}

.e_btn02 {
    right: 190px;
}
.e_btn01{
    right: 20px;
}

.measurementDateCheck>div>div:nth-child(2)>input:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.excessTable *{
    font-size:14px;
}

.ag-header-group-text{
    display:block;
    margin:0 auto;
}
.excessTable .ag-header-group-cell-label{
    overflow:auto;
}

.excessTable .ag-icon{
    display:none;
}

.excessTable .right_list {
    position: relative;
    left: 10px;
    width: 500px;
    height: 650px;
    margin-left: 10px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0;
    overflow-y: scroll;
    box-shadow: 0px 0px 10px 1px #ccc;
}
.excessTable .right_list .popUpTitle {
    font-size: 18px;
}
.excessTable .right_list .btn {
    margin-right: 7px;
    font-size: 15px;
    height: 30px;
    margin-top: 20px;
}
.excessTable .right_list .regiName {
    font-size: 16px;
    word-break: keep-all;
}

.excessTable .right_list .regiName+input,
.excessTable .right_list .regiName+select {
    height: 30px;
    margin-top: 10px;
    font-size:14px;
}


.excessTable .right_list .lh-2+input, .excessTable .right_list .lh-2+select{
    margin-top:25px;
}

.excessTable .right_list .lh-3+input, .excessTable .right_list .lh-3+select{
    margin-top:35px;
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
