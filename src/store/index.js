import Vue from 'vue'
import Vuex from 'vuex'

import db from './module-example/store-db'
import partners from './module-example/store-kupci'
import order from './module-example/store-import-order'
import viewOrderStore from './module-example/store-view-order'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      db,
      partners,
      order,
      viewOrderStore,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
