<template>
<b-container fluid>
    <div class="home">
        <div style="display:flex;">
            <div class="inner mainInner">
            메인 페이지
            </div>
        </div>
    </div>
</b-container>
</template>

<script>
import store from "@/store/index";
// import Header from '@/components/header.vue'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    components: {

    },
    name: 'App',
    data() {
        return {
            busy:false,
            timeout : null,

            week: ['일', '월', '화', '수', '목', '금', '토'],
            columnDefs: null,
            rowData: null,
            weather: {},
            areaPin: null,
            imgURL: null,
            windDeg: "",
            opRate: 0,
            title: "정상",
            id1: "test1",
            id2: "test2",
            pinName: "전체",
            pin: null,
            moniList: null,
            moniList2: null,
            moniList2val:[],
            moniList3val:[],
            checkPin:false,
            areaNm:"전체",

        }
    },
    beforeDestroy() {
        this.clearTimeout()
        clearInterval(this.timer);
        clearInterval(this.polling02);

    },

    beforeMount() {
        // this.getfactory();
        this.startArea();
        store.state.ckServer = [];
        store.state.ckCate = [];
        store.state.ckEquip = [];
        store.state.ckSensor = [];

        this.columnDefs = [{
                headerName: 'make',
                field: 'make',
                rowSpan: function (params) {
                    return params.data.country === 'make' ? 2 : 1;
                }
            },
            {
                headerName: 'model',
                field: 'model'
            },
        ];
        // this.rowData = this.rowData
    },
    
    created() {

    },
    methods: {
    }

}
</script>

<style lang="scss">
* {
    font-family: 'CjFontBodyLight';    
}

.home {
    height: 820px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
}

