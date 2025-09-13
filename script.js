const sections = [
  {id:0, kind:'intro', title:'Hai, Dedek Rere', subtitle:'- Abang Raja', type:'video', media:'Untitled design.mp4', body:''},
  {id:1, kind:'text', title:'Keluhan', type:'video', media:'Untitled design.mp4', body:`Keluhan adalah semua keresahan dan perasaan akan sesuatu yang menjengkelkan, tidak mengenakan, tidak membuat nyaman dan sebagainya. Dedek, Abang percaya pada setiap keluhan yang kamu sampaikan kamu melepaskan seluruh rasa dan keresahan kamu. Abang senang ketika Abang bisa jadi tempat dan wadah dedek untuk semua rasa itu, ketika dedek cerita dan berkeluh kesah Abang tau apa yg dedek rasakan, Abang tau apa yang dedek alami dan itulah salah satu aku bisa berterimakasih kepada Kamu Rereku. Aku akan sangat sedih ketika kamu berhenti bercerita tentang hal itu, memaknai dan mempelajari hingga pada tahap melatih mental bukanlah hal yang mudah re, ingatlah aku disini untuk kamu ceritakan apapun itu agar aku tau kehidupan jantung ke 2 Abang, ya Rere. Jangan berhenti bercerita adik meskipun cerita itu adalah keluhan sekalipun, aku mohon dik.`},
  {id:2, kind:'text', title:'Bodoamat', type:'video', media:'Untitled design (1).mp4', body:`Terkadang kita perlu bersikap seolah tidak peduli re, tidak akan ada habisnya ketika kamu mencoba untuk membahagiakan semua orang. Karena kamu hanyalah manusia dan akupun manusia kita punya pemikiran yang berbeda dan untuk aji dan beberapa orang sejenisnya merasa merekalah yg paling benar. Hal seperti itulah yang harusnya kita hindari dan tidak perlu kita ambil pusing dek, karena itu hanya akan membuang buang waktu saja.`},
  {id:3, kind:'text', title:'Mental', type:'video', media:'Untitled design (1).mp4', body:`adikku, aku belum pernah berkata kata sekeras ini kepadamu. Seharusnya penyampaian yang lembut dan komunikatif menjadi gaya bicaraku disini. Namun, tampaknya aku kecewa dan sakit hati akan argumentasi mu itu, aku minta maaf jikalau ini membuatmu takut seolah aku memarahi dirimu dan membuat engkau merass kecil dan lemah. Aku tdiak bermaksud membuat kmu panik, cemas, atau bahkan takut, aku minta maaf atas smua itu. Namun, aku percaya inilah proses menjadi sesek re. Kesalah pahaman seringkali terjadi, tapi aku yakin dengan komunikasi dan interaksi yang ada kita akan tetap bersama melewati segala rintangan dan cobaan.`},
  {id:4, kind:'text', title:"That's all", type:'video', media:'Untitled design (2).mp4', body:`Kamu tidak merusak apapun re, aku menghargai ini sebagai proses kamu dalam berfikir kritis dan mencoba memahami apa yang terjadi, analisis komparatif yang kamu lakukan mungkin kurang sesuai bagi aku, namun kamu sudah berusaha dengan baik dan telah berani untuk menyampaikan itu kepadaku dengan jujur. Tidak ada dari 100 poin yang kamu rusak re, kamu sempurna apa adanya. Tetap rasional dalam berfikir re, hidup masih panjang mungkin aku hanya salah satu dari banyaknya orang yang akan ngata ngatain kamu kayak gini. Tapi, percayalah kamu berharga Dimata Tuhan dan Dimata Abang. Abang sayang Dedek Rere.`},
  {id:5, kind:'image', title:'DONOT', type:'image', media:'DONOT.jpg', body:''},
  {id:6, kind:'end', title:'Pax Vobiscum', type:'gradient', media:'', body:''}
];

const bgVideo=document.getElementById('bgVideo');
const bgImage=document.getElementById('bgImage');
const bgGrad=document.getElementById('bgGrad');
const card=document.getElementById('card');
const titleEl=document.getElementById('title');
const subtitle=document.getElementById('subtitle');
const content=document.getElementById('content');
const nextBtn=document.getElementById('nextBtn');
const hint=document.getElementById('hint');
const bgAudio=document.getElementById('bgAudio');
const introOverlay=document.getElementById('introOverlay');
const introTitle=document.getElementById('introTitle');
const introSub=document.getElementById('introSub');
const endOverlay=document.getElementById('endOverlay');

