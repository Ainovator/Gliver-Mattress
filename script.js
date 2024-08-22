// #region Глобальные переменные
let Input_Mattress_Width = parseInt(document.getElementById('input-mattress-width').value) || 0;
let Input_Mattress_Length = parseInt(document.getElementById('input-mattress-length').value) || 0;
let Input_Mattress_Bold = parseInt(document.getElementById('input-mattress-bold').value) || 0;
let Input_Mattress_Amount = parseInt(document.getElementById('input-mattress-amount').value) || 0;
let Input_Textile_Cost = parseInt(document.getElementById('input-textile-cost').value) || 0;
let Material_First_Layer = parseInt(document.getElementById('material-first-layer').value) || 0;
let Bold_First_Layer = parseInt(document.getElementById('bold-first-layer').value) || 0;
let Material_Second_Layer = parseInt(document.getElementById('material-second-layer').value) || 0;
let Bold_Second_Layer = parseInt(document.getElementById('bold-second-layer').value) || 0;
let Material_Third_Layer = parseInt(document.getElementById('material-third-layer').value) || 0;
let Bold_Third_Layer = parseInt(document.getElementById('bold-third-layer').value) || 0;
let Input_Full_Work = parseInt(document.getElementById('input-full-work').value) || 0;
let MarkUp = 30;
let inputStud = document.getElementById('input-stud').value || 0;
let costStud = 0;
let alertShown = false; 
let Input_Textile_Width = 1390;
let Input_Cant_Value = 0;
let cantCost = 0; 
let zipperCost = 0;
let Input_Bort_Value = 0; 
let Cost_First_Layer = 0;
let Cost_Second_Layer = 0;
let Cost_Third_Layer = 0;
let ScaleUp = 20;
let Otbortovka = 0;
const Cost_Foam = {
    LL5020: 722,
    HR3535: 722, 
    ST2236: 572,
    ST3040: 572,
    EL4065: 648,
    HR3030: 682,
    HR3020: 682,
    VE3508: 644,
    NP2300: 410,
};
// #endregion


calculate()



// #region Динмаечские отслеживания

//Динамическое отслеживание ширины ткани
document.getElementById('input-mattress-width').addEventListener('blur', () => {
    const widthValue = document.getElementById('input-mattress-width').value;
    const lengthValue = document.getElementById('input-mattress-length').value;

    // Проверяем, что оба поля не пустые
    if (widthValue && lengthValue) {
        Input_Mattress_Width = parseInt(widthValue) || 0;
        Input_Mattress_Length = parseInt(lengthValue) || 0;

        if (Input_Mattress_Width > Input_Mattress_Length) {
            // Меняем значения местами, если ширина больше длины
            [Input_Mattress_Width, Input_Mattress_Length] = [Input_Mattress_Length, Input_Mattress_Width];
            document.getElementById('input-mattress-width').value = Input_Mattress_Width;
            document.getElementById('input-mattress-length').value = Input_Mattress_Length;
        }
        preventNegativeSign(event)
        calculate();
}});
//Динамическое отслеживание цены ткани
document.getElementById('input-textile-cost').addEventListener('input', () => {
    Input_Textile_Cost = parseInt(document.getElementById('input-textile-cost').value) || 0;
    calculate();
});
//Динамическое отслеживание количества пуговиц
document.getElementById('input-stud').addEventListener('input', () => {
    inputStud = parseInt(document.getElementById('input-stud').value) || 0;
    calculate();
});

