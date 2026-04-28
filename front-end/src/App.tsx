import React from 'react';
import './App.css';
import { GameState, Cell } from './game';
import BoardCell from './Cell';

interface Props { }

class App extends React.Component<Props, GameState> {
  private initialized: boolean = false;

  constructor(props: Props) {
    super(props)
    this.state = { cells: [], winner: null, currentPlayer: 'X' }
  }

  newGame = async () => {
    const response = await fetch('/newgame');
    const json = await response.json();
    this.setState({ cells: json['cells'], winner: json['winner'], currentPlayer: json['currentPlayer'] });
  }

  play(x: number, y: number): React.MouseEventHandler {
    return async (e) => {
      e.preventDefault();
      const response = await fetch(`/play?x=${x}&y=${y}`)
      const json = await response.json();
      this.setState({ cells: json['cells'], winner: json['winner'], currentPlayer: json['currentPlayer'] });
    }
  }

  undo = async () => {
    const response = await fetch('/undo');
    const json = await response.json();
    this.setState({ cells: json['cells'], winner: json['winner'], currentPlayer: json['currentPlayer'] });
  }

  createCell(cell: Cell, index: number): React.ReactNode {
    if (cell.playable)
      return (
        <div key={index}>
          <a href='/' onClick={this.play(cell.x, cell.y)}>
            <BoardCell cell={cell}></BoardCell>
          </a>
        </div>
      )
    else
      return (
        <div key={index}><BoardCell cell={cell}></BoardCell></div>
      )
  }

  componentDidMount(): void {
    if (!this.initialized) {
      this.newGame();
      this.initialized = true;
    }
  }

  getInstructionText(): string {
    if (this.state.winner) {
      return `🏆 Тоглогч ${this.state.winner} яллаа!`;
    }
    return `Тоглогч ${this.state.currentPlayer}-ийн ээлж`;
  }

  render(): React.ReactNode {
    return (
      <div id="app">
        <h1 id="title">Tic-Tac-Toe / Х-О Тоглоом</h1>
        <div id="instructions" className={this.state.winner ? 'winner' : ''}>
          {this.getInstructionText()}
        </div>
        <div id="board">
          {this.state.cells.map((cell, i) => this.createCell(cell, i))}
        </div>
        <div id="bottombar">
          <button onClick={this.newGame}>🔄 Шинэ тоглоом</button>
          <button onClick={this.undo}>↩ Буцаах</button>
        </div>
      </div>
    );
  }
}

export default App;
