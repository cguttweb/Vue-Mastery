<template>
    <p>{{ event.time }} on {{ event.date }}</p>
    <p>{{ event.description }}</p>
</template>

<script>
export default {
    props: ['event']
  }
</script>