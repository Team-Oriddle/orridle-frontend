<template>
  <div class="login-form">
    <h3 class="text-lg font-semibold">로그인</h3>
    <!-- 로그인 폼 필드 -->
    <div class="mt-4">
      <label for="login-email" class="block text-sm font-medium text-gray-700"
        >이메일</label
      >
      <input
        type="email"
        id="login-email"
        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        required
      />
    </div>
    <div class="mt-4">
      <label
        for="login-password"
        class="block text-sm font-medium text-gray-700"
        >비밀번호</label
      >
      <input
        type="password"
        id="login-password"
        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        required
      />
    </div>
    <!-- 로그인 버튼 -->
    <div class="mt-6">
      <button class="w-full px-4 py-2 text-white bg-blue-600 rounded-md">
        로그인
      </button>
    </div>

    <!-- 소셜 로그인 버튼 -->
    <div class="flex flex-col mt-6 space-y-2">
      <button
        class="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-red-500 rounded-lg"
        @click="socialLogin('google')"
      >
        <span>Google로 로그인하기</span>
      </button>
      <button
        class="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg"
        @click="socialLogin('facebook')"
      >
        <span>Facebook으로 로그인하기</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginForm',
  methods: {
    socialLogin(provider: 'google' | 'facebook') {
      const redirectEndPoint = encodeURIComponent('/');
      const baseUrl = `http://localhost:8080/api/v1/login/${provider}?redirectEndPoint=${redirectEndPoint}`;
      console.log(`소셜 로그인 시도 - ${provider} - ${baseUrl}`);
      window.location.href = baseUrl;
    },
  },
});
</script>
