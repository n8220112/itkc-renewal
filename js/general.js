/* 헤더 불러오기 */
fetch('../header.html')
.then(function(res){
  //응답을 텍스트로 변환
  return res.text();})
.then(function(data){
  //변환된 텍스트html코드를 #header요소 안에 삽입
  document.getElementById('header').innerHTML = data;

  /* 메인메뉴 */
let menuItems = document.querySelectorAll(".menu_item");
let subMenus = document.querySelectorAll(".sub_menu");

menuItems.forEach(function (item) {
  item.addEventListener('mouseenter', function () {
    subMenus.forEach(function (sub) {
      sub.style.display = 'none';
    })
    let target = document.getElementById(item.dataset.target);
    if (target) { target.style.display = 'block' }
  });
});

subMenus.forEach(function (sub) {
  sub.addEventListener('mouseenter', function () { sub.style.display = 'block' });
  sub.addEventListener('mouseleave', function () { sub.style.display = 'none' });
});

document.querySelector('.main_menu').addEventListener('mouseleave', function () {
  subMenus.forEach(function (sub) { sub.style.display = 'none' });
});

/* 메뉴 드롭 */
let header = document.querySelector('.header_bottom');
let headerWrap = document.querySelector('#header');
let subMenu = document.querySelector('.sub_wrap');
let headerHeight = headerWrap.offsetHeight;

window.onscroll = function () {
  let windowTop = window.scrollY;
  if (windowTop >= headerHeight) {
    header.classList.add('drop');
    subMenu.classList.add('drop');
  }
  else {
    header.classList.remove('drop');
    subMenu.classList.remove('drop');
  }
};

/* 아코디언메뉴 */
let menuIcon = document.querySelector('.menu_icon');
let menuIconRes = document.querySelector('.menu_icon_res');
let accordionMenu = document.getElementById('accordion_menu');

menuIcon.addEventListener('click', function () {
  if (accordionMenu.style.display === 'none') {
    accordionMenu.style.display = 'block';
  } else { accordionMenu.style.display = 'none'; }
});
menuIconRes.addEventListener('click', function () {
  if (accordionMenu.style.display === 'none') {
    accordionMenu.style.display = 'block';
  } else {accordionMenu.style.display = 'none'; }
});

document.querySelectorAll('.accordion_title').forEach(item => {
  item.addEventListener('click', function () {
    let content = this.nextElementSibling;
    document.querySelectorAll('.accordion_content.active').forEach(activeContent => {
      if (activeContent !== content) {
        activeContent.classList.remove('active');
      }
    });
    content.classList.toggle('active');
  });
});
});

/* 푸터 불러오기 */
fetch('../footer.html')
.then(function(res){
  return res.text();})
.then(function(data){
  document.getElementById('footer').innerHTML = data;
});