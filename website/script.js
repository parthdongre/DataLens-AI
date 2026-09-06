window.addEventListener('DOMContentLoaded', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopMotion = window.matchMedia('(min-width: 721px) and (prefers-reduced-motion: no-preference)').matches;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const animeReady = typeof window.anime === 'function';
  const els = {progress:$('.progressBar'),path:$('#signalPath'),angel:$('.angelLayer'),frame:$('.angelFrame'),beam:$('.redBeam'),band:$('.bandTrack'),star:$('.star'),ghost:$('.bigGhost'),allegory:$('.allegory'),plane:$('.redPlane'),cain:$('.cainImage'),gate:$('.gateRelease'),stamp:$('.releaseStamp'),constellation:$('.constellation'),final:$('.final'),orbit:$('.orbit'),finalAngel:$('.finalAngel')};
  const nodes = $$('.constellation .nodeWrap');

  if (animeReady && !reduce) {
    anime.timeline({easing:'easeOutExpo'})
      .add({targets:'.brand',opacity:[0,1],translateY:[-12,0],duration:520})
      .add({targets:'.navlinks a,.navGit',opacity:[0,1],translateY:[-8,0],delay:anime.stagger(45),duration:360},'-=320')
      .add({targets:'.heroCopy .kicker',opacity:[0,1],translateX:[-20,0],duration:420},'-=180')
      .add({targets:'.hero h1',opacity:[0,1],translateY:[44,0],duration:840},'-=80')
      .add({targets:'.heroLead,.heroActions',opacity:[0,1],translateY:[22,0],duration:520,delay:anime.stagger(70)},'-=600')
      .add({targets:'.angelLayer',opacity:[0,1],translateX:[desktopMotion?48:22,0],scale:[.97,1],duration:900},'-=850')
      .add({targets:'.angelFrame,.star,.heroScript,.heroMeta',opacity:[0,1],translateY:[12,0],duration:560,delay:anime.stagger(55)},'-=620')
      .add({targets:'.redBeam',scaleX:[0,1],opacity:[.45,1],duration:620,easing:'easeOutCubic'},'-=760');
    anime({targets:'.seal',scale:[1,1.05,1],duration:2600,easing:'easeInOutSine',loop:true});
  }

  const revealOnce = (el) => {
    if (!el || el.dataset.revealed === '1') return;
    el.dataset.revealed = '1';
    if (!animeReady || reduce) return;
    anime({targets:el,opacity:[0,1],translateY:[24,0],duration:650,easing:'easeOutExpo'});
  };
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    revealOnce(entry.target);
    io.unobserve(entry.target);
  }), {threshold:.12,rootMargin:'0px 0px -4% 0px'});
  $$('.reveal,.sig,.diagram,.benchPanel,.constellation').forEach((el)=>io.observe(el));

  let pathLength=0;
  if (els.path && els.path.getTotalLength) {
    pathLength=els.path.getTotalLength();
    if (!reduce) {els.path.style.strokeDasharray=pathLength;els.path.style.strokeDashoffset=pathLength;}
  }
  let rafPending=false;
  const paint=()=>{
    rafPending=false;
    const y=window.scrollY||0;
    const maxScroll=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    const ratio=Math.min(1,Math.max(0,y/maxScroll));
    if(els.progress) els.progress.style.transform=`scaleX(${ratio})`;
    if(els.path&&pathLength&&!reduce) els.path.style.strokeDashoffset=pathLength*Math.max(0,1-ratio*1.06);
    if(desktopMotion){
      if(els.angel) els.angel.style.transform=`translate3d(0,${y*.045}px,0)`;
      if(els.frame) els.frame.style.transform=`rotate(${-8+y*.002}deg)`;
      if(els.beam) els.beam.style.transform=`rotate(7deg) translate3d(${y*.016}px,0,0)`;
      if(els.band) els.band.style.transform=`translate3d(${Math.max(-110,-y*.16)}px,0,0)`;
      if(els.star) els.star.style.transform=`rotate(${y*.03}deg)`;
      if(els.ghost) els.ghost.style.transform=`translate3d(${Math.max(-90,-y*.065)}px,0,0)`;
    }
    if(els.allegory&&desktopMotion){const r=els.allegory.getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));if(els.plane)els.plane.style.transform=`rotate(${-7+p*2.5}deg) translate3d(${p*54}px,0,0)`;if(els.cain)els.cain.style.transform=`translate3d(${p*14}px,${-p*38}px,0)`;}
    if(els.gate&&els.stamp&&desktopMotion){const r=els.gate.getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));els.stamp.style.transform=`rotate(${12+p*16}deg)`;}
    if(els.constellation){const r=els.constellation.getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));nodes.forEach((node,i)=>node.classList.toggle('active',p>(i+1)/5));}
    if(els.final&&desktopMotion){const r=els.final.getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));if(els.orbit)els.orbit.style.transform=`rotate(${p*15}deg) scale(${1+p*.02})`;if(els.finalAngel)els.finalAngel.style.transform=`translate3d(0,${-p*36}px,0)`;}
  };
  const requestPaint=()=>{if(rafPending)return;rafPending=true;requestAnimationFrame(paint);};
  addEventListener('scroll',requestPaint,{passive:true});addEventListener('resize',requestPaint,{passive:true});requestPaint();
});
