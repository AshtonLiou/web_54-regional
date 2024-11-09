document.addEventListener("DOMContentLoaded", () => {
    gc(y, m)
})
let y = new Date().getFullYear()
let m = new Date().getMonth()
let sdd = new Set()
const gc = (y, m) => {
    const cal = document.querySelector("#cal tbody")
    cal.innerHTML = ""
    const fd = new Date(y, m, 1).getDay()
    const td = new Date(y, m + 1, 0).getDate()
    let d = 1
    for (let i = 0; d < td; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j < 7; j++) {
            let c = document.createElement("td")
            if ((i == 0 && j < fd) || d > td) {
                c.classList.add("empty")
            } else if (d < new Date().getDate()) {
                c.classList.add("empty")
                c.innerHTML = d
                c.id = d++
            } else {
                c.innerHTML = d
                // c.innerHTML = `<span style="font-size: 1.5em;">${date}</span><br><span style="font-size: .9em">$5000</span>`
                // fetch(`./api/get.php?mode=gc&date=${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}星期${["日", "一", "二", "三", "四", "五", "六"][new Date(currentYear, currentMonth, date).getDay()]}`)
                //     .then(r => r.json())
                //     .then(data => {
                //         date.innerHTML += `<br>${data.length}間`
                //     })
                c.id = d++
                c.onclick = () => selectDate(c.id)
            }
            tr.appendChild(c)
        }
        cal.appendChild(tr)
    }
}