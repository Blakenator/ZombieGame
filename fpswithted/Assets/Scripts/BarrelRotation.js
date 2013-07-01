#pragma strict
var isOn:boolean;
private var alreadyOn:boolean;
var rotationSpeed:int;
var animationObj:GameObject;
var audioBuzz:AudioClip;

function Start () {

}

function setOn(val:boolean){
	isOn=val;
	if(val){
		if (!alreadyOn){
			if(!animationObj.animation.isPlaying){
				animationObj.animation["turretSpinUp"].speed=1;
				animationObj.animation.Play();
			}
			alreadyOn=true;
		}
	}else{
		if(alreadyOn){
			if(!animationObj.animation.isPlaying){
				animationObj.animation["turretSpinUp"].speed=-1;
				animationObj.animation.Play();
			}
			alreadyOn=false;
		}

	}
}

function Update () {
	if(isOn && !animationObj.animation.isPlaying){
		if(!audio.isPlaying){
			audio.PlayOneShot(audioBuzz,0.5);
		}
		gameObject.transform.Rotate(rotationSpeed*Time.deltaTime,0,0);
	}
}