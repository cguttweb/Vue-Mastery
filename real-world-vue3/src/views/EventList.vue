<template>
  <div class="events">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <router-link :to="{ name: 'EventList', query: { page: page - 1 } }"
    rel="prev" 
    v-if="page != 1">
    </router-link>
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
     events: null
    }
  },
  created(){
    // 2 = number per page and this.page = current page
    EventService.getEvents(2, this.page)
    .then(resp => {
      this.events = resp.data
    })
    .catch(err => console.log(err))
  }
}
</script>

<style scoped>
.events {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
