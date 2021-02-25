<template>
    <div>
        获取广告主下的广告计划
        <el-row type="flex" justify="center" style="margin-top: 10px">
            <el-col :span="24">
                <el-form :inline="true" :model="formdata" class="demo-form-inline">
                    <el-form-item label="广告主ID">
                        <el-input v-model="formdata.advertiser_id" placeholder="广告主ID（必填）"/>
                    </el-form-item>
                    <el-form-item>
                        <el-switch
                                style="display: block"
                                v-model="value2"
                                active-color="#13ce66"
                                active-text="不添加限制条件"
                                inactive-text="添加限制条件">
                        </el-switch>
                    </el-form-item>
                    <div v-if="!value2">
                        <el-form-item label="按广告计划ID过滤">
                            <el-input v-model="filtering.ids" placeholder="计划ID"/>
                        </el-form-item>
                        <el-form-item label="按广告计划name过滤">
                            <el-input v-model="filtering.ad_name" placeholder="计划name"/>
                        </el-form-item>
                        <el-form-item label="按广告组id过滤">
                            <el-input v-model="filtering.campaign_id" placeholder="广告组id"/>
                        </el-form-item>
                        <el-form-item label="添加广告计划创建时间过滤">
                            <el-date-picker
                                    v-model="filtering.ad_create_time"
                                    type="date"
                                    placeholder="创建时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="添加广告计划投放状态过滤">
                            <el-select v-model="filtering.status" placeholder="计划投放状态">
                                <el-option v-for="(value,key) in planstate" :key="key" :label="value" :value="key"/>
                            </el-select>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogVisible = true">创建广告计划</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div>
            <el-table
                    id="table"
                    border
                    :data="adplanlist"
                    :cell-style="{textAlign:'center'}"
                    max-height="400" height="400" stripe
                    style="width: 100%">
                <el-table-column
                        v-for="(value,key) in plaininfo"
                        :key="key"
                        :prop=key
                        :label="value"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作" width="280">

                </el-table-column>
            </el-table>
            <el-pagination
                    style="margin-top: 10px"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page_info.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="page_info.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page_info.total_number">
            </el-pagination>
        </div>
        <div>
            <el-dialog title="创建广告计划" :visible.sync="dialogVisible" width="30%">
                <el-row :gutter="20">
                    <el-form ref="form" label-width="120px" size="medium" label-position="left">
                        <el-col :span="24">
                            <el-form-item label="广告主ID">
                                <el-input v-model="createinfo.advertiser_id"/>
                            </el-form-item>
                        </el-col>
                        <h3>基础设置</h3>
                        <el-col :span="24">
                            <el-form-item label="广告组ID">
                                <el-input v-model="createinfo.campaign_id"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="广告计划名称">
                                <el-input v-model="createinfo.name"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="计划状态">
                                <el-select v-model="createinfo.operation" placeholder="计划状态">
                                    <el-option label="开启" value="enable"/>
                                    <el-option label="关闭" value="disable"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="投放范围">
                                <el-select v-model="createinfo.delivery_range" placeholder="投放范围">
                                    <el-option label="默认" value="DEFAULT"/>
                                    <el-option label="只投放到资讯联盟（穿山甲）" value="UNION"/>
                                    <el-option label="通投智选" value="UNIVERSAL"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="createinfo.delivery_range==='UNION'">
                            <el-form-item label="投放形式">
                                <el-select v-model="createinfo.union_video_type" placeholder="投放形式">
                                    <el-option label="原生视频" value="ORIGINAL_VIDEO"/>
                                    <el-option label="激励视频" value="REWARDED_VIDEO"/>
                                    <el-option label="穿山甲开屏" value="SPLASH_VIDEO"/>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <h3>预算和出价</h3>
                        <el-col :span="24">
                            <el-form-item label="预算类型">
                                <el-select v-model="createinfo.budget_mode" placeholder="预算类型">
                                    <el-option label="日预算" value="BUDGET_MODE_DAY"/>
                                    <el-option label="总预算（默认）" value="BUDGET_MODE_TOTAL"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="预算">
                                <el-input v-model="createinfo.budget" placeholder="预算"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="出价类型">
                                <el-select v-model="createinfo.pricing" placeholder="出价类型">
                                    <el-option label="CPC（点击付费），出价范围（单位元）:0.2-100" value="PRICING_CPC"/>
                                    <el-option label="CPM（展示付费），出价范围（单位元）: 4-100" value="PRICING_CPM"/>
                                    <el-option label="OCPC（已下线，仅投放范围为穿山甲可用）" value="PRICING_OCPC"/>
                                    <el-option label="OCPM（转化量付费），出价范围（单位元）:0.1-10000" value="PRICING_OCPM"/>
                                    <el-option label="CPV （出价范围（单位元）:0.07-100" value="PRICING_CPV"/>
                                    <el-option label="CPA（已下线）" value="PRICING_CPA"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="投放时间">
                                <el-select v-model="createinfo.schedule_type" placeholder="投放时间">
                                    <el-option label="一直投放" value="SCHEDULE_FROM_NOW"/>
                                    <el-option label="选择起始时间" value="SCHEDULE_START_END"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="createinfo.schedule_type==='SCHEDULE_START_END'">
                            <el-form-item label="选择起止时间">
                                <el-date-picker
                                        v-model="Launchtime"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="投放方式">
                                <el-select v-model="createinfo.flow_control_mode" placeholder="投放方式">
                                    <el-option label="优先跑量" value="FLOW_CONTROL_MODE_FAST"/>
                                    <el-option label="优先低成本" value="FLOW_CONTROL_MODE_SMOOTH"/>
                                    <el-option label="均衡投放" value="FLOW_CONTROL_MODE_BALANCE"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="过滤已转化用户">
                                <el-select v-model="createinfo.hide_if_converted" placeholder="用户类型">
                                    <el-option label="不过滤" value="NO_EXCLUDE"/>
                                    <el-option label="广告计划" value="AD"/>
                                    <el-option label="广告组" value="CAMPAIGN"/>
                                    <el-option label="广告账户" value="ADVERTISER"/>
                                    <el-option label="APP" value="APP"/>
                                    <el-option label="公司账户" value="CUSTOMER"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <h3>投放目标</h3>
                        <el-col :span="24">
                            <el-form-item label="推广目的">
                                <el-select v-model="createinfo.landing_type" placeholder="推广目的">
                                    <el-option label="应用推广" value="APP"/>
                                    <el-option label="销售线索收集" value="LINK"/>
                                    <el-option label="抖音号推广" value="AWEME"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <div v-if="createinfo.landing_type==='APP'">
                            <el-col :span="24">
                                <el-form-item label="下载方式">
                                    <el-select v-model="createinfo.download_type" placeholder="下载方式">
                                        <el-option label="下载链接" value="DOWNLOAD_URL"/>
                                        <el-option label="快应用+下载链接" value="QUICK_APP_URL"/>
                                        <el-option label="落地页链接" value="EXTERNAL_URL"/>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24" v-if="createinfo.download_type!=='EXTERNAL_URL'">
                                <el-form-item label="下载链接">
                                    <el-input v-model="createinfo.download_url" placeholder="下载方式不为落地页链接时必填"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24" v-if="createinfo.download_type==='QUICK_APP_URL'">
                                <el-form-item label="快应用链接">
                                    <el-input v-model="createinfo.quick_app_url" placeholder="下载方式为快应用时必填"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24" v-if="createinfo.download_type==='EXTERNAL_URL'">
                                <el-form-item label="落地页链接">
                                    <el-input v-model="createinfo.external_url" placeholder="下载方式为落地页时必填"/>
                                </el-form-item>
                            </el-col>
                            <div v-if="createinfo.download_type==='DOWNLOAD_URL'">
                                <el-col :span="24">
                                    <el-form-item label="下载的应用类型">
                                        <el-select v-model="createinfo.app_type" placeholder="应用类型">
                                            <el-option label="Android APP" value="APP_ANDROID"/>
                                            <el-option label="IOS APP" value="APP_IOS"/>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="应用包名">
                                        <el-input v-model="createinfo.package" placeholder="与应用下载链接中包名一致"/>
                                    </el-form-item>
                                </el-col>
                            </div>
                        </div>
                        <div v-if="createinfo.landing_type==='LINK'">
                            <el-col :span="24">
                                <el-form-item label="落地页链接">
                                    <el-input v-model="createinfo.external_url" placeholder="落地页链接"/>
                                </el-form-item>
                            </el-col>
                        </div>
                        <div v-if="createinfo.landing_type==='AWEME'">
                            <el-col :span="24">
                                <el-form-item label="投放内容">
                                    <el-select v-model="createinfo.promotion_type" placeholder="投放内容">
                                        <el-option label="直播" value="LIVE"/>
                                        <el-option label="抖音主页（默认）" value="AWEME_HOME_PAGE"/>
                                        <el-option label="落地页" value="LANDING_PAGE_LINK"/>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="抖音号">
                                    <el-input v-model="createinfo.aweme_account" placeholder="抖音号"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24" v-if="createinfo.promotion_type==='LANDING_PAGE_LINK'">
                                <el-form-item label="落地页链接">
                                    <el-input v-model="createinfo.external_url" placeholder="落地页链接"/>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="24">
                            <el-form-item size="large">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="createadplane">确 定</el-button>
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
        name: "adplan",
        data() {
            return {
                Launchtime: [],
                dialogVisible: false,
                page_info: {
                    page: 1,
                    page_size: 10,
                    total_number: 1,
                    total_page: 1
                },
                value2: true,
                formdata: {
                    advertiser_id: '1691028351301640',
                },
                createinfo: {
                    advertiser_id: '',
                    campaign_id: '',
                    operation: '',
                    delivery_range: '',
                    union_video_type: '',
                    landing_type: '',
                    budget:'',
                    feed_delivery_search: 'DISABLE',
                    intelligent_flow_switch: 'OFF'
                },
                filtering: {
                    ids: '',
                    ad_name: '',
                    campaign_id: '',
                    ad_create_time: '',
                    status: '',
                },
                adplanlist: [1],
                plaininfo: {
                    id: '计划ID',
                    ad_id: '计划ID,返回值同id',
                    name: '计划名称',
                    advertiser_id: '广告主ID',
                    campaign_id: '广告组ID',
                    modify_time: '计划上次修改时间标识',
                    ad_modify_time: '计划上次修改时间',
                    ad_create_time: '计划创建时间',
                    status: '广告计划投放状态',
                    opt_status: '广告计划操作状态',
                    delivery_range: '投放范围',
                    union_video_type: '投放形式',
                    download_type: '应用下载方式',
                    download_url: '下载链接',
                    quick_app_url: '快应用链接',
                    external_url: '落地页链接',
                    app_type: '下载类型',
                    download_mode: '下载模式',
                    convert_id: '转化目标',
                    feed_delivery_search: '搜索快投功能',
                    intelligent_flow_switch: '智能流量开关',
                    external_actions: '转化类型',
                    open_url: '直达链接(点击唤起APP)',
                    advanced_creative_type: '附加创意类型',
                    game_package_desc: '应用描述',
                    game_package_batch_id: '游戏礼包码id',
                    game_package_thumbnail_ids: '应用图片image_id',
                    storepro_unit: '门店推广-投放内容',
                    store_type: '门店类型',
                    advertiser_store_ids: '门店ID列表 ',
                    storepro_pack_id: '活动ID',
                    product_platform_id: '产品目录ID',
                    product_id: '商品id',
                    category_type: 'DPA投放范围',
                    dpa_categories: '分类列表',
                    dpa_products: '商品列表',
                    dpa_adtype: 'dpa广告类型',
                    params_type: '链接类型',
                    dpa_external_url_field: '落地页链接字段选择',
                    dpa_external_urls: '落地页链接地址列表',
                    package: '应用包名',
                    inventory_type: '创意投放位置',
                    promotion_type: '投放内容',
                    aweme_account: '抖音号',
                    audience: '广告受众',
                    hide_if_exists: '过滤已安装',
                    hide_if_converted: '过滤已转化用户',
                    converted_time_duration: '过滤时间范围',
                    dpa_lbs: '地域匹配-LBS',
                    dpa_city: '地域匹配-商品所在城市',
                    dpa_local_audience: 'DPA行为重定向',
                    include_custom_actions: '包含人群包',
                    exclude_custom_actions: '排除人群包',
                    dpa_recommend_type: 'dpa商品重定向推荐类型',
                    smart_bid_type: '投放场景',
                    adjust_cpa: '是否调整自动出价',
                    flow_control_mode: '竞价策略(投放方式)',
                    budget_mode: '预算类型',
                    budget: '预算',
                    schedule_type: '投放时间类型',
                    start_time: '投放起始时间',
                    end_time: '投放结束时间',
                    schedule_time: '投放时段',
                    pricing: '付费方式',
                    bid: '点击出价/展示出价',
                    cpa_bid: '目标转化出价/预期成本',
                    deep_bid_type: '深度优化方式',
                    deep_cpabid: '深度优化出价',
                    luban_roi_goal: '鲁班出价策略系数',
                    roi_goal: '深度转化ROI系数'
                },
                planstate: {
                    AD_STATUS_DELIVERY_OK: '投放中',
                    AD_STATUS_DISABLE: '计划暂停',
                    AD_STATUS_AUDIT: '新建审核中',
                    AD_STATUS_REAUDIT: '修改审核中',
                    AD_STATUS_DONE: '已完成（投放达到结束时间）',
                    AD_STATUS_CREATE: '计划新建',
                    AD_STATUS_AUDIT_DENY: '审核不通过',
                    AD_STATUS_BALANCE_EXCEED: '账户余额不足',
                    AD_STATUS_BUDGET_EXCEED: '超出预算',
                    AD_STATUS_NOT_START: '未到达投放时间',
                    AD_STATUS_NO_SCHEDULE: '不在投放时段',
                    AD_STATUS_CAMPAIGN_DISABLE: '已被广告组暂停',
                    AD_STATUS_CAMPAIGN_EXCEED: '广告组超出预算',
                    AD_STATUS_DELETE: '已删除',
                    AD_STATUS_ALL: '所有包含已删除',
                    AD_STATUS_NOT_DELETE: '所有不包含已删除（状态过滤默认值）',
                    AD_STATUS_ADVERTISER_BUDGET_EXCEED: '超出广告主日预算'
                }
            }
        },
        methods: {
            async onSubmit() {
                var s = this;
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/adpost/Ad_Get',
                    data: {
                        advertiser_id: s.formdata.advertiser_id,
                        page: s.page_info.page,
                        page_size: s.page_info.page_size
                    }
                });
                console.log(res)
                if (res.code === 0) {
                    s.adplanlist = res.data.list;
                    s.page_info = res.data.page_info
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            async createadplane() {
                var s=this;
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/adpost/Ad_Create',
                    data: s.createinfo
                });
                console.log(res);
            }
        }
    }
</script>

<style scoped>

</style>
