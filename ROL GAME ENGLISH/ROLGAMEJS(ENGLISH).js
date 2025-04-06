let xp = 0;
let health = 100;
let gold = 100;
let mana= 50;
let currentWeapon = 0;
let currentSpell = 0;
let fighting;
let monsterHealth;
let inventory = ["palo"];
let key = 0;
let open = 0;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const manaText = document.querySelector("#manaText");
const placeText = document.querySelector("#placeText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick',      power: 5 },
  { name: 'dagger',      power: 30 },
  { name: 'hammer',  power: 50 },
  { name: 'sword',    power: 70 }
];
const spells=[
  { name: 'cold wind ༄',         power: 10},
  { name: 'poison ♨',              power: 50},
  { name: 'Freezing frost. ❄', power: 80 },
  { name: 'demoniac fire',     power: 130 }
];
const monsters = [
  {
    name: "Sneake",
    level: 15,
    health: 15
  },
  {
    name: "Were Wolf",
    level: 50,
    health: 60
  },
  {
    name: "Guerrero Mayor",
    level: 200,
    health: 300
  },
  {
    name: "Demon King",
    level: 150,
    health: 170
  },
  {
    name: "Dragon",
    level: 380,
    health: 500
  }
]

const locations = [
  {
    name: "city", /*0*/
    "button text": ["⟰ Go to the Store ", "◮ Go to the cave", "🃤 Go to train","♘ Go to the market","➷ Fight Dragon"],
    "button functions": [goUno, goDos, goTres,  goCuatro, fightDragon],
    text: "You are in the city."
  },
  {
    name: "store",  /*1*/
    "button text": ["䷬ Go to the city ䷬", "+10 health (10 gold) ❤", "+ 1 weapon (10, 60, 100, 140 gold) 𒉔","+ 10 mana (5 oro) ㊅","+ 1 key (40 gold) ⥉"],
    "button functions": [goCasa, buyHealth, buyWeapon, buyMana, buyKey],
    text: "You are in the store"
  },
  {
    name: "cave",  /*2*/
    "button text": ["䷬ Go to the city ䷬", "𓆘𓆘𓆘 Sneake (level:15 health:15)", "➷ Hit rock.","𓃥𓃥𓃥 Were Wolf (level:80 health:300)","𓄃𓄃𓄃 Demon King (level:150  health:170)"],
    "button functions":[goCasa, fightSnake, fightStone,  fightWolf, fightDemonKing],
    text: "You are in the cave"
  },
  {
    name: "train",  /*3*/
    "button text": ["䷬ Go to the city ䷬", "𓀠𓀠𓀠 Physical training. (You gain XP and mana, but lose health.)", "≋ Boost Spell (Require 40 xp )","𓀺𓀺𓀺 Meditate (You gain health but lose mana.)","➷ Supreme warrior level: 300 health: 200"],
    "button functions": [goCasa, train, boostSpell,  meditation, fightWarrior],
    text: "You are in the training room."
  },
  {
    name: "Market",  /*4*/
    "button text": ["䷬ Go to the city", "㊅ +10 mana (5 gold)", " ☢ Steal (If they catch you, they might Hiting)","▤ Open treasure","prostitute yourself (⩾﹏⩽)"],
    "button functions": [goCasa, buyMana, steal,  treasure, prostitution],
    text: "You are in the market"
  },
  {
    name: "fight",  /*5*/
    "button text": ["䷬ Run away", "𒉔 attack", "⤸ Dodge","♨ Spell power","⌧ Cover"],
    "button functions": [goDos, attack, dodge,  spanSpell, dodge],
    text: "You are Fighting"
  },
  {
    name: "lose",  /*6*/
    "button text": ["restart ►", "restart ►", "restart ►","restart ►","restart ►"],
    "button functions": [restart , restart, restart, restart, restart],
    text: " (╥﹏╥)  I knew you couldn't, go study, donkey. ☠"
  },
  {
    name: "win", /*7*/
    "button text": ["restart", "restart", "restart","restart","restart"],
    "button functions": [restart, restart, restart, restart, restart],
    text: "You won... but it was just luck "
  },
  {
    name: "Kill monster", /*8*/
    "button text": ["Go to the city ䷬", "Vs Sneake (level:2 helath:15)", "Magic Chest","Vs Were Wolf (level:50 health:60)","Vs DemonKing (level:150  health:300)"],
    "button functions": [goCasa, fightSnake, treasure,  fightWolf, fightDemonKing],
    text: "You killed your opponent, you gain experience and gold."
  }
  
];

