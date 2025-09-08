let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;

    function showSlide(index) {
      const slider = document.querySelector('.slider');
      slider.style.transform = `translateX(-${index * 25}%)`;
      
      // Actualizar indicadores
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }

    function changeSlide(direction) {
      currentSlideIndex += direction;
      
      if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
      } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
      }
      
      showSlide(currentSlideIndex);
    }

    function currentSlide(index) {
      currentSlideIndex = index - 1;
      showSlide(currentSlideIndex);
    }


    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        changeSlide(-1);
      } else if (e.key === 'ArrowRight') {
        changeSlide(1);
      }
    });

    // Touch/swipe para móviles
    let startX = 0;
    let endX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const threshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          changeSlide(1); // Swipe izquierda - siguiente slide
        } else {
          changeSlide(-1); // Swipe derecha - slide anterior
        }
      }
    }