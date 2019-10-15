<template>
  <q-page class="flex flex-center">
  </q-page>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    methods:{
      ...mapActions('db', ['getDbData'])
    },
    mounted(){
      this.getDbData();
    }
  }
</script>
