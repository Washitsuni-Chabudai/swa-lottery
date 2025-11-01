// main.js

// --- データ定義 ---
const prizes = [
    "特賞：ゲーミングPC", "A賞：高級ホテル宿泊券", "B賞：ワイヤレスヘッドホン", 
    "C賞：人気スマートウォッチ", "D賞：ブランド牛肉ギフト", "E賞：コーヒーメーカー", 
    "F賞：映画鑑賞券ペア"
];

// 参加者100名のデータ (ID: 001〜100)
const INITIAL_EMPLOYEES_DATA = [
    { id: "001", name: "鈴木一郎" }, { id: "002", name: "田中花子" }, { id: "003", name: "佐藤次郎" }, { id: "004", name: "山本結衣" }, { id: "005", name: "中村健太" },
    { id: "006", name: "小林綾香" }, { id: "007", name: "加藤大輔" }, { id: "008", name: "吉田美咲" }, { id: "009", name: "山田隆司" }, { id: "010", name: "佐々木萌" },
    { id: "011", name: "渡辺拓海" }, { id: "012", name: "高橋沙織" }, { id: "013", name: "伊藤悠馬" }, { id: "014", name: "木村琴音" }, { id: "015", name: "林一馬" },
    { id: "016", name: "斉藤里奈" }, { id: "017", name: "清水亮太" }, { id: "018", name: "森本遥" }, { id: "019", name: "池田哲也" }, { id: "020", name: "橋本優奈" },
    { id: "021", name: "阿部光希" }, { id: "022", name: "上田早紀" }, { id: "023", name: "岡田純平" }, { id: "024", name: "岡本真由" }, { id: "025", name: "片山拓郎" },
    { id: "026", name: "川口恵子" }, { id: "027", name: "菊地翔太" }, { id: "028", name: "工藤美穂" }, { id: "029", name: "熊谷直人" }, { id: "030", name: "小島愛" },
    { id: "031", name: "近藤誠" }, { id: "032", name: "酒井香織" }, { id: "033", name: "坂本健" }, { id: "034", name: "杉山由紀" }, { id: "035", name: "竹内宏" },
    { id: "036", name: "千葉明美" }, { id: "037", name: "中川悟" }, { id: "038", name: "西村麻衣" }, { id: "039", name: "野口勇気" }, { id: "040", name: "服部奈緒" },
    { id: "041", name: "浜田和也" }, { id: "042", name: "原田聡美" }, { id: "043", name: "福田拓也" }, { id: "044", name: "藤田美香" }, { id: "045", name: "星野涼介" },
    { id: "046", name: "堀内菜々" }, { id: "047", name: "松田健太" }, { id: "048", name: "三浦あずさ" }, { id: "049", name: "宮本浩二" }, { id: "050", name: "村田恵" },
    { id: "051", name: "毛利秀治" }, { id: "052", name: "森山由紀子" }, { id: "053", name: "山下翔" }, { id: "054", name: "横山綾" }, { id: "055", name: "吉川優太" },
    { id: "056", name: "渡部美緒" }, { id: "057", name: "石川剛" }, { id: "058", name: "井上沙羅" }, { id: "059", name: "内田真一" }, { id: "060", name: "遠藤彩乃" },
    { id: "061", name: "大野裕也" }, { id: "062", name: "奥村恵" }, { id: "063", name: "柿沼拓郎" }, { id: "064", name: "金子美穂" }, { id: "065", name: "河野淳" },
    { id: "066", name: "神田咲" }, { id: "067", name: "岸本翔" }, { id: "068", name: "久保田真" }, { id: "069", name: "黒田涼子" }, { id: "070", name: "小西徹" },
    { id: "071", name: "駒沢友紀" }, { id: "072", name: "坂口翔平" }, { id: "073", name: "桜井舞" }, { id: "074", name: "椎名宏" }, { id: "075", name: "庄司優香" },
    { id: "076", name: "須藤健" }, { id: "077", name: "高田奈々" }, { id: "078", name: "田口陽子" }, { id: "079", name: "千葉大介" }, { id: "080", name: "塚田美香" },
    { id: "081", name: "徳永和樹" }, { id: "082", name: "富永真理" }, { id: "083", name: "内藤啓介" }, { id: "084", name: "長島里香" }, { id: "085", name: "沼田健司" },
    { id: "086", name: "野村美月" }, { id: "087", name: "萩原翼" }, { id: "088", name: "橋詰由美" }, { id: "089", name: "花田真司" }, { id: "090", name: "早川麻衣" },
    { id: "091", name: "平野将太" }, { id: "092", name: "深谷美咲" }, { id: "093", name: "古川雅人" }, { id: "094", name: "堀江さやか" }, { id: "095", name: "前田拓也" },
    { id: "096", name: "増田有紀" }, { id: "097", name: "松永和也" }, { id: "098", name: "三上裕子" }, { id: "099", name: "宮崎健" }, { id: "100", name: "本橋彩" }
];

