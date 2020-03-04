$(window).scroll(function() {
    if ($(window).width() > 991) {
        if ($(window).scrollTop() >= $('header').height()) {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    } else {
        if ($('.wrapper').hasClass('has-detail-tabs') == false) {
            if ($(window).scrollTop() >= $('header').height()) {
                $('header').addClass('sticky');
            } else { $('header').removeClass('sticky'); }
        }

        $('.main_content .detail-tabs li').click(function() { window.scrollTo(0, 0); });
    }

    /*
    if($(window).width() <= 991) {
        if($(window).scrollTop() >= $('header').height()) {
            $('.menu_sm_band').addClass('sticky');
        }
        else {
            $('.menu_sm_band').removeClass('sticky');
        }
    }
    if($(window).width() > 991) {
        $(".lockfixed").stick_in_parent({'parent': '.main_content'});
    }
    */
})
if ($(window).width() > 991) {
    $(".lockfixed").stick_in_parent({ 'parent': '.main_content' });
}
$(document).ready(function() {
    var intro_height = $('#contentProductRight .sort_wrapper').height();
    if (intro_height > 100) {
        $('#contentProductRight .intro').addClass('intro--hide');
    }

    $('.col_filter_list a').on('click', function(e) {
        //e.preventDefault();
        //$(this).find('strong').toggleClass('checked');
        //$(this).find('strong').next().toggleClass('checked');

    });
    $('.pd_thumb_list').owlCarousel({
        items: 5,
        loop: false,
        autoplay: false,
        dots: false,
        nav: true,
        navText: ['<i class="glyphicon glyphicon-chevron-left"></i>', '<i class="glyphicon glyphicon-chevron-right"></i>']
    });
    $('.pd_thumb_list li').mouseover(function() {
        var $product_img = $(this).parents('.product_img');
        var $pd_main_img = $product_img.children('.pd_main_img');

        $link = $product_img.children('.pd_main_img');

        $link.attr('href', $(this).data('url'));

        $(this).parent().siblings().find('li').removeClass('active-thumb');
        $(this).addClass('active-thumb');
        $pd_main_img.find('img').attr('src', $(this).data('thumb'));
        //$pd_main_img.addClass('fade').delay(1000).removeClass('fade');
    });

    $.each($('.pd_thumb_list li'), function() {
        var main_img_src = $(this).parents('.product_img').find('.pd_main_img img').attr("src");
        var this_src = $(this).find('img').attr("src");
        if (main_img_src == this_src) {
            $(this).addClass('active-thumb');
        }
    })

    var img = $('.pd_img_slide .owl-item.active').find('img');
    $.each($('.pd_img_carousel .owl-item'), function() {
        if ($(this).find('img').attr('src') == img.attr('src')) {
            $(this).addClass('choosen');
        }
    });

    $('.pd_color .color').click(function() {
        location.href = $(this).data('url');
        return false;
        $('.pd_color .color').removeClass('checked');
        $(this).addClass('checked');

        var slide = $(".pd_img_slide ");
        var carousel = $(".pd_img_carousel");
        var flag = false;
        var arrImgOld = [];
        var arrImgNew = [];
        var color = $(this).data('color');
        var html = '';
        //var slideCarousel = '';
        //slide.remove();
        //carousel.remove();

        $.each($(".pd_img_slide .owl-carousel img"), function() {
            var imgSrc = $(this).attr('src');
            //arrImg.push(imgSrc);
            if (arrImgOld.indexOf(imgSrc) < 0) {
                arrImgOld.push(imgSrc);
                var arrName = imgSrc.split('.')[0];
                var ext = imgSrc.split('.')[1];
                var imgName = arrName.split('_').slice(0, -1).join('_');
                imgName = imgName + '_' + color + '.' + ext;
                html = html + '<li><a href="#"><img src="' + imgName + '" /></a></li>';
            }

        });

        html = '<ul class="owl-carousel owl-theme">' + html + '</ul>';
        slide.html(html);
        carousel.html(html);

        refreshGalleryByOption($(".pd_img_slide .owl-carousel"), $(".pd_img_carousel .owl-carousel"));
    })

    $('.top-search, .search_actived span').click(function() {
        $('#header_main').toggleClass('searching');
    })

    $('#contentProductRight .intro__toggle').click(function() {
        $(this).parent().toggleClass('intro--hide intro--show');
    })

    $('.feature').click(function() {
        
        $(this).siblings('.feature').removeClass('feature--active');
        var $features = $(this).siblings('.feature').find('.feature__board');
        $features.hide();

        $(this).toggleClass('feature--active');
        $(this).find('.feature__board').toggle();
    })

    $('.feature .fa-caret-down').click(function() {
        $(this).parent().parent().toggleClass('feature--active');
        var $e = $(this).parent().parent();
        
    })


    $(document).on("click", function(e) {
        if ($(e.target).is(".feature") === false && $(e.target).is(".feature__title") === false) {
            var $featureActive = $('.feature--active');
            $featureActive.removeClass('feature--active');
            $featureActive.find('.feature__board').hide();
        }
    });


    $('.collslider').owlCarousel({
        'items': 4,
        'loop': false,
        'autoplay': false,
        'dots': false,
        'nav': true,
        'responsive': {
            0: {
                'items': 2,
                'nav': false,
                'autoplay': true
            },
            992: {
                'items': 3,
                'nav': true,
                'autoplay': false
            },
            1024: {
                'items': 4,
                'nav': true,
                'autoplay': false
            }
        }
    });

    //danh gia san pham
    function imgAddedCount() {
        var isFull = true;
        $('.rate-file-list input').each(function() {
            if ($(this).val() == "") {
                isFull = false;
                return false;
            }
        })
        return isFull;
    }

    $('.img-item-plus, .rate-upload-area').click(function() {
        $('.rate-file-list input').each(function() {
            if ($(this).val() == "") {
                $(this).trigger('click');
                return false;
            }
        })
    })

    $('.rate-upload-area').click(function() {
        $('.img-upload-list').show();
    })

    $('.rate-file-list input').change(function() {
        readURL(this);
        if (imgAddedCount()) {
            $('.img-item-plus').hide();
        }
    })

    $(document).on('click', '.rate-img-uploaded .rate-image-close', function() {
        var fileid = $(this).parent().data('fileid');
        $(fileid).val("");
        $(this).parent().remove();
        $('.img-item-plus').show();
    });

});
$('.pd_content_list li a').click(function() {
    var $target = $(this.hash);
    $('html, body').animate({
        scrollTop: $target.offset().top - 30
    }, 500);
    return false;
});

function refreshGalleryByOption(slide, carousel) {
    var sync1 = slide, //$(".pd_img_slide .owl-carousel");
        sync2 = carousel, //$(".pd_img_carousel .owl-carousel");
        flag = false,
        duration = 300;
    var slides = sync1.owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        autoplay: false,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        dots: false,
        nav: true,
        navText: ['<i class="glyphicon glyphicon-menu-left"></i>', '<i class="glyphicon glyphicon-menu-right"></i>']
    }).on('changed.owl.carousel', function(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        sync2.find(".owl-item").removeClass("choosen").eq(current).addClass("choosen");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }

        /*
        var $img = $('.pd_img_slide .owl-item.active img').attr('src');
        console.log(property);
        var $carousel = $('.pd_img_carousel .owl-item');
        $carousel.removeClass('choosen');
        $.each($carousel, function() {
            if($(this).find('img').attr('src') == $img) {
                $(this).addClass('choosen');
            }
        })
        */
    });

    var thumbs = sync2.owlCarousel({
        items: 5,
        loop: false,
        margin: 20,
        autoplay: false,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 3
            },
            480: {
                items: 5
            }
        },
        navText: ['<i class="glyphicon glyphicon-menu-left"></i>', '<i class="glyphicon glyphicon-menu-right"></i>']
    }).on('click', '.owl-item', function(e) {
        e.preventDefault();
        sync1.trigger('to.owl.carousel', [$(e.target).parents('.owl-item').index(), 300, true]);
        $('.pd_img_carousel .owl-item').removeClass('choosen');
        $(this).addClass('choosen')
    }).on('change.owl.carousel', function(e) {
        if (e.namespace && e.property.name === 'position' && !flag) {
            //nsole.log('...');
        }
    }).data('owl.carousel');
}

