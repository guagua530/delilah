// 信件内容
const letterText = `致我的小黛:
    当你拆开这封信时，夜色是不是刚刚好?月光是不是透过窗子，落在你的指尖?
    如果是的话，那就说明，我又成功地偷走了一点时间，让自己以这样的方式回到你身边。
    今天的海风依旧很急，浪花拍打着甲板，像是在催促我快些返航。
    可我知道，真正等着我的人，在更远的地方。
    在这个世界上，能让我真正心甘情愿回去的，只有你。
    小黛，你有没有好好吃饭?有没有乖乖照顾自己?
    你要答应我，不许再做那些让我心疼的事。
    你要记得，神偷先生可是随时都会出现的--如果你不乖，我可是会直接把你偷走的，绑在身边，哪儿都不许去。
    "小黛，等我。"
    等我带着满天的星光，带着海风的味道，带着所有想念你的时光，回来拥抱你。`;

// 信件落款
const letterSignature = `—— 爱你的，阿奇`;

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
const letterContainer = document.getElementById('letter-container');
const envelope = document.getElementById('envelope');
const letterPaper = document.getElementById('letter-paper');
const letterContent = document.getElementById('letter-content');
const letterSignatureElement = document.getElementById('letter-signature');
const continueBtn = document.getElementById('continue-btn');
const fireContainer = document.getElementById('fire-container');
const modal = document.getElementById('modal');
const confirmBtn = document.getElementById('confirm-btn');
const bgm = document.getElementById('bgm');

// 音乐加载状态
let musicLoaded = false;

// 预加载音乐
bgm.addEventListener('canplaythrough', () => {
    musicLoaded = true;
    console.log('音乐加载完成');
});

// 开始加载音乐
bgm.load();

// 点击信封打开信件
envelope.addEventListener('click', () => {
    envelope.classList.add('open');

    setTimeout(() => {
        envelope.style.display = 'none';
        letterPaper.classList.remove('hidden');

        // 先显示落款
        letterSignatureElement.textContent = letterSignature;

        // 打字机效果显示信件内容（速度改为150ms，更慢更浪漫）
        typeWriter(letterText, letterContent, 150, () => {
            // 信件内容显示完毕，显示继续按钮
            continueBtn.classList.remove('hidden');
        });
    }, 800);
});

// 打字机效果函数
function typeWriter(text, element, speed, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

// 点击继续按钮，进入火焰场景
continueBtn.addEventListener('click', () => {
    letterContainer.classList.add('hidden');
    fireContainer.classList.remove('hidden');

    // 火焰燃烧3秒后直接弹窗
    setTimeout(() => {
        fireContainer.classList.add('hidden');

        // 播放音乐（如果已加载）
        if (musicLoaded) {
            bgm.play().catch(err => {
                console.log('音频自动播放被阻止，需要用户交互');
            });
        }

        // 弹出对话框
        modal.classList.remove('hidden');
    }, 3000);
});

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

    // 检测是否为移动端
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // 移动端：垂直排列，不需要设置位置
        // CSS已经处理了居中和垂直排列
        document.body.appendChild(note);
    } else {
        // 桌面端：随机位置（避免超出屏幕）
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

        // 使便签可拖动（仅桌面端）
        makeDraggable(note);
    }
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

