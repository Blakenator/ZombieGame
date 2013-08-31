#pragma strict
private var open:boolean=false;
private var isDone:boolean=true;
//private var audioSources:AudioSource[];
private var audioSources=new Array ();
private var ForceStateOpen:boolean=false;
private var ForceStateClosed:boolean=false;
function Start () {
	//animation["DrawerOpen"].wrapMode=WrapMode.ClampForever;
	audioSources=gameObject.GetComponents(AudioSource);
}


function Open(){
	animation["DrawerOpen"].normalizedTime=0;
	
	//animation.Stop();
	
	animation["DrawerOpen"].speed=1;
	
	animation.Play("DrawerOpen");
	
	isDone=false;
	
	//audio.PlayOneShot(Dresser Open);
	var aud:AudioSource=audioSources[0];
	aud.Play();
	yield WaitForSeconds(animation["DrawerOpen"].length);
	animation["DrawerOpen"].speed=0;
	
	Debug.Log(animation.isPlaying);
	
	isDone=true;
	open=true;
}

function Close(){
	animation["DrawerOpen"].normalizedTime=1;
	
	//animation.Stop();
	
	animation["DrawerOpen"].speed=-1;
	
	animation.Play("DrawerOpen");
	
	isDone=false;
	
	//animation.Play("DrawerOpen");
	
	//audio.PlayOneShot(dresser close);
	
	var aud:AudioSource=audioSources[1];
	aud.Play();
	yield WaitForSeconds(animation["DrawerOpen"].length);
	
	animation["DrawerOpen"].speed=0;
	
	Debug.Log(animation.isPlaying);
	
	isDone=true;
	open=false;
}

function Use(){
	//open=!open;
	
	//var test=animation.Play("DrawerOpen");
	
	//animation.Stop();
	
	if(isDone){
		if(ForceStateOpen||!open){
			Debug.Log("OPEN");
			ForceStateOpen=false;
			yield StartCoroutine("Open");
			
		}else if(ForceStateClosed){
			Debug.Log("CLOSE");
			ForceStateClosed=false;
			yield StartCoroutine("Close");
			
		}else{
			Debug.Log("CLOSE");
			yield StartCoroutine("Close");
			
		}
	}
	
	
	
}
function ForceOpen(){
	
	
	animation["DrawerOpen"].normalizedTime=1;
	open=true;
	//isDone=true;
	//ForceStateOpen=true;
	//ForceStateClosed=false;
	//open=false;
	//Use();
	
}

function ForceClose(){
	
	animation["DrawerOpen"].normalizedTime=0;
	open=false;
	//isDone=true;
	//open=true;
	
	//ForceStateOpen=false;
	//ForceStateClosed=true;
	//Use();
	
}
function getState(){//true is closed false is open
	if(open){
		return false;
	}
	return true;
}