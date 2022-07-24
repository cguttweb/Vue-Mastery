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
import { watchEffect } from 'vue'

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
  created(){
    watchEffect(() => {
      this.events = null // clears events on the page
      // 2 = number per page and this.page = current page which is reactive
      EventService.getEvents(2, this.page)
      .then(response => {
        this.events = response.data
        this.totalEvents = response.headers['x-total-count']
      })
      .catch(() => {
        this.$router.push({ name: 'NetworkError' })
      })
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
