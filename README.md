# 🕵️ Shadow Case Files

### AI Detective Horror Game

Shadow Case Files is an interactive detective horror game built with HTML, CSS and JavaScript.

Players investigate a murder case through multiple levels, collect evidence, solve investigation tasks, question a suspect, and use an in-game AI Assistant for clues and guidance.

## 🎮 Features

- 🔐 Detective login system
- 🕵️ 5 investigation levels
- 🔎 Evidence scanning system
- 💡 Hint system
- 🎒 Evidence inventory
- ⭐ Score and penalty system
- 🎥 Background videos and images
- 🔊 Background music and sound effects
- 🤖 In-game AI Assistant
- 💬 Interactive interrogation system
- 💾 Save and resume game progress
- 📱 Responsive user interface
- 🏁 Multiple final outcomes based on investigation performance

## 🧩 Game Levels

1. **The Midnight Call**
2. **Hall Footage**
3. **Crime Scene**
4. **Holding Cell**
5. **Final Evidence Board**

After completing the investigation, the player enters the final interrogation where collected evidence is used to question the suspect.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON
- Git & GitHub
- Phaser dependency

## 🎯 Game Mechanics

Players complete investigation tasks by selecting evidence and answers.

Correct choices:
- Increase the score
- Add evidence to the inventory
- Unlock the next stage

Incorrect choices:
- Reduce the score
- Allow the player to retry the investigation task

The game also includes Scan and Hint functions to help the player investigate each case.

## 🤖 AI Assistant

The game includes an in-game assistant that can respond to commands related to:

- Help and controls
- Evidence and clues
- Suspects
- Current level

The assistant provides contextual guidance during the investigation.

## 💾 Save System

Game progress is stored locally in the browser using `localStorage`.

Players can resume a previously saved investigation from the game menu.

## 📁 Project Structure

```text
shadow_case_game/
│
├── assets/
│   ├── images, videos and audio files
│   └── ...
│
├── game.js
├── index.html
├── style.css
├── package.json
└── package-lock.json
