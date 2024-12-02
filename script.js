const wishes = [
  "🌟Игорь!🌟",
  "Быть хорошим начальником дано не каждому,",
  "но нашему коллективу с тобой очень повезло!",
  "Это настоящий талант – быть таким профессионалом своего дела.",
  "Мы всем коллективом поздравляем тебя с днем рождения!✨",
  " Желаем всегда оставаться таким же внимательным,",
  " жизнерадостным,",
  "креативным,",
  "тактичным,",
  "целеустремленным,",
  " умеющим предугадывать все ситуации на два шага вперед.",
  "Мы желаем тебе не только творческих успехов и карьерного роста,",
  "но",
  "и..",
  "семейного благополучия",
  "и..",
  "обычного человеческого счастья.🎉",
  "Чтобы твоя жизнь только вдохновляла тебя к новым подвигам в работе,",
  "а работа стимулировала к благосостоянию и комфорту в твоем доме.",
  " Поздравляем! 🎂"


];
// const sisterChat = [
//   "Sister? 🤔",
//   "You know what Shalini...",
//   "I have something to confess... 💫",
//   "While sisters are precious...",
//   "I've always felt our bond is different... ✨",
//   "The way we understand each other...",
//   "The way we share everything...",
//   "It feels more like best friends! 💫",
//   "Would you like to be my Best Friend instead? 🌟"
// ];
const bestFriendMessages = [
  "С днём рождения дорогой друг! Желаю здоровья, счастья,  успехов и радости - Никита 🌟",
  "Желаю, чтобы каждый день приносил тебе свет внутреннего мира и гармонию с собой - Алена 😋",
  "Дострой Дом своей мечты! - Роман ✨",
  "Будь в духовном равновесии! - Елена 🌟",
  "Лесного здоровья, московской зарплаты - Виталий 🌟",
  "Желаю, больше позитивных моментов, интересных проектов и их успешной реализации! - Илья 🌟",
  "Желаю вдохновляющих и креативных проектов, которые станут новым достижением в вашей карьере! - Tenay 🌟",
  " - Юля ",
  "Best Forever! 🤗"
];

function createStars() {
  const starsContainer = document.createElement("div");
  starsContainer.className = "stars";
  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--duration", `${Math.random() * 3 + 1}s`);
    starsContainer.appendChild(star);
  }
  document.body.appendChild(starsContainer);
}

function createEmoji() {
  const emojis = ["💖", "⭐", "✨", "🎉", "🎂", "🎈"];
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.top = "-50px";
  document.body.appendChild(emoji);
  const animation = emoji.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)"
      },
      {
        transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360
          }deg)`
      }
    ],
    {
      duration: 3000,
      easing: "linear"
    }
  );
  animation.onfinish = () => emoji.remove();
}

function stopAllMusic() {
  const audios = ["bgMusic", "audio", "sisterMusic", "bestFriendMusic"];
  audios.forEach((id) => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

function playAudio(audioId) {
  const audio = document.getElementById(audioId);
  if (audio) {
    audio.volume = 0.5;
    audio.play().catch((err) => console.log("Audio play failed:", err));
  }
}
let emojiInterval;
async function typeWriter(text) {
  const wishesElement = document.getElementById("wishes");
  wishesElement.style.opacity = 1;
  wishesElement.innerHTML = "";
  wishesElement.className = "wishes neon-text";
  for (let char of text) {
    wishesElement.innerHTML += char;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
let isMuted = false;
const muteButton = document.getElementById("muteButton");
muteButton.addEventListener("click", () => {
  const audios = ["bgMusic", "audio", "sisterMusic", "bestFriendMusic"];
  isMuted = !isMuted;
  audios.forEach((id) => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.muted = isMuted;
    }
  });
  // Update button text
  muteButton.textContent = isMuted ? "🔇" : "🔊";
});
async function makeChoice(choice) {
  clearInterval(emojiInterval);
  const wishesElement = document.getElementById("wishes");
  document.getElementById("choices").style.display = "none";
  stopAllMusic();
  if (choice === "sister") {
    document.body.classList.add("sad-theme");
    const sisterAudio = document.getElementById("sisterMusic");
    sisterAudio.muted = isMuted;
    try {
      const playPromise = sisterAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed:", error);
        });
      }
    } catch (err) {
      console.log("Audio play failed:", err);
    }
    for (let message of sisterChat) {
      await typeWriter(message);
    }
    document.getElementById("choices").innerHTML = `
                    <button class="choice-btn" onclick="makeChoice('bestfriend')">Best Friend</button>
                `;
    document.getElementById("choices").style.display = "block";
    document.querySelector(".choice-btn").style.opacity = 1;
  } else {
    document.body.classList.remove("sad-theme");
    const bestFriendAudio = document.getElementById("bestFriendMusic");
    bestFriendAudio.muted = isMuted;
    try {
      const playPromise = bestFriendAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed:", error);
        });
      }
    } catch (err) {
      console.log("Audio play failed:", err);
    }
    emojiInterval = setInterval(createEmoji, 300);
    for (let message of bestFriendMessages) {
      await typeWriter(message);
    }
    setTimeout(() => {
      setTimeout(() => {
        window.open(
          // "https://www.instagram.com/direct/t/harshpreet_singh_honey",
          "/",
          "_blank"
        );
        wishesElement.innerHTML =
          "Happy birthday! 📱✨<br>Be happy!!!";
      }, 1000);
    }, 2000);
  }
}
document.getElementById("startBtn").addEventListener("click", async () => {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("wishesContainer").classList.remove("hidden");
  const bgAudio = document.getElementById("audio");
  bgAudio.muted = isMuted;
  try {
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  } catch (err) {
    console.log("Audio play failed:", err);
  }
  emojiInterval = setInterval(createEmoji, 300);
  for (let wish of wishes) {
    await typeWriter(wish);
  }
  document.getElementById("choices").classList.remove("hidden");
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.style.opacity = 1;
  });
});
document.addEventListener("click", async function initAudio() {
  const audios = ["bgMusic", "audio", "sisterMusic", "bestFriendMusic"];
  for (let id of audios) {
    const audio = document.getElementById(id);
    try {
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
    } catch (err) {
      console.log("Audio initialization failed:", err);
    }
  }
  document.removeEventListener("click", initAudio);
});

createStars();
let honey = document.getElementById("body");
function fullScreen() {
  honey.requestFullscreen();
}