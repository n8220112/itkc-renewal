/* 도서 */
let mainCate = document.querySelectorAll(".maincate_item");
let booksContent = document.querySelectorAll(".books_contents");
console.log(mainCate, booksContent);
mainCate.forEach(function (item) {
  item.addEventListener('mouseenter', function () {
    booksContent.forEach(function (con) {
      con.style.display = 'none';
    })
    let target = document.getElementById(item.dataset.target);
    if (target) { target.style.display = 'inline-block' }
  });
});

booksContent.forEach(function (con) {
  con.addEventListener('mouseenter', function () { con.style.display = 'inline-block' });
});

document.querySelector(".books_contents").style.display = 'inline-block';


/* main_visual */
var swiper = new Swiper(".mainSwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  loop: true,
  slidesPerView: 1,
});

fetch('footer.html')
.then(function(res){
  return res.text();})
.then(function(data){
  /* footer familylink */
var swiper = new Swiper(".familyLinkSwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  slidesPerView: 5,
  spaceBetween: 20,
});

if (window.innerWidth < 768) {
  var swiper = new Swiper(".familyLinkSwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 2,
  });
}
});