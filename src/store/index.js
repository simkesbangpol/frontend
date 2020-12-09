import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const base_url = "http://127.0.0.1:8000/";

const getDefaultState = () => {
    return {
        token: '',
        permissions: [],
        user: null
    }
}

const stores = {
    state: getDefaultState(),
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
    },
    mutations: {
        login(state, payload){
            axios.post(base_url+'auth',{
                username: payload.username,
                password: payload.password
            }).then(response => {
                if(response.status === 200){
                    state.user = response.data.user
                    state.token = response.data.access_token
                    state.permissions = response.data.permissions
                }
            })
        },
        logout(state){
            state.user = null
            state.token = ''
            state.permissions = []
        }
    },
    actions: {
        userLogin({ commit }, payload) {
            commit('login', payload)
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })]
}

export const store = new Vuex.Store(stores)