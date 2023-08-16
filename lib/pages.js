export default class Pages {
  condition = ["●先手", "○後手", "♋ランダム"]
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
  }
  selectPlayer() {
    const Parent = el("div");
    Parent.id = "parent"
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
    Parent.appendChild(div)
    this.body.appendChild(Parent);
    return [document.getElementById("0"),document.getElementById("3")];
  }
  selectCondition(num) {
    document.getElementsByClassName("selector")[0].remove();
    const s = { button: [], p: num }
    const parent = document.getElementById("parent");
    const div = el("div");
    div.id = "Condition"
    div.classList.add("selector");
    const h = el("h2");
    h.textContent = "自分の手番を選択";
    div.appendChild(h)
    for (let i = 0; i < 3; i++) {
      const input = el("input");
      input.type = "button";
      input.value = this.condition[i];
      input.id = i + "";
      s.button.push(input);
      if (i > 0) div.appendChild(el("br"));
      div.appendChild(input);
    }
    parent.appendChild(div);
    this.body.appendChild(parent);
    return s;
  }
  start() {
    document.getElementsByClassName("selector")[0].remove();
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