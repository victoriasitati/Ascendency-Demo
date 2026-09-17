document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-list details');
  const form = document.getElementById('botemaForm');
  const input = document.getElementById('botemaInput');
  const messages = document.getElementById('botemaMessages');
  const promptButtons = document.querySelectorAll('[data-prompt]');

  const replies = {
    hi: 'Hi! I’m Botema, your AI coach. I can help you understand the platform, plan your next step, and stay focused on what matters most.',
    'i need help on the platform': 'Absolutely. Ascendency is designed to help you find clarity, build momentum, and access support that moves you forward. Tell me what you want to do on the platform and I’ll guide you.',
    'help me plan my next step': 'Start by identifying one clear goal, then build a 30-day plan around skills, support, and the next opportunity you want to reach.',
    'what skills should i learn first?': 'Focus first on the skills closest to the role you want, then add the communication and confidence skills that make you easy to hire or promote.',
    'i need help with my cv and interview prep': 'Focus on outcomes, not just responsibilities. Turn each experience into a result and prepare 3 stories that show your value clearly and confidently.',
    default: 'That is a great question. Let’s narrow it down to one goal, one relevant skill, and one action you can take this week.'
  };

  const formatText = (text) => {
    const safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    return safe.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>');
  };

  const addMessage = (text, type = 'user') => {
    const message = document.createElement('div');
    message.className = `chat-message ${type}`;

    if (type === 'bot') {
      message.innerHTML = `
        <span class="avatar botema-avatar" aria-label="Botema avatar">
          <svg viewBox="0 0 80 80" aria-hidden="true" focusable="false">
            <circle cx="40" cy="28" r="16" fill="#f0c2a2"/>
            <path d="M23 26c2-12 10-18 17-18 13 0 22 10 20 23-4-7-10-10-19-10-6 0-12 2-18 5Z" fill="#3b1d1d"/>
            <path d="M26 31c2-10 12-15 20-15 9 0 18 6 18 16 0 10-6 21-20 21-15 0-19-16-18-22Z" fill="#4f2f2f" opacity="0.95"/>
            <path d="M30 35c2 3 6 5 10 5s8-2 10-5l3 19c-3 7-12 10-17 10s-13-3-15-8l4-21Z" fill="#ec9a7d"/>
            <circle cx="34" cy="30" r="2" fill="#2b1a1a"/>
            <circle cx="46" cy="30" r="2" fill="#2b1a1a"/>
            <path d="M34 39c4 3 8 3 12 0" stroke="#2b1a1a" stroke-width="2" stroke-linecap="round" fill="none"/>
            <path d="M22 60c6-9 15-13 18-13s12 4 18 13v9H22v-9Z" fill="#8b5cf6"/>
            <path d="M29 63c6 3 12 5 18 5s12-2 18-5" stroke="#e9d5ff" stroke-width="2" stroke-linecap="round" fill="none"/>
          </svg>
        </span>
        <div><p>${formatText(text)}</p></div>
      `;
    } else {
      message.innerHTML = `
        <div><p>${formatText(text)}</p></div>
      `;
    }

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const maybePromptSignup = (key) => {
    const shouldPrompt = ['hi', 'i need help on the platform', 'help me plan my next step'].includes(key);

    if (!shouldPrompt) return;

    window.setTimeout(() => {
      const signupMessage = 'To use more of Botema and unlock the full Ascendency experience, sign up on the Ascendency platform here: https://bscascend.lovable.app/';
      addMessage(signupMessage, 'bot');
      window.open('https://bscascend.lovable.app/', '_blank', 'noopener,noreferrer');
    }, 2200);
  };

  const respond = (text) => {
    const key = text.toLowerCase().trim();
    const answer = replies[key] || replies.default;
    window.setTimeout(() => addMessage(answer, 'bot'), 250);
    window.setTimeout(() => maybePromptSignup(key), 1400);
  };

  const send = (value) => {
    const clean = value.trim();
    if (!clean) return;
    addMessage(clean, 'user');
    input.value = '';
    respond(clean);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    send(input.value);
  });

  promptButtons.forEach((button) => {
    button.addEventListener('click', () => {
      send(button.dataset.prompt);
    });
  });

  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;

      faqItems.forEach((other) => {
        if (other !== item) other.removeAttribute('open');
      });
    });
  });
});
