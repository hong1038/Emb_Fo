<template>
<b-container fluid>
    <Header @callbackLocation="resetArea"></Header>
    <div class="home">
        <div style="display:flex;">
            <div class="inner mainInner">
            <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                <div class="conWrap container-fluid">
                    <div class="mapImg" :style="'background:url('+backgroundImage+') 40%'"> </div>
                    <b-row>
                        <b-col cols="3" class="mainConWrap">
                            <div class="con_left01">
                                <div>대한민국</div>
                                <div class="weatherWrap">
                                    <div class="container-fluid">
                                        <b-row>
                                            <b-col cols="4">
                                                <span>{{new Date().toLocaleDateString()}} {{week[new Date().getDay()]}}</span>
                                                <span>{{weather.weather[0].main}}</span>
                                            </b-col>
                                            <b-col cols="4" id="weatherImg"><img :src="imgURL" alt="imgURL" style="display:block; margin-top:calc(50% - 105px)"></b-col>
                                            <b-col cols="4">{{Math.ceil(weather.main.temp - 273.15)}} ºC</b-col>
                                        </b-row>
                                    </div>
                                </div>
                                <div class="container-fluid">
                                    <b-row>
                                        <b-col cols="2">
                                            <img src="../assets/icon/wind.png" style="height:30px; margin-top:calc(50% - 25px)">
                                        </b-col>
                                        <b-col cols="2">
                                            <span>{{windDeg}}</span>
                                            <span>{{weather.wind.speed}} m/s</span>
                                        </b-col>
                                        <!-- <b-col cols="3"></b-col> -->
                                        <b-col cols="2">
                                            <img src="../assets/icon/water.png">
                                        </b-col>
                                        <b-col cols="2">
                                            <span>습도</span>
                                            <span>{{weather.main.humidity}} %</span>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                            <div class="con_left02">
                                <div>{{pinName}} {{title}} 가동률</div>
                                <div class="chartLegend">
                                    <span>정상</span>
                                    <span>기준초과</span>
                                </div>           
                                <div class="chartWrap mt-4">
                                    <div class="chartOut">
                                        <div class="chartIn"></div>
                                        
                                    </div>
                                    <span class="chartPlus">* 전일 기준</span>
                                    <span class="chartPer">{{opRate}}%</span>
                                </div>
                            </div>
                            <div class="con_left03">
                                <div>{{pinName}} 모니터링 내역</div>
                                <div class="monitorWrap">
                                    <b-row class="monitor" v-for="(item,idx) in moniList" :key="idx">
                                        <b-col cols="4">{{item.internal_name}}</b-col>
                                        <b-col cols="4">
                                            <ul >
                                                <li class="percent_line"></li>
                                                <li :class="item.idx + '_percent_up percent_up'"></li>
                                                <li class="percent_down"></li>
                                            </ul>
                                        </b-col>
                                        <b-col cols="3" v-if="item.place === 512" >
                                            <span v-if="item.outlet_avg_value != null">{{item.outlet_avg_value}}</span>
                                            <span v-else>-</span>
                                            /
                                            <span v-if="item.outlet_standard_value != null">{{item.outlet_standard_value}}</span>
                                            <span v-else>-</span>
                                        </b-col>
                                        <b-col cols="3" v-if="item.place === 511" >
                                            <span v-if="item.midlet_avg_value != null">{{item.midlet_avg_value}}</span>
                                            <span v-else>-</span>
                                            /
                                            <span v-if="item.midlet_standard_value != null">{{item.midlet_standard_value}}</span>
                                            <span v-else>-</span>
                                        </b-col>
                                        <b-col cols="3" v-if="item.place === 510" >
                                            <span v-if="item.inlet_avg_value != null">{{item.inlet_avg_value}}</span>
                                            <span v-else>-</span>
                                            /
                                            <span v-if="item.inlet_standard_value != null">{{item.inlet_standard_value}}</span>
                                            <span v-else>-</span>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="6" class="pinWrap">
                            <!-- <div v-on:click="pinClick(10014,'pin01','공주')" class="locationPin pin01" ref="pin" :disabled="busy">
                                <p class="pin01Ball"></p>공주
                            </div> -->
                            <div v-on:click="pinClick(10021,'pin02','남원')" class="locationPin pin02 ">
                                <p class="area10021 pin02Ball"></p>남원
                            </div>
                            <div v-on:click="pinClick(10015,'pin03','논산')" class="locationPin pin03 ">
                                <p class="area10015 pin03Ball"></p>논산
                            </div>
                            <div v-on:click="pinClick(10031,'pin04','부산')" class="locationPin pin04 ">
                                <p class="area10031 pin04Ball"></p>부산
                            </div>
                            <div v-on:click="pinClick(10041,'pin05','씨푸드 성남')" class="locationPin pin05 ">
                                <p class="area10041 pin05Ball"></p>씨푸드 성남
                            </div>
                            <!-- <div v-on:click="pinClick(10040,'pin06','씨푸드 이천')" class="locationPin pin06"> -->
                                <!-- <p class="pin06Ball"></p>씨푸드 이천 -->
                            <!-- </div> -->
                            <div v-on:click="pinClick(10051,'pin07','안산')" class="locationPin pin07 ">
                                <p class="area10051 pin07Ball"></p>안산
                            </div>
                            <!-- <div v-on:click="pinClick(10030,'pin08','양산')" class="locationPin pin08"> -->
                                <!-- <p class="pin08Ball"></p>양산 -->
                            <!-- </div> -->
                            <!-- <div v-on:click="pinClick(10004,'pin09','영등포')" class="locationPin pin09"> -->
                                <!-- <p class="pin09Ball"></p>영등포 -->
                            <!-- </div> -->
                            <!-- <div v-on:click="pinClick(10010,'pin10','원지')" class="locationPin pin10">
                                <p class="pin10Ball"></p>원지
                            </div> -->
                            <!-- <div v-on:click="pinClick(10011,'pin11','음성')" class="locationPin pin11"> -->
                                <!-- <p class="pin11Ball"></p>음성 -->
                            <!-- </div> -->
                            <div v-on:click="pinClick(10001,'pin12','인천1')" class="locationPin pin12 ">
                                <p class="area10001 pin12Ball"></p>인천1
                            </div>
                            <div v-on:click="pinClick(10002,'pin13','인천2')" class="locationPin pin13 ">
                                <p class="area10002 pin13Ball"></p>인천2
                            </div>
                            <!--<div v-on:click="pinClick(10003,'pin14','인천3')" class="locationPin pin14 ">
                                <p class="area10003 pin14Ball"></p>인천3
                            </div>-->
                            <div v-on:click="pinClick(10000,'pin15','인천냉동')" class="locationPin pin15 ">
                                <p class="area10000 pin15Ball"></p>인천냉동
                            </div>
                            <!-- <div v-on:click="pinClick(10020,'pin16','진안')" class="locationPin pin16"> -->
                                <!-- <p class="pin16Ball"></p>진안 -->
                            <!-- </div> -->
                            <div v-on:click="pinClick(10012,'pin17','진천')" class="locationPin pin17 ">
                                <p class="area10012 pin17Ball"></p>진천
                            </div>
                            <!-- <div v-on:click="pinClick(10013,'pin18','진천BC')" class="locationPin pin18"> -->
                                <!-- <p class="pin18Ball"></p>진천BC -->
                            <!-- </div> -->
                        </b-col>
                        <b-col cols="3" style="height:830px;">
                            <v-card max-width="400" class="mx-auto">
                                <h1 style="margin-left:10px; font-family: CjFontTitleBold; color:black;">{{areaNm}}</h1>
                                <v-container class="card-list">
                                    <v-card color="white" dark style="margin-bottom:10px" v-for="(item,i) in rowData " :key="i">
                                        <div class="card-content" @click="gotoView(item.server_key,item.name,item.pinImg3d,item.pinImg2d)">
                                            <v-avatar class="ma-3 position-relative" size="125" tile>
                                                <div class="wpNowState" v-if="item.odor_abnormal_yn === 'Y' || item.water_abnormal_yn === 'Y' || item.air_abnormal_yn === 'Y'"></div>
                                                <v-img v-bind:src="item.pinImg"></v-img>
                                            </v-avatar>
                                            <div class="card-text">
                                                <p style="font-weight:bold;font-size:18px;">
                                                    {{item.name = item.name === "인천냉동식품공장" ? "인천냉동 식품공장" : item.name }}
                                                </p>
                                                <p v-if="item.odor_abnormal_yn === 'X'" class='text-black'>
                                                    악취  <span style="color:blue;font-weight:bold; margin-left:20px;"> -</span>
                                                </p>
                                                <p v-else-if="item.odor_abnormal_yn === 'Y'" style="display:flex" class='text-black'>
                                                    악취 <span style="color:red;font-weight:bold;margin-left:5px;"> 이상있음</span>
                                                </p>
                                                <p v-else-if="item.odor_abnormal_yn === 'N'" class='text-black'>
                                                    악취  <span style="color:blue;font-weight:bold; margin-left:5px;" > 이상없음</span>
                                                </p>
                                                <p v-if="item.air_abnormal_yn === 'X'" class='text-black'>
                                                    대기  <span style="color:blue;font-weight:bold; margin-left:20px;"> -</span>
                                                </p>
                                                <p v-else-if="item.air_abnormal_yn === 'Y'" style="display:flex" class='text-black'>
                                                    대기   <span style="color:red;font-weight:bold; margin-left:5px;"> 이상있음</span>
                                                </p>
                                                <p v-else-if="item.air_abnormal_yn === 'N'" class='text-black'>
                                                    대기  <span style="color:blue;font-weight:bold; margin-left:5px;"> 이상없음</span>
                                                </p>
                                                <p v-if="item.water_abnormal_yn === 'X'" class='text-black'>
                                                    수질  <span style="color:blue;font-weight:bold; margin-left:20px;"> -</span>
                                                </p>
                                                <p v-else-if="item.water_abnormal_yn === 'Y'" style="display:flex" class='text-black'>
                                                    수질  <span style="color:red;font-weight:bold; margin-left:5px;"> 이상있음</span>
                                                </p>
                                                <p v-else-if="item.water_abnormal_yn === 'N'" class='text-black'>
                                                    수질  <span style="color:blue;font-weight:bold; margin-left:5px;"> 이상없음</span>
                                                </p>
                                            </div>
                                        </div>
                                    </v-card>
                                </v-container>
                            </v-card>
                        </b-col>
                    </b-row>
                </div>
            </b-overlay>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
