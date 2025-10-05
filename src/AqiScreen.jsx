import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Wind, Sunset, Sunrise, Droplets, Thermometer, AlertTriangle, Map as MapIcon, User, SlidersHorizontal, Sun, LineChart, Search, Camera } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Component to inject all CSS styles directly into the document head
const AppStyles = () => {
  const allCss = `
    /* =============== Authentication Pages Styles =============== */
    .authPageWrapper {
      min-height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #222;
      font-family: "Poppins", "Segoe UI", sans-serif;
      color: #fff;
    }
    .device {
      width: 380px;
      max-width: 92vw;
      height: 780px;
      border-radius: 20px;
      padding: 28px;
      box-sizing: border-box;
      background: linear-gradient( to bottom, rgba(167, 216, 255, 1) 16%, rgba(153, 203, 244, 1) 24%, rgba(108, 164, 210, 1) 46%, rgba(0, 71, 128, 1) 100% );
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6), inset 0 -6px 18px rgba(0, 0, 0, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .panel {
      width: 85%;
      height: 85%;
      background: linear-gradient( to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02) );
      border-radius: 10px;
      border: 3px solid rgba(0, 0, 0, 0.85);
      padding: 28px 22px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 4px;
    }
    .avatar svg { width: 44px; height: 44px; }
    .title {
      margin: 8px 0 14px 0;
      font-size: 20px;
      letter-spacing: 0.4px;
      color: rgba(255, 255, 255, 0.95);
      font-weight: 600;
    }
    .authForm {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    .input {
      position: relative;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: 12px 16px;
      border: 1px solid rgba(0, 0, 0, 0.25);
      color: #fff;
    }
    .input input, .input select {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      color: #ffffffcc;
      font-size: 15px;
      font-family: "Poppins", "Segoe UI", sans-serif;
    }
    .input select {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      cursor: pointer;
    }
    .input select option { background-color: #004780; color: #fff; }
    .toggleLinkContainer { margin-top: 15px; font-size: 14px; color: #fff; text-align: center; }
    .toggleLinkContainer a {
      color: #cfe9ff;
      text-decoration: none;
      font-weight: 700;
      margin-left: 6px;
      cursor: pointer;
    }
    .authButton {
      margin-top: 10px;
      align-self: center;
      background: linear-gradient(to bottom, rgba(0, 71, 128, 0.95), rgba(0, 49, 90, 0.95));
      padding: 10px 36px;
      border-radius: 18px;
      border: none;
      color: white;
      font-weight: 800;
      letter-spacing: 0.8px;
      cursor: pointer;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.35);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .authButton:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.45); }
    /* =========== Main Application Styles ============ */
    .container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #000; overflow: hidden; }
    .screen {
      width: 428px; height: 926px;
      max-width: 100vw; max-height: 100vh;
      border-radius: 40px; overflow: hidden; position: relative;
      background-color: #1a1a1a; color: white;
      display: flex; flex-direction: column;
      box-shadow: 0 0 40px rgba(0,0,0,0.5); border: 1px solid #333;
    }
    .backgroundVideo { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; filter: brightness(0.7); }
    .pageContent {
      padding: 24px; padding-bottom: 90px;
      z-index: 1; overflow-y: auto; height: 100%;
      display: flex; flex-direction: column;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6) 100%);
    }
    .statusText { display: flex; justify-content: center; align-items: center; height: 100%; font-size: 1.2rem; color: #ccc; z-index: 5; text-align: center; padding: 20px; }
    .header { text-align: center; margin-bottom: 24px; }
    .header h1 { font-size: 2.5rem; font-weight: 700; margin: 0; }
    .subtitle { font-size: 1rem; opacity: 0.7; }
    .mainContent { flex-grow: 1; }
    .currentWeather { background: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 20px; text-align: center; margin-bottom: 20px; backdrop-filter: blur(10px); }
    .liveAqiValue { font-size: 4rem; font-weight: 800; margin: 10px 0; }
    .advice { font-size: 1.1rem; font-weight: 500; color: #f0f0f0; }
    .forecastGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
    .forecastCard { background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 15px; text-align: center; }
    .forecastCard p { margin: 0 0 8px 0; opacity: 0.8; font-size: 0.9rem; }
    .forecastCard span { font-size: 1.5rem; font-weight: 600; }
    .stationText { text-align: center; font-size: 0.8rem; opacity: 0.6; margin-bottom: 20px; }
    .nearbySection { margin-top: 1rem; }
    .searchBox { display: flex; align-items: center; background: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 8px 15px; margin-bottom: 1rem; }
    .searchBox input { flex-grow: 1; background: transparent; border: none; color: white; outline: none; font-size: 1rem; margin-left: 10px; }
    .searchBox input::placeholder { color: rgba(255, 255, 255, 0.5); }
    .listTitle { font-size: 1.2rem; margin: 1.5rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.2); }
    .aqiCard { background: rgba(255, 255, 255, 0.05); border-radius: 15px; padding: 15px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
    .level { padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 0.9rem; }
    .good { background-color: #22c55e; color: white; }
    .moderate { background-color: #f59e0b; color: white; }
    .unhealthySensitive { background-color: #ef4444; color: white; }
    .unhealthy { background-color: #8b5cf6; color: white; }
    .weatherHeaderTemp { font-size: 5rem; font-weight: 700; margin: 0; }
    .weatherHeaderDesc { font-size: 1.2rem; opacity: 0.8; margin-top: -10px; }
    .hourlyContainer { display: flex; overflow-x: auto; gap: 15px; padding: 15px 0; margin-bottom: 20px; }
    .hourItem { display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 60px; }
    .hourItem img { width: 40px; height: 40px;}
    .detailsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .detailItem { display: flex; align-items: center; gap: 15px; background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 15px; }
    .detailItem p { margin: 0; opacity: 0.7; font-size: 0.9rem; }
    .detailItem span { font-size: 1.1rem; font-weight: 600; }
    .profileHeader { text-align: left; }
    .sectionTitle { font-size: 1.2rem; opacity: 0.8; margin-bottom: 1rem; }
    .profileCard { display: flex; align-items: center; gap: 15px; background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 15px; margin-bottom: 2rem; }
    .profileIcon { width: 50px; height: 50px; border-radius: 50%; background: #4f46e5; display: flex; justify-content: center; align-items: center; font-size: 1.5rem; font-weight: 600; }
    .name { font-size: 1.2rem; font-weight: 600; margin: 0; }
    .email { opacity: 0.7; margin: 0; }
    .optionList { display: flex; flex-direction: column; gap: 1rem; }
    .optionItem { display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 15px; cursor: pointer; }
    .tripForm { display: flex; flex-direction: column; gap: 10px; margin-bottom: 1rem; }
    .tripForm input { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 12px; border-radius: 10px; font-size: 1rem; }
    .tripForm button { background: #4f46e5; color: white; border: none; padding: 12px; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; }
    .tripForm button:disabled { background: #333; cursor: not-allowed; }
    .mapContainer { height: 400px; border-radius: 15px; overflow: hidden; margin-bottom: 1rem; }
    .legendContainer { background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 10px; }
    .legend { display: flex; gap: 20px; align-items: center; }
    .legend div { display: flex; align-items: center; gap: 8px; }
    .legend span { width: 20px; height: 5px; border-radius: 3px; }
    .routeInfo { font-size: 0.9rem; margin-top: 10px; opacity: 0.9; }
    .cameraWrapper { position: relative; width: 100%; height: 100%; overflow: hidden; background: #000; }
    .cameraFeed { width: 100%; height: 100%; object-fit: cover; }
    .aqiOverlay { position: absolute; bottom: 90px; left: 0; right: 0; padding: 20px; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); color: white; text-align: center;}
    .overlayAqiValue { font-size: 3rem; font-weight: 700; }
    .overlayAqiText { font-size: 1rem; margin-bottom: 1rem; }
    .pollutantGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 0.9rem; }
    .pollutantGrid span { display: block; opacity: 0.7; font-size: 0.8rem; }
    .chartContainer { background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 15px; }
    .navBar {
      position: absolute; bottom: 0; left: 0; right: 0;
      height: 85px; background: rgba(20, 20, 20, 0.7);
      backdrop-filter: blur(20px); display: flex;
      justify-content: space-around; align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1); z-index: 100;
    }
    .navItem {
      display: flex; flex-direction: column; align-items: center;
      gap: 5px; color: #888; font-size: 0.7rem;
      background: none; border: none; cursor: pointer;
      position: relative; padding: 10px;
    }
    .navItem.active { color: white; }
    .activeBar {
      position: absolute; top: -1px; left: 50%;
      transform: translateX(-50%); width: 40px;
      height: 3px; background-color: #fff; border-radius: 2px;
    }
  `;
  return <style>{allCss}</style>;
};


