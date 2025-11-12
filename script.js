const cat = document.getElementById('cat');
const container = document.getElementById('container');
const actionDisplay = document.getElementById('actionDisplay');

const images = [
  'images/cat-container.gif',   // 摸頭
  'images/cat-container.gif',// 左爪
  'images/cat-container.gif',// 右爪
  'images/cat-container.gif',  // 肚子
  'images/cat-container.gif'    // 尾巴
];
const actions = ['摸頭', '摸左爪', '摸右爪', '摸肚子', '摸尾巴'];

// 根據點擊/觸摸比例區分區域（粗略）
function getZone(x, y, catRect) {
    const relX = (x - catRect.left) / catRect.width;
    const relY = (y - catRect.top) / catRect.height;

    if (relY < 0.25) return 0; // 頭部
    if (relX < 0.33 && relY > 0.25 && relY < 0.5) return 1; // 左爪
    if (relX > 0.66 && relY > 0.25 && relY < 0.5) return 2; // 右爪
    if (relY > 0.4 && relY < 0.8) return 3; // 肚子
    if (relY > 0.8) return 4; // 尾巴
    return 3; // 默認算肚子
}

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = "ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function createParticles(x, y) {
    const pChars = ["❤️", "💛", "💙", "💕"];
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.textContent = pChars[Math.floor(Math.random() * pChars.length)];
        particle.style.left = `${x + (Math.random() - 0.5) * 60}px`;
        particle.style.top = `${y + (Math.random() - 0.5) * 60}px`;
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

function handleTouch(e) {
    const touch = e.touches ? e.touches[0] : e;
    const catRect = cat.getBoundingClientRect();
    const x = touch.clientX;
    const y = touch.clientY;
    if (
        x > catRect.left &&
        x < catRect.right &&
        y > catRect.top &&
        y < catRect.bottom
    ) {
        const zone = getZone(x, y, catRect);
        triggerAction(zone, x, y);
    }
}

function triggerAction(zone, x, y) {
    actionDisplay.textContent = actions[zone];
    cat.src = images[zone]; // 用圖片替換
    createRipple(x, y);
    createParticles(x, y);
    // 2秒後換回預設站立圖
    setTimeout(() => {
        cat.src = 'images/cat-container.png';
        actionDisplay.textContent = '';
    }, 2000);
}

container.addEventListener('mousedown', handleTouch);
container.addEventListener('touchstart', handleTouch);