.mainInner {
    width: 100%;
    font-size: 20px;
    height: 100%;
    *{
        font-weight:bold;
        font-family:CjFontBodyRegular;
    }
    .conWrap {
        width: 100%;
        height: 100%;
        font-size: 14px;
    }
    .mapImg {
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 830px;
        background: url(../assets/MAP.png) 40%;
        background-size: 80% 100%;
    }
    .mainConWrap {
        >div{
            box-sizing: border-box;
            border-radius: 5px;
            padding: 20px;
            background: #f3faff;
            box-shadow: 0px 0px 3px rgb(0, 0, 0);
        }

        .row{
            >div {
                padding: 0;
            }
        }

        .con_left01 {
            height: 180px;
            margin-top: 0px;
            text-align: left;

            .weatherWrap {
                >div{
                    >div{
                        box-sizing: border-box;
                        padding-left: 10px;
                        font-size:2rem;

                        >div {
                            font-size: 3.5rem;
                            line-height: 40px;
                            font-weight: "bold";
                            &:nth-child(3){
                                padding-left:1.5rem;
                                font-size:3.4rem;
                            }
                        }
                    }
                }        
            }

            >div {
                /* 상단 - 대한민국 */
                &:nth-child(1){
                    height: 20px;
                    font-size: 24px;
                    line-height: 10px;
                    box-sizing: border-box;
                }
                /* 중단 - 날짜, 날씨, 온도 */
                &:nth-child(2) {
                    height: 60px;
                    margin-top: 10px;

                    span {
                        display: block;
                        width: 100%;
                        height: 40%;
                        font-size:1.7rem;
                    }
                }
                /* 하단 - 바람,습도,강수확률 */
                &:nth-child(3) {
                    height: 60px;
                    font-size: 14px;
                }
                >div {
                    height:100%;
                    box-sizing: border-box;
                    padding-left: 10px;
                    padding-right: 10px;
                    span{
                        display: block;
                        width: 100%;
                        line-height: 25px;
                        font-size: 1.5rem;
                    }
                    div{
                        height:100%;
                        position:relative;
                    }
                }
            }

            img {
                position:absolute;
                left:50%;
                width: 30px;
                height: 40px;
                justify-content: center;
                transform:translate(-50%);
                margin-top:calc(50% - 30px)
            }

            #weatherImg {
                position: relative;
                img {
                    position:absolute;
                    top:50%;
                    width: 60%;
                    height: 110%;
                }
            }
            .windIcon {
                height: 40px;
            }
        }
    }
    .con_left02 {
        position:relative;
        margin-top: 5px;
        
        >div {
            width: 100%;
            text-align: left;
            &:nth-child(1) {
                font-size: 24px;
            }
        }
        .chartLegend{
            position:absolute;
            top:22%;
            right:0;
            width:40%;
            // outline:1px solid;
            span{
                margin-left:15%;
                position:relative;
                &:before{
                    content:"";
                    position:absolute;
                    top:1px;
                    left:-20px;
                    background:#ccc;
                    border-radius:100%;
                    width:15px;
                    height:15px;
                }
                &:nth-child(1){
                    margin-left:35%;
                    &:before{
                        background:#5151ff;
                    }
                }
                &:nth-child(2){
                    &:before{
                        background:#ccc;
                    }
                }
            }
        }
        .chartWrap {
            height: 40px;
            position: relative;
            .chartOut{
                width:75%;
                height:30px;
                background:#ccc;
                border-radius: 7px;
                overflow: hidden;
                .chartIn{
                    width: 0%;
                    background:#5151ff;
                    height:100%;
                    border-radius: 7px;
                }
            }
            .chartPlus{
                position:relative;
                left:1%;
                font-size:0.5rem;
            }
            .chartPer {
                position: absolute;
                top:0;
                right:0;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                font-family: CjFontTitleBold;
            }   
        }
    }
    .con_left03 {
        height: 480px;
        margin-top: 5px;
        *{
            font-weight:bold;
        }
        >div {
            width: 100%;
            text-align: left;
            &:nth-child(1) {
                font-size: 24px;
                height: 40px;
            }
        }
        .monitorWrap {
            height: 92%;
            overflow-y: scroll;
            .monitor {
                height: 60px;
                box-sizing: border-box;
                padding: 0px;
                margin: 0;
                margin-top: 3px;
                &:nth-child(1) {
                    border-top: 1px solid rgb(221, 221, 221);
                    margin-top: 0;
                }
                >div {
                    height: 100%;
                    /* line-height: 40px; */
                    text-align: center;
                    border-bottom: 1px solid rgb(221, 221, 221);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    word-break: keep-all;

                    >ul {
                        width: 100%;
                        height: 10px;
                        /* margin-top: 15px; */
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        >li {
                            height: 10px;
                            float: left;
                            box-sizing: border-box;
                            margin-left: 1px;
                        }
                    }
                }
            }
            .percent_line{
                position: absolute;
                z-index: 10;
                top:0;
                width: 33%;
                border-left: 1px solid white;
                border-right: 1px solid white;
                left: 33%;
            }
            .percent_up{
                width: 0%;
                background: rgb(81, 81, 255);
                border: none;
                position: absolute;
                top: 0;
                left: 0;
            }
            .percent_down{
                border: 2px solid rgb(223, 223, 223);
                background: rgb(228, 228, 228);
                width: 100%;
            }

        }
    }
    
    .pinWrap {
        position: relative;
        margin-top: 20px;
        height: 800px;
        *{
            font-family: CjFontTitleMedium;
        }
        >div {
            position: absolute;
            width: 65px;
            height: 25px;
            font-size: 14px;
            line-height: 25px;
            text-align: center;
            cursor:pointer;
            >p {
                content: "";
                position: absolute;
                top: -15px;
                left: 25px;
                width: 17px;
                height: 17px;
                border: 4px solid black;
                border-radius: 100%;
                transition: all 0.2s;
            }
        }
        /*지도 pin 위치*/
        .pin01 {
            /*공주*/
            top: 400px;
            left: 280px;
        }

        .pin02 {
            /*남원*/
            top: 580px;
            left: 330px;
        }

        .pin03 {
            /*논산*/
            top: 420px;
            left: 220px;
        }

        .pin04 {
            /*부산*/
            top: 640px;
            left: 640px;
        }

        .pin05 {
            /*씨푸드 성남*/
            top: 260px;
            left: 300px;
            width:75px;
            word-break: keep-all;
            text-indent: -10px;
        }

        .pin06 {
            /*씨푸드 이천*/
            top: 220px;
            left: 360px;
        }

        .pin07 {
            /*안산*/
            top: 210px;
            left: 290px;
        }

        .pin08 {
            /*양산*/
            top: 610px;
            left: 590px;
        }

        .pin09 {
            /*영등포*/
            top: 140px;
            left: 260px;
        }

        .pin10 {
            /*원지*/
            top: 320px;
            left: 190px;
        }

        .pin11 {
            /*음성*/
            top: 260px;
            left: 410px;
        }

        .pin12 {
            /*인천1*/
            top: 80px;
            left: 140px;
        }

        .pin13 {
            /*인천2*/
            top: 110px;
            left: 180px;
        }

        .pin14 {
            /*인천3*/
            top: 150px;
            left: 140px;
        }

        .pin15 {
            /*인천냉동*/
            top: 170px;
            left: 200px;
        }

        .pin16 {
            /*진안*/
            top: 520px;
            left: 350px;
        }

        .pin17 {
            /*진천*/
            top: 330px;
            left: 360px;
        }

        .pin18 {
            /*진천BC*/
            top: 360px;
            left: 400px;
        }
    }

}

