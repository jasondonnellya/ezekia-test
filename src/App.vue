<template>
  <MuseumNavbar />
  <RouterView />
</template>

<script>
import MuseumNavbar from './components/MuseumNavbar.vue';
export default {
  components: {
    MuseumNavbar
  }
}
</script>
