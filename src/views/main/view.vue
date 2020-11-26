<template>
<b-container fluid>
    <Header></Header>

    <div style="display:flex;">
        <div class="inner viewInner">
            <div class="titleBox">
                {{this.title}}
                <div class="tabBox">
                    <div v-on:click="twoDBtn()">지도</div>
                    <div v-on:click="threeDBtn()">3D</div>
                </div>
            </div>
            <div class="viewBox viewLeftBox">

                <!-- <div class="imgBox" :style="{ backgroundImage: 'url(' + this.bgImg + ')' }"> -->
                <div class="imgBox" :style="imgBoxStyle">
                    <div class="viewPinWrap viewPinWrap01">
                        <!--<div v-for="item in pinList" :key="item.pin_code" :style="item.style" :value="item.pin_name" class="view_pin01" v-on:click="infoBtn(item)"><p style="display:flex;align-items:center;padding:0 5px"><span :style="'margin-right:5px;position:absoulte;left:35%;top:20px;border:1px solid #9bb5c7v;display:block;width:15px;height:15px;border-radius:100%;background:'+item.color"></span>{{item.pin_name}}</p></div>-->
                        <!--<div class="view_pin01"></div>
                        <div class="view_pin02"></div>
                        <div class="view_pin03"></div>
                        <div class="view_pin04"></div>
                        <div class="view_pin05"></div>
                        <div class="view_pin06"></div>
                        <div class="view_pin07"></div>
                        <div class="view_pin08"></div>
                        <div class="view_pin09"></div>
                        <div class="view_pin10"></div>
                        <div class="view_pin11"></div>
                        <div class="view_pin12"></div>
                        <div class="view_pin13">13</div>
                        <div class="view_pin14">14</div>
                        <div class="view_pin15">15</div>
                        <div class="view_pin16">16</div>
                        <div class="view_pin17">17</div>
                        <div class="view_pin18">18</div>-->
                        <div style="position:absolute;top:5px;left:10px;font-size:14px;display:none;">
                            <p v-for="item in pinList" :key="item.pin_code" style="margin-bottom:3px;display:flex;align-items:center;" ><span :style="'border:1px solid black;display:block;width:15px;height:15px;border-radius:100%;background:'+item.color"></span>{{item.pin_name}}</p>
                        </div>
                    </div>
                    <div class="pinBoxWrap" style="width:100%;">
                        <div :class="item.box_size+' pinBox pinBox'+item.box_code" v-for="(item,index) in boxList" :key="item.box_code" :style="item.style">
                            <div class="pinTitle">{{item.equipment_inner_nm}}</div>
                            <div class="scrollbox"  style="overflow-y:scroll;height:70%">
                                <div  class="container" >
                                        <b-row class="pinBody">
                                            <b-col cols="4">기준<span style="font-size:8px">(배)</span></b-col>
                                            <b-col cols="4">흡입<span style="font-size:8px">(배)</span></b-col>
                                            <b-col cols="4">배출<span style="font-size:8px">(배)</span></b-col>
                                        </b-row>
                                    </div>
                                    <div  class="container">
                                        <b-row class="pinBody">
                                            <b-col cols="4">1000</b-col>
                                            <b-col cols="4" >{{boxlistvalin[index]}}</b-col>
                                            <b-col cols="4" >{{boxlistvalout[index]}}</b-col>
                                        </b-row>
                                    </div>
                                <!-- <div v-for="(e,idx) in testdata" :key="index+idx"> -->
                                <!-- </div> -->
                            </div>
                        </div>


                        <!--공주 pin01-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--남원 pin02-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--논산 pin03-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox02">
                            <div class="pinTitle">부지경계선</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox03">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox04">
                            <div class="pinTitle">액젓 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--부산 - pin04-->
                        <!--<div class="pinBox pinBoxBig02 pinBox01">
                            <div class="pinTitle">원료동B 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox02">
                            <div class="pinTitle">원료동A 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox03">
                            <div class="pinTitle">식초 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox04">
                            <div class="pinTitle">전분건조C 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox05">
                            <div class="pinTitle">다시다C 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox06 ">
                            <div class="pinTitle">다시다A 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox07">
                            <div class="pinTitle">다시다B 방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxBig02 pinBox08">
                            <div class="pinTitle">HMR 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox09">
                            <div class="pinTitle">신관</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox10">
                            <div class="pinTitle">정문 옥상</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox11">
                            <div class="pinTitle">후문</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--성남 - pin05-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--안산 - pin07-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">20톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox02">
                            <div class="pinTitle">30톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox03">
                            <div class="pinTitle">35톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox04">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox05">
                            <div class="pinTitle">전분건조C 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox06">
                            <div class="pinTitle">재생로 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox07">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox08">
                            <div class="pinTitle">전분 350CMM 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox09">
                            <div class="pinTitle">전분 450CMM 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--인천1 pin12-->
                        <!--<div class="pinBox pinBoxSmall01 pinBox01">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox02">
                            <div class="pinTitle">열병합발전시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox03">
                            <div class="pinTitle">기숙사옥상</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox04">
                            <div class="pinTitle">정문 보안실 옥상</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--인천2 pin13-->
                        <!--<div class="pinBox pinBoxSmall01 pinBox01">
                            <div class="pinTitle">공정 악취배출시설(P9-47-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox02">
                            <div class="pinTitle">공정 악취배출시설(P9-66-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox03">
                            <div class="pinTitle">공정 악취배출시설(T9-117-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox04">
                            <div class="pinTitle">공정 악취배출시설(P9-139-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox05">
                            <div class="pinTitle">참기름(분) 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox06">
                            <div class="pinTitle">공정 악취배출시설(E9-50-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox07">
                            <div class="pinTitle">30톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox08">
                            <div class="pinTitle">25톤 보일러 배출구 TMS</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox09">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox10">
                            <div class="pinTitle">공정 악취배출시설(P9-117-S)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox11">
                            <div class="pinTitle">참기름(통) 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox12">
                            <div class="pinTitle">참기름(cold) 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--인천냉동 pin15-->
                        <!--<div class="pinBox pinBoxSmall01 pinBox01">
                            <div class="pinTitle">폐수처리장</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox02">
                            <div class="pinTitle">부지경계 (북)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox03">
                            <div class="pinTitle">부지경계 (서)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox04">
                            <div class="pinTitle">부지경계 (동)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox05">
                            <div class="pinTitle">부지경계 (남)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox06">
                            <div class="pinTitle">실내악취 B라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox07">
                            <div class="pinTitle">공정악취 B라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox08">
                            <div class="pinTitle">공정악취 A라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox09">
                            <div class="pinTitle">실내악취 A라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox10">
                            <div class="pinTitle">폐기물보관소</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBoxSmall01 pinBox11">
                            <div class="pinTitle">공정 A,B라인</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--진안 pin16-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">복합악취</b-col>
                                    <b-col cols="4">500</b-col>
                                    <b-col cols="4">3,820</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--진천 pin17-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">부지경계 #1</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox02">
                            <div class="pinTitle">폐수처리장 방류수 측정기(COD)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox03">
                            <div class="pinTitle">폐수처리장 방류수 측정기(TP)</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox04">
                            <div class="pinTitle">부지경계 #2</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox05">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->

                        <!--진천BC pin18-->
                        <!--<div class="pinBox pinBox01">
                            <div class="pinTitle">폐수처리장 방류수 실시간 측정기</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox02">
                            <div class="pinTitle">부지경계 #1</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox03">
                            <div class="pinTitle">통합조리동 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox  pinBox04">
                            <div class="pinTitle">폐수처리장 악취방지시설</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>
                        <div class="pinBox pinBox05">
                            <div class="pinTitle">부지경계 #2</div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">기준<span>(배)</span></b-col>
                                    <b-col cols="4">흡입<span>(배)</span></b-col>
                                    <b-col cols="4">배출<span>(배)</span></b-col>
                                </b-row>
                            </div>
                            <div class="container">
                                <b-row class="pinBody">
                                    <b-col cols="4">5,000</b-col>
                                    <b-col cols="4">4,000</b-col>
                                    <b-col cols="4">1,000</b-col>
                                </b-row>
                            </div>
                        </div>-->
                    </div>
                </div>
                    <!-- <b-overlay class="overlay" v-if="show" v-on:click="infoClose()"> -->
                <div class="bottomBox">
                    <div class="bottom_subMenuBox bottom_subMenuBox01" :style="'height:'+40*Math.ceil(equipList.length/8)" v-if="equipList.length <= 8">
                        <div @click="selectEq(item.equipment_key)" :class="'eqKey eqKey'+item.equipment_key" v-for="item in equipList" v-bind:key="item.equipment_key" @mouseover="item.check = false" @mouseleave="item.check = true">{{item.equipment_name.length > 10  && item.check === true ? item.equipment_name.substr(0,10)+"..." :item.equipment_name}}</div>
                    </div>
                    <div class="bottom_subMenuBox bottom_subMenuBox02" :style="'height:'+40*Math.ceil(equipList.length/8)+'px'"  v-else>
                        <div @click="selectEq(item.equipment_key,item)" :class="'eqKey eqKey'+item.equipment_key" v-for="item in equipList2" v-bind:key="item.equipment_key" @mouseover="item.check = false" @mouseleave="item.check = true">{{item.equipment_name.length > 10 && item.check === true ? item.equipment_name.substr(0,10)+"..." :item.equipment_name}}</div>
                    </div>
                    <div class="bottom_letBox" v-if="scrubber.length <= 0">
                        <p style="font-size:18px">데이터가 없습니다.</p>
                    </div>
                    
                <div class="bottom_letBox"  v-else>
                        <div style="width:100%;display:flex;justify-content:flex-end;padding-right:15px">
                            <div style="display:flex;align-items:center;justify-content: flex-end;">
                                <span style="margin-right:5px;display:block;width:12px;height:12px;border-radius:100%;background:rgb(81, 81, 255)"></span>
                                <span style="font-size:18px">정상</span>
                            </div>
                            <div style="display:flex;align-items:center;margin-left:12px">
                                <span style="margin-right:5px;display:block;width:12px;height:12px;border-radius:100%;background:#ff3131"></span>
                                <span style="font-size:18px">비정상</span>
                            </div>
                        </div>
                        <div class="infoBox" v-for="(item,key) in scrubber" v-bind:key="key">
                            <div :class="'infoTitle infoTitle_'+key"> <span style="color:white"> {{item.internal_name}} 스크러버</span></div>
                            <div class="infoBody">
                                <div class="infoBody_inlet">
                                    <div>흡입구</div>
                                    <div>
                                        <div :class="'in in'+key+'_1'"></div>
                                        <div :class="'in in'+key+'_2'"></div>
                                        <div :class="'in in'+key+'_3'"></div>
                                        <div :class="'in in'+key+'_4'"></div>
                                        <div :class="'in in'+key+'_5'"></div>
                                        <div :class="'in in'+key+'_6'"></div>
                                        <div :class="'in in'+key+'_7'"></div>
                                        <div :class="'in in'+key+'_8'"></div>
                                        <div :class="'in in'+key+'_9'"></div>
                                        <div :class="'in in'+key+'_10'"></div>
                                    </div>
                                    <div>1</div>
                                </div>
                                <div class="infoBody_outlet">
                                    <div>배출구</div>
                                    <div>
                                        <div :class="'out out'+key+'_1'"></div>
                                        <div :class="'out out'+key+'_2'"></div>
                                        <div :class="'out out'+key+'_3'"></div>
                                        <div :class="'out out'+key+'_4'"></div>
                                        <div :class="'out out'+key+'_5'"></div>
                                        <div :class="'out out'+key+'_6'"></div>
                                        <div :class="'out out'+key+'_7'"></div>
                                        <div :class="'out out'+key+'_8'"></div>
                                        <div :class="'out out'+key+'_9'"></div>
                                        <div :class="'out out'+key+'_10'"></div>
                                    </div>
                                    <div>{{Math.floor(item.outlet_avg_value)}}/{{Math.floor(item.outlet_standard_value)}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="viewBox viewRightBox" v-if="scrubber.length <= 0" >
                <p style="font-size:18px">데이터가 없습니다.</p>
            </div>
            <div v-else class="viewBox viewRightBox">
                <div style="display:flex;justify-content:flex-end;margin-right:15px">
                    <div style="display:flex;align-items:center;justify-content: flex-end;">
                        <span style="margin-right:5px;display:block;width:12px;height:12px;border-radius:100%;background:#f2c84c"></span>
                        <span style="font-size:18px">흡입</span>
                    </div>
                    <div style="display:flex;align-items:center;margin-left:12px">
                        <span style="margin-right:5px;display:block;width:12px;height:12px;border-radius:100%;background:#2cd2f6"></span>
                        <span style="font-size:18px">배출</span>
                    </div>
                </div>
                <div class="canvasWrap" v-for="(item,idx) in scrubber" v-bind:key="idx">
                    <div>{{item.internal_name}}</div>
                    <canvas :id="'line-graph'+idx" width="560" height="200"></canvas>
                </div>
            </div>
        </div>
    </div>
</b-container>
</template>
<script>
import Header from '@/components/header.vue'
import store from "@/store/index";
import Chart from 'chart.js'
//import router from "@/router/index";
export default {
    components: {
        Header,
    },
    created() {
        this.getEquips();
        this.test()
        this.test2()
        this.test3()
    },
    data() {
        return {
            busy:false,
            timeout : null,
            show:false,

            item:{},
            equipList: [],
            equipList2:[],
            scrubber: [],
            title: null,
            number: null,
            data: [],
            ctxDaily: null,
            ctxConfig: null,
            bgImg: store.state.bgImg,
            bgImg2d: store.state.bgImg2d,
            pinList: [],

            imgBoxStyle:"",
            boxList:[],
            testdata:[],
            boxlistvalin:[],
            boxlistvalout:[],
        }

    },

    methods: {
        test3(){
            this.$Axios.post("/api/daedan/cj/ems/main/MapBoxList", {
                serverKey: store.state.serverKey,
            }, this.config).then(res => {
                res.data.data.map(e=>{
                    if (e.box_code < 10) {
                        e.box_code = "0"+String(e.box_code)
                    }
                    e.style = 'top:'+e.box_py+'px;left:'+e.box_px+'px'
                })
                this.boxList = res.data.data
                console.log(this.boxList)
            }).catch(err =>{
                alert(err)
            })
        },
        test2(){
            this.$Axios.post("/api/daedan/cj/ems/main/MonitoringListPerHourSensor2", {
                serverKey: store.state.serverKey,
                date: store.state.szCurDt
            }, this.config)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.statusCode === 200) {
                        this.testdata = res.data.data;
                        this.boxlistvalin = []
                        this.boxlistvalout = []
                        this.boxList.map(e => {
                            let inval = []
                            let outval = []
                            this.testdata.map(el => {
                                if (e.equipment_inner_nm == el.equipment_inner_nm) {
                                    inval.push(el.inlet_avg_value)
                                    outval.push(el.outlet_avg_value)   
                                }
                            })
                            // inval = [1,8,50,8,5,3]
                            // outval = [1,8,50,8,5,3]
                            if (inval.length === 0) {                                
                                this.boxlistvalin.push("값이없음")
                            }else{
                                this.boxlistvalin.push(inval.reduce((sum, current) => sum + current, 0) / inval.length)
                            }
                            if (outval.length === 0) {
                                this.boxlistvalout.push("값이없음")
                            }else{
                                this.boxlistvalout.push(outval.reduce((sum, current) => sum + current, 0) / outval.length)    
                            }
                        })

                        this.boxlistvalin
                        this.boxlistvalout
                        console.log(this.boxlistvalin)
                        console.log(this.boxlistvalout)
                    }
                }
            })
            .catch(err => {
                alert("가동률데이터목록 추출 실패 \n" + err);
            })
        },
        test(){
            this.$Axios.post("/api/daedan/cj/ems/main/FpList", {
                    serverKey: store.state.serverKey,
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            console.log(res.data.data)
                            res.data.data.map((e) => {
                                // // 실제 값이 있다면 바로 아래에 있는 if문은 지워야 합니다.
                                // if (idx == 1 || idx == 2 || idx == 3) {   
                                //     e.warnig = "X"
                                // }else{
                                //     e.warnig = "Y"

                                // }
                                // // /api/daedan/cj/ems/main/equipListByServer 이곳에  X 인지 Y 인지 확인을 하게 해주는 값이 들어와야 합니다
                                // // 실제로 값이 들어 왔을때는 this.equipList[idx].warnig 이 X 인지 Y 인지 확인을 하여 색을 지정해 줍니다 
                                // if (e.warnig == "X") {
                                //     // e.style = "top:"+e.pin_py+"px;"+"right:"+e.pin_px+"px;  background:red"                                    
                                // }else{
                                //     }
                                e.style = "top:"+e.pin_py+"px;"+"right:"+e.pin_px+"px;"
                            })
                            res.data.data.map(e=>{
                                e.show = false;
                                e.color = '#' + Math.round(Math.random() * 0xffffff).toString(16)
                            })
                            this.pinList = res.data.data;

                            this.imgBoxStyle = "backgroundImage:url("+this.bgImg+");height:466px;"
                                // this.imgBoxStyle = "backgroundImage:url("+this.bgImg+");backgroundPosition:center center;height:"+ (450+((this.pinList.length-17)*20))+"px;"
                            
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })
        },  
        monitoringListPerHour(eqKey) {
            this.$Axios.post("/api/daedan/cj/ems/main/MonitoringListPerHourSensor", {
                    serverKey: store.state.serverKey,
                    equipmentKey: eqKey,
                    date: store.state.szCurDt
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            this.data = res.data.data;
                            this.graph();
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })
        },
        graph() {
            if (this.Chart != undefined) {
                
                this.Chart.destroy();
            }
            console.log(this.data)
            this.scrubber.map((e, idx) => {
                let graphLabel = []
                let graphDataIn = []
                let graphDataOut = []

                this.data.reverse()
                console.log(this.data)
                this.data.splice(10,this.data.length)
                console.log(this.data)
                this.data.reverse()
                console.log(this.data)
                this.data.map(item => {
                    if (e.mno === item.mno) {
                        graphLabel.push(item.prevention_date)
                        graphDataIn.push(item.inlet_avg_value)
                        graphDataOut.push(item.outlet_avg_value)
                    }
                })

                this.ctxDaily = document.getElementById('line-graph' + idx).getContext('2d');

                this.ctxDaily.height = "100%";
                this.ctxDaily.width = "100%";
                // this.ctxDaily.font = "5rem";
                let ctxFontSize = 14
                if (this.winWidth === 3840) {
                    ctxFontSize = 26
                }
                this.ctxConfig = {
                    type: 'line',
                    options: {
 
                        responsive: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    beginAtZero: true,
                                    fontSize: ctxFontSize
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontSize: ctxFontSize
                                }
                            }]
                        },
                        plugins: {
                            datalabels: {
                                color: '#444',
                                align: 'center',
                                anchor: 'end',
                                font: {
                                    family: 'Roboto',
                                    size: 14,
                                    weight: 700
                                },
                                // display: function(context) {
                                //     return context.dataset.data[context.dataIndex] > 0;
                                // },

                                //backgroundColor: 'rgba(255.255.255,0.8)',
                                borderRadius: 4
                            }
                        },
                        maintainAspectRatio: false,
                        legend: {display: false},
                    },
                    data: {

                        labels: graphLabel,
                        datasets: [{
                                label: '흡입구',
                                borderColor: '#f2c84c',
                                backgroundColor: 'transparent',
                                pointRadius: 0,
                                data: graphDataIn,
                                borderWidth:5,
                                // data:dailyChartData
                            },
                            {
                                label: '배출구',
                                borderColor: '#2cd2f6',
                                backgroundColor: 'transparent',
                                pointRadius: 0,
                                data: graphDataOut,
                                borderWidth:5
                                // data:dailyChartData
                            },
                        ]
                    },
                }
                this.Chart = new Chart(this.ctxDaily, this.ctxConfig);
                this.Chart.update()
            })
        },
        selectEq(eqKey,item) {
            console.log(item)
            for (let index = 0; index < this.equipList.length; index++) {
                document.getElementsByClassName("eqKey")[index].style.color = 'black'
            }
            document.getElementsByClassName("eqKey" + eqKey)[0].style.color = 'red'
            this.$Axios.post("/api/daedan/cj/ems/main/EquipmentMonitoringList", {
                    serverKey: store.state.serverKey,
                    equipmentKey: eqKey,
                    procDt: store.state.szCurDt
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            console.log(res.data.data)
                            this.title = store.state.serverName
                            this.scrubber = res.data.data
                            setTimeout(() => {
                                this.barCheck()
                                this.monitoringListPerHour(eqKey)
                            }, 100);
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })

        },
        getEquips() {
            let that = this;
            this.$Axios.post("/api/daedan/cj/ems/main/equipListByServer", {
                    userId: store.state.userInfo.userId,
                    serverKey: store.state.serverKey
                }, this.config)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            res.data.data.map(e => {
                                e.check = true
                            })
                            console.log(res)
                            that.equipList = res.data.data;
                            that.equipList2 = res.data.data;
                            setTimeout(() => {
                                this.selectEq(this.equipList[0].equipment_key)
                            }, 100);
                        }
                    }
                })
                .catch(err => {
                    alert("가동률데이터목록 추출 실패 \n" + err);
                })
        },
        barCheck() {

            if (this.scrubber.length === 0) {
                return false
            }

            for (let index = 0; index < 10; index++) {
                document.getElementsByClassName("in")[index].style.background = '#ccc'
                document.getElementsByClassName("out")[index].style.background = '#ccc'
            }

            this.scrubber.map((e, idx) => {
                // e.inlet_avg_value = 50,
                // e.inlet_max_value = 100,
                // e.outlet_avg_value = 3517,
                // e.outlet_max_value = 8751,
                this.number = Math.floor((Math.floor(e.inlet_avg_value) / Math.floor(e.inlet_max_value)) * 10)
                this.number2 = Math.floor((Math.floor(e.outlet_avg_value) / Math.floor(e.outlet_max_value)) * 10)
                if (e.inlet_avg_value > e.inlet_max_value) {   
                    for (let index = 1; index <= this.number; index++) {
                        document.getElementsByClassName('in' + idx + '_' + index)[0].style.background = "#ff3131"
                    }
                }else{
                    for (let index = 1; index <= this.number; index++) {
                        document.getElementsByClassName('in' + idx + '_' + index)[0].style.background = "#5151ff"
                    }
                }

                if (e.outlet_avg_value > e.outlet_max_value) {
                    for (let index = 1; index <= this.number2; index++) {
                        document.getElementsByClassName('out' + idx + '_' + index)[0].style.background = "#ff3131"
                    }
                }else{
                    for (let index = 1; index <= this.number2; index++) {
                        document.getElementsByClassName('out' + idx + '_' + index)[0].style.background = "#5151ff"
                    }
                }

                if (e.inlet_avg_value > e.inlet_max_value || e.outlet_avg_value > e.outlet_max_value) {
                    document.getElementsByClassName('infoTitle_' + idx)[0].style.background = "#ff3131"
                }else{
                    document.getElementsByClassName('infoTitle_' + idx)[0].style.background = "#5151ff"
                }


            })
        },
        infoBtn(item){
            // this.show = true;            
            // this.item = item;
            item.show = true
            console.log(item)
            // document.getElementsByClassName('overlayTitle').innetHTML = document.getElementsByClassName('view_pin01').getAttribute('value');
            
        },
        infoClose(item){
            this.show = false;
            console.log(item)
        },
        twoDBtn(){
            console.log("111111")
            this.imgBoxStyle = "backgroundImage:url("+this.bgImg2d+");height:466px;"
        },
        threeDBtn(){
            console.log("222222")
            this.imgBoxStyle = "backgroundImage:url("+this.bgImg+");height:466px;"
        }
    }

}
</script>

