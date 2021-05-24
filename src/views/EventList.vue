<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <div>
      <EventCard v-for="event in event.events" :key="event.id" :event="event" />

      <template v-if="page != 1">
        <router-link
          :to="{ name: 'event-list', query: { page: this.page - 1 } }"
          rel="prev"
        >
          Prev Page
        </router-link>
        |
      </template>
      <router-link
        v-if="this.event.eventsCount > this.page * 3"
        :to="{ name: 'event-list', query: { page: this.page + 1 } }"
        rel="prev"
      >
        Next Page
      </router-link>
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    EventCard,
  },
  created() {
    this.fetchEvents({ perPage: 3, page: this.page });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["event", "user"]),
  },
  methods: mapActions(["fetchEvents"]),
};
</script>
