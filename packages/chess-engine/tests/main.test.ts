import ChessGame from "@modules/chess/chessGame"
import { color } from "@shared/types/colorType"

describe("ChessGame (smoke test)", () => {
  test("a new game starts with White to move", () => {
    const game = new ChessGame()
    game.start()
    expect(game.currentPlayer).toBe(color.White)
  })
})
