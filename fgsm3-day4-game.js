(() => {
  "use strict";

  /*
   * DAY 4 emergency loader / syntax repair
   *
   * The published 28 Aug 2026 Day 4 game source contains accidental literal
   * newlines inside ordinary quoted JavaScript strings. That makes the whole
   * original file fail to parse, so none of the mission buttons can initialise.
   *
   * To preserve every activity, question, score rule and interaction exactly as
   * authored, this loader retrieves the pinned original source, repairs only
   * illegal newlines inside single- or double-quoted strings, then executes the
   * repaired source. Template literals and comments are left untouched.
   */

  const PINNED_SOURCE =
    "https://raw.githubusercontent.com/lecomteeglantine/MedicalEnglishForMrsLecomteStudents/5ff7ff2/fgsm3-day4-game.js";

  function showFatal(message) {
    const feedback = document.getElementById("ai4Feedback");
    if (feedback) {
      feedback.className = "ai4-feedback is-error";
      feedback.textContent = message;
    }
    const status = document.getElementById("day4AudioStatus");
    if (status) status.textContent = message;
    console.error("[Day 4]", message);
  }

  function repairIllegalQuotedNewlines(source) {
    let out = "";
    let state = "normal";
    let escaped = false;

    for (let i = 0; i < source.length; i += 1) {
      const ch = source[i];
      const next = source[i + 1] || "";

      if (state === "line-comment") {
        out += ch;
        if (ch === "\n") state = "normal";
        continue;
      }

      if (state === "block-comment") {
        out += ch;
        if (ch === "*" && next === "/") {
          out += "/";
          i += 1;
          state = "normal";
        }
        continue;
      }

      if (state === "template") {
        out += ch;
        if (escaped) {
          escaped = false;
        } else if (ch === "\\") {
          escaped = true;
        } else if (ch === "`") {
          state = "normal";
        }
        continue;
      }

      if (state === "single" || state === "double") {
        const quote = state === "single" ? "'" : '"';

        if (ch === "\r") {
          if (next === "\n") i += 1;
          out += "\\n";
          escaped = false;
          continue;
        }
        if (ch === "\n") {
          out += "\\n";
          escaped = false;
          continue;
        }

        out += ch;
        if (escaped) {
          escaped = false;
        } else if (ch === "\\") {
          escaped = true;
        } else if (ch === quote) {
          state = "normal";
        }
        continue;
      }

      // normal JavaScript source
      if (ch === "/" && next === "/") {
        out += "//";
        i += 1;
        state = "line-comment";
      } else if (ch === "/" && next === "*") {
        out += "/*";
        i += 1;
        state = "block-comment";
      } else if (ch === "'") {
        out += ch;
        state = "single";
        escaped = false;
      } else if (ch === '"') {
        out += ch;
        state = "double";
        escaped = false;
      } else if (ch === "`") {
        out += ch;
        state = "template";
        escaped = false;
      } else {
        out += ch;
      }
    }

    return out;
  }

  async function bootDay4() {
    try {
      const response = await fetch(PINNED_SOURCE, {
        method: "GET",
        mode: "cors",
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error(`source request failed (${response.status})`);
      }

      const original = await response.text();
      const repaired = repairIllegalQuotedNewlines(original);

      // Compile before execution so a remaining syntax error produces a clean,
      // visible message instead of silently leaving the interface inert.
      const run = new Function(`${repaired}\n//# sourceURL=fgsm3-day4-game-repaired.js`);
      run();
      console.info("[Day 4] AI Clinical Control loaded with quoted-newline repair.");
    } catch (error) {
      showFatal(
        "AI Clinical Control could not initialise. Please refresh the page while connected to the internet."
      );
      console.error(error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootDay4, { once: true });
  } else {
    bootDay4();
  }
})();
