(function () {
    'use strict';

    function startPlugin() {
        if (window.Lampa) {
            console.log('Downloader plugin v1.1:', 'Loaded');
            Lampa.Noty.show('Downloader plugin v1.1 loaded!');

            // Сохраняем оригинальную функцию вызова контекстного меню
            var original_show = Lampa.ContextMenu.show;

            // Переопределяем функцию
            Lampa.ContextMenu.show = function (params) {
                var item = params.item || {};
                
                // Проверяем, похоже ли это на видео-файл (есть url, file, или stream)
                // Обычно в торрентах ссылка лежит в item.url, в онлайн - тоже item.url или item.video
                var url = item.url || (item.file ? item.file : null) || item.video;

                if (url && typeof url === 'string') {
                    // Добавляем кнопку "Скачать"
                    params.items.push({
                        title: 'Скачать',
                        icon: 'download', // Иконка из набора Lampa
                        onSelect: function () {
                            console.log('Downloader plugin:', 'Opening URL', url);
                            
                            // Пытаемся открыть ссылку системным методом
                            // Это должно вызвать выбор приложения (браузер, ADM, VLC и т.д.)
                            if (typeof Lampa.Android !== 'undefined' && Lampa.Android.open) {
                                Lampa.Android.open(url);
                            } else {
                                window.open(url, '_blank');
                            }
                        }
                    });
                }

                // Вызываем оригинальную функцию с обновленным списком кнопок
                original_show.apply(this, arguments);
            };

        } else {
            console.log('Downloader plugin:', 'Lampa object not found, retrying...');
            setTimeout(startPlugin, 200);
        }
    }

    if (!window.plugin_downloader_ready) {
        window.plugin_downloader_ready = true;
        startPlugin();
    }
})();
