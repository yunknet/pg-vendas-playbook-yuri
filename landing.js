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

// Adicione somente depoimentos autorizados e compras reais nesta lista.
// Compra: {type:'purchase', name:'Nome autorizado', purchasedAt:'data ISO real'}
// Depoimento: {type:'review', name:'Nome autorizado', text:'Depoimento original'}
const socialProofItems = [];
const socialProofDemo = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)
  && new URLSearchParams(location.search).get('popup-demo') === '1';
const demoNames = ['Mariana Oliveira','Rafael Almeida','Camila Santos','Lucas Ferreira','Juliana Ribeiro','Pedro Martins','Ana Costa','Bruno Silva','Larissa Souza','Gabriel Rocha','Beatriz Lima','Felipe Gomes','Carolina Alves','Diego Pereira','Amanda Barbosa','Thiago Mendes','Fernanda Dias','Gustavo Carvalho','Patrícia Nunes','Rodrigo Azevedo'];
const demoReviews = [
 'Os scripts deram um rumo às minhas conversas.',
 'Consegui organizar melhor os temas do meu Instagram.',
 'Gostei de saber por onde começar os estudos.',
 'As perguntas do diagnóstico são bem práticas.',
 'Consultar pelo celular facilita minha rotina.',
 'O checklist ajuda a revisar a proposta.',
 'O plano de conteúdo me deu novas ideias.',
 'Ficou mais claro como retomar um contato.',
 'Gostei dos exemplos para adaptar à minha abordagem.',
 'Os capítulos são fáceis de consultar.',
 'O glossário facilitou entender os termos.',
 'Aprendi a perguntar antes de oferecer.',
 'O material ajudou a organizar meu atendimento.',
 'Gostei da parte de prospecção e indicações.',
 'Agora tenho uma base para montar a proposta.',
 'A divisão em etapas facilita a leitura.',
 'Gostei das orientações para organizar o perfil.',
 'Os modelos ajudam a sair da página em branco.',
 'A parte de rotina me ajudou a planejar o dia.',
 'Gostei de estudar e adaptar ao meu jeito de falar.'
];
// Exemplos fictícios: nunca habilitados fora da prévia local identificada.
const demoTimestamp = new Date().toISOString();
const popupItems = socialProofDemo ? demoNames.flatMap((name, i) => [
  {type:'purchase', name, purchasedAt:demoTimestamp},
  {type:'review', name:demoNames[(i + 7) % demoNames.length], text:demoReviews[i]}
]) : socialProofItems;

if (popupItems.length) {
  const region = document.createElement('aside');
  region.className = 'social-proof';
  region.setAttribute('aria-label', socialProofDemo ? 'Demonstração de notificações' : 'Novidades do Playbook');
  region.hidden = true;
  const dismiss = document.createElement('button');
  dismiss.type = 'button'; dismiss.className = 'social-proof-close';
  dismiss.setAttribute('aria-label', 'Desativar notificações nesta visita');
  dismiss.textContent = '×';
  const live = document.createElement('div');
  live.setAttribute('role', 'status'); live.setAttribute('aria-live', 'polite');
  region.append(dismiss, live); document.body.append(region);
  let index = 0, nextTimer, hideTimer, stopped = false;
  const schedule = () => { clearTimeout(nextTimer); if (!stopped && !document.hidden) nextTimer = setTimeout(showNext, 30000); };
  function showNext(preview = false) {
    if (stopped || document.hidden) return;
    // Evita interromper a navegação por teclado ou ocultar um botão de acesso visível.
    const hasFocus = document.activeElement && document.activeElement !== document.body;
    const overlappingCTA = [...document.querySelectorAll('.quiz-link')].some(el => {
      const r = el.getBoundingClientRect();
      return r.bottom > innerHeight - 180 && r.top < innerHeight && r.left < 340;
    });
    if (!preview && (hasFocus || overlappingCTA)) { schedule(); return; }
    let item;
    while (index < popupItems.length) {
      const candidate = popupItems[index++];
      if (!candidate.name) continue;
      if (candidate.type === 'review' && candidate.text) { item = candidate; break; }
      const age = Date.now() - Date.parse(candidate.purchasedAt);
      if (candidate.type === 'purchase' && age >= 0 && age < 3600000) { item = candidate; break; }
    }
    if (!item) return;
    live.replaceChildren();
    const label = document.createElement('span'); label.className = 'social-proof-label';
    label.textContent = socialProofDemo ? 'DEMONSTRAÇÃO · DADOS FICTÍCIOS' : item.type === 'review' ? 'QUEM LEU, CONTOU' : 'COMPRA RECENTE';
    const message = document.createElement('p');
    if (item.type === 'review') message.textContent = '“' + item.text + '”';
    else {
      const minutes = Math.floor((Date.now() - Date.parse(item.purchasedAt)) / 60000);
      message.textContent = item.name + (minutes < 1 ? ' acabou de comprar o Playbook.' : ' comprou o Playbook há ' + minutes + ' min.');
    }
    const person = document.createElement('div'); person.className = 'social-proof-person';
    const avatar = document.createElement('span'); avatar.className = 'social-proof-avatar'; avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = item.name.split(/\s+/).map(n => n[0]).slice(0,2).join('');
    const name = document.createElement('strong'); name.textContent = item.name;
    person.append(avatar, name); live.append(label, message, person);
    region.hidden = false;
    hideTimer = setTimeout(() => { region.hidden = true; }, 5000);
    schedule();
  }
  if (socialProofDemo) {
    const previewButton = document.createElement('button');
    previewButton.className = 'proof-preview-button';
    previewButton.textContent = 'Prévia: próximo exemplo';
    previewButton.addEventListener('click', () => { stopped = false; clearTimeout(hideTimer); if (index >= popupItems.length) index = 0; showNext(true); });
    document.body.append(previewButton);
  }
  dismiss.addEventListener('click', () => {
    stopped = true; clearTimeout(nextTimer); clearTimeout(hideTimer); region.hidden = true;
  });
  document.addEventListener('visibilitychange', () => {
    clearTimeout(nextTimer); clearTimeout(hideTimer); region.hidden = true; schedule();
  });
  schedule();
}
