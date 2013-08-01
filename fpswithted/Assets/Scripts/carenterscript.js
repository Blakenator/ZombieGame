//Enter Exit Car Script By Udiah Nila - [email]hmlanila@yahoo.com[/email]

var Car : Transform;

var Player : Transform;

var DoorTrigger : Transform;

var ExitPoint : Transform;

var PlayerCamera : Camera;

var CarCamera : Camera;

private var IsPlayerInTrigger : boolean;

private var IsPlayerInCar : boolean = false;

var BackWheelLeft : WheelCollider;

var BackWheelRight : WheelCollider;

//This two functions will sense when the player is in the door trigger area

function Start(){

	CarCamera.GetComponent(MouseLook).enabled = false;
	
	Player.active = true;
	
	PlayerCamera.GetComponent(AudioListener).enabled = true;
	
	Player.transform.parent = null;
	
	Player.transform.localRotation = Quaternion.identity;
	
	 
	
	//Car.GetComponent(AlinCAR).enabled = false;
	
	//Car.GetComponent(AudioSource).enabled = false;
	
	PlayerCamera.enabled = true;
	
	CarCamera.enabled = false;
	
	CarCamera.GetComponent(AudioListener).enabled = false;
	
	IsPlayerInCarFalse();
}

function OnTriggerEnter(Player : Collider) {

    IsPlayerInTrigger = true;

    print("PlayerEnteredTrigger");

}

 

function OnTriggerExit(Player : Collider) {
    IsPlayerInTrigger = false;
    print("PlayerExitedTrigger");
}

 

function Update () {

// Here will tell them what to do

// If we press the desired key and the player is in the trigger area

if (Input.GetButtonDown("Enter/Exit")){ 

if (IsPlayerInTrigger && !IsPlayerInCar) {

print("Player Is In Trigger, Will Enter VEHICLE");

// We will DEACTIVATE, atention, not DISABLE the player

Player.parent = ExitPoint.transform;

Player.transform.localPosition = Vector3(0,0,0);

Player.transform.localRotation = Quaternion.identity;

Player.active = false;

PlayerCamera.GetComponent(AudioListener).enabled = false;
PlayerCamera.GetComponent(MouseLook).enabled = false;
//PlayerCamera.enabled = false;


CarCamera.enabled = true;

//Car.GetComponent(AlinCAR).enabled = true;

//Car.GetComponent(AudioSource).enabled = true;

CarCamera.GetComponent(AudioListener).enabled = true;
CarCamera.GetComponent(MouseLook).enabled=true;
IsPlayerInCarTrue();

BackWheelLeft.brakeTorque = 0;

BackWheelRight.brakeTorque = 0;

IsPlayerInTrigger = false;

 

}

if (IsPlayerInCar) {

print("Player Will Exit Car NOW!");

BackWheelLeft.brakeTorque = 10000;

BackWheelRight.brakeTorque = 10000;

Player.active = true;

PlayerCamera.GetComponent(AudioListener).enabled = true;
PlayerCamera.GetComponent(MouseLook).enabled = true;

Player.transform.parent = null;

Player.transform.localRotation = Quaternion.identity;

 

//Car.GetComponent(AlinCAR).enabled = false;

//Car.GetComponent(AudioSource).enabled = false;

PlayerCamera.enabled = true;

CarCamera.enabled = false;

CarCamera.GetComponent(AudioListener).enabled = false;
CarCamera.GetComponent(MouseLook).enabled = false;



IsPlayerInCarFalse();

 

}

}

}

 

function IsPlayerInCarFalse() {

yield WaitForSeconds(0.5);

IsPlayerInCar = false;

}

function IsPlayerInCarTrue() {

yield WaitForSeconds(0.5);

IsPlayerInCar = true;

}

function getisincar()
{
	return IsPlayerInCar;
}