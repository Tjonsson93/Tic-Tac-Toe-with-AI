import { createStore } from 'vuex'

const store = createStore({

    state:{
        url: {
            sanicUrl: 'http://127.0.0.1:8000'
        },
        
        gameState: {
            board: []
            
        },

        newGameState: {

        },


        gameStateOver: {
            board: []
        },

        newStatus: {

        }



    },

    mutations:{

        setGameState(state, gameStateToAppend) {
            state.gameState = gameStateToAppend
        },

        setStatus(state, statusToAppend) {
            state.gameStateOver = statusToAppend
        }

    },


    actions:{

        async pushGameState({state}) {
            let res = await fetch(state.url.sanicUrl + '/rest/game', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(state.gameState.board)
            })

            let data = await res.json()
            
            state.newGameState = data
            console.log('succesfully recived: ' , state.newGameState)
            
            return state.newGameState
            
        },


        async pushStatus({state}) {
            let res = await fetch(state.url.sanicUrl + '/rest/status', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(state.gameStateOver.board)
            })

            let data = await res.json()

            state.newStatus = data

            return state.newStatus
        }



    }







})



export default store





    