// @ is an alias to /src
// import Vue from 'vue';
import store from "@/store/index";
import Header from '@/components/header.vue'

// import busanimage from '@/assets/MAP_busan.png'
// import chungbukimage from '@/assets/MAP_chungbuk.png'
// import chungnamimage from '@/assets/MAP_chungnam.png'
import gyunggiimage from '@/assets/MAP_gyunggi.png'
import incheonimage from '@/assets/MAP_incheon.png'
import junbukimage from '@/assets/MAP_junbuk.png'
import junnamimage from '@/assets/MAP_junnam.png'
import kangwonimage from '@/assets/MAP_kangwon.png'
import kyungbukimage from '@/assets/MAP_kyungbuk.png'
// import kyungnamimage from '@/assets/MAP_kyungnam.png'
import seoulimage from '@/assets/MAP_seoul.png'
import kyunginimage from '@/assets/MAP_kyungin.png'
import bioimage from '@/assets/MAP_bio.png'
import seafoodimage from '@/assets/MAP_seafood.png'
import centerimage from '@/assets/MAP_center.png'
import southimage from '@/assets/MAP_south.png'
import mainimage from '@/assets/MAP.png'

import pin01Img from '@/assets/rendering/pin01.png'
import pin02Img from '@/assets/rendering/pin02.png'
import pin03Img from '@/assets/rendering/pin03.png'
import pin04Img from '@/assets/rendering/pin04.png'
import pin05Img from '@/assets/rendering/pin05.png'
import pin06Img from '@/assets/rendering/pin06.png'
import pin07Img from '@/assets/rendering/pin07.png'
import pin08Img from '@/assets/rendering/pin08.png'
import pin09Img from '@/assets/rendering/pin09.png'
import pin10Img from '@/assets/rendering/pin10.png'
import pin11Img from '@/assets/rendering/pin11.png'
import pin12Img from '@/assets/rendering/pin12.png'
import pin13Img from '@/assets/rendering/pin13.png'
import pin14Img from '@/assets/rendering/pin14.png'
import pin15Img from '@/assets/rendering/pin15.png'
import pin16Img from '@/assets/rendering/pin16.png'
import pin17Img from '@/assets/rendering/pin17.png'
import pin18Img from '@/assets/rendering/pin18.png'



