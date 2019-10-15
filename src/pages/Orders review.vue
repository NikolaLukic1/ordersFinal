<template>
    <q-page class="q-pa-sm">

        <q-banner
            class="bg-primary text-white"
            rounded
        >
            <div class="row">

                <q-item class="text-white text-h5">
                    PREGLED PORUDŽBINA
                </q-item>

            </div>
        </q-banner>

        <q-list bordered separator class="rounded-borders">
            <q-expansion-item
                class="bg-grey-3 text-subtitle1"
                v-for="item in listDataLocal"
                :key="item.partData._id"
                icon="account_box"
                :label="item.partData.name"
                :caption="item.partData.localId"
                expand-separator
                group="group1"
            >
                <q-expansion-item
                    dense
                    class="bg-white"
                    v-for="order in item.orders"
                    :key="order._id"
                    expand-separator
                    group="group2"
                    popup
                >
                    <template slot="header">
                        <q-item style="margin: 0px; padding: 0px;">
                            <q-item-section>
                                <div class="row">
                                    <q-item-label>
                                        <span class="text-subtitle2">
                                            Porudžbina na dan {{ order.date }}
                                        </span>
                                    </q-item-label>
                                </div>
                            </q-item-section>
                        </q-item>

                        <q-space />

                        <q-item 
                            style="margin: 0 50px 0 0; padding: 0px;"
                        >
                            <q-item-section>
                                <q-btn
                                    flat
                                    round
                                    icon="delete"
                                    color="red"
                                    @click.stop="callDeleteOrder(order._id)"
                                />
                            </q-item-section>
                        </q-item>
                        
                        <q-dialog
                            v-model="dialogDeleteObj.showDelete"
                        >
                            <dialog-delete
                                :msg="dialogDeleteObj.msg"
                                :deleteId="dialogDeleteObj.idToDelete"
                                @dialog-delete="deleteOrder"
                            >
                                {{ dialogDeleteObj.title }}
                            </dialog-delete>
                        </q-dialog>
                    </template>

                    <q-table
                        dense
                        :data="order.data"
                        :columns="columns"
                        :pagination.sync="pagination"
                        :visible-columns="tblVisColImport"
                        row-key="product"
                    >
                    </q-table>
                </q-expansion-item>

            </q-expansion-item>
        </q-list>
    </q-page>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex'

    export default {
        data(){
            return{
                dialogDeleteObj:{
                    showDelete: false,
                    title: 'Brisanje porudžbine',
                    msg: 'Da li ste sigurni da želite da obrišete porudžbinu?',
                    idToDelete: null
                }
            }
        },

        beforeMount(){
            this.getInitData();
        },

        components:{
            'dialog-delete': require('../components/AppDialogs/DialogDelete').default,
        },

        computed:{
            ...mapState('viewOrderStore', [ 'tblColumns', 'tblPagination', 'tblVisColImport']),
            ...mapGetters('viewOrderStore', [ 'listData' ]),

            listDataLocal:{
                get(){
                    return this.listData;
                }
            },

            pagination:{
                get(){
                    return this.tblPagination
                },
                set(value){
                    this.setTblPagination(value)
                }
            },

            columns:{
                get(){
                    return this.tblColumns
                },
                set(value){
                    this.setTblColumns(value)
                }
            }
        },

        methods:{
            ...mapActions('viewOrderStore', [ 'getInitData', 'setTblPagination', 'setTblColumns', 'deleteOrderStore' ]),

            callDeleteOrder(id){
                this.dialogDeleteObj.idToDelete = id
                this.dialogDeleteObj.showDelete = true;
            },

            deleteOrder(e){
                if (e.answer) {
                    this.deleteOrderStore(e.id)
                    this.getInitData()
                }
                else{
                    //console.log('Do not delete order');
                }
            },
        }
    }
</script>