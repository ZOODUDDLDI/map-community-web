<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <!-- 입력 -->
      <q-input v-model="form.nickname" placeholder="닉네임" outlined dense />
      <q-input v-model="form.email" placeholder="이메일" outlined dense />
      <q-input
        v-model="form.password"
        placeholder="비밀번호(문자, 숫자조합 8자 이상)"
        outlined
        dense
      />

      <!-- 가입 -->
      <q-btn
        type="submit"
        label="가입하기"
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
import { signUpWithEamil } from 'src/services';

defineEmits(['changeView']);

// 데이터
const form = ref({
  nickname: '',
  email: '',
  password: '',
});

const handleSubmit = async () => {
  await signUpWithEamil(form.value);
  alert('가입완료');
};
</script>

<style lang="scss" scoped></style>
