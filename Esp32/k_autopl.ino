void updatedata(String red) {
  Controls[0] = getJsonValue(red, "st");
  Controls[1] = getJsonValue(red, "sp");
  Controls[2] = getJsonValue(red, "hn");
  Controls[3] = getJsonValue(red, "nl");
  Controls[4] = getJsonValue(red, "dis");
}
void runningauto() {
  switch (Controls[0].toInt()) {
    case 0:
      stopmotor();
      break;
    case 1:
      forward();
      break;
    case 2:
      rightturn();
      break;
    case 3:
      leftturn();
      break;
    case 4:
      Backward();
      break;
    case 5:
      enableautodrive(Controls[4].toInt());
      break;
    default:
      stopmotor();
      break;
  }

  switch (Controls[1].toInt()) {
    case 0:
      speed = 0;
      break;
    case 1:
      speed = 51;
      break;
    case 2:
      speed = 102;
      break;
    case 3:
      speed = 153;
      break;
    case 4:
      speed = 204;
      break;
    case 5:
      speed = 255;
      break;
    default:
      speed = 0;
      break;
  }

}
int turnspeed = 5000;
void enableautodrive(int distance) {
  speed = 204;
  int delaytochange = distance * 10000;
   if (statusauto != 5) {
      return; 
    }

  for (int i = 0; i < 5; i++) {

    forward();
      if (statusauto != 5) {
      return; 
    }
    delay(delaytochange);
    rightturn();
       if (statusauto != 5) {
      return; 
    }
    delay(turnspeed);
    forward();
       if (statusauto != 5) {
      return; 
    }
    delay(delaytochange);
    leftturn();
       if (statusauto != 5) {
      return; 
    }
    delay(turnspeed);
       if (statusauto != 5) {
      return; 
    }
  }
}
void task3run(){
    if (Controls[2] == "true") {

    if (Controls[0] == "5" && Controls[2] == "true") {
      playPiratesOfTheCaribbean();
    } else {
      playShipHorn();
    }
  }
}