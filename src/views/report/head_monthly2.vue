<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <div class="inner">
            <div class="con headMonthlyCon">
                <div class="con_box_right container-fluid">
                    <p>본부 월말 보고 통계</p>
                    <div class="hmtableSelectBox container-fluid">
                        <b-row>
                            <b-col cols="2">
                                <router-link :to="{ name: 'headMonthly1'}" >전체 통계</router-link>
                            </b-col>
                            <b-col cols="2" class="check01">
                                <router-link :to="{ name: 'headMonthly2'}">유형별 통계</router-link>
                            </b-col>
                            <b-col cols="2">
                                <router-link :to="{ name: 'headMonthly3'}">문제점 / 이슈사항</router-link>
                            </b-col>
                            <b-col cols="2">
                                <router-link :to="{ name: 'headMonthly4'}">이상점 및 비정상 대응 확인</router-link>
                            </b-col>
                            <b-col cols="4">
                                <b-row class="hmDateSelect">
                                    <v-spacer></v-spacer>
                                    <b-col cols="2">
                                        <span style="position:absolute; top:5px; right:0;">월 선택</span>
                                    </b-col>
                                    <b-col cols="3">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dateFr" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="dateFr" label="" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
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
                                    </b-col>
                                    <b-col cols="4">
                                        <v-btn>조회</v-btn>
                                    </b-col>
                                    
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="con_tableWrap">
                        <ag-grid-vue style="width: 100%; height: 630px;" class="ag-theme-alpine-dark" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize" v-b-visible="handleVisibility">
                        </ag-grid-vue>
                    </div>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
import Header from '@/components/header.vue'
import Left from '@/components/Left.vue'
import Main from '@/components/main.vue'
import 'vue-good-table/dist/vue-good-table.css'
import vue from 'vue'
// import DatePicker from "v-calendar/lib/components/date-picker.umd"
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        vue,
        Left,
        Main,
        AgGridVue,
    },
    data() {
        return {
            selectWorkplace: "",
            dateFr: "",

            fields: [
                {
                    field: '',
                    headerName: '권역',
                    width: '140px',
                    
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '140px',
                    
                },
                {
                    field: '',
                    headerName: '구분',
                    width: '80px'
                },
                {
                    field: '',
                    headerName: '단위',
                    width: '80px'
                },
                {
                    field: '',
                    headerName: '환경 모니터링',
                    children:[
                        {
                            field : '',
                            headerName : '측정기, 방지시설 문제/이슈대응',
                            children : [
                                {
                                    field : '',
                                    headerName : '센서 이상',
                                    width:'110'
                                },
                                {
                                    field : '',
                                    headerName : '통신 이상',
                                    width:'110'
                                },
                                {
                                    field : '',
                                    headerName : '설비 이상',
                                    width:'110'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width:'80'
                                }
                            ]
                        }
                    ]
                },
                {
                    field: '',
                    headerName: '모니터링 이상 대응',
                    children : [
                        {
                            field : '',
                            headerName : '악취',
                            children : [
                                {
                                    field : '',
                                    headerName : '농도 상승',
                                    width : '110'
                                },
                                {
                                    field : '',
                                    headerName : '수치 오류',
                                    width : '110'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width : '80'
                                }
                            ]
                        },
                        {
                            field : '',
                            headerName : '수질',
                            children : [
                                {
                                    field : '',
                                    headerName : '농도 상승',
                                    width : '110'
                                },
                                {
                                    field : '',
                                    headerName : '수치 오류',
                                    width : '110'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width : '80'
                                }
                            ]
                        },
                        {
                            field : '',
                            headerName : '대기',
                            children : [
                                {
                                    field : '',
                                    headerName : '농도 상승',
                                    width : '110'
                                },
                                {
                                    field : '',
                                    headerName : '수치 오류',
                                    width : '110'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width : '80'
                                }
                            ]
                        },
                        {
                            field : '',
                            headerName : '합계',
                            children : [
                                {
                                    field : '',
                                    headerName : '농도 상승',
                                    width : '110'
                                },
                                {
                                    field : '',
                                    headerName : '수치 오류',
                                    width : '110'
                                },
                                {
                                    field : '',
                                    headerName : '소계',
                                    width : '80'
                                }
                            ]
                        },
                    ]
                }
            ],
        }
    },
    watch: {
        selectWorkplace() {
            console.log(this.selectWorkplace)
        },
        date() {
            console.log(this.date)
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


.headMonthlyCon{
    width:1900px;
}

/* title */
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

/*  search and Excel Save*/

/*Table Select */
.hmtableSelectBox {
    width: 100%;
    height: 60px;
}

.hmtableSelectBox>div>div {
    float: left;
    width: 130px;
    height: 60px;
    box-sizing: border-box;
    background: #484848;
    cursor: pointer;
    border:1px solid rgb(97, 97, 97);
}


.hmtableSelectBox>div>div:last-child{
    background:white;
    border:none;
}

.hmtableSelectBox>div>.check01{
    background:black;
    font-weight:bold;
}

.hmtableSelectBox>div>.check01>a{
    font-size:20px;
}

.hmtableSelectBox>.row{
    margin:0;
    padding:0;
}


.hmDateSelect{
    font-size:16px;
}

.hmDateSelect .v-input{
    position:absolute;
    top:0;
}

.hmDateSelect .v-input input{
    padding-left:5px;
}

.hmDateSelect button{
    position:absolute;
    top:0;
    right:0;
    width:150px;
    height:30px;
    background: rgb(187, 231, 248) !important;
    box-shadow: 0px 0px 3px blue;
}

.hmDateSelect button span{
    font-size:16px;
}

.hmtableSelectBox>div>div>a {
    display:block;
    width:90%;
    margin:5px auto;
    text-decoration: none;
    color:white;
    font-size:20px;
    text-align: center;
}
/*monthSelect*/
.monthSelectWrap{
    height:40px;
    margin-top:10px;
}

.monthSelectWrap>.row{
    height:100%;
    margin:0;
}

.monthSelectWrap>div>.col-1{
    height:100%;
    padding:0;
    font-size:14px;
    box-sizing:border-box;
    border:1px solid rgb(126, 126, 126);
}

.monthSelectWrap>div>div>button{
    display:block;
    width:100%;
    height:40px;
    background:#343a40;
    color:white;
    margin:0 auto;
}

/* Contents */

.con_tableWrap {
    width: 100%;
}

.con_table {
    height: 80px;
    background: #f9fcff;
    box-sizing: border-box;
    border: 1px solid #d7dadd;
}
</style>
