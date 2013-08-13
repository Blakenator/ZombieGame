#pragma strict
import System.IO;

    

public static var LootName:GameObject[];
public static var LootRarity:GameObject[];
public static var LootLoc:GameObject[];

public static var lines:String[];

private var multiple:int=2;


var milnames=new Array ();
var civnames=new Array ();

var categorys=new Array ();
var raritys=new Array ();
var modlines=new Array ();

var milItems=new Array ();
var civItems=new Array ();
function Awake(){
	
	var reader=new System.IO.StreamReader("Assets/Resources/Book1.csv");
	
	
	
	
	lines=reader.ReadToEnd().Split("\n"[0]);
	
	
	
	//Debug.Log(lines.Length);
	
	
	
	for(var line in lines){
		if(line.Contains(",")){
			
			var temp:String[]=line.Split(","[0]);
			
			var name:String=temp[0].ToString();
			
			
			
			var category:String=temp[1].ToString();
			
			var val:float=float.Parse(temp[2]);
			
			
			
			
			
			var timestoadd:int=val/multiple;
			
			for(var lcv=0;lcv<timestoadd;lcv++){
				
				modlines.Add(line);
				
				if(category.Equals("c")){
					Debug.Log("CIVILIAN!!!");
					civItems.push(line);
					civnames.push(name);
				}else{
					Debug.Log("MIL1!!!");
					milItems.push(line);
					milnames.push(name);
					
				}
				
				//names.push(name);
				//categorys.push(category);
				//raritys.push(val);
				
			}
			
			
		}
	}
	Debug.Log(modlines.length);
	
	
	
	
	
	var spawns:Array=GameObject.FindGameObjectsWithTag ("ObjSpawn");
	//Debug.Log
	for(var spawn in spawns){
		var temp2:GameObject=spawn;
		var s:LootSpawn=temp2.GetComponent(LootSpawn);
		var clone:GameObject;
		if(s.IsMil()){//Is mil
			if(milItems.length!=0){
				var randomnumber=Mathf.Floor(Random.value*(milItems.length+1));
				name = milnames[randomnumber].ToString();
				
				clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),s.transform.position,s.transform.rotation);
				
				clone.name=name;
			}
		}
		else{//is Civ
			if(civItems.length!=0){
				randomnumber=Mathf.Floor(Random.value*(civItems.length+1));
				name = civnames[randomnumber].ToString();
				
				clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),s.transform.position,s.transform.rotation);
				
				clone.name=name;
			}
		}
	}
	
}

