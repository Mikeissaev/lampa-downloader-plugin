(function () {
    'use strict';

    function startPlugin() {
        if (window.Lampa) {
            try {
                console.log('Downloader plugin v1.2:', 'Loaded');
                Lampa.Noty.show('Downloader plugin v1.2 loaded!');

                // Сохраняем оригинальную функцию
                var original_show = Lampa.ContextMenu.show;

                // Переопределяем функцию
                Lampa.ContextMenu.show = function (params) {
                    try {
                        var item = params.item || {};
                        // Логируем для отладки (можно увидеть в консоли, если подключиться)
                        // console.log('Downloader ContextMenu item:', item);

                        var url = item.url || (item.file ? item.file : null) || item.video;

                        if (url && typeof url === 'string') {
                            params.items.push({
                                title: 'Скачать',
                                icon: 'download',
                                onSelect: function () {
                                    try {
                                        console.log('Downloader plugin:', 'Opening URL', url);
                                        if (typeof Lampa.Android !== 'undefined' && Lampa.Android.open) {
                                            Lampa.Android.open(url);
                                        } else {
                                            window.open(url, '_blank');
                                        }
                                    } catch (e) {
                                        Lampa.Noty.show('Download error: ' + e.message);
                                    }
                                }
                            });
                        }
                    } catch (e) {
                        console.error('Downloader plugin error in ContextMenu:', e);
                    }
                    
                    // Вызываем оригинал
                    original_show.apply(this, arguments);
                };
            } catch (e) {
                Lampa.Noty.show('Plugin crash: ' + e.message);
                console.error('Plugin crash:', e);
            }

        } else {
            // console.log('Downloader plugin:', 'Lampa object not found, retrying...');
            setTimeout(startPlugin, 200);
        }
    }

    if (!window.plugin_downloader_ready) {
        window.plugin_downloader_ready = true;
        startPlugin();
    }
})();
