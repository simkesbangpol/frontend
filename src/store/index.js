import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
// eslint-disable-next-line no-unused-vars
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const base_url = "http://localhost:8000/";

const stores = {
    state: {
        token: '',
        roles: [],
        user: null
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
        }
    },
    actions: {
        userLogin({ commit }, payload) {
            axios.post(base_url+'auth',{
                username: payload.username,
                password: payload.password
            }).then(response => {
                if(response.status === 200){
                    commit('login', response.data.data)
                }
            })
        }
    },
    plugins: [createPersistedState({
        storage: window.localStorage,
    })],
}

export const store = new Vuex.Store(stores)