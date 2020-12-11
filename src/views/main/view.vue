<template>
<b-container fluid>
    <Header></Header>

    <div style="display:flex;">
        <div class="inner viewInner">
            <div class="titleBox">
                {{this.title}}
                <div class="tabBox">
                    <div v-on:click="twoDBtn()">지도</div>
                    <div v-on:click="threeDBtn()">3D</div>
                </div>
            </div>
            <div class="viewBox viewLeftBox">

                <!-- <div class="imgBox" :style="{ backgroundImage: 'url(' + this.bgImg + ')' }"> -->
                <div class="imgBox" :style="imgBoxStyle">
                    <div class="viewPinWrap viewPinWrap01">
                        <!-- <div v-for="item in pinList" :key="item.pin_code" :style="item.style" :value="item.pin_name" class="view_pin01" v-on:click="infoBtn(item)"></div> -->
                    </div>
                    <div class="pinBoxWrap" style="width:100%;">
                        <div :class="item.box_size+' pinBox pinBox'+item.box_code" v-for="(item,index) in boxList" :key="item.box_code" :style="item.style">
                            <div v-if="item.equipment_inner_nm.length > 20">
                                <div class="pinTitle" v-if="Number(boxlistvalout[index]) >= Number(boxlistvalstandard[index]) || boxlistvalstandard[index] == '-' && Number(boxlistvalout[index]) > 0 && boxlistvalout[index] != '-'" style="background:red;color:white;">{{item.equipment_inner_nm}}</div>
                                <div class="pinTitle" v-else>{{item.equipment_inner_nm}}</div>
                                <div class="scrollbox" v-if="boxlistvalplace[index] != 511">
                                    <div  class="container" >
                                        <b-row class="pinBody">
                                            <b-col cols="4">기준<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                            <b-col cols="4">흡입<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                            <b-col cols="4">배출<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                        </b-row>
                                    </div>
                                    <div  class="container">
                                        <b-row class="pinBody">
                                            <b-col cols="4">{{boxlistvalstandard[index]}}</b-col>
                                            <b-col cols="4">{{boxlistvalin[index]}}</b-col>
                                            <b-col cols="4">{{boxlistvalout[index]}}</b-col>
                                        </b-row>
                                    </div>
                                    <!-- <div v-for="(e,idx) in testdata" :key="index+idx"> -->
                                    <!-- </div> -->
                                </div>
                                <div class="scrollbox" v-else>
                                    <div  class="container" >
                                        <b-row class="pinBody">
                                            <b-col cols="4">기준<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                            <b-col cols="4">중간<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                        </b-row>
                                    </div>
                                    <div  class="container">
                                        <b-row class="pinBody">
                                            <b-col cols="4">{{boxlistvalstandard[index]}}</b-col>
                                            <b-col cols="4">{{boxlistvalmid[index]}}</b-col>
                                        </b-row>
                                    </div>
                                    <!-- <div v-for="(e,idx) in testdata" :key="index+idx"> -->
                                    <!-- </div> -->
                                </div>
                            </div>
                            <div v-else>
                                <div class="pinTitle" v-if="Number(boxlistvalout[index]) >= Number(boxlistvalstandard[index]) || boxlistvalstandard[index] == '-' && Number(boxlistvalout[index]) > 0 && boxlistvalout[index] != '-'" style="background:red;color:white;">{{item.equipment_inner_nm}}</div>
                                <div class="pinTitle" v-else>{{item.equipment_inner_nm}}</div>
                                <div class="scrollbox" v-if="boxlistvalplace[index] != 511">
                                    <div  class="container" >
                                        <b-row class="pinBody">
                                            <b-col cols="4">기준<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                            <b-col cols="4">흡입<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                            <b-col cols="4">배출<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                        </b-row>
                                    </div>
                                    <div  class="container">
                                        <b-row class="pinBody">
                                            <b-col cols="4">{{boxlistvalstandard[index]}}</b-col>
                                            <b-col cols="4">{{boxlistvalin[index]}}</b-col>
                                            <b-col cols="4">{{boxlistvalout[index]}}</b-col>
                                        </b-row>
                                    </div>
                                    <!-- <div v-for="(e,idx) in testdata" :key="index+idx"> -->
                                    <!-- </div> -->
                                </div>
                                <div class="scrollbox" v-else>
                                    <div  class="container" >
                                        <b-row class="pinBody">
                                            <b-col cols="4">기준<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                            <b-col cols="4">중간<span style="font-size:8px">({{boxlistvalunit[index]}})</span></b-col>
                                        </b-row>
                                    </div>
                                    <div  class="container">
                                        <b-row class="pinBody">
                                            <b-col cols="4">{{boxlistvalstandard[index]}}</b-col>
                                            <b-col cols="4">{{boxlistvalmid[index]}}</b-col>
                                        </b-row>
                                    </div>
                                    <!-- <div v-for="(e,idx) in testdata" :key="index+idx"> -->
                                    <!-- </div> -->
                                </div>    
                            </div>
                            
                        </div>
                    </div>
                </div>
                    <!-- <b-overlay class="overlay" v-if="show" v-on:click="infoClose()"> -->
                <div class="bottomBox">
                    <div class="bottom_subMenuBox bottom_subMenuBox01" :style="'height:'+40*Math.ceil(boxList.length/8)+'px'" v-if="boxList.length <= 8">
                        <div @click="selectEq('All')" class="eqKey eqKey_0">전체</div>
                        <!-- <div @click="selectEq(item)" :class="'eqKey eqKey'+item.box_code" v-for="item in boxList" v-bind:key="item.box_code" @mouseover="item.check = false" @mouseleave="item.check = true">{{item.equipment_inner_nm.length > 10  && item.check === true ? item.equipment_inner_nm.substr(0,10)+"..." :item.equipment_inner_nm}}</div> -->
                        <div @click="selectEq(item)" :class="'eqKey eqKey'+item.box_code" v-for="item in boxList" v-bind:key="item.box_code" @mouseover="moverEq(item)" @mouseleave="mleave(item)">{{item.equipment_inner_nm.length > 10  && item.check === true ? item.equipment_inner_nm.substr(0,10)+"..." :item.equipment_inner_nm}}</div>
                    </div>
                    <div class="bottom_subMenuBox bottom_subMenuBox02" :style="'height:'+40*Math.ceil(boxList.length/8)+'px'"  v-else>
                        <div @click="selectEq('All')" class="eqKey eqKey_0">전체</div>
                        <!-- <div @click="selectEq(item)" :class="'eqKey eqKey'+item.box_code" v-for="item in boxList" v-bind:key="item.box_code" @mouseover="item.check = false; " @mouseleave="item.check = true">{{item.equipment_inner_nm.length > 10 && item.check === true ? item.equipment_inner_nm.substr(0,10)+"..." :item.equipment_inner_nm}}</div> -->
                        <div @click="selectEq(item)" :class="'eqKey eqKey'+item.box_code" v-for="item in boxList" v-bind:key="item.box_code" @mouseover="moverEq(item) " @mouseleave="mleave(item)">{{item.equipment_inner_nm.length > 10 && item.check === true ? item.equipment_inner_nm.substr(0,10)+"..." :item.equipment_inner_nm}}</div>
                    </div>
                    <div class="bottom_letBox" v-if="scrubber.length <= 0">
                        <p style="font-size:18px">데이터가 없습니다.</p>
                    </div>
                    
                <div class="bottom_letBox"  v-else>
                        <div style="width:100%;display:flex;justify-content:flex-end;padding-right:15px">
                            <div style="display:flex;align-items:center;justify-content: flex-end;">
                                <span style="margin-right:5px;display:block;width:12px;height:12px;border-radius:100%;background:rgb(81, 81, 255)"></span>
                                <span style="font-size:18px">정상</span>
                            </div>
                            <div style="display:flex;align-items:center;margin-left:12px">
                                <span style="margin-right:5px;display:block;width:12px;height:12px;border-radius:100%;background:#ff3131"></span>
                                <span style="font-size:18px">비정상</span>
                            </div>
                        </div>
                        <div class="infoBox" v-for="(item,key) in boxList2" v-bind:key="key">
                            <div :class="'infoTitle infoTitle_'+key"> <span style="color:white"> {{item.equipment_inner_nm}}</span></div>

                            <div class="infoBody"  v-if="boxlistvalplace[item.box_code - 1] != 511">
                                <div class="infoBody_inlet">
                                    <div>흡입구</div>
                                    <div>
                                        <div class="in_line line"></div>
                                        <div :class="key + '_in_up in_up up'"></div>
                                        <div class="in_down down"></div>
                                    </div>
                                    
                                    <div>{{boxlistvalin[item.box_code - 1]}} / {{boxlistvalinletstandard[item.box_code - 1]}}</div>
                                </div>
                                <div class="infoBody_outlet">
                                    <div>배출구</div>
                                    <div>
                                        <div class="out_line line"></div>
                                        <div :class="key + '_out_up out_up up'"></div>
                                        <div class="out_down down"></div>
                                    </div>
                                    <div>{{boxlistvalout[item.box_code - 1]}} / {{boxlistvalstandard[item.box_code - 1]}}</div>
                                </div>
                            </div>

                            <div class="infoBody"  v-else>
                                <div class="infoBody_outlet">
                                    <div>중간</div>
                                    <div>
                                        <div class="mid_line line"></div>
                                        <div :class="key + '_mid_up mid_up up'"></div>
                                        <div class="mid_down down"></div>
                                    </div>
                                    <div>{{boxlistvalmid[item.box_code - 1]}} / {{boxlistvalstandard[item.box_code - 1]}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="viewBox viewRightBox" v-if="scrubber.length <= 0" >
                <p style="font-size:18px">데이터가 없습니다.</p>
            </div>
            <div v-else id="viewRightBox" class="viewBox viewRightBox">
                <div style="display:flex;justify-content:flex-end;margin-right:15px">
                    <div style="display:flex;align-items:center;justify-content: flex-end;">
                        <span style="margin-right:5px;display:block;width:12px;height:12px;border-radius:100%;background:#f2c84c"></span>
                        <span style="font-size:18px">흡입</span>
                    </div>
                    <div style="display:flex;align-items:center;margin-left:12px">
                        <span style="margin-right:5px;display:block;width:12px;height:12px;border-radius:100%;background:#2cd2f6"></span>
                        <span style="font-size:18px">배출</span>
                    </div>
                </div>
                <div class="canvasWrap" v-for="(item,idx) in boxList2" v-bind:key="idx" :id="'graph-canvas'+idx">
                    <div>{{item.equipment_inner_nm}}</div>
                    <canvas :id="'line-graph'+idx" class="line-graph" width="560" height="200"></canvas>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>
<script>
import Header from '@/components/header.vue'
import store from "@/store/index";
import Chart from 'chart.js'
//import router from "@/router/index";
export default {
    components: {
        Header,
    },
    created() {
        this.test3()
        this.test2()


        this.imgBoxStyle = "backgroundImage:url("+this.bgImg+");height:466px;"
    },
    data() {
        return {
            busy:false,
            timeout : null,
            show:false,

            eqbKey:null,
            item:{},
            equipList: [],
            equipList2:[],
            scrubber: [],
            title: null,
            number: null,
            data: [],
            ctxDaily: null,
            ctxConfig: null,
            bgImg: store.state.bgImg,
            bgImg2d: store.state.bgImg2d,
            pinList: [],

            imgBoxStyle:"",
            boxList:[],
            boxList2:[],
            sensorData:[],
            boxtitle:[],
            boxlistvalin:[],
            boxlistvalmid:[],
            boxlistvalout:[],
            boxlistvalstandard:[],
            boxlistvalunit:[],
            boxlistvalplace:[],
            boxlistvalinletstandard:[],
            data_equipment_inner_nm:[],
            boxHeight:[],
            allKeywords:[],
        }

    },

    methods: {
        test3(){
            this.$Axios.post("/api/daedan/cj/ems/main/MapBoxList", {
                serverKey: store.state.serverKey,
            }, this.config).then(res => {
                res.data.data.map(e=>{
                    if (e.box_code < 10) {
                        e.box_code = "0"+String(e.box_code)
                    }
                    e.style = 'top:'+e.box_py+'px;left:'+e.box_px+'px'
                    e.check = true;
                })
                this.boxList = res.data.data
                console.log(this.boxList)
            }).catch(err =>{
                alert(err)
            })
        },
        test2(){
            this.$Axios.post("/api/daedan/cj/ems/main/MonitoringListPerHourSensor2", {
                serverKey: store.state.serverKey,
                date: store.state.szCurDt
            }, this.config)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.statusCode === 200) {
                        this.sensorData = res.data.data;
                        this.boxlistvalin = []
                        this.boxlistvalmid = []
                        this.boxlistvalout = []
                        this.boxlistvalstandard = []
                        this.boxlistvalunit = [],
                        this.boxlistvalplace = [],
                        this.boxList.map(e => {
                            // console.log(e)
                            let inval = null
                            let outval = null
                            let midval = null
                            let standard = null
                            let unit = null
                            let place = null
                            let inletstandard = null
                            this.sensorData.map(el => {              
                                if (e.equipment_inner_nm == el.equipment_inner_nm) {
                                    if (el.place === 510) {
                                        inval = el.inlet_avg_value    
                                        inletstandard = el.inlet_standard_value
                                    }
                                    if (el.place === 512) {
                                        standard = el.outlet_standard_value
                                        outval = el.outlet_avg_value
                                    }
                                    if (el.place === 511) {
                                        midval = el.midlet_avg_value
                                        standard = el.midlet_standard_value
                                    }
                                    unit = el.unit
                                    place = el.place
                                }
                            })
                            // inval = 10
                            // outval = 500
                            // console.log(inval,outval)
                            if (inval === null) {                                
                                this.boxlistvalin.push("-")
                            }else{
                                this.boxlistvalin.push(Math.ceil(inval))
                            }

                            if (midval === null) {                                
                                this.boxlistvalmid.push("-")
                            }else{
                                this.boxlistvalmid.push(Math.ceil(midval))
                            }

                            if (outval === null) {
                                this.boxlistvalout.push("-")
                            }else{
                                this.boxlistvalout.push(Math.ceil(outval))    
                            }

                            if (standard === null) {
                                this.boxlistvalstandard.push("-")
                            }else{
                                this.boxlistvalstandard.push(Math.ceil(standard))
                            }

                            if (inletstandard === null) {
                                this.boxlistvalinletstandard.push("-")
                            }else{
                                this.boxlistvalinletstandard.push(Math.ceil(inletstandard))
                            }

                            this.boxlistvalunit.push(unit)
                            this.boxlistvalplace.push(place)
                        })
                        // console.log(this.boxlistvalout)
                        // console.log(this.boxlistvalin)
                        // console.log(this.boxlistvalmid)


                        this.boxlistvalin
                        this.boxlistvalout
                        this.getEquips();
                    }
                }
            })
            .catch(err => {
                alert("가동률데이터목록 추출 실패 \n" + err);
            })
        },
        monitoringListPerHour() {
            this.$Axios.post("/api/daedan/cj/ems/main/MonitoringListPerHourSensor", {
                    serverKey: store.state.serverKey,
                    equipmentInnerNm: this.eqbKey,
                    date: store.state.szCurDt
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            this.data = res.data.data;
                            this.graph();
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })
        },
        graph() {
            if (this.Chart != undefined) {   
                this.Chart.destroy();
            }

            this.boxList2.map((e, idx) => {
                console.log(document.getElementById('line-graph' + idx))
                if (document.getElementsByClassName('line-graph').length === 0 ) {
                    return false;
                }
                document.getElementById("graph-canvas"+idx).style.display = 'block'
                let midlet_place = false
                let graphLabel = []
                let graphDataIn = []
                let graphDataOut = []
                this.data.map(item => {
                    if (e.equipment_inner_nm === item.equipment_inner_nm) {
                        if (item.place == 511) {
                            midlet_place = true;
                        }
                        graphLabel.push(item.prevention_date)
                        if (item.place == 512) {
                            graphDataOut.push(item.outlet_avg_value)
                        }
                        if (item.place == 510) {
                            graphDataIn.push(item.inlet_avg_value)                            
                        }
                    }
                })
                if (midlet_place === true) {
                    if (document.getElementById("graph-canvas"+idx)) {
                        
                        if (document.getElementById("graph-canvas"+idx).length != 0) {
                            document.getElementById("graph-canvas"+idx).style.display = 'none'
                        }
                    }
                    return false
                }
                graphLabel = Array.from(new Set(graphLabel))
                                
                this.ctxDaily = document.getElementById('line-graph' + idx).getContext('2d');

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
                        legend: {display: false},
                    },
                    data: {

                        labels: graphLabel,
                        datasets: [{
                                label: '흡입구',
                                borderColor: '#f2c84c',
                                backgroundColor: 'transparent',
                                pointRadius: 1,
                                data: graphDataIn,
                                borderWidth:5,
                                // data:dailyChartData
                            },
                            {
                                label: '배출구',
                                borderColor: '#2cd2f6',
                                backgroundColor: 'transparent',
                                pointRadius: 1,
                                data: graphDataOut,
                                borderWidth:5
                                // data:dailyChartData
                            },
                        ]
                    },
                }
                this.Chart = new Chart(this.ctxDaily, this.ctxConfig);
                this.Chart.update()
            })
        },
        selectEq(item) {
            this.boxList2 = []
            let filterKeywords = []
            let filterKeywords2 = []
            if (item === "All") {
                this.eqbkey = null;
                this.boxList2 = this.boxList
                this.boxList2.map(e => {
                    filterKeywords.push(e.equipment_inner_nm)
                })
                this.sensorData.map(e => {
                    filterKeywords2.push(e.equipment_inner_nm)
                })
                var filterKeywords3 = filterKeywords.filter((e) => !Array.from(new Set(filterKeywords2)).includes(e));
                // console.log(this.boxList2,filterKeywords3)

                filterKeywords3.map(e=>{
                    this.allKeywords.push(e)
                })
                let filterHeight = filterKeywords3.filter(x => x.length > 15)
                filterHeight.map(e => {
                    this.boxHeight.push(e)
                })
                console.log(this.boxHeight, this.allKeywords)
                
                filterKeywords3.map(item => {
                   this.boxList2 = this.boxList2.filter(e => e.equipment_inner_nm !== item)
                })
                
            }else{
                this.eqbkey = item.equipment_inner_nm
                this.boxList.map(e => {                    
                    if (e.equipment_inner_nm === item.equipment_inner_nm) {
                        this.boxList2.push(e)
                    }
                });
            }


            for (let index = 0; index < this.boxList.length+1; index++) {
                document.getElementsByClassName("eqKey")[index].style.color = 'black'
            }

            if (item === "All") {

                document.getElementsByClassName("eqKey_0")[0].style.color = 'red'
            }else{
                document.getElementsByClassName("eqKey" + item.box_code)[0].style.color = 'red'
            }

            this.$Axios.post("/api/daedan/cj/ems/main/EquipmentMonitoringList", {
                    serverKey: store.state.serverKey,
                    equipmentInnerNm: this.eqbkey,
                    procDt: store.state.szCurDt
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {

                            this.title = store.state.serverName
                            this.scrubber = res.data.data

                            setTimeout(() => {
                                this.barCheck()
                                this.monitoringListPerHour(this.eqbkey)
                            }, 100);
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })

        },
        moverEq(item){
            // console.log(item.equipment_inner_nm, item.box_code)
            let nameHeight = document.getElementsByClassName('eqKey'+item.box_code)
            item.check = false;
            console.log(item.equipment_inner_nm.length)
            if(item.equipment_inner_nm.length > 14){
                for(let i = 0; i < nameHeight.length; i++){
                    nameHeight[i].style.lineHeight = '15px';
                }
            }
        },
        mleave(item){
            item.check = true;
            let nameHeight = document.getElementsByClassName('eqKey'+item.box_code)
            for(let i = 0; i < nameHeight.length; i++){
                nameHeight[i].style.lineHeight = '35px';
            }

            
        },
        getEquips() {
            let that = this;
            this.$Axios.post("/api/daedan/cj/ems/main/equipListByServer", {
                    userId: store.state.userInfo.userId,
                    serverKey: store.state.serverKey
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            res.data.data.map(e => {
                                e.check = true
                            })

                            that.equipList = res.data.data;
                            setTimeout(() => {
                                this.selectEq("All")
                            }, 100);
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })
        },
        barCheck() {

            if (this.scrubber.length === 0) {
                return false
            }

            this.boxList2.map((e, idx) => {
                // console.log(e,idx,this.boxlistvalinletstandard[idx])
                if (this.boxlistvalplace[e.box_code - 1] != 511) {             
                    if (this.boxlistvalin[e.box_code - 1] >= this.boxlistvalinletstandard[e.box_code - 1] && this.boxlistvalin[e.box_code - 1] != "-") {
                        document.getElementsByClassName(idx + '_in_up')[0].style.background = "#ff3131"
                        document.getElementsByClassName(idx + '_in_up')[0].style.width = "100%"
                    }else{
                        document.getElementsByClassName(idx + '_in_up')[0].style.background = "#5151ff"
                        document.getElementsByClassName(idx + '_in_up')[0].style.width = (this.boxlistvalin[e.box_code - 1] * 100 / this.boxlistvalinletstandard[e.box_code - 1])+"%"
                    }

                    if (this.boxlistvalout[e.box_code - 1] >= this.boxlistvalstandard[e.box_code - 1] && this.boxlistvalout[e.box_code - 1] != "-") {
                        document.getElementsByClassName(idx + '_out_up')[0].style.background = "#ff3131"
                        document.getElementsByClassName(idx + '_out_up')[0].style.width = "100%"
                    }else{
                        document.getElementsByClassName(idx + '_out_up')[0].style.background = "#5151ff"
                        document.getElementsByClassName(idx + '_out_up')[0].style.width = (this.boxlistvalout[e.box_code - 1] * 100 / this.boxlistvalstandard[e.box_code - 1])+"%"
                    }

                    if (this.boxlistvalin[e.box_code - 1] >= this.boxlistvalinletstandard[e.box_code - 1] && this.boxlistvalin[e.box_code - 1] != "-" || this.boxlistvalout[e.box_code - 1] >= this.boxlistvalstandard[e.box_code - 1] && this.boxlistvalout[e.box_code - 1] != "-")  {
                        document.getElementsByClassName('infoTitle_' + idx)[0].style.background = "#ff3131"
                    }else{
                        document.getElementsByClassName('infoTitle_' + idx)[0].style.background = "#5151ff"
                    }
                }else{
                    if (this.boxlistvalmid[e.box_code - 1] >= this.boxlistvalstandard[e.box_code - 1] ) {
                        document.getElementsByClassName(idx + '_mid_up')[0].style.background = "#ff3131"
                        document.getElementsByClassName(idx + '_mid_up')[0].style.width = "100%"
                    }else{
                        document.getElementsByClassName(idx + '_mid_up')[0].style.background = "#5151ff"
                        document.getElementsByClassName(idx + '_mid_up')[0].style.width = (this.boxlistvalmid[e.box_code - 1] * 100 / this.boxlistvalstandard[e.box_code - 1])+"%"
                    }

                    if (this.boxlistvalmid[e.box_code - 1] >= this.boxlistvalstandard[e.box_code - 1]) {
                        document.getElementsByClassName('infoTitle_' + idx)[0].style.background = "#ff3131"
                    }else{
                        document.getElementsByClassName('infoTitle_' + idx)[0].style.background = "#5151ff"
                    }
                }


            })
        },
        // boxHeight(item){
        //     console.log(item)
        //     const cart = item.filter(x => x.length > 15)
        //     console.log(cart)
            
        // },
        infoBtn(item){
            // this.show = true;            
            // this.item = item;
            item.show = true

            // document.getElementsByClassName('overlayTitle').innetHTML = document.getElementsByClassName('view_pin01').getAttribute('value');
            
        },
        infoClose(){
            this.show = false;

        },
        twoDBtn(){

            this.imgBoxStyle = "backgroundImage:url("+this.bgImg2d+");height:466px;"
        },
        threeDBtn(){

            this.imgBoxStyle = "backgroundImage:url("+this.bgImg+");height:466px;"
        }
    }

}
</script>

