#pragma strict
var gameState:String="running";
var player:Transform;
var MainCamera:MouseLook;
var margin:Vector2=Vector2(15,15);
var gunSwitcher:GunSwitcher;
private var inventoryArray:Array;
var defaultImage:Texture;
private var selectedInt:int=0;
var numberWide:int=3;

function Start () {
	//gameState="running";
}

function Update(){
	if(Input.GetButtonDown("Inventory")){
		if(gameState=="running"){
			Time.timeScale=0;
			gameState="paused";
			var tmp:MouseLook=player.GetComponent("MouseLook");
			tmp.isPaused=true;
			MainCamera.isPaused=true;
			inventoryArray=gunSwitcher.GetInventory();
		}else{
			gameState="running";
			Time.timeScale=1;
			var temp:MouseLook=player.GetComponent("MouseLook");
			temp.isPaused=false;
			MainCamera.isPaused=false;
		}
		
	}
	//Debug.Log(gameState);
}
private var scrollPos=Vector2.zero;
			
function OnGUI(){
	if(gameState=="paused"){
		var box:Rect=Rect(margin.x,margin.y,Screen.width-margin.x*2,Screen.height-margin.y*2);
		//GUI.Box(box,GUIContent.none);
		GUILayout.BeginVertical();
		GUILayout.BeginArea(box,GUI.skin.GetStyle("box"));
			scrollPos=GUILayout.BeginScrollView(scrollPos);//,GUILayout.Width(box.width),GUILayout.Height(box.height));
				//GUILayout.SelectionGrid()
				var imgs:Texture[]=new Texture[inventoryArray.length-1];
				for (var i=0;i<imgs.Length;i++){
					var tmp:GameObject=inventoryArray[i];
					if(tmp.GetComponent(inventoryItem).getImage()){
						imgs[i]=tmp.GetComponent(inventoryItem).getImage();
					}else{
						imgs[i]=defaultImage;
					}
				}
				selectedInt=GUILayout.SelectionGrid(selectedInt,imgs,numberWide);
				if(selectedInt!=gunSwitcher.getCurrGunIndex()){
					gunSwitcher.setCurrentIndex(selectedInt);
				}
			/*for(var i2=0;i2<inventoryArray.length/3;i2++){
				GUILayout.BeginHorizontal();
				for(var i=0;i<inventoryArray.length/2;i++){
					if(i+i2*4>=inventoryArray.length){
						break;
					}
					var tmp:GameObject=inventoryArray[i+i2*4];
					var obj:inventoryItem=tmp.GetComponent(inventoryItem);
					if(InventoryItem(obj.getImage(),tmp.name)){
						gunSwitcher.setCurrentIndex(i+i2*4);
					}
				}
				GUILayout.EndHorizontal();
			}*/
			GUILayout.EndScrollView();
				if(GUILayout.Button("Return")){
					gameState="running";
					Time.timeScale=1;
					var temp:MouseLook=player.GetComponent("MouseLook");
					temp.isPaused=false;
					MainCamera.isPaused=false;
				}
			GUILayout.EndVertical();
		GUILayout.EndArea();
	}
}

function InventoryItem(image:Texture,name:String){
	GUILayout.BeginVertical();
		GUILayout.Box(name);
		if(!image){
			image=defaultImage;
		}
		var result = GUILayout.Button(image);
	GUILayout.EndVertical();
	return result;
}