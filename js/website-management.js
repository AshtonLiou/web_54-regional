document.addEventListener("DOMContentLoaded", () => {
    reGenerate()
})
const reGenerate = () => {
    fetch("./api/generate-captcha.php")
    .then(r => document.getElementById("ci").src = `./img/captcha-image.png?${new Date().getTime()}`)
}