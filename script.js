$(document).ready(function() {
    $(".hamburger").click(function() {
        $(".nav-links").toggleClass("active");
    });

    $(".nav-links a").on('click', function(event) {
        $(".nav-links").removeClass("active");
        
        if (this.hash !== "") {
            event.preventDefault();
            
            var hash = this.hash;
            var targetSection = $(hash);

            $('.scroll-container').animate({
                scrollTop: $('.scroll-container').scrollTop() + targetSection.offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    $('.dot').click(function() {
        var slideIndex = $(this).data('slide');
        
        $('.about-slide').removeClass('active');
        $('.dot').removeClass('active');
        
        $('.about-slide').eq(slideIndex).addClass('active');
        $(this).addClass('active');
    });

    let currentSlide = 0;
    const totalSlides = $('.about-slide').length;
    
    setInterval(function() {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        $('.dot').eq(currentSlide).click();
    }, 4000);

    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).find('.content').css('opacity', '1').css('transform', 'translateY(0)');
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        $(section).find('.content').css({
            'opacity': '0',
            'transform': 'translateY(20px)',
            'transition': 'all 1s ease'
        });
        observer.observe(section);
    });

});

(function(){
      emailjs.init({
        publicKey: "16rjR_4TNCb1zCox4", 
      });
   })();

   function showPopup(message, type) {
       var popup = document.getElementById("status-popup");
       
       popup.innerText = message;
       
       
       popup.className = "show " + type;


       setTimeout(function(){ 
           popup.className = popup.className.replace("show", ""); 
       }, 5000);
   }

   document.getElementById('contactForm').addEventListener('submit', function(event) {
       event.preventDefault();

       const btn = $('#submitbtn');
       const originalText = btn.innerText;
       btn.innerText = 'Sending...';

       emailjs.sendForm('service_froiwsf', 'template_zr5kv9h', this)
           .then(() => {
               btn.innerText = 'Sent!';
               showPopup('Message sent successfully!', 'success');
               document.getElementById('contactForm').reset();
               setTimeout(() => btn.innerText = originalText, 3000); 
           }, (error) => {
               btn.innerText = originalText;
                showPopup('Failed to send message. Please try again.', 'error');
               console.log('FAILED...', error);
           });
   });

