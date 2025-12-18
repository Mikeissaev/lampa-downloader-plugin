(function () {
    'use strict';

    function startPlugin() {
        if (window.Lampa) {
            // Проверяем, что Lampa загрузилась
            Lampa.Noty.show('Downloader plugin loaded successfully!');
            console.log('Downloader plugin:', 'Loaded');
            
            // Добавляем настройки (опционально, для проверки интеграции)
            Lampa.Settings.listener.follow('open', function (e) {
                if (e.name == 'main') {
                    console.log('Downloader plugin:', 'Settings opened');
                }
            });
        } else {
            // Если Lampa еще не готова, пробуем позже
            console.log('Downloader plugin:', 'Lampa object not found, retrying...');
            setTimeout(startPlugin, 200);
        }
    }

    if (!window.plugin_downloader_ready) {
        window.plugin_downloader_ready = true;
        startPlugin();
    }
})();
