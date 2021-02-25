<template>
    <div>
        广告主列表（管家）
        <div style="margin-top: 20px">
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-input v-model="advertiser_id" placeholder="请输入账户管家id"/>
                </el-col>
                <el-col :span="8">
                    <el-button @click="searchinfo">
                        点击获取代理商信息
                    </el-button>
                </el-col>
            </el-row>
        </div>

        <div style="margin-top: 20px">
            <el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <h1 style="font-size: 15px">广告主信息</h1>
                </el-row>
                <el-col :span="6" v-for="(val,key) in agentinfo" :key="key">
                    <div style="margin-top: 10px">
                        <p v-if="agent[key]!=null&&agent[key]!=''">{{val}}：{{agent[key]}}</p>
                        <p v-else style="color: firebrick">{{val}}：无信息</p>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "steward2",
        data: function () {
            return {
                advertiser_id: '1691028351713287',
                agent:{
                    agent_id:'',
                    agent_name:'',
                    customer_id:'',
                    company_id:'',
                    company_name:'',
                    account_status:'',
                    create_time:'',
                    role:''
                },
                agentinfo:{
                    agent_id:'代理商ID',
                    agent_name:'代理商名称',
                    customer_id:'客户id',
                    company_id:'公司id',
                    company_name:'公司名称',
                    account_status:'用户状态',
                    create_time:'注册时间',
                    role:'角色'
                }
            }
        },
        methods: {
            async searchinfo(){
                var s=this;
                if(s.advertiser_id!=null&&s.advertiser_id!=''){
                    var res=await s.http.SyncPOST({
                        url: 'http://localhost:8090/agent/AgentInfo',
                        data: {
                            advertiser_ids: [s.advertiser_id]
                        }
                    })
                    console.log(res)
                }

            }
        }
    }
</script>

<style scoped>

</style>
