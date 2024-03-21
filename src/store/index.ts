import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state() {
    return {
      userInfo: null,
    };
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
  actions: {
    // 사용자 정보를 가져오는 API를 호출합니다.
    fetchUserInfo({ commit }) {
      axios
        .get('http://localhost:8080/api/v1/user/info', {
          withCredentials: true,
        })
        .then((response) => {
          commit('setUserInfo', response.data.data);
          console.log('사용자 정보를 가져왔습니다.', response.data.data);
        })
        .catch((error) => {
          console.error('사용자 정보를 가져오는데 실패했습니다.', error);
          commit('clearUserInfo');
        });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.userInfo,
    userInfo: (state) => state.userInfo,
  },
});
