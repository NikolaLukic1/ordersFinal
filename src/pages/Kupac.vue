<template>
  <q-page class="q-pa-sm">

    <template>
      <q-banner
        class="bg-primary text-white"
        rounded
      >
        <div class="row">

          <q-item class="text-white text-h5">
            PREGLED KUPACA
          </q-item>

          <q-space />
          <div>
          <q-btn
            round
            icon="add"
            class="bg-white text-grey-6"
            size="12px"
            @click="showDialog = true"
          >
          </q-btn>
          </div>
          
          <q-space />

          <q-checkbox
            v-model="showAllPart"
            label="Prikaži neaktivne"
            left-label
            dark
          />
        </div>
      </q-banner>

      <q-list bordered separator>
        <list-partners
          v-for="(part, index) in partnersLocal"
          :key="index"
          :part="part"
          :id="part._id"
        >
        </list-partners>
      </q-list>
    </template>
      
    <q-page-sticky position="bottom-right" :offset="[30, 10]">
      <q-fab color="primary" icon="keyboard_arrow_left" direction="left">
        <q-fab-action color="secondary" icon="mail" />
        <q-fab-action color="secondary" icon="alarm" />
      </q-fab>
    </q-page-sticky>

            
    <q-dialog
      v-model="showDialog"
    >
      <insert-partner />
    </q-dialog>
  </q-page>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'

  export default {
    beforeMount(){
      this.getdbPartners();
    },

    components:{
      'list-partners': require('../components/KupacComponents/listKupac').default,
      'insert-partner': require('components/KupacComponents/Modals/DialogInsert').default,
    },

    methods: {
      ...mapActions('partners', ['getdbPartners', 'setShowAllPartners','setShowDialogInsert']),
      ...mapActions('db', ['getDbPartner']),
    },

    computed: {
      ...mapGetters('partners', ['getPartners']),
      ...mapState('partners', ['showAllPartners', 'showDialogInsert']),

      partnersLocal:{
        get(){
          return this.getPartners;
        }
      },

      showAllPart: {
        get(){
          return this.showAllPartners
        },
        set(value){
          this.setShowAllPartners(value)
        }
      },
      
      showDialog: {
        get(){
          return this.showDialogInsert
        },
        set(value){
          this.setShowDialogInsert(value)
        }
      }
    }
  }
</script>
