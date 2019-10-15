import { Loading } from 'quasar'

const state = {
    partnerData:[],
    orderData:[],
    listData:[],

    ///Table properties
    tblColumns:[
        {
            name: 'product',
            required: true,
            label: 'Product',
            align: 'left',
            field: row => row.product,
            format: val => `${val}`,
            sortable: true
        },
        { name: 'code', align: 'center', label: 'Code', field: 'code', sortable: true },
        { name: 'total', align: 'center', label: 'Total qty', field: 'total', sortable: true }
    ],
    tblPagination: {
        //sortBy: 'code',
        //descending: false,
        rowsPerPage: 10
    },
    tblVisColImport: [ "code", "Product", "total"],
};

const mutations = {
    getPartners(state, partners){
        state.partnerData = partners;
    },
    
    getOrders(state, orders){
        state.orderData = orders;
    },
    
    setTblPagination(state, value){
        state.tblPagination = value;
    },

    setTblColumns(state, settings){
        state.tblColumns = settings;
    }
    
};

const actions = {
    async getInitData({ commit, dispatch }){
        Loading.show();
            await dispatch('db/getDbData', null, {root: true})
            await commit('getPartners', this.state.db.partner);
            await commit('getOrders', this.state.db.order);
        Loading.hide();
    },

    setTblPagination({commit}, value){
        commit('setTblPagination', value);
    },

    setTblColumns({commit}, settings){
        commit('setTblColumns', settings);
    },

    async deleteOrderStore({dispatch}, id){
        dispatch('db/deleteOrderStore', id, {root: true})
    },
    
};

const getters = {

    listData: (state) => {
        let listData = [];
        let partnerOrders = [];

        state.partnerData.forEach(partner => {
            partnerOrders = state.orderData.filter(order => order.partnerId == partner._id);
            
            if (partnerOrders.length) {
                listData.push( { partData: partner, orders: partnerOrders } );
            }
        });
        
        return listData;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};