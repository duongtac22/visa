function clickUploadAva(holder){
    $("#upload:hidden").trigger('click');
}
function openModal (holder, actions){
    if (actions == 'close') {
        $('body').removeClass('modal-open');
        $('.custom-modal').fadeOut().removeClass('show');
    }

    if (holder === 'popup-forgotpassword-success-ok') {
        var a = 'popup-forgotpassword-success';
    }else {
        var a = $(holder).attr('data-holder');
    }
        $(".bg-overlay").fadeIn();
        $("#" + a).fadeIn().addClass('show');
        $('body').addClass('modal-open');
        $('.js-cart-item-date').flatpickr({
            dateFormat: "d/m/Y",
        });


};

function openModalCart(holder,actions) {
    if(actions=='close') {
        $('body').removeClass('modal-open');
        $('.custom-modal').fadeOut().removeClass('show');
    }
    let url = $(holder).attr('data-url-load');
    shop.ajax_popup(url, 'POST', {},
        function (response) {
            if (response.error == 1) {
                Swal.fire({
                    title: 'Oops!',
                    text: response.msg,
                    type: "warning",
                    showCancelButton: !0,
                    showConfirmButton: 0,
                    cancelButtonColor: "#d33",
                    cancelButtonClass: "btn btn-danger ml-2 mt-2 btn-sm",
                    buttonsStyling: !1,
                });
            }else {
                $('.preview-cart').empty().html(response);
                let a = $(holder).attr('data-holder');
                $(".bg-overlay").fadeIn();
                $("#" + a).fadeIn().addClass('show');
                $('body').addClass('modal-open');
                $('.js-cart-item-date').flatpickr({
                    dateFormat: "d/m/Y",
                });
            }
        },
        'html');
    /*$.ajax({
        type: 'POST',
        url: ENV.BASE_URL+"ajax/cart-load",
        data: {_token:ENV.token},
        dataType: 'json',
    }).done(function(json) {
        if(json.data.number > 0) {

            let a = $(holder).attr('data-holder');
            $(".bg-overlay").fadeIn();
            $("#" + a).fadeIn().addClass('show');
            $('body').addClass('modal-open');
        }


    });*/

};

function closeModal (holder) {
    $('body').removeClass('modal-open');
    $(holder).closest('.custom-modal').fadeOut().removeClass('show');
    $(holder).closest('.custom-modal').find(".bg-overlay").fadeOut();
};

function toggleTable(holder) {
    $(holder).on('click', function(){
      
      var parentsRow = $(this).parent();
    
      if(parentsRow.hasClass('opened') == true) {
          // is open
          parentsRow.removeClass('opened');
      } else {
            $(holder).removeClass('opened');
            parentsRow.addClass('opened');
      }
    })
}

function scrollToDiv(holder){
    let headerHeight = 0 ;
    if($('#header').hasClass('scroll') == true){
        headerHeight = $('#header').height();
    }
    $('html,body').animate({
        scrollTop: $(holder).offset().top - headerHeight + 10
    }, 'slow');
}
// Click user header
function toggleUser() {
    $('.popup-ava-menu').toggleClass('open-popup-ava-menu');
}

