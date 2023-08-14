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
  put(row, column) {
    this.data[row][column] = this.turn;
  }
  putIf(row, column) {
    //Make judgement whether player can put cell there
    //Return list of flipped cells if the cell were put there
    var results = [];
    if (this.data[row][column] != 0) return results;
    for (const dir of this.dir) {
      const temp = [];
      if (
        !this.inBoard(row + dir[0], column + dir[1]) ||
        this.data[row + dir[0]][column + dir[1]] != this.turn * -1
      )
        continue;
      temp.push([row + dir[0], column + dir[1]]);
      for (var i = 2; true; i++) {
        const pos = [row + dir[0] * i, column + dir[1] * i];
        if (!this.inBoard(pos[0], pos[1])) break;
        const num = this.data[pos[0]][pos[1]];
        if (num == 0) {
          break;
        } else if (num == this.turn * -1) {
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
  canput() {
    const results = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.putIf(i, j).length) results.push([i, j]);
      }
    }
    
    if (!results.length) {
      this.goForward();
      const score = [0,0];
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (this.putIf(i, j).length) results.push([i, j]);
          if (this.data[i][j] == 1) score[0]++;
          else if (this.data[i][j] == -1) score[1]++;
        }
      }
      this.goForward()
      if (!results.length) {
        //Then, game can't head any more
        //Making game's result
        const win = score[0] == score[1] ? 0 : score[0] > score[1] ? 1 : -1;
        this.end = { result: { winP: win, score: score }};
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
  posValue = []
  cpu() {
    const branches = branches(this.data, this.turn * -1);
    return branches[Math.floor(Math.random() * branches.length)];
  }
  value(board, color) {
    let point = 0;
    return point;
  }
  branches(board, color) {
    const results = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] != 0) continue;
        if (preview(i, j, board, color).length) results.push([i, j]);
      }
    }
    return results;
  }
  preview(row, column, board, color) {
    if (board[row][column] != 0) return [];
    const notFlip = true;
    for (const dir of this.dir) {
      const temp = [];
      if (
        !this.inBoard(row + dir[0], column + dir[1]) ||
        board[row + dir[0]][column + dir[1]] != color * -1
      )
        continue;
      temp.push([row + dir[0], column + dir[1]]);
      for (var i = 2; true; i++) {
        const pos = [row + dir[0] * i, column + dir[1] * i];
        if (!this.inBoard(pos[0], pos[1])) break;
        const num = board[pos[0]][pos[1]];
        if (num == 0) {
          break;
        } else if (num == color * -1) {
          temp.push([pos[0], pos[1]]);
        } else {
          temp.map(board[e[0]][e[1]] = color)
          if (notFlip) notFlip = !notFlip
          break;
        }
      }
    }
    if (notFlip) return [];
    board[row][column] = color;
    return board;
  }
}