<template>
  <aside>
    <q-btn
      padding="8px 12px 8px 8px"
      unelevated
      color="primary"
      text-color="white"
      class="full-width"
    >
      <q-avatar class="q-mr-sm" color="white" text-color="primary" size="22px">
        <q-icon name="edit" size="14px" />
      </q-avatar>
      <span class="text-weight-bold">새 포스트 작성하기</span>
    </q-btn>
    <q-card class="q-mt-md bg-grey-1" bordered flat>
      <q-card-section class="flex items-center">
        <q-icon
          name="map"
          dense
          size="20px"
          flat
          round
          color="primary"
          class="q-mr-sm"
        />
        <div class="text-weight-bold">위치 태그</div>
        <q-space />
        <q-btn icon="refresh" dense size="m" flat round color="grey" />
      </q-card-section>

      <!-- TODO: 지도 ! -->
      <q-card-scrion class="q-pb-sm">
        <q-card class="q-px-sm" bordered flat square>
          <q-item class="q-gutter-sm q-pb-sm" size="150px">map</q-item>
        </q-card>
      </q-card-scrion>

      <q-card-section class="q-pb-sm">
        <q-card class="q-px-sm" bordered flat square>
          <q-input
            borderless
            dense
            input-style="font-size 12px;"
            placeholder="검색해보세요."
          />
          <div class="q-gutter-sm q-pb-sm">
            <q-btn
              size="10px"
              padding="2px 4px 2px 7px"
              color="grey-3"
              text-color="dark"
              unelevated
            >
              칠암동
              <q-icon name="clear" size="12px" color="grey" />
            </q-btn>
            <q-btn
              size="10px"
              padding="2px 4px 2px 7px"
              color="grey-3"
              text-color="dark"
              unelevated
            >
              주약동
              <q-icon name="clear" size="12px" color="grey" />
            </q-btn>
            <q-btn
              size="10px"
              padding="2px 4px 2px 7px"
              color="grey-3"
              text-color="dark"
              unelevated
            >
              망경동
              <q-icon name="clear" size="12px" color="grey" />
            </q-btn>
          </div>
        </q-card>
      </q-card-section>
      <q-list padding>
        <q-item v-for="tag in tags" :key="tag.name" clickable dense>
          <q-item-section class="text-teal text-caption">
            # {{ tag.name }}
          </q-item-section>
          <q-item-section side class="text-teal text-caption">
            {{ tag.count }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
//임시 데이터
const tags = ref([
  { name: '칠암동', count: 5 },
  { name: '주약동', count: 7 },
  { name: '망경동', count: 9 },
]);
</script>

<style lang="scss" scoped></style>
