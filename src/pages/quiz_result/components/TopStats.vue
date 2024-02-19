<template>
  <div class="p-4 top-stats">
    <div class="most-correct">
      <h4 class="font-medium text-md">{{ title }}</h4>
      <img
        :src="statsData.imageUrl"
        :alt="altText"
        class="object-cover w-full rounded-lg h-96"
      />
      <p>{{ statsData.question }}</p>
      <p>정답률: {{ statsData.accuracy }}%</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TopStats',
  props: {
    title: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      required: true,
    },
    statsData: {
      type: Object as PropType<{
        imageUrl: string;
        question: string;
        accuracy: number;
      }>,
      required: true,
    },
  },
});
</script>
