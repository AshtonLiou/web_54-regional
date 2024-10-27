document.addEventListener("DOMContentLoaded", () => {
    rg()
})
const rg = () => {
    fetch("./api/generate-captcha.php")
        .then(r => document.getElementById("ci").src = `./img/captcha-image.png?${new Date().getTime()}`)
}
const ls = (e) => {
    e.preventDefault()
    fetch(`./api/get.php?m=ls&${new URLSearchParams(new FormData(e.target))}`)
        .then(r => r.text())
        .then(text => {
            if (text == 1) {

            } else {
                alert(text)
            }
        })
}