function isOnScreen(elem) {
    // if the element doesn't exist, abort
    if( elem.length == 0 ) {
      return;
    }
    var $window = jQuery(window)
    var viewport_top = $window.scrollTop()
    var viewport_height = $window.height()
    var viewport_bottom = viewport_top + viewport_height
    var $elem = jQuery(elem)
    var top = $elem.offset().top
    var height = $elem.height()
    var bottom = top + height
  
    return (top >= viewport_top && top < viewport_bottom) ||
      (bottom > viewport_top && bottom <= viewport_bottom) ||
      (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
}

function counterUp(holder){

    $(holder).each(function (i, el) {

        if($(this).hasClass('count-done') == true) return ; 

        let data = parseInt(this.dataset.countup, 10);

        let options = {
            "from": {
                "count": 0
            },
            "to": {
                "count": data
            }
        } ;

        $(options.from).animate(options.to , {
            duration : 800 * 1,
            step : function(now, fx) {
                $(el).text(Math.ceil(now));
            },
            complete : function(){
                $(el).addClass('count-done');
            }

        });

    });

}

function runCounterUp(parentHolder){
    if(isOnScreen($(parentHolder)) && $(parentHolder).hasClass('loaded')==false){

        let holder = $(parentHolder).data('counter');
        
        counterUp(holder);

        $(parentHolder).addClass('loaded');
    }
};

function changeTabs(listenHolder) {
    $(listenHolder).on('click',function(){
        let target = $(this).data('holder');
        // check window size < 992px
        let windowsize = $(window).width();
        $('li.nation').removeClass('active');

        $(this).parent().addClass('active');

        $('.tab-content').hide().removeClass('active');

        $(target).show().addClass('active')

        if (windowsize <= 991) { 
            let headerHeight = $('#header').height();
            $('html,body').animate({
                scrollTop: $(target).offset().top - headerHeight - 10 
            }, 'slow');
        }
    })
}
function submitContact(fullname = false, phone = false, email =false, content = false) {
    var data = {
        _token: ENV.token,
        fullname: fullname ? fullname : $('#fullname').val(),
        phone: phone ? phone : $('#phone').val(),
        email: email ? email : $('#email').val(),
        content: content ? content : $('#content').val(),
        type: 2,
    };

    $('#form-contact input, #form-contact textarea,#form-contact select').removeClass('is-invalid').addClass('reverse');

    $.ajax({
        url: '/lien-he.html',
        type: 'POST',
        data: data,
        dataType: 'json',
        statusCode: {
            422: function (response) {
                var json = JSON.parse(response.responseText);
                if (json) {
                    $.each(json.errors, function (key, val) {
                        $('#form-contact input#' + key + ', #form-contact textarea#' + key + ', #form-contact select#' + key).removeClass('reverse').addClass('is-invalid');
                        $('#form-contact div#' + key + '_err_text').html(val[0]);
                    });
                }
            },
            400: function (response) {
                var json = JSON.parse(response.responseText);
                Swal.fire({
                    title: '<span style="color:#b90052">' + 'Thông báo' + '</span>',
                    html: '<span style="color:#000">' + json.msg + '</span>',
                    imageWidth: 42,
                    imageHeight: 42,
                    customClass: {
                        confirmButton: 'confirm-button-class',
                    }
                    // animation: false
                })
            }
        },
        success: function (xhr) {
            if (xhr.error == 1) {
                Swal.fire({
                    title: '<span style="color:#b90052">' + 'Thông báo' + '</span>',
                    html: '<span style="color:#000">' + xhr.msg + '</span>',
                    imageWidth: 42,
                    imageHeight: 42,
                    customClass: {
                        confirmButton: 'confirm-button-class',
                    }
                })
            } else {
                Swal.fire({
                    title: '<span style="color:#b90052">' + 'Thông báo' + '</span>',
                    html: '<span style="color:#000">' + 'Đã gửi thông tin liên hệ thành công' + '</span>',
                    imageWidth: 42,
                    imageHeight: 42,
                    customClass: {
                        confirmButton: 'confirm-button-class',
                    }
                }).then(function () {
                    document.getElementById("form-contact").reset()
                    window.location.reload();
                });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            // Swal.fire({
            //     title: '<span style="color:#b90052">' + 'Thông báo' + '</span>',
            //     html: '<span style="color:#000">' + 'Status:' + textStatus + '\n' + errorThrown + '</span>',
            //     imageWidth: 42,
            //     imageHeight: 42,
            //     customClass: {
            //         confirmButton: 'confirm-button-class',
            //     }
            //     // animation: false
            // });
        }
    })
}
function submitContact_POPUP(fullname = false, phone = false, email =false, content = false) {
    var data = {
        _token: ENV.token,
        fullname: fullname ? fullname : $('#dangky-fullname').val(),
        phone: phone ? phone : $('#dangky-phone').val(),
        email: email ? email : $('#dangky-email').val(),
        content: content ? content : $('#dangky-note').val(),
        type: 2,
    };
    var $dom = '#form-dangky';
    $('#form-dangky input, #form-dangky textarea, #form-dangky select').removeClass('is-invalid').addClass('reverse');

    $.ajax({
        url: '/lien-he.html',
        type: 'POST',
        data: data,
        dataType: 'json',
        statusCode: {
            422: function (response) {
                var json = JSON.parse(response.responseText);
                if (json) {
                    $.each(json.errors, function (key, val) {
                        $('#form-dangky input#dangky-' + key + ', #form-dangky textarea#dangky-' + key + ', #form-dangky select#dangky-' + key).removeClass('reverse').addClass('is-invalid');
                        $('#form-dangky div#dk' + key + '_err_text').html(val[0]);
                    });
                }
            },
            400: function (response) {
                var json = JSON.parse(response.responseText);
                Swal.fire({
                    title: '<span style="color:#b90052">' + 'Thông báo' + '</span>',
                    html: '<span style="color:#000">' + json.msg + '</span>',
                    imageWidth: 42,
                    imageHeight: 42,
                    customClass: {
                        confirmButton: 'confirm-button-class',
                    }
                    // animation: false
                })
            }
        },
        success: function (xhr) {
            if (xhr.error == 1) {
                Swal.fire({
                    title: '<span style="color:#b90052">' + 'Thông báo' + '</span>',
                    html: '<span style="color:#000">' + xhr.msg + '</span>',
                    imageWidth: 42,
                    imageHeight: 42,
                    customClass: {
                        confirmButton: 'confirm-button-class',
                    }
                })
            } else {
                Swal.fire({
                    title: '<span style="color:#b90052">' + 'Thông báo' + '</span>',
                    html: '<span style="color:#000">' + 'Đã gửi thông tin liên hệ thành công' + '</span>',
                    imageWidth: 42,
                    imageHeight: 42,
                    customClass: {
                        confirmButton: 'confirm-button-class',
                    }
                }).then(function () {

                    document.getElementById("form-dangky").reset()
                    openModal('', 'close')
                });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            // Swal.fire({
            //     title: '<span style="color:#b90052">' + 'Thông báo' + '</span>',
            //     html: '<span style="color:#000">' + 'Status:' + textStatus + '\n' + errorThrown + '</span>',
            //     imageWidth: 42,
            //     imageHeight: 42,
            //     customClass: {
            //         confirmButton: 'confirm-button-class',
            //     }
            //     // animation: false
            // });
        }
    })
}



function addToCart (id, dat_ngay = false) {
    var ngay_nhap_canh = $('#visa-service-'+ id).val()
    var quantity = $('#visa-quantity-'+ id).val()
    shop.ajax_popup('cart-add', 'POST', {id: id, ngay_nhap_canh: ngay_nhap_canh, quantity: quantity}, function (result) {
        if(dat_ngay) {
            window.location.href = '/checkout'
        }else {
            alert('Thêm giỏ hàng thành công');
            if(result.data.number > 0) {
                $('#cart-qty').html(result.data.number)
            }else {
                $('#cart-qty').addClass('d-none')
            }
        }
    })
}

function cartRemove (id) {
    shop.ajax_popup('cart-remove', 'POST', {id: id}, function (result) {
        if(result.error == 0) {
            shop.reload()
        }else {
            alert(result.msg);
        }
    })
}

function collapse_content(item) {
    $(".js-viewmore-content").click(function () {
        $(this).toggleClass("active");
        $(item).toggleClass("collasped-content");

        if($(this).hasClass("active")){
            $(this).text('Thu gọn');
        }else{
            $(this).text('Xem thêm');
        }
    });
}

function onScroll(){
    var scrollPos = $(window).scrollTop();
    var outerHeight = 0 ;
    if($('#header').hasClass('scroll') == true) {
        outerHeight = $('#header').height();
    }

    $('.js-onscroll-menu li').each(function () {
        var currLink = $(this);
        var refElement = $(this).attr("data-id");
        if ($(refElement).offset().top - outerHeight <= scrollPos && $(refElement).offset().top + $(refElement).height() - outerHeight> scrollPos) {
            $('.js-onscroll-menu li').removeClass("active");
            currLink.addClass("active");
        } else if($('.js-onscroll-menu li').eq(0).offset().top - outerHeight >= scrollPos) {
            currLink.removeClass("active");
            $('.js-onscroll-menu li').eq(0).addClass("active");
        } else{
            currLink.removeClass("active");
        }
    });

}

function toggle_tab_service(holder, status) {
    let target = '';
    if(status == 'info') {
        target = '.js-service-info' ;
        $(holder).closest('.visa-services-item').find(target).toggleClass('active');
    }
    if(status == 'price') {
        target = '.js-service-price' ;
        if($(holder).hasClass('cancel') == false) {
            
            $(holder).text('Hủy').addClass('cancel');
        } else {
            $(holder).text('Chọn').removeClass('cancel');
        }
        $(holder).closest('.visa-services-item').find(target).toggleClass('active');
    }
    
}
// chuyen thanh documentready khi ghep code
// Slide
$(window).on('load', function() {

    // hide showmore khi click ra ngoai
    $('body').click(function(e) {

        var eventTarget = e.target;
        var listenClick = '.info-user-login';

        if ($(eventTarget).parents(listenClick).length != 1) {
            $('.popup-ava-menu').removeClass('open-popup-ava-menu');
        }

    });

    runCounterUp('.counter-up');

    // Scroll header
    $(window).scroll(function(event) {

        // run counter up 
        runCounterUp('.counter-up');

        //
        offsetAdd = $(window).scrollTop();

        if (offsetAdd >= 100) {
            $('#header').addClass('scroll');
        } else {
            $('#header').removeClass('scroll');
        }

    });
    /* Menu Moblie */
    $("nav#menu").mmenu({
        extensions: ["effect-slide-menu", "pageshadow"],
        counters: true,
        navbar: {
            title: "Danh mục"
        },
        navbars: [{
                position: "top",
                // content   : [ 'searchfield' ]
                // }, {
                content: ["prev", "title", "close"]
            },
            {
                position: "bottom",
                content: []
            }
        ]
    });
});