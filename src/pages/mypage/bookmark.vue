<template>
  <PostList :items="posts" />
</template>

<script setup>
import PostList from 'src/components/apps/post/PostList.vue';

// 임시 데이터
const posts = Array.from(Array(3), (_, index) => ({
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
</script>

<style lang="scss" scoped></style>
