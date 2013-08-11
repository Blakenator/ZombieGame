#pragma strict
import System;
import System.IO;
 

var fileName = "MyFile.txt";
var firstGameObj:boolean=false;

function Start(){
	
	if (File.Exists(fileName)){
        Debug.Log(fileName+" already exists.");
        //return;
    }
    
    var sw : StreamWriter = new StreamWriter(fileName,true);
    sw.Flush();
	//var buildings:DestrOptimizer[] = FindObjectsOfType(DestrOptimizer);
    //Directory.CreateDirectory("Saves/");
    
    //var sr = File.CreateText(fileName);
    
	//sw.WriteLine ("//This is my file.");
	
	sw.WriteLine ("Buildings");
    //sw.Flush();
    sw.Close();
    saveGameObject2();
}

function Save(){
	
	
}

function saveBuilding(x:int,y:int,buildtype:int,buildheight:int){
	var sw : StreamWriter = new StreamWriter(fileName,true);
	sw.WriteLine(x+" "+y+" "+buildtype+" "+buildheight);
	//sw.Flush();
    sw.Close();
}

function saveGameObject(ObjName:String,x:int,y:int,z:int){
	var sw : StreamWriter = new StreamWriter(fileName,true);
	var objects : GameObject[] = FindObjectsOfType(GameObject);
	
	if(!firstGameObj){
		sw.WriteLine("GameObject");
		firstGameObj=false;
	}
	sw.WriteLine(ObjName+" "+x+" "+y+" "+z);
	//sw.Flush();
    sw.Close();
}

function saveGameObject2(){
	var sw : StreamWriter = new StreamWriter(fileName,true);
	
	var objectsarr : Array = FindObjectsOfType(GameObject);
	
	if(!firstGameObj){
		sw.WriteLine("GameObject");
		firstGameObj=false;
	}
	
	
	for(var lcv=0;lcv<objectsarr.length;lcv++){
	
		var obj:GameObject=objectsarr[lcv];
		obj=obj.transform.root.gameObject;
		
		if(obj instanceof DestrOptimizer){
		}else{
		
			objectsarr=RemoveExtras(obj,objectsarr);
			//sw.WriteLine(obj.transform.root.name+" "+obj.transform.position.x+" "+obj.transform.position.x+" "+obj.transform.position.z);
		}
	}
	
	for(var object:GameObject in objectsarr){
		if(object instanceof DestrOptimizer){
		}else{
			if(object.name.Contains("(Clone)")){
				var end:int=object.name.IndexOf("(Clone)");
				var finalstr:String=object.name.Substring(0,end);
				object.name=finalstr;
			}
			//objectsarr=RemoveExtras(obj.transform.root.gameObject,objectsarr);
			sw.WriteLine(object.transform.root.name+" "+object.transform.position.x+" "+object.transform.position.x+" "+object.transform.position.z);
		}
	}
	//sw.Flush();
    sw.Close();
}
function RemoveExtras(obj:GameObject,objects:Array){
	var temparr:Array=objects;
	var objroot:GameObject=obj;
	
	
	for(var lcv=0;lcv<temparr.length;lcv++){
		var tempobj:GameObject=temparr[lcv];
		
		var tempobjroot:GameObject=tempobj.transform.root.gameObject;
		
		//tempobjroot=tempobjroot.transform.root.gameObject;
		
		if(tempobjroot==objroot&&tempobj!=obj){
			temparr.RemoveAt(lcv);
			lcv--;
		}
	}
	return temparr;
}