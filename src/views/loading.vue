<template>
<b-container fluid>
    <div class="loadingWrap">
        <div class="loader">
            <div class="loader_bar"></div>
            <div class="loader_bar"></div>
            <div class="loader_bar"></div>
            <div class="loader_bar"></div>
            <div class="loader_bar"></div>
            <div class="loader_ball"></div>
        </div>
    </div>

</b-container>
</template>

<style>
.loadingWrap {
    width: 310px;
    height: 500px;
}

.loader {
    position: relative;
    width: 310px;
    height: 400px;
}

.loader .loader_bar {
    position: absolute;
    bottom: 0;
    width: 40px;
    height: 50%;
    transform-origin: center bottom;
    box-shadow: 1px 1px 0 rgba(0, 0, 0, .2);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.loader .loader_bar:nth-child(1) {
    left: 0px;
    transform: scale(1, .1);
    animation: barUp1 5s infinite;
    background: rgb(89, 89, 89);
}

.loader .loader_bar:nth-child(2) {
    left: 60px;
    transform: scale(1, .4);
    animation: barUp2 5s infinite;
    background: rgb(89, 89, 89);
}

.loader .loader_bar:nth-child(3) {
    left: 125px;
    transform: scale(1, .6);
    animation: barUp3 5s infinite;
    background: rgb(89, 89, 89);
}

.loader .loader_bar:nth-child(4) {
    left: 190px;
    transform: scale(1, .8);
    animation: barUp4 5s infinite;
    background: rgb(89, 89, 89);
}

.loader .loader_bar:nth-child(5) {
    left: 255px;
    transform: scale(1, 1);
    animation: barUp5 5s infinite;
    background: rgb(89, 89, 89);
}

.loader .loader_ball {
    position: absolute;
    bottom: 45px;
    left: 0px;
    width: 30px;
    height: 30px;
    background: rgb(89, 89, 89);
    border-radius: 50%;
    box-shadow: 0px 0px 1px 1px black;
    animation: ball 5s infinite;
}

@keyframes ball {
    0% {
        /*시작*/
        transform: translate(10px, 0);
    }

    7% {
        /*점프*/
        transform: translate(40px, -70px);
    }

    10% {
        /*도착*/
        transform: translate(72px, -50px);
    }

    17% {
        /*점프*/
        transform: translate(120px, -120px);
    }

    20% {
        /*도착*/
        transform: translate(140px, -100px);
    }

    27% {
        /*점프*/
        transform: translate(180px, -160px);
    }

    30% {
        /*도착*/
        transform: translate(205px, -130px);
    }

    37% {
        /*점프*/
        transform: translate(250px, -190px);
    }

    40% {
        /*도착*/
        transform: translate(260px, -170px);
    }

    50% {
        /*시작*/
        transform: translate(260px, -0px);
    }

    57% {
        /*점프*/
        transform: translate(240px, -85px);
    }

    60% {
        /*도착*/
        transform: translate(195px, -50px);
    }

    67% {
        /*점프*/
        transform: translate(160px, -120px);
    }

    70% {
        /*도착*/
        transform: translate(125px, -90px);
    }

    77% {
        /*점프*/
        transform: translate(105px, -160px);
    }

    80% {
        /*도착*/
        transform: translate(65px, -140px);
    }

    87% {
        /*점프*/
        transform: translate(30px, -200px);
    }

    90% {
        /*도착*/
        transform: translate(5px, -180px);
    }

    100% {
        /*도착*/
        transform: translate(5px, 0);
    }
}

@keyframes barUp1 {
    0% {
        transform: scale(1, .2);
    }

    40% {
        transform: scale(1, .2);
    }

    50% {
        transform: scale(1, 1);
    }

    90% {
        transform: scale(1, 1);
    }

    100% {
        transform: scale(1, .2);
    }
}

@keyframes barUp2 {
    0% {
        transform: scale(1, .4);
    }

    40% {
        transform: scale(1, .4);
    }

    50% {
        transform: scale(1, .8);
    }

    90% {
        transform: scale(1, .8);
    }

    100% {
        transform: scale(1, .4);
    }
}

@keyframes barUp3 {
    0% {
        transform: scale(1, .6);
    }

    100% {
        transform: scale(1, .6);
    }
}

@keyframes barUp4 {
    0% {
        transform: scale(1, .8);
    }

    40% {
        transform: scale(1, .8);
    }

    50% {
        transform: scale(1, .4);
    }

    90% {
        transform: scale(1, .4);
    }

    100% {
        transform: scale(1, .8);
    }
}

@keyframes barUp5 {
    0% {
        transform: scale(1, 1);
    }

    40% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1, .2);
    }

    90% {
        transform: scale(1, .2);
    }

    100% {
        transform: scale(1, 1);
    }
}
</style>
