#include <TinyGPSPlus.h>
#include <NewPing.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <RunningMedian.h>
#include <WebSocketClient.h>
#include <DHT.h>
#include <Filters.h>
#define TRIGGER_PIN  21  // Arduino pin tied to trigger pin on the ultrasonic sensor.
#define ECHO_PIN     19  // Arduino pin tied to echo pin on the ultrasonic sensor.
#define MAX_DISTANCE 500 
#define DHTPIN 4
#define navlight 18
#define BUZZER_PIN 15
#define DHTTYPE DHT11           // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.
const int numReadings = 5; 
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);
RunningMedian myMedian(numReadings);//attach pin D3 Arduino to pin Trig of JSN-SR04T
TinyGPSPlus gps;
WebSocketClient webSocketClient;
WebSocketClient webSocketClient1;
WiFiClient client;
WiFiClient client1;
int statusauto=0;
DHT dht(DHTPIN, DHTTYPE);
float TandH[6];
String Controls[5];
const int AIA = 33;
const int AIB = 32;
const int BIA = 22;
const int BIB = 23;
int speed=102;
TaskHandle_t Motor1;
TaskHandle_t Main;
TaskHandle_t Submain;