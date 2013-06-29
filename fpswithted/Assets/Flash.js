//var theEmitter : ParticleEmitter;
var isEmitting : boolean = true;

 
function Start() 
{
    //theEmitter = GetComponent( ParticleEmitter );
}

/**
function Update() 
{
    if ( Input.GetButton( "Fire1" ) && Ammo > 0)
    {
       if ( isEmitting )
       {
         isEmitting = false;
         
       }
    	else
       {
         isEmitting = true;
         Ammo -= 1;
         //theEmitter.Emit();
       }
    }
	//if (Input.GetKeyDown("r") && Clip > 0){
		//Ammo = 15;
		//Clip -=1;
	//}
}
**/

function emitflash(emitter:ParticleEmitter)
{
emitter.Emit();
}