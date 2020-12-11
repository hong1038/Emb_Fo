<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <div class="inner">
            <div class="con headMonthlyCon">
                <div class="con_box_right container-fluid">
                    <p>본부 월말 보고 통계</p>
                    <div class="container-fluid">
                        <b-row class="hmDateSelect">
                            <b-col cols="1">
                                <span style="padding-left:10px; line-height:10px;">월 선택</span>
                            </b-col>
                            <b-col cols="2">
                                <div class="dateSelect">
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
                                </div>
                            </b-col>
                            <v-spacer></v-spacer>
                            <b-col cols="1">
                                <v-btn>조회</v-btn>
                            </b-col>
                            
                        </b-row>
                    </div>
                    <div class="hmtableSelectBox container-fluid">
                        <b-row>
                            <b-col cols="3">
                                <router-link :to="{ name: 'headMonthly1'}" >전체 통계</router-link>
                            </b-col>
                            <b-col cols="3">
                                <router-link :to="{ name: 'headMonthly2'}">유형별 통계</router-link>
                            </b-col>
                            <b-col cols="3" class="check01">
                                <router-link :to="{ name: 'headMonthly3'}">문제점 / 이슈사항</router-link>
                            </b-col>
                            <b-col cols="3">
                                <router-link :to="{ name: 'headMonthly4'}">이상점 및 비정상 대응 확인</router-link>
                            </b-col>
                        </b-row>
                    </div>
                    <div>
                    
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
            list:[],
            listCount:0,
            fields: [
                {
                    field: '',
                    headerName: '권역',
                    width: '100px'
                },
                {
                    field: 'server_name',
                    headerName: '사업장',
                    width: '140px'
                },
                {
                    field: '',
                    headerName: '구분',
                    width: '80px'
                },
                {
                    field: '',
                    headerName: '측정위치',
                    width: '190px'
                },
                {
                    field: '',
                    headerName: '유형',
                    width : '80'
                },
                {
                    field: '',
                    headerName: '발생 일자',
                    width: '190px'
                },
                {
                    field: '',
                    headerName: '문제점 개선 계획',
                    children : [
                        {
                            field : '',
                            headerName : '문제점/이슈사항',
                            width: '418'
                        },
                        {
                            field : '',
                            headerName : '대응 방안',
                            width: '470'
                        },
                        {
                            field : '',
                            headerName : '일정',
                            width: '80'
                        },
                    ]
                },
                {
                    field: '',
                    headerName: '완료 상태',
                    width: '110px'
                },
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
    }
}
</script>

<style>
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
    position: relative;
}


.headMonthlyCon .con_box_right p {
    width:400px;
    height: 50px;
    font-family: CjFontTitleBold;
    font-size: 24px;
    box-sizing: border-box;
    border-bottom: 5px solid rgb(172, 172, 172);
    padding-left: 10px;
    text-align: left;
}


.hmDateSelect{
    height:50px;
    font-size:20px;
}
.hmDateSelect > div:last-child{
    height:100%;
}
.hmDateSelect .v-input{
    position:absolute;
    top:0px;
    left:-20px;
    width:50%;
}

.hmDateSelect .v-input input{
    padding-left:5px;
    font-size:16px;
}

.hmDateSelect button{
    position:absolute;
    top:0px;
    right:20px;
    width:150px;
    height:30px;
    background: rgb(187, 231, 248) !important;
    box-shadow: 0px 0px 3px blue;
}

.hmDateSelect button span{
    font-size:16px;
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
