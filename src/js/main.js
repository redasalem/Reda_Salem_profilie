import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../sass/style.scss';
import './chatbot';

// change background color of navbar on scroll
 window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  // Select all sections that we want to track
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__links a');

// Add scroll event listener to update active link
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  // Remove active class from all links and add to current
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('.navbar__links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});


  // Intersection Observer for skills section
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      entry.target.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.animation = `cardPopUp 0.5s ease-out forwards ${index * 0.1}s`;
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// Observe the skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}






// EmailJS configuration at the top after imports
emailjs.init("2_GJsypbaxbLzMmDc");

// Form validation and submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form elements
  const nameInput = this.querySelector('input[name="name"]');
  const emailInput = this.querySelector('input[name="email"]');
  const subjectInput = this.querySelector('input[name="subject"]');
  const messageInput = this.querySelector('textarea[name="message"]');
  const submitButton = this.querySelector('button[type="submit"]');
  
  // Basic validation
  if (!nameInput.value || !emailInput.value || !messageInput.value || !subjectInput.value) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    showMessage('Please enter a valid email address', 'error');
    return;
  }
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  // Prepare template parameters
  const templateParams = {
    from_name: nameInput.value,
    from_email: emailInput.value,
    from_subject: subjectInput.value,
    message: messageInput.value,
    to_name: 'Reda Salem',
    reply_to: emailInput.value,
    current_date: new Date().toLocaleString('ar-EG'),
    current_year: new Date().getFullYear()
  };

  // console.log('Sending email with params:', templateParams);

  // Send email using EmailJS
  emailjs.send(
    'service_zd4h9mm',
    'template_9q2uc9d',
    templateParams,
    '2_GJsypbaxbLzMmDc'
  )
  .then((response) => {
    // console.log('SUCCESS!', response);
    showMessage('Message sent successfully!', 'success');
    this.reset();
  })
  .catch((error) => {
    // console.error('FAILED...', error);
    showMessage('Failed to send message. Please try again.', 'error');
  })
  .finally(() => {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send Message';
  });
});

// Message display function
function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `alert alert-${type} mt-3`;
  messageDiv.role = 'alert';
  messageDiv.textContent = message;
  
  const form = document.getElementById('contactForm');
  form.parentNode.insertBefore(messageDiv, form.nextSibling);
  
  // Remove message after 5 seconds
  setTimeout(() => messageDiv.remove(), 5000);
};


// Custom Bootstrap validation
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})();


//  لتفعيل الدوائر
document.addEventListener('DOMContentLoaded', function() {
  const skillLevels = document.querySelectorAll('.skill-level');

  skillLevels.forEach(skillLevel => {
    const level = skillLevel.dataset.level;

    // تفعيل الحركة بشكل دوري كل 4 ثوانٍ
    setInterval(() => {
      skillLevel.style.setProperty('--data-level', level + '%');
      skillLevel.setAttribute('data-level', level);
    }, 2000); // تكرار كل2  ثوانٍ 
  });
});



