(function() {

  const filter = document.querySelector('.photo-post__filters');

  if (filter) {
    initTabs();
  }

  function initTabs() {
    const elems = {
      btns: [
        {
          name: 'crop',
          el: document.querySelector('.photo-post__filter-btn--crop')
        },
        {
          name: 'fill',
          el: document.querySelector('.photo-post__filter-btn--fill')
        },
        {
          name: 'contrast',
          el: document.querySelector('.photo-post__filter-btn--contrast')
        }
      ],

      scales: [
        {
          name: 'crop',
          el: document.querySelector('.photo-post__filter-input--crop')
        },
        {
          name: 'fill',
          el: document.querySelector('.photo-post__filter-input--fill')
        },
        {
          name: 'contrast',
          el: document.querySelector('.photo-post__filter-input--contrast')
        }
      ]
    };

    elems.btns.forEach(i => {
      let name = i.name,
        el = i.el;

      let targetTab = null;

      for (let i = 0 ; i < elems.scales.length; i++) {
        if (elems.scales[i].name === name) {
          targetTab = elems.scales[i].el;
        }
      }

      el.addEventListener('click', ()=>{
        activateTab(targetTab, el);
      });
    });

    function activateTab(targetTab, currentBtn) {
      let activeBtnClass = 'photo-post__filter-btn--active',
        activeTabClass = 'photo-post__filter-input--active'

      let activeBtn = document.querySelector(`.${activeBtnClass}`),
        activeTab = document.querySelector(`.${activeTabClass}`);

      if (activeBtn) activeBtn.classList.remove(activeBtnClass);
      if (activeTab) activeTab.classList.remove(activeTabClass);

      currentBtn.classList.add(activeBtnClass);
      targetTab.classList.add(activeTabClass);
    }
  }

})();