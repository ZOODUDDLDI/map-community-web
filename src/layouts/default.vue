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
          unelevate
          rounded
          color="orange"
          label="로그인 / 회원가입"
          @click="openAuthDialog"
        />
        <q-btn round flat>
          <q-avatar>
            <img src="/juyeong.png" />
          </q-avatar>
          <q-menu>
            <q-list>
              <q-item clickable to="/mypage/profile">
                <q-item-section>프로필</q-item-section>
              </q-item>
              <q-item>
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
import { useRoute } from 'vue-router';
import AuthDialog from 'src/components/auth/AuthDialog.vue';

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
</script>
