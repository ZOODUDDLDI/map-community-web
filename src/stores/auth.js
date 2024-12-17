import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core'; //VueUse 사용 !

export const useAuthStore = defineStore('auth', () => {
  // const user = ref(null);

  const user = useLocalStorage('auth/user', null, {
    serializer: StorageSerializers.object,
  }); // 1.키, 2.초기 값 3.옵션

  const isAuthenticated = computed(() => !!user.value); //로그인 상태

  // uid
  const uid = computed(() => user.value?.uid || null);

  const setUser = userData => {
    //파이어베이스로 유저 데이터를 받는다.
    // console.log('유저 데이터: ', userData);

    user.value = userData;

    // 만약 유저 데이터가 있다면
    if (userData) {
      user.value = {
        uid: userData.uid,
        photoURL: userData.photoURL,
        displayName: userData.displayName,
        email: userData.email,
        //이메일 인증
        emailVerified: userData.emailVerified,
      };
    } else {
      //유저 데이타가 없다면,
      user.value = null;
    }
  };
  return {
    user,
    uid,
    setUser,
    isAuthenticated,
  };
});
