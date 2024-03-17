const redis = require("redis");
const express = require('express');
const expressWs = require('express-ws');
//sudo service redis-server start  == redis-cli 
const app = express();
expressWs(app);

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

client.on("error", function (error) {
    console.error("Error connecting to Redis:", error);
});

client.on("connect", function () {
    console.log("Connected to Redis server");
});
client.connect();
let prevLatitude = null;
let prevLongitude = null;
var autoset = 0;
app.ws('/kd420', (ws, req) => {
    ws.on('message', async (msg) => {
        if ("No GPS fix" != msg) {
            try {
                const data = JSON.parse(msg);
                const { latitude, longitude, satellites, hdop, age, altitude, deg, speed, humidity, temperature, fahrenheit, wifi: { BSSID, Gateway_IP, Subnet_Mask, RSSI, Local_IP }, distance } = data;
                
                if (latitude === prevLatitude && longitude === prevLongitude) {
                    // console.log(' duplicate data:', data);
                    ws.send('Skipping duplicate data');
                } else {


                    //console.log(latitude, longitude, satellites, hdop, age, altitude, deg, speed, humidity, temperature, fahrenheit, BSSID ,Gateway_IP ,Subnet_Mask , RSSI ,Local_IP)
                    client.multi()
                        .set("latitude", latitude)
                        .set("longitude", longitude)
                        .set("satellites", satellites)
                        .set("hdop", hdop)
                        .set("age", age)
                        .set("altitude", altitude)
                        .set("deg", deg)
                        .set("speed", speed)
                        .set("humidity", humidity)
                        .set("temperature", temperature)
                        .set("fahrenheit", fahrenheit)
                        .set("BSSID", BSSID)
                        .set("Gateway_IP", Gateway_IP)
                        .set("Subnet_Mask", Subnet_Mask)
                        .set("RSSI", RSSI)
                        .set("Local_IP", Local_IP)
                        .set("Distance", distance)
                        .exec(function (err, replies) {
                            if (err) {
                                console.error("Error setting values:", err);
                            } else {
                                console.log("Values set successfully:", replies);


                                // client.quit();
                            }
                        });


                    prevLatitude = latitude;
                    prevLongitude = longitude;
                    ws.send(autoset);
                }
            } catch (error) {
                console.error('Error saving data to MongoDB:', error);
                ws.send('Error saving data to MongoDB');
            }
        } else {
            console.log("Esp32 is Starting or Problem With connection")
        }
    });
});
// clenet 
app.ws('/webclient', (ws, req) => {
    ws.on('message', async (msg) => {

        const latitude = await client.get('latitude');
        const longitude = await client.get('longitude');
        const satellites = await client.get('satellites');
        const hdop = await client.get('hdop');
        const age = await client.get('age');
        const altitude = await client.get('altitude');
        const deg = await client.get('deg');
        const speed = await client.get('speed');
        const humidity = await client.get('humidity');
        const temperature = await client.get('temperature');
        const fahrenheit = await client.get('fahrenheit');
        const BSSID = await client.get('BSSID');
        const Gateway_IP = await client.get('Gateway_IP');
        const Subnet_Mask = await client.get('Subnet_Mask');
        const RSSI = await client.get('RSSI');
        const Local_IP = await client.get('Local_IP');
        const Distance = await client.get('Distance');
        const makejson = { latitude: latitude, longitude: longitude, satellites: satellites, hdop: hdop, age: age, altitude: altitude, deg: deg, speed: speed, humidity: humidity, temperature: temperature, fahrenheit: fahrenheit, BSSID: BSSID, Gateway_IP: Gateway_IP, Subnet_Mask: Subnet_Mask, RSSI: RSSI, Local_IP: Local_IP, Distance: Distance };
        //console.log(JSON.stringify(makejson));  
        ws.send(JSON.stringify(makejson))
        const separated = separateFromString(msg);
        saveincomingfromweb(separated)
        ///   console.log(msg)
    });
});
app.ws('/controlrg', (ws, req) => {
    ws.on('message', async (msg) => {

        const st = await client.get('st');
        const sp = await client.get('sp');
        const hn = await client.get('hn');
        const nl = await client.get('nl');
        const dis = await client.get('dis');
        const makejson = { st: st, sp: sp, hn: hn, nl: nl,dis:dis};
        console.log(JSON.stringify(makejson));  
        ws.send(JSON.stringify(makejson))
        //console.log(JSON.stringify(makejson))
      //  console.log(msg)
       
    });
});

app.listen(1234, () => console.log('WebSocket server started on port 1234'));
function separateFromString(input) {
    // Split the string by commas into an array
    const values = input.split(',');

    // Assuming the input string format is known and fixed as "number,number,boolean,boolean"
    if (values.length === 5) {
        const st = parseInt(values[0], 10); // Convert string to integer
        const sp = parseInt(values[1], 10); // Convert string to integer
        const hn = values[2] === 'true'; // Convert string to boolean
        const nl = values[3] === 'true';
        const dis = parseInt(values[4], 10); // Convert string to boolean



        // Optionally return an object with these values
        return { st, sp, hn, nl, dis };
    } else {
        console.error("Input string format does not match expected format.");
        return null;
    }
}
function saveincomingfromweb(onb) {
    //  console.log(onb);
    const { st, sp, hn, nl, dis } = onb;
    autoset = st;
    //console.log(st, sp, hn, nl);
    client.multi()
        .set("st", st.toString())
        .set("sp", sp.toString())
        .set("hn", hn.toString())
        .set("nl", nl.toString())
        .set("dis", dis.toString())
        .exec(function (err, replies) {
            if (err) {
                console.error("Error setting values:", err);
            } else {
                console.log("Values set successfully:", replies);
                // client.quit();
            }
        });

}

