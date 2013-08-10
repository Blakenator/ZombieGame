#pragma strict
var player:Transform;
function Update (){
	//var tgt:Vector3=player.position-transform.position;
	//Debug.Log(Vector3.Angle(tgt,transform.position));
	
	var otherTransform : Transform;
 
//function Start () {
    var relativePoint = transform.InverseTransformPoint(player.position);
    if (relativePoint.x < 0.0){
        //print ("Object is to the left");
    }else if (relativePoint.x > 0.0){
        //print ("Object is to the right");
    }else{
        //print ("Object is directly ahead");
    }
//}
}