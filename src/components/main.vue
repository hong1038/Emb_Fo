<template>
<div class="inner">
    <div class="con_box_right">
        <div class="statistics_table con_box">
            <div class="con">
                <h3>월간통계 및 그래프</h3>
                <div class="date_picker clear">
                    <span class="date">일자</span>
                    <input type="date" name="sdate" id="sdate" v-model="dateSelect" placeholder="년월 선택">

                    <div class="btn_area">
                        <input type="button" value="조회" id="searchBtn">
                        <input type="button" value="엑셀 저장" id="excelBtn">
                        <input type="button" value="그래프" id="graphBtn">
                    </div>
                </div>
                <div class="measurementCon_title mt-4 text-center">
                    <div class="row">
                        <div class="col-2">사업장</div>
                        <div class="col-1">분야</div>
                        <div class="col-2">측정위치</div>
                        <div class="col-2">측정항목</div>
                        <div class="col-1">단위</div>
                        <div class="col-2">측정일시</div>
                        <div class="col-1">측정값</div>
                    </div>
                </div>
                <div class="measurementCon_main text-center">
                    <div class="row">
                        <div class="col-2">인천1</div>
                        <div class="col-1">배출</div>
                        <div class="col-2">측정위치</div>
                        <div class="col-2">항목</div>
                        <div class="col-1">PPM</div>
                        <div class="col-2">임시</div>
                        <div class="col-1">임시</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import axios from 'axios';
export default {
    components(){

    },
    date(){
        return{
            date:new Date(),
            dateSelect:""
        }
    },
    created() {
        this.getWeatherData();
    },

    method : {
        getWeatherData() {
            alert("aaaaa")
            axios.post("http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=696fa8118910f5ecc9778cfaf53d36b7")
               .then(res => {
                     console.log("res.status = " + res.status)
                    if (res.status === 200) {
                        console.log("res.weather.id = " + res.weather.id);
                    }
                } )
                .catch(err => {
                    alert("날씨추출 실패 \n" + err);
                } )
        }
    }
}
</script>
<style>
.con_box_right .statistics_table .con .date_picker .date {
    width: 85px;
    height: 40px;
    line-height: 40px;
    background: #242630;
    font-size: 18px;
    font-weight: 700;
    display: inline-block;
    color: #fff;
    text-align: center;
    border-radius: 5px 0 0 5px;
}

.con_box_right .statistics_table .con .date_picker select {
    border: 1px solid #000;
    box-sizing: border-box;
    width: 220px;
    height: 40px;
    line-height: 50px;
    font-size: 18px;
    text-indent: 15px;
    font-family: "Noto Sans KR";
    padding-right: 20px;
}

.con_box_right .statistics_table .con .date_picker input[type="text"] {
    border: 1px solid #000;
    box-sizing: border-box;
    width: 220px;
    height: 40px;
    line-height: 50px;
    font-size: 18px;
    text-indent: 15px;
    font-family: "Noto Sans KR";
    padding-right: 20px;
}

.con_box_right .statistics_table .con .date_picker .hyphen {
    font-size: 18px;
    padding: 0 10px;
}

.con_box_right .statistics_table .con .date_picker input[type="text"]:last-child {
    border-radius: 0 5px 5px 0;
}

.con_box_right .statistics_table .con .date_picker .btn_area {
    float: right;
    margin-right: 6px;
}

.con_box_right .statistics_table .con .date_picker .btn_area input[type="button"] {
    width: 150px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    margin-left: 30px;
    border-radius: 5px;
    background: #F5F6FA;
    border: 1px solid #000;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s;
}

.con_box_right .statistics_table .con .date_picker .btn_area input[type="button"]:hover {
    background: #0052BB;
    color: #fff;
    border: 1px solid #242630;
    box-sizing: border-box;
    transition: all 0.2s;
}

.con_box_right .statistics_table .con .date_picker .btn_area input[type="submit"] {
    width: 150px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    margin-left: 30px;
    border-radius: 5px;
    background: #F5F6FA;
    border: 1px solid #000;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s;
}

.con_box_right .statistics_table .con .date_picker .btn_area input[type="submit"]:hover {
    background: #0052BB;
    color: #fff;
    border: 1px solid #242630;
    box-sizing: border-box;
    transition: all 0.2s;
}

.con_box_right .statistics_table .con h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
}

.con_box_right .statistics_table .con h4 {
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 10px;
}

.con_box_right .statistics_table .con h4 input[type="button"] {
    float: right;
    margin-right: 6px;
    width: 100px;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    margin-left: 30px;
    border-radius: 5px;
    background: #F5F6FA;
    border: 1px solid #000;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s;
}

.con_box_right .statistics_table .con h4 input[type="button"]:hover {
    background: #0052BB;
    color: #fff;
    border: 1px solid #242630;
    box-sizing: border-box;
    transition: all 0.2s;
}

.measurementCon_title {
    height: 50px;
    border: 2px solid grey;
    border-bottom: none;
}

.measurementCon_title>div {
    height: inherit;
    line-height: 50px;
    font-family: "CJ Onlyone Bold";
}

.measurementCon_main {
    /* overflow-y: scroll;
    overflow-x: hidden; */
    font-size: 0.9rem;
    box-sizing: border-box;
    border: 2px solid grey;
    border-top: none;
}

.measurementCon_main>div {
    height: 40px;
}

.measurementCon_main>div>div {
    height: inherit;
    line-height: 40px;
}

.measurementCon_main::-webkit-scrollbar {
    width: 7px;
    height: 100%;
}

.measurementCon_main::-webkit-scrollbar-thumb {
    background: blue;
    border-radius: 30px;
}

.measurementCon_main::-webkit-scrollbar-track {
    background: skyblue;
    border-radius: 30px;
}
</style>
