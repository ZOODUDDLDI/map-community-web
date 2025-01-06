import { db } from 'src/boot/firebase'; //firestore instance
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  updateDoc,
  deleteDoc,
  startAfter,
  limit,
  setDoc,
} from 'firebase/firestore';

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

// 리스트 목록을 가져오기
export async function getPosts(params) {
  console.log('### pasrams : ', params); // 필터

  const conditions = []; // [where('category', '==', params?.category)]
  if (params?.category) {
    conditions.push(where('category', '==', params?.category));
  }

  // 태그
  if (params?.tags && params?.tags.length > 0) {
    conditions.push(where('tags', 'array-contains-any', params?.tags));
  }

  if (params?.sort) {
    conditions.push(orderBy(params.sort, 'desc'));
  }

  // 더보기 기능
  if (params?.start) {
    conditions.push(startAfter(params.start));
  }
  if (params?.limit) {
    conditions.push(limit(params.limit));
  }

  const q = query(collection(db, 'posts'), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(docs => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createAt: data.createAt?.toDate(),
    };
  });
  const latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return {
    items: posts,
    lastItem: latestDoc,
  };
}

// 상세페이지 데이터 불러오기
export async function getPost(id) {
  const docSnap = await getDoc(doc(db, 'posts', id));

  if (!docSnap.exists()) {
    throw new Error('No such document!');
  }
  const data = docSnap.data();

  return {
    ...data,
    createAt: data.createAt.toDate(),
  };
}

// 게시물 수정
export async function updatePost(id, data) {
  await updateDoc(doc(db, 'posts', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// 게시물 삭제
export async function deletePost(id) {
  await deleteDoc(doc(db, 'posts', id));
}

// 1. 게시글 좋아요
export async function addLike(uid, postId) {
  await setDoc(doc(db, 'post_likes', `${uid}_${postId}`), {
    uid,
    postId,
    createdAt: serverTimestamp(),
  });
}
// 2. 게시글 좋아요 취소
export async function removeLike(uid, postId) {
  await deleteDoc(doc(db, 'post_likes', `${uid}_${postId}`));
}
// 3. 게시글 좋아요 조회
export async function hasLike(uid, postId) {
  const docSnap = await getDoc(doc(db, 'post_likes', `${uid}_${postId}`));
  return docSnap.exists();
}
