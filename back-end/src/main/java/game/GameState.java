package game;

import java.util.Arrays;

public class GameState {

    private final Cell[] cells;
    private final String winner;
    private final String currentPlayer;

    private GameState(Cell[] cells, String winner, String currentPlayer) {
        this.cells = cells;
        this.winner = winner;
        this.currentPlayer = currentPlayer;
    }

    public static GameState forGame(Game game) {
        Cell[] cells = getCells(game);
        Player winnerPlayer = game.getWinner();
        String winner = winnerPlayer == null ? null : (winnerPlayer == Player.PLAYER0 ? "X" : "O");
        String currentPlayer = game.getPlayer() == Player.PLAYER0 ? "X" : "O";
        return new GameState(cells, winner, currentPlayer);
    }

    public Cell[] getCells() {
        return this.cells;
    }

    /**
     * toString() of GameState will return the string representing
     * the GameState in JSON format.
     */
    @Override
    public String toString() {
        String winnerJson = this.winner == null ? "null" : "\"" + this.winner + "\"";
        return """
                { "cells": %s, "winner": %s, "currentPlayer": "%s" }
                """.formatted(Arrays.toString(this.cells), winnerJson, this.currentPlayer);
    }

    private static Cell[] getCells(Game game) {
        Cell cells[] = new Cell[9];
        Board board = game.getBoard();
        boolean hasWinner = game.getWinner() != null;
        for (int x = 0; x <= 2; x++) {
            for (int y = 0; y <= 2; y++) {
                String text = "";
                boolean playable = false;
                Player player = board.getCell(x, y);
                if (player == Player.PLAYER0)
                    text = "X";
                else if (player == Player.PLAYER1)
                    text = "O";
                else if (player == null && !hasWinner) {
                    playable = true;
                }
                cells[3 * y + x] = new Cell(x, y, text, playable);
            }
        }
        return cells;
    }
}
