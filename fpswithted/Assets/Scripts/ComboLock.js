#pragma strict
import System.Text.RegularExpressions;
var LockText:TextMesh;
private var spot:int=0;
private var Enabled:boolean;
var code:String="00-00-00";
var startText:String="00-00-00";
private var correct:boolean=false;
var doorObj:Door;
function Start(){
	LockText.text=startText;
}

function Update () {
	
	if(Enabled&&doorObj.IsClosed()){		//&&!correct&&doorObj.IsClosed){
		Time.timeScale=.000000001;
		for (var c : char in Input.inputString) {
			// Backspace - Remove the last character
			if (c == "\b"[0]) {
				if (LockText.text.Length != 0){
					
					
					if(!(LockText.text.Substring(LockText.text.Length - 1).Equals("-"))){
						Debug.Log(LockText.text.Substring(LockText.text.Length - 1));
						spot--;
					}
					LockText.text = LockText.text.Substring(0, LockText.text.Length - 1);
					
					
				}
			}
			// End of entry
			else if (c == "\n"[0] || c == "\r"[0]) {// "\n" for Mac, "\r" for windows.
				//print ("User entered his name: " + LockText.text);
				
				if(LockText.text.Equals(code)){
					Debug.Log("CORRECT!");
					Time.timeScale=1;
					
					//correct=true;
					
					doorObj.Unlock();
					
					LockText.text=startText;
					Enabled=false;
					//Destroy(this);
					
				}
				
			}
			else {// Normal text input - just append to the end
				if (LockText.text.Length <8){
					
					if(c!='-'){
						if(spot%2==0&&spot!=8&&LockText.text.Length!=0&&!(LockText.text.Substring(LockText.text.Length - 1).Equals("-"))){
							LockText.text +="-";
						}
						
						LockText.text += c;
						
						
						var txtlength =LockText.text.Length;
						
						var text:String = LockText.text;
	          			text = Regex.Replace(text, "[^0-9-]", "");
						LockText.text=text;
						if(txtlength==LockText.text.Length){
							spot++;
						}
					}
					
				}
			}
		}
	}
	
	
}
function Use(){
	if(doorObj.IsClosed()){
		Enabled=!Enabled;
		Time.timeScale=1;
	}
}

