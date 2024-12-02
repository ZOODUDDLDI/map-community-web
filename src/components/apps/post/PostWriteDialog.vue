<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card :style="{ width: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>
      <q-separator />
      <q-form>
        <q-card-section class="q-gutter-y-sm">
          <q-input v-model="form.title" outlined placeholder="제목" />
          <q-select v-model="form.category" outlined :options="categories">
            <template v-if="!form.category" #selected>
              <span class="text-grey-7">카테고리를 선택하세요.</span>
            </template>
          </q-select>
          <q-input
            v-model="form.content"
            type="textarea"
            outlined
            placeholder="내용을 작성해주세요"
            counter
          />
          <q-input
            v-model="tagField"
            outlined
            placeholder="태그를 입력해주세요. (입력후, Enter)"
            prefix="#"
          />
          <q-chip outline dense color="teal" removable @remove="removeTag"
            >카페</q-chip
          >
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="취소하기" v-close-popup />
          <q-btn type="submit" flat label="저장하기" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: [],
});
</script>

<script setup>
import { ref } from 'vue';
import { getCategories } from 'src/services/category';

// 셀렉트용 카테고리
const categories = getCategories();

// 폼
const form = ref(getInitialForm());
const tagField = ref('');

const removeTag = () => {
  console.log('removeTag');
};

// 다이얼로그 닫히면 초기화 시키기
const onHide = () => {
  form.value = getInitialForm();
  tagField.value = '';
};
</script>

<style lang="scss" scoped></style>
