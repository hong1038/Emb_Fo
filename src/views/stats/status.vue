<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex;">
        <Left></Left>
        <div class="inner">
            <div class="con">
                <div class="con_box_right container-fluid">
                    <p>현황</p>
                    <div class="statusDateCheck container-fluid mt-4">
                        <div class="row">
                            <div class="col-7">
                                <div>연도 선택</div>
                                <v-date-picker value="range" is-range />
                                <div class="dateSelect">
                                    <!--<datetime type="year" v-model="dateFr" class="datetime"></datetime>-->
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dateFr" transition="scale-transition" offset-y max-width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="dateSelect" label="" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker ref="picker" type="year" v-model="dateSelect" no-title scrollable @click:year="saveYear" locale="ko">
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="saveYear">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu> 
                                </div>
                            </div>
                            <div class="col-5">
                                <input class="ss_btn01" type="button" v-on:click="getList" value="조회">
                                <input class="ss_btn02" type="button" v-on:click="excelBtn" value="엑셀 저장">
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

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

Vue.use(Datetime)

// //달력관련
// //import DatePicker from "v-calendar/lib/components/date-picker.umd"

export default {
    components: {
        Header,
        Left,
        AgGridVue,
        // vue,
        // DatePicker  
    },
    data() {
        return {
            busy:false,
            timeout : null,

            config: {},
            mode: 'single', //날짜선택방법

            paginationPageSize: store.state.paginationPageSize,
            gridOptions: {},
            dateFr: store.state.curYFr,
            dateSelect: store.state.curYFr,
            // dateFr: "",
            findTp: '',
            findSz: '',
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [
                {
                    field: 'area',
                    headerName: '권역',
                    width: '80px'
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '100px'
                },
                {
                    field: '',
                    headerName: '악취 측정기',
                    children : [
                        {
                            filed:'t_odor_nb',
                            headerName : '수량',
                            width:'80'
                        },
                        {
                            filed :'odor_nb',
                            headerName : '유지보수 계약 관리 수량',
                            width : '190'
                        },
                        {
                            filed : '',
                            headerName : '계약율(%)',
                            width:'110'
                        }
                    ]
                },
                {
                    field: '',
                    headerName: '수질 측정기',
                    children : [
                        {
                            filed:'t_water_nb',
                            headerName : '수량',
                            width:'80'
                        },
                        {
                            filed :'water_nb',
                            headerName : '유지보수 계약 관리 수량',
                            width : '190'
                        },
                        {
                            filed : '',
                            headerName : '계약율(%)',
                            width:'110'
                        }
                    ]
                },
                {
                    field: '',
                    headerName: '대기 측정기',
                    children : [
                        {
                            filed:'t_air_nb',
                            headerName : '수량',
                            width:'80'
                        },
                        {
                            filed :'air_nb',
                            headerName : '유지보수 계약 관리 수량',
                            width : '190'
                        },
                        {
                            filed : '',
                            headerName : '계약율(%)',
                            width:'110'
                        }
                    ]
                },
                {
                    field: '',
                    headerName: '합계',
                    children : [
                        {
                            filed:'',
                            headerName : '수량',
                            width:'80'
                        },
                        {
                            filed :'',
                            headerName : '유지보수 계약 관리 수량',
                            width : '190'
                        },
                        {
                            filed : '',
                            headerName : '계약율(%)',
                            width:'110'
                        }
                    ]
                },
                
            ],
        }
    },

//     beforeMount() {
//         store.state.ckServer = [];
//         store.state.ckCate = [];
//         store.state.ckEquip = [];
//         store.state.ckSensor = [];
//     },

//     created() {
//         this.config = {
//             headers: {
//                 "authorization": this.$Axios.defaults.headers.common["authorization"]
//             }
//         }
//         setTimeout(() => {
//             this.gridOptions.api.sizeColumnsToFit()
//         }, 1);
//         //this.getList(); 여기서 실행하면 최초 실행시 -1일식 차감해서 검색일자가 설정되는 오류 발생됨.
//     },

//     beforeDestroy() {
//       this.clearTimeout()
//     },

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
            if (this.dateFr === null || this.dateFr === "" ) {
                alert("날짜를 선택해주세요.")
                return;
            }

            this.onClick();

            let that = this;
            //console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/stat/contactCount", {
                    dateFr: this.dateFr,
                    serverList: store.state.ckServer,
                    pageNo: this.pageNo,
                    pageSz: store.state.pagepaginationPageSize,
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
//         onRowClick: function (obj) {
//             console.log("onRowClck.obj = " + obj);
//         },
//         // 엑셀저장버튼 클릭
//         excelBtn() {
//             this.gridOptions.api.exportDataAsExcel({});
//         },
//         // 그래프버튼 클릭
//         graphBtn() {

//         }
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

.statusDateCheck {
    width: 100%;
    height: 50px;
}

.statusDateCheck>div>div>div {
    float: left;
}

.statusDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.statusDateCheck>div>div>div:nth-child(2),
.statusDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
}

.statusDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.statusDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
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

.ss_btn01,
.ss_btn02 {
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

.ss_btn01 {
    right: 190px;
}

.ss_btn02 {
    right: 20px;
}

.statusDateCheck>div>div:nth-child(2)>input:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}
</style>
