<template>
    <div>
        <!-- 在这里显示从后端获取的数据 -->
        <div v-if="responseData">{{ responseData }}</div>

        <!-- 如果有错误，显示错误信息 -->
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script>
// 导入axios
import axios from 'axios';

export default {
    data() {
        return {
            responseData: null,
            error: null,
        };
    },
    mounted() {
        // 在组件加载完成后发送GET请求
        this.fetchData();
    },
    methods: {
        fetchData() {
            // 向后端发送GET请求
            axios.get('http://127.0.0.1:8848/chat/{room1}')
                .then(response => {
                    // 请求成功时更新responseData
                    this.responseData = response.data;
                })
                .catch(error => {
                    // 请求失败时更新error
                    this.error = '发生错误: ' + error.message;
                });
        },
    },
};
</script>