// initialize buttons
button1.onclick = goUno;
button2.onclick = goDos;
button3.onclick = goTres;
button4.onclick = goCuatro;
button5.onclick = goCinco;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button5.innerText = location["button text"][4];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  button5.onclick = location["button functions"][4];
  text.innerHTML = location.text;
}

function goCasa() {
  
  update(locations[0]);
}
function goUno() {
  update(locations[1]);
}
function goDos() {
  update(locations[2]);
}
function goTres() {
  update(locations[3]);
}
function goCuatro() {
  update(locations[4]);
}
function goCinco() {
  update(locations[5]);
}
function buyHealth(){
  if(gold>=10){
    gold-=10;
    health+=10;
    healthText.innerText=health;
    goldText.innerText=gold;
    text.innerText="you gain 10 points of life";
  }else{
    text.innerText="go back to work, you fucking misery";
  }
}
function buyWeapon(){
 if(currentWeapon<weapons.length-1){
   
   if(gold>=30){
      gold-=2*weapons[currentWeapon].power;
      currentWeapon++;
      let newWeapon=weapons[currentWeapon].name;
      inventory.push(newWeapon);
      text.innerText="You bought a "+newWeapon+" with a damage of "+weapons[currentWeapon].power+" your inventory is: "+inventory;
      goldText.innerText=gold;
    }else{
      text.innerText="go back to work, you fucking misery";
  }
 }else{
    text.innerText="There are no more weapons to improve"
 }
}

function buyMana(){
  if(gold>=5){
    mana+=10;
  gold-=5;
  manaText.innerText=mana;
  goldText.innerText=gold;
    text.innerText="You gain 10 mana";
  }else{
    text.innerText="no mana for the poor people";
  }
}

function buyKey(){
 if(gold>=40){
    gold-=40;
    key++;  
    text.innerText="You got the key, it seems to open a treasure...."
   goldText.innerText=gold;
 }else{
   text.innerText="Now I give you the key, but in your ass... you're missing gold.";
 }
}

function treasure(){
  if(open<1){
     if (key>0){
        key--;
        open++;
        health+=120;
        gold+=15;
        mana+=80;
        manaText.innerText=mana;
        goldText.innerText=gold;
        healthText.innerText=health;
        text.innerText="+120 life + 15 gold + 80 mana";
     }else{
        text.innerText="You have already collected the contents of this chest.";
     }
  }else{
    text.innerText="You have already collected the contents of this chest."
  }
  
}

function fightSnake(){
  fighting=0;
  goFight();
}

function fightStone(){
  health--;
  healthText.innerText=health;
  text.innerText="-1 of life, don't be a donkey, how are you going to fight with a stone?";
}


function fightWolf(){
  fighting=1;
  goFight();
}

function fightDemonKing(){
  fighting=3;
  goFight();
}

function fightWarrior(){
  fighting=2;
  goFight();
}

function fightDragon(){
  fighting=4;
  goFight();
}

function train(){
  xp+=0.5;
  mana+=0.5;
  health--;
  manaText.innerText=mana;
  xpText.innerText=xp;
  healthText.innerText=health;
  text.innerText="You gain 0.5 mana and xp, but lose 1 life.";
}

