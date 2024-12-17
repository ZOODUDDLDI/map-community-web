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

// 폼
const form = ref(getInitialForm());

// 다이얼로그 닫히면 초기화 시키기
const onHide = () => {
  form.value = getInitialForm();
};
</script>

<style lang="scss" scoped></style>
