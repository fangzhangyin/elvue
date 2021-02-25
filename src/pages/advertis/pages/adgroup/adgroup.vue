<template>
    <div>
        获取、创建和修改广告组信息
        <el-row type="flex" justify="center" style="margin-top: 10px">
            <el-col :span="20">
                <el-form :inline="true" :model="formdata" class="demo-form-inline">
                    <el-form-item label="广告主ID">
                        <el-input v-model="formdata.advertiser_id" placeholder="广告主ID(必填)"/>
                    </el-form-item>
                    <el-form-item>
                        <el-switch
                                style="display: block"
                                v-model="value2"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="不添加限制条件"
                                inactive-text="添加限制条件">
                        </el-switch>
                    </el-form-item>
                    <div v-if="!value2">
                        <el-form-item label="添加广告组ID过滤">
                            <el-input v-model="filtering.ids" placeholder="广告组ID"/>
                        </el-form-item>
                        <el-form-item label="添加广告组名称过滤">
                            <el-input v-model="filtering.campaign_name" placeholder="广告组name"/>
                        </el-form-item>
                        <el-form-item label="添加广告组推广目的过滤">
                            <el-select v-model="filtering.landing_type" placeholder="推广目的">
                                <el-option v-for="(item,key) in landing_type" :key="key" :label="item" :value="key"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="添加广告组状态过滤">
                            <el-select v-model="filtering.status" placeholder="状态">
                                <el-option v-for="(item,key) in status" :key="key" :label="item" :value="key"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="添加广告组创建时间过滤">
                            <el-date-picker
                                    v-model="filtering.campaign_create_time"
                                    type="date"
                                    placeholder="创建时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="create = true">创建广告组</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div>
            <el-table
                    id="table"
                    :data="adgrouplist"
                    :cell-style="{textAlign:'center'}"
                    max-height="400" height="400" stripe
                    style="width: 100%">
                <el-table-column
                        v-for="(value,key) in adgroupinfo"
                        :key="key"
                        :prop=key
                        :label="value"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作" width="280">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.$index,scope.row)" type="primary" plain>修改信息</el-button>
                        <el-button @click="updateinfo(scope.$index,scope.row)" type="primary" plain>更新广告组</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    style="margin-top: 10px"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page_info.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="page_info.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page_info.total_number">
            </el-pagination>
        </div>

        <!--        修改广告组信息-->
        <div>
            <el-dialog title="修改广告组信息" :visible.sync="dialogVisible" width="30%">
                <el-row :gutter="20">
                    <el-form ref="form" label-width="120px" size="medium" label-position="left">
                        <el-col :span="24">
                            <el-form-item label="广告主ID">
                                <el-input v-model="edit.advertiser_id" placeholder="广告主ID"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组ID">
                                <el-input v-model="edit.campaign_id" placeholder="广告组ID，广告组ID需要属于广告主ID"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="时间戳">
                                <el-input v-model="edit.modify_time" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组名称">
                                <el-input v-model="edit.campaign_name"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组预算类型">
                                <el-select v-model="edit.budget_mode" placeholder="预算类型">
                                    <el-option v-for="(item,key) in budget_mode" :key="key" :label="item" :value="key"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组预算">
                                <el-input v-model="edit.budget"/>
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
        <!--        添加广告组-->
        <div>
            <el-dialog title="创建广告组信息" :visible.sync="create" width="30%">
                <el-row :gutter="20">
                    <el-form :model="createinfo"  ref="createinfo" label-width="120px" size="medium" label-position="left" :rules="rules">
                        <el-col :span="24">
                            <el-form-item label="广告主ID" prop="advertiser_id">
                                <el-input v-model="createinfo.advertiser_id" placeholder="广告主ID"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组名称" prop="campaign_name">
                                <el-input v-model="createinfo.campaign_name"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组状态">
                                <el-select v-model="createinfo.operation" placeholder="状态">
                                    <el-option label="开启" value="enable"/>
                                    <el-option label="关闭" value="disable"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组预算类型" prop="budget_mode">
                                <el-select v-model="createinfo.budget_mode" placeholder="预算类型">
                                    <el-option v-for="(item,key) in budget_mode" :key="key" :label="item" :value="key"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--                        当budget_mode为"BUDGET_MODE_DAY"时,必填,且日预算不少于300元-->
                        <el-col :span="24">
                            <el-form-item label="广告组预算">
                                <el-input v-model="createinfo.budget"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组推广目的" prop="landing_type">
                                <el-select v-model="createinfo.landing_type" placeholder="推广目的">
                                    <el-option v-for="(item,key) in landing_type" :key="key" :label="item"
                                               :value="key"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组商品类型">
                                <el-select v-model="createinfo.delivery_related_num" placeholder="商品类型">
                                    <el-option v-for="(item,key) in delivery_related_num" :key="key" :label="item"
                                               :value="key"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item size="large">
                                <el-button @click="create = false">取 消</el-button>
                                <el-button type="primary" @click="createad('createinfo')">确 定</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
            </el-dialog>
        </div>
        <!--        更新广告组状态-->
        <div>
            <el-dialog title="更新广告组状态" :visible.sync="upstate" width="30%">
                <el-row :gutter="20">
                    <el-form ref="form" label-width="120px" size="medium" label-position="center">

                        <el-col :span="24">
                            <el-form-item label="广告主ID">
                                <el-input v-model="upinfo.advertiser_id" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组id">
                                <el-input v-model="upinfo.campaign_ids" disabled/>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="状态设定">
                                <el-select v-model="upinfo.opt_status" placeholder="状态">
                                    <el-option v-for="(item,key) in adstate" :key="key" :label="item" :value="key"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item>
                                <el-button @click="upstate = false">取 消</el-button>
                                <el-button type="primary" @click="upset">确 定</el-button>
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
        name: "adgroup",
        data: function () {
            return {
                rules: {
                    advertiser_id: [{required: true, message: '请输入广告主ID', trigger: 'blur'}],
                    campaign_name: [{required: true, message: '广告组名称', trigger: 'blur'}, {
                        min: 1,
                        max: 100,
                        message: '长度在 1 到 100 个字符',
                        trigger: 'blur'
                    }],
                    budget_mode: [{required: true, message: '请选择广告组预算类型', trigger: 'blur'}],
                    landing_type: [{required: true, message: '请选择广告组推广目的', trigger: 'blur'}],
                },
                upinfo: {
                    index: '',
                    advertiser_id: '',
                    campaign_ids: '',
                    opt_status: ''
                },
                adstate: {
                    enable: '启用',
                    delete: '删除',
                    disable: '暂停'
                },
                value: false,
                create: false,
                upstate: false,
                createinfo: {
                    advertiser_id: '',
                    campaign_name: '',
                    operation: '',
                    budget_mode: '',
                    budget: '',
                    landing_type: '',
                    delivery_related_num: ''
                },
                page_info: {
                    page: 1,
                    page_size: 10,
                    total_number: 1,
                    total_page: 1
                },
                dialogVisible: false,
                edit: {
                    index: '',
                    advertiser_id: '',
                    campaign_id: '',
                    modify_time: '',
                    campaign_name: '',
                    budget_mode: '',
                    budget: ''
                },
                formdata: {
                    advertiser_id: '1691028351301640',
                    filtering: null,
                },
                filtering: {
                    ids: '',
                    campaign_name: '',
                    landing_type: '',
                    status: '',
                    campaign_create_time: ''
                },
                adgrouplist: [1],
                adgroupinfo: {
                    id: '广告组ID',
                    name: '广告组名称',
                    budget: '广告组预算',
                    budget_mode: '广告组预算类型',
                    landing_type: '广告组推广目的',
                    modify_time: '广告组时间戳',
                    status: '广告组状态',
                    campaign_create_time: '广告组创建时间',
                    campaign_modify_time: '广告组修改时间',
                    delivery_related_num: '广告组商品类型',
                    delivery_mode: '投放类型'
                },
                budget_mode: {
                    BUDGET_MODE_INFINITE: '不限',
                    BUDGET_MODE_DAY: '日预算',
                    BUDGET_MODE_TOTAL: '总预算'
                },
                landing_type: {
                    LINK: '销售线索收集',
                    APP: '应用推广',
                    DPA: '商品目录推广',
                    GOODS: '商品推广（鲁班）',
                    STORE: '门店推广',
                    AWEME: '抖音号推广',
                    SHOP: '电商店铺推广',
                    ARTICAL: '头条文章推广'
                },
                status: {
                    CAMPAIGN_STATUS_ENABLE: '启用',
                    CAMPAIGN_STATUS_DISABLE: '暂停',
                    CAMPAIGN_STATUS_DELETE: '删除',
                    CAMPAIGN_STATUS_ALL: '所有包含已删除',
                    CAMPAIGN_STATUS_NOT_DELETE: '所有不包含已删除（状态过滤默认值）',
                    CAMPAIGN_STATUS_ADVERTISER_BUDGET_EXCEED: '超出广告主日预算'
                },
                delivery_related_num: {
                    CAMPAIGN_DPA_DEFAULT_NOT: '非 DPA 推广目的',
                    CAMPAIGN_DPA_SINGLE_DELIVERY: 'DPA 推广目的，SDPA 单商品推广',
                    CAMPAIGN_DPA_MULTI_DELIVERY: 'DPA 推广目的，DPA 商品推广'
                },
                value2: true
            }
        },
        methods: {
            async upset() {
                var s = this;
                s.upinfo.campaign_ids = "[" + s.upinfo.campaign_ids + "]";
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/adpost/Campaign_Update_State',
                    data: s.upinfo
                });
                if (res.code == 0) {
                    var index = s.upinfo.index * 1;
                    s.adgrouplist[index].status = s.adstate[s.upinfo.opt_status]
                    s.upstate = false;
                }
            },
            updateinfo(index, row) {
                var s = this;
                s.upinfo.advertiser_id = row.advertiser_id;
                s.upinfo.campaign_ids = row.id;
                s.upinfo.opt_status = s.obj2key(row.status, s.adstate)
                s.upinfo.index = index;
                this.upstate = true;
            },
            //查询广告组列表
            async onSubmit() {
                var s = this;
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/adpost/Campaign_Get',
                    data: {
                        advertiser_id: s.formdata.advertiser_id,
                        page: s.page_info.page,
                        page_size: s.page_info.page_size
                    }
                });
                // console.log(res);
                s.page_info = res.data.page_info;
                s.adgrouplist = res.data.list;
                s.adgrouplist.map((item) => {
                    var obj = item;
                    for (var key in obj) {
                        if (key === 'budget_mode') {
                            item.budget_mode = s.budget_mode[obj[key]]
                        } else if (key === 'landing_type') {
                            item.landing_type = s.landing_type[obj[key]]
                        } else if (key === 'status') {
                            item.status = s.status[obj[key]]
                        } else if (key === 'delivery_related_num') {
                            item.delivery_related_num = s.delivery_related_num[obj[key]]
                        } else if (key === 'delivery_mode') {
                            if (obj[key] === 'MANUAL') {
                                item.delivery_mode = '手动'
                            } else if (obj[key] === 'PROCEDURAL') {
                                item.delivery_mode = '自动，投放管家'
                            }
                        }
                    }
                    return item;
                })
            },
            async editinfo() {
                var s = this;
                // 发起更新
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/adpost/Campaign_Update',
                    data: s.edit
                });
                // console.log(res);
                if (res.code == 0) {
                    var index = s.edit.index * 1;
                    s.adgrouplist[index].advertiser_id = s.edit.advertiser_id;
                    s.adgrouplist[index].id = res.data.campaign_id;
                    s.adgrouplist[index].name = s.edit.campaign_name;
                    s.adgrouplist[index].budget = s.edit.budget;
                    s.adgrouplist[index].budget_mode = s.budget_mode[s.edit.budget_mode];
                    s.dialogVisible = false;
                }
            },
            handleClick(index, val) {
                var s = this;
                s.edit.index = index;
                s.dialogVisible = true;
                s.edit.advertiser_id = val.advertiser_id;
                s.edit.campaign_id = val.id;
                s.edit.modify_time = val.modify_time;
                s.edit.campaign_name = val.name;
                s.edit.budget = val.budget;
                s.edit.budget_mode = s.obj2key(val.budget_mode, s.budget_mode);
            },
            obj2key(val, obj) {
                for (var key in obj) {
                    if (obj[key] === val) {
                        return key;
                    }
                }
            },
            async createad(formName) {
                var s = this;
                s.$refs[formName].validate( async (valid) =>{
                    if (valid) {
                        console.log(s.createinfo)
                        var res = await s.http.SyncPOST({
                            url: 'http://localhost:8090/adpost/Campaign_Create',
                            data: s.createinfo
                        });
                        console.log(res)
                        if(res.code==0){
                            s.onSubmit();
                            s.create=false;
                        }
                    } else {
                        this.$message({
                            message: '先完成必填项',
                            type: 'error'
                        });
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //确认弹框
            deladgroup() {
                this.$confirm('此操作将删除该广告组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //进行删除
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消该动作'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
