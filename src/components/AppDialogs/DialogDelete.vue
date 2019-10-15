<template>
    <q-card style="min-width: 300px">
        <q-card-section class="bg-primary text-center">
            <div class="text-white text-h6"> <slot /> </div>
        </q-card-section>

        <q-card-section class="q-mt-lg">
                <span> {{ msg }} </span>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn color="primary" label="Ne" v-close-popup @click="dialogAnswer(false)" />
            <q-space />
            <q-btn color="negative" label="Da" v-close-popup @click="dialogAnswer(true)" />
        </q-card-actions>
    </q-card>
</template>

<script>
    export default {
        props:[ 'msg', 'deleteId' ],

        methods:{
            dialogAnswer(answer){
                let fullAnswer = {answer: answer, id: this.deleteId}
                this.$emit('dialog-delete', fullAnswer)
            },
        }
        
    }
</script>