from sanic import Sanic, response as res
from sanic.exceptions import NotFound
from sanic_cors import CORS, cross_origin

from minimax import *


app = Sanic(__name__)
CORS(app)



@app.route('/rest/game', methods=['POST', 'OPTIONS'])
@cross_origin(app)
async def get_ai_move(req):
  game_state = req.json
  print(game_state['cells'])
  
  best_move = findBestMove(game_state['cells'])
  print(best_move[0] , best_move[1])
  check_moves = isMovesLeft(game_state['cells'])
  print(check_moves)
  check_winner = evaluate(game_state['cells'])
  print(check_winner)
    
  game_state['best_move'] = best_move
  game_state['check_moves'] = check_moves
  game_state['check_winner'] = check_winner
  
  return res.json(game_state)

@app.route('/rest/status', methods=['POST', 'OPTIONS'])
@cross_origin(app)
async def get_status(req):
  game_status = req.json

  status = evaluate(game_status['cells'])
  moves_left = isMovesLeft(game_status['cells'])
  game_status['status'] = status
  game_status['moves_left'] = moves_left

  return res.json(game_status)


if __name__ == "__main__":
  app.run(port=8000)