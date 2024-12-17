<template>
  <q-dialog
    persistent
    v-bind="$attrs"
    @hide="onHide"
    transition-show="none"
    transition-hide="none"
  >
    <q-card :style="{ minWidth: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>
      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        :loading="isLoading"
        @submit="handleSubmit"
      />
    </q-card>
  </q-dialog>
</template>

<script>
const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: [],
});
</script>

<script setup>
import { ref } from 'vue';
import PostForm from './PostForm.vue';
import { useAsyncState } from '@vueuse/core';
import { createPost } from 'src/services';
import { useAuthStore } from 'src/stores/auth';

// 유저 상태
const authStore = useAuthStore();

// 폼
const form = ref(getInitialForm());

// 다이얼로그 닫히면 초기화 시키기
const onHide = () => {
  form.value = getInitialForm();
};

const { isLoading, execute } = useAsyncState(createPost, null, {
  immediate: false,
  throwError: true,
  onSuccess: postId => {
    console.log('포스트 아이디', postId);
  },
});

// 이벤트 받는
const handleSubmit = () =>
  execute(1000, {
    ...form.value,
    uid: authStore.uid,
  });
</script>

<style lang="scss" scoped></style>
