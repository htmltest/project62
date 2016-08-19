(function($) {

    $(document).ready(function() {

        $('form').each(function() {
            initForm($(this));
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
            resizeDocs();
            e.preventDefault();
        });

    });

    $(window).resize(function() {
        $('.form-select select').chosen('destroy');
        $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    });

    $(window).bind('load resize', function() {
        resizeStructure();
        resizeDocs();
    });

    function resizeStructure() {
        $('.structure-level-line').each(function() {
            var curLine = $(this);
            var curLevel = curLine.parent();
            curLine.height(curLevel.offset().top - curLevel.parent().offset().top);
        });
    }

    function resizeDocs() {
        $('.docs-level-line').each(function() {
            var curLine = $(this);
            var curLevel = curLine.parent();
            curLine.height(curLevel.height() - 35);
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