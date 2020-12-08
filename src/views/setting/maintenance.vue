<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner maintenanceInner">
            <div class="con mtConBox">
                <div class="con_box_right container-fluid">
                    <p>측정기별 유지보수 계약 정보</p>
                    <div class="maintenanceDateCheck container-fluid mt-3">
                        <b-row>
                            <b-col cols="7">
                                <div>날짜 선택 </div>
                                <div class="dateSelect">
                                    <!-- <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field :placeholder="currentDate" v-model="date" label="" prepend-icon=" mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title scrollable>
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
                            <b-col cols="5">
                                <input class="mt_btn01" type="button" v-on:click="getList" value="조회">
                                <input class="mt_btn02" type="button" v-on:click="excelBtn" value="엑셀 저장">
                            </b-col>
                        </b-row>
                    </div>
                    <div class="maintenancetableWrap text-center container-fluid">
                        <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions">
                        </ag-grid-vue>
                    </div>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
import Vue from "vue";
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'

// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

Vue.use(Datetime)
import store from '@/store/index';
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        AgGridVue
        // DatePicker,
        // BootstrapVue,
    },
    data() {
        return {
            mode: 'single',
            info: {},
            dateFr: '',
            currentDate: store.state.szCurMmFr,
            findTp: '',
            findSz: '',
            gridOptions: {},
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [
                // {
                //     field: 'serverKey',
                //     hidden: true
                // },
                // {
                //     field: 'equipmentKey',
                //     hidden: true
                // },
                // {
                //     field: 'sensorKey',
                //     hidden: true
                // },
                {
                    field: 'serverName',
                    headerName: '측정장소'
                },
                {
                    field: 'equipmentName',
                    headerName: '측정위치'
                },
                {
                    field: 'category',
                    headerName: '측정구분'
                },
                {
                    field: 'measurementDate',
                    headerName: '측정일시'
                },
                {
                    field: 'sensorName',
                    headerName: '센서명'
                },
                {
                    field: 'measurementValue',
                    headerName: '측정값',
                    width: '110px',
                    type: 'member'
                },
            ],
        }
    },
    computed: {},

    beforeMount() {
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
    },

    created() {
        this.getConditionList();
    },

    methods: {
        resetPageNo() {
            this.pageNo = 1;
        },
        getList() { //구매품의중인 자재목록
            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/measurements/measurementsList", {
                    // dateFr: this.dateFr,
                    currentDate: this.currentDate,
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
        },
        onPageChange(params) {
            this.pageNo = params.currentPage;
            this.getList();
        },
        onRowClick: function (obj) {
            console.log("onRowClck.obj = " + obj);
        },
        // 조회버튼 클릭
        searchBtn() {

        },
        // 엑셀저장버튼 클릭
        excelBtn() {
            this.gridOptions.api.exportDataAsExcel({});
        },
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

.mailInner,
.mailConBox {
    margin: 0 auto;
}

.con {
    width: 1550px;
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

.mailRPlus {
    position: absolute;
    top: 20px;
    right: 15px;
    width: 150px;
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

.mailRPlus:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
    text-decoration: none;
}

/* Top DateCheck , search and Excel Save*/
.maintenanceDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.maintenanceDateCheck>div>div>div {
    float: left;
    height: 100%;
}

.maintenanceDateCheck>div>div>div:nth-child(1) {
    width: 70px;
    font-size: 16px;
    line-height: 22px;
    margin-right: 10px;
}

.maintenanceDateCheck>div>div>div:nth-child(2),
.maintenanceDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.maintenanceDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
}

.maintenanceDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.mt_btn01,
.mt_btn02 {
    position: absolute;
    top: -15px;
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

.mt_btn01 {
    right: 190px;
}

.mt_btn02 {
    right: 20px;
}

.maintenanceDateCheck>div>div:nth-child(2)>input:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.dateSelect input {
    box-sizing: border-box;
    padding-left: 10px;
}

.v-input__prepend-outer {
    display: none;
}

/* Contents */
.con_table {
    height: 50px;
    border: 1px solid #d7dadd;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #f9fcff;
}

.con_table>div {
    height: inherit;
    line-height: 50px;
    font-family: "CJ Onlyone Bold";
}

.con_table>div>div {
    font-size: 18px;
}

.maintenanceInner .v-application p {
    margin-bottom: 0;
}
</style>
