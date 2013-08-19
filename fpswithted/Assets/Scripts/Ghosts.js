var Ghosts : AudioClip;
var audio1 = false;
var controller:CharacterController;
function Update () {
	if (audio1 == false && Input.GetButton("Vertical")&&controller.isGrounded){
		audioclip = Ghosts;
		audio.Play();
		audio1 = true;
	}else if (audio1 == false && Input.GetButton("Horizontal")&&controller.isGrounded){
		audioclip = Ghosts;
		audio.Play();
		audio1 = true;
	}
	else if (Input.GetButtonUp("Vertical") || Input.GetButtonUp("Horizontal")){
		audio.Stop();
		audio1 = false;
	}else if(!controller.isGrounded){
		audio.Stop();
		audio1 = false;
	}
	
}