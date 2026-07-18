const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
const avg=a=>a.length?a.reduce((s,v)=>s+v,0)/a.length:0;

export function buildUnderstanding(context, history=[]){
  const completed=history.filter(x=>x.completed).slice(0,12);
  const helpful=completed.filter(x=>x.reflection==='better'||x.reflection==='right'||x.reflection==='yes').length;
  const confidence=clamp(.44+completed.length*.035, .44,.86);
  const sleep=Number(context.sleep||2)/4;
  const energy=Number(context.energy||2)/3;
  const consistency=clamp(completed.length/8,0,1);
  const stress=context.challenge==='work'||context.challenge==='mind'?.7:.35;
  const summary=summaryText({sleep,energy,consistency,challenge:context.challenge,time:context.time});
  const unknowns=[];
  if(!context.soreness) unknowns.push('How sore or physically uncomfortable you feel.');
  if(!context.emotionalLoad) unknowns.push('Whether today carries unusual emotional weight.');
  if(completed.length<3) unknowns.push('How reliably your reported energy predicts performance.');
  return {sleep,energy,consistency,stress,purposeAlignment:context.challenge==='work'||context.challenge==='family'?.72:.55,motivation:avg([energy,consistency]),confidence:Math.round(confidence*100),summary,unknowns,helpfulRate:completed.length?helpful/completed.length:null,updatedAt:new Date().toISOString()};
}
function summaryText(u){
  if(u.challenge==='family') return 'Your most important opportunity today appears relational. Physical readiness matters, but presence may create the greater return.';
  if(u.sleep<.55||u.energy<.5) return 'Your available capacity appears limited today. Preserving tomorrow may matter more than forcing intensity now.';
  if(u.challenge==='focus'||u.challenge==='work') return 'You appear capable of useful work, but your attention has a clear claim on today. A focused, bounded commitment may serve you best.';
  if(u.consistency>.65) return 'Your recent consistency is becoming an asset. Protecting that rhythm may be more valuable than increasing intensity.';
  return 'You appear ready to act, although I am still learning how your sleep, energy and priorities interact.';
}
