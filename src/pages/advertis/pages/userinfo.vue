<template>
    <div>
        获取授权User信息
        <div style="margin-top: 20px">
            <el-row>
                <el-row type="flex" class="row-bg" justify="start">
                    <h1 style="font-size: 15px">User信息</h1>
                </el-row>
                <el-col :span="6" v-for="(val,key) in user" :key="key">
                    <div style="margin-top: 10px">
                        <p v-if="userinfo[key]!=null&&userinfo[key]!=''">{{val}}：{{userinfo[key]}}</p>
                        <p v-else style="color: firebrick">{{val}}：无信息</p>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userinfo",
        data: function () {
            return {
                userinfo: {},
                user: {
                    id: '用户id',
                    email: '邮箱（已经脱敏处理）',
                    display_name: '用户名'
                }
            }
        },
        methods: {},
        async created() {
            var s = this;
            var res = await s.http.SyncPOST({
                url: 'http://localhost:8090/user/UserInfo',
                data: {
                }
            });
            console.log(res)
            s.userinfo=res.data
        }
    }
</script>

<style scoped>

</style>
