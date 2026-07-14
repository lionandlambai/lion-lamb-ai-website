const root = document.body.dataset.root || '';
const page = document.body.dataset.page || '';

const navLinks = [
  ['home','index.html','Home'],['services','services.html','Solutions'],['packages','packages.html','Packages'],['industries','industries.html','Industries'],
  ['about','about.html','About'],
  ['faq','faq.html','FAQ'],['contact','contact.html','Contact']
];

const headerTarget = document.querySelector('[data-site-header]');
if (headerTarget) headerTarget.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="container nav-wrap">
    <a class="brand" href="${root}index.html" aria-label="Lion and Lamb AI home"><img src="${root}assets/logo.webp" alt=""><span>LION <small>AND</small> LAMB <em>AI</em></span></a>
    <nav class="main-nav" id="main-nav" aria-label="Main navigation">${navLinks.map(([id,url,label])=>`<a class="${page===id?'active':''}" href="${root}${url}">${label}</a>`).join('')}<a class="mobile-book" href="${root}book.html">Book Free Consultation <span>→</span></a></nav>
    <div class="nav-actions"><button class="theme-toggle" type="button" aria-label="Toggle light and dark theme">◐</button><a class="header-cta" href="${root}book.html">Book Free Consultation</a><button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">☰</button></div>
  </div></header>`;

const footerTarget = document.querySelector('[data-site-footer]');
if (footerTarget) footerTarget.innerHTML = `
  <footer class="site-footer"><div class="container">
    <div class="footer-top">
      <div class="footer-about"><a class="brand" href="${root}index.html"><img src="${root}assets/logo.webp" alt=""><span>LION <small>AND</small> LAMB <em>AI</em></span></a><p>Practical AI automation for businesses that want more time, better service, and sustainable growth.</p><a class="link-arrow" href="${root}book.html">Get your free AI audit →</a></div>
      <div class="footer-col"><h3>Solutions</h3><a href="${root}services.html#receptionists">AI Receptionists</a><a href="${root}services.html#automation">Business Automation</a><a href="${root}services.html#websites">AI Websites</a><a href="${root}packages.html">Setup Packages</a></div>
      <div class="footer-col"><h3>Industries</h3><a href="${root}industries/mechanics.html">Mechanics</a><a href="${root}industries/plumbers.html">Plumbers</a><a href="${root}industries/medical-clinics.html">Medical</a><a href="${root}industries/law-firms.html">Legal</a></div>
      <div class="footer-col"><h3>Resources</h3><a href="${root}resources.html">AI Guides</a><a href="${root}faq.html">FAQ</a><a href="${root}roi-calculator.html">ROI Calculator</a></div>
      <div class="footer-col"><h3>Company</h3><a href="${root}about.html">About</a><a href="${root}contact.html">Contact</a><a href="#">LinkedIn</a><a href="#">Facebook</a><a href="https://wa.me/">WhatsApp</a></div>
    </div>
    <div class="footer-lead"><div><h3>Free AI Audit</h3><p>Tell us where time disappears in your business. We’ll identify practical automation opportunities.</p></div><form class="mini-form demo-form"><label class="sr-only" for="footer-email">Work email</label><input id="footer-email" type="email" placeholder="Your work email" required><button class="btn btn-primary" type="submit">Request audit</button><span class="form-status" aria-live="polite"></span></form></div>
    <div class="footer-bottom"><span>© <span data-year></span> Lion and Lamb AI. All rights reserved.</span><div><a href="${root}privacy.html">Privacy Policy</a><a href="${root}terms.html">Terms</a><a href="${root}cookies.html">Cookie Policy</a></div></div>
  </div></footer><a class="whatsapp" href="https://wa.me/" aria-label="Chat with us on WhatsApp">W</a>`;

document.body.insertAdjacentHTML('beforeend', `
  <section class="chat-widget" aria-label="Lion and Lamb AI chat assistant">
    <button class="chat-toggle" type="button" aria-expanded="false" aria-controls="chat-panel">
      <span>Chat</span>
      <strong>AI</strong>
    </button>
    <div class="chat-panel" id="chat-panel" aria-hidden="true">
      <div class="chat-head">
        <div>
          <p class="eyebrow">Lion and Lamb AI</p>
          <h2>How can we help?</h2>
        </div>
        <button class="chat-close" type="button" aria-label="Close chat">x</button>
      </div>
      <div class="chat-body" aria-live="polite">
        <div class="chat-message bot">Hi, I am the Lion and Lamb AI assistant. Ask me about packages, AI receptionists, automation, websites, or booking a free consultation.</div>
      </div>
      <div class="chat-prompts" aria-label="Quick chat options">
        <button type="button" data-chat-prompt="Which package is right for my business?">Choose a package</button>
        <button type="button" data-chat-prompt="How can an AI receptionist help my business?">AI receptionist</button>
        <button type="button" data-chat-prompt="I want to book a free consultation">Book consultation</button>
      </div>
      <form class="chat-form">
        <label class="sr-only" for="chat-input">Type your message</label>
        <input id="chat-input" type="text" placeholder="Ask a question..." autocomplete="off">
        <button type="submit">Send</button>
      </form>
    </div>
  </section>`);

let savedTheme;
try { savedTheme = localStorage.getItem('ll-theme'); } catch (_) {}
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
document.querySelector('.theme-toggle')?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=next;try{localStorage.setItem('ll-theme',next)}catch(_){}});
const menuToggle=document.querySelector('.menu-toggle'), nav=document.querySelector('.main-nav');
menuToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open);menuToggle.textContent=open?'×':'☰';document.body.classList.toggle('menu-open',open)});
document.querySelectorAll('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item'),open=item.classList.toggle('open');btn.setAttribute('aria-expanded',open)}));
document.querySelectorAll('.demo-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector('.form-status');if(status) status.textContent='Thanks — this demo form is ready to connect to your CRM.';form.reset()}));
const chatWebhookUrl='https://bot.lionandlambai.com/webhook/1474e290-a872-4ba1-b90b-3ef5fc9deefe/chat';
const chatWidget=document.querySelector('.chat-widget'),chatToggle=document.querySelector('.chat-toggle'),chatPanel=document.querySelector('.chat-panel'),chatClose=document.querySelector('.chat-close'),chatBody=document.querySelector('.chat-body'),chatForm=document.querySelector('.chat-form'),chatInput=document.querySelector('#chat-input');
let chatSessionId;
try{chatSessionId=sessionStorage.getItem('ll-chat-session')||crypto.randomUUID();sessionStorage.setItem('ll-chat-session',chatSessionId)}catch(_){chatSessionId=String(Date.now())}
const openChat=()=>{chatWidget?.classList.add('open');chatToggle?.setAttribute('aria-expanded','true');chatPanel?.setAttribute('aria-hidden','false');setTimeout(()=>chatInput?.focus(),80)};
const closeChat=()=>{chatWidget?.classList.remove('open');chatToggle?.setAttribute('aria-expanded','false');chatPanel?.setAttribute('aria-hidden','true')};
const addChatMessage=(text,type='bot')=>{if(!chatBody)return null;const msg=document.createElement('div');msg.className=`chat-message ${type}`;msg.textContent=text;chatBody.appendChild(msg);chatBody.scrollTop=chatBody.scrollHeight;return msg};
const readChatReply=data=>typeof data==='string'?data:data?.output||data?.response||data?.text||data?.message||data?.reply||data?.answer||data?.data?.output||data?.data?.response||data?.[0]?.output||'Thanks — I received your message. Calvin will be able to follow up if needed.';
const sendChatMessage=async text=>{const thinking=addChatMessage('Thinking...','bot');try{const response=await fetch(chatWebhookUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chatInput:text,message:text,sessionId:chatSessionId,page:location.href,source:'lion-and-lamb-ai-website'})});if(!response.ok)throw new Error(`HTTP ${response.status}`);const contentType=response.headers.get('content-type')||'';const data=contentType.includes('application/json')?await response.json():await response.text();thinking.textContent=readChatReply(data)}catch(error){thinking.textContent='Sorry, I could not reach the AI assistant right now. Please try again shortly or book a free consultation.'}finally{chatBody.scrollTop=chatBody.scrollHeight}};
chatToggle?.addEventListener('click',()=>chatWidget?.classList.contains('open')?closeChat():openChat());
chatClose?.addEventListener('click',closeChat);
document.querySelectorAll('[data-chat-prompt]').forEach(btn=>btn.addEventListener('click',()=>{openChat();const text=btn.dataset.chatPrompt;addChatMessage(text,'user');sendChatMessage(text)}));
chatForm?.addEventListener('submit',e=>{e.preventDefault();const text=chatInput?.value.trim();if(!text)return;addChatMessage(text,'user');chatInput.value='';sendChatMessage(text)});
const interestSelect=document.querySelector('#interest');
if(interestSelect) interestSelect.innerHTML='<option>Not sure yet</option><option>AI Receptionist</option><option>Business Automation</option><option>AI Website</option><option>Starter Package</option><option>Growth Package</option><option>Full Scale Package</option>';
const packageSelect=document.querySelector('#book-package');
const packageMessage=document.querySelector('#book-problem');
if(packageSelect&&packageMessage){
  const names={starter:'Starter',growth:'Growth','full-scale':'Full Scale'};
  let autoMessage='';
  const applyPackage=()=>{const name=names[packageSelect.value];const next=name?`I want to buy the ${name} package and would like to discuss whether it is the right fit for my business.`:'';if(!packageMessage.value||packageMessage.value===autoMessage)packageMessage.value=next;autoMessage=next};
  const selected=new URLSearchParams(location.search).get('package');
  if(names[selected])packageSelect.value=selected;
  applyPackage();
  packageSelect.addEventListener('change',applyPackage);
}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
