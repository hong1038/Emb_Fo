<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>본부 월말 보고 통계</p>

                    <div class="hmtableSelectBox container-fluid">
                        <div>
                            <div>
                                <span>
                                    <router-link :to="{ name: 'headMonthly1'}">전체 통계</router-link>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <router-link :to="{ name: 'headMonthly2'}">유형별 통계</router-link>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <router-link :to="{ name: 'headMonthly3'}">문제점 / 이슈사항</router-link>
                                </span>
                            </div>
                            <div>
                                <span class="headMonthly_style04">
                                    <router-link :to="{ name: 'headMonthly4'}">이상점 및 비정상 대응 확인</router-link>
                                </span>
                            </div>
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
import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
import Main from '@/components/main.vue'
import 'vue-good-table/dist/vue-good-table.css'
import vue from 'vue'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        vue,
        Left,
        Main,
    },
    data() {
        return {
            checkList1: ["cloudmain", "인천1", "성남", "부산", "인천2", "논산", "인천냉동", "진천", "진안", "인천3", "안산", "공주", "남원"],
            selectWorkplace: "",
            date: ""
        }
    },
    watch: {
        selectWorkplace() {
            console.log(this.selectWorkplace)
        },
        date() {
            console.log(this.date)
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

/*  search and Excel Save*/

/*Table Select */
.hmtableSelectBox {
    width: 100%;
    height: 35px;
    margin-top: 15px;
}

.hmtableSelectBox>div>div {
    float: left;
    width: 130px;
    height: 35px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #99C5F2;
    cursor: pointer;
}

.hmtableSelectBox>div>div:nth-child(3) {
    width: 160px;
}

.hmtableSelectBox>div>div:nth-child(4) {
    width: 210px;
}

.hmtableSelectBox>div>div:hover span {
    background: #f9fcff;
    font-weight: bold;
}

.hmtableSelectBox>div>div>.headMonthly_style04 {
    background: #f9fcff;
    font-weight: bold;
}

.hmtableSelectBox>div>div>span {
    display: block;
    width: 110px;
    height: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: inherit;
    font-size: 14px;
    margin: 5px 0px 0px 5px;
    line-height: 30px;
    transition: all 0.3s;
    text-align: center;
}

.hmtableSelectBox>div>div:nth-child(3)>span {
    width: 140px;
}

.hmtableSelectBox>div>div:nth-child(4)>span {
    width: 190px;
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
