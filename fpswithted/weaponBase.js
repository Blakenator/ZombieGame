
class weaponBase{

	var fireRate:double;
	var maxAmmo:int;
	var currAmmo:int;
	var accuracy:double;
	var isEnabled:boolean;
	var bulletSpawn:Transform;
	var fireAudio:AudioClip;
	var maxClips:int;
	var currClips:int;
	
	function reload(){
		currAmmo=maxAmmo;
		currclips-=1;
	}
	
	function setEnabled(enabled:boolean){
		isEnabled=enabled;
	}
	
	function SprayDirection() {
		var vx = (1 - 2 * Random.value) * accuracy;
		var vy = (1 - 2 * Random.value) * accuracy;
		var vz = 1.0;
		return bulletspawn.transform.TransformDirection(Vector3(vx,vy,vz));
	}
	
	function getCurrAmmo()
	{
		return currAmmo;
	}
	function getCurrClips()
	{
		return currClips;
	}

}