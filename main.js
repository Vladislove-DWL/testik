
//обращаемся к селектору, чтобы знать его значение
const select = document.querySelector('#source');

//обращаемся к кнопке сгененировать, чтобы вставить новую карточку до нее
const buttonGenerate = document.querySelector('.btnGenerate');

//обращаемся к кнопке сбросить
const buttonReset = document.querySelector('.btnReset')

//обращаемся к texarea, чтобы выводить туда результат
const textarea = document.querySelector('.userResult')

//обращаемся к родительскому элементу, благодаря которому повесим обработчик событий на все инпуты
const parentElement = document.querySelector('body')

//создаем счетчик для того, чтобы добавлять перед каждым новым списком литературы
let counter = 0;

//создаем объект, в котором будем хранить данные для создания готового списка
const dataOfList = {};

//функция создания первой карточки
function createCardOneAuthor() {   
    const cardOneAuthor = 
    `<div class="card">
        <form>
            <h3>Фамилия автора:</h3>
            <input class="lastname" type="text" placeholder="Пушкин">
            
            <h3>Инициалы автора:</h3>
            <input class="firstname" type="text" placeholder="А. С.">
            
            <h3>Название книги:</h3>
            <input class="nameOfBook" type="text" placeholder="Медный всадник">
            
            <h3>Город издательства:</h3>
            <input class="nameOfCity" type="text" placeholder="Москва">
            
            <h3>Название издательства:</h3>
            <input class="nameOfPublisher" type="text" placeholder="Просвещение">
            
            <h3>Год издания:</h3>
            <input class="yearOfPublishing" type="text" placeholder="1995">
           
            <h3>Количество страниц:</h3>
            <input class="numberOfPage" type="text" placeholder=" 255">     
        </form>
    </div>`;
    buttonGenerate.insertAdjacentHTML('beforeBegin', cardOneAuthor);
}

//функция создания второй карточки
function createCardTwoAuthor() {
    const CardTwoAuthor = 
    `<div class="card">
        <form>
            <h3>Фамилия первого автора:</h3>
            <input class="lastname" type="text" placeholder="Пушкин">
                
            <h3>Инициалы первого автора:</h3>
            <input class="firstname" type="text" placeholder="А. С.">

            <h3>Фамилия второго автора:</h3>
            <input class="lastname2" type="text" placeholder="Толстой">
                
            <h3>Инициалы второго автора:</h3>
            <input class="firstname2" type="text" placeholder="Л. Н.">
                
            <h3>Название книги:</h3>
            <input class="nameOfBook" type="text" placeholder="Медный всадник">
                
            <h3>Город издательства:</h3>
            <input class="nameOfCity" type="text" placeholder="Москва">
                
            <h3>Название издательства:</h3>
            <input class="nameOfPublisher" type="text" placeholder="Просвещение">
                
            <h3>Год издания:</h3>
            <input class="yearOfPublishing" type="text" placeholder="1995">
            
            <h3>Количество страниц:</h3>
            <input class="numberOfPage" type="text" placeholder=" 255">     
        </form>
    </div>`;
    buttonGenerate.insertAdjacentHTML('beforeBegin', CardTwoAuthor);
}

//функция удаления карточки
function removeCard() {
    prevcard = document.querySelector('.card');
    if (prevcard) prevcard.remove();
}

//функция создания карточки по значению селектора
select.addEventListener('click', () => {
    removeCard();
    if (select.value === 'oneAuthor') {
        createCardOneAuthor();
    } else if (select.value === 'twoAuthor') {
        createCardTwoAuthor();
    }   
})

//функция провеки содержания инпутов
function checkInputsNotEmpty() {
    const inputs = document.querySelectorAll('input');

    let hasNotEmptyInputs = true;

    for (let i = 0; i < inputs.length; i++) {
    
        if (inputs[i].value.trim() === '') {
            inputs[i].placeholder = 'Не заполнено';
            hasNotEmptyInputs = false;
        }
    }

    return hasNotEmptyInputs;
}

//вешаем обработчик события на все инпуты, которые есть на странице
parentElement.addEventListener('change', (event) => {
    const input = event.target;
    if (input.tagName === 'INPUT') {
        const inputClass = input.classList.value;
        dataOfList[inputClass] = input.value; 
    }
})

//вешаем обработчик на кнопку сгенерировать, чтобы получать список литературы
buttonGenerate.addEventListener('click', () => {

    if (checkInputsNotEmpty()) {
    counter++
    let result;

    if (select.value === 'oneAuthor' ) {
        const { lastname, firstname, nameOfBook, nameOfCity, nameOfPublisher, yearOfPublishing, numberOfPage } = dataOfList;
        let newStroke = `${counter}. ${lastname}, ${firstname} ${nameOfBook} / ${firstname} ${lastname}. – ${nameOfCity} : ${nameOfPublisher}, ${yearOfPublishing}. – ${numberOfPage} c. – Текст : непосредственный.`;
        result = newStroke
    } else if (select.value === 'twoAuthor' ) {
        const { lastname, firstname, lastname2, firstname2,  nameOfBook, nameOfCity, nameOfPublisher, yearOfPublishing, numberOfPage } = dataOfList;
        let newStroke = `${counter}. ${lastname}, ${firstname} ${nameOfBook} / ${firstname} ${lastname}, ${firstname2} ${lastname2}. – ${nameOfCity} : ${nameOfPublisher}, ${yearOfPublishing}. – ${numberOfPage} c. – Текст : непосредственный.`;
        result = newStroke
    }

    if (counter !== 0) {
        result += '\n'
    } else {
        result = textarea.value.trim() + newStroke
    }

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.value += result
    }
    
})

//вешаем обработчик события на кнопку сбросить
buttonReset.addEventListener('click', () => {
    textarea.value = '';
    textarea.style.height = 'auto';
    counter = 0;
})



