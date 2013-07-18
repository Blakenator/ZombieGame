
var pos : Vector2 = new Vector2(20,40);
var size : Vector2 = new Vector2(60,20);
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;
var player:player;


private var barDisplay : double ;

//barDisplay=player.gethealth();

function OnGUI()
{
 	
    // draw the background:
    GUI.BeginGroup (new Rect (pos.x, pos.y, size.x, size.y));
    
        GUI.Box (Rect (0,0, size.x, size.y),progressBarEmpty);
 		
 		
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * barDisplay, size.y));
            GUI.Box (Rect (0,0, size.x, size.y),progressBarFull);
        GUI.EndGroup ();
 
    GUI.EndGroup ();
 
 
 	GUI.Box (Rect (Screen.width/2,Screen.height/2, 10, 10),progressBarEmpty);
 
 
} 
 
function Update()
{
    // for this example, the bar display is linked to the current time,
    // however you would set this value based on your desired display
    // eg, the loading progress, the player's health, or whatever.
    
    barDisplay = player.gethealth()/100;
}