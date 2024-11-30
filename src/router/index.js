import { route } from 'quasar/wrappers';
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router/auto'; // 자동 라우터 설정 : /auto 추가
import { setupLayouts } from 'virtual:generated-layouts'; // 레이아웃 설정 추가

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    // routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),

    //레이아웃 설정 추가
    extendRoutes: routes => {
      return setupLayouts(
        routes.map(route => {
          if (route.path.includes('admin')) {
            route = {
              ...route,
              meta: {
                ...route.meta,
                layout: 'admin',
              },
            };
          }
          return route;
        }),
      );
    },
  });

  return Router;
});
