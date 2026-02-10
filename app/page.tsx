"use client";

import { useEffect, useState } from "react";

const loveEmojis = ["💖", "💘", "💕", "❤️", "🥰"];

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [stage, setStage] = useState<"ask" | "glitch" | "yes">("ask");
  const [noClicks, setNoClicks] = useState(0);
  const [noDestroyed, setNoDestroyed] = useState(false);
  const [message, setMessage] = useState("");
  const [typedText, setTypedText] = useState("");

  const loveLine = "I didn’t plan this… but I’m so glad it’s you ❤️";

  useEffect(() => {
    if (stage !== "ask") return;

    if (timeLeft === 0) {
      triggerReveal();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, stage]);

  const triggerReveal = () => {
    setStage("glitch");
    setTimeout(() => {
      setStage("yes");
      startTyping();
    }, 800);
  };

  const startTyping = () => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(loveLine.slice(0, i));
      i++;
      if (i > loveLine.length) clearInterval(interval);
    }, 60);
  };

  const handleNoClick = () => {
    const clicks = noClicks + 1;
    setNoClicks(clicks);

    if (clicks === 1) setMessage("😬 Are you sure?");
    else if (clicks === 2) setMessage("💔 Last warning…");
    else {
      setMessage("💥 That option no longer exists 😏");
      setNoDestroyed(true);
      setTimeout(triggerReveal, 1200);
    }
  };

  /* ⚡ GLITCH SCREEN */
  if (stage === "glitch") {
    return (
      <main className="container glitch">
        <h1>System Override…</h1>
      </main>
    );
  }

  /* ❤️ FINAL SCREEN */
  if (stage === "yes") {
    return (
      <main className="container">
        <div className="emoji-rain">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="love-emoji"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 3}s`,
                fontSize: `${18 + Math.random() * 28}px`,
              }}
            >
              {loveEmojis[Math.floor(Math.random() * loveEmojis.length)]}
            </span>
          ))}
        </div>

        <h1>💘 Decision Made</h1>

        <h2 className="valentine-text heartbeat">
          You’re my Valentine now <br />
          misss vaishuuu (vedabaiiiiii) 💘 <br />
          I love you so much 💖
        </h2>

        <p className="typewriter">{typedText}</p>

        <p className="small">Happy Valentine’s Day 💕</p>
      </main>
    );
  }

  /* ❌ ASK SCREEN (NO YES BUTTON) */
  return (
    <main className="container">
      <h1>💣 One Important Question</h1>
      <h2>Will you be my Valentine?</h2>

      <p className="timer">
        Decide in <strong>{timeLeft}</strong> seconds…
      </p>

      {message && <p>{message}</p>}

      {!noDestroyed && (
        <button
          className={`no ${
            noClicks === 1 ? "shake" : noClicks === 2 ? "crack" : ""
          }`}
          onClick={handleNoClick}
        >
          No 💔
        </button>
      )}
    </main>
  );
}
