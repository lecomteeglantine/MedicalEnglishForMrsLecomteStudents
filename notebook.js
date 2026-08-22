
(() => {
  const all = Array.isArray(window.MEDICAL_VOCABULARY) ? window.MEDICAL_VOCABULARY : [];
  const byWord = new Map(all.map(item => [item.word, item]));
  const data = window.MedicalStudentData;

  const grid = document.getElementById("notebookGrid");
  const count = document.getElementById("notebookCount");
  const empty = document.getElementById("notebookEmpty");
  const exportBtn = document.getElementById("exportNotebook");
  const importInput = document.getElementById("importNotebook");
  const clearBtn = document.getElementById("clearNotebook");

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getUKVoice() {
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /^en-GB$/i.test(v.lang)) ||
           voices.find(v => /en[-_]GB/i.test(v.lang)) ||
           voices.find(v => /^en/i.test(v.lang)) || null;
  }

  function speak(word, button) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "en-GB";
    const voice = getUKVoice();
    if (voice) u.voice = voice;
    u.rate = .86;
    button?.classList.add("speaking");
    u.onend = () => button?.classList.remove("speaking");
    u.onerror = () => button?.classList.remove("speaking");
    speechSynthesis.speak(u);
  }

  function template(item) {
    const note = data.getNote(item.word);
    return `
      <article class="notebook-card" data-word="${escapeHTML(item.word)}">
        <div class="notebook-card-head">
          <div class="notebook-word-icon">${escapeHTML(item.illustration || "🩺")}</div>
          <div>
            <span class="category-tag">${escapeHTML(item.category)}</span>
            <h2>${escapeHTML(item.word)}</h2>
            <p class="ipa">${escapeHTML(item.ipa)}</p>
          </div>
          <button class="remove-notebook" type="button" data-remove="${escapeHTML(item.word)}" aria-label="Remove ${escapeHTML(item.word)} from notebook">×</button>
        </div>
        <div class="notebook-definition">
          <span class="info-label">Definition</span>
          <p>${escapeHTML(item.definition)}</p>
        </div>
        <div class="notebook-french">
          <span class="info-label">Français</span>
          <p>${escapeHTML(item.fr)}</p>
        </div>
        <label class="personal-note">
          <span>My note</span>
          <textarea data-note="${escapeHTML(item.word)}" rows="3" maxlength="500" placeholder="A mnemonic, a useful phrase, a pronunciation reminder… Do not enter patient data.">${escapeHTML(note)}</textarea>
          <small>Saved automatically on this device.</small>
        </label>
        <button class="listen-btn notebook-listen" type="button" data-speak="${escapeHTML(item.word)}">🔊 Listen</button>
      </article>
    `;
  }

  function render() {
    const saved = data.getNotebook()
      .map(word => byWord.get(word))
      .filter(Boolean)
      .sort((a,b) => a.word.localeCompare(b.word, "en"));

    count.textContent = saved.length;
    empty.hidden = saved.length !== 0;
    grid.hidden = saved.length === 0;
    grid.innerHTML = saved.map(template).join("");

    grid.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        data.removeWord(btn.dataset.remove);
        render();
      });
    });

    grid.querySelectorAll("[data-note]").forEach(area => {
      let timer;
      area.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(() => data.setNote(area.dataset.note, area.value), 180);
      });
      area.addEventListener("blur", () => data.setNote(area.dataset.note, area.value));
    });

    grid.querySelectorAll("[data-speak]").forEach(btn => {
      btn.addEventListener("click", () => speak(btn.dataset.speak, btn));
    });
  }

  exportBtn.addEventListener("click", () => {
    const payload = data.exportData();
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mrs-lecomte-medical-english-notebook.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  importInput.addEventListener("change", async () => {
    const file = importInput.files?.[0];
    if (!file) return;
    try {
      const payload = JSON.parse(await file.text());
      const imported = data.importData(payload);
      alert(`${imported} notebook terms imported.`);
      render();
    } catch (error) {
      alert("This file is not a valid Medical English notebook export.");
    } finally {
      importInput.value = "";
    }
  });

  clearBtn.addEventListener("click", () => {
    if (!data.getNotebook().length) return;
    if (confirm("Clear your whole vocabulary notebook and all personal notes stored on this device?")) {
      data.clearNotebook();
      render();
    }
  });

  window.addEventListener("medicalNotebookChanged", render);
  render();
})();
