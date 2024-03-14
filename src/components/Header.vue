<!-- TODO: 추후에 헤더 높이를 상수 처리해서 스타일 관리하기 -->
<template>
  <header class="w-full">
    <nav class="flex items-center justify-between p-4 bg-orange-400">
      <a href="/" class="text-lg font-bold">Logo</a>
      <!-- 네비게이션 링크 추가 위치 -->
      <div>
        <a href="http://localhost:8080/api/v1/login/google?redirectEndPoint=%2F" class="px-4 py-2 rounded hover:bg-gray-100">로그인</a>
        <a href="/signup" class="px-4 py-2 rounded hover:bg-gray-100"
          >회원가입</a
        >
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>
