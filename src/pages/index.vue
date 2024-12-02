<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" />

      <section class="col-7">
        <PostHeader />
        <PostList :items="posts" />
      </section>
      <PostRightBar class="col-3" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';

const router = useRouter();
// const goPostDetails = id => router.push(`/posts/{id}`);

// 임시 데이터
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
