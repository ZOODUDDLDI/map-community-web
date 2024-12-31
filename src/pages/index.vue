<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="params.category" />

      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />

        <PostList :items="items" />

        <!-- 무한 스크롤 기준 -->
        <div v-intersection-observer="handleIntersectionObserver"></div>
      </section>

      <PostRightBar
        class="col-3"
        v-model:tags="params.tags"
        @open-write-dialog="openWriteDialog"
      />
    </div>
    <PostWriteDialog
      v-model="postDialog"
      @complete="completeRegistrationPost"
    />
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue';

import { getPosts } from 'src/services';
import { useAsyncState } from '@vueuse/core';
import { vIntersectionObserver } from '@vueuse/components';

import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from 'src/components/apps/post/PostWriteDialog.vue';

// 필터
const params = ref({
  category: null,
  tags: [],
  sort: 'createAt',
  limit: 6,
});

const items = ref([]);
const start = ref(null);
const isLoadMore = ref(true);

const { execute } = useAsyncState(getPosts, [], {
  immediate: false,
  throwError: true,
  onSuccess: result => {
    if (start.value) {
      items.value = items.value.concat(result.items);
    } else {
      items.value = result.items;
    }
    isLoadMore.value = result.items.length >= params.value.limit;
    start.value = result.lastItem;
  },
});
// 파라미터가 변경될때마다 바꾸기 (필터)
watch(
  params,
  () => {
    start.value = null;
    execute(0, params.value);
  },
  {
    deep: true,
  },
);

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};

// 글쓰기 완료 후
const completeRegistrationPost = () => {
  postDialog.value = false;
  start.value = null;
  execute(0, params.value);
};

// 더보기 기능
const loadMore = () => {
  execute(0, { ...params.value, start: start.value });
};

const handleIntersectionObserver = ([{ isIntersecting }]) => {
  if (isIntersecting && isLoadMore.value) {
    console.log('## handleIntersectionObserver ##');
    loadMore();
  }
};
</script>

<style lang="scss" scoped></style>
