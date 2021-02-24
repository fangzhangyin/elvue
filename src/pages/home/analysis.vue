<template>
    <div>
        二级子页面
        <div class="total-class" id="myChart" :style="{width: '100%', height: '400px'}"></div>
        <el-row :gutter="10" justify="center" type="flex">
            <el-col :span="9">
                <el-checkbox-group v-model="sourceList">
                    <el-checkbox v-for="(item,index) in marketType" :label="item" :value="index" :key="index"></el-checkbox>
                </el-checkbox-group>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="searchinfo">
                    查询
                </el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "analysis",
        data() {
            return {
                source:[],
                sourceList:[],
                marketType: [
                    '未知渠道', '官方包', '苹果', '华为', 'oppo', 'vivo', '小米', '魅族', '字卡', '应用宝', '三星', '火火兔', '公众号', '绘本包', '全部渠道'
                ],
            }
        },
        methods: {
            searchinfo(){
                var s=this;
                var isall=false;
                s.source=new Array();
                s.sourceList.map((item,index)=>{
                    s.marketType.map((value,key)=>{
                        if(item==value){
                            index;
                            s.source.push(key)
                        }
                        if(item=='全部渠道'){
                            isall=true
                        }
                    })
                })
                if(isall){
                    s.source=new Array();
                    s.source.push(-1)
                }
                console.log(s.source)
            }
        },
        created: function () {

        }
    }
</script>

<style scoped>

</style>
