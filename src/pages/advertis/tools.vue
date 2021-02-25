<template>
    <div>
        <el-container style="height: 90vh; border: 1px solid #eee">
            <el-aside width="300px">
                <el-menu
                        default-active="addmedia"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        @select="handleSelect"
                        active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>图片和视频管理</span>
                        </template>
                        <el-menu-item index="addmedia">上传图片和视频</el-menu-item>
                        <el-menu-item index="showmedia">查询图片和视频信息</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="transtarget">
                        <i class="el-icon-document"></i>
                        <span slot="title">获取转化、创建和修改转化目标</span>
                    </el-menu-item>
                    <el-menu-item index="dynamicword">
                        <i class="el-icon-document"></i>
                        <span slot="title">获取转化、创建和修改动态词包</span>
                    </el-menu-item>
                    <el-menu-item index="message">
                        <i class="el-icon-document"></i>
                        <span slot="title">获取转化、创建和修改消息配置</span>
                    </el-menu-item>
                    <el-menu-item index="interestwords">
                        <i class="el-icon-document"></i>
                        <span slot="title">获取转化、创建和修改兴趣词包</span>
                    </el-menu-item>
                    <el-menu-item index="commodity">
                        <i class="el-icon-document"></i>
                        <span slot="title">获取商品库信息</span>
                    </el-menu-item>
                    <el-menu-item index="adquality">
                        <i class="el-icon-document"></i>
                        <span slot="title">查询广告质量度</span>
                    </el-menu-item>
                    <el-menu-item index="suggestbid">
                        <i class="el-icon-document"></i>
                        <span slot="title">查询建议出价</span>
                    </el-menu-item>
                    <el-submenu index="10">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>建站管理</span>
                        </template>
                        <el-menu-item index="getsite">获取站点</el-menu-item>
                        <el-menu-item index="sitemanager">创建、修改、复制、转赠站点</el-menu-item>
                        <el-menu-item index="landpage1">获取程序化落地页组</el-menu-item>
                        <el-menu-item index="landpage2">创建、修改程序化落地页组</el-menu-item>
                        <el-menu-item index="olendpage">第三方落地页管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="11">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>穿山甲流量包管理</span>
                        </template>
                        <el-menu-item index="pangolin1">获取穿山甲流量包</el-menu-item>
                        <el-menu-item index="pangolin2">更新穿山甲流量包</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="planned">
                        <i class="el-icon-document"></i>
                        <span slot="title">获取计划诊断信息</span>
                    </el-menu-item>
                    <el-menu-item index="DPAtemp">
                        <i class="el-icon-document"></i>
                        <span slot="title">获取DPA创意模板</span>
                    </el-menu-item>
                    <el-menu-item index="store">
                        <i class="el-icon-document"></i>
                        <span slot="title">获取门店</span>
                    </el-menu-item>
                    <el-menu-item index="lubangoods">
                        <i class="el-icon-document"></i>
                        <span slot="title">获取已有鲁班商品</span>
                    </el-menu-item>
                    <el-submenu index="16">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>游戏试玩素材管理</span>
                        </template>
                        <el-menu-item index="getdemo">查询试玩素材</el-menu-item>
                        <el-menu-item index="createdemo">创建试玩素材</el-menu-item>
                        <el-menu-item index="pushdemo">推送试玩素材</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="tiktoknum">
                        <i class="el-icon-document"></i>
                        <span slot="title">查询绑定抖音号</span>
                    </el-menu-item>
                    <el-menu-item index="showqrcode">
                        <i class="el-icon-document"></i>
                        <span slot="title">查询预览二维码</span>
                    </el-menu-item>
                    <el-submenu index="19">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>评论管理</span>
                        </template>
                        <el-menu-item index="getcomments">获取评论和回复</el-menu-item>
                        <el-menu-item index="setcomments">操作评论内容</el-menu-item>
                        <el-menu-item index="createcomments">创建和修改屏蔽词</el-menu-item>
                        <el-menu-item index="hidetiktok">屏蔽抖音号</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="searchdown">
                        <i class="el-icon-document"></i>
                        <span slot="title">查询极速下载</span>
                    </el-menu-item>
                    <el-submenu index="21">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>飞鱼线索管理</span>
                        </template>
                        <el-menu-item index="fishclue1">飞鱼线索回传</el-menu-item>
                        <el-menu-item index="fishclue2">飞鱼线索查询</el-menu-item>
                        <el-menu-item index="fishclue3">飞鱼获取活动记录</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="journal">
                        <i class="el-icon-document"></i>
                        <span slot="title">日志查询</span>
                    </el-menu-item>
                    <el-menu-item index="task">
                        <i class="el-icon-document"></i>
                        <span slot="title">异步任务</span>
                    </el-menu-item>
                    <el-submenu index="24">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>定向包相关</span>
                        </template>
                        <el-menu-item index="direct1">查询定向包</el-menu-item>
                        <el-menu-item index="direct2">定向包增删改</el-menu-item>
                        <el-menu-item index="direct3">定向包操作</el-menu-item>
                        <el-menu-item index="direct4">定向包行为兴趣查询</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="procedural1">
                        <i class="el-icon-document"></i>
                        <span slot="title">程序化创意包查询</span>
                    </el-menu-item>
                    <el-menu-item index="procedural2">
                        <i class="el-icon-document"></i>
                        <span slot="title">程序化否定词查询</span>
                    </el-menu-item>
                    <el-menu-item index="onelifte">
                        <i class="el-icon-document"></i>
                        <span slot="title">一键起量查询配置</span>
                    </el-menu-item>
                    <el-submenu index="28">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>子链管理</span>
                        </template>
                        <el-menu-item index="subchain1">获取子链</el-menu-item>
                        <el-menu-item index="subchain2">编辑子链</el-menu-item>
                    </el-submenu>
                    <el-submenu index="29">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>RTA策略管理</span>
                        </template>
                        <el-menu-item index="RTAstrategy1">获取RTA策略</el-menu-item>
                        <el-menu-item index="RTAstrategy2">绑定和更改RTA策略</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="promotion">
                        <i class="el-icon-document"></i>
                        <span slot="title">查询商品推广卡片推荐内容</span>
                    </el-menu-item>
                    <el-submenu index="31">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>应用管理</span>
                        </template>
                        <el-menu-item index="appinfo1">获取应用信息</el-menu-item>
                        <el-menu-item index="appinfo2">创建和修改应用</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <el-tabs type="border-card" style="height: 100%" closable @tab-remove="removeTab"
                             @tab-click="tabclick" v-model="editableTabsValue">
                        <el-tab-pane
                                v-for="(item, index) in editableTabs"
                                :key="index"
                                :label="item.title"
                                :name="item.name"
                        >
                            <router-view></router-view>
                        </el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "tools",
        data: function () {
            return {
                editableTabsValue: 'addmedia',
                editableTabs: [
                    {
                        title: 'addmedia',
                        name: 'addmedia',
                        content: 'addmedia'
                    }
                ],

            };
        },
        methods: {
            tabclick(tab, event){
                console.log(tab, event)
                this.handleSelect(tab.label,"");
            },
            addTab(targetName) {
                var s=this;
                var hastag=false;
                for(var i=0;i<s.editableTabs.length;i++){
                    if(s.editableTabs[i].name==targetName){
                        hastag=true;
                        break;
                    }
                }
                if(!hastag){
                    this.editableTabs.push({
                        title: targetName,
                        name: targetName,
                        content: targetName
                    });
                }
                this.editableTabsValue = targetName;
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                window.location.href = "/home/tools#/" + activeName;
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.addTab(key)
                window.location.href = "/home/tools#/" + key
            },
        },
    }
</script>

<style scoped>

</style>
