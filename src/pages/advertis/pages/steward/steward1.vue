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
                        点击获取广告主列表
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-table
                    :data="adlist"
                    stripe
                    max-height="580" height="580"
                    style="width: 100%">
                <el-table-column
                        prop="advertiser_id"
                        label="广告主id"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="advertiser_name"
                        label="广告主名称"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.$index,scope.row)" type="primary" plain>查看、修改信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "steward1",
        data: function () {
            return {
                advertiser_id: '1691028351713287',
                adlist: [
                    {
                        advertiser_id: 'fds',
                        advertiser_name: 'qq'
                    }
                ],
                currentPage: 1,
                total: 100
            }
        },
        methods: {
            async searchinfo() {
                var s = this;
                var res = await s.http.SyncPOST({
                    url: 'http://localhost:8090/poster/AdvertiserSelect',
                    data: {
                        advertiser_id: s.advertiser_id
                    }
                })
                console.log(res)
                s.adlist=res.data.list;
            },
            handleClick(val) {
                var s=this;
                s.$router.push({
                    name: 'ad1',
                    params: {
                        advertiser_id: val.advertiser_id
                    }
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped>

</style>
