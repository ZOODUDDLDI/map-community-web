<template>
  <q-layout view="lHh Lpr lff" class="bg-grey-1">
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar>
        <q-btn flat dense to="/">
          <q-toolbar-title>
            <q-avatar>
              <img src="/logo.png" />
            </q-avatar>
            MapTalk
          </q-toolbar-title>
        </q-btn>
        <q-space />
        <q-btn stretch flat label="Home" to="/home" />
        <q-btn stretch flat label="MyPage" to="/mypage" />
        <q-separator class="q-my-md q-mr-md" vetical />
        <q-btn
          v-if="!authStore.isAuthenticated"
          unelevate
          rounded
          color="orange"
          label="로그인 / 회원가입"
          @click="openAuthDialog"
        />
        <q-btn v-if="authStore.isAuthenticated" round flat>
          <q-avatar>
            <img
              :src="
                authStore.user.photoURL ||
                generateDefaultPhotoURL(authStore.user.uid)
              "
            />
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 140px">
              <q-item
                v-if="authStore.user.emailVerified"
                clickable
                to="/mypage/profile"
              >
                <q-item-section>프로필</q-item-section>
              </q-item>
              <q-item v-else clickable>
                <q-item-section class="text-red" @click="varifyEmail"
                  >이메일을 인증해주세요.</q-item-section
                >
              </q-item>
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section>로그아웃</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <router-view />
    </q-page-container>
    <!-- 회원가입 다이얼로그 -->
    <AuthDialog v-model="authDialog" />
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import AuthDialog from 'src/components/auth/AuthDialog.vue';
import { useAuthStore } from 'src/stores/auth'; // 유저 상태
import {
  logout,
  generateDefaultPhotoURL,
  sendVerificationEmail,
} from 'src/services'; // 로그아웃

const $q = useQuasar();

// 유저상태
const authStore = useAuthStore();

// 컨테이너 크기 조정
const route = useRoute();
//console.dir(route);
//debugger;
const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '1080px',
  margin: '0 auto',
}));

// 다이얼로그
const authDialog = ref(false);
const openAuthDialog = () => (authDialog.value = true);

// 로그아웃
const handleLogout = async () => {
  await logout();
  $q.notify('로그아웃 되었습니다.');
};

// 이메일 인증
const varifyEmail = async () => {
  await sendVerificationEmail();
  $q.notify('이메일을 확인해주세요!');
};
</script>
