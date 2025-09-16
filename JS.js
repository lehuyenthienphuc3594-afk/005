// =============== Live2D Setup ===============
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  autoStart: true,
  transparent: true,
  resizeTo: window,
});

PIXI.live2d.Live2DModel.from("March7/March7.model3.json").then(model => {
  model.scale.set(0.3);
  model.x = 100;
  model.y = 400;
  app.stage.addChild(model);
});

// =============== Chat Box Setup ===============
const messages = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // show user msg
  messages.innerHTML += `\nYou: ${text}`;
  userInput.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();

    if (data.reply) {
      messages.innerHTML += `\nMarch 7th: ${data.reply}`;
    } else {
      messages.innerHTML += `\nMarch 7th: (error) No reply from AI`;
    }
  } catch (err) {
    messages.innerHTML += `\nMarch 7th: (error) Could not reach AI`;
  }

  messages.scrollTop = messages.scrollHeight;
}

sendBtn.onclick = sendMessage;
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
