<template>
<div>
    <div class="heading">
      <h1>Tic-Tac-Toe</h1>
    </div>
    <div class="tictactoe-board">
      <div v-for="(n, i) in 3">
        <div v-for="(n, j) in 3">
          <Square @click="performMove(j, i)"
                :value="board.cells[j][i]"
          />
        </div>
      </div>

      <div class="game-over-text" v-if="gameOver">
        {{ gameOverText }}
      </div>
    </div>
     <Restart @click="reset()"/>
  </div>

</template>




<script>
import Board from '../Board';
import Square from './Square.vue';
import Restart from './Restart.vue';
  export default {
  components: { Square, Restart },
data() { return {
      board: new Board(),     
      checkMoves: true,
      gameOver: false,
      checkWinner: 0,
      gameOverText: ''
    } },

    methods: {    
    async performMove(x, y) {
        if (this.gameOver) {
          return;
        }
        
        if (! this.board.doMove(x, y, 'x')) {
          // Invalid move.
          return;
        }
          
        this.$forceUpdate();
        
        
        let gameState = {
          board: this.board.clone()
        }
          
        this.$store.commit('setGameState', gameState)
        await this.$store.dispatch('pushGameState', gameState)
        console.log('succesfully sent game state: ', this.$store.state.gameState)

        
        // parse the proxy object to object for use of values for AI move.
        // And for evaluating if the player has won.
        let newState = JSON.parse(JSON.stringify(this.$store.state.newGameState))
        let moves = newState['best_move']
        let checkPlayerMoves = newState['check_moves']
        let checkPlayerWinner = newState['check_winner']
        let Xmove = moves[0]
        let Ymove = moves[1]
        // creating object for the with the indexes for the AI move
        let move = {
          x: Xmove,
          y: Ymove
        }
        // Using the current state variables after player move to
        // determin if it is a WIN or Draw
        if (!checkPlayerMoves || checkPlayerWinner === -10) {
          if(checkPlayerWinner === -10) {
            this.gameOver = true;
            this.gameOverText = 'You win!'
          }else if(checkPlayerWinner === 0){
            this.gameOver = true;
            this.gameOverText = 'Draw'
          }
          
          return;
        }
        
        // making AI move on index sent through API       
        this.board.doMove(move.x, move.y, 'o');
        
        // taking hold of current game state to evaluate 
        // if th AI has won.
        let gameStateOver = {
          board: this.board.clone()
        }
        console.log('this is the board',gameStateOver)
       
       // commiting state of board to store
        this.$store.commit('setStatus', gameStateOver)
        await this.$store.dispatch('pushStatus', gameStateOver)
        

        let status = JSON.parse(JSON.stringify(this.$store.state.newStatus))
        let checkAIWinner = status['status']
        let checkAIMoves = status['moves_left']
        console.log('gameStatus: ', checkAIWinner , 'moves left: ', checkAIMoves)
        
        // Using the current game state varaibles to check for WIN or Draw
        if (!checkAIMoves || checkAIWinner === 10) {
          if(checkAIWinner === 10) {
            this.gameOver = true;
            this.gameOverText = 'AI wins!'
          }if(checkAIWinner === 0){
            this.gameOver = true;
            this.gameOverText = 'Draw'
          }
        }
        this.$forceUpdate()  

      },

      // cleans the board of values and creates a new
      // asigns the gameOver variable to false 
      // for a new game to begin.
      reset() {
        this.board = new Board()
        this.gameOver = false
      }
   
    },
    
    

    
    
    
  }
</script>
<style>
  .tictactoe-board {
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    height: 300px;
    justify-content: center;
    align-items: center;
    background-image: url('src/assets/pexels-pixabay-247716.jpg');
    background-size: 100% ;
  }
   .heading {
    text-align: center;
    width: 320px;
    color: rgb(0, 0, 0);
    text-shadow: 1px 1px white;
    font-size: 30px;

  }

  .game-over-text {
    font-weight: bold;
    color: rgb(253, 5, 5);
    width: 204px;
    font-size: 30px;
    text-align: center;
    padding-top: 25px;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
    text-shadow: 1px 1px rgb(0, 0, 0);
  }
</style>