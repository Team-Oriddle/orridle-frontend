<template>
  <div class="flex justify-between mt-2">
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="메시지 입력..."
      class="flex-grow p-2 mr-2 border rounded shadow-sm"
    />
    <button
      @click="sendMessage"
      class="px-4 py-2 text-sm bg-gray-200 rounded shadow hover:bg-gray-300"
    >
      전송
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InGameSocket from '../../../socket/inGameChatSocket';

export default defineComponent({
  name: 'ChatInput',
  props:{
    socket:{
      type:InGameSocket,
      required: true,
    }
  },
  setup(props) {
    const newMessage = ref('');

    const sendMessage = () => {
      if (newMessage.value.trim()) {
        console.log('메시지 전송:', newMessage.value);
        console.log(props.socket)
        props.socket.sendMessage(newMessage.value,1)
        newMessage.value = ''; // 입력 필드 초기화
      }
    };

    return {
      newMessage,
      sendMessage,
    };
  },
});
</script>
