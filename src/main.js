import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './sass/style.scss';

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




//chatbot 
class ChatBot {
  constructor() {
    this.toggle = document.querySelector('.cb-chat-bot__toggle');
    this.box = document.querySelector('.cb-chat-bot__box');
    this.closeBtn = document.querySelector('.cb-chat-bot__close');
    this.input = document.querySelector('#cb-user-input');
    this.sendBtn = document.querySelector('.cb-chat-bot__send');
    this.messagesArea = document.querySelector('.cb-chat-bot__messages');
    
    this.initEventListeners();
  }

  initEventListeners() {
    // Toggle chat box
    this.toggle.addEventListener('click', () => {
      this.box.classList.add('active');
    });

    // Close chat box
    this.closeBtn.addEventListener('click', () => {
      this.box.classList.remove('active');
    });

    // Send message on button click
    this.sendBtn.addEventListener('click', () => {
      this.sendMessage();
    });

    // Send message on Enter key
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  sendMessage() {
    const message = this.input.value.trim();
    if (message) {
      // Add user message
      this.addMessage(message, 'user');
      
      // Get bot response
      this.getBotResponse(message);
      
      // Clear input
      this.input.value = '';
    }
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('cb-chat-bot__message', `cb-chat-bot__message--${sender}`);
    
    if (sender === 'bot') {
      messageDiv.innerHTML = `
        <img src="./src/assets/images/chatbot.png" alt="Reda Bot" class="cb-chat-bot__avatar">
        <p>${text}</p>
      `;
    } else {
      messageDiv.innerHTML = `<p>${text}</p>`;
    }
    
    this.messagesArea.appendChild(messageDiv);
    this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
  }

  getBotResponse(message) {
    // يمكنك تخصيص الردود هنا
    const responses = {
      // Greetings
      'hi': 'Hello! How can I help you today? 👋',
      'hello': 'Hi there! How are you? 😊',
      'hey': 'Hey! What can I do for you? ✨',
      'good morning': 'Good morning! How may I assist you today? ☀️',
      'good evening': 'Good evening! How can I help? 🌙',

      // About Me
      'who are you': 'I am Reda Salem\'s AI assistant, here to help you learn more about him 🤖',
      'what is your name': 'I am Reda\'s portfolio assistant! Nice to meet you 👾',
      'about': 'Reda Salem is a passionate web developer and UI designer with expertise in modern web technologies 👨‍💻',
      'tell me about reda': 'Reda is a creative web developer focused on building beautiful and functional websites with great user experiences 🎨',

      // Technical Skills
      'skills': 'My technical skills include:\n• HTML, CSS, JavaScript\n• React, Bootstrap\n• SASS/SCSS\n• Responsive Design\n• UI/UX Design 💻',
      'technologies': 'I work with modern web technologies including:\n• React for dynamic interfaces\n• Bootstrap for responsive design\n• SASS for better styling\n• JavaScript for interactivity 🛠️',
      'programming languages': 'I primarily work with:\n• JavaScript (ES6+)\n• HTML5\n• CSS3/SCSS 👨‍💻',
      'frameworks': 'I\'m proficient in:\n• React.js\n• Bootstrap\n• Tailwind CSS\n• And other modern frameworks 🔧',

      // Projects
      'projects': 'Check out my latest projects:\n• E-commerce Website\n• Coffee Shop Platform\n• Portfolio Website\nYou can view them all in the projects section above! 🚀',
      'show projects': 'Take a look at my projects section to see my work in action! 📂',
      'portfolio': 'My portfolio showcases various web development projects with different technologies 💼',
      'recent work': 'My recent work includes e-commerce platforms and responsive business websites 🎯',
      'websites': 'I\'ve built several websites including e-commerce and business sites. Check them out above! 🌐',

      // Contact Information
      'contact': 'You can reach me through:\n• The contact form below\n• LinkedIn\n• GitHub\n• Email 📫',
      'email': 'Feel free to use the contact form below to send me a message! 📧',
      'social media': 'Find me on:\n• LinkedIn\n• GitHub\n• Twitter\nLinks are in the footer! 🔗',
      'how to reach': 'The best way to reach me is through the contact form or social media platforms 📱',
      'get in touch': 'I\'d love to hear from you! Use the contact form below or find me on social media 🤝',

      // Professional Inquiries
      'work with you': 'I\'d be happy to discuss potential collaborations! Please use the contact form to reach out 💼',
      'hire you': 'For work inquiries, please reach out through the contact form below. Let\'s create something amazing! 🤝',
      'freelance': 'Yes, I am available for freelance projects! Let\'s discuss your needs through the contact form 🎯',
      'services': 'I offer:\n• Web Development\n• UI/UX Design\n• Frontend Development\n• Responsive Design 🛠️',

      // Common Phrases
      'thanks': 'You\'re welcome! Let me know if you need anything else 😊',
      'thank you': 'My pleasure! Feel free to ask any other questions 🙌',
      'bye': 'Goodbye! Have a great day! 👋',
      'see you': 'Looking forward to our next interaction! Take care! ✨',
      'help': 'I can help you learn about:\n• Skills & Experience\n• Projects\n• Contact Information\nWhat would you like to know? 💡',
      // Add more variations for skills
    'experience': 'I have extensive experience in:\n• Frontend Development\n• Responsive Design\n• UI/UX Design\n• Modern Web Technologies 💪',
    'frontend': 'As a frontend developer, I specialize in:\n• React Applications\n• Modern JavaScript\n• CSS Architecture\n• Performance Optimization 🚀',
    'design': 'My design skills include:\n• UI/UX Design\n• Responsive Layouts\n• Modern Web Design\n• User-Centered Approach 🎨',

    // Add more project-related responses
    'ecommerce': 'My E-commerce project features:\n• Full Shopping Cart\n• Product Catalog\n• Responsive Design\n• Modern UI/UX\nCheck it out in the projects section! 🛍️',
    'coffee shop': 'The Coffee Shop project includes:\n• Beautiful Design\n• Menu System\n• Responsive Layout\n• Smooth Animations ☕',
    'best work': 'My best projects include:\n• E-commerce Platform\n• Coffee Shop Website\n• Portfolio Site\nEach showcases different skills and technologies 🏆',

    // Enhanced professional responses
    'work history': 'I have worked on various projects including:\n• E-commerce Platforms\n• Business Websites\n• Portfolio Sites\n• Web Applications 💼',
    'expertise': 'My areas of expertise include:\n• Frontend Development\n• Responsive Design\n• UI/UX Design\n• Modern Web Technologies 🎯',
    'specialization': 'I specialize in creating:\n• User-Friendly Interfaces\n• Responsive Websites\n• Modern Web Applications\n• Clean, Efficient Code ⚡',

    // Add more detailed contact responses
    'location': 'I am based in Egypt but work with clients worldwide! Feel free to reach out through the contact form 🌍',
    'availability': 'I am currently available for:\n• Freelance Projects\n• Full-time Positions\n• Collaborations\nLet\'s discuss your needs! 📅',
    'connect': 'Let\'s connect! You can find me on:\n• LinkedIn\n• GitHub\n• Twitter\nOr use the contact form below 🤝',
    'how are you':"i'm just a bot, but I'm here to help you with any questions you have! 😊",
    "مرحبا": "أهلاً وسهلاً! 👋 إزاي ممكن أساعدك؟",
    'اهلا': "أهلاً بيك! 😊 إزاي ممكن أساعدك؟",
  "ازيك": "أنا بخير، شكرًا لسؤالك 😊 إنت عامل إيه؟",
  "مين انت": "أنا مساعد الذكاء الاصطناعي الخاص برضا سالم – مطور واجهات أمامية 💻",
  "ايه اللي بتعمله": "أنا هنا لمساعدتك في معرفة المزيد عن رضا ومشاريعه ومهاراته في تطوير الويب 🌐",
  "ايه المهارات عندك": "رضا عنده مهارات في:\n• HTML, CSS, JavaScript\n• React.js\n• Bootstrap\n• SASS/SCSS\n• تصميم واجهات المستخدم 🎨",
  "ايه المشاريع اللي عملتها": "رضا عمل مشاريع زي:\n• موقع تجارة إلكترونية\n• منصة مقهى\n• موقع بورتفوليو شخصي\nتقدر تشوفهم في قسم المشاريع فوق! 🚀",
  "ايه المهارات بتاعتك": "رضا بيشتغل بـ HTML, CSS, Sass, Bootstrap, JavaScript, React, Webpack ✅",
  "فين اقدر اشوف المشاريع": "تقدر تشوف المشاريع في قسم Projects فوق ☝️ أو اضغط هنا 👉 /#projects",
  "ازى اتواصل معاك": "ممكن تبعت رسالة من خلال قسم 'تواصل معايا'، أو مباشرة على الإيميل: reda@example.com 📩",
  "ايه هى خبرتك": "رضا عنده خبرة في تطوير الويب وتصميم واجهات المستخدم لأكثر من 3 سنين، وبيحب يطور مواقع متجاوبة وسريعة 🚀",
  "هل بتشتغل فريلانسر": "أيوه، رضا متاح حاليًا للعمل الحر، ابعت تفاصيلك وهيتواصل معاك في أقرب وقت 😊",
  "بتستخدم ايه في التصميم": "بيستخدم Sass وBootstrap وTailwind أحيانًا لتصميم واجهات أنيقة ومتجاوبة.",
  "هل عندك بورتفوليو": "أكيد! إنت بالفعل فيه 😄 استكشف الأقسام وشوف المهارات والمشاريع.",
  "شكرا": "العفو! لو عندك أي سؤال تاني، أنا هنا ✨",
  "مع السلامة": "باي باي 👋 أتمنى لك يوم جميل!",
  'الحمد لله': 'الحمد لله! كيف يمكنني مساعدتك اليوم؟ 😊',
    };

   setTimeout(() => {
      const response = responses[message.toLowerCase()] || 'I didn\'t quite catch that. Could you please rephrase your question?';
      this.addMessage(response, 'bot');
    }, 500);
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ChatBot();
});