"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [stage, setStage] = useState<"ask" | "yes">("ask");
  const [noClicks, setNoClicks] = useState(0);
  const [noDestroyed, setNoDestroyed] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (stage !== "ask") return;

    if (timeLeft === 0) {
      setStage("yes");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, stage]);

  const handleNoClick = () => {
    const clicks = noClicks + 1;
    setNoClicks(clicks);

    if (clicks === 1) {
      setMessage("😬 Are you sure?");
    } else if (clicks === 2) {
      setMessage("💔 Last warning…");
    } else if (clicks >= 3) {
      setMessage("💥 That option no longer exists 😏");
      setNoDestroyed(true);

      setTimeout(() => {
        setStage("yes");
      }, 1500);
    }
  };

  /* ❤️ FINAL VALENTINE SCREEN */
  if (stage === "yes") {
    return (
      <main className="container">
        {/* 💖 Emoji Rain */}
        <div className="emoji-rain">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="love-emoji"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${20 + Math.random() * 30}px`,
              }}
            >
              💖
            </span>
          ))}
        </div>

        <h1>💘 Decision Made</h1>
        <h2 className="valentine-text">
          You’re my Valentine now <br />
          misss vaishuuu (vedabaiiiiii) 💘 <br/>
          I love you so much 😍😍😍
        </h2>

        <p>
          Resistance was cute… but useless 😌❤️
        </p>

        <p className="small">Happy Valentine’s Day 💕</p>
      </main>
    );
  }

  /* ❌ QUESTION SCREEN (NO YES BUTTON) */
  return (
    <main className="container">
      <h1>💣 One Important Question</h1>
      <h2>Will you be my Valentine?</h2>

      <p className="timer">
        Decide in <strong>{timeLeft}</strong> seconds…
      </p>

      {message && <p>{message}</p>}

      <div className="buttons">
        {!noDestroyed && (
          <button
            className={`no ${
              noClicks === 1
                ? "shake"
                : noClicks === 2
                ? "crack"
                : ""
            }`}
            onClick={handleNoClick}
          >
            No 💔
          </button>
        )}
      </div>
    </main>
  );
}
