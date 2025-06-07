// Import the image
import chatbotImage from '../assets/images/chatbot.png';
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
    <img src="${chatbotImage}" alt="Reda Bot" class="cb-chat-bot__avatar">
    <p>${text}</p>
  `;
    } else {
      messageDiv.innerHTML = `<p>${text}</p>`;
    }
    
    this.messagesArea.appendChild(messageDiv);
    this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
  }

 getBotResponse(message) {
  const msg = message.toLowerCase().trim();

  const keywordsMap = [
    {
      keywords: ['project', 'projects', 'شغل', 'مشاريع', 'اعمالك'],
      replies: [
        'تقدر تشوف المشاريع في قسم Projects فوق ☝️',
        'Check out my latest work in the Projects section 🚀',
        'شوف شغلي في قسم المشاريع أو في GitHub 💼'
      ]
    },
    {
      keywords: ['skills', 'مهارات', 'بتعرف', 'بتعمل', 'تعرف'],
      replies: [
        'رضا بيشتغل بـ HTML, CSS, Sass, Bootstrap, JavaScript, React, Webpack ✅',
        'أنا شاطر في: React, Webpack, JavaScript, UI/UX Design 💻',
        'مهاراتي تشمل تطوير واجهات احترافية ومواقع متجاوبة 🌐'
      ]
    },
    {
      keywords: ['تواصل', 'اتواصل', 'contact', 'reach', 'email', 'ايميل'],
      replies: [
        'تقدر تبعتلي من خلال قسم التواصل في الأسفل 📩',
        'ابعتلي رسالة من خلال الفورم أو LinkedIn 👋',
        'كل وسائل التواصل موجودة في الفوتر أو على GitHub و LinkedIn 🔗'
      ]
    },
    {
      keywords: ['hi', 'hello', 'hey', 'مرحبا', 'اهلا', 'ازيك', 'كيفك', 'كيف حالك','كيفك يا رضا','ازيك','عامل ايه'],
      replies: [
        'أهلاً وسهلاً! 👋 كيف أقدر أساعدك؟',
        'Hi! Ask me anything about Reda 😊',
        'مرحبًا! أنا هنا للرد على أي استفسار يخص رضا 👨‍💻'
      ]
    },
    {
  keywords: ['مين رضا', 'مين رضا سالم', 'who is reda', 'about reda', 'مين انت', 'who are you','انت مين','من تكون','من رضا','من رضا سالم','ماشى هات','قولى',"انت اسمك ايه","انت مين","انت منين","انت منين يا رضا","انت منين يا رضا سالم",'تعرف رضا','عارف رضا'],
  replies: [
    'رضا سالم هو مطور واجهات أمامية شغوف، بيحب يبني مواقع تفاعلية وجميلة باستخدام تقنيات حديثة 👨‍💻',
    'Reda Salem is a creative frontend developer with strong skills in modern web development 🛠️',
    'أنا مساعد الذكاء الاصطناعي الخاص برضا سالم – وهقولك كل حاجة تحب تعرفها عنه 🤖',
    'رضا بيهتم بأدق التفاصيل في تصميم الواجهات وتجربة المستخدم، ودايمًا بيطور من نفسه 💡',
    'Reda is passionate about clean code, smart UI design, and building real-world digital experiences ✨'
  ]
},
{
  keywords: ['بتشتغل ايه', 'شغلك', 'وظيفتك', 'what do you do', 'job',' انت وظيفتك ايه'],
  replies: [
    'أنا مطور واجهات أمامية (Frontend Developer) بشتغل بـ React وJavaScript وتقنيات حديثة 💻',
    'I build modern, responsive, and fast web applications using React, Sass, Webpack, and more ⚙️',
    'وظيفتي تصميم وتطوير واجهات المستخدم اللي بتكون مريحة وسريعة وأنيقة 🌐'
  ]
},
{
  keywords: ['مميزات رضا', 'ليه تختاره', 'why reda', 'why should i hire you'],
  replies: [
    'رضا دقيق، سريع التعلّم، ملتزم، وبيفهم المطلوب قبل ما يتنفذ 💯',
    'Reda has a strong eye for design and a developer’s mind for performance 🚀',
    'بيجمع بين المهارة التقنية والذوق التصميمي وده نادر تلاقيه 🔥'
  ]
},
{
  keywords: ['صباح الخير', 'مساء الخير', 'good morning', 'good evening'],
  replies: [
     'اهلا بك صباح الفل او مساء الفل على حسب وقتك اجمل التحياتى لك'
  ]
},
{
  keywords: ['بتحب القهوة', 'جعان', 'زهقان', 'قهوة'],
  replies: [
    'أنا بوت بس بحب ريحة القهوة ☕',
    'لو جعان، أنصحك بموزة وشوية كود 😂',
    'زهقان؟ تعالى شوف مشاريع رضا هتتحمس فورًا 💻'
  ]
},
{
  keywords: ['تعبان', 'محبط', 'زهقت', 'مفيش شغل', 'فقدت الأمل'],
  replies: [
    'أنا مؤمن بيك زي رضا! كل مبرمج ناجح مر بلحظات كده... بس كمل 👊',
    'متوقفش دلوقتي! إنت قربت… والنجاح مش للي بيبدأ، النجاح للي بيكمل 💥',
    'الهدوء قبل العاصفة… وشغلك الجاي هو اللي هيخلي كل الناس تبصلك 👁️'
  ]
},
{
  keywords: ['بتفهم', 'ذكى', 'انت جامد','انت رائع'],
  replies: [
    'أنا بتعلّم من رضا، وده كفاية جدًا إني أكون جامد 😎',
    'أنا بوت بس دماغي مليانة JS و React 😂',
    'شكلك عايز تتحداني في كود؟ جربني بقى 💥'
  ]
},
{
  keywords: ['مين اللى صممك', 'مين اللى برمجك', 'انت مين اللى مبرمجك','من اللى عملك','who made you','who programmed you', 'who created you','مين طورك','who developed you','هل رضا من صممك','هل رضا من برمجك','هل رضا من عملك','هل انت من صنع رضا','هل انت من ملك رضا','مين ملكك','مين مالكك','مين صممك'],
  replies: [
    'أنا من تطوير رضا سالم، مطور واجهات أمامية محترف ',
    'رضا هو اللي صمم وبرمجني عشان أساعدكم في أي استفسار ',
    'أنا بوت ذكي من صنع رضا، وهو دايمًا بيطوّرني عشان أكون أفضل',
    'رضا هو اللي عملني عشان أكون مساعدك الشخصي في كل ما يخص البرمجة والتطوير',
    'أنا من تطوير رضا سالم، وهو دايمًا بيطوّرني عشان أكون أفضل مساعد لك في كل ما يخص البرمجة والتطوير'
  ]
}

  ];

  let found = false;

  for (const group of keywordsMap) {
    for (const keyword of group.keywords) {
      if (msg.includes(keyword)) {
        const randomReply = group.replies[Math.floor(Math.random() * group.replies.length)];
        this.addMessage(randomReply, 'bot');
        found = true;
        break;
      }
    }
    if (found) break;
  }

  // الرد الافتراضي
  if (!found) {
    const defaultReplies = [
      'ممكن توضح سؤالك؟ أنا هنا أساعدك 😊',
      'معذرة، مش فاهم قصدك بالضبط 😅',
      'جرب تسألني عن المشاريع أو المهارات أو التواصل! 💡'
    ];
    const fallback = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
    this.addMessage(fallback, 'bot');
  }
}
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ChatBot();
});