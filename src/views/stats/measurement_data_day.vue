<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>일간통계 및 그래프</p>
                    <div class="measurementDayDateCheck container-fluid mt-4">
                        <b-row>
                            <b-col cols="7">
                                <div>일자 선택</div>
                                <!-- <input type="date" class="" v-model="dateFr"> -->
                                <div class="dateSelect">
                                    <!-- <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dateFr" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field :placeholder="currentDate" v-model="date" label="" prepend-icon=" mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title scrollable locale="ko">
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu> -->
                                    <datetime type="date" v-model="dateFr"  class="datetime"></datetime>
                                </div>
                            </b-col>
                            <b-col cols="5">
                                <input type="button" class="mdd_btn01" v-on:click="getList" value="조회">
                                <input type="button" class="mdd_btn02" v-on:click="excelBtn" value="엑셀 저장">
                                <input type="button" class="mdd_btn03" v-on:click="graphBtn" value="그래프">
                            </b-col>
                        </b-row>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="mt-4 container-fluid">
                        <!-- <vue-good-table class="elevation-5" mode="remote" :line-numbers="true" :columns="fields" :rows="list" :totalRows="listCount" :pagination-options="{
                                    enabled: true,
                                    mode: 'records',
                                    perPage: perPage,
                                    position: 'top',
                                    perPageDropdown: [10],
                                    dropdownAllowAll: false,
                                    setCurrentPage: 1,
                                    nextLabel: '다음',
                                    prevLabel: '이전',
                                    rowsPerPageLabel: 'Rows per page',
                                    ofLabel: 'of',
                                    pageLabel: 'page', // for 'pages' mode
                                    allLabel: 'All',
                                }" @on-row-click="onRowClick" @on-page-change="onPageChange" theme="black-rhino" /> -->
                        <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list" :pagination="true" :gridOptions="gridOptions" :paginationPageSize="paginationPageSize">
                        </ag-grid-vue>
                    </div>
                    </b-overlay>
                    <div class="small" style="z-index:10">
                        <div>
                            <button v-on:click="chartImage()">IMG</button>
                            <button v-on:click="close()">&times;</button>
                            <canvas style="background:white" id="daily-chart" width="950" height="550" ></canvas>
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

import Vue from 'vue'
// import axios from 'axios'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Chart from 'chart.js'
// import  { Line } from 'vue-chartjs'
Vue.use(Datetime)

