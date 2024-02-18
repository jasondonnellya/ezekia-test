This task is spread between two Vue components.

GENERAL GUIDELINES

- Use the Options API
- Use ES6 notation
- Use SCSS
- Use BEM for classes if possible
- Using Typescript is *not* necessary
- Using Lodash would make some functions a lot easier! (https://lodash.com/docs/4.17.15)
- We've added a bit of code for context, do what you want with it. Feel free to modify or move if you think something else is better. However, please do not modify the arrays/objects in "data()"
- We do not expect things to be working fully or look perfect but the code added and the approach need to make sense, and there needs to be some evidence that user experience was considered
- If at any point you want to do something but you do not have a package imported, just mock it out in the code as best you can and/or put a comment about what you would have done if you'd had the package available.



CONTEXT

You manage a natural history museum website. The museum has a set of web pages, each with a theme, and containing a list of that theme's highlights within the museum's exhibits. These pages include Dinosaurs, Space, Oceans, and Wildlife.

For example:
On the Space page, you have a list of cards, each with a space-related subject found in the museum, like asteroids, comets, black holes, stars, etc...
On the Dinosaur page, you have a list of cards, each with a dinosaur referencing fossils found in the museum.
On the Wildlife page, you have a list of cards, each with an animal.

The museum also works with partners and has set up an API where the museum website receives data related to one of these pages. For example, the museum partners with an observatory in Hawaii and receives some Space highlights from them that need to be mixed in with the museum's own data.

In the email, there should also be a basic sketch of what the Space page would look like, if that helps to visualize!



YOUR GOAL

Display the Space page highlights on cards in a list using the museum's data combined with data from the partner's API. Sample data is found in "Data()" and since we don't have any backend, pretend it was loaded in. Also to keep it simple, there are only a few highlights there, but there could be hundreds. Note: The data is intentionally in different formats.



REQUIREMENTS

1. Cards displaying highlights from the space partners' API should have a different color branding from those in the museum's own data.

2. While in this case the card only needs to work for the Space page, the card component needs to be done in such a way that it would be easily expandable to the other pages. The museum could have X number of pages and they could continually be adding new ones. As a developer, you don't know what those pages might be.

2.1.    Each page has a special badge in the top right corner of the card. This badge is different on every page, and could be an image, or some styled html elements, or a Font Awesome icon. The Space page has an image of a star. The Dinosaur page has a Font Awesome icon inside a circle. The Oceans page has two Font Awesome icons, a wave and a fish together. And so on...

2.2     The data on the different pages (Space, Dinosaurs...) have commonalities but also differences. All highlights have a name, image, date they were posted, a brief description, and perhaps associated news. But all pages also have extra unique data. For example, on the space page, some highlights also include a link to a quiz on the topic. On the dinosaur card, we have a "Period" key to indicate when that dinosaur lived. On the Wildlife page, we have several additional keys: "Location", "Species", and "Endangered status".

3. Each card should have a "Refresh image" button which, when clicked, will replace that card's current image with a new image fetched from an API.

3.1     When implementing this functionality, assume that you have already received the new image from the API. E.g. const newImage = await getNewImage(); where you do not need to implement the getNewImage() function.

3.2     You only need to implement the code which will replace the current image with the new image for the relevant card.

4. The cards should be arranged in order of date created, with the most recent first.


Follow the requirements and also complete any prompts in the two component files. You can return these two files with the content filled in, or copy and paste the relevant code and create something on Github, or in JSFiddle.


<template>
  <div class="space-page">

    <h1 class="space-page__title">
      Space
    </h1>

    <!-- Add the museum highlight cards based on the data provided below -->
    <div class="space-page__grid">
      <MuseumHighlight v-for="(spaceHighlight) in concatenatedHighlights" :key="spaceHighlight.id"
        :museumHighlight="spaceHighlight" @get-new-image="GetNewImageById">
        <template v-slot:badge>
          <img class="space-highlight__badge" src="/star.png" />
        </template>
        <template v-slot:unique-content>
          <a v-if="spaceHighlight.quiz" class="space-highlight__button" :href="spaceHighlight.quiz" target="_blank">Quiz</a>
        </template>
      </MuseumHighlight>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';
import MuseumHighlight from '../components/MuseumHighlight.vue';

export default {
  name: 'SpacePage',
  components: {
    MuseumHighlight,
  },
  mixins: [],
  props: {},
  data() {
    return {
      spaceHighlights: [
        {
          date: '2020-04-20 12:20:00',
          description: 'Asteroids are minor planets, especially of the inner Solar System. Larger asteroids have also been called planetoids.',
          id: 1,
          image: '',
          name: 'Asteroids',
        },
        {
          date: '2020-05-20 15:50:00',
          description: 'A comet is an icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process called outgassing.',
          id: 9,
          image: '',
          name: 'Comets',
        },
        {
          date: '2020-05-01 9:22:00',
          description: 'The term planet is ancient, with ties to history, astrology, science, mythology, and religion.',
          id: 7,
          image: '',
          name: 'Planets',
          news: {
            date: '2020-08-18 18:00:00',
            title: 'Attend our talk about Jupiter with Dr. Hogarth',
          },
          quiz: 'https://planetquiz.space',
        },
        {
          date: '2020-07-05 4:10:00',
          description: 'A meteor shower is a celestial event in which a number of meteors are observed to radiate, or originate, from one point in the night sky.',
          id: 12,
          image: '',
          name: 'Meteor showers',
          news: {
            title: 'The Lyrids will peak at on April 21-22 2021, at night',
          },
        },
      ],
      spacePartners: {
        observatory: {
          createdAt: '2020-06-01 11:45:00',
          info: 'The Mauna Kea Observatories (MKO) are a number of independent astronomical research facilities and large telescope observatories that are located at the summit of Mauna Kea on the Big Island of Hawaiʻi, United States.',
          image: '',
          name: 'Mauna Kea Observatories',
        },
      },
      concatenatedHighlights: [],
      unusedId: 1
    };
  },
  computed: {},
  methods: {
    async FetchMuseumHighlights() { },
    async FetchSpacePartners() { },

    /**
     * Fetch a new image and apply it to the highlight with the related id.
     * @param {Number} id Id of highlight to find.
     */
    async GetNewImageById(id) {
      for (let highlight of this.concatenatedHighlights) {
        if (highlight.id === id) {
          highlight.image = await this.FetchNewImage();
          break;
        }
      }
    },
    /**
     * Fetch a new random api image from lorem picsum.
     * @returns {String} Url for image src attributes.
     */
    async FetchNewImage() {
      return await fetch(`https://picsum.photos/400`).then(res => res.url);
    },
    /**
     * Concatenate and return all possible museumhighlights in correct format.
     * @returns {Array} Museum Highlights.
     */
    ConcatenateMuseumHighlights() {
      return [...this.spaceHighlights, ...this.FormatSpacePartners()].sort((a, b) => a.date < b.date ? 1 : -1);
    },
    /**
     * Generate a local ID for the space partner entries that isn't conflicting with the space highlights.
     * @returns {Number} An id as an integer.
     */
    GenerateUnusedId() {
      let validatingId = true;
      while (validatingId) {
        let foundId = false;
        for (let highlight of this.spaceHighlights) {
          if (this.unusedId === highlight.id) {
            foundId = true;
            break;
          }
        }
        if (foundId) this.unusedId++;
        else validatingId = false;
      }
      return this.unusedId;
    },
    /**
     * Format the space partners array to match the museum highlights data.
     * @returns {Array} Formatted Space Partners.
     */
    FormatSpacePartners() {
      // https://lodash.com/docs/4.17.15#map
      return _.map(this.spacePartners, (o) => {
        return {
          // Generating an unused ID only works because the space partners have no IDs. If they did these would conflict and this wouldn't be possible.
          id: this.GenerateUnusedId(),
          date: o.createdAt,
          description: o.info,
          image: o.image,
          name: o.name,
          isPartner: true
        }
      })
    }
  },
  async created() {
    // I've provided these to show the order of all the functionality execution on the page.
    await this.FetchMuseumHighlights();
    await this.FetchSpacePartners();
    this.concatenatedHighlights = this.ConcatenateMuseumHighlights();
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.space-page {
  margin: auto;
  padding: $padding-large $padding-large;

  &__title {
    font-size: $font-xlarge;
    font-weight: 600;
    margin-bottom: $padding-large;
    font-family: $font-secondary;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: $gap-large;
  }
}

.space-highlight {
  &__badge {
    width: 40px;
  }
}

@media screen and (max-width: 1280px) {
  .space-page {
    &__grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
@media screen and (max-width: 1024px) {
  .space-page {
    &__grid {
      grid-template-columns: 1fr 1fr;
    }
  }
}
@media screen and (max-width: 768px) {
  .space-page {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
