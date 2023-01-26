
// Trigger
$('.trigger').click(function () {
  $(this).toggleClass('active')
  $('.modal-gnb').fadeToggle()
})

// AOS
AOS.init();
