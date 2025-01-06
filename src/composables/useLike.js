import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth';
import { ref, watch } from 'vue';
import { addLike, hasLike, removeLike } from 'src/services';

export const useLike = (id, options) => {
  const { initialCount } = options || {};
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());

  // 좋아요 기능
  const isLike = ref(false);
  const likeCount = ref(initialCount);
  const postId = ref(id);

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
