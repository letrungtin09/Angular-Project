window.addEventListener("load", function () {
  $(document).ready(function () {
    $(".bestseller__all").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrow: true,
      swipeToSlide: true,
    });
  });

  $(document).ready(function () {
    $(".bestseller__selling").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrow: true,
      swipeToSlide: true,
    });
  });

  $(document).ready(function () {
    $(".bestseller__promotion").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrow: true,
      swipeToSlide: true,
    });
  });

  $(document).ready(function () {
    $(".other-slider").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrow: true,
      swipeToSlide: true,
    });
  });

  $(document).ready(function () {
    $(".productIntro__slide").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".productIntro__nav",
    });
    $(".productIntro__nav").slick({
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: ".productIntro__slide",
      centerMode: true,
      focusOnSelect: true,
      vertical: true,
      verticalSwiping: true,
    });
  });

  Fancybox.bind('[data-fancybox="gallery"]', {
    Thumbs: {
      type: "classic",
    },
  });
});
