<template>
  <div class="signup-form">
    <h3 class="text-lg font-semibold">회원가입</h3>
    <!-- 회원가입 폼 필드 -->
    <div class="mt-4">
      <label for="signup-email" class="block text-sm font-medium text-gray-700"
        >이메일</label
      >
      <input
        type="email"
        id="signup-email"
        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        required
      />
    </div>
    <div class="mt-4">
      <label
        for="signup-password"
        class="block text-sm font-medium text-gray-700"
        >비밀번호</label
      >
      <input
        type="password"
        id="signup-password"
        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        required
      />
    </div>
    <!-- 회원가입 버튼 -->
    <div class="mt-6">
      <button class="w-full px-4 py-2 text-white bg-green-600 rounded-md">
        가입하기
      </button>
    </div>

    <div class="flex flex-col mt-6 space-y-2">
      <button
        class="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-red-500 rounded-lg"
        @click="socialLogin('google')"
      >
        <span>Google로 가입하기</span>
      </button>
      <button
        class="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg"
        @click="socialLogin('facebook')"
      >
        <span>Facebook으로 가입하기</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignupForm',
  methods: {
    socialLogin(provider: string) {
      console.log(`${provider}로 가입 시도`);
      // 여기에 실제 소셜 가입 로직 구현
    },
  },
});
</script>
