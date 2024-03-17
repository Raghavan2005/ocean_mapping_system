import React, { useState, useEffect } from 'react';

import st from '../assets/satellite-100.png';
import sp from '../assets/speed-50.png';
import ti from '../assets/time-50.png';
import Popup from 'reactjs-popup';
import se from '../assets/server-24.png';
import cm from '../assets/compass-50.png';
import wi from '../assets/wifi-50.png';
import cl from '../assets/close-30.png';
import onlineimg from '../assets/online.png';
import offlineimg from '../assets/offline.png';
/* import lighton from '../assets/light-on.png';
import lightoff from '../assets/light-off.png';
import hornon from '../assets/horn.png';
import hornoff from '../assets/no-horn.png'; */
import stop from '../assets/shutdown.png';

export default function Header(props) {
    const [getsatellites, setsatellites] = useState("undefined");
    const [gethdop, sethdop] = useState("0");
    const [getage, setage] = useState("0");
    const [getdeg, setdeg] = useState("0");
    const [getspeed, setspeed] = useState("0");
    const [getRSSI, setRSSI] = useState("0");
    const [getlatitude, setlatitude] = useState("0");
    const [getlongitude, setlongitude] = useState("0");
    const [getaltitude, setaltitude] = useState("0");
    const [getBSSID, setBSSID] = useState("0");
    const [getGateway_IP, setGateway_IP] = useState("0");
    const [getSubnet_Mask, setSubnet_Mask] = useState("0");
    const [getLocal_IP, setLocal_IP] = useState("0");
    const [getdp, setdp] = useState("0");
    //
    const [currentTime, setCurrentTime] = useState(new Date());
    const [getwebstatus, setwebstatus] = useState(true);
    const [getbackstatus, setbackstatus] = useState(false);
    const [getmongostatus, setmongostatus] = useState(false);
    const [getredisstatus, setredisstatus] = useState(false);


    // Check if data is defined
    useEffect(() => {
        //   console.log('Effect initialized');


        const intervalId = setInterval(() => {
            //   console.log('Interval executing');

            if (getsatellites !== 'undefined' && gethdop !== 'undefined') {
                //  console.log('Setting status to true');
                setredisstatus(true);
                setbackstatus(true);
            } else {
                // console.log('Setting status to false');
                setredisstatus(false);
                setbackstatus(false);
            }
        }, 1000); // Execute every 1 second (1000 milliseconds)

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            // console.log('Cleaning up interval');
            clearInterval(intervalId);
        };
    }, [getsatellites, gethdop]); // Include dependencies if necessary

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setCurrentTime(new Date());
    }

    useEffect(() => {

        try {

            const { latitude, longitude, satellites, hdop, age, altitude, deg, speed, humidity, temperature, fahrenheit, BSSID, Gateway_IP, Subnet_Mask, RSSI, Local_IP,Distance } = props.props;
            /* console.log(latitude, longitude, satellites, hdop, age, altitude, deg, speed, humidity, temperature, fahrenheit, BSSID, Gateway_IP, Subnet_Mask, RSSI, Local_IP);
         */    setsatellites(satellites);
            sethdop(hdop);
            setage(age);
            setdeg(deg)
            setspeed(speed);
            setRSSI(RSSI);
            setlatitude(latitude);
            setlongitude(longitude);
            setaltitude(altitude);
            setBSSID(BSSID);
            setGateway_IP(Gateway_IP);
            setdp(Distance);
            setSubnet_Mask(Subnet_Mask);
            setLocal_IP(Local_IP);

        } catch (error) {
            console.error('Error parsing JSON data:', error);
        }
    }, [props.props]);

    //ststus ttesting


    return (

        <div className='mt-5 lg:flex space-x-2 '>
            {/* box1 */}
            <div className='pt-4 pl-5 pr-9 bg-[#172144] rounded-[10px]'>
                <p className='mb-2 font-bold text-gray-400 font-bold '>Vassel Info</p>
                <p>
                    <b>Vassel</b>: DS MARK 42
                </p>
                <p>
                    <b>Type</b>: USV
                </p>
                <p className='flex'>
                    <b>T&D</b>:{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}- <a className=''>{currentTime.toLocaleDateString()}
                    </a>            </p>
                <p className='flex'><b>Status</b> : <a className='text-green-500 pl-2 animate-pulse font-bold'>Online</a></p>

            </div>
            {/* box2 */}
            <div className='  bg-[#172144] rounded-[10px]'>
                <p className='text-[10px] opacity-35 mt-2 ml-2'>Click Icon To Show More Information </p>
                <br></br>
                <div className='lg:flex pt-3 pl-5 pr-4 mt-3  space-x-10'>
             
                    <div className='text-center'>
                        
                        <img src={st} />
                        <p className='font-bold'>{getsatellites}</p>
                    </div>
                    <div className='text-center'>
                        <img src={sp} />
                        <p className='font-bold'>{getspeed}</p>
                    </div>
                    <div className='text-center'>
                        <img src={ti} />
                        <p className='font-bold'>{getage}</p>
                    </div>
                    <div className='text-center'>
                        <img src={se} />
                        <p className='font-bold'>{gethdop}</p>
                    </div>
                    <div className='text-center'>
                        <img src={cm} />
                        <p className='font-bold '>{getdeg}</p>
                    </div>
                    <div className='text-center'>


                        <Popup trigger={<img src={wi} />} position="top center">
                            {close => (
                                <div className="  text-red-50 bg-[#172144] bg-opacity-80  rounded-lg p-2">
                                    <div className='flex'>
                                        <div className='pr-3 w-full'>
                                            Wifi Information
                                        </div>
                                        <img src={cl} className="close w-[20px] h-[20px] mt-[2px]" onClick={close} img />
                                        <p></p>
                                    </div>
                                    <div>
                                        <ul><li>BSSID :
                                            {getBSSID}</li>
                                            <li > Gateway IP :
                                                {getGateway_IP}</li>
                                            <li> Subnet Mask :
                                                {getSubnet_Mask}
                                            </li>
                                            <li> Local IP :
                                                {getLocal_IP}</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </Popup>
                        <p className='font-bold'>{getRSSI}</p>
                    </div>
                </div>
            </div>

            {/* box3 */}
            <div className=' p-5 w-[250px]  bg-[#172144] rounded-[10px]'>
                <p className='text-gray-400 font-bold '>Live Status</p>
               
                <div className='flex mt-2'>
                    
                    <p className='mr-2 font-bold'>Latitude : </p>
                    <p>{getlatitude}</p>
                </div>
                <div className='flex'>
                    <p className='mr-2 font-bold'>Longitude : </p>
                    <p>{getlongitude}</p>
                </div>
                <div className='flex'>
                    <p className='mr-2 font-bold'>Altitude : </p>
                    <p>{getaltitude}</p>
                </div>
                <div className='flex'>
                    <p className='mr-2 font-bold'>Current Depth : </p>
                    <p>{getdp}</p>
                </div>

            </div>

            {/* box4 */}
            <div className='p-4 pr-15 bg-[#172144] rounded-[10px]'>
                <div>
                    <p className='text-gray-400  font-bold '>Centralize System Status</p>
                    <div className='mt-1 text-[15px] mt-2'>
                        <div className='flex space-x-2 items-center'><img src={getwebstatus ? onlineimg : offlineimg} className='w-[15px] h-[15px] animate-pulse' /> <p className='font-bold text-[15px]'>Web Server (ReactJs)</p></div>
                        <div className='flex space-x-2 items-center'><img src={getbackstatus ? onlineimg : offlineimg} className='w-[15px] h-[15px] animate-pulse' /> <p className='font-bold text-[15px]'>Backend Server (NodeJs)</p></div>
                        <div className='flex space-x-2 items-center'><img src={getredisstatus ? onlineimg : offlineimg} className='w-[15px] h-[15px] animate-pulse' /> <p className='font-bold text-[15px]'>Redis(realTime Database)</p></div>


                    </div>
                </div>

            </div>
            {/* box5 */}
            <div className=' bg-[#172144]   p-4  w-auto rounded-[10px]'>
                <div>

                    <p className='text-gray-400    font-bold '>Emergence Controls</p>
                    <div className=''>
                        <p className='text-[9px] opacity-35 mt-1 w-full'> Carefull may cause Damage , Complete Stop for all hardware</p>
                        {/*   <div className='mx-auto  w-10 h-10'><img src={lightoff}></img></div>
                        <div  className='mx-auto w-10 h-10'><img src={hornoff}></img></div> */}
                        <img src={stop} alt="loading" className=' w-[60px] mt-2 mx-auto hover:bg-black hover:p-2 hover:rounded-md' />
                    </div>
                </div>

            </div>
        </div>
    )
}
