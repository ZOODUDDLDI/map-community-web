<template>
  <div class="q-gutter-y-md">
    <BaseCard>
      <q-form @submit.prevent="handleSubmitProfile">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">프로필 변경</div>
          <q-input v-model="displayName" outlined dense label="닉네임" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn type="submit" label="저장하기" flat color="primary" />
        </q-card-actions>
      </q-form>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from 'src/components/base/BaseCard.vue';
import { useQuasar } from 'quasar';
import { ref, watchEffect } from 'vue';
import { updateUserProfile } from 'src/services';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

const $q = useQuasar();

const displayName = ref('');
const handleSubmitProfile = async () => {
  await updateUserProfile(displayName.value);
  $q.notify('프로필 변경완료');
};

watchEffect(() => {
  displayName.value = authStore.user?.displayName;
});
</script>

<style lang="scss" scoped></style>
