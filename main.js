// Получаем элементы со страницы
const dialog = document.getElementById('contactDialog');
const openButton = document.getElementById('openDialog');
const closeButton = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');

// Переменная для запоминания элемента, который был в фокусе до открытия модалки
let lastFocusedElement;

// Функция открытия модалки
function openModal() {
    lastFocusedElement = document.activeElement; // Запоминаем текущий активный элемент
    dialog.showModal(); // Показываем модальное окно

    // Переносим фокус на первое поле ввода внутри модалки
    const firstInput = dialog.querySelector('input, select, textarea, button');
    if (firstInput) {
        firstInput.focus();
    }
}

// Функция закрытия модалки
function closeModal() {
    dialog.close('cancel'); // Закрываем модальное окно
    // Возвращаем фокус на кнопку, которая открывала модалку
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

// Обработчик события отправки формы
form.addEventListener('submit', (event) => {
    // 1. Предотвращаем стандартное поведение (перезагрузку страницы)
    event.preventDefault();

    // 2. Сбрасываем кастомные сообщения об ошибках
    const allInputs = form.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.setCustomValidity('');
        input.removeAttribute('aria-invalid');
    });

    // 3. Проверяем валидность всей формы
    if (!form.checkValidity()) {

        // Проходим по всем полям и подсвечиваем невалидные
        allInputs.forEach(input => {
            if (!input.checkValidity()) {
                // Устанавливаем атрибут для красной обводки
                input.setAttribute('aria-invalid', 'true');

                // Пример кастомной ошибки для email
                if (input.id === 'email' && input.validity.typeMismatch) {
                    input.setCustomValidity('Введите корректный e-mail, например name@example.com');
                }
                // Можно добавить проверки для других полей...
            }
        });

        // Показываем все сообщения об ошибках пользователю
        form.reportValidity();
        return; // Прерываем выполнение функции
    }

    // 4. Если форма валидна, "отправляем" её
    // Здесь обычно идет AJAX-запрос на сервер, но мы просто закроем модалку
    alert('Форма успешно отправлена! (Это демо, данные никуда не ушли)');
    form.reset(); // Очищаем форму
    dialog.close('success'); // Закрываем модальное окно
});

// Вешаем обработчики на клики по кнопкам
openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

// Закрытие модалки по клику на подложку (backdrop)
dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
        closeModal();
    }
});