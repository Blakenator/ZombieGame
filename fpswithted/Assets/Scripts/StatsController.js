#pragma strict

//in the updates a negative value lowers the stat
private static var stamina:double=100.0;
private static var health:float =100.0;
private static var hunger:float=100.0;
private static var thirst:float=100.0;

var size:Vector2;

var healthpos:Vector2;
var healthBarFull:Texture2D;
var healthBarEmpty:Texture2D;

var stampos:Vector2;
var stamBarFull:Texture2D;
var stamBarEmpty:Texture2D;

var hungerpos:Vector2;
var hungerBarFull:Texture2D;
var hungerBarEmpty:Texture2D;

var thirstpos:Vector2;
var thirstBarFull:Texture2D;
var thirstBarEmpty:Texture2D;

var hungerDegrade:float=-.1;
var thirstDegrade:float=-.1;

var healthDegrade:float=-.1;
//var hungerDegrade:float=-.1;
function getStamina(){
	return stamina;
}
function Update(){
	updateHunger(hungerDegrade*Time.deltaTime);
	updateThirst(thirstDegrade*Time.deltaTime);
	if(hunger<=0||thirst<=0){
		updateHealth(healthDegrade*Time.deltaTime);
	}
}

public static function updateStamina (ammount:float){
	stamina+=ammount;
	if(stamina<0){
		stamina=0;
	}
	//staminaGUI.text="Stamina: "+Mathf.Round(stamina*10)/10;
}

public static function updateHealth (ammount:float){
	health+=ammount;
	if(health<0){
		health=0;
	}
}

public static function updateHunger (ammount:float){
	hunger+=ammount;
	if(hunger<0){
		hunger=0;
	}
}

public static function updateThirst (ammount:float){
	thirst+=ammount;
	if(thirst<0){
		thirst=0;
	}
}


function OnGUI()
{
	//Health
	// draw the background:
    GUI.BeginGroup (new Rect (healthpos.x, healthpos.y, size.x, size.y));
        GUI.Box (Rect (0,0, size.x, size.y),healthBarEmpty);
    	// draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * (health/100), size.y));
            GUI.Box (Rect (0,0, size.x, size.y),healthBarFull);
        GUI.EndGroup ();
    GUI.EndGroup ();
 	
	//end health
	
	//staminia
	GUI.BeginGroup (new Rect (stampos.x, stampos.y, size.x, size.y));
        GUI.Box (Rect (0,0, size.x, size.y),stamBarEmpty);
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * (stamina/100), size.y));
            GUI.Box (Rect (0,0, size.x, size.y),stamBarFull);
        GUI.EndGroup ();
    GUI.EndGroup ();
 	//GUI.Box (Rect (Screen.width/2,Screen.height/2, 10, 10),stamBarEmpty);
	//end staminia
	
	//hunger
	GUI.BeginGroup (new Rect (hungerpos.x, hungerpos.y, size.x, size.y));
        GUI.Box (Rect (0,0, size.x, size.y),hungerBarEmpty);
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * (hunger/100), size.y));
            GUI.Box (Rect (0,0, size.x, size.y),hungerBarFull);
        GUI.EndGroup ();
    GUI.EndGroup ();
 	//GUI.Box (Rect (Screen.width/2,Screen.height/2, 10, 10),hungerBarEmpty);
	//end hunger
	
	
	//thirst
	GUI.BeginGroup (new Rect (thirstpos.x, thirstpos.y, size.x, size.y));
        GUI.Box (Rect (0,0, size.x, size.y),thirstBarEmpty);
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * (thirst/100), size.y));
            GUI.Box (Rect (0,0, size.x, size.y),thirstBarFull);
        GUI.EndGroup ();
    GUI.EndGroup ();
 	//GUI.Box (Rect (Screen.width/2,Screen.height/2, 10, 10),thirstBarEmpty);
	//end thirst
	
	GUI.Box (Rect (Screen.width/2,Screen.height/2, 10, 10),healthBarEmpty);//CrossHair
} 