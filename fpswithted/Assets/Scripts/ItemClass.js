#pragma strict
public class ItemClass extends MonoBehaviour{
	private var Enabled:boolean=false;
	private var stats:StatsController;
	private var Value:float=10;
	private var targetGuiText:GUIText;
	private var firstStart:boolean=true;
	private var distance:float;
	private var playert:Transform;
	private var myTransform:Transform;
	function Start () {
		playert=GameObject.Find("player").transform;
		stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
		targetGuiText=GameObject.Find("GUI Text").GetComponent(GUIText);
		myTransform=transform;
		Debug.Log(targetGuiText.gameObject);
	}
	function ItemClass(val:float){
		Value=val;
	}
	function OnStart(){
		firstStart=false;
		targetGuiText=GameObject.Find("GUI Text").GetComponent(GUIText);
	}
	function Update () {
		if(Time.timeScale>0){
			if(Enabled){
				targetGuiText.text = gameObject.name;
				if(Input.GetButton("Fire1")){
					ItemUse();
				}
			}
			
			distance=Vector3.Distance(myTransform.position,playert.position);
			if(!rigidbody.isKinematic&&distance>25){
				rigidbody.isKinematic=true;
			}else if(rigidbody.isKinematic&&distance<=25&myTransform.root!=playert){
				rigidbody.isKinematic=false;
				rigidbody.WakeUp();
			}
			
		}
	}
	function PrimaryAction(){
		if(Enabled){
			ItemUse();
		}
	}
	function ItemUse(){//include this in new objects
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
		gameObject.layer=11;
	}
}