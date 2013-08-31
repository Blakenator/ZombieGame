#pragma strict
import System.IO;

public static var lines:String[];

private var multiple:float=.5;//All items be be a multiple of this!


private var AllCategoryArr=new Array ();
private var AllNamesArr=new Array ();
private var AllItemsArr=new Array ();

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
			
			if(!Contains(category)){
				
				AllCategoryArr.push(category);
				
			}
			
			
			var val:float=float.Parse(temp[2]);
			
			
			
			
			var timestoadd:int=val/multiple;
			
			
			for(var lcv=0;lcv<timestoadd;lcv++){
				
				AllNamesArr.push(name);
				
				AllItemsArr.push(line);
				
				modlines.Add(line);
				
				/*
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
				*/
				
			}
		}
	}
	//Debug.Log(AllItemsArr.length);
	//Debug.Log(AllNamesArr.length);
	
	for(var cat in AllCategoryArr){
		
		Spawn(cat);
		
	}
	
	
	
	
	/*
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
					clone.tag="LootPickup";
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
					clone.tag="LootPickup";
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
					clone.tag="LootPickup";
				}
			}
		}
		
		
	}
	*/
	
	
	reader.Close();
	
}



function Spawn(category:String){
	
	//Debug.Log(category);
	
	var spawns:Array=GameObject.FindGameObjectsWithTag("ObjSpawn");
	
	
	
	var allItemsInCat:Array=GetAllItemsOfCat(category);
	
	var allNamesInCat:Array=GetAllNamesInCat(category);
	
	for(var spawn in spawns){
		
		//Debug.Log(tempobj.gameObject);
		
		var tempobj:GameObject=spawn;
		
		var s:LootSpawn=tempobj.GetComponent(LootSpawn);
		var clone:GameObject;
		
		if(s.IsCategory(category)){
			//Debug.Log("ENTER");
			
			if(allItemsInCat.length!=0){
				var randomnumber=Mathf.Floor(Random.value*(allItemsInCat.length));
				name = allNamesInCat[randomnumber].ToString();
				if(name.Equals("empty")){
					//Debug.Log("EMPTY ITEM!");
					//return;
				}else{
					clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),s.transform.position,s.transform.rotation);
					clone.name=name;
					clone.tag="LootPickup";
				}
			}
		}
		
		
	}
}






function GetAllItemsOfCat(cat:String){
	var tempArr=new Array ();
	
	
	for(var line in lines){
	//for(var Line in modLines){//AllItemsArr){
		if(line.Contains(",")){
			
			var temp:String[]=line.Split(","[0]);
			var name:String=temp[0].ToString();
			var category:String=temp[1].ToString();
			
			var val:float=float.Parse(temp[2]);
			//var tempstr:String=item;
			//Debug.Log(tempstr);
			//var temp:String[]=tempstr.Split(","[0]);
			//var name:String=temp[0].ToString();
			//var category:String=temp[1].ToString();
			
			
			
			
			
			
			
			if(category.Equals(cat)){
				
				var timestoadd:int=val/multiple;
			
			
				for(var lcv=0;lcv<timestoadd;lcv++){
					tempArr.push(line);
				
				}
			}
		}
		
	}
	
	
	//Debug.Log(tempArr.length);
	
	return tempArr;
}

function GetAllNamesInCat(cat:String){
	var tempArr=new Array ();
	
	for(var line in lines){
		if(line.Contains(",")){
			//var tempstr:String=item;
			
			var temp:String[]=line.Split(","[0]);
			
			var name:String=temp[0].ToString();
			var category:String=temp[1].ToString();
			var val:float=float.Parse(temp[2]);
			
			
			
			//Debug.Log(category+" "+cat+" "+category.Equals(cat));
			
			
			
			
			if(category.Equals(cat)){
			
				//Debug.Log("Name");
				var timestoadd:int=val/multiple;
				for(var lcv=0;lcv<timestoadd;lcv++){
					tempArr.push(name);
				
				}
			}
		}
	}
	return tempArr;
}




function Contains(str:String){
	
	for(var cat in AllCategoryArr){
		var strTest:String=cat;
		
		if(str.Equals(cat)){
			return true;
		}
	}
	return false;
	
}