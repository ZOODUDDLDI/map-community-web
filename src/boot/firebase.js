import { boot } from 'quasar/wrappers';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from 'src/stores/auth';

const firebaseConfig = {
  apiKey: process.env.VUE_API_KEY,
  authDomain: 'map-community-web.firebaseapp.com',
  projectId: 'map-community-web',
  storageBucket: 'map-community-web.firebasestorage.app',
  messagingSenderId: process.env.VUE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID,
  measurementId: process.env.VUE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // firebase : auth 추가

export { auth }; // 외부 사용

export default boot(async (/* { app, router, ... } */) => {
  const authStore = useAuthStore();

  // 파이어베이스 Auth 관찰자
  onAuthStateChanged(auth, user => {
    console.log('# 유저 : ', user);
    authStore.setUser(user); // user상태에 저장
  });
});
