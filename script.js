

"use strict";
$(document).ready(function () {

    $( ".sortable_table" ).sortable({
        items: "tr",
        handle: '.fa-arrows',

        //update: function( event, ui ) {
        //    $( 'input[name="weight[]"]' ).remove();
        //    $( "table#sortable_table td p.name a" ).each(function( index ) {
        //
        //        $( ".sortable_table" ).after('<input type="hidden" name="weight[]" value="'+$( this ).attr('title')+'">');
        //        //console.log($( this ).attr('title') );
        //    });
        //
        //}

        //onDrop: function( $item, container, _super, event ) {
        //    console.log('Hi!');
        //    _super.apply( this, arguments );
        //
        //    var newIndex = $('.sorted_table > tbody tr').index( $item ),
        //        path = $item.find('.delete').data('url').split('=')[1],
        //        $hiddens = $iframe.siblings('[name="gallery[]"]'),
        //        $current = $hiddens.filter('[value="' + path + '"]'),
        //        currentIndex = $hiddens.index( $current );
        //
        //    if ( newIndex > currentIndex ) {
        //        $current.insertAfter( $hiddens.eq( newIndex ) );
        //    } else {
        //        $current.insertBefore( $hiddens.eq( newIndex ) );
        //    }
        //}

    });



    $('.sortable_table').on('click', '.rotateRight', function () {
        //$('.rotateRight').on('click', function () {
        let imgPrew = $(this).parent().find('img');
        let imgPrewWidth = imgPrew.width();
        let imgPrewHeight = imgPrew.height();
        let imgPrewContainer = imgPrew.parent();

        // Читаем текущее значение, По умолчанию 0
        let currentAngle = this.getAttribute('angle');

        // Вычисляем градус поворота, каждый раз плюс 90 градусов
        let angle = (+currentAngle + 90) % 360;

        // Изменяем классы в картинке. В CSS прописаны стили для каждого, крутят
        imgPrew.attr("class", "rotate" + angle);

        // Изменем аттибут у кнопки
        $(this).attr("angle", angle);

        // Изменяем высоту контейнера при вращении, вертикальное положение
        if (angle == 90 || angle == 270) {
            imgPrewContainer.animate({'height': imgPrewWidth + 'px'}, 100);
        }

        // горизонтальное положение
        if (angle == 0 || angle == 180) {
            imgPrewContainer.animate({'height': imgPrewHeight + 'px'}, 100);
        }

        // Записываем в скрытое поле
        let hiddenInput = $(this).next();
        let filename = this.getAttribute('filename');

        // Создаем объект для записи в скрытое поле
        let rotateObject = {
            angle: this.getAttribute('angle'),
            fileid: this.getAttribute('fileid'),
            filename: this.getAttribute('filename'),
        };

        // Если угол 0 то поле очищаем
        if (angle == '0') {
            hiddenInput.val('');
        } else {
            // Переписываем в скрытое поле JSON
            hiddenInput.val(JSON.stringify(rotateObject));
        }

    });

});