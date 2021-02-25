<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-button @click="turnpage">
                    获取已授权账户下的广告主
                </el-button>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
            <el-col :span="8">
                <el-input v-model="advertiser_id" placeholder="请输入广告主id"></el-input>
            </el-col>
            <el-col :span="8">
                <el-button @click="searchinfo">
                    点击获取广告主头像
                </el-button>
            </el-col>
        </el-row>
        <div style="margin-top: 20px">
            <el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <h1 style="font-size: 15px">头像审核状态信息</h1>
                </el-row>
                <el-col :span="6" v-for="(val,key) in stateinfo" :key="key">
                    <div style="margin-top: 10px">
                        <p v-if="avatarstate[key]!=null&&avatarstate[key]!=''">{{val}}：{{avatarstate[key]}}</p>
                        <p v-else style="color: firebrick">{{val}}：无信息</p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <h1 style="font-size: 15px">头像信息</h1>
                </el-row>
                <el-col :span="6" v-for="(val,key) in avatar" :key="key">
                    <div style="margin-top: 10px">
                        <p v-if="avatarinfo[key]!=null&&avatarinfo[key]!=''">{{val}}：{{avatarinfo[key]}}</p>
                        <p v-else style="color: firebrick">{{val}}：无信息</p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-button style="margin-top: 20px" @click="dialogVisible=true">
            上传/更新账户头像
        </el-button>

        <div>
            <el-dialog title="修改广告主信息" :visible.sync="dialogVisible" width="30%">
                <el-row :gutter="20">
                    <el-form ref="form" label-width="90px" size="medium" label-position="left">
                        <el-col :span="24">
                            <el-form-item label="广告主ID">
                                <el-input v-model="advertiser_id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="素材id">
                                <el-input v-model="image_id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-button @click="uploadhead">上传素材</el-button>
                            <el-button>使用新头像</el-button>
                        </el-col>
                    </el-form>
                </el-row>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    export default {
        name: "ad2",
        data: function () {
            return {
                advertiser_id: '1691028351301640',
                image_id:'',
                dialogVisible:false,
                state:{
                    UNSET:'未设置',
                    IN_AUDIT:'审核中',
                    AUDIT_REJECT:'审核被拒',
                    AUDIT_PASS:'审核通过'
                },
                avatarstate:{
                    advertiser_id:'',
                    avatar_status:'',
                    avatar_reason:'',
                    source_status:'',
                    source_info:'',
                    source_reason:'',
                },
                avatarinfo:{
                    web_uri:'',
                    audit_web_uri:'',
                    height:'',
                    width:'',
                },
                stateinfo:{
                    advertiser_id:'广告主id',
                    avatar_status:'头像审核状态',
                    avatar_reason:'头像被拒原因',
                    source_status:'品牌审核状态',
                    source_info:'品牌信息',
                    source_reason:'品牌信息被拒原因',
                },
                avatar:{
                    web_uri:'当前头像的uri',
                    audit_web_uri:'审核中头像的uri',
                    height:'审核中头像的高度',
                    width:'审核中头像的宽度',
                }
            };
        },
        methods: {
            turnpage() {
                var s = this;
                s.$router.push({
                    name: 'ad2',
                    params: {
                        info: '数据'
                    }
                })
            },
            async searchinfo(){
                var s = this;
                if (s.advertiser_id != null && s.advertiser_id != '') {
                    var res = await s.http.SyncPOST({
                        url: 'http://localhost:8090/poster/AvatarGet',
                        data: {
                            advertiser_id: s.advertiser_id
                        }
                    })
                    let headinfo=res.data;
                    headinfo.avatar_status=s.state2info(headinfo.avatar_status)
                    headinfo.source_status=s.state2info(headinfo.source_status)
                    s.avatarstate=headinfo;
                    s.avatarinfo=res.data.avatar_info;
                }
            },
            state2info(state){
                var s=this;
                return s.state[state];
            },
            uploadhead(){

            }
        },
        mounted: function () {

        }
    }
</script>

<style scoped>

</style>