import pin01Img3D from '@/assets/rendering/pin01_view.jpg';
import pin02Img3D from '@/assets/rendering/pin02_view.jpg';
import pin03Img3D from '@/assets/rendering/pin03_view.jpg';
import pin04Img3D from '@/assets/rendering/pin04_view.jpg';
import pin05Img3D from '@/assets/rendering/pin05_view.jpg';
import pin06Img3D from '@/assets/rendering/pin06_view.jpg';
import pin07Img3D from '@/assets/rendering/pin07_view.jpg';
import pin08Img3D from '@/assets/rendering/pin08_view.jpg';
import pin09Img3D from '@/assets/rendering/pin09_view.jpg';
import pin10Img3D from '@/assets/rendering/pin10_view.jpg';
import pin11Img3D from '@/assets/rendering/pin11_view.jpg';
import pin12Img3D from '@/assets/rendering/pin12_view.jpg';
import pin13Img3D from '@/assets/rendering/pin13_view.jpg';
import pin14Img3D from '@/assets/rendering/pin14_view.jpg';
import pin15Img3D from '@/assets/rendering/pin15_view.jpg';
import pin16Img3D from '@/assets/rendering/pin16_view.jpg';
import pin17Img3D from '@/assets/rendering/pin17_view.jpg';
import pin18Img3D from '@/assets/rendering/pin18_view.jpg';

