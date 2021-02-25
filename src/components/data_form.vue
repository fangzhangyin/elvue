<template>
    <div>
        <el-row style="padding: 10px" v-for="(item,key) in formparams" :key="key">
            <div v-if="item.disable" style="width: 100%;display: flex;align-items: center">
                <el-col :span="5">
                    {{item.label}}:
                </el-col>
                <el-col v-if="item.type===0" :span="16">
                    <el-input v-model="item.value" :placeholder="item.label"/>
                </el-col>
                <el-col v-if="item.type===1" :span="16">
                    <el-select v-model="item.value" :placeholder="item.label" @change="handlerchange(item)">
                        <el-option v-for="(params,index) in item.items" :key="index" :label="params" :value="index"/>
                    </el-select>
                </el-col>
                <el-col :span="3" >
                    <el-tooltip v-if="!item.necessary" class="item" effect="dark" content="点我删除该选项" placement="top">
                        <i  class="el-icon-circle-close" @click="item.disable=false"></i>
                    </el-tooltip>
                    <el-tooltip v-else class="item" effect="dark" content="必填项" placement="top">
                        <i class="el-icon-warning" style="color: #F56C6C"></i>
                    </el-tooltip>
                </el-col>
            </div>
            <div v-if="item.child!=null&&item.child.length>0">
                <Child_Form :formparams="item.child"></Child_Form>
            </div>
        </el-row>
    </div>
</template>

<script>
    import Child_Form from "@/components/Child_Form";
    export default {
        name: "data_form",
        components: {Child_Form},
        props:{
            formparams:{
                type:Array,
                default:null
            }
        },
        methods:{
            handlerchange(val){
                this.$emit('selectclick',val);
            }
        }
    }
</script>

<style scoped>

</style>
