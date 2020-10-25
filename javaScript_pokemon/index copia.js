
window.onload = function() {
    setTimeout(() => {
    document.querySelector('.loading1').classList.add('hide');
    document.querySelector('.loading2').classList.add('hide');

}, 1500)};

window.onload = function() {
    setTimeout(() => {
    document.querySelector('.username0').classList.remove('hide');
    document.querySelector('.username1').classList.remove('hide');

}, 2000)};

async function getPictures(pictureURL){
    try{
        const thePicture = await fetch(pictureURL);
        return thePictureParse.thumbnail; 
    } catch(error){
        console.log(error);
    }
}

async function getRandomUser(){
    const myRandomUser = await fetch("https://randomuser.me/api/?results=2");
    const userData = await myRandomUser.json();
    const userDataParsed = userData.results 

    console.log(userDataParsed);

    for(let i = 0; i < userDataParsed.length; i++){

        let picture = userDataParsed[i].picture.thumbnail;
        console.log(picture);
        let usersPictures = await getPictures(picture);

        let createUser = document.querySelector(`.username${[i]}`);
        createUser.innerHTML += (`<img src="${usersPictures}"/>
                                <p>Usuario: ${userDataParsed[i].login.username}</p>
                                <p>Ubicación: ${userDataParsed[i].location.city}, ${userDataParsed[i].location.country}</p>
                                `)
    }
}

//for para coger los datos que quiero del array
//meter datos en HTML debajo de los inputs
//username; city, country;picture.thumbnail border radius

getRandomUser();

let fightInfo = document.querySelector(".fight-info");
let createParagraph = document.createElement("p"); 

class PlayersDragonBall {
    constructor(name, life, damage, shield){
        this.playerName = name; 
        this.playerLife = life;
        this.playerDamage = damage;
        this.playerShield = shield;
    }

    attack (objplayerAttacking, objplayerDefending) {
        let objplayerDefendingLifeLeft = objplayerDefending.playerLife - objplayerAttacking.playerDamage + objplayerDefending.playerShield;
        fightInfo.innerHTML += (`<p>¡${objplayerAttacking.playerName} le quita ${objplayerAttacking.playerDamage - objplayerDefending.playerShield} de vida a ${objplayerDefending.playerName}! Le queda ${objplayerDefendingLifeLeft} de vida.</p>`);
        objplayerDefending.playerLife = objplayerDefendingLifeLeft;
    
        return objplayerDefendingLifeLeft
    };
}

let player1 = new PlayersDragonBall("Vegeta", document.querySelector(".player1-life"), document.querySelector(".player1-damage"), document.querySelector(".player1-shield"));
let player2 = new PlayersDragonBall("Goku", document.querySelector(".player2-life"), document.querySelector(".player2-damage"), document.querySelector(".player2-shield"));

let players = [player1, player2];


function collectValues() {
    for (let player of players){
        player.playerLife = Number(player.playerLife.value);
        player.playerDamage = Number(player.playerDamage.value);
        player.playerShield = Number(player.playerShield.value);
    };
};

function inputControl() {
    for (let player of players){
        if(player.playerLife < 11 || player.playerLife > 20){
            alert("Por favor, introduce valores diferentes para Vida: mínimo 11, máximo 20.");
        
        } else if(player.playerDamage < 6|| player.playerDamage > 10){
            alert("Por favor, introduce valores diferentes para Ataque: mínimo 6, máximo 10.");
        
        } else if(player.playerShield < 1 || player.playerShield > 5){
            alert("Por favor, introduce valores diferentes para Defensa: mínimo 1, máximo 5.");
        
        } 
        // else if(player.playerLife !== Number || player.playerDamage !== Number || player.playerShield !== Number){
        //     alert("Por favor, revisa los valores introducidos. Tienen que ser números.");
        // }
    };
};

function whoStarts() {
    let randomStart = Math.floor(Math.random() * 2);
    let currentPlayer = false;

    if(randomStart === 1){        
        fightInfo.innerHTML += (`<p>¡Empieza a atacar ${player1.playerName}!</p>`);
        currentPlayer = player1;

    } else {
        fightInfo.innerHTML += (`<p>¡Empieza a atacar ${player2.playerName}!</p>`);
        currentPlayer = player2;
    };

    return currentPlayer.playerName;
}

function anybodyAlive(){

    if(player1.playerLife > 1 && player2.playerLife > 1){
        fightInfo.innerHTML += ("<p>¡La pelea continúa!</p>");

    } else { 
        
        if(player1.playerLife > 0 && player2.playerLife <= 0){
        fightInfo.innerHTML += (`<p>La pelea ha terminado :( </p>
                                <p>¡¡${player1.playerName.toUpperCase()} GANA LA PARTIDA!!</p>`);

        } else if(player2.playerLife > 0 && player1.playerLife <= 0){
        fightInfo.innerHTML += (`<p>La pelea ha terminado :( </p>
                                <p>¡¡${player2.playerName.toUpperCase()} GANA LA PARTIDA!!</p>`);
        } 
    };
}

let fightButton = document.querySelector(".fight-button");

fightButton.addEventListener("click", function(){
    
    collectValues();

    inputControl();

    console.log(players);

    let currentPlayer = whoStarts();
       
    while(player1.playerLife > 0 && player2.playerLife > 0){ 
    
        if(currentPlayer === "Vegeta"){
            
            player1.attack(player1, player2);
            currentPlayer = "Goku";
        
        } else if (currentPlayer === "Goku"){
                player2.attack(player2, player1);
                currentPlayer = "Vegeta";
        }    
        anybodyAlive();
    }
        
});




// si no le pasasmos callback(), nunca llegará a la segunda parte xq no estoy controlando que devuelva la función al flujo noraml.
//callback arriba es el parámetro, no está definida. Abajo definimos ese parámetro.



/// OK // pedir valores para vida, etc - inputs;
/// OK // conectar inputs con JS - quersySelectos, etc;
/// OK // hacer click en fight - eventListener;
/// OK // que recoja los valores que se le dan - .value;
/// OK // empiece uno u otro de manera aleatoria - random;
/// OK // ataque 1 = vida 2 - (daño 1 - escudo 2) y viceversa;

// OK // vida tiene que ser un valor dinámico. Recoger el último valor conocido de vida y restar de ahí al volver a atacar - asignando lifeleft a la vida de los players!!!
// OK // que se repitan los ataques intercalados hasta que uno de los dos tenga vida >= 0.
// OK// comprobamos vida --> ataca 1 --> ataca 2 --> comprobamos vida --> ataca 1 --> ataca 2....

// OK // cuando vida de uno === 0, partida acaba, gana jugador que aún tenga vida
// podemos crear funciones más pequeñas fuera de la función del eventListener y llamarlas desde fuera cuando las necesitemos