.wpNowState{
    position:absolute;
    top:0;
    left:0;
    z-index:3;
    width:7px;
    height:100%;
    background:red;
    line-height:2;
    display:flex;
}

.v-application ul,
.v-application ol {
    padding-left: 0;
}

#test1::before {
    content: "";
    position: absolute;
    top: 17px;
    left: -20px;
    width: 15px;
    height: 15px;
    background: rgb(81, 81, 255);
    border-radius: 7px;
}

#test2::before {
    content: "";
    position: absolute;
    top: 17px;
    left: -20px;
    width: 15px;
    height: 15px;
    border-radius: 7px;
    background: rgb(228, 228, 228);
}

.monitorWrap::-webkit-scrollbar {
    width: 7px;
    border-radius: 5px;
}

.monitorWrap::-webkit-scrollbar-thumb {
    background: rgb(81, 81, 255);
    border-radius: 5px;
}

.monitorWrap::-webkit-scrollbar-track {
    background: rgb(179, 179, 179);
    border-radius: 5px;
}
.row {
    justify-content: space-around;
    align-items: center;
}
.v-card {
    padding: 10px;
    padding-top: 20px;
}

.card-list {
    overflow-y: scroll;
    max-height: 730px;
    margin-top: 10px;
}

/* 스크롤 스타일 변경 */
.card-list::-webkit-scrollbar {
    width: 7px;
    border-radius: 5px;
}

.card-list::-webkit-scrollbar-thumb {

    background: rgb(81, 81, 255);
    border-radius: 5px;
}

.card-list::-webkit-scrollbar-track {
    background: rgb(179, 179, 179);
    border-radius: 5px;
}

/* card */

.card-text>p {
    margin-bottom: 3px;
    color:black;
}

.card-text {
    word-break: keep-all;
}

.card-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.card-content .v-avatar {
    width: 210px !important;
    min-width: 210px !important;
}

.card-content .v-avatar .v-image .v-image__image--cover {
    background-size: 125% 130% !important;
}

.v-card>a {
    text-decoration: none;
}

.spinner-border{
    width:7rem;
    height:7rem;
    border:.5rem solid currentColor;
    border-right-color:transparent;
}
.text-black{
    color:black;
}
</style>
