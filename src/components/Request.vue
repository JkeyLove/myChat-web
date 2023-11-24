<template>
    <div>
        <div class="chat-container" v-if="responseData">
            <div
                v-for="message in responseData.data"
                :key="message.id"
                class="message"
                :class="{ 'own-message': message.username === username }"
            >
                <span class="username">{{ message.username }}:</span>
                <span class="content">{{ message.content }}</span>
                <span class="create-time">{{ formatTime(message.createTime) }}</span>
            </div>
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <!-- 新增输入框和发送按钮 -->
        <div class="message-input">
            <input v-model="newMessageContent" placeholder="输入消息..." />
            <button @click="sendMessage">发送</button>
        </div>
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
            username: "browser",
            ws: null,
            newMessageContent: "", // 新消息内容
        };
    },
    mounted() {
        this.fetchData();
        this.setupWebSocket();
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
            return new Date(time).toLocaleTimeString();
        },
        setupWebSocket() {
            const wsUrl = `ws://127.0.0.1:8848/endPoint/${this.screen}/${this.username}`;
            this.ws = new WebSocket(wsUrl);

            this.ws.onopen = () => {
                console.log('WebSocket连接已打开');
            };

            this.ws.onmessage = event => {
                console.log('收到消息:', event.data);
                //const newMessage = JSON.parse(event.data);
                //this.responseData.data.push(newMessage);
                this.responseData.data().push(event.data);
            };

            this.ws.onclose = () => {
                console.log('WebSocket连接已关闭');
            };

            this.ws.onerror = error => {
                console.error('WebSocket发生错误:', error);
            };
        },
        sendMessage() {
            if (this.newMessageContent.trim() !== "") {
                /*const newMessage = {
                    username: this.username,
                    content: this.newMessageContent,
                    createTime: new Date().toISOString(),
                };*/

                // 发送新消息到后端
                this.ws.send(this.newMessageContent);

                // 清空输入框
                this.newMessageContent = "";
            }
        },
    },
};
</script>

<style scoped>
/* 样式保持不变 */
</style>


<style scoped>
.chat-container {
    max-height: 300px; /* 设置最大高度，超过部分显示滚动条 */
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
}

.message {
    margin-bottom: 10px;
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

.own-message {
    text-align: right; /* 将属于当前用户的消息右对齐 */
    /* 可以根据需要添加其他样式，比如改变背景颜色等 */
}

.message-input {
    margin-top: 10px;
}

.message-input input {
    margin-right: 10px;
}
</style>
