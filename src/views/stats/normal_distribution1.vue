<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>정규분포</p>
                    <div class="ndDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-2">
                                <div class="float-left select01">
                                    <router-link :to="{ name: 'normalDistribution1'}">위치별 정규분포</router-link>
                                </div>
                                <div class="float-left">
                                    <router-link :to="{ name: 'normalDistribution2'}">월별 정규분포</router-link>
                                </div>
                            </div>
                            <div class="col-5" style="display:flex;align-items:center">
                                <div class="float-left" style="width:60px; font-size:14px; line-height:30px;">기간 선택</div>
                                <div class="dateSelect ndDateSelect">
                                    <date-pick v-model="dateFr" :format="'YYYY-MM-DD'"></date-pick>
                                </div>
                                <div style="text-align:center; width:20px;">~</div>
                                <div class="dateSelect dateSelectTo ndDateSelect">
                                    <date-pick v-model="dateTo" :format="'YYYY-MM-DD'"></date-pick>
                                </div>

                            </div>
                            <div class="col-5">
                                <input class="nd_btn01" type="button" v-on:click="getList" value="조회">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="canvasWrap canvasLoc container-fluid mt-3" style="display:flex;flex-flow:wrap;">
                        <b-col cols="4" v-for="(item , idx) in List" :key="idx">
                            <p>{{item[0].internal_name}}</p>
                            <canvas :id="'chart'+idx"></canvas>
                            <div>
                                <div>
                                    <div class="yAxisBar yAxisBar1" :id="'yAxisBar1_'+idx"></div>
                                    <div class="yAxisBar yAxisBar2" :id="'yAxisBar2_'+idx"></div>
                                    <div class="yAxisBar yAxisBar3" :id="'yAxisBar3_'+idx"></div>
                                </div>
                            </div>
                        </b-col>
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
import 'vue-good-table/dist/vue-good-table.css'

