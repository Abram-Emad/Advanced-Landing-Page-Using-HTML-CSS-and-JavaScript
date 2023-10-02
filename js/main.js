// Settings Box Logic
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty('--main-color', mainColors);
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  })
};

document.querySelector(".toggle-settings i.fas.fa-cog").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

const colorLi = document.querySelectorAll(".colors-list li");

function handleActiveFunction(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

colorLi.forEach(li => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    localStorage.setItem('color-option', e.target.dataset.color);
    handleActiveFunction(e);
  })
});

let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalteam = localStorage.getItem("bullets-option");

if (bulletLocalteam !== null) {
  bulletSpan.forEach(span => {
    span.classList.remove("active");
  });

  if (bulletLocalteam === 'block') {
    bulletsContainer.style.display = 'block';
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = 'none';
    document.querySelector(".bullets-option .no").classList.add("active");
  }
};

bulletSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem("bullets-option", 'block');
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets-option", 'none');
    }
    handleActiveFunction(e);
  })
});

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color-option");
  localStorage.removeItem("bullets-option");
  window.location.reload();
}

// Navigation Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let toggleLinks = document.querySelector(".main-nav");
let toggleMegaMenu = document.querySelector(".header .mega-menu");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  toggleLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== toggleLinks && e.target !== toggleMegaMenu) {
    if (toggleLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      toggleLinks.classList.toggle("open");
    }
  }
});

toggleLinks.onclick = function (e) {
  e.stopPropagation();
}

// Navigation Bullets System
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollIntoView(link) {
  link.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
};

scrollIntoView(allBullets);

// Scroller 
let element = document.querySelector(".scroller");
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  element.style.width = `${(scrollTop / height) * 100}%`
})

// our Gallery Pop Up And Footer Gallery Pop Up
let ourGallery = document.querySelectorAll(".gallery img");
let footerGallery = document.querySelectorAll(".box.footer-gallery img");

function gallerySections(ele) {
  ele.forEach(img => {
    img.addEventListener("click", (e) => {

      let overlay = document.createElement("div");
      overlay.className = 'popup-overlay';
      document.body.appendChild(overlay);

      let popupBox = document.createElement("div");
      popupBox.className = 'popup-box';

      if (img.alt !== null) {
        let imgHeading = document.createElement("h3");
        let imgText = document.createTextNode(img.alt);
        imgHeading.appendChild(imgText);
        popupBox.appendChild(imgHeading);
      }

      let popupImmage = document.createElement("img");
      popupImmage.src = img.src;
      popupBox.appendChild(popupImmage);
      document.body.appendChild(popupBox);

      let closeButton = document.createElement("span");
      let closeButtonText = document.createTextNode("X");
      closeButton.appendChild(closeButtonText);
      closeButton.className = 'close-button';
      popupBox.appendChild(closeButton);
    })
  });

  document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
      e.target.parentNode.remove();
      document.querySelector(".popup-overlay").remove();
    }
  })
};

gallerySections(ourGallery);
gallerySections(footerGallery);

// our skills animation, Our Awesome Stats Section Number Countdown And Go To Top Button 
let section = document.querySelector(".our-skills");
let progressSpans = document.querySelectorAll(".the-progress span");

let statsSection = document.querySelector(".stats");
let numbers = document.querySelectorAll(".stats .number");
let start = false;

let goToTop = document.querySelector(".go-to-top");

window.onscroll = function () {

  this.scrollY >= 1000 ? goToTop.classList.add("show") : goToTop.classList.remove("show");

  if (window.scrollY >= section.offsetTop - 250) {
    progressSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  };

  if (window.scrollY >= statsSection.offsetTop - 200) {
    if (!start) {
      numbers.forEach((number) => strartCount(number));
    }
    start = true;
  };

};

function strartCount(ele) {
  let goal = ele.dataset.goal;
  let count = setInterval(() => {
    ele.textContent++;
    if (ele.textContent == goal) {
      clearInterval(count)
    }
  }, 3000 / goal)
};

goToTop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Latest Events Section Number Countdown 
let countDown = new Date("Dec 31, 2024 23:59:59").getTime();

let counter = setInterval(() => {
  let dateNow = new Date().getTime();
  let dateDifference = countDown - dateNow;
  let days = Math.floor(dateDifference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDifference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDifference % (1000 * 60)) / 1000);
  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML = seconds < 10 ? `0${seconds}` : seconds;
});

// Top Videos Tabs
let tabs = document.querySelectorAll(".videos .holder .list ul li");
let tabsArray = Array.from(tabs);
let imgs = document.querySelectorAll(".videos .holder .preview > img");
let imgsArray = Array.from(imgs);

tabsArray.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    tabsArray.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    imgsArray.forEach((image) => {
      image.style.display = "none";
    });
    document.querySelector(e.currentTarget.dataset.cont).style.display = "block";
  });
});

// Discount Sections Count Input Characters And Fill Borders
let count = document.querySelectorAll(".discount .form .count");
let progress = document.querySelectorAll(".discount .form .progress");
let input = document.querySelectorAll(".discount .form .input");
let arrayOfCounts = Array.prototype.slice.call(count);
let arrayOfProgress = Array.prototype.slice.call(progress);
let arrayOfInputs = Array.prototype.slice.call(input);

for (var i = 0; i < arrayOfInputs.length; i++) {
  let count = arrayOfCounts[i];
  let progress = arrayOfProgress[i];
  let maxlength = arrayOfInputs[i].getAttribute("maxlength");

  count.innerHTML = maxlength;
  arrayOfInputs[i].oninput = function () {
    count.innerHTML = maxlength - this.value.length;
    count.classList.toggle("zero", count.innerHTML == 0);
    progress.style.width = `${(this.value.length * 100) / maxlength}%`;
  };
}