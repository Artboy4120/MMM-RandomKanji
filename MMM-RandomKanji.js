Module.register("MMM-RandomKanji", {
    kanjiData: [],
    currentKanji: "",
    currentTranslation: "",
  
    defaults: {
      updateInterval: 24 * 60 * 60 * 1000, // Update every 24 hours
      kanjiLevel: "joyo", // Default to Jōyō kanji
    },
  
    start: function () {
      this.loadKanjiData();
      this.scheduleUpdate();
    },
  
    loadKanjiData: function () {
      const kanjiLevel = this.config.kanjiLevel;
  
      fetch(`https://kanjiapi.dev/v1/kanji/${kanjiLevel}`)
        .then((response) => response.json())
        .then((data) => {
          this.kanjiData = data;
          this.updateKanji();
        });
    },
  
    scheduleUpdate: function () {
      setInterval(() => {
        this.updateKanji();
      }, this.config.updateInterval);
    },
  
    updateKanji: function () {
      if (this.kanjiData.length === 0) {
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * this.kanjiData.length);
      const randomKanji = this.kanjiData[randomIndex];
      this.currentKanji = randomKanji.kanji;
      this.currentTranslation = randomKanji.meanings.join(", ");
      this.updateDom();
    },
  
    getDom: function () {
      const wrapper = document.createElement("div");
      wrapper.className = "MMM-RandomKanji"; // Use the correct class name
  
      const kanjiElement = document.createElement("div");
      kanjiElement.className = "kanji"; // Use the correct class name
      kanjiElement.innerHTML = this.currentKanji;
      wrapper.appendChild(kanjiElement);
  
      const translationElement = document.createElement("div");
      translationElement.className = "definition"; // Use the correct class name
      translationElement.innerHTML = this.currentTranslation;
      wrapper.appendChild(translationElement);
  
      return wrapper;
    },
  });
  