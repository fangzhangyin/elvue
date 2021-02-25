<template>
    <div>
        账户日预算
        <div style="margin-top: 20px">
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-input v-model="advertiser_id" placeholder="请输入代理商ID"/>
                </el-col>
                <el-col :span="8">
                    <el-button @click="searchinfo">
                        点击获取每日预算
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <el-table
                id="table"
                :data="budgetinfolist"
                :cell-style="{textAlign:'center'}"
                max-height="230" height="230" stripe
                style="width: 100%">
            <el-table-column
                    v-for="(value,key) in budgetinfo"
                    :key="key"
                    :prop=key
                    :label="value">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    align="center"
                    label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" plain>更新日预算</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-dialog title="更新账户日预算" :visible.sync="formshow" width="30%">
                <data_form :formparams="formparams"></data_form>
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
        name: "budget",
        components: {data_form},
        data() {
            return {
                formshow:false,
                advertiser_id: '1691028351713287',
                budgetinfolist: [1],
                budgetinfo: {
                    advertiser_id: '广告主ID',
                    budget: '预算(元)',
                    budget_mode: '预算类型'
                },
                formparams: [],
                budgetparams: [
                    {
                        label: '广告主ID',
                        param: 'advertiser_id',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true
                    }, {
                        label: '预算模式',
                        param: 'budget_mode',
                        value: '',
                        type: 1,
                        necessary: true,
                        disable: true,
                        items: {
                            BUDGET_MODE_INFINITE: '不限',
                            BUDGET_MODE_DAY: '日预算',
                            BUDGET_MODE_TOTAL: '总预算'
                        }
                    }, {
                        label: '预算值',
                        param: 'budget',
                        value: '',
                        type: 0,
                        necessary: true,
                        disable: true
                    }
                ]
            }
        },
        methods: {
            async searchinfo() {
                var s = this;
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/adpost/Budget_Get',
                    data: {
                        advertiser_ids:"["+s.advertiser_id+"]"
                    }
                });
                // console.log(res)
                if(res.code===0){
                    s.budgetinfolist=res.data.list;
                }
            },
            handleClick(index, row) {
                console.log(index, row);
                var s=this;
                s.formparams=s.budgetparams;
                s.formshow=true;
            }
        }
    }
</script>

<style scoped>

</style>
