const COLORS = ['#fffd98', '#f7f43f', '#fffed0', '#fffb00'];
const body = document.querySelector('body');

let bodyWidth = body.offsetWidth;
let bodyHeight = body.offsetHeight;
let timerId;
let timerIdSmall;
let timerIdTwinkle;
let randomYCoordinate = 0;
let randomXCoordinate = 0;
let glowOn = true;

// генерируем рандомную координату по оси х в пределах от 0 до ширины экрана
function getRandomXCoordinate() {
    randomXCoordinate = Math.floor(Math.random() * (bodyWidth + 1));
    return `${randomXCoordinate}px`;
}

// генерируем рандомную координату по оси у в пределах от 0 до высоты экрана
function getRandomYCoordinate() {
    randomYCoordinate = Math.floor(Math.random() * (bodyHeight + 1));
    return `${randomYCoordinate}px`;
}

// выбираем рандомно цвет из заданного массива цветов
function getRandomColor() {
    let randomColor = COLORS[Math.floor(Math.random() * (COLORS.length))];
    return randomColor;
}

// выбираем и возвращаем рандомную звезду
function getRandomStar(arr) {
    
    let randomStarIndex = Math.floor(Math.random() * arr.length);
    return arr[randomStarIndex];
}

// добавляем рандомный цвет и рандомное положение на экране добавляющейся звезде, меняем прозрачность на непрозрачную
function addElementsStyles() {
    
    body.lastElementChild.style.top = getRandomYCoordinate();
    body.lastElementChild.style.left = getRandomXCoordinate();
    body.lastElementChild.style.opacity = '1';
    body.lastElementChild.style.background = getRandomColor();
    body.lastElementChild.style.boxShadow = `0 0 2px ${getRandomColor()}, 0 0 10px ${getRandomColor()}`;
}

// каждые полторы секунды запускаем интервал, генерирующий новую звезду
function createNewStar() {
    timerId = setInterval(() => {
        const stars = document.querySelectorAll('.star');
        // если количество звёзд на экране меньше 133, то создаём новую, присваиваем ей стили через setTimeout
        if (stars.length < 133) {     
            body.insertAdjacentHTML('beforeend', '<div class="star"></div>');
            setTimeout(function () {
                addElementsStyles();
            }, 10);
            // выбираем рандомный дочерний элемент body и, если он имеет стиль 'star', и так же количество дочерних элементов кратно 3, то запускаем функцию "включение мерцания звезды"
            let randomElement = getRandomStar(body.children);
            
            if (randomElement.classList.contains('star') && body.children.length % 3 === 0) {
                turnStarTwinkle(randomElement);
            }
        }
        // если количество звёзд на экране становится равно 133, то удаляем рандомную звезду
        else {
            body.removeChild(getRandomStar(stars));
            
        }
        
    }, 1500);
}

// каждые 2,5 секунды запускаем интервал, генерирующий новую маленькую звезду. 
function createNewSmallStar() {
    timerIdSmall = setInterval(() => {
        const smallStars = document.querySelectorAll('.small-star');
        // если маленьких звёзд на экране меньше 79, то добавляем новую и стили для неё
        if (smallStars.length < 79) {     
            body.insertAdjacentHTML('beforeend', '<div class="small-star"></div>');
            setTimeout(function () {
                addElementsStyles();
            }, 10);
        }  
        // если маленьких звёзд 79, то удаляем 1 рандомную
        else {
            body.removeChild(getRandomStar(smallStars));
        }
    }, 2500);
}

// подключаем стиль с анимацией мерцания
function turnStarTwinkle(element) {
    element.style.animation = 'grow 1s infinite'
}

// запускаем функции создания звёзд
createNewStar();
createNewSmallStar();

// по клику мыши на body прекращаем создание новых звёзд, если переменная glowOn true (звёзды сейчас генерятся), и запускаем создание новых звёзд, если glowOn === false (то есть, мы были на паузе)
body.addEventListener('click', () => {
    if (glowOn === true) {
        clearInterval(timerId);
        clearInterval(timerIdSmall);
        glowOn = false;
    }
    else {
        createNewStar();
        createNewSmallStar();
        glowOn = true;
    }
    
});

