
(() => {
  const KEYS = {
    notebook: "mrsLecomteMedicalEnglishNotebookV1",
    notes: "mrsLecomteMedicalEnglishNotebookNotesV1",
    flash: "mrsLecomteMedicalEnglishFlashProgressV1"
  };

  function readJSON(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed ?? fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  }

  function getNotebook() {
    const values = readJSON(KEYS.notebook, []);
    return Array.isArray(values) ? values : [];
  }

  function setNotebook(values) {
    return writeJSON(KEYS.notebook, [...new Set(values)]);
  }

  function hasWord(word) {
    return getNotebook().includes(word);
  }

  function addWord(word) {
    const values = getNotebook();
    if (!values.includes(word)) values.push(word);
    setNotebook(values);
    window.dispatchEvent(new CustomEvent("medicalNotebookChanged"));
  }

  function removeWord(word) {
    setNotebook(getNotebook().filter(item => item !== word));
    const notes = getNotes();
    delete notes[word];
    writeJSON(KEYS.notes, notes);
    window.dispatchEvent(new CustomEvent("medicalNotebookChanged"));
  }

  function clearNotebook() {
    localStorage.removeItem(KEYS.notebook);
    localStorage.removeItem(KEYS.notes);
    window.dispatchEvent(new CustomEvent("medicalNotebookChanged"));
  }

  function getNotes() {
    const values = readJSON(KEYS.notes, {});
    return values && typeof values === "object" && !Array.isArray(values) ? values : {};
  }

  function getNote(word) {
    return getNotes()[word] || "";
  }

  function setNote(word, note) {
    const notes = getNotes();
    notes[word] = String(note || "");
    writeJSON(KEYS.notes, notes);
  }

  function getFlashProgress() {
    const values = readJSON(KEYS.flash, {known: {}, review: {}});
    return {
      known: values?.known && typeof values.known === "object" ? values.known : {},
      review: values?.review && typeof values.review === "object" ? values.review : {}
    };
  }

  function markFlash(word, status) {
    const state = getFlashProgress();
    delete state.known[word];
    delete state.review[word];
    if (status === "known") state.known[word] = Date.now();
    if (status === "review") state.review[word] = Date.now();
    writeJSON(KEYS.flash, state);
  }

  function clearFlashProgress() {
    localStorage.removeItem(KEYS.flash);
  }

  function exportData() {
    return {
      format: "MrsLecomteMedicalEnglishNotebook",
      version: 1,
      exportedAt: new Date().toISOString(),
      notebook: getNotebook(),
      notes: getNotes()
    };
  }

  function importData(payload) {
    if (!payload || payload.format !== "MrsLecomteMedicalEnglishNotebook" || !Array.isArray(payload.notebook)) {
      throw new Error("Invalid notebook file.");
    }
    const knownWords = new Set((window.MEDICAL_VOCABULARY || []).map(item => item.word));
    const safeNotebook = payload.notebook.filter(word => knownWords.has(word));
    const safeNotes = {};
    if (payload.notes && typeof payload.notes === "object") {
      safeNotebook.forEach(word => {
        if (typeof payload.notes[word] === "string") safeNotes[word] = payload.notes[word];
      });
    }
    setNotebook(safeNotebook);
    writeJSON(KEYS.notes, safeNotes);
    window.dispatchEvent(new CustomEvent("medicalNotebookChanged"));
    return safeNotebook.length;
  }

  window.MedicalStudentData = {
    KEYS,
    getNotebook,
    setNotebook,
    hasWord,
    addWord,
    removeWord,
    clearNotebook,
    getNote,
    setNote,
    getFlashProgress,
    markFlash,
    clearFlashProgress,
    exportData,
    importData
  };
})();
