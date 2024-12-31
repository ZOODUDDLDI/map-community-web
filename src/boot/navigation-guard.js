import { storeToRefs } from 'pinia';
import { boot } from 'quasar/wrappers';

import { useAuthStore } from 'src/stores/auth';

function requireAuth(to) {
  const { isAuthenticated } = storeToRefs(useAuthStore());
  console.log('isAuthenticated:', isAuthenticated.value); // 상태 로그
  if (
    to.matched.some(record => record.meta.requireAuth) &&
    !isAuthenticated.value
  ) {
    alert('로그인이 필요한 페이지 입니다.');
    return '/';
  }
  return true;
}

export default boot(async ({ app, router }) => {
  router.beforeEach(requireAuth);
});
