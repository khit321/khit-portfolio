const $ = (s) => document.querySelector(s);
$('#year').textContent = new Date().getFullYear();
const menuBtn=$('#menuBtn'),nav=$('#nav');
menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});btn.classList.add('active');btn.setAttribute('aria-pressed','true');document.querySelectorAll('.project-card').forEach(c=>{c.hidden=btn.dataset.filter!=='all'&&!c.dataset.category.split(' ').includes(btn.dataset.filter);});}));
const projectDetails={equipment:{title:'Equipment Service Hub',text:'A responsive equipment-service interface with equipment views, booking workflows, notifications, and document reminders. My focus was dashboard UX, organizing complex user tasks, and refining interactions from stakeholder feedback. I also experimented with an ESP32 button input for equipment-related timer workflows. Note: hardware/web integration was explored during development.',tags:['HTML','CSS','JavaScript','UI/UX','ESP32 exploration']},phishing:{title:'Phishing Detection & Awareness',text:'An internship web application designed to help staff report suspicious messages and support risk scoring, administrative review and awareness. I worked with Flask and database-backed workflows while learning to turn cybersecurity processes into understandable user interfaces.',tags:['Python','Flask','SQLite','Web application']},rail:{title:'Nebula X Hackathon',text:'A team challenge exploring ways to identify and present rail equipment anomalies. I contributed interface and dashboard design for exploring equipment status, anomalies and supporting information. The experience strengthened rapid prototyping, technical collaboration and communication under time pressure.',tags:['Hackathon','Teamwork','Dashboard UI','Engineering']},report:{title:'Service Report System',text:'A web-based internal service reporting workflow built during my A&H Controls internship. The goal was to organize operational information and make report preparation more consistent and convenient for users.',tags:['Web development','Internal tools','Workflow design']}};
const modal=$('#modalBackdrop');function closeModal(){modal.hidden=true;document.body.style.overflow='';}document.querySelectorAll('.detail').forEach(btn=>btn.addEventListener('click',()=>{const d=projectDetails[btn.dataset.project];$('#modalTitle').textContent=d.title;$('#modalText').textContent=d.text;$('#modalTags').replaceChildren(...d.tags.map(tag=>{const s=document.createElement('span');s.textContent=tag;return s;}));modal.hidden=false;document.body.style.overflow='hidden';$('#modalClose').focus();}));$('#modalClose').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
const panel=$('#chatPanel'),toggle=$('#chatToggle'),chatInput=$('#chatInput'),messages=$('#chatMessages');function openChat(open){panel.classList.toggle('open',open);panel.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));if(open)chatInput.focus();else toggle.focus();}toggle.addEventListener('click',()=>openChat(!panel.classList.contains('open')));$('#chatClose').addEventListener('click',()=>openChat(false));
const starters = [
  'What kind of engineer is Khit?',
  'Which project should I look at first?',
  'Tell me about her Flutter food delivery app',
  'What did Khit learn during her internship?',
  'Can she work with both hardware and software?',
  'How did F&B experience help her engineering work?',
  'Tell me the hackathon story!',
  'Why should I hire Khit?'
];
let history=[];
let sending=false;
const suggestions=$('#chatSuggestions');
function addMessage(text,type){const el=document.createElement('div');el.className=`message ${type}`;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el;}
function showSuggestions(items){suggestions.replaceChildren();items.forEach(q=>{const b=document.createElement('button');b.type='button';b.textContent=q;b.addEventListener('click',()=>ask(q));suggestions.appendChild(b);});}
showSuggestions(starters.slice(0,4));
async function ask(value){
 const q=value.trim();if(!q || sending)return;
 sending=true;chatInput.value='';addMessage(q,'user');
 const typing=addMessage('●  ●  ●','bot typing');
 showSuggestions([]);
 try{
  const resp=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,history})});
  const data=await resp.json();
  if(!resp.ok)throw new Error(data.error||'Something went wrong');
  typing.remove();addMessage(data.reply,'bot');
  history.push({role:'user',content:q},{role:'assistant',content:data.reply});history=history.slice(-12);
  showSuggestions(Array.isArray(data.suggestions)&&data.suggestions.length?data.suggestions:starters.slice(0,4));
 }catch(err){typing.remove();addMessage('OOPS the AI connection is taking a nap 😭 '+err.message+' Try again in a bit!','bot');showSuggestions(starters.slice(0,4));}
 finally{sending=false;chatInput.focus();}
}
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();ask(chatInput.value);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))openChat(false);});
const projectCounter=document.getElementById('projectCounter');
function updateProjectCounter(){const visible=[...document.querySelectorAll('.project-card')].filter(c=>!c.hidden).length;projectCounter.textContent=`${visible} project${visible===1?'':'s'} displayed`;}
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',updateProjectCounter));updateProjectCounter();
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion && 'IntersectionObserver' in window){document.body.classList.add('js-ready');const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}})},{threshold:.08});document.querySelectorAll('[data-reveal]').forEach(el=>revealObserver.observe(el));}
const progress=document.getElementById('scrollProgress'),backToTop=document.getElementById('backToTop');
function updateScroll(){const total=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(total>0?100*window.scrollY/total:0)+'%';backToTop.classList.toggle('visible',window.scrollY>600);}
window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion?'auto':'smooth'}));
const navLinks=[...document.querySelectorAll('.site-header nav a')];const trackedSections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('is-current',a.hash==='#'+entry.target.id));}})},{rootMargin:'-20% 0px -60% 0px'}).observe(trackedSections[0]);const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(a=>a.classList.toggle('is-current',a.hash==='#'+entry.target.id));})},{rootMargin:'-20% 0px -65% 0px'});trackedSections.forEach(section=>sectionObserver.observe(section));}
