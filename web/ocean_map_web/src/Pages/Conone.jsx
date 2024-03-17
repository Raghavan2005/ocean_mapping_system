import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Status from './Status'
import Switch from "react-switch";
import box from '../assets/box.png';
import boatimg from '../assets/boat.jpg'
import update from '../assets/update.png'
import lighton from '../assets/light-on.png';
import lightoff from '../assets/light-off.png';
import hornon from '../assets/horn.png';
import hornoff from '../assets/no-horn.png';
import st from '../assets/st.png';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, Circle, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

export default function Conone(props, web) {
  const [center, setCenter] = useState(null);
  const [livegps, setlivegps] = useState({ lat: 11.203516, lng: 77.344818 });
  const [rotation, setRotation] = useState(0);
  const [checked, setChecked] = useState(true);
  const [checkedauto, setCheckedauto] = useState(false);
  const [disable, setdisable] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [getspeedau, setspeedau] = useState(0)
  const [longitude, setLongitude] = useState(null);
  //asda 1111==0000
  const [getcontrol, setcontrol] = useState([0, 0]);
  const [getcontrolhl, setcontrolhl] = useState([0, 0]);
  const [horn, sethorn] = useState(false);
  const [light, setlight] = useState(false);
  const [error, setError] = useState(null);
  const [distance, setdistance] = useState(0);
  const [autodistance, setautodistance] = useState(2);
  const [length, setLength] = useState(2); //r
  const [width, setWidth] = useState(2); //r
  const [rectangle, setRectangle] = useState(null);
  const [rgcenter, setrgCenter] = useState([11.203516, 77.344818]);
  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };
  const handleChangeauto = nextChecked => {
    setCheckedauto(nextChecked)
    setChecked(true);
   
    if(nextChecked){
      //autocoontroll
      
      onecon(0, 5)
      setspeedau(20)
      setRotation(0)
    }
    else{

      setRotation(0)
      onecon(0, 0)
    }
    setdisable(nextChecked)
  };
  function onecon(index, newval) {
    // This is just an example, you can use any value you want

    // Create a new array with the updated value at the second index
    const updatedArray = [...getcontrol];
    updatedArray[index] = newval;
    setcontrol(updatedArray);
    //console.log(getcontrol)


  }
  function twocon(index1, newval2) {
    // This is just an example, you can use any value you want

    // Create a new array with the updated value at the second index
    const updatedArray2 = [...getcontrolhl];
    updatedArray2[index1] = newval2;
    setcontrolhl(updatedArray2);
    //console.log(getcontrol)


  }
  const handleChangenumber = (e) => {
    setautodistance(e.target.value);
    if(e.target.value=='0'){
      onecon(0, 0)
    }else{
      onecon(0, 5)
    }
 
    setLength(autodistance);
    setWidth(autodistance);

  };
  const metersToDegrees = (meters) => {

    return meters * 50 / 111000;

  };
  const drawRectangle = () => {
    const latLng1 = rgcenter;

    // Convert the latitude and longitude coordinates to numbers
    const latLng1Numbers = latLng1.map(coord => parseFloat(coord));

    // Calculate the new coordinates for the opposite corner of the rectangle
    const latLng2 = [
      latLng1Numbers[0] + metersToDegrees(width), // Latitude
      latLng1Numbers[1] + metersToDegrees(length)  // Longitude
    ];

    // Round the coordinates to 5 decimal places
    const latLng1Formatted = latLng1Numbers.map(coord => coord.toFixed(5));
    const latLng2Formatted = latLng2.map(coord => coord.toFixed(5));

    // Calculate bounds for the rectangle
    const bounds = [latLng1Formatted, latLng2Formatted];
    //console.log(bounds);

    // Update the rectangle bounds
    setRectangle(bounds);
  };
  function getvaluenum(rgxm) {
    switch (rgxm) {
      case 0:
        return 0;
        break;
      case 20:
        return 1;
        break;
      case 40:
        return 2;
        break;
      case 60:
        return 3;
        break;
      case 80:
        return 4;
        break;
      default:

        return 5;
    }
  }
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Send a message through WebSocket every 2000 milliseconds
      // Adjust the message according to your requirement
      // For example, here we are just sending 'Hello from client'
 
     
    //  twocon(1,setlightfun())
   
      onecon(1, getvaluenum(getspeedau))
     // twocon(0,sethornandlight())
      // ar.concat(getcontrol,getcontrolhl)
     // console.log(getcontrol)
      props.web.send(getcontrol+','+horn+','+light+','+autodistance);
      //
    }, 200);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [getcontrol]); // Run once on component mount


  useEffect(() => {
    try {
      const { latitude, longitude } = props.props;
      
      // Update data array using the setter function provided by useState
      setlivegps({ lat: latitude, lng: longitude });
      console.log(livegps)
      if(center==null){
      setCenter(livegps);
    }
    } catch (error) {
      console.error('Error parsing JSON data:', error);
    }
  }, [props.props]);
  const maxRotation = 50; // Maximum allowed rotation in degrees
  const minRotation = -50;
  const ZOOM_LEVEL = 17;
  const mapRef = useRef();
  const legalIcon = new Icon({
    iconUrl: 'https://img.icons8.com/flat-round/64/dive-boat.png',
    iconSize: [25, 25], // size of the icon
    iconAnchor: [10, 12], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor

  })//
  const legalIcon1 = new Icon({
    iconUrl: 'https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/66/external-Control-Center-space-and-planets-smashingstocks-glyph-smashing-stocks.png',
    iconSize: [25, 25], // size of the icon
    iconAnchor: [10, 12], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor

  })//

  const purpleOptions = { color: 'purple' }//
  let newRotation = rotation;
  const handleKeyDown = (event) => {
    if (event.key === 'H' || event.key === 'h') {
      sethorn(true);
    }
  };

  // Event handler to set horn to false when 'H' key is released
  const handleKeyUp = (event) => {
    if (event.key === 'H' || event.key === 'h') {
      sethorn(false);
    }
  };
  useEffect(() => {

    const handleKeyDown = (event) => {
      /* onecon(2, 3);
      onecon(3, setlightfun()); */
      if (event.key === 'h') {
        // Toggle the value of horn
        sethorn((prevHorn) => !prevHorn);
      }
      if (event.key === 'l') {
        // Toggle the value of horn
        setlight((prevlight) => !prevlight);
      }

      if (!checked) {


        if (event.key === 'a') {
          onecon(0, 3)
          newRotation -= 10;

        }
        if (event.key === 'w') {
          onecon(0, 1)


        }
        if (event.key === 'd') {
          onecon(0, 2)
          newRotation += 10;
        }
        if (newRotation > maxRotation) {
          newRotation = maxRotation;
        } else if (newRotation < minRotation) {
          newRotation = minRotation;
        }
        setRotation(newRotation);
      }

      if (event.key === 's') {
        onecon(0, 4)
      }
      if (event.key === 'r') {
        onecon(0, 0)
        if (checked) {

          setRotation(0)
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [rotation, checked, maxRotation, minRotation]);
  //auto.\

  const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 20,
      label: '20%',
    },
    {
      value: 40,
      label: '40%',
    },
    {
      value: 60,
      label: '60%',
    },
    {
      value: 80,
      label: '80%',
    },
    {
      value: 100,
      label: '100%',
    },
  ];
  const sliderchange = (event, newValue) => {
   // console.log(newValue)
    setspeedau(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
  }

  //
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };


  const gethomemeter = () => {
    if (checkedauto) {
      function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180; // Convert degrees to radians
        const dLon = (lon2 - lon1) * Math.PI / 180; // Convert degrees to radians
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
      }
      getLocation()
      setdistance(calculateDistance(latitude, longitude, livegps.lat, livegps.lng))
       setrgCenter([center.lat, center.lng])
      drawRectangle() 
    }
  }

  const toggleHorn = () => {
    sethorn((!horn));
  }

  const togglelight = () => {
    setlight((!light));
  }

  return (

    <div className=' lg:flex  space-x-5 space-y-5' >

      <div className='lg:w-full'>      <div className=' p-3 shrink-0 bg-[#172144] rounded-[10px]' id="map">


        {/* google start */}
        <div className='h-[380px] p-1'>
          {center!=null&&(
          <MapContainer
            className="rounded-lg"
            center={center}
            zoom={ZOOM_LEVEL}
            maxZoom={17}
            zoomControl={false}

            style={{ height: '100%', width: '100%' }}
          >
      
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />
             {livegps && livegps.lat && livegps.lng && (
  <Marker position={[livegps.lat, livegps.lng]} icon={legalIcon}>
    <Popup>
      <div className='flex h-1/2'>
        <button className='bg-black text-white p-2 rounded-xl'> AC</button>
        <p className='pl-1'>click to Auto align</p>
      </div>
    </Popup>
  </Marker>
)}

           
            {true && (<FeatureGroup pathOptions={purpleOptions}>
              <Popup>Popup in FeatureGroup</Popup>
              {/*  //<Circle center={livegps} radius={35} /> */}
              {rectangle && (
                <Rectangle bounds={rectangle} stroke={false} />
              )}
            </FeatureGroup>)}

          </MapContainer>)}
        </div>

        {/* google end */}

      </div>

        <div className='mt-6  lg:flex h-1/1  space-x-3' >

          <div className='lg:w-1/2 p-5 bg-[#172144] rounded-[10px] ' tabIndex={0}>
            <div className='flex  ' > <img className='h-[33px]' onClick={toggleHorn} src={horn ? hornon : hornoff} alt="sadasda" /><img className='h-[33px] mr-1 mx-auto' onClick={togglelight} src={light && lighton || lightoff} alt="sadasda" /></div>
            <div className='flex'>
              <div className=''
              >
                <img style={{
                  transform: `rotate(${rotation}deg)`, // Apply the rotation here
                  transition: 'transform 0.3s ease' // Add transition for smooth animation
                }} className='mx-auto  h-1/2 ' src="https://img.icons8.com/external-filled-outline-satawat-anukul/64/external-carservice-car-service-filled-outline-filled-outline-satawat-anukul-12.png" />




                <div className='flex mt-5'>            <Switch
                  onChange={handleChange}
                  checked={checked}
                  disabled={disable}
                  checkedIcon={false}
                  onColor="#FF0000"
                  uncheckedIcon={false}
                />
                  <p className='ml-10'>
                    Steering Lock <span className='font-bold'>{checked ? "on" : "off"}</span>.
                  </p>

                </div>
                <div className='mt-4 ' >
                  <Box sx={{
                    width: 310,
                  }} >
                    <Slider
                      aria-label="Restricted values"
                      defaultValue={0}
                      color='primary'
                      onChange={sliderchange}
                     
                      disabled={disable}
                      step={null}
                      valueLabelDisplay="auto"
                      marks={marks}
                      sx={{
                        '& .MuiSlider-thumb': {
                          color: 'white',
                        },
                        '& .MuiSlider-markLabel': {
                          color: 'white',
                        },
                      }}
                    />
                  </Box>
                </div>

              </div>

            </div>

          </div>
          <div className='lg:w-1/2 p-6   shrink-0 bg-[#172144] rounded-[10px]'>
            <div className='flex m-2'>
              <p className='mr-2'><b> Autopilot</b></p>
              <Switch
                onChange={handleChangeauto}
                checked={checkedauto}
                checkedIcon={false}
                onColor="#FF02"
                uncheckedIcon={false}
              />
              <img src={update} onClick={gethomemeter} className='h-9 ml-[150px] mb-1 animate-pulse hover:animate-spin' />
            </div>
            <hr></hr>
            <div className='flex'>
              <div className='w-1/2 mt-5 '>
                <p className='text-center w-1/2'>{autodistance} B</p>
                <div className='flex'>
                  <img src={box} className='w-[100px]' />
                  <p className=' my-auto'>{autodistance} L</p>
                </div>

              </div>

              <div className=' mt-5 text-[16px]'> <br /><div className='flex'>Max Speed : <p className='font-bold text-green-600'>40%</p></div>

                <div className='flex'>

                  <div >From  Control-</div>
                  <p className='font-bold text-green-600'>{distance.toFixed(2, 4)} km</p>
                </div>     <div className='flex'>Return Home-<p className='font-bold text-green-600'>Enabled</p></div>
                {/*  <div className=' p-2 my-auto'>                
                <div className=' mt-2   h-[35px] w-[35px] flex '> <img className='mx-auto' src={hornon} />  <img src={lighton} className='mx-auto ml-5 ' /> </div>
                </div> */}

              </div>
              {/* <div>
                <button onClick={getLocation}>Get Location</button>
                {latitude && longitude && (
                  <p>
                    Latitude: {latitude}, Longitude: {longitude}
                  </p>
                )}
                {error && <p>Error: {error}</p>}
              </div> */}
            </div>


            <div className='flex'> <p className='mr-3 font-bold'>Distance Input</p><input disabled={!checkedauto} min={1} max={20} onChange={handleChangenumber} name="distance" defaultValue="2"  type='number' className=' rounded-md text-black border-green-500 border-2 ps-2' />
            </div>
          </div>
        </div>
      </div>


    </div >
  );
}
