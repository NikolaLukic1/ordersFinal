<template>
    <q-card style="min-width: 300px">

        <modal-dialog-title>Unos kupca</modal-dialog-title>

        <form @submit.prevent="submitForm">
            <q-card-section>
                <modal-dialog-id
                    v-if="partnerModal.localId"
                    :id="id"
                ></modal-dialog-id>
                <modal-dialog-name :name.sync="partnerModal.name"></modal-dialog-name>
                <modal-dialog-checkbox :isActive.sync="partnerModal.active"></modal-dialog-checkbox>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right" class="bg-primary text-primary">
                <q-btn label="Odustani" class="bg-white" v-close-popup />
                <q-space />
                <q-btn label="Unesi" class="bg-white" type="submit" v-close-popup />
            </q-card-actions>
        </form>

    </q-card>
</template>

<script>
    import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'

    export default {

        data(){
            return{
                id:null,
                partnerModal: {
                    localId: null,
                    name: null, 
                    active: true
                }
            }
        },

        computed:{
            ...mapGetters('partners', ['getPartners']),
            ...mapState('partners', ['partners']),
        },

        components:{
            'modal-dialog-title': require('components/KupacComponents/Modals/Shared/DialogHeader').default,
            'modal-dialog-id': require('components/KupacComponents/Modals/Shared/DialogId').default,
            'modal-dialog-name': require('components/KupacComponents/Modals/Shared/DialogName').default,
            'modal-dialog-checkbox': require('components/KupacComponents/Modals/Shared/DialogCheckbox').default,
        },
        
        methods:{
            ...mapActions('partners', ['insertPartner', 'setDbInProgress', 'setShowDialogInsert']),

            submitForm(){
                this.$q.loading.show();
                this.insertPart();
            },

            insertPart(){
                let partnersCount = Object.keys(this.partners).length + 1;
                let newLocalId = '000000' + partnersCount.toString();
                newLocalId = newLocalId.slice(partnersCount.toString().length)

                this.partnerModal.localId = newLocalId;

                this.insertPartner(this.partnerModal)
            }
        },
    }
</script>