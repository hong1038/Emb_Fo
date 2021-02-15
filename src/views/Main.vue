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

</style>
