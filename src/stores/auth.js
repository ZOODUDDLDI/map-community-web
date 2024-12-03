import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value); //로그인 상태

  const setUser = userData => {
    //파이어베이스로 유저 데이터를 받는다.
    console.log('유저 데이터: ', userData);
    user.value = userData;

    // 만약 유저 데이터가 있다면
    if (userData) {
      user.value = {
        uid: userData.uid,
        photoURL: userData.photoURL,
        displayName: userData.displayName,
        email: userData.email,
      };
    } else {
      //유저 데이타가 없다면,
      user.value = null;
    }
  };
  return {
    user,
    setUser,
    isAuthenticated,
  };
});
