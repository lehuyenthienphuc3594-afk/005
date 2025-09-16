// ==== Load Live2D Model ====
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  transparent: true,
  autoStart: true,
  backgroundAlpha: 0
});

// Dùng Live2DModel trực tiếp (không cần PIXI.live2d.*)
Live2DModel.from("March7/March7.model3.json").then(model => {
  model.scale.set(0.3);
  model.x = 100;
  model.y = 400;
  app.stage.addChild(model);
});

// ==== Chatbot logic ====
async function ask() {
  const q = document.getElementById("input").value.trim();
  if (!q) return;

  const chatBox = document.getElementById("chat");
  chatBox.innerHTML += `<b>You:</b> ${q}<br>`;
  document.getElementById("input").value = "";

  try {
    // Gọi API proxy trên Vercel
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: q })
    });

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();
    chatBox.innerHTML += `<b>March 7th:</b> ${data.reply}<br>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    console.error(err);
    chatBox.innerHTML += `<b>March 7th (error):</b> Could not reach AI<br>`;
  }
}