// --- 状態変数とDOM要素 ---
let remainingEmployees = [];
let currentPrizeIndex = -1;
let winners = [];
let lastWinner = null;
let isSpinning = false;
let employeeMap = new Map();

const drawButton = document.getElementById('draw-button');
const rerollButton = document.getElementById('reroll-button');
const resetButton = document.getElementById('reset-button');
const winnerInfoDisplay = document.getElementById('winner-info-display');
const currentPrizeName = document.getElementById('current-prize-name');
const prizeLog = document.getElementById('prize-log');

const digit100 = document.getElementById('digit-100');
const digit10 = document.getElementById('digit-10');
const digit1 = document.getElementById('digit-1');

const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');
const bgmSound = document.getElementById('bgm-sound');
const volumeSlider = document.getElementById('volume-slider');

// --- 状態管理関数 (localStorage) ---
function saveState() {
    const state = {
        currentPrizeIndex: currentPrizeIndex,
        remainingEmployees: remainingEmployees,
        winners: winners,
    };
    localStorage.setItem('slotLotteryAppState', JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem('slotLotteryAppState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            if (state.remainingEmployees && Array.isArray(state.remainingEmployees)) {
                currentPrizeIndex = state.currentPrizeIndex;
                remainingEmployees = state.remainingEmployees; 
                winners = state.winners;
                return true;
            }
        } catch (e) {
            console.error("Failed to parse saved state:", e);
            localStorage.removeItem('slotLotteryAppState');
        }
    }
    return false;
}

// --- UI更新関数 ---
function updatePrizeDisplay() { 
    const winnerMap = new Map();
    winners.forEach(w => {
        if (!winnerMap.has(w.prizeName)) {
            winnerMap.set(w.prizeName, []);
        }
        winnerMap.get(w.prizeName).push(w.winner);
    });

    prizeLog.innerHTML = `
        <div style="margin-bottom: 10px; color: ${getComputedStyle(document.documentElement).getPropertyValue('--accent-color')};">
            Remaining Participants: <span style="font-weight: bold;">${remainingEmployees.length}</span>
        </div>
        ${prizes.map((prize, index) => {
            const winnersForPrize = winnerMap.get(prize) || [];
            const winnerInfoHtml = winnersForPrize.length > 0
                ? `<span class="winner-name-log">${winnersForPrize[0].name} (${winnersForPrize[0].id})</span>`
                : `<span class="winner-name-log no-winner">Pending...</span>`;
            
            let statusClass = index === currentPrizeIndex ? 'current' : (index < currentPrizeIndex ? 'finished' : 'pending');
            let statusText = index === currentPrizeIndex ? 'CURRENT' : (index < currentPrizeIndex ? 'DONE' : 'WAITING');

            return `
                <div class="prize-item ${statusClass}">
                    <div class="prize-info">
                        <span><span class="status-indicator"></span>${statusText}: ${prize}</span>
                        <span>Winner: ${winnerInfoHtml}</span>
                    </div>
                </div>
            `;
        }).join('')}
    `;

    if (currentPrizeIndex >= 0 && remainingEmployees.length > 0) { 
        currentPrizeName.textContent = `Current Prize: ${prizes[currentPrizeIndex]}`;
        drawButton.disabled = false;
        drawButton.innerHTML = `<i class="fas fa-dice"></i> START SPIN`;
        rerollButton.disabled = (lastWinner === null); 
    } else if (currentPrizeIndex >= 0 && remainingEmployees.length === 0) {
        currentPrizeName.textContent = "No participants left.";
        drawButton.disabled = true;
        rerollButton.disabled = true;
    } else {
        currentPrizeName.textContent = "All prizes awarded!";
        drawButton.disabled = true;
        drawButton.innerHTML = `<i class="fas fa-check"></i> COMPLETED`;
        rerollButton.disabled = true;
    }
    
    saveState();
}

