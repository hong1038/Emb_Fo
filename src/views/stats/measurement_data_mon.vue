<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>월간통계 및 그래프</p>
                    <div class="mdmDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-7">
                                <div>월 선택</div>
                                <!-- <input type="date" v-model="dateFr"> -->
                                <div class="dateSelect">
                                    <vue-monthly-picker v-model="dateFr" inputClass="dateSelectInput" dateFormat="YYYY-MM"
                                    :monthLabels="['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']">
                                    </vue-monthly-picker>
                                </div>

                            </div>
                            <div class="col-5">
                                <input class="mdm_btn01" type="button" v-on:click="getList" value="조회">
                                <input class="mdm_btn02" type="button" v-on:click="excelBtn" value="엑셀 저장">
                                <input class="mdm_btn03" type="button" v-on:click="graphBtn" value="그래프">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                        <div class="mt-4 container-fluid text-center mdmGrid">
                            <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize">
                            </ag-grid-vue>
                        </div>
                    </b-overlay>
                    <div class="small" style="z-index:10">
                        <div>
                            <button v-on:click="chartImage()">IMG</button>
                            <button v-on:click="close()">&times;</button>
                            <span class="yAxisLabel">({{graphDataUnit[0]}})</span>
                            <span class="xAxisLabel">(날짜)</span>
                            <canvas width="950" height="550" id="daily-chart"></canvas>
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
// import Vue from "vue";
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

import VueMonthlyPicker from 'vue-monthly-picker'
import Chart from 'chart.js'
export default {
    components: {
        Header,
        Left,
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

            config: {},
            mode: 'single', //날짜선택방법
            findTps: [{
                value: 'pnelNm',
                text: '판넬명'
            }],
            paginationPageSize: store.state.paginationPageSize,
            gridOptions: {},
            dateFr: store.state.curMmFr,
            date: store.state.curMmFr,
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
                    headerName: '측정장소',
                    width: '220px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'category',
                    headerName: '측정항목',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'internal_number',
                    headerName: '관리번호',
                    width: '170px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치',
                    width: '400px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'measurement_date',
                    headerName: '측정날짜',
                    width: '202px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'unit',
                    headerName: '단위',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'measurement_min_value',
                    headerName: '최소',
                    type: 'number',
                    width: '105px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'measurement_avg_value',
                    headerName: '평균',
                    type: 'number',
                    width: '105px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'measurement_max_value',
                    headerName: '최대',
                    type: 'number',
                    width: '105px',
                    cellStyle: {textAlign: 'center'}
                },

            ],
            graphLabel:[],
            graphDataMin:[],
            graphDataAvg:[],
            graphDataMax:[],
            graphDataUnit:[],
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
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
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

        resetPageNo() {
            this.pageNo = 1;
        },
        getList() {
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
            this.$Axios.post("/api/daedan/cj/ems/measurements/measurementsByMonthList", {
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
                            that.list = res.data.data
                            that.listCount = res.data.totalCount
                            console.log(res.data.data)
                            this.graphLabel = []
                            this.graphDataMin = []
                            this.graphDataAvg = []
                            this.graphDataMax = []
                            that.list.map(e => {
                                this.graphLabel.push(e.measurement_date)
                                this.graphDataMin.push(e.min_value)
                                this.graphDataAvg.push(e.measurement_avg_value)
                                this.graphDataMax.push(e.max_value)
                                this.graphDataUnit.push(e.unit)
                            })          
                            console.log(this.graphDataUnit)
                            this.busy = false;
                        }
                    }
                })
                .catch(err => {
                    alert("월간통계데이터목록 추출 실패 \n" + err);
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
                    responsive: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0,
                                beginAtZero: true,
                                fontSize: ctxFontSize,
                                fontFamily : 'CjFontBodyRegular',
                                fontStyle : 'bold'
                            },
                            // scaleLabel:{
                            //     display:true,
                            //     labelString : this.graphDataUnit[0],
                            //     fontFamily : 'CjFontBodyRegular',
                            //     fontStyle : 'bold',
                            // }
                        }],
                        xAxes: [{
                            gridLines : {
                                display : false
                            },
                            ticks: {
                                fontSize: ctxFontSize,
                                fontFamily : 'CjFontBodyRegular',
                                fontStyle : 'bold',
                                userCallback : function(value){
                                    console.log("value"+value)
                                    value = value.toString();
                                    value = value.split("-");
                                    value = value[1] + "/" + value[2]
                                    // value = value.join("-");
                                    console.log(value)
                                    return value;
                                }
                            },
                            // scaleLabel:{
                                // display:true,
                                // labelString : "일",
                                // fontFamily : 'CjFontBodyRegular',
                                // fontStyle : 'bold',
                                
                            // }
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
                        },
                        afterDraw: chart => {
                            this.ctxDaily = chart.chart.ctxDaily;
                            this.ctxDaily.save();
                            this.ctxDaily.font = "bold 14px CjFontBodyRegular"
                            var y = 50;

                            this.ctxDaily.textAlign = 'left';        
                            this.ctxDaily.fillText('CO2', 5, y);
                            this.ctxDaily.fillText('°C', 46, y);

                            this.ctxDaily.textAlign = 'right';
                            this.ctxDaily.fillText('%', chart.chart.width - 10, y);
                            this.ctxDaily.restore();
                        }
                    },
                    maintainAspectRatio: false,
                    legend:{
                        labels:{
                            fontFamily : 'CjFontBodyRegular',
                            fontStyle : 'bold'
                        }
                    },
                },
                data: {

                    labels: this.graphLabel,
                    datasets: [
                        {
                            label: '최대',
                            borderColor: '#f13f3f',
                            backgroundColor: '#f13f3f',
                            fill:false,
                            data: this.graphDataMax
                            // data:this.dailyChartData
                        },
                        {
                            label: '평균',
                            borderColor: '#42f13f',
                            backgroundColor: '#42f13f',
                            fill:false,
                            data: this.graphDataAvg
                            // data:this.dailyChartData
                        },
                        {
                            label: '최소',
                            borderColor: '#3f5df1',
                            backgroundColor: '#3f5df1',
                            fill:false,
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

.small > div > span{
    position:absolute;
    font-size:12px;
    font-family:CjFontBodyRegular;
    font-weight:bold;
}

.small > div > .yAxisLabel{
    top:6%;
    left:6%;
}

.small > div > .xAxisLabel{
    top:93%;
    right:5%;
}
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

/* Top DateCheck , search and Excel Save*/

.mdmDateCheck {
    width: 100%;
    height: 50px;
}

.mdmDateCheck>div>div>div {
    float: left;
}

.mdmDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.mdmDateCheck>div>div>div:nth-child(2),
.mdmDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
}

.mdmDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.mdmDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.mdmDateCheck>div>div:nth-child(2)>input {
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

.mdm_btn01 {
    right: 360px;
}

.mdm_btn02 {
    right: 190px;
}

.mdm_btn03 {
    right: 20px;
}

.mdmDateCheck>div>div:nth-child(2)>span:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.v-date-picker-header {
    background: rgb(123, 165, 255);
}

.v-date-picker-header * {
    font-size: 16px;
}

.v-menu__content {
    top: 215px !important;
}

.dateSelect input {
    box-sizing: border-box;
    padding-left: 10px;
}
.mdmGrid .ag-header-cell-label {
   justify-content: center !important;
}


</style>
