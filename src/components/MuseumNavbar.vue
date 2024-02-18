<template>
  <nav class="museum-navbar">
    <img class="museum-navbar__logo" src="/logo.svg" />
    <img class="museum-navbar__burger" src="/menu.png" />
  </nav>
</template>

<style lang="scss">
@import '../assets/scss/variables.scss';

.museum-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $padding-small $padding-large;
  background: $secondary;

  &__logo {
    width: 220px;
  }
  &__burger {
    width: 40px;
  }
}
</style>