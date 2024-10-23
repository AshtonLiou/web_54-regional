// onload

document.addEventListener("DOMContentLoaded", () => {
    localStorage.getItem("isLogin") == "true" && toggleDisplay(".pre-login", ".post-login")
    reGenerate()
})

// captcha

const reGenerate = () => {
    fetch("./api/generate-captcha.php")
        .then(r => document.getElementById("captcha-image").src = `./img/captcha-image.png?${new Date().getTime()}`)
}

// check login status

const logout = () => {
    localStorage.removeItem("isLogin")
    toggleDisplay(".post-login", ".pre-login")
}

// login

const loginFormSubmit = (e) => {
    e.preventDefault()
    fetch(`./api/get.php?mode=verificationCaptchaNumber&number=${document.forms["login-form"]["verification"].value}`)
        .then(r => r.text())
        .then(text => {
            if (text == 1) {

                let loginFormData = new URLSearchParams(new FormData(document.forms["login-form"])).toString()
                fetch(`./api/get.php?mode=verificationLoginData&${loginFormData}`)
                    .then(r => r.text())
                    .then(text => {
                        if (text == "登入成功") {
                            document.getElementById("login-form").reset()
                            reGenerate()
                            localStorage.setItem("isLogin", "true")
                            alert(text)
                            toggleDisplay(".pre-login", ".post-login")
                        } else {
                            alert(text)
                        }
                    })

            } else {
                alert("驗證碼錯誤")
            }
        })
}

// create visitor message table for manager

const createRow = (table, cells) => {
    let tr = document.createElement("tr")

    cells.forEach((cell) => {
        let td = document.createElement("td")
        switch (cell.mode) {
            case "image-and-name":

                // create image and name td

                let img = document.createElement("img")
                td.style.width = "334px"
                if (cell.image !== undefined) {
                    img.src = cell.image
                    td.appendChild(img)
                }
                let h2 = document.createElement("h2")
                h2.textContent = cell.name
                td.appendChild(h2)
                break;

            case "active":

                // create edit button

                let editButton = document.createElement("button")
                editButton.classList.add("button-gray")
                editButton.textContent = "編輯"
                editButton.onclick = () => editMessage(cell.id)

                // create delete button

                let deleteButton = document.createElement("button")
                deleteButton.classList.add("button-red")
                deleteButton.textContent = "刪除"
                deleteButton.onclick = () => deleteMessage(cell.id)

                // create pin button

                let pinButton = document.createElement("button")
                pinButton.classList.add("button-yellow")
                if (cell.pin == true) {
                    pinButton.textContent = "取消置頂"
                    pinButton.onclick = () => unpinMessage(cell.id)
                } else {
                    pinButton.textContent = "置頂"
                    pinButton.onclick = () => pinMessage(cell.id)
                }

                // create hide button

                let hideButton = document.createElement("button")
                hideButton.classList.add("button-yellow")
                if (cell.hide == true) {
                    hideButton.textContent = "取消隱藏"
                    hideButton.onclick = () => unhideMessage(cell.id)
                } else {
                    hideButton.textContent = "隱藏"
                    hideButton.onclick = () => hideMessage(cell.id)
                }

                // create reply button

                let replyButton = document.createElement("button")
                replyButton.classList.add("button-green")
                replyButton.textContent = "回應"
                replyButton.onclick = () => replyMessage(cell.id)

                td.append(editButton, deleteButton, pinButton, hideButton, replyButton)
                break;

            default:
                td.innerHTML = cell.content
                break;
        }
        if (cell.rowspan) td.setAttribute("rowspan", cell.rowspan)
        if (cell.colspan) td.setAttribute("colspan", cell.colspan)
        tr.appendChild(td)
    })

    table.appendChild(tr)
}

// get visitor message data for manager

const getVisitorMessageData = () => {
    fetch("./api/get.php?mode=getVisitorMessageData")
        .then(r => r.json())
        .then(data => {

            // display visitor message data

            document.getElementById("visitor-message-list-container").replaceChildren()

            data.forEach(row => {

                // create table

                let table = document.createElement("table")
                table.cellSpacing = 0

                createRow(table, [{ mode: "image-and-name", image: row.image, name: row.name }, { content: row.content }, { pin: row.pin, hide: row.hide, mode: "active", id: row.id, rowspan: 3 }])

                row["edit-time"]
                    ? createRow(table, [{ content: `發表於 ${row["issus-time"]} · 修改於 ${row["edit-time"]}`, colspan: 2 }])
                    : createRow(table, [{ content: `發表於 ${row["issus-time"]}`, colspan: 2 }])

                let emailContent = row["show-email"] == "on" ? `E-mail : ${row.email}` : ""
                let telephoneContent = row["show-telephone"] == "on" ? `電話 : ${row.telephone}` : ""
                let emailAndTelephoneContent = emailContent && telephoneContent
                    ? `${emailContent}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${telephoneContent}`
                    : emailContent || telephoneContent
                if (emailAndTelephoneContent) createRow(table, [{ content: emailAndTelephoneContent, colspan: 2 }])

                document.getElementById("visitor-message-list-container").appendChild(table)
            })
        })
}
getVisitorMessageData()