<style>
.viewInner {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.titleBox {
    position:relative;
    width: 65%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 15px;
    font-weight: bold;
    font-family: CjFontTitleBold;
    font-size: 24px;
}

.titleBox .tabBox{
    position: absolute;
    top:0;
    right:0;;
    width:200px;
    height:100%;
}

.titleBox .tabBox>div{
    float:left;
    width:50%;
    height:100%;
    box-sizing: border-box;
    border:2px solid rgb(167, 167, 167);
    font-size:16px;
    text-align: center;
    line-height:35px;
    background:#cccccc;
    color:rgb(131, 131, 131);
    transition:all 0.2s;
    cursor:pointer;
}

.titleBox .tabBox>div:nth-child(1){
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.titleBox .tabBox>div:nth-child(2){
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    border-left:none;
}

.titleBox .tabBox>div:hover{
    background:#949494;
    font-weight:bold;
    color:black;
}

.viewInner>div {
    float: left;
}

.viewBox {
    height: 720px;
    margin-top: 10px;
}

.viewLeftBox {
    width: 65%;
}
.viewRightBox {
    margin-top:10px;
    width: 34%;
    height:100%;
    margin-left: 1%;
}

/*LeftBox title */

/* LeftBox top */

.imgBox {
    position: relative;
    width: 100%;
    height: 450px;
    background: url(../../assets/rendering/pin18_view.jpg) no-repeat center center;
    background-size: 100% 100%;
    box-sizing: border-box;
    border: 2px solid #ccc;
}

/*pinWrap */
.imgBox .viewPinWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.imgBox .viewPinWrap>div {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: white;
    border: 1px solid black;
    text-align: center;
    line-height: 35px;
    font-weight: bold;
    font-size: 12px;
    box-sizing: border-box;
    cursor:pointer;
}

.imgBox .pinBoxWrap{
    width:100%;
    height:100%;
}

.imgBox .pinBox{
    position:absolute;
    width:190px;
    height:100px;
    box-sizing: border-box;
    /* padding:6px; */
    background:rgb(255, 255, 255);
    word-break: keep-all;
    border-radius: 7px;
}

.imgBox .pinBoxWrap .pinTitle{
    height:30px;
    line-height:25px;
    font-size:1.4rem;
    text-align: center;
    padding-bottom:0 !important;
    word-break: keep-all;
    background:#459E1E;
    letter-spacing: -0.5px;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    padding:3px;
}
.imgBox .pinBoxWrap .pinBody{
    height:25px;
    line-height:25px;
    font-size:14px;
    text-align: center;
    word-break:keep-all;
}

.imgBox .pinBoxWrap .pinBody span{
    font-size:10px;
}

.imgBox .pinBoxWrap .container{
    padding-top:0px !important; 
    padding-bottom:0px !important; 
}

/* 박스 크기 변경 구간 */
.imgBox .pinBoxSmall01{
    width:170px;
    height:90px;
}

.imgBox .pinBoxSmall02{
    width:170px;
    height:110px;
}

.imgBox .pinBoxBig01{
    width:170px;
    height:110px;
}

.imgBox .pinBoxBig01 .pinTitle{
    height:50px;
    line-height:20px;
    word-break:keep-all;
}

.imgBox .pinBoxWrap .pinBody div{
    padding:6px !important;
}

.infos{
    position:absolute !important;
    z-index:3;
    top:460px;
    left:920px;
}
.overlay{
    width:300px;
    height:150px;
    font-size:16px;
    background:rgb(21, 5, 58);
    border-radius:7px;
    cursor:pointer;
}

.overlay>div{
    float:left;
    width:50%;
    height:100%;
    box-sizing: border-box;
    padding:5px;
}


.overlay div .overlayImg{
    position:relative;
    height:100%;
    box-sizing:border-box;
    padding-left:5px;
    
}

.overlay div .overlayImg img{
    width:100%;
    height:98%;
    margin-top:3px;
    border-radius: 7px;
}

.overlay div .overlayImg .stateBar{
    position:absolute;
    top:3px;
    left:5px;
    width:10px;
    height:98%;
    background:green;
}

.overlay div .overlayTitle{
    height:30px;
    line-height:30px;
    color:white;
}

.overlay div .overlayText{
    height:35px;
}
.overlay div .overlayText>div{
    float:left;
    width:50%;
    height:100%;
    line-height:40px;
    color:white;
}

/*LeftBox bottom */
.bottomBox {
    width: 100%;
    height: 300px;
    margin-top: -1px;
}

.bottomBox>.bottom_subMenuBox {
    width: 100%;
    height: 40px;
    /*2줄 시 : height:80px */
    box-sizing: border-box;
    border: 2px solid #ccc;
}

.bottomBox>.bottom_subMenuBox02 {
    /* height: 80px; */
}

.bottomBox>.bottom_subMenuBox>.eqKey {
    float: left;
    width: 12.5%;
    height: 40px;
    line-height: 35px;
    font-size: 1.4rem;
    letter-spacing: -1px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.2s;
}

.bottomBox>.bottom_subMenuBox>div:hover {
    color: rgb(126, 126, 126);
    font-weight: bold;
}

.bottomBox>.bottom_letBox {
    box-shadow: 0 0px 11px 3px #ccc;
    padding-left: 13px;
    padding-top: 15px;
    border: 2px solid #ccc;
    /* height: 190px; */
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-flow: wrap;
}

.bottomBox>.bottom_letBox>.infoBox {
    width: 390px;
    height: 140px;
    margin-bottom: 20px;
    margin-right: 5px;
    box-sizing: border-box;
    border: 1px solid rgb(171, 171, 255);
    border-radius: 5px;
    /* background: rgb(235, 254, 255); */
}

.bottomBox>.bottom_letBox>.infoBox:last-child {
    margin-right: 0;
}

.bottomBox>.bottom_letBox>.infoBox>div {
    width: 100%;
}

.bottomBox>.bottom_letBox>.infoBox>.infoTitle {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
    font-size: 16px;
}

.bottomBox>.bottom_letBox>.infoBox>.infoBody {
    height: 120px;
    margin-top: 10px;
}

.bottomBox>.bottom_letBox>.infoBox>.infoBody>div {
    height: 30px;
    font-size: 14px;
}

.infoBody_outlet {
    margin-top: 10px;
}

.infoBody_inlet>div,
.infoBody_outlet>div {
    float: left;
    height: 100%;
    line-height: 30px;
    text-align: center;
}

.infoBody_inlet>div:nth-child(1),
.infoBody_outlet>div:nth-child(1) {
    width: 20%;
}

.infoBody_inlet>div:nth-child(2),
.infoBody_outlet>div:nth-child(2) {
    width: 60%;
}

.infoBody_inlet>div:nth-child(3),
.infoBody_outlet>div:nth-child(3) {
    width: 20%;
}
.infoBody_inlet>div:nth-child(2),
.infoBody_outlet>div:nth-child(2){
    position: relative;
    display: flex;
}
.infoBody_inlet>div>div,
.infoBody_outlet>div>div {
    float: left;
    /* width: 9%; */
    height: 20px;
    /* background: #ccc; */
    margin-left: 1%;
    margin-top: 5px;
}



.line{
    position: absolute;
    z-index: 10;
    top:0;
    width: 33%;
    border-left: 1px solid white;
    border-right: 1px solid white;
    left: 33%;
}
.up{
    width: 0%;
    background: rgb(81, 81, 255);
    border: none;
    position: absolute;
    top: 0;
    left: 0;
}
.down{
    background: rgb(228, 228, 228);
    width: 100%;
}


.viewRightBox {
    padding: 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    overflow-y: scroll;
}

.viewRightBox>.canvasWrap {
    width: 100%;
    height: 250px;
    box-sizing: border-box;
    /* border: 1px solid rgb(135, 176, 192); */
    margin-top: 10px;
}

.viewRightBox>.canvasWrap:first-child {
    margin-top: 0;
}

.viewRightBox>.canvasWrap>div:nth-child(1) {
    font-size: 22px;
    font-weight: bold;
    box-sizing: border-box;
    padding: 5px;
}

.viewRightBox::-webkit-scrollbar {
    width: 5px;
}

.viewRightBox::-webkit-scrollbar-thumb {
    width: 5px;
    background: rgb(121, 121, 255);
    border-radius: 5px;
}

.viewRightBox::-webkit-scrollbar-track {
    width: 5px;
    background: #ccc;
    border-radius: 5px;
}

.scrollbox::-webkit-scrollbar {
    width: 5px;
}

.scrollbox::-webkit-scrollbar-thumb {
    width: 5px;
    background: rgb(121, 121, 255);
    border-radius: 5px;
}

.scrollbox::-webkit-scrollbar-track {
    width: 5px;
    background: #ccc;
    border-radius: 5px;
}

.viewRightTop::-webkit-scrollbar {
    width: 5px;
    height: 10px;
}

.viewRightTop::-webkit-scrollbar-thumb {
    width: 5px;
    height: 10px;
    background: rgb(136, 136, 136);
}

.viewRightTop::-webkit-scrollbar-track {
    width: 5px;
    height: 10px;
    background: #ccc;
}





/*---------------------------공주 pin01*/
/*.view_pin01 {
    top: 315px;
    right: 902px;
}
.imgBox .pinBox01{
    top:10px;
    left:10px;
}*/

/*---------------------------남원 pin02*/
/*.view_pin01 {
    top: 308px;
    right: 493px;
}
.imgBox .pinBox01{
    top:32px;
    left:36px;
}*/

/*---------------------------논산 pin03*/
/*.view_pin01 {
    top:70px;
    right:960px;
}

.view_pin02 {
    top:110px;
    right:937px;
}

.view_pin03 {
    top:420px;
    right:300px;
}

.view_pin04 {
    top:355px;
    right:235px;
}
.imgBox .pinBox01{
    top:30px;
    left:10px;
}
.imgBox .pinBox02{
    top:310px;
    left:10px;
}
.imgBox .pinBox03{
    top:30px;
    left:990px;
}
.imgBox .pinBox04{
    top:310px;
    left:990px;
}*/

/*---------------------------부산 pin04*/
/*.view_pin01 {
    top:25px;
    right:550px;
}

.view_pin02 {
    top:57px;
    right:555px;
}

.view_pin03 {
    top:90px;
    right:755px;
}

.view_pin04 {
    top:330px;
    right:815px;
}

.view_pin05 {
    top:145px;
    right:565px;
}

.view_pin06 {
    top:140px;
    right:507px;
}

.view_pin07 {
    top:115px;
    right:500px;
}

.view_pin08 {
    top:30px;
    right:378px;
}

.view_pin09 {
    top:230px;
    right:315px;
}

.view_pin10 {
    top:10px;
    right:323px;
}

.view_pin11 {
    top:10px;
    right:740px;
}
.imgBox .pinBox01{
    top:15px;
    left:35px;
}
.imgBox .pinBox02{
    top:120px;
    left:35px;
}
.imgBox .pinBox03{
    top:230px;
    left:35px;
}
.imgBox .pinBox04{
    top:350px;
    left:35px;
}
.imgBox .pinBox05{
    top:350px;
    left:270px;
}
.imgBox .pinBox06{
    top:350px;
    left:508px;
}
.imgBox .pinBox07{
    top:350px;
    left:745px;
}
.imgBox .pinBox08{
    top:350px;
    left:980px;
}
.imgBox .pinBox09{
    top:230px;
    left:980px;
}
.imgBox .pinBox10{
    top:120px;
    left:980px;
}
.imgBox .pinBox11{
    top:15px;
    left:980px;
}*/

/*--------------------------씨푸드 성남 - pin05*/
/*.view_pin01 {
    top: 185px;
    right: 893px;
}
.imgBox .pinBox01{
    top:38px;
    left:10px;
}*/

/*--------------------------이천 - pin06*/

/*--------------------------안산 - pin07*/
/*.view_pin01 {
    top:152px;
    right:703px;
}

.view_pin02 {
    top:175px;
    right:703px;
}

.view_pin03 {
    top:203px;
    right:703px;
}

.view_pin04 {
    top:327px;
    right:315px;
}

.view_pin05 {
    top:413px;
    right:795px;
}

.view_pin06 {
    top:125px;
    right:587px;
}

.view_pin07 {
    top:175px;
    right:323px;
}

.view_pin08 {
    top:203px;
    right:825px;
}

.view_pin09 {
    top:230px;
    right:825px;
}
.imgBox .pinBox01{
    top:10px;
    left:250px;
}
.imgBox .pinBox02{
    top:10px;
    left:35px;
}
.imgBox .pinBox03{
    top:120px;
    left:35px;
}
.imgBox .pinBox04{
    top:230px;
    left:35px;
}
.imgBox .pinBox05{
    top:340px;
    left:35px;
}
.imgBox .pinBox06{
    top:10px;
    left:990px;
}
.imgBox .pinBox07{
    top:120px;
    left:990px;
}
.imgBox .pinBox08{
    top:230px;
    left:990px;
}
.imgBox .pinBox09{
    top:340px;
    left:990px;
}*/

/*--------------------------인천1 - pin12*/
/*pin*/
/*.view_pin01 {
    top:145px;
    right:915px;
}

.view_pin02 {
    top:183px;
    right:875px;
}

.view_pin03 {
    top:135px;
    right:390px;
}

.view_pin04 {
    top:300px;
    right:210px;
}*/
/*box */
/*.imgBox .pinBox01{
    top:25px;
    left:27px;
}
.imgBox .pinBox02{
    top:320px;
    left:27px;
}
.imgBox .pinBox03{
    top:25px;
    left:1010px;
}
.imgBox .pinBox04{
    top:320px;
    left:1010px;
}*/

/*--------------------------인천2 - pin13*/
/*.view_pin01 {
    top:30px;
    right:633px;
}
.view_pin02 {
    top:63px;
    right:638px;
}
.view_pin03 {
    top:55px;
    right:602px;
}
.view_pin04 {
    top:58px;
    right:575px;
}
.view_pin05 {
    top:297px;
    right:680px;
}
.view_pin06 {
    top:130px;
    right:602px;
}
.view_pin07 {
    top:83px;
    right:350px;
}
.view_pin08 {
    top:35px;
    right:352px;
}
.view_pin09 {
    top:410px;
    right:830px;
}
.view_pin10 {
    top:30px;
    right:565px;
}
.view_pin11 {
    top:315px;
    right:525px;
}
.view_pin12 {
    top:315px;
    right:490px;
}*/
/*박스*/
/*.pinBox01{
    top:20px;
    left:5px;
}
.pinBox02{
    top:20px;
    left:180px;
}
.pinBox03{
    top:195px;
    left:5px;
}
.pinBox04{
    top:195px;
    left:180px;
}
.pinBox05{
    top:335px;
    left:5px;
}
.pinBox06{
   top:335px;
   left:180px;
}
.pinBox07{
    top:18px;
    left:855px;
}
.pinBox08{
    top:18px;
    left:1030px;
}
.pinBox09{
    top:195px;
    left:855px;
}
.pinBox10{
    top:195px;
    left:1030px;
}
.pinBox11{
    top:335px;
    left:855px;
}
.pinBox12{
    top:335px;
    left:1030px;
}*/


/* --------------------------인천냉동식품 - pin15 */
/*.view_pin01 {
    top:40px;
    right:375px;
}

.view_pin02 {
    top:40px;
    right:515px;
}

.view_pin03 {
    top:205px;
    right:810px;
}

.view_pin04 {
    top:220px;
    right:390px;
}

.view_pin05 {
    top:375px;
    right:473px;
}

.view_pin06 {
    top:87px;
    right:495px;
}

.view_pin07 {
    top:87px;
    right:555px;
}

.view_pin08 {
    top:125px;
    right:555px;
}

.view_pin09 {
    top:125px;
    right:495px;
}

.view_pin10 {
    top:310px;
    right:585px;
}

.view_pin11 {
    top:160px;
    right:370px;
}*/

/*.pinBox01{
    top:20px;
    left:5px;
}
.pinBox02{
    top:20px;
    left:180px;
}
.pinBox03{
    top:155px;
    left:5px;
}
.pinBox04{
    top:155px;
    left:180px;
}
.pinBox05{
    top:315px;
    left:5px;
}
.pinBox06{
    top:18px;
    left:850px;
}
.pinBox07{
    top:18px;
    left:1030px;
}
.pinBox08{
    top:170px;
    left:850px;
}
.pinBox09{
    top:170px;
    left:1030px;
}
.pinBox10{
    top:315px;
    left:850px;
}
.pinBox11{
    top:315px;
    left:1030px;
}*/

/*--------------------------진안 - pin16 */
/*.view_pin01 {
    top:90px;
    right:825px;
}
.pinBox01{
    top:10px;
    left:10px;
}*/

/*--------------------------진천 - pin17 */
/*.view_pin01 {
    top:115px;
    right:302px;
}
.view_pin02 {
    top:197px;
    right:277px;
}
.view_pin03 {
    top:197px;
    right:310px;
}
.view_pin04 {
    top:145px;
    right:227px;
}
.view_pin05 {
    top:260px;
    right:367px;
}
.pinBox01{
    top:30px;
    left:40px;
}
.pinBox02{
    top:170px;
    left:40px;
}
.pinBox03{
    top:310px;
    left:40px;
}
.pinBox04{
    top:30px;
    left:990px;
}
.pinBox05{
    top:310px;
    left:990px;
}*/

/*--------------------------진천BC - pin18 */
/*.view_pin01 {
    top:80px;
    right:377px;
}
.view_pin02 {
    top:140px;
    right:868px;
}
.view_pin03 {
    top:320px;
    right:735px;
}
.view_pin04 {
    top:85px;
    right:400px;
}
.view_pin05 {
    top:193px;
    right:270px;
}
.pinBox01{
    top:30px;
    left:10px;
}
.pinBox02{
    top:170px;
    left:10px;
}
.pinBox03{
    top:310px;
    left:10px;
}
.pinBox04{
    top:35px;
    left:990px;
}
.pinBox05{
    top:305px;
    left:990px;
}*/

</style>
        <!--공주 pin01-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--남원 pin02-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--논산 pin03-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox02">
                            <div class="pinTitle">부지경계선</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox03">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox04">
                            <div class="pinTitle">액젓 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--부산 - pin04-->
                        <!--<div class="pinBox pinBoxBig02 pinBox01">
                            <div class="pinTitle">원료동B 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox02">
                            <div class="pinTitle">원료동A 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox03">
                            <div class="pinTitle">식초 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox04">
                            <div class="pinTitle">전분건조C 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox05">
                            <div class="pinTitle">다시다C 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox06 ">
                            <div class="pinTitle">다시다A 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox07">
                            <div class="pinTitle">다시다B 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox08">
                            <div class="pinTitle">HMR 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox09">
                            <div class="pinTitle">신관</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox10">
                            <div class="pinTitle">정문 옥상</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox11">
                            <div class="pinTitle">후문</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--성남 - pin05-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--안산 - pin07-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">20톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox02">
                            <div class="pinTitle">30톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox03">
                            <div class="pinTitle">35톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox04">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox05">
                            <div class="pinTitle">전분건조C 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox06">
                            <div class="pinTitle">재생로 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox07">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox08">
                            <div class="pinTitle">전분 350CMM 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox09">
                            <div class="pinTitle">전분 450CMM 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--인천1 pin12-->
                        <!--<div class="pinBox pinBoxSmall01 pinBox01">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox02">
                            <div class="pinTitle">열병합발전시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox03">
                            <div class="pinTitle">기숙사옥상</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox04">
                            <div class="pinTitle">정문 보안실 옥상</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--인천2 pin13-->
                        <!--<div class="pinBox pinBoxSmall01 pinBox01">
                            <div class="pinTitle">공정 악취배출시설(P9-47-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox02">
                            <div class="pinTitle">공정 악취배출시설(P9-66-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox03">
                            <div class="pinTitle">공정 악취배출시설(T9-117-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox04">
                            <div class="pinTitle">공정 악취배출시설(P9-139-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox05">
                            <div class="pinTitle">참기름(분) 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox06">
                            <div class="pinTitle">공정 악취배출시설(E9-50-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox07">
                            <div class="pinTitle">30톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox08">
                            <div class="pinTitle">25톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox09">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox10">
                            <div class="pinTitle">공정 악취배출시설(P9-117-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox11">
                            <div class="pinTitle">참기름(통) 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox12">
                            <div class="pinTitle">참기름(cold) 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--인천냉동 pin15-->
                        <!--<div class="pinBox pinBoxSmall01 pinBox01">
                            <div class="pinTitle">폐수처리장</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox02">
                            <div class="pinTitle">부지경계 (북)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox03">
                            <div class="pinTitle">부지경계 (서)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox04">
                            <div class="pinTitle">부지경계 (동)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox05">
                            <div class="pinTitle">부지경계 (남)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox06">
                            <div class="pinTitle">실내악취 B라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox07">
                            <div class="pinTitle">공정악취 B라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox08">
                            <div class="pinTitle">공정악취 A라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox09">
                            <div class="pinTitle">실내악취 A라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox10">
                            <div class="pinTitle">폐기물보관소</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox11">
                            <div class="pinTitle">공정 A,B라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--진안 pin16-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">복합악취</b-col>
                                    <b-col cols="4">500</b-col>
                                    <b-col cols="4">3,820</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--진천 pin17-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">부지경계 #1</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox02">
                            <div class="pinTitle">폐수처리장 방류수 측정기(COD)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox03">
                            <div class="pinTitle">폐수처리장 방류수 측정기(TP)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox04">
                            <div class="pinTitle">부지경계 #2</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox05">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--진천BC pin18-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수 실시간 측정기</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox02">
                            <div class="pinTitle">부지경계 #1</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox03">
                            <div class="pinTitle">통합조리동 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox04">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox05">
                            <div class="pinTitle">부지경계 #2</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->