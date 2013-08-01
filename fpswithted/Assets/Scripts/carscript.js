var wheelFL : WheelCollider;
var wheelFR : WheelCollider;
var wheelRL : WheelCollider;
var wheelRR : WheelCollider;
var maxTorque : float  = 50;
var enterexit:carenterscript;

private var IsPlayerInCar : boolean = false;

function Start () {
rigidbody.centerOfMass.y = -0.9;
}
 
function FixedUpdate () {

	IsPlayerInCar=enterexit.getisincar();
	if(IsPlayerInCar)
	{
		wheelRR.motorTorque = maxTorque * Input.GetAxis("Vertical");
		wheelRL.motorTorque = maxTorque * Input.GetAxis("Vertical");
		wheelFL.steerAngle = 10 * Input.GetAxis("Horizontal");
		wheelFR.steerAngle = 10 * Input.GetAxis("Horizontal");
		if (Input.GetButton ("Brake"))
		{
        	
			wheelFR.brakeTorque = 90;
			wheelFL.brakeTorque = 90;
			
			wheelRR.steerAngle = -10 * Input.GetAxis("Horizontal");
			wheelRL.steerAngle = -10 * Input.GetAxis("Horizontal");
			
    	}
    	if (Input.GetButtonUp ("Brake"))
		{
			wheelFR.brakeTorque = 0;
			wheelFL.brakeTorque = 0;
			
    	}
    	
    }
}