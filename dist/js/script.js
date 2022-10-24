const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  close = document.querySelector(".menu__close");
hamburger.addEventListener("click", () => {
  menu.classList.add("active");
});
close.addEventListener("click", () => {
  menu.classList.remove("active");
});

const counters = document.querySelectorAll(".arsenal__retings-counter"),
  lines = document.querySelectorAll(".arsenal__retings-line span");
counters.forEach((item, i) => {
  lines[i].style.width = item.innerHTML;
});

function validateForms(form) {
  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      checkbox: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Пожалуйста, введите свое имя",
        minlength: jQuery.validator.format("Введите {0} символа!"),
      },
      email: {
        required: "Пожалуйста, введите свою почту",
        email: "Неправильно введен адрес почты",
      },
      checkbox: {
        required: "Пожалуйста, оставьте галочку",
      },
    },
  });
}
validateForms("#cont-form");

$("form").submit(function (e) {
  e.preventDefault();
  if (!$(this).valid()) {
    return;
  }
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize(),
  }).done(function () {
    $(this).find("input").val("");
    $(".overlay, #thanks").fadeIn("slow");
    $("form").trigger("reset");
  });
  return false;
});

$(".modal__close").on("click", function () {
  $(".overlay, #thanks").fadeOut("slow");
});
