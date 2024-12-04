import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from 'src/boot/firebase';

// 구글 로그인
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider); // ctrl+마우스오버 : 어떤값 리턴하는지 볼수 있음. promise 반환 : async, await
  return user;
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
  sendVerificationEmail();
}
// 디폴트 포토 URL
export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTOURL}${uid}`;
}

// 이메일 로그인
export async function signInWithEmail({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

// 이메일 인증하기
export async function sendVerificationEmail() {
  await sendEmailVerification(auth.currentUser);
}

// 비밀번호 찾기
export async function sendPasswordReset(email) {
  await sendPasswordResetEmail(auth, email);
}

// 비밀번호 변경하기
export async function updateUserPassword(newPassword) {
  await updatePassword(auth.currentUser, newPassword);
}
