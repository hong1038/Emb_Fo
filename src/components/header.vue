<template>
<b-container fluid>
    <!-- start of :: header wrap -->
    <!-- start of :: header -->
    <div id="header">
        <div class=" inner clear">
            <div class="logo">
                <router-link :to="{ name: 'Main'}">
                    <img src="../assets/logo.png" alt="logo">
                </router-link>
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <span class="menu" id="menu_01" v-on:click="menuBtn">
                            Main
                        </span>
                        <ul class="main_nav main_nav01">
                            <li>
                                <router-link :to="{ name: 'Main'}">전체</router-link>
                            </li>
                            <li>
                                <a v-on:click="resetMain(10000)">경인권</a>
                            </li>
                            <li>
                                <a v-on:click="resetMain(10015)">중부권</a>
                            </li>
                            <li>
                                <a v-on:click="resetMain(10021)">남부권</a>
                            </li>
                            <li>
                                <a v-on:click="resetMain(10031)">영남권</a>
                            </li>
                            <li>
                                <a v-on:click="resetMain(10041)">계열사</a>
                            </li>
                            <li>
                                <a v-on:click="resetMain(10051)">바이오</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span class="menu" id="menu_02" v-on:click="menuBtn">통계</span>
                        <ul class="main_nav main_nav02">
                            <li>
                                <router-link :to="{ name: 'measurementData'}">측정값 조회</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'measurementDataByDay'}">일간통계 및 그래프</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'measurementDataByMon'}">월간통계 및 그래프</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'preventionDataByDay'}">일간 방지시설 통계</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'preventionDataByMon'}">월간 방지시설 통계</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'normalDistribution1'}">정규분포</router-link>
                            </li>
                            
                        </ul>
                    </li>
                    <li>
                        <span class="menu" id="menu_03" v-on:click="menuBtn">대응</span>
                        <ul class="main_nav main_nav03">
                            <li>
                                <router-link :to="{ name: 'change'}">변경점 대응</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'excess'}">초과이력 대응</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'system'}">측정기/설비 이상 대응</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'manage'}">운영 특이사항</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'report'}">월말 보고</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span class="menu" id="menu_04" v-on:click="menuBtn">진단</span>
                        <ul class="main_nav main_nav04">
                            <li>
                                <router-link :to="{ name: 'status'}">측정기 현황</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'maintenanceStatus'}">측정기 유지보수 계약 및 실행현황</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span class="menu" id="menu_05" v-on:click="menuBtn">보고</span>
                        <ul class="main_nav main_nav05">
                            <li>
                                <router-link :to="{ name: 'daily1'}">일일 관리일지</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'monthly1'}">월말 보고</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'headMonthly1'}">본부 월말 보고 통계</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span class="menu" id="menu_06" v-on:click="menuBtn">설정</span>
                        <ul class="main_nav main_nav06">
                            <li>
                                <router-link :to="{ name: 'workplace'}">사업장 기준 정보</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'manager'}">사용자 정보</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'measurement'}">측정기별 기준 정보</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'maintenance'}">측정기별 유지보수 계약 정보</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'mailreceiver'}">메일 수신자</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- end of :: header -->
    <!-- end of :: wrap -->
</b-container>
</template>

