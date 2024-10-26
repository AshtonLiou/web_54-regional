function tgd(hide, show) {
    document.querySelectorAll(hide).forEach(e => e.classList.add("hidden"))
    document.querySelectorAll(show).forEach(e => e.classList.remove("hidden"))
}