function countString() {
    var n = $("#rate-text-limit");
    $("#rate-feedback").keyup(function() {
        var t = $(this).val(),
            i;
        if (t = $.trim(t),
            t.length == 0) {
            n.text("0 ký tự (tối thiểu 80)");
            return
        }
        t.split(/\W/);
        i = /\s+/gi;
        n.text(t.length + " ký tự (tối thiểu 80)")
    })
}
var countTextHinh = 0;
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var fsize = input.files[0].size; 
            var sizeHinh =  Math.round((fsize / (1024)));
            // > 5mb
            if (sizeHinh > 4096) {
                alert("Size hình phải nhỏ hơn 4 MB");
                return;
            }
            //alert(sizeHinh);
            var itemHTML = '<div class="rate-image-item" data-fileid="#' + input.id + '">' +
                '<img class="img-rounded" src="' + e.target.result + '"/>' +
                '<span class="rate-image-close"><i class="fa fa-close"></i></span></div>';
            $('.rate-img-uploaded').append(itemHTML);

            itemHTML = '<input id="textHinh' + countTextHinh +  '" type="text" name="imgBase64[]" value="' + e.target.result + '"/>';
            $('.rate-file-list').append(itemHTML);
            countTextHinh++;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/*
Tu.Nguyen
2018
Banner footer
------------------------- */
$('.banner_close').click(function(e) {
    e.preventDefault();
    var height = $('.banner_footer').height();
    if ($('.banner_footer').css('bottom') == '0px') {
        $('.banner_footer').css('bottom', -height);
        // LONG set session when close
        $.post("/ajax.php?do=session&act=setBannerBottom", {

            },
            function(data) {

            });
    } else {
        $('.banner_footer').css('bottom', 0);
    }
    $('.banner_close').toggleClass('down');
});
function isEmptyObject(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
function onClickbtnReviewSanPham()
{
    if ($('#rate-feedback').val() === '') {
        alert("Bạn chưa nhập nội dung");
        return false;
    }
    if ($('#cus_name').val() === '') {
        alert("Bạn chưa nhập họ tên");
        return false;
    }
    if ($('#cus_phone').val() === '') {
        alert("Bạn chưa nhập điện thoại");
        return false;
    }
    if ($('#cus_email').val() === '') {
        alert("Bạn chưa nhập email");
        return false;
    }
    /*
    if (typeof($('#textHinh0').val()) != "undefined") {

    }else {
        alert("Bạn chưa upload hình");
        return false;
    }
    */
     

    /*
    if ($('#rate-feedback').html() === '') {
        alert("Bạn chưa nhập nội dung");
        return false;
    }
    if ($('#cus_name').html() === '') {
        alert("Bạn chưa nhập họ tên");
        return false;
    }
    if ($('#cus_phone').html() === '') {
        alert("Bạn chưa nhập điện thoại");
        return false;
    }
    if ($('#cus_email').html() === '') {
        alert("Bạn chưa nhập email");
        return false;
    }
    if ($('#listImagesUpload').html() === '') {
        alert("Bạn chưa upload hình");
        return false;
    }
    */
    return true;  
} 

$(document).ready(function() {
    $(window).on('orientationchange', function(event) {
        location.href = location.href;
    });

    $('#backtop').click(function () {
        console.log("backtop");
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

}); 
// run to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }
    });

