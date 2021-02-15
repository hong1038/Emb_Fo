<template>
<b-container fluid>
    <div class="inner">
        
            </div>
        </template>
</b-container>
</template>

<script>
import Chart from 'chart.js'
import axios from 'axios';
import store from "@/store/index";
// import Vue from "vue";
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'

import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        AgGridVue,
        DatePick
        // BootstrapVue,
    },
    data() {
        return {
            inletgraphDataMin:[],
            inletgraphDataAvg:[],
            inletgraphDataMax:[],
            outletgraphDataMin:[],
            outletgraphDataAvg:[],
            outletgraphDataMax:[],

            Loadbusy:false,
            timeout : null,
            show:false,
            hide:false,
            busyPop: false,

            select_type: null,
            comboServers: null, //사업장   
            comboCategories: null, //측청분야     
            comboEquipments: null, //측정위치
            comboFacilities: null, //시설분류
            comboLocations: null, //위치분류

            equipment_key: null, //측정위치
            measurementInfo: {},
            chInfo:{},
            config: {},
            mode: 'single', //날짜선택방법
            findTps: [{
                value: 'pnelNm',
                text: '판넬명'
            }],
            dateFr: store.state.szCurMmFr,
            dateTo: store.state.szCurMmTo,
            // dateFr: "",
            // dateTo: "",
            gridOptions:{}, 
            list: [],
            list3: [],
            listCount: 0,
            pageNo: 1,
            perPage: 10,
            fields: [

                {
                    field: 'prevention_date',
                    headerName: '일자',
                    width: '120px',
                    cellStyle: {textAlign: 'center'}
                },
             
            ],
        }
    },
    mounted() {
        this.gridOptions.api.sizeColumnsToFit()
    },
    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        this.getConditionList();
    },
    beforeMount(){
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
    },
    beforeDestroy() {
      this.clearTimeout()
    },

    methods: {
        chartImage(){
            this.dailyChart.update({
                duration: 0
            });
            var link = document.createElement('a');
            link.href = this.dailyChart.toBase64Image();
            link.download = 'chart'+this.dateFr+'.png';
            this.dailyChart.options.tooltips.backgroundColor = 'white'
            link.click();
            this.dailyChart.options.title.text = 'ChartTitle';
            this.dailyChart.update({
                duration: 0
            });
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
            },200)
            // 시간 변경
        },
        onHidden() {
            // Return focus to the button once hidden
            this.$refs.pin.focus()
        },
        onClick() {
            this.Loadbusy = true
            // Simulate an async request
            this.setTimeout(() => {
            this.Loadbusy = false
            })
        },
        onCancel() {
            this.busyPop = false
        },
        showblock() {
            this.show = !this.show
            // this.resizing()
        },
        resizing() {
            setTimeout(() => {
                this.gridOptions.api.sizeColumnsToFit()
            }, 1);
        },
        getList() {
            let that = this;
            post("/api/daedan/cj/ems/setting/managerList", {
                    serverKey:this.server_key,
                    pageNo:this.pageNo,
                    pageSz:this.pageSz,
                    userId: store.state.userInfo.userId
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            console.log(res.data.data)
                            this.list = res.data.data;
                            this.listCount = res.data.totalCount;
                              }
                    }
                })
                .catch(err => {
                    alert("검색조건추출 실패 \n" + err);
                    console.log(err)
                    
                })
            this.Loadbusy = false;
        },
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

.changeLocation {
    position: absolute;
    top: 0px;
    right: 360px;
    width: 150px;
    height: 30px;
    font-size: 16px;
    line-height: 20px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    padding-left:8px;
    box-shadow: 0px 0px 3px blue;
    text-decoration: none;
    color: black;
}

.changeLocation>option{
    padding-left:5px;
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

.changeDateCheck {
    width: 100%;
    height: 50px;
    font-family: "CJ Onlyone Medium";
}

.changeDateCheck>div>div>div {
    float: left;
}

.changeDateCheck>div>div>div:nth-child(1) {
    width: 80px;
    font-size: 16px;
}

.changeDateCheck>div>div>div:nth-child(2),
.changeDateCheck>div>div>div:nth-child(4) {
    width: 150px;
    font-size: 14px;
    font-family: 'Arial';
}

.changeDateCheck>div>div>div:nth-child(3) {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.changeDateCheck>div>div>div>input {
    width: 130px;
    text-align: right;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(170, 170, 170);
}
.c_btn00,
.c_btn01,
.c_btn02,
.c_btn03 {
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
    background: white;
    box-shadow: 0px 0px 3px blue;
    font-size: 16px;
}
.c_btn00 {
    right: 530px;
}
.c_btn01 {
    right: 360px;
}

.c_btn02 {
    right: 190px;
}
.c_btn03{
    right:20px;
}

.c_btn01:hover,
.c_btn02:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
}


.changeTableWrap .right_list {
    position: relative;
    left: 10px;
    width: 500px;
    height: 635px;
    margin-left: 10px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0;
    overflow-y: scroll;
    box-shadow: 0px 0px 10px 1px #ccc;
}

.changeTableWrap .right_list .popUpTitle {
    font-size: 18px;
}

.changeTableWrap .right_list .btn {
    margin-right: 7px;
    font-size: 15px;
    height: 30px;
    margin-top: 20px;
}
.changeTableWrap .right_list .regiName {
    font-size: 16px;
    word-break: keep-all;
}

.changeTableWrap .right_list .regiName+input,
.changeTableWrap .right_list .regiName+select {
    height: 30px;
    /* margin-top: 10px; */
    font-size:14px;
}

.changeTableWrap .right_list .lh-2+input,
.changeTableWrap .right_list .lh-2+select {
    margin-top:20px;
}

.changeTableWrap .right_list .lh-3+input,
.changeTableWrap .right_list .lh-3+select {
    /* margin-top:35px; */
}
.changeTableWrap .right_list .lh-4+input,
.changeTableWrap .right_list .lh-4+select {
    margin-top:50px;
}

.popUpMessage #form-confirm-label {
    font-size: 28px;
    font-family: 'Noto Sans KR';
}

.popUpMessage .popUpInfo>button {
    width: 80px;
    height: 50px;
    font-size: 16px;
    border-radius: 7px;
}

.ag-header-group-text{
    display:block;
    margin:0 auto;
}
.imgbutton{
    width: 100px;
    height: 40px;
    font-size: 16px;
    background: rgb(81, 81, 255);
    color: white;
    border-radius: 5px;
}
.changeTable .ag-header-cell-label {
   justify-content: center !important;
}
</style>