//Динамическое отслеживание количества работ
document.getElementById('input-full-work').addEventListener('input', () => {
    Input_Full_Work = parseInt(document.getElementById('input-full-work').value) || 0;
    calculate();
});
//Динамическое отслеживание длины матраса
document.getElementById('input-mattress-length').addEventListener('blur', () => {
    const widthValue = document.getElementById('input-mattress-width').value;
    const lengthValue = document.getElementById('input-mattress-length').value;

    // Проверяем, что оба поля не пустые
    if (widthValue && lengthValue) {
        Input_Mattress_Width = parseInt(widthValue) || 0;
        Input_Mattress_Length = parseInt(lengthValue) || 0;

        if (Input_Mattress_Length < Input_Mattress_Width) {
            // Меняем значения местами, если длина меньше ширины
            [Input_Mattress_Width, Input_Mattress_Length] = [Input_Mattress_Length, Input_Mattress_Width];
            document.getElementById('input-mattress-width').value = Input_Mattress_Width;
            document.getElementById('input-mattress-length').value = Input_Mattress_Length;
        }

        calculate();
    }
});
//Динамическое отслеживание количества матрасов
document.getElementById('input-mattress-amount').addEventListener('input', () => {
    Input_Mattress_Amount = parseInt(document.getElementById('input-mattress-amount').value) || 0;
    calculate();
});
//Динамическое отслеживание наличия канта
document.getElementById('input-cant').addEventListener('change', function() {
    const bortSwitch = document.getElementById('input-bort');
    const zipperSelect = document.getElementById('zipper-select');
    const zipperOptionSide = zipperSelect.querySelector('option[value="side"]');

    if (this.checked) {
        // Если "Кант" включен, включаем и "Борт"
        Input_Cant_Value = 1; 
        Input_Bort_Value = 1; 
        ScaleUp = 50;
        bortSwitch.checked = true; // Включаем переключатель "Борт"
        zipperOptionSide.disabled = false; // Разблокируем опцию "Молния на борту"
    } else {
        // Если "Кант" выключен
        Input_Cant_Value = 0;
        Input_Bort_Value = 0;
        ScaleUp = 20;

        if (zipperSelect.value === "side") {
            zipperSelect.value = "0"; // Сбрасываем выбор, если была выбрана "Молния на борту"
        }
    }

    calculate();
    updateMattressImage();
});
// Динамическое отслеживание наличия борта
document.getElementById('input-bort').addEventListener('change', function() {
    const cantSwitch = document.getElementById('input-cant');
    const zipperSelect = document.getElementById('zipper-select');
    const zipperOptionSide = zipperSelect.querySelector('option[value="side"]');

    if (this.checked) {
        // Если "Борт" включен
        Input_Bort_Value = 1;
        zipperOptionSide.disabled = false; // Разблокируем опцию "Молния на борту"
        if (cantSwitch.checked) {
            ScaleUp = 50;
        } else {
            ScaleUp = 20;
        }
    } else {
        // Если "Борт" выключен
        Input_Bort_Value = 0;
        Input_Cant_Value = 0;
        ScaleUp = 20;
        cantSwitch.checked = false; // Отключаем "Кант"
        zipperOptionSide.disabled = true; // Блокируем опцию "Молния на борту"
        if (zipperSelect.value === "side") {
            zipperSelect.value = "0"; // Сбрасываем выбор, если была выбрана "Молния на борту"
        }
    }
    calculate();
    updateMattressImage();
});
//Динамическое отслеживание толщины и материала первого слоя

document.getElementById('material-first-layer').addEventListener('input', () => {
    Material_First_Layer = parseInt(document.querySelector('#material-first-layer option:checked').textContent.trim().slice(2, 4)) || 0;
    Cost_First_Layer = Cost_Foam[document.querySelector('#material-first-layer option:checked').textContent.trim()] || 0;
    document.getElementById("comfort-select").value = 0;
    calculate();
});

document.getElementById('bold-first-layer').addEventListener('input', () => {
    Bold_First_Layer = parseInt(document.getElementById('bold-first-layer').value) || 0;
    document.getElementById("comfort-select").value = 0;
    calculate();
    updateMattressBold()
    if (Input_Mattress_Bold > 400){
        document.getElementById("bold-first-layer").value = "0";
        Bold_First_Layer = parseInt(document.getElementById('bold-first-layer').value) || 0;
        updateMattressBold()
        toastr.error('Толщина не больше 400!', 'Ошибка', {
            "toastClass": "toast-critical", // Подключаем кастомный класс
        });
    }
});
//Динамическое отслеживание толщины и материала второго слоя
document.getElementById('material-second-layer').addEventListener('input', () => {
    Material_Second_Layer = parseInt(document.querySelector('#material-second-layer option:checked').textContent.trim().slice(2, 4)) || 0;
    Cost_Second_Layer = Cost_Foam[document.querySelector('#material-second-layer option:checked').textContent.trim()] || 0;
    document.getElementById("comfort-select").value = 0;
    calculate();
});