function meditation(){
  health+=2;
  mana-=0.5;
  healthText.innerText=health;
  manaText.innerText=mana;
  text.innerText="You gain 2 life but lose 0.5 mana.";
}

function steal(){
  if(health>20){
    if(Math.random()>.45){
       let ganancia=Math.floor(Math.random()*100);
       gold+=ganancia;
       goldText.innerText=gold;
       text.innerText="You are a politician, successful theft, you stole: "+ganancia+" of gold";
     }else{
       health=1;
       healthText.innerText=health;
       text.innerText="You really are a donkey, you're lucky to be alive.";
     }
  }else{
    text.innerText="How the hell do you want to steal with such a short life? go and prostitute yourself.";
  }
}

function prostitution(){
 if(health>=1){ 
  num=Math.random();
  health--;
  healthText.innerText=health;
  if(num<0.06){
    text.innerText="Oh im coming (+50 gold, -1 life)";
    gold+=10;
    goldText.innerText=gold;
  }else if(num<0.3){
    text.innerText="you see that it was possible? you're getting the fucking vibe wey (+2 gold, -1 life)";
    gold+=2;
    goldText.innerText=gold;
  }else if(num<0.75){
    text.innerText="If having sex were a sport, you would be an invalid (+1 gold, -1 life).";
    gold++;
    goldText.innerText=gold;
  }else if(num<0.95){
    text.innerText="Even prostitution requires a vocation, poor service (+1 gold, -1 life).";
    gold++;
    goldText.innerText=gold;
  }
 }else{
   lose();
 }
}

function boostSpell(){
  if(currentSpell<3){
    if(xp>=40){
       xp-=40;
       currentSpell++;
       text.innerText="You have improved  "+spells[currentSpell].name;
       xpText.innerText=xp;
    }else{
       text.innerText="You're still a kid, go earn xp donkey.";
    }  
  }else{ text.innerText="You have attained supreme power";
  }
}

function goFight(){
  update (locations[5]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterHealthText.innerText = monsterHealth;
  monsterName.innerText = monsters[fighting].name;
}

function attack(){
  text.innerText="You attacked with "+ weapons[currentWeapon].name+" you made "+weapons[currentWeapon].power+" of damage";
  health-=monsters[fighting].level;
  if(health<=0){
  lose();
  }
  monsterHealth-=weapons[currentWeapon].power;
  monsterHealthText.innerText=monsterHealth;
  healthText.innerText=health;
  if(monsterHealth<=0){
    if(fighting==4){
      win();
  }else{
    defeatMonster()
}
}
}

function dodge(){
  text.innerText="That asshole of your opponent couldn't put his fist in you";
}
function spanSpell(){
   if (mana>=40){ 
      monsterHealth-=spells[currentSpell].power;
      monsterHealthText.innerText=monsterHealth;
      text.innerText="You cast "+spells[currentSpell].name+" you do "+spells[currentSpell].power+" of damage";
      mana-=spells[currentSpell].power;
      manaText.innerText=mana;
      if(monsterHealth<=0){
         if(fighting==4){
            win();
         }else{
         defeatMonster()
         }
      }
   }else{
      text.innerText="you have no mana donkey";
   }
   }

function restart(){
 xp = 0;
 health = 100;
 gold = 100;
 mana= 50;
 currentWeapon = 0;
 inventory = ["stick"];
 key = 0;
  update(locations[0]);
  xpText.innerText=xp;
  goldText.innerText=gold;
  healthText.innerText=health;
  manaText.innerText=mana;
}
  
  function win(){
    text.innerText="Congratulations asshole you won"
    update(locations[7]);
  }
  
   function lose(){
    text.innerText="I knew you couldn't win, go back to your studies."
    update(locations[6]);
  }
  
   function defeatMonster(){
     gold+=monsters[fighting].level*2;
     xp+=monsters[fighting].level/10;
     goldText.innerText=gold;
     xpText.innerText=xp;
     update(locations[8])
   }
