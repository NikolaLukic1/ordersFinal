import PartnerService from '../../../services/Partner'
import OrderService from '../../../services/Order'
//import { uid, Notify } from 'quasar'
import { Loading } from 'quasar'

const state = {
    importDate: new Date().toJSON().slice(0, 10),
    excelData: { header: null, results: null },
    partnerId: null,
    optionsPartner: [],
}

const mutations = {
    async getdbPartners(state){
        state.optionsPartner = this.state.db.activePartner;
    },

    setInitValues(state){
        state.importDate = new Date().toJSON().slice(0, 10);
        state.excelData = { header: null, results: null };
        state.partnerId = null;
    },

    setImportDate(state, value){
        state.importDate = value;
    },

    setExcelData(state, payload){
        state.excelData = payload;
    },

    setPartnerId(state, id){
        state.partnerId = id;
    },

    setOptionsPartner(state, payload){
        state.optionsPartner = payload;
    },
}

const actions = {
    async getdbPartners({commit, dispatch}){
        Loading.show();
            !this.state.db.activePartner.length ? await dispatch('db/getDbPartner', null, {root: true}) : '';
            commit('getdbPartners');
        Loading.hide();
    },

    setOptionsPartner({commit}, payload){
        commit('setOptionsPartner', payload)
    },

    setInitValues({commit}){
        commit('setInitValues')
    },

    setImportDate({commit}, value){
        commit('setImportDate', value)
    },

    setExcelData({commit}, payload){
        commit('setExcelData', payload)
    },

    setPartnerId({commit}, id){
        commit('setPartnerId', id)
    },

    saveImportData({ dispatch }, payload){
        dispatch('db/saveImportData', payload, {root: true})
    },
}

const getters = {
    importDate(state){
        return state.importDate;
    },

    excelData(state){
        return state.excelData;
    },

    partnerId(state){
        return state.partnerId;
    },

    optionsPartner(state){
        return state.optionsPartner;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}