import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/boot/firebase';
import { v4 as uuidv4 } from 'uuid'; // 고유한 파일명을 위한 uuid
import { readAndCompressImage } from 'browser-image-resizer'; // 파일 압축

// 이미지 업로드, 다운로드
export async function uploadImage(file) {
  const filename = `images/${uuidv4()}.${getExtension(file.name)}`;
  const storageRef = ref(storage, filename);
  const thumbnail = await compressImage(file);
  const uploadResult = await uploadBytes(storageRef, thumbnail);
  const downloadURL = await getDownloadURL(uploadResult.ref);
  return downloadURL;
}
// 뒤에 확장자 가져오기
function getExtension(filename) {
  return filename.split('.').pop();
}
// 이미지 압축
async function compressImage(file) {
  return readAndCompressImage(file, {
    quality: 0.8,
  });
}
