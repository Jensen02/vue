<template>
    <div>
        <StudentList
        :options="allStudents"
        :emVal="true"
        :serial="true"
        :showSign="false"
        ></StudentList>
    </div>    
</template>

<script>
import StudentList from '@/components/StudentList'

export default {
    name: 'ShowStudent',
    data() {
        return {
            allStudents: []    // 保存所有学生
        }
    },
    created() {
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 获取所有学生信息
        this.$axios.post('/score/list?c_id='+this.$route.query.classVal)
        .then(res => {
            this.allStudents = res.data;
            loading.close();
        })
        .catch(error => {
            console.log(error);
        });
    },
    components: {
        StudentList
    }
}
</script>

<style scoped>

</style>
