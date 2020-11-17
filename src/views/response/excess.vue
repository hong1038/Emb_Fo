<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid">
                    <p>초과이력 대응</p>
                    <div class="excessDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-7">
                                <div>기간 선택 : </div>
                                <div class="dateSelect">
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div>
                                <div>~</div>
                                <div class="dateSelect dateSelectTo">
                                    <datetime type="date" v-model="dateTo" class="datetime"></datetime>
                                </div>
                            </div>
                            <div class="col-5">
                                <input type="button" class="e_btn01" value="조회" v-on:click="getList">
                                <input type="button" class="e_btn02" value="엑셀 저장" v-on:click="excelBtn">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="mt-4 container-fluid">
                        <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize">
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
        AgGridVue,
        // DatePicker,
        // BootstrapVue,
    },
    data() {
        return {
            busy:false,
            timeout : null,

            gridOptions: null,
            gridApi: null,
            columnApi: null,
            columnDefs: null,
            defaultColDef: null,
            rowData: null,

            config: {},
            mode: 'single', //날짜선택방법
            findTps: [{
                value: 'pnelNm',
                text: '판넬명'
            }],
            // dateFr: store.state.szCurMmFr,
            dateFr: "",
            // dateTo: store.state.szCurMmTo,
            dateTo: "",
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
        }
    },
    computed: {},

    beforeMount() {
        this.gridOptions = {};
        this.fields = [{
                    headerName: '측정일시',
                    field: 'actionDate',
                    type: 'leftAligned',
                    width: '120',
                },
                {
                    headerName: '측정장소',
                    field: 'serverName',
                    type: 'leftAligned',
                    width: '120',
                },
                {
                    headerName: '측정구분',
                    field: 'category',
                    width: '120',
                },
                {
                    headerName: '측정위치',
                    field: 'equipmentName',
                    wodth: '150',
                },
                {
                    headerName: '흡입구',
                    field: 'inlet',
                    width: '150',
                    colSpan: (params) => {
                        var inlet = params.data.inlet;
                        if (inlet === 'inlet') {
                            return 3;
                        } else {
                            return 1;
                        }
                    }
                },
                {
                    headerName: '배출구',
                    field: "outlet",
                    width: '150',
                },
                {
                    headerName: '처리효율',
                    field: 'procRate',
                    width: '120',
                },
                {
                    headerName: '원인',
                    field: 'cause',
                    width: '115',
                },
                {
                    headerName: '조치사항',
                    field: 'actionItem',
                    width: '170',
                },
                {
                    headerName: '조치여부',
                    field: 'actionCheck',
                    width: "120",
                },
                {
                    headerName: '완료일자',
                    field: 'endDate',
                    width: '120',
                },
            ],
            this.list = [{
                actionDate: '20.11.03',
                serverName: '인천1',
                category: '수질',
                equipmentName: '정문옥상',
                inlet: '30',
                outlet: '30',
                procRate: '90%',
                cause: '원인',
                actionItem: '조치사항',
                actionCheck: '조치여부',
                endDate: '20.11.03',

            }]
    },
    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
    },
    beforeDestroy() {
      this.clearTimeout()
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
            if (this.dateFr === null || this.dateTo === null || this.dateFr === "" || this.dateTo === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/response/excessList", {
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
                    serverList: store.state.ckServer,
                    pageNo: this.pageNo,
                    pageSz: this.perPage,
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

.excessDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.excessDateCheck>div>div>div {
    float: left;
    height: 100%;
}

.excessDateCheck>div>div>div:nth-child(1) {
    width: 70px;
    font-size: 16px;
    line-height: 22px;
    margin-right: 10px;
}

.excessDateCheck>div>div>div:nth-child(2),
.excessDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.excessDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
}

.excessDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.e_btn01,
.e_btn02 {
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

.e_btn01 {
    right: 190px;
}

.e_btn02 {
    right: 20px;
}

.e_btn01:hover,
.e_btn02:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}
</style>
