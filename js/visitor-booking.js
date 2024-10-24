document.addEventListener("DOMContentLoaded", () => {
    generateCalendar(currentYear, currentMonth)
})

// calendar

// get current year and month

let currentYear = 2024
let currentMonth = 2
let selectedDate = new Set()

const generateCalendar = (year, month) => {
    const calendar = document.querySelector("#calendar tbody")
    calendar.innerHTML = ""
    const firstDay = new Date(year, month, 1).getDay() // get month's first day
    const totalDay = new Date(year, month + 1, 0).getDate() // get month's last day

    let date = 1
    for (let i = 0; date <= totalDay; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td")
            if (i == 0 && j < firstDay || date > totalDay) {
                cell.classList.add("empty")
            } else {
                cell.innerHTML = `<span style="font-size: 1.5em;">${date}</span><br><span style="font-size: .9em">$5000</span>`
                fetch(`./api/get.php?mode=getBookingDayData&date=${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}星期${["日", "一", "二", "三", "四", "五", "六"][new Date(currentYear, currentMonth, date).getDay()]}`)
                    .then(r => r.json())
                    .then(data => {
                        cell.innerHTML += `<br>${data.slice(-1)}間`
                    })
                cell.id = date++
                cell.onclick = () => selectDate(cell.id)
            }
            tr.appendChild(cell)
        }
        calendar.appendChild(tr)
    }
    document.getElementById("currentMonth").textContent = `${year} ${["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"][month]}月`
}

// change month

const changeMonth = (direction) => {
    currentMonth += direction
    if (currentMonth < 0) {
        currentMonth = 11
        currentYear--
    } else if (currentMonth > 11) {
        currentMonth = 0
        currentYear++
    }
    clearSelection()
    generateCalendar(currentYear, currentMonth)
}

// when user click calendar cell

