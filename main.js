const COLORS = ['#fffd98', '#f7f43f', '#fffed0', '#fffb00'];
const starSizeForComputer = ['3px', '4px', '5px', '6px'];
const starSizeForMobile = ['1px', '2px', '3px', '4px'];
const body = document.querySelector('body');

let bodyWidth = body.offsetWidth;
let bodyHeight = body.offsetHeight;
let timerId;
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

// Вывбираем рандомный размер из заданного массива
function getRandomSize(arr) {
    let randomSize = arr[Math.floor(Math.random() * (arr.length))];
    return randomSize;
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

// задаём ширину и высоту звезды
function setStarSize(size) {
    body.lastElementChild.style.width = size;
    body.lastElementChild.style.height = size;
}

// добавляем рандомный цвет и рандомное положение на экране создающейся звезде, меняем прозрачность на непрозрачную
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
        // если количество звёзд на экране меньше 150, то создаём новую. Если ширина экрана больше 1000px, то размер звезды выбирается из массива "юольших звёзд", если меньше - то из массива "маленьких". Присваиваем ей стили через setTimeout
                
        if (stars.length < 150) {     
            body.insertAdjacentHTML('beforeend', '<div class="star"></div>');
            if (bodyWidth > 1000) {
                let starRandomSizeForComputer = getRandomSize(starSizeForComputer);
                setStarSize(starRandomSizeForComputer);
            }
            else {
                let starRandomSizeForMobile = getRandomSize(starSizeForMobile);
                setStarSize(starRandomSizeForMobile);
            }
            setTimeout(function () {
                addElementsStyles();
            }, 10);
            // выбираем рандомный дочерний элемент body и, если он имеет стиль 'star', и так же количество дочерних элементов кратно 3, то запускаем функцию "включение мерцания звезды"
            let randomElement = getRandomStar(body.children);
            
            if (randomElement.classList.contains('star') && body.children.length % 3 === 0) {
                turnStarTwinkle(randomElement);
            }
        }
        // если количество звёзд на экране становится равно 150, то удаляем рандомную звезду
        else {
            body.removeChild(getRandomStar(stars));
            
        }
        
    }, 1500);
}


// подключаем стиль с анимацией мерцания
function turnStarTwinkle(element) {
    element.style.animation = 'grow 1s infinite'
}

// запускаем функции создания звёзд
createNewStar();

// по клику мыши на body прекращаем создание новых звёзд, если переменная glowOn true (звёзды сейчас генерятся), и запускаем создание новых звёзд, если glowOn === false (то есть, мы были на паузе)
body.addEventListener('click', () => {
    if (glowOn === true) {
        clearInterval(timerId);
        glowOn = false;
    }
    else {
        createNewStar();
        glowOn = true;
    }
    
});

