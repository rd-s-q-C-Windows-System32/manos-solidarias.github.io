
// script.js - JavaScript for Manos Solidarias
// - Loads news from news.json
// - Validates contact form (client-side)
// - Shows success message (simulates sending) and clears form

document.addEventListener('DOMContentLoaded', function(){
  // Menu toggle for small screens
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle?.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Load news
  fetch('news.json')
    .then(res => res.json())
    .then(data => renderNews(data))
    .catch(err => {
      const ndiv = document.getElementById('news-list');
      ndiv.innerHTML = '<p class="muted">No se pudieron cargar las noticias localmente.</p>';
      console.error(err);
    });

  // Form validation
  const form = document.getElementById('contactForm');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const messageEl = document.getElementById('message');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    clearErrors();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    let valid = true;
    if(name.length < 3){
      showError('err-name','El nombre debe tener al menos 3 caracteres.');
      valid = false;
    }
    if(!validateEmail(email)){
      showError('err-email','Ingresa un correo válido.');
      valid = false;
    }
    if(message.length < 10){
      showError('err-message','El mensaje debe tener al menos 10 caracteres.');
      valid = false;
    }

    if(!valid) return;

    // Simulate sending: show success and clear (for a real site, use fetch to a server)
    const success = document.getElementById('form-success');
    success.textContent = '¡Mensaje enviado! Gracias por contactarnos — responderemos pronto.';
    form.reset();
    // Remove success after 6 seconds
    setTimeout(()=> success.textContent = '', 6000);
  });

  function showError(id, text){
    const el = document.getElementById(id);
    if(el) el.textContent = text;
  }
  function clearErrors(){
    ['err-name','err-email','err-message'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.textContent = '';
    });
  }
  function validateEmail(email){
    // simple email regex (sufficient for client-side validation)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

function renderNews(data){
  const container = document.getElementById('news-list');
  if(!Array.isArray(data) || data.length === 0){
    container.innerHTML = '<p class="muted">No hay noticias disponibles.</p>';
    return;
  }
  container.innerHTML = '';
  data.forEach(item=>{
    const card = document.createElement('article');
    card.className = 'card';
    const title = document.createElement('h3'); title.textContent = item.title || 'Sin título';
    const p = document.createElement('p'); p.textContent = item.summary || '';
    const d = document.createElement('div'); d.className = 'date'; d.textContent = item.date || '';
    card.appendChild(title);
    card.appendChild(d);
    card.appendChild(p);
    container.appendChild(card);
  });
}
