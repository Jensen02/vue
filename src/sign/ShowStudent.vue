<!--
 * @Description: 显示所有已签到和未签到学生
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-19 21:04:29
 * @LastEditTime: 2019-03-21 18:20:54
 -->

<template>
    <div>
        <StudentList
        :options="stuArr"
        :emVal="false"
        :serial="false"
        :showSign="true"
        ></StudentList>
    </div>    
</template>

<script>
import StudentList from '@/components/StudentList'

export default {
    name: 'ShowStudent',
    data() {
        return {
            signYes: [],    // 保存已签到学生
            signNo: []      // 保存未签到学生
        }
    },
    created() {
        let loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 获取已签到学生
        this.$axios.post('/sign/is/signer?s_id='+this.$route.query.sign)
        .then(res => {
            this.signYes = res.data;
            for(let item of this.signYes) {
                this.$set(item,'sign',true);
            }
        })
        .catch(error => {
            console.log(error);
        });

        // 获取未签到学生
        this.$axios.post('/sign/not/signer?s_id='+this.$route.query.sign)
        .then(res => {
            this.signNo = res.data;
            for(let item of this.signNo) {
                this.$set(item,'sign',false);
            }
            loading.close();
        })
        .catch(error => {
            console.log(error);
        });
    },
    computed: {
        // 保存已签到和未签到学生，以便给组件传递参数
        stuArr() {
            let arr = [];
            this.signYes.forEach(item => {
                arr.push(item);
            });
            this.signNo.forEach(item => {
                arr.push(item);
            });

            return arr;
        }
    },
    components: {
        StudentList
    }
}
</script>

<style scoped>

</style>
