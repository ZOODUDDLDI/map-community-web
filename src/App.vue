<template>
  <router-view />
</template>

<script setup>
import { onErrorCaptured } from 'vue';

defineOptions({
  name: 'App',
});

// // 에러 확인 다른 방법 (전역역)
// onErrorCaptured(err => {
//   console.log('# onErrorCaptured #');
//   console.log('err : ', err);
// });
</script>
