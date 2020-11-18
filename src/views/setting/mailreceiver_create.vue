<template>
<b-container fluid>
    <Header></Header>
    <div style="display:flex">
        <div class="inner mailInner">
            <div class="con">
                <div class="con_box_right mailCreateConBox container-fluid float-left">
                    <p>메일 수신자 등록</p>
                    <router-link :to="{ name: 'mailreceiver'}" class="mailSave">저장</router-link>
                    <router-link :to="{ name: 'mailreceiver'}" class="mailList">목록</router-link>
                    <div class="mt-4 text-center container-fluid mail_con">
                        <div>
                            <div>사업장</div>
                            <div>
                                <b-form-select class="col" v-model="category_cd" :options="comboServers" size="sm"></b-form-select>
                            </div>
                        </div>
                        <div>
                            <div>사용자명</div>
                            <div>
                                <input type="text">
                            </div>
                        </div>
                        <div>
                            <div>사용자 메일</div>
                            <div>
                                <input type="text">
                            </div>
                        </div>
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

import axios from 'axios';
import store from '@/store/index';
export default {
    components: {
        /* eslint-disable vue/no-unused-components */
        Header,
        Left,
        Main,
        vue,
        // DatePicker,
        // BootstrapVue,
    },
    data() {
        return {
            checkedNames: [],
            checkList1: ["cloudmain", "인천1", "성남", "부산", "인천2", "논산", "인천냉동", "진천", "진안", "인천3", "안산", "공주", "남원"],
            checkList2: ["악취", "대기", "수질"],
            checkList3: ["정문옥상", "기숙사 옥상", "수질보전장", "흡입구", "배출구", "굴뚝#1", "배출구", "흡입구", "new equipment", "인천1-1", "인천1-2", "발효대두박 전단", "발효대두박 후단", "추출 A 전단", "추출 A 후단", "추출 A 전단", "추출 A 후단", "대두박 전단", "대두박 후단", "흡입구", "부지경계선", "중간", "배출구", "설비제어", "중간", "배출구", "폐수처리장 흡입구", "폐수처리장 배출구", ],
            checkList4: ["odor", "voc", "h2s", "nh3", "습도", "온도", "ch1", "정문옥상", "정문옥상 풍향", "정문옥상 풍속", "odor", "voc", "h2s", "nh3", "온도", "습도", "ch1", "기숙사 옥상", "기숙사옥상 풍향", "기숙사옥상 풍속", "odor", "voc", "h2s", "nh3", "습도", "온도", "ch1", "수질보전장", "수질보전장 풍향", "수질보전장 풍속", "TOC", "원수 TOC", "ODOR", "VOC", "H2S", "NH3", "온도", "배출구", "ODOR", "VOC", "H2S", "NH3", "온도", "흡입구", "ODOR", "VOC", "H2S", "NH3", "온도", "온도2", "습도", "배출구", "ODOR", "VOC", "H2S", "NH3", "온도", "온도2", "습도", "흡입구", "황화수소", "암모니아", "총휘발성유기화합물", "복합악취", "황화수소", "암모니아", "총휘발성유기화합물", "복합악취", "황화수소", "암모니아", "총휘발성유기화합물", "추출A전단 복합악취", "황화수소", "암모니아", "총휘발성유기화합물", "추출A후단 복합악취", "NH3 추출 A 전단", "H2S 추출A전단", "NH3 추출A전단", "TVOC 추출A전단", "OU 추출A전단", "H2S 추출A후단", "NH3 추출A후단", "TVOC 추출A후단", "OU 추출A후단", "H2S 대두박전단", "NH3 대두박전단", "TVOC 대두박전단", "OU 대두박전단", "H2S 대두박후단", "NH3 대두박후단", "TVOC 대두박후단", "OU 대두박후단", "흡1", "흡2", "흡3", "흡4", "흡입구", "흡입구", "부1", "부2", "부3", "부4", "부지경계선", "중1", "중2", "중3", "중4", "중11", "배1", "전류 풍향", "전류 풍속", "배2", "배3", "배4", "3", "4", "배출구 배수", "중1", "중2", "중3", "중4", "2H LAMP", "배1", "풍속", "풍향", "배2", "배3", "배4", "배출구", "S-CUBE 배출구", "S-CUBE배출구", "odor", "voc", "h2s", "nh4", "온도", "폐수처리장 흡입구", "odor", "voc", "h2s", "nh3", "온도", "폐수처리장 배출구", ],
            checkListVal1: [],
            checkListVal2: [],
            checkListVal3: [],
            checkListVal4: [],

            comboServers: null, //사업장   
            comboCategories: null, //측청분야     

            mode: 'single',
            info: {},
            List: [],
            ListCount: 0,
            ListFields: [{
                    field: 'serverKey',
                    label: '사업장번호',
                    hidden: true
                },
                {
                    field: 'serverName',
                    label: '사업장'
                },
                {
                    field: 'equipmentKey',
                    label: '분야'
                },
                {
                    field: 'equipmentName',
                    label: '측정위치'
                },
                {
                    field: 'sensorName',
                    label: '측정항목'
                },
                {
                    field: 'unit',
                    label: '단위'
                },
                {
                    field: 'measurementDate',
                    label: '측정일시'
                },
                {
                    field: 'measurementValue',
                    label: '측정값'
                }
            ],

            findTp: '',
            findSz: '',
            findTps: [{
                    value: 'workplace01',
                    text: '공주공장'
                },
                {
                    value: 'workplace02',
                    text: '남원공장'
                },
                {
                    value: 'workplace03',
                    text: '논산공장'
                },
                {
                    value: 'workplace04',
                    text: '부산공장'
                },
                {
                    value: 'workplace05',
                    text: '씨푸드 성남'
                },
                {
                    value: 'workplace06',
                    text: '씨푸드 음성'
                },
                {
                    value: 'workplace07',
                    text: '씨푸드 이천'
                },
                {
                    value: 'workplace08',
                    text: '안산공장'
                },
                {
                    value: 'workplace09',
                    text: '양산공장'
                },
                {
                    value: 'workplace10',
                    text: '영등포공장'
                },
                {
                    value: 'workplace11',
                    text: '원지'
                },
                {
                    value: 'workplace12',
                    text: '인천1공장'
                },
                {
                    value: 'workplace13',
                    text: '인천2공장'
                },
                {
                    value: 'workplace14',
                    text: '인천3공장'
                },
                {
                    value: 'workplace15',
                    text: '인천냉동식품공장'
                },
                {
                    value: 'workplace16',
                    text: '진안공장'
                },
                {
                    value: 'workplace17',
                    text: '진천BC'
                },
                {
                    value: 'workplace18',
                    text: '진천공장'
                },
            ],
            pageNo: 1,
            perPage: 10,
            perCodeNo: 1,
        }
    },
    computed: {},

    beforeMount() {

    },
    created() {
        this.config = {
            headers: {
                "authorization": this.$Axios.defaults.headers.common["authorization"]
            }
        }
        this.getConditionList();
    },
    methods: {
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
        axLen3(e) { //최대 3자 이하로구성
            return String(e).substring(0, 3);
        },
        maxLen10(e) { //최대 10자이하로 구성
            return String(e).substring(0, 10);
        },

    },
    // 조회버튼 클릭
    searchBtn() {

    },
    // 엑셀저장버튼 클릭
    excelBtn() {

    },
    // 그래프버튼 클릭
    graphBtn() {

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

.mailInner,
.mailConBox {
    margin: 0 auto;
}

.mailCreateConBox {
    width: 800px;
    margin: 0 auto;
    margin-left: 375px;
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

.mailSave,
.mailList {
    position: absolute;
    top: 20px;
    width: 100px;
    height: 40px;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgb(187, 231, 248);
    box-shadow: 0px 0px 3px blue;
    font-size: 14px;
    text-decoration: none;
    line-height: 40px;
    text-align: center;
    color: black;
}

.mailSave {
    right: 120px;
}

.mailList {
    right: 15px;
}

.mailSave:hover,
.mailList:hover {
    font-weight: bold;
    background: rgb(81, 81, 255);
    color: white;
    text-decoration: none;
}

/* Contents */
.mail_con {
    height: 210px;
    border: 1px solid #d7dadd;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #f9fcff;
}

.mail_con>div {
    height: inherit;
    line-height: 70px;
    font-family: "CJ Onlyone Bold";
}

.mail_con>div>div {
    font-size: 18px;
}

.mail_con>div {
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
}

.mail_con>div>div {
    float: left;
    width: 30%;
    height: 100%;
}

.mail_con>div>div:nth-child(2) {
    width: 70%;
}

.mail_con>div>div>input,
.mail_con>div>div>select {
    width: 70%;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 7px;
    font-size: 14px;
}

.mail_con>div>div>select {
    overflow-y: hidden;
}
</style>