const LoginSignUpPage = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !age || !healthCondition) {
      alert("Please fill in all fields, including health condition.");
      return;
    }
    const user = { name, email, age, password, healthCondition };
    localStorage.setItem('weatherAppUser', JSON.stringify(user));
    alert("Sign up successful! Please log in.");
    setIsLoginView(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem('weatherAppUser'));
      if (!storedUser) {
        alert("No user found. Please sign up first.");
        return;
      }
      if (storedUser.email.trim() === loginEmail.trim() && storedUser.password.trim() === loginPassword.trim()) {
        onLogin(storedUser);
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      alert("Could not log in. Please sign up first.");
    }
  };

  const toggleView = (e) => {
    e.preventDefault();
    setIsLoginView(!isLoginView);
  }

  const Avatar = () => (
    <div className="avatar">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3.4" fill="#2b6aa0"></circle>
        <path d="M4 20c0-3.6 3.6-6.5 8-6.5s8 2.9 8 6.5" fill="#2b6aa0"></path>
      </svg>
    </div>
  );

  return (
    <div className="authPageWrapper">
      <div className="device">
        {isLoginView ? (
          <div className="panel">
            <Avatar />
            <h1 className="title">Welcome Back</h1>
            <form onSubmit={handleLogin} className="authForm">
              <label className="input">
                <input type="email" placeholder="Email ID" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
              </label>
              <label className="input">
                <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              </label>
              <button type="submit" className="authButton">LOGIN</button>
            </form>
            <div className="toggleLinkContainer">
              Don't have an account? <a onClick={toggleView}>Sign Up</a>
            </div>
          </div>
        ) : (
          <div className="panel">
            <Avatar />
            <h1 className="title">Create Account</h1>
            <form onSubmit={handleSignUp} className="authForm">
              <label className="input">
                <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label className="input">
                <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label className="input">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <label className="input">
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
              </label>
              <label className="input">
                <select value={healthCondition} onChange={(e) => setHealthCondition(e.target.value)} required>
                  <option value="">Health Condition?</option>
                  <option>None</option>
                  <option>Asthma</option>
                  <option>Allergies</option>
                  <option>Heart Condition</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </label>
              <button type="submit" className="authButton">SIGN UP</button>
            </form>
            <div className="toggleLinkContainer">
              Already have an account? <a onClick={toggleView}>Login</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ForecastPage = ({ locationData }) => {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationData) return;
    const { lat, lon } = locationData.location_coords || { lat: null, lon: null };
    if (!lat || !lon) { setError("Coordinates not available."); setIsLoading(false); return; }

    fetch(`https://weather-app-1-6zck.onrender.com/api/forecast?lat=${lat}&lon=${lon}`)
      .then(res => res.ok ? res.json() : Promise.reject(`API Error: ${res.status}`))
      .then(data => {
        if (data.error) throw new Error(data.error);
        setForecastData(data.forecast);
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [locationData]);

  if (isLoading) return <div className="statusText">🧠 Loading forecast...</div>;
  if (error) return <div className="statusText">⚠️ {error}</div>;
  if (!forecastData) return <div className="statusText">No forecast data available.</div>;

  const chartLabels = forecastData.map(item => new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
  const chartAQIData = forecastData.map(item => item.predicted_aqi);

  const data = {
    labels: chartLabels,
    datasets: [{
      label: 'Predicted AQI',
      data: chartAQIData,
      borderColor: '#818cf8',
      backgroundColor: 'rgba(129, 140, 248, 0.2)',
      fill: true,
      tension: 0.4,
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { color: '#e0e0e0' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      x: { ticks: { color: '#e0e0e0' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
  };

  return (
    <div className="pageContent">
      <header className="header">
        <h1>AQI Forecast</h1>
        <p className="subtitle">Next 30 Days Prediction</p>
      </header>
      <div className="chartContainer">
        <Line options={options} data={data} />
      </div>
      <p className="stationText">Note: This forecast is generated by a predictive model and may differ from official reports.</p>
    </div>
  );
};

const getWeatherBackgroundVideo = (code, isDay) => {
    if (!isDay) return 'night.mp4';
    switch (code) {
        case 1000: return 'sunny.mp4';
        case 1003: case 1006: case 1009: return 'cloudy.mp4';
        case 1030: case 1135: case 1147: return 'misty.mp4';
        case 1063: case 1180: case 1183: case 1186: case 1189: case 1192: case 1195: case 1240: case 1243: case 1246: return 'rainy.mp4';
        case 1066: case 1210: case 1213: case 1216: case 1219: case 1222: case 1225: return 'snowy.mp4';
        case 1087: case 1273: case 1276: return 'stormy.mp4';
        default: return 'day.mp4';
    }
};

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
    <button className={`navItem ${isActive ? 'active' : ''}`} onClick={onClick}>
        {isActive && <div className="activeBar" />}
        <Icon size={24} />
        <span>{label}</span>
    </button>
);

const AqiCard = ({ station }) => {
    let levelClass = '', levelText = '';
    const aqi = Number(station.aqi);
    if (aqi <= 50) { levelClass = 'good'; levelText = 'Good'; }
    else if (aqi <= 100) { levelClass = 'moderate'; levelText = 'Moderate'; }
    else if (aqi <= 150) { levelClass = 'unhealthySensitive'; levelText = 'Unhealthy for Sensitive'; }
    else { levelClass = 'unhealthy'; levelText = 'Unhealthy'; }
    return (
        <div className="aqiCard">
            <p><strong>AQI:</strong> {station.aqi}</p>
            <p className={`level ${levelClass}`}>{levelText}</p>
            <p className="stationLocation">{station.name}</p>
        </div>
    );
};

const CameraPage = ({ aqiData }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        let stream = null;
        const startCamera = async () => {
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                    if (videoRef.current) { videoRef.current.srcObject = stream; }
                }
            } catch (error) { console.error("Error accessing camera:", error); }
        };
        startCamera();
        return () => { if (stream) { stream.getTracks().forEach(track => track.stop()); }};
    }, []);
    if (!aqiData) return <div className="statusText">Loading AQI Data...</div>;
    let levelClass = '';
    const aqi = Number(aqiData.aqi);
    if (aqi <= 50) levelClass = 'good';
    else if (aqi <= 100) levelClass = 'moderate';
    else if (aqi <= 150) levelClass = 'unhealthySensitive';
    else levelClass = 'unhealthy';
    const { pollutants = {} } = aqiData;
    return (
        <div className="cameraWrapper">
            <video ref={videoRef} autoPlay playsInline className="cameraFeed"></video>
            <div className={`aqiOverlay ${levelClass}`}>
                <div className="overlayAqiValue">{aqiData.aqi}</div>
                <div className="overlayAqiText">{aqiData.advice}</div>
                <div className="pollutantGrid">
                    {pollutants.pm25 && <div><span>PM2.5</span>{pollutants.pm25}</div>}
                    {pollutants.pm10 && <div><span>PM10</span>{pollutants.pm10}</div>}
                    {pollutants.o3 && <div><span>Ozone</span>{pollutants.o3}</div>}
                    {pollutants.no2 && <div><span>NO₂</span>{pollutants.no2}</div>}
                    {pollutants.so2 && <div><span>SO₂</span>{pollutants.so2}</div>}
                </div>
            </div>
        </div>
    );
};

const AqiPage = ({ data, location }) => {
    if (!data || !location) return null;
    const { pollutants = {} } = data;
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        setSearchResults([]);
        fetch(`https://weather-app-1-6zck.onrender.com/api/search-aqi?keyword=${searchQuery}`)
            .then(res => res.json())
            .then(data => { setSearchResults(data); setIsSearching(false); })
            .catch(err => { console.error("Search failed:", err); setIsSearching(false); });
    };
    return (
        <div className="pageContent">
            <header className="header"><h1>{location.town}</h1><p className="subtitle">{location.district}</p></header>
            <main className="mainContent">
                <div className="currentWeather"><p>LIVE AIR QUALITY INDEX</p><h2 className="liveAqiValue">{data.aqi}</h2><p className="advice">{data.advice}</p><p className="subtitle">PM2.5: {pollutants.pm25 || 'N/A'}</p></div>
                <div className="forecastGrid"><div className="forecastCard"><p>PM10</p><span>{pollutants.pm10 || 'N/A'}</span></div><div className="forecastCard"><p>Ozone (O₃)</p><span>{pollutants.o3 || 'N/A'}</span></div><div className="forecastCard"><p>SO₂</p><span>{pollutants.so2 || 'N/A'}</span></div><div className="forecastCard"><p>NO₂</p><span>{pollutants.no2 || 'N/A'}</span></div></div>
                <p className="stationText">Station: {data.station}</p>
                <div className="nearbySection">
                    <form onSubmit={handleSearch}><div className="searchBox"><Search size={18} className="searchIcon" /><input type="text" placeholder="Search for any location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div></form>
                    {isSearching && <p>Searching...</p>}
                    {searchResults.length > 0 && (<div><h3 className="listTitle">Results for "{searchQuery}"</h3>{searchResults.map(station => <AqiCard key={station.uid} station={station} />)}</div>)}
                    {!isSearching && searchResults.length === 0 && searchQuery && ( <p>No stations found for "{searchQuery}".</p> )}
                </div>
            </main>
        </div>
    );
};

const WeatherPage = ({ weatherData, aqiData }) => {
    if (!weatherData || !aqiData) return null;
    const { current, astro, hourly } = weatherData;
    return (
        <div className="pageContent">
            <header className="header"><h2 className="weatherHeaderTemp">{Math.round(current.temp)}°C</h2><p className="weatherHeaderDesc">{current.description}</p></header>
            <div className="hourlyContainer">{hourly.map((hour, index) => ( <div key={index} className="hourItem"><span>{new Date(hour.time * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}</span><img src={`https:${hour.icon}`} alt="" /><span>{Math.round(hour.temp)}°</span></div> ))}</div>
            <div className="detailsGrid"><div className="detailItem"><Sunrise size={24} /><div><p>Sunrise</p><span>{astro.sunrise}</span></div></div><div className="detailItem"><Sunset size={24} /><div><p>Sunset</p><span>{astro.sunset}</span></div></div><div className="detailItem"><Droplets size={24} /><div><p>Humidity</p><span>{current.humidity}%</span></div></div><div className="detailItem"><Wind size={24} /><div><p>Wind</p><span>{current.wind_kph} km/h</span></div></div><div className="detailItem"><Thermometer size={24} /><div><p>UV Index</p><span>{current.uv}</span></div></div><div className="detailItem"><AlertTriangle size={24} /><div><p>AQI</p><span>{aqiData.aqi}</span></div></div></div>
        </div>
    );
};

const ProfilePage = ({ user, onLogout }) => {
    const options = ["Personal Information", "Notifications", "Privacy and Data", "Help Center", "About"];
    return (
        <div className="pageContent">
            <header className="profileHeader"><h1>PROFILE</h1></header>
            <h2 className="sectionTitle">Account Centre</h2>
            <div className="profileCard"><div className="profileIcon">{user.name.charAt(0)}</div><div className="profileInfo"><p className="name">{user.name}</p><p className="email">{user.email}</p></div></div>
            <div className="optionList">{options.map(option => (<div key={option} className="optionItem">{option}<ChevronRight size={20} opacity={0.5} /></div>))}<div key="Logout" className="optionItem" onClick={onLogout}>Log Out<ChevronRight size={20} opacity={0.5} /></div></div>
        </div>
    );
};

const TripPlannerPage = () => {
    const mapRef = useRef(null);
    const [leafletLoaded, setLeafletLoaded] = useState(!!window.L);
    const [start, setStart] = useState('');
    const [destination, setDestination] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [routes, setRoutes] = useState(null);
    const [routeInfo, setRouteInfo] = useState('');

    useEffect(() => {
        if (window.L) return;

        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        cssLink.id = 'leaflet-css';
        document.head.appendChild(cssLink);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.id = 'leaflet-js';
        script.onload = () => setLeafletLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.getElementById('leaflet-css')?.remove();
            document.getElementById('leaflet-js')?.remove();
        };
    }, []);

    useEffect(() => {
        if (leafletLoaded && !mapRef.current) {
            const map = window.L.map('trip-map-container').setView([20.5937, 78.9629], 4);
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
            mapRef.current = map;
        }
    }, [leafletLoaded]);

    useEffect(() => {
        if (routes && mapRef.current && window.L) {
            const map = mapRef.current;
            const L = window.L;
            map.eachLayer(layer => { if (layer instanceof L.GeoJSON || layer instanceof L.CircleMarker) map.removeLayer(layer); });
            
            const standardRouteLayer = L.geoJSON(routes.standard_route, { style: { color: '#3b82f6', weight: 6, opacity: 0.8 } }).addTo(map);
            
            if(routes.warning) {
                alert(routes.warning);
                setRouteInfo('');
            } else if (JSON.stringify(routes.standard_route) === JSON.stringify(routes.clean_route)) {
                setRouteInfo('The fastest route already has the best air quality.');
            } else {
                L.geoJSON(routes.clean_route, { style: { color: '#22c55e', weight: 6, opacity: 0.8 } }).addTo(map);
                setRouteInfo('The green route is recommended for cleaner air, avoiding polluted zones.');
            }
            routes.stations.forEach(station => {
                let color = station.aqi > 100 ? '#ef4444' : '#f59e0b';
                L.circleMarker([station.lat, station.lon], { radius: 5, color, fillColor: color, fillOpacity: 1 }).addTo(map).bindPopup(`AQI: ${station.aqi}`);
            });
            const bounds = standardRouteLayer.getBounds();
            if(bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [routes]);
    
    const handleFindRoute = (e) => {
        e.preventDefault();
        if (!start || !destination) { setError("Please enter both a start and destination."); return; }
        setIsLoading(true);
        setError(null);
        setRoutes(null);
        setRouteInfo('');
        fetch(`https://weather-app-1-6zck.onrender.com/api/clean-route?start=${start}&end=${destination}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setRoutes(data);
                setIsLoading(false);
            })
            .catch(err => { setError(`Failed to find routes: ${err.message}`); setIsLoading(false); });
    };

    if (!leafletLoaded) {
        return <div className="statusText">🗺️ Loading map...</div>
    }

    return (
        <div className="pageContent">
            <header className="header"><h1>Clean Air Route Planner</h1></header>
            <form className="tripForm" onSubmit={handleFindRoute}><input type="text" value={start} onChange={e => setStart(e.target.value)} placeholder="Starting location..." /><input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination..." /><button type="submit" disabled={isLoading}>{isLoading ? "Finding..." : "Find Route"}</button></form>
            {error && <p className="errorText">{error}</p>}
            <div id="trip-map-container" className="mapContainer"></div>
            {routes && (
                <div className="legendContainer">
                    <div className="legend">
                        <div><span style={{backgroundColor: '#3b82f6'}}></span> Standard Route</div>
                        {!routes.warning && JSON.stringify(routes.standard_route) !== JSON.stringify(routes.clean_route) && <div><span style={{backgroundColor: '#22c55e'}}></span> Cleaner Route</div>}
                    </div>
                    {routeInfo && <p className="routeInfo">{routeInfo}</p>}
                </div>
            )}
        </div>
    );
};

const AqiScreen = () => {
  const [user, setUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState('AQI');
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundVideo, setBackgroundVideo] = useState('day.mp4');

  useEffect(() => {
    const storedUser = localStorage.getItem('weatherAppUser');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    } else {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    let watchId = null;
    const fetchDataForPosition = (position) => {
      const { latitude, longitude } = position.coords;
      setIsLoading(true);

      fetch(`https://weather-app-1-6zck.onrender.com/api/live-data?lat=${latitude}&lon=${longitude}`)
        .then(res => res.ok ? res.json() : Promise.reject(`API Error: ${res.status}`))
        .then(mainData => {
          if (mainData.error) throw new Error(mainData.error);
          setLocationData({ ...mainData, location_coords: { lat: latitude, lon: longitude } });
          const { weatherCode, isDay } = { weatherCode: mainData.weatherData.current.condition_code, isDay: mainData.weatherData.current.is_day };
          setBackgroundVideo(getWeatherBackgroundVideo(weatherCode, isDay));
          setError(null);
        })
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    };

    const handleGeoError = (geoError) => { setError(`Location Error: ${geoError.message}`); setIsLoading(false); };
    watchId = navigator.geolocation.watchPosition(fetchDataForPosition, handleGeoError, { enableHighAccuracy: true });
    return () => { if (watchId) navigator.geolocation.clearWatch(watchId); };
  }, [user]);

  const handleLogout = () => { setUser(null); setLocationData(null); setActiveScreen('AQI'); };

  const renderMainApp = () => {
    if (isLoading && !locationData) return <div className="statusText">🛰️ Fetching live data...</div>;
    if (error) return <div className="statusText">⚠️ {error}</div>;
    if (!locationData && user) return <div className="statusText">Awaiting location permissions...</div>;

    switch(activeScreen) {
      case 'AQI': return <AqiPage data={locationData.aqiData} location={locationData.location} />;
      case 'Weather': return <WeatherPage weatherData={locationData.weatherData} aqiData={locationData.aqiData} />;
      case 'Map': return <TripPlannerPage />;
      case 'Camera': return <CameraPage aqiData={locationData.aqiData} />;
      case 'Forecast': return <ForecastPage locationData={locationData} />;
      case 'Profile': return <ProfilePage user={user} onLogout={handleLogout} />;
      default: return null;
    }
  };

  if (!user) {
    return (
        <>
            <AppStyles />
            <LoginSignUpPage onLogin={(loggedInUser) => { setUser(loggedInUser); setIsLoading(true); }} />
        </>
    );
  }

  return (
    <>
      <AppStyles />
      <div className="container">
        <div className="screen">
          {activeScreen !== 'Profile' && activeScreen !== 'Camera' && activeScreen !== 'Forecast' &&
            <video key={backgroundVideo} autoPlay loop muted className="backgroundVideo"><source src={backgroundVideo} type="video/mp4" /></video>
          }
          {renderMainApp()}
          <nav className="navBar">
            <NavItem icon={SlidersHorizontal} label="AQI" isActive={activeScreen === 'AQI'} onClick={() => setActiveScreen('AQI')} />
            <NavItem icon={Sun} label="Weather" isActive={activeScreen === 'Weather'} onClick={() => setActiveScreen('Weather')} />
            <NavItem icon={LineChart} label="Forecast" isActive={activeScreen === 'Forecast'} onClick={() => setActiveScreen('Forecast')} />
            <NavItem icon={MapIcon} label="Map" isActive={activeScreen === 'Map'} onClick={() => setActiveScreen('Map')} />
            <NavItem icon={Camera} label="Camera" isActive={activeScreen === 'Camera'} onClick={() => setActiveScreen('Camera')} />
            <NavItem icon={User} label="Profile" isActive={activeScreen === 'Profile'} onClick={() => setActiveScreen('Profile')} />
          </nav>
        </div>
      </div>
    </>
  );
};

export default AqiScreen;