function moveToNextPrize() {
    currentPrizeIndex--;
    updatePrizeDisplay();
}

// --- スロットアニメーションとロジック (CSSアニメーションに依存) ---

/**
 * スロットの数字を回転させる (CSSアニメーションに依存)
 */
function startSpinning() {
    [digit100, digit10, digit1].forEach(digit => {
        digit.classList.remove('winner-digit');
        // CSSアニメーションの開始と、確定値の隠蔽
        digit.classList.add('spinning');
        digit.textContent = ''; 
    });

    spinSound.currentTime = 0;
    spinSound.loop = true;
    spinSound.volume = volumeSlider.value;
    spinSound.play().catch(e => console.log("Spin audio play failed:", e));

    // 💡 変更: 数字の切り替え setInterval は削除。CSSアニメーションに任せる
    // stopSpinning関数の引数に合わせるため null を返す
    return null; 
}

/**
 * 抽選結果IDに基づいてスロットを順番に停止させる (遅延時間を長く設定)
 * @param {string} targetId - 当選ID ('045'など 3桁)
 * @param {number} spinInterval - (未使用だが引数を維持)
 */
function stopSpinning(targetId, spinInterval) {
    const digits = [
        { elem: digit100, val: targetId[0], delay: 3000 }, // 3.0秒後停止
        { elem: digit10, val: targetId[1], delay: 5000 }, // 5.0秒後停止
        { elem: digit1, val: targetId[2], delay: 7500 }  // 7.5秒後停止 (確定)
    ];

    // clearInterval(spinInterval); は不要

    // 3つのsetTimeoutを設定
    digits.forEach((digitData, index) => {
        setTimeout(() => {
            digitData.elem.classList.remove('spinning'); // CSSアニメーションを停止
            digitData.elem.textContent = digitData.val; // 確定した数字を表示
            digitData.elem.classList.add('winner-digit');
        }, digitData.delay);
    });
}


// --- メイン抽選ロジック ---
function drawLottery() {
    if (isSpinning) return;
    if (currentPrizeIndex < 0 || remainingEmployees.length === 0) {
        winnerInfoDisplay.textContent = "抽選対象がいません。";
        winnerInfoDisplay.classList.add('show');
        drawButton.disabled = true;
        return;
    }

    isSpinning = true;
    const currentEmployees = remainingEmployees;
    const prize = prizes[currentPrizeIndex];
    lastWinner = null; 

    drawButton.disabled = true;
    rerollButton.disabled = true; 
    drawButton.innerHTML = `<i class="fas fa-compact-disc"></i> SPINNING...`;
    winnerInfoDisplay.classList.remove('show'); 

    // 1. 当選者を決定
    const winnerIndex = Math.floor(Math.random() * currentEmployees.length);
    const winner = currentEmployees[winnerIndex];
    const targetId = winner.id; // 3桁の文字列ID

    // 2. スロットを回転させる
    const spinInterval = startSpinning(); // null が返る

    // 3. 順番にスロットを停止させる
    const TOTAL_ANIMATION_TIME = 8000; // 8.0秒でアニメーション完了 

    stopSpinning(targetId, spinInterval);

    // 4. アニメーション完了後の処理
    setTimeout(() => {
        // スロット回転音を停止
        spinSound.pause();
        spinSound.currentTime = 0;
        
        winSound.currentTime = 0;
        winSound.volume = volumeSlider.value;
        winSound.play().catch(e => console.log("Win audio play failed:", e));

        winnerInfoDisplay.innerHTML = `
            Winner ID: ${targetId}<br>
            <span style="font-size:0.6em; color:var(--accent-color);">${winner.name}</span>
        `;
        winnerInfoDisplay.classList.add('show');
        
        // 結果を保存し、リストから除外
        winners.push({ prizeName: prize, winner: winner });
        const indexToRemove = currentEmployees.findIndex(e => e.id === winner.id);
        if (indexToRemove !== -1) {
            remainingEmployees.splice(indexToRemove, 1);
        }
        
        lastWinner = { winner: winner, prizeIndex: currentPrizeIndex }; 
        
        moveToNextPrize();
        isSpinning = false;
    }, TOTAL_ANIMATION_TIME);
}