let i=0;

function preload(path){
  const ext=(path||'').split('.').pop();
  if(['mp4','webm','mov'].includes(ext)){const v=document.createElement('video'); v.preload='auto'; v.src=path; v.muted=true; v.playsInline=true; v.load();}
  else if(['jpg','jpeg','png','webp'].includes(ext)){const img=new Image(); img.src=path;}
}
sections.forEach(s=> s.media && preload(s.media));

function setBackground(sec){
  const t=sec.type;
  if(t==='video'){
    bgGrad.style.display='none'; bgImage.style.display='none'; bgVideo.style.display='block';
    if(bgVideo.getAttribute('src')!==sec.media){ bgVideo.src=sec.media; try{bgVideo.load();}catch(e){} }
    bgVideo.muted=true; bgVideo.play().catch(()=>{});
  }else if(t==='image'){
    try{bgVideo.pause();}catch(e){}; bgVideo.removeAttribute('src');
    bgGrad.style.display='none'; bgImage.style.display='block'; if(bgImage.getAttribute('src')!==sec.media){ bgImage.src=sec.media; }
  }else if(t==='gradient'){
    try{bgVideo.pause();}catch(e){}; bgVideo.removeAttribute('src');
    bgImage.style.display='none'; bgGrad.style.display='block';
  }
}

function renderSection(idx){
  const sec=sections[idx];
  setBackground(sec);

  // Reset common UI
  content.hidden=true; content.textContent='';
  titleEl.textContent=''; subtitle.textContent='';
  card.classList.remove('card--invisible');
  nextBtn.style.display='block';
  introOverlay.style.display='none';
  endOverlay.style.display='none';
  endOverlay.hidden = true;

  // Musik looping pada seluruh bagian kecuali bagian 0 (intro)
  if(idx !== 0) {
    try {
      bgAudio.loop = true;
      if(bgAudio.paused) {
        bgAudio.currentTime = 0;
        bgAudio.volume = 0.5;
        bgAudio.play().catch(function(e){
          console.error('Gagal memutar audio:', e);
        });
      }
    } catch(e){}
  } else {
    try { bgAudio.pause(); bgAudio.currentTime = 0; } catch(e){}
  }

  if(sec.kind==='intro'){
    // Section 0 — overlay only
    introTitle.textContent=sec.title || 'Hai, Dedek Rere';
    introSub.textContent=sec.subtitle || '- Abang Raja';
    introOverlay.style.display='flex';
    card.classList.add('card--invisible');
  } else if(sec.kind==='image'){
    // Section 5 — full image, keep only next button
    card.classList.add('card--invisible');
  } else if(sec.kind==='end'){
    // Section 6 — just the single word, no card, no button
    endOverlay.style.display='flex';
    endOverlay.hidden = false;
    card.classList.add('card--invisible');
    nextBtn.style.display='none';
    // Pasang event listener tombol Spotify setiap kali dirender
    const spotifyBtn = document.getElementById('spotifyBtn');
    if (spotifyBtn && !spotifyBtn.hasAttribute('data-listener')) {
      spotifyBtn.addEventListener('click', function() {
        window.open('https://open.spotify.com/playlist/1YFTqIfX6c5gOswRZ4GzcO?si=c5249c19fc4346bd', '_blank');
      });
      spotifyBtn.setAttribute('data-listener', 'true');
    }
  } else {
    // Text sections — normal card
    titleEl.textContent=sec.title || '';
    content.hidden=false; content.innerText=sec.body || '';
    nextBtn.textContent='Lanjut ➜';
  }

  hint.style.display=(idx===0)?'block':'none';
}

function goNext(){
  // setelah interaksi pertama, hapus overlay intro agar tidak pernah muncul lagi
  if(introOverlay && introOverlay.parentNode){ introOverlay.remove(); }
  // Tidak perlu play audio manual di sini, sudah di-handle di renderSection
  i=Math.min(i+1, sections.length-1);
  renderSection(i);
}

nextBtn.addEventListener('click',()=>{
  if(i===sections.length-1){ return; }
  goNext();
});

// (Event listener tombol Spotify dipasang di renderSection)
// Init
renderSection(0);
// Autoplay muted video background if any
setTimeout(()=>{ if(bgVideo && bgVideo.src){ bgVideo.muted=true; bgVideo.play().catch(()=>{}); }}, 60);
