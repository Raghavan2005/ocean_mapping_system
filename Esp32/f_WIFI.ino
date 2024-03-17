const char* ssid = "DARKMONSTER";
const char* password = "12345678";

void wifistart() {

  WiFi.mode(WIFI_STA);  //Optional
  WiFi.begin(ssid, password);
  Serial.println("\nConnecting");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }

  Serial.println("\nConnected to the WiFi network");
  Serial.print("Local ESP32 IP: ");
  Serial.println(WiFi.localIP());
}
String get_network_info() {
    String bssid = WiFi.BSSIDstr();
    IPAddress gatewayIP = WiFi.gatewayIP();
    IPAddress subnetMask = WiFi.subnetMask();
    int rssi = WiFi.RSSI();
    IPAddress localIP = WiFi.localIP();

    String json = "{";
    json += "\"BSSID\": \"" + bssid + "\",";
    json += "\"Gateway_IP\": \"" + gatewayIP.toString() + "\",";
    json += "\"Subnet_Mask\": \"" + subnetMask.toString() + "\",";
    json += "\"RSSI\": \"" + String(rssi) + "dB\",";
    json += "\"Local_IP\": \"" + localIP.toString() + "\"";
    json += "}";

    return json;
}

void wifireconnet() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\nReconnecting");
    wifistart();
  }
}
/* Serial.println("[+] BSSID : " + WiFi.BSSIDstr());
        Serial.print("[+] Gateway IP : ");
        Serial.println(WiFi.gatewayIP());
        Serial.print("[+] Subnet Mask : ");
        Serial.println(WiFi.subnetMask());
        Serial.println((String)"[+] RSSI : " + WiFi.RSSI() + " dB");
        Serial.print("[+] ESP32 IP : ");
        Serial.println(WiFi.localIP()); */