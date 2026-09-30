const $ = (id) => document.getElementById(id);

const ui = {
    screens: {
        login: $("loginScreen"),
        menu: $("menuScreen"),
        level: $("levelScreen"),
        interrogation: $("interrogationScreen"),
        ending: $("endingScreen")
    },
    bgImage: $("bgImage"),
    bgVideo: $("bgVideo"),
    usernameInput: $("usernameInput"),
    welcomeText: $("welcomeText"),
    statusText: $("statusText"),
    hudUser: $("hudUser"),
    hudLevel: $("hudLevel"),
    hudScore: $("hudScore"),
    levelTag: $("levelTag"),
    levelTitle: $("levelTitle"),
    levelStory: $("levelStory"),
    taskList: $("taskList"),
    actionTitle: $("actionTitle"),
    actionText: $("actionText"),
    choiceButtons: $("choiceButtons"),
    nextBtn: $("nextBtn"),
    aiLog: $("aiLog"),
    inventory: $("inventory"),
    chatInput: $("chatInput"),
    soundBtn: $("soundBtn"),
    questionTag: $("questionTag"),
    questionText: $("questionText"),
    answerButtons: $("answerButtons"),
    endingTitle: $("endingTitle"),
    endingText: $("endingText")
};

const audio = {
    music: $("music"),
    creepy: $("creepy"),
    murder: $("murder"),
    missing: $("missing"),
    interrogation: $("interrogation")
};

const state = {
    username: "Detective",
    level: 0,
    task: 0,
    score: 0,
    inventory: [],
    muted: false,
    question: 0,
    correct: 0
};

const levels = [
    {
        title: "The Midnight Call",
        image: "assets/office.jpg",
        video: "assets/rain.mp4",
        sound: "creepy",
        story: "A murder case arrives during a storm. The AI assistant needs you to open the file and identify the victim.",
        tasks: [
            {
                name: "Unlock the encrypted case file",
                prompt: "The file asks for the correct access word. Choose the word connected to the case.",
                choices: ["RAIN", "SHADOW", "SUNLIGHT"],
                answer: 1,
                item: "Case File",
                points: 20,
                result: "Case file opened. Victim: Armaan Rao."
            },
            {
                name: "Find the victim's last location",
                prompt: "Select the last known location from the victim report.",
                choices: ["East Wing Hall", "Old Market", "Police Office"],
                answer: 0,
                item: "Victim Report",
                points: 20,
                result: "Victim report confirms the last location: East Wing Hall."
            }
        ]
    },
    {
        title: "Hall Footage",
        image: "assets/office.jpg",
        video: "assets/hall.mp4",
        sound: "missing",
        story: "Security footage shows a shadow before the murder. You must analyze the clip and restore the timestamp.",
        tasks: [
            {
                name: "Analyze the hallway video",
                prompt: "Which frame shows the suspicious movement?",
                choices: ["Empty hallway", "Moving shadow", "Security guard"],
                answer: 1,
                item: "Hall Footage",
                points: 25,
                result: "Walking pattern match: 78% with Suspect One."
            },
            {
                name: "Restore the camera timestamp",
                prompt: "Choose the timestamp closest to the murder window.",
                choices: ["10:12 PM", "12:46 AM", "03:30 AM"],
                answer: 1,
                item: "Camera Timestamp",
                points: 20,
                result: "Timestamp restored: 12:46 AM."
            }
        ]
    },
    {
        title: "Crime Scene",
        image: "assets/crime_scene.jpg",
        video: "assets/shadow1.mp4",
        sound: "murder",
        story: "The crime scene contains three important clues. Choose the correct evidence from each search.",
        tasks: [
            {
                name: "Collect the timeline sample",
                prompt: "Pick the sample that matters most for the timeline.",
                choices: ["Dry blood near door", "Clean water spill", "Dust on chair"],
                answer: 0,
                item: "Blood Sample",
                points: 30,
                result: "Blood pattern proves the body was moved after midnight."
            },
            {
                name: "Recover useful phone data",
                prompt: "Which phone data should you restore first?",
                choices: ["Deleted call log", "Wallpaper", "Battery level"],
                answer: 0,
                item: "Broken Phone",
                points: 30,
                result: "Deleted call found from Suspect One at 12:48 AM."
            },
            {
                name: "Analyze the hidden note",
                prompt: "What should the AI compare from the note?",
                choices: ["Paper color", "Handwriting", "Ink smell"],
                answer: 1,
                item: "Hidden Note",
                points: 30,
                result: "Handwriting match: 91% with Suspect One."
            }
        ]
    },
    {
        title: "Holding Cell",
        image: "assets/cell.jpg",
        video: "assets/camera.mp4",
        sound: "creepy",
        story: "Two suspects are waiting. Compare their records and decide which one has the stronger link.",
        tasks: [
            {
                name: "Check Suspect One's contradiction",
                prompt: "Which contradiction appears in Suspect One's record?",
                choices: ["Denied the call", "Wrong shirt color", "Forgot lunch"],
                answer: 0,
                item: "Suspect One Record",
                points: 25,
                result: "Suspect One lied about the phone call."
            },
            {
                name: "Check Suspect Two's record",
                prompt: "What does Suspect Two's record prove?",
                choices: ["Direct murder proof", "Nearby but weak link", "No identity"],
                answer: 1,
                item: "Suspect Two Record",
                points: 15,
                result: "Suspect Two was nearby, but the evidence is weaker."
            }
        ]
    },
    {
        title: "Final Evidence Board",
        image: "assets/interrogation.jpg",
        video: "assets/shadow2.mp4",
        sound: "interrogation",
        story: "Build the final evidence chain before questioning the suspect.",
        tasks: [
            {
                name: "Build the strongest evidence chain",
                prompt: "Choose the strongest final chain.",
                choices: ["Phone + Blood + Note + Footage", "Rain + Office + Chair", "Suspect Two only"],
                answer: 0,
                item: "AI Case Link",
                points: 40,
                result: "Evidence chain complete. Interrogation unlocked."
            }
        ]
    }
];

