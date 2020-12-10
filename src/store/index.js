import Vue from 'vue';
import Vuex from 'vuex'
import client from '@/axios'
import router from '../router'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const stores = {
    state: {
        token: '',
        roles: [],
        user: null,
        users: [],
    },
    getters: {
        isLoggedIn: state => {
            return state.user !== null
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
        }
    },
    mutations: {
        login(state, data){
            state.user = data.user
            state.token = data.access_token
            state.roles = data.roles
            router.push({ name: 'Home' })
        },
        logout(){
            localStorage.clear();
        },
        getUsers(state, data){
            state.users = data
        },
    },
    actions: {
        userLogin({ commit }, payload) {
            client.post('auth',{
                username: payload.username,
                password: payload.password
            }).then(response => {
                if(response.status === 200){
                    commit('login', response.data.data)
                }
            })
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
        }
    },
    plugins: [createPersistedState({
        storage: window.localStorage,
    })],
}

export const store = new Vuex.Store(stores)