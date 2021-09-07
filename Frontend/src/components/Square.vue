<template>
  <div @click="$emit('click')" class="cell">
	   <span
        v-if="value !== ''"
        :class="{ 'red' : value === 'x', 'green': value === 'o' }"
      >
        {{ value }}
      </span>
  </div>
</template>



<script>
	export default {
		props: {
			value: String,
		}
	}
</script>


<style scoped>
.cell {
    width: 94px;
    height: 94px;
    border: 3px solid rgb(7, 6, 6);
    font-size: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .red {
    color: rgb(255, 60, 0);
    text-shadow: 3px 3px black;
  }
  .green {
    color: rgb(188, 228, 10);
    text-shadow: 3px 3px black;
  }
  .red,.green {
    position: relative;
    top: -6px;
    font-weight: bold;
    font-size: 80px;
  }
</style>