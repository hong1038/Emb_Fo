<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <div class="inner settingInner">
            <div class="con">
                <div class="con_box_right settingConBox container-fluid float-left">
                    <p>측정기별 기준 정보 등록</p>
                    <router-link :to="{ name: 'measurement'}" class="measurementSave">저장</router-link>
                    <router-link :to="{ name: 'measurement'}" class="measurementList">목록</router-link>
                    <div class="mt-4 text-center container-fluid measurementRegister">
                        <div class="leftBox">
                            <div>
                                <div>사업장</div>
                                <div>
                                    <b-form-select v-model="findTp" :options="findTps" size="sm"></b-form-select>
                                </div>
                            </div>
                            <div>
                                <div>측정위치</div>
                                <div>
                                    <b-form-select v-model="findTp" :options="findMeasureLoc" size="sm"></b-form-select>
                                </div>
                            </div>
                            <div>
                                <div>분야</div>
                                <div>
                                    <b-form-select v-model="findTp" :options="findType" size="sm"></b-form-select>
                                </div>
                            </div>
                            <div>
                                <div>시설분류</div>
                                <div>
                                    <b-form-select v-model="findTp" :options="findFac" size="sm"></b-form-select>
                                </div>
                            </div>
                            <div>
                                <div>위치분류</div>
                                <div>
                                    <b-form-select v-model="findTp" :options="findLoc" size="sm"></b-form-select>
                                </div>
                            </div>
                            <div class="line1-box">
                                <div class="line1">분석항목</div>
                                <div>
                                    <input type="checkbox" name="check01" value="1">
                                    <label for="check01">odor</label>
                                    <input type="checkbox" name="check01" value="1">
                                    <label for="check01">배수</label>
                                </div>
                            </div>
                        </div>
                        <div class="rightBox">
                            <div>
                                <div>법적기준</div>
                                <div>
                                    <b-form-input type="text" size="sm"></b-form-input>
                                </div>
                            </div>
                            <div>
                                <div>관리기준</div>
                                <div>
                                    <b-form-input type="text" size="sm"></b-form-input>
                                </div>
                            </div>
                            <div>
                                <div>단위</div>
                                <div>
                                    <b-form-input type="text" size="sm"></b-form-input>
                                </div>
                            </div>
                            <div>
                                <div>내부명칭</div>
                                <div>
                                    <b-form-input type="text" size="sm"></b-form-input>
                                </div>
                            </div>
                            <div>
                                <div>공정명</div>
                                <div>
                                    <b-form-input type="text" size="sm"></b-form-input>
                                </div>
                            </div>
                            <div>
                                <div class="line2">악취방지시설<br>고유일련번호</div>
                                <div>
                                    <b-form-input type="text" size="sm"></b-form-input>
                                </div>
                            </div>
                            <div>
                                <div>내부관리번호</div>
                                <div>
                                    <b-form-input type="text" size="sm"></b-form-input>
                                </div>
                            </div>
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
.settingInner,
.settingConBox {
    margin: 0 auto;
}

.con_box_right {
    box-sizing: border-box;
    font-family: "CJ Onlyone Medium";
    position: relative;
}

.con_box_right>p {
    width: 500px;
    height: 50px;
    font-family: "CJ Onlyone Bold";
    font-size: 24px;
    box-sizing: border-box;
    border-bottom: 5px solid rgb(172, 172, 172);
    padding-left: 10px;
    text-align: left;
}

.measurementSave,
.measurementList {
    position: absolute;
    top: 20px;
    width: 100px;
    height: 40px;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
    font-size: 14px;
    text-decoration: none;
    line-height: 40px;
    text-align: center;
    color: black;
}

.measurementSave {
    right: 120px;
}

.measurementList {
    right: 15px;
}

.measurementSave:hover,
.measurementList:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
    text-decoration: none;
}

/*  search and Excel Save*/

/*Table Select */

.measurementRegister {
    height: 490px;
    border: 1px solid #d7dadd;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #f9fcff;
}

.measurementRegister>div {
    float: left;
    width: 50%;
}

.measurementRegister>.rightBox {
    border-left: 1px solid #ccc;
}

.measurementRegister>div>div {
    height: inherit;
    line-height: 70px;
    font-family: "CJ Onlyone Bold";
}

.measurementRegister>div>div>div {
    font-size: 18px;
}

.measurementRegister>div>div {
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
}

.measurementRegister>div>div:last-child {
    border-bottom: none;
}

.measurementRegister .line1-box {
    height: 140px;
}

.measurementRegister .line1-box input {
    width: 15px;
    height: 15px;
    margin-left: 20px;
}

.measurementRegister .line1-box input+label {
    padding-left: 10px;
}

.measurementRegister .line1 {
    line-height: 140px;
}

.measurementRegister .line2 {
    line-height: 35px;
}

.measurementRegister>div>div>div {
    float: left;
    width: 30%;
    height: 100%;
}

.measurementRegister>div>div>div:nth-child(2) {
    width: 70%;
}

.measurementRegister>div>div>div>input,
.measurementRegister>div>div>div>select {
    width: 70%;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 7px;
    font-size: 14px;
}
</style>
