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
                                    <datetime type="date" v-model="dateFr" class="datetime"></datetime>
                                </div>
                            </b-col>
                            <b-col cols="5">
                                <input class="mt_btn01" type="button" v-on:click="getList" value="조회">
                                <input class="mt_btn02" type="button"  v-on:click="addOn" value="등록">
                                <input class="mt_btn03" type="button" v-on:click="excelBtn" value="엑셀 저장">
                            </b-col>
                        </b-row>
                    </div>
                    <b-overlay :show="busy" rounded opacity="0.7" spinner-variant="primary" @hidden="onHidden">
                        <div class="mt-4 container-fluid">
                            <ag-grid-vue style="width: 100%; height: 650px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions">
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
            dateFr: store.state.szCurMmTo,
            findTp: '',
            findSz: '',
            gridOptions: {},
            list: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,

            busy:false,

            fields: [
                {
                    field: 'server_name',
                    headerName: '사업장'
                },
                {
                    field: 'equipment_inner_nm',
                    headerName: '측정위치'
                },
                {
                    field: 'category_cd',
                    headerName: '구분'
                },
                {
                    field: 'facility',
                    headerName: '시설분류'
                },
                {
                    field: 'place_nm',
                    headerName: '위치분류'
                },
                {
                    field: 'contact_yn',
                    headerName: '계약여부',
                    width: '110px',
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
        setTimeout(() => {
            this.gridOptions.api.sizeColumnsToFit()
        }, 1);
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
        showblock() {
            this.show = !this.show
            this.resizing()
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

            this.onClick()

            let that = this;
            console.log("store.state.ckServer = " + store.state.ckServer)
            this.$Axios.post("/api/daedan/cj/ems/setting/contactList", {
                    dateFr: this.dateFr,
                    serverList: store.state.ckServer,
                    findTp: this.findTp,
                    findSz: this.findSz,
                    pageNo: this.pageNo,
                    pageSz: store.state.paginationPageSize,
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
        // 등록버튼 클릭
        addOn() {
            this.server_name = null;
            this.equipment_inner_nm = null; //측정위치
            this.category = null; //측정분야명
            this.category_cd = null; //측정분야코드
            this.facility = null
            this.place = null
            this.sensor_name = null; //사업장
            this.contact_yn = null;
            this.showblock();
        },
        // 엑셀저장버튼 클릭
        excelBtn() {
            this.gridOptions.api.exportDataAsExcel({});
        },
    },

}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.mailInner,
.mailConBox {
    margin: 0 auto;
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
.maintenanceDateCheck {
    width: 100%;
    height: 50px;
}

.maintenanceDateCheck>div>div>div {
    float: left;
    
}

.maintenanceDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.maintenanceDateCheck>div>div>div:nth-child(2),
.maintenanceDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
}

.maintenanceDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.maintenanceDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}

.mt_btn01,
.mt_btn02,
.mt_btn03 {
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
    right: 360px;
}

.mt_btn02 {
    right: 190px;
}

.mt_btn03 {
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
</style>
