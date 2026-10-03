// Configure o destino quando o responsável definir a próxima etapa.
const ACCESS_URL = window.YURI_ACCESS_URL || "";
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
const dialog=document.getElementById('access-dialog');
document.querySelectorAll('.access').forEach(b=>b.addEventListener('click',()=>{if(ACCESS_URL){window.location.assign(ACCESS_URL)}else{dialog.showModal()}}));
document.querySelector('#access-dialog .close').addEventListener('click',()=>dialog.close());document.getElementById('dialog-ok').addEventListener('click',()=>{dialog.close();document.getElementById('conteudo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
