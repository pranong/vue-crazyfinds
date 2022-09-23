<template>
    <div class="page-loader">
        <div class="zoom-in-out-box">
            <img height='20' src="https://cdn.shopify.com/s/files/1/0016/4013/6813/files/logo_3c33f7b3-489a-4f17-be41-28a6d3ff2260_180x.png?v=1652131245"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loader',

    data() {
        return {
           
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.page-loader {
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