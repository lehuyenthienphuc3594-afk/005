// Load Live2D model March 7th
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  transparent: true,
  autoStart: true,
  resizeTo: window,
});

PIXI.live2d.Live2DModel.from("March7/March7.model3.json").then(model => {
  model.scale.set(0.3);
  model.x = 200;
  model.y = 500;
  app.stage.addChild(model);
});

// Chatbot logic
async function ask() {
  const q = document.getElementById("input").value.trim();
  if (!q) return;

  const chatBox = document.getElementById("chat");
  chatBox.innerHTML += `<b>You:</b> ${q}<br>`;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: q }),
    });

    const data = await response.json();

    if (response.ok) {
      chatBox.innerHTML += `<b>March 7th:</b> ${data.reply}<br>`;
    } else {
      chatBox.innerHTML += `<b>(error):</b> ${data.error.message || "Could not reach AI"}<br>`;
    }
  } catch (err) {
    chatBox.innerHTML += `<b>(error):</b> ${err.message}<br>`;
  }

  document.getElementById("input").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
