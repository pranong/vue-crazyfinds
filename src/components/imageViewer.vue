<template>
  <div class="page-image-viewer">
    <div v-for="(item, i) in images" :key="i">
      <img class="" :src="item.src" v-if="item.isSelected" />
    </div>
    <v-btn fab fixed center bottom medium @click="onExit">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    images: Array,
    now: Number,
  },
  data() {
    return {
      nowId: 0,
    };
  },

  mounted() {
    console.log('images', this.images, 'now', this.now);
    this.nowId = this.now;
  },

  methods: {
    onExit() {
      this.$emit('exit', this.nowId);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-image-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.387);
  z-index: 999;
  backdrop-filter: blur(20px);
}
.zoom-in-out-box {
  //   margin: 24px;
  //   height: 50px;
  //   background: #f50057;
  animation: zoom-in-zoom-out 1s ease infinite;
}

@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.5, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
