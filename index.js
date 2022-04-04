const tl = new TimelineMax();

tl.from("#background_image", 2, {
    opacity: 0,
    delay: 1
})


tl.from('input', 1.5, {
    scale: 1.1,
    opacity: 0
})

gsap.from('h1', 2, {
    delay: 1.5,
    opacity: 0,
    y: -100,
    ease: 'power1.out'
})

gsap.from('#btn_module', 1.5, {
    delay: 4,
    y: 100,
    opacity: 0
})



const api = {
    infections: "https://covid-api.mmediagroup.fr/v1/cases",
    vaccinations: "https://covid-api.mmediagroup.fr/v1/vaccines"
}

const input = document.querySelector('#input');
input.addEventListener('keypress', enter);

function enter(e) {
    if (e.keyCode === 13) {
    const nameCity = document.querySelector('#input').value;
    let changeCity = nameCity.charAt(0).toUpperCase() + nameCity.slice(1);
        
        if (changeCity === 'Us') {
        changeCity = nameCity.toUpperCase();
        }

        else if (Number(nameCity)) {
            Swal.fire({
                icon: 'error',
                text: 'Enter current country!',
                customClass: 'swal-width'
              })
            return false
        }

    getInfections(changeCity);
    getVaccinations (changeCity);
    }
}

async function getInfections(city) {
    const res = await fetch(`${api.infections}?country=${city}`);
    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    document.querySelector('#main').style.display = 'block';
    document.querySelector('#btn_module').style.display = 'none';
    document.querySelector('#btnReset').style.display = 'block';
    

    let city = document.querySelector('#city');
    city.textContent = `${result.All.country}`;

    let confirmed = document.querySelector('#confirmed');
    confirmed.textContent = `${parseInt(result.All.confirmed).toLocaleString()}`;

    let recovered = document.querySelector('#recovered');
    recovered.textContent = `${parseInt(result.All.recovered).toLocaleString()}`;

    let deaths = document.querySelector('#deaths');
    deaths.textContent = `${parseInt(result.All.deaths).toLocaleString()}`;
    
    let population = document.querySelector('#population');
    population.textContent = `${parseInt(result.All.population).toLocaleString()}`;
    
}

async function getVaccinations(city) {
    const resTwo = await fetch(`${api.vaccinations}?country=${city}`);
    const resultTwo = await resTwo.json();
    displayResultTwo(resultTwo);
}

function displayResultTwo(resultTwo) {
    let administered = document.querySelector('#administered');
    administered.textContent = `${parseInt(resultTwo.All.administered).toLocaleString()}`;
    
    let vaccinated = document.querySelector('#vaccinated');
    vaccinated.textContent = `${parseInt(resultTwo.All.people_vaccinated).toLocaleString()}`
    
    let partiallyVaccinated = document.querySelector('#partially_vaccinated');
    partiallyVaccinated.textContent = `${parseInt(resultTwo.All.people_partially_vaccinated).toLocaleString()}`
}

    const btnReset = document.querySelector('#btnReset');
    btnReset.addEventListener('click', () => {
        location.reload();
    })


const date = document.querySelector('.now-date');
let now = new Date() 

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let mounth = months[now.getMonth()];
let day = days[now.getDay()];
let number = now.getDate();
let year = now.getFullYear();

date.textContent = `${day} ${number} ${mounth} ${year}`






