function Start () {
}
private var on = false;
var brunoSound : AudioClip;
var brunoSound2 : AudioClip;


function Update(){
	if(Input.GetKeyDown(KeyCode.L)){
		if(on){
			light.intensity =0;
			on = false;
			audio.PlayOneShot(brunoSound);
			}
		else {
			light.intensity =2;
			on = true;
			audio.PlayOneShot(brunoSound2);
			}
	}
}