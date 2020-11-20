<template>
<div class="inner">
    <div class="con_box_left">
        <div class="check_box con_box">
            <div class="subCon">
                <div class="list_01 listBox">
                    <div class="title clear">
                        <h5>경인권</h5>
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('1')" class="check_all" id="categoryCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('1')" class="clear_btn" id="serverClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="servers">
                            <div v-for="(item, index) in servers" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                                <input type="checkbox" class="1_checkbox" name="server" :id=item.id :value=item.id v-model="checkListVal1" @change="getEquipPos">
                                <label>{{item.val}}</label>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="list_02 listBox">
                    <div class="title clear">
                        <h5>중부권</h5>
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('1')" class="check_all" id="categoryCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('1')" class="clear_btn" id="serverClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="servers">
                            <div v-for="(item, index) in servers" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                                <input type="checkbox" class="1_checkbox" name="server" :id=item.id :value=item.id v-model="checkListVal2" @change="getEquipPos">
                                <label>{{item.val}}</label>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="list_03 listBox">
                    <div class="title clear">
                        <h5>남부권</h5>
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('1')" class="check_all" id="categoryCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('1')" class="clear_btn" id="serverClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="servers">
                            <div v-for="(item, index) in servers" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                                <input type="checkbox" class="1_checkbox" name="server" :id=item.id :value=item.id v-model="checkListVal3" @change="getEquipPos">
                                <label>{{item.val}}</label>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="list_04 listBox">
                    <div class="title clear">
                        <h5>영남권</h5>
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('1')" class="check_all" id="categoryCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('1')" class="clear_btn" id="serverClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="servers">
                            <div v-for="(item, index) in servers" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                                <input type="checkbox" class="1_checkbox" name="server" :id=item.id :value=item.id v-model="checkListVal4" @change="getEquipPos">
                                <label>{{item.val}}</label>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="list_05 listBox">
                    <div class="title clear">
                        <h5>계열사</h5>
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('1')" class="check_all" id="categoryCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('1')" class="clear_btn" id="serverClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="servers">
                            <div v-for="(item, index) in servers" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                                <input type="checkbox" class="1_checkbox" name="server" :id=item.id :value=item.id v-model="checkListVal5" @change="getEquipPos">
                                <label>{{item.val}}</label>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="list_06 listBox">
                    <div class="title clear">
                        <h5>바이오</h5>
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('1')" class="check_all" id="categoryCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('1')" class="clear_btn" id="serverClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="servers">
                            <div v-for="(item, index) in servers" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                                <input type="checkbox" class="1_checkbox" name="server" :id=item.id :value=item.id v-model="checkListVal6" @change="getEquipPos">
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
            checkListVal5: [],
            checkListVal6: [],
        }
    },
    watch: {
        checkListVal1() {
            store.state.ckServer = this.checkListVal1;
        },
        checkListVal2() {
            // store.state.ckCate = this.checkListVal2;
        },
        checkListVal3() {
            // store.state.ckEquip = this.checkListVal3;
        },
        checkListVal4() {
            // store.state.ckSensor = this.checkListVal4;
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
                    break;
                case 2:
                    store.state.ckCate = checklistNum
                    this.checkListVal2 = checklistNum
                    break;
                case 3:
                    store.state.ckEquip = checklistNum
                    this.checkListVal3 = checklistNum
                    break;

                case 4:
                    store.state.ckSensor = checklistNum
                    this.checkListVal4 = checklistNum
                    break;
                case 5:
                    store.state.ckSensor = checklistNum
                    this.checkListVal5 = checklistNum
                    break;
                default:
                    store.state.ckSensor = checklistNum
                    this.checkListVal6 = checklistNum
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
                    //this.checkListVal2 = [0]
                    //this.checkListVal3 = [0]
                    //this.checkListVal4 = [0]
                    //this.equipPos = [0]
                    //this.sensors = [0]
                    this.equipPos = []
                    this.sensors = []


                    // this.getEquipPos();
                    break;
                case 2:
                    //store.state.ckCate = [0]
                    //store.state.ckEquip = [0]
                    //store.state.ckSensor = [0]
                    //this.checkListVal2 = [0]
                    //this.checkListVal3 = [0]
                    //this.checkListVal4 = [0]
                    //this.equipPos = [0]
                    //this.sensors = [0]

                    store.state.ckCate = []
                    store.state.ckEquip = []
                    store.state.ckSensor = []
                    this.checkListVal2 = []
                    this.equipPos = []
                    this.sensors = []


                    // this.getEquipPos();
                    break;
                case 3:
                    store.state.ckEquip = []
                    this.checkListVal3 = []
                    // this.getSensors();
                    break;
                case 4:
                    store.state.ckSensor = []
                    this.checkListVal4 = []
                    break;
                case 5:
                    store.state.ckSensor = []
                    this.checkListVal5 = []
                    break;
                default:
                    store.state.ckSensor = []
                    this.checkListVal6 = []
                    break;    
            }
        },
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

.con_box_left .check_box {
    margin-top: 20px;
    height:100%;
}

.con_box_left .check_box .subCon {
    position: relative;
    width: 260px;
    height: 100%;
    border-radius: 4px;
    background: rgb(233, 233, 233);
    box-shadow: 0px 0px 12px #6e8f8e;
    margin-left: 20px;
}

.con_box_left .check_box>div:last-child {
    margin-top: 0;
}

/* listBox */
.con_box_left .check_box .subCon .listBox {
    width: 100%;
    height: 120px;
    box-sizing: border-box;
    padding: 0px 10px 0px 10px;
    margin-top: 10px;
}

.con_box_left .check_box .subCon div .title {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    height: 40px;
    position: relative;
}

.con_box_left .check_box .subCon div .title h5 {
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

.con_box_left .check_box .subCon div .title .btn_area {
    position: absolute;
    top: 10px;
    right: 0;
    height: 100%;
}

.con_box_left .check_box .subCon div .title .btn_area>input {
    width: 65px;
    height: 21px;
    line-height: 22px;
    border: none;
    font-size: 11px;
    border-radius: 5px;
    cursor: pointer;
    background: rgb(187, 231, 248);
    border: 1px solid rgb(225, 199, 255);
    font-family: "CJ Onlyone Medium";
    transition: all 0.3s;
}

.con_box_left .check_box .subCon div .title .btn_area>.check_all {
    margin-right: 7px;
}

.con_box_left .check_box .subCon .title .btn_area input:hover {
    color: #fff;
    background: rgb(81, 81, 255);
    font-weight: bold;
}

.con_box_left .check_box .subCon .check_list {
    overflow-y: scroll;
    height: 90px;
    margin-top: 5px;
}

.con_box_left .check_box .subCon .check_list div {
    height: 25px;
    width: 100%;
    float: left;
    text-align: left;
    margin-top:3px;
}

.con_box_left .check_box .subCon .check_list div>input {
    margin: 0;
    margin-left: 5px;
    margin-top: -5.5px;
    width: 15px;
    height: 15px;
}

.con_box_left .check_box .subCon .check_list div>label {
    font-size: 14px;
    padding-left: 10px;
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
