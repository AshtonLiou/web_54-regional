document.addEventListener("DOMContentLoaded", () => {
    gmd()
})
const cr = (table, cs) => {
    let tr = document.createElement("tr")
    cs.forEach((c) => {
        let td = document.createElement("td")
        switch (c.m) {
            case "header":
                let img = document.createElement("img")
                img.src = c.image
                let h2 = document.createElement("h2")
                h2.textContent = c.name
                h2.style.position = "absolute"
                h2.style.width = "calc(300px - 2em)"
                h2.style.padding = "0 1em"
                h2.style.borderRadius = "5px 15px"
                h2.style.boxShadow = "0 0 0 3px #fff, 0 0 0 6px gray"
                h2.style.color = "#eee"
                h2.style.textAlign = "center"
                h2.style.backgroundColor = "gray"
                h2.style.transform = "translate(1em, .5em)"
                td.style.width = "300px"
                td.style.transform = "translateY(-3em)"
                td.setAttribute("rowspan", 3)
                td.append(img, h2)
                break;
            case "active":
                let ff = document.createElement("div")
                ff.classList.add("ff")
                let input = document.createElement("input")
                input.type = "text"
                input.name = c.id
                input.maxLength = 3
                input.placeholder = " "
                let label = document.createElement("label")
                label.textContent = "留言序號"
                ff.append(input, label)
                let ebtn = document.createElement("button")
                ebtn.classList.add("btng")
                ebtn.style.margin = ".5em .2em"
                ebtn.textContent = "編輯"
                ebtn.onclick = () => emd(c.id)
                let dbtn = document.createElement("button")
                dbtn.classList.add("btnr")
                dbtn.style.margin = ".5em .2em"
                dbtn.textContent = "刪除"
                dbtn.onclick = () => dm(c.id)
                td.style.width = "12em"
                td.style.borderLeft = "3px solid gray"
                td.style.borderRadius = "0 10px 10px 0"
                td.style.textAlign = "center"
                td.style.backgroundColor = "whitesmoke"
                td.setAttribute("rowspan", 3)
                td.append(ff, ebtn, dbtn)
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
                if (r.hide != null) return
                let table = document.createElement("table")
                table.cellSpacing = 0
                cr(table, [{ m: "header", image: r.image, name: r.name }, { m: "content", content: r.content }, { m: "active", id: r.id }])
                cr(table, [{ m: "contact", content: `發表於 ${r["issue-time"].replace(/-/g, "/")}` }])
                cr(table, [{ m: "contact", content: `E-mail : ${r.email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;電話 : ${r.telephone}` }])
                document.querySelector("section.mls").appendChild(table)
            })
        })
}
const am = (e) => {
    e.preventDefault()
    if (!/@.*\.|\..*@/.test(e.target.email.value)) e.target.email.setCustomValidity("E-mail需包含「@」及至少1個「.」")
    if (/[^0-9-]/.test(e.target.telephone.value)) e.target.telephone.setCustomValidity("連絡電話只能包含數字及「-」")
    if (!/[a-z0-9]{3}/.test(e.target["message-serial-number"].value)) e.target["message-serial-number"].setCustomValidity("留言序號只能由3位數字及小寫英文字母組成")
    if (e.target.checkValidity()) {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.image.files[0])
        reader.onload = (ev) => {
            let fd = new FormData(e.target)
            fd.append("m", "am")
            fd.set("image", ev.target.result)
            fetch("./api/post.php", {
                method: "POST",
                body: fd
            })
                .then(r => {
                    e.target.reset()
                    tgd(".ams", ".mls")
                    gmd()
                    alert("新增訪客留言成功")
                })
        }
    }
}
const emd = (id) => {
    fetch("./api/get.php?m=gmd")
        .then(r => r.json())
        .then(data => {
            let md = data.find(r => r.id == id)
            if (md["message-serial-number"] != document.getElementsByName(id)[0].value) return alert("留言編號錯誤")
            document.getElementsByName(id)[0].value = ""
            tgd(".mls", ".ems")
            let e = document.querySelector("section.ems>form")
            e.name.value = md.name
            e.email.value = md.email
            e.telephone.value = md.telephone
            e.content.value = md.content
            e["show-email"].checked = md["show-email"]
            e["show-telephone"].checked = md["show-telephone"]
            e.emdr.onclick = () => emdr(md.id)
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
            e["show-email"].checked = md["show-email"]
            e["show-telephone"].checked = md["show-telephone"]
            e.emdr.onclick = () => emdr(md.id)
        })
}