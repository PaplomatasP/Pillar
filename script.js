/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/

document.addEventListener("DOMContentLoaded", function() {
  // Initialize particles
  if (typeof Particles !== 'undefined') {
    Particles.init({
      selector: ".background",
      color: ["#03dac6", "#ff0266", "#000000"],
      connectParticles: true,
      responsive: [
        {
          breakpoint: 768,
          options: {
            color: ["#faebd7", "#03dac6", "#ff0266"],
            maxParticles: 43,
            connectParticles: false
          }
        }
      ]
    });
  }

  // Navigation functionality
  class NavigationPage {
    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 70;
      this.lastScroll = 0;
      
      // Bind event handlers
      this.onTabClick = this.onTabClick.bind(this);
      this.onScroll = this.onScroll.bind(this);
      this.onResize = this.onResize.bind(this);
      
      // Add event listeners
      const navTabs = document.querySelectorAll('.nav-tab');
      navTabs.forEach(tab => {
        tab.addEventListener('click', (event) => this.onTabClick(event, tab));
      });
      
      window.addEventListener('scroll', this.onScroll);
      window.addEventListener('resize', this.onResize);
      
      // Initial call to set positions
      this.onScroll();
      this.onResize();
    }

    onTabClick(event, element) {
      event.preventDefault();
      const targetId = element.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const scrollTop = targetElement.offsetTop - this.tabContainerHeight + 1;
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }

    onScroll() {
      this.checkHeaderPosition();
      this.findCurrentTabSelector();
      this.lastScroll = window.scrollY;
    }

    onResize() {
      if (this.currentId) {
        this.setSliderCss();
      }
    }

    checkHeaderPosition() {
      const headerHeight = 75;
      const navContainer = document.querySelector('.nav-container');
      
      if (window.scrollY > headerHeight) {
        navContainer.classList.add('nav-container--scrolled');
      } else {
        navContainer.classList.remove('nav-container--scrolled');
      }
      
      const navElement = document.querySelector('.nav');
      const offset = navElement.offsetTop + navElement.offsetHeight - this.tabContainerHeight - headerHeight;
      
      if (window.scrollY > this.lastScroll && window.scrollY > offset) {
        navContainer.classList.add('nav-container--move-up');
        navContainer.classList.remove('nav-container--top-first');
        navContainer.classList.add('nav-container--top-second');
      } else if (window.scrollY < this.lastScroll && window.scrollY > offset) {
        navContainer.classList.remove('nav-container--move-up');
        navContainer.classList.remove('nav-container--top-second');
        navContainer.classList.add('nav-container--top-first');
      } else {
        navContainer.classList.remove('nav-container--move-up');
        navContainer.classList.remove('nav-container--top-first');
        navContainer.classList.remove('nav-container--top-second');
      }
    }

    findCurrentTabSelector() {
      const sections = document.querySelectorAll('.slider');
      let newCurrentId = null;
      let newCurrentTab = null;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - this.tabContainerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          newCurrentId = '#' + section.id;
          newCurrentTab = document.querySelector(`.nav-tab[href="${newCurrentId}"]`);
        }
      });
      
      if (this.currentId !== newCurrentId || this.currentId === null) {
        this.currentId = newCurrentId;
        this.currentTab = newCurrentTab;
        this.setSliderCss();
      }
    }

    setSliderCss() {
      const navTabSlider = document.querySelector('.nav-tab-slider');
      
      if (this.currentTab) {
        const width = this.currentTab.offsetWidth;
        const left = this.currentTab.offsetLeft;
        
        navTabSlider.style.width = width + 'px';
        navTabSlider.style.left = left + 'px';
      }
    }
  }

  // Initialize navigation
  new NavigationPage();
});