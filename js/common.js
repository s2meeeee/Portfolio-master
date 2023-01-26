// Trigger
$('.trigger').click(function () {
  $(this).toggleClass('active')
  $('.modal-gnb').fadeToggle()
})

// AOS
AOS.init();

    //footer
    const thisYear = document.querySelector('.this-year');
    thisYear.textContent = new Date().getFullYear(); // 2022