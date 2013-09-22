#pragma strict
private var Enabled:boolean=false;

function Start () {
	
}

function Update () {
	if(Time.timeScale>0){
		if(Enabled){
			if(Input.GetButton("Fire1")){
				ItemUse();
			}
		}
	}
}

function ItemUse(){
	animation.Play();
}
function setEnabled(val:boolean){
	Enabled=val;
}