<!--
 * @Description: 老师发布签到 
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-21 18:47:27
 * @LastEditTime: 2019-03-26 20:22:52
 -->

<template>
   <div class="qiangda-container">
        <div class="nav-content">
            <p>
                <span>当前位置: </span>
                <span>活动列表</span>
                <span>></span>
                <span>创建抢答器</span>
            </p>
        </div>
        <div class="main-content">
            <el-input
            placeholder="请输入内容"
            v-model="quesValue"
            clearable>
            </el-input>
            <div class="par-tip">
                <div class="tip" v-if="loading">
                    <img src="./../../public/svg-loaders/three-dots.svg" width="50" alt="loading">
                </div>
            </div>
            <div id="submit">
                <el-row>
                    <el-button type="success" v-if="succ" class="btn-top" @click="postValue" v-text="btnValue"></el-button>
                    <el-button type="success" v-else disabled v-text="btnValue"></el-button>
                </el-row>
            </div>
        </div>
   </div>
</template>

<script>
export default {
   name: '',
   data() {
       return {
           id:this.$route.params.id,
           quesValue: '',
           succ: true,
           pollId: '',
           loading: false,
           btnValue: '发布抢答' 
       }
   },
   methods:{
    //    获取抢答到问题的学生
       getStudent() {
           this.$axios.post('/responder/look?c_id='+this.$route.query.classVal)
           .then(res => {
               console.log("暂时没有学生抢答");
               if(res.data.msg != "0") {
                    clearInterval(this.pollId);
                    this.desStu();
                    this.loading = false;
                    alert(res.data.msg+"  抢答到该问题");
                    history.go(0);
               }
           })
           .catch(error => {
               console.log(error);
           });
       },

       pollInfo() {
           this.pollId = setInterval(this.getStudent,2000);
       },

    //    发布抢答
       postValue() {
           if(this.btnValue == "发布抢答") {
                this.btnValue = '结束抢答';
                this.$axios.post('/responder/add?c_id='+this.$route.query.classVal+"&desc="+this.quesValue)
                .then(res => {
                    if(res.data.msg == "1") {
                        this.loading = true;
                        this.pollInfo();
                        alert("抢答发布成功！");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            } else {
                this.endQues();
            }
       },

        // 删除已抢答学生信息
       desStu() {
           this.$axios.post('/responder/del?c_id='+this.$route.query.classVal)
           .then(res => {
               console.log(res.data.msg);
               console.log("抢答结束请求已发送");
           })
           .catch(error => {
               console.log(error);
           })
       },

    //    结束抢答
        endQues() {
            this.$axios.post('/responder/delete?c_id='+this.$route.query.classVal)
            .then(res => {
                if(res.data.msg == "1") {
                    this.loading = false;
                    this.succ = false;
                    clearInterval(this.pollId);
                    alert("抢答已结束");
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
   }
}
</script>

<style scoped >
.qiangda-container{
    background-color: #F4F4F4;
    padding-bottom: 40px;
    height: 500px;
}
      .header{
          display: block;
          height: 218px;
      }
      .nav-content p{
          background-color: #F4F4F4;
          height: 42px;
          padding-top: 15px;
          font-size: 14px;
          color: #000;
          width: 985px;
          margin: 0 auto;
      }
      .main-content{
          background-color:#ffffff;
          display: block;
          width: 985px; 
          border: 1px;
          margin: 0 auto;
          padding: 70px 20px 0;
          box-shadow:0 0 2px 2px #f4f4f4;
          min-height: 400px;
     }
     .par-tip {
         height: 100px;
     }
     .tip {
         height: 100%;
     }
     #submit{
         position: absolute;
         left: 50%;
         margin-top: 100px;
         transform: translateX(-50px) translateY(-50px);
         transition:all ease .5s;
         z-index: 99;
     }
     .el-table__empty-block {
         display: none;
         opacity: 0;
     }
    
</style>
