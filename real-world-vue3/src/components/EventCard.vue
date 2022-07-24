<template>
  <router-link class="event-link" :to="{ name: 'EventDetails', params: { id: event.id } }">
    <div class="event-card">
    <!-- Display event info -->
      <span>{{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: Object
  }
}
</script>

<style scoped>
.event-card {
  border: 1px solid #333333;
  cursor: pointer;
  padding: 20px;
  margin-bottom: 18px;
  width: 250px;
}

.event-card:hover {
  box-shadow: 0 3px 10px 0 rgba(51, 51, 51, 0.5);
  transform: scale(1.1)
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
