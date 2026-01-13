import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Wind,
  Sun,
  Battery,
  Mail,
  Linkedin,
  Github,
  Calendar,
  DollarSign,
  Zap,
} from 'lucide-react';

// PLACEHOLDER DATA - Replace with your real data later
const sampleEnergyData = [
  {
    date: 'Jan 1',
    solar: 45,
    wind: 12,
    total: 57,
    batterySOC: 85,
    windSpeed: 3.2,
    temperature: 10,
    humidity: 80,
  },
  {
    date: 'Jan 2',
    solar: 52,
    wind: 9,
    total: 61,
    batterySOC: 85,
    windSpeed: 3,
    temperature: 7,
    humidity: 60,
  },
  {
    date: 'Jan 3',
    solar: 38,
    wind: 18,
    total: 56,
    batterySOC: 85,
    windSpeed: 4,
    temperature: 11,
    humidity: 90,
  },
  {
    date: 'Jan 4',
    solar: 58,
    wind: 14,
    total: 72,
    batterySOC: 85,
    windSpeed: 3.7,
    temperature: 9,
    humidity: 70,
  },
  {
    date: 'Jan 5',
    solar: 48,
    wind: 10,
    total: 58,
    batterySOC: 85,
    windSpeed: 3.1,
    temperature: 6,
    humidity: 80,
  },
  {
    date: 'Jan 6',
    solar: 32,
    wind: 24,
    total: 56,
    batterySOC: 85,
    windSpeed: 4.5,
    temperature: 10,
    humidity: 50,
  },
  {
    date: 'Jan 7',
    solar: 62,
    wind: 15,
    total: 77,
    batterySOC: 85,
    windSpeed: 3.7,
    temperature: 9,
    humidity: 60,
  },
];
const sampleCostData = [
  { month: 'Jan', traditional: 120, hybrid: 45 },
  { month: 'Feb', traditional: 115, hybrid: 50 },
  { month: 'Mar', traditional: 110, hybrid: 40 },
  { month: 'Apr', traditional: 105, hybrid: 35 },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const pages = [
    { id: 'home', name: 'Home' },
    { id: 'data', name: 'Data & Analysis' },
    { id: 'blog', name: 'Research Blog' },
    { id: 'procedure', name: 'Procedure' },
    { id: 'conclusion', name: 'Is It Possible?' },
    { id: 'credits', name: 'Credits' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Wind className="w-6 h-6 text-emerald-400" />
              <span className="font-bold text-lg hidden sm:block">
                Oregon Renewable Energy Research
              </span>
              <span className="font-bold text-lg sm:hidden">OR Energy</span>
            </div>
            <div className="flex space-x-1 sm:space-x-4">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded transition-colors ${
                    currentPage === page.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'data' && <DataPage />}
        {currentPage === 'blog' && <BlogPage />}
        {currentPage === 'procedure' && <ProcedurePage />}
        {currentPage === 'conclusion' && <ConclusionPage />}
        {currentPage === 'credits' && <CreditsPage />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2026 Micah Hanke. All rights reserved.</p>
          <p className="mt-2">Cottage Grove High School | Class of 2027</p>
        </div>
      </footer>
    </div>
  );
}

async function fetchDataFromSheets() {
  try {
    const SHEET_URL =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_XYbFemkaQLH0l_bB5ozp7_G9J7XwCbZBXAhgVtrA0Ldr2ZlVaw9rYGv4fZsbWzkaJotExRpFuJZW/pub?gid=798846225&single=true&output=csv';

    const response = await fetch(SHEET_URL);
    const csvText = await response.text();

    // Parse CSV to JSON
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');

    const data = lines.slice(1).map((line) => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, i) => {
        // Clean header name and convert to camelCase
        const key = header.trim().replace(/\s+/g, '');
        obj[key] = isNaN(values[i]) ? values[i] : parseFloat(values[i]);
      });
      return obj;
    });

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// ==================== PAGE 1: HOME ====================
function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Making Renewable Energy Reliable
        </h1>
        <p className="text-xl text-slate-300 mb-2">
          Battery Storage and Control Strategies for Hybrid Wind/Solar Systems
        </p>
        <p className="text-slate-400">
          Cottage Grove, Oregon | December 2025 - November 2026
        </p>
      </section>

      {/* Who Am I Section */}
      <section className="mb-16 bg-slate-800/50 rounded-lg p-8 border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 text-emerald-400">
          About the Researcher
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-slate-200">
              Micah Hanke
            </h3>
            <p className="text-slate-300 mb-4">
              I am a Junior in highschool and am facinated by how energy in
              generated and stored. As a result I came up with this project to
              learn more about energy genteration and starage efficiency applied
              to actual usecases.
            </p>
            <p className="text-slate-300">
              I am working toward a career in Energy Engineering, and am excited
              to see how this project progresses that goal!
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-emerald-400">
              I do lots of stuff but I'll try to keep this up to date!
            </h4>
            <ul className="text-slate-300 space-y-2 text-sm">
              <h5 className="font-semibold mb-3 text-blue-400">Classes:</h5>
              <li>• AP Calculus (current), AP Precalculus (Score: 5)</li>
              <li>• College Now Physics (A), Chemistry (current)</li>
              <li>• Computer Science: Python, Arduino/ESP32, Linux</li>
              <h5 className="font-semibold mb-3 text-blue-400">Clubs:</h5>
              <li>• Environmental Club member, HACK Club leader</li>
              <h5 className="font-semibold mb-3 text-blue-400">Sports:</h5>
              <li>• Cross Country (2022-Current)</li>
              <li>• Track and Field (2023-Current)</li>
              <li>• Wrestling (2023-2024) </li>
              <li>• Swimming (2024-2026)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Main Project Explanation - Single Open Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-emerald-400 text-center">
          The Project
        </h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-slate-200">
              Core Research Question
            </h3>
            <p className="text-xl text-slate-300 italic mb-4">
              "Does battery storage make hybrid wind/solar systems reliable and
              affordable enough for practical residential use in Oregon's
              challenging climate?"
            </p>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-semibold mb-4 text-emerald-400">
              Why This Project Matters
            </h3>
            <p className="text-slate-300 mb-4">
              Oregon's climate is not the most ideal for renweable energy. With
              could cover as often as half of the year and winds that can't even
              steal a child's baloon there just is not much energy to capture.
              With this in mind, how can a resident know if the whole concept of
              renewable energy is even possible or worth it for them?
            </p>
            <p className="text-slate-300 mb-4">
              This project aims to provide honest, locally-relevant performance
              data—not manufacturer marketing claims. Through systematic
              measurement and testing, I'll determine whether hybrid wind/solar
              systems with battery storage can realistically meet residential
              energy needs in Oregon's climate while also not being
              prohibitively expensive.
            </p>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-semibold mb-4 text-emerald-400">
              The Approach
            </h3>
            <p className="text-slate-300 mb-4">
              Using a four-phase methodology spanning January through August
              2026, I'll test a hybrid renewable energy system under real Oregon
              weather conditions:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900/50 p-4 rounded border border-slate-600">
                <p className="font-semibold text-emerald-400 mb-2">
                  Phase 1: Baseline Measurement
                </p>
                <p className="text-slate-400 text-sm">
                  Run wind and solar without battery storage to understand how
                  big the reliability gap really is
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded border border-slate-600">
                <p className="font-semibold text-cyan-400 mb-2">
                  Phase 2: Simple Battery Control
                </p>
                <p className="text-slate-400 text-sm">
                  Add battery storage and measure improvement in system
                  reliability
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded border border-slate-600">
                <p className="font-semibold text-amber-400 mb-2">
                  Phase 3: Advanced Control
                </p>
                <p className="text-slate-400 text-sm">
                  Test multiple control strategies to optimize battery
                  performance and increase efficiency (this is what will
                  hopefully make things cheeper for you)
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded border border-slate-600">
                <p className="font-semibold text-violet-400 mb-2">
                  Phase 4: Turbine Optimization
                </p>
                <p className="text-slate-400 text-sm">
                  Design custom turbines optimized for low-wind Willamette
                  Valley conditions (more power from the system equals better
                  P.S. I also want to see if I can reduce cost of getting the
                  turbine for people. Mine was $340 with shipping!)
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-semibold mb-4 text-emerald-400">
              Equipment & Methods
            </h3>
            <p className="text-slate-300 mb-4">
              The system uses commercial wind turbine and solar panels, battery
              storage, and automated data collection via ESP32 microcontroller
              with WiFi logging. A custom weather station (DHT22 sensor (this
              was a poor choice for my ), anemometer) records local conditions
              every minute, enabling correlation between weather patterns and
              energy generation.
            </p>
            <p className="text-slate-300">
              All data collection is automated to accommodate my schedule
              because as a full time student athlete I don't have much time to
              do mainenence. With an automated system only 30 minutes per week
              is needed for system maintenance and data review. Which works
              great because then all information is live and people can see real
              time data.
            </p>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-semibold mb-4 text-emerald-400">
              Community Impact
            </h3>
            <p className="text-slate-300 mb-4">
              Everyone hears about climate change and switching to renewable
              energy, but all they see is a huge bill they can afford and a lot
              of extra work with little to no payout. I want to make it so
              people in my community know if it is possible for them to have a
              renewable energy system without using their kids college money.
              With transparent performance expectation baised on local data I
              hope to give people the information to know if they can or even
              should switch.
            </p>
            <p className="text-slate-300">
              Upon completion, I'll present findings to local schools, community
              groups, and city planning discussions. The goal isn't to "sell"
              renewable energy—it's to provide our community with honest data
              for informed decision-making about energy independence. (Even
              though I think anyone who can should, especially if this research
              study turns out to give the data I hope for)
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mb-16 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-emerald-700/50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-emerald-400 text-center">
          Mission Statement
        </h2>
        <p className="text-lg text-slate-200 leading-relaxed text-center max-w-4xl mx-auto">
          This independent research project seeks to
        </p>
      </section>

      {/* Contact Section */}
      <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-emerald-400 text-center">
          Contact
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <Mail className="h-8 text-emerald-400 mx-auto mb-2" />
            <p className="font-semibold mb-1">Email</p>
            <a
              href="mailto:micah.hanke@gmail.com"
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              micah.hanke@gmail.com
            </a>
          </div>
          <div className="text-center">
            <Github className="h-8 text-emerald-400 mx-auto mb-2" />
            <p className="font-semibold mb-1">GitHub</p>
            <a
              href="https://github.com/shannonjustice08"
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              github.com/shannonjustice08
            </a>
          </div>
          {/* <div className="text-center">
            <Linkedin className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="font-semibold mb-1">LinkedIn</p>
            <a
              href="https://linkedin.com/in/yourusername"
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              linkedin.com/in/yourusername
            </a> */}
          {/* </div> */}
        </div>
        <p className="text-center text-slate-400 mt-6 text-sm">
          Available for mentorship discussions, community presentations, and
          collaboration opportunities
        </p>
      </section>
    </div>
  );
}

