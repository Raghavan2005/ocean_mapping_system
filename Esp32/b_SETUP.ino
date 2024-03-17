void setup() {
  Serial.begin(9600);
  Serial2.begin(9600);
  dht.begin();
  delay(10);
  wifistart();
  delay(1000);
  socketstart();
  delay(1000);
  socketstart1();
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.println(xPortGetCoreID());
  delay(1000);
  motersetup();
  digitalWrite(navlight, HIGH);
  xTaskCreatePinnedToCore(
    Task1code, /* Function to implement the task */
    "Motor1",  /* Name of the task */
    20000,     /* Stack size in words */
    NULL,      /* Task input parameter */
    0,         /* Priority of the task */
    &Motor1,   /* Task handle. */
    0);        /* Core where the task should run */
  xTaskCreatePinnedToCore(
    Task2code, /* Task function. */
    "Main",    /* name of task. */
    20000,     /* Stack size of task */
    NULL,      /* parameter of the task */
    1,         /* priority of the task */
    &Main,     /* Task handle to keep track of created task */
    1);
     xTaskCreatePinnedToCore(
    Task3code, /* Task function. */
    "submin",    /* name of task. */
    20000,     /* Stack size of task */
    NULL,      /* parameter of the task */
    0,         /* priority of the task */
    &Submain,     /* Task handle to keep track of created task */
    1);

}
void motersetup() {
  pinMode(AIA, OUTPUT);
  pinMode(AIB, OUTPUT);
  pinMode(BIA, OUTPUT);
  pinMode(navlight, OUTPUT);
  pinMode(BIB, OUTPUT);
    digitalWrite(navlight, HIGH);
  motorselftest();
    digitalWrite(navlight, LOW);
}
void blinknav() {
  digitalWrite(navlight, HIGH);
  delay(500);
  digitalWrite(navlight, LOW);
  delay(500);
}