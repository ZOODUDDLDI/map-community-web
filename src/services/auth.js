import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
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

const DEFAULT_PHOTOURL = 'https://api.dicebear.com/9.x/thumbs/svg?seed=';

// 이메일 가입
export async function signUpWithEamil({ email, password, nickname }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: nickname,
    photoURL: generateDefaultPhotoURL(user.uid),
  });
  console.log('유저 : ', user);
}

export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTOURL}${uid}`;
}
