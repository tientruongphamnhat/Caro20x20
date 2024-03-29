import React from 'react';
import './App.css';
import Board from './Board';

function calculateWinner(squares, i) {
  let count1 = 0;
  let count2 = 0;
  let chan1 = 0;
  let chan2 = 0;
  const hang = parseInt(i / 20, 10);
  let cot = i % 20;
  let line = [i];

  // Kiểm tra ngang
  for (let temp = cot - 1; temp >= 0; temp -= 1) {
    if (squares[hang * 20 + temp] === squares[i]) {
      line.push(hang * 20 + temp);
      count1 += 1;
    } else if (squares[hang * 20 + temp] != null) {
      chan1 = 1;
      break;
    } else {
      break;
    }
  }

  for (let temp = cot + 1; temp <= 20; temp += 1) {
    if (squares[hang * 20 + temp] === squares[i]) {
      line.push(hang * 20 + temp);
      count2 += 1;
    } else if (squares[hang * 20 + temp] != null) {
      chan2 = 1;
      break;
    } else {
      break;
    }
  }

  if (count1 + count2 >= 4 && (chan1 !== 1 || chan2 !== 1)) {
    return { player: squares[i], line };
  }

  // Kiểm tra hàng dọc
  count1 = 0;
  count2 = 0;
  chan1 = 0;
  chan2 = 0;
  line = [i];

  for (let temp = hang - 1; temp >= 0; temp -= 1) {
    if (squares[temp * 20 + cot] === squares[i]) {
      line.push(temp * 20 + cot);
      count1 += 1;
    } else if (squares[temp * 20 + cot] != null) {
      chan1 = 1;
      break;
    } else {
      break;
    }
  }

  for (let temp = hang + 1; temp <= 20; temp += 1) {
    if (squares[temp * 20 + cot] === squares[i]) {
      line.push(temp * 20 + cot);
      count2 += 1;
    } else if (squares[temp * 20 + cot] != null) {
      chan2 = 1;
      break;
    } else {
      break;
    }
  }

  if (count1 + count2 >= 4 && (chan1 !== 1 || chan2 !== 1)) {
    return { player: squares[i], line };
  }

  // Kiểm tra hàng chéo trái trên phải dưới
  count1 = 0;
  count2 = 0;
  chan1 = 0;
  chan2 = 0;
  line = [i];

  for (let temp = hang - 1; temp >= 0; temp -= 1) {
    cot -= 1;
    if (squares[temp * 20 + cot] === squares[i]) {
      line.push(temp * 20 + cot);
      count1 += 1;
    } else if (squares[temp * 20 + cot] != null) {
      chan1 = 1;
      cot = i % 20;
      break;
    } else {
      cot = i % 20;
      break;
    }
  }

  for (let temp = hang + 1; temp <= 20; temp += 1) {
    cot += 1;
    if (squares[temp * 20 + cot] === squares[i]) {
      line.push(temp * 20 + cot);
      count2 += 1;
    } else if (squares[temp * 20 + cot] != null) {
      chan2 = 1;
      cot = i % 20;
      break;
    } else {
      cot = i % 20;
      break;
    }
  }

  if (count1 + count2 >= 4 && (chan1 !== 1 || chan2 !== 1)) {
    return { player: squares[i], line };
  }

  // Kiểm tra hàng chéo trái dưới phải trên
  count1 = 0;
  count2 = 0;
  chan1 = 0;
  chan2 = 0;
  line = [i];

  for (let temp = hang - 1; temp >= 0; temp -= 1) {
    cot += 1;
    if (squares[temp * 20 + cot] === squares[i]) {
      line.push(temp * 20 + cot);
      count1 += 1;
    } else if (squares[temp * 20 + cot] != null) {
      chan1 = 1;
      cot = i % 20;
      break;
    } else {
      cot = i % 20;
      break;
    }
  }

  for (let temp = hang + 1; temp <= 20; temp += 1) {
    cot -= 1;
    if (squares[temp * 20 + cot] === squares[i]) {
      line.push(temp * 20 + cot);
      count2 += 1;
    } else if (squares[temp * 20 + cot] != null) {
      chan2 = 1;
      cot = i % 20;
      break;
    } else {
      cot = i % 20;
      break;
    }
  }

  if (count1 + count2 >= 4 && (chan1 !== 1 || chan2 !== 1)) {
    return { player: squares[i], line };
  }

  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(400).fill(null),
          location: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      win: null,
      isAscending: true
    };
  }

  handleClick(i) {
    const { history, stepNumber, win, xIsNext } = this.state;
    const history1 = history.slice(0, stepNumber + 1);
    const current = history1[history1.length - 1];
    const squares = current.squares.slice();

    if (win || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: history1.concat([
        {
          squares: squares.slice(),
          location: i
        }
      ]),
      stepNumber: history1.length,
      xIsNext: !xIsNext
    });

    const iswin = calculateWinner(squares, i);

    if (iswin) {
      this.setState({
        win: iswin
      });
    }
  }

  jumpTo(step) {
    const { stepNumber } = this.state;
    if (step !== stepNumber) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
        win: null
      });
      if (step === 0) {
        this.setState({
          win: null
        });
      }
    }
  }

  sortHistory() {
    const { isAscending } = this.state;
    this.setState({
      isAscending: !isAscending
    });
  }

  render() {
    const { history, stepNumber, win, xIsNext, isAscending } = this.state;
    const current = history[stepNumber];

    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move} @ [${history[move].location % 20}] [${parseInt(
            history[move].location / 20,
            10
          )}]`
        : 'Go to game start';
      return (
        <li key={move.Array}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {move === stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (win) {
      status = `Winner: ${!xIsNext ? 'X' : 'O'}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winningSquares={win ? win.line : []}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{isAscending ? moves : moves.reverse()}</ol>
          <button type="button" onClick={() => this.sortHistory()}>
            Sort by: {!isAscending ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
