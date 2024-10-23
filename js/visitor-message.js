document.addEventListener("DOMContentLoaded", () => {
    getVisitorMessageData()
})

// create visitor message table

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
                if (cell.content == "deleted") {

                    // if the message is deleted then output the delete text

                    let h2Delete = document.createElement("h2")
                    h2Delete.textContent = "已刪除"
                    h2Delete.style.color = "red"
                    td.appendChild(h2Delete)

                    // if the message is pin then output the delete text

                    if (cell.pin == true) {
                        let h3Pin = document.createElement("h3")
                        h3Pin.textContent = "已置頂"
                        td.appendChild(h3Pin)
                    }

                } else {

                    // create message serial number input

                    let inputFloat = document.createElement("div")
                    inputFloat.classList.add("form-float")
                    let input = document.createElement("input")
                    input.type = "text"
                    input.id = `active-form-message-serial-number${cell.id}`
                    input.name = cell.id
                    input.maxLength = 4
                    input.placeholder = " "
                    let label = document.createElement("label")
                    label.for = `active-form-message-serial-number${cell.id}`
                    label.textContent = "留言序號"
                    inputFloat.append(input, label)

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

                    td.append(inputFloat, editButton, deleteButton)

                    // if the message is pin then output the delete text

                    if (cell.pin == true) {
                        let h3Pin = document.createElement("h3")
                        h3Pin.textContent = "已置頂"
                        td.appendChild(h3Pin)
                    }
                }
                break;

            default:
                td.innerHTML = cell.content
                if (cell.reply) td.innerHTML += `<br><br><h3>管理者回應 : <br>${cell.reply}</h3>`
                break;
        }
        if (cell.rowspan) td.setAttribute("rowspan", cell.rowspan)
        if (cell.colspan) td.setAttribute("colspan", cell.colspan)
        tr.appendChild(td)
    })

    table.appendChild(tr)
}

// get visitor message data

const getVisitorMessageData = () => {
    fetch("./api/get.php?mode=getVisitorMessageData")
        .then(r => r.json())
        .then(data => {

            // display visitor message data

            document.getElementById("visitor-message-list-container").replaceChildren()

            data.forEach(row => {

                if (row.hide == null) {

                    // create table

                    let table = document.createElement("table")
                    table.cellSpacing = 0

                    if (row["delete-time"]) {
                        createRow(table, [{ mode: "image-and-name", name: row.name }, { content: "" }, { pin: row.pin, mode: "active", content: "deleted", rowspan: 3 }])
                        createRow(table, [{ content: `發表於 ${row["issus-time"]} · 刪除於 ${row["delete-time"]}`, colspan: 2 }])
                    } else {
                        createRow(table, [{ mode: "image-and-name", image: row.image, name: row.name }, { content: row.content, reply: row.reply }, { pin: row.pin, mode: "active", id: row.id, rowspan: 3 }])

                        row["edit-time"]
                            ? createRow(table, [{ content: `發表於 ${row["issus-time"]} · 修改於 ${row["edit-time"]}`, colspan: 2 }])
                            : createRow(table, [{ content: `發表於 ${row["issus-time"]}`, colspan: 2 }])

                        let emailContent = row["show-email"] == "on" ? `E-mail : ${row.email}` : ""
                        let telephoneContent = row["show-telephone"] == "on" ? `電話 : ${row.telephone}` : ""
                        let emailAndTelephoneContent = emailContent && telephoneContent
                            ? `${emailContent}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${telephoneContent}`
                            : emailContent || telephoneContent
                        if (emailAndTelephoneContent) createRow(table, [{ content: emailAndTelephoneContent, colspan: 2 }])
                    }

                    document.getElementById("visitor-message-list-container").appendChild(table)

                }
            })
        })
}

// button edit visitor message active

const editMessage = (id) => {
    fetch("./api/get.php?mode=getVisitorMessageData")
        .then(r => r.json())
        .then(data => {
            let matchedData = data.find(row => row.id == id)
            if (matchedData["message-serial-number"] == document.getElementsByName(id)[0].value) {
                document.getElementsByName(id)[0].value = ""
                toggleDisplay('.visitor-message-list-section, .visitor-message-add-section', '.visitor-message-edit-section')
                let editMessageForm = document.forms["edit-message-form"]
                editMessageForm.onsubmit = () => editMessageFormSubmit(event, matchedData.id)
                editMessageForm.editMessageFormReset.onclick = () => editMessageFormReset(matchedData.id)
                editMessageForm.name.value = matchedData.name
                editMessageForm.email.value = matchedData.email
                editMessageForm.telephone.value = matchedData.telephone
                editMessageForm.content.value = matchedData.content
                editMessageForm.showEmail.checked = matchedData["show-email"]
                editMessageForm.showTelephone.checked = matchedData["show-telephone"]
            } else {
                alert("留言編號錯誤")
            }
        })
}

// button delete visitor message active

const deleteMessage = (id) => {
    fetch("./api/get.php?mode=getVisitorMessageData")
        .then(r => r.json())
        .then(data => {
            let matchedData = data.find(row => row.id == id)
            if (matchedData["message-serial-number"] == document.getElementsByName(id)[0].value) {
                document.getElementsByName(id)[0].value = ""
                let confirmDelete = confirm("確認是否刪除訪客留言")
                if (confirmDelete == true) {
                    let data = new FormData()
                    data.append("mode", "visitorDeleteMessage")
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
            } else {
                alert("留言編號錯誤")
            }
        })
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
                toggleDisplay('.visitor-message-add-section, .visitor-message-edit-section', '.visitor-message-list-section')
                alert("編輯訪客留言成功")
            })
    }
}

// add message form submit

const addMessageFormSubmit = (e) => {
    e.preventDefault()

    // check add-message-form format

    let addMessageForm = document.forms["add-message-form"]
    let addEmail = addMessageForm.email
    let addTelephone = addMessageForm.telephone
    let addMessageSerialNumber = addMessageForm["message-serial-number"]
    if (!/.+@.+\..+/.test(addEmail.value)) addEmail.setCustomValidity("E-mail須包含「@」及至少1個「.」")
    if (/[^0-9-]/.test(addTelephone.value)) addTelephone.setCustomValidity("連絡電話只能包含數字及「-」")
    if (!/^[0-9]{3}[a-z]$/.test(addMessageSerialNumber.value)) addMessageSerialNumber.setCustomValidity("留言序號只能由3位數字及小寫英文字母組成")

    // Convert file to Base64

    if (addMessageForm.checkValidity()) {
        let file = addMessageForm.image.files[0]
        let reader = new FileReader()
        reader.onload = (e) => {

            // upload new data

            let formData = new FormData(addMessageForm)
            formData.append("mode", "addMessageForm")
            formData.set("image", e.target.result)
            fetch("./api/post.php", {
                method: "POST",
                body: formData
            })
                .then(r => {
                    addMessageForm.reset()
                    toggleDisplay('.visitor-message-add-section, .visitor-message-edit-section', '.visitor-message-list-section')
                    getVisitorMessageData()
                    alert("新增訪客留言成功")
                })
        }
        reader.readAsDataURL(file)
    }
}