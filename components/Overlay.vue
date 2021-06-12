<template>
    <div id="overlay"></div>
</template>
<style scoped>
#overlay {
  background: radial-gradient(rgba(204, 204, 204, 0.50) 1px, transparent 1px);
  background-position: -15px -15px;
  background-size: 40px 40px;
  position: fixed;
  min-height: 100%;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: -1;
}
</style>