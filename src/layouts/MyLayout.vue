<template>
  <q-layout view="hHh Lpr lFf">

    <q-header elevated>

      <q-toolbar>
        <q-toolbar-title class="text-h4">
          ORDERS CONTROL
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    
    <q-footer elevated>
      <q-tabs
        class="text-white"
      >
        <q-route-tab
          v-for="menu in mainMenu"
          :key="menu.id"
          :icon="menu.icon"
          :label="menu.label"
          :to="menu.to"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :breakpoint="768"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <q-item
          v-for="menu in mainMenu"
          :key="menu.id"
          :to="menu.to"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="menu.icon" class="q-ma-sm"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ menu.label }}</q-item-label>
            <q-item-label caption>{{ menu.caption }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false,
      mainMenu:[
        { id:1, label:"Dobrodošli", caption:"Uputstvo za korišćenje aplikacije", icon:"home", to:"/"},
        { id:2, label:"Kupac", caption:"Unos i ažuriranje kupaca", icon:"view_list", to:"/kupac"},
        { id:3, label:"Import", caption:"Import porudžbina kupaca", icon:"import_export", to:"/importOrder"},
        { id:4, label:"Porudžbine", caption:"pregled porudžbina", icon:"list", to:"/viewOrder"},
      ]
    }
  }
}
</script>

<style>
  @media screen and (min-width: 769px){
    .q-footer {
      display: none;
    }
  }
</style>