<template>
<div class="inner">
    <div class="con_box_left">
        <div class="check_box con_box">
            <div class="con">
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
                                <input type="checkbox" class="1_checkbox" name="server" :id=item.id :value=item.id v-model="checkListVal1" @change="getEquipPos">
                                <label>{{item.val}}</label>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="con" v-if="link[0] !== 'normalDistribution2' && link[0] !== 'change' && link[0] !== 'excess' && link[0] !== 'manage' && link[0] !== 'report' && link[0] !== 'system' && link[0] !== 'maintenanceStatus' && link[0] !== 'maintenance' && link[0] !== 'workplace'" >
                <div class="list_02">
                    <div class="title clear">
                        <h5>분야</h5>
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('2')" class="check_all" id="categoryCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('2')" class="clear_btn" id="categoryClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="type">
                            <div v-for="(item, index) in cates" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                                <input type="checkbox" class="2_checkbox" name="type" :id=item.id :value=item.id v-model="checkListVal2" @change="getEquipPos">
                                <label>{{item.val}}</label>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="con" v-if="link[0] !== 'normalDistribution2' && link[0] !== 'change' && link[0] !== 'excess' && link[0] !== 'manage' && link[0] !== 'report' && link[0] !== 'system' && link[0] !== 'maintenanceStatus' && link[0] !== 'maintenance' && link[0] !== 'workplace'">
                <div class="list_03">
                    <div class="title clear">
                        <h5>측정위치</h5>
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('3')" class="check_all" id="equipmentCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('3')" class="clear_btn" id="equipmentClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="equipPos">
                            <div v-for="(item, index) in equipPos" v-bind:item="item" v-bind:index="index" v-bind:key="item.equipment_key">
                                <input v-if="link[0] !== 'preventionDataByDay' && link[0] !== 'preventionDataByMon' " type="checkbox" class="3_checkbox" :name="'equip'+index" :class="item.equipment_inner_nm" :value="item.equipment_key" v-model="checkListVal3" @change="getSensors">
                                <input v-else type="checkbox" class="3_checkbox" :name="'equip'+index" :id="item.equipment_key" :class="item.equipment_inner_nm" :value="item.equipment_key"  @click="checkequipment(item)" @change="getSensors">
                                <label>{{item.val}}</label>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="con" v-if="link[0] !== 'normalDistribution1' && link[0] !== 'normalDistribution2' && link[0] !== 'change' && link[0] !== 'excess' && link[0] !== 'manage' && link[0] !== 'report' && link[0] !== 'system' && link[0] !== 'maintenanceStatus' && link[0] !== 'maintenance' && link[0] !== 'workplace'">
                <div class="list_04">
                    <div class="title clear">
                        <h5>센서목록</h5>
                        <div class="btn_area">
                            <input type="button" value="전체선택" @click="checkAll('4')" class="check_all" id="sensorCheckAll">
                            <input type="button" value="새로고침" @click="checkReset('4')" class="clear_btn" id="sensorClearAll">
                        </div>
                    </div>
                    <div class="check_list scroll_box">
                        <ul class="sensors">
                            <div v-for="(item, index) in sensors" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                                <input type="checkbox" class="4_checkbox" name="sensor" :id=item.id :value=item.id v-model="checkListVal4">
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
        checkListVal2() {
            store.state.ckCate = this.checkListVal2;
        },
        checkListVal3() {
            store.state.ckEquip = this.checkListVal3;
        },
        checkListVal4() {
            store.state.ckSensor = this.checkListVal4;
        },
    },
    methods: {
        checkequipment(item){
            let eqList = []
            eqList = this.equipPos.filter(e => e.equipment_inner_nm === item.equipment_inner_nm)
            console.log(eqList)
            if (document.getElementById(item.equipment_key).checked === true) {
                eqList.map(e=>{
                    this.checkListVal3.push(e.equipment_key)
                })
                document.getElementsByClassName(item.equipment_inner_nm)[0].checked = true;
                document.getElementsByClassName(item.equipment_inner_nm)[1].checked = true;
            }else{
                eqList.map(e => {
                    this.checkListVal3 = this.checkListVal3.filter(el => el != e.equipment_key)
                })
                console.log(this.checkListVal3)
                document.getElementsByClassName(item.equipment_inner_nm)[0].checked = false;
                document.getElementsByClassName(item.equipment_inner_nm)[1].checked = false;               
            }

        },
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
                    this.checkListVal2 = [];
                    this.checkListVal3 = []
                    this.checkListVal4 = []
                    this.equipPos = []
                    this.sensors = []
                    // this.getEquipPos();
                    break;
                case 2:
                    store.state.ckCate = []
                    store.state.ckEquip = []
                    store.state.ckSensor = []
                    this.checkListVal2 = []
                    this.checkListVal3 = []
                    this.checkListVal4 = []
                    this.equipPos = []
                    this.sensors = []
                    // this.getEquipPos();
                    break;
                case 3:
                    store.state.ckEquip = []
                    store.state.ckSensor = []
                    this.checkListVal3 = []
                    this.checkListVal4 = []
                    this.sensors = []
                    // this.getSensors();
                    break;
                default:
                    store.state.ckSensor = []
                    this.checkListVal4 = []
                    break;
            }
        },

        async getEquipPos() {
            //alert("envPos.checkListVal1 = " + this.checkListVal1);
            this.equipPos = [];
            this.sensors = [];

            if (!this.checkListVal1) {
                return;
            } 
            if (this.checkListVal1.length == 0) {
                return;
            }

            if (!this.checkListVal2) {
                return;
            }
            if (this.checkListVal2.length == 0) {
                return;
            }
            let that = this;
            console.log(this.checkListVal1,store.state.userInfo.userId)
            await axios.post("/api/daedan/cj/ems/cmmn/comboEquipInnerPosList", {
                    userId: store.state.userInfo.userId,
                    serverList: this.checkListVal1
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            console.log(res.data.data)
                            that.equipPos = res.data.data.equipInnerPos; //서벼별측정위치
                            that.sensors = res.data.data.sensors; //서버별센서목록
                        }
                    }
                })
                .catch(err => {
                    console.log("ASDASDSAAD")
                    alert("측정위치및센서검색조건추출 실패 \n" + err);
                })

        },
        async getSensors() {
            let that = this;
            this.sensors = [];
            await axios.post("/api/daedan/cj/ems/cmmn/comboSensorList", {
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
                                        console.log("ASDASDSAAD")
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

.con_box_left .check_box {
    margin-top: 20px;
}

.con_box_left .check_box .con {
    position: relative;
    width: 260px;
    height: 180px;
    border-radius: 4px;
    background: rgb(233, 233, 233);
    box-shadow: 0px 0px 12px #6e8f8e;
    margin-left: 20px;
}

.con_box_left .check_box>div:last-child {
    margin-top: 0;
}

/* listBox */
.con_box_left .check_box .con>div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px 10px 0px 10px;
    margin-top: 20px;
}

.con_box_left .check_box .con div .title {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    height: 40px;
    position: relative;
}

.con_box_left .check_box .con div .title h5 {
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

.con_box_left .check_box .con div .title .btn_area {
    position: absolute;
    top: 10px;
    right: 0;
    height: 100%;
}

.con_box_left .check_box .con div .title .btn_area>input {
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

.con_box_left .check_box .con div .title .btn_area>.check_all {
    margin-right: 7px;
}

.con_box_left .check_box .con .title .btn_area input:hover {
    color: #fff;
    background: rgb(81, 81, 255);
    font-weight: bold;
}

.con_box_left .check_box .con .check_list {
    overflow-y: scroll;
    height: 120px;
    margin-top: 5px;
}

.con_box_left .check_box .con .check_list div {
    height: 25px;
    width: 100%;
    float: left;
    text-align: left;
}

.con_box_left .check_box .con .check_list div>input {
    margin: 0;
    margin-left: 5px;
    margin-top: -5.5px;
    width: 15px;
    height: 15px;
}

.con_box_left .check_box .con .check_list div>label {
    font-size: 14px;
    padding-left: 10px;

}

.servers>div,
.type>div,
.equipPos>div,
.sensors>div {
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
