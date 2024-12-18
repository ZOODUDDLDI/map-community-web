export const useTag = options => {
  const { tags, updateTags, maxLengthMessage } = options || {};

  // 태그 추가 기능
  const onRegistTag = e => {
    const tagValue = e.target.value.replace(/ /g, '');
    if (!tagValue) {
      return;
    }
    if (tags.value.length >= 5) {
      $q.notify(maxLengthMessage);
      return;
    }
    if (tags.value.includes(tagValue) === false) {
      // emit('update:tags', [...props.tags, tagValue]);
      updateTags([...tags.value, tagValue]);
    }
    e.target.value = ''; //빈값으로 초기화
  };
  // 태그 삭제 기능
  const removeTag = index => {
    const model = [...tags.value];
    model.splice(index, 1);
    // emit('update:tags', model);
    updateTags(model);
  };
  return {
    onRegistTag,
    removeTag,
  };
};
