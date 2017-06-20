(function($) {

    $(document).ready(function() {

        var userMenuTimer = null;
        $('.header-user-menu').mouseover(function() {
            window.clearTimeout(userMenuTimer);
            userMenuTimer = null;

            $('.header-user-menu').addClass('hover');
        });

        $('.header-user-menu').mouseout(function() {
            window.clearTimeout(userMenuTimer);
            userMenuTimer = null;

            userMenuTimer = window.setTimeout(function() {
                $('.header-user-menu.hover').removeClass('hover');
            }, 300);
        });

        $('form').each(function() {
            initForm($(this));
        });

        $('.search-input input').focus(function() {
            $('.search').addClass('focus');
        });

        $('.search-input input').blur(function() {
            if ($(this).val() == '') {
                $('.search').removeClass('focus');
            }
        });

        $('.search-close').click(function(e) {
            $('.search-input input').val('').blur();
            $('.search-results').hide();
            e.preventDefault();
        });

        var searchTimer = null;

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.search-inner').length == 0) {
                window.clearTimeout(searchTimer);
                searchTimer = null;

                $('.search').removeClass('focus');
                $('.search-results').hide();
            }
        });

        $('.search-input input').on('keyup', function(e) {
            window.clearTimeout(searchTimer);
            searchTimer = null;

            if ($(this).val() != '' && $(this).val().length > 2) {
                searchTimer = window.setTimeout(function() {
                    $('.search-results-loading').show();
                    $.ajax({
                        type: 'POST',
                        url: $('.search form').attr('action'),
                        data: $('.search form').serialize(),
                        dataType: 'html',
                        cache: false
                    }).done(function(html) {
                        $('.search-results-loading').hide();
                        $('.search-results').show();
                        $('.search-results-list').html(html);
                    });
                }, 300);
            } else {
                $('.search-results-list').html('');
            }
            e.preventDefault();
        });

        $('.dashboard-activity-wrap').jScrollPane({
            autoReinitialise: true
        });

        $('.structure-level .structure-level .structure-level-item-wrap').click(function() {
            var curItem = $(this).parent();
            var curLevel = curItem.parent();
            curLevel.toggleClass('open');
            resizeStructure();
        });
        resizeStructure();

        $('.structure-level-item-detail-inner').jScrollPane();

        $('.structure-level-item').click(function() {
            var curItem = $(this);
            if (curItem.find('.structure-level-item-detail').length > 0) {
                if (!curItem.hasClass('view')) {
                    $('.structure-level-item.view').removeClass('view');
                    curItem.addClass('view');

                    var curDetail = curItem.find('.structure-level-item-detail');
                    curDetail.removeClass('bottom');
                    if (curDetail.offset().top + curDetail.outerHeight() > $('.wrapper').height()) {
                        curDetail.addClass('to-bottom');
                    }
                } else {
                    curItem.removeClass('view');
                }
            }
        });

        $('.media-list').isotope({
            itemSelector: '.media-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.media-sizer'
            }
        });

        $('.media-item a').fancybox({
            prevEffect: 'none',
            nextEffect: 'none',
            helpers: {
                media: true,
                title: {
                    type: 'outside',
                    position: 'top'
                },
                thumbs: {
                    width: 86,
                    height: 58,
                    source: function(current) {
                        return $(current.element).data('thumbnail');
                    }
                }
            },
            tpl: {
                closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            padding: 0,
            margin: [30, 120, 40, 120],
            topRatio: 0,
            beforeShow: function() { this.title += '<div class="fancybox-title-date">' + $(this.element).data('date') + '</div>'}
        });

        $('.media-more').click(function(e) {
            $.ajax({
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                var $items = $(html);
                $('.media-list').append($items).isotope('appended', $items);
            });
            e.preventDefault();
        });

        $('.messages-list').each(function() {
            $('.messages-list').jScrollPane({
                autoReinitialise: true
            });
            $('.messages-list').data('jsp').scrollToPercentY(100);
        });

        $('.docs-level-name a').click(function(e) {
            var curItem = $(this).parent();
            var curLevel = curItem.parent();
            curLevel.toggleClass('open');
            e.preventDefault();
        });

        $('.menu-mobile-link').click(function(e) {
            $('html').toggleClass('menu-mobile-open');
            $('html').removeClass('menu-user-mobile-open');
            $('html').removeClass('contractors-filter-mobile-open');
            e.preventDefault();
        });

        $('.menu-user-mobile-link').click(function(e) {
            $('html').toggleClass('menu-user-mobile-open');
            $('html').removeClass('menu-mobile-open');
            $('html').removeClass('contractors-filter-mobile-open');
            e.preventDefault();
        });

        $('.dashboard-summ-item-activity-link').click(function(e) {
            $('.dashboard-summ').toggleClass('activity');
            e.preventDefault();
        });

        $('.messages-contacts a.dashboard-summ-list-item-wrap').click(function(e) {
            $('.messages').addClass('open');
            e.preventDefault();
        });

        $('.messages-back').click(function(e) {
            $('.messages').removeClass('open');
            e.preventDefault();
        });

        var curTextAreaHeight = $('.messages-container .form-input textarea').height();
        $('.messages-container .form-input textarea').autoresize({
            onResize: function() {
                if ($('.messages-container .form-input textarea').height() > curTextAreaHeight) {
                    $('.messages-container .form-input textarea').addClass('active');
                } else {
                    $('.messages-container .form-input textarea').removeClass('active');
                }
            }
        });

        $('.profile-photo .reload input').change(function() {
            $('.profile-photo .loading').show();
        });

        $('.menu-add-link').click(function(e) {
            $('.menu-add').toggleClass('open');
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.menu-add').length == 0) {
                $('.menu-add').removeClass('open');
            }
        });

        $('.webresourses-tabs-current').click(function() {
            $('.webresourses-tabs').toggleClass('open');
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.webresourses-tabs').length == 0) {
                $('.webresourses-tabs').removeClass('open');
            }
        });

        $('.webresourses-tabs li a').click(function(e) {
            var curLi = $(this).parent();
            $('.webresourses-tabs li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.webresourses-tabs li').index(curLi);
            $('.webresourses-tabs').removeClass('open');
            $('.webresourses-tabs-current').html($(this).html());
            $('.webresourses-tabs-content.active').removeClass('active');
            $('.webresourses-tabs-content').eq(curIndex).addClass('active');
            e.preventDefault();
        });

        $('.dashboard .dashboard-news-menu a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                $('.dashboard .dashboard-news-menu li.active').removeClass('active');
                curLi.addClass('active');
                var curIndex = $('.dashboard .dashboard-news-menu li').index(curLi);
                $('.dashboard .news-list.active').removeClass('active');
                $('.dashboard .news-list').eq(curIndex).addClass('active');
            }
            e.preventDefault();
        });

        $('.contractors-filter-group-title a').click(function(e) {
            $(this).parent().parent().toggleClass('open');
            e.preventDefault();
        });

        $('.contractors-filter-group-title input').change(function() {
            var curInput = $(this);
            var curGroup = curInput.parents().filter('.contractors-filter-group');
            if (curInput.prop('checked')) {
                curGroup.find('.contractors-filter-group-sub input').prop('checked', true);
            } else {
                curGroup.find('.contractors-filter-group-sub input').prop('checked', false);
            }
        });

        $('.contractors-filter-group-sub input').change(function() {
            var curInput = $(this);
            var curGroup = curInput.parents().filter('.contractors-filter-group');
            if (!curInput.prop('checked')) {
                curGroup.find('.contractors-filter-group-title input').prop('checked', false);
            } else {
                if (curGroup.find('.contractors-filter-group-sub input:checked').length == curGroup.find('.contractors-filter-group-sub input').length) {
                    curGroup.find('.contractors-filter-group-title input').prop('checked', true);
                }
            }
        });

        $('.contractors-item-detail-link').click(function(e) {
            var curItem = $(this).parents().filter('.contractors-item');
            if (curItem.hasClass('open')) {
                curItem.removeClass('open');
            } else {
                $('.contractors-item.open').removeClass('open');
                curItem.addClass('open');
            }
            e.preventDefault();
        });

        $('.contractor-info-menu li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                $('.contractor-info-menu li.active').removeClass('active');
                curLi.addClass('active');
                var curIndex = $('.contractor-info-menu li').index(curLi);
                $('.contractor-info-tab.active').removeClass('active');
                $('.contractor-info-tab').eq(curIndex).addClass('active');
            }
            e.preventDefault();
        });

        $('.contractor-project-open-link').click(function(e) {
            $(this).parent().toggleClass('open');
            e.preventDefault();
        });

        $('.contractor-project-descr-more-link a').click(function(e) {
            $(this).parent().parent().toggleClass('open');
            e.preventDefault();
        });

        $('.contractor-projects-filter li a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                $('.contractor-projects-filter li.active').removeClass('active');
                curLi.addClass('active');
                var curClass = $(this).attr('class');
                if (curClass != '') {
                    $('.contractor-project').hide();
                    $('.contractor-project.' + curClass).show();
                } else {
                    $('.contractor-project').show();
                }
            }
            e.preventDefault();
        });

        $('.contractors-filter-mobile-link a').click(function(e) {
            $('html').addClass('contractors-filter-mobile-open');
            e.preventDefault();
        });

        $('.contractors-filter-close').click(function(e) {
            $('html').removeClass('contractors-filter-mobile-open');
            e.preventDefault();
        });

        $('.contractor-info-tag-text-edit-link a').click(function(e) {
            var curBlock = $(this).parent().parent();
            curBlock.find('.contractor-info-tag-text-wrap-inner').html('<div class="form-input"><textarea name="message" rows="5" cols="10">' + curBlock.find('.contractor-info-tag-text-wrap-inner').html() + '</textarea></div>');
            curBlock.find('.contractor-info-tag-text-edit-link a').hide();
            curBlock.find('.contractor-info-tag-text-edit-link input').show();
            e.preventDefault();
        });

        $('body').on('submit', '.contractor-info-tag-text form', function(e) {
            var curBlock = $(this).parent();
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: $(this).serialize(),
                dataType: 'html',
                cache: false
            });

            curBlock.find('.contractor-info-tag-text-wrap-inner').html(curBlock.find('.contractor-info-tag-text-wrap-inner textarea').val());
            curBlock.find('.contractor-info-tag-text-edit-link a').show();
            curBlock.find('.contractor-info-tag-text-edit-link input').hide();
            e.preventDefault();
        });

        $('.megaplan-update').click(function(e) {
            $('.megaplan-loading').show();
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                $('.megaplan-loading').hide();
                $('.megaplan-list').html(html);
                if ($('.megaplan-empty').length == 0) {
                    $('.megaplan-update').removeClass('megaplan-update-empty');
                } else {
                    $('.megaplan-update').addClass('megaplan-update-empty');
                }
            });
            e.preventDefault();
        });

        $('.megaplan-empty-link a').click(function(e) {
            $('.megaplan-update').click();
            e.preventDefault();
        });

        $(window).on('load resize', function() {
            updateCalendarMore();
        });

        $('body').on('click', '.calendar-item-more a', function(e) {
            $('.calendar-more').remove();
            var curLink = $(this);
            var curItem = curLink.parents().filter('.calendar-item');
            var newHTML =   '<div class="calendar-more">' +
                                '<div class="calendar-more-date">' + curItem.find('.calendar-item-day').data('fulldate') + '</div>' +
                                '<div class="calendar-more-list">' +
                                    '<div class="calendar-more-list-inner">';

            curItem.find('.calendar-item-link a').each(function() {
                var itemLink = $(this);
                var hasBirthday = '';
                if (itemLink.parent().hasClass('birthday')) {
                    hasBirthday = ' birthday';
                }
                var hasOther = '';
                if (itemLink.parent().hasClass('other')) {
                    hasOther = ' other';
                }
                newHTML +=              '<div class="calendar-more-list-item' + hasBirthday + hasOther + '"><a href="' + itemLink.attr('href') + '">' + itemLink.html() + '</a></div>';
            });

            newHTML +=              '</div>' +
                                '</div>' +
                                '<a href="#" class="calendar-more-close"></a>' +
                            '</div>';
            curItem.append(newHTML);
            if ($(window).width() < 1200) {
                $('.calendar-more').css({'margin-top': (curItem.offset().top - $('.calendar-list').offset().top) + 'px'});
            }
            $('.calendar-more-list-inner').jScrollPane({
                autoReinitialise: true
            });
            curItem.find('.calendar-more').addClass('active');
            e.preventDefault();
        });

        $('body').on('click', '.calendar-item-link a', function(e) {
            var curLink = $(this);
            var curItem = curLink.parents().filter('.calendar-item');
            $.ajax({
                type: 'POST',
                url: curLink.attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                $('.calendar-more').remove();
                curItem.append(html);
                positionCalendarText(curItem, curLink);
            });
            e.preventDefault();
        });

        $(window).on('resize', function() {
            $('.calendar-more').remove();
        });

        function positionCalendarText(curItem, curLink) {
            var curTop = (curLink.offset().top - curItem.offset().top) - 40;
            if ($(window).width() < 1200) {
                curTop += (curItem.offset().top - $('.calendar-list').offset().top);
            }
            if (curItem.find('.calendar-more-text').offset().top + curTop + curItem.find('.calendar-more-text').height() > $('.wrapper').height()) {
                curTop += $('.wrapper').height() - (curItem.find('.calendar-more-text').offset().top + curTop + curItem.find('.calendar-more-text').height());
            }
            curItem.find('.calendar-more-text').css({'margin-top': curTop + 'px'});
            curItem.find('.calendar-more').addClass('active');
        }

        $('body').on('click', '.calendar-more-list-item a', function(e) {
            var curLink = $(this);
            var curItem = curLink.parents().filter('.calendar-item');
            $.ajax({
                type: 'POST',
                url: curLink.attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                curItem.find('.calendar-more-text').remove();
                curItem.append(html);
                positionCalendarText(curItem, curLink);
            });
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.calendar-more').length == 0 && !$(e.target).parent().hasClass('calendar-item-more')) {
                $('.calendar-more').remove();
            }
        });

        $('body').on('click', '.calendar-more-close', function(e) {
            var curItem = $(this).parents().filter('.calendar-more');
            if (curItem.hasClass('calendar-more-text')) {
                $(this).parents().filter('.calendar-more').remove();
            } else {
                $('.calendar-more').remove();
            }
            e.preventDefault();
        });

    });

    $(window).resize(function() {
        $('.form-select select').chosen('destroy');
        $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    });

    $(window).bind('load resize', function() {
        resizeStructure();
    });

    function resizeStructure() {
        $('.structure-level-line').each(function() {
            var curLine = $(this);
            var curLevel = curLine.parent();
            curLine.height(curLevel.offset().top - curLevel.parent().offset().top);
        });
    }

    function initForm(curForm) {
        curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

        curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

        curForm.find('.form-checkbox span input:checked').parent().parent().addClass('checked');
        curForm.find('.form-checkbox').click(function() {
            $(this).toggleClass('checked');
            $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
        });

        curForm.find('.form-radio span input:checked').parent().parent().addClass('checked');
        curForm.find('.form-radio').click(function() {
            var curName = $(this).find('input').attr('name');
            curForm.find('.form-radio input[name="' + curName + '"]').parent().parent().removeClass('checked');
            $(this).addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        curForm.find('.form-file-input input').change(function() {
            var curInput = $(this);
            var curField = curInput.parent();
            curField.find('span').html(curInput.val().replace(/.*(\/|\\)/, ''));
        });

        curForm.validate({
            ignore: '',
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                checkErrors();
            }
        });
    }

    function checkErrors() {
        $('.form-checkbox').each(function() {
            var curField = $(this);
            if (curField.find('input.error').length > 0) {
                curField.addClass('error');
            } else {
                curField.removeClass('error');
            }
        });
    }

    $(window).on('load resize', function() {

        $('.contractors-list').each(function() {
            var curList = $(this);
            curList.find('.contractors-item-anonce').css({'min-height': 0 + 'px'});

            curList.find('.contractors-item-anonce').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                curList.find('.contractors-item-anonce').each(function() {
                    var otherBlock = $(this);
                    if (otherBlock.offset().top == curTop) {
                        var newHeight = otherBlock.height();
                        if (newHeight > curHeight) {
                            curBlock.css({'min-height': newHeight + 'px'});
                        } else {
                            otherBlock.css({'min-height': curHeight + 'px'});
                        }
                    }
                });
            });
        });

        $('.auth').each(function() {
            $(this).height($(window).height());
            var curTop = ($(window).height() - $('.logo-auth').outerHeight() - $('.auth-forget-link').outerHeight() - $('.auth-copyrights').outerHeight() - $('.auth form').outerHeight()) / 2;
            if (curTop < 0) {
                curTop = 50;
            }
            $('.auth form').css({'margin-top': curTop + 'px'});
        });

    });

})(jQuery);

function updateCalendarMore() {
    $('.calendar-list').each(function() {
        var curList = $(this);
        curList.find('.calendar-item').each(function() {
            var curItem = $(this);
            curItem.removeClass('have-more');
            curItem.find('.calendar-item-more').remove();
            var curLinksMore = curItem.find('.calendar-item-link:hidden').length;
            if (curLinksMore > 0) {
                curItem.addClass('have-more');
                var curLinks = curItem.find('.calendar-item-link').length;
                curItem.find('.calendar-item-content').append('<div class="calendar-item-more"><a href="#">+ ещё ' + (curLinksMore + 1) + '</a></div>');
            }
        });
    });
}