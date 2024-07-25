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

// window.addEventListener('resize', updatePadding);
// window.addEventListener('load', updatePadding);
// window.addEventListener('load', initSlider);
// smoothScroll();
document.querySelectorAll('.drop-down-button').forEach(button => {
    button.addEventListener('click', function(event) {
        const buttonId = this.id;
        const menuId = `menu-${buttonId.split('-')[1]}`;
        console.log(buttonId);
        console.log(menuId);
        document.querySelector(".menu-container").style.display = "flex";

        // Close all other open dropdown menus
        document.querySelectorAll('.drop-down-menu').forEach(menu => {
            if (menu.id !== menuId) {
                menu.classList.remove('show');
            }
        });

        // Toggle the visibility of the current dropdown menu
        const menu = document.getElementById(menuId);
        console.log(menu);
        menu.classList.toggle('show');
        const container = menu.querySelector('.menu-items');
        container.classList.toggle('show', menu.classList.contains('show'));

        // Stop the click event from propagating to the document
        event.stopPropagation();
    });
});

window.addEventListener('click', function(event) {
    if (!event.target.matches('.drop-down-button')) {
        document.querySelectorAll('.drop-down-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

document.getElementById('tbc-button').addEventListener('click', function(){
    window.location.reload();

    window.scrollTo({top:0, behavior: "smooth"})
})









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
    document.documentElement.style.setProperty('--screenwidth');
    console.log(document.querySelector(".slider-row").style.marginRight);
}
document.getElementById('fab').addEventListener('click', function() {

    // const menu = document.querySelector('fab-menu');
    const fab = document.getElementById('fab-icon');
    const close = document.getElementById('close-button');
    const fabVisibility = window.getComputedStyle(fab).visibility;
    const menu = document.getElementById('fab-menu');
    console.log(menu);

    fab.style.visibility = fabVisibility === 'visible' ? 'hidden' : 'visible';

    
    close.style.visibility = fabVisibility === 'visible' ? 'visible' : 'hidden';  
    menu.style.display = fabVisibility === 'visible' ? 'flex' : 'none';
  
    

    

});

// window.addEventListener('click', function(event) {
//     const menu = document.getElementById('fab-menu');
//     const fab = document.getElementById('fab');
    
// });




window.addEventListener('resize', updatePadding);
window.addEventListener('load', updatePadding);
window.addEventListener("load", initSlider);
window.addEventListener('load', smoothScroll)

