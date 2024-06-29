document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.card-img-top');
    const carousel = document.getElementById('imageCarousel');
    const overlay = document.getElementById('carouselOverlay');
    const closeButton = document.getElementById('closeCarousel');
    const overlayBox = document.getElementById('carouselOverlayBox');
    const overlayTitle = document.getElementById('overlayContentTitle');
    const overlayDescription = document.getElementById('overlayContentDescription');
    let isHovering = false;
    let debounceTimeout;

    function updateOverlayContent(title, description) {
        overlayTitle.textContent = title;
        overlayDescription.textContent = description;
    }

    images.forEach(image => {
        image.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carousel);

            updateOverlayContent(title, description);

            carouselInstance.to(parseInt(index));
            carousel.classList.remove('d-none');
            overlay.classList.remove('d-none');
            overlayBox.classList.remove('d-none');
        });
    });

    // Function to show the overlay box
    function showOverlayBox() {
        clearTimeout(debounceTimeout);
        overlayBox.classList.remove('d-none');
        debounceTimeout = setTimeout(() => {
            overlayBox.classList.add('show');
        }, 10);
    }

    // Function to hide the overlay box
    function hideOverlayBox() {
        clearTimeout(debounceTimeout);
        overlayBox.classList.remove('show');
        debounceTimeout = setTimeout(() => {
            overlayBox.classList.add('d-none');
        }, 300);
    }

    overlay.addEventListener('click', function () {
        carousel.classList.add('d-none');
        overlay.classList.add('d-none');
        overlayBox.classList.add('d-none');
    });

    closeButton.addEventListener('click', function () {
        carousel.classList.add('d-none');
        overlay.classList.add('d-none');
        overlayBox.classList.add('d-none');
    });

    // Event listener for carousel mouseenter
    // carousel.addEventListener('mouseenter', function () {
    //     if (!isHovering) {
    //         showOverlayBox();
    //         isHovering = true;
    //     }
    // });

    // Event listener for carousel mouseleave
    // carousel.addEventListener('mouseleave', function () {
    //     hideOverlayBox();
    //     isHovering = false;
    // });

    // Update overlay content when the carousel slides
    carousel.addEventListener('slid.bs.carousel', function () {
        const activeItem = carousel.querySelector('.carousel-item.active img');
        const title = activeItem.getAttribute('data-title');
        const description = activeItem.getAttribute('data-description');

        updateOverlayContent(title, description);
    });

    // Event listener for keyboard navigation
    document.addEventListener('keydown', function (event) {
        const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carousel);
        if (event.key === 'ArrowLeft') {
            carouselInstance.prev();
        } else if (event.key === 'ArrowRight') {
            carouselInstance.next();
        } else if (event.key === 'Escape') {
            carousel.classList.add('d-none');
            overlay.classList.add('d-none');
            overlayBox.classList.add('d-none');
        }
    });
});