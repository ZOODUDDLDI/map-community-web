<template>
  <q-layout view="hHh lpR fFf">
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
        <q-btn stretch flat label="Home" to="/" />
        <q-btn stretch flat label="MyPage" to="/mypage" />
        <q-separator class="q-my-md q-mr-md" vetical />
        <q-btn unelevate rounded color="orange" label="로그인 / 회원가입" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
