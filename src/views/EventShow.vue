<template>
  <div>
    <h1>Show Event #{{ event.title }}</h1>

    <EventCard :event="event" />
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue";
import { mapState } from "vuex";
import NProgress from "nprogress";
import store from "@/store/store";

export default {
  components: { EventCard },
  props: ["id"],
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start();
    store.dispatch("fetchEvent", routeTo.params.id).then(() => {
      NProgress.done();
      next();
    });
  },
  computed: mapState({
    event: (state) => state.event.event,
  }),
};
</script>