// import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Chart from 'chart.js'
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        Main,
        DatePick
        // BootstrapVue,
    },
    data() {
        return {
            busy:false,
            timeout : null,
            inletgraphLabel: [],
            List: [],
            ListCount: 0,
            ListField: [{
                    field: 'f_nm',
                    label: 'name',
                    hidden: true
                },
                {
                    field: 'f_nm',
                    label: 'name'
                },
            ],
            dateFr: store.state.szCurMmFr,
            dateTo: store.state.szCurMmTo,
            findTp: 'codeNm',
            findSz: '',
            pageNo: 1,
            perPage: 10,
            paginationPageSize: store.state.paginationPageSize,
            perCodeNo: 1,
            ctxFontSize:[],
            ctxConfig:[],

        }
    },

    watch:{
        // dateFr(){
        //     this.dateTo = null
        // },
        // dateTo(){
        //     // if (this.dateFr === null) {
        //     //     this.dateTo = null;
        //     //     alert("시작일을 먼저 선택하여 주십시오")
        //     //     return;
        //     // }
        //     // console.log(new Date(this.dateFr).getTime(), new Date(this.dateTo).getTime())
        //     // if (Number(this.dateTo.split("-")[1]) <= Number(this.dateFr.split("-")[1]) + 1 && Number(this.dateTo.split("-")[1]) >= Number(this.dateFr.split("-")[1]) - 1  ) {
        //     //     return
        //     // }else{
        //     //     alert("기간은 시작일로 부터 1달이상 차이날수 없습니다.")
        //     //     this.dateTo = null
        //     // }
            
        
        // }
    },

    computed: {},

    beforeDestroy() {
      this.clearTimeout()
    },

    beforeMount() {

    },
    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        //this.getList(); 여기서 실행하면 최초 실행시 -1일식 차감해서 검색일자가 설정되는 오류 발생됨.
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

        axLen3(e) { //최대 3자 이하로구성
            return String(e).substring(0, 3);
        },
        maxLen10(e) { //최대 50자이하로 구성
            return String(e).substring(0, 10);
        },
        async getRootCodeList() {
            let that = this;
            await this.$Axios.post("/api/daedan/haccp/code/codeList", {
                    parCodeNo: this.parCodeNo,
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode == 200) {
                            that.rootList = res.data.data;
                            that.rootListCount = res.data.totalCount;
                            that.rootInfo = res.data.data;
                            console.log("rootListCount = " + that.rootListCount); //kill
                            if (that.rootList.length > 0) {
                                that.parCodeNo = that.rootList[0].code_no;
                                // that.getChildCodeList();
                            } else {
                                alert("등록된 기본 코드가 없습니다");
                            }
                        } else {
                            alert(res.data.message);
                            this.$store.dispatch("loginFail", res.data.data);
                            return;
                        }
                    }
                })
                .catch(err => {
                    alert("기본코드목록 추출실패\n" + err.message);
                })
        },
        getList() {
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }else if(store.state.ckServer.length >= 2){
                alert("사업장은 한곳만 선택할수 있습니다.")
                return;
            }
            if (store.state.ckCate.length == 0) {
                alert("분야는 필수 선택 항목 입니다.")
                return;
            }else if(store.state.ckCate.length >= 2){
                alert("분야는 1가지만 선택할수 있습니다.")
                return;
            }
            if  (store.state.ckEquip.length == 0){
                alert("측정위치는 필수 선택 항목 입니다.")
                return;
            }
            if (this.dateFr === null || this.dateFr === "" || this.dateTo === null || this.dateTo === "") {
                console.log(this.dateFr)
                console.log(this.dateTo)
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            this.$Axios.post("/api/daedan/cj/ems/stat/normalDistributionByEquip", {
                    check:"Day",
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
                    serverKey: store.state.ckServer[0],
                    cateList: store.state.ckCate,
                    equipList: store.state.ckEquip,
                    pageNo: this.pageNo,
                    pageSz: 10000,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            this.List = []
                            let test = []
                            let equipment_names = []
                            test = res.data.data.reduce((acc,v) => {
                                console.log(Object.values(v))
                                let key = Object.values(v).slice(1,2).join('')
                                acc[key] = acc[key] ? [...acc[key], v] : [v]
                                return acc
                            }, [])
                            res.data.data.map(e=>{
                                equipment_names.push(e.equipment_name)
                            })
                            equipment_names = [...new Set(equipment_names)]
                            equipment_names.map(e=>{    
                                that.List.push(test[e])
                            })
                        
                            that.listCount = res.data.totalCount
                            console.log(this.List)
                            
                            setTimeout(() => {
                                this.randarChart()
                            }, 100);
                        }
                    }
                })
                .catch(err => {
                    alert("월간통계데이터목록 추출 실패 \n" + err);
                })
        },
        // 그래프버튼 클릭
        graphBtn() {
            this.randarChart()
        },
        randarChart() {
            if (this.Chart != undefined) {   
                // this.Chart.destroy();
            }
            // if (this.dailyChart2) {
            //     this.dailyChart2.destroy();
            // }
            this.List.map((e,idx) => {
                // console.log()
                // if (e[0].place !== 512) {
                //     retu
                // }
                const chartList = [
                    {
                        x: 1000,
                        y: 0,
                        r: 0
                    },
                    {
                        x: 0,
                        y: e.length,
                        r: 0
                    }
                ]
                const val10 = []
                const val100 = []
                const val200 = []
                const val300 = []
                const val400 = []
                const val500 = []
                const val600 = []
                const val700 = []
                const val800 = []
                const val900 = []
                const val1000 = []

                const chartAvgBar = []; 
                let overBar = 0;
                let underBar = 0;

                this.inletgraphLabel = []

                e.map(item => {
                    console.log(item)
                    if (item.place === 512) {
                        if(item.outlet_avg_value < 100 ) {
                            val10.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value > 100 && item.outlet_avg_value < 200 ){
                            val100.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value > 200 && item.outlet_avg_value < 300 ){
                            val200.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value > 300 && item.outlet_avg_value < 400 ){
                            val300.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value > 400 && item.outlet_avg_value < 500 ){
                            val400.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value > 500 && item.outlet_avg_value < 600 ){
                            val500.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value > 600 && item.outlet_avg_value < 700 ){
                            val600.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value > 700 && item.outlet_avg_value < 800 ){
                            val700.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value > 800 && item.outlet_avg_value < 900 ){
                            val800.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value > 900 && item.outlet_avg_value < 1000 ){
                            val900.push(item.outlet_avg_value)
                        }else if(item.outlet_avg_value >= 1000){
                            val1000.push(item.outlet_avg_value)
                        }
                        // chartList.push(item.outlet_avg_value)
                        overBar = item.outlet_standard_value * 1.2
                        underBar = item.outlet_standard_value * 0.8
                        chartAvgBar.push(item.outlet_avg_value)
                        this.inletgraphLabel.push(item.to_char)
                    }
                    if (item.place === 511) {
                        if(item.midlet_avg_value < 100 ) {
                            val10.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value > 100 && item.midlet_avg_value < 200 ){
                            val100.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value > 200 && item.midlet_avg_value < 300 ){
                            val200.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value > 300 && item.midlet_avg_value < 400 ){
                            val300.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value > 400 && item.midlet_avg_value < 500 ){
                            val400.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value > 500 && item.midlet_avg_value < 600 ){
                            val500.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value > 600 && item.midlet_avg_value < 700 ){
                            val600.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value > 700 && item.midlet_avg_value < 800 ){
                            val700.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value > 800 && item.midlet_avg_value < 900 ){
                            val800.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value > 900 && item.midlet_avg_value < 1000 ){
                            val900.push(item.midlet_avg_value)
                        }else if(item.midlet_avg_value >= 1000){
                            val1000.push(item.midlet_avg_value)
                        }
                        // chartList.push(item.midlet_avg_value)
                        overBar = item.midlet_standard_value * 1.2
                        underBar = item.midlet_standard_value * 0.8
                        chartAvgBar.push(item.midlet_avg_value)
                        this.inletgraphLabel.push(item.to_char)
                    }
                    if (item.place === 510) {
                        if(item.inlet_avg_value < 100 ) {
                            val10.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value > 100 && item.inlet_avg_value < 200 ){
                            val100.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value > 200 && item.inlet_avg_value < 300 ){
                            val200.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value > 300 && item.inlet_avg_value < 400 ){
                            val300.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value > 400 && item.inlet_avg_value < 500 ){
                            val400.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value > 500 && item.inlet_avg_value < 600 ){
                            val500.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value > 600 && item.inlet_avg_value < 700 ){
                            val600.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value > 700 && item.inlet_avg_value < 800 ){
                            val700.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value > 800 && item.inlet_avg_value < 900 ){
                            val800.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value > 900 && item.inlet_avg_value < 1000 ){
                            val900.push(item.inlet_avg_value)
                        }else if(item.inlet_avg_value >= 1000){
                            val1000.push(item.inlet_avg_value) 
                        }
                        // chartList.push(item.inlet_avg_value)
                        overBar = item.inlet_standard_value * 1.2
                        underBar = item.inlet_standard_value * 0.8
                        chartAvgBar.push(item.inlet_avg_value)
                        this.inletgraphLabel.push(item.to_char)
                    }
                })
                const arr = chartAvgBar.reduce(function add(sum, currValue) {
                return sum + currValue;
                }, 0);

                let chartAvgBarVal = arr / chartAvgBar.length;
                if (chartAvgBarVal > 1000) {
                    chartAvgBarVal = 1000
                }


                if (underBar > 1000 || underBar < 0) {
                    document.getElementById('yAxisBar1_'+idx).style.display = 'none'    
                }else{
                    document.getElementById('yAxisBar1_'+idx).style.left = underBar/10+"%"    
                }

                document.getElementById('yAxisBar2_'+idx).style.left = chartAvgBarVal/10+"%"

                if (overBar > 1000 || overBar < 0) {
                    document.getElementById('yAxisBar3_'+idx).style.display = 'none'    
                }else{
                    document.getElementById('yAxisBar3_'+idx).style.left = overBar/10+"%"    
                }

                

          

                if (val10.length !== 0) {
                    chartList.push({x:10,y:val10.length,r:5})
                } 
                if (val100.length !== 0) {
                    chartList.push({x:100,y:val100.length,r:5})
                } 
                if (val200.length !== 0) {
                    chartList.push({x:200,y:val200.length,r:5})
                } 
                if (val300.length !== 0) {
                    chartList.push({x:300,y:val300.length,r:5})
                } 
                if (val400.length !== 0) {
                    chartList.push({x:400,y:val400.length,r:5})
                } 
                if (val500.length !== 0) {
                    chartList.push({x:500,y:val500.length,r:5})
                } 
                if (val600.length !== 0) {
                    chartList.push({x:600,y:val600.length,r:5})
                } 
                if (val700.length !== 0) {
                    chartList.push({x:700,y:val700.length,r:5})
                } 
                if (val800.length !== 0) {
                    chartList.push({x:800,y:val800.length,r:5})
                } 
                if (val900.length !== 0) {
                    chartList.push({x:900,y:val900.length,r:5})
                } 
                if (val1000.length !== 0) {
                    chartList.push({x:1000,y:val1000.length,r:5})
                } 
                this.ctxDaily = document.getElementById('chart'+idx).getContext('2d');
                this.ctxDaily.height = "100%";
                this.ctxDaily.width = "100%";
                // this.ctxDaily.font = "5rem";
                // console.log(this.dailyChartLabel,this.dailyChartData)
                let ctxFontSize = 14


                this.ctxConfig = {
                    type: 'bubble',
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

                                //backgroundColor: 'rgba(255.255.255,0.8)',
                                borderRadius: 4
                            }
                        },
                        // maintainAspectRatio: false,
                    },
                    data: {

                        labels: this.inletgraphLabel,
                        datasets: [
                            {
                                label: '측정값',
                                borderColor: '#42f13f',
                                backgroundColor: '#42f13f',
                                data: chartList
                                // data:this.dailyChartData
                            },
                        ]
                    },
                }
                this.Chart = new Chart(this.ctxDaily, this.ctxConfig);
                
                this.Chart.update()
                this.busy = false
            })
        }

    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

