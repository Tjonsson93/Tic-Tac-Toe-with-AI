<template>
    <div class="restart">
        <button class="restartButton" @click="onClick">Restart game</button>
    </div>
</template>

<script>


export default {
    methods: {
        onClick() {
            this.$emit('click')
        }
    }
}
</script>

<style>
  .restart {
    font-weight: bold;
    color: white;
    width: 204px;
    font-size: 16px;
    text-align: center;
    padding-top: 25px;
    
    
} 
.restartButton {
    padding: 15px 60px;
    font-size: 1.5em;
    outline: none;
    cursor: pointer;
    color: white;
    border: 3px solid black;
    justify-content: center;
    align-items: center;
    background-image: url('src/assets/pexels-pixabay-247716.jpg');
    background-size: 100%;
    margin: 40px;
    
} 

</style>