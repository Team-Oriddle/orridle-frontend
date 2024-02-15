<template>
  <div class="flex flex-col h-full">
    <ul class="flex-1 p-2 space-y-2 overflow-auto">
      <li v-for="message in messages" :key="message.id" class="break-words">
        <strong>{{ message.sender }}:</strong> {{ message.content }}
      </li>
    </ul>
    <div class="p-2">
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        class="w-full p-2 text-white border rounded shadow"
        placeholder="메시지를 입력하세요..."
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ChatWindow',
  setup() {
    const messages = ref([
      { id: 1, sender: 'Alice', content: '안녕하세요!' },
      { id: 2, sender: 'Bob', content: '반갑습니다!' },
      // ...더 많은 메시지 데이터
    ]);
    const newMessage = ref('');

    const sendMessage = () => {
      if (newMessage.value.trim()) {
        const message = {
          id: messages.value.length + 1,
          sender: 'You',
          content: newMessage.value,
        };
        messages.value.push(message);
        newMessage.value = ''; // 입력 필드 초기화
      }
    };

    return {
      messages,
      newMessage,
      sendMessage,
    };
  },
});
</script>

<style scoped>
/* 커스텀 스타일 */
</style>
