void loop() {
    measureStackUsage();
  
  delay(1000);
}
void reconnentingsystem() {
  wifireconnet();
  if (client.connected()) {
    //good

    socketsend(getGpsLocationString());
   
  } else {
    //bad
    socketstart();
  }
}
void reconnentingsystemforauto() {
  wifireconnet();
  if (client1.connected()) {
    //good

    socketsend2("hellp");
    runningauto();
  } else {
    //bad
    socketstart1();
  }
}

void Task1code(void* parameter) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());
  for (;;) {

    reconnentingsystemforauto();
      delay(500);
  }
}

void Task2code(void* pvParameters) {
  Serial.print("Task2 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;) {

    // String gpsLocation = getGpsLocationString();
    //Serial.println(gpsLocation);
    //Serial.println(get_network_info());
    // Output: {"latitude": 11.203484, ...}
    //Serial.println(xPortGetCoreID());
    reconnentingsystem();
    if(Controls[3]=="true"){blinknav();}
    // dis
    delay(1000);
  }
}
void Task3code(void* pvParameters1) {
  Serial.print("Task3 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;) {

   task3run();
  }
}

void measureStackUsage() {
  UBaseType_t stackHighWaterMark;

   size_t freeHeap = ESP.getFreeHeap();
  Serial.print("Free Heap Space: ");
  Serial.print(freeHeap);
  Serial.println(" bytes");
  // Measure stack usage for Motor1 task
  stackHighWaterMark = uxTaskGetStackHighWaterMark(Motor1);
  Serial.print("Motor1 Stack Usage: ");
  Serial.println(stackHighWaterMark);
  
  // Measure stack usage for Main task
  stackHighWaterMark = uxTaskGetStackHighWaterMark(Main);
  Serial.print("Main Stack Usage: ");
  Serial.println(stackHighWaterMark);
  
  // Measure stack usage for submain task
 stackHighWaterMark = uxTaskGetStackHighWaterMark(Submain);
  Serial.print("sub Main Stack Usage: ");
  Serial.println(stackHighWaterMark);
}