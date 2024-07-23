const body = document.body;
scrollWrap = document.querySelector(".smooth-scroll-container");
height = scrollWrap.getBoundingClientRect().height -1;
speed = 0.1;
var offset = window.scrollY;
body.style.height = Math.floor(height) + "px";

function smoothScroll(){
    offset += (window.scrollY - offset) * speed;
    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    scrollWrap.style.transform = scroll;
    callScroll = requestAnimationFrame(smoothScroll);

}


smoothScroll();