import { decide } from './core/engine.js';
import { loadState, saveState, resetState, ONBOARDING_VERSION } from './core/storage.js';
import { buildHumanGraph, projectHumanReturn } from './core/human-graph.js';
import { renderLivingGraph } from './components/living-graph.js';
import { unlockAudio, playTone, speak, stopVoice } from './core/audio.js';

const app = document.querySelector('#app');
window.__strategosStarted = true;
let state = loadState();
let context = { sleep: 3, energy: 2, time: 15, challenge: 'body' };
let decision = null;
let timer = null;
let secondsLeft = 0;
let phaseIndex = 0;
let paused = false;
let wakeLock = null;
let onboardingStep = 0;
let onboardingDraft = { identity: '', name: '' };

const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const vibrate = (pattern = 12) => { if (state.settings.haptics) navigator.vibrate?.(pattern); };
function shell(content, cls = '') { app.innerHTML = `<main class="screen ${cls}">${content}</main>`; }
function deltaMark(size = 'large') { return `<svg class="delta ${size}" viewBox="0 0 140 140" role="img" aria-label="OneArete Delta"><circle class="ring" cx="70" cy="70" r="56"/><path class="glyph" d="M70 25 L112 108 M112 108 L28 108 M28 108 L63 39"/></svg>`; }
function button(label, action, secondary = false) { return `<button class="action ${secondary ? 'secondary':''}" data-action="${action}">${label}</button>`; }
function header(title = 'STRATEGOS', right = '') { return `<header>${deltaMark('small')}<span>${title}</span>${right}</header>`; }

function route(name) {
  clearInterval(timer); timer = null; stopVoice();
  ({ splash, onboarding, observe, thinking, practice, execute, reflect, journal, history, settings }[name] || splash)();
  window.scrollTo(0,0);
}

function splash() {
  shell(`${deltaMark()}<div class="brand"><div class="eyebrow">ONEARETE</div><h1>STRATEGOS</h1><p>Know yourself.<br/>Improve deliberately.</p></div><button class="tap" data-action="begin">Tap to begin</button>`, 'splash');
}

function onboarding() {
  const steps = [
    `${header('WELCOME')}<section class="stack onboarding"><p class="eyebrow">A LIVING COMPANION</p><h2>See the whole person.</h2><p class="muted">Strategos turns daily context into a deliberate practice, then learns from what actually helped.</p><div class="onboarding-mark">${deltaMark()}</div>${button('CONTINUE','onboarding-next')}</section>`,
    `${header('FIRST PRINCIPLE')}<section class="stack"><p class="eyebrow">IDENTITY BEFORE ACTIVITY</p><h2>Who do you choose<br/>to become?</h2><p class="muted">Choose the identity that should guide your first decisions.</p><div class="choice-grid identity">${['Stronger','Wiser','More disciplined','More resilient','A better parent','A better partner'].map(x=>`<button class="choice ${onboardingDraft.identity===x?'selected':''}" data-identity="${x}">${x}</button>`).join('')}</div></section>`,
    `${header('YOUR COMPANION')}<section class="stack"><p class="eyebrow">PERSONAL, NOT PERFORMATIVE</p><h2>What should<br/>Strategos call you?</h2><input class="name-input" id="onboarding-name" autocomplete="given-name" value="${esc(onboardingDraft.name)}" placeholder="Your name" />${button('BEGIN','onboarding-complete')}</section>`
  ];
  shell(steps[onboardingStep] || steps[0]);
}

function observe() {
  const name = state.profile?.name || '';
  const graph = buildHumanGraph(state.history, context);
  shell(`${header('STRATEGOS','<button class="icon-btn" data-action="settings" aria-label="Settings">•••</button>')}<section class="stack observe-stack"><div><p class="eyebrow">OBSERVE</p><h2>${greeting()}${name ? `, ${esc(name)}`:''}.</h2><p class="muted">See the whole person. Then choose deliberately.</p></div>${renderLivingGraph(graph, { compact: true })}<div class="signal-panel"><p class="eyebrow">TODAY'S SIGNALS</p>${question('How did you sleep?','sleep',[[4,'Excellent'],[3,'Good'],[2,'Fair'],[1,'Poor']])}${question('Energy','energy',[[3,'High'],[2,'Medium'],[1,'Low']])}${question('Time available','time',[[5,'5'],[15,'15'],[30,'30'],[60,'60+']])}${question('Today’s greatest challenge','challenge',[['body','Body'],['mind','Mind'],['focus','Focus'],['recovery','Recovery'],['family','Family'],['work','Work']])}</div>${button('CONSULT STRATEGOS','consult')}</section>`);
}
function question(title,key,opts){return `<div class="question"><h3>${title}</h3><div class="choice-row">${opts.map(([v,l])=>`<button class="pill ${context[key]===v?'selected':''}" data-key="${key}" data-value="${v}">${l}${key==='time'?' min':''}</button>`).join('')}</div></div>`}

