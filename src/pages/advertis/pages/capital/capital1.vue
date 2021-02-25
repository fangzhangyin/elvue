<template>
    <div>
        查询资金与流水
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <el-input v-model="advertiser_id" placeholder="广告主ID或代理商ID"/>
            </el-col>
        </el-row>
        <div>
            <h3>账户余额</h3>
            <el-button @click="search">
                点击查看
            </el-button>
            <div>
                <el-row>
                    <el-row type="flex" class="row-bg" justify="start">
                        <h4>现金信息</h4>
                    </el-row>
                    <el-col :span="4" v-for="(val,key) in balancedata" :key="key">
                        <div style="margin-top: 5px;font-size: 15px">
                            <p v-if="balanceinfo[key]!=null&&balanceinfo[key]!=''">{{val}}：{{balanceinfo[key]}}</p>
                            <p v-else style="color: firebrick">{{val}}：无信息</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div>
            <h3>账户流水</h3>
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-date-picker style="height: 40px;" v-model="datetime" type="daterange"
                                    range-separator="至" class="su"
                                    start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="8">
                    <el-button @click="searchDailyStat">
                        点击查看
                    </el-button>
                </el-col>
            </el-row>

            <el-table
                    id="table"
                    :data="streamlist"
                    :cell-style="{textAlign:'center'}"
                    max-height="230" height="230" stripe
                    style="width: 100%">
                <el-table-column
                        v-for="(value,key) in stream"
                        :key="key"
                        :prop=key
                        :label="value"
                        width="120">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>

        </div>


    </div>
</template>

<script>
    export default {
        name: "capital1",
        data: function () {
            return {
                datetime: [],
                pagesize:10,
                total:10,
                currentPage:1,
                advertiser_id: '1691028351301640',
                balanceinfo: {
                    advertiser_id: '',
                    name: '',
                    email: '',
                    balance: '',
                    valid_balance: '',
                    cash: '',
                    valid_cash: '',
                    grant: '',
                    valid_grant: '',
                    return_goods_abs: '',
                    valid_return_goods_abs: '',
                    return_goods_cost: ''
                },
                balancedata: {
                    advertiser_id: '广告主ID或代理商ID',
                    name: '账户名',
                    email: '联系邮箱',
                    balance: '账户总余额(单位元)',
                    valid_balance: '账户可用总余额(单位元)',
                    cash: '现金余额(单位元)',
                    valid_cash: '现金可用余额(单位元)',
                    grant: '赠款余额(单位元)',
                    valid_grant: '赠款可用余额(单位元)',
                    return_goods_abs: '返货余额(单位元)',
                    valid_return_goods_abs: '返货可用余额(单位元)',
                    return_goods_cost: '返货支出(单位元)'
                },
                streamlist:[1],
                stream: {
                    advertiser_id:'广告主ID',
                    date:'日期',
                    balance:'日终结余(单位元）',
                    cash_cost:'现金支出(单位元)',
                    cost:'总支出(单位元)',
                    frozen:'冻结(单位元)',
                    income:'总存入(单位元)',
                    reward_cost:'赠款支出(单位元)',
                    return_goods_cost:'返货支出(单位元)',
                    transfer_in:'总转入(单位元)',
                    transfer_out:'总转出(单位元)'
                }
            }
        },
        methods: {
            async search(){
                var s = this;
                if (s.advertiser_id != null && s.advertiser_id != '') {
                    var res = await s.http.SyncPOST({
                        url: 'http://localhost:8090/func/FundGet',
                        data: {
                            advertiser_id: s.advertiser_id
                        }
                    })
                    console.log(res)
                    if(res.code!=0){
                        this.showtoast('warning',res.message)
                    }else{
                        s.balanceinfo=res.data;
                        console.log(s.balanceinfo)
                    }
                }
            },
            async searchDailyStat(){
                var s=this;
                var startdate=s.datetime[0];
                var endtime=s.datetime[1];
                startdate=startdate.getFullYear()+'-'+(startdate.getMonth()+1)+'-'+startdate.getDate();
                endtime=endtime.getFullYear()+'-'+(endtime.getMonth()+1)+'-'+endtime.getDate();
                console.log(startdate,endtime);
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/func/FundDailyStat',
                    data: {
                        advertiser_id: s.advertiser_id,
                        start_date:startdate,
                        end_date:endtime,
                        page:s.currentPage,
                        page_size:s.pagesize
                    }
                });
                console.log(res);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            showtoast(type,msg){
                this.$message({
                    message: msg,
                    type: type
                });
            }
        },
        mounted: function () {
            let s = this;
            let myDate = new Date();
            myDate.setTime(myDate.getTime() - 3600 * 24 * 5 * 1000)
            let year = myDate.getFullYear();
            let month = myDate.getMonth();
            let day = myDate.getDate();
            s.datetime = [new Date(year, month, day), new Date()]
        }
    }
</script>

<style scoped>

</style>
