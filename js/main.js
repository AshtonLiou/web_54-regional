function tgd(hide, show) {
    document.querySelectorAll(hide).forEach(e => e.classList.add("h"))
    document.querySelectorAll(show).forEach(e => e.classList.remove("h"))
}