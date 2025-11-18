// 台词数据
const dialogues = [
    '神偷先生终于又出现在杀手小姐身边了',
    '好久不见 小黛',
    '你怎么看着这么难过 这可不行',
    '重逢的时候 我们都应该是最好的样子',
    '和你说一件很有意思的事',
    '我生病了去看医生 医生竟然说我就是你',
    '说我是你幻想出来的 这听起来是不是很酷?',
    '如果这不会对你造成影响的话',
    '我觉得还挺不错的',
    '因为这样 我就可以永远陪着你',
    '我可以藏在你的影子里 住在你的眼眸中',
    '你接触世间万物时 我与你如影随形',
    '你的喜怒哀乐 我都感同身受',
    '但可惜 我的存在会影响你生命的完整',
    '你想要的所有爱 我都会给你',
    '但唯独放弃生命这件事 我不能答应',
    '可怎么办 和你在一起我总是贪得无厌',
    '传说春临之际 看到金色流星雨的人',
    '将得到永不失去的爱情',
    '如果天空不给我 我就自己下一场',
    '小黛!还记得吗(大喊)有爱就会归来!!'
];

// 页面元素
const fireContainer = document.getElementById('fire-container');
const modal = document.getElementById('modal');
const confirmBtn = document.getElementById('confirm-btn');
const bgm = document.getElementById('bgm');

// 火焰燃烧3秒后直接弹窗
setTimeout(() => {
    fireContainer.classList.add('hidden');

    // 播放音乐
    bgm.play().catch(err => {
        console.log('音频自动播放被阻止，需要用户交互');
    });

    // 弹出对话框
    modal.classList.remove('hidden');
}, 3000);

// 点击确定按钮
confirmBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    
    // 确保音乐播放
    bgm.play();
    
    // 创建大量便签（60-80个）
    const noteCount = Math.floor(Math.random() * 21) + 60;

    for (let i = 0; i < noteCount; i++) {
        setTimeout(() => {
            createStickyNote();
        }, i * 300); // 每300ms创建一个便签，速度放慢
    }
});

// 创建便签函数
function createStickyNote() {
    const note = document.createElement('div');
    note.className = 'sticky-note';
    
    // 随机选择颜色
    const colorClass = `color${Math.floor(Math.random() * 6) + 1}`;
    note.classList.add(colorClass);
    
    // 随机选择台词
    const dialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    note.textContent = dialogue;
    
    // 随机位置（避免超出屏幕）
    const maxX = window.innerWidth - 220;
    const maxY = window.innerHeight - 170;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    note.style.left = x + 'px';
    note.style.top = y + 'px';
    
    // 随机旋转角度
    const rotation = (Math.random() - 0.5) * 20;
    note.style.transform = `rotate(${rotation}deg)`;
    
    document.body.appendChild(note);
    
    // 使便签可拖动
    makeDraggable(note);
}

// 便签拖动功能
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // 将当前便签置于最上层
        const allNotes = document.querySelectorAll('.sticky-note');
        allNotes.forEach(note => {
            note.style.zIndex = '100';
        });
        element.style.zIndex = '1000';
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        element.style.top = (element.offsetTop - pos2) + 'px';
        element.style.left = (element.offsetLeft - pos1) + 'px';
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 点击页面任意位置尝试播放音乐（处理浏览器自动播放限制）
document.addEventListener('click', () => {
    if (bgm.paused) {
        bgm.play().catch(err => console.log('音频播放失败'));
    }
}, { once: true });

