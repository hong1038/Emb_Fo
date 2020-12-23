<template>
<v-container>
    <div class='back'>
        <img src="@/assets/login_back.jpg" alt='login_back'>
        <img src="@/assets/login_logo.png" class="logo">
    </div>
    <div class='loginWrap'>
        <div class="loginTitle">Welcome to CJ Cheiljedang</div>
        <div class="logoWrap">
            <img src="../assets/logo.png" alt="logo">
            <div>통합 환경 모니터링 시스템</div>
        </div>

        <div class="loginForm">
            
            <div class="idWrap">
                <div>
                    <div>E-mail</div>
                    <div>
                        <input type="text" id="email" name="email" v-model="email" placeholder="E-mail">
                    </div>
                </div>
            </div>
            <div class="pwWrap">
                <div>
                    <div>Password</div>
                    <div>
                        <input type="password" id="password" name="password" v-model="password" placeholder="Password" @keyup.enter="signin">
                    </div>
                </div>
            </div>
            <div class="loginBtnWrap">
                <img src="@/assets/loginOn.png">
                <input type="button" @click="signin()">
            </div>
        </div>
    </div>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            notiMsg: null,
            isError: false,
            email: '',
            password: ''

        };
    },
    created() {},
    computed: {
        // ...mapState[this.isLogin]
    },

    methods: {
        signin() {
            const email = this.email;
            const password = this.password;

            if (!email || !password) {
                return false;
            }
            let that = this;
            this.$Axios.post("/api/daedan/cj/ems/user/signin", {
                    email: email,
                    password: password
                }, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.statusCode === 200) {
                            //alert("res.data.message= " + res.data.message)
                            if (res.data.message === "실패") {
                                that.notiMsg = res.data.message
                                that.isError = true;
                                this.$store.dispatch("loginFail");
                                return;
                            }

                            that.notiMsg = "";
                            that.isError = false;
                            that.$store.dispatch("saveUserToken", res.headers["authorization"]);

                            this.$Axios.defaults.headers.common["authorization"] = res.headers["authorization"];
                            this.$store.dispatch("loginSuccess", res.data.data);
                        } else {
                            that.notiMsg = res.data.message
                            that.isError = true;
                            this.$store.dispatch("loginFail");
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    that.isError = true;
                })
        }
    }
}
</script>

<style>

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

img {
    vertical-align: middle;
    border-style: none;
    page-break-inside: avoid;
}

p {
    margin-top: 0;
    margin-bottom: 1rem
}

.d-block {
    display: block !important
}

.mx-auto {
    margin-right: auto !important;
    margin-left: auto !important;
}

.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

@media (min-width:576px) {
    .container {
        max-width: 540px
    }
}

@media (min-width:768px) {
    .container {
        max-width: 720px
    }
}

@media (min-width:992px) {
    .container {
        max-width: 960px
    }
}

@media (min-width:1200px) {
    .container {
        max-width: 1140px
    }
}

input {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

.back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.back>img {
    width: 100%;
    height: 100%;
}

.back>.logo {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 550px;
    height: 200px;
    transform: translate(-50%, -40%);
    opacity: 1;
}

.loginWrap {
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 3;
    width: 500px;
    height: 100%;
    box-sizing: border-box;
    border: 0px solid #ccc;
    padding: 2%;
    background: rgba(0, 0, 0, 0.4);
}

.loginWrap>.imgWrap {
    width: 100%;
}

.loginWrap>.imgWrap>img {
    width: 100%;
}

/* title */

.loginWrap>.loginTitle {
    width:110%;
    margin-left:-5%;
    text-align: center;
    /*margin-top: 32%;*/
    margin-top: 32%;
    color: white;
    font-size: 1.8rem;
    font-family:CjFontTitleBold;
    font-weight:bold;
    /*display:none;*/
}
.loginWrap>.logoWrap{
    width:100%;
    /*margin-top:40%;*/
    margin-top:5%;
}

.loginWrap>.logoWrap>img{
    /*width:100%;*/
    width:90%;
    margin-left:5%;
}
.loginWrap>.logoWrap>div{
    color:white;
    font-family: CjFontTitleBold;
    font-size:1.6rem;
    font-weight:bold;
    text-align: center;
}

.loginForm {
    position: relative;
}

.loginForm>div {
    width: 90%;
    height: 80px;
    margin: 0 auto;
    margin-top: 30px;
}

.loginForm>div>div {
    width: 100%;
    height: 100%;
    color: white;
}

.loginForm>div>div>div:nth-child(1) {
    height: 40px;
    line-height: 40px;
    color: white;
    font-size: 1.1rem;
    font-family: CjFontBodyRegular;
}

.loginForm>div>div>div:nth-child(2) {
    height: 45px;
}

.loginForm>div>div>div:nth-child(2)>input {
    height: 100%;
    width: 100%;
    background: white;
    box-sizing: border-box;
    padding-left: 10px;
    font-size: 16px;
}

.loginForm>.loginBtnWrap {
    position: relative;
    width: 50px;
    height: 50px;
    margin-top: 50px;
}

.loginBtnWrap>img {
    width: 50px;
    height: 50px;
    cursor: pointer;
}

.loginBtnWrap>input {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: rgb(151, 151, 151, 0.3);
    border-radius: 100%;
    transition: all 0.2s;
}

.loginBtnWrap>input:hover {
    background: rgba(255, 255, 255, 0.3);
}

.loginBtnWrap>input:focus {
    border: none;
    outline: none;
}
</style>
