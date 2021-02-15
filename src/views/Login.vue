<template>
<v-container fluid>
    <div class='back'>
        <!-- <img src="@/assets/login_back.jpg" alt='login_back'>
        <img src="@/assets/login_logo.png" class="logo"> -->
        <v-btn @click="popUp = !popUp">로그인버튼</v-btn>
    </div>
    <v-overlay :value="popUp" opacity="0.8">
        <v-card>
            <v-card-title class="position-relative">## 로그인 페이지 ## <span class="popUpClose" @click="popUp = false"><b-icon icon="x-circle" scale="1.5"></b-icon> </span></v-card-title>
            <v-card-text>
                <div class="loginBody">
                    <v-row>
                        <v-col cols="4">
                            <span class="loginText">E-mail</span>
                        </v-col>
                        <v-col cols="8">
                            <input type="text" id="email" name="email" v-model="email" placeholder="E-mail 입력">
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <span class="loginText">Password</span>
                        </v-col>
                        <v-col cols="8">
                            <input type="password" id="password" name="password" v-model="password" placeholder="Password" @keyup.enter="signin">
                        </v-col>
                    </v-row>
                </div>
                <div class="checkBox">
                    <v-row>
                        <v-col cols="12">
                            <v-btn class="loginBtn">Login</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <p>만약 로그인 할 계정이 없다면 <router-link to="/Main.vue">여기</router-link>를 눌러주세요.</p>
                        </v-col>
                    </v-row>
                </div>
            </v-card-text>
        </v-card>
    </v-overlay>
    
</v-container>
</template>

<script>
export default {
    data() {
        return {
            notiMsg: null,
            isError: false,
            email: '',
            password: '',

            popUp : false,
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

<style lang='scss'>

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

p{
    margin-bottom:0 !important;
} 

.loginBody{
    border-top:2px solid white;
}
.loginForm{
    margin-top:2%;
}
.loginBtn{
    width:100%;
}
.loginText{
    line-height:2.5;
}
.popUpClose{
    margin-left:27%;
    cursor:pointer;
    transition:all 0.3s;
    &:hover{
        color:red;
    }
}
#email, #password{
    border:1px solid rgb(191, 191, 191);
    border-radius: 2px;
    padding:.3rem;
}


</style>
