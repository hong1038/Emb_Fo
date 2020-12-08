<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <div class="inner settingInner">
            <div class="con">
                <div class="con_box_right container-fluid float-left">
                    <p>사용자 정보</p>
                    <b-row>
                        <label for="location" class="managerLocationLabel">사업장을 선택해주세요.</label>
                        <b-form-select name="location" class="managerLocation" v-model="server_key" :options="comboServers" size="sm" aria-placeholder="사업장"></b-form-select>
                        <input type="button" class="managerLookUp" v-on:click="getList" value="조회">
                        <input type="button" class="managerPlus" v-on:click="showblock" value="등록">
                    </b-row>
                    <b-overlay :show="Loadbusy" rounded opacity="0.7" spinner-variant="primary" @hidden="onLoadHidden">
                    <div class="managertableWrap container-fluid" style="display:flex">
                        <ag-grid-vue style="width: 100%; height: 670px;" class="ag-theme-alpine-dark" @row-clicked="getInfo" :columnDefs="fields" :rowData="list" :gridOptions="gridOptions" :pagination="true" :paginationPageSize="paginationPageSize">
                        </ag-grid-vue>

                        <b-card class="right_list" v-if="show">
                            <b-row>
                                <b-col class="popUpTitle">사용자 정보 등록</b-col>
                                <input type="button" class="managerSaveBtn btn btn-success btn-sm" v-on:click="saveInfo" value="저장">
                                <input type="button" class="managerListBtn btn btn-primary btn-sm" v-on:click="showblock" value="목록">
                                <input type="button" class="managerListBtn btn btn-danger btn-sm" v-on:click="dropInfo" value="삭제">
                            </b-row>
                            <div>
                                <b-row>
                                    <b-col class="regiName col-4">성명</b-col>
                                    <b-form-input class="col" v-model="name" size="sm"></b-form-input>
                                </b-row>
                                <b-row>
                                    <b-col class="regiName col-4">소속(사업장명)</b-col>
                                    <b-form-select class="col" v-model="server_name" :options="comboServers" size="sm">
                                    </b-form-select>
                                </b-row>
                                <!-- <b-row>
                                    <b-col class="regiName col-4">전화번호</b-col>
                                    <b-form-input class="col" v-model="emInfo.tell" size="sm"></b-form-input>
                                </b-row>
                                <b-row>
                                    <b-col class="regiName col-4">핸드폰번호</b-col>
                                    <b-form-input class="col" v-model="emInfo.hp" size="sm"></b-form-input>
                                </b-row> -->
                                <b-row>
                                    <b-col class="regiName col-4">이메일</b-col>
                                    <b-form-input class="col" v-model="email" size="sm"></b-form-input>
                                </b-row>
                            </div>
                        </b-card>
                    </div>
                    </b-overlay>
                </div>
            </div>
        </div>
    </div>

    <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
        <template v-slot:overlay>
            <div v-if="processing" class="text-center p-4 bg-primary text-light rounded">
                <b-icon icon="cloud-upload" font-scale="4"></b-icon>
                <div class="mb-3">Processing...</div>
                <b-progress min="1" max="20" :value="counter" variant="success" height="3px" class="mx-n4 rounded-0"></b-progress>
            </div>
            <div v-else ref="dialog" tabindex="-1" role="dialog" aria-modal="false" aria-labelledby="form-confirm-label" class="text-center p-3 popUpMessage">
                <p><strong id="form-confirm-label">{{altMsg}}</strong></p>
                <div class="d-flex">
                    <b-row>
                        <b-col cols="6" align="center" v-if="workTp ==='SAVE_INFO'" class="popUpInfo">
                            <b-button v-on:click="saveInfoProc" variant="success" size="sm">저장</b-button>
                        </b-col>
                        <b-col cols="6" align="center" class="popUpInfo">
                            <b-button variant="primary" @click="onCancel" size="sm">취소</b-button>
                        </b-col>
                        <b-col cols="6" align="center" v-if="workTp ==='DROP_INFO'" class="popUpInfo">
                            <b-button v-on:click="dropInfoProc" variant="danger" size="sm">삭제</b-button>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </template>
    </b-overlay>
</b-container>
</template>

<script>
import Header from '@/components/header.vue'
import Left from '@/components/Left2.vue'
import Vue from 'vue'
import 'vue-good-table/dist/vue-good-table.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
    AgGridVue
} from "ag-grid-vue"

import axios from 'axios';
import store from '@/store/index';