<script>
import 'ag-grid-enterprise';
import store from '@/store/index';
export default {
    data(){
        return{
            count01 : "0",
            count02 : "0",
            count03 : "0",
            count04 : "0",
            count05 : "0",
            count06 : "0",
        }
    },
    methods: {
        resetMain(areaCode) {
            store.state.areaCode = areaCode
            //console.log("header.store.state.areaCode = " + store.state.areaCode)
            this.$emit("callbackLocation");
        },
        menuBtn : function(event){
            let show = event.target.id;
            
            let menuStyle = document.getElementsByClassName('menu')
            let menu = new Array();
            menu = document.getElementsByClassName('main_nav');
            for(let i=0; i < menu.length; i++){
                menu[i].style.display = "none"
                menuStyle[i].style.fontSize = '22px'
                menuStyle[i].style.textShadow = "none"
                // menuStyle[i].style.background = "url('@/assets/icon/icon_0"+(i+1)+".png') 20px center no-repeat"
                console.log(menuStyle[i].style.background)
            }
           
           
            if(show == "menu_01"){
                if(this.count01 == "0"){
                    menu[0].style.display = "block";
                    menuStyle[0].style.fontSize = "24px"
                    menuStyle[0].style.textShadow = "1px 1px 3px rgb(251,255,0)"
                    this.count01 = "1"

                    this.count02 = "0"
                    this.count03 = "0"
                    this.count04 = "0"
                    this.count05 = "0"
                    this.count06 = "0"
                }
                else{
                    menu[0].style.display = "none";
                    this.count01 = "0"
                }
            }
            else if(show == "menu_02"){
                if(this.count02 == "0"){
                    menu[1].style.display = "block";
                    menuStyle[1].style.fontSize = "24px"
                    menuStyle[1].style.textShadow = "1px 1px 3px rgb(251,255,0)"
                    this.count02 = "1"

                    this.count01 = "0"
                    this.count03 = "0"
                    this.count04 = "0"
                    this.count05 = "0"
                    this.count06 = "0"
                }
                else{
                    menu[1].style.display = "none";
                    this.count02 = "0"
                }
            }
            else if(show == "menu_03"){
                if(this.count03 == "0"){
                    menu[2].style.display = "block";
                    menuStyle[2].style.fontSize = "24px"
                    menuStyle[2].style.textShadow = "1px 1px 3px rgb(251,255,0)"
                    this.count03 = "1"

                    this.count01 = "0"
                    this.count02 = "0"
                    this.count04 = "0"
                    this.count05 = "0"
                    this.count06 = "0"
                }
                else{
                    menu[2].style.display = "none";
                    this.count03 = "0"
                }
            }
            else if(show == "menu_04"){
                if(this.count04 == "0"){
                    menu[3].style.display = "block";
                    menuStyle[3].style.fontSize = "24px"
                    menuStyle[3].style.textShadow = "1px 1px 3px rgb(251,255,0)"
                    this.count04 = "1"

                    this.count01 = "0"
                    this.count02 = "0"
                    this.count03 = "0"
                    this.count05 = "0"
                    this.count06 = "0"
                }
                else{
                    menu[3].style.display = "none";
                    this.count04 = "0"
                }
            }
            else if(show == "menu_05"){
                if(this.count05 == "0"){
                    menu[4].style.display = "block";
                    menuStyle[4].style.fontSize = "24px"
                    menuStyle[4].style.textShadow = "1px 1px 3px rgb(251,255,0)"
                    this.count05 = "1"

                    this.count01 = "0"
                    this.count02 = "0"
                    this.count03 = "0"
                    this.count04 = "0"
                    this.count06 = "0"
                }
                else{
                    menu[4].style.display = "none";
                    this.count05 = "0"
                }
            }
            else{
                if(this.count06 == "0"){
                    menu[5].style.display = "block";
                    menuStyle[5].style.fontSize = "24px"
                    menuStyle[5].style.textShadow = "1px 1px 3px rgb(251,255,0)"
                    this.count06 = "1"

                    this.count01 = "0"
                    this.count02 = "0"
                    this.count03 = "0"
                    this.count04 = "0"
                    this.count05 = "0"
                }
                else{
                    menu[5].style.display = "none";
                    this.count06 = "0"
                }
            }
        }
    }
};
</script>

<style>
/*font*/

