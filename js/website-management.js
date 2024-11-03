document.addEventListener("DOMContentLoaded", () => {
    localStorage.getItem("isLogin") == "true" && tgd(".prl", ".pol")
    rg()
})
const rg = () => {
    fetch("./api/generate-captcha.php")
        .then(r => document.getElementById("ci").src = `./img/captcha-image.png?${new Date().getTime()}`)
}
const vl = (e) => {
    e.preventDefault()
    fetch(`./api/get.php?m=vl&${new URLSearchParams(new FormData(e.target))}`)
        .then(r => r.text())
        .then(text => {
            if (text != 1) return alert(text)
            e.target.reset()
            rg()
            tgd('.fv', ".sv")
            gg()
        })
}
const logout = () => {
    localStorage.removeItem("isLogin")
    tgd(".pol", ".prl.fv")
}
const gg = () => {
    [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - .5).forEach(n => {
        let c = document.createElement("div")
        c.classList.add("cell")
        c.draggable = true
        c.textContent = n
        c.dataset.value = n
        c.ondragstart = () => drag(event)
        c.ondragend = () => event.target.classList.remove("dragging")
        c.ondragover = () => allowDrop(event)
        c.ondragleave = () => event.target.classList.remove("dragover")
        c.ondrop = () => drop(event)
        document.getElementById("svg").appendChild(c)
    })
}
let d
const drag = (e) => {
    d = e.target
    d.classList.add("dragging")
    e.dataTransfer.setData("text/plain", d.textContent)
}
const allowDrop = (e) => {
    e.preventDefault()
    if (d != e.target) e.target.classList.add("dragover")
}
const drop = (e) => {
    e.preventDefault()
    if (d == e.target) return
    d.textContent = e.target.textContent
    e.target.textContent = e.dataTransfer.getData("text/plain")
    e.target.classList.remove("dragover")
    e.target.classList.add("changing")
    d.classList.add("changing")
    setTimeout(() => {
        e.target.classList.remove("changing")
        d.classList.remove("changing")
    }, 200)
}
const vsv = () => {
    if (JSON.stringify([...document.querySelectorAll(".cell")].map(cell => Number(cell.textContent))) == JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        localStorage.setItem("isLogin", "true")
        tgd(".prl", ".pol")
        alert("登入成功")
        document.getElementById("svg").replaceChildren()
    } else {
        alert("順序錯誤，請重新排列！")
    }
}