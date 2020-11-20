<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>일간 방지시설 통계</p>
                    <div class="pddDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-3">
                                <div>날짜 선택</div>
                                <!-- <input type="date" class="" v-model="dateFr"> -->
                                <div class="dateSelect">
                                    <!-- <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dateFr" transition="scale-transition" offset-y min-width="290px">
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
                                    <datetime type="date" v-model="dateFr" :placeholder="cureentDate" class="datetime"></datetime>
                                </div>
                            </div>
                            <div class="col-9">
                                <input type="button" class="pdd_btn01" value="조회" v-on:click="getList">
                                <input type="button" class="pdd_btn02" value="엑셀 저장" v-on:click="excelBtn">
                                <input type="button" class="pdd_btn03" value="그래프" v-on:click="graphBtn">
                            </div>
                        </div>

                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="container-fluid mt-4">
                        <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list" :pagination="true" :gridOptions="gridOptions"  :paginationPageSize="paginationPageSize">
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
import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Datetime)
export default {
    components: {
        Header,
        Left,
        AgGridVue,
        // vue,
        // DatePicker,
    },
    computed: {
        // currentDate() {
        //     let s = new Date().toLocaleDateString();
        //     return s;
        // }
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
            dateFr: '',
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            paginationPageSize: store.state.paginationPageSize,
            gridOptions: {},

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
                    headerName: '사업장',
                    width: '200px'
                },
                {
                    field: 'category',
                    headerName: '분야',
                    width: '180px'
                },
                {
                    field: 'equipment_name',
                    headerName: '측정위치',
                    width: '200px'
                },
                {
                    field: 'prevention_date',
                    headerName: '측정일시',
                    width: '180px'
                },
                {
                    headerName: '흡입구',
                    children: [{
                            field: 'inlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '100px'
                        },
                        {
                            field: 'inlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '100px'
                        },
                        {
                            field: 'inlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '100px'
                        },
                    ]
                },
                {
                    field: 'inlet_min_value',
                    headerName: '배출구',
                    children: [{
                            field: 'outlet_avg_value',
                            headerName: '평균',
                            type: 'number',
                            width: '100px'
                        },
                        {
                            field: 'outlet_max_value',
                            headerName: '최대',
                            type: 'number',
                            width: '100px'
                        },
                        {
                            field: 'outlet_min_value',
                            headerName: '최소',
                            type: 'number',
                            width: '100px'
                        },
                    ]
                },
                {
                    field: 'proc_rate',
                    headerName: '처리효율',
                    type: 'number',
                    width: '146px'
                },
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

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/stat/preventionDataByDayList", {
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

.con .con_box_right {
    width: 100%;
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

/* Top pddDateCheck , search and Excel Save*/

.pddDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.pddDateCheck>div {
    position: relative;
    height: 100%;
    line-height: 30px;
    text-align: left;
}

.pddDateCheck>div>div>div {
    float: left;
}

.pddDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
    line-height: 32px;
}

.pddDateCheck>div>div>div:nth-child(2) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.pddDateCheck>div>div:nth-child(2)>input {
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

/*datepicker css*/
.dateSelect {
    float: left;
    width: 120px;
}

.dateSelect input {
    font-family: "Arial";
}

.v-text-field {
    padding-top: 0;
    margin-top: 0;
}

.v-input__prepend-outer {
    display: none;
}

/*datepicker css*/

.pdd_btn01 {
    right: 360px;
}

.pdd_btn02 {
    right: 190px;
}

.pdd_btn03 {
    right: 20px;
}

.pddDateCheck>div>div:nth-child(2)>input:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.dateSelect input {
    box-sizing: border-box;
    padding-left: 10px;
}

.ag-header-group-text{
    display:block;
    margin:0 auto;
    font-size:14px;
}
</style>
