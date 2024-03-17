String getGpsLocationString() {
  while (Serial2.available()) {
    gps.encode(Serial2.read());  // Parse GPS data continuously
  }

  if (gps.location.isValid()) {
    String latitude = String(gps.location.lat(),6);  // Format latitude with 6 decimal places
    String longitude = String(gps.location.lng(),6);
    String satellites = String(gps.satellites.value());
    String hdop = String(gps.hdop.hdop(), 1);
    String age = String(gps.location.age(), 2);
    String altitude = String(gps.altitude.meters());
    String deg = String(gps.course.deg());
    String speed = String(gps.speed.kmph(), 2);
   // Serial.println(latitude);
   // Serial.println(longitude);
    return ValueToJSON(latitude, longitude, satellites, hdop, age, altitude, deg, speed);  // Combine latitude and longitude into a string
  } else {
    return "No GPS fix";  // Return a message if no valid GPS fix is available
  }
}
/* 
latitude11.203484,longitude 77.344700,satellites 20,hdop 0.9,age 4,altitude 320.80000,deg 14.000,speed 0.2963
11.203484, 77.344700,14,0.9,3,319.60000,0.000,0.0556
11.203486, 77.344699,14,0.9,3,318.60000,0.000,0.3148
11.203487, 77.344699,14,0.9,3,317.30000,0.000,0.1852
11.203488, 77.344699,14,0.9,3,317.50000,0.000,0.1296
11.203487, 77.344699,14,0.9,3,317.50000,0.000,0.4260 */