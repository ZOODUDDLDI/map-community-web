<template>
  <q-page padding>
    <q-card class="q-pa-lg">
      <div class="flex q-mb-md">
        <q-btn
          icon="sym_o_arrow_back"
          flat
          round
          dense
          color="grey"
          size="16px"
        />
        <q-space />
        <q-btn icon="sym_o_favorite" flat round dense color="red" size="16px" />
        <q-btn
          icon="sym_o_bookmark"
          flat
          round
          dense
          color="blue"
          size="16px"
        />
      </div>
      <div class="flex items-center">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
        </q-avatar>
        <div class="q-ml-md">
          <div>쥉</div>
          <div class="text-grey-6">1일전</div>
        </div>
        <q-space />
        <q-btn icon="more_horiz" round flat>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>수정하기</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>삭제하기</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <div class="q-mt-md text-5 text-weight-bold">제목입니다</div>
      <q-separator class="q-my-lg" />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam
        cumque velit minus ad voluptas accusamus reprehenderit numquam error
        vero id omnis, voluptatibus ratione dolorem cum ipsum eius repudiandae
        accusantium! <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam
        cumque velit minus ad voluptas accusamus reprehenderit numquam error
        vero id omnis, voluptatibus ratione dolorem cum ipsum eius repudiandae
        accusantium! <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet magnam
        cumque velit minus ad voluptas accusamus reprehenderit numquam error
        vero id omnis, voluptatibus ratione dolorem cum ipsum eius repudiandae
        accusantium!
      </div>
    </q-card>
  </q-page>
</template>

<script setup></script>

<style lang="scss" scoped></style>

<!-- 컨테이너 크기를 임의로 줄임. -->
<route lang="yaml">
meta:
  width: 800px
</route>
