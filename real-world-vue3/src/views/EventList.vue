<template>
  <div class="events">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1">
        &#60; Prev
      </router-link>
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="prev"
        v-if="hasNextPage">
        Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventService from '@/services/EventService.js'
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard
  },
  data(){
    return {
     events: null,
     totalEvents: 0
    }
  },
  beforeRouteEnter (routeTo, routeFrom, next) {
      // 2 = number per page and this.page = current page which is reactive
      EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then(response => {
        // comp = component
        next(comp => {
          comp.events = response.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
    beforeRouteUpdate (routeTo) {
      // 2 = number per page and this.page = current page which is reactive
      return EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then(response => {
        this.events = response.data
        this.totalEvents = response.headers['x-total-count']
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
  },
  computed: {
    hasNextPage(){
      // find total number of pages
      var totalPages = Math.ceil(this.totalEvents / 2)
      // if not last page
      return this.page < totalPages
    }
  }
}
</script>

<style scoped>
.events {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.pagination {
  display: flex;
  width: 300px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