@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url(https://cdn.jsdelivr.net/font-kopub/1.0/kopubdotum.css);

/* 모든 Device를 위한 공통 로드 */

body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
h7,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td,
figure,
figcaption,
span {
    margin: 0;
    padding: 0;
    letter-spacing: -0.5px;
}

span {
    color: inherit;
}

* {
    -webkit-text-size-adjust: none;
}

body {
    height: 100%;
    font-size: 10px;
    font-family: 'Noto Sans KR', 'Noto Sans Korean', sans-serif;
}

table {
    border-spacing: 0;
    *border-collapse: collapse;
}

fieldset,
img {
    border: 0
}

img {
    vertical-align: middle;
    width: 100%;
}

address,
caption,
cite,
code,
dfn,
em,
th,
var {
    font-style: normal;
    font-weight: normal;
}

ol,
ul {
    list-style: none;
}

legend,
caption {
    text-indent: -100%;
    *text-indent: 0;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
    text-shadow: none;
    color: transparent;
}

a {
    text-decoration: none;
    outline: 0;
    color: rgb(0, 0, 0);
}

select,
input {
    vertical-align: middle;
}

section {
    overflow: hidden;
}

:root,
html {
    font-size: 10px;
}

.ir {
    overflow: hidden;
    text-indent: -9999px;
    position: absolute;
    z-index: -9999;
    top: -10000px;
    left: -100000px;
}

.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

.block {
    display: block;
}

.inline {
    display: inline;
}

.inlineBlock {
    display: inline-block;
    *zoom: 1;
    *display: inline;
}

.clear::after {
    content: "";
    clear: both;
    display: block;
}

.oh {
    overflow: hidden
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.ovh {
    overflow: hidden;
}

.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto
}

.container-fluid {
    padding: 0;
}

.float-left {
    float: left !important
}

@media (min-width:576px) {

    .container,
    .container-sm {
        max-width: 540px
    }
}

@media (min-width:768px) {

    .container,
    .container-md,
    .container-sm {
        max-width: 720px
    }
}

@media (min-width:992px) {

    .container,
    .container-lg,
    .container-md,
    .container-sm {
        max-width: 960px
    }
}

@media (min-width:1200px) {

    .container,
    .container-lg,
    .container-md,
    .container-sm,
    .container-xl {
        max-width: 1140px
    }
}

.d_hidden {
    display: block !important;
}

.m_hidden {
    display: none !important;
}

/*slick*/

.slick-slide,
.slick-slide:focus {
    outline: 0;
}

/*font*/

@import url(https://cdn.jsdelivr.net/npm/noto-sans-kr@0.1.1/styles.css);

@font-face {
    font-family: CjFontBodyLight;
        font-style: normal;
    font-weight: 100;
    src: url('../../src/assets/fonts/CJ ONLYONE NEW body Light.ttf') format('truetype');
}

@font-face {
    font-family: CjFontBodyRegular;
        font-style: normal;
    font-weight: 400;
    src: url('../../src/assets/fonts/CJ ONLYONE NEW body Regular.ttf') format('truetype');
}

@font-face {
    font-family: CjFontTitleBold;
        font-style: normal;
    font-weight: 900;
    src: url('../../src/assets/fonts/CJ ONLYONE NEW title Bold.ttf') format('truetype');
}

@font-face {
    font-family: CjFontTitleMedium;
        font-style: normal;
    font-weight: 400;
    src: url('../../src/assets/fonts/CJ ONLYONE NEW title Medium.ttf') format('truetype');
}



@font-face {
    font-family: AppleSDGothicNeo;
    font-style: normal;
    font-weight: 100;
    src: url(/font/AppleSDGothicNeoT.ttf) format('truetype');
    /*For IE6~8*/
}

@font-face {
    font-family: AppleSDGothicNeo;
    font-style: normal;
    font-weight: 300;
    src: url(/font/AppleSDGothicNeoT.ttf) format('truetype');
    /*For IE6~8*/
}

@font-face {
    font-family: AppleSDGothicNeo;
    font-style: normal;
    font-weight: 300;
    src: url(/font/AppleSDGothicNeoL.ttf) format('truetype');
    /*For IE6~8*/
}

@font-face {
    font-family: AppleSDGothicNeo;
    font-style: normal;
    font-weight: 500;
    src: url(/font/AppleSDGothicNeoR.ttf) format('truetype');
    /*For IE6~8*/
}

@font-face {
    font-family: AppleSDGothicNeo;
    font-style: normal;
    font-weight: 700;
    src: url(/font/AppleSDGothicNeoSB.ttf) format('truetype');
    /*For IE6~8*/
}

@font-face {
    font-family: AppleSDGothicNeo;
    font-style: normal;
    font-weight: 900;
    src: url(/font/AppleSDGothicNeoB.ttf) format('truetype');
    /*For IE6~8*/
}

/* input 기본 스타일 초기화 */

/* IE10 이상에서 input box 에 추가된 지우기 버튼 제거 */
*{
 font-family: 'CjFontBodyRegular';    
}
input::-ms-clear {
    display: none;
}

/* input type number 에서 화살표 제거 */

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

/* margin */

/* margin */

.mr0 {
    margin-right: 0 !important;
}

.mt0 {
    margin-top: 0 !important;
}

.mt10 {
    margin-top: 10px !important;
}

.mt15 {
    margin-top: 15px !important;
}

.mt20 {
    margin-top: 20px !important;
}

.mt40 {
    margin-top: 40px !important;
}

.mt100 {
    margin-top: 100px !important;
}

.mtM10 {
    margin-top: -10px !important
}

.ml0 {
    margin-left: 0 !important;
}

.mr1 {
    margin-right: 1px !important;
}

.mb0 {
    margin-bottom: 0 !important;
}

.mb30 {
    margin-bottom: 30px !important;
}

.mr30 {
    margin-right: 30px !important;
}

/* padding */

.pt0 {
    padding-top: 0 !important;
}

.pb6 {
    padding-bottom: 6px !important;
}

.pl0 {
    padding-left: 0 !important;
}

.pr0 {
    padding-right: 0 !important;
}

/* text type */

/* btns */

/*title*/

.sub-title h3 {
    font-weight: 900;
    font-size: 2.604165vw;
}

.sub-title2 {
    margin-top: 4%;
}

.sub-title2 h3 {
    font-weight: 700;
    font-size: 2.604165vw;
}

.menu{
    font-family: CjFontTitleBold;
}
/* align */

.cl_left {
    clear: left
}

.center {
    text-align: center !important;
}

.top {
    vertical-align: top !important
}

.bottom {
    vertical-align: bottom
}

.middle {
    vertical-align: middle !important
}

.alignRight {
    text-align: right !important
}

.alignLeft {
    text-align: left !important
}

/* position */

.posRel {
    position: relative;
    z-index: 1;
}

/* width */

.w50 {
    width: 50% !important
}

.w33 {
    width: 33.33% !important
}

/* height */

.h30 {
    height: 30px;
}

/* text style */

.bold {
    font-weight: 700;
}

.redTxt {
    color: red !important
}

.blueTxt {
    color: blue !important
}

.greenTxt {
    color: #548826 !important
}

.color777 {
    color: #777 !important
}

/* display */

.displayNone {
    display: none;
}

/* lineheight */

.lineHeight0 {
    line-height: 0px !important;
}

.scroll_box::-webkit-scrollbar {
    width: 7px;
}

.scroll_box::-webkit-scrollbar-track {
    background-color: #cbced5;
}

.scroll_box::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #0052BB;
}

.scroll_box::-webkit-scrollbar-button {
    width: 0;
    height: 0;
}

.scroll_box2::-webkit-scrollbar {
    width: 6px;
}

.scroll_box2::-webkit-scrollbar-track {
    background-color: #E7E9ED;
}

.scroll_box2::-webkit-scrollbar-thumb {
    background-color: #0052BB;
}

.scroll_box2::-webkit-scrollbar-button {
    width: 0;
    height: 0;
}

/*
input[type="checkbox"]:checked+label:after {
    background: url(/imgs/common/bg_checkbox_on.png) center /100% no-repeat;
}
*/

input[type="checkbox"]+label {
    position: relative;
    padding-left: 30px;
    font-size: 15px;
    color: #000;
}

input[type="checkbox"]+label:after {
    position: absolute;
    top: calc(50% - 9px);
    left: 0;
    content: '';
    width: 20px;
    height: 20px;
    background: url(/imgs/common/bg_checkbox_off.png) center /100% no-repeat;
}

/* Smartphones (portrait and landscape) */

@media only screen and (min-device-width: 320px) {
    body {
        -webkit-text-size-adjust: none;
    }
}

/* Smartphones (landscape) */

@media only screen and (min-width: 321px) {
    /* Styles */
}

/* Smartphones (portrait) */

@media only screen and (max-width: 320px) {
    /* Styles */
}

/* iPads (portrait and landscape) */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    /* paging */
    /* Styles */
}

