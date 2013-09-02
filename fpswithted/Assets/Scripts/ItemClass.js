#pragma strict




public class ItemClass extends MonoBehaviour{
	private var Enabled:boolean=false;
	private var stats:StatsController;
	private var Value:float=10;
	private var targetGuiText:GUIText;
	
	private var firstStart:boolean=true;
	
	//private var distance:float;
	//private var player:Transform;
	
	function Start () {
		//player=GameObject.Find("player").transform;
		stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
		targetGuiText=GameObject.Find("GUI Text").GetComponent(GUIText);
	}
	
	function ItemClass(val:float){
		//stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
		//targetGuiText=GameObject.Find("GUI Text").GetComponent(GUIText);
		Value=val;
	}
	
	function OnStart(){
		firstStart=false;
		targetGuiText=GameObject.Find("GUI Text").GetComponent(GUIText);
	}
	
	function Update () {
		if(firstStart){
			OnStart();
		}
		if(Time.timeScale>0){
			if(Enabled){
				targetGuiText.text = gameObject.name;
				if(Input.GetButton("Fire1")){
					ItemUse();
				}
			}
		}
	}
	
	function ItemUse(){
		
		
	}
	
	function setEnabled(val:boolean){
		Enabled=val;
	}
	
	function getVal(){
		return Value;
	}
	
	function OnPickup(){
		GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).addObject(gameObject);
		
		transform.parent=GameObject.Find("WeaponAnchor").transform;
		transform.localPosition=Vector3(.1,-.5,-.65);//GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
		transform.localRotation.x=0;//GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepRot(gameObject.name);
		transform.localRotation.y=0;
		transform.localRotation.z=0;
		rigidbody.isKinematic=true;
		gameObject.collider.enabled=false;
		
		Destroy(gameObject.collider);
		
		gameObject.tag="Pickup";
	}
}