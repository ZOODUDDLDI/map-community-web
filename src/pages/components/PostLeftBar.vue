<template>
  <aside>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item clickable v-ripple :active="true">
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item v-for="cate in categories" :key="cate.value" clickable v-ripple>
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </aside>
</template>

<script setup>
// 임시 데이터
const categories = [
  { label: '커뮤니티', value: 'community' },
  { label: '커뮤니티2', value: 'community2' },
  { label: '커뮤니티3', value: 'community3' },
];
</script>

<style lang="scss" scoped></style>
