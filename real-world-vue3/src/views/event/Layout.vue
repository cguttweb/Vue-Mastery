<template>
  <div v-if="event">

  <div id="nav">
  <!-- params id removed as id is required for child path in router/index.js -->
    <router-link :to="{ name: 'EventDetails' }">Details</router-link> |
    <router-link :to="{ name: 'EventRegister' }">Register</router-link> |
    <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
  </div>
  <router-view :event="event" />
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
      .catch(err => {
        if(err.response && err.response.status == 404){
          this.$router.push({
            name: '404Resource',
            params: { resource: 'event' }
          })
        } else {
          this.$router.push({ name: 'NetworkError' })
        }
      })
    }
  }
</script>
