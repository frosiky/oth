export default class Pages {
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
  }
  select() {
    const div = el("div");
    div.id = "selector";
    const button = [
      el("input"),
      el("input")
    ];
    button[0].id = "0";
    button[0].value = "1P (1 VS CPU)";
    button[1].id = "1";
    button[1].value = "2P (1 VS 1)";
    let i = 0;
    button.map((e) => {
      e.type = "button";
      div.appendChild(e);
      if (i == 0) {
        div.appendChild(el("br"))};
      i++;
    });
    this.body.appendChild(div);
    return [document.getElementById("0"),document.getElementById("1")];
  }
  start(condition) {
    document.getElementById("selector").remove();
    const div = el("div");
    div.id = "interface";
    const table = el("table");
    for (let i = 0; i < 8; i++) {
      const row = table.insertRow(-1);
      for (let j = 0; j < 8; j++) {
        const cell = row.insertCell(-1);
        cell.id = i + "-" + j;
        cell.onclick = "clicked";
      }
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
  }
}
function el(tagName) {
  return document.createElement(tagName);
}