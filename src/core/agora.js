import { CODEX } from '../data/codex.js';
const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));

export function conveneAgora(context, understanding, history=[]){
  const advisors=[bodyAdvisor(context,understanding,history),recoveryAdvisor(context,understanding),mindAdvisor(context,understanding),agencyAdvisor(context,understanding),purposeAdvisor(context),relationshipsAdvisor(context)];
  const totals={};
  for(const practice of CODEX) totals[practice.id]=0;
  for(const opinion of advisors){
    for(const [id,value] of Object.entries(opinion.scores)) totals[id]=(totals[id]||0)+value*opinion.weight;
  }
  const ranked=Object.entries(totals).sort((a,b)=>b[1]-a[1]);
  const winner=CODEX.find(x=>x.id===ranked[0][0]);
  const duration=[...winner.durationOptions].reverse().find(d=>d<=context.time)||winner.durationOptions[0];
  const margin=ranked[0][1]-ranked[1][1];
  const confidence=Math.round(clamp(.58+margin*.11+understanding.confidence/500,.56,.92)*100);
  const delta=scaleDelta(winner.baseDelta,duration/15);
  const supporting=advisors.filter(a=>(a.scores[winner.id]||0)>.45).sort((a,b)=>(b.scores[winner.id]||0)-(a.scores[winner.id]||0));
  return {
    id:`judgement-${Date.now()}`,
    createdAt:new Date().toISOString(),
    understanding,
    advisors,
    practice:winner,
    mission:winner,
    duration,
    confidence,
    unknowns:understanding.unknowns,
    judgement:judgementText(winner.id,duration),
    explanation:supporting.slice(0,3).map(a=>a.reason),
    reasons:supporting.slice(0,3).map(a=>a.reason),
    alternatives:ranked.slice(1,3).map(([id])=>CODEX.find(x=>x.id===id).name),
    delta,
    scores:totals,
    intention:intention(winner.id),
    status:'current'
  };
}

function opinion(name,position,confidence,reason,scores,weight=1,unknowns=[]){return {advisor:name,position,confidence,reason,scores,weight,unknowns};}
function bodyAdvisor(c,u,h){const recent=h.slice(0,2).some(x=>(x.decision?.practice||x.decision?.mission)?.id==='strength'&&x.completed);return opinion('Body',u.energy>.58?'Support':'Caution',Math.round((.55+u.energy*.35)*100),u.energy>.58?'Your reported energy supports productive physical work.':'Your body may benefit more from a lower-cost practice today.',{strength:.35+u.energy*.65-(recent?.2:0),recovery:.35+(1-u.energy)*.5,walk:.45,focus:.2,connection:.1},1.1,recent?['Residual fatigue from recent strength work.']:[])}
function recoveryAdvisor(c,u){const need=(1-u.sleep)*.55+(1-u.energy)*.45;return opinion('Recovery',need>.48?'Caution':'Support',Math.round((.58+Math.abs(need-.5)*.5)*100),need>.48?'Recovery deserves greater weight than intensity today.':'Current sleep and energy do not strongly constrain action.',{recovery:.25+need*.8,walk:.35+need*.25,strength:.7-need*.65,focus:.45-need*.25,connection:.28},1.15,['Muscle soreness is not yet known.'])}
function mindAdvisor(c,u){const focus=c.challenge==='focus'||c.challenge==='work';return opinion('Mind',focus?'Support':'Neutral',focus?84:66,focus?'Your principal challenge requires protected attention.':'There is no strong cognitive constraint in the signals provided.',{focus:focus?.95:.35,walk:c.challenge==='mind'?.7:.35,recovery:.3,strength:.3,connection:.25},1)}
function agencyAdvisor(c,u){return opinion('Agency','Support',72,`A ${c.time}-minute commitment is realistic enough to preserve follow-through.`,{strength:c.time>=15?.6:.1,recovery:.55,focus:c.time>=15?.62:.2,walk:.65,connection:.55},.9)}
function purposeAdvisor(c){const work=c.challenge==='work'||c.challenge==='focus';return opinion('Purpose',work?'Support':'Neutral',70,work?'Finishing one meaningful task is aligned with today’s stated priority.':'No single purpose claim dominates today.',{focus:work?.85:.3,connection:c.challenge==='family'?.7:.25,strength:.35,recovery:.3,walk:.3},.85)}
function relationshipsAdvisor(c){const relational=c.challenge==='family';return opinion('Relationships',relational?'Support':'Neutral',relational?88:61,relational?'The most important pressure today is relational, not physical.':'No relevant relational conflict was identified.',{connection:relational?1:.2,recovery:.25,walk:.3,focus:.2,strength:.15},1)}
function judgementText(id,d){return {strength:`A ${d}-minute strength practice offers the best current balance of adaptation and continuity.`,recovery:`A ${d}-minute recovery practice appears to offer the highest return today.`,focus:`A protected ${d}-minute focus practice is my best current judgement.`,walk:`A ${d}-minute walk appears to create useful energy without unnecessary cost.`,connection:`A deliberate ${d}-minute act of connection appears more valuable than another performance task today.`}[id]}
function intention(id){return {strength:'Build strength deliberately.',recovery:'Recover without losing momentum.',focus:'Protect attention. Finish what matters.',walk:'Create energy, not fatigue.',connection:'Be fully present with someone who matters.'}[id]}
function scaleDelta(delta,factor){const out={};for(const [k,v] of Object.entries(delta))out[k]=+(v*Math.min(1.4,Math.max(.5,factor))).toFixed(2);out.overall=+Object.values(out).reduce((a,b)=>a+b,0).toFixed(2);return out}
