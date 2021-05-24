import EventService from "@/services/EventService.js";

export const state = {
  events: [],
  event: {},
  eventsCount: 0,
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_COUNT(state, eventsCount) {
    state.eventsCount = eventsCount;
  },
};

// Actions sind Wrapper mit Business Logik um Mutations
export const actions = {
  fetchEvent({ commit, dispatch }, id) {
    return EventService.getEvent(id)
      .then((response) => {
        console.log(response.data);
        commit("SET_EVENT", response.data);
      })
      .catch((error) => {
        addMessage(
          { dispatch },
          "error",
          "There was a problem matching event: " + error.message
        );
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        console.log(response.data);
        let eventsCount = response.headers["x-total-count"];
        console.log("Total events are " + eventsCount);
        commit("SET_EVENTS", response.data);
        commit("SET_EVENTS_COUNT", eventsCount);
      })
      .catch((error) => {
        addMessage(
          { dispatch },
          "error",
          "There was a problem matching events: " + error.message
        );
      });
  },
  createEvent({ commit, dispatch }, event) {
    EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        addMessage({ dispatch }, "success", "Your event has been created!");
      })
      .catch(() => {
        addMessage(
          { dispatch },
          "error",
          "There was a problem to creating your event!"
        );
      });
  },
};

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};

function addMessage({ dispatch }, type, message) {
  const notification = {
    type: type,
    message: message,
  };
  dispatch("notification/add", notification, { root: true });
}
