#pragma strict
public class WaterItem extends ItemClass{
	var thirstValue:float=10;
	function WaterItem(){
		super(thirstValue);
	}
	function ItemUse(){//add animation/sounds
		StatsController.updateThirst(thirstValue);
		var c=GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).dropCurrent();
		Destroy(c);
	}/*
	function PrimaryAction(){
		if(Enabled){
			ItemUse();
		}
	}*/
	function getVal(){
		return thirstValue;
	}
}