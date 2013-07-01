var visibility : float;
 
var Line : LineRenderer;
 
function Start ()
    {
    visibility = .5; //setting it to 1 doesn't fade until .5
    Line = transform.GetComponentInChildren(LineRenderer);
    Line.material.SetFloat ("_InvFade",3); 
    }
 
function Update ()
    {
    visibility -= Time.deltaTime;
    if(visibility < 0) Destroy(gameObject);
    Line.material.SetColor("_TintColor", Color(.5,.5,.5,visibility)); 
    }