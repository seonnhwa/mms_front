<template>
  <div class="w-[700px]">
    <modal-component class="grid justify-items-end" />
    <div class="relative mx-auto flex flex-row">
      <div v-for="item in list" :key="item.id" ref="slide" :index="'slideIndex=1'" class="slide relative flex flex-row">
        <img
          class="w-[400px] h-[400px] bg-base-100"
          :src="`http://192.168.0.62:3001/uploads/${item.img}`"
          alt="Drink"
          multiple
        />
        <div class="card-body bg-base-100 w-[400px] h-[400px]">
          <h2 class="card-title mb-3">{{ item.category }}</h2>
          <p class="text-sm">음료명: {{ item.name }}</p>
          <p class="text-sm">매장명: {{ item.store }}</p>
          <p class="text-sm">
            키워드: <kbd class="kbd">#{{ item.keyword }}</kbd>
          </p>
        </div>
      </div>
      <!-- The previous button -->
      <button
        class="absolute left-0 top-1/2 p-4 -translate-y-1/2 text-black hover:text-amber-500 cursor-pointer"
        @click="moveSlide(-1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- The next button -->
      <button
        class="absolute right-0 top-1/2 p-4 -translate-y-1/2 text-black hover:text-sky-500 cursor-pointer"
        @click="moveSlide(1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Modal from '../modal/Modal.vue'

export default {
  components: {
    'modal-component': Modal
  },
  data() {
    return {
      list: [],
      slideIndex: 1,
      index: 1
    }
  },
  async created() {
    await this.$axios
      .get(`/serverApi/drinks/Non-Coffee`)
      .then(res => {
        this.list = res.data.rows
        console.log(res.data.rows)
        console.log('success', res)
      })
      .catch(error => {
        console.log(error)
      }),
      this.showSlide(1)
  },
  methods: {
    // change slide with the prev/next button
    moveSlide(moveStep) {
      this.showSlide((this.slideIndex += moveStep))
    },
    // change slide with the dots
    currentSlide(n) {
      this.showSlide((this.slideIndex = n))
    },
    showSlide(n) {
      let i
      const slides = this.$refs.slide

      if (n > slides.length) {
        this.slideIndex = 1
      }
      if (n < 1) {
        this.slideIndex = slides.length
      }
      // hide all slides
      for (i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden')
      }
      // show the active slide
      slides[this.slideIndex - 1].classList.remove('hidden')
    }
  }
}
</script>

<style>
#carouselWrapper {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.carousel {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}
.carousel-text {
  position: absolute;
  bottom: 0;
  margin-left: 20px;
  z-index: 551;
  color: #ffffff;
}
.carousel-bg {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 100%;
  background: linear-gradient(transparent, #000000);
  opacity: 0.8;
  z-index: 550;
}
</style>
