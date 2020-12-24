$("body").on("click", ".expand i", function () {
    $(this).toggleClass("fa-chevron-left");
    $(this).parent().parent().parent('.areas-inputs').toggleClass('active')
});
$("body").on("click", ".title-areas h4", function () {
    $(this).parent('.title-areas').find(".expand i").toggleClass("fa-chevron-left");
    $(this).parent('.title-areas').parent('.areas-inputs').toggleClass('active')
});
$("body").on("click", ".childul li ", function () {
    $('.childul').blur();
});

$('body').on('keydown', 'input[type=text]', function(e) {
  if (e.keyCode == 9) {
    $('.toolsbill').remove();
  }
});
//show menu moblie
$("body").on("click", ".showmobile", function () {
    $(".menumobile").toggleClass("active");
    $(this).toggleClass("active");
});
$("body").on("click", ".dropcustom .fa-ellipsis-v", function (event) {
    $("ul.dropcustom-content").toggleClass("active");
});
$('body').on('click', '.fix-c-body2 ', function (event) {
  $(this).parent('.collapsible').children().not(this).removeClass('active');
  $(this).toggleClass('active');
  event.preventDefault();
  event.stopImmediatePropagation();
  return;
  });

// get stock by location
$("body").on("click", ".selectedlocation", function () {
    $(".selectedlocation").removeClass("active");
    setTimeout(() => {
        $(this).toggleClass("active");
    }, 0);
});
  $('body').on('click', '.dropdown-inputscontent li', function (){
    setTimeout(() => {
        $('.dropdown-inputscontent').removeClass('active');
      }, 500);
  });

// show hoạt động
$('body').on('click', '.show-ac', function () {
    $('.info-ac').toggleClass('active');
    $(this).toggleClass('active');
});
$("body").on("click", ".create-t3", function () {
    $('.activety').toggleClass("active");
    $(this).toggleClass("active");
});

$(document).ready(function(){
    M.AutoInit();
    let textarea = document.querySelector('textarea');
    if(textarea != null){
        textarea.addEventListener('keydown', autosize);
        function autosize() {
            var el = this;
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
    }

    //sidebar
    $("body").on("click", ".sidenav-open", function () {
        let sidebar = M.Sidenav.getInstance($('.sidenav'));
        if(sidebar.isOpen){
            sidebar.close();

        }else{
            sidebar.open();
        }
    });
    $("table").click(function(event) {
      $("ul.dropcustom-content").removeClass("active");
    });
    //menu bar
       $("body").click(function(event) {
        let nav = $('.sidenav');
        if (nav && nav.length > 0) {
          let sidebar = M.Sidenav.getInstance($('.sidenav'));
          if(sidebar) {
              if(sidebar.isOpen){
                  $('.sidenav-open #btn-menu').addClass('open');
                      $('.sidenav-open').addClass('active');
              }else{
                  setTimeout(() => {
                      $('.sidenav-open #btn-menu').removeClass('open');
                      $('.sidenav-open').removeClass('active');
                  }, 0);
              }
          }
        }
    });

    //dropdown notify
    // if($( window ).width() > 991){
    //     M.Dropdown.init($('.dropdown-trigger'), {hover:true,constrainWidth:false});
    // }
    setTimeout(() => {
        M.Dropdown.init($('.dropdown-trigger2'), {hover:false,closeOnClick:true});
        M.Dropdown.init($('.dropdown-trigger'), {hover:false,closeOnClick:true});
    }, 100);

    $('.tooltipped').tooltip();
    // change checkbox selectmulti
setTimeout(() => {
    $("body").on("click", ".select-wrapper .select-dropdown", function () {
        $('.multiple-select-dropdown li input[type="checkbox"]').addClass('filled-in');
    });
    $("body").on("click", ".open-menu-multi", function () {
        $(this).toggleClass('active');
        $(this).find('i.fa').toggleClass('fa-angle-up');
        $(".d-m-l").toggle();
    });
    $("body").on("click", ".navbar, .title-n-t, .tool1, .tool2, .create-page, .table-custom", function (e) {
        $('.open-menu-multi').removeClass('active');
                $('.dropdown-menu-multi').find('i.fa').removeClass('fa-angle-up');
                $(".d-m-l").hide();
    });
    $('body').on({
        mouseenter: function() {
            $(this).toggleClass("open");
        },
        mouseleave: function() {
            $(this).toggleClass("open");
        }
      }, '.dropdown-submenu');
}, 0);

// dark light mode
// let toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
// function switchTheme(e) {
//     if (e.target.checked) {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         localStorage.setItem('theme', 'dark');
//     }
//     else {
//         document.documentElement.setAttribute('data-theme', 'light');
//         localStorage.setItem('theme', 'light');
//     }
//     const theme = localStorage.getItem('theme');
//     if (theme === 'dark') {
//       $('.glowTableBody tr').css({ 'background': '#161625' });
//       $('.glowTableBody tbody > tr:nth-child(odd)').css({ 'background': '#1e1e2b' });
//     } else {
//       $('.glowTableBody tr').css({ 'background': 'white' });
//       $('.glowTableBody tbody > tr:nth-child(odd)').css({ 'background': '#f3f8ff' });
//     }
// }
// if(toggleSwitch){
//     toggleSwitch.addEventListener('change', switchTheme, false);
//   }
// const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
// if (currentTheme) {
//     document.documentElement.setAttribute('data-theme', currentTheme);

//     if (currentTheme === 'dark') {
//         toggleSwitch.checked = true;
//     }
// }
  });
