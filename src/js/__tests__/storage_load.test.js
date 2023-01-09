import GameController from '../GameController'
import GameStateService from '../GameStateService'
import GamePlay from '../GamePlay'

const gamePlay = new GamePlay()
const stateService = new GameStateService(localStorage)
const gameCtrl = new GameController(gamePlay, stateService);

test('should alert messege', () => {
    gameCtrl.gamePlay.drawUi = jest.fn()
    gameCtrl.gamePlay.redrawPositions = jest.fn()
    gameCtrl.getCharPosition = jest.fn()
    window.alert = jest.fn();

    Storage.prototype.getItem = jest.fn(() => null);
    gameCtrl.load(gameCtrl.gameState)
    expect(alert.mock.calls).toEqual([["Сохранения отсутствуют"]])
})

let storage = {
    "point": 0,
    "level": 3,
    "isCharMove": true,
    "isGameOver": false,
    "team1": {
        "characters": [
            {
                "level": 1,
                "attack": 31,
                "defence": 27,
                "health": 50,
                "type": "bowman",
                "team": "team1",
                "position": 25
            },
            {
                "level": 4,
                "attack": 32,
                "defence": 45,
                "health": 50,
                "type": "bowman",
                "team": "team1",
                "position": 9
            }
        ]
    },
    "team2": {
        "characters": [
            {
                "level": 1,
                "attack": 46,
                "defence": 11,
                "health": 50,
                "type": "undead",
                "team": "team2",
                "position": 31
            },
            {
                "level": 2,
                "attack": 52,
                "defence": 12,
                "health": 50,
                "type": "undead",
                "team": "team2",
                "position": 23
            }
        ]
    },
    "characters": [
        {
            "level": 1,
            "attack": 31,
            "defence": 27,
            "health": 50,
            "type": "bowman",
            "team": "team1",
            "position": 25
        },
        {
            "level": 4,
            "attack": 32,
            "defence": 45,
            "health": 50,
            "type": "bowman",
            "team": "team1",
            "position": 9
        },
        {
            "level": 1,
            "attack": 46,
            "defence": 11,
            "health": 50,
            "type": "undead",
            "team": "team2",
            "position": 31
        },
        {
            "level": 2,
            "attack": 52,
            "defence": 12,
            "health": 50,
            "type": "undead",
            "team": "team2",
            "position": 23
        }
    ]
}
storage = JSON.stringify(storage)

test('should return und parse values from storage to the required properties of gameController', () => {
    gameCtrl.gamePlay.drawUi = jest.fn()
    gameCtrl.gamePlay.redrawPositions = jest.fn()
    gameCtrl.getCharPosition = jest.fn()
    window.alert.mockClear();

    Storage.prototype.getItem = jest.fn(() => storage)
    gameCtrl.load(gameCtrl.gameState)
    expect(window.alert.mock.calls).toHaveLength(0)
    expect(gameCtrl.gameState).toEqual(gameCtrl.stateService.load())
})


