<template>
    <div>
        <el-menu
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="#/burypoint">埋点数据查看</el-menu-item>
                <el-menu-item index="#/analysis">数据可视化分析</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">巨量引擎后台</template>
                <el-menu-item index="#/advertise">基本服务</el-menu-item>
                <el-menu-item index="#/tools">工具</el-menu-item>
            </el-submenu>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "home",
        data: function () {
            return {};
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                if(key=="#/advertise"){
                    window.location.href = "/home/advertise#/ad1"
                }else if(key=="#/tools"){
                    window.location.href = "/home#/tools"
                }else{
                    window.location.href = "/home" + key
                }
            },
        },

    }
</script>

<style scoped>

</style>
