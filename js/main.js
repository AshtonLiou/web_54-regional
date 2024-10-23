// toggle display

function toggleDisplay(hide, show) {
    document.querySelectorAll(hide).forEach(e => e.classList.add("hidden"))
    document.querySelectorAll(show).forEach(e => e.classList.remove("hidden"))
}

document.addEventListener("mousemove", (event) => {
    document.getElementById("cursor").style.transform = `translate(${event.clientX - cursor.offsetWidth / 2}px, ${event.clientY - cursor.offsetHeight / 2}px)`
})
