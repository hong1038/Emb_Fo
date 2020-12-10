<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>정규분포</p>
                    <!--<div class="distri_dateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-7">
                                <div>월 선택</div>
                                <input type="date" v-model="dateFr">
                                <div class="distri_dateSelect">
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
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div>

                            </div>
                            <div class="col-5">
                                <input class="nd_btn01" type="button" v-on:click="getList" value="조회">
                            </div>
                        </div>
                    </div>-->
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
                                <!-- <input type="date" v-model="dateFr"> -->
                                <div class="dateSelect">
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div>
                                <div style="text-align:center; width:20px;">~</div>
                                <div class="dateSelect dateSelectTo">
                                    <datetime type="date" v-model="dateTo" class="datetime"></datetime>
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

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import Vue from 'vue'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"
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
        Main,
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
            dateFr: '',
            dateTo: '',
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
        dateFr(){
            this.dateTo = null
        },
        dateTo(){
            // if (this.dateFr === null) {
            //     this.dateTo = null;
            //     alert("시작일을 먼저 선택하여 주십시오")
            //     return;
            // }
            // console.log(new Date(this.dateFr).getTime(), new Date(this.dateTo).getTime())
            // if (Number(this.dateTo.split("-")[1]) <= Number(this.dateFr.split("-")[1]) + 1 && Number(this.dateTo.split("-")[1]) >= Number(this.dateFr.split("-")[1]) - 1  ) {
            //     return
            // }else{
            //     alert("기간은 시작일로 부터 1달이상 차이날수 없습니다.")
            //     this.dateTo = null
            // }
            
        
        }
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
                this.Chart.destroy();
            }
            // if (this.dailyChart2) {
            //     this.dailyChart2.destroy();
            // }
            this.List.map((e,idx) => {
                const chartList = []
                this.inletgraphLabel = []
                e.map(item => {
                    if (item.place === 512) {
                        chartList.push(item.outlet_avg_value)
                        this.inletgraphLabel.push(item.to_char)
                    }
                    if (item.place === 511) {
                        chartList.push(item.midlet_avg_value)
                        this.inletgraphLabel.push(item.to_char)
                    }
                    if (item.place === 510) {
                        chartList.push(item.inlet_avg_value)
                        this.inletgraphLabel.push(item.to_char)
                    }
                })

                this.ctxDaily = document.getElementById('chart'+idx).getContext('2d');

                this.ctxDaily.height = "100%";
                this.ctxDaily.width = "100%";
                // this.ctxDaily.font = "5rem";
                // console.log(this.dailyChartLabel,this.dailyChartData)
                let ctxFontSize = 14
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

                                //backgroundColor: 'rgba(255.255.255,0.8)',
                                borderRadius: 4
                            }
                        },
                        maintainAspectRatio: false,
                    },
                    data: {

                        labels: this.inletgraphLabel,
                        datasets: [
                            {
                                label: '측정값',
                                borderColor: '#42f13f',
                                backgroundColor: 'transparent',
                                data: chartList
                                // data:this.dailyChartData
                            }
    
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

/* Top DateCheck , search and Excel Save*/

.ndDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
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
    background: rgb(187, 231, 248);
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
}


/* Contents */

.con_box_right {
    box-sizing: border-box;
    font-family: "CJ Onlyone Medium";
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

.canvasWrap {
    height:450px;
    box-sizing: border-box;
    border-top: 2px solid #ccc;
    padding: 0;
}

.canvasWrap>div{
    width:100%;
    height:57%;
}

.canvasWrap>div canvas{
    width:100%;
    height:200px;
    outline:1px solid;
}

</style>
