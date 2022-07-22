
const state = {
  device: "desktop",
  summaryData: {
    name: "Octavia Chong",
    parcels1: 386,
    parcels2: 1385,
    parcels3: 27,
    cost: 30,
    vouchers: 12,
    registeredOn: "18 JANUARY 2020",
    month1: "MAY",
    parcel4: 10,
    month2: "NOVEMBER",
    parcel5: 7
  }
};

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  UPDATE_SUMMARY_DATA: (state, data) => {
    state.summaryData = { ...state.summaryData, ...data };
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
