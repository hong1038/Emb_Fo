<template>
<b-container fluid>
    <Header></Header>

    <div style="display:flex;">
        <div class="inner viewInner">
            <div class="titleBox">
                {{this.title}}
            </div>
            <div class="viewBox viewLeftBox">

                <!-- <div class="imgBox" :style="{ backgroundImage: 'url(' + this.bgImg + ')' }"> -->
                <div class="imgBox" :style="imgBoxStyle">
                    <div class="viewPinWrap viewPinWrap01">
                        <div v-for="item in pinList" :key="item.pin_code" :style="item.style" :value="item.pin_name" class="view_pin01" v-on:click="infoBtn(item)"><p style="display:flex;align-items:center;padding:0 5px"><span :style="'margin-right:5px;position:absoulte;left:35%;top:20px;border:1px solid #9bb5c7v;display:block;width:15px;height:15px;border-radius:100%;background:'+item.color"></span>{{item.pin_name}}</p></div>
                        <!--<div class="view_pin01">1</div>
                        <div class="view_pin02">2</div>
                        <div class="view_pin03">3</div>
                        <div class="view_pin04">4</div>
                        <div class="view_pin05">5</div>
                        <div class="view_pin06">6</div>
                        <div class="view_pin07">7</div>
                        <div class="view_pin08">8</div>
                        <div class="view_pin09">9</div>
                        <div class="view_pin10">10</div>
                        <div class="view_pin11">11</div>
                        <div class="view_pin12">12</div>
                        <div class="view_pin13">13</div>
                        <div class="view_pin14">14</div>
                        <div class="view_pin15">15</div>
                        <div class="view_pin16">16</div>
                        <div class="view_pin17">17</div>
                        <div class="view_pin18">18</div> -->
                        </div>
                        <div style="position:absolute;top:5px;left:10px;font-size:14px">
                            <p v-for="item in pinList" :key="item.pin_code" style="margin-bottom:3px;display:flex;align-items:center;" ><span :style="'border:1px solid black;display:block;width:15px;height:15px;border-radius:100%;background:'+item.color"></span>{{item.pin_name}}</p>
                        </div>
                    </div>
                    <!-- <b-overlay class="overlay" v-if="show" v-on:click="infoClose()"> -->
                        <div class="overlay" v-if="show" v-on:click="infoClose()">
                            <div>
                                <div class="overlayImg">
                                    <img src="../../assets/rendering/1.jpg">
                                    <div class="stateBar" :style="'background:'+item.color"></div>
                                </div>
                            </div>
                            <div>
                                <div class="overlayTitle">{{item.pin_name}}</div>
                                <div class="overlayText">
                                    <div>악취</div>
                                    <div>440배수</div>
                                </div>
                                <div class="overlayText">
                                    <div>악취</div>
                                    <div>440배수</div>
                                </div>
                                <div class="overlayText">
                                    <div>악취</div>
                                    <div>440배수</div>
                                </div>
                            </div>
                        <!-- </b-overlay> -->
                        </div>
                <div class="bottomBox">
                    <div class="bottom_subMenuBox bottom_subMenuBox01" v-if="equipList.length <= 8">
                        <div @click="selectEq(item.equipment_key)" :class="'eqKey eqKey'+item.equipment_key" v-for="item in equipList" v-bind:key="item.equipment_key" @mouseover="item.check = false" @mouseleave="item.check = true">{{item.equipment_name.length > 10  && item.check === true ? item.equipment_name.substr(0,10)+"..." :item.equipment_name}}</div>
                    </div>
                    <div class="bottom_subMenuBox bottom_subMenuBox02" v-else>
                        <div @click="selectEq(item.equipment_key)" :class="'eqKey eqKey'+item.equipment_key" v-for="item in equipList2" v-bind:key="item.equipment_key" @mouseover="item.check = false" @mouseleave="item.check = true">{{item.equipment_name.length > 10 && item.check === true ? item.equipment_name.substr(0,10)+"..." :item.equipment_name}}</div>
                    </div>
                    <div class="bottom_letBox" v-if="scrubber.length <= 0">
                        <p style="font-size:18px">데이터가 없습니다.</p>
                    </div>
                    <div class="bottom_letBox"  v-else>
                        <div class="infoBox" v-for="(item,key) in scrubber" v-bind:key="key">
                            <div :class="'infoTitle infoTitle_'+key"> {{item.internal_name}} 스크러버</div>
                            <div class="infoBody">
                                <div class="infoBody_inlet">
                                    <div>흡입구</div>
                                    <div>
                                        <div :class="'in in'+key+'_1'"></div>
                                        <div :class="'in in'+key+'_2'"></div>
                                        <div :class="'in in'+key+'_3'"></div>
                                        <div :class="'in in'+key+'_4'"></div>
                                        <div :class="'in in'+key+'_5'"></div>
                                        <div :class="'in in'+key+'_6'"></div>
                                        <div :class="'in in'+key+'_7'"></div>
                                        <div :class="'in in'+key+'_8'"></div>
                                        <div :class="'in in'+key+'_9'"></div>
                                        <div :class="'in in'+key+'_10'"></div>
                                    </div>
                                    <div>{{Math.floor(item.inlet_avg_value)}}/{{Math.floor(item.inlet_max_value)}}</div>
                                </div>
                                <div class="infoBody_outlet">
                                    <div>배출구</div>
                                    <div>
                                        <div :class="'out out'+key+'_1'"></div>
                                        <div :class="'out out'+key+'_2'"></div>
                                        <div :class="'out out'+key+'_3'"></div>
                                        <div :class="'out out'+key+'_4'"></div>
                                        <div :class="'out out'+key+'_5'"></div>
                                        <div :class="'out out'+key+'_6'"></div>
                                        <div :class="'out out'+key+'_7'"></div>
                                        <div :class="'out out'+key+'_8'"></div>
                                        <div :class="'out out'+key+'_9'"></div>
                                        <div :class="'out out'+key+'_10'"></div>
                                    </div>
                                    <div>{{Math.floor(item.outlet_avg_value)}}/{{Math.floor(item.outlet_max_value)}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="viewBox viewRightBox" v-if="scrubber.length <= 0" >
                <p style="font-size:18px">데이터가 없습니다.</p>
            </div>
            <div v-else class="viewBox viewRightBox">
                <div class="canvasWrap" v-for="(item,idx) in scrubber" v-bind:key="idx">
                    <div>{{item.internal_name}}</div>
                    <canvas :id="'line-graph'+idx" width="560" height="200"></canvas>
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
        this.getEquips();
        this.test()
        this.test2()
    },
    data() {
        return {
            busy:false,
            timeout : null,
            show:false,

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
            pinList: [],

            imgBoxStyle:""
        }

    },

    methods: {
    test2(){
        this.$Axios.post("/api/daedan/cj/ems/main/MainDetails", {
            serverKey: store.state.serverKey,
        }, this.config).then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            console.log(res.data,"asd")
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })
    },
        test(){
            this.$Axios.post("/api/daedan/cj/ems/main/FpList", {
                    serverKey: store.state.serverKey,
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            res.data.data.map((e) => {
                                // // 실제 값이 있다면 바로 아래에 있는 if문은 지워야 합니다.
                                // if (idx == 1 || idx == 2 || idx == 3) {   
                                //     e.warnig = "X"
                                // }else{
                                //     e.warnig = "Y"

                                // }
                                // // /api/daedan/cj/ems/main/equipListByServer 이곳에  X 인지 Y 인지 확인을 하게 해주는 값이 들어와야 합니다
                                // // 실제로 값이 들어 왔을때는 this.equipList[idx].warnig 이 X 인지 Y 인지 확인을 하여 색을 지정해 줍니다 
                                // if (e.warnig == "X") {
                                //     // e.style = "top:"+e.pin_py+"px;"+"right:"+e.pin_px+"px;  background:red"                                    
                                // }else{
                                //     }
                                e.style = "top:"+e.pin_px+"px;"+"right:"+e.pin_py+"px;"
                            })
                            res.data.data.map(e=>{
                                e.color = '#' + Math.round(Math.random() * 0xffffff).toString(16)
                            })
                            this.pinList = res.data.data;

                            if (this.pinList.length > 15) {
                                this.imgBoxStyle = "backgroundImage:url("+this.bgImg+");height:"+ (450+((this.pinList.length-17)*20))+"px;"
                            }else{
                                this.imgBoxStyle = "backgroundImage:url("+this.bgImg+");"
                            }
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })
        },  
        monitoringListPerHour(eqKey) {
            this.$Axios.post("/api/daedan/cj/ems/main/MonitoringListPerHourSensor", {
                    serverKey: store.state.serverKey,
                    equipmentKey: eqKey,
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
            console.log(this.data)
            this.scrubber.map((e, idx) => {
                let graphLabel = []
                let graphDataIn = []
                let graphDataOut = []

                this.data.reverse()
                console.log(this.data)
                this.data.splice(10,this.data.length)
                console.log(this.data)
                this.data.reverse()
                console.log(this.data)
                this.data.map(item => {
                    if (e.mno === item.mno) {
                        graphLabel.push(item.prevention_date)
                        graphDataIn.push(item.inlet_avg_value)
                        graphDataOut.push(item.outlet_avg_value)
                    }
                })

                this.ctxDaily = document.getElementById('line-graph' + idx).getContext('2d');

                this.ctxDaily.height = "100%";
                this.ctxDaily.width = "100%";
                // this.ctxDaily.font = "5rem";
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
                    },
                    data: {

                        labels: graphLabel,
                        datasets: [{
                                label: '흡입구',
                                borderColor: '#3f5df1',
                                backgroundColor: 'transparent',
                                data: graphDataIn
                                // data:dailyChartData
                            },
                            {
                                label: '배출구',
                                borderColor: '#f13f3f',
                                backgroundColor: 'transparent',
                                data: graphDataOut
                                // data:dailyChartData
                            },
                        ]
                    },
                }
                this.Chart = new Chart(this.ctxDaily, this.ctxConfig);
                this.Chart.update()
            })
        },
        selectEq(eqKey) {
            for (let index = 0; index < this.equipList.length; index++) {
                document.getElementsByClassName("eqKey")[index].style.color = 'black'
            }
            document.getElementsByClassName("eqKey" + eqKey)[0].style.color = 'red'
            this.$Axios.post("/api/daedan/cj/ems/main/EquipmentMonitoringList", {
                    serverKey: store.state.serverKey,
                    equipmentKey: eqKey,
                    procDt: store.state.szCurDt
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            this.title = store.state.serverName
                            this.scrubber = res.data.data
                            setTimeout(() => {
                                this.barCheck()
                                this.monitoringListPerHour(eqKey)
                            }, 100);
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })

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
                            that.equipList2 = res.data.data;
                            setTimeout(() => {
                                this.selectEq(this.equipList[0].equipment_key)
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

            for (let index = 0; index < 10; index++) {
                document.getElementsByClassName("in")[index].style.background = '#ccc'
                document.getElementsByClassName("out")[index].style.background = '#ccc'
            }

            this.scrubber.map((e, idx) => {
                // e.inlet_avg_value = 50,
                // e.inlet_max_value = 100,
                // e.outlet_avg_value = 3517,
                // e.outlet_max_value = 8751,
                this.number = Math.floor((Math.floor(e.inlet_avg_value) / Math.floor(e.inlet_max_value)) * 10)
                this.number2 = Math.floor((Math.floor(e.outlet_avg_value) / Math.floor(e.outlet_max_value)) * 10)
                if (e.inlet_avg_value > e.inlet_max_value) {   
                    for (let index = 1; index <= this.number; index++) {
                        document.getElementsByClassName('in' + idx + '_' + index)[0].style.background = "#ff3131"
                    }
                }else{
                    for (let index = 1; index <= this.number; index++) {
                        document.getElementsByClassName('in' + idx + '_' + index)[0].style.background = "#5151ff"
                    }
                }

                if (e.outlet_avg_value > e.outlet_max_value) {
                    for (let index = 1; index <= this.number2; index++) {
                        document.getElementsByClassName('out' + idx + '_' + index)[0].style.background = "#ff3131"
                    }
                }else{
                    for (let index = 1; index <= this.number2; index++) {
                        document.getElementsByClassName('out' + idx + '_' + index)[0].style.background = "#5151ff"
                    }
                }

                if (e.inlet_avg_value > e.inlet_max_value || e.outlet_avg_value > e.outlet_max_value) {
                    document.getElementsByClassName('infoTitle_' + idx)[0].style.background = "#ff3131"
                }else{
                    document.getElementsByClassName('infoTitle_' + idx)[0].style.background = "#5151ff"
                }


            })
        },
        infoBtn(item){
            this.show = true;            
            this.item = item;
            // document.getElementsByClassName('overlayTitle').innetHTML = document.getElementsByClassName('view_pin01').getAttribute('value');
            
        },
        infoClose(){
            this.show = false;
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
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 15px;
    font-weight: bold;
    font-size: 24px;
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
    width: 34%;
    margin-left: 1%;
}

/*LeftBox title */

/* LeftBox top */

.imgBox {
    position: relative;
    width: 100%;
    height: 450px;
    /* background: url(../../assets/rendering/pin08.png) no-repeat center center; */
    background-size: 100% 450px;
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
    /* width: 25px;
    border-radius: 100%; */
    height: 30px;
    background: white;
    border: 1px solid black;
    text-align: center;
    line-height: 25px;
    font-weight: bold;
    font-family: 'Arial';
    font-size: 12px;
    box-sizing: border-box;
    cursor:pointer;
}

.overlay{
    position:absolute !important;
    z-index:3;
    top:460px;
    left:920px;
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


/*인천냉동식품 공장 핀 위치*/
/*.view_pin01 {
    top: 400px;
    right: 600px;
}

.view_pin02 {
    top: 60px;
    right: 550px;
}

.view_pin03 {
    top: 270px;
    right: 730px;
}

.view_pin04 {
    top: 250px;
    right: 290px;
}

.view_pin05 {
    top: 350px;
    right: 660px;
}

.view_pin06 {
    top: 150px;
    right: 660px;
}

.view_pin07 {
    top: 170px;
    right: 600px;
}

.view_pin08 {
    top: 200px;
    right: 600px;
}

.view_pin09 {
    top: 170px;
    right: 500px;
}

.view_pin10 {
    top: 200px;
    right: 500px;
}

.view_pin11 {
    top: 350px;
    right: 400px;
}

.view_pin12 {
    top: 380px;
    right: 450px;
}

.view_pin13 {
    top: 400px;
    right: 500px;
}

.view_pin14 {
    top: 260px;
    right: 600px;
}

.view_pin15 {
    top: 290px;
    right: 600px;
}

.view_pin16 {
    top: 260px;
    right: 500px;
}

.view_pin17 {
    top: 290px;
    right: 500px;
}

.view_pin18 {
    top: 350px;
    right: 310px;
}*/

/*인천1*/
/*.view_pin01 {
    top: 30px;
    right: 700px;
}

.view_pin02 {
    top: 80px;
    right: 650px;
}

.view_pin03 {
    top: 30px;
    right: 250px;
}

.view_pin04 {
    top: 250px;
    right: 50px;
}*/

/*인천2*/
/*.view_pin01 {
    top: 130px;
    right: 1040px;
}

.view_pin02 {
    top: 180px;
    right: 1040px;
}

.view_pin03 {
    top: 10px;
    right: 400px;
}

.view_pin04 {
    top: 20px;
    right: 490px;
}

.view_pin05 {
    top: 50px;
    right: 490px;
}

.view_pin06 {
    top: 20px;
    right: 590px;
}

.view_pin07 {
    top: 50px;
    right: 590px;
}

.view_pin08 {
    top: 20px;
    right: 640px;
}

.view_pin09 {
    top: 50px;
    right: 640px;
}

.view_pin10 {
    top: 250px;
    right: 470px;
}

.view_pin11 {
    top: 230px;
    right: 570px;
}

.view_pin12 {
    top: 250px;
    right: 670px;
}

.view_pin13 {
    top: 170px;
    right: 470px;
}

.view_pin14 {
    top: 170px;
    right: 650px;
}

.view_pin15 {
    top: 120px;
    right: 550px;
}

.view_pin16 {
    top: 165px;
    right: 550px;
}*/

/*안산*/
/*.view_pin01 {
    top: 260px;
    right: 300px;
}

.view_pin02 {
    top: 220px;
    right: 300px;
}

.view_pin03 {
    top: 170px;
    right: 300px;
}

.view_pin04 {
    top: 170px;
    right: 1050px;
}

.view_pin05 {
    top: 220px;
    right: 1030px;
}

.view_pin06 {
    top: 230px;
    right: 120px;
}

.view_pin07 {
    top: 200px;
    right: 120px;
}

.view_pin08 {
    top: 110px;
    right: 200px;
}

.view_pin09 {
    top: 300px;
    right: 520px;
}*/

/*씨푸드 성남
.view_pin01 {
    top: 80;
    right: 800;
}

.view_pin02 {
    top: 100;
    right: 850;
}*/

/*진천*/
/*
.view_pin01 {
    top: 70px;
    right: 400px;
}

.view_pin02 {
    top: 70px;
    right: 300px;
}

.view_pin03 {
    top: 30px;
    right: 350px;
}

.view_pin04 {
    top: 50px;
    right: 230px;
}

.view_pin05 {
    top: 120px;
    right: 280px;
}

.view_pin06 {
    top: 130px;
    right: 350px;
}

.view_pin07 {
    top: 150px;
    right: 420px;
}*/

/*진천BC*/
/*.view_pin01 {
    top: 10px;
    right: 300px;
}

.view_pin02 {
    top: 10px;
    right: 350px;
}

.view_pin03 {
    top: 10px;
    right: 400px;
}

.view_pin04 {
    top: 350px;
    right: 800px;
}

.view_pin05 {
    top: 100px;
    right: 1000px;
}

.view_pin06 {
    top: 150px;
    right: 150px;
}*/

/*공주*/
/*.view_pin01 {
    top: 350px;
    right: 920px;
}*/

/*논산*/
/*.view_pin01 {
    top: 200px;
    right: 850px;
}

.view_pin02 {
    top: 150px;
    right: 870px;
}

.view_pin03 {
    top: 150px;
    right: 920px;
}

.view_pin04 {
    top: 300px;
    right: 320px;
}

.view_pin05 {
    top: 300px;
    right: 250px;
}

.view_pin06 {
    top: 300px;
    right: 150px;
}

.view_pin07 {
    top: 350px;
    right: 300px;
}
*/
/*진안*/
/*.view_pin01 {
    top: 100px;
    right: 900px;
}*/

/*부산*/
/*.view_pin01 {
    top: 220px;
    right: 720px;
}

.view_pin02 {
    top: 180px;
    right: 710px;
}

.view_pin03 {
    top: 220px;
    right: 620px;
}

.view_pin04 {
    top: 320px;
    right: 650px;
}

.view_pin05 {
    top: 360px;
    right: 650px;
}

.view_pin06 {
    top: 300px;
    right: 300px;
}

.view_pin07 {
    top: 310px;
    right: 960px;
}

.view_pin08 {
    top: 80px;
    right: 280px;
}

.view_pin09 {
    top: 400px;
    right: 1130px;
}

.view_pin10 {
    top: 400px;
    right: 480px;
}

.view_pin11 {
    top: 130px;
    right: 1000px;
}*/

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
    height: 80px;
}

.bottomBox>.bottom_subMenuBox>div {
    float: left;
    width: 12.5%;
    height: 40px;
    line-height: 35px;
    font-size: 12px;
    font-family: "Noto Sans KR";
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
    height: 190px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-flow: wrap;
}

.bottomBox>.bottom_letBox>.infoBox {
    width: 390px;
    height: 140px;
    margin-top: 20px;
    margin-right: 5px;
    box-sizing: border-box;
    border: 1px solid rgb(171, 171, 255);
    border-radius: 5px;
    background: rgb(235, 254, 255);
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

.infoBody_inlet>div>div,
.infoBody_outlet>div>div {
    float: left;
    width: 9%;
    height: 20px;
    background: #ccc;
    margin-left: 1%;
    margin-top: 5px;
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
    border: 1px solid rgb(135, 176, 192);
    margin-top: 10px;
}

.viewRightBox>.canvasWrap:first-child {
    margin-top: 0;
}

.viewRightBox>.canvasWrap>div:nth-child(1) {
    font-size: 14px;
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
</style>