export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Vue,
        Header,
        Left,
        AgGridVue,
    },

    data() {
        return {
            Loadbusy:false,
            timeout : null,

            paginationPageSize: store.state.paginationPageSize,
            gridOptions: {},
            selectWorkplace: "",
            date: "",
            show: false,
            comboServers: [], //사업장   
            busy: false,

            emInfo:{},
            list: [],
            listCount: 0,
            pageNo: 0,
            pageSz: 13,
            perPage: 10,
            comboName2: null,
            fields: [
                // {
                //     field: 'wp_pid',
                //     hidden: true
                // },
                {
                    field: 'name',
                    headerName: '담당자'
                },
                {
                    field: 'server_name',
                    headerName: '소속(사업장명)'
                },
                // {
                //     field: 'tell',
                //     headerName: '전화번호'
                // },
                // {
                //     field: 'hp',
                //     headerName: '핸드폰번호'
                // },
                {
                    field: 'email',
                    headerName: '이메일'
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
    },
    beforeMount() {
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];
    },
    created() {
        this.getConditionList();

    },
    mounted() {
        this.gridOptions.api.sizeColumnsToFit()
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
        onLoadHidden() {
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

        test() {
            console.log(this.gridOptions.api)
        },
        onShown() {
            this.$refs.dialog.focus()
        },
        onHidden() {},

        onCancel() {
            this.busy = false
        },

        saveblock() {
            this.show = !this.show
            this.resizing()
        },
        showblock() {
            this.show = !this.show
            this.resizing()
        },
        resizing() {
            setTimeout(() => {
                this.gridOptions.api.sizeColumnsToFit()
            }, 1);
        },
        async getConditionList() {
            let that = this;
            await axios.post("/api/daedan/cj/ems/setting/conditionList", {
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.comboServers = res.data.data.serverList; //사업장
                            that.comboCategories = res.data.data.cateList; //수집분야(악취,대기,수질)
                        }
                    }
                })
                .catch(err => {
                    alert("서버목록/수집분야(악취,수질,대기) 추출 실패 \n" + err);
                    console.log(err)
                })

        },
        // async getConditionList() {
        //     //this.config = { headers : { "authorization" : this.$Axios.defaults.headers.common["authorization"] }   }
        //     // let that = this;
        //     axios.post("/api/daedan/cj/ems/setting/WorkplaceList", {
        //             userId: store.state.userInfo.userId
        //         })
        //         .then(res => {
        //             if (res.status === 200) {
        //                 if (res.data.statusCode === 200) {
        //                     console.log(res.data.data)
        //                     this.workplaceList = res.data.data;
        //                     this.comboName2 = res.data.data.servers;
        //                     // that.state.servers = res.data.data.servers; //사업장
        //                     // that.state.typies = res.data.data.typies; //수집분야(악취,대기,수질)
        //                     //that.state.equipPos = res.data.data.equipPos; //측정위치
        //                 }
        //             }
        //         })
        //         .catch(err => {
        //             alert("검색조건추출 실패 \n" + err);
        //             console.log(err)
        //         })

        // },
        async getInfo() {
            axios.post("/api/daedan/cj/ems/setting/managerList", {
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
                    this.showblock();
        },
        async getList() {
            // if (store.state.ckServer.length == 0) {
            //     alert("사업장은 필수 선택 항목 입니다.")
            //     return;
            // }
            this.onClick();

            axios.post("/api/daedan/cj/ems/setting/managerList", {
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

        },
        saveInfo() {
            if (!this.emInfo.name) {
                alert("성명은 필수 입력 항목 입니다.")
                return;
            }
            if (!this.comboServers[0].id) {
                alert("소속은 필수 선택 항목 입니다.")
                return;
            }
            // if (!this.emInfo.hp) {
            //     alert("핸드폰번호는 필수 입력 항목 입니다.")
            //     return;
            // }
            if (!this.emInfo.email) {
                alert("이메일은 필수 입력 항목 입니다.")
                return;
            }
            this.busy = true;
            this.altMsg = "처리중인 기준정보를 저장 하시겠습니까 ? ";
            this.workTp = "SAVE_INFO"
        },
        async saveInfoProc() {
            let that = this;
            await this.$Axios.post("/api/daedan/cj/ems/setting/managerSave", {
                    name: this.name,
                    server_name:this.server_name,
                    email:this.email,
                    userId: store.state.userInfo.userId
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.saveblock();
                            that.getList();
                        }
                    }
                })
                .catch(err => {
                    alert("측정기별기준정보저장 실패 \n" + err);
                })
            this.busy = false;

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

/* datePicker */
.ag-theme-alpine-dark * {
    color: white;
}

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
    /*background: url(../imgs/common/leftArrow.png) no-repeat center center;*/
    background-size: 10px 10px;
}

.ui-datepicker-prev span.ui-icon {
    transform: rotateZ(180deg);
}

/* title */

.settingInner {
    margin: 0 auto;
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

.managerLocation {
    position: absolute;
    top: 30px;
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

.managerLocation>option{
    padding-left:5px;
}

.managerLocationLabel {
    position: absolute;
    top: 35px;
    right: 365px;
    width: 140px;
    font-size: 12px;
    text-align: center;
}


.managerLookUp {
    position: absolute;
    top: 30px;
    right: 190px;
    width: 150px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
    text-decoration: none;
    color: black;
}

.managerPlus {
    position: absolute;
    top: 30px;
    right: 20px;
    width: 150px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
    text-decoration: none;
    color: black;
}

.managerLookUp:hover,
.managerPlus:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
    text-decoration: none;
}

/* right popup */

.managertableWrap .right_list {
    overflow-y: hidden;
}

.right_list {
    position: relative;
    left: 10px;
    width: 500px;
    height: 670px;
    margin-left: 10px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0;
    box-shadow: 0px 0px 10px 1px #ccc;
}

.right_list .popUpTitle {
    font-size: 18px;
}

.right_list .btn {
    margin-right: 7px;
    font-size: 15px;
}

.managerSaveBtn,
.managerListBtn,
.managerListBtn {
    height: 30px;
    margin-top: 10px;
}

.managertableWrap .row:not(.line1_box)>input,
.managertableWrap .row>select {
    max-width: 230px;
}

.managertableWrap .regiName {
    font-size: 14px;
    width: 100px;
}

.managertableWrap .regiName+input,
.managertableWrap .regiName+select {
    height: 30px;
    margin-top: 10px;
}

.managertableWrap .check_list {
    position: relative;
    left: -45px;
}

.managertableWrap .card-body>div:nth-child(2)>div {
    margin-top: 20px;
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

.ag-body-horizontal-scroll {
    background: black;
}
</style>
