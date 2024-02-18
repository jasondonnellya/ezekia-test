<template>
  <div class="museum-highlight" :class="highlightClass">
    <!-- Display the available information for the highlight -->
    <!-- Badge slot for adding different badges depending on the highlight type. -->
    <div class="museum-highlight__badge">
      <slot name="badge"></slot>
    </div>
    <div class="museum-highlight__img-container">
      <img class="museum-highlight__img" :src="image" />
    </div>
    <div class="museum-highlight__content">
      <h4 class="museum-highlight__title">{{ museumHighlight.name }}</h4>
      <p  class="museum-highlight__description">{{ museumHighlight.description }}</p>
      <p v-if="museumHighlight.news" class="museum-highlight__news"><i>{{ museumHighlight.news.title }}</i></p>
      
            <!-- Unique content slot for adding unique data that isn't shared among highlights. -->
      <div class="museum-highlight__unique-content">
        <slot name="unique-content"></slot>
      </div>
      
      <div class="museum-highlight__bottom">
        <span class="museum-highlight__date text-right">{{ museumHighlight.date }}</span>
        <div class="text-center">
          <button class="museum-highlight__button" @click="$emit('get-new-image', museumHighlight.id)">Refresh image</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MuseumHighlight',
  components: {},
  // I am not using a mixin here for extending this component because this only applies to shared logic between multiple components,
  // but the museum pages are supposed to only use this one component to handle multiple different types of highlights.
  // This way I've opted that props, slots and conditional logic is how it should be handled. 
  mixins: [],
  props: {
    /**
     *  {
     *    date: String,
     *    description: String,
     *    id: Number,
     *    image: String,
     *    name: String,
     *  },
     */
    museumHighlight: Object
  },
  
  // Below I've provided a second method for refreshing the image that avoids prop mutation.
  // However, the first method I've went with allows the dataset within the SpacePage to stay consistent.
  // This could prove useful in the event that if the dataset is updated within the api and we don't want to refresh the whole page,
  // we are updating the data individually and any other components outside of this highlight will be able to interact with the same image.
  data() {
    return {
      refreshedImage: ''
    };
  },
  computed: {
    image() {
      return this.refreshedImage?.length ? this.refreshedImage : this.museumHighlight.image;
    },
    highlightClass() {
      let highlightClass = ''
      if(this.museumHighlight.isPartner) highlightClass += 'museum-highlight--partner';
      return highlightClass
    }
  },
  methods: {
    getNewImage() {
      return this.refreshedImage;
    }
  },
  created() {
    // This line is just for visually showing images when the page loads initially but in reality the default images would be present in the API data.
    this.$emit('get-new-image', this.museumHighlight.id);
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.museum-highlight {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  &--partner {
    background: $secondary;
  }
  &__badge {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
  &__img-container {
    background: $secondary;
    overflow: hidden;
    height: 200px;
    > img {
      object-fit: cover;
      width: 100%;
    }
  }
  &__content {
    display: grid;
    align-items: start;
    gap: $gap;
    padding: $padding;
  }
  &__title {
    font-size: $font-large;
    font-family: $font-secondary;
  }
  &__description {
    font-size: $font-small;
    color: $gray;
  }
  &__button {
    border: solid;
    border-radius: 5px;
    border-width: 1px;
    border-color: transparent;
    padding: $padding-xsmall $padding;
    
    background: $primary;
    color: $white;
  }
  &__bottom {
    align-self: flex-end;
    display: grid;
    gap: $gap-small;
  }
}
</style>
