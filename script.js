$(document).ready(function() {
    
    /* --- MOBILE MENU LOGIC --- */
    $(".hamburger").click(function() {
        // Toggle the 'active' class on the links (shows/hides them)
        $(".nav-links").toggleClass("active");
    });

    // Close the menu when a link is clicked
    $(".nav-links a").on('click', function(event) {
        $(".nav-links").removeClass("active"); // Hide menu
        
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

    /* --- CAROUSEL LOGIC --- */
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

    /* --- ENTRANCE ANIMATION --- */
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
       
       // Set the text
       popup.innerText = message;
       
       
       popup.className = "show " + type;


       setTimeout(function(){ 
           popup.className = popup.className.replace("show", ""); 
       }, 5000);
   }

   // 2. Listen for the form submit event
   document.getElementById('contactForm').addEventListener('submit', function(event) {
       event.preventDefault();

       const btn = $('#submitbtn');
       const originalText = btn.innerText;
       btn.innerText = 'Sending...';

       // 3. Send the form data
       // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values from Step 1
       emailjs.sendForm('service_froiwsf', 'template_zr5kv9h', this)
           .then(() => {
               // Success!
               btn.innerText = 'Sent!';
               showPopup('Message sent successfully!', 'success');
               document.getElementById('contactForm').reset(); // Clear the form
               setTimeout(() => btn.innerText = originalText, 3000); // Reset button text
           }, (error) => {
               // Error!
               btn.innerText = originalText;
                showPopup('Failed to send message. Please try again.', 'error');
               console.log('FAILED...', error);
           });
   });