/* iPads (landscape) */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    /* Styles */
}

/* iPads (portrait) */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
    /* Styles */
}

/* Desktops and laptops */

@media only screen and (min-width: 1025px) {
    /* Styles */
    /* paging */
}

/* Large screens  */

@media only screen and (min-width: 1824px) {
    /* Styles */
}

/* iPhone 4 */

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
only screen and (min-device-pixel-ratio: 1.5) {
    /* Styles */
}

/*animation*/

@keyframes menuOpne {
    0% {
        height: 3px;
    }

    50% {
        width: 100%;
        height: 3px;
    }

    100% {
        width: 100%;
        height: 100%;
    }
}

@keyframes menuClose {
    0% {
        width: 100%;
        height: 100%;
    }

    50% {
        width: 100%;
        height: 3px;
    }

    100% {
        width: 0%;
        height: 3px;
    }
}

#wrap {
    min-width: 1600px;
    min-height: 960px;
}

#wrap .main_bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    min-width: 1600px;
    min-height: 960px;
}

#content_wrap {
    width: 100%;
    height: 960px;
    border-radius: 12px;
    background: #fff;
    margin: 5px auto 0 auto;
    position: relative;
}

#content_wrap #content {
    background: #F5F6FA;
    position: relative;
}

/*header start*/
#header {
    background: #242630;
}

