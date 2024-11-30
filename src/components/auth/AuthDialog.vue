<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="val => $emit('update:modelValue', val)"
    transition-hide="none"
  >
    <q-card :style="{ width: '400px' }">
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat roud dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-px-xl q-pb-xl">
        <!-- 로그인 -->
        <SignInForm
          v-if="viewMode === 'SignInForm'"
          @change-view="changeViewMode"
        />
        <!-- 회원가입 -->
        <SignUpForm
          v-else-if="viewMode === 'SignUpForm'"
          @change-view="changeViewMode"
        />
        <!-- 비밀번호 찾기 -->
        <FindPasswordForm v-else @change-view="changeViewMode" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import SignInForm from './SignInForm.vue';
import SignUpForm from './SignUpForm.vue';
import FindPasswordForm from './FindPasswordForm.vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);

// 로그인, 회원가입, 비밀번호찾기 상태
const viewMode = ref('SignInForm');
const changeViewMode = mode => (viewMode.value = mode);
</script>

<style lang="scss" scoped></style>
