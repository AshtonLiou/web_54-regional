document.addEventListener("DOMContentLoaded", () => {
    localStorage.getItem("isLogin") == "true" && tgd(".prl", ".pol")
    rg()
    gmd()
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
const cr = (table, cs) => {
    let tr = document.createElement("tr")
    cs.forEach((c) => {
        let td = document.createElement("td")
        switch (c.m) {
            case "header":
                if (c.image !== undefined) {
                    let img = document.createElement("img")
                    img.src = c.image
                    td.appendChild(img)
                }
                let h2 = document.createElement("h2")
                h2.textContent = c.name
                h2.style.position = "absolute"
                h2.style.left = "50%"
                h2.style.width = "calc(300px - 2em)"
                h2.style.padding = "0 1em"
                h2.style.borderRadius = "5px 15px"
                h2.style.boxShadow = "0 0 0 3px #fff, 0 0 0em 6px gray"
                h2.style.color = "#eee"
                h2.style.textAlign = "center"
                h2.style.backgroundColor = "gray"
                h2.style.transform = "translate(-50%, .5em)"
                td.style.width = "334px"
                td.style.transform = "translateY(-3em)"
                td.setAttribute("rowspan", 3)
                td.appendChild(h2)
                break;
            case "active":
                if (c.deleted) {
                    let h2 = document.createElement("h2")
                    h2.textContent = "已刪除"
                    h2.style.color = "red"
                    let ebtn = document.createElement("button")
                    ebtn.classList.add("btng")
                    ebtn.classList.add("btnd")
                    ebtn.style.margin = ".2em"
                    ebtn.textContent = "編輯"
                    let dbtn = document.createElement("button")
                    dbtn.classList.add("btnr")
                    dbtn.style.margin = ".5em .2em"
                    dbtn.textContent = "刪除"
                    dbtn.onclick = () => dm(c.id)
                    let pbtn = document.createElement("button")
                    pbtn.classList.add("btny")
                    pbtn.style.margin = ".2em"
                    if (c.pin) {
                        pbtn.textContent = "取消置頂"
                        pbtn.onclick = () => unpm(c.id)
                    } else {
                        pbtn.textContent = "置頂"
                        pbtn.onclick = () => pm(c.id)
                    }
                    let hbtn = document.createElement("button")
                    hbtn.classList.add("btny")
                    hbtn.style.margin = ".2em"
                    if (c.hide) {
                        hbtn.textContent = "取消隱藏"
                        hbtn.onclick = () => unhm(c.id)
                    } else {
                        hbtn.textContent = "隱藏"
                        hbtn.onclick = () => hm(c.id)
                    }
                    let rbtn = document.createElement("button")
                    rbtn.classList.add("btnmg")
                    rbtn.style.width = "6em"
                    rbtn.style.margin = ".2em"
                    rbtn.textContent = "回應"
                    rbtn.onclick = () => rm(c.id)
                    td.append(h2, ebtn, dbtn, pbtn, hbtn, rbtn)
                } else {
                    let ebtn = document.createElement("button")
                    ebtn.classList.add("btng")
                    ebtn.style.margin = ".2em"
                    ebtn.textContent = "編輯"
                    ebtn.onclick = () => emd(c.id)
                    let dbtn = document.createElement("button")
                    dbtn.classList.add("btnr")
                    dbtn.style.margin = ".2em"
                    dbtn.textContent = "刪除"
                    dbtn.onclick = () => dm(c.id)
                    let pbtn = document.createElement("button")
                    pbtn.classList.add("btny")
                    pbtn.style.margin = ".2em"
                    if (c.pin) {
                        pbtn.textContent = "取消置頂"
                        pbtn.onclick = () => unpm(c.id)
                    } else {
                        pbtn.textContent = "置頂"
                        pbtn.onclick = () => pm(c.id)
                    }
                    let hbtn = document.createElement("button")
                    hbtn.classList.add("btny")
                    hbtn.style.margin = ".2em"
                    if (c.hide) {
                        hbtn.textContent = "取消隱藏"
                        hbtn.onclick = () => unhm(c.id)
                    } else {
                        hbtn.textContent = "隱藏"
                        hbtn.onclick = () => hm(c.id)
                    }
                    let rbtn = document.createElement("button")
                    rbtn.classList.add("btnmg")
                    rbtn.style.width = "6em"
                    rbtn.style.margin = ".2em"
                    rbtn.textContent = "回應"
                    rbtn.onclick = () => rm(c.id)
                    td.append(ebtn, dbtn, pbtn, hbtn, rbtn)
                }
                td.style.width = "12em"
                td.style.borderLeft = "3px solid gray"
                td.style.borderRadius = "0 10px 10px 0"
                td.style.textAlign = "center"
                td.style.backgroundColor = "whitesmoke"
                if (c.pin) td.classList.add("pin")
                td.setAttribute("rowspan", 3)
                break;
            case "content":
                td.textContent = c.content
                td.style.borderLeft = "3px solid gray"
                break;
            case "contact":
                td.innerHTML = c.content
                td.style.height = "1em"
                td.style.padding = ".5em 1em"
                td.style.borderTop = "3px solid gray"
                td.style.borderLeft = "3px solid gray"
                break;
            case "reply":
                td.textContent = `管理者回應 : ${c.content}`
                td.style.borderTop = "3px solid gray"
                td.style.borderRadius = "0 0 10px 10px"
                td.style.backgroundColor = "linen"
                td.setAttribute("colspan", 3)
                break;
        }
        tr.appendChild(td)
    })
    table.appendChild(tr)
}
const gmd = () => {
    fetch("./api/get.php?m=gmd")
        .then(r => r.json())
        .then(data => {
            document.querySelector("section.mls").replaceChildren()
            data.forEach(r => {
                let table = document.createElement("table")
                table.cellSpacing = 0
                if (r["delete_time"]) {
                    cr(table, [{ m: "header", image: r.image, name: r.name }, { m: "content", content: r.content }, { m: "active", id: r.id, pin: r.pin, hide: r.hide, deleted: true }])
                } else {
                    cr(table, [{ m: "header", image: r.image, name: r.name }, { m: "content", content: r.content }, { m: "active", id: r.id, pin: r.pin, hide: r.hide }])
                }
                let time = `發表於 ${r["issue_time"].replace(/-/g, "/")}`
                if (r["edit_time"]) time += ` · 修改於 ${r["edit_time"].replace(/-/g, "/")}`
                cr(table, [{ m: "contact", content: time }])
                let email = r["show_email"] == "on" ? `E-mail : ${r.email}` : ""
                let telephone = r["show_telephone"] == "on" ? `電話 : ${r.telephone}` : ""
                let emailAndTelephone = email && telephone
                    ? `${email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${telephone}`
                    : email || telephone
                if (emailAndTelephone) cr(table, [{ m: "contact", content: emailAndTelephone }])
                if (r.reply) cr(table, [{ m: "reply", content: r.reply }])
                document.querySelector("section.mls").appendChild(table)
            })
        })
}
const emd = (id) => {
    fetch("./api/get.php?m=gmd")
        .then(r => r.json())
        .then(data => {
            let md = data.find(r => r.id == id)
            tgd(".mls", ".ems")
            let e = document.querySelector("section.ems>form")
            e.name.value = md.name
            e.email.value = md.email
            e.telephone.value = md.telephone
            e.content.value = md.content
            e["show-email"].checked = md["show_email"]
            e["show-telephone"].checked = md["show_telephone"]
            e.emdr.onclick = () => emdr(md.id)
            e.onsubmit = () => em(event, md.id)
        })
}
const emdr = (id) => {
    fetch("./api/get.php?m=gmd")
        .then(r => r.json())
        .then(data => {
            let md = data.find(r => r.id == id)
            let e = document.querySelector("section.ems>form")
            e.name.value = md.name
            e.email.value = md.email
            e.telephone.value = md.telephone
            e.content.value = md.content
            e["show-email"].checked = md["show_email"]
            e["show-telephone"].checked = md["show_telephone"]
            e.emdr.onclick = () => emdr(md.id)
        })
}
const em = (e, id) => {
    e.preventDefault()
    if (!/@.*\.|\..*@/.test(e.target.email.value)) e.target.email.setCustomValidity("E-mail需包含「@」及至少1個「.」")
    if (/[^0-9-]/.test(e.target.telephone.value)) e.target.telephone.setCustomValidity("連絡電話只能包含數字及「-」")
    if (!e.target.checkValidity()) return
    let formData = new FormData(e.target)
    formData.append("m", "em")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            gmd()
            tgd(".ems", ".mls")
            alert("編輯訪客留言成功")
        })
}
const dm = (id) => {
    let confd = confirm("確認是否刪除訪客留言")
    if (!confd) return alert("已取消刪除訪客留言")
    let formData = new FormData()
    formData.append("m", "dm")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            gmd()
            alert("刪除訪客留言")
        })
}
const pm = (id) => {
    let formData = new FormData()
    formData.append("m", "pm")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            gmd()
            alert("置頂訪客留言成功")
        })
}
const unpm = (id) => {
    let formData = new FormData()
    formData.append("m", "unpm")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            gmd()
            alert("取消頂置訪客留言成功")
        })
}
const hm = (id) => {
    let formData = new FormData()
    formData.append("m", "hm")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            gmd()
            alert("隱藏訪客留言成功")
        })
}
const unhm = (id) => {
    let formData = new FormData()
    formData.append("m", "unhm")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            gmd()
            alert("取消隱藏訪客留言成功")
        })
}
const rm = (id) => {
    let r = prompt("回應訪客留言")
    if (r == null) return alert("取消回應訪客留言")
    if (r.trim() == "") return alert("回應內容不得為空白")
    let confr = confirm(`確認是否回應訪客留言 內容 : ${r}`)
    if (!confr) return alert("取消回應訪客留言")
    let formData = new FormData()
    formData.append("m", "rm")
    formData.append("id", id)
    formData.append("reply", r)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            gmd()
            alert("回應訪客留言成功")
        })
}