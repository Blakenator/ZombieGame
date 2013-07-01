#pragma strict
import Pathfinding;
private var graphGrid:GridGraph;
private var player:Transform;

function Start () {
	player=GameObject.Find("player").transform;
}

function FixedUpdate () {

	
	graphGrid = AstarPath.active.astarData.gridGraph;
	graphGrid.center = transform.position;
	var m:Matrix4x4 = graphGrid.matrix;
	graphGrid.GenerateMatrix();
	graphGrid.RelocateNodes (m, graphGrid.matrix);

}