/* Top DateCheck , search and Excel Save*/

.ndDateCheck {
    width: 100%;
    height: 50px;
}

.ndDateCheck>div{
    height:100%;
}

.ndDateCheck>div>div{
    height:100%;
}

.ndDateCheck>div>div:nth-child(1)>div{
    width:50%;
    height:30px;
    font-size:14px;
    background:#CCE2F8;
}

.ndDateCheck>div>div:nth-child(1)>.select01{
    background:#0052BB;
}

.ndDateCheck>div>div:nth-child(1)>div>a{
    display:block;
    color:black;
    line-height:30px;
    text-align: center;
    text-decoration: none;
}

.ndDateCheck>div>div:nth-child(1)>.select01>a{
    color:white;
}

.nd_btn01 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 150px;
    height: 30px;
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

.nd_btn01:hover {
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
    font-size:14px;
}


/* Contents */

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

.canvasWrap {
    height:650px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    padding: 0;
    overflow-y:scroll;
    background:rgb(243, 251, 255);
    border-radius: 5px;
}

.canvasWrap>div{
    position:relative;
    width:100%;
    height:60%;
}

.canvasWrap>div p{
    font-size:14px;
}

.canvasWrap>div canvas{
    width:100%;
    height:250px;
    outline:1px solid;
}
.canvasWrap>div>div{
    position: absolute;
    top: 83px;
    left: 50px;
    width: 418px;
    height: 180px;
    /* border: 1px solid red; */
}
.canvasWrap>div>div>div{
    width: 100%;
    position: relative;
    height: 100%;
}
.canvasWrap>div>div>div>div.yAxisBar{
    position:absolute;
    top:0px;
    left:0px;
    width:3px;
    height:185px;
    border:2px dashed red;
}
.canvasWrap>div>div>div>div.yAxisBar1 ,.canvasWrap>div>div>div>div.yAxisBar1{
    border:2px dashed red;
}
.canvasWrap>div>div>div>div.yAxisBar2{
    border:2px solid blue;
}

.canvasWrap::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
}

.canvasWrap::-webkit-scrollbar-track {
    background-color: #cacaca;
    border-radius: 5px;
}

.canvasWrap::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #000000;
}

.canvasWrap::-webkit-scrollbar-button {
    width: 0;
    height: 0;
}
.ndDateSelect{
    width:150px !important;
}
.ndDateSelect input{
    width:150px;
}
</style>