// button edit visitor message active

const editMessage = (id) => {
    fetch("./api/get.php?mode=getVisitorMessageData")
        .then(r => r.json())
        .then(data => {
            let matchedData = data.find(row => row.id == id)
            toggleDisplay('.visitor-message-list-section', '.visitor-message-edit-section')
            let editMessageForm = document.forms["edit-message-form"]
            editMessageForm.onsubmit = () => editMessageFormSubmit(event, matchedData.id)
            editMessageForm.editMessageFormReset.onclick = () => editMessageFormReset(matchedData.id)
            editMessageForm.name.value = matchedData.name
            editMessageForm.email.value = matchedData.email
            editMessageForm.telephone.value = matchedData.telephone
            editMessageForm.content.value = matchedData.content
            editMessageForm.showEmail.checked = matchedData["show-email"]
            editMessageForm.showTelephone.checked = matchedData["show-telephone"]
        })
}

// button delete visitor message active

const deleteMessage = (id) => {
    let confirmDelete = confirm("確認是否刪除訪客留言")
    if (confirmDelete == true) {
        let data = new FormData()
        data.append("mode", "managerDeleteMessageForm")
        data.append("id", id)
        fetch("./api/post.php", {
            method: "POST",
            body: data
        })
            .then(r => {
                getVisitorMessageData()
                alert("刪除訪客留言成功")
            })
    } else {
        alert("已取消刪除訪客留言")
    }
}

// edit visitor message form reset

const editMessageFormReset = (id) => {
    fetch("./api/get.php?mode=getVisitorMessageData")
        .then(r => r.json())
        .then(data => {
            let matchedData = data.find(row => row.id == id)
            let editMessageForm = document.forms["edit-message-form"]
            editMessageForm.name.value = matchedData.name
            editMessageForm.email.value = matchedData.email
            editMessageForm.telephone.value = matchedData.telephone
            editMessageForm.content.value = matchedData.content
            editMessageForm.showEmail.checked = matchedData["show-email"]
            editMessageForm.showTelephone.checked = matchedData["show-telephone"]
        })
}

// edit message form submit

const editMessageFormSubmit = (e, id) => {
    e.preventDefault()

    // check edit-message-form format

    let editMessageForm = document.forms["edit-message-form"]
    let editEmail = editMessageForm.email
    let editTelephone = editMessageForm.telephone
    if (!/.+@.+\..+/.test(editEmail.value)) editEmail.setCustomValidity("E-mail須包含「@」及至少1個「.」")
    if (/[^0-9-]/.test(editTelephone.value)) editTelephone.setCustomValidity("連絡電話只能包含數字及「-」")

    if (editMessageForm.checkValidity()) {
        let formData = new FormData(editMessageForm)
        formData.append("mode", "editMessageForm")
        formData.append("id", id)
        fetch("./api/post.php", {
            method: "POST",
            body: formData
        })
            .then(r => {
                getVisitorMessageData()
                toggleDisplay('.visitor-message-edit-section', '.visitor-message-list-section')
                alert("編輯訪客留言成功")
            })
    }
}

// button pin visitor message active

const pinMessage = (id) => {
    let formData = new FormData()
    formData.append("mode", "pinMessage")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            getVisitorMessageData()
            alert("置頂訪客留言成功")
        })
}

// button unpin visitor message active

const unpinMessage = (id) => {
    let formData = new FormData()
    formData.append("mode", "unpinMessage")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            getVisitorMessageData()
            alert("取消置頂訪客留言成功")
        })
}

// button hide visitor message active

const hideMessage = (id) => {
    let formData = new FormData()
    formData.append("mode", "hideMessage")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            getVisitorMessageData()
            alert("隱藏訪客留言成功")
        })
}

// button unhide visitor message active

const unhideMessage = (id) => {
    let formData = new FormData()
    formData.append("mode", "unhideMessage")
    formData.append("id", id)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            getVisitorMessageData()
            alert("取消隱藏訪客留言成功")
        })
}

// button reply visitor message active

const replyMessage = (id) => {
    let reply = prompt("回應訪客留言")
    if (reply == null) return alert("取消回應訪客留言")
    if (reply.trim() == "") return alert("回應內容不得為空白")
    let confirmReply = confirm(`確認是否回應訪客留言 內容 : ${reply}`)
    if (confirmReply == false) return alert("取消回應訪客留言")
    let formData = new FormData()
    formData.append("mode", "replyVisitorMessage")
    formData.append("id", id)
    formData.append("reply", reply)
    fetch("./api/post.php", {
        method: "POST",
        body: formData
    })
        .then(r => {
            getVisitorMessageData()
            alert("回應訪客留言成功")
        })
}