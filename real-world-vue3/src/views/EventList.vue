<template>
  <div class="events">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data(){
    return {
      events: [
      {
        id: 1,
        category: 'animal welfare',
        title: 'Dog Adoption Day',
        description: 'Find your new dog at this event',
        location: 'Woof Town',
        date: '19th August 2022',
        time: '12:00',
        petsAllowed: true,
        organiser: 'Kat Laydee'
      },
      {
        id: 2,
        category: 'animal welfare',
        title: 'Dog Adoption Day',
        description: 'Find your new dog at this event',
        location: 'Woof Town',
        date: '19th August 2022',
        time: '12:00',
        petsAllowed: true,
        organiser: 'Kat Laydee'
      },
      {
        id: 3,
        category: 'animal welfare',
        title: 'Beach Cleanup',
        description: 'Find your new dog at this event',
        location: 'Woof Town',
        date: '19th August 2022',
        time: '12:00',
        petsAllowed: true,
        organiser: 'Kat Laydee'
      },
 
      ]
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
</style>
