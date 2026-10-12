let step = 0;
let advancing = false;
const answers = Array(questions.length).fill(null);
const back = document.getElementById('quiz-back');
function updateProgress() {
  const count = answers.filter(x => x !== null).length;
  document.getElementById('quiz-progress').value = count;
  document.getElementById('quiz-percent').textContent = Math.round(count / questions.length * 100) + '% concluído';
}
function drawQuestion() {
  advancing = false;
  const q = questions[step];
  document.getElementById('quiz-title').textContent = q.title;
  document.getElementById('quiz-step').textContent = `Pergunta ${step + 1} de ${questions.length}`;
  updateProgress();
  const options = document.getElementById('quiz-options');
  options.replaceChildren();
  q.options.forEach(([label], i) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.type = 'button';
    button.setAttribute('aria-pressed', String(answers[step] === i));
    const letter = document.createElement('span');
    letter.className = 'option-letter';
    letter.textContent = String.fromCharCode(65 + i);
    button.append(letter, document.createTextNode(label));
    button.addEventListener('click', () => {
      if (advancing) return;
      advancing = true;
      answers[step] = i;
      options.querySelectorAll('button').forEach((item, j) => {
        item.setAttribute('aria-pressed', String(i === j));
        item.disabled = true;
      });
      back.disabled = true;
      updateProgress();
      window.yuriTrack?.('QuizQuestionAnswered', { question_number: step + 1 });
      setTimeout(() => {
        if (step === questions.length - 1) return finishQuiz();
        step++;
        drawQuestion();
        document.getElementById('quiz-title').focus();
      }, 300);
    });
    options.append(button);
  });
  back.disabled = step === 0;
}
back.addEventListener('click', () => {
  if (advancing || step === 0) return;
  step--;
  drawQuestion();
  document.getElementById('quiz-title').focus();
});
function finishQuiz() {
  window.yuriTrack?.('QuizComplete');
  document.getElementById('questions-panel').hidden = true;
  document.getElementById('analysis-panel').hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById('analysis-fill').style.width = '100%'));
  setTimeout(() => {
    window.location.href = window.yuriWithCampaign('diagnostico.html#respostas=' + answers.join(''));
  }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 250 : 1900);
}
drawQuestion();
window.yuriTrack?.('QuizStart');
