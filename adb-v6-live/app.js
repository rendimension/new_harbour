window.addEventListener('DOMContentLoaded',()=>{
  const drive=(id)=>`https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
  const A={
    wordmarkBlack:drive('1eoE6sQwrIGBjb7VUR7OwqlaZWUYpoXQ8'),
    wordmarkWhite:drive('1xGDr1s3AcR30Qw6loROI7kK7YHQCbD2m'),
    fullLogo:drive('1_gMxwpkqLO7lIF-hbHBjZq5kDWydd7Pi'),
    crest:drive('1LwGoDL8oyDWFePBizH7u7eFqOQD7a_SP'),
    azzurro:drive('1MMi8omnvBO1OxJGbJFqVUiyvm41Pz-hh'),
    giallo:drive('1jHX9Ch19bDy-yoEN5r1iqg3Ue4mv5SX0'),
    verde:drive('11fUm9xaaGPlQyyts2FNOrPSCgWBnAguU'),
    deepwater:drive('1w8qyUP0u2g1oPEurq58Oa08agNydae56'),
    emerald:drive('1tzMn4T4-vyBZrQSJgvZLg9n_YztDPATl'),
    arctic:drive('16T6Q3qNbCy5YHjic5nZXoCeAuTSA1ZQB'),
    riviera:drive('1SdAcH8I5NwZDvs-nSInJ5uPpfcqYUtSv')
  };
  const set=(id,src)=>{const el=document.getElementById(id);if(el&&src){el.src=src;el.decoding='async';}};
  set('logoTop',A.wordmarkBlack);set('logoFooter',A.wordmarkWhite);set('logoBrand',A.fullLogo);set('crest',A.crest);
  set('heroBoat',A.azzurro);set('chapterBoat',A.verde);set('perfBoat',A.deepwater);set('detailBoat',A.verde);set('reserveBoat',A.giallo);

  const header=document.getElementById('header');
  addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20),{passive:true});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.14});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const imgs={azzurro:A.azzurro,giallo:A.giallo,verde:A.verde,deepwater:A.deepwater,emerald:A.emerald,arctic:A.arctic,riviera:A.riviera};
  Object.values(imgs).forEach(src=>{const im=new Image();im.src=src;});

  document.querySelectorAll('.chapter').forEach(c=>c.addEventListener('mouseenter',()=>{
    document.querySelectorAll('.chapter').forEach(x=>x.classList.remove('active'));c.classList.add('active');
    const src=imgs[c.dataset.img],el=document.getElementById('chapterBoat');
    el.style.opacity='.12';el.style.transform='scale(.96) translateY(10px)';
    setTimeout(()=>{el.src=src;el.style.opacity='1';el.style.transform='none'},160);
  }));

  const cws=[
    ['Azzurro Blue','Clean, energetic and unmistakably on the move.','#006cff','0,108,255','azzurro'],
    ['Giallo Sport','The loud one. Bright, fast and impossible to ignore.','#f2b600','242,182,0','giallo'],
    ['Verde Signature','The ADB house expression: distinctive without trying too hard.','#007a55','0,122,85','verde'],
    ['Deepwater Blue','A darker performance look with a confident marine character.','#063e78','6,62,120','deepwater'],
    ['Emerald Rush','Saturated, rich and more aggressive than a traditional yacht green.','#08704f','8,112,79','emerald'],
    ['Arctic Wake','Crisp white and blue for a clean coastal-performance finish.','#1a6bdd','26,107,221','arctic'],
    ['Riviera Ivory','Warm, refined and yacht-forward without losing the sport edge.','#b57a42','181,122,66','riviera']
  ];
  let current=0;const tabs=document.getElementById('colorTabs');
  cws.forEach((x,i)=>{const b=document.createElement('button');b.innerHTML=`<small>${String(i+1).padStart(2,'0')}</small><b>${x[0]}</b>`;b.addEventListener('click',()=>setCW(i));tabs.appendChild(b)});
  function setCW(i){current=i;const x=cws[i],boat=document.getElementById('colorBoat');document.documentElement.style.setProperty('--accent',x[2]);document.documentElement.style.setProperty('--accent-rgb',x[3]);document.getElementById('colorName').textContent=x[0].toUpperCase();document.getElementById('colorTag').textContent=x[1];document.getElementById('colorIndex').textContent=`${String(i+1).padStart(2,'0')} / 07`;[...tabs.children].forEach((b,j)=>b.classList.toggle('active',j===i));boat.style.opacity='0';boat.style.transform='translateX(45px) scale(.97)';setTimeout(()=>{boat.src=imgs[x[4]];boat.style.opacity='1';boat.style.transform='none'},150)}
  setCW(0);
  const colors=document.querySelector('.colors');
  function colorScroll(){const r=colors.getBoundingClientRect(),range=colors.offsetHeight-innerHeight;if(range<=0)return;const p=Math.max(0,Math.min(1,-r.top/range)),i=Math.min(6,Math.floor(p*7));if(i!==current)setCW(i)}
  addEventListener('scroll',colorScroll,{passive:true});

  const details={helm:['Driver-first helm','A compact command position integrated into the overall form and colorway.'],seat:['Comfort, not filler','The seating is treated as usable architecture, not leftover space.'],structure:['Utility with a silhouette','The black tubular structure gives the 420 a stronger vertical profile and recognizable stance.']};
  document.querySelectorAll('.hotspot').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.hotspot').forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=details[b.dataset.d];document.getElementById('detailTitle').textContent=d[0];document.getElementById('detailText').textContent=d[1]}));

  function parallax(){document.querySelectorAll('.parallax').forEach(el=>{const r=el.getBoundingClientRect(),sp=+el.dataset.speed||0,y=(innerHeight/2-(r.top+r.height/2))*sp;el.style.transform=`translate3d(0,${y}px,0)`})}
  addEventListener('scroll',parallax,{passive:true});parallax();
});