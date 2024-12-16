<template>
  <q-page padding>
    <div class="text-h4">useAsyncState</div>
    <q-separator spaced />
    <p>state : {{ state }}</p>
    <p>isLoading : {{ isLoading }}</p>
    <p>error : {{ error }}</p>
    <p>isReady : {{ isReady }}</p>
    <button @click="handleButton">execute</button>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

// useAsyncState : 비동기 로직을 넣어주면, 처리된 결과를 반응형 데이터로 제공/

const { state, isLoading, error, isReady, execute } = useAsyncState(
  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.data),
);

const handleButton = () => {
  execute(1000); //1초후에 결과 반환
};
</script>

<style lang="scss" scoped></style>
