const chapters = [
 ['A cabeça do vendedor','1 a 6','Entenda a postura consultiva, a relação entre metas e atividades e a importância de um processo comercial transparente.'],
 ['Onde encontrar clientes','7 a 12','Conheça canais de prospecção, indicações e formas de retomar conversas com quem já demonstrou interesse.'],
 ['Instagram que vende','13 a 20','Organize sua presença digital e conecte conteúdo relevante com o início de novas conversas.'],
 ['Atendimento e diagnóstico','21 a 27','Aprenda a perguntar antes de apresentar e a entender objetivo, prazo e capacidade de pagamento.'],
 ['A venda e o fechamento','28 a 33','Estruture propostas, trate dúvidas e conduza os próximos passos com clareza.'],
 ['Follow-up e reativação','34 a 39','Acompanhe oportunidades e retome conversas com contexto, sem insistência vazia.'],
 ['Consórcio na prática','40 a 48','Estude os conceitos do consórcio e os pontos que precisam ser conferidos em cada operação.'],
 ['Estratégias de aplicação','49 a 54','Entenda como diferentes objetivos de compra pedem perguntas e análises diferentes.'],
 ['Máquina comercial','55 a 60','Conecte aquisição de clientes, atendimento e acompanhamento em um processo organizado.'],
 ['Sistema operacional','61 a 65','Organize rotina, agenda e indicadores e coloque seu plano de execução em prática.']
];
const list=document.getElementById('chapters');
chapters.forEach(([title,range,description],i)=>{const d=document.createElement('details');const s=document.createElement('summary');const n=document.createElement('span');n.className='chapter-number';n.textContent=String(i+1).padStart(2,'0');s.append(n,document.createTextNode(title));const p=document.createElement('p');p.textContent=description;const r=document.createElement('span');r.className='chapter-range';r.textContent='CAPÍTULOS '+range;p.append(r);d.append(s,p);list.append(d)});

const playbookHighlights = [
  ['NO PLAYBOOK', '65 capítulos organizados em 10 partes para estudar no seu ritmo.'],
  ['PARA COLOCAR EM PRÁTICA', '10 scripts para adaptar às suas conversas com clientes.'],
  ['INSTAGRAM', 'Aprenda a conectar conteúdo e novas conversas no Instagram.'],
  ['PRIMEIRO ATENDIMENTO', 'Saiba quais perguntas fazer antes de apresentar uma proposta.'],
  ['PROSPECÇÃO', 'Estude formas de encontrar interessados e iniciar conversas.'],
  ['ROTEIRO DE DIAGNÓSTICO', 'Perguntas para entender o objetivo do cliente.'],
  ['PROPOSTA COMERCIAL', 'Um modelo para organizar e apresentar sua proposta.'],
  ['ANTES DE ENVIAR', 'Use o checklist para revisar pontos importantes da proposta.'],
  ['CONTEÚDO DE 30 DIAS', 'Um plano para organizar os temas do seu Instagram.'],
  ['GLOSSÁRIO', 'Termos do consórcio para consultar sempre que precisar.'],
  ['ACOMPANHAMENTO', 'Aprenda a retomar uma conversa com contexto.'],
  ['ATENDIMENTO', 'Entenda objetivo, prazo e momento antes de oferecer.'],
  ['FECHAMENTO', 'Conduza os próximos passos com mais clareza.'],
  ['ROTINA COMERCIAL', 'Organize agenda e indicadores de venda.'],
  ['PARA INICIANTES', 'Comece pela base e avance para as próximas etapas.'],
  ['PRESENÇA DIGITAL', 'Organize seu perfil para comunicar o que você faz.'],
  ['SCRIPTS PRONTOS', 'Tenha um ponto de partida para sua próxima mensagem.'],
  ['MATERIAL ONLINE', 'Leia e consulte os capítulos pelo celular.'],
  ['MÓDULO EXTRA', 'Instagram que vende consórcio: 20 aulas em texto.'],
  ['SEU PRÓXIMO PASSO', 'Faça o diagnóstico gratuito antes de conhecer o Playbook.']
];

const proofCard = document.createElement('aside');
proofCard.className = 'social-proof';
proofCard.setAttribute('aria-label', 'O que você encontra no Playbook');
proofCard.hidden = true;
const proofDismiss = document.createElement('button');
proofDismiss.type = 'button';
proofDismiss.className = 'social-proof-close';
proofDismiss.setAttribute('aria-label', 'Desativar avisos nesta visita');
proofDismiss.textContent = '×';
const proofContent = document.createElement('div');
proofContent.setAttribute('role', 'status');
proofContent.setAttribute('aria-live', 'polite');
proofCard.append(proofDismiss, proofContent);
document.body.append(proofCard);
let proofIndex = 0;
let proofNextTimer;
let proofHideTimer;
let proofStopped = false;
function scheduleProof() {
  clearTimeout(proofNextTimer);
  if (!proofStopped && !document.hidden && proofIndex < playbookHighlights.length)
    proofNextTimer = setTimeout(showProof, 30000);
}
function showProof() {
  if (proofStopped || document.hidden || proofIndex >= playbookHighlights.length) return;
  const hasFocus = document.activeElement && document.activeElement !== document.body;
  const coversButton = [...document.querySelectorAll('.quiz-link')].some(el => {
    const r = el.getBoundingClientRect();
    return r.bottom > innerHeight - 180 && r.top < innerHeight && r.left < 340;
  });
  proofCard.classList.toggle('social-proof--top', coversButton);
  const [heading, message] = playbookHighlights[proofIndex++];
  const label = document.createElement('span');
  label.className = 'social-proof-label';
  label.textContent = heading;
  const text = document.createElement('p');
  text.textContent = message;
  proofContent.replaceChildren(label, text);
  proofCard.hidden = false;
  clearTimeout(proofHideTimer);
  proofHideTimer = setTimeout(() => { proofCard.hidden = true; }, 5000);
  scheduleProof();
}
proofDismiss.addEventListener('click', () => {
  proofStopped = true;
  clearTimeout(proofNextTimer);
  clearTimeout(proofHideTimer);
  proofCard.hidden = true;
});
document.addEventListener('visibilitychange', () => {
  clearTimeout(proofNextTimer);
  clearTimeout(proofHideTimer);
  proofCard.hidden = true;
  scheduleProof();
});
scheduleProof();