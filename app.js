//DOM
const hide = document.querySelector('.hide');
const buttonSeeAll = document.querySelectorAll('.see-all');
const buttonHideAll = document.querySelectorAll('.hide-all');
const imgRickMorty = document.querySelectorAll('.img');
const infoCharacter = document.querySelectorAll('.info-character');
const characterName = document.querySelectorAll('.name');
const characterSpecie = document.querySelectorAll('.specie');
const characterGender = document.querySelectorAll('.gender');
const characterOrigin = document.querySelectorAll('.origin');

//CONSTS
const apiURL = `https://rickandmortyapi.com/api/character?page=1`;

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
  e.target.classList.add('hide')
  imgRickMorty[id - 1].classList.remove('hide')
}

handleClickShow = event => {
  if(!event.target) return;
  for(let i = 0; i < infoCharacter.length; i++){
    const infoCharacters = infoCharacter[i];
    const imgsRickMorty = imgRickMorty[i];
    infoCharacters.classList.remove('hide');
    imgsRickMorty.classList.add('hide');
  }
  buttonSeeAll[0].classList.add('hide');
  buttonHideAll[0].classList.remove('hide');
}

handleClickHide = event => {
  if(!event.target) return;
  for(let i = 0; i < infoCharacter.length; i++){
    const infoCharacters = infoCharacter[i];
    const imgsRickMorty = imgRickMorty[i];
    infoCharacters.classList.add('hide');
    imgsRickMorty.classList.remove('hide');
  }
  buttonSeeAll[0].classList.remove('hide');
  buttonHideAll[0].classList.add('hide');
}


//FETCH 
const fetchImg = async url => {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;
  for(let i = 0; i < imgRickMorty.length; i++){
    const imgContainer = imgRickMorty[i];
    const result = results[i];
    const charactersNames = characterName[i];
    const charactersGenders = characterGender[i];
    const charactersSpecies = characterSpecie[i];
    const charactersOrigins = characterOrigin[i];
    const { image, name, gender, species, origin } = result;
    imgContainer.src = image;
    imgContainer.alt = name;
    charactersNames.textContent = name;
    charactersGenders.textContent = gender;
    charactersSpecies.textContent = species;
    charactersOrigins.textContent = origin['name'];
  }
}

const fetchData = async id => {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=1`);
  const data = await res.json();
  const { results } = data;
  const resultData = results[id];
  const { name, gender, species, origin } = resultData;
  characterName.textContent = name;
  characterGender.textContent = gender;
  characterSpecie.textContent = species;
  characterOrigin.textContent = origin['name'];
  infoCharacter[id].classList.remove('hide');
}

//EVENT LISTENERS
imgRickMorty.forEach((index) => {
  index.addEventListener('click', handleClickImgHide);
})
infoCharacter.forEach((info) => {
  info.addEventListener('click', handleClickImgShow)
})
buttonSeeAll[0].addEventListener('click', handleClickShow);
buttonHideAll[0].addEventListener('click', handleClickHide);

//INITIALIZE
fetchImg(`${apiURL}`);