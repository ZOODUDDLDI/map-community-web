import { db } from 'src/boot/firebase'; //firestore instance
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

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

// 리스트 목록을 가져오는
export async function getPosts(params) {
  console.log('### pasrams : ', params);
  // 1. 컬렉션에 있는 모든 문서 조회
  // const querySnapshot = await getDocs(collection(db, 'posts'));
  // const posts = querySnapshot.docs.map(docs => {
  //   const data = docs.data();
  //   return {
  //     ...data,
  //     id: docs.id,
  //     createdAt: data.createAt?.toDate(),
  //   };
  // });
  // console.log('글 목록 : ', posts);

  // 1. 컬렉션에 있는 문서를 쿼리해서 조회
  const conditions = []; // [where('category', '==', params?.category)]
  if (params?.category) {
    conditions.push(where('category', '==', params?.category));
  }
  const q = query(collection(db, 'posts'), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(docs => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createAt?.toDate(),
    };
  });
  return posts;
}
