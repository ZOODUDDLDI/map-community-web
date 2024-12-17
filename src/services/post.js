import { db } from 'src/boot/firebase'; //firestore instance
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export async function createPost(data) {
  // setDoc 같은경우
  // id 지정 가능, 리턴 : void, , 문서가 없으면 생성, 있으면 덮어 씀 -> { merge: true }일 경우 덮어 쓰기 X.
  // await setDoc(
  //   doc(db, 'posts', 'post-id'),
  //   {
  //     ...data,
  //     readCount: 0,
  //     likeCount: 0,
  //     commentCount: 0,
  //     bookmarkCount: 0,
  //     createAt: serverTimestamp(), //파이어베이스 제공
  //   },
  //   { merge: true },
  // );

  const docRef = await addDoc(collection(db, 'posts'), {
    //데이터 보내기
    ...data,
    readCount: 0,
    likeCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    createAt: serverTimestamp(), //파이어베이스 제공
  });
  return docRef.id;
}
