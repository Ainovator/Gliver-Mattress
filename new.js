document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.selectable-card');
    let selectedBort = null; // Переменная для хранения выбранного типа борта

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const cardId = this.id;

            if (cardId === 'card-no-bort' || cardId === 'card-with-bort') {
                handleBortSelection(cardId);
            } else if (selectedBort === 'card-with-bort') {
                handleOptionSelection(cardId);
            }
        });
    });

    function handleBortSelection(cardId) {
        selectedBort = cardId;

        // Снимаем выделение с карточек борта
        clearSelection(['#card-no-bort', '#card-with-bort']);
        document.getElementById(cardId).classList.add('selected');

        // Блокируем или разблокируем карточки в зависимости от выбора борта
        toggleCardAccessibility(selectedBort === 'card-no-bort');

        // Если выбран цельнокройный борт, автоматически выбираем "На дне" и "Без канта"
        if (selectedBort === 'card-no-bort') {
            autoSelectOptions(['#card-zipper-bottom', '#card-with-cant']);
        }
    }

    function handleOptionSelection(cardId) {
        if (cardId.includes('cant')) {
            clearSelection(['#card-no-cant', '#card-with-cant']);
        } else if (cardId.includes('zipper')) {
            clearSelection(['#card-zipper-side', '#card-zipper-bottom']);
        }
        document.getElementById(cardId).classList.add('selected');
    }

    function clearSelection(selectors) {
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(card => card.classList.remove('selected'));
        });
    }

    function autoSelectOptions(selectors) {
        selectors.forEach(selector => {
            document.querySelector(selector).classList.add('selected');
        });
    }

    function toggleCardAccessibility(disable) {
        const cantCards = document.querySelectorAll('#card-no-cant, #card-with-cant');
        const zipperCards = document.querySelectorAll('#card-zipper-side, #card-zipper-bottom');

        // Блокируем только "На борту" и "С кантом" при цельнокройном борте
        cantCards.forEach(card => {
            if (disable && card.id === 'card-no-cant') {
                card.classList.remove('selected'); // Снять выделение с карточки "С кантом"
                card.classList.add('disabled'); // Заблокировать карточку "С кантом"
            } else {
                card.classList.remove('disabled'); // Разблокировать "Без канта"
            }
        });

        zipperCards.forEach(card => {
            if (disable && card.id === 'card-zipper-side') {
                card.classList.remove('selected'); // Снять выделение с карточки "На борту"
                card.classList.add('disabled'); // Заблокировать карточку "На борту"
            } else {
                card.classList.remove('disabled'); // Разблокировать "На дне"
            }
        });
    }

    // Динамическое отслеживание комфортности
    const comfortSelectElement = document.getElementById('comfort-select');
    if (comfortSelectElement) {
        comfortSelectElement.addEventListener('input', () => {
            const comfortSelect = comfortSelectElement.value || 0;
            updateLayersSelect(comfortSelect);
        });
    }

    function updateLayers(mt_1, bd_1, mt_2, bd_2, mt_3, bd_3) {
        // Первый слой
        const materialFirstLayer = document.getElementById("material-first-layer");
        const boldFirstLayer = document.getElementById("bold-first-layer");
        if (materialFirstLayer && boldFirstLayer) {
            materialFirstLayer.value = mt_1;
            const Material_First_Layer = parseInt(materialFirstLayer.options[materialFirstLayer.selectedIndex].text.trim().slice(2, 4)) || 0;
            const Cost_First_Layer = Cost_Foam[materialFirstLayer.options[materialFirstLayer.selectedIndex].text.trim()] || 0;
            boldFirstLayer.value = bd_1;
            const Bold_First_Layer = parseInt(boldFirstLayer.value) || 0;
        }

        // Второй слой
        const materialSecondLayer = document.getElementById("material-second-layer");
        const boldSecondLayer = document.getElementById("bold-second-layer");
        if (materialSecondLayer && boldSecondLayer) {
            materialSecondLayer.value = mt_2;
            const Material_Second_Layer = parseInt(materialSecondLayer.options[materialSecondLayer.selectedIndex].text.trim().slice(2, 4)) || 0;
            const Cost_Second_Layer = Cost_Foam[materialSecondLayer.options[materialSecondLayer.selectedIndex].text.trim()] || 0;
            boldSecondLayer.value = bd_2;
            const Bold_Second_Layer = parseInt(boldSecondLayer.value) || 0;
        }

        // Третий слой
        const materialThirdLayer = document.getElementById("material-third-layer");
        const boldThirdLayer = document.getElementById("bold-third-layer");
        if (materialThirdLayer && boldThirdLayer) {
            materialThirdLayer.value = mt_3;
            const Material_Third_Layer = parseInt(materialThirdLayer.options[materialThirdLayer.selectedIndex].text.trim().slice(2, 4)) || 0;
            const Cost_Third_Layer = Cost_Foam[materialThirdLayer.options[materialThirdLayer.selectedIndex].text.trim()] || 0;
            boldThirdLayer.value = bd_3;
            const Bold_Third_Layer = parseInt(boldThirdLayer.value) || 0;
        }
    }

    function updateLayersSelect(comfortSelect) {
        switch (comfortSelect) {
            case "standart-50":
                updateLayers("ST3040", "50", 0, 0 ,0 ,0);
                break;

            case "standart-100":
                updateLayers("ST3040", "100", 0, 0 ,0 ,0);
                break;

            case "standart-150":
                updateLayers("ST3040", "50", "ST2236", "100", 0, 0);
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
        calculate();
    }
});