// ==================== PAGE 2: DATA & ANALYSIS ====================
function DataPage() {
  const [liveData, setLiveData] = useState(sampleEnergyData);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data when page loads
  useEffect(() => {
    loadData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    const data = await fetchDataFromSheets();

    if (data && data.length > 0) {
      setLiveData(data);
      setLastUpdated(new Date().toLocaleString());
      setError(null);
    } else {
      setError('Failed to fetch data. Using sample data.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-emerald-400">
        Data & Analysis
      </h1>

      {/* Live Data Indicator */}
      <div
        className={`border rounded-lg p-4 mb-8 flex items-center justify-between ${
          error
            ? 'bg-amber-900/20 border-amber-700/50'
            : 'bg-emerald-900/20 border-emerald-700/50'
        }`}
      >
        <div>
          <p
            className={`text-sm font-semibold ${
              error ? 'text-amber-200' : 'text-emerald-200'
            }`}
          >
            {error ? '⚠️ Using Sample Data' : '📡 Live Data Connected'}
          </p>
          <p
            className={`text-xs mt-1 ${
              error ? 'text-amber-300' : 'text-emerald-300'
            }`}
          >
            {error || `Last updated: ${lastUpdated || 'Loading...'}`}
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 text-white rounded-lg text-sm transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh Now'}
        </button>
      </div>

      <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-8">
        <p className="text-amber-200 text-sm">
          <strong>Note:</strong> This section will be populated with real data
          as the project progresses. Current graphs show sample data for
          demonstration purposes.
        </p>
      </div>

      <InteractiveGraphSection data={liveData} />

      {/* Analysis Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-slate-200">
          Analysis & Importance
        </h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">
              Phase 1 Findings (January - February 2026)
            </h3>
            <p className="text-slate-300">
              <em>Analysis will be added as data is collected...</em>
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Expected insights: Variability in power generation, correlation
              with weather patterns, identification of reliability gaps without
              battery storage.
            </p>
          </div>

          <div className="border-t border-slate-700 pt-4">
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">
              Why This Data Matters
            </h3>
            <ul className="text-slate-300 space-y-2">
              <li>
                • <strong>For Homeowners:</strong> Real performance data from
                local climate conditions, not manufacturer specs from sunny
                California
              </li>
              <li>
                • <strong>For Community:</strong> Informs Cottage Grove's
                microgrid planning with actual local measurements
              </li>
              <li>
                • <strong>For Students:</strong> Demonstrates scientific method
                and data-driven decision making in renewable energy
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-slate-200">
          Key Metrics (Current Phase)
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-700/50 rounded-lg p-6">
            <Sun className="w-8 h-8 text-amber-400 mb-2" />
            <p className="text-sm text-slate-400">Average Solar Output</p>
            <p className="text-3xl font-bold text-amber-400">49W</p>
            <p className="text-xs text-slate-500 mt-1">7-day average</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-700/50 rounded-lg p-6">
            <Wind className="w-8 h-8 text-emerald-400 mb-2" />
            <p className="text-sm text-slate-400">Average Wind Output</p>
            <p className="text-3xl font-bold text-emerald-400">14W</p>
            <p className="text-xs text-slate-500 mt-1">7-day average</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border border-cyan-700/50 rounded-lg p-6">
            <Zap className="w-8 h-8 text-cyan-400 mb-2" />
            <p className="text-sm text-slate-400">System Reliability</p>
            <p className="text-3xl font-bold text-cyan-400">--</p>
            <p className="text-xs text-slate-500 mt-1">TBD after Phase 2</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/*INTERACTIVE GRAPH Function*/
function InteractiveGraphSection() {
  const [xAxis, setXAxis] = useState('date');
  const [yAxis, setYAxis] = useState('total');

  // Available data fields
  const dataFields = [
    { value: 'date', label: 'Date' },
    { value: 'solar', label: 'Solar Power (W)' },
    { value: 'wind', label: 'Wind Power (W)' },
    { value: 'total', label: 'Total Power (W)' },
    { value: 'batterySOC', label: 'Battery charge (%)' },
    { value: 'windSpeed', label: 'Wind Speed (m/s)' },
    { value: 'temperature', label: 'Temperature (°C)' },
    { value: 'humidity', label: 'humidity(%)' },
  ];

  // Get nice labels for axes
  const getLabel = (value) => {
    const field = dataFields.find((f) => f.value === value);
    return field ? field.label : value;
  };

  // Sort data by X-axis for proper line chart display
  const sortedData = [...sampleEnergyData].sort((a, b) => {
    // For date strings, use alphabetical sort (works for "Jan 1", "Jan 2", etc.)
    if (xAxis === 'date') {
      return a[xAxis].localeCompare(b[xAxis]);
    }
    // For numeric values, sort numerically
    return a[xAxis] - b[xAxis];
  });

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-slate-200">
        Power Generation Analysis
      </h2>

      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        {/* Graph Controls */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              X-Axis (Horizontal)
            </label>
            <select
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
            >
              {dataFields.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Y-Axis (Vertical)
            </label>
            <select
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500"
            >
              {dataFields.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Selection Display */}
        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3 mb-4">
          <p className="text-sm text-slate-400">
            Showing:{' '}
            <span className="text-emerald-400 font-semibold">
              {getLabel(yAxis)}
            </span>{' '}
            vs{' '}
            <span className="text-emerald-400 font-semibold">
              {getLabel(xAxis)}
            </span>
          </p>
        </div>

        {/* The Graph */}
        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis
              dataKey={xAxis}
              stroke="#94a3b8"
              label={{
                value: getLabel(xAxis),
                position: 'insideBottom',
                offset: -5,
                fill: '#94a3b8',
              }}
            />
            <YAxis
              stroke="#94a3b8"
              label={{
                value: getLabel(yAxis),
                angle: -90,
                position: 'insideLeft',
                fill: '#94a3b8',
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={yAxis}
              stroke="#10b981"
              strokeWidth={3}
              name={getLabel(yAxis)}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Quick Preset Buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setXAxis('date');
              setYAxis('total');
            }}
            className="px-4 py-2 bg-slate-700 hover:bg-emerald-600 text-slate-200 text-sm rounded-lg transition-colors"
          >
            Total Power Over Time
          </button>
          <button
            onClick={() => {
              setXAxis('date');
              setYAxis('solar');
            }}
            className="px-4 py-2 bg-slate-700 hover:bg-amber-600 text-slate-200 text-sm rounded-lg transition-colors"
          >
            Solar Power Over Time
          </button>
          <button
            onClick={() => {
              setXAxis('date');
              setYAxis('wind');
            }}
            className="px-4 py-2 bg-slate-700 hover:bg-emerald-600 text-slate-200 text-sm rounded-lg transition-colors"
          >
            Wind Power Over Time
          </button>
          <button
            onClick={() => {
              setXAxis('solar');
              setYAxis('wind');
            }}
            className="px-4 py-2 bg-slate-700 hover:bg-cyan-600 text-slate-200 text-sm rounded-lg transition-colors"
          >
            Wind vs Solar Comparison
          </button>
        </div>
      </div>
    </section>
  );
}

// ==================== PAGE 3: BLOG ====================
function BlogPage() {
  const blogPosts = [
    {
      title: 'Project Kickoff - January 2026',
      date: 'January 7, 2026',
      category: 'Development Log',
      content: `Today marks the official start of data collection. After months of planning and equipment setup, 
      the weather station is operational and the commercial wind turbine and solar panel have arrived. 
      
      Phase 1 Goals: Run the system without battery storage for two months to establish baseline performance. 
      The key question: How inconsistent is renewable energy in Cottage Grove's winter climate?`,
    },
    {
      title: 'Weather Station Build Complete',
      date: 'December 28, 2025',
      category: 'Development Log',
      content: `Successfully completed weather station prototype with ESP32, DHT22 sensor, and anemometer. 
      The system is now logging temperature, humidity, and wind speed with automated cloud backup.
      
      Next steps: Final site calibration and permanent installation.`,
    },
    {
      title: 'Why This Project Matters to Cottage Grove',
      date: 'December 15, 2025',
      category: 'Analysis',
      content: `Most renewable energy resources are designed for California or the Southwest—sunny climates with 
      consistent wind. But what about Oregon communities like Cottage Grove with 150+ cloudy days and low wind speeds?
      
      This project provides transparent, local data so residents can make informed decisions about renewable energy 
      adoption without relying on marketing materials from different climates.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-emerald-400">
        Research Blog & Analysis
      </h1>

      <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 mb-8">
        <p className="text-slate-300 text-sm">
          This blog documents the research journey, findings, and larger
          takeaways throughout the project. Posts are organized by development
          logs and analytical deep-dives.
        </p>
      </div>

      {/* Blog Posts */}
      <div className="space-y-8">
        {blogPosts.map((post, idx) => (
          <article
            key={idx}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-emerald-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-bold text-slate-100">
                {post.title}
              </h2>
              <span className="text-xs bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-4">{post.date}</p>
            <div className="text-slate-300 whitespace-pre-line">
              {post.content}
            </div>
          </article>
        ))}
      </div>

      {/* Placeholder for future posts */}
      <div className="mt-12 bg-slate-800/30 border border-slate-700 border-dashed rounded-lg p-8 text-center">
        <p className="text-slate-400">
          More analysis posts coming as the project progresses...
        </p>
        <p className="text-slate-500 text-sm mt-2">
          Check back monthly for updates on findings from each research phase
        </p>
      </div>
    </div>
  );
}

// ==================== PAGE 4: PROCEDURE ====================
function ProcedurePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-emerald-400">
        Research Procedure
      </h1>

      {/* Abstract */}
      <section className="mb-12 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-slate-200">Abstract</h2>
        <p className="text-slate-300 leading-relaxed">
          This independent study investigates whether battery storage can make
          hybrid wind/solar systems reliable enough for residential use in
          Oregon's challenging climate. Using a four-phase methodology, the
          project measures baseline renewable energy variability, tests multiple
          battery control strategies, and optimizes wind turbine design for
          low-wind conditions typical of the Willamette Valley (2-4 m/s
          average). Data collection is automated via ESP32 microcontroller with
          WiFi logging. The research aims to provide Cottage Grove residents
          with honest, locally-relevant performance data to inform renewable
          energy adoption decisions.
        </p>
      </section>

      {/* Bill of Materials */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-slate-200">
          Bill of Materials (BOM)
        </h2>

        <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
          <p className="text-amber-200 text-sm">
            <strong>Live BOM:</strong> This spreadsheet updates automatically
            when I make changes.
          </p>
        </div>

        {/* Embedded Google Sheet */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-2 overflow-hidden">
          <iframe
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_XYbFemkaQLH0l_bB5ozp7_G9J7XwCbZBXAhgVtrA0Ldr2ZlVaw9rYGv4fZsbWzkaJotExRpFuJZW/pubhtml?gid=1610389462&amp;single=true&amp;widget=true&amp;headers=false"
            width="100%"
            height="500"
            className="rounded"
            title="Project Bill of Materials"
          />
        </div>

        {/* Direct Link Button */}
        <div className="mt-4 text-center">
          <a
            href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_XYbFemkaQLH0l_bB5ozp7_G9J7XwCbZBXAhgVtrA0Ldr2ZlVaw9rYGv4fZsbWzkaJotExRpFuJZW/pubhtml?gid=1610389462&single=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
          >
            Open Full Spreadsheet →
          </a>
        </div>
      </section>

      {/* Detailed Procedure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-slate-200">
          Detailed Procedure
        </h2>

        <div className="space-y-6">
          {/* Phase 1 */}
          <div className="bg-slate-800/50 border-l-4 border-emerald-500 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-emerald-400">
              Phase 1: Baseline Measurement (Jan-Feb 2026)
            </h3>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>
                Install weather station with ESP32, DHT22, and anemometer at
                test site
              </li>
              <li>
                Configure ESP32 to log data every 1 minute:
                <ul className="ml-8 mt-1 space-y-1 list-disc">
                  <li>Wind speed (m/s)</li>
                  <li>Temperature and humidity</li>
                  <li>Solar panel voltage and current</li>
                  <li>Wind turbine voltage and current</li>
                </ul>
              </li>
              <li>
                Mount commercial solar panel and wind turbine with power output
                sensors
              </li>

              <li>Run system till end of february WITHOUT battery storage</li>
              <li>
                Compare generation patterns to typical household load profiles
              </li>
              <li>
                Calculate reliability gap (% of time generation insufficient for
                load)
              </li>
            </ol>
          </div>

          {/* Phase 2 */}
          <div className="bg-slate-800/50 border-l-4 border-cyan-500 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-cyan-400">
              Phase 2: Simple Battery Control (Mar-Apr 2026)
            </h3>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>Install battery storage system with charge controller</li>
              <li>
                Implement threshold-based charging algorithm:
                <ul className="ml-8 mt-1 space-y-1 list-disc">
                  <li>Charge when generation &gt; load</li>
                  <li>Discharge when generation &lt; load</li>
                  <li>Track state of charge (SOC)</li>
                </ul>
              </li>
              <li>
                Log additional metrics: battery voltage, current, SOC, charge
                cycles
              </li>
              <li>
                Run for 60 days and measure improvement in reliability vs. Phase
                1
              </li>
              <li>Calculate battery efficiency and cycle life projections</li>
            </ol>
          </div>

          {/* Phase 3 */}
          <div className="bg-slate-800/50 border-l-4 border-amber-500 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-amber-400">
              Phase 3: Advanced Control (May-Jun 2026)
            </h3>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>
                Test three control strategies (2 weeks each):
                <ul className="ml-8 mt-1 space-y-1 list-disc">
                  <li>Time-of-day optimization (pre-charge before evening)</li>
                  <li>Weather-aware (adjust based on forecast)</li>
                  <li>Hybrid approach (combine strategies)</li>
                </ul>
              </li>
              <li>
                Compare each strategy on: reliability, battery lifespan,
                efficiency
              </li>
              <li>Identify optimal control strategy for Oregon climate</li>
            </ol>
          </div>

          {/* Phase 4 */}
          <div className="bg-slate-800/50 border-l-4 border-violet-500 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-violet-400">
              Phase 4: Turbine Optimization (Jul-Aug 2026)
            </h3>
            <ol className="text-slate-300 space-y-2 list-decimal list-inside">
              <li>
                Design custom turbine iterations for low-wind conditions:
                <ul className="ml-8 mt-1 space-y-1 list-disc">
                  <li>Target cut-in speed &lt; 2 m/s</li>
                  <li>Optimize blade profile for 2-4 m/s operation</li>
                  <li>Test different gearing ratios</li>
                </ul>
              </li>
              <li>Build and test 2-3 prototypes</li>
              <li>Compare custom designs vs. commercial turbine</li>
              <li>Document performance improvements and cost tradeoffs</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-200">
          Project Timeline
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-cyan-500 via-amber-500 to-violet-500"></div>

          <div className="space-y-8 ml-20">
            <div className="relative">
              <div className="absolute -left-14 top-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="font-bold text-emerald-400">Jan-Feb 2026</p>
                <p className="text-slate-300 text-sm">
                  Phase 1: Baseline Measurement
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-14 top-1 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="font-bold text-cyan-400">Mar-Apr 2026</p>
                <p className="text-slate-300 text-sm">
                  Phase 2: Simple Battery Control
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-14 top-1 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="font-bold text-amber-400">May-Jun 2026</p>
                <p className="text-slate-300 text-sm">
                  Phase 3: Advanced Control Strategies
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-14 top-1 w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-xs font-bold">
                4
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="font-bold text-violet-400">Jul-Aug 2026</p>
                <p className="text-slate-300 text-sm">
                  Phase 4: Wind Turbine Optimization
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-14 top-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <div className="bg-slate-800/50 border border-emerald-700 rounded-lg p-4">
                <p className="font-bold text-emerald-400">Sep-Nov 2026</p>
                <p className="text-slate-300 text-sm">
                  Final Analysis & Community Presentations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== PAGE 5: IS IT POSSIBLE? ====================
function ConclusionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-emerald-400">
        Is It Possible?
      </h1>

      <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-6 mb-12">
        <p className="text-amber-200">
          <strong>Note:</strong> This page will be populated with final
          conclusions after project completion in November 2026. Preliminary
          findings will be added as each phase concludes.
        </p>
      </div>

      {/* The Big Question */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border-2 border-emerald-500 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-emerald-400">
            The Big Question
          </h2>
          <p className="text-2xl text-slate-100 font-semibold italic">
            "Is it possible for the average homeowner in Oregon to incorporate a
            renewable energy system in their home?"
          </p>
        </div>
      </section>

      {/* Preliminary Framework */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">
          Evaluation Framework
        </h2>
        <p className="text-slate-300 mb-6">
          The answer depends on three key factors. Final data will be available
          November 2026:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3 text-emerald-400">
              1. Technical Feasibility
            </h3>
            <p className="text-slate-300 text-sm">
              Can the system reliably meet household energy needs in Oregon's
              climate with battery storage?
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Measured by: Reliability %, uptime, energy availability
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3 text-cyan-400">
              2. Economic Viability
            </h3>
            <p className="text-slate-300 text-sm">
              Does the system provide cost savings that justify the initial
              investment?
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Measured by: ROI, payback period, $/kWh
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3 text-amber-400">
              3. Practical Accessibility
            </h3>
            <p className="text-slate-300 text-sm">
              Can average homeowners realistically install, maintain, and afford
              this system?
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Measured by: Install complexity, maintenance needs, total cost
            </p>
          </div>
        </div>
      </section>

      {/* Cost Analysis (Placeholder) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">
          Cost Analysis
        </h2>

        {/* Provider Comparison */}
        <div className="mb-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-emerald-400">
            Oregon Energy Provider Comparison
          </h3>
          <p className="text-slate-300 mb-4 text-sm">
            Comparing hybrid renewable system costs against traditional utility
            providers serving Cottage Grove area:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left p-3 text-emerald-400">Provider</th>
                  <th className="text-left p-3 text-emerald-400">
                    Cost per kWh
                  </th>
                  <th className="text-left p-3 text-emerald-400">
                    Monthly Base Fee
                  </th>
                  <th className="text-left p-3 text-emerald-400">
                    Avg Monthly Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700/50">
                  <td className="p-3 text-slate-300">Pacific Power</td>
                  <td className="p-3 text-slate-300">$0.12 - $0.14</td>
                  <td className="p-3 text-slate-300">~$10</td>
                  <td className="p-3 text-slate-300">$110 - $130</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="p-3 text-slate-300">Emerald PUD</td>
                  <td className="p-3 text-slate-300">$0.10 - $0.12</td>
                  <td className="p-3 text-slate-300">~$8</td>
                  <td className="p-3 text-slate-300">$95 - $115</td>
                </tr>
                <tr className="border-b border-slate-700/50 bg-emerald-900/20">
                  <td className="p-3 text-emerald-400 font-semibold">
                    Hybrid System (Projected)
                  </td>
                  <td className="p-3 text-slate-300">TBD</td>
                  <td className="p-3 text-slate-300">$0 (off-grid)</td>
                  <td className="p-3 text-slate-300">TBD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-xs mt-4">
            *Traditional provider costs based on average 900 kWh/month household
            usage. Actual costs vary by season and usage tier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cost Comparison Chart */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-slate-300">
              Monthly Energy Costs: Traditional vs. Hybrid
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis
                  stroke="#94a3b8"
                  label={{
                    value: 'Cost ($)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#94a3b8',
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="traditional"
                  fill="#ef4444"
                  name="Pacific Power"
                />
                <Bar dataKey="hybrid" fill="#10b981" name="Hybrid System" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-slate-400 text-xs mt-2">
              Sample data - actual costs TBD from project data
            </p>
          </div>

          {/* Cost Metrics */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Initial Investment</span>
                <span className="text-2xl font-bold text-slate-100">
                  $1,200
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                Equipment cost (scaled for research)
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cost per kWh (Hybrid)</span>
                <span className="text-2xl font-bold text-slate-100">TBD</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                To be calculated from data
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Estimated Payback Period</span>
                <span className="text-2xl font-bold text-slate-100">TBD</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                vs. Pacific Power rates
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Annual Savings (Projected)
                </span>
                <span className="text-2xl font-bold text-emerald-400">TBD</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                vs. traditional grid costs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages/Disadvantages */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-200">
          Advantages & Disadvantages
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border border-emerald-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-emerald-400">
              Potential Advantages
            </h3>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li>✓ Reduced dependence on grid electricity</li>
              <li>✓ Lower monthly energy costs (if system performs well)</li>
              <li>✓ Backup power during outages with battery storage</li>
              <li>✓ Environmental benefits - reduced carbon footprint</li>
              <li>✓ Energy independence and resilience</li>
              <li>✓ Potential increase in property value</li>
              <li>✓ Bragging rights</li>
              <li>✓ Independence from grid</li>
              <li>
                ✓ Works far from infistructure (maybe a house far from a twon or
                city)
              </li>
            </ul>
            <p className="text-slate-400 text-xs mt-4 italic">
              Final validation pending project completion
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-red-400">
              Potential Disadvantages
            </h3>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li>✗ High upfront capital investment (expensive)</li>
              <li>✗ Potentially long payback period in low-sun climates</li>
              <li>✗ Battery replacement costs every 5-10 years</li>
              <li>✗ Maintenance requirements and technical knowledge needed</li>
              <li>✗ Performance highly dependent on local weather patterns</li>
              <li>✗ May not provide 100% grid independence in Oregon</li>
              <li>✗ Difficulty to create solo</li>
              <li>
                ✗ Limitations baised on environmental factors such as location
                of trees or size of property
              </li>
            </ul>
            <p className="text-slate-400 text-xs mt-4 italic">
              Actual impact to be quantified with data
            </p>
          </div>
        </div>
      </section>

      {/* Final Answer Section (Placeholder) */}
      <section className="mt-12 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-2 border-slate-600 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-emerald-400 text-center">
          Final Recommendation
        </h2>
        <div className="text-center text-slate-300">
          <p className="text-lg mb-4">
            <em>
              To be completed November 2026 after full year of data collection
              and analysis.
            </em>
          </p>
          <p className="text-sm text-slate-400">
            The final recommendation will provide a clear yes/no answer with
            conditions, backed by quantitative data from all four research
            phases. This will include specific guidance for Cottage Grove
            homeowners on whether hybrid renewable systems are technically
            feasible, economically viable, and practically accessible in our
            local climate.
          </p>
        </div>
      </section>
    </div>
  );
}

// ==================== PAGE 6: CREDITS ====================
function CreditsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-emerald-400">
        Acknowledgments & Credits
      </h1>

      <p className="text-slate-300 mb-12 text-center max-w-3xl mx-auto">
        This research project has been made possible through the support of
        mentors, organizations, and community members who believe in the
        importance of local renewable energy research.
      </p>

      {/* Grant Support Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">
          Grant Support & Funding
        </h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <p className="text-slate-400 text-sm mb-6 italic">
            Grant acknowledgments will be added here as funding is secured.
          </p>

          {/* Template for future grants */}
          {/* <div className="space-y-6">
            <div className="border-b border-slate-700 pb-4">
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                [Grant Organization Name]
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                Grant Title: [Grant Name]
                <br />
                Amount: $[Amount]
                <br />
                Date Awarded: [Date]
              </p>
              <p className="text-slate-400 text-sm">
                [Brief description of how the grant supported the project]
              </p>
            </div>
          </div> */}
        </div>
      </section>

      {/* Mentors & Advisors */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">
          Mentors & Advisors
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">
              Dr. Ted Brekken
            </h3>
            <p className="text-slate-400 text-sm mb-2">
              Oregon State University
            </p>
            <p className="text-slate-300 text-sm">
              Inspiration for project methodology through research on optimal
              energy storage sizing and control.
            </p>
          </div>

          {/* Template for additional mentors */}
          {/* <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 opacity-50">
            <h3 className="text-lg font-semibold text-slate-400 mb-2">
              [Mentor Name]
            </h3>
            <p className="text-slate-500 text-sm mb-2">[Affiliation]</p>
            <p className="text-slate-400 text-sm">[Contribution to project]</p>
          </div> */}
        </div>
      </section>

      {/* School & Community Support */}
      {/* { <section className="mb-12"> */}
      {/* <h2 className="text-2xl font-bold mb-6 text-slate-200"> */}
      {/* School & Community Support */}
      {/* </h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                Cottage Grove High School
              </h3>
              <p className="text-slate-300 text-sm">
                Support for independent research project and HACK Club
                leadership opportunities.
              </p>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                Environmental Club
              </h3>
              <p className="text-slate-300 text-sm">
                Community connections and environmental stewardship perspective.
              </p>
            </div>
          </div>
        </div> */}
      {/* </section> }  */}

      {/* Equipment & Resource Donations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">
          Equipment & Resource Donations
        </h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <p className="text-slate-400 text-sm italic">Me</p>
        </div>
      </section>

      {/* Technical Contributors */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">
          Technical Contributors
        </h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-300 text-sm mb-4">
            Special thanks to those who provided technical expertise, code
            review, or data analysis support:
          </p>
          <div className="space-y-2 text-slate-400 text-sm">
            <p>Dakota Roth</p>
            <p>Cole Bentley</p>
            <p>Jole Lindstrom</p>
            <p>Kelly Cunningham</p>
          </div>
        </div>
      </section>

      {/* Open Source & Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">
          Open Source Tools & Libraries
        </h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-300 text-sm mb-4">
            This project was built using the following open-source tools and
            libraries:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-emerald-400 mb-2">
                Hardware & Firmware:
              </p>
              <ul className="text-slate-300 space-y-1">
                <li>• ESP32 (Espressif Systems)</li>
                <li>• Arduino IDE</li>
                <li>• DHT22 Sensor Library</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-emerald-400 mb-2">
                Data Analysis & Visualization:
              </p>
              <ul className="text-slate-300 space-y-1">
                <li>• Python (data processing)</li>
                <li>• Recharts (graphing library)</li>
                <li>• React (website framework)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Opportunities */}
      <section className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-emerald-700/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">
          Interested in Supporting This Research?
        </h2>
        <p className="text-slate-300 mb-4">
          I'm actively seeking grant funding, equipment donations, and
          mentorship opportunities to support this renewable energy research
          project.
        </p>
        <p className="text-slate-400 text-sm">
          For partnership or funding inquiries, please contact:{' '}
          <a
            href="mailto:micahhanke@gmail.com"
            className="text-emerald-400 hover:text-emerald-300"
          >
            micah.hanke@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
}

export default App;
