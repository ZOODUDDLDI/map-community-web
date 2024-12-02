<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" />

      <section class="col-7">
        <PostHeader />
        <PostList :items="posts" />
      </section>
      <PostRightBar class="col-3" @open-write-dialog="openWriteDialog" />
    </div>
    <PostWriteDialog v-model="postDialog" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from 'src/components/apps/post/PostWriteDialog.vue';

const router = useRouter();
// const goPostDetails = id => router.push(`/posts/{id}`);

// 임시 데이터
const posts = Array.from(Array(20), (_, index) => ({
  id: 'A' + index,
  title: 'content ' + index,
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni a animi natus tempore eius debitis id libero ipsa optio incidunt! Unde corrupti atque vel ipsum et ipsa nulla, saepe quo!',
  readCount: 1,
  commentCount: 2,
  likeCount: 3,
  bookmarkCount: 4,
  category: '카테고리',
  tags: ['카페', '식당', '기타'],
  uid: '쥉',
}));

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};
</script>

<style lang="scss" scoped></style>
