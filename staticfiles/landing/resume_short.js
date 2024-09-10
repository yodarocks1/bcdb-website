function updateRatio(target) {
    let ratio = target.getAttribute("ratio");
    if (ratio == 0) {
        target.style.height = "0";
    } else {
        target.style.height = target.getBoundingClientRect().width * ratio + "px";
    }
}

window.onload = () => {
    let ratioed = document.querySelectorAll("[ratio]");
    for (let ratio of ratioed) {
        if (ratio.getAttribute("ratio") === '') {
            let rect = ratio.getBoundingClientRect();
            ratio.setAttribute("ratio", rect.height / rect.width);
        }
    }

    for (let ratio of ratioed) {
        updateRatio(ratio);
    }
    window.addEventListener("resize", () => {
        for (let ratio of ratioed) {
            updateRatio(ratio);
        }
    });
}


let new_projects = document.createElement("div");
for (let proj of document.querySelectorAll("#projects > section.project")) {
    let new_project = document.createElement("div");
    new_project.setAttribute("class", "w-100 mb-5");
    new_project.setAttribute("data-experience-type", "project");
    new_projects.append(new_project);

    let header = document.createElement("div");
    header.setAttribute("class", "d-flex flex-row justify-content-between");
    new_project.append(header);

    let headerLeft = document.createElement("div");
    headerLeft.setAttribute("class", "flex-grow-1");
    header.append(headerLeft);
    let title = document.createElement("h3");
    title.setAttribute("class", "mb-0");
    title.innerHTML = proj.querySelector(".resume-section-content > h2:first-child").innerHTML;
    headerLeft.append(title);
    let subtitle = document.createElement("div");
    subtitle.setAttribute("class", "subheading");
    headerLeft.append(subtitle);
    let githubLink = document.createElement("a");
    githubLink.setAttribute("class", "invisible-link");
    for (let button of proj.querySelectorAll(".project-buttons a")) {
        if (button.textContent == " GitHub") {
            githubLink.href = button.href;
            let i = button.children[0];
            i.setAttribute("width", 16);
            githubLink.append(i);
            githubLink.append(" " + button.href.replace("https://", "").replace("http://", ""));
        }
    }
    subtitle.append(githubLink);

    let headerRight = document.createElement("div");
    headerRight.setAttribute("class", "flex-shrink-0");
    headerRight.style.textAlign = "right";
    header.append(headerRight);
    let timeSpan = document.createElement("span");
    timeSpan.setAttribute("class", "text-primary fw-bold")
    let oldTimeSpan = proj.querySelector(".project-timespan");
    timeSpan.textContent = oldTimeSpan ? oldTimeSpan.textContent : "Time span here";
    headerRight.append(timeSpan);
    headerRight.append(document.createElement("br"));
    let languages = document.createElement("span");
    let icons = title.querySelector("ul");
    if (icons) {
        icons.setAttribute("style", "font-size: 100%; vertical-align: top; margin: 0; padding-left: 0.5em;");
        icons.classList.remove("print-listify");
        let django = icons.querySelector('[data-bs-original-title="Django"]');
        if (django) django.style.fontSize = "90%";
        else {
            django = icons.querySelector('[title="Django"]');
            if (django) django.style.fontSize = "90%";
        }
        languages.append(icons);
    }
    headerRight.append(languages);

    let content = document.createElement("div");
    content.setAttribute("class", "very-succinct-off");
    let first = true;
    let take = []
    for (let child of proj.children[0].children) {
        if (first) {
            first = false;
            continue;
        } else if (child.classList.contains("project-buttons")) {
            continue;
        }
        take.push(child);
    }
    for (let child of take) content.append(child);
    for (let extra of content.querySelectorAll(".extra")) {
        extra.remove();
    }
    new_project.append(content);
}
document.getElementById("projects").innerHTML = new_projects.innerHTML;


