/*!
* Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/

//
// Main
//
window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav && document.getElementById("sectionLinksGroup")) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sectionLinksGroup',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        let options = {};
        options.html = true;
        return new bootstrap.Popover(popoverTriggerEl, options);
    })

    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl, {})
    })
    /*
    if (!document.cookie.includes("cookieconsent")) {
        document.getElementById("cookieconsent").classList.add("show");
        document.querySelector("#cookieconsent .toast-header button").onclick = () => {
            document.cookie = "cookieconsent=Y;path=/";
        };
    }
    */

});
setTheme(getTheme());

if (document.cookie.includes("primaryColor=")) {
    let start = document.cookie.indexOf("primaryColor=") + 13;
    let end = document.cookie.indexOf(";", start);
    if (end === -1) {
        end = undefined;
    }
    let pc = document.cookie.slice(start, end).split("(")[1].split(")")[0].split(",");
    setPrimaryColor(pc[0].trim(), pc[1].trim(), pc[2].trim(), false);
}

//let root = document.querySelector(":root");
//if (root.getAttribute("primaryColor") != "") {
//    let pc = root.getAttribute("primaryColor").split("(")[1].split(")")[0].split(",");
//    setPrimaryColor(pc[0], pc[1], pc[2], false);
//}

//if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register("/serviceworker.js");
//}



//
// Function Definitions
// 

function setTheme(theme) {
    let oldV = getComputedStyle(document.documentElement).getPropertyValue("--bs-primary-default").replaceAll(" ", "");
    document.cookie = "theme=" + theme + ";path=/";
    document.querySelector(":root").setAttribute("theme", theme);
    let newV = getComputedStyle(document.documentElement).getPropertyValue("--bs-primary-default").replaceAll(" ", "");
    let v = getComputedStyle(document.documentElement).getPropertyValue("--bs-primary").replaceAll(" ", "");
    if (v == oldV) {
        document.getElementById("primaryColorInput").value = newV;
        setPrimaryColorHex(newV, false);
    }
}
function getTheme() {
    if (document.querySelector(':root[theme="dark"]')) {
        return "dark";
    } else if (document.querySelector(':root[theme="light"]')) {
        return "light";
    } else if (window.matchMedia("(prefers-color-theme: dark)").matches) {
        return "dark";
    } else {
        return "light";
    }
}
function toggleTheme() {
    theme = getTheme();
    if (theme === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}

function createSecondary(x, amount, threshold) {
    let midpoint = (x + threshold) / 2;
    if (x < threshold) {
        return x + (midpoint * amount);
    } else {
        return x - (midpoint * amount);
    }
}

function createSecondaryColor(r, g, b, amount, threshold) {
    return [
        createSecondary(r, amount, threshold),
        createSecondary(g, amount, threshold),
        createSecondary(b, amount, threshold)
    ];
}

function componentToHex(c) {
    let h = c.toString(16);
    return h.length == 1 ? "0" + h : h;
}

function setPrimaryColor(r, g, b, save) {
    r = +r;
    g = +g; // Ensure they're numbers, not strings
    b = +b;
    let rootObject = document.querySelector(":root");
    let colorInput = document.querySelector("#primaryColorInput");
    let combine = (rx, gx, bx) => "" + rx + ", " + gx + ", " + bx;
    let rgb = combine(r, g, b);
    let rgb2 = createSecondaryColor(r, g, b, 0.2, 80);
    let r2 = rgb2[0]; let g2 = rgb2[1]; let b2 = rgb2[2];
    rgb2 = combine(r2, g2, b2);
    let rgb3 = createSecondaryColor(r, g, b, 0.3, 80);
    let r3 = rgb3[0]; let g3 = rgb3[1]; let b3 = rgb3[2];
    rgb3 = combine(r3, g3, b3);
    rootObject.style.setProperty("--bs-primary-rgb", rgb);
    rootObject.style.setProperty("--bs-primary", "rgb(" + rgb + ")");
    rootObject.style.setProperty("--bs-primary-2", "rgb(" + rgb2 + ")");
    rootObject.style.setProperty("--bs-primary-3", "rgb(" + rgb3 + ")");
    rootObject.setAttribute("primarycolor", "rgb(" + rgb + ")");
    colorInput.value = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    if (save === undefined || save === true) {
        document.cookie = "primaryColor=rgb(" + r + "," + g + "," + b + ");path=/";
    }
}
function setPrimaryColorHex(hex, save) {
    let rx = parseInt("0x" + hex.slice(1,3));
    let gx = parseInt("0x" + hex.slice(3,5));
    let bx = parseInt("0x" + hex.slice(5,7));
    setPrimaryColor(rx, gx, bx, save);
}
function resetPrimaryColor() {
    let primary = getComputedStyle(document.documentElement).getPropertyValue("--bs-primary-default").replaceAll(" ", "");
    setPrimaryColorHex(primary);
}

function changePrimary(input) {
    setPrimaryColorHex(input.value);
}

var afterPrintTheme = null;
addEventListener("beforeprint", (event) => {
    theme = getTheme();
    if (theme === "dark") {
        afterPrintTheme = "dark";
        setTheme("light");
    } else {
        afterPrintTheme = null;
    }
});
addEventListener("afterprint", (event) => {
    if (afterPrintTheme !== null) {
        setTheme(afterPrintTheme);
    }
});

