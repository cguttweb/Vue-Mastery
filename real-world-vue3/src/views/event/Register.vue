<template>
    <p>Register for the event here</p>
    <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register(){
      // call to API
      // if registered then redirect to event details

      this.GStore.flashMessage = 'You are successfully registered for ' + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 2000)

      this.$router.push({
        name: 'EventDetails'
      })

      // this.$router.go(1) or this.$router.go(-1) useful for native apps without browser buttons
      // this.$router.replace - prevent history in the browser
    }
  }
}
</script>