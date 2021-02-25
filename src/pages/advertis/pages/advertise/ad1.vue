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
                <el-input v-model="advertiser_id" placeholder="请输入广告主id"/>
            </el-col>
            <el-col :span="8">
                <el-button @click="searchinfo">
                    点击获取广告主信息
                </el-button>
            </el-col>
        </el-row>
        <div style="margin-top: 20px">
            <el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <h1 style="font-size: 15px">广告主信息</h1>
                </el-row>
                <el-col :span="6" v-for="(val,key) in info" :key="key">
                    <div style="margin-top: 10px">
                        <p v-if="advertiserInfo[key]!=null&&advertiserInfo[key]!=''">{{val}}：{{advertiserInfo[key]}}</p>
                        <p v-else style="color: firebrick">{{val}}：无信息</p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-button @click="openedit" style="margin-top: 10px">
            修改广告主信息
        </el-button>
        <el-button @click="qualification" style="margin-top: 10px">
            提交广告主资质
        </el-button>
        <div>
            <el-dialog title="修改广告主信息" :visible.sync="dialogVisible" width="30%">
                <el-row :gutter="20">
                    <el-form ref="form" label-width="90px" size="medium" label-position="left">
                        <el-col :span="24">
                            <el-form-item label="账户名称">
                                <el-input v-model="accountname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="联系人">
                                <el-input v-model="contacts"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="手机号码">
                                <el-input v-model="phonenum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="固定电话">
                                <el-input v-model="telphonenum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item size="large">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="editinfo">确 定</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ad1",
        data: function () {
            return {
                accountname: '',
                contacts: '',
                phonenum: '',
                telphonenum: '',
                advertiser_id: '1691028351301640',
                dialogVisible: false,
                advertiserInfo: {},
                info: {
                    id: '广告主ID',
                    name: '账户名',
                    descriptionL: '品牌描述,即推广内容',
                    email: '联系邮箱',
                    contacter: '联系人',
                    phonenumber: '手机号码',
                    role: '角色标识',
                    status: '广告主状态',
                    telephone: '固定电话',
                    address: '地址',
                    license_url: '执照预览地址',
                    license_no: '执照编号',
                    license_province: '执照省份',
                    license_city: '执照城市',
                    company: '公司名',
                    brand: '经营类别',
                    promotion_area: '运营区域',
                    promotion_center_province: '运营省份',
                    promotion_center_city: '运营城市',
                    first_industry_name: '一级行业名称',
                    second_industry_name: '二级行业名称',
                    reason: '审核拒绝原因',
                    balance: '账户总余额(单位元)',
                    create_time: '创建时间'
                },
                roletype:{
                    ROLE_ADVERTISER:'普通广告主（直客）',
                    ROLE_CHILD_ADVERTISER:'普通广告主（代理商子客户）',
                    ROLE_CHILD_AGENT:'二级代理商',
                    ROLE_AGENT:'一级代理商'
                }
            };
        },
        methods: {
            openedit() {
                var s = this;
                s.accountname = s.advertiserInfo.name;
                s.contacts = s.advertiserInfo.contacter;
                s.phonenum = s.advertiserInfo.phonenumber;
                s.telphonenum = s.advertiserInfo.telephone;
                s.dialogVisible = true;
            },
            turnpage() {

            },
            async searchinfo() {
                var s = this;
                if (s.advertiser_id != null && s.advertiser_id != '') {
                    var res = await s.http.SyncPOST({
                        url: 'http://localhost:8090/poster/AdvertiserInformation',
                        data: {
                            advertiser_ids: [s.advertiser_id]
                        }
                    })
                    console.log(res)
                    s.advertiserInfo = res.data[0]
                }
            },
            async editinfo() {
                var s = this;
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/agent/AgentAdvertiserUpdate',
                    data: {
                        advertiser_id: s.advertiser_id,
                        name: s.accountname,
                        contacter: s.contacts,
                        phonenumber: s.phonenum,
                        telephone: s.telphonenum
                    }
                })
                console.log(res);
            },
            qualification() {
                console.log('提交广告主资质')
            }
        },
        mounted: function () {
            let info = this.$route.params.advertiser_id
            if (info != null) {
                this.advertiser_id = info;
                console.log(info)
            }
        }
    }

</script>

<style scoped>

</style>
