<!--
 * @Description: 添加网页链接资源
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-16 20:39:33
 * @LastEditTime: 2019-03-21 12:04:48
 -->

<template>
    <div class="net">
        <div class="add-net">
            <div class="jump">
                <span>当前位置：<a @click="goAdd" href='javascript:void(0)'>资源列表</a> > 添加网页链接</span>
            </div>
            <div class="net-data">
                <span>添加资源链接</span>
                <div class="form-group">
                    <label for="exampleInputEmail1">链接</label>
                    <input type="url" v-model="url" @change="urlCheck" class="form-control" id="exampleInputEmail1" placeholder="资源链接">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">标题</label>
                    <input type="text" v-model="title" class="form-control" id="exampleInputEmail1" placeholder="标题内容">
                </div>
                <el-select v-model="value" placeholder="请选择经验值">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div class="net-btn">
                    <button type="button" @click="submitNet" class="btn btn-primary">提交</button>
                    <button type="button" @click="goAdd" class="btn btn-default">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _validate from '@/validate/index'

export default {
    name: 'NetFile',
    data() {
        return {
            options: [{
                value: '2',
                label: '2经验值'
                }, {
                value: '3',
                label: '3经验值'
                }, {
                value: '4',
                label: '4经验值'
                }, {
                value: '5',
                label: '5经验值'
                }, {
                value: '6',
                label: '6经验值'
                }],
            value: '',
            url: '',
            title: ''
        }
    },
    methods: {
        // 点击提交按钮，添加网络链接资源
        submitNet() {
            console.log(this.$route.query.classVal+' '+this.value+ " " +this.url +" "+this.title);
            this.$axios.post('/resource/url/add?c_id='+this.$route.query.classVal+'&rName='+this.title+'&rScore='+this.value+'&rUrl='+this.url)
            .then(res => {
                if(res.data.msg == '1') {
                    alert("添加网页资源成功");
                    this.$router.push({
                        path: '/home/manage-create/add',
                        query: {
                            classVal: this.$route.query.classVal
                        }
                    });
                } else {
                    alert("添加网页资源失败");
                }
            })
            .catch(error => {
                console.log(error);
            });
            
        },
        // 取消添加，前往资源列表页面
        goAdd() {
            this.$router.push({
                path: '/home/manage-create/add',
                query: {
                    classVal: this.$route.query.classVal
                }
            })
        },
        urlCheck() {
            if(!_validate.urlCheck(this.url)) {
                alert("链接格式错误，请重新输入：e.g: http://www.baidu.com");
            }
        }
    }
}
</script>

<style scoped>
    .net{
        width: 100%;
        height: 700px;
        background-color: #f5f5f5;
    }
    .add-net {
        width: 980px;
        margin: 0 auto;
    }
    .add-net .jump {
        width: 100%;
        height: 50px;
        line-height: 50px;
    }
    .add-net .net-data {
        width: 100%;
        height: 600px;
        background-color: #fff;
        padding: 80px 190px 0;
    }
    .add-net .net-data span {
        display: inline-block;
        margin-bottom: 50px;
    }
    .form-group {
        margin-bottom: 30px;
    }
    .net-btn {
        margin-top: 90px;
        text-align: center;
    }
</style>
