var Ghosts : AudioClip;
var audio1 = false;

function Update () {
	if (audio1 == false && Input.GetButton("Vertical")){
		audioclip = Ghosts;
		audio.Play();
		audio1 = true;
	}
	if (audio1 == false && Input.GetButton("Horizontal")){
		audioclip = Ghosts;
		audio.Play();
		audio1 = true;
	}
	if (Input.GetButtonUp("Vertical") || Input.GetButtonUp("Horizontal")){
		audio.Stop();
		audio1 = false;	
	}
}