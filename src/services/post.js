import { db } from 'src/boot/firebase'; //firestore instance
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export async function createPost(data) {
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
