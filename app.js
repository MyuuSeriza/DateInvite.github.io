const app = document.querySelector('#app');
const modalRoot = document.querySelector('#modal-root');
const state = { screen: 'invite', noAttempts: 0, date: '2026-08-06', activity: 'SURPRISE ME', noteOpen: false };
const guilt = ['Are you sure?', 'Babe please :(', "I'm gonna cry...", 'You really have no choice ♡'];
const activities = ['DINNER DATE', 'MOVIE NIGHT', 'COFFEE & WALK', 'PICNIC', 'MINI GOLF', 'SURPRISE ME'];
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function render(){
  const screens = { invite: inviteScreen, yay: yayScreen, date: dateScreen, activity: activityScreen, confirm: confirmScreen };
  app.innerHTML = screens[state.screen]();
  bind();
  if (state.noteOpen) renderNote();
}
function inviteScreen(){
  const scale = 1 + state.noAttempts * .12;
  return `<section class="screen" aria-labelledby="screen-title"><p class="eyebrow">A very important question</p><div class="art-frame"><div class="pixel-art cat" role="img" aria-label="A cute white pixel cat">૮ ˶ᵔ ᵕ ᵔ˶ ა</div></div><h1 id="screen-title" class="title">Will you go<br>out with me?</h1><p class="subtitle">I have a tiny plan and a big crush. Choose wisely.</p><div class="actions"><button id="yes-btn" class="btn btn-primary" style="transform:scale(${scale});" type="button">YES+</button><button id="no-btn" class="btn btn-ghost" type="button">No</button></div><p class="tease" aria-live="polite">${state.noAttempts ? guilt[Math.min(state.noAttempts-1,guilt.length-1)] : '♡ there is only one correct answer ♡'}</p></section>`;
}
function yayScreen(){ return `<section class="screen" aria-labelledby="screen-title"><p class="eyebrow">Correct answer detected</p><div class="art-frame"><div class="pixel-art bears" role="img" aria-label="Two pixel bears hugging"><span>ʕ•ᴥ•ʔ</span><span>ʕ•ᴥ•ʔ</span></div></div><h1 id="screen-title" class="title">Yay! I'm so glad<br>u said yes.</h1><p class="subtitle">Okay, now let's make our little plan official.</p><button id="continue-yay" class="btn btn-primary" type="button">Press to continue</button></section>`; }
function dateScreen(){ return `<section class="screen" aria-labelledby="screen-title"><div class="choice-card"><p class="eyebrow">Chapter one</p><h1 id="screen-title" class="title">Pick a date</h1><p class="subtitle">Choose the day for our cute little plan.</p><label class="eyebrow" for="date-input">Your special day</label><input class="date-input" id="date-input" type="date" value="${esc(state.date)}" min="2026-01-01" aria-describedby="date-help"><p id="date-help" class="eyebrow">MM / DD / YYYY</p><button id="continue-date" class="btn btn-primary" type="button">Continue</button></div></section>`; }
function activityScreen(){ return `<section class="screen" aria-labelledby="screen-title"><div class="choice-card"><p class="eyebrow">Chapter two</p><h1 id="screen-title" class="title">What would you<br>like to do?</h1><p class="subtitle">Pick the vibe. I'll bring the butterflies.</p><div class="activity-grid" role="group" aria-label="Choose an activity">${activities.map((item) => `<button class="activity ${state.activity===item?'selected':''}" data-activity="${esc(item)}" type="button" aria-pressed="${state.activity===item}">${item}</button>`).join('')}</div><button id="lock-btn" class="btn btn-primary" type="button">Lock it in</button></div></section>`; }
function formattedDate(){ return new Intl.DateTimeFormat('en-US',{weekday:'short',month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(`${state.date}T12:00:00Z`)); }
function confirmScreen(){ return `<section class="screen" aria-labelledby="screen-title"><p class="eyebrow">Final chapter</p><div class="art-frame"><div class="pixel-art bears" role="img" aria-label="Two pixel bears together"><span>ʕ•ᴥ•ʔ</span><span>ʕ•ᴥ•ʔ</span></div></div><h1 id="screen-title" class="title">It's a date!</h1><div class="summary"><div class="summary-row"><strong>Date</strong>${esc(formattedDate())}</div><div class="summary-row"><strong>Activity</strong>${esc(state.activity)}</div></div><button id="message-btn" class="notification" type="button"><span class="dot"></span> + 1 NEW MESSAGE</button></section>`; }
function moveNo(){
  state.noAttempts = Math.min(state.noAttempts + 1, 4);
  render();
  const no = document.querySelector('#no-btn');
  if(no){ no.style.position='relative'; no.style.left=`${(state.noAttempts%2?1:-1)*(40+state.noAttempts*17)}px`; no.style.top=`${state.noAttempts%2?-14:14}px`; no.focus(); }
}
function bind(){
  document.querySelector('#yes-btn')?.addEventListener('click',()=>{state.screen='yay';render()});
  document.querySelector('#no-btn')?.addEventListener('click',moveNo);
  document.querySelector('#continue-yay')?.addEventListener('click',()=>{state.screen='date';render()});
  document.querySelector('#continue-date')?.addEventListener('click',()=>{state.date=document.querySelector('#date-input').value||'2026-08-06';state.screen='activity';render()});
  document.querySelector('#date-input')?.addEventListener('change',(e)=>{state.date=e.target.value});
  document.querySelectorAll('[data-activity]').forEach((button)=>button.addEventListener('click',()=>{state.activity=button.dataset.activity;render()}));
  document.querySelector('#lock-btn')?.addEventListener('click',()=>{state.screen='confirm';render()});
  document.querySelector('#message-btn')?.addEventListener('click',()=>{state.noteOpen=true;renderNote()});
}
function renderNote(){ modalRoot.innerHTML = `<div class="modal-backdrop" role="presentation"><section class="note-window" role="dialog" aria-modal="true" aria-labelledby="note-title"><div class="note-titlebar"><span id="note-title">love_note.txt</span><button class="close-btn" id="close-note" type="button" aria-label="Close love note">×</button></div><div class="note-body"><p>You're really cute no matter what, don't say anyone else is. You make every ordinary day feel special.</p><p>Today and every day, I celebrate you and us.</p><p class="note-sign">xoxo,<br>inaki</p></div></section></div>`; document.querySelector('#close-note').focus();document.querySelector('#close-note').addEventListener('click',()=>{state.noteOpen=false;modalRoot.innerHTML=''});document.querySelector('.modal-backdrop').addEventListener('click',(e)=>{if(e.target.classList.contains('modal-backdrop')){state.noteOpen=false;modalRoot.innerHTML=''}}); }
document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&state.noteOpen){state.noteOpen=false;modalRoot.innerHTML=''}});
render();
