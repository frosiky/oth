export default class othello {
  data = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, -1, 0, 0, 0],
    [0, 0, 0, -1, 1, 0, 0, 0],
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
  constructor(condition = 1) {
    this.player =
      Math.abs(condition) == 1
        ? condition
        : Math.floor(Math.random() * 2) * 2 - 1;
  }
  put(row, column) {
    this.data[row][column] = this.turn;
  }
  putIf(row, column) {
    console.log("putIf: ", row, "-", column);
    //駒を設置可能か
    //設置した場合に裏返されるマスのリストを返す
    var results = [];
    if (this.data[row][column] != 0) return results;
    for (const dir of this.dir) {
      const temp = [];
      console.log(
        "nearby: ",
        !(
          !this.inBoard(row + dir[0], column + dir[1]) ||
          this.data[row + dir[0]][column + dir[1]] != this.turn * -1
        )
      );
      if (
        !this.inBoard(row + dir[0], column + dir[1]) ||
        this.data[row + dir[0]][column + dir[1]] != this.turn * -1
      )
        continue;
      temp.push([row + dir[0], column + dir[1]]);
      for (var i = 2; true; i++) {
        const pos = [row + dir[0] * i, column + dir[1] * i];
        console.log("next: ");
        if (!this.inBoard(pos[0], pos[1])) break;
        const num = this.data[pos[0]][pos[1]];
        if (num == 0) {
          console.log(false);
          break;
        } else if (num == this.turn * -1) {
          temp.push([pos[0], pos[1]]);
          console.log(">>>");
        } else {
          console.log(true, "pos: ", temp);
          results = results.concat(temp);
          break;
        }
      }
    }
    //裏返される箇所が有ったか
    console.log("results: ", results);
    if (results.length == 0) return results;
    //設置される駒の位置
    results.push([row, column]);
    console.log("and base");
    return results;
  }
  canput() {
    for (let i = 0; i < this.data.length) {
      for (let j = 0; j < this.data[i].length) {
        if (putIf(i, j).length) continue;
        return true;
      }
    }
    return false;
  }
  goForward() {
    this.turn *= -1;
  }
}
