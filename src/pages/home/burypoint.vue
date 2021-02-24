<template>
    <div>
        <h2>埋点统计</h2>
        <div>
            <el-date-picker
                    v-model="timestamp"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
            <el-input v-model="pointid" placeholder="埋点id" style="width: 200px"/>
            触发数量求和：{{num}}
        </div>
        <div>
            <el-button type="success" @click="getburypoint">查询数据</el-button>
        </div>
        <div>
            <el-table stripe border height="550" :data="pointinfo" style="width: 100%">
                <el-table-column prop="id" label="编号" width="180">
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="180" :formatter="formatDate">
                </el-table-column>
                <el-table-column prop="humanmark" label="用户标识" width="200">
                </el-table-column>
                <el-table-column prop="num" label="触发次数" width="100">
                </el-table-column>
                <el-table-column prop="event" label="事件描述" width="200">
                </el-table-column>
                <el-table-column sortable prop="update_time" label="最近触发时间" width="200" :formatter="formatDate">
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="200">
                </el-table-column>
                <el-table-column prop="ip" label="小程序ip" width="200">
                </el-table-column>
                <el-table-column sortable prop="type" label="埋点类型" width="150">
                </el-table-column>
                <el-table-column prop="pointid" label="埋点id">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 100, 150]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="size">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "burypoint",
        data: function () {
            return {
                size:0,
                pagesize: 20,
                currentPage: 1,
                pointid: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                timestamp: '',
                pointinfo: [
                    {
                        create_time: 1611127394820,
                        event: "用户点击菜单链接",
                        humanmark: "opiLbvpxmvwwvtUUKXbV8kGwQ7Vw",
                        id: 1,
                        ip: "",
                        num: 61,
                        pointid: 501,
                        remark: "",
                        type: 1,
                        update_time: 1611235883018
                    }
                ],
                num:0
            };
        },
        methods: {
            handleSizeChange(val) {
                var s = this;
                s.pagesize = val
                s.getburypoint()
            },
            handleCurrentChange(val) {
                var s = this;
                s.currentPage = val
                s.getburypoint()
            },
            async getburypoint() {
                var s = this;
                var start = s.timestamp[0];
                var end = s.timestamp[1];
                var now = new Date();
                var point_id = 0;
                if (start == null || end == null) {
                    s.showtoast('请先选择时间段')
                } else if (end > now) {
                    console.log('时间错误')
                } else {
                    if (s.pointid != '') {
                        point_id = parseInt(s.pointid);
                    }
                    var res = await s.http.SyncPOST({
                        url: 'https://shizi.wechart.public.kltct.com/admin/SearchPoint',
                        data: {
                            start: start.getTime(),
                            end: end.getTime(),
                            pointid: point_id,
                            pagesize: s.pagesize,
                            currentPage: s.currentPage
                        }
                    })
                    console.log(res)
                    s.pointinfo = res.pointinfo
                    s.size=res.size;
                    s.num=res.num
                }
            },
            showtoast(msg) {
                var s = this;
                s.$message({
                    message: msg,
                    type: 'error',
                    center: true
                })
            },
            formatDate(row) {
                let date = new Date(parseInt(row.create_time));
                let Y = date.getFullYear() + '-';
                let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
                let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
                let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
                let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
                let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                return Y + M + D + h + m + s;
            },
        },
        created: function () {
            var s = this;
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 5);
            s.timestamp = [start, end]
        }
    }
</script>

<style scoped>
    div {
        margin: 10px;
    }
</style>
