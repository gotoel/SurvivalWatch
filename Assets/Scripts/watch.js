//CS 255 - HCI - Project 1
//Watch logic (panels, apps, buttons)

import UnityEngine.UI;
import System;
import System.Math;

//time app
 var timeTxt : UnityEngine.UI.Text;
 var timeAMPM : UnityEngine.UI.Text;
 private var blinkSpeed:int = 60;
 private var blink = false;
 private var counter:int = 0;
 
 //gps app
 private var latTxt : UnityEngine.UI.Text;
 private var longTxt : UnityEngine.UI.Text;
 private var altTxt : UnityEngine.UI.Text;
 
 //buttons
 private var hit : RaycastHit;
 private var ray : Ray;
 private var powerBtn : GameObject;
 private var menuKnob : GameObject;
 
 //screen
 private var watchScreen : GameObject;
 
 //camera
 private var cam : GameObject;
 
 //watch
 private var rotating : boolean;
 private var watch : GameObject;
 private var watchPivot : GameObject;
 
 
 function Start()
 {
 		//gps app
 		latTxt = GameObject.Find("Latitude").GetComponent(UnityEngine.UI.Text);
 		longTxt = GameObject.Find("Longitude").GetComponent(UnityEngine.UI.Text);
 		altTxt = GameObject.Find("Altitude").GetComponent(UnityEngine.UI.Text);
 		
 		//time app
		timeTxt = GameObject.Find("Time").GetComponent(UnityEngine.UI.Text);
		timeAMPM = GameObject.Find("AM/PM").GetComponent(UnityEngine.UI.Text);
		
		//watch screen
		watchScreen = GameObject.Find("WatchScreen");
		
		//buttons
		powerBtn = GameObject.Find("PowerButton");
		menuKnob = GameObject.Find("MenuKnob");
		
		//camera
		cam = GameObject.Find("Main Camera");
		
		//watch
		watch = GameObject.Find("Watch");
		watchPivot = GameObject.Find("WatchPivot");
		rotating = true;
 }
 
 function OnGUI()
 {
		
		
 }
 
function Update () {

	//gps app
	latTxt.text = "Latitude:\n" + "N" + Math.Abs(Math.Round(cam.transform.position.x)) + "°26'44.82\"";
	longTxt.text = "Longitude:\n" + "W" + Math.Abs(Math.Round(cam.transform.position.z)) + "°41'27.48\"";
	altTxt.text = "Alt: " + Math.Abs(Math.Round(cam.transform.position.y)) + " ft";

	// Time app
 	var dt : System.DateTime = System.DateTime.Now;
 	var h : int = dt.Hour;
 	var m : int = dt.Minute;
 	var s : int = dt.Second;
 	
 	//convert to 12-hour
    if (h > 12)
    	h = h-12;
    else if (h == 0)
        h = 12;
 	

	if(blink)
		counter--;
	else
		counter++;
    if(counter == blinkSpeed)
	{
        counter = (blinkSpeed/2);
        blink = true;
        timeTxt.text = String.Format("{0:00} {1:00}", h, m);
    } 
	else if(counter == 0){
        blink = false;
        timeTxt.text = String.Format("{0:00}:{1:00}", h, m);
	}
    timeAMPM.text = System.DateTime.Now.ToString("tt");
    // buttons
    ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    //paint mouse ray
    //Debug.DrawLine (ray.origin, Camera.main.transform.forward * 50000000, Color.red);

    if(Physics.Raycast(ray, hit, Mathf.Infinity) && Input.GetMouseButtonDown(0))
    {
    	if(hit.collider == powerBtn.GetComponent(Collider))
        {
        	if(watchScreen.active)
            	watchScreen.SetActive(false);
            else
                watchScreen.SetActive(true);
        }
	}
     
     // knob
     // knob rotation
	if (Input.GetMouseButton(0))
     {
           x = -Input.GetAxis("Mouse X");
           y = -Input.GetAxis("Mouse Y");
           speed = 5;
           menuKnob.transform.Rotate(Vector3.left * y * speed, Space.World);    
           menuKnob.transform.Rotate(Vector3.right * x * speed, Space.World);
     }
     
     //watch
     //rotate around a sphere called the WatchPivot
     if(Input.GetKeyUp(KeyCode.R))
		if(rotating)
			rotating = false;
		else
			rotating = true;
     if(rotating)
     	watch.transform.RotateAround(watchPivot.transform.position, Vector3.up,0.2);
}		

 function Awake()
 {

 }
 
