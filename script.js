"use strict";
$(document).ready(function () {

    $(".sortable_table").sortable({
        items: "tr",
        handle: '.fa-arrows',
    });


    $('.sortable_table').on('click', '.rotateRight', function () {

        let imgPrew = $(this).parent().find('img');
        let imgPrewWidth = imgPrew.width();
        let imgPrewHeight = imgPrew.height();
        let imgPrewContainer = imgPrew.parent();

        // Читаем текущее значение, По умолчанию 0
        // Read default value. By default is 0
        let currentAngle = this.getAttribute('angle');

        // Вычисляем градус поворота, каждый раз плюс 90 градусов
        // Calculate angle for rotate. Each time plus 90
        let angle = (+currentAngle + 90) % 360;

        // Изменяем классы в картинке. В CSS прописаны стили для каждого, крутят
        // Change class in image
        imgPrew.attr("class", "rotate" + angle);

        // Изменем аттибут у кнопки
        // Change attribute in button
        $(this).attr("angle", angle);

        // Изменяем высоту контейнера при вращении, вертикальное положение
        // Change height of container
        if (angle == 90 || angle == 270) {
            imgPrewContainer.animate({'height': imgPrewWidth + 'px'}, 100);
        }

        // горизонтальное положение
        // Horizontal
        if (angle == 0 || angle == 180) {
            imgPrewContainer.animate({'height': imgPrewHeight + 'px'}, 100);
        }

        // Записываем в скрытое поле
        // Hidden field
        let hiddenInput = $(this).next();
        let filename = this.getAttribute('filename');

        // Создаем объект для записи в скрытое поле
        // Create object
        let rotateObject = {
            angle: this.getAttribute('angle'),
            fileid: this.getAttribute('fileid'),
            filename: this.getAttribute('filename'),
        };

        // Если угол 0 то поле очищаем
        // If angle is 0 them clear
        if (angle == '0') {
            hiddenInput.val('');
        } else {
            // Переписываем в скрытое поле JSON
            // Convert object to JSON
            hiddenInput.val(JSON.stringify(rotateObject));
        }

    });

});