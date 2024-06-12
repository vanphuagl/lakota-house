/* ------------------------------ stockist page ----------------------------- */

if ($("#stockist")) {
    let filterActive;

    function filterCategory(category) {
        if (filterActive != category) {
            // reset results list
            $('li.stockist_items').removeClass('active');

            // elements to be filtered
            $('li.stockist_items')
                .filter('[data-tag="' + category + '"]')
                .addClass('active');

            // reset active filter
            filterActive = category;
            $('.js-stockist-option').removeClass('active');
        }
    }

    $(window).on("pageshow load", function () {
        const hash = window.location.hash.substring(1);

        if (hash == "") {
            $('.js-stockist-option').addClass('active');
            $('li.stockist_items').addClass('active');
        } else {
            $('li.stockist_items')
                .filter('[data-tag="' + hash + '"]')
                .addClass('active');
        }
    });

    $('.js-stockist-option').click(function () {
        filterCategory($(this).attr('data-filter-tag'));
        $(this).addClass('active');
    });
}

