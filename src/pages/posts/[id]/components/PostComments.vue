<template>
  <div>
    <div class="text-subtitle text-weight-bold q-mb-lg">댓글 6</div>

    <div v-if="isActive">
      <q-input type="textarea" class="bg-whithe" outlined></q-input>
      <div class="flex justify-end q-gutter-x-sm q-mt-sm">
        <q-btn label="취소" color="dark" unelevated @click="toggleActive" />
        <q-btn label="등록" color="primary" unelevated />
      </div>
    </div>

    <q-card v-if="!isActive" @click="toggleActive" class="cursor-pointer">
      <q-card-section class="flex items-center">
        <q-avatar>
          <img src="/juyeong.png" alt="" />
        </q-avatar>
        <div class="text-grey-6 q-ml-md">댓글을 작성해보세요.</div>
      </q-card-section>
    </q-card>

    <q-list class="q-mt-lg bg-whithe" bordered separator>
      <q-item>
        <q-item-section side top>
          <q-avatar size="md">
            <img src="/juyeong.png" alt="" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="flex text-caption">
            <span>쥉</span>
            <span class="q-mx-xs">&middot;</span>
            <span class="text-grey-6">1일전</span>
          </div>
          <div class="q-mt-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            vero adipisci placeat suscipit quis voluptate! Totam alias neque
            repellendus eligendi aperiam, provident quos necessitatibus quia
            dolorum quisquam fugiat ea magnam.
          </div>
        </q-item-section>
        <q-item-section side top>
          <q-btn flat color="grey" icon="sym_o_delete" round dense></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isActive = ref(false);
const toggleActive = () => (isActive.value = !isActive.value);
</script>

<style lang="scss" scoped></style>