<style>
.viewInner {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.titleBox {
    position:relative;
    width: 65%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 15px;
    font-weight: bold;
    font-size: 24px;
}

.titleBox .tabBox{
    position: absolute;
    top:0;
    right:0;;
    width:200px;
    height:100%;
}

.titleBox .tabBox>div{
    float:left;
    width:50%;
    height:100%;
    box-sizing: border-box;
    border:2px solid rgb(167, 167, 167);
    font-size:16px;
    text-align: center;
    line-height:35px;
    background:#cccccc;
    color:rgb(131, 131, 131);
    transition:all 0.2s;
    cursor:pointer;
}

.titleBox .tabBox>div:nth-child(1){
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.titleBox .tabBox>div:nth-child(2){
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    border-left:none;
}

.titleBox .tabBox>div:hover{
    background:#949494;
    font-weight:bold;
    color:black;
}

.viewInner>div {
    float: left;
}

.viewBox {
    height: 720px;
    margin-top: 10px;
}

.viewLeftBox {
    width: 65%;
}
.viewRightBox {
    margin-top:10px;
    width: 34%;
    height:100%;
    margin-left: 1%;
}

/*LeftBox title */

/* LeftBox top */

.imgBox {
    position: relative;
    width: 100%;
    height: 450px;
    background: url(../../assets/rendering/pin18_view.jpg) no-repeat center center;
    background-size: 100% 100%;
    box-sizing: border-box;
    border: 2px solid #ccc;
}

/*pinWrap */
.imgBox .viewPinWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.imgBox .viewPinWrap>div {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: white;
    border: 1px solid black;
    text-align: center;
    line-height: 35px;
    font-weight: bold;
    font-family: 'Arial';
    font-size: 12px;
    box-sizing: border-box;
    cursor:pointer;
}

.imgBox .pinBoxWrap{
    width:100%;
    height:100%;
}

.imgBox .pinBox{
    position:absolute;
    width:190px;
    height:100px;
    box-sizing: border-box;
    padding:6px;
    background:white;
    outline:1px solid black;
    word-break: keep-all;
}

.imgBox .pinBoxBig{
    height:150px;
}

.imgBox .pinBoxWrap .pinTitle{
    height:30px;
    line-height:30px;
    font-size:14px;
    text-align: center;
    padding-bottom:0 !important;
    word-break: keep-all;
    background:#459E1E;
    letter-spacing: -1px;
}

.imgBox .pinBoxWrap .pinBody{
    height:25px;
    line-height:25px;
    font-size:14px;
    text-align: center;
    word-break:keep-all;
}

.imgBox .pinBoxWrap .pinBody span{
    font-size:10px;
}

.imgBox .pinBoxWrap .container{
    padding-top:0px !important; 
    padding-bottom:0px !important; 
}

/* 박스 크기 변경 구간 */
.imgBox .pinBoxSmall01{
    width:170px;
    height:100px;
}


.imgBox .pinBoxBig02 .pinTitle{
    height:30px;
}

.imgBox .pinBoxBig03 .pinTitle,
.imgBox .pinBoxSmall03 .pinTitle{
    height:25px;
    line-height:25px;
    font-size:12px;
}

.imgBox .pinBoxSmall02 .pinBody{
    height:30px;
}
.imgBox .pinBoxBig03 .pinBody,
.imgBox .pinBoxSmall03 .pinBody{
    font-size:13px;
}

.imgBox .pinBoxBig02 .pinBody{
    height:30px;
}

.imgBox .pinBoxWrap .pinBody div{
    padding:6px !important;
}

.infos{
    position:absolute !important;
    z-index:3;
    top:460px;
    left:920px;
}
.overlay{
    width:300px;
    height:150px;
    font-size:16px;
    background:rgb(21, 5, 58);
    border-radius:7px;
    cursor:pointer;
}

.overlay>div{
    float:left;
    width:50%;
    height:100%;
    box-sizing: border-box;
    padding:5px;
}


.overlay div .overlayImg{
    position:relative;
    height:100%;
    box-sizing:border-box;
    padding-left:5px;
    
}

.overlay div .overlayImg img{
    width:100%;
    height:98%;
    margin-top:3px;
    border-radius: 7px;
}

.overlay div .overlayImg .stateBar{
    position:absolute;
    top:3px;
    left:5px;
    width:10px;
    height:98%;
    background:green;
}

.overlay div .overlayTitle{
    height:30px;
    line-height:30px;
    color:white;
}

.overlay div .overlayText{
    height:35px;
}
.overlay div .overlayText>div{
    float:left;
    width:50%;
    height:100%;
    line-height:40px;
    color:white;
}

/*---------------------------공주 pin01*/
/*.view_pin01 {
    top: 315px;
    right: 902px;
}
.imgBox .pinBox01{
    top:10px;
    left:10px;
}*/

/*---------------------------남원 pin02*/
/*.view_pin01 {
    top: 308px;
    right: 493px;
}
.imgBox .pinBox01{
    top:32px;
    left:36px;
}*/

/*---------------------------논산 pin03*/
/*.view_pin01 {
    top:70px;
    right:960px;
}

.view_pin02 {
    top:110px;
    right:937px;
}

.view_pin03 {
    top:420px;
    right:300px;
}

.view_pin04 {
    top:355px;
    right:235px;
}
.imgBox .pinBox01{
    top:30px;
    left:10px;
}
.imgBox .pinBox02{
    top:310px;
    left:10px;
}
.imgBox .pinBox03{
    top:30px;
    left:990px;
}
.imgBox .pinBox04{
    top:310px;
    left:990px;
}*/

/*---------------------------부산 pin04*/
/*.view_pin01 {
    top:25px;
    right:550px;
}

.view_pin02 {
    top:57px;
    right:555px;
}

.view_pin03 {
    top:90px;
    right:755px;
}

.view_pin04 {
    top:330px;
    right:815px;
}

.view_pin05 {
    top:145px;
    right:565px;
}

.view_pin06 {
    top:140px;
    right:507px;
}

.view_pin07 {
    top:115px;
    right:500px;
}

.view_pin08 {
    top:30px;
    right:378px;
}

.view_pin09 {
    top:230px;
    right:315px;
}

.view_pin10 {
    top:10px;
    right:323px;
}

.view_pin11 {
    top:10px;
    right:740px;
}
.imgBox .pinBox01{
    top:15px;
    left:35px;
}
.imgBox .pinBox02{
    top:120px;
    left:35px;
}
.imgBox .pinBox03{
    top:230px;
    left:35px;
}
.imgBox .pinBox04{
    top:350px;
    left:35px;
}
.imgBox .pinBox05{
    top:350px;
    left:270px;
}
.imgBox .pinBox06{
    top:350px;
    left:508px;
}
.imgBox .pinBox07{
    top:350px;
    left:745px;
}
.imgBox .pinBox08{
    top:350px;
    left:980px;
}
.imgBox .pinBox09{
    top:230px;
    left:980px;
}
.imgBox .pinBox10{
    top:120px;
    left:980px;
}
.imgBox .pinBox11{
    top:15px;
    left:980px;
}*/

/*--------------------------씨푸드 성남 - pin05*/
/*.view_pin01 {
    top: 185px;
    right: 893px;
}
.imgBox .pinBox01{
    top:38px;
    left:10px;
}*/

/*--------------------------이천 - pin06*/

/*--------------------------안산 - pin07*/
/*.view_pin01 {
    top:152px;
    right:703px;
}

.view_pin02 {
    top:175px;
    right:703px;
}

.view_pin03 {
    top:203px;
    right:703px;
}

.view_pin04 {
    top:327px;
    right:315px;
}

.view_pin05 {
    top:413px;
    right:795px;
}

.view_pin06 {
    top:125px;
    right:587px;
}

.view_pin07 {
    top:175px;
    right:323px;
}

.view_pin08 {
    top:203px;
    right:825px;
}

.view_pin09 {
    top:230px;
    right:825px;
}
.imgBox .pinBox01{
    top:10px;
    left:250px;
}
.imgBox .pinBox02{
    top:10px;
    left:35px;
}
.imgBox .pinBox03{
    top:120px;
    left:35px;
}
.imgBox .pinBox04{
    top:230px;
    left:35px;
}
.imgBox .pinBox05{
    top:340px;
    left:35px;
}
.imgBox .pinBox06{
    top:10px;
    left:990px;
}
.imgBox .pinBox07{
    top:120px;
    left:990px;
}
.imgBox .pinBox08{
    top:230px;
    left:990px;
}
.imgBox .pinBox09{
    top:340px;
    left:990px;
}*/

/*--------------------------인천1 - pin12*/
/*pin*/
/*.view_pin01 {
    top:145px;
    right:915px;
}

.view_pin02 {
    top:183px;
    right:875px;
}

.view_pin03 {
    top:135px;
    right:390px;
}

.view_pin04 {
    top:300px;
    right:210px;
}*/
/*box */
/*.imgBox .pinBox01{
    top:25px;
    left:27px;
}
.imgBox .pinBox02{
    top:320px;
    left:27px;
}
.imgBox .pinBox03{
    top:25px;
    left:1010px;
}
.imgBox .pinBox04{
    top:320px;
    left:1010px;
}*/

/*--------------------------인천2 - pin13*/
/*.view_pin01 {
    top:30px;
    right:633px;
}
.view_pin02 {
    top:63px;
    right:638px;
}
.view_pin03 {
    top:55px;
    right:602px;
}
.view_pin04 {
    top:58px;
    right:575px;
}
.view_pin05 {
    top:297px;
    right:680px;
}
.view_pin06 {
    top:130px;
    right:602px;
}
.view_pin07 {
    top:83px;
    right:350px;
}
.view_pin08 {
    top:35px;
    right:352px;
}
.view_pin09 {
    top:410px;
    right:830px;
}
.view_pin10 {
    top:30px;
    right:565px;
}
.view_pin11 {
    top:315px;
    right:525px;
}
.view_pin12 {
    top:315px;
    right:490px;
}*/
/*박스*/
/*.pinBox01{
    top:20px;
    left:5px;
}
.pinBox02{
    top:20px;
    left:180px;
}
.pinBox03{
    top:195px;
    left:5px;
}
.pinBox04{
    top:195px;
    left:180px;
}
.pinBox05{
    top:335px;
    left:5px;
}
.pinBox06{
   top:335px;
   left:180px;
}
.pinBox07{
    top:18px;
    left:855px;
}
.pinBox08{
    top:18px;
    left:1030px;
}
.pinBox09{
    top:195px;
    left:855px;
}
.pinBox10{
    top:195px;
    left:1030px;
}
.pinBox11{
    top:335px;
    left:855px;
}
.pinBox12{
    top:335px;
    left:1030px;
}*/


/* --------------------------인천냉동식품 - pin15 */
/*.view_pin01 {
    top:40px;
    right:375px;
}

.view_pin02 {
    top:40px;
    right:515px;
}

.view_pin03 {
    top:205px;
    right:810px;
}

.view_pin04 {
    top:220px;
    right:390px;
}

.view_pin05 {
    top:375px;
    right:473px;
}

.view_pin06 {
    top:87px;
    right:495px;
}

.view_pin07 {
    top:87px;
    right:555px;
}

.view_pin08 {
    top:125px;
    right:555px;
}

.view_pin09 {
    top:125px;
    right:495px;
}

.view_pin10 {
    top:310px;
    right:585px;
}

.view_pin11 {
    top:160px;
    right:370px;
}*/

/*.pinBox01{
    top:20px;
    left:5px;
}
.pinBox02{
    top:20px;
    left:180px;
}
.pinBox03{
    top:155px;
    left:5px;
}
.pinBox04{
    top:155px;
    left:180px;
}
.pinBox05{
    top:315px;
    left:5px;
}
.pinBox06{
    top:18px;
    left:850px;
}
.pinBox07{
    top:18px;
    left:1030px;
}
.pinBox08{
    top:170px;
    left:850px;
}
.pinBox09{
    top:170px;
    left:1030px;
}
.pinBox10{
    top:315px;
    left:850px;
}
.pinBox11{
    top:315px;
    left:1030px;
}*/

/*--------------------------진안 - pin16 */
/*.view_pin01 {
    top:90px;
    right:825px;
}
.pinBox01{
    top:10px;
    left:10px;
}*/

/*--------------------------진천 - pin17 */
/*.view_pin01 {
    top:115px;
    right:302px;
}
.view_pin02 {
    top:197px;
    right:277px;
}
.view_pin03 {
    top:197px;
    right:310px;
}
.view_pin04 {
    top:145px;
    right:227px;
}
.view_pin05 {
    top:260px;
    right:367px;
}
.pinBox01{
    top:30px;
    left:40px;
}
.pinBox02{
    top:170px;
    left:40px;
}
.pinBox03{
    top:310px;
    left:40px;
}
.pinBox04{
    top:30px;
    left:990px;
}
.pinBox05{
    top:310px;
    left:990px;
}*/

/*--------------------------진천BC - pin18 */
/*.view_pin01 {
    top:80px;
    right:377px;
}
.view_pin02 {
    top:140px;
    right:868px;
}
.view_pin03 {
    top:320px;
    right:735px;
}
.view_pin04 {
    top:85px;
    right:400px;
}
.view_pin05 {
    top:193px;
    right:270px;
}
.pinBox01{
    top:30px;
    left:10px;
}
.pinBox02{
    top:170px;
    left:10px;
}
.pinBox03{
    top:310px;
    left:10px;
}
.pinBox04{
    top:35px;
    left:990px;
}
.pinBox05{
    top:305px;
    left:990px;
}*/

/*LeftBox bottom */
.bottomBox {
    width: 100%;
    height: 300px;
    margin-top: -1px;
}

.bottomBox>.bottom_subMenuBox {
    width: 100%;
    height: 40px;
    /*2줄 시 : height:80px */
    box-sizing: border-box;
    border: 2px solid #ccc;
}

.bottomBox>.bottom_subMenuBox02 {
    /* height: 80px; */
}

.bottomBox>.bottom_subMenuBox>div {
    float: left;
    width: 12.5%;
    height: 40px;
    line-height: 35px;
    font-size: 16px;
    font-family: "Noto Sans KR";
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.2s;
}

.bottomBox>.bottom_subMenuBox>div:hover {
    color: rgb(126, 126, 126);
    font-weight: bold;
}

.bottomBox>.bottom_letBox {
    box-shadow: 0 0px 11px 3px #ccc;
    padding-left: 13px;
    padding-top: 15px;
    border: 2px solid #ccc;
    /* height: 190px; */
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-flow: wrap;
}

.bottomBox>.bottom_letBox>.infoBox {
    width: 390px;
    height: 140px;
    margin-bottom: 20px;
    margin-right: 5px;
    box-sizing: border-box;
    border: 1px solid rgb(171, 171, 255);
    border-radius: 5px;
    /* background: rgb(235, 254, 255); */
}

.bottomBox>.bottom_letBox>.infoBox:last-child {
    margin-right: 0;
}

.bottomBox>.bottom_letBox>.infoBox>div {
    width: 100%;
}

.bottomBox>.bottom_letBox>.infoBox>.infoTitle {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
    font-size: 16px;
}

.bottomBox>.bottom_letBox>.infoBox>.infoBody {
    height: 120px;
    margin-top: 10px;
}

.bottomBox>.bottom_letBox>.infoBox>.infoBody>div {
    height: 30px;
    font-size: 14px;
}

.infoBody_outlet {
    margin-top: 10px;
}

.infoBody_inlet>div,
.infoBody_outlet>div {
    float: left;
    height: 100%;
    line-height: 30px;
    text-align: center;
}

.infoBody_inlet>div:nth-child(1),
.infoBody_outlet>div:nth-child(1) {
    width: 20%;
}

.infoBody_inlet>div:nth-child(2),
.infoBody_outlet>div:nth-child(2) {
    width: 60%;
}

.infoBody_inlet>div:nth-child(3),
.infoBody_outlet>div:nth-child(3) {
    width: 20%;
}

.infoBody_inlet>div>div,
.infoBody_outlet>div>div {
    float: left;
    width: 9%;
    height: 20px;
    background: #ccc;
    margin-left: 1%;
    margin-top: 5px;
}

.viewRightBox {
    padding: 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    overflow-y: scroll;
}

.viewRightBox>.canvasWrap {
    width: 100%;
    height: 250px;
    box-sizing: border-box;
    /* border: 1px solid rgb(135, 176, 192); */
    margin-top: 10px;
}

.viewRightBox>.canvasWrap:first-child {
    margin-top: 0;
}

.viewRightBox>.canvasWrap>div:nth-child(1) {
    font-size: 22px;
    font-weight: bold;
    box-sizing: border-box;
    padding: 5px;
}

.viewRightBox::-webkit-scrollbar {
    width: 5px;
}

.viewRightBox::-webkit-scrollbar-thumb {
    width: 5px;
    background: rgb(121, 121, 255);
    border-radius: 5px;
}

.viewRightBox::-webkit-scrollbar-track {
    width: 5px;
    background: #ccc;
    border-radius: 5px;
}

.scrollbox::-webkit-scrollbar {
    width: 5px;
}

.scrollbox::-webkit-scrollbar-thumb {
    width: 5px;
    background: rgb(121, 121, 255);
    border-radius: 5px;
}

.scrollbox::-webkit-scrollbar-track {
    width: 5px;
    background: #ccc;
    border-radius: 5px;
}

.viewRightTop::-webkit-scrollbar {
    width: 5px;
    height: 10px;
}

.viewRightTop::-webkit-scrollbar-thumb {
    width: 5px;
    height: 10px;
    background: rgb(136, 136, 136);
}

.viewRightTop::-webkit-scrollbar-track {
    width: 5px;
    height: 10px;
    background: #ccc;
}
</style>