const selectDate = (id) => {
    let firstSelected = Number([...selectedDate][0])
    let selectId = Number(id)
    let dayName = ["日", "一", "二", "三", "四", "五", "六"][new Date(currentYear, currentMonth, selectId).getDay()]

    if (selectedDate.size == 0) {

        // single day booking

        selectedDate.add(selectId)
        document.getElementById(id).classList.add("selected")
        document.getElementById("check-in-date").value = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${selectId.toString().padStart(2, "0")}星期${dayName}`
        document.getElementById("check-out-date").value = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${selectId.toString().padStart(2, "0")}星期${dayName}`
        document.getElementById("day-of-stay").value = "1天"
        document.getElementById("auto-generate-room-number-button").classList.remove("button-disabled")
        document.getElementById("select-room-number-button").classList.remove("button-disabled")
        autoGenerateRoomNumber()
    } else if (selectedDate.size == 1 && firstSelected < selectId) {

        // multi day booking

        selectedDate.add(selectId)
        document.getElementById("check-out-date").value = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${selectId.toString().padStart(2, "0")}星期${dayName}`
        document.getElementById("day-of-stay").value = `${selectId + 1 - firstSelected}天`
        for (let i = firstSelected; i <= selectId; i++) {
            document.getElementById(i).classList.add("selected")
        }
        document.getElementById("select-room-number-button").classList.add("button-disabled")
    } else if (selectedDate.size == 1 && firstSelected >= selectId) {
        alert("入住最後一晚要大於入住的第一晚的日期")
    }
}

// when user active clear button

const clearSelection = () => {
    selectedDate.clear()
    document.querySelectorAll(".selected").forEach(cell => cell.classList.remove("selected"))
    document.getElementById("check-in-date").value = ""
    document.getElementById("check-out-date").value = ""
    document.getElementById("day-of-stay").value = ""
    document.getElementById("room-number").value = ""
    document.getElementById("auto-generate-room-number-button").classList.add("button-disabled")
    document.getElementById("select-room-number-button").classList.add("button-disabled")
}

// booking room first confirm

const submitBookingForm = (e) => {
    e.preventDefault()

    if (document.getElementById("day-of-stay").value == "") return alert("請先選取要預定的日期")
    if (document.getElementById("room-number").value.split(", ").length != document.getElementById("several-room").value) return alert("請選擇房號")

    let lumpSum = 5000
    let severalRoom = document.forms["booking-form"]["several-room"].value
    let dayOfStay = document.forms["booking-form"]["day-of-stay"].value

    if (severalRoom == 1 || dayOfStay.slice(0, -1) == 1) {
        lumpSum *= Math.max(severalRoom, dayOfStay.slice(0, -1))
    } else {
        lumpSum *= Number(severalRoom) + Number(dayOfStay.slice(0, -1))
    }

    document.forms["confirm-booking-form"]["several-room"].value = `${severalRoom}間`
    document.forms["confirm-booking-form"]["room-number"].value = document.forms["booking-form"]["room-number"].value
    document.forms["confirm-booking-form"]["day-of-stay"].value = dayOfStay
    document.forms["confirm-booking-form"]["check-in-date"].value = document.forms["booking-form"]["check-in-date"].value
    document.forms["confirm-booking-form"]["check-out-date"].value = document.forms["booking-form"]["check-out-date"].value
    document.forms["confirm-booking-form"]["lump-sum"].value = `$${lumpSum}元`
    document.forms["confirm-booking-form"]["deposit"].value = `$${lumpSum * 0.3}元(總金額之30%)`

    toggleDisplay(".select-date", ".confirm-booking-form")
}

const autoGenerateRoomNumber = () => {
    document.getElementById("room-number").value = ""
    fetch(`./api/get.php?mode=getBookingDayData&date=${document.getElementById("check-in-date").value}`)
        .then(r => r.json())
        .then(data => {
            let roomArray = []
            for (let i = 1; i <= document.getElementById("several-room").value; i++) {
                if (`Room0${data.includes(i)}`) roomArray.push(`Room0${i}`)
            }
            document.getElementById("room-number").value = roomArray.join(", ")
        })
}

const selectRoomNumber = () => {
    toggleDisplay(".select-date", ".select-room")
    fetch(`./api/get.php?mode=getBookingDayData&date=${document.getElementById("check-in-date").value}`)
        .then(r => r.json())
        .then(data => {
            let count = 1
            for (let i = 0; i < 2; i++) {
                let tr = document.createElement("tr")
                for (let j = 0; j < 4; j++) {
                    let td = document.createElement("td")
                    td.id = `Room0${count}`
                    td.onclick = () => selectRoom(td.id, document.getElementById("several-room").value)
                    td.textContent = `Room0${count}`
                    if (document.getElementById("room-number").value.split(", ").includes(`Room0${count}`)) td.classList.add("selected")
                    if (data.includes(count)) {
                        td.innerHTML += "<br>空房"
                    } else {
                        td.innerHTML += "<br>已訂"
                        td.style.backgroundColor = "slategray"
                        td.style.color = "#eee"
                    }
                    count++
                    tr.append(td)
                }
                document.querySelector("#select-room-table tbody").append(tr)
            }
            document.getElementById("select-room-title").textContent = document.getElementById("check-in-date").value
        })
}

const selectRoom = (id, serveralRoom) => {
    if ([...document.querySelectorAll("#select-room-table td.selected")].length < serveralRoom) {
        document.getElementById(id).classList.add("selected")
    }
}

const clearRoomSelection = () => {
    toggleDisplay('.select-room', '.select-date')
    document.querySelector('#select-room-table tbody').innerHTML = ''
}

const confirmSelectRoom = () => {
    if ([...document.querySelectorAll("#select-room-table td.selected")].length == document.getElementById("several-room").value) {
        document.getElementById("room-number").value = [...document.querySelectorAll("#select-room-table td.selected")].map(td => td.id).join(", ")
        clearRoomSelection()
    } else {
        alert(`還剩${document.getElementById("several-room").value - [...document.querySelectorAll("#select-room-table td.selected")].length}間房號未選擇`)
    }
}

const confirmBookingSubmit = (e) => {
    e.preventDefault()

    toggleDisplay(".confirm-booking-form", ".contact-information-form")
}

const contactInformationSubmit = (e) => {
    e.preventDefault()

    if (document.forms["contact-information-form"].checkValidity()) {
        let formData1 = new FormData(document.forms["contact-information-form"])
        let formData2 = new FormData(document.forms["confirm-booking-form"])
        formData2.forEach((value, key) => {
            formData1.append(key, value)
        })
        formData1.append("mode", "addBookingForm")
        fetch("./api/post.php", {
            method: "POST",
            body: formData1
        })
        // let selectedId = [...document.querySelectorAll("#calendar-table td.selected")].map(td => td.id)
        // let selectedArray = []
        // let bookingSerialNumberArray = []
        // selectedId.forEach(date => {
        //     selectedArray.push(`${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}星期${["日", "一", "二", "三", "四", "五", "六"][new Date(currentYear, currentMonth, date).getDay()]}`)
        //     fetch(`./api/get.php?mode=getBookingDayData&date=${selectedArray.at(-1)}`)
        //         .then(r => r.json())
        //         .then(data => bookingSerialNumberArray.push(`${currentYear}${(currentMonth + 1).toString().padStart(2, "0")}${date.toString().padStart(2, "0")}${(9 - data.length).toString().padStart(4, "0")}`))
        // })
        // console.log(bookingSerialNumberArray)
        // console.log(selectedArray)
        let selectedId = [...document.querySelectorAll("#calendar-table td.selected")].map(td => td.id)
        let roomNumberArray = document.getElementById("room-number").value.split(", ")
        roomNumberArray.forEach(room => {
            selectedId.forEach(date => {
                let formData3 = new FormData()
                formData3.append("mode", "addBookingDate")
                formData3.append("date", `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}星期${["日", "一", "二", "三", "四", "五", "六"][new Date(currentYear, currentMonth, date).getDay()]}`)
                formData3.append("room", room)
                fetch("./api/get.php?mode=")
                console.log([...formData3])



                // fetch(`./api/get.php?mode=getBookingDayData&date=${selectedArray.at(-1)}`)
                //     .then(r => r.json())
                //     .then(data => {

                //         formData3.append("booking-serial-number", `${currentYear}${(currentMonth + 1).toString().padStart(2, "0")}${date.toString().padStart(2, "0")}${(9 - data.length).toString().padStart(4, "0")}`)
                //         console.log(formData3)
                //         fetch("./api/post.php", {

                //         })
                //     })
            })
        })
    }
}