function update() {
    let rt = document.getElementById("resume-table");
    for (let f of rt.querySelectorAll("[from]")) {
        let selector = f.getAttribute("from");
        try {
            f.innerHTML = document.querySelector(selector).innerHTML;
        } catch (error) {
            console.error(f);
            console.error(selector);
            console.error(error);
        }
    }
    for (let abbr of document.getElementById("resume-table").querySelectorAll("abbr[title]")) {
        abbr.textContent = abbr.getAttribute("title");
        abbr.removeAttribute("title");
        abbr.style.fontSize = 'smaller';
    }
    for (let rem of document.querySelectorAll('#rt-history > :not([data-experience-type="employment"])')) rem.remove();
    for (let rem of document.querySelectorAll('#rt-experience > [data-experience-type="employment"]')) rem.remove();
    for (let div of document.querySelectorAll("#rt-education > div:not(:first-child)")) div.classList.add("subselect");
}

var selector = {
    selectable: ["P", "SPAN", "LI", "H1", "H2", "H4", "H5", "H6"],
    editableSelectors: ["ul:not(.dev-icons)", "p", "span:not(.fa-layers-text):not(.fa-layers)", "h3", "div.subheading", ".subselect", "th"],
    selectionModes: {
        div: function handleDivSelectMode(parentEl, el) {
            while (el.parentElement && el.parentElement !== parentEl) el = el.parentElement;
            if (el.tagName === "DIV") selector.select(el);
        }, 
        element: function handleElementSelectMode(parentEl, el) {
            if (selector.selectable.includes(el.tagName)) {
                if (el.parentElement.childElementCount === 1) selector.select(el.parentElement);
                else selector.select(el);
            }
        },
        table: function handleTableSelectMode(parentEl, el) {
            if (el !== parentEl) {
                while (el.parentElement && el.tagName !== "TABLE" && el.parentElement !== parentEl) el = el.parentElement;
                if (el.tagName === "TABLE") selector.select(el);
            }
        },
        row: function handleRowSelectMode(parentEl, el) {
            while (el.parentElement && el !== parentEl && !(el.parentElement.tagName === "TBODY" && el.parentElement.parentElement.id === "resume-table") && el.parentElement.id !== "resume-table") 
                el = el.parentElement;
            if (el.parentElement && el.tagName === "TR") selector.select(el);
        },
        deselect: function handleDeselectMode(parentEl, el) {
            while (el.parentElement && !el.classList.contains("selected")) el = el.parentElement;
            if (el.classList.contains("selected")) selector.deselect(el);
        },
        none: function handleNoneMode(parentEl, el) {}
    },
    isMultiSelect: true,
    isEditMode: true,
    selectionMode: "div",
    selected: [],
    select: function select(el) {
        if (el.classList.contains("selected")) {
            this.deselect(el);
        } else {
            if (!this.isMultiSelect) {
                for (let selected of this.selected) this.deselect(selected);
            } else {
                for (let subselected of el.querySelectorAll(".selected")) this.deselect(subselected);
            }
            this.selected.push(el);
            el.classList.add("selected");
        }
        this._onSelectionChange();
    },
    deselect: function deselect(el, updateSelection=true) {
        let idx = this.selected.indexOf(el);
        if (idx != -1) {
            this.selected.splice(idx,1);
            el.classList.remove("selected");
        }
        if (updateSelection) this._onSelectionChange();
    },
    deselectAll: function deselectAll() {
        let selected = this.selected.slice();
        for (let el of selected) {
            this.deselect(el, false);
        }
        this._onSelectionChange();
        return selected;
    },
    _onSelectionChange: function _onSelectionChange() {
        if (this.selected.length === 1 && (this.selected[0].tagName === "TABLE")) {
            document.getElementById("edit-margins").style.display = null;
            document.getElementById("edit-margin-top").value = this.selected[0].style.marginTop.replace("em", "");
            document.getElementById("edit-margin-left").value = this.selected[0].style.marginLeft.replace("em", "");
            document.getElementById("edit-margin-right").value = this.selected[0].style.marginRight.replace("em", "");
            document.getElementById("edit-margin-bottom").value = this.selected[0].style.marginBottom.replace("em", "");
        } else {
            document.getElementById("edit-margins").style.display = "none";
        }
        if (this.selected.length === 0) {
            document.getElementById("delete-button").setAttribute("disabled", "");
            document.getElementById("move-button").classList.add("disabled");
            document.getElementById("move-button-up").removeAttribute("disabled");
            document.getElementById("move-button-down").removeAttribute("disabled");
        } else {
            document.getElementById("delete-button").removeAttribute("disabled");
            document.getElementById("move-button").classList.remove("disabled");
            if (this.canMove(this.selected, "up"))
                document.getElementById("move-button-up").removeAttribute("disabled");
            else
                document.getElementById("move-button-up").setAttribute("disabled", "");
            if (this.canMove(this.selected, "down"))
                document.getElementById("move-button-down").removeAttribute("disabled");
            else
                document.getElementById("move-button-down").setAttribute("disabled", "");
        }
    },
    toggleMultiSelect: function toggleMultiSelect() {
        this.isMultiSelect = !this.isMultiSelect;
        document.getElementById("multi-select-value").textContent = (this.isMultiSelect ? "✓" : "𐄂");
        document.getElementById("multi-select-value").classList.add(this.isMultiSelect ? "btn-success" : "btn-danger");
        document.getElementById("multi-select-value").classList.remove(this.isMultiSelect ? "btn-danger" : "btn-success");
        if (this.selected.length > 1) {
            for (let selected of this.selected.slice(0, this.selected.length - 1)) {
                this.deselect(selected, false);
            }
            this._onSelectionChange();
        }
    },
    toggleEditMode: function toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        this._updateEditMode();
    },
    setEditMode: function setEditMode(v) {
        this.isEditMode = v;
        this._updateEditMode();
    },
    _updateEditMode: function _updateEditMode() {
        if (this.isEditMode) this.setMode("none");
        document.getElementById("edit-mode-value").textContent = (this.isEditMode ? "✓" : "𐄂");
        document.getElementById("edit-mode-value").classList.add(this.isEditMode ? "btn-success" : "btn-danger");
        document.getElementById("edit-mode-value").classList.remove(this.isEditMode ? "btn-danger" : "btn-success");
        for (let selector of this.editableSelectors) {
            for (let el of document.querySelectorAll(selector)) {
                if (this.isEditMode) el.setAttribute("contenteditable", "");
                else el.removeAttribute("contenteditable");
            }
        }
    },
    makeSelectable: function makeSelectable(parentEl, modes=["*"]) {
        if (modes.includes("*")) {
            parentEl.addEventListener('click', (e) => {
                this.selectionModes[this.selectionMode](parentEl, e.target);
            });
        } else {
            parentEl.addEventListener('click', (e) => {
                if (modes.includes(this.selectionMode)) {
                    this.selectionModes[this.selectionMode](parentEl, e.target);
                }
            });
        }
    },
    makeSelectableWhole: function makeSelectableWhole(el, mode) {
        el.setAttribute("selectable", mode);
        el.addEventListener('click', (e) => {
            if (this.selectionMode === mode) {
                if (el.classList.contains("selected")) this.deselect(el);
                else this.select(el);
                e.preventDefault();
            } else if (this.selectionMode === "element" && mode === "div") {
                let v = e.target;
                while (v.parentElement && v.parentElement !== el && !v.classList.contains("subselect")) v = v.parentElement;
                if (v.classList.contains("subselect")) this.select(v);
            }
        });
    },
    switchMode: function switchMode() {
        let keys = Object.keys(this.selectionModes)
        let idx = keys.indexOf(this.selectionMode) + 1;
        if (idx === keys.length) idx = 0;
        this.setMode(keys[idx]);
    },
    setMode: function setMode(mode) {
        this.selectionMode = mode;
        let visible = document.getElementById("selection-mode");
        visible.textContent = this.selectionMode;
        visible.setAttribute("data-mode", this.selectionMode);
        document.getElementById("resume-table").setAttribute("data-selection-mode", this.selectionMode);
        if (mode === "none") this.deselectAll();
        else this.setEditMode(false);
    },
    nextTableMode: function nextTableMode() {
        if (this.selectionMode === "table") this.setMode("row");
        else this.setMode("table");
    },
    deleteSelected: function deleteSelected() {
        for (let el of this.deselectAll()) {
            el.remove();
        }
    },
    updateMargins: function updateMargins() {
        this.selected[0].style.marginTop = document.getElementById("edit-margin-top").value + "em";
        this.selected[0].style.marginBottom = document.getElementById("edit-margin-bottom").value + "em";
        this.selected[0].style.marginLeft = document.getElementById("edit-margin-left").value + "em";
        this.selected[0].style.marginRight = document.getElementById("edit-margin-right").value + "em";
    },
    canMove: function canMove(elements, direction) {
        for (let el of elements) {
            if (this._canMoveOne(el, direction)) return true;
        }
    },
    _canMoveOne: function _canMoveOne(el, direction) {
        if (direction === "up") {
            let prev = el.previousElementSibling;
            while (prev !== null && prev.classList.contains("selected")) prev = prev.previousElementSibling;
            return prev !== null;
        } else if (direction === "down") {
            let next = el.nextElementSibling;
            while (next !== null && next.classList.contains("selected")) next = next.nextElementSibling;
            return next !== null;
        }
    },
    _move: function _move(elements, direction) {
        let skip = []
        if (direction === "up") {
            for (let el of elements) {
                let prev = el.previousElementSibling;
                if (prev !== null) {
                    if (prev.classList.contains("selected")) {
                        while (prev !== null && prev.classList.contains("selected")) prev = prev.previousElementSibling;
                        if (prev !== null) skip.push(el);
                    } else {
                        el.parentElement.insertBefore(el, prev);
                    }
                }
            }
        } else if (direction === "down") {
            for (let el of elements) {
                let next = el.nextElementSibling;
                if (next !== null) {
                    if (next.classList.contains("selected")) {
                        while (next !== null && next.classList.contains("selected")) next = next.nextElementSibling;
                        if (next !== null) skip.push(el);
                    } else {
                        let nexxt = next.nextElementSibling;
                        if (nexxt === null) el.parentElement.appendChild(el);
                        else el.parentElement.insertBefore(el, nexxt);
                    }
                }
            }
        }

        if (skip.length > 0) this._move(skip, direction);
    },
    moveSelected: function moveSelected(direction) {
        this._move(this.selected, direction);
        this._onSelectionChange();
    },
};
for (let jobsSection of document.querySelectorAll(".rt-jobs")) {
    selector.makeSelectable(jobsSection);
}
for (let el of document.querySelectorAll("[selectable]")) {
    selector.makeSelectableWhole(el, mode=el.getAttribute("selectable"));
}
selector.makeSelectable(document.getElementById("resume-table"), modes=["table", "row", "deselect"]);
selector.setMode("none");
selector.toggleMultiSelect();
selector.toggleEditMode();
selector._onSelectionChange();

