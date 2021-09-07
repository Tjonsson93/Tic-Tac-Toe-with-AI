<template>
  <div id="app">
    <Board />
    
  </div>
</template>

<script>
import Board from './components/Board.vue'


export default {
  components: { Board },
  name: 'app',
  data () {
    return {
     
    }
  }
}
  


</script>

<style>
body, html {
    height: 100%;
    background-image: url('src/assets/pexels-pixabay-460621.jpg');
    background-size: 100% ;
  }
#app {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
