const body = document.body;
scrollWrap = document.querySelector(".smooth-scroll-container");
height = scrollWrap.getBoundingClientRect().height -1;
speed = 0.15;
var offset = window.scrollY;
body.style.height = Math.floor(height) + "px";
function initSlider() {
    const sliders = document.querySelectorAll('.slider-wrapper'); // Assuming each slider has the class 'slider-wrapper'
    console.log(sliders.length);
    
    sliders.forEach(slider => {
        const imageList = slider.querySelector('.image-list');
        let imageCard = imageList.querySelector('.image-card');
        if(!imageCard){
            imageCard = imageList.querySelector('.logo-card');
        }
        
        const imageWidth = imageCard.offsetWidth
        const slideButtons = slider.querySelectorAll('.arrow-button');
        const sliderScrollBar = slider.querySelector('.slider-scrollbar');
        const scrollBarThumb = sliderScrollBar.querySelector('.scrollbar-thumb');
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        
        scrollBarThumb.addEventListener('mousedown', (e) => {
            const startX = e.clientX;
            const thumbPosition = scrollBarThumb.offsetLeft;

            const handleMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                const newThumbPosition = thumbPosition + deltaX;
                const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - scrollBarThumb.offsetWidth;

                const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
                const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

                scrollBarThumb.style.left = `${boundedPosition}px`;
                imageList.scrollLeft = scrollPosition;
            };

            const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });

        slideButtons.forEach(button => {
            button.addEventListener('click', () => {
                const direction = button.id === 'left-arrow' ? -1 : 1;
                const scrollAmount = (imageWidth + 30) * direction;
                imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        });

        let isDragging = false;
        let startX;
        let scrollLeft;

        imageList.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            scrollLeft = imageList.scrollLeft;
        });

        imageList.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            imageList.scrollLeft = scrollLeft - deltaX;

            // Optional: Clamp scroll position to avoid scrolling beyond content
            const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
            imageList.scrollLeft = Math.max(0, Math.min(maxScrollLeft, imageList.scrollLeft));
        });

        imageList.addEventListener('mouseup', () => {
            isDragging = false;
        });

        imageList.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
            }
        });

        const handleSlideButtons = () => {
            slideButtons[0].style.fill = imageList.scrollLeft <= 0 ? 'rgb(165, 170, 172)' : 'blue';
            slideButtons[1].style.fill = imageList.scrollLeft <= maxScrollLeft - 5 ? 'blue' : 'rgb(165, 170, 172)';
        };

        const updateScrollThumbPosition = () => {
            const scrollPosition = imageList.scrollLeft;
            const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollBarThumb.offsetWidth);
            scrollBarThumb.style.left = `${thumbPosition}px`;
        };

        imageList.addEventListener('scroll', () => {
            handleSlideButtons();
            updateScrollThumbPosition();
        });
    });
}

window.addEventListener('resize', updatePadding);
window.addEventListener('load', updatePadding);
window.addEventListener('load', initSlider);
smoothScroll();





function smoothScroll(){
    offset += (window.scrollY - offset) * speed;
    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    scrollWrap.style.transform = scroll;
    callScroll = requestAnimationFrame(smoothScroll);

}
function updatePadding() {
    const currendWith = window.innerWidth;
    const basePadding = 166; 
    const maxWidth = window.screen.width;
    const paddingDecrease = maxWidth-currendWith;

    const newPadding = Math.max(basePadding - paddingDecrease, 0); 
    const newPaddingRight = paddingDecrease -322;
    
    document.documentElement.style.setProperty('--global-padding-left', `${newPadding}px`);
    document.documentElement.style.setProperty('--global-padding-right', `${newPaddingRight}px`)
    console.log(document.querySelector(".slider-row").style.marginRight);
}

window.addEventListener('resize', updatePadding);
window.addEventListener('load', updatePadding);
window.addEventListener("load", initSlider);
smoothScroll();

