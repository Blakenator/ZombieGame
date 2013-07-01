var engagerange:int;
var movespeed:int;
var currentgun:AIGunshot;
var health:int=100;

function Update() { 




var distance = Vector3.Distance(gameObject.transform.position, gameObject.Find("player").transform.position);

if(distance<=engagerange)
{
	transform.LookAt(gameObject.Find("player").transform);
	currentgun.Fire();
	
}



//Debug.Log(distance.tostring());



}

function subhealth(num:int)
{
health=health-num;
}

function addhealth(num:int)
{
health=health+num;
}