export default class Pages {
  condition = ["●先手", "○後手", "♋ランダム"]
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
  }
  selectPlayer() {
    const parent = el("div");
    parent.id = "parent"
    const div = el("div");
    div.id = "Player";
    div.classList.add("selector");
    const button = [
      el("input"),
      el("input")
    ];
    button[0].id = "0";
    button[0].value = "1P (1 VS CPU)";
    button[1].id = "3";
    button[1].value = "2P (1 VS 1)";
    let i = 0;
    button.map((e) => {
      e.type = "button";
      div.appendChild(e);
      if (i == 0) {
        div.appendChild(el("br"))};
      i++;
    });
    parent.appendChild(div)
    this.body.appendChild(parent);
    return [document.getElementById("0"),document.getElementById("3")];
  }
  selectCondition() {
    document.getElementById("parent").remove();
    const s = []
    const parent = el("div");
    const div = el("div");
    parent.id = "parent";
    div.id = "Condition";
    div.classList.add("selector");
    const h = el("h2");
    h.textContent = "自分の手番を選択";
    div.appendChild(h);
    const turn = ["1", "-1", "0"];
    for (let i = 0; i < 3; i++) {
      const input = el("input");
      input.type = "button";
      input.value = this.condition[i];
      input.id = turn[i];
      s.push(input);
      if (i > 0) div.appendChild(el("br"));
      div.appendChild(input);
    }
    parent.appendChild(div);
    this.body.appendChild(parent);
    return s;
  }
  start() {
    document.getElementById("parent").remove();
    const div = el("div");
    div.id = "interface";
    const table = el("table");
    const matrix = []
    for (let i = 0; i < 8; i++) {
      const line = [];
      const tr = el("tr");
      for (let j = 0; j < 8; j++) {
        const td = el("td");
        td.id = i + "-" + j;
        line.push(td);
        tr.appendChild(td)
      }
      matrix.push(line)
      table.appendChild(tr)
    }
    const h = [el("h3"), el("h3"), el("h3")]
    const h_id = ["score","status","pass"]
    for (let i = 0; i < h.length; i++) {
      h[i].id = h_id[i]
      if (i == 1) {
        div.appendChild(table)
      }
      div.appendChild(h[i])
    }
    this.body.appendChild(div)
    return matrix;
  }
}
function el(tagName) {
  return document.createElement(tagName);
}