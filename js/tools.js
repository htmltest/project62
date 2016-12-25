(function($) {

    $(document).ready(function() {

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
            e.preventDefault();
        });

        $('.search-input input').on('keyup', function() {
            if ($(this).val() != '') {
                $.ajax({
                    type: 'POST',
                    url: $('.search form').attr('action'),
                    data: $('.search form').serialize(),
                    dataType: 'html',
                    cache: false
                }).done(function(html) {
                    $('.search-results-list').html(html);
                });
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

        $('.structure-level-item-detail-inner').jScrollPane({
            autoReinitialise: true
        });

        $('.structure-level-item').click(function() {
            var curItem = $(this);
            if (curItem.find('.structure-level-item-detail').length > 0) {
                if (!curItem.hasClass('view')) {
                    $('.structure-level-item.view').removeClass('view');
                    curItem.addClass('view');
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
            e.preventDefault();
        });

        $('.dashboard-events').on('click', '.dashboard-events-ctrl a', function(e) {
            var curLink = $(this);
            var curBlock = curLink.parents().filter('.dashboard-events');
            var curWidth = $('.dashboard-events').width();

            var curIndex = curBlock.find('.dashboard-events-ctrl a').index(curLink);

            curBlock.find('.dashboard-events-item:first').stop(true, true).animate({'margin-left': -curIndex * curWidth});

            curBlock.find('.dashboard-events-ctrl a.active').removeClass('active');
            curLink.addClass('active');

            e.preventDefault();
        });

        $('.dashboard-news').on('click', '.dashboard-news-ctrl a', function(e) {
            var curLink = $(this);
            var curBlock = curLink.parents().filter('.dashboard-news');
            var curWidth = $('.dashboard-news').width();

            var curIndex = curBlock.find('.dashboard-news-ctrl a').index(curLink);

            curBlock.find('.dashboard-news-item:first').stop(true, true).animate({'margin-left': -curIndex * curWidth});

            curBlock.find('.dashboard-news-ctrl a.active').removeClass('active');
            curLink.addClass('active');

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
                curGroup.addClass('checked');
            } else {
                curGroup.removeClass('checked');
            }
        });

        $('.contractors-filter-group-title input:checked').parents().filter('.contractors-filter-group').addClass('checked');

        $('.contractors-filter-reset input').click(function() {
            window.setTimeout(function() {
                $('.contractors-filter-group input').change();
            }, 100);
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

    });

    $(window).resize(function() {
        $('.form-select select').chosen('destroy');
        $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    });

    $(window).bind('load resize', function() {
        $('.dashboard-events').each(function() {
            var curBlock = $(this);
            var curWidth = $(window).width();
            if (curWidth < 1200) {
                var curPages = curBlock.find('.dashboard-events-item').length;
                $('.dashboard-events-item a').each(function() {
                    if ($(this).data('stylemobile')) {
                        $(this).attr('style', $(this).data('stylemobile'));
                    }
                });
                $('.dashboard-events-item .dashboard-events-item-text-bg').each(function() {
                    if ($(this).data('stylemobile')) {
                        $(this).attr('style', $(this).data('stylemobile'));
                    }
                });
            } else {
                $('.dashboard-events-item a').each(function() {
                    if ($(this).data('style')) {
                        $(this).attr('style', $(this).data('style'));
                    }
                });
                $('.dashboard-events-item .dashboard-events-item-text-bg').each(function() {
                    if ($(this).data('style')) {
                        $(this).attr('style', $(this).data('style'));
                    }
                });
            }
            var curHTML = '';
            for (var i = 0; i < curPages; i++) {
                curHTML += '<a href="#"></a>';
            }
            curBlock.find('.dashboard-events-ctrl').html(curHTML);
            curBlock.find('.dashboard-events-ctrl a:first').addClass('active');
            curBlock.find('.dashboard-events-item:first').css({'margin-left': 0});
        });

        $('.dashboard-news').each(function() {
            var curBlock = $(this);
            var curWidth = $(window).width();
            if (curWidth < 1200) {
                var curPages = curBlock.find('.dashboard-news-item').length;
            }
            var curHTML = '';
            for (var i = 0; i < curPages; i++) {
                curHTML += '<a href="#"></a>';
            }
            curBlock.find('.dashboard-news-ctrl').html(curHTML);
            curBlock.find('.dashboard-news-ctrl a:first').addClass('active');
            curBlock.find('.dashboard-news-item:first').css({'margin-left': 0});
        });

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

})(jQuery);