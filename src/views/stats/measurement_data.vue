<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex;">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>측정값 조회</p>
                    <div class="measurementDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-7">
                                <div>기간 선택</div>
                                <div class="dateSelect">
                                    <date-pick v-model="dateFr" :format="'YYYY-MM-DD'"></date-pick>
                                </div>
                                <div class="dash">~</div>
                                <div class="dateSelect dateSelectTo">
                                    <date-pick v-model="dateTo" :format="'YYYY-MM-DD'"></date-pick>
                                </div> 
                            </div>
                            <div class="col-5">
                                <input class="md_btn01" type="button" v-on:click="getList" value="조회">
                                <input class="md_btn02" type="button" v-on:click="excelBtn" value="엑셀 저장">
                            </div>
                        </div>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                    <div class="mt-4 container-fluid measurementGrid">
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
import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'

import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

//달력관련
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
    components: {
        Header,
        Left,
        AgGridVue,
        // vue,
        DatePick 
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
            paginationPageSize: store.state.paginationPageSize,
            gridOptions: {},
            dateFr: store.state.szCurMmFr,
            // dateFr: "",
            dateTo: store.state.szCurMmTo,
            // dateTo: "",
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [
                // {
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
                    width: '100px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'category',
                    headerName: '분야',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'internal_number',
                    headerName: '관리번호',
                    width: '80px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'internal_name',
                    headerName: '측정위치',
                    width: '160px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'sensor_name',
                    headerName: '센서목록',
                    width: '130px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'unit',
                    headerName: '단위',
                    width: '70px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'date_time',
                    headerName: '측정일시',
                    width: '110px',
                    cellStyle: {textAlign: 'center'}
                },
                {
                    field: 'sensor_data_value',
                    headerName: '측정값',
                    width: '80px',
                    type: 'number',
                    cellStyle: {textAlign: 'center'}
                },
            ],
        }
    },

    beforeMount() {
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
    },
    mounted(){

    },
    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        setTimeout(() => {
            this.gridOptions.api.sizeColumnsToFit()
        }, 1);
        //this.getList(); 여기서 실행하면 최초 실행시 -1일식 차감해서 검색일자가 설정되는 오류 발생됨.
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
            },300)
            // 시간 변경
        },
        onHidden() {
            // Return focus to the button once hidden
            // this.$refs.pin.focus()
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
            if (this.dateFr === null || this.dateTo === null || this.dateFr === "" || this.dateTo === "") {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            //console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/measurements/measurementsList", {
                    dateFr: this.dateFr,
                    dateTo: this.dateTo,
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
                            console.log(res.data.data)
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
    }
}
</script>

<style>
.ag-header-cell-label {
    justify-content: left;
}

.ag-theme-alpine-dark * {
    color: white;
}

* {
    margin: 0;
    padding: 0;
}

.con_box_right {
    box-sizing: border-box;
    position: relative;
}

.con_box_right>p {
    width: 400px;
    height: 50px;
    font-family: CjFontTitleBold;
    font-size: 24px;
    box-sizing: border-box;
    border-bottom: 5px solid rgb(172, 172, 172);
    padding-left: 10px;
    text-align: left;
}

/* Top DateCheck , search and Excel Save*/

.measurementDateCheck {
    width: 100%;
    height: 50px;
}

.measurementDateCheck>div>div>div {
    float: left;
}

.measurementDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.measurementDateCheck>div>div>.dateSelect {
    width: 150px;
    font-size: 14px;
}

.measurementDateCheck>div>div>.dateSelect input{
    font-size:16px;
    font-weight:bold;
}

.measurementDateCheck>div>div>.dash {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.measurementDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.measurementDateCheck .datePickerWrap{
    position:absolute;
    top:40px;
    left:10%;
    z-index:3;
}
/*datepicker css*/

.v-text-field {
    padding-top: 0;
    margin-top: 0;
}

.v-input__prepend-outer {
    display: none;
}

/*datepicker css*/

.md_btn01,
.md_btn02 {
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
    background:white;
    box-shadow: 0px 0px 3px blue;
    font-size: 16px;
}

.md_btn01 {
    right: 190px;
}

.md_btn02 {
    right: 20px;
}

.measurementDateCheck>div>div:nth-child(2)>input:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}

.measurementGrid .ag-header-cell-label {
   justify-content: center !important;
}
</style>
