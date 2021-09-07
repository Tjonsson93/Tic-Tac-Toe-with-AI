export default class Board {
    constructor() {
      this.cells = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    }
    
    
    doMove(x, y, player) {
      if (this.cells[x][y] !== '') {
        return false;
      }
  
      this.cells[x][y] = player;
      return true;
    }

   
  
    clone() {
      let clone = new Board();
  
      for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
          clone.cells[i][j] = this.cells[i][j];
        }
      }
  
      return clone;
    }
  
    

    toString() {
        let str = "";
        for (let i=0; i<3; i++) {
          for (let j=0; j<3; j++) {
            str += this.cells[j][i];
          }
          str += "\n"
        }
        return str;
      }
  }