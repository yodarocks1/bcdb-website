function setupBrickwork(brickwork) {
    brickwork.style.display = "none";
    let loadingAttr = null;
    if (brickwork.hasAttribute("loading")) {
        loadingAttr = brickwork.getAttribute("loading");
    }
    let brickworkItems = Array(brickwork.childElementCount);
    for (let i = 0; i < brickwork.childElementCount; i++) {
        brickworkItems[i] = brickwork.children[i];
    }
    let bricks = [];
    for (let brickworkItem of brickworkItems) {
        brickworkItem.remove();
        bricks.push(createBrick(brickworkItem, loadingAttr));
    }
    let rows = [];
    let widths = [3, 4];
    if (brickwork.hasAttribute("widths")) {
        widths = brickwork.getAttribute("widths").split(" ");
    }
    let widthIdx = 0;
    let i = 0;
    while (i < bricks.length) {
        let row = createRow();
        for (let j = 0; j < widths[widthIdx]; j++) {
            if (i < bricks.length) {
                row.appendChild(bricks[i]);
                i++;
            } else {
                row.appendChild(createEmptyBrick());
            }
        }
        rows.push(row);
        brickwork.appendChild(row);
        widthIdx++;
        if (widthIdx >= widths.length) {
            widthIdx = 0;
        }
    }
    brickwork.style.display = null;
}
function createRow() {
    let div = document.createElement("div");
    div.classList.add("brickwork-row");
    return div;
}
function createBrick(contents, loading=null) {
    let div = document.createElement("div");
    div.classList.add("brickwork-brick");
    if (contents === null) {
        contents = document.createElement("div");
        contents.classList.add("cover-box");
        div.appendChild(contents);
    } else if (contents.nodeName == "IMG") {
        if (loading !== null) {
            contents.setAttribute("loading", loading);
        }
        let coverBox = document.createElement("div");
        coverBox.classList.add("cover-box");
        coverBox.appendChild(contents);
        div.appendChild(coverBox);
    } else {
      let coverBox = document.createElement("div");
      coverBox.classList.add("cover-box");
      coverBox.appendChild(contents);
      div.appendChild(coverBox);
    }
    return div;
}
function createEmptyBrick() {
    return createBrick(null);
}

let brickworks = document.querySelectorAll(".brickwork.brickwork-auto");
for (let brickwork of brickworks) {
    setupBrickwork(brickwork);
}

