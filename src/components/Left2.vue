<template>
<div class="inner">
    <div class="con_box_left">
        <div class="check_box02 con_box">
            <div class="con checkList">
                <div class="list_01">
                    <div class="title clear">
                        <h5>사업장</h5> 
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('1')" class="check_all" id="categoryCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('1')" class="clear_btn" id="serverClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="servers">
                            <div v-for="(item, index) in servers" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                                <input type="checkbox" class="1_checkbox" name="server" :id=item.id :value=item.id v-model="checkListVal1">
                                <label>{{item.val}}</label>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import store from '@/store/index';
//import vue from 'vue'
export default {
    components: {
        //vue,
    },
    created() {
        this.getConditionList();
    },
    data() {
        return {
            link: document.location.href.split("/").reverse(),
            servers: [],
            cates: [],
            equipPos: [],
            sensors: [],
            checkListVal1: [],
            checkListVal2: [],
            checkListVal3: [],
            checkListVal4: [],
        }
    },
    watch: {
        checkListVal1() {
            store.state.ckServer = this.checkListVal1;
        },
    },
    methods: {
        getConditionList() {
            //this.config = { headers : { "authorization" : this.$Axios.defaults.headers.common["authorization"] }   }
            let that = this;
            axios.post("/api/daedan/cj/ems/cmmn/comboConsitionList", {
                    userId: store.state.userInfo.userId
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.servers = res.data.data.servers; //사업장
                            that.cates = res.data.data.cates; //수집분야(악취,대기,수질)
                            //that.equipPos = res.data.data.equipPos; //측정위치
                        }
                    }
                })
                .catch(err => {
                    alert("검색조건추출 실패 \n" + err);
                })

        },

        checkAll(oix) {
            let checkitems = []
            checkitems = document.getElementsByClassName(oix + '_checkbox')
            let checkitems2 = [...checkitems]

            let checklistNum = []
            checkitems2.map((e) => {
                e.checked = true;
                checklistNum.push(Number(e.value));
            })
            //alert("checklistNum = " + checklistNum );//kill
            //alert("oix = " + oix);//kill
            switch (Number(oix)) {
                case 1:
                    store.state.ckServer = checklistNum
                    this.checkListVal1 = checklistNum
                    this.getEquipPos();
                    break;
                case 2:
                    store.state.ckCate = checklistNum
                    this.checkListVal2 = checklistNum
                    this.getEquipPos();
                    break;
                case 3:
                    store.state.ckEquip = checklistNum
                    this.checkListVal3 = checklistNum
                    this.getSensors();
                    break;

                default:
                    store.state.ckSensor = checklistNum
                    this.checkListVal4 = checklistNum
                    break;
            }
            checklistNum = []

        },

        checkReset(oix) {
            let checkitems = []
            checkitems = document.getElementsByClassName(oix + '_checkbox')
            let checkitems2 = [...checkitems]
            checkitems2.map((e) => {
                e.checked = false
            })
            switch (Number(oix)) {
                case 1:
                    store.state.ckServer = []
                    this.checkListVal1 = []
                    this.getEquipPos();
                    break;
                case 2:
                    store.state.ckCate = []
                    this.checkListVal2 = []
                    this.getEquipPos();
                    break;
                case 3:
                    store.state.ckEquip = []
                    this.checkListVal3 = []
                    this.getSensors();
                    break;
                default:
                    store.state.ckSensor = []
                    this.checkListVal4 = []
                    break;
            }
        },

        getEquipPos() {
            //alert("envPos.checkListVal1 = " + this.checkListVal1);
            //alert("envPos.checkListVal2 = " + this.checkListVal2);
            let that = this;
            axios.post("/api/daedan/cj/ems/cmmn/comboEquipInnerPosList", {
                    userId: store.state.userInfo.userId,
                    serverList: this.checkListVal1
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.equipPos = res.data.data.equipInnerPos; //서벼별측정위치
                            that.sensors = res.data.data.sensors; //서버별센서목록
                        }
                    }
                })
                .catch(err => {
                    alert("측정위치및센서검색조건추출 실패 \n" + err);
                })

        },
        getSensors() {
            let that = this;
            axios.post("/api/daedan/cj/ems/cmmn/comboSensorList", {
                    userId: store.state.userInfo.userId,
                    serverList: store.state.ckServer,
                    equipList: store.state.ckEquip
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            that.sensors = res.data.data.sensors; //서버별센서목록
                        }
                    }
                })
                .catch(err => {
                    alert("측정위치및센서검색조건추출 실패 \n" + err);
                })

        }
    }
};
</script>

<style>
.v-application ul,
.v-application ol {
    padding-left: 0 !important;
}

.con_box_left {
    float: left;
    width: 300px;
    height: 800px;
    background: #fff;
}

.con_box_left .check_box02 {
    height: 610px;
    margin-top: 20px;
}

.con_box_left .check_box02 .con {
    position: relative;
    width: 260px;
    height: 180px;
    border-radius: 4px;
    background: rgb(233, 233, 233);
    box-shadow: 0px 0px 12px #6e8f8e;
    margin-left: 20px;
}

.con_box_left .check_box02 .checkList {
    height: 100%;
    overflow: hidden;
}

.con_box_left .check_box02>div:last-child {
    margin-top: 0;
}

/* listBox */
.con_box_left .check_box02 .con>div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px 10px 0px 10px;
    margin-top: 10px;
}

.con_box_left .check_box02 .con div .title {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    height: 40px;
    position: relative;
}

.con_box_left .check_box02 .con div .title h5 {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 17px;
    font-weight: 700;
    text-align: left;
    line-height: 45px;
    box-sizing: border-box;
    padding-left: 5px;
}

.con_box_left .check_box02 .con div .title .btn_area {
    position: absolute;
    top: 10px;
    right: 0;
    height: 100%;
}

.con_box_left .check_box02 .con div .title .btn_area>input {
    width: 65px;
    height: 21px;
    line-height: 22px;
    border: none;
    font-size: 12px;
    border-radius: 5px;
    cursor: pointer;
    background: rgb(187, 231, 248);
    border: 1px solid rgb(225, 199, 255);
    font-family: "CJ Onlyone Medium";
    transition: all 0.3s;
}

.con_box_left .check_box02 .con div .title .btn_area>.check_all {
    margin-right: 7px;
}

.con_box_left .check_box02 .con .title .btn_area input:hover {
    color: #fff;
    background: rgb(81, 81, 255);
    font-weight: bold;
}

.con_box_left .check_box02 .con .check_list {
    height: 100%;
    margin-top: 5px;
}

.con_box_left .check_box02 .con .check_list div {
    height: 25px;
    width: 100%;
    float: left;
    text-align: left;
}

.con_box_left .check_box02 .con .check_list div>input {
    margin: 0;
    margin-left: 5px;
    margin-top: -5.5px;
    width: 15px;
    height: 15px;
}

.con_box_left .check_box02 .con .check_list div>label {
    font-size: 14px;
    padding-left: 10px;
}

.servers>div {
    margin-top: 5px;
}

.scroll_box::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
}

.scroll_box::-webkit-scrollbar-track {
    background-color: #cacaca;
    border-radius: 10px;
}

.scroll_box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #1467d3;
}

.scroll_box::-webkit-scrollbar-button {
    width: 0;
    height: 0;
}
</style>
