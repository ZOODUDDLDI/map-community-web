import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from 'src/boot/firebase';

// 구글 로그인
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider); // ctrl+마우스오버 : 어떤값 리턴하는지 볼수 있음. promise 반환 : async, await
  console.log('유저 : ', result.user);
}

// 구글 로그아웃
export async function logout() {
  await signOut(auth);
}
