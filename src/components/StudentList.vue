<template>
    <div class="student">
        <div class="no-stu" v-if="options.length == 0">
            <h3>该班课目前没有学生加入</h3>
        </div>
        <div v-else class="student-list">
            <ul class="list-data">
                <li class="student-item" v-for="(item,index) in options" :key="item.uEmail">
                    <div class="ser-par">
                        <div class="serial-num" v-show="serial">
                            <img v-if="index == 0" src="./../../public/font-images/member-sort-1.png" alt="第一名">
                            <img v-else-if="index == 1" src="./../../public/font-images/member-sort-2.png" alt="第二名">
                            <img v-else-if="index == 2" src="./../../public/font-images/member-sort-3.png" alt="第三名">
                            <span v-else >{{ index+1 }}</span>
                        </div>
                    </div>
                    <div class="stu-img">
                        <img src="./../../public/2201.png" alt="头像">
                    </div>
                    <div class="student-info">
                        <span>{{ item.uName }}</span>
                        <span>{{ item.uEmail }}</span>
                    </div>
                    <div class="sign-info">
                        <div v-show="emVal" class="em-val">
                            <span class="title">{{ item.num }}</span>
                            <span>      经验值</span>
                        </div>
                        <div class="sign" v-if="showSign">
                            <span v-if="item.sign" class="com-yes">已签到</span>
                            <span v-else class="com-no">未签到</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StudentList',
    props: {
        options: {
            type: Array
        },
        // 是否显示序号
        serial: {
            type: Boolean
        },
        // 是否显示签到信息
        showSign: {
            type: Boolean
        },
        // 是否显示经验值
        emVal: {
            type: Boolean
        }
    },


}
</script>

<style scoped>
    ul {
        display: block;
        padding: 0;
        margin: 0;
    }
    span {
        color: #666;
    }
    .student {
        width: 100%;
        height: auto;
        background-color: #f5f5f5;
        padding: 40px 0 40px 0;
    }
    .no-stu {
        width: 980px;
        height: 500px;
        margin: 0 auto;
        padding-top: 140px;
        background-color: #fff;
    }
    .no-stu h3 {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    .student-list {
        width: 980px;
        min-height: 500px;
        margin: 0 auto;
        padding: 0 100px 40px;
        text-align: center;
        border-top: 1px solid #e1e1e1;
        background-color: #fff;
    }
    .student-item {
        display: flex;
        width: 600px;
        height: 70px;
        margin: 0 auto;
        align-items: center;
        border-bottom: 1px solid #e1e1e1;
        transition: all .5s;
    }
    ul li:hover {
        background-color: #f1f1f1;
    }
    .ser-par,.stu-img {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        overflow: hidden;
    }
    .stu-img {
        border-radius: 50%;
    }
    .serial-num {
        line-height: 40px;
        text-align: center;
        font-size: 0;
    }
    .serial-num img,.serial-num span {
        width: 30px;
        height: 24px;
        font-size: 15px;
        color: #666;
    }
    .stu-img img {
        width: 40px;
    }
    .student-info {
        display: flex;
        width: 220px;
        height: 46px;
        margin-left: 30px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
    }
    .sign-info {
        position: relative;
        width: 100px;
        height: 50px;
        margin-left: 100px;
        /* align-items: flex-end; */
    }
    .sign,.em-val {
        position: absolute;
    }
    .sign {
        bottom: 0;
    }
    .em-val {
        top: 0;
    }
    .title {
        font-size: 18px;
        color: #ffa200;
    }
    .com-no {
        color: #ff0000;
    }
    .com-yes {
        color: #00ff40;
    }
</style>
