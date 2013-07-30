#pragma strict

function pickUp(){
	GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).addObject(gameObject);
	transform.parent=GameObject.Find("WeaponAnchor").transform;
	
	transform.localPosition=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	transform.localRotation=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepRot(gameObject.name);
	rigidbody.isKinematic=true;
	gameObject.collider.enabled=false;
	this.enabled=false;
	
	//Add ammo if same gun
	//fix colliders
	//make better?
}