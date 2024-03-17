

int Readdis() {
  delay(50); 
  return sonar.ping_cm();
}
int filtervalue() {
  int newDistance = getNewDistance();

 
  myMedian.add(newDistance);

  int filteredDistance = myMedian.getMedian();
  Serial2.println(filteredDistance);
  //good
  return filteredDistance;
}
int getNewDistance() {

  return Readdis();
}