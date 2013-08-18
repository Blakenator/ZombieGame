#pragma strict
import System.IO;

    

public static var LootName:GameObject[];
public static var LootRarity:GameObject[];
public static var LootLoc:GameObject[];

public static var lines:String[];

private var multiple:int=2;//All items be be a multiple of this!

var milnames=new Array ();
var civnames=new Array ();
var foodnames=new Array ();
//add extra catagorys here



var categorys=new Array ();
var raritys=new Array ();
var modlines=new Array ();


var milItems=new Array ();
var civItems=new Array ();
var foodItems=new Array ();
//add extra catagorys here



function Awake(){
	
	var reader=new System.IO.StreamReader(Application.dataPath+"/Resources/Book1.csv");
	
	lines=reader.ReadToEnd().Split("\n"[0]);
	
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
					//Debug.Log("CIVILIAN");
					civItems.push(line);
					civnames.push(name);
				}else if(category.Equals("m")){
					//Debug.Log("MIL");
					milItems.push(line);
					milnames.push(name);
				}else if(category.Equals("f")){
					//Debug.Log("FOOD");
					foodItems.push(line);
					foodnames.push(name);
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
				var randomnumber=Mathf.Floor(Random.value*(milItems.length));
				name = milnames[randomnumber].ToString();
				
				var fpath:String="prefabs/"+name;
				
				clone=GameObject.Instantiate(Resources.Load(fpath),s.transform.position,s.transform.rotation);
				clone.name=name;
			}
		}
		else if(s.IsCiv()) {//is Civ
			if(civItems.length!=0){
				randomnumber=Mathf.Floor(Random.value*(civItems.length));
				name = civnames[randomnumber].ToString();
				
				fpath="prefabs/"+name;
				 
				clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),s.transform.position,s.transform.rotation);
				clone.name=name;
			}
		}else if(s.IsFood()){//isfood
			if(foodItems.length!=0){
				randomnumber=Mathf.Floor(Random.value*(foodItems.length));
				name = foodnames[randomnumber].ToString();
				
				fpath="prefabs/"+name;
				
				clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),s.transform.position,s.transform.rotation);
				clone.name=name;
			}
		}
	}
}

