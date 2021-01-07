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
                                <div class="float-left">
                                    <router-link :to="{ name: 'normalDistribution1'}">위치별 정규분포</router-link>
                                </div>
                                <div class="float-left select02">
                                    <router-link :to="{ name: 'normalDistribution2'}">월별 정규분포</router-link>
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="float-left" style="width:60px; font-size:14px; line-height:30px;">연도 선택</div>
                                <div class="dateSelect float-left">
                                    <datepicker 
                                        
                                        
                                        :format="DatePickerFormat"
                                        :language="language"
                                        minimum-view="year"
                                        name="datepicker"
                                        id="input-id"
                                        input-class="input-class"
                                        v-model="dateFr"></datepicker>
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
// import 'vue-good-table/dist/vue-good-table.css'

// import Vue from 'vue'
import Datepicker from 'vuejs-datepicker';
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Chart from 'chart.js'
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        Main,
        Datepicker,

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
            menu:false,
            dateFr: store.state.curYFr,
            findTp: 'codeNm',
            findSz: '',
            pageNo: 1,
            perPage: 10,
            paginationPageSize: store.state.paginationPageSize,
            perCodeNo: 1,
            ctxFontSize:[],
            ctxConfig:[],

            
            DatePickerFormat:'yyyy',
            language:{
                language: 'Korean', 
                months: ['1', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
                monthsAbbr: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
                days: ['일', '월', '화', '수', '목', '금', '토'], 
                rtl: false, 
                ymd: false, 
                yearSuffix: '년'
                }
        }
    },

    computed: {},

    beforeDestroy() {
      this.clearTimeout()
    },
    watch: {
        menu (val) {
            console.log(val)
            val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
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
            console.log(this.dateFr.length)
            if(this.dateFr.length > 6){
                this.dateFr = String(this.dateFr).substring(0,4);
            }
            else{
                const cutDate = String(this.dateFr);
                this.dateFr = cutDate.substring(11,15);
            }
                console.log(this.dateFr)
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }else if(store.state.ckServer.length >= 2){
                alert("사업장은 한곳만 선택할수 있습니다.")
                return;
            }
          
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            this.$Axios.post("/api/daedan/cj/ems/stat/normalDistributionByEquip", {
                    check:"Mon",
                    dateFr: String(this.dateFr),
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
                            let yearlists = []
                            console.log(res.data.data)
                            test = res.data.data.reduce((acc,v) => {
                                let key = Object.values(v).slice(1,2).join('')
                                acc[key] = acc[key] ? [...acc[key], v] : [v]
                                return acc
                            }, [])
                            res.data.data.map(e=>{
                                yearlists.push(e.yearlist)
                            })
                            console.log(test)
                            yearlists = [...new Set(yearlists)]
                            yearlists.map(e=>{    
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
        randarChart() {
            if (this.Chart) {
                this.Chart.destroy();
            }
            
            this.List.map((e,idx) => {
                const chartList = []
                this.inletgraphLabel = []
                e.map(item => {
                    chartList.push(item.outlet_data_value)
                    this.inletgraphLabel.push(item.to_char)
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

.ndDateCheck>div>div:nth-child(1)>.select02{
    background:#0052BB;
}

.ndDateCheck>div>div:nth-child(1)>div>a{
    display:block;
    color:black;
    line-height:30px;
    text-align: center;
    text-decoration: none;
}

.ndDateCheck>div>div:nth-child(1)>.select02>a{
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
    background: white;
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

.dateSelect .cell{
    font-size:16px;

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
    height:450px;
    box-sizing: border-box;
    border-top: 2px solid #ccc;
    padding: 0;
}

.canvasWrap>div{
    width:100%;
    height:60%;
}

.canvasWrap>div canvas{
    width:100%;
    height:200px;
    outline:1px solid;
}

</style>