#header .logo {
    float: left;
    width: 180px;
    height: 100%;
    padding-top: 15px;
    padding-left: 15px;
    margin-left: 20px;
}

#header .logo img {
    transition: all 0.2s;
    transform-origin: center;
}

#header .logo:hover img {
    width: 105%;
    transform: translate(-2%);
}

#header .nav {
    width: 75%;
    height: 80px;
    text-align: center;
    margin: auto;
}

#header .nav>ul {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
}

#header .nav>ul>li {
    float: left;
    width: 10%;
    margin-left:5%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
}
#header .nav>ul>li:nth-child(1){
    margin-left:2%;
}

#header .nav>ul>li>span {
    position: relative;
    font-size: 22px;
    line-height: 78px;
    color: #fff;
    width: 100%;
    height: 100%;
    display: inline-block;
    transition: all 0.2s;
    text-decoration: none;
    cursor: pointer;
}

#header .nav>ul>li>span:before {
    content: "";
    position: absolute;
    top: 60px;
    left: 17px;
    background: white;
    width: 87px;
    height: 2px;
    opacity: 0;
    transition: all 0.3s;
}

#header .nav>ul>li>span>a {
    display: block;
    width: inherit;
    height: inherit;
    color: inherit;
    text-decoration: none;
}

#header .nav>ul>li>#menu_01 {
    background: url(../assets/icon/icon_01.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_02 {
    background: url(../assets/icon/icon_02.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_03 {
    background: url(../assets//icon/icon_03.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_04 {
    background: url(../assets//icon/icon_04.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_05 {
    background: url(../assets//icon/icon_05.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_06 {
    background: url(../assets//icon/icon_06.png) 20px center no-repeat;
}

/*#header .nav>ul>li>#menu_01:hover {
    background: url(../assets/icon/icon_01_on.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_02:hover {
    background: url(../assets//icon/icon_02_on.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_03:hover {
    background: url(../assets//icon/icon_03_on.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_04:hover {
    background: url(../assets//icon/icon_04_on.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_05:hover {
    background: url(../assets//icon/icon_05_on.png) 20px center no-repeat;
}

#header .nav>ul>li>#menu_06:hover {
    background: url(../assets//icon/icon_06_on.png) 20px center no-repeat;
}

#header .nav>ul>li>span:hover {
    text-shadow: 1px 1px 3px rgb(251, 255, 0);
    font-size: 24px;
}*/

#header .nav>ul>li>span:hover:before {
    opacity: 1;
    box-shadow: 0px 0px 10px rgb(251, 255, 0);
}

#header .nav>ul>li>ul {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #363843;
    position: absolute;
    top: 80px;
    left: 0; 
    z-index: 1000;
    display:none;
}

#header .nav>ul>li>ul>li {
    float: left;
    margin-right: 45px;
    text-align: center;
}

#header .nav>ul>li>ul>li:first-child {
    margin-left: 360px;
}

#header .nav>ul>li>ul>li a {
    font-size: 20px;
    color: white;
    transition: all 0.2s;
    text-decoration: none;
    box-sizing: border-box;
}


/* contents 공통 */
.con {
    width: 1550px;
}

.con .con_box_right {
    padding: 20px;
}

/*table 공통 */
.ag-theme-alpine-dark * {
    color: white;
}

.v-text-field {
    padding: 0;
    margin-top: 0;
}

.ag-theme-alpine-dark .ag-ltr .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected) {
    border: none;
}

.ag-header-group-cell-with-group {
    border-left: 1px solid rgb(80, 80, 80);
    border-right: 1px solid rgb(80, 80, 80);
    border-bottom: none;
    border-top: none;
}

.ag-header-cell {
    font-size: 15px;
}

.ag-header-cell,
.ag-theme-alpine-dark .ag-ltr .ag-cell {
    border-right: 1px solid rgb(80, 80, 80) !important;
}

.ag-theme-alpine-dark .ag-ltr .ag-cell:last-child {
    border-right: transparent;
}
.ag-header-group-text{
    margin:0 auto;
}

/*vdatetime-input*/
.vdatetime {
    height: 100%;
}

.vdatetime-input {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    cursor: pointer;
}

.dateSelect {
    position: relative;
    width: 150px;
    height: 24px;
    cursor: pointer;
}

.dateSelect:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    transform-origin: center;
    transition: all 0.2s;
}

.dateSelectTo:after {
    left: 0px;
}

.dateSelect:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
}

.dateSelect:hover:after {
    transform-origin: center;
    border-bottom: 3px solid black;
    width: 150px;
    left: 0px;
}

.dateSelectTo:hover:after {
    left: 0px;
}

.dateSelect>div {
    width: 100%;
    height: 100%;
}

.dateSelect>div input {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 24px;
    box-sizing: border-box;
    padding-left: 10px;
    font-size:16px;
    font-weight:bold;
}

.v-date-picker-header{
    background:rgb(123,165,255) !important;
}

.v-date-picker-header *{
    font-size:16px !important;
}

.v-input__prepend-outer {
    display: none;
}

.v-input__slot {
    margin-bottom: 0;
}

.v-text-field > .v-input__control > .v-input__slot:before{
    border-style:none;
}

.v-text-field__details {
    display: none;
}

.v-picker__body {
    width: 100% !important;
}

.spinner-border{
    width:7rem;
    height:7rem;
    border:.5rem solid currentColor;
    border-right-color:transparent;
}
</style>
