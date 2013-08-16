#pragma strict

//function Start () {

//}

//function Update () {

//}
private var cam:Camera;
var rect = Rect(0,0,100,100);
var offset =  Vector2(-10, 0);
private var textcenteredStyle:GUIStyle;
//var background:Texture2D;

function Start(){
	cam =Camera.main;
	rect.x=Screen.width/2;
	rect.y=Screen.height/2;
	//Debug.Log(background instanceof GameObject);
	
	//var allComponents = gameObject.GetComponents (Component);
	
	//Debug.Log(allComponents instanceof player);
	
}
function OnGUI(){
	
	var hit:RaycastHit;
	if(Physics.Raycast (cam.transform.position, cam.transform.forward, hit, 6)){
		var screenPos : Vector3 = cam.WorldToScreenPoint(hit.transform.gameObject.transform.position+offset);
		
		if(hit.transform.gameObject.CompareTag("Pickup")){
			var obj=hit.transform.gameObject;
			Debug.Log("TEST!");
			
			textcenteredStyle = GUI.skin.GetStyle("Label");
			textcenteredStyle.fontSize=15;
			
			
			
			//rect.x = screenPos.x;
    		//rect.y = screenPos.y - rect.height; 
    		
    		//GUI.Label(rect, hit.transform.gameObject.name);
			
			
			
			
			GUI.BeginGroup (rect);//new Rect(Screen.width/2,Screen.width/2, 150, 150));
			
		        GUI.Box(Rect (0,0, 150, 150),obj.name);//object picture?
		    	//GUI.Label(Rect (0,0, 150, 150), obj.name);
		    	
		    	
		    	var Ammo:AmmoObject=obj.GetComponent(AmmoObject);
		    	var Food:FoodItem=obj.GetComponent(FoodItem);
		    	var Water:WaterItem=obj.GetComponent(WaterItem);
		    	
		    	if(Ammo!=null){
		    		//Debug.Log(allComponents instanceof type);
		    		GUI.Label(Rect (0,0, 150, 150), "Ammo: "+Ammo.getVal().ToString());
		    	}else if(Food!=null){
		    		GUI.Label(Rect (0,0, 150, 150), "Food value: "+Food.getVal().ToString());

		    	}else if(Water!=null){
		    		GUI.Label(Rect (0,0, 150, 150), "Water value: "+Water.getVal().ToString());
		    	}
		    	
		        //GUI.BeginGroup (new Rect (0, 0, 150,150));
		            //GUI.Box (Rect (0,0, 150, 150),background);
		       //GUI.EndGroup ();
		       
		    GUI.EndGroup ();
		 	//GUI.Box (Rect (Screen.width/2,Screen.height/2, 10, 10),healthBarEmpty);
		}
	}
}