export default {
    components: {
        Header,
        Left,
        AgGridVue,
        // Line,
        // DatePicker,
    },
    computed: {
        // currentDate() {
        //     let s = new Date().toLocaleDateString();
        //     return s;
        // }
    },

    data() {
        return {
            busy:false,
            timeout : null,

            paginationPageSize:store.state.paginationPageSize,
            gridOptions : {},
            ctxConfig: null,
            dailyChart: null,
            Chart: Chart,
            ctxDaily: null,
            datacollection: null,
            config: {},
            mode: 'single', //날짜선택방법
            dateFr: '',
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [
                // { //사업장 , 분야, 측정위치, 측정항목, 일시, 단위, 기준, 평균, 최소, 최대
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
                    width: '140px'
                },
                {
                    field: 'category',
                    headerName: '분야',
                    width: '200px'
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '370px'
                },
                {
                    field: 'sensor_name',
                    headerName: '센서명',
                    width: '100px'
                },
                {
                    field: 'measurement_tm',
                    headerName: '측정시간',
                    width: '170px'
                },
                {
                    field: 'unit',
                    headerName: '단위',
                    width: '105px'
                },
                {
                    field: 'min_value',
                    headerName: '최소',
                    type: 'number',
                    width: '140px'
                },
                {
                    field: 'measurement_avg_value',
                    headerName: '평균',
                    type: 'number',
                    width: '140px'
                },
                {
                    field: 'max_value',
                    headerName: '최대',
                    type: 'number',
                    width: '140px'
                },

            ],
            graphLabel: [],
            graphDataMin: [],
            graphDataAvg: [],
            graphDataMax: [],
            // test2:[],
        }
    },
    beforeDestroy() {
      this.clearTimeout()
    },

    beforeMount() {
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
    },

    created() {
        this.$Axios.get('http://cjenv.daedan.com/api/getValue/CJ_Jincheon_05/1').then((response) => {this.results = response.data.results}).catch( error => { console.log(error); });
//          this.$Axios.post("http://cjenv.daedan.com/api/getValue/CJ_Jincheon_05/1").then(res => {
//      console.log(res)
//  }).catch(err => {
//     console.log(err)
//  })

        // this.randarDailyChart()
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        this.fillData()
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

        fillData() {
            this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [{
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                }, {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                }]
            }
        },

        resetPageNo() {
            this.pageNo = 1;
        },
        getList() {
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            if (store.state.ckCate.length == 0) {
                alert("분야는 필수 선택 항목 입니다.")
                return;
            }
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/measurements/measurementsByDayList", {
                    dateFr: this.dateFr,
                    serverList: store.state.ckServer,
                    cateList: store.state.ckCate,
                    equipList: store.state.ckEquip,
                    sensorList: store.state.ckSensor,
                    pageNo: this.pageNo,
                    pageSz: 10000,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            
                            res.data.data.reverse()
                            that.list = res.data.data
                            that.listCount = res.data.totalCount
                            // this.test2 = res.data.data

                            // this.test2.reduce((acc,v) => {
                            //     let key = Object.values(v).slice(0,1).join('')
                            //     acc[key] = acc[key] ? [...acc[key],v] : [v]
                            //     return acc
                            // },[]).filter(v => v)
                            // console.log(this.test2)
        
                            this.graphLabel = []
                            this.graphDataMin = []
                            this.graphDataAvg = []
                            this.graphDataMax = []
                            that.list.reverse()
                            that.list.map(e => {
                                this.graphLabel.push(e.measurement_tm)
                                this.graphDataMin.push(e.min_value)
                                this.graphDataAvg.push(e.measurement_avg_value)
                                this.graphDataMax.push(e.max_value)
                            })          
                            // const graphDataMin2 = []
                            // const graphDataMax2 = []
                            // this.list.map(()=>{
                            //     graphDataMin2.push(Math.min.apply(null,this.graphDataMin))
                            // })
                            // this.list.map(()=>{
                            //     graphDataMax2.push(Math.max.apply(null,this.graphDataMax))
                            // })  
                            // this.graphDataMin = graphDataMin2 
                            // this.graphDataMax = graphDataMax2
                            this.busy = false
                        }
                    }
                })
                .catch(err => {
                    alert("일간통계데이터목록 추출 실패 \n" + err);
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
            if (this.list !== [] && store.state.ckServer.length == 1 && store.state.ckCate.length == 1 && store.state.ckEquip.length == 1) {
                this.randarDailyChart()
                document.getElementsByClassName("small")[0].style.display = 'flex'
            }else{
                alert('리스트가 없거나 사업장,분야,측정위치가 여러곳이 선택되어 그래프를 그릴수 없습니다.')
            }
        },

        close() {
            document.getElementsByClassName("small")[0].style.display = 'none'
        },
        randarDailyChart() {
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
                            }
                        }],
                        xAxes: [{
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

                    labels: this.graphLabel,
                    datasets: [
                        {
                            label: '최대',
                            borderColor: '#f13f3f',
                            backgroundColor: 'transparent',
                            data: this.graphDataMax
                            // data:this.dailyChartData
                        },

                        {
                            label: '평균',
                            borderColor: '#42f13f',
                            backgroundColor: 'transparent',
                            data: this.graphDataAvg
                            // data:this.dailyChartData
                        },

                        {
                            label: '최소',
                            borderColor: '#3f5df1',
                            backgroundColor: 'transparent',
                            data: this.graphDataMin
                            // data:this.dailyChartData
                        },

                    ]
                },
            }
            this.dailyChart = new Chart(this.ctxDaily, this.ctxConfig);
            this.dailyChart.update()
        },
        chartImage(){
            this.dailyChart.update({
                duration: 0
            });
            var link = document.createElement('a');
            link.href = this.dailyChart.toBase64Image();
            link.download = 'chart'+this.dateFr+'.png';
            this.dailyChart.options.tooltips.backgroundColor = 'white'
            link.click();
            this.dailyChart.options.title.text = 'ChartTitle';
            this.dailyChart.update({
                duration: 0
            });
        }

    }
}
</script>

<style>
.small {
    /* max-width: 600px; */
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.3 );
    align-items: center;
    justify-content: center;
    display: none;
}

.small > div{
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    box-shadow:0px 0px 15px 0px rgb(165 165 165);
    border-radius: 5px;
    width: 1050px;
    height: 650px;
    position: relative;
}
.small > div > button{
    width: 100px;
    height: 40px;
    position: absolute;
    font-size: 16px;
    background: rgb(81, 81, 255);
    color: white;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
}
.small > div > button:first-child{
    top: 0px;
    right: 110px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 5px;
}
.small > div > button:nth-child(2){
    top: 0px;
    right: 0px;
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

.measurementDayDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.measurementDayDateCheck>div>div>div {
    float: left;
}

.measurementDayDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.measurementDayDateCheck>div>div>div:nth-child(2),
.measurementDayDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.measurementDayDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.measurementDayDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.mdd_btn01,
.mdd_btn02,
.mdd_btn03 {
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

.mdd_btn01 {
    right: 360px;
}

.mdd_btn02 {
    right: 190px;
}

.mdd_btn03 {
    right: 20px;
}

.measurementDayDateCheck>div>div:nth-child(2)>input:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.v-menu__content {
    top: 215px !important;
}

/*vdatetime-input*/
.dateSelect input {
    box-sizing: border-box;
    padding-left: 10px;
}
</style>
