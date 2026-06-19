(function(){

  const themes = window.THEMES || [];
  const toggleBtn = document.getElementById("theme-toggle-btn");
  const overlay = document.getElementById("theme-modal-overlay");
  const closeBtn = document.getElementById("theme-modal-close");
  const gridEl = document.getElementById("theme-modal-grid");
  const countEl = document.getElementById("theme-modal-count");

  countEl.textContent = `· ${themes.length}개`;

  // --- 모달 안에 카테고리별로 테마 카드 렌더링 ---
  const categories = [];
  themes.forEach(t => {
    if(!categories.includes(t.category)) categories.push(t.category);
  });

  let selectedThemeId = null;

  categories.forEach(cat => {
    const catLabel = document.createElement("div");
    catLabel.className = "theme-modal-cat";
    catLabel.textContent = cat;
    gridEl.appendChild(catLabel);

    themes.filter(t => t.category === cat).forEach(theme => {
      const card = document.createElement("div");
      card.className = "theme-mini-card";
      card.dataset.id = theme.id;

      const swatchRow = document.createElement("div");
      swatchRow.className = "swatches-row";
      theme.swatches.slice(0, 4).forEach(sw => {
        const sq = document.createElement("span");
        sq.style.background = sw.hex.startsWith("#") ? sw.hex : "#ccc";
        swatchRow.appendChild(sq);
      });

      const name = document.createElement("div");
      name.className = "mini-name";
      name.textContent = theme.name;

      const desc = document.createElement("div");
      desc.className = "mini-desc";
      desc.textContent = theme.desc;

      card.appendChild(swatchRow);
      card.appendChild(name);
      card.appendChild(desc);

      card.addEventListener("click", () => applyTheme(theme));

      gridEl.appendChild(card);
    });
  });

  // --- 테마 적용: index.html의 CSS 변수를 갈아끼움 ---
  function applyTheme(theme){
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });

    // 기본 테마 장식용 그라데이션은 커스텀 테마에서는 끔
    document.body.classList.remove("theme-default");

    selectedThemeId = theme.id;
    document.querySelectorAll(".theme-mini-card").forEach(c => {
      c.classList.toggle("selected", c.dataset.id === theme.id);
    });

    closeModal();
  }

  // --- 모달 열기/닫기 ---
  function openModal(){
    overlay.classList.add("open");
  }
  function closeModal(){
    overlay.classList.remove("open");
  }

  toggleBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if(e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeModal();
  });

})();
