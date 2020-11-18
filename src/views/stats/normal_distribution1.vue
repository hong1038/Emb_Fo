<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>정규분포</p>
                    <div class="selectBox container-fluid mt-2 pl-3">
                        <div class="row">
                            <p class="float-left select01">
                                <router-link :to="{ name: 'normalDistribution1'}">위치별 정규분포</router-link>
                            </p>
                            <p class="float-left">
                                <router-link :to="{ name: 'normalDistribution2'}">월별 정규분포</router-link>
                            </p>
                            <div class="distri_dateCheck float-left">
                                <div class="float-left">
                                    <div>기간 선택 : </div>
                                    <div class="dateSelect">
                                        <datetime type="date" v-model="dateFr" :placeholder="cureentDate" class="datetime"></datetime>
                                    </div>
                                    <div>~</div>
                                    <div class="dateSelect dateSelectTo">
                                        <datetime type="date" v-model="dateTo" :placeholder="cureentDate" class="datetime"></datetime>
                                    </div>
                                </div>
                                <input type="button" class="nd_btn01" value="조회" v-on:click="getList">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="canvasWrap canvasLoc container-fluid mt-3">

                    </div>
                    <div class="canvasWrap canvasMon container-fluid mt-3">

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
import Vue from 'vue'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"
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
        // BootstrapVue,
    },
    data() {
        return {
            busy:false,
            timeout : null,

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

            date: new Date(),
            StDate: "",
            EdDate: "",

        }
    },
    watch: {
        StDate() {
            console.log(this.StDate)
        },
        EdDate() {
            console.log(this.EdDate)
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
        getList(){
            console.log()
        },
        // 조회버튼 클릭
        searchBtn() {
            console.log()
        },
        // 엑셀저장버튼 클릭
        excelBtn() {
            console.log()
        },
        // 그래프버튼 클릭
        graphBtn() {
            console.log()
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

/* datePicker */

.ui-datepicker {
    width: 250px;
    height: 280px;
    margin-top: 5px;
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

/* Top distri_dateCheck , search and Excel Save*/

.distri_dateCheck {
    width: 680px;
    height: 30px;
    font-family: "CJ Onlyone Medium";
    margin-left: 450px;
    margin-top: 20px;
    position: relative;
}

.distri_dateCheck>div {
    position: relative;
    height: 100%;
    line-height: 30px;
    padding: 0;
}

.distri_dateCheck>div>div {
    float: left;
    height: 100%;
}

.distri_dateCheck>div>div:nth-child(1) {
    width: 100px;
    font-size: 16px;
    line-height: 32px;
}

.distri_dateCheck>div>div:nth-child(2),
.distri_dateCheck>div>div:nth-child(4) {
    width: 150px;
}

.distri_dateCheck>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
}

.distri_dateCheck>div>div input {
    width: 150px;
    box-sizing: border-box;
    font-size: 14px;
}

.distri_dateCheck>.nd_btn01 {
    position: absolute;
    top: 0;
    right: 0px;
    width: 120px;
    height: 100%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
    line-height: 30px;
    font-size: 14px;
}

.distri_dateCheck>.nd_btn01:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.distri_dateSelect {
    width: 150px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
}

.distri_dateSelect:before {
    content: "";
    position: absolute;
    top: 0;
    left: 160px;
    width: 0px;
    height: 41px;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    transform-origin: center;
    transition: all 0.2s;
}

.distri_dateSelectTo:before {
    left: 340px;
}

.distri_dateSelect:hover:before {
    transform-origin: center;
    border-bottom: 3px solid black;
    width: 150px;
    left: 95px;
}

.distri_dateSelectTo:hover:before {
    left: 265px;
}

.distri_dateSelect>div {
    width: 100%;
    height: 100%;
}

.distri_dateSelect>div>input {
    width: 100%;
    height: 100%;
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

.selectBox {
    height: 50px;
    padding-left: 0;
}

.selectBox>div>p {
    position: relative;
    width: 190px;
    height: inherit;
    line-height: 50px;
    font-size: 16px;
    background: rgb(232, 232, 232);
    text-align: center;
    font-family: "CJ Onlyone Medium";
    transition: all 0.3s;
}

.selectBox>div>p:nth-child(1) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.selectBox>div>p:nth-child(2) {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.selectBox>div>p>a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
}

.selectBox>div>p::before {
    content: "";
    position: absolute;
    top: 10px;
    width: 30px;
    height: 30px;
    background: rgb(232, 232, 232);
    background-size: 100% 100%;
    transition: all 0.3s;
}

.selectBox>div>.select01 {
    background: rgb(81, 81, 255);
    font-weight: bold;
    width: 190px;
}

.selectBox>div>.select01>a {
    color: white;
}

.selectBox>div>p:nth-child(1)::before {
    transform: rotate(225deg);
    right: -15px;
}

.selectBox>div>p:nth-child(2)::before {
    transform: rotate(45deg);
    left: -15px;
}

.selectBox>div>p:hover {
    background: rgb(81, 81, 255);
    font-weight: bold;
}

.selectBox>div>p:hover a {
    color: white;
}

.canvasWrap {
    box-sizing: border-box;
    border-top: 2px solid #ccc;
    padding: 0;
}
</style>
