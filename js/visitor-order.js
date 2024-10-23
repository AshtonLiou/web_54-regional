// when user click image active

const clickImage = (imageSrc) => {
    document.querySelector(".modal-image").src = imageSrc
    document.querySelector(".modal").style.display = "flex"
}

const closeModal = () => {
    document.querySelector(".modal").style.display = "none"
    replyImageOpacity()
}

const reduceImageOpacity = () => {
    let image = document.querySelector(".modal-image")
    image.style.opacity = Math.max(parseFloat(getComputedStyle(image).opacity) - 0.1, 0)
}

const replyImageOpacity = () => {
    document.querySelector(".modal-image").style.opacity = 1
}

const increaseImageOpacity = () => {
    let image = document.querySelector(".modal-image");
    image.style.opacity = Math.min(parseFloat(getComputedStyle(image).opacity) + 0.1, 1);
}