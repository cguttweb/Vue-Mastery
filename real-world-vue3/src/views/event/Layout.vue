<template>
  <div v-if="GStore.event">
    <div id="nav">
      <!-- params id removed as id is required for child path in router/index.js -->
      <router-link :to="{ name: 'EventDetails' }">Details</router-link> |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link> |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>

<script>
export default {
  inject: ['GStore'],
}
</script>
