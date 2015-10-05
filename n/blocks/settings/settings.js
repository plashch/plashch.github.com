(function() {

    var settingsContainerToggle = function() {

        $('.settings__container').toggle();

    };

    $(function() {
        $('.settings__pseudolink-hover').click(settingsContainerToggle);
    });

})();
