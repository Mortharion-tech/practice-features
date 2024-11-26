document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let counter = 0;
    const size = images[0].clientWidth;

    nextButton.addEventListener('click', () => {
        if (counter >= images.length - 1) return;
        carouselImages.style.transition = 'transform 0.5s ease-in-out';
        counter++;
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    prevButton.addEventListener('click', () => {
        if (counter <= 0) return;
        carouselImages.style.transition = 'transform 0.5s ease-in-out';
        counter--;
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    carouselImages.addEventListener('transitionend', () => {
        if (images[counter].id === 'last-clone') {
            carouselImages.style.transition = 'none';
            counter = images.length - 2;
            carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        if (images[counter].id === 'first-clone') {
            carouselImages.style.transition = 'none';
            counter = images.length - counter;
            carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });
});