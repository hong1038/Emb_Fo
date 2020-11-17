<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>월말 보고</p>
                    <div class="monthlyDateCheck container-fluid">
                        <b-row>
                            <b-col cols="9">
                                <div>사업장 선택</div>
                                <div>
                                    <select v-model="selectWorkplace">
                                        <option v-for="(item, index) in checkList1" v-bind:item="item" v-bind:index="index" v-bind:key="item.id" :value="index">{{item}}</option>
                                    </select>
                                </div>
                                <div>월 선택</div>
                                <div class="dateSelect">
                                    <!-- <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field :placeholder="currentDate" v-model="date" label="" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" type="month" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu> -->
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div>
                            </b-col>
                            <b-col cols="3">
                                <input type="button" class="m_btn01" value="조회" v-on:click="getList">
                            </b-col>
                        </b-row>
                    </div>
                    <div class="monthlyTableSelectBox container-fluid">
                        <div>
                            <div><span>1. 월말 보고 Summary</span></div>
                            <div><span>2. 운전 현황(월간 통계)</span></div>
                            <div><span>3. 배출시설(흡입구) 트렌드 분석 : 이상점(농도 상승) 확인 및 조치 사항</span></div>
                            <div><span>4. 배출구 초과이력 관리</span></div>
                            <div><span>5. 설비적/기계적 문제 발생 및 대응 현황</span></div>
                            <div><span>6. 운영 특이사항</span></div>
                        </div>
                    </div>

                    <div class="con_tableWrap">
                        <div class="con_table con_table01 container-fluid text-center">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
// import store from "@/store/index";
import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
import Main from '@/components/main.vue'
import Vue from 'vue'

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Datetime)
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        Main,
    },
    computed: {
        currentDate() {
            let s = new Date().toLocaleDateString().slice(0, 8);
            return s;
        }
    },
    data() {
        return {
            checkList1: ["cloudmain", "인천1", "성남", "부산", "인천2", "논산", "인천냉동", "진천", "진안", "인천3", "안산", "공주", "남원"],
            selectWorkplace: "",
            dateFr: '',
        }
    },
    watch: {
        selectWorkplace() {
            console.log(this.selectWorkplace)
        },
        date() {
            console.log(this.date)
        }
    },
    methods: {
        getList() {
            this.$Axios.post("/api/daedan/cj/ems/measurements/measurementsByDayList", {
                currentDate: this.currentDate,
            })
        }

    }
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
    /*background: url(../imgs/common/leftArrow.png) no-repeat center center;*/
    background-size: 10px 10px;
}

.ui-datepicker-prev span.ui-icon {
    transform: rotateZ(180deg);
}

/* title */

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

.monthlyDateCheck {
    width: 100%;
    height: 30px;
    font-family: "CJ Onlyone Medium";
    margin-top: 10px;
}

.monthlyDateCheck>div {
    position: relative;
    height: 100%;
    line-height: 30px;
    padding: 0;
    text-align: left;
}

.monthlyDateCheck>div>div>div {
    float: left;
    margin-left: 10px;
}

.monthlyDateCheck>div>div>div:nth-child(1),
.monthlyDateCheck>div>div>div:nth-child(3) {
    display: block;
    width: 70px;
    float: left;
    text-align: center;
    font-size: 14px;
}

.monthlyDateCheck>div>div>div>select {
    width: 120px;
    height: 30px;
    text-align: left;
    float: left;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    padding-left: 7px;
    font-size: 14px;
    font-family: 'Noto Sans KR';
    cursor: pointer;
}

.monthlyDateCheck>div>div>div>input[type=text] {
    font-family: 'Arial';
    cursor: pointer;
}

.monthlyDateCheck>div>div>.dateSelect {
    width: 150px;
}

.v-input__prepend-outer {
    display: none;
}

.m_btn01 {
    position: absolute;
    top: 0px;
    right: 20px;
    width: 150px;
    height: 30px;
    font-size: 16px;
    padding-left: 0;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
}

.m_btn01:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

/*Table Select */
.monthlyTableSelectBox {
    width: 100%;
    height: 35px;
    margin-top: 50px;
}

.monthlyTableSelectBox>div>div {
    float: left;
    width: 190px;
    height: 35px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #99C5F2;
    cursor: pointer;
}

.monthlyTableSelectBox>div>div:nth-child(3) {
    width: 450px;
}

.monthlyTableSelectBox>div>div:nth-child(5) {
    width: 270px;
}

.monthlyTableSelectBox>div>div:nth-child(6) {
    width: 170px;
}

.monthlyTableSelectBox>div>div:hover span {
    background: #f9fcff;
    font-weight: bold;
}

.monthlyTableSelectBox>div>div>span {
    display: block;
    width: 170px;
    height: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: inherit;
    font-size: 14px;
    margin: 5px 0px 0px 5px;
    line-height: 30px;
    transition: all 0.3s;
    box-sizing: border-box;
    text-align: center;
}

.monthlyTableSelectBox>div>div:nth-child(3)>span {
    width: 430px;
}

.monthlyTableSelectBox>div>div:nth-child(5)>span {
    width: 250px;
}

.monthlyTableSelectBox>div>div:nth-child(6)>span {
    width: 150px;
}

/* Contents */

.con_tableWrap {
    width: 100%;
}

.con_table {
    height: 80px;
    background: #f9fcff;
    box-sizing: border-box;
    border: 1px solid #d7dadd;
}

.con_table>div {
    height: inherit;
    font-family: "CJ Onlyone Bold";
}

.con_table>div>div {
    line-height: 80px;
    box-sizing: border-box;
    border-right: 1px solid #d7dadd;
    font-size: 14px;
}

.con_table01>div>div:nth-child(3)>div,
.con_table01>div>div:nth-child(4)>div {
    height: 40px;
    line-height: 40px;
}

.con_table01>div>div:nth-child(3)>div>span {
    display: block;
    width: 33.33%;
    float: left;
}

.con_table01>div>div:nth-child(4)>div>span {
    display: block;
    width: 15%;
    float: left;
}

.con_table01>div>div:nth-child(4)>div>span:nth-child(5) {
    width: 40%;
}

.con_table01>div>div:nth-child(5) {
    line-height: 40px;
}

.con_table02>div>div>div {
    line-height: 40px;
    height: 50%;
}

.con_table02>div>div>div>span {
    width: 23%;
}

.con_table02>div>div>div>span:nth-child(4) {
    width: 31%;
}
</style>
