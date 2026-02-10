"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [stage, setStage] = useState<"ask" | "yes" | "no">("ask");

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

  if (stage === "yes") {
  return (
    <main className="container">
      {/* Love Emoji Rain */}
      <div className="emoji-rain">
        {Array.from({ length: 40 }).map((_, i) => (
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

      <h1>💖 Too late 😏</h1>
      <h2 className="valentine-text">
        You’re my Valentine now <br />
        misss vaishuuu (vedabaiiiiii) 💘
      </h2>

      <p>
        I didn’t need a timer  
        to know you’d choose me 🥰
      </p>

      <p className="small">Happy Valentine’s Day ❤️</p>
    </main>
  );
}


  if (stage === "no") {
    return (
      <main className="container">
        <h1>😌 Nice try</h1>
        <p>
          That button was just for decoration 😉
        </p>
        <button className="yes" onClick={() => setStage("yes")}>
          Try Again ❤️
        </button>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>⏳ Quick Question</h1>
      <h2>Will you be my Valentine miss vaishuuuu ❤️?</h2>

      <p className="timer">
        Deciding in <strong>{timeLeft}</strong> seconds…
      </p>

      <div className="buttons">
        <button className="yes" onClick={() => setStage("yes")}>
          Yes ❤️
        </button>

        <button className="no" onClick={() => setStage("no")}>
          No 💔
        </button>
      </div>
    </main>
  );
}
