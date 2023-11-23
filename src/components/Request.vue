<template>
    <div>
        <div class="chat-container" v-if="responseData">
            <div v-for="message in responseData.data" :key="message.id" class="message">
                <div :class="{ 'message-right': message.username === username, 'message-left': message.username !== username }">
                    <span class="username">{{ message.username }}:</span>
                    <span class="content">{{ message.content }}</span>
                    <span class="create-time">{{ formatTime(message.createTime) }}</span>
                </div>
            </div>
        </div>

        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            responseData: null,
            error: null,
            screen: "room1",
            username: "apifox"
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get(`http://127.0.0.1:8848/chat/${this.screen}/${this.username}`)

                .then(response => {
                    this.responseData = response.data;
                })
                .catch(error => {
                    this.error = '发生错误: ' + error.message;
                });
        },
        formatTime(time) {
            // 根据实际需要格式化时间，这里简单展示
            return new Date(time).toLocaleTimeString();
        },
    },
};
</script>

<style scoped>

.chat-container {
    max-height: 200px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
}

.message {
    margin-bottom: 10px;
}

.message-right {
    text-align: right;
}

.message-left {
    text-align: left;
}

.username {
    font-weight: bold;
    margin-right: 5px;
}

.create-time {
    color: #888;
    font-size: 12px;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
