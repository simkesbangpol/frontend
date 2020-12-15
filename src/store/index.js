import Vue from 'vue';
import Vuex from 'vuex'
import client from '@/axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const getDefaultState = function() {
    return {
        token: '',
        roles: [],
        user: null,
        users: [],
        report_categories: [],
        villages: [],
        districts: [],
        isLoading: false,
    }
}

const stores = {
    state: getDefaultState(),
    getters: {
        isLoggedIn: state => {
            return state.token !== ''
        },
        getUserToken: state => {
            return state.token
        },

        getUser: state => {
            return state.user
        },

        getUserPermissions: state => {
            return state.permissions
        },

        getUsers: state => {
            return state.users
        },

        getReportCategories: state => {
            return state.report_categories
        },

        getVillages: state => {
            return state.villages
        },
        
        getRoles: state => {
            return state.roles
        },
        
        getLoadings: state => {
            return state.isLoading
        },

        getDistricts: state => {
            return state.districts
        }
    },
    mutations: {
        login(state, data){
            state.user = data.user
            state.token = data.access_token
            state.roles = data.roles
        },
        logout(state){
            localStorage.clear();
            state.token = '';
        },
        getUsers(state, data){
            state.users = data
        },

        getReportCategories (state, data) {
            state.report_categories = data
        },

        getVillages(state, data) {
            state.villages = data
        },

        getDistricts(state, data) {
            state.districts = data
        },

        setLoading(state, data) {
            state.isLoading = data
        },
    },
    actions: {
        userLogin({ commit }, payload) {
            commit('login', payload.response.data.data)
        },
        userLogout({ commit }) {
            commit('logout')
        },
        fetchUsers({ commit }) {
            client.get('users').then(response => {
                if(response.status === 200){
                    commit('getUsers', response.data.data)
                }
            })
        },
        fetchReportCategories({ commit }) {
            client.get('report_categories').then(response => {
                if(response.status === 200){
                    commit('getReportCategories', response.data.data.data)
                }
            })
        },

        fetchVillages({ commit }, payload){
            client.get(`districts/${payload.district_id}/villages`).then(response => {
                if(response.status === 200){
                    commit('getVillages', response.data.data)
                }
            })
        },

        fetchDistricts({ commit }){
            client.get(`districts`).then(response => {
                if(response.status === 200){
                    commit('getDistricts', response.data.data.data)
                }
            })
        },

        setLoadings({ commit }, payload){
            commit('setLoading', payload.isLoading)
        }
    },
    plugins: [createPersistedState({
        storage: window.localStorage,
    })],
}

export const store = new Vuex.Store(stores)