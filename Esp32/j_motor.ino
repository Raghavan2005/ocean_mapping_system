void forward() {
  
  analogWrite(AIB, speed);
  analogWrite(AIA, 0);

  analogWrite(BIB, speed);
  analogWrite(BIA, 0);
}

void Backward() {
 
  analogWrite(AIB, 0);
  analogWrite(AIA, speed);

  analogWrite(BIB, 0);
  analogWrite(BIA, speed);
}

void rightturn() {
  analogWrite(AIB, speed);
  analogWrite(AIA, 0);

  analogWrite(BIB, 0);
  analogWrite(BIA, speed);
}
void leftturn() {
  analogWrite(AIB, 0);
  analogWrite(AIA, speed);

  analogWrite(BIB, speed);
  analogWrite(BIA, 0);
}
void stopmotor() {
  analogWrite(AIB, 0);
  analogWrite(AIA, 0);

  analogWrite(BIB, 0);
  analogWrite(BIA, 0);
}

void motorselftest() {
  rightturn();
  delay(2000);
  stopmotor();
  delay(2000);
  leftturn();
  delay(2000);
  stopmotor();
  delay(2000);
}