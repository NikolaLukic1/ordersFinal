import PartnerService from '../../../services/Partner'
import OrderService from '../../../services/Order'
import { Loading, Notify } from 'quasar';

const state = {
    partner: [],
    activePartner:[],
    order: [],
};

const mutations = {
    partner(state, partners){
        state.partner = partners;
        state.activePartner = partners.filter(partner => partner.active == true);
    },
    
    order(state, orders){
        state.order = orders;
    }

};

const actions = {
    /*GET DB DATA ************************************************************* */
    async getDbPartner({ commit }){
        commit('partner', await PartnerService.getPartners());
    },

    async getDbOrder({ commit }){
        commit('order', await OrderService.getOrders());
    },

    async getDbData({ dispatch }){
        Loading.show();
            await dispatch('getDbPartner');
            await dispatch('getDbOrder');
        Loading.hide();
    }, 
    
    /*UPDATE DB DATA ************************************************************* */
    async updatePartner({ dispatch }, payload){
        await PartnerService.updatePartner(payload);
        await dispatch('getDbPartner');
    },
    
    /*INSERT DB DATA ************************************************************* */
    async insertPartner({ dispatch }, payload){
        await PartnerService.insertPartner(payload);
        await dispatch('getDbPartner');
    },

    async saveImportData({commit}, payload){
        await OrderService.insertOrder(payload);
    },
    
    /*DELETE DB DATA ************************************************************* */
    async deleteOrderStore({commit}, id){
        await OrderService.deleteOrder(id);
        const msg = 'Uspešno je obrisan order';
        await ('getDbOrder');
        Notify.create(msg);
    }

};

const getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
