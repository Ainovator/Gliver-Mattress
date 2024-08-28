document.addEventListener('DOMContentLoaded', function () {
    // Переменные для карточек и элементов
    const cardNoBort = document.getElementById('card-no-bort');
    const cardWithBort = document.getElementById('card-with-bort');
    const cardZipperSide = document.getElementById('card-zipper-side');
    const cardZipperBottom = document.getElementById('card-zipper-bottom');
    const cardNoCant = document.getElementById('card-no-cant');
    const cardWithCant = document.getElementById('card-with-cant');
    const cardUnoStitch = document.getElementById('card-uno-stitch');
    const cardDoubleStitch = document.getElementById('card-double-stitch');
    const cardWithPug = document.getElementById('card-with-pug');
    const sidePanel = document.getElementById('side-panel');
    const lengthStepSlider = document.getElementById('length-step-slider');
    const widthStepSlider = document.getElementById('width-step-slider');
    const lengthStepValue = document.getElementById('length-step-value');
    const widthStepValue = document.getElementById('width-step-value');
    const canvas = document.getElementById('mattress-canvas');
    const ctx = canvas.getContext('2d');
    const mattressWidthInput = document.getElementById('input-mattress-width');
    const mattressLengthInput = document.getElementById('input-mattress-length');
    const formCards = document.querySelectorAll('.form-card-container .form-card'); // Выбираем все карточки в блоке "Форма"
    // Функции для работы с карточками

    function disableCard(card, disable = true) {
        if (disable) {
            card.classList.add('disabled');
            card.classList.remove('selected');
        } else {
            card.classList.remove('disabled');
        }
    }

    function selectCard(selectedCard, otherCard) {
        selectedCard.classList.add('selected');
        otherCard.classList.remove('selected');

        if (selectedCard === cardNoBort) { // Если выбран "Цельный крой"
            disableCard(cardZipperSide, true);
            disableCard(cardNoCant, true);

            // Автоматически выбираем "Молния на дне" и "Без канта"
            cardZipperBottom.classList.add('selected');
            cardWithCant.classList.add('selected');
        } else if (selectedCard === cardWithBort) { // Если выбран "Модульный крой"
            disableCard(cardZipperSide, false);
            disableCard(cardNoCant, false);

            // Снимаем выбор с "Молния на дне" и "Без канта"
            cardZipperBottom.classList.remove('selected');
            cardWithCant.classList.remove('selected');
        }
    }

    // Обработка выбора кроя

    cardNoBort.addEventListener('click', function () {
        selectCard(cardNoBort, cardWithBort);
    });

    cardWithBort.addEventListener('click', function () {
        selectCard(cardWithBort, cardNoBort);
    });

    // Обработка выбора "С кантом" или "Без канта"

    cardNoCant.addEventListener('click', function () {
        if (!cardNoCant.classList.contains('disabled')) {
            cardNoCant.classList.add('selected');
            cardWithCant.classList.remove('selected');
        }
    });

    cardWithCant.addEventListener('click', function () {
        if (!cardWithCant.classList.contains('disabled')) {
            cardWithCant.classList.add('selected');
            cardNoCant.classList.remove('selected');
        }
    });

    // Обработка выбора "Молния на борту" или "Молния на дне"

    cardZipperSide.addEventListener('click', function () {
        if (!cardZipperSide.classList.contains('disabled')) {
            cardZipperSide.classList.add('selected');
            cardZipperBottom.classList.remove('selected');
        }
    });

    cardZipperBottom.addEventListener('click', function () {
        if (!cardZipperBottom.classList.contains('disabled')) {
            cardZipperBottom.classList.add('selected');
            cardZipperSide.classList.remove('selected');
        }
    });

    // Обработка выбора "Стёжка одинарная" или "Стёжка двойная"

   // Обработка выбора "Стёжка одинарная" или "Стёжка двойная"
   cardUnoStitch.addEventListener('click', function () {
    if (cardUnoStitch.classList.contains('selected')) {
        cardUnoStitch.classList.remove('selected');
    } else {
        cardUnoStitch.classList.add('selected');
        cardDoubleStitch.classList.remove('selected');
        disableCard(cardWithPug, false); // Разблокируем карточку "Пуговицы", если была выбрана двойная стёжка
    }
    drawMattress(); // Перерисовка матраса при активации или деактивации "Одинарная стёжка"
});

cardDoubleStitch.addEventListener('click', function () {
    if (cardDoubleStitch.classList.contains('selected')) {
        cardDoubleStitch.classList.remove('selected');
        disableCard(cardWithPug, false); // Разблокируем карточку "Пуговицы"
    } else {
        cardDoubleStitch.classList.add('selected');
        cardUnoStitch.classList.remove('selected');
        disableCard(cardWithPug, true); // Деактивируем карточку "Пуговицы", но не скрываем side-panel
    }
    drawMattress(); // Перерисовка матраса при активации "Двойная стёжка"
});
    // Открытие side-panel и рисование матраса

    cardWithPug.addEventListener('click', function () {
        const isSelected = cardWithPug.classList.toggle('selected');

        if (isSelected) {
            sidePanel.style.display = 'flex';
            drawMattress(); // Первое рисование матраса при открытии панели
        } else {
            sidePanel.style.display = 'none';
        }
    });

    // Обновление значений и перерисовка матраса при изменении шагов

    lengthStepSlider.addEventListener('input', function () {
        lengthStepValue.textContent = lengthStepSlider.value;
        drawMattress(); // Перерисовка матраса при изменении шага по длине
    });

    widthStepSlider.addEventListener('input', function () {
        widthStepValue.textContent = widthStepSlider.value;
        drawMattress(); // Перерисовка матраса при изменении шага по ширине
    });

    // Функция рисования пуговиц

    function drawFilledCircle(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Функция рисования пунктирных линий
    function drawDashedLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.setLineDash([5, 5]); // Настраиваем пунктир
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]); // Сбрасываем пунктирный стиль
    }

    // Функция рисования матраса с пуговицами и стёжкой

    function drawMattress() {
        const width = parseInt(mattressWidthInput.value, 10) || 0;
        const length = parseInt(mattressLengthInput.value, 10) || 0;

        // Преобразуем шаги из сантиметров в миллиметры
        const lengthStep = parseInt(lengthStepSlider.value, 10) * 10 || 150;
        const widthStep = parseInt(widthStepSlider.value, 10) * 10 || 150;

        // Очищаем canvas перед рисованием
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Определяем масштаб для отображения на canvas
        const scale = Math.min(canvas.height / width, canvas.width / length);

        // Рисуем прямоугольник матраса с поворотом на 90 градусов
        const scaledWidth = length * scale;
        const scaledLength = width * scale;

        // Устанавливаем стили для обводки
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        // Рисуем обводку прямоугольника, без заливки
        ctx.strokeRect(
            (canvas.width - scaledWidth) / 2,  // X-координата верхнего левого угла
            (canvas.height - scaledLength) / 2, // Y-координата верхнего левого угла
            scaledWidth,  // Ширина прямоугольника (раньше была длина)
            scaledLength  // Длина прямоугольника (раньше была ширина)
        );

        // Рассчитываем количество пуговиц
        const numButtonsLength = Math.floor(width / widthStep);
        const numButtonsWidth = Math.floor(length / lengthStep);

        const buttonSpacingLength = scaledLength / (numButtonsLength + 1);
        const buttonSpacingWidth = scaledWidth / (numButtonsWidth + 1);

        // Рисуем пуговицы в виде закрашенных кружков
        const buttonPositions = [];
        for (let i = 1; i <= numButtonsLength; i++) {
            for (let j = 1; j <= numButtonsWidth; j++) {
                const x = (canvas.width - scaledWidth) / 2 + j * buttonSpacingWidth;
                const y = (canvas.height - scaledLength) / 2 + i * buttonSpacingLength;
                drawFilledCircle(x, y, 5); // Рисуем закрашенный круг с радиусом 5
                buttonPositions.push({ x, y });
            }
        }

        // Если выбрана стёжка, рисуем пунктирные линии
        if (cardUnoStitch.classList.contains('selected') || cardDoubleStitch.classList.contains('selected')) {
            // Рисуем горизонтальные линии
            for (let i = 0; i < numButtonsLength; i++) {
                const startY = buttonPositions[i * numButtonsWidth].y;
                const startX = (canvas.width - scaledWidth) / 2; // Линия начинается от края прямоугольника
                const endX = (canvas.width + scaledWidth) / 2; // Линия заканчивается на противоположном краю
                drawDashedLine(startX, startY, endX, startY);
            }

            // Рисуем вертикальные линии
            for (let j = 0; j < numButtonsWidth; j++) {
                const startX = buttonPositions[j].x;
                const startY = (canvas.height - scaledLength) / 2; // Линия начинается от края прямоугольника
                const endY = (canvas.height + scaledLength) / 2; // Линия заканчивается на противоположном краю
                drawDashedLine(startX, startY, startX, endY);
            }
        }
    }

    // Функция, которая снимает выделение со всех карточек и выделяет только выбранную
    function selectFormCard(selectedCard) {
        formCards.forEach(card => {
            card.classList.remove('selected'); // Снимаем выделение со всех карточек
        });
        selectedCard.classList.add('selected'); // Выделяем только выбранную карточку
    }

    // Добавляем обработчики событий ко всем карточкам
    formCards.forEach(card => {
        card.addEventListener('click', function () {
            selectFormCard(card); // Вызываем функцию при клике на карточку
        });
    });

    // Выбираем по умолчанию карточку "Без выреза"
    const defaultCard = document.getElementById('card-no-cut');
    selectFormCard(defaultCard);
    // Автоматический выбор "Цельный крой" при загрузке страницы
    selectCard(cardNoBort, cardWithBort);

    //Динамическое отслеживание комфортности
    document.getElementById('comfort-select').addEventListener('input', () => {
        ComfortSelect = document.getElementById('comfort-select').value || 0;
        UpdateLayersSelect()
        updateMattressBold()
        
    });
    // Шаблон обновления слоёв
    function updateLayers(mt_1, bd_1, mt_2, bd_2, mt_3, bd_3) {
        // Первый слой
        document.getElementById("material-first-layer").value = mt_1;
        Material_First_Layer = parseInt(document.querySelector('#material-first-layer option:checked').textContent.trim().slice(2, 4)) || 0;
        document.getElementById("bold-first-layer").value = bd_1;
        Bold_First_Layer = parseInt(document.getElementById('bold-first-layer').value) || 0;

        // Второй слой
        document.getElementById("material-second-layer").value = mt_2;
        Material_Second_Layer = parseInt(document.querySelector('#material-second-layer option:checked').textContent.trim().slice(2, 4)) || 0;
        document.getElementById("bold-second-layer").value = bd_2;
        Bold_Second_Layer = parseInt(document.getElementById('bold-second-layer').value) || 0;

        // Третий слой
        document.getElementById("material-third-layer").value = mt_3;
        Material_Third_Layer = parseInt(document.querySelector('#material-third-layer option:checked').textContent.trim().slice(2, 4)) || 0;
        document.getElementById("bold-third-layer").value = bd_3;
        Bold_Third_Layer = parseInt(document.getElementById('bold-third-layer').value) || 0;
    }

    //Обновление толщины матраса
    function updateMattressBold() {
        // Считаем сумму толщин слоёв пены
        let totalBold = Bold_First_Layer + Bold_Second_Layer + Bold_Third_Layer;

        // Устанавливаем значение ползунка и текстового вывода
        Input_Mattress_Bold = totalBold;
        document.getElementById('input-mattress-bold').value = Input_Mattress_Bold;
        document.getElementById('input-mattress-bold-output').textContent = Input_Mattress_Bold;

    }

    //Обновление слоёв от комфортности
    function UpdateLayersSelect() {
        switch (ComfortSelect) {
            case "standart-50":
                updateLayers("ST3040", "50", 0, 0 ,0 ,0);
                break;

            case "standart-100":
                updateLayers("ST3040", "100", 0, 0 ,0 ,0);
                break;

            case "standart-150":
                updateLayers("ST3040", "50", "ST2236", 100 ,0 ,0);
                break;

            case "comfort-50":
                updateLayers(0, 0, 0, 0, 0, 0);
                break;

            case "comfort-100":
                updateLayers("HR3030", "50", "EL4065", "50", 0, 0);
                break;

            case "comfort-150":
                updateLayers("HR3030", "100", "EL4065", "50", 0, 0);
                break;

            case "premial-50":
                updateLayers("HR3535", "50", 0, 0, 0, 0);
                break;

            case "premial-100":
                updateLayers("LL5020", "50", "HR3535", "50", 0, 0);
                break;

            case "premial-150":
                updateLayers("VE3508", "50", "HR3535", "100", 0, 0);
                break;

            default:
                updateLayers(0, 0, 0, 0 ,0 ,0);
                break;
        }
        updateMattressBold();
    }
});
