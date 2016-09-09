# Rotate-for-jQuery-File-Upload
You should modified for your situation

### Sortable included
https://github.com/RubaXa/Sortable
For each field exist hidden field. You can read in POST data 
``` html 
<input type="hidden" name="weight[]" value="">
```

Run sortable for table
``` javascript
    $(".sortable_table").sortable({
        items: "tr",
        handle: '.fa-arrows',
    });
```


## Example of template for Phalcon framework for .volt file


I used `{{ " " }} ` for solve conflict between Twig style and  JS template.

``` html
<!-- The template to display files available for upload -->
<script id="template-upload" type="text/x-tmpl">
    {{ " {% for (var i=0, file; file=o.files[i]; i++) { %} " }}
        <tr class="template-upload fade">
            <td>
                <i class="fa fa-arrows"></i>
                <input type="hidden" name="weight[]" value=" {{ " {%=file.id%} " }}">
            </td>
            <td>
                <span class="preview"></span>
            </td>
            <td>
                <p class="name">{{ " {%=file.name%} " }}</p>
                <strong class="error text-danger"></strong>
            </td>
            <td>
                <p class="size">Processing...</p>
                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
            </td>
            <td>
                {{ " {% if (!i && !o.options.autoUpload) { %} " }}
                    <button class="btn btn-primary start" disabled>
                        <i class="glyphicon glyphicon-upload"></i>
                        <span>Начать</span>
                    </button>
                {{ " {% } %} " }}

                {{ "{% if (!i) { %}" }}
                    <button class="btn btn-warning cancel">
                        <i class="glyphicon glyphicon-ban-circle"></i>
                        <span>Отмена</span>
                    </button>
               {{ " {% } %}" }}
            </td>
        </tr>
    {{ "{% } %}" }}



</script>
<!-- The template to display files available for download -->
<script id="template-download" type="text/x-tmpl">
    {{ " {% for (var i=0, file; file=o.files[i]; i++) { %}" }}
        <tr class="template-download fade">
            <td>
                <i class="fa fa-arrows"></i>
                <input type="hidden" name="weight[]" value="{{ "{%=file.id%}" }}">
            </td>
            <td>
                <span class="preview">
                    {{ "{% if (file.thumbnailUrl) { %}" }}
                        <a href="{{ " {%=file.url%} " }}"
                            title="{{ "{%=file.name%} " }}"
                            download="{{ "{%=file.name%} " }}" data-gallery>
                        </a>

                        <img src="{{ " {%=file.thumbnailUrl%}" }}">

                        <div class="btn btn-default rotateRight" angle="0" fileid="{{ " {%=file.id%} " }}" filename="{{ "{%=file.name%} " }}"><i class="fa fa-repeat fa-2x " aria-hidden="true"></i></div>

                        <input type="hidden-" name="angle" value="" >
                    {{ " {% } %}" }}
                </span>
            </td>
            <td>
                <p class="name">
                    {{ "{% if (file.url) { %}" }}
                        <a href="{{ "{%=file.url%} " }}"
                        title="{{ "{%=file.name%} " }}"
                        download="{{ "{%=file.name%} " }}"
                        {{ "{%=file.thumbnailUrl?'data-gallery':''%} " }}>
                            {{ "{%=file.name%}" }}
                        </a>

                        {{ "{% } else { %}" }}
                            <span>{{ "{%=file.name%} " }}</span>
                        {{ "{% } %}" }}
                </p>
                {{ "{% if (file.error) { %}" }}
                    <div><span class="label label-danger">Error</span> {{ "{%=file.error%}" }}</div>
                {{ "{% } %}" }}
            </td>
            <td>
                <span class="size">{{ "{%=o.formatFileSize(file.size)%}" }}</span>
            </td>
            <td>
                {{ "{% if (file.deleteUrl) { %}" }}
                    <button class="btn btn-danger delete"
                            data-type="{{ "{%=file.deleteType%}" }}"
                            data-url="{{ "{%=file.deleteUrl%}" }}"
                            {{ "{% if (file.deleteWithCredentials) { %} " }}
                            data-xhr-fields='{"withCredentials":true}'
                            {{ "{% } %}" }} >
                            <i class="glyphicon glyphicon-trash"></i>
                            <span>Удалить</span>
                    </button>
                    <input type="checkbox" name="delete" value="1" class="toggle">
                {{ "{% } else { %}" }}
                    <button class="btn btn-warning cancel">
                        <i class="glyphicon glyphicon-ban-circle"></i>
                        <span>Отмена</span>
                    </button>
                {{ "  {% } %}" }}
            </td>
        </tr>
    {{ " {% } %}" }}

</script>
```

## CSS for rotate image.

``` css
img {
    transform-origin: top left; /* IE 10+, Firefox, etc. */
    -webkit-transform-origin: top left; /* Chrome */
    -ms-transform-origin: top left; /* IE 9 */
    transition-duration: 0.8s;

}
img.rotate90 {
    transform: rotate(90deg) translateY(-100%);
    -webkit-transform: rotate(90deg) translateY(-100%);
    -ms-transform: rotate(90deg) translateY(-100%);

}
img.rotate180 {
    transform: rotate(180deg) translate(-100%,-100%);
    -webkit-transform: rotate(180deg) translate(-100%,-100%);
    -ms-transform: rotate(180deg) translateX(-100%,-100%);
}
img.rotate270 {
    transform: rotate(270deg) translateX(-100%);
    -webkit-transform: rotate(270deg) translateX(-100%);
    -ms-transform: rotate(270deg) translateX(-100%);
}
```

## JS


``` javascript
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

```
