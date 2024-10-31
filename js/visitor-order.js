const ci = (imageSrc) => {
    document.querySelector(".modal img").src = imageSrc
    document.querySelector(".modal").classList.add("show-modal")
}
const cm = () => {
    document.querySelector(".modal").classList.remove("show-modal")
    rep()
}
const rp = () => {
    let image = document.querySelector(".modal img")
    image.style.opacity = Math.max(parseFloat(getComputedStyle(image).opacity) - .1, 0)
}
const rep = () => {
    document.querySelector(".modal img").style.opacity = 1
}
const ip = () => {
    let image = document.querySelector(".modal img");
    image.style.opacity = Math.min(parseFloat(getComputedStyle(image).opacity) + .1, 1);
}