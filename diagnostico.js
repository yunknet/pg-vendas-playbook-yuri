function celebrateCompletion() {
  if (document.visibilityState === 'hidden') {
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      document.removeEventListener('visibilitychange', onVisible);
      celebrateCompletion();
    };
    document.addEventListener('visibilitychange', onVisible);
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  layer.setAttribute('aria-hidden', 'true');
  const colors = ['#e5b455', '#ffffff', '#218ba0', '#b48025'];
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement('i');
    piece.style.cssText = `left:${Math.random()*100}%;background:${colors[i%colors.length]};--drift:${Math.random()*160-80}px;--turn:${Math.random()*900-450}deg;animation-delay:${Math.random()*1.5}s;animation-duration:${3.5+Math.random()}s`;
    layer.append(piece);
  }
  document.body.append(layer);
  setTimeout(() => layer.remove(), 6500);
}

function renderDiagnosis(container, answers) {
  const p = profiles[calculateProfile(answers)];
  const last = questions.length - 1;
  const selectedGoal = questions[last].options[answers[last]][0];
  container.innerHTML = `<div class="completed">${questions.length} de ${questions.length} perguntas respondidas</div><p class="eyebrow">SEU DIAGNÓSTICO COMERCIAL</p><div class="result-layout"><div><h1><span class="result-prefix">Seu próximo passo:</span><strong class="result-highlight">${p.title.slice(p.title.indexOf(':') + 1).trim()}</strong></h1><p class="result-description">${p.body}</p><p class="result-kicker">Sua prioridade: ${selectedGoal}</p></div></div><div class="diagnosis-offer"><div class="offer-timer"><span>Oferta com Bônus</span><time id="offer-countdown" role="timer" aria-label="Tempo restante">15:00</time></div><p class="diagnosis-price"><span>De <s>R$ 97,00</s> por</span><span class="diagnosis-price-row"><strong>R$ 37,90</strong><small>+ Bônus - conteúdo extra</small></span></p><div class="result-actions"><button class="button" id="result-access">QUERO MEU ACESSO AGORA</button></div></div><p class="access-note" id="access-note" hidden role="status">O acesso por esta página estará disponível em breve.</p><p class="result-note">Orientação educativa baseada nas suas respostas. O resultado indica uma prioridade de estudo, sem medir ou garantir seu desempenho de vendas.</p>`;
  document.getElementById('result-access').addEventListener('click', () => {
    const url = window.YURI_ACCESS_URL;
    if (url) window.yuriGoToCheckout(url);
    else document.getElementById('access-note').hidden = false;
  });
  startCountdown();
  celebrateCompletion();
  window.yuriTrack?.('DiagnosisView');
}
const raw = new URLSearchParams(window.location.hash.slice(1)).get('respostas') || '';
const container = document.getElementById('result-content');
// Keep previously shared six-question results usable after removing the routine question.
const normalized = /^[0-3]{6}$/.test(raw) ? raw.slice(0, 4) + raw.slice(5) : raw;
if (new RegExp(`^[0-3]{${questions.length}}$`).test(normalized)) {
  renderDiagnosis(container, normalized.split('').map(Number));
} else {
  container.innerHTML = '<section class="empty"><p class="eyebrow">SEU DIAGNÓSTICO COMERCIAL</p><h1>Vamos conhecer seu momento?</h1><p>Responda às cinco perguntas para receber uma orientação baseada na sua rotina.</p><a class="button" href="quiz.html">Começar diagnóstico</a></section>';
}


function startCountdown() {
  const key = 'yuri-diagnosis-deadline';
  let deadline = Date.now() + 15 * 60 * 1000;
  try {
    const saved = Number(sessionStorage.getItem(key));
    if (saved > 0 && saved <= deadline) deadline = saved;
    sessionStorage.setItem(key, String(deadline));
  } catch (_) { /* Keep the timer usable when storage is unavailable. */ }
  const display = document.getElementById('offer-countdown');
  function update() {
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    display.textContent = String(Math.floor(remaining / 60)).padStart(2, '0') + ':' + String(remaining % 60).padStart(2, '0');
    return remaining;
  }
  if (update() === 0) return;
  const interval = setInterval(() => { if (update() === 0) clearInterval(interval); }, 1000);
}
