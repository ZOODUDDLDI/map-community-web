<template>
  <q-page padding>
    <div class="text-4">HOME</div>
    <section class="q-gutter-y-sm q-mt-lg">
      <q-card v-for="id in 50" :key="id">
        <q-card-section>{{ id }}번 게시글</q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup></script>

<style lang="scss" scoped></style>

<route lang="yaml">
name: home-page
meta:
  requiresAuth: true
  width: 600px
</route>