import pin01Img2D from '@/assets/rendering/pin01_map.jpg';
import pin02Img2D from '@/assets/rendering/pin02_map.jpg';
import pin03Img2D from '@/assets/rendering/pin03_map.jpg';
import pin04Img2D from '@/assets/rendering/pin04_map.jpg';
import pin05Img2D from '@/assets/rendering/pin05_map.jpg';
import pin06Img2D from '@/assets/rendering/pin06_map.jpg';
import pin07Img2D from '@/assets/rendering/pin07_map.jpg';
import pin08Img2D from '@/assets/rendering/pin08_map.jpg';
import pin09Img2D from '@/assets/rendering/pin09_map.jpg';
import pin10Img2D from '@/assets/rendering/pin10_map.jpg';
import pin11Img2D from '@/assets/rendering/pin11_map.jpg';
import pin12Img2D from '@/assets/rendering/pin12_map.jpg';
import pin13Img2D from '@/assets/rendering/pin13_map.jpg';
import pin14Img2D from '@/assets/rendering/pin14_map.jpg';
import pin15Img2D from '@/assets/rendering/pin15_map.jpg';
import pin16Img2D from '@/assets/rendering/pin16_map.jpg';
import pin17Img2D from '@/assets/rendering/pin17_map.jpg';
import pin18Img2D from '@/assets/rendering/pin18_map.jpg';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
    AgGridVue
} from "ag-grid-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        AgGridVue,
        // busanimage,
        // chungbukimage,
        // chungnamimage,
        gyunggiimage,
        incheonimage,
        junbukimage,
        junnamimage,
        kangwonimage,
        kyungbukimage,
        // kyungnamimage,
        seoulimage,
        kyunginimage,
        bioimage,
        seafoodimage,
        centerimage,
        southimage,
        mainimage,

        pin01Img,
        pin02Img,
        pin03Img,
        pin04Img,
        pin05Img,
        pin06Img,
        pin07Img,
        pin08Img,
        pin09Img,
        pin10Img,
        pin11Img,
        pin12Img,
        pin13Img,
        pin14Img,
        pin15Img,
        pin16Img,
        pin17Img,
        pin18Img
    },
    name: 'App',
    data() {
        return {
            busy:false,
            timeout : null,

            week: ['일', '월', '화', '수', '목', '금', '토'],
            columnDefs: null,
            rowData: null,
            weather: {},
            areaPin: null,
            imgURL: null,
            windDeg: "",
            opRate: 0,
            title: "정상",
            id1: "test1",
            id2: "test2",
            pinName: "전체",
            pin: null,
            backgroundImage: mainimage,
            moniList: null,
            moniList2: null,
            moniList2val:[],
            moniList3val:[],
            checkPin:false,
            areaNm:"전체",

        }
    },
    beforeDestroy() {
        this.clearTimeout()
        clearInterval(this.timer);
        clearInterval(this.polling02);

    },

    beforeMount() {
        // this.getfactory();
        this.startArea();
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];

        this.columnDefs = [{
                headerName: 'make',
                field: 'make',
                rowSpan: function (params) {
                    return params.data.country === 'make' ? 2 : 1;
                }
            },
            {
                headerName: 'model',
                field: 'model'
            },
        ];
        // this.rowData = this.rowData
    },
    
    created() {
        this.getWether();
        this.onClick();
        this.pinSelect2();

        window.addEventListener('load', this.updateData())
    },
    
    watch: {
        moniList() {
            this.moniList.map((e, idx) => {
                e.idx = idx;
            })
            setTimeout(() => {
                document.getElementsByClassName("chartIn")[0].style.width = this.opRate+"%"
                this.testmoni()
            }, 1000);
        }
    },
    methods: {
        updateData(){
            this.polling02 = setInterval(() => {
                store.state.rememberArea = this.areaPin
                this.pinClick(store.state.rememberArea, this.pin, this.name);
                this.getWether();
            },18000000)
        },
        pinSelect2(){
            this.$Axios.post("/api/daedan/cj/ems/main/omList", {
            }, this.config)
            .then(res => {
                this.moniList2 = res.data.data.moni
                this.pinwar()
            }).catch(err => {
                console.log(err)
            })

        },
        pinwar(){
            // console.log(this.moniList2)
            this.moniList2val = []
            this.moniList3val = []
            this.moniList2.map(e=>{
                    if (e.place === 510) {
                        if (e.inlet_avg_value > e.inlet_standard_value) {
                            this.moniList2val.push(e.server_key)
                        }  
                        if (e.inlet_avg_value < e.inlet_standard_value && e.inlet_avg_value > 0) {
                            this.moniList3val.push(e.server_key)
                        }          
                    }else if (e.place === 512) {
                        if (e.outlet_avg_value > e.outlet_standard_value) {
                            this.moniList2val.push(e.server_key)
                        }
                       if (e.outlet_avg_value < e.outlet_standard_value && e.outlet_avg_value > 0) {
                            this.moniList3val.push(e.server_key)
                        }
                    }else if (e.place === 511) {
                        if (e.midlet_avg_value > e.midlet_standard_value) {
                            this.moniList2val.push(e.server_key)
                        }
                       if (e.midlet_avg_value < e.midlet_standard_value && e.midlet_avg_value > 0) {
                            this.moniList3val.push(e.server_key)
                        }
                    }  
            })
            this.moniList2val = Array.from(new Set(this.moniList2val))
            this.moniList3val = Array.from(new Set(this.moniList3val))

            this.$Axios.post("/api/daedan/cj/ems/main/omList", {
            }, this.config)
            .then(res => {

                // this.datas[0].air_abnormal_yn = "Y"
                this.datas = res.data.data.area.filter(e => 
                    e.area_code !== 10014 &&
                    e.area_code !== 10040 &&
                    e.area_code !== 10030 &&
                    e.area_code !== 10004 &&
                    e.area_code !== 10010 &&
                    e.area_code !== 10011 &&
                    e.area_code !== 10020 &&
                    e.area_code !== 10013 &&
                    e.area_code !== 10003
                )

                    this.datas.map(item => {
                        for (let index = 0; index < this.moniList3val.length; index++) {
                            if (this.moniList3val[index] === item.server_key) {
                                item.odor_abnormal_yn = "N"
                            }
                        }
                    })

                    this.datas.map(item => {
                        for (let index = 0; index < this.moniList2val.length; index++) {
                            if (this.moniList2val[index] === item.server_key) {
                                item.odor_abnormal_yn = "Y"
                            }
                        }
                    })
                    this.datas.map(e => {
                        this.rowData.map(item => {
                            if (e.server_key === item.server_key) {
                                item.odor_abnormal_yn = e.odor_abnormal_yn
                            }
                        })
                    })
                console.log(this.datas)
                this.setTimeout(() => {
                    this.pollData();
                }, 5000);
            })
            .catch(err => {
                alert("가동률데이터목록 추출 실패 \n" + err);
            })
        },
        pollData(){
            this.polling = setInterval(() => {
                
                if (window.location.pathname !== '/') {
                    return false;
                }
                if (this.pinshow === 1) {
                    // console.log("asd")
                    this.pinshow = 0
                    this.datas.map(e => {
                        if (e.air_abnormal_yn === "Y" || e.odor_abnormal_yn  === "Y" || e.water_abnormal_yn === "Y") {
                            e.pinshow = 0   
                            document.getElementsByClassName("area"+e.area_code)[0].style.opacity = 0
                            document.getElementsByClassName("area"+e.area_code)[0].style.background = "red"
                            document.getElementsByClassName("area"+e.area_code)[0].style.borderColor = "red"
                            document.getElementsByClassName("area"+e.area_code)[0].style.boxShadow = "0px 0px 10px 4px red"
                        }else{
                            if (document.getElementsByClassName("area"+e.area_code)[0].style.background === "rgb(48, 230, 55)" || document.getElementsByClassName("area"+e.area_code)[0].style.background === '') {
                                return
                            }
                            document.getElementsByClassName("area"+e.area_code)[0].style.boxShadow = "none"
                            document.getElementsByClassName("area"+e.area_code)[0].style.background = "transparent"
                            document.getElementsByClassName("area"+e.area_code)[0].style.borderColor = "black"
                        }
                    })
                }else{
                    // console.log("asdasd")
                    this.pinshow = 1
                    this.datas.map(e => {
                        document.getElementsByClassName("area"+e.area_code)[0].style.opacity = 1
                        e.pinshow = 1
                    })
                }
            }, 500);

            setTimeout(() => {
                this.pinwar()
            }, 5000);
        },  
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
            }, 100)
        },
        onHidden() {
            // Return focus to the button once hidden
            this.$refs.pin.focus()
        },
        onClick() {
            this.busy = true
            // Simulate an async request
            this.setTimeout(() => {
            // this.busy = false
            })
        },

        pinClick(areaPin, pin, name){
            this.checkPin = true;
            this.pinSelect(areaPin, pin, name);

        },
        gotoView(serverKey, serverName , bgImg, bgImg2d) {
            store.state.serverKey = serverKey
            store.state.serverName = serverName
            store.state.bgImg = bgImg
            store.state.bgImg2d = bgImg2d
            this.$router.push({
                name: 'View'
            })
        },
        pinSelect(areaPin, pin, name,type) {
            this.onClick();
            this.areaPin = areaPin
            this.pinName = name


            this.$Axios.post("/api/daedan/cj/ems/main/omList", {
                    serverList: this.serverList,
                    userId: store.state.userInfo.userId,
                    areaPin: this.areaPin,
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            //여기서 데이터치리요함.

                                this.moniList = res.data.data.moni

                                // console.log(this.moniList)

                                res.data.data.area[9].pinImg = pin01Img
                                res.data.data.area[12].pinImg = pin02Img
                                res.data.data.area[10].pinImg = pin03Img
                                res.data.data.area[14].pinImg = pin04Img
                                res.data.data.area[16].pinImg = pin05Img
                                res.data.data.area[15].pinImg = pin06Img
                                res.data.data.area[17].pinImg = pin07Img
                                res.data.data.area[13].pinImg = pin08Img
                                res.data.data.area[4].pinImg = pin09Img
                                res.data.data.area[5].pinImg = pin10Img
                                res.data.data.area[6].pinImg = pin11Img
                                res.data.data.area[1].pinImg = pin12Img
                                res.data.data.area[2].pinImg = pin13Img
                                res.data.data.area[3].pinImg = pin14Img
                                res.data.data.area[0].pinImg = pin15Img
                                res.data.data.area[11].pinImg = pin16Img
                                res.data.data.area[7].pinImg = pin17Img
                                res.data.data.area[8].pinImg = pin18Img

                                res.data.data.area[9].pinImg3d = pin01Img3D
                                res.data.data.area[12].pinImg3d = pin02Img3D
                                res.data.data.area[10].pinImg3d = pin03Img3D
                                res.data.data.area[14].pinImg3d = pin04Img3D
                                res.data.data.area[16].pinImg3d = pin05Img3D
                                res.data.data.area[15].pinImg3d = pin06Img3D
                                res.data.data.area[17].pinImg3d = pin07Img3D
                                res.data.data.area[13].pinImg3d = pin08Img3D
                                res.data.data.area[4].pinImg3d = pin09Img3D
                                res.data.data.area[5].pinImg3d = pin10Img3D
                                res.data.data.area[6].pinImg3d = pin11Img3D
                                res.data.data.area[1].pinImg3d = pin12Img3D
                                res.data.data.area[2].pinImg3d = pin13Img3D
                                res.data.data.area[3].pinImg3d = pin14Img3D
                                res.data.data.area[0].pinImg3d = pin15Img3D
                                res.data.data.area[11].pinImg3d = pin16Img3D
                                res.data.data.area[7].pinImg3d = pin17Img3D
                                res.data.data.area[8].pinImg3d = pin18Img3D

                                res.data.data.area[9].pinImg2d = pin01Img2D
                                res.data.data.area[12].pinImg2d = pin02Img2D
                                res.data.data.area[10].pinImg2d = pin03Img2D
                                res.data.data.area[14].pinImg2d = pin04Img2D
                                res.data.data.area[16].pinImg2d = pin05Img2D
                                res.data.data.area[15].pinImg2d = pin06Img2D
                                res.data.data.area[17].pinImg2d = pin07Img2D
                                res.data.data.area[13].pinImg2d = pin08Img2D
                                res.data.data.area[4].pinImg2d = pin09Img2D
                                res.data.data.area[5].pinImg2d = pin10Img2D
                                res.data.data.area[6].pinImg2d = pin11Img2D
                                res.data.data.area[1].pinImg2d = pin12Img2D
                                res.data.data.area[2].pinImg2d = pin13Img2D
                                res.data.data.area[3].pinImg2d = pin14Img2D
                                res.data.data.area[0].pinImg2d = pin15Img2D
                                res.data.data.area[11].pinImg2d = pin16Img2D
                                res.data.data.area[7].pinImg2d = pin17Img2D
                                res.data.data.area[8].pinImg2d = pin18Img2D

                                // console.log(res.data.data.area,areaPin)
                                if (type === true) {
                                    try {
                                        this.rowData = res.data.data.area.filter((e) => Number(String(e.area_code).split("")[3]) === Number(String(this.areaPin).split("")[3]))
                                        this.rowData = this.rowData.filter(e => e.area_code != 10014 && e.area_code != 10013 && e.area_code != 10040 && e.area_code != 10030 && e.area_code != 10004 && e.area_code != 10010 && e.area_code != 10011 && e.area_code != 10020 )
                                        this.areaNm = this.rowData[0].area
                                    } catch (error) {
                                        console.log(error)
                                    }

                                }else{
                                    try {
                                        if (this.checkPin === false) {
                                            this.rowData = res.data.data.area.filter(e => e.area_code != 10014 && e.area_code != 10013 && e.area_code != 10040 && e.area_code != 10030 && e.area_code != 10004 && e.area_code != 10010 && e.area_code != 10011 && e.area_code != 10020 )
                                        }else{
                                            // console.log(res.data.data.area)
                                            
                                            
                                            this.rowData = res.data.data.area.filter((e) => e.area_code == areaPin)
                                            // console.log(this.areaNm)
                                            this.areaNm = this.rowData[0].name
                                        }

                                        if (res.data.data.oper.opRate === '' || res.data.data.oper.opRate === undefined || res.data.data.oper.opRate === 'NaN') {
                                            this.opRate = 0;    
                                        }else{
                                            this.opRate = res.data.data.oper.opRate.toFixed(0)
                                        }
                                        // setTimeout(() => {
                                            
                                           
                                        // }, 500);
                                    } catch (error) {
                                        console.log(error)
                                    }      
                                }

                                this.rowData.map(item => {
                                    for (let index = 0; index < this.moniList2val.length; index++) {
                                        if (this.moniList2val[index] === item.server_key) {
                                            item.odor_abnormal_yn = "Y"
                                        }
                                    }
                                })

                                this.getmoniList()
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })
            if (this.pin !== null) {
                document.getElementsByClassName(this.pin + "Ball")[0].style.borderColor = "black"
                document.getElementsByClassName(this.pin + "Ball")[0].style.backgroundColor = "transparent"
                document.getElementsByClassName(this.pin + "Ball")[0].style.boxShadow = "0px 0px 0px 0px transparent"
                document.getElementsByClassName(this.pin + "Ball")[0].style.width = "17px"
                document.getElementsByClassName(this.pin + "Ball")[0].style.height = "17px"
                document.getElementsByClassName(this.pin + "Ball")[0].style.top = "-15px"
                document.getElementsByClassName(this.pin + "Ball")[0].style.left = "25px"
                document.getElementsByClassName(this.pin)[0].style.fontWeight = "400"
                document.getElementsByClassName(this.pin)[0].style.fontSize = ""
            }
            setTimeout(() => {
                document.getElementsByClassName(pin + "Ball")[0].style.borderColor = "rgb(48, 230, 55)"
                document.getElementsByClassName(pin + "Ball")[0].style.backgroundColor = "rgb(48, 230, 55)"
                document.getElementsByClassName(pin + "Ball")[0].style.boxShadow = "0px 0px 10px 4px rgb(39, 107, 64)"
                document.getElementsByClassName(pin + "Ball")[0].style.width = "25px"
                document.getElementsByClassName(pin + "Ball")[0].style.height = "25px"
                document.getElementsByClassName(pin + "Ball")[0].style.left = "21px"
                document.getElementsByClassName(pin + "Ball")[0].style.top = "-26px"
                document.getElementsByClassName(pin)[0].style.fontWeight = "900"
                this.busy = false
            }, 1000);
            this.pin = pin;
            // this.testmoni()
            this.changeMap()
            
        },
        getmoniList(){

        },
        testmoni() {

            if (this.moniList.length === 0) return false

            setTimeout(() => {
                this.moniList.map((e) => {
                    if (e.place === 510) {
                        if (e.inlet_avg_value > e.inlet_standard_value) {
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.backgroundColor = "rgb(255, 76, 76)"
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.width = '100%'
                        }else{
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.backgroundColor = "rgb(81, 81, 255)"
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.width = (e.inlet_avg_value * 100 / e.inlet_standard_value)+"%"
                        }          
                    }else if (e.place === 512) {
                        if (e.outlet_avg_value > e.outlet_standard_value) {
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.backgroundColor = "rgb(255, 76, 76)"
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.width = '100%'
                        }else{
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.backgroundColor = "rgb(81, 81, 255)"
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.width = (e.outlet_avg_value * 100 / e.outlet_standard_value)+"%"
                        }
                    }else if (e.place === 511) {
                        if (e.midlet_avg_value > e.midlet_standard_value) {
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.backgroundColor = "rgb(255, 76, 76)"
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.width = '100%'
                        }else{
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.backgroundColor = "rgb(81, 81, 255)"
                            document.getElementsByClassName(e.idx + "_percent_up")[0].style.width = (e.midlet_avg_value * 100 / e.midlet_standard_value)+"%"
                        }
                    }
                    

                })
            }, 100);
        },

        changeMap() {
            switch (this.pin) {
                case 'pin01':
                    this.backgroundImage = centerimage
                    break;
                case 'pin02':
                    this.backgroundImage = junbukimage
                    break;
                case 'pin03':
                    this.backgroundImage = centerimage
                    break;
                case 'pin04':
                    this.backgroundImage = southimage
                    break;
                case 'pin05':
                    this.backgroundImage = seafoodimage
                    break;
                case 'pin06':
                    this.backgroundImage = seafoodimage
                    break;
                case 'pin07':
                    this.backgroundImage = bioimage
                    break;
                case 'pin08':
                    this.backgroundImage = southimage
                    break;
                case 'pin09':
                    this.backgroundImage = kyunginimage
                    break;
                case 'pin10':
                    this.backgroundImage = centerimage
                    break;
                case 'pin11':
                    this.backgroundImage = centerimage
                    break;
                case 'pin12':
                    this.backgroundImage = kyunginimage
                    break;
                case 'pin13':
                    this.backgroundImage = kyunginimage
                    break;
                case 'pin14':
                    this.backgroundImage = kyunginimage
                    break;
                case 'pin15':
                    this.backgroundImage = kyunginimage
                    break;
                case 'pin16':
                    this.backgroundImage = junbukimage
                    break;
                case 'pin17':
                    this.backgroundImage = centerimage
                    break;
                case 'pin18':
                    this.backgroundImage = centerimage
                    break;

                default:
                    break;
            }

        },
        changeChartType(type) {
            if (type === 1) {
                this.title = "정상";
                this.id1 = "test1";
                this.id2 = "test2";
            } else {
                this.title = "초과";
                this.id1 = "test2";
                this.id2 = "test1";
            }
            alert("처리중입니다.")
        },
        async getWether() {
            const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=696fa8118910f5ecc9778cfaf53d36b7')
            const data = await response.json(); //경도(126.98)
            this.weather = data;
            // console.log(this.weather.wind)
            /*
            console.log("날씨정보" + data.coord.lon); //위도(37.57)
            console.log("날씨정보.weather = " + data.weather[0].main); //하늘(Clear)
            console.log("날씨정보.weatherde.scriptionn = " + data.weather[0].descriptionn) //하늘상세정보(clear sky)
            console.log("날씨정보.weatherde.icon = " + data.weather[0].icon) //아이콘(01d)
            console.log("날씨정보.main.temp = " + data.main.temp); //온도(280.45)
            console.log("날씨정보.main.feels_like = " + data.main.feels_like); //체감온도(ㄹ275.18)
            console.log("날씨정보.main.temp_min = " + data.main.temp_min); //최저기온(280.15)
            console.log("날씨정보.main.temp_max = " + data.main.temp_max); //최고기온(281.15)
            console.log("날씨정보.main.pressure = " + data.main.pressure); //기압(1024)
            console.log("날씨정보.main.humidity = " + data.main.humidity); //습도(36)
            console.log("날씨정보.visibility = " + data.visibility)
            console.log("날씨정보.wind.speed = " + data.wind.speed); //풍속(2.12)
            console.log("날씨정보.wind.deg = " + data.wind.deg) //방향(253)  
            console.log("날씨정보.clouds.all = " + data.clouds.all)
            console.log("날씨정보.dt = " + data.dt) //유닉스일자(1604482402)
            console.log("날씨정보.sys.type = " + data.sys.type) //
            console.log("날씨정보.sys.id = " + data.sys.id); //
            console.log("날씨정보.sys.country = " + data.sys.country); //국가명(KR)
            console.log("날씨정보.sys.sunrise = " + data.sys.sunrise); //일출시간(1604440807)
            console.log("날씨정보.timezone = " + data.timezone) //시계열(32400)
            console.log("날씨정보.id = " + data.id) //도시id
            console.log("날씨정보.name = " + data.name) //도시명
            console.log("날씨정보.cod = " + data.cod) //도시코드
            */
            this.imgURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"; //아이콘URL

            switch (data.wind.deg) {
                case 0 || 360:
                    this.windDeg = "북향"
                    break;
                case 90:
                    this.windDeg = "동향"
                    break;
                case 180:
                    this.windDeg = "남향"
                    break;
                case 270:
                    this.windDeg = "서향"
                    break;
                default:
                    if (0 < data.wind.deg && data.wind.deg < 90) {
                        this.windDeg = "북동향"
                    } else if (90 < data.wind.deg && data.wind.deg < 180) {
                        this.windDeg = "동남향"
                    } else if (180 < data.wind.deg && data.wind.deg < 270) {
                        this.windDeg = "남서향"
                    } else if (270 < data.wind.deg && data.wind.deg < 360) {
                        this.windDeg = "서북향"
                    }
                    break
            }

        },

        startArea() {

            switch (store.state.areaCode) {

                case 10014:
                    this.pinSelect(10014, 'pin01', '공주')
                    break;
                case 10021:
                    this.pinSelect(10021, 'pin02', '남원')
                    break;
                case 10015:
                    this.pinSelect(10015, 'pin03', '논산')
                    break;
                case 10031:
                    this.pinSelect(10031, 'pin04', '부산')
                    break;
                case 10041:
                    this.pinSelect(10041, 'pin05', '씨푸드 성남')
                    break;
                case 10040:
                    this.pinSelect(10040, 'pin06', '씨푸드 이천')
                    break;
                case 10051:
                    this.pinSelect(10051, 'pin07', '안산')
                    break;
                case 10030:
                    this.pinSelect(10030, 'pin08', '양산')
                    break;
                case 10004:
                    this.pinSelect(10004, 'pin09', '영등포')
                    break;
                case 10010:
                    this.pinSelect(10010, 'pin10', '원지')
                    break;
                case 10011:
                    this.pinSelect(10011, 'pin11', '음성')
                    break;
                case 10001:
                    this.pinSelect(10001, 'pin12', '인천1')
                    break;
                case 10002:
                    this.pinSelect(10002, 'pin13', '인천2')
                    break;
                case 10003:
                    this.pinSelect(10003, 'pin14', '인천3')
                    break;
                case 10000:
                    this.pinSelect(10000, 'pin15', '인천냉동')
                    break;
                case 10020:
                    this.pinSelect(10020, 'pin16', '진안')
                    break;
                case 10012:
                    this.pinSelect(10012, 'pin17', '진천')
                    break;
                case 10013:
                    this.pinSelect(10013, 'pin18', '진천BC')
                    break;

                default:
                    this.pinSelect(10012, 'pin17', '진천')
                    break;
            }

        },
        resetArea() {
            /*
            pin03 = 논산
            pin06 = 씨푸드이천
            pin08 = 양산
            pin09 = 영등포
            pin10 = 원지
            pin11 = 음성
            pin12 = 인천1
            pin13 = 인천2
            pin14 = 인천3
            */
            if (store.state.areaCode === 10000) {
                this.pinSelect(store.state.areaCode, 'pin15', '인천냉동',true)
            } else if (store.state.areaCode === 10015) {
                this.pinSelect(store.state.areaCode, 'pin03', '논산',true)
            } else if (store.state.areaCode === 10021) {
                this.pinSelect(store.state.areaCode, 'pin02', '남원',true)
            } else if (store.state.areaCode === 10031) {
                this.pinSelect(store.state.areaCode, 'pin04', '부산',true)
            } else if (store.state.areaCode === 10041) {
                this.pinSelect(store.state.areaCode, 'pin05', '씨푸드성남',true)
            } else if (store.state.areaCode === 10051) {
                this.pinSelect(store.state.areaCode, 'pin07', '안산',true)
            }
            //console.log("area = " + area);
            //this.pinSelect(store.state.areaCode,area,areaNm)
            // this.getOperation();
        },

    },

}
</script>