const questions = [
    {
        text: "Suspect: I never called the victim. What evidence do you show?",
        choices: ["Broken Phone", "Blood Sample", "Suspect Two Record"],
        answer: 0,
        good: "Correct. The deleted call breaks the first lie.",
        bad: "Wrong evidence. The suspect stays calm."
    },
    {
        text: "Suspect: The victim was alive when I left. What proves the timeline is false?",
        choices: ["Hidden Note", "Blood Sample", "Hall Footage"],
        answer: 1,
        good: "Correct. Blood proves the body was moved after midnight.",
        bad: "The timeline is still weak."
    },
    {
        text: "Final move. What connects motive and identity?",
        choices: ["Hidden Note", "Rain Video", "Random Accusation"],
        answer: 0,
        good: "Correct. The note connects handwriting, motive, and identity.",
        bad: "Not enough proof for confession."
    }
];

function show(screenName) {
    const screen = ui.screens[screenName];
    if (!screen) return;
    Object.values(ui.screens).forEach((screen) => screen.classList.remove("active"));
    screen.classList.add("active");
}

function setMedia(image, video) {
    ui.bgImage.src = image;
    if (video) {
        ui.bgVideo.src = video;
        ui.bgVideo.classList.add("show");
        ui.bgVideo.play().catch(() => {});
    } else {
        ui.bgVideo.pause();
        ui.bgVideo.removeAttribute("src");
        ui.bgVideo.load();
        ui.bgVideo.classList.remove("show");
    }
}

function play(name, volume = 0.45) {
    if (state.muted || !audio[name]) return;
    audio[name].volume = volume;
    audio[name].currentTime = 0;
    audio[name].play().catch(() => {});
}

function say(text, user = false) {
    const div = document.createElement("div");
    div.className = user ? "message user" : "message";
    div.textContent = text;
    ui.aiLog.appendChild(div);
    ui.aiLog.scrollTop = ui.aiLog.scrollHeight;
}

function login() {
    state.username = ui.usernameInput.value.trim() || "Detective";
    localStorage.setItem("shadow_user", state.username);
    ui.welcomeText.textContent = `Welcome, ${state.username}`;
    ui.statusText.textContent = "Profile ready";
    say(`Profile loaded: ${state.username}`);
    show("menu");
}

function newGame() {
    state.level = 0;
    state.task = 0;
    state.score = 0;
    state.inventory = [];
    state.question = 0;
    state.correct = 0;
    ui.aiLog.innerHTML = "";
    updateInventory();
    audio.music.volume = 0.28;
    if (!state.muted) audio.music.play().catch(() => {});
    openLevel();
}

