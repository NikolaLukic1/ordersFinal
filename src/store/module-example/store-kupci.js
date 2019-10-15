import { Loading } from 'quasar'

const state = {
    showAllPartners: false,
    partners: [],
    activePartners: [],
    showDialogInsert: false,
}

const mutations = {
    getdbPartners(state){
        state.partners = this.state.db.partner;
        state.activePartners = this.state.db.activePartner;
    },

    setShowAllPartners(state, value){
        state.showAllPartners = value;
    },

    setShowDialogInsert(state, value){
        state.showDialogInsert = value;
    }
}

const actions = {
    async getdbPartners({commit, dispatch}){
        Loading.show();
            !this.state.db.activePartner.lenght ? await dispatch('db/getDbPartner', null, {root: true}) : '';
            await commit('getdbPartners');
        Loading.hide();
    },

    async insertPartner({ dispatch }, payload){
        Loading.show();
            await dispatch('db/insertPartner', payload, {root: true});
            await dispatch('getdbPartners');
        Loading.hide();
    },

    async updatePartner({ dispatch }, payload){
        Loading.show();
            await dispatch('db/updatePartner', payload, {root: true});
            await dispatch('getdbPartners');
        Loading.hide();
    },

    setShowDialogInsert({commit}, value){
        commit('setShowDialogInsert', value)
    },

    setShowAllPartners({commit}, value){
        commit('setShowAllPartners', value);
    },
}

const getters = {

    partnersFiltered: (state) => {
        if (!state.showAllPartners) {
            return state.activePartners
        }

        return state.partners;
    },

    getPartners: (state, getters) => {
        let partnersFiltered = getters.partnersFiltered
        return partnersFiltered;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}