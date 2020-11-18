<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>월간 방지시설 통계</p>
                    <div class="pdmDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-3">
                                <div>날짜 선택</div>
                                <!-- <input type="date" class="" v-model="dateFr"> -->
                                <div class="dateSelect">
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
                            <div class="col-9">
                                <input type="button" class="pdm_btn01" value="조회" v-on:click="getList">
                                <input type="button" class="pdm_btn02" value="엑셀 저장" v-on:click="excelBtn">
                                <input type="button" class="pdm_btn03" value="그래프" v-on:click="graphBtn">
                            </div>
                        </div>

                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="container-fluid mt-4">
                        <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list"  :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize">
                        </ag-grid-vue>
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
import Vue from "vue";

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"
import 'ag-grid-enterprise';
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Datetime)
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        AgGridVue
        // BootstrapVue,
    },
    computed: {
        currentDate() {
            let s = new Date().toLocaleDateString().slice(0, 8);
            return s;
        }
    },
    data() {
        return {
            busy:false,
            timeout : null,

            config: {},
            mode: 'single', //날짜선택방법
            findTps: [{
                value: 'pnelNm',
                text: '판넬명'
            }],
            gridOptions:{},
            dateFr: '',
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [
                // { //
                //     field: 'server_key',
                //     hidden: true
                // },
                // {
                //     field: 'equipment_key',
                //     hidden: true
                // },
                // {
                //     field: 'sensor_key',
                //     hidden: true
                // },
                {
                    field: 'server_name',
                    headerName: '측정장소',
                    width: '230px'
                },
                {
                    field: 'category',
                    headerName: '측정구분',
                    width: '230px'
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '230px'
                },
                // {
                //     //측정항목
                // },
                {
                    field: 'date_tm',
                    headerName: '측정시각',
                    width: '200px'
                },
                {
                    field: 'min_val',
                    headerName: '최소',
                    width: '200px'
                },
                {
                    field: 'measurement_avg_value',
                    headerName: '평균',
                    width: '200px'
                },
                {
                    field: 'max_val',
                    headerName: '최대',
                    width: '200px'
                },

                // {
                //     //배출구 - 최대, 평균, 최소
                // },
                // {
                //     //처리효율
                // },
            ],
        }
    },
    beforeDestroy() {
      this.clearTimeout()
    },

    beforeMount() {
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
    },
    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        //this.getList(); 여기서 실행하면 최초 실행시 -1일식 차감해서 검색일자가 설정되는 오류 발생됨.
    },

    watch: {
        dateSelect() {
            console.log(this.dateSelect)
        }
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
        
        resetPageNo() {
            this.pageNo = 1;
        },
        getList() {
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            if (store.state.ckCate.length == 0) {
                alert("분야는 필수 선택 항목 입니다.")
                return;
            }
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }
            this.onClick();

            let that = this;
            //console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/stat/preventionDataByMonList", {
                    dateFr: this.dateFr,
                    serverList: store.state.ckServer,
                    cateList: store.state.ckCate,
                    equipList: store.state.ckEquip,
                    sensorList: store.state.ckSensor,
                    findTp: this.findTp,
                    findSz: this.findSz,
                    pageNo: this.pageNo,
                    pageSz: 10000,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.list = res.data.data
                            that.listCount = res.data.totalCount
                        }
                    }
                })
                .catch(err => {
                    alert("월간방지시설목록 추출 실패 \n" + err);
                })
        },
        onPageChange(params) {
            this.pageNo = params.currentPage;
            this.getList();
        },
        onRowClick: function (obj) {
            console.log("onRowClck.obj = " + obj);
        },
        // 엑셀저장버튼 클릭
        excelBtn() {
            this.gridOptions.api.exportDataAsExcel({});
        },
        // 그래프버튼 클릭
        graphBtn() {

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
    /* background: url(../imgs/common/leftArrow.png) no-repeat center center; */
    background-size: 10px 10px;
}

.ui-datepicker-prev span.ui-icon {
    transform: rotateZ(180deg);
}

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

/* Top DateCheck , search and Excel Save*/

.pdmDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.pdmDateCheck>div>div>div {
    float: left;
    height: 100%;
}

.pdmDateCheck>div>div>div:nth-child(1) {
    width: 70px;
    font-size: 16px;
    line-height: 32px;
}

.pdmDateCheck>div>div>div:nth-child(2),
.pdmDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.pdmDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
}

.pdmDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.pdm_btn01,
.pdm_btn02,
.pdm_btn03 {
    position: absolute;
    top: 0;
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

.pdm_btn01 {
    right: 360px;
}

.pdm_btn02 {
    right: 190px;
}

.pdm_btn03 {
    right: 20px;
}

.pdm_btn01:hover,
.pdm_btn02:hover,
.pdm_btn03:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.dateSelect input {
    box-sizing: border-box;
    padding-left: 10px;
}
</style>
