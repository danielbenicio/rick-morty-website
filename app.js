//DOM
const hide = document.querySelector('.hide');
const buttonSeeAll = document.querySelectorAll('.see-all');
const buttonHideAll = document.querySelectorAll('.hide-all');
const imgRickMorty = document.querySelectorAll('.img');
const infocharacters = document.querySelectorAll('.info-characters');
const charactersName = document.querySelectorAll('.name');
const charactersSpecie = document.querySelectorAll('.specie');
const charactersGender = document.querySelectorAll('.gender');
const charactersOrigin = document.querySelectorAll('.origin');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

//CONSTS
const apiURL = `https://rickandmortyapi.com/api/character?page=1`;
let prevURL = null;
let nextURL = null;

//FUNCTIONS
handleClickImgHide = e => {
  const clickedElement = e.target.src;
  e.target.classList.add('hide');
  const clickedElementArray = clickedElement.split('/');
  const splitElement = clickedElementArray[6].split('.');
  const id = splitElement[0] - 1;
  fetchData(id);
}

handleClickImgShow = e => {
  const id = e.target.id;
  e.target.classList.add('hide');
  imgRickMorty[id - 1].classList.remove('hide');
}

handleClickShow = event => {
  if(!event.target) return;
  infocharacterss.forEach((cardsList) => {
    cardsList.classList.remove('hide');
  })
  imgRickMorty.forEach((imgsList) => {
    imgsList.classList.add('hide');
  })
  buttonSeeAll[0].classList.add('hide');
  buttonHideAll[0].classList.remove('hide');
}

handleClickHide = event => {
  if(!event.target) return;
  infocharacterss.forEach((cardsList) => {
    cardsList.classList.add('hide');
  })
  imgRickMorty.forEach((imgsList) => {
    imgsList.classList.remove('hide');
  })
  buttonSeeAll[0].classList.remove('hide');
  buttonHideAll[0].classList.add('hide');
}

handlePrevButton = () => {
  if(prevURL) {
    fetchImg(prevURL);
  }
}

handleNextButton = () => {
  if(nextURL) {
    fetchImg(nextURL);
  }
}


//FETCH 
const fetchImg = async url => {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;
  const { info } = data;
  const { next, prev} = info;
  prevURL = prev;
  nextURL = next;
  for(let i = 0; i < imgRickMorty.length; i++){
    const imgContainer = imgRickMorty[i];
    const result = results[i];
    const namesList = charactersName[i];
    const gendersList = charactersGender[i];
    const speciesList = charactersSpecie[i];
    const originList = charactersOrigin[i];
    const { image, name, gender, species, origin } = result;
    imgContainer.src = image;
    imgContainer.alt = name;
    namesList.textContent = name;
    gendersList.textContent = gender;
    speciesList.textContent = species;
    originList.textContent = origin['name'];
  }
}

const fetchData = async id => {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=1`);
  const data = await res.json();
  const { results } = data;
  const resultData = results[id];
  const { name, gender, species, origin } = resultData;
  charactersName.textContent = name;
  charactersGender.textContent = gender;
  charactersSpecie.textContent = species;
  charactersOrigin.textContent = origin['name'];
  infocharacters[id].classList.remove('hide');
}

//EVENT LISTENERS
imgRickMorty.forEach((index) => {
  index.addEventListener('click', handleClickImgHide);
})
infocharacters.forEach((info) => {
  info.addEventListener('click', handleClickImgShow);
})
prevButton.addEventListener('click', handlePrevButton);
nextButton.addEventListener('click', handleNextButton);
buttonSeeAll[0].addEventListener('click', handleClickShow);
buttonHideAll[0].addEventListener('click', handleClickHide);

//INITIALIZE
fetchImg(`${apiURL}`);