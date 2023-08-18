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
      
        fetch(`https://kanjiapi.dev/v1/all`)
          .then((response) => response.json())
          .then((data) => {
            this.kanjiData = data;
            this.updateKanji();
          })
          .catch((error) => {
            console.error("Error fetching kanji data:", error);
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
        this.currentJLPT = randomKanji.jlpt || "N/A"; // Set JLPT level or "N/A" if not available
        this.updateDom();
      },
      
  
      getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "MMM-RandomKanji"; // Use the correct class name
      
        const kanjiElement = document.createElement("div");
        kanjiElement.className = `kanji jlpt-${this.currentJLPT.toLowerCase()}`; // Apply JLPT level class
        kanjiElement.innerHTML = this.currentKanji;
        wrapper.appendChild(kanjiElement);
      
        const translationElement = document.createElement("div");
        translationElement.className = "definition"; // Use the correct class name
        translationElement.innerHTML = this.currentTranslation;
        wrapper.appendChild(translationElement);
      
        // Add JLPT level element
        const jlptElement = document.createElement("div");
        jlptElement.className = "jlpt"; // Use the correct class name
        jlptElement.innerHTML = "JLPT Level: " + this.currentJLPT;
        wrapper.appendChild(jlptElement);
      
        return wrapper;
      },
      
  });
  