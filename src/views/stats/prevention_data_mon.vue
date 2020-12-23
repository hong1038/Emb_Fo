<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>월간 방지시설 통계</p>
                    <div class="pdmDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-3">
                                <div>날짜 선택</div>
                                <!-- <input type="date" class="" v-model="dateFr"> -->
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
                                    <!-- <datetime type="date" v-model="dateFr" class="datetime"></datetime> -->
                                </div>
                            </div>
                            <div class="col-9">
                                <input type="button" class="pdm_btn01" value="조회" v-on:click="getList">
                                <input type="button" class="pdm_btn02" value="엑셀 저장" v-on:click="excelBtn">
                                <input type="button" class="pdm_btn03" value="그래프" v-on:click="graphBtn">
                            </div>
                        </div>

                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="container-fluid mt-4">
                        <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list"  :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize">
                        </ag-grid-vue>
                    </div>
                    <div class="small" style="z-index:10">
                        <div>
                            <button v-on:click="chartImage()">IMG</button>
                            <button v-on:click="close()">&times;</button>
                            <canvas style="background:white" id="daily-chart" width="950" height="550" ></canvas>
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
import Vue from "vue";

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"
import 'ag-grid-enterprise';
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Chart from 'chart.js'
Vue.use(Datetime)
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        AgGridVue
        // BootstrapVue,
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
            gridOptions:{},
            dateFr: store.state.curMmFr,
            date : store.state.curMmFr,
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [
                // { //
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
                    width: '120px'
                },
                {
                    field: 'category',
                    headerName: '분야',
                    width: '80px'
                },
                {
                    field: 'internal_number',
                    headerName: '관리번호',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '방지시설',
                    width: '285px'
                },
                // {
                //     field: 'internal_name',
                //     headerName: '측정항목',
                //     width: '150px'
                // },
                {
                    field: 'prevention_date',
                    headerName: '측정날짜',
                    width: '200px'
                },
                {
                    field: 'unit',
                    headerName: '단위',
                    width: '80px'
                },
                {
                    field: '',
                    headerName: '흡입구',
                    children: [{ 
                            field: 'inlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '85px'
                        },
                        {
                            field: 'inlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '85px'
                        },
                        {
                            field: 'inlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '85px'
                        },
                ]},
                {
                    field: '',
                    headerName: '배출구',
                    children: [
                        {
                            field: 'outlet_standard_value',
                            headerName: '기준',
                            type: 'number',
                            width: '85px'
                        },
                        {
                            field: 'outlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '85px'
                        },
                        {
                            field: 'outlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '85px'
                        },
                        {
                            field: 'outlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '85px'
                        },
                    ]
                },
                {
                    field: 'proc_rt',
                    headerName: '처리효율',
                    type: 'number',
                    width: '146px'
                },
            ],
            graphLabel:[],
            inletgraphDataMin:[],
            inletgraphDataAvg:[],
            inletgraphDataMax:[],
            outletgraphDataMin:[],
            outletgraphDataAvg:[],
            outletgraphDataMax:[],
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
        //this.getList(); 여기서 실행하면 최초 실행시 -1일식 차감해서 검색일자가 설정되는 오류 발생됨.
    },

    watch: {
        dateSelect() {
            console.log(this.dateSelect)
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
            //console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/stat/preventionDataByMonList", {
                    dateFr: this.dateFr,
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


                            that.list = []
                            let test = []
                            let list2 = []
                            let listStandart = []
                            test = res.data.data.reduce((acc,v) => {
                                // console.log(Object.values(v).slice(0,30))
                                let key = Object.values(v).slice(0,30).filter((e,idx)=> idx === 0 || idx === 9 || idx === 20).join('')
                                // console.log(key)
                                listStandart.push(key)
                                acc[key] = acc[key] ? [...acc[key], v] : [v]
                                return acc
                            }, [])
                            console.log(test)
                            listStandart = [...new Set(listStandart)]
                            console.log(listStandart)
                            listStandart.map(e => {
                                list2.push(test[e])
                            })
                            console.log(list2)
                            list2.map(e=>{
                                if (e.length === 1) {
                                    e[0].proc_rt = '-'
                                    if (e[0].place === 511) {
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
                                            item.action_type = item.action_type !== null ? item.action_type : null 
                                            outval = item;
                                        }
                                    })
                                    let objectitem = {}
                                    if (outval.place === 511) {
                                          objectitem = {
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category':outval.category,
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
                                            'proc_rt':'-',
                                        }                                      
                                    }else{       
                                        objectitem = {
                                            'prevention_date':outval.prevention_date,
                                            'server_name':outval.server_name,
                                            'category':outval.category,
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
                                            'proc_rt':(Math.floor(inval.inlet_avg_value - outval.outlet_avg_value) / inval.inlet_avg_value*100).toFixed(2) + "%",
                                        }
                                    }
                                    // console.log(objectitem)
                                    that.list.push(objectitem)   
                                }

                                
                            })


                            // that.list = res.data.data
                            that.listCount = res.data.totalCount
                            console.log(that.list)
                            
                            this.graphLabel = []
                            this.inletgraphDataMin = []
                            this.inletgraphDataAvg = []
                            this.inletgraphDataMax = []
                            this.outletgraphDataMin = []
                            this.outletgraphDataAvg = []
                            this.outletgraphDataMax = []
                            that.list.map(e => {

                                this.graphLabel.push(e.prevention_date)
                                this.inletgraphDataMin.push(e.inlet_min_value)
                                this.inletgraphDataAvg.push(e.inlet_avg_value)
                                this.inletgraphDataMax.push(e.inlet_max_value)

                                this.outletgraphDataMin.push(e.outlet_min_value)
                                this.outletgraphDataAvg.push(e.outlet_avg_value)
                                this.outletgraphDataMax.push(e.outlet_max_value)
                            })          
                            this.busy = false
                        }
                    }
                })
                .catch(err => {
                    alert("월간방지시설목록 추출 실패 \n" + err);
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
            if (this.list !== [] && store.state.ckServer.length == 1 && store.state.ckCate.length == 1 && store.state.ckEquip.length == 2) {
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
                },
                data: {

                    labels: this.graphLabel,
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
    /* background: url(../imgs/common/leftArrow.png) no-repeat center center; */
    background-size: 10px 10px;
}

.ui-datepicker-prev span.ui-icon {
    transform: rotateZ(180deg);
}

.con_box_right {
    box-sizing: border-box;
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

.pdmDateCheck {
    width: 100%;
    height: 50px;
}

.pdmDateCheck>div>div>div {
    float: left;
}

.pdmDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.pdmDateCheck>div>div>div:nth-child(2),
.pdmDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
}

.pdmDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.pdmDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.pdm_btn01,
.pdm_btn02,
.pdm_btn03 {
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

.pdm_btn01 {
    right: 360px;
}

.pdm_btn02 {
    right: 190px;
}

.pdm_btn03 {
    right: 20px;
}

.pdm_btn01:hover,
.pdm_btn02:hover,
.pdm_btn03:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.dateSelect input {
    box-sizing: border-box;
    padding-left: 10px;
}
</style>
