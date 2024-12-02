<template>
  <q-page padding>
    <div class="text-4">커뮤니티 목록</div>
    <section class="q-gutter-y-sm q-mt-lg">
      <PostList :items="posts" />
    </section>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PostList from 'src/components/apps/post/PostList.vue';

const router = useRouter();
// const goPostDetails = id => router.push(`/posts/{id}`);

const posts = Array.from(Array(20), (_, index) => ({
  id: index,
  title: 'content ' + index,
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni a animi natus tempore eius debitis id libero ipsa optio incidunt! Unde corrupti atque vel ipsum et ipsa nulla, saepe quo!',
  readCount: 1,
  commentCount: 2,
  likeCount: 3,
  bookmarkCount: 4,
  category: '카테고리',
  tags: ['칠암동', '주약동', '망경동'],
  uid: '쥉',
}));
</script>

<style lang="scss" scoped></style>