function thinking() {
  shell(`${deltaMark()}<div class="thinking-copy"><p class="eyebrow">STRATEGOS</p><h2>Evaluating today’s context.</h2><p id="thinking-line" class="muted">Reading constraints…</p></div>`, 'thinking');
  const lines=['Reading constraints…','Comparing possible practices…','Estimating human return…','Practice prepared.']; let i=0;
  const cycle=setInterval(()=>{ const el=document.querySelector('#thinking-line'); i += 1; if(el) el.textContent=lines[i] || lines.at(-1); },480);
  setTimeout(()=>{clearInterval(cycle); decision=decide(context,state.history);state.current={context,decision,startedAt:null};saveState(state);route('practice')},2100);
}

function practice() {
  decision ||= state.current?.decision || decide(context,state.history);
  const d=decision; const p=d.practice || d.mission;
  const projectedGraph = projectHumanReturn(buildHumanGraph(state.history, context), d.delta);
  shell(`${header('STRATEGOS','<button class="icon-btn" data-action="observe" aria-label="Back">×</button>')}<section class="mission-hero"><p class="eyebrow">TODAY’S PRACTICE</p><p class="intention">${esc(d.intention || 'Choose deliberately.')}</p><h2>${p.name}</h2><div class="mission-meta"><span>${d.duration} min</span><span>${p.virtue}</span></div><div class="delta-score"><span>EXPECTED HUMAN RETURN</span><strong>+${d.delta.overall.toFixed(2)}</strong></div></section>${renderLivingGraph(projectedGraph, { compact: true })}<section class="reasoning"><div class="section-title"><span>WHY THIS PRACTICE</span><span>${d.confidence}% confidence</span></div>${d.reasons.map(r=>`<p><i></i>${r}</p>`).join('')}<details><summary>What was also considered?</summary><p class="muted">${d.alternatives.join(' and ')} produced a lower expected return in today’s context.</p></details></section><div class="bottom-actions">${button('BEGIN PRACTICE','commit')}<button class="text-btn" data-action="observe">Reassess context</button></div>`);
}

async function requestWakeLock() {
  if (!state.settings.keepAwake || !('wakeLock' in navigator)) return;
  try { wakeLock = await navigator.wakeLock.request('screen'); } catch (_) {}
}
function releaseWakeLock(){ try { wakeLock?.release(); } catch (_) {} wakeLock=null; }

function execute() {
  const d=decision || state.current.decision; const p=d.practice || d.mission; const phases=p.phases; phaseIndex=0; paused=false;
  state.current.startedAt = new Date().toISOString();
  const total=d.duration*60; const sourceTotal=phases.reduce((a,x)=>a+x[1],0); const scale=total/sourceTotal;
  state.current.adjusted=phases.map(x=>[x[0],Math.max(20,Math.round(x[1]*scale)),x[2],x[3] || []]); saveState(state);
  requestWakeLock(); playTone('begin', state.settings.sound); runPhase(state.current.adjusted);
}
function phaseSpeech(p) {
  if (state.settings.voice === 'guided') return `${p[0]}. ${p[2]} ${p[3]?.[0] || ''}`;
  return `${p[0]}. ${Math.max(1, Math.round(p[1]/60))} minutes.`;
}
function runPhase(phases){
  const p=phases[phaseIndex]; if(!p){finishPractice();return;} secondsLeft=p[1]; paused=false;
  playTone('phase', state.settings.sound); speak(phaseSpeech(p), state.settings.voice, true);
  const guidance=(p[3]||[]).map(item=>`<li>${esc(item)}</li>`).join('');
  shell(`<header><span class="eyebrow">PRACTICE IN PROGRESS</span><button class="icon-btn" data-action="abandon">×</button></header><section class="execution"><p class="phase-count">${phaseIndex+1} / ${phases.length}</p><p class="practice-intention">${esc((decision||state.current.decision).intention || '')}</p><h2>${p[0]}</h2><div class="clock" id="clock">${formatTime(secondsLeft)}</div><p class="phase-summary">${p[2]}</p>${guidance?`<details class="exercise-guide" open><summary>How to do it</summary><ul>${guidance}</ul></details>`:''}<div class="progress"><span id="phase-progress"></span></div></section><div class="practice-controls"><button class="round-control" data-action="previous-phase" aria-label="Previous phase">‹</button><button class="pause-control" data-action="pause">Pause</button><button class="round-control" data-action="next-phase" aria-label="Next phase">›</button></div>`,'execute');
  startTimer(p, phases);
}
function startTimer(p, phases){
  clearInterval(timer); timer=setInterval(()=>{
    if(paused)return; secondsLeft--;
    const c=document.querySelector('#clock'); const bar=document.querySelector('#phase-progress');
    if(c)c.textContent=formatTime(secondsLeft); if(bar)bar.style.width=`${100*(1-secondsLeft/p[1])}%`;
    if(secondsLeft>0 && secondsLeft<=3){playTone('countdown',state.settings.sound);vibrate(8)}
    if(secondsLeft<=0){clearInterval(timer);vibrate([25,40,25]);phaseIndex++;runPhase(phases)}
  },1000);
}
function togglePause(){paused=!paused;const b=document.querySelector('[data-action="pause"]');if(b)b.textContent=paused?'Resume':'Pause';playTone(paused?'pause':'resume',state.settings.sound);if(!paused)speak('Resume.',state.settings.voice,true)}
function finishPractice(){clearInterval(timer);releaseWakeLock();playTone('finish',state.settings.sound);speak('Practice complete.',state.settings.voice,true);setTimeout(()=>route('reflect'),450)}

