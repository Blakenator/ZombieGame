#pragma strict
import System.IO;

public static var lines:String[];

private var multiple:float=.5;//All items be be a multiple of this!

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



function Start(){
	
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
					civItems.push(line);
					civnames.push(name);
				}else if(category.Equals("m")){
					milItems.push(line);
					milnames.push(name);
				}else if(category.Equals("f")){
					foodItems.push(line);
					foodnames.push(name);
				}
			}
		}
	}
	
	
	
	
	var spawns:Array=GameObject.FindGameObjectsWithTag("ObjSpawn");
	
	
	
	for(var spawn in spawns){
		var tempobj:GameObject=spawn;
		//Debug.Log(tempobj.gameObject);
		var s:LootSpawn=tempobj.GetComponent(LootSpawn);
		var clone:GameObject;
		
		if(s.IsMil()){//Is mil
			if(milItems.length!=0){
				var randomnumber=Mathf.Floor(Random.value*(milItems.length));
				name = milnames[randomnumber].ToString();
				if(name.Equals("empty")){
					//return;
				}else{
					clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),s.transform.position,s.transform.rotation);
					clone.name=name;
				}
			}
		}else if(s.IsCiv()) {//is Civ
			if(civItems.length!=0){
				randomnumber=Mathf.Floor(Random.value*(civItems.length));
				name = civnames[randomnumber].ToString();
				if(name.Equals("empty")){
					//return;
				}else{
					clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),s.transform.position,s.transform.rotation);
					clone.name=name;
				}
			}
		}else if(s.IsFood()){//is food
			if(foodItems.length!=0){
				randomnumber=Mathf.Floor(Random.value*(foodItems.length));
				name = foodnames[randomnumber].ToString();
				if(name.Equals("empty")){
					//return;
				}else{
					clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),s.transform.position,s.transform.rotation);
					clone.name=name;
				}
			}
		}
		
		
	}
}

