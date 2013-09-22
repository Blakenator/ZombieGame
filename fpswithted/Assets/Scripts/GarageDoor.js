#pragma strict
public class GarageDoor extends OpenableClass{
	private var open:boolean=false;
	private var isDone:boolean=true;
	//private var audioSources:AudioSource[];
	private var audioSources=new Array ();
	private var ForceStateOpen:boolean=false;
	private var ForceStateClosed:boolean=false;
	function Start () {
		audioSources=gameObject.GetComponents(AudioSource);
	}
	
	
	function Open(){
		animation["GarageDoorOpen"].normalizedTime=0;
		
		
		
		animation["GarageDoorOpen"].speed=1;
		
		animation.Play("GarageDoorOpen");
		
		isDone=false;
		
		//var aud:AudioSource=audioSources[0];
		//aud.Play();
		yield WaitForSeconds(animation["GarageDoorOpen"].length);
		animation["GarageDoorOpen"].speed=0;
		
		Debug.Log(animation.isPlaying);
		
		isDone=true;
		open=true;
	}
	
	function Close(){
		animation["GarageDoorOpen"].normalizedTime=1;
		
		
		animation["GarageDoorOpen"].speed=-1;
		
		animation.Play("GarageDoorOpen");
		
		isDone=false;
		
		
		
		//var aud:AudioSource=audioSources[1];
		//aud.Play();
		yield WaitForSeconds(animation["GarageDoorOpen"].length);
		
		animation["GarageDoorOpen"].speed=0;
		
		Debug.Log(animation.isPlaying);
		
		isDone=true;
		open=false;
	}
	
	function Use(){
		
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
		animation["GarageDoorOpen"].normalizedTime=1;
		open=true;
	}
	
	function ForceClose(){
		animation["GarageDoorOpen"].normalizedTime=0;
		open=false;
	}
	function getState(){//true is closed false is open
		if(open){
			return false;
		}
		return true;
	}
	
	function setState(bool:boolean){
		if(bool){
			ForceClose();
			
		}else{
			ForceOpen();
		}
	}
	
}