function openLevel() {
    const level = levels[state.level];
    state.task = 0;
    setMedia(level.image, level.video);
    play(level.sound);
    ui.statusText.textContent = `Level ${state.level + 1}: ${level.title}`;
    ui.hudUser.textContent = state.username;
    ui.hudLevel.textContent = `Level ${state.level + 1} / ${levels.length}`;
    ui.hudScore.textContent = `Score: ${state.score}`;
    ui.levelTag.textContent = `Level ${state.level + 1}`;
    ui.levelTitle.textContent = level.title;
    ui.levelStory.textContent = level.story;
    ui.nextBtn.disabled = true;
    renderTasks();
    renderAction();
    say(`Level ${state.level + 1}: ${level.title}`);
    say(level.story);
    show("level");
}

function renderTasks() {
    const level = levels[state.level];
    ui.taskList.innerHTML = "";
    level.tasks.forEach((task, index) => {
        const row = document.createElement("div");
        row.className = "task";
        if (index < state.task) row.classList.add("done");
        if (index === state.task) row.classList.add("current");
        row.innerHTML = `<span class="taskMark">${index < state.task ? "✓" : index + 1}</span><span>${task.name}</span>`;
        ui.taskList.appendChild(row);
    });
}

function renderAction() {
    const task = levels[state.level].tasks[state.task];
    ui.choiceButtons.innerHTML = "";
    if (!task) {
        ui.actionTitle.textContent = "Level Complete";
        ui.actionText.textContent = "All tasks are complete. Press Next Level.";
        return;
    }
    ui.actionTitle.textContent = "Playable Action";
    ui.actionText.textContent = task.prompt;
    task.choices.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.addEventListener("click", () => chooseTask(index, btn));
        ui.choiceButtons.appendChild(btn);
    });
}

function chooseTask(index, button) {
    const level = levels[state.level];
    const task = level.tasks[state.task];
    if (!task) return;
    if (index !== task.answer) {
        button.classList.add("wrong");
        state.score = Math.max(0, state.score - 5);
        ui.hudScore.textContent = `Score: ${state.score}`;
        play("creepy", 0.25);
        say("Wrong choice. Score -5. Use Scan or Hint and try again.");
        return;
    }
    button.classList.add("correct");
    state.score += task.points;
    state.inventory.push(task.item);
    state.task += 1;
    ui.hudScore.textContent = `Score: ${state.score}`;
    play("missing", 0.5);
    updateInventory();
    say(`${task.item} collected.`);
    say(task.result);
    saveProgress();
    renderTasks();
    renderAction();
    if (state.task >= level.tasks.length) {
        ui.nextBtn.disabled = false;
        say("Level complete. Press Next Level or N.");
    }
}

function nextLevel() {
    if (state.task < levels[state.level].tasks.length) {
        say("Complete all actions before the next level.");
        return;
    }
    if (state.level < levels.length - 1) {
        state.level += 1;
        openLevel();
    } else {
        startInterrogation();
    }
}

function scan() {
    const task = levels[state.level].tasks[state.task];
    say(task ? `Scan result: "${task.choices[task.answer]}" is the strongest match.` : "Scan result: level complete.");
}

function hint() {
    const task = levels[state.level].tasks[state.task];
    say(task ? `Hint: ${task.result}` : "Hint: press Next Level.");
}

function startInterrogation() {
    state.question = 0;
    setMedia("assets/interrogation.jpg", "assets/shadow2.mp4");
    play("interrogation");
    ui.statusText.textContent = "Interrogation";
    say("Interrogation unlocked. Choose correct evidence.");
    renderQuestion();
    show("interrogation");
}

function renderQuestion() {
    const q = questions[state.question];
    ui.questionTag.textContent = `Question ${state.question + 1} / ${questions.length}`;
    ui.questionText.textContent = q.text;
    ui.answerButtons.innerHTML = "";
    q.choices.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.addEventListener("click", () => answerQuestion(index, btn));
        ui.answerButtons.appendChild(btn);
    });
}

function answerQuestion(index, button) {
    const q = questions[state.question];
    if (index === q.answer) {
        state.correct += 1;
        state.score += 40;
        button.classList.add("correct");
        say(q.good);
        play("interrogation", 0.35);
    } else {
        state.score -= 15;
        button.classList.add("wrong");
        say(q.bad);
    }
    state.question += 1;
    if (state.question >= questions.length) {
        showEnding();
    } else {
        setTimeout(renderQuestion, 500);
    }
}

function showEnding() {
    const won = state.correct >= 2;
    setMedia("assets/office.jpg", won ? "assets/shadow2.mp4" : "assets/rain.mp4");
    ui.endingTitle.textContent = won ? "Case Closed" : "Case Failed";
    ui.endingText.textContent = won
        ? `${state.username}, you solved the case. Final score: ${state.score}.`
        : `${state.username}, the case needs stronger proof. Final score: ${state.score}.`;
    ui.statusText.textContent = won ? "Case closed" : "Case failed";
    show("ending");
}

function askAI() {
    const text = ui.chatInput.value.trim();
    const msg = text.toLowerCase();
    if (!text) return;
    say(text, true);
    ui.chatInput.value = "";
    if (msg.includes("help") || msg.includes("control")) {
        say("Click the correct action choice to complete tasks. Use F to scan, H for hint, and N for next level after completing tasks.");
    } else if (msg.includes("clue") || msg.includes("evidence")) {
        say(`Inventory: ${state.inventory.length ? state.inventory.join(", ") : "empty"}.`);
    } else if (msg.includes("suspect")) {
        say("Suspect One is the main target. Phone, blood, note, and footage are the strongest evidence.");
    } else if (msg.includes("level")) {
        say(`Current level: ${state.level + 1}/${levels.length}.`);
    } else {
        say("Solve the current playable action to move forward.");
    }
}

function updateInventory() {
    ui.inventory.innerHTML = "";
    state.inventory.forEach((item) => {
        const span = document.createElement("span");
        span.className = "item";
        span.textContent = item;
        ui.inventory.appendChild(span);
    });
}

function toggleSound() {
    state.muted = !state.muted;
    ui.soundBtn.textContent = state.muted ? "Sound Off" : "Sound On";
    if (state.muted) {
        Object.values(audio).forEach((track) => track.pause());
    } else {
        audio.music.play().catch(() => {});
    }
}

function saveProgress() {
    localStorage.setItem("shadow_save", JSON.stringify({
        username: state.username,
        level: state.level,
        task: state.task,
        score: state.score,
        inventory: state.inventory
    }));
}

function resumeGame() {
    const raw = localStorage.getItem("shadow_save");
    if (!raw) {
        say("No saved game found. Start a New Game.");
        return;
    }
    let save;
    try {
        save = JSON.parse(raw);
    } catch {
        say("Saved game data is corrupted. Start a New Game.");
        return;
    }
    state.username = save.username || state.username;
    const savedLevel = Number.isFinite(save.level) ? save.level : 0;
    state.level = Math.min(Math.max(0, savedLevel), levels.length - 1);
    const savedTask = Number.isFinite(save.task) ? save.task : 0;
    state.task = Math.min(Math.max(0, savedTask), levels[state.level].tasks.length);
    state.score = Number.isFinite(save.score) ? save.score : 0;
    state.inventory = Array.isArray(save.inventory) ? save.inventory : [];
    updateInventory();
    audio.music.volume = 0.28;
    if (!state.muted) audio.music.play().catch(() => {});
    openLevel();
}

$("loginBtn").addEventListener("click", login);
$("newGameBtn").addEventListener("click", newGame);
$("resumeBtn").addEventListener("click", resumeGame);
$("soundBtn").addEventListener("click", toggleSound);
$("scanBtn").addEventListener("click", scan);
$("hintBtn").addEventListener("click", hint);
$("nextBtn").addEventListener("click", nextLevel);
$("askBtn").addEventListener("click", askAI);
$("playAgainBtn").addEventListener("click", newGame);

ui.usernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") login();
});

ui.chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") askAI();
});

window.addEventListener("keydown", (event) => {
    if (!ui.screens.level.classList.contains("active")) return;
    if (event.key === "f" || event.key === "F") scan();
    if (event.key === "h" || event.key === "H") hint();
    if (event.key === "n" || event.key === "N") nextLevel();
});

const savedUser = localStorage.getItem("shadow_user");
if (savedUser) ui.usernameInput.value = savedUser;
setMedia("assets/office.jpg", "");
say("Login to begin. This version is clean and playable: choose answers to complete each task.");
