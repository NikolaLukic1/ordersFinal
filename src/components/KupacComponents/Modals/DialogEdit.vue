<template>
    <q-card style="min-width: 300px">

        <modal-dialog-title>Ažuriranje kupca</modal-dialog-title>

        <form @submit.prevent="submitForm">
            <q-card-section>
                <modal-dialog-id :id="partnerModal.localId"></modal-dialog-id>
                <modal-dialog-name :name.sync="partnerModal.name"></modal-dialog-name>
                <modal-dialog-checkbox :isActive.sync="partnerModal.active"></modal-dialog-checkbox>
            </q-card-section>

            <q-card-actions align="right" class="bg-primary text-primary">
                <q-btn label="Odustani" class="bg-white" v-close-popup />
                <q-space />
                <q-btn label="Izmeni" class="bg-white" @click="updatePart()" v-close-popup />
            </q-card-actions>
        </form>

    </q-card>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        
        props:['part', 'id'],

        data(){
            return{
                partnerModal: {
                    localId: null,
                    name: null, 
                    active: null
                }
            }
        },

        components:{
            'modal-dialog-title': require('components/KupacComponents/Modals/Shared/DialogHeader').default,
            'modal-dialog-id': require('components/KupacComponents/Modals/Shared/DialogId').default,
            'modal-dialog-name': require('components/KupacComponents/Modals/Shared/DialogName').default,
            'modal-dialog-checkbox': require('components/KupacComponents/Modals/Shared/DialogCheckbox').default,
        },
        
        methods:{
            ...mapActions('partners', ['updatePartner']),

            submitForm(){
                this.updatePart();
            },

            updatePart(){
                this.updatePartner({id: this.id, updates: this.partnerModal});
                this.$emit('close');
            },
        },

        mounted(){
            this.partnerModal = Object.assign({}, this.part)
        }
    }
</script>