// 파라미터 연동

import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const usePostQuery = () => {
  const route = useRoute();

  const router = useRouter();

  // 1. 카테고리
  const category = computed({
    // 가져오기
    get: () => route.query.category || '',
    // 세팅하기
    set: val =>
      router.push({
        query: {
          ...route.query,
          category: val || undefined,
        },
      }),
  });

  // 2. 정렬
  const sort = computed({
    get: () => route.query.sort || 'createAt',
    set: val => router.push({ query: { ...route.query, sort: val } }),
  });

  // 3. 태그
  const tags = computed({
    get: () => route.query.tags?.split(',') || [],
    set: val =>
      router.push({
        query: {
          ...route.query,
          tags: val.length === 0 ? undefined : val.join(','),
        },
      }),
  });

  return { category, sort, tags };
};
