<template>
  <div class="network-error">
    <h1>Uh oh!</h1>

    <h3>It looks as though you're experiencing some network issues, please <a href="#" @click="$router.go(-1)">click here</a> to try again.</h3>
  </div>
</template>