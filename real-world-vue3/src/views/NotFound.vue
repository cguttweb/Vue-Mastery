<template>
  <h1>Oh no</h1>
  <p>The {{ resource }} you're looking for does not exist.</p>
  <router-link :to="{ name: 'EventList' }">Back to home</router-link>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page'
    }
  }
}
</script>
