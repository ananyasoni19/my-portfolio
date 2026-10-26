const projectCards = [...document.querySelectorAll('.project-card')];
const searchInput = document.querySelector('#project-search');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const visibleCount = document.querySelector('#visible-count');
const emptyState = document.querySelector('#empty-state');

let activeFilter = 'all';

projectCards.forEach((card) => {
  const projectLink = card.querySelector('.project-link');
  if (!projectLink) return;
  const openProject = () => { window.location.href = projectLink.href; };
  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    openProject();
  });
});

function filterProjects() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  projectCards.forEach((card) => {
    const matchesTech = activeFilter === 'all' || card.dataset.tech === activeFilter;
    const matchesText = `${card.dataset.search} ${card.textContent}`.toLowerCase().includes(query);
    const show = matchesTech && matchesText;
    card.hidden = !show;
    if (show) visible += 1;
  });

  visibleCount.textContent = String(visible).padStart(2, '0');
  emptyState.hidden = visible > 0;
}

searchInput.addEventListener('input', filterProjects);
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    filterProjects();
  });
});

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

function updateThemeControl() {
  const dark = document.body.classList.contains('dark');
  themeIcon.textContent = dark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  document.querySelector('meta[name="theme-color"]').content = dark ? '#181b18' : '#f7f7f2';
}
updateThemeControl();
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeControl();
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

document.querySelectorAll('.placeholder-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.getAttribute('href') === '#contact') return;
    event.preventDefault();
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Simple local FAQ chat: answers are matched from this list; no API is used.
const chatPanel = document.querySelector('#faq-chat-panel');
const chatLauncher = document.querySelector('#faq-chat-launcher');
const chatClose = document.querySelector('#faq-chat-close');
const chatMessages = document.querySelector('#faq-chat-messages');
const chatForm = document.querySelector('#faq-chat-form');
const chatInput = document.querySelector('#faq-chat-input');
const chatSuggestions = document.querySelector('#faq-suggestions');
const fallbackAnswer = 'Sorry, I can only answer basic questions about this portfolio.';

if (chatPanel && chatLauncher && chatClose && chatMessages && chatForm && chatInput && chatSuggestions) {
  function openChat() {
    chatPanel.hidden = false;
    chatLauncher.setAttribute('aria-expanded', 'true');
    chatInput.focus();
  }

  function closeChat() {
    chatPanel.hidden = true;
    chatLauncher.setAttribute('aria-expanded', 'false');
    chatLauncher.focus();
  }

  function getFaqAnswer(question) {
    const text = question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

    if (text.includes('skill')) return 'My skills are C, C++, and Python.';
    if (text.includes('book reading list')) return 'It helps users maintain and manage a list of books they want to read.';
    if (text.includes('quiz application') || text.includes('quiz app')) return 'It is a quiz project where users can answer questions and check their results.';
    if (text.includes('python programs collection') || text.includes('python program collection')) return 'It contains a collection of Python programs for learning and practice.';
    if (text.includes('contact') || text.includes('reach you')) return 'Please check the Contact section of my portfolio for available contact details.';
    if (text.includes('project')) return 'I have projects including a Book Reading List, Quiz Application, Python Programs Collection, Code Improvement, and Bug Fixing.';

    return fallbackAnswer;
  }

  function addChatMessage(text, className) {
    const message = document.createElement('div');
    message.className = `faq-chat-message ${className}`;
    message.textContent = text;
    chatMessages.append(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function askQuestion(question) {
    const cleanedQuestion = question.trim();
    if (!cleanedQuestion) return;
    addChatMessage(cleanedQuestion, 'user-message');
    addChatMessage(getFaqAnswer(cleanedQuestion), 'bot-message');
  }

  chatLauncher.addEventListener('click', () => {
    if (chatPanel.hidden) openChat();
    else closeChat();
  });
  chatClose.addEventListener('click', closeChat);

  chatSuggestions.addEventListener('click', (event) => {
    const suggestion = event.target.closest('button');
    if (!suggestion) return;
    askQuestion(suggestion.textContent);
  });

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    askQuestion(chatInput.value);
    chatForm.reset();
    chatInput.focus();
  });
}
