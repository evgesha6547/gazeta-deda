const sections = {
  main: {
    kicker: "Главная история · №23",
    title: "Зашёл за хлебом — вышел с пакетом на тысячу",
    text: "Раньше в магазин ходили с авоськой и списком из трёх пунктов. Теперь — с планом бюджета и силой воли, которую маркетинг проверяет на прочность. 😄"
  },
  fact: {
    kicker: "Интересный факт",
    title: "Маркетологи тоже знают дедовские слабости",
    text: "Поставьте хлеб в правильном месте — и покупатель может пройти через магазин несколько раз. Дед проверил лично. 🙂"
  },
  thought: {
    kicker: "Мысль деда",
    title: "Деньги — как вода",
    text: "Кажется, что ещё есть. А на дне уже пусто. Трать с умом и живи со вкусом."
  },
  advice: {
    kicker: "Дедовский совет",
    title: "Пиши список. Держись списка.",
    text: "И не смотри по сторонам. Тогда и бюджет останется цел. Особенно возле полки со скидками."
  },
  humor: {
    kicker: "Дедовский юмор",
    title: "Купи хлеба и молока",
    text: "Раньше жена говорила: «Купи хлеба и молока». А теперь: «Сколько это стоит?!» Вот и вся инфляция! 😂"
  },
  today: {
    kicker: "Что сделать сегодня?",
    title: "Проверь запасы",
    text: "Проверь запасы в холодильнике, составь список покупок, не бери тележку без необходимости и сравни цены."
  },
  story: {
    kicker: "История от деда",
    title: "Хотел купить только хлеб",
    text: "Однажды я тоже купил «только хлеба»... Взял хлеб, батон, булочку, пирожок, торт к чаю и печенье «внучке». Пришёл домой — понял: хлеб я так и не купил! Но чай был вкусный. 😅"
  },
  poll: {
    kicker: "А вы как думаете?",
    title: "Сколько вы тратите в магазине?",
    text: "Есть ли у вас своё правило покупок? Попадаете ли вы в ловушки маркетинга? Нажимайте реакцию и делитесь мнением в комментариях канала."
  }
};

const modal = document.getElementById('modal');
const modalKicker = document.getElementById('modalKicker');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const reactionCount = document.getElementById('reactionCount');

function openSection(key){
  const s = sections[key] || sections.main;
  modalKicker.textContent = s.kicker;
  modalTitle.textContent = s.title;
  modalText.textContent = s.text;
  reactionCount.textContent = localStorage.getItem('reaction_'+key) || '0';
  modal.dataset.section = key;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}

document.querySelectorAll('.hotspot,.nav-btn').forEach(btn=>{
  btn.addEventListener('click',()=>openSection(btn.dataset.section));
});
document.getElementById('closeBtn').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });

document.getElementById('reactionBtn').addEventListener('click',()=>{
  const key = modal.dataset.section || 'main';
  const n = Number(localStorage.getItem('reaction_'+key) || 0) + 1;
  localStorage.setItem('reaction_'+key,n);
  reactionCount.textContent = n;
});

document.getElementById('shareSectionBtn').addEventListener('click', async ()=>{
  const key = modal.dataset.section || 'main';
  const s = sections[key];
  const shareText = `${s.title} — «Записки Деда», выпуск №23`;
  if (navigator.share) {
    try { await navigator.share({title:s.title,text:shareText,url:location.href}); } catch(e){}
  } else {
    await navigator.clipboard?.writeText(location.href);
    alert('Ссылка на выпуск скопирована');
  }
});

document.getElementById('shareBtn').addEventListener('click', async ()=>{
  if (navigator.share) {
    try { await navigator.share({title:'Записки Деда — №23',text:'Интерактивный выпуск №23',url:location.href}); } catch(e){}
  } else {
    await navigator.clipboard?.writeText(location.href);
    alert('Ссылка на газету скопирована');
  }
});

document.getElementById('backBtn').addEventListener('click',()=>{
  if (window.Telegram?.WebApp) window.Telegram.WebApp.close();
  else history.back();
});

// Telegram Mini App API is optional for the first browser prototype.
if (window.Telegram?.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}
