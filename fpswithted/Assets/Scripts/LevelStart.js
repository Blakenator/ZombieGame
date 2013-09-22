#pragma strict
import Pathfinding;

var switcher:GunSwitcher;
function Start () {
	switcher.ClearInventory();
}
function OnLevelWasLoaded(level:int){
	if(level==1){
		switcher.ClearInventory();
		StatsController.setStats(100,100,100,100);
		AstarPath.active.Scan();
		
		Time.timeScale=0;
		player.CanLook=true;
		player.CanMove=true;
	}
}