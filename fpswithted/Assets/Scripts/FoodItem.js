#pragma strict
public class FoodItem extends ItemClass{
	var foodValue:float=10;
	function FoodItem(){
		super(foodValue);
	}
	function ItemUse(){//add animation/sounds
		StatsController.updateHunger(foodValue);
		var c=GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).dropCurrent();
		Destroy(c);
	}
	function getVal(){
		return foodValue;
	}
}