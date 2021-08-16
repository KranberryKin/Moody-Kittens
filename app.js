/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let kittenimg = ["https://robohash.org/BVO.png?set=set4","https://robohash.org/D0L.png?set=set4","https://robohash.org/060.png?set=set4","https://robohash.org/41U.png?set=set4","https://robohash.org/LWN.png?set=set4"];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {

  event.preventDefault();

  let form = event.target;

  let kitten = {}

  kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5,
    classlist: "kitten tolerant",
    buttonClass: "",
    imgurl: "",
    DelBut: "hidden",
  }
  let randomI = getRandomInt(kittenimg.length -1);
  kitten.imgurl = kittenimg[randomI]
  if(doesKittenExist(kitten.name)){
    alert("Kitten Already Exists!")
  }else{
  kittens.push(kitten);
  console.log(kitten);

  saveKittens();
  form.reset();
  drawKittens();
  }
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  kittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittens == null) {
    kittens = []
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {

  let template = ""

  for (let i = 0; i <= kittens.length - 1; i++) {

    let kitten = kittens[i]

    template += `<div>
    <div class="card container d-felx space-between">
    <img src="${kitten.imgurl}" alt="" id="${kitten.id}" class="${kitten.classlist}">
    <p>Name : ${kitten.name}</p>
    <p>Mood : ${kitten.mood}</p>
    <p>Affection : ${kitten.affection}</p>
    <button class="${kitten.buttonClass}" onclick="pet('${kitten.id}')">Pet</button>
     <button class="${kitten.buttonClass}" onclick="catnip('${kitten.id}')">Catnip</button>
     <button class="${kitten.DelBut}" onclick="DelCat('${kitten.id}')"> Let Go </button>
    </div>
    </div>
    `
  }
  document.getElementById("kittens").innerHTML = template;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let kitten = findKittenById(id);
  let X = Math.random();
  if (X > .7) {
    kitten.affection += 1;
  } else {
    if (kitten.affection > 0) {
      kitten.affection -= 1;
    }
  }
  if(kitten.affection <=0){
kitten.buttonClass = "hidden";
kitten.DelBut = "";
  }
  setKittenMood(kitten);
  saveKittens();
  drawKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id);
  kitten.mood = "Tolerant";
  kitten.affection = 5;
  kitten.classlist = "kitten tolerant"
  saveKittens();
  drawKittens();

}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {

  if (kitten.affection > 6) {
    kitten.mood = "Happy"
    kitten.classlist = "kitten happy"

  }
  if (kitten.affection <= 5) {
    kitten.mood = "Tolerant"
    kitten.classlist = "kitten tolerant"
  }
  if (kitten.affection <= 3) {
    kitten.mood = "Angry"
    kitten.classlist = "kitten angry"
  }
  if (kitten.affection <= 0) {
    kitten.mood = "Gone"
    kitten.classlist = "kitten gone"

  }
}

function getStarted() {
  document.getElementById("welcome").remove();
  loadKittens();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
function doesKittenExist(name) {
  let exists = false

  for (let i = 0; i <= kittens.length -1; i++) {
    let kitten = kittens[i]
    if (kitten.name == name) {
      exists = true
    }
  }
  return exists
}
function getRandomInt(max) {
  min = Math.ceil(0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 
function DelCat(kittenId){
let Index = kittens.findIndex(kitten => kitten.id === kittenId);
kittens.splice(Index, 1);
saveKittens();
drawKittens();
}