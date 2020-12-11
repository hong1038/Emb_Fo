import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index";

Vue.use(VueRouter)

const requireAuth = (to, from, next) => { // 로그인이 필요한 화면에서 적용되는 라우터 함수
    if (store.state.isLogin === false) {
        alert("로그인이 필요한 화면 입니다");
        next("/login");
    } else {
        ////console.log("router.requireAuth.userInfo.userNm = " + store.state.userInfo.userNm);
        next();
    }
}

const routes = [{
        path: "/login",
        name: "login",
        //beforeEnter : rejectAuthUser,
        component: () =>
            import ("@/views/Login.vue")
    },
    {
        path: '/',
        name: 'Main',
        component: () =>
            import ("@/views/Main.vue")
    },
    // view
    {
        path: '/views/main/view',
        name: 'View',
        component: () =>
            import ("@/views/main/view.vue")
    },
    // 통계 - 측정값 조회
    {
        path: '/stats/measurementData',
        name: 'measurementData',
        component: () =>
            import ("@/views/stats/measurement_data.vue")
    },
    // 통계 - 일간통계 및 그래프
    {
        path: '/stats/measurementDataByDay',
        name: 'measurementDataByDay',
        beforeEnter: requireAuth,
        component: () =>
            import ("@/views/stats/measurement_data_day.vue")
    },
    // 통계 - 월간통계 및 그래프
    {
        path: '/stats/measurementDataByMon',
        name: 'measurementDataByMon',
        component: () =>
            import ("@/views/stats/measurement_data_mon.vue")
    },
    // 통계 - 일간 방지시설 통계
    {
        path: '/stats/preventionDataByDay',
        name: 'preventionDataByDay',
        component: () =>
            import ("@/views/stats/prevention_data_day.vue")
    },
    // 통계 - 월간 방지시설 통계
    {
        path: '/stats/preventionDataByMon',
        name: 'preventionDataByMon',
        component: () =>
            import ("@/views/stats/prevention_data_mon.vue")
    },
    // 통계 - 정규분포 - 측정위치
    {
        path: '/stats/normalDistribution1',
        name: 'normalDistribution1',
        component: () =>
            import ("@/views/stats/normal_distribution1.vue")
    },
    // 통계 - 정규분포 - 월
    {
        path: '/stats/normalDistribution2',
        name: 'normalDistribution2',
        component: () =>
            import ("@/views/stats/normal_distribution2.vue")
    },

    // 통계 - 현황 - 월
    {
        path: '/stats/status',
        name: 'status',
        component: () =>
            import ("@/views/stats/status.vue")
    },


    // 대응 - 변경점대응
    {
        path: '/response/change',
        name: 'change',
        component: () =>
            import ("@/views/response/change.vue")
    },
    // 대응 - 초과이력대응
    {
        path: '/response/excess',
        name: 'excess',
        component: () =>
            import ("@/views/response/excess.vue")
    },
    // 대응 - 측정기설비 이상 대응
    {
        path: '/response/system',
        name: 'system',
        component: () =>
            import ("@/views/response/system.vue")
    },
    // 대응 - 운영 특이사항
    {
        path: '/response/manage',
        name: 'manage',
        component: () =>
            import ("@/views/response/manage.vue")
    },
    // 대응 - 운영 특이사항 등록
    {
        path: '/response/manageCreate',
        name: 'manageCreate',
        component: () =>
            import ("@/views/response/manage_create.vue")
    },
    // 대응 - 월말보고
    {
        path: '/response/report',
        name: 'report',
        component: () =>
            import ("@/views/response/report.vue")
    },
    // 대응 - 월말보고 등록
    {
        path: '/response/reportCreate',
        name: 'reportCreate',
        component: () =>
            import ("@/views/response/report_create.vue")
    },


    // 진단 - 측정기 유지보수 계약 및 실행 현황
    {
        path: '/diagnosis/maintenanceStatus',
        name: 'maintenanceStatus',
        component: () =>
            import ("@/views/diagnosis/maintenance_status.vue")
    },


    // 보고 - 일일 관리일지
    {
        path: '/report/daily1',
        name: 'daily1',
        component: () =>
            import ("@/views/report/daily1.vue")
    },
    {
        path: '/report/daily2',
        name: 'daily2',
        component: () =>
            import ("@/views/report/daily2.vue")
    },
    {
        path: '/report/daily3',
        name: 'daily3',
        component: () =>
            import ("@/views/report/daily3.vue")
    },
    {
        path: '/report/daily4',
        name: 'daily4',
        component: () =>
            import ("@/views/report/daily4.vue")
    },
    {
        path: '/report/daily5',
        name: 'daily5',
        component: () =>
            import ("@/views/report/daily5.vue")
    },
    // 보고 - 월말 보고
    {
        path: '/report/monthly1',
        name: 'monthly1',
        component: () =>
            import ("@/views/report/monthly1.vue")
    },
    {
        path: '/report/monthly2',
        name: 'monthly2',
        component: () =>
            import ("@/views/report/monthly2.vue")
    },
    {
        path: '/report/monthly3',
        name: 'monthly3',
        component: () =>
            import ("@/views/report/monthly3.vue")
    },
    {
        path: '/report/monthly4',
        name: 'monthly4',
        component: () =>
            import ("@/views/report/monthly4.vue")
    },
    {
        path: '/report/monthly5',
        name: 'monthly5',
        component: () =>
            import ("@/views/report/monthly5.vue")
    },
    {
        path: '/report/monthly6',
        name: 'monthly6',
        component: () =>
            import ("@/views/report/monthly6.vue")
    },
    // 보고 - 본부 월말 보고 통계 - 전체 통계
    {
        path: '/report/headMonthly1',
        name: 'headMonthly1',
        component: () =>
            import ("@/views/report/head_monthly1.vue")
    },
    // 보고 - 본부 월말 보고 통계 - 유형별 통계
    {
        path: '/report/headMonthly2',
        name: 'headMonthly2',
        component: () =>
            import ("@/views/report/head_monthly2.vue")
    },

    // 보고 - 본부 월말 보고 통계 - 문제점/이슈사항
    {
        path: '/report/headMonthly3',
        name: 'headMonthly3',
        component: () =>
            import ("@/views/report/head_monthly3.vue")
    },

    // 보고 - 본부 월말 보고 통계 - 이상점 및 비정상 대응 확인
    {
        path: '/report/headMonthly4',
        name: 'headMonthly4',
        component: () =>
            import ("@/views/report/head_monthly4.vue")
    },



    // 설정 - 사업장 기준 정보
    {
        path: '/setting/workplace',
        name: 'workplace',
        component: () =>
            import ("@/views/setting/workplace.vue")
    },
    // 설정 - 사용자 정보
    {
        path: '/setting/manager',
        name: 'manager',
        component: () =>
            import ("@/views/setting/manager.vue")
    },
    // 설정 - 측정기별 기준 정보
    {
        path: '/setting/measurement',
        name: 'measurement',
        component: () =>
            import ("@/views/setting/measurement.vue")
    },
    // 설정 - 측정기별 기준 정보 등록
    {
        path: '/setting/measurementCreate',
        name: 'measurementCreate',
        component: () =>
            import ("@/views/setting/measurement_create.vue")
    },
    // 설정 - 측정기별 유지보수 계약 정보
    {
        path: '/setting/maintenance',
        name: 'maintenance',
        component: () =>
            import ("@/views/setting/maintenance.vue")
    },
    // 설정 - 메일 수신자
    {
        path: '/setting/mailreceiver',
        name: 'mailreceiver',
        component: () =>
            import ("@/views/setting/mailreceiver.vue")
    },
    // 설정 - 메일 수신자 등록
    {
        path: '/setting/mailreceiverCreate',
        name: 'mailreceiverCreate',
        component: () =>
            import ("@/views/setting/mailreceiver_create.vue")
    },

    // {
    //   path: '/normalDistribution1',
    //   name: 'Home',
    //   component: () =>  import( "@/views/stats/preventionDataByDay.vue")
    // },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    duplicateNavigationPolicy: 'ignore',
    routes
});
export default router