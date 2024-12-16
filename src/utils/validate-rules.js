// 입력값 체크
const validateRequired = val => !!val || '필수 정보입니다.';
const validateRequired2 = val => !!val || '필수 값입니다.';

// 정규식 체크
const validateEmail = val => {
  const reg =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return reg.test(val) || '이메일 :  이메일 주소가 정확한지 확인해 주세요.';
};

const validatePassword = val => {
  const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return (
    reg.test(val) || '비밀번호: 8자이상의 영문, 숫자, 특수문자를 사용해주세요.'
  );
};

const validatePasswordConfirm = (password, passwordConfirm) =>
  password === passwordConfirm || '비밀번호 확인 : 값이 일치하지 않습니다.';

export {
  validateRequired,
  validateRequired2,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
};