// --- 再抽選/リセット/音量設定 ---

function rerollLottery() {
    if (!lastWinner || isSpinning) return;
    
    if (confirm(`直前の当選者 ${lastWinner.winner.name} (ID:${lastWinner.winner.id}) をリストに戻し、現在の景品を再抽選しますか？`)) {
        const lastPrizeName = prizes[lastWinner.prizeIndex];
        const winnerIndexInWinners = winners.findIndex(
            w => w.prizeName === lastPrizeName && 
                 w.winner.id === lastWinner.winner.id
        );

        if (winnerIndexInWinners !== -1) {
            winners.splice(winnerIndexInWinners, 1);
        }
        
        remainingEmployees.push(lastWinner.winner);
        currentPrizeIndex = lastWinner.prizeIndex;
        lastWinner = null; 
        
        winnerInfoDisplay.textContent = "Rerolling...";
        winnerInfoDisplay.classList.add('show'); 

        rerollButton.disabled = true;
        drawButton.disabled = false;
        
        updatePrizeDisplay();
        saveState();
        
        setTimeout(() => winnerInfoDisplay.classList.remove('show'), 1500);
    }
}

function setVolume(volume) {
    spinSound.volume = volume;
    winSound.volume = volume;
    bgmSound.volume = volume * 0.5; 
    localStorage.setItem('appVolume', volume);
}

function initializeVolume() {
    const savedVolume = localStorage.getItem('appVolume');
    const initialVolume = savedVolume !== null ? parseFloat(savedVolume) : 0.7;
    volumeSlider.value = initialVolume;
    setVolume(initialVolume);
    bgmSound.play().catch(e => console.log("BGM play failed:", e)); 
}

function initializeSlots() {
    [digit100, digit10, digit1].forEach(digit => {
        digit.textContent = '0';
        digit.classList.remove('spinning', 'winner-digit');
    });
}

// --- イベントリスナーと初期化 ---
drawButton.addEventListener('click', drawLottery);
rerollButton.addEventListener('click', rerollLottery);
resetButton.addEventListener('click', () => {
    winnerInfoDisplay.classList.remove('show');
    if (confirm("全てのデータ（抽選結果、参加者リストの残数）を初期状態にリセットします。")) {
        localStorage.removeItem('slotLotteryAppState');
        winners = [];
        remainingEmployees = [...INITIAL_EMPLOYEES_DATA];
        currentPrizeIndex = prizes.length - 1;
        lastWinner = null; 
        updatePrizeDisplay();
        initializeSlots();
        drawButton.disabled = false;
        isSpinning = false;
    }
});
volumeSlider.addEventListener('input', (e) => {
    setVolume(parseFloat(e.target.value));
});

document.addEventListener('DOMContentLoaded', () => {
    // 参加者データのMapを作成
    INITIAL_EMPLOYEES_DATA.forEach(emp => employeeMap.set(emp.id, emp.name));

    initializeVolume();
    
    if (!loadState()) {
        remainingEmployees = [...INITIAL_EMPLOYEES_DATA];
        currentPrizeIndex = prizes.length - 1; 
    }
    
    updatePrizeDisplay();
    initializeSlots();
    
    if (currentPrizeIndex >= 0 && remainingEmployees.length > 0) {
        drawButton.disabled = false;
    } else {
        drawButton.disabled = true;
    }
});