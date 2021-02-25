<template>
    <div>
        获取创意列表
        <el-row type="flex" justify="center" style="margin-top: 10px">
            <el-col :span="20">
                <el-form :inline="true" :model="formdata" class="demo-form-inline">
                    <el-form-item label="广告主ID">
                        <el-input v-model="formdata.advertiser_id" placeholder="广告主ID(必填)"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="info" @click="createnew">新建创意</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div>
            <el-table
                    id="table"
                    border
                    :data="creativelist"
                    :cell-style="{textAlign:'center'}"
                    max-height="400" height="400" stripe
                    style="width: 100%">
                <el-table-column
                        v-for="(value,key) in creativeinfo"
                        :key="key"
                        :prop=key
                        :label="value"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.$index,scope.row)" size="mini" type="primary" plain>修改创意
                        </el-button>
                        <el-button @click="updateinfo(scope.$index,scope.row)" size="mini" type="warning" plain>更新创意
                        </el-button>
                        <el-button @click="detail(scope.$index,scope.row)" size="mini" type="success" plain>创意详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div>
            <el-dialog title="新建广告创意" :visible.sync="formshow" width="30%">
                <data_form :formparams="formparams" @selectclick="selected"></data_form>
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-button @click="formshow=false">取消</el-button>
                        <el-button type="primary">操作</el-button>
                    </el-col>
                </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import data_form from "@/components/data_form";

    export default {
        name: "adoriginal",
        components: {data_form},
        data() {
            return {
                operation:0,//0：无操作，1：新建创意，2：修改创意，3：更新创意
                formparams: [],
                createparams: [
                    {
                        label: '广告主ID',
                        param: 'advertiser_id',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true
                    }, {
                        label: '广告计划ID',
                        param: 'ad_id',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true
                    }, {
                        label: '广告位置',
                        param: 'inventory_type',
                        value: '',
                        type: 1,
                        necessary: true,
                        disable: true,
                        items: {
                            INVENTORY_FEED: '头条信息流（广告投放）',
                            INVENTORY_TEXT_LINK: '头条文章详情页（已废弃）',
                            INVENTORY_VIDEO_FEED: '西瓜信息流（广告投放）',
                            INVENTORY_HOTSOON_FEED: '火山信息流（广告投放）',
                            INVENTORY_AWEME_FEED: '抖音信息流（广告投放',
                            INVENTORY_UNION_SLOT: '穿山甲（广告投放）',
                            UNION_BOUTIQUE_GAME: '穿山甲精选休闲游戏（广告投放）',
                            INVENTORY_UNION_SPLASH_SLOT: '穿山甲开屏广告（广告投放）',
                            INVENTORY_AWEME_SEARCH: '搜索广告——抖音位（广告投放）',
                            INVENTORY_SEARCH: '搜索广告——头条位（广告投放）',
                            INVENTORY_UNIVERSAL: '通投智选（广告投放）',
                            INVENTORY_BEAUTY: '轻颜相机',
                            INVENTORY_PIPIXIA: '皮皮虾',
                            INVENTORY_AUTOMOBILE: '懂车帝',
                            INVENTORY_STUDY: '好好学习',
                            INVENTORY_FACE_U: 'faceu'
                        }
                    }, {
                        label: '创意方式',
                        param: 'creative_material_mode',
                        value: '',
                        type: 1,
                        necessary: true,
                        disable: true,
                        items: {
                            STATIC_ASSEMBLE: '程序化创意',
                            STATIC_OTHERS: '其他创意不传此字段'
                        },
                        child: []
                    }, {
                        label: '三级行业ID',
                        param: 'third_industry_id',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true
                    }, {
                        label: '创意标签',
                        param: 'ad_keywords',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true
                    }, {
                        label: '展示（监测链接）',
                        param: 'track_url',
                        value: '',
                        type: 0,
                        necessary: false,
                        disable: true
                    }, {
                        label: '点击（监测链接）',
                        param: 'action_track_url',
                        value: '',
                        type: 0,
                        necessary: false,
                        disable: true
                    }, {
                        label: '视频有效播放（监测链接）',
                        param: 'video_play_effective_track_url',
                        value: '',
                        type: 0,
                        necessary: false,
                        disable: true
                    }, {
                        label: '视频播完（监测链接）',
                        param: 'video_play_effective_track_url',
                        value: '',
                        type: 0,
                        necessary: false,
                        disable: true
                    }, {
                        label: '视频播放（监测链接）',
                        param: 'video_play_track_url',
                        value: '',
                        type: 0,
                        necessary: false,
                        disable: true
                    }
                ],
                formshow: false,
                formdata: {
                    advertiser_id: '1691028351301640',
                },
                page_info: {
                    page: 1,
                    page_size: 10,
                    total_number: 1,
                    total_page: 1
                },
                creativelist: [1],
                creativeinfo: {
                    creative_id: '创意ID',
                    ad_id: '广告计划ID',
                    advertiser_id: '广告主ID',
                    title: '创意素材标题',
                    creative_word_ids: '动态词包列表',
                    status: '创意素材状态',
                    opt_status: '创意素材操作状态',
                    image_mode: '创意素材类型',
                    image_ids: '图片ID列表',
                    image_id: '视频封面图片ID',
                    video_id: '视频ID',
                    third_party_id: '第三方ID',
                    metarials: '素材信息列表',
                    creative_create_time: '广告创意创建时间',
                    creative_modify_time: '广告创意更新时间'
                },
                createstatus: {
                    CREATIVE_STATUS_DELIVERY_OK: '投放中',
                    CREATIVE_STATUS_DISABLE: '计划暂停',
                    CREATIVE_STATUS_AUDIT: '新建审核中',
                    CREATIVE_STATUS_REAUDIT: '修改审核中',
                    CREATIVE_STATUS_DONE: '已完成（投放达到结束时间）',
                    CREATIVE_STATUS_CREATE: '计划新建',
                    CREATIVE_STATUS_AUDIT_DENY: '审核不通过',
                    CREATIVE_STATUS_BALANCE_EXCEED: '账户余额不足',
                    CREATIVE_STATUS_BUDGET_EXCEED: '超出预算',
                    CREATIVE_STATUS_NOT_START: '未到达投放时间',
                    CREATIVE_STATUS_NO_SCHEDULE: '不在投放时段',
                    CREATIVE_STATUS_CAMPAIGN_DISABLE: '已被广告组暂停',
                    CREATIVE_STATUS_CAMPAIGN_EXCEED: '广告组超出预算',
                    CREATIVE_STATUS_DELETE: '已删除',
                    CREATIVE_STATUS_ALL: '所有包含已删除',
                    CREATIVE_STATUS_NOT_DELETE: '所有不包含已删除（状态过滤默认值）',
                    CREATIVE_STATUS_ADVERTISER_BUDGET_EXCEED: '超出广告主日预算'
                },
                createoptstatus: {
                    CREATIVE_STATUS_ENABLE: '启用',
                    CREATIVE_STATUS_DISABLE: '暂停',
                    CREATIVE_STATUS_DELETE: '删除'
                },
                creative_material_mode: [
                    {
                        label: '素材类型',
                        param: 'image_mode',
                        value: '',
                        type: 1,
                        necessary: true,
                        disable: true,
                        items: {
                            CREATIVE_IMAGE_MODE_SMALL: '小图，456:300---1368: 900',
                            CREATIVE_IMAGE_MODE_LARGE: '大图，1280:720---2560:1440',
                            CREATIVE_IMAGE_MODE_GROUP: '组图，456:300---1368:900',
                            CREATIVE_IMAGE_MODE_VIDEO: '横版视频(mp4、mpeg、3gp、avi)宽高比16:9',
                            CREATIVE_IMAGE_MODE_GIF: 'GIF图',
                            CREATIVE_IMAGE_MODE_LARGE_VERTICAL: '大图竖图，720:1280---1440:2560',
                            CREATIVE_IMAGE_MODE_VIDEO_VERTICAL: '竖版视频，720:1280---1440:2560',
                            TOUTIAO_SEARCH_AD_IMAGE: '搜索大图(搜索广告使用)，345:138---690:276',
                            SEARCH_AD_SMALL_IMAGE: '搜索小图(搜索广告使用)，108:72---432:288',
                            CREATIVE_IMAGE_MODE_UNION_SPLASH: '穿山甲开屏图片(穿山甲开屏使用)，1080:1920---2160:3840',
                            CREATIVE_IMAGE_MODE_UNION_SPLASH_VIDEO: '穿山甲开屏视频1s~6s',
                            CREATIVE_IMAGE_MODE_DISPLAY_WINDOW: '搜索橱窗，109:109---109:109',
                            MATERIAL_IMAGE_MODE_TITLE: '标题类型',
                            CREATIVE_IMAGE_MODE_AWEME_LIVE: '直播画面类型'
                        }
                    }, {
                        label: '图片（视频封面）ID',
                        param: 'image_id',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true,
                    }, {
                        label: '视频ID',
                        param: 'video_id',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true,
                    }, {
                        label: '图片ID列表',
                        param: 'image_ids',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true,
                    }, {
                        label: '创意标题',
                        param: 'title',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true,
                    }, {
                        label: '动态词包ID',
                        param: 'creative_word_ids',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true,
                    },
                ],
                updateparams: [
                    {
                        label: '广告主ID',
                        param: 'advertiser_id',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true,
                    }, {
                        label: '创意ID列表',
                        param: 'creative_ids',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true,
                    },{
                        label: '创意操作操作',
                        param: 'opt_status',
                        value: '',
                        type: 1,
                        necessary: true,
                        disable: true,
                        items: {
                            enable:'启用',
                            disable:'暂停',
                        }
                    }
                ]
            }
        },
        methods: {
            async onSubmit() {
                var s = this;
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/adpost/Creative_Get',
                    data: {
                        advertiser_id: s.formdata.advertiser_id,
                        page: s.page_info.page,
                        page_size: s.page_info.page_size
                    }
                });
                if (res.code == 0) {
                    s.creativelist = res.data.list;
                    s.page_info = res.data.page_info;
                }
            },
            handleClick(index, row) {
                console.log(index, row);
                var s=this;
                //赋值

                s.formparams = s.createparams;
                s.formshow = true;
            },
            updateinfo(index, row) {
                console.log(index, row);
                //赋值
                var s=this;
                s.formparams=s.updateparams;
                s.formshow=true;
            },
            detail(index, row) {
                console.log(index, row)
            },
            selected(val) {
                var s = this;
                console.log(val)
                if (val.child != null) {
                    var label = val.label;
                    var index = s.returnindex(label);
                    if (label === "创意方式" && val.value === 'STATIC_ASSEMBLE') {
                        s.formparams[index].child = s.creative_material_mode
                    } else if (label === "创意方式" && val.value != 'STATIC_ASSEMBLE') {
                        s.formparams[index].child = []
                    }
                    console.log(index)
                }
            },
            returnindex(label) {
                var s = this;
                for (var i = 0; i < s.formparams.length; i++) {
                    var obj = s.formparams[i];
                    if (obj.label === label) {
                        return i;
                    }
                }
            },
            createnew() {
                var s = this;
                s.formparams = s.createparams;
                s.formshow = true;
            }
        }
    }
</script>

<style scoped>

</style>
