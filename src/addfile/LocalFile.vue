<!--
 * @Description: 上传本地文件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-16 18:11:37
 * @LastEditTime: 2019-03-19 22:49:30
 -->

<template>
    <div class="local">
        <div class="add-local">
            <div class="jump">
                <span>当前位置：<a @click="goAdd" href='javascript:void(0)'>资源列表</a> > 上传本地文件</span>
            </div>
            <div class="net-data">
                <span>上传本地文件</span>
                <div class="form-group">
                    <label for="exampleInputEmail1">文件资源名称</label>
                    <input type="text" v-model="title" class="form-control" id="exampleInputEmail1" placeholder="文件资源名称">
                </div>
                <el-select v-model="value" placeholder="请选择经验值">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div class="up-file">
                    <input type="file" name="local" @change="upFile" id="up-file">
                </div>
                <div class="net-btn">
                    <button type="button" @click="submitLocal" class="btn btn-primary">上传文件</button>
                    <button type="button" @click="goAdd" class="btn btn-default">取消上传</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
            title: '',
            src: ''
        }
    },
    methods: {
        upFile(e) {
            this.src = e.target.files[0];
        },
        // 上传本地资源
        submitLocal() {
            if(this.value && this.title && this.src) {
                let param = new FormData();
                param.append('rFile',this.src);
                param.append('rScore',this.value);
                param.append('rName',this.title);
                param.append('c_id',this.$route.query.classVal);

                this.$axios.post('/resource/bin/add',param).then(res => {
                    if(res.data.msg == "1") {
                        alert("添加本地资源成功");
                        this.$router.push({
                            path: '/home/manage-create/add',
                            query: {
                                classVal: this.$route.query.classVal
                            }
                        });
                    } else {
                        alert("添加本地资源失败")
                    }
                }).catch(error => {
                    console.log(error);
                })
            } else {
                alert("请检查资源信息是否填写完整");
            }
        },
        // 取消上传，前往资源列表页面
        goAdd() {
            this.$router.push({
                path: '/home/manage-create/add',
                query: {
                    classVal: this.$route.query.classVal
                }
            })
        }
    }
}
</script>

<style scoped>
    .local{
        width: 100%;
        height: 700px;
        background-color: #f5f5f5;
    }
    .add-local {
        width: 980px;
        margin: 0 auto;
    }
    .add-local .jump {
        width: 100%;
        height: 50px;
        line-height: 50px;
    }
    .add-local .net-data {
        width: 100%;
        height: 600px;
        background-color: #fff;
        padding: 80px 190px 0;
    }
    .add-local .net-data span {
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
    .up-file {
        margin-top: 80px;
    }
</style>
