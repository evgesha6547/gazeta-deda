const sections = {
  main: {
    kicker: "Главная история · №25",
    title: "Раньше фотографии ждали неделю, теперь делают сорок за минуту",
    text: "Время летит, но хорошие кадры - как и добрые воспоминания остаются с нами навсегда. Главное - не количество, а то, что на них."
  },
  fact: {
    kicker: "А сейчас",
    title: "Телефон под рукой, щелкнул и готово. ИИ улучшит, фильтр подберет, свет добавит. Фото в облаке, в галерее, в сторис, в архиве... Сорок фото за минуту - и это еще не предел!Только потом бывает: что-то снял, а что - уже и не помнишь.",
    text: "Техника меняется, а любовь к жизни - остается. Снимайте сердцем!🙂"
  },
  thought: {
    kicker: "Мысль деда",
    title: "Не гоняйтесь за количеством",
    text: "Лови момент. Проживай его. А потом - сохраняй то, что действительно важно."
  },
  advice: {
    kicker: "Дедовский совет",
    title: "Печатайте иногда фото",
    text: "Повесьте на стену. Пусть будет не только в телефоне, но и в жизни."
  },
  humor: {
    kicker: "Дедовский юмор",
    title: "Птичка она такая",
    text: "Раньше фотограф говорил: Сейчас вылетит птичка! А теперь птичка сама вылетит на селфи 😂"
  },
  today: {
    kicker: "Что сделать сегодня?",
    title: "Воспоминание - лучшее, что не теряет качества со временем",
    text: "Пересмотрите старые фото с близкими. Распечатайте одно любимое и поставьте в рамку. Сделайте фото дня, и сохраните в памяти сердца. Поделитесь снимком с теми, кто на нем."
  },
  story: {
    kicker: "История от деда",
    title: "Ух, молодость моя",
    text: "Когда я был молодым, фотоаппарат был роскошью. Увидел красивый вид - остановился, подумал, нажал. А потом ждал неделями. И знаешь, что понял? Самые ценные снимки - это те, что внутри. Их никакая пленка не испортит."
  },
  poll: {
    kicker: "А вы как думаете?",
    title: "Цените ли вы фотографии?",
    text: "Какое ваше фото хранит особое воспоминание? Какой момент из жизни вы бы хотели снять прямо сейчас?"
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
