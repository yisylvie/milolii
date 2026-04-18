
let flyer = document.getElementsByClassName("flyer");
let everything = document.getElementById("everything");
for (let i = 0; i < 3; i++) {
    everything.appendChild(flyer[0].cloneNode(true));
}