<template>
  <div class="events">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventService from '@/services/EventService.js'
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data(){
    return {
     events: null
    }
  },
  created(){
    EventService.getEvents()
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
