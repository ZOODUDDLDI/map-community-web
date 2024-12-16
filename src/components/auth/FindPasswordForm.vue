<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">
      비밀번호 재설정
    </div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <!-- 입력 -->
      <q-input
        v-model="email"
        placeholder="가입한 이메일"
        outlined
        dense
        hide-bottom-space
        :rules="[validateEmail]"
      />

      <!-- 가입 -->
      <q-btn
        type="submit"
        label="비밀번호 재설정 하기"
        class="full-width"
        unelevated
        color="orange"
      />

      <q-separator />
      <!-- 로그인 -->
      <q-btn
        label="로그인 하기"
        class="full-width"
        unelevated
        flat
        @click="$emit('changeView', 'SignInForm')"
      />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { sendPasswordReset } from 'src/services';
import { validateEmail } from 'src/utils/validate-rules';

const emit = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

const email = ref('');

const handleSubmit = async () => {
  await sendPasswordReset(email.value);
  $q.notify('이메일로 비밀번호 재설정 링크를 보냈어요 ! ');
  emit('closeDialog');
};
</script>

<style lang="scss" scoped></style>
