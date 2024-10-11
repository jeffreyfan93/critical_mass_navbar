const navigation = {
  cities: [
    {
      section: 'cupertino',
      label: 'Cupertino',
    },
    {
      section: 'new-york-city',
      label: 'New York City',
    },
    {
      section: 'london',
      label: 'London',
    },
    {
      section: 'amsterdam',
      label: 'Amsterdam',
    },
    {
      section: 'tokyo',
      label: 'Tokyo',
    },
    {
      section: 'hong-kong',
      label: 'Hong Kong',
    },
    {
      section: 'sydney',
      label: 'Sydney',
    },
  ],
};

const timeZones = {
  cupertino: 'America/Los_Angeles',
  'new-york-city': 'America/New_York',
  london: 'Europe/London',
  amsterdam: 'Europe/Amsterdam',
  tokyo: 'Asia/Tokyo',
  'hong-kong': 'Asia/Hong_Kong',
  sydney: 'Australia/Sydney',
};

// create elements
const root = document.getElementById('root');

const cities = document.createElement('div');
cities.className = 'cities-list';

const slider = document.createElement('div');
slider.className = 'slider';

const sliderUnderline = document.createElement('div');
sliderUnderline.className = 'slider-underline';

const timeDisplay = document.createElement('div');
timeDisplay.className = 'time-display';

// this is basically the state
let selectedCity = navigation.cities[0].section; // default selectedCity to first city

// helper functions
let timer;

const setSelectedClassName = () => {
  Array.from(cities.children).forEach((city) => {
    if (selectedCity === city.id) {
      city.classList.add('selected');
    } else {
      city.classList.remove('selected');
    }
  });
};

const resize = () => {
  const currDiv = document.getElementById(selectedCity);
  const sliderUnderline = document.querySelector('.slider-underline');

  sliderUnderline.style.left = `${
    currDiv.offsetLeft - currDiv.parentNode.offsetLeft
  }px`;
  sliderUnderline.style.width = `${currDiv.offsetWidth}px`;
};

const setTime = () => {
  let date = new Date();
  let options = { timeZone: timeZones[selectedCity] };
  let time = date.toLocaleTimeString('en-US', options);
  timeDisplay.innerText = time;
};

const startInterval = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    setTime();
  }, 1000);
};

const startTime = () => {
  setTime();
  startInterval();
};

// initial creation of city elements
navigation.cities.forEach((city) => {
  const cityEl = document.createElement('button');
  cityEl.id = city.section;
  cityEl.innerText = city.label;
  cityEl.addEventListener('click', () => {
    selectedCity = city.section;
    startTime();
    setSelectedClassName();
    resize();
  });

  cities.append(cityEl);
});

// render
slider.append(sliderUnderline);
root.append(cities);
root.append(slider);
root.append(timeDisplay);
// run these functions after the component has mounted
startTime();
setSelectedClassName();
resize();
window.onresize = resize;
