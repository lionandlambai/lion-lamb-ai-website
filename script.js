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

let savedTheme;
try { savedTheme = localStorage.getItem('ll-theme'); } catch (_) {}
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
document.querySelector('.theme-toggle')?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=next;try{localStorage.setItem('ll-theme',next)}catch(_){}});
const menuToggle=document.querySelector('.menu-toggle'), nav=document.querySelector('.main-nav');
menuToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open);menuToggle.textContent=open?'×':'☰';document.body.classList.toggle('menu-open',open)});
document.querySelectorAll('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item'),open=item.classList.toggle('open');btn.setAttribute('aria-expanded',open)}));
document.querySelectorAll('.demo-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector('.form-status');if(status) status.textContent='Thanks — this demo form is ready to connect to your CRM.';form.reset()}));
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
