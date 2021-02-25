import Vue from 'vue';
import VueRouter from "vue-router";
import HelloWorld from "@/pages/HelloWorld";
// import home from "@/pages/home";
// import analysis from "@/pages/home/analysis";

Vue.use(VueRouter)

const routers = [
    {
        path: '/helloworld',
        name: 'helloworld',
        component: HelloWorld,
    }, {
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/pages/home'], resolve),
        children: [
            {
                path: '/analysis',
                component: resolve => require(['@/pages/home/analysis'], resolve),//懒加载模式
            }, {
                path: '/burypoint',
                component: resolve => require(['@/pages/home/burypoint'], resolve)
            }, {
                path: 'home3',
                component: resolve => require(['@/pages/home/home3'], resolve)
            }, {
                path: '/advertise',
                component: resolve => require(['@/pages/advertis/advertise'], resolve),
                children: [
                    {
                        path: '/ad1',
                        name: 'ad1',
                        component: resolve => require(['@/pages/advertis/pages/advertise/ad1'], resolve)
                    },
                    {
                        path: '/ad2',
                        name: 'ad2',
                        component: resolve => require(['@/pages/advertis/pages/advertise/ad2'], resolve)
                    },
                    {
                        path: '/agent1',
                        name: 'agent1',
                        component: resolve => require(['@/pages/advertis/pages/agents/agent1'], resolve)
                    },
                    {
                        path: '/agent2',
                        name: 'agent2',
                        component: resolve => require(['@/pages/advertis/pages/agents/agent2'], resolve)
                    },
                    {
                        path: '/steward1',
                        name: 'steward1',
                        component: resolve => require(['@/pages/advertis/pages/steward/steward1'], resolve)
                    },
                    {
                        path: '/steward2',
                        name: 'steward2',
                        component: resolve => require(['@/pages/advertis/pages/steward/steward2'], resolve)
                    },
                    {
                        path: '/capital1',
                        name: 'capital1',
                        component: resolve => require(['@/pages/advertis/pages/capital/capital1'], resolve)
                    },
                    {
                        path: '/capital2',
                        name: 'capital2',
                        component: resolve => require(['@/pages/advertis/pages/capital/capital2'], resolve)
                    },
                    {
                        path: '/userinfo',
                        name: 'userinfo',
                        component: resolve => require(['@/pages/advertis/pages/userinfo'], resolve)
                    },
                    {
                        path: '/adgroup',
                        name: 'adgroup',
                        component: resolve => require(['@/pages/advertis/pages/adgroup/adgroup'], resolve)
                    },
                    {
                        path: '/adplan',
                        name: 'adplan',
                        component: resolve => require(['@/pages/advertis/pages/adplan/adplan'], resolve)
                    },
                    {
                        path: '/adoriginal',
                        name: 'adoriginal',
                        component: resolve => require(['@/pages/advertis/pages/adoriginal/adoriginal'], resolve)
                    }, {
                        path: '/budget',
                        name: 'budget',
                        component: resolve => require(['@/pages/advertis/pages/budget/budget'], resolve)
                    }, {
                        path: '/DManager1',
                        name: 'DManager1',
                        component: resolve => require(['@/pages/advertis/pages/DManager/DManager1'], resolve)
                    }
                ]
            },
            {
                path: '/tools',
                component: resolve => require(['@/pages/advertis/tools'], resolve),
                children: [
                    {
                        path: '/addmedia',
                        name: 'addmedia',
                        component: resolve => require(['@/pages/advertis/pages/upmedia/addmedia'], resolve)
                    },
                    {
                        path: '/showmedia',
                        name: 'showmedia',
                        component: resolve => require(['@/pages/advertis/pages/upmedia/showmedia'], resolve)
                    },
                ]
            }
        ]
    }
];
const router = new VueRouter({
    routes: routers,
    mode: 'hash'
})

export default router
