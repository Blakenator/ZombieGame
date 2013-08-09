#pragma strict
import Ionic.Zip;
class Builder extends EditorWindow{
    
	var versionMajor:String="";
	var versionMinor:String="";
	var versionSub:String="";
	final var path:String="Build/";
	var myName:String="ZombieGame";
	var autoRun:boolean;
	var zipafter:boolean;
	
	function Start () {
	//System.IO.Directory.CreateDirectory(build)
		//path;
	
	}
	
    @MenuItem ("Window/Automatic Builder")
    static function ShowWindow () {
        EditorWindow.GetWindow (Builder);
    }
    function OnGUI(){
    	
    	GUILayout.BeginVertical();
    		GUILayout.Label("Automated Builder Settings");
    		GUILayout.Space(10);
    		GUILayout.Label("Build Name");
    		myName=GUILayout.TextField(myName,GUILayout.ExpandWidth(true));
    		GUILayout.Label("Major version #");
    		versionMajor=GUILayout.TextField(versionMajor,GUILayout.ExpandWidth(true));
    		GUILayout.Label("Minor version #");
    		versionMinor=GUILayout.TextField(versionMinor,GUILayout.ExpandWidth(true));
    		GUILayout.Label("Sub-version !!(AUTOMATIC)!!");
    		versionSub=GUILayout.TextField(versionSub,GUILayout.ExpandWidth(true));
    		autoRun=GUILayout.Toggle(autoRun,"Run on Complete",GUILayout.ExpandWidth(true));
    		zipafter=GUILayout.Toggle(zipafter,"Create Zip on Complete",GUILayout.ExpandWidth(true));
    		if(!System.IO.File.Exists(path+"version.txt")){
	    		if(versionMajor!=""||versionMinor!=""||myName!=""){
		    		if(GUILayout.Button("Create Version File")){
	    				writeInfo();
		    		}
	    		}else{
	    			GUI.enabled=false;
	    			GUILayout.Button("Create Version File");
	    			GUI.enabled=true;
	    		}
    		}else{
    			var reader=System.IO.StreamReader(path+"version.txt");
    			myName=reader.ReadLine();
    			versionMajor=reader.ReadLine();
    			versionMinor=reader.ReadLine();
    			versionSub=reader.ReadLine();
    			if(versionSub==""){
    				versionSub="1";
    			}else{
    				versionSub=""+(int.Parse(versionSub)+1);
    			}
    			//Debug.Log(versionSub);
    			reader.Close();
	    		if(versionMajor!=""||versionMinor!=""||myName!=""){
	    			if(GUILayout.Button("Build")){
	    				writeInfo();
	    				
	    				var currPath:String=path+myName+"-"+versionMajor+"."+versionMinor+"."+versionSub;
		    			Debug.Log(currPath);
		    			if(System.IO.Directory.Exists(currPath)){
		    				System.IO.Directory.Delete(currPath,true);
		    			}
		    			System.IO.Directory.CreateDirectory(currPath);
		    			FileUtil.CopyFileOrDirectory(path+"version.txt",currPath+"/version.txt");
		    			var levels:String[]=["Assets/Scenes/MainMenu (2).unity","Assets/Scenes/Tutorial.unity","Assets/Scenes/LoadingScreen.unity","Assets/Scenes/Auto-world.unity"];
		    			if(autoRun){
		    				BuildPipeline.BuildPlayer(levels,currPath+"/"+myName+".exe",BuildTarget.StandaloneWindows,BuildOptions.AutoRunPlayer);
		    			}else{
		    				BuildPipeline.BuildPlayer(levels,currPath+"/"+myName+".exe",BuildTarget.StandaloneWindows,BuildOptions.None);
		    			}
		    			if(zipafter){
		    				var zip:ZipFile=new ZipFile();
		    				zip.AddDirectory(currPath);
		    				zip.Save(currPath+myName+".zip");
		    			}
		    			
		    		}
	    		}
    		}
    	//GUILayout.EndVertical();
    }
}
function writeInfo(){
	var writer=System.IO.StreamWriter(path+"version.txt");
	writer.WriteLine(myName);
	writer.WriteLine(versionMajor);
	writer.WriteLine(versionMinor);
	if(versionSub==""){
		versionSub="0";
	}
	writer.WriteLine(versionSub);
	writer.Close();
}