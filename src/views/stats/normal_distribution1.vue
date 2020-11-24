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
                            <div class="col-5">
                                <div class="float-left" style="width:60px; font-size:14px; line-height:30px;">월 선택</div>
                                <!-- <input type="date" v-model="dateFr"> -->
                                <div class="dateSelect float-left">
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
                                    <!-- <datetime type="date" v-model="dateFr" class="datetime"></datetime> -->
                                </div>

                            </div>
                            <div class="col-5">
                                <input class="nd_btn01" type="button" v-on:click="getList" value="조회">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="canvasWrap canvasLoc container-fluid mt-3">
                        <b-row>
                            <b-col cols="4">
                                <canvas></canvas>
                            </b-col>
                            <b-col cols="4">
                                <canvas></canvas>
                            </b-col>
                            <b-col cols="4">
                                <canvas></canvas>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="4">
                                <canvas></canvas>
                            </b-col>
                            <b-col cols="4">
                                <canvas></canvas>
                            </b-col>
                            <b-col cols="4">
                                <canvas></canvas>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="4">
                                <canvas></canvas>
                            </b-col>
                            <b-col cols="4">
                                <canvas></canvas>
                            </b-col>
                            <b-col cols="4">
                                <canvas></canvas>
                            </b-col>
                        </b-row>
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
// import Datetime from 'vue-datetime'
// import 'vue-datetime/dist/vue-datetime.css'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(Datetime)
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
    height:50%;
}

.canvasWrap>div canvas{
    width:100%;
    height:200px;
    outline:1px solid;
}

</style>
