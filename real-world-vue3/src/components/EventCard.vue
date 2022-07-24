<template>
  <div class="event-card">
   <!-- Display event info -->
    <span>{{ event.time }} on {{ event.date }}</span>
    <h4>{{ event.title }}</h4>
  </div>
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
  box-shadow: 4px 5px #333333;
}
</style>
