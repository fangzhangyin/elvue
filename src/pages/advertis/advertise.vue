<template>
    <div>
        <el-container style="height: 93vh; border: 1px solid #eee">
            <el-aside width="300px">
                <el-menu
                        default-active="ad1"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        @select="handleSelect"
                        active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>账号服务</span>
                        </template>
                        <el-submenu index="1-1">
                            <template slot="title">广告主信息与资质管理</template>
                            <el-menu-item index="ad1">获取、修改广告主信息与资质</el-menu-item>
                            <el-menu-item index="ad2">广告主头像管理</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-2">
                            <template slot="title">代理商账号管理</template>
                            <el-menu-item index="agent1">代理商下广告主列表管理</el-menu-item>
                            <el-menu-item index="agent2">获取代理商信息</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-3">
                            <template slot="title">管家（客户中心账号）管理</template>
                            <el-menu-item index="steward1">管家下广告主列表管理</el-menu-item>
                            <el-menu-item index="steward2">获取管家信息</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-4">
                            <template slot="title">资金和流水管理</template>
                            <el-menu-item index="capital1">查询资金与流水</el-menu-item>
                            <el-menu-item index="capital2">管家/代理商转账与退款</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="userinfo">
                            <i class="el-icon-document"></i>
                            <span slot="title">用户信息查询</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">广告投放</span>
                        </template>
                        <el-menu-item index="adgroup">
                            <span slot="title">获取、创建和修改广告组信息</span>
                        </el-menu-item>
                        <el-menu-item index="adplan">
                            <span slot="title">获取、创建和修改计划信息</span>
                        </el-menu-item>
                        <el-menu-item index="adoriginal">
                            <span slot="title">获取、创建和修改创意信息</span>
                        </el-menu-item>
                        <el-menu-item index="budget">
                            <span slot="title">获取、更新账户日预算</span>
                        </el-menu-item>
                        <el-submenu index="2-5">
                            <template slot="title">投放管家</template>
                            <el-menu-item index="DManager1">创建、修改、查询项目</el-menu-item>
                            <el-menu-item index="DManager2">计划分析报表功能</el-menu-item>
                            <el-menu-item index="DManager3">策略共建</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="keyword">
                            <span slot="title">获取、创建和修改关键词信息</span>
                        </el-menu-item>
                    </el-submenu>

                    <el-menu-item index="dmpuser">
                        <i class="el-icon-menu"></i>
                        <span slot="title">获取、创建和修改DMP人群列表和信息</span>
                    </el-menu-item>

                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">数据报表</span>
                        </template>
                        <el-menu-item index="ADdata">获取广告主数据</el-menu-item>
                        <el-menu-item index="agentdata">获取代理商数据</el-menu-item>
                        <el-menu-item index="adgroupdata">获取广告组数据</el-menu-item>
                        <el-menu-item index="plandata">获取计划数据</el-menu-item>
                        <el-menu-item index="originalitydata">获取创意数据</el-menu-item>
                        <el-menu-item index="userdata">获取受众数据</el-menu-item>
                        <el-menu-item index="actwordsdata">获取创意词包数据</el-menu-item>
                        <el-menu-item index="reportdata">获取报表数据</el-menu-item>
                        <el-menu-item index="partdata">获取分级模糊数据</el-menu-item>
                        <el-menu-item index="videodata">获取视频分析数据</el-menu-item>
                        <el-menu-item index="livestremdata">电商直播数据</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">青鸟线索通管理</span>
                        </template>
                        <el-submenu index="5-1">
                            <template slot="title">表单管理</template>
                            <el-menu-item index="keyword">获取、创建和修改线索通表单</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5-2">
                            <template slot="title">卡券组件</template>
                            <el-menu-item index="keyword">获取、创建和修改线索通卡券</el-menu-item>
                            <el-menu-item index="keyword">卡券核销</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5-2">
                            <template slot="title">电话组件</template>
                            <el-menu-item index="keyword">获取、创建和修改线索通智能电话</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">万花筒创意能力</span>
                        </template>
                        <el-menu-item index="keyword">通用信息接口</el-menu-item>
                        <el-menu-item index="keyword">图片超分</el-menu-item>
                        <el-submenu index="5-2">
                            <template slot="title">视频能力</template>
                            <el-menu-item index="keyword">视频自动剪辑摘要</el-menu-item>
                            <el-menu-item index="keyword">视频拼接</el-menu-item>
                            <el-menu-item index="keyword">视频边框裁剪</el-menu-item>
                            <el-menu-item index="keyword">视频智能裁剪</el-menu-item>
                            <el-menu-item index="keyword">TopView方式的视频智能裁剪</el-menu-item>
                            <el-menu-item index="keyword">微电影</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="keyword">根据音乐风格获取音乐列表</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <el-tabs type="border-card" style="height: 100%" closable @tab-remove="removeTab" @tab-click="tabclick" v-model="editableTabsValue">
                        <el-tab-pane
                                v-for="(item, index) in editableTabs"
                                :key="index"
                                :label="item.title"
                                :name="item.name"
                        >
                            <router-view ></router-view>
                        </el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "advertise",
        data: function () {
            return {
                editableTabsValue: 'ad1',
                editableTabs: [{
                    title: 'ad1',
                    name: 'ad1',
                    content: 'ad1'
                }],
            };
        },
        methods: {
            tabclick(tab, event){
                console.log(tab, event)
                this.handleSelect(tab.label,"");
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.addTab(key)
                window.location.href = "/home/advertise#/" + key
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
                window.location.href = "/home/advertise#/" + activeName;
            }
        },
    }
</script>

<style scoped>

</style>
