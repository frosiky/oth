String.prototype.complete = function (len) {
  let str = this;
  for (let i = 0; i < len - this.length; i++) {
    str = "0" + str;
  }
  return str;
}
export default class Othello {
  data = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, -1, 1, 0, 0, 0],
    [0, 0, 0, 1, -1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  turn = 1;
  inBoard = (row, column) => 0 <= row && row <= 7 && 0 <= column && column <= 7;
  dir = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  isCPTurn = () => this.turn == this.CP;
  constructor(num) {
    let i, j;
    if (num != 3) this.CP =
      num == 0
        ? Math.floor(Math.random() * 2) * 2 - 1
        : num * -1;
    if (this.CP) {
      this.cache = {
        line: [],
        value: [],
      }
      for (i = 0; i < 3 ** 8; i++) {
        //not yet
        break;
        const line = i.toString(3).complete(8).split("");
        this.cache.line.push(line)
      }
    }
  }
  put(row, column) {
    this.data[row][column] = this.turn;
  }
  putIf(row, column, color = this.turn) {
    //Make judgement whether player can put cell there
    //Return list of flipped cells if the cell were put there
    var results = [];
    if (this.data[row][column] != 0) return results;
    for (const dir of this.dir) {
      const temp = [];
      if (
        !this.inBoard(row + dir[0], column + dir[1]) ||
        this.data[row + dir[0]][column + dir[1]] != color * -1
      )
        continue;
      temp.push([row + dir[0], column + dir[1]]);
      for (var i = 2; true; i++) {
        const pos = [row + dir[0] * i, column + dir[1] * i];
        if (!this.inBoard(pos[0], pos[1])) break;
        const num = this.data[pos[0]][pos[1]];
        if (num == 0) {
          break;
        } else if (num == color * -1) {
          temp.push([pos[0], pos[1]]);
        } else {
          results = results.concat(temp);
          break;
        }
      }
    }
    //An empty list is returned if any cell gonna flipped waren't exist
    if (results.length == 0) return [];
    //Otherwise, cell gonna flipped and the first cell(in addtion) is returned
    results.push([row, column]);
    return results;
  }
  canput(board = this.data, color = this.turn) {
    const results = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.putIf(i, j, color).length) results.push([i, j]);
      }
    }
    if (!results.length) {
      this.goForward();
      const score = [0, 0];
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (this.putIf(i, j, color).length) results.push([i, j]);
          if (board[i][j] == 1) score[0]++;
          else if (board[i][j] == -1) score[1]++;
        }
      }
      this.goForward()
      if (!results.length) {
        //Then, game can't head any more
        //Making game's result
        const win = score[0] == score[1] ? 0 : score[0] > score[1] ? 1 : -1;
        this.end = { result: { winP: win, score: score } };
        this.goForward();
      } else {
        return []
      }
    }
    return results;
  }
  goForward() {
    this.turn *= -1;
  }
  cellValue = [
    [30, -12, 0, -1, -1, 0, -12, 30,],
    [-12, -20, -3, -3, -3, -3, -20, -12,],
    [0, -2, 0, -1, -1, 0, -3, -0,],
    [-1, -2, -1, -1, -1, -1, -3, -1,],
    [-1, -2, -1, -1, -1, -1, -3, -1,],
    [0, -2, 0, -1, -1, 0, -3, -0,],
    [-12, -20, -3, -3, -3, -3, -20, -12,],
    [30, -12, 0, -1, -1, 0, -12, 30,],
  ];
  cpu(depth) {
    let high = -Infinity;
    let results = [];
    const choice = this.canput();
    for (const pos of choice) {
      const flipCells = this.putIf(pos[0], pos[1]);
      const board_choice = [];
      for (let i = 0; i < 8; i++) {
        const line_choice = [];
        for (let j = 0; j < 8; j++) {
          if (flipCells.includes([i, j]))
            line_choice.push(this.turn);
          else
            line_choice.push(this.data[i][j]);
        }
        board_choice.push(line_choice);
      }
      const score = this.branch(board_choice, depth - 1, this.turn * -1) * -1;
      if (high < score) {
        high = score;
        results = [pos];
      } else if (high == score) {
        results.push(pos);
      }
    }
    return results[Math.floor(Math.random() * results.length)]
  }
  branch(board, depth, turn, pass = false) {
    if (depth == 0)
      //reaching deepest => return value of this leaf
      return this.evaluate(board, turn);
    let high = -Infinity;
    for (const pos of this.canput(board, turn)) {
      const flipCells = this.putIf(pos[0], pos[1], board, turn);
      const board_branch = [];
      for (let i = 0; i < 8; i++) {
        const line_branch = [];
        for (let j = 0; j < 8; j++) {
          if (flipCells.includes([i, j]))
            line_branch.push(turn);
          else
            line_branch.push(board[i][j]);
        }
        board_branch.push(line_branch);
      }
      //branching deeper
      //in order to find higher point
      high = Math.max(high, this.branch(board_branch, depth - 1, turn * -1) * -1);
      if (high == -Infinity) {
        if (pass) {
          return this.evaluate(board_branch, turn);
        }
        high = Math.max(high, this.branch(board_branch, depth, turn * -1, true) * -1);
      }
    }
    return high;
  }
  evaluate(board, color) {
    let points = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        points += this.cellValue[i][j] * board[i][j] * color;
      }
    }
    return points;
  }
}