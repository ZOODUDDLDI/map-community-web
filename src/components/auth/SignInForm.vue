<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSignInEmail">
      <!-- 입력 -->
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined
        dense
        hide-bottom-space
      />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호"
        outlined
        dense
        hide-bottom-space
      />
      <DisplayError :code="error?.code" />
      <div>
        <!-- 로그인 -->
        <q-btn
          type="submit"
          label="로그인하기"
          class="full-width"
          unelevated
          color="orange"
          :loading="isLoading"
        />
        <!-- 부가서비스 -->
        <div class="flex justify-between">
          <q-btn
            label="비밀번호 찾기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'FindPasswordForm')"
          />
          <q-btn
            label="이메일 가입하기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'SignUpForm')"
          />
        </div>
      </div>
      <q-separator />
      <q-btn
        label="구글 로그인"
        class="full-width"
        unelevated
        color="primary"
        outline
        @click="handleSignInGoogle"
      />
    </q-form>
  </div>
</template>

<script setup>
import { signInWithGoogle, signInWithEmail } from 'src/services';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
// import { validateRequired2, validateEmail } from 'src/utils/validate-rules'; //유효성체크
import DisplayError from '../DisplayError.vue';
import { getErrorMessage } from 'src/utils/firebase/error-message';
import { useAsyncState } from '@vueuse/core'; // 비동기 처리 라이브러리

const emit = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

// 에러 핸들링
// const isLoading = ref(false);
// const error = ref(null);

const { isLoading, error, execute } = useAsyncState(signInWithEmail, null, {
  immediate: false,
  throwError: true, // 전역 에러에 던지기
  onSuccess: () => {
    // 성공 했을때
    $q.notify('환영합니다  ^_^');
    emit('closeDialog'); // 성공시 다이얼로그 닫기
  },
  onError: err => {
    // 에러 났을때
    $q.notify({
      type: 'negative',
      message: getErrorMessage(err.code),
    });
  },
});

// 이메일 로그인
const form = ref({
  email: '',
  password: '',
});
// execute 실행함수
const handleSignInEmail = () => execute(1000, form.value); //1초, form.value 넣기.

// const handleSignInEmail = async () => {
//   try {
//     isLoading.value = true;
//     await signInWithEmail(form.value);
//     $q.notify('환영합니다  ^_^');
//     emit('closeDialog'); // 성공시 다이얼로그 닫기
//   } catch (err) {
//     //에러
//     error.value = err;
//     console.log(err);
//     $q.notify({
//       type: 'negative',
//       message: getErrorMessage(err.code),
//     });
//   } finally {
//     isLoading.value = false;
//   }
// };

// 에러 전역처리
// const handleSignInEmail = async () => {
//   await signInWithEmail(form.value);
//   $q.notify('환영합니다  ^_^');
//   emit('closeDialog'); // 성공시 다이얼로그 닫기
// };

// 구글로그인
const handleSignInGoogle = async () => {
  await signInWithGoogle();
  $q.notify('환영합니다  ^_^ ! !');
  emit('closeDialog');
};
</script>

<style lang="scss" scoped></style>