<style lang="scss">
* {
    font-family: 'CjFontBodyLight';    
}

.home {
    height: 820px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
}

.mainInner {
    width: 100%;
    height: 100%;
    *{
        font-weight:bold;
        font-family:CjFontBodyRegular;
    }
    .conWrap {
        width: 100%;
        height: 100%;
        font-size: 14px;
    }
    .mapImg {
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 830px;
        background: url(../assets/MAP.png) 40%;
        background-size: 80% 100%;
    }
    .mainConWrap {
        >div{
            box-sizing: border-box;
            border-radius: 5px;
            padding: 20px;
            background: #f3faff;
            box-shadow: 0px 0px 3px rgb(0, 0, 0);
        }

        .row{
            >div {
                padding: 0;
            }
        }

        .con_left01 {
            height: 180px;
            margin-top: 0px;
            text-align: left;

            .weatherWrap {
                >div{
                    >div{
                        box-sizing: border-box;
                        padding-left: 10px;
                        font-size:2rem;

                        >div {
                            font-size: 3.5rem;
                            line-height: 40px;
                            font-weight: "bold";
                            &:nth-child(3){
                                padding-left:1.5rem;
                                font-size:3.4rem;
                            }
                        }
                    }
                }        
            }

            >div {
                /* 상단 - 대한민국 */
                &:nth-child(1){
                    height: 20px;
                    font-size: 24px;
                    line-height: 10px;
                    box-sizing: border-box;
                }
                /* 중단 - 날짜, 날씨, 온도 */
                &:nth-child(2) {
                    height: 60px;
                    margin-top: 10px;

                    span {
                        display: block;
                        width: 100%;
                        height: 40%;
                        font-size:1.7rem;
                    }
                }
                /* 하단 - 바람,습도,강수확률 */
                &:nth-child(3) {
                    height: 60px;
                    font-size: 14px;
                }
                >div {
                    height:100%;
                    box-sizing: border-box;
                    padding-left: 10px;
                    padding-right: 10px;
                    span{
                        display: block;
                        width: 100%;
                        line-height: 25px;
                        font-size: 1.5rem;
                    }
                    div{
                        height:100%;
                        position:relative;
                    }
                }
            }

            img {
                position:absolute;
                left:50%;
                width: 30px;
                height: 40px;
                justify-content: center;
                transform:translate(-50%);
                margin-top:calc(50% - 30px)
            }

            #weatherImg {
                position: relative;
                img {
                    position:absolute;
                    top:50%;
                    width: 60%;
                    height: 110%;
                }
            }
            .windIcon {
                height: 40px;
            }
        }
    }
    .con_left02 {
        position:relative;
        margin-top: 5px;
        
        >div {
            width: 100%;
            text-align: left;
            &:nth-child(1) {
                font-size: 24px;
            }
        }
        .chartLegend{
            position:absolute;
            top:22%;
            right:0;
            width:40%;
            // outline:1px solid;
            span{
                margin-left:15%;
                position:relative;
                &:before{
                    content:"";
                    position:absolute;
                    top:1px;
                    left:-20px;
                    background:#ccc;
                    border-radius:100%;
                    width:15px;
                    height:15px;
                }
                &:nth-child(1){
                    margin-left:35%;
                    &:before{
                        background:#5151ff;
                    }
                }
                &:nth-child(2){
                    &:before{
                        background:#ccc;
                    }
                }
            }
        }
        .chartWrap {
            height: 40px;
            position: relative;
            .chartOut{
                width:75%;
                height:30px;
                background:#ccc;
                border-radius: 7px;
                overflow: hidden;
                .chartIn{
                    width: 0%;
                    background:#5151ff;
                    height:100%;
                    border-radius: 7px;
                }
            }
            .chartPlus{
                position:relative;
                left:1%;
                font-size:0.5rem;
            }
            .chartPer {
                position: absolute;
                top:0;
                right:0;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                font-family: CjFontTitleBold;
            }   
        }
    }
    .con_left03 {
        height: 480px;
        margin-top: 5px;
        *{
            font-weight:bold;
        }
        >div {
            width: 100%;
            text-align: left;
            &:nth-child(1) {
                font-size: 24px;
                height: 40px;
            }
        }
        .monitorWrap {
            height: 92%;
            overflow-y: scroll;
            .monitor {
                height: 60px;
                box-sizing: border-box;
                padding: 0px;
                margin: 0;
                margin-top: 3px;
                &:nth-child(1) {
                    border-top: 1px solid rgb(221, 221, 221);
                    margin-top: 0;
                }
                >div {
                    height: 100%;
                    /* line-height: 40px; */
                    text-align: center;
                    border-bottom: 1px solid rgb(221, 221, 221);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    word-break: keep-all;

                    >ul {
                        width: 100%;
                        height: 10px;
                        /* margin-top: 15px; */
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        >li {
                            height: 10px;
                            float: left;
                            box-sizing: border-box;
                            margin-left: 1px;
                        }
                    }
                }
            }
            .percent_line{
                position: absolute;
                z-index: 10;
                top:0;
                width: 33%;
                border-left: 1px solid white;
                border-right: 1px solid white;
                left: 33%;
            }
            .percent_up{
                width: 0%;
                background: rgb(81, 81, 255);
                border: none;
                position: absolute;
                top: 0;
                left: 0;
            }
            .percent_down{
                border: 2px solid rgb(223, 223, 223);
                background: rgb(228, 228, 228);
                width: 100%;
            }

        }
    }
    
    .pinWrap {
        position: relative;
        margin-top: 20px;
        height: 800px;
        *{
            font-family: CjFontTitleMedium;
        }
        >div {
            position: absolute;
            width: 65px;
            height: 25px;
            font-size: 14px;
            line-height: 25px;
            text-align: center;
            cursor:pointer;
            >p {
                content: "";
                position: absolute;
                top: -15px;
                left: 25px;
                width: 17px;
                height: 17px;
                border: 4px solid black;
                border-radius: 100%;
                transition: all 0.2s;
            }
        }
        /*지도 pin 위치*/
        .pin01 {
            /*공주*/
            top: 400px;
            left: 280px;
        }

        .pin02 {
            /*남원*/
            top: 580px;
            left: 330px;
        }

        .pin03 {
            /*논산*/
            top: 420px;
            left: 220px;
        }

        .pin04 {
            /*부산*/
            top: 640px;
            left: 640px;
        }

        .pin05 {
            /*씨푸드 성남*/
            top: 260px;
            left: 300px;
            width:75px;
            word-break: keep-all;
            text-indent: -10px;
        }

        .pin06 {
            /*씨푸드 이천*/
            top: 220px;
            left: 360px;
        }

        .pin07 {
            /*안산*/
            top: 210px;
            left: 290px;
        }

        .pin08 {
            /*양산*/
            top: 610px;
            left: 590px;
        }

        .pin09 {
            /*영등포*/
            top: 140px;
            left: 260px;
        }

        .pin10 {
            /*원지*/
            top: 320px;
            left: 190px;
        }

        .pin11 {
            /*음성*/
            top: 260px;
            left: 410px;
        }

        .pin12 {
            /*인천1*/
            top: 80px;
            left: 140px;
        }

        .pin13 {
            /*인천2*/
            top: 110px;
            left: 180px;
        }

        .pin14 {
            /*인천3*/
            top: 150px;
            left: 140px;
        }

        .pin15 {
            /*인천냉동*/
            top: 170px;
            left: 200px;
        }

        .pin16 {
            /*진안*/
            top: 520px;
            left: 350px;
        }

        .pin17 {
            /*진천*/
            top: 330px;
            left: 360px;
        }

        .pin18 {
            /*진천BC*/
            top: 360px;
            left: 400px;
        }
    }

}