document.getElementById('bold-second-layer').addEventListener('input', () => {
    Bold_Second_Layer = parseInt(document.getElementById('bold-second-layer').value) || 0;
    document.getElementById("comfort-select").value = 0;
    calculate();
    updateMattressBold()
    if (Input_Mattress_Bold > 400){
        document.getElementById("bold-second-layer").value = "0";
        Bold_Second_Layer = parseInt(document.getElementById('bold-second-layer').value) || 0;
        updateMattressBold()
        toastr.error('Толщина не больше 400!', 'Ошибка', {
            "toastClass": "toast-critical", // Подключаем кастомный класс
        });
    }
});
//Динамическое отслеживание толщины и материала третьего слоя
document.getElementById('material-third-layer').addEventListener('input', () => {
    Material_Third_Layer = parseInt(document.querySelector('#material-third-layer option:checked').textContent.trim().slice(2, 4)) || 0;
    Cost_Third_Layer = Cost_Foam[document.querySelector('#material-third-layer option:checked').textContent.trim()] || 0;
    document.getElementById("comfort-select").value = 0;
    calculate();
   
});

document.getElementById('bold-third-layer').addEventListener('input', () => {
    Bold_Third_Layer = parseInt(document.getElementById('bold-third-layer').value) || 0;
    document.getElementById("comfort-select").value = 0;
    calculate();
    updateMattressBold()
    if (Input_Mattress_Bold > 400){
        document.getElementById("bold-third-layer").value = "0";
        Bold_Third_Layer = parseInt(document.getElementById('bold-third-layer').value) || 0;
        updateMattressBold()
        toastr.error('Толщина не больше 400!', 'Ошибка', {
            "toastClass": "toast-critical", // Подключаем кастомный класс
        });

    }
});
//Динамическое отслеживание наценки
// document.getElementById('markup-range').addEventListener('input', function() {
//     document.getElementById('markup-output').value = this.value;
//     MarkUp = parseInt(document.getElementById('markup-output').value) || 0;
//     calculate()
// });
//Динамические отслеживания изменения кант-борт-молния
document.getElementById('input-cant').addEventListener('change', updateMattressImage);
document.getElementById('input-bort').addEventListener('change', updateMattressImage);
document.getElementById('zipper-select').addEventListener('change', updateMattressImage);

// #endregion Динамические отслеживания


// #region <Функциональный блок>

// Функция обновления изображения от параметров
function updateMattressImage() {
    const cantSwitch = document.getElementById('input-cant').checked;
    const bortSwitch = document.getElementById('input-bort').checked;
    const zipperSelect = document.getElementById('zipper-select').value;
    const mattressImage = document.getElementById('cant-image');


    if (zipperSelect === "0") { // Проверяем, если выбрано "Выбрать"
        mattressImage.src = 'images/Main.jpg'; // Изображение по умолчанию
    } else if (bortSwitch && cantSwitch && zipperSelect === "side") {
        mattressImage.src = 'images/bort+cant-side.jpg';
    } else if (bortSwitch && cantSwitch && zipperSelect === "bottom") {
        mattressImage.src = 'images/bort+cant-bottom.jpg';
    } else if (bortSwitch && !cantSwitch && zipperSelect === "bottom") {
        mattressImage.src = 'images/only-bort-bottom.jpg';
    } else if (bortSwitch && !cantSwitch && zipperSelect === "side") {
        mattressImage.src = 'images/only-bort-side.jpg';
    } else if (!bortSwitch && !cantSwitch && zipperSelect === "side") {
        mattressImage.src = 'images/no-bort-side.jpg';
    } else if (!bortSwitch && !cantSwitch && zipperSelect === "bottom") {
        mattressImage.src = 'images/no-bort-bottom.jpg';
    } else {
        mattressImage.src = 'images/Main.jpg'; // Изображение по умолчанию
    }
    
}

