
const state = {
  device: "desktop",
  summaryData: {}
};

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  UPDATE_SUMMARY_DATA: (state, data) => {
    state.summaryData = data;
  }
};

const actions = {
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  updateSummaryData({ commit }, data) {
    commit("UPDATE_SUMMARY_DATA", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