.wpNowState{
    position:absolute;
    top:0;
    left:0;
    z-index:3;
    width:7px;
    height:100%;
    background:red;
    line-height:2;
    display:flex;
}

.v-application ul,
.v-application ol {
    padding-left: 0;
}

#test1::before {
    content: "";
    position: absolute;
    top: 17px;
    left: -20px;
    width: 15px;
    height: 15px;
    background: rgb(81, 81, 255);
    border-radius: 7px;
}

#test2::before {
    content: "";
    position: absolute;
    top: 17px;
    left: -20px;
    width: 15px;
    height: 15px;
    border-radius: 7px;
    background: rgb(228, 228, 228);
}

.monitorWrap::-webkit-scrollbar {
    width: 7px;
    border-radius: 5px;
}

.monitorWrap::-webkit-scrollbar-thumb {
    background: rgb(81, 81, 255);
    border-radius: 5px;
}

.monitorWrap::-webkit-scrollbar-track {
    background: rgb(179, 179, 179);
    border-radius: 5px;
}
.row {
    justify-content: space-around;
    align-items: center;
}
.v-card {
    padding: 10px;
    padding-top: 20px;
}

.card-list {
    overflow-y: scroll;
    max-height: 730px;
    margin-top: 10px;
}

/* 스크롤 스타일 변경 */
.card-list::-webkit-scrollbar {
    width: 7px;
    border-radius: 5px;
}

.card-list::-webkit-scrollbar-thumb {

    background: rgb(81, 81, 255);
    border-radius: 5px;
}

.card-list::-webkit-scrollbar-track {
    background: rgb(179, 179, 179);
    border-radius: 5px;
}

/* card */

.card-text>p {
    margin-bottom: 3px;
    color:black;
}

.card-text {
    word-break: keep-all;
}

.card-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.card-content .v-avatar {
    width: 210px !important;
    min-width: 210px !important;
}

.card-content .v-avatar .v-image .v-image__image--cover {
    background-size: 125% 130% !important;
}

.v-card>a {
    text-decoration: none;
}

.spinner-border{
    width:7rem;
    height:7rem;
    border:.5rem solid currentColor;
    border-right-color:transparent;
}
.text-black{
    color:black;
}
</style>
