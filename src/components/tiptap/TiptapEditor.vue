<template>
  <q-card class="tiptap" flat bordered>
    <TiptapEditorMenu :editor="editor" />

    <q-separator />

    <editor-content class="editor__content" :editor="editor" />
  </q-card>
</template>

<script setup>
import { watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder'; // placeholder 설치
import TiptapEditorMenu from './TiptapEditorMenu.vue';
import Link from '@tiptap/extension-link';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: '마크다운을 이용해서 편리하게 글을 작성하시오.',
    }),
    Link,
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value.getHTML());
  },
});

// 감지
watch(
  () => props.modelValue,
  value => {
    const isSame = editor.value.getHTML() === value;
    if (isSame) {
      return;
    }
    editor.value.commands.setContent(value, false);
  },
);
</script>

<style lang="scss" src="src/css/tiptap.scss"></style>

<!-- placeholder 스타일 적용 -->
<style lang="scss">
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
