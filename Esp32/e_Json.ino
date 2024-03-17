//latitude11.203484,longitude 77.344700,satellites 20,hdop 0.9,age 4,altitude 320.80000,deg 14.000,speed 0.2963
String ValueToJSON(String lat, String log, String sat, String hdop, String age, String alt, String deg, String speed) {
  // Access the values from the array
  getTandH();
  float humidity = TandH[0];
  float temperature = TandH[1];
  float fahrenheit =TandH[2];
  int dis = filtervalue();
  String wiinfo = get_network_info();
  String r = "{\"latitude\": " + String(lat) + ", ";
  r += "\"longitude\": " + String(log) + ", ";
  r += "\"satellites\": " + String(sat) + ", ";
  r += "\"hdop\": " + String(hdop) + ", ";
  r += "\"age\": " + String(age) + ", ";
  r += "\"altitude\": " + String(alt) + ", ";
  r += "\"deg\": " + String(deg) + ", ";
  r += "\"speed\": " + String(speed) + ",";
  r += "\"humidity\": " + String(humidity) + ",";
  r += "\"temperature\": " + String(temperature) + ",";
  r += "\"fahrenheit\": " + String(fahrenheit) + ",";
  r += "\"wifi\": " + wiinfo + ",";
   r += "\"distance\": " + String(dis) + "}";
  return r;
}
String getJsonValue(const String& jsonString, const String& key) {
  // Create a JSON document
StaticJsonDocument<200> doc;
  // Deserialize the JSON string
  DeserializationError error = deserializeJson(doc, jsonString);

  // Check for deserialization error
  if (error) {
    Serial.print("Failed to parse JSON: ");
    Serial.println(error.c_str());
    return ""; // Return empty string if parsing failed
  }

  // Get the value corresponding to the key
  String value = doc[key];

  return value; // Return the value
}