const char* serverip = "192.168.137.1";
int port = 1234;
char path[] = "/kd420";
char path2[] = "/controlrg";
char host[] = "192.168.137.1";
void socketstart() {
  if (client.connect(serverip, port)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
  }

  webSocketClient.path = path;
  webSocketClient.host = host;
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake successful");
  } else {
    Serial.println("Handshake failed.");
  }
}
void socketstart1() {
  if (client1.connect(serverip, port)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
  }
  webSocketClient1.path = path2;
  webSocketClient1.host = host;
  if (webSocketClient1.handshake(client1)) {
    Serial.println("Handshake successful");
  } else {
    Serial.println("Handshake failed.");
  }
}
void socketsend(String data) {
  String rec;
  Serial.println("data: Sended ");
  if (client.connected()) {

    webSocketClient.getData(rec);
    if (data.length() > 0) {
      //Serial.print("Received data: ");
     // Serial.println(rec);
     statusauto=rec.toInt();
    }

    webSocketClient.sendData(data);

  } else {
    Serial.println("Server disconnected.");
    while (1) {
      // Hang on disconnect.
    }
  }
}
void socketsend2(String data) {
  String rec1;
  Serial.println("data: Sended ");
  if (client1.connected()) {

    webSocketClient1.getData(rec1);
    if (data.length() > 0) {
      // Serial.print("Received data: ");
      // Serial.println(rec1);
      updatedata(rec1);
    }

    webSocketClient1.sendData(data);

  } else {
    Serial.println("Server disconnected.");
    while (1) {
      // Hang on disconnect.
    }
  }
}