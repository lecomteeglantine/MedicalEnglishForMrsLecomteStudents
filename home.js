(() => {
  const all = Array.isArray(window.MEDICAL_VOCABULARY) ? window.MEDICAL_VOCABULARY : [];
  if (!all.length) return;

  const els = {
    illustration: document.getElementById("wodIllustration"),
    category: document.getElementById("wodCategory"),
    word: document.getElementById("wodWord"),
    ipa: document.getElementById("wodIPA"),
    definition: document.getElementById("wodDefinition"),
    french: document.getElementById("wodFrench"),
    listen: document.getElementById("wodListen"),
    another: document.getElementById("anotherWord")
  };
  let current = null;

  function dayIndex() {
    const d = new Date();
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000) % all.length;
  }

  function show(item) {
    current = item;
    els.illustration.textContent = item.illustration || "🩺";
    els.category.textContent = item.category;
    els.word.textContent = item.word;
    els.ipa.textContent = item.ipa;
    els.definition.textContent = item.definition;
    els.french.textContent = item.fr;
  }

  function getUKVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /^en-GB$/i.test(v.lang)) ||
           voices.find(v => /en[-_]GB/i.test(v.lang)) ||
           voices.find(v => /^en/i.test(v.lang)) || null;
  }

  function speak() {
    if (!current || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(current.word);
    u.lang = "en-GB";
    const voice = getUKVoice();
    if (voice) u.voice = voice;
    u.rate = .86;
    els.listen.classList.add("speaking");
    u.onend = () => els.listen.classList.remove("speaking");
    u.onerror = () => els.listen.classList.remove("speaking");
    speechSynthesis.speak(u);
  }

  show(all[dayIndex()]);
  els.listen.addEventListener("click", speak);
  els.another.addEventListener("click", () => show(all[Math.floor(Math.random() * all.length)]));
})();