document.getElementById('purpose').addEventListener('change', function() {
    const selectedText = this.options[this.selectedIndex].text; // Получаем текст выбранного option
    const inputField = document.getElementById('input-field');

    // Вставляем выбранный текст в текстовое поле
    inputField.value = selectedText;
});
// Функция расчета всех значений и вывод на фронт
function calculate() {

    let details = countDetails();
    let BF_Out = bestFit(Input_Textile_Width, details);

    // Рассчитываем стоимость отбортовки
    if (Input_Mattress_Bold >= 200) {
        Otbortovka = ((Input_Mattress_Length / 1000) * (Input_Mattress_Bold / 1000) * 0.05 * 25 * 2 * 478) +
                     ((Input_Mattress_Width / 1000) * (Input_Mattress_Bold / 1000) * 0.05 * 25 * 2 * 478);
            if (Input_Mattress_Bold >= 200) {
            Otbortovka = ((Input_Mattress_Length / 1000) * (Input_Mattress_Bold / 1000) * 0.05 * 25 * 2 * 476) +
                            ((Input_Mattress_Width / 1000) * (Input_Mattress_Bold / 1000) * 0.05 * 25 * 2 * 476);
        
            if (!alertShown) {
                toastr.warning('Добавлена отбортовка');
                alertShown = true;
            }
        } else {
            Otbortovka = 0;
            alertShown = false;
        }
    
    }
    
    let Full_Cost_First_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_First_Layer/1000)*(Material_First_Layer)*Cost_First_Layer;
    let Full_Cost_Second_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_Second_Layer/1000)*(Material_Second_Layer)*Cost_Second_Layer;
    let Full_Cost_Third_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_Third_Layer/1000)*(Material_Third_Layer)*Cost_Third_Layer;
    let Full_Cost_Foam = Math.round((Full_Cost_First_Layer + Full_Cost_Second_Layer + Full_Cost_Third_Layer)*Input_Mattress_Amount*1000)/1000;
    zipperCost = (Input_Mattress_Length/1000 + Input_Mattress_Width/1000)*10;
    costStud = inputStud * 5;
    let Full_Work_Cost = Math.round(((Input_Full_Work*9*Input_Mattress_Amount)/1000)*1000);
    if (Input_Cant_Value === 1){
        cantCost = (Input_Mattress_Length/1000*2 + Input_Mattress_Width/1000*2)*10;

    } 
    //Расчёт стоимости ткани
    let Full_Textile_Cost = Math.round((Input_Textile_Cost * (BF_Out.rollLength/1000)*1000)/1000);
    let Full_Cost_Mattress = Math.round((((costStud + zipperCost + cantCost + Full_Textile_Cost + Full_Cost_Foam+Full_Work_Cost+Otbortovka*Input_Mattress_Amount)*1.2*1.6*((MarkUp/100)+1)*1000)/1000));

    // Выводим результат на фронт
    document.getElementById('textile-length').textContent = `Длина отреза ткани: ${BF_Out.rollLength} мм`;
    document.getElementById('full-textile-cost').textContent = `Цена отреза ткани: ${Full_Textile_Cost} ₽`; // Убедитесь, что этот элемент существует на странице
    document.getElementById('cost-foam').textContent = `Цена пены: ${Full_Cost_Foam} ₽`; // Убедитесь, что этот элемент существует на странице
    document.getElementById('cost-work').textContent = `Цена работ: ${Full_Work_Cost} ₽`; // Убедитесь, что этот элемент существует на странице
    document.getElementById('full-cost-mattress').textContent = `Цена изделия: ${Full_Cost_Mattress} ₽`; // Убедитесь, что этот элемент существует на странице
}
//Раскладка деталей матраса исходя из размеров
function countDetails() {
    let details = [];
    
    if (Input_Mattress_Width < Input_Textile_Width && Input_Bort_Value === 1) {
        for (let i = 0; i < Input_Mattress_Amount * 2; i++) {
            details.push([Input_Mattress_Width + ScaleUp*2, Input_Mattress_Length + ScaleUp*2]);
            details.push([Input_Mattress_Width + ScaleUp*2, Input_Mattress_Bold + ScaleUp*2]);
            details.push([Input_Mattress_Bold + ScaleUp*2, Input_Mattress_Length + ScaleUp*2]);
        }
    } else if (Input_Mattress_Width > Input_Textile_Width && Input_Bort_Value === 1)  {
        for (let i = 0; i < Input_Mattress_Amount * 2; i++) {
            details.push([(Input_Mattress_Width / 2) + ScaleUp*2, Input_Mattress_Length + ScaleUp*2]);
            details.push([(Input_Mattress_Width / 2) + ScaleUp*2, Input_Mattress_Length + ScaleUp*2]);
            details.push([(Input_Mattress_Width/2) + ScaleUp*2, Input_Mattress_Bold + ScaleUp*2]);
            details.push([Input_Mattress_Bold + ScaleUp*2, Input_Mattress_Length + ScaleUp*2]);
        }
    } else if (Input_Mattress_Width < Input_Textile_Width && Input_Bort_Value === 0)  {
        for (let i = 0; i < Input_Mattress_Amount; i++) {
            details.push([(Input_Mattress_Width+Input_Mattress_Bold*2) + ScaleUp*2, (Input_Mattress_Length + Input_Mattress_Bold*2) + ScaleUp*2]);
            details.push([Input_Mattress_Width + ScaleUp*2, Input_Mattress_Length + ScaleUp*2]);

        }
    } else if (Input_Mattress_Width > Input_Textile_Width && Input_Bort_Value == 0)  {
        for (let i = 0; i < Input_Mattress_Amount; i++) {
            details.push([(Input_Mattress_Width/2+Input_Mattress_Bold) + ScaleUp*2, (Input_Mattress_Length + Input_Mattress_Bold*2) + ScaleUp*2]);
            details.push([(Input_Mattress_Width/2+Input_Mattress_Bold) + ScaleUp*2, (Input_Mattress_Length + Input_Mattress_Bold*2) + ScaleUp*2]);
            details.push([Input_Mattress_Width/2 + ScaleUp*2, Input_Mattress_Length + ScaleUp*2]);
            details.push([Input_Mattress_Width/2 + ScaleUp*2, Input_Mattress_Length + ScaleUp*2]);

        }
    }
    
    return details;
}
//Раскладка деталей на рулоне
function bestFit(width, parts) {
    let minRollLength = Infinity;
    let bestArrangement = [];

    class Node {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.used = false;
            this.right = null;
            this.down = null;
        }

        insert(partWidth, partHeight) {
            if (this.used) {
                return this.right.insert(partWidth, partHeight) || this.down.insert(partWidth, partHeight);
            } else if (partWidth <= this.width && partHeight <= this.height) {
                this.used = true;
                this.right = new Node(this.x + partWidth, this.y, this.width - partWidth, partHeight);
                this.down = new Node(this.x, this.y + partHeight, this.width, this.height - partHeight);
                return this;
            } else {
                return null;
            }
        }
    }

    function fit(parts, width) {
        const root = new Node(0, 0, width, Infinity);
        let maxY = 0;

        parts.sort((a, b) => b[1] - a[1]); // Сортируем по высоте

        for (let part of parts) {
            const node = root.insert(part[0], part[1]);
            if (node) {
                part.x = node.x;
                part.y = node.y;
                maxY = Math.max(maxY, node.y + part[1]);
            } else {
                return Infinity;
            }
        }
        return maxY;
    }

    const rollLength = fit(parts, width);

    if (rollLength < minRollLength) {
        minRollLength = rollLength;
        bestArrangement = parts.map(part => ({
            x: part.x,
            y: part.y,
            width: part[0],
            height: part[1]
        }));
    }

    return {
        details: bestArrangement,
        rollLength: minRollLength
    };
}
//Обновление толщины матраса
function updateMattressBold() {
    // Считаем сумму толщин слоёв пены
    let totalBold = Bold_First_Layer + Bold_Second_Layer + Bold_Third_Layer;

    // Устанавливаем значение ползунка и текстового вывода
    Input_Mattress_Bold = totalBold;
    document.getElementById('input-mattress-bold').value = Input_Mattress_Bold;
    document.getElementById('input-mattress-bold-output').textContent = Input_Mattress_Bold;

    calculate(); // Пересчитываем все значения
}
//Визулаизация деталей на странице
function visualize() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Генерируем детали с учетом введенных пользователем данных
    const details = countDetails();
    const inputTextile = Input_Textile_Width;

    // Получаем позиции деталей для визуализации
    const { details: detailPositions } = bestFit(inputTextile, details);

    // Настраиваем размеры холста
    canvas.width = inputTextile;
    canvas.height = detailPositions.reduce((max, pos) => Math.max(max, pos.y + pos.height), 0) + 20; // Добавляем немного места для легенды

    // Очищаем холст перед рисованием
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Настройки сетки
    const gridSize = 10;
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;

    // Рисуем координатную сетку
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Массив для цветов и объект для хранения цветов одинаковых размеров
    const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#FF69B4', '#8A2BE2', '#FF4500', '#DAA520'];
    const sizeToColorMap = {};
    let colorIndex = 0;

    // Рисуем детали
    detailPositions.forEach(({ x, y, width, height }) => {
        const sizeKey = `${width}x${height}`; // Создаем уникальный ключ на основе размера

        if (!sizeToColorMap[sizeKey]) {
            // Если для такого размера еще не было цвета, назначаем новый
            sizeToColorMap[sizeKey] = colors[colorIndex % colors.length];
            colorIndex++;
        }

        const color = sizeToColorMap[sizeKey];
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);

        // Добавляем размеры деталей
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(`${width}x${height}`, x + 5, y + 15);
    });


}
//Копирование текста в буфер обмена
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert(`Скопировано в буфер обмена: ${text}`);
}
// Шаблон обновления слоёв

