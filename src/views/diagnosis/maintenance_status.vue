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
                                    <div>일자 선택</div>
                                    <div class="dateSelect">
                                        <datetime type="date" v-model="dateFr" class="datetime"></datetime>
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
            
            checkedNames: [],
            checkList1: ["cloudmain", "인천1", "성남", "부산", "인천2", "논산", "인천냉동", "진천", "진안", "인천3", "안산", "공주", "남원"],
            checkList2: ["악취", "대기", "수질"],
            checkList3: ["정문옥상", "기숙사 옥상", "수질보전장", "흡입구", "배출구", "굴뚝#1", "배출구", "흡입구", "new equipment", "인천1-1", "인천1-2", "발효대두박 전단", "발효대두박 후단", "추출 A 전단", "추출 A 후단", "추출 A 전단", "추출 A 후단", "대두박 전단", "대두박 후단", "흡입구", "부지경계선", "중간", "배출구", "설비제어", "중간", "배출구", "폐수처리장 흡입구", "폐수처리장 배출구", ],
            checkList4: ["odor", "voc", "h2s", "nh3", "습도", "온도", "ch1", "정문옥상", "정문옥상 풍향", "정문옥상 풍속", "odor", "voc", "h2s", "nh3", "온도", "습도", "ch1", "기숙사 옥상", "기숙사옥상 풍향", "기숙사옥상 풍속", "odor", "voc", "h2s", "nh3", "습도", "온도", "ch1", "수질보전장", "수질보전장 풍향", "수질보전장 풍속", "TOC", "원수 TOC", "ODOR", "VOC", "H2S", "NH3", "온도", "배출구", "ODOR", "VOC", "H2S", "NH3", "온도", "흡입구", "ODOR", "VOC", "H2S", "NH3", "온도", "온도2", "습도", "배출구", "ODOR", "VOC", "H2S", "NH3", "온도", "온도2", "습도", "흡입구", "황화수소", "암모니아", "총휘발성유기화합물", "복합악취", "황화수소", "암모니아", "총휘발성유기화합물", "복합악취", "황화수소", "암모니아", "총휘발성유기화합물", "추출A전단 복합악취", "황화수소", "암모니아", "총휘발성유기화합물", "추출A후단 복합악취", "NH3 추출 A 전단", "H2S 추출A전단", "NH3 추출A전단", "TVOC 추출A전단", "OU 추출A전단", "H2S 추출A후단", "NH3 추출A후단", "TVOC 추출A후단", "OU 추출A후단", "H2S 대두박전단", "NH3 대두박전단", "TVOC 대두박전단", "OU 대두박전단", "H2S 대두박후단", "NH3 대두박후단", "TVOC 대두박후단", "OU 대두박후단", "흡1", "흡2", "흡3", "흡4", "흡입구", "흡입구", "부1", "부2", "부3", "부4", "부지경계선", "중1", "중2", "중3", "중4", "중11", "배1", "전류 풍향", "전류 풍속", "배2", "배3", "배4", "3", "4", "배출구 배수", "중1", "중2", "중3", "중4", "2H LAMP", "배1", "풍속", "풍향", "배2", "배3", "배4", "배출구", "S-CUBE 배출구", "S-CUBE배출구", "odor", "voc", "h2s", "nh4", "온도", "폐수처리장 흡입구", "odor", "voc", "h2s", "nh3", "온도", "폐수처리장 배출구", ],
            checkListVal1: [],
            checkListVal2: [],
            checkListVal3: [],
            checkListVal4: [],

            gridOptions:{},
            config: {},
            mode: 'single', //날짜선택방법
            findTps: [{
                value: 'pnelNm',
                text: '판넬명'
            }],
            // dateFr: store.state.szCurDt,
            dateFr: "",
            findTp: '',
            findSz: '',
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
                    headerName: '측정장소',
                    width: '250px'
                },
                {
                    field: 'equipmentName',
                    headerName: '측정위치',
                    width: '250px'
                },
                {
                    field: '',
                    headerName: '유지보수 계약여부',
                    width: '300px'
                },
                {
                    field: '',
                    headerName: '유지보수 계획 및 실적',
                    width: '300px'
                },
                {
                    field: '',
                    headerName: '특이사항',
                    width: '250px'
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
    height: 100%;
}

.msDateCheck>div>div>div:nth-child(1) {
    width: 70px;
    font-size: 16px;
    line-height: 22px;
    margin-right: 10px;
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
</style>
