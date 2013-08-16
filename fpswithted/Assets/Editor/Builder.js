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
	
	var autoBackup:boolean;
	var backupInterval:String="5";
	var backupIntVal:double;
	var currentBackupPath:String;
	
	function Start () {
	//System.IO.Directory.CreateDirectory(build)
		//path;
		if(System.IO.File.Exists("Backup/prefs.txt")){
			getBackupInfo();
		}
		if(System.IO.File.Exists(path+"version.txt")){
			readInfo();
		}
		
	
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
	    		if(versionMajor!=""||versionMinor!=""||myName!=""){
	    			if(GUILayout.Button("Build")){
	    			//Debug.Log(versionMajor+"|"+versionMinor+"|"+myName);
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
		    			readInfo();
		    		}
	    		}
    		}
    		autoBackup=GUILayout.Toggle(autoBackup,"Auto-backup on Interval (m):");
    		backupInterval=GUILayout.TextField(backupInterval,GUILayout.ExpandWidth(true));
    		if(backupInterval.Length>0){
    			try{
    				backupIntVal=double.Parse(backupInterval);
    			}catch(e){}
    		}
    		if(GUILayout.Button("Backup",GUILayout.ExpandWidth(true))&&myName.Length>0&&backupInterval.Length>0){
				Debug.Log("Backup Started");
    			backup();
    		}
    		if(perc!=""){
    			GUILayout.Label(perc);
    		}
    		
    		//auto backup
			/*if(!backupIntVal&&autoBackup&&Time.time>=last+backupIntVal){
				backup();
				last=Time.time;
			}*/
    		
    	//GUILayout.EndVertical();
    }
}
var loopcntr:int;
var isCopying:boolean;
function readInfo(){
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
function getBackupInfo(){
	var reader=System.IO.StreamReader("Backup/prefs.txt");
	autoBackup=boolean.Parse(reader.ReadLine());
	backupInterval=reader.ReadLine();
	reader.Close();
}
var perc:String;
function backup(){
	if(System.IO.File.Exists("Backup/prefs.txt")){
		System.IO.File.Delete("Backup/prefs.txt");
	}
	var writer=System.IO.StreamWriter("Backup/prefs.txt");
	writer.WriteLine(autoBackup);
	writer.WriteLine(backupInterval);
	writer.Close();
	var time:String[]=System.DateTime.Now.ToString().Split("/"[0]);
	var time2:String=time[0]+"-"+time[1]+"-"+time[2];
	var time3:String=time2.Split(":"[0])[0]+"."+time2.Split(":"[0])[1]+"."+time2.Split(":"[0])[2];
	var timefull:String[]=time3.Split(" "[0]);
	var dir="Backup/"+myName+"_Backup-"+timefull[0]+"_"+timefull[1]+"_"+timefull[2];
	currentBackupPath=dir;
	
	System.IO.Directory.CreateDirectory(dir);
	
	//FileUtil.CopyFileOrDirectory("Assets",dir+"/Assets");
	isCopying=true;
	

	
}
var last:double;
function doBackup(val:int){
	var files=System.IO.Directory.GetDirectories("Assets/");
	if(val>=files.Length){
		Debug.Log("Done");
		isCopying=false;
		done();
		return 0;
	}
	try{
		copyIt(val,files);
	}catch(e){
		Debug.Log("Error copying '"+files[val]+"' to '"+currentBackupPath+"/"+files[val].Split("/"[0])[files[val].Split("/"[0]).Length-1]+"'.");
	}
		
	
	perc=(val+1)+"/"+files.Length;
	return val+1;
}
function done(){
	var zip=new ZipFile(currentBackupPath+".zip");
	zip.AddDirectory(currentBackupPath);
	zip.Save();
	System.IO.Directory.Delete(currentBackupPath,true);
	System.IO.File.Delete(currentBackupPath);
	perc="";
	Debug.Log(currentBackupPath+".zip");
}
function copyIt(val:int,files:String[]){
	FileUtil.CopyFileOrDirectory(files[val],currentBackupPath+"/"+files[val].Split("/"[0])[files[val].Split("/"[0]).Length-1]);
}
@script ExecuteInEditMode()
function Update(){
	if(isCopying){
		loopcntr=doBackup(loopcntr);
	}else if(autoBackup&&Time.time>=last+backupIntVal*60){
		backup();
	}
}
