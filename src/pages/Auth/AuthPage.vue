<template>
  <div
    class="flex flex-col justify-center min-h-screen w-screen-orridle min-w-screen"
  >
    <div class="w-full max-w-md mx-auto">
      <h2 class="text-3xl font-extrabold text-center text-gray-900">
        Let's get started!
      </h2>
      <!-- 스위칭 로직 -->
      <div class="my-6">
        <button
          @click="currentForm = 'login'"
          :class="{
            'bg-blue-500 text-white': currentForm === 'login',
            'bg-white text-gray-900': currentForm !== 'login',
          }"
          class="px-4 py-2 rounded-l-lg"
        >
          로그인
        </button>
        <button
          @click="currentForm = 'signup'"
          :class="{
            'bg-blue-500 text-white': currentForm === 'signup',
            'bg-white text-gray-900': currentForm !== 'signup',
          }"
          class="px-4 py-2 rounded-r-lg"
        >
          회원가입
        </button>
      </div>
      <component :is="currentForm === 'login' ? LoginForm : SignupForm" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginForm from './components/LoginForm.vue';
import SignupForm from './components/SignupForm.vue';

export default defineComponent({
  name: 'AuthPage',
  components: {
    LoginForm,
    SignupForm,
  },
  setup() {
    const currentForm = ref('login');

    return {
      currentForm,
      LoginForm,
      SignupForm,
    };
  },
});
</script>
