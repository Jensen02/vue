<!--
 * @Description: 上传图片组件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-10 14:36:45
 * @LastEditTime: 2019-03-11 21:44:11
 -->

<template>
    <div class="pict">
        <div class="icon-po">
            <img  :src="src"/>
        </div>
        <div class="btn-file-in">
            <label for="icon-add" class="btn btn-primary">上传图片</label>
            <div class="inp">
                <input class="file" name="file" id="icon-add" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UploadImage',
    data() {
        return {
            src: ''
        }
    },
    methods: {
        update(e){
                // let file = e.target.files[0];           
                this.src = window.URL.createObjectURL(e.target.files[0]);
                this.$emit('upload-image',e.target.files[0]);     
        }
    }
}
</script>

<style scoped>
    .pict {
        display: flex;
        height: 300px;
    }
    .btn-file-in {
        width: 80px;
        height: 62px;
        overflow: hidden;
    }
    .btn-file-in label {
        margin: 0;
    }
    .inp {
        display: none;
    }
    .icon-po{
        position: relative;
        width: 220px;
        height: 220px;
        margin-right: 30px;
        /* margin-top: 20px; */
    }
</style>
