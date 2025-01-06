<template>
  <q-item class="bg-white q-pt-md" clickable :to="`posts/${item.id}`">
    <q-item-section avatar top>
      <q-avatar>
        <img src="/juyeong.png" alt="" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span>닉네임 &middot; {{ formatRelativeTime(item.createAt) }}</span>
        <q-chip class="q-ml-sm" dense color="primary" text-color="white">
          {{ item.category }}
        </q-chip>
      </div>
      <div>
        <div class="text-h5">{{ item.title }}</div>
        <div class="text-primary text-caption">
          <span v-for="tag in item.tags" :key="tag"
            >#{{ tag }}&nbsp;&nbsp;</span
          >
        </div>
      </div>
      <div class="text-grey-6 q-my-sm ellipsis-2-lines">{{ item.content }}</div>
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_visibility"
              :label="item.readCount"
              tooltip="조회수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_sms"
              :label="item.commentCount"
              tooltip="댓글수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent="toggleLike">
              <PostIcon
                :name="isLike ? 'favorite' : 'sym_o_favorite'"
                :label="likeCount"
                tooltip="좋아요"
              />
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_bookmark"
              :label="item.bookmarkCount"
              tooltip="북마크"
            />
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { formatRelativeTime } from 'src/utils/relative-time-format';
import PostIcon from './PostIcon.vue';
import { addLike, removeLike, hasLike } from 'src/services';
import { useAuthStore } from 'src/stores/auth';
import { storeToRefs } from 'pinia';
import { ref, toRefs, watch } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const { uid, isAuthenticated } = storeToRefs(useAuthStore());
const { id: postId, likeCount: initialCount } = toRefs(props.item);

// 인라인 컴포저블
const useLike = () => {
  // 좋아요 기능
  const isLike = ref(false);
  const likeCount = ref(initialCount.value);

  // 조회
  const initLike = async () => {
    if (isAuthenticated.value === false) {
      isLike.value = false;
      return;
    }
    isLike.value = await hasLike(uid.value, postId.value);
  };

  const toggleLike = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    if (isLike.value) {
      await removeLike(uid.value, postId.value);
      likeCount.value--;
    } else {
      await addLike(uid.value, postId.value);
      likeCount.value++;
    }
    isLike.value = !isLike.value;
  };

  // 로그인 상태 감지
  watch(isAuthenticated, () => initLike(), { immediate: true });

  return {
    isLike,
    likeCount,
    toggleLike,
  };
};

const { isLike, likeCount, toggleLike } = useLike();
</script>

<style lang="scss" scoped></style>
