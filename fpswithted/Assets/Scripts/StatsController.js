#pragma strict

//in the updates a negative value lowers the stat
private var stamina:float=100.0;
private var health;
private var hunger:float=100.0;
private var thirst:float=100.0;

var staminaGUI:GUIText;
var healthGUI:GUIText;
var hungerGUI:GUIText;
var thirstGUI:GUIText;

function Start(){	
	staminaGUI.text="Stamina: "+stamina;
	hungerGUI.text="Hunger: "+hunger;
	thirstGUI.text="Thirst: "+thirst;
}
function getStamina(){
	return stamina;
}
function Update(){
}

function updateStamina (ammount:float){
	stamina+=ammount;
	staminaGUI.text="Stamina: "+Mathf.Round(stamina*10)/10;
}

function updateHealth (ammount:float){
	//health+=ammount;
	//healthGUI.text="Stamina: "+stamina;
}

function updateHunger (ammount:float){
	hunger+=ammount;
	hungerGUI.text="Hunger: "+hunger;
}

function updateThirst (ammount:float){
	thirst+=ammount;
	thirstGUI.text="Thirst: "+thirst;
}