//Обновление слоёв от комфортности

//<Функциональный блок>
// #endregion <Функциональный блок>


// #region <Декоративные обработки>
// Добавление обработчика событий для каждого <p> внутри #results
document.querySelectorAll('#results p').forEach(p => {
    p.addEventListener('click', function() {
        copyToClipboard(this.textContent);
    });
});
// Активируем кнопку "Визуализировать", если все расчеты выполнены
document.getElementById('visualize-button').disabled = false;
// Отключение ползунка
document.getElementById('input-mattress-bold').disabled = true;
// Вызов для блокировки опции при загрузке страницы, если борт выключен
document.addEventListener('DOMContentLoaded', function() {
    const bortSwitch = document.getElementById('input-bort');
    const zipperSelect = document.getElementById('zipper-select');
    const zipperOptionSide = zipperSelect.querySelector('option[value="side"]');

    if (!bortSwitch.checked) {
        zipperOptionSide.disabled = true; // Блокируем опцию "Молния на борту"
    }
});
// Функция для предотвращения ввода отрицательного знака "-"
function preventNegativeSign(event) {
    if (event.key === "-") {
        event.preventDefault(); // Запрещаем ввод символа "-"
    }
}
// Применение функции ко всем нужным полям ввода
const inputs = [
    'input-mattress-width',
    'input-mattress-length',
    'input-mattress-bold',
    'input-mattress-amount',
    'input-textile-cost',
    'input-full-work'
];
inputs.forEach(id => {
    const inputElement = document.getElementById(id);

    // Запрещаем ввод знака "-"
    inputElement.addEventListener('keydown', preventNegativeSign);

    // Предотвращаем установку отрицательных значений при изменении
    inputElement.addEventListener('input', () => {
        const value = parseInt(inputElement.value) || 0;
        if (value < 0) {
            inputElement.value = 0; // Сбрасываем значение на 0, если введено отрицательное число
        }
    });
});
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,  // 'True' заменено на 'true'
    "progressBar": true,
    "positionClass": "toast-top-center",  // Позиция сверху по центру
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
// #endregion <Декоративные обработки>



