<template>
    <div>
        获取、创建和修改广告组信息
        <el-row type="flex" justify="center" style="margin-top: 10px">
            <el-col :span="20">
                <el-form :inline="true" :model="formdata" class="demo-form-inline">
                    <el-form-item label="广告主ID">
                        <el-input v-model="formdata.advertiser_id" placeholder="广告主ID(必填)"></el-input>
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
                            <el-input v-model="filtering.ids" placeholder="广告组ID"></el-input>
                        </el-form-item>
                        <el-form-item label="添加广告组名称过滤">
                            <el-input v-model="filtering.campaign_name" placeholder="广告组name"></el-input>
                        </el-form-item>
                        <el-form-item label="添加广告组推广目的过滤">
                            <el-select v-model="filtering.landing_type" placeholder="推广目的">
                                <el-option label="销售线索收集" value="LINK"></el-option>
                                <el-option label="应用推广" value="APP"></el-option>
                                <el-option label="商品目录推广" value="DPA"></el-option>
                                <el-option label="商品推广（鲁班）" value="GOODS"></el-option>
                                <el-option label="门店推广" value="STORE"></el-option>
                                <el-option label="抖音号推广" value="AWEME"></el-option>
                                <el-option label="电商店铺推广" value="SHOP"></el-option>
                                <el-option label="头条文章推广" value="ARTICAL"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="添加广告组状态过滤">
                            <el-select v-model="filtering.status" placeholder="状态">
                                <el-option label="启用" value="CAMPAIGN_STATUS_ENABLE"></el-option>
                                <el-option label="暂停" value="CAMPAIGN_STATUS_DISABLE"></el-option>
                                <el-option label="删除" value="CAMPAIGN_STATUS_DELETE"></el-option>
                                <el-option label="所有包含已删除" value="CAMPAIGN_STATUS_ALL"></el-option>
                                <el-option label="所有不包含已删除" value="CAMPAIGN_STATUS_NOT_DELETE"></el-option>
                                <el-option label="所有不包含已删除"
                                           value="CAMPAIGN_STATUS_ADVERTISER_BUDGET_EXCEED"></el-option>
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
                        <el-button @click="createAdgroup">创建广告组</el-button>
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
                        <el-button @click="handleClick(scope.row)" type="primary" plain>修改信息</el-button>
                        <el-tooltip :content="'开启状态: ' + value" placement="top" style="margin-left: 10px">
                            <el-switch
                                    v-model="value"
                                    active-color="#13ce66"
                                    active-value="开启"
                                    inactive-value="关闭">
                            </el-switch>
                        </el-tooltip>
                        <el-button type="danger" icon="el-icon-delete" style="margin-left: 10px"
                                   @click="deladgroup"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    style="margin-top: 10px"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <div>
            <el-dialog title="修改广告组信息" :visible.sync="dialogVisible" width="30%">
                <el-row :gutter="20">
                    <el-form ref="form" label-width="120px" size="medium" label-position="left">
                        <el-col :span="24">
                            <el-form-item label="广告主ID">
                                <el-input v-model="edit.advertiser_id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组ID">
                                <el-input v-model="edit.campaign_id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="时间戳">
                                <el-input v-model="edit.modify_time"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组名称">
                                <el-input v-model="edit.campaign_name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组预算类型">
                                <el-select v-model="edit.budget_mode" placeholder="预算类型">
                                    <el-option label="不限" value="BUDGET_MODE_INFINITE"></el-option>
                                    <el-option label="日预算" value="BUDGET_MODE_DAY"></el-option>
                                    <el-option label="总预算" value="BUDGET_MODE_TOTAL"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组预算">
                                <el-input v-model="edit.budget"></el-input>
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

        <div>
            <el-dialog title="创建广告组信息" :visible.sync="create" width="30%">
                <el-row :gutter="20">
                    <el-form ref="form" label-width="120px" size="medium" label-position="left">
                        <el-col :span="24">
                            <el-form-item label="广告主ID">
                                <el-input v-model="createinfo.advertiser_id"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组名称">
                                <el-input v-model="createinfo.campaign_name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组状态">
                                <el-select v-model="createinfo.operation" placeholder="预算类型">
                                    <el-option label="开启" value="enable"></el-option>
                                    <el-option label="关闭" value="disable"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组预算类型">
                                <el-select v-model="createinfo.budget_mode" placeholder="预算类型">
                                    <el-option label="不限" value="BUDGET_MODE_INFINITE"></el-option>
                                    <el-option label="日预算" value="BUDGET_MODE_DAY"></el-option>
                                    <el-option label="总预算" value="BUDGET_MODE_TOTAL"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--                        当budget_mode为"BUDGET_MODE_DAY"时,必填,且日预算不少于300元-->
                        <el-col :span="24">
                            <el-form-item label="广告组预算">
                                <el-input v-model="createinfo.budget"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组推广目的">
                                <el-select v-model="createinfo.landing_type" placeholder="预算类型">
                                    <el-option label="销售线索收集" value="LINK"></el-option>
                                    <el-option label="应用推广" value="APP"></el-option>
                                    <el-option label="商品目录推广" value="DPA"></el-option>
                                    <el-option label="商品推广（鲁班）" value="GOODS"></el-option>
                                    <el-option label="门店推广" value="STORE"></el-option>
                                    <el-option label="抖音号推广" value="AWEME"></el-option>
                                    <el-option label="电商店铺推广" value="SHOP"></el-option>
                                    <el-option label="头条文章推广" value="ARTICAL"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告组商品类型">
                                <el-select v-model="createinfo.delivery_related_num" placeholder="预算类型">
                                    <el-option label="非 DPA 推广目的" value="CAMPAIGN_DPA_DEFAULT_NOT"></el-option>
                                    <el-option label="DPA 推广目的，SDPA 单商品推广"
                                               value="CAMPAIGN_DPA_SINGLE_DELIVERY"></el-option>
                                    <el-option label="DPA 推广目的，DPA 商品推广"
                                               value="CAMPAIGN_DPA_MULTI_DELIVERY"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item size="large">
                                <el-button @click="create = false">取 消</el-button>
                                <el-button type="primary" @click="createad">确 定</el-button>
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
                value: false,
                create: false,
                createinfo: {
                    advertiser_id: '',
                    campaign_name: '',
                    operation: '',
                    budget_mode: '',
                    budget: '',
                    landing_type: '',
                    delivery_related_num: ''
                },
                currentPage: 1,
                dialogVisible: false,
                total: 20,
                edit: {
                    advertiser_id: '',
                    campaign_id: '',
                    modify_time: '',
                    campaign_name: '',
                    budget_mode: '',
                    budget: ''
                },
                formdata: {
                    advertiser_id: '',
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
                value2: true
            }
        },
        methods: {
            onSubmit() {

            },
            handleClick(val) {
                var s = this;
                s.dialogVisible = true;
                console.log(val)
            },
            createAdgroup() {
                var s = this;
                s.create = true;
            },
            createad() {

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
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
