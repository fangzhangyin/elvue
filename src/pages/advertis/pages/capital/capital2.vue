<template>
    <div>
        代理商转账与退款
        <div style="margin-top: 20px">

            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-form :model="formdata" class="demo-form-inline">
                        <el-form-item label="操作金额类型">
                            <el-select v-model="formdata.type" placeholder="操作类型">
                                <el-option label="转账" value="CASH"></el-option>
                                <el-option label="退款" value="GRANT"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="广告主ID">
                            <el-input v-model="formdata.advertiser_id" placeholder="广告主ID"></el-input>
                        </el-form-item>
                        <el-form-item label="代理商ID/管家ID">
                            <el-input v-model="formdata.agent_id" placeholder="输入ID"/>
                        </el-form-item>
                        <el-form-item label="操作金额类型">
                            <el-select v-model="formdata.agent_id" placeholder="金额类型">
                                <el-option label="现金" value="CASH"></el-option>
                                <el-option label="赠款" value="GRANT"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="金额">
                            <el-input v-model="amount" placeholder="输入金额,单位(元)"/>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">操作</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    export default {
        name: "capital2",
        data: function () {
            return {
                formdata: {
                    advertiser_id: '',
                    agent_id: '',
                    transfer_type: '',
                    amount: '',
                    type:''
                }
            }
        },
        methods: {
            onSubmit(){

            }
        }
    }
</script>

<style scoped>

</style>
