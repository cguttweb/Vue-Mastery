<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

  export default {
    props: ['id'],
    data(){
      return {
        event: null
      }
    },
    created(){
      // fetch single event by id and set local data
      EventService.getEvent(this.id)
      .then(resp => {
        this.event = resp.data
      })
      .catch(err => console.log(err))
    }
  }
</script>

<style scoped>

</style>