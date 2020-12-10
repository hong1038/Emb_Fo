<template>
<b-container fluid>
    <div class="inner">
        <Header></Header>
        <div style="display:flex">
            <Left></Left>
            <div class="inner">
                <div class="con">
                    <div class="con_box_right container-fluid">
                        <p>측정기 유지보수 계약 및 실행 현황</p>
                        <div class="msDateCheck container-fluid mt-4">
                            <div class="row">
                                <div class="col-7">
                                    <div class="float-left">월 선택</div>
                                    <div class="dateSelect float-left">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dateFr" transition="scale-transition" offset-y max-width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="dateSelect" label="" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker ref="picker" v-model="dateSelect" no-title scrollable @click:year="saveYear" locale="ko">
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                <!-- <v-btn text color="primary" @click="saveYear">OK</v-btn> -->
                                            </v-date-picker>
                                        </v-menu>               
                                        <!-- <datetime type="date" v-model="dateFr" class="datetime"></datetime> -->
                                    </div>
                                </div>
                                <div class="col-5">
                                    <input type="button" class="ms_btn01" value="조회" v-on:click="getList">
                                    <input type="button" class="ms_btn02" value="엑셀 저장" v-on:click="excelBtn">
                                </div>
                            </div>
                        </div>
                        <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                        <div class="mt-4 text-center container-fluid">
                            <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list" :pagination="true" :gridOptions="gridOptions" :paginationPageSize="paginationPageSize">
                            </ag-grid-vue>
                        </div>
                        </b-overlay>
                    </div>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
import store from "@/store/index";
import Vue from "vue";
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Datetime)
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        Vue,
        AgGridVue
        // DatePicker,
        // BootstrapVue,
    },
    data() {
        return {
            busy:false,
            timeout : null,

            gridOptions:{},
            config: {},
            mode: 'single', //날짜선택방법
            
            dateFr: '',
            dateTo: '',
            
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,

            dateSelect:'',
            menu:false,

            pageNo: 1,
            perPage: 10,
            fields: [
                {
                    field: '',
                    headerName: '사업장',
                    width: '120px'
                },
                {
                    field: 'equipmentName',
                    headerName: '측정위치',
                    width: '140px'
                },
                {
                    field: '',
                    headerName: '유지보수 계약여부',
                    width: '170px'
                },
                {
                    headerName: '유지보수 계획 및 실적(계획/실적)',
                    children: [{
                            field: '',
                            headerName: '1월',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: '',
                            headerName: '2월',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: '',
                            headerName: '3월',
                            type: 'number',
                            width: '80'
                        },
                        {
                            field: '',
                            headerName: '4월',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: '',
                            headerName: '5월',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: '',
                            headerName: '6월',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: '',
                            headerName: '7월',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: '',
                            headerName: '8월',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: '',
                            headerName: '9월',
                            type: 'number',
                            width: '80px'
                        },
                        {
                            field: '',
                            headerName: '10월',
                            type: 'number',
                            width: '90px'
                        },
                        {
                            field: '',
                            headerName: '11월',
                            type: 'number',
                            width: '90px'
                        },
                        {
                            field: '',
                            headerName: '12월',
                            type: 'number',
                            width: '90px'
                        },
                        {
                            field: '',
                            headerName: '합계',
                            type: 'number',
                            width: '80px'
                        },
                    ]
                },

            ],
        }
    },
    computed: {

    },
    beforeDestroy() {
      this.clearTimeout()
    },

    beforeMount() {

    },
    created() {
        // this.config = {
        //   headers : { "authorization" : this.$Axios.defaults.headers.common["authorization"] }
        // }
        this.getRootCodeList();
    },


    watch: {
        menu (val) {
            console.log(val)
            val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
    },

    methods: {

        saveYear(year) {
            console.log(this.$refs.menu,year)
            this.dateSelect = year
            this.$refs.menu.save(year)
            // Reset activePicker to type YEAR
            this.$refs.picker.activePicker = 'YEAR'

            // Close the menu/datepicker
            this.menu = false
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
        resetPageNo() {
            this.pageNo = 1;
        },
        getList() { //구매품의중인 자재목록
            if (store.state.ckServer.length == 0) {
                alert("사업장은 필수 선택 항목 입니다.")
                return;
            }
            if (this.dateFr === null || this.dateFr === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/measurements/measurementsList", {
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
                    alert("센서테이터목록 추출 실패 \n" + err);
                })
                this.busy = false;
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
.msDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.msDateCheck>div>div>div {
    float: left;
}

.msDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.msDateCheck>div>div>div:nth-child(2),
.msDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.msDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.msDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.ms_btn01,
.ms_btn02 {
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

.ms_btn01 {
    right: 190px;
}

.ms_btn02 {
    right: 20px;
}

.ms_btn01:hover,
.ms_btn02:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.ag-header-group-text{
    display:block;
    margin:0 auto;
    font-size:14px;
}
</style>
