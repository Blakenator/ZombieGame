#pragma strict
import System.IO;

    

public static var LootName:GameObject[];
public static var LootRarity:GameObject[];
public static var LootLoc:GameObject[];
public static var lines:String[];

function Start(){
	var reader=new System.IO.StreamReader("Assets/Resources/Book1.csv");
	
	lines=reader.ReadToEnd().Split("\n"[0]);
	//Debug.Log(lines[0]);
	
	for(var line in lines){
		var values:String[]=line.Split(","[0]);
		
		
		
		//Debug.Log(values[0]);
	}
}