function reflect() {
  const d=decision||state.current.decision;
  playTone('reflection',state.settings.sound);
  shell(`${header()}<section class="stack center"><p class="eyebrow">REFLECT</p><h2>Was Strategos right?</h2><p class="muted">Your answer improves future decisions.</p><div class="reflection">${[['yes','Yes'],['partly','Partly'],['no','No']].map(([v,l])=>`<button class="choice" data-reflection="${v}">${l}</button>`).join('')}</div><div class="delta-score compact"><span>PRACTICE RETURN</span><strong>+${d.delta.overall.toFixed(2)}</strong></div></section>`);
}

function journal(entry) {
  const d=entry.decision; const p=d.practice || d.mission;
  shell(`${header('STRATEGOS','<button class="icon-btn" data-action="history">⌁</button>')}<section class="stack"><p class="eyebrow">TODAY’S HUMAN RETURN</p><h2>${journalTitle(entry.reflection)}</h2><p class="journal-copy">Today you chose <strong>${p.virtue.toLowerCase()}</strong> through a ${p.name.toLowerCase()} practice. ${entry.reflection==='yes'?'The decision matched your condition.':'Your response has been stored so Strategos can adjust.'}</p><div class="vector"><h3>HUMAN RETURN</h3>${Object.entries(d.delta).filter(([k])=>k!=='overall').map(([k,v])=>`<div><span>${capitalize(k)}</span><strong>${v>=0?'+':''}${v.toFixed(2)}</strong></div>`).join('')}<div class="overall"><span>Overall</span><strong>+${d.delta.overall.toFixed(2)}</strong></div></div><blockquote>Every decision shapes who you become.</blockquote>${button('RETURN','observe')}</section>`);
}

function history() {
  shell(`${header('STRATEGIC TIMELINE','<button class="icon-btn" data-action="observe">×</button>')}<section class="stack"><div class="total-delta"><span>LIFETIME RETURN</span><strong>+${state.deltaTotal.toFixed(2)}</strong></div>${state.history.length?state.history.map(e=>{const p=e.decision.practice||e.decision.mission;return `<article class="history-item"><time>${new Date(e.completedAt).toLocaleDateString(undefined,{day:'numeric',month:'short'})}</time><div><h3>${p.name}</h3><p>${e.reflection} · ${e.decision.duration} min</p></div><strong>+${e.decision.delta.overall.toFixed(2)}</strong></article>`}).join(''):`<div class="empty"><h2>No practices yet.</h2><p class="muted">Your strategic timeline begins with the first completed practice.</p></div>`}${button('TODAY','observe')}</section>`);
}

function settings() {
  const voice = state.settings.voice;
  shell(`${header('SETTINGS','<button class="icon-btn" data-action="observe">×</button>')}<section class="stack settings"><div><p class="eyebrow">EXPERIENCE</p><h2>Quiet by design.</h2><p class="muted">Sound and guidance should support attention, never compete for it.</p></div>${settingToggle('Sound','Soft cues at transitions.','sound',state.settings.sound)}${settingChoice('Voice','Short spoken guidance.','voice',[['off','Off'],['minimal','Minimal'],['guided','Guided']],voice)}${settingToggle('Haptics','Subtle physical feedback.','haptics',state.settings.haptics)}${settingToggle('Keep screen awake','During an active practice.','keepAwake',state.settings.keepAwake)}<div class="settings-section"><p class="eyebrow">BEGINNING</p>${button('REPLAY ONBOARDING','replay-onboarding',true)}<button class="danger-btn" data-action="reset">Erase all Strategos data</button></div></section>`);
}
function settingToggle(title,copy,key,value){return `<div class="setting-row"><div><h3>${title}</h3><p>${copy}</p></div><button class="switch ${value?'on':''}" data-setting-toggle="${key}" aria-pressed="${value}"><span></span></button></div>`}
function settingChoice(title,copy,key,options,value){return `<div class="setting-block"><h3>${title}</h3><p>${copy}</p><div class="segmented">${options.map(([v,l])=>`<button class="${value===v?'selected':''}" data-setting-choice="${key}" data-value="${v}">${l}</button>`).join('')}</div></div>`}

function saveReflection(value){const entry={...state.current,reflection:value,completed:true,completedAt:new Date().toISOString()};state.history.unshift(entry);state.deltaTotal=+(state.deltaTotal+entry.decision.delta.overall).toFixed(2);state.current=null;saveState(state);journal(entry)}
function formatTime(s){return `${String(Math.floor(Math.max(0,s)/60)).padStart(2,'0')}:${String(Math.max(0,s)%60).padStart(2,'0')}`}
function greeting(){const h=new Date().getHours();return h<12?'Good morning':h<18?'Good afternoon':'Good evening'}
function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function journalTitle(r){return r==='yes'?'A sound decision.':r==='partly'?'A useful signal.':'A correction, not a failure.'}

app.addEventListener('click',e=>{
  const t=e.target.closest('button'); if(!t)return; unlockAudio(); vibrate();
  if(t.dataset.identity){onboardingDraft.identity=t.dataset.identity;onboardingStep=2;route('onboarding');return}
  if(t.dataset.key){const k=t.dataset.key;context[k]=['sleep','energy','time'].includes(k)?Number(t.dataset.value):t.dataset.value;route('observe');return}
  if(t.dataset.reflection){saveReflection(t.dataset.reflection);return}
  if(t.dataset.settingToggle){const k=t.dataset.settingToggle;state.settings[k]=!state.settings[k];saveState(state);route('settings');return}
  if(t.dataset.settingChoice){state.settings[t.dataset.settingChoice]=t.dataset.value;saveState(state);if(t.dataset.value!=='off')speak('Voice guidance enabled.',t.dataset.value,true);route('settings');return}
  const a=t.dataset.action;
  if(a==='begin') route(!state.profile || state.onboardingVersion < ONBOARDING_VERSION ? 'onboarding':'observe');
  if(a==='onboarding-next'){onboardingStep=Math.min(2,onboardingStep+1);route('onboarding')}
  if(a==='onboarding-complete'){const input=document.querySelector('#onboarding-name');onboardingDraft.name=input?.value.trim()||'';state.profile={identity:onboardingDraft.identity||'More deliberate',name:onboardingDraft.name};state.onboardingVersion=ONBOARDING_VERSION;saveState(state);route('observe')}
  if(a==='consult') route('thinking'); if(a==='commit') route('execute');
  if(a==='pause') togglePause();
  if(a==='next-phase'){clearInterval(timer);phaseIndex++;runPhase(state.current.adjusted)}
  if(a==='previous-phase'){clearInterval(timer);phaseIndex=Math.max(0,phaseIndex-1);runPhase(state.current.adjusted)}
  if(a==='abandon' && confirm('End this practice?')){releaseWakeLock();route('observe')}
  if(a==='history') route('history'); if(a==='settings') route('settings'); if(a==='observe') route('observe');
  if(a==='replay-onboarding'){onboardingStep=0;onboardingDraft={identity:state.profile?.identity||'',name:state.profile?.name||''};route('onboarding')}
  if(a==='reset' && confirm('Erase all Strategos data?')){resetState();state=loadState();onboardingStep=0;route('splash')}
});

document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible' && state.current?.startedAt)requestWakeLock()});
try { route('splash'); } catch (error) { console.error('Strategos failed to start', error); app.innerHTML=`<main class="screen boot-error"><section class="stack center"><p class="eyebrow">STRATEGOS</p><h2>Unable to start.</h2><p class="muted">Refresh the page. If the problem remains, clear this site’s cached data.</p></section></main>`; }
