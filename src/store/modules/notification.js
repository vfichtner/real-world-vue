export const namespaced = true;

const state = {
  notifications: [],
};

let nextId = 1;

const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++,
    });
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToRemove.id
    );
  },
};

const actions = {
  add({ commit }, notification) {
    console.log("add action notification: " + notification);
    commit("PUSH", notification);
  },
  remove({ commit }, notification) {
    commit("DELETE", notification);
  },
};

export default {
  namespaced,
  state,
  mutations,
  actions,
};