window.addEventListener('load', () => {
    document.querySelector("#experience h2 button").click();
    document.getElementById("succinctSwitch").click();
    setTimeout(() => {
        update();
    }, 500);
});
window.addEventListener('beforeprint', () => selector.setMode("none"));

let ro = new ResizeObserver(entries => {
    let rt = entries[0];
    let ch = document.getElementById("current-height");
    let v = rt.contentRect.height/96;
    let value = Math.floor(v);
    let eighths = Math.ceil((v - value) * 8);
    if (eighths === 0) value += '"';
    else if (eighths === 1) value += ' ⅛"';
    else if (eighths === 2) value += ' ¼"';
    else if (eighths === 3) value += ' ⅜"';
    else if (eighths === 4) value += ' ½"';
    else if (eighths === 5) value += ' ⅝"';
    else if (eighths === 6) value += ' ¾"';
    else if (eighths === 7) value += ' ⅞"';
    else if (eighths === 8) value = (value + 1) + '"';
    ch.textContent = value;
    ch.parentElement.parentElement.style.display = (v === 10.5 ? "none" : null);
    ch.style.color = (v > 10.5 ? "red" : "green")
});
ro.observe(document.getElementById("resume-table"));

let rl = document.getElementById("resume-link");
let printableUl = document.createElement("ul");
let printableLi = document.createElement("li");
printableLi.classList.add("nav-item")
printableUl.append(printableLi);
let printable = document.createElement("a");
printable.href = "#";
printable.id = "resume-printable-link";
printable.classList.add("nav-link");
printable.classList.add("active");
printableLi.append(printable);
rl.parentElement.append(printableUl);

let deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener('click', e => {
    let rect = e.target.getBoundingClientRect();
    if (e.clientX < rect.x || e.clientX > rect.x + rect.width || e.clientY < rect.y || e.clientY > rect.y + rect.height) {
        selector.deleteSelected();
    }
});

