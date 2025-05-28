// Function to parse CSV string into an array of objects
function parseCSV(csvString) {
    const lines = csvString.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, i) => {
            let value = values[i];
            // Basic type conversion
            if (header.includes('Number_of_Casualties') || header.includes('Speed_Limit')) {
                value = parseInt(value, 10);
            } else if (header.includes('Location_Lat') || header.includes('Location_Long')) {
                value = parseFloat(value);
            } else if (header.includes('Drunk_Driving_Involved')) {
                value = value.toLowerCase() === 'true';
            }
            obj[header.trim()] = value;
            return obj;
        }, {});
    });
}

// Dummy CSV data (replace with actual fetch from file/API in real app)
// In a real scenario, you'd fetch road_accidents.csv using `fetch` or `XMLHttpRequest`
// For simplicity, we'll embed a small portion here, or assume a variable `csvData` is loaded.
const sampleCsvData = `Accident_ID,Date,Time,Location_Lat,Location_Long,Region,City,Road_Surface,Weather_Conditions,Light_Condition,Road_Type,Vehicle_Type,Number_of_Casualties,Severity_Casualty,Urban_Rural,Age_Band_Casualty,Gender_Casualty,Drunk_Driving_Involved,Speed_Limit
A001,2023-01-15,08:30,51.5074,-0.1278,England,London,Dry,Fine no high winds,Daylight,Single carriageway,Car,1,Slight,Urban,31-45,Female,FALSE,30
A002,2023-01-20,17:45,53.4808,-2.2426,England,Manchester,Wet,Raining no high winds,Darkness - lights lit,Dual carriageway,Motorcycle,1,Serious,Urban,21-30,Male,FALSE,40
A003,2023-02-10,11:00,55.9533,-3.1883,Scotland,Edinburgh,Dry,Fine no high winds,Daylight,Roundabout,Bus,5,Slight,Urban,16-20,Unknown,FALSE,30
A004,2023-02-25,22:15,51.4816,-0.0093,England,London,Wet,Fog or mist,Darkness - no street lighting,Motorway,Van,1,Fatal,Rural,46-60,Male,TRUE,70
A005,2023-03-05,09:00,53.8008,-1.5491,England,Leeds,Dry,Fine no high winds,Daylight,Single carriageway,Car,2,Slight,Urban,0-5,Female,FALSE,30
A006,2023-03-12,14:30,51.4545,-2.5879,England,Bristol,Wet,Snowing no high winds,Daylight,Dual carriageway,Agricultural Vehicle,1,Serious,Rural,61+,Male,FALSE,50
A007,2023-04-01,10:10,53.3888,-1.4704,England,Sheffield,Dry,Fine no high winds,Daylight,Single carriageway,Motorcycle,1,Slight,Urban,21-30,Male,FALSE,30
A008,2023-04-18,19:00,52.4862,-1.8904,England,Birmingham,Dry,Cloudy,Darkness - lights lit,Roundabout,Car,1,Slight,Urban,31-45,Female,FALSE,40
A009,2023-05-03,07:00,50.7184,-3.5271,England,Exeter,Wet,Raining no high winds,Darkness - lights lit,Single carriageway,Van,1,Serious,Rural,16-20,Male,FALSE,60
A010,2023-05-20,16:00,54.9783,-1.6178,England,Newcastle,Dry,Fine no high winds,Daylight,Dual carriageway,Bus,3,Slight,Urban,0-5,Unknown,FALSE,30
A011,2023-06-05,13:00,51.5074,-0.1278,England,London,Dry,Fine no high winds,Daylight,Single carriageway,Car,1,Slight,Urban,31-45,Female,FALSE,30
A012,2023-06-18,18:00,53.4808,-2.2426,England,Manchester,Wet,Raining no high winds,Darkness - lights lit,Dual carriageway,Motorcycle,1,Serious,Urban,21-30,Male,FALSE,40
A013,2023-07-02,09:30,55.9533,-3.1883,Scotland,Edinburgh,Dry,Fine no high winds,Daylight,Roundabout,Bus,2,Slight,Urban,16-20,Unknown,FALSE,30
A014,2023-07-15,21:00,51.4816,-0.0093,England,London,Wet,Fog or mist,Darkness - no street lighting,Motorway,Van,1,Fatal,Rural,46-60,Male,TRUE,70
A015,2023-08-01,10:00,53.8008,-1.5491,England,Leeds,Dry,Fine no high winds,Daylight,Single carriageway,Car,1,Slight,Urban,0-5,Female,FALSE,30
A016,2023-08-10,15:00,51.4545,-2.5879,England,Bristol,Wet,Snowing no high winds,Daylight,Dual carriageway,Agricultural Vehicle,1,Serious,Rural,61+,Male,FALSE,50
A017,2023-09-01,11:00,53.3888,-1.4704,England,Sheffield,Dry,Fine no high winds,Daylight,Single carriageway,Motorcycle,1,Slight,Urban,21-30,Male,FALSE,30
A018,2023-09-15,18:30,52.4862,-1.8904,England,Birmingham,Dry,Cloudy,Darkness - lights lit,Roundabout,Car,1,Slight,Urban,31-45,Female,FALSE,40
A019,2023-10-01,08:00,50.7184,-3.5271,England,Exeter,Wet,Raining no high winds,Darkness - lights lit,Single carriageway,Van,1,Serious,Rural,16-20,Male,FALSE,60
A020,2023-10-20,17:00,54.9783,-1.6178,England,Newcastle,Dry,Fine no high winds,Daylight,Dual carriageway,Bus,2,Slight,Urban,0-5,Unknown,FALSE,30
A021,2024-01-10,09:00,51.5074,-0.1278,England,London,Dry,Fine no high winds,Daylight,Single carriageway,Car,1,Slight,Urban,31-45,Female,FALSE,30
A022,2024-01-25,16:30,53.4808,-2.2426,England,Manchester,Wet,Raining no high winds,Darkness - lights lit,Dual carriageway,Motorcycle,1,Serious,Urban,21-30,Male,FALSE,40
A023,2024-02-05,10:00,55.9533,-3.1883,Scotland,Edinburgh,Dry,Fine no high winds,Daylight,Roundabout,Bus,4,Slight,Urban,16-20,Unknown,FALSE,30
A024,2024-02-20,20:00,51.4816,-0.0093,England,London,Wet,Fog or mist,Darkness - no street lighting,Motorway,Van,1,Fatal,Rural,46-60,Male,TRUE,70
A025,2024-03-01,08:45,53.8008,-1.5491,England,Leeds,Dry,Fine no high winds,Daylight,Single carriageway,Car,1,Slight,Urban,0-5,Female,FALSE,30
A026,2024-03-15,14:00,51.4545,-2.5879,England,Bristol,Wet,Snowing no high winds,Daylight,Dual carriageway,Agricultural Vehicle,1,Serious,Rural,61+,Male,FALSE,50
A027,2024-04-05,10:30,53.3888,-1.4704,England,Sheffield,Dry,Fine no high winds,Daylight,Single carriageway,Motorcycle,1,Slight,Urban,21-30,Male,FALSE,30
A028,2024-04-20,19:30,52.4862,-1.8904,England,Birmingham,Dry,Cloudy,Darkness - lights lit,Roundabout,Car,1,Slight,Urban,31-45,Female,FALSE,40
A029,2024-05-07,07:30,50.7184,-3.5271,England,Exeter,Wet,Raining no high winds,Darkness - lights lit,Single carriageway,Van,1,Serious,Rural,16-20,Male,FALSE,60
A030,2024-05-25,16:00,54.9783,-1.6178,England,Newcastle,Dry,Fine no high winds,Daylight,Dual carriageway,Bus,2,Slight,Urban,0-5,Unknown,FALSE,30
`;

let allData = [];
let currentYear = new Date().getFullYear(); // Default to current year

// Chart instances to update them later
let vehicleTypeChart, monthlyTrendChart, urbanRuralChart, roadTypeChart, lightConditionChart, map;

// --- Helper Functions for Data Processing ---

function processData(data, selectedYear, roadSurfaceFilter, weatherConditionsFilter) {
    let filteredData = data.filter(d => {
        const recordYear = new Date(d.Date).getFullYear();
        const matchesYear = recordYear === selectedYear || recordYear === (selectedYear - 1);
        const matchesRoadSurface = roadSurfaceFilter === 'All' || d.Road_Surface === roadSurfaceFilter;
        const matchesWeather = weatherConditionsFilter === 'All' || d.Weather_Conditions === weatherConditionsFilter;
        return matchesYear && matchesRoadSurface && matchesWeather;
    });

    const cyData = filteredData.filter(d => new Date(d.Date).getFullYear() === selectedYear);
    const pyData = filteredData.filter(d => new Date(d.Date).getFullYear() === (selectedYear - 1));

    // KPIs
    const kpis = {
        Total_CY_Casualties: cyData.reduce((sum, d) => sum + d.Number_of_Casualties, 0),
        Total_PY_Casualties: pyData.reduce((sum, d) => sum + d.Number_of_Casualties, 0),
        Total_CY_Accidents: new Set(cyData.map(d => d.Accident_ID)).size,
        Total_PY_Accidents: new Set(pyData.map(d => d.Accident_ID)).size,
        CY_Fatal_Casualties: cyData.filter(d => d.Severity_Casualty === 'Fatal').reduce((sum, d) => sum + d.Number_of_Casualties, 0),
        PY_Fatal_Casualties: pyData.filter(d => d.Severity_Casualty === 'Fatal').reduce((sum, d) => sum + d.Number_of_Casualties, 0),
        CY_Serious_Casualties: cyData.filter(d => d.Severity_Casualty === 'Serious').reduce((sum, d) => sum + d.Number_of_Casualties, 0),
        PY_Serious_Casualties: pyData.filter(d => d.Severity_Casualty === 'Serious').reduce((sum, d) => sum + d.Number_of_Casualties, 0),
        CY_Slight_Casualties: cyData.filter(d => d.Severity_Casualty === 'Slight').reduce((sum, d) => sum + d.Number_of_Casualties, 0),
        PY_Slight_Casualties: pyData.filter(d => d.Severity_Casualty === 'Slight').reduce((sum, d) => sum + d.Number_of_Casualties, 0),
    };

    // Calculate percentage changes for KPIs
    for (const key in kpis) {
        if (key.startsWith('Total_CY_') || key.startsWith('CY_')) {
            const pyKey = key.replace('CY_', 'PY_');
            if (kpis[pyKey] !== undefined && kpis[pyKey] !== 0) {
                const change = ((kpis[key] - kpis[pyKey]) / kpis[pyKey]) * 100;
                kpis[`${key.replace('CY_', '')}_Change_Percent`] = change;
            } else if (kpis[key] > 0) {
                 kpis[`${key.replace('CY_', '')}_Change_Percent`] = 100; // If PY was 0 and CY > 0, it's 100% increase
            } else {
                kpis[`${key.replace('CY_', '')}_Change_Percent`] = 0;
            }
        }
    }


    // Aggregations for Charts
    const casualtiesByVehicle = cyData.reduce((acc, d) => {
        acc[d.Vehicle_Type] = (acc[d.Vehicle_Type] || 0) + d.Number_of_Casualties;
        return acc;
    }, {});

    const monthlyOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTrendCY = {};
    const monthlyTrendPY = {};
    monthlyOrder.forEach(month => {
        monthlyTrendCY[month] = 0;
        monthlyTrendPY[month] = 0;
    });

    cyData.forEach(d => {
        const month = new Date(d.Date).toLocaleString('en-us', { month: 'short' });
        monthlyTrendCY[month] = (monthlyTrendCY[month] || 0) + d.Number_of_Casualties;
    });
    pyData.forEach(d => {
        const month = new Date(d.Date).toLocaleString('en-us', { month: 'short' });
        monthlyTrendPY[month] = (monthlyTrendPY[month] || 0) + d.Number_of_Casualties;
    });


    const casualtiesByUrbanRural = cyData.reduce((acc, d) => {
        acc[d.Urban_Rural] = (acc[d.Urban_Rural] || 0) + d.Number_of_Casualties;
        return acc;
    }, {});

    const casualtiesByRoadType = cyData.reduce((acc, d) => {
        acc[d.Road_Type] = (acc[d.Road_Type] || 0) + d.Number_of_Casualties;
        return acc;
    }, {});

    const casualtiesByLightCondition = cyData.reduce((acc, d) => {
        acc[d.Light_Condition] = (acc[d.Light_Condition] || 0) + d.Number_of_Casualties;
        return acc;
    }, {});

    const locationData = cyData.map(d => ({
        lat: d.Location_Lat,
        lng: d.Location_Long,
        casualties: d.Number_of_Casualties,
        severity: d.Severity_Casualty,
        city: d.City
    }));

    return {
        kpis,
        charts_data: {
            casualtiesByVehicle,
            monthlyTrendCY,
            monthlyTrendPY,
            casualtiesByUrbanRural,
            casualtiesByRoadType,
            casualtiesByLightCondition,
            locationData
        }
    };
}

// --- Render Functions ---

function updateKpiCard(elementId, value, changePercent, currentYearLabel) {
    const valueEl = document.getElementById(elementId);
    const changeEl = document.getElementById(`${elementId}-change`);
    const yearLabelEl = document.getElementById(currentYearLabel);

    valueEl.textContent = value.toLocaleString();
    if (yearLabelEl) {
        yearLabelEl.textContent = `(${currentYear})`;
    }

    if (changePercent !== undefined) {
        changeEl.textContent = `${changePercent.toFixed(1)}%`;
        changeEl.className = `change ${changePercent >= 0 ? 'positive' : 'negative'}`;
    } else {
        changeEl.textContent = '';
        changeEl.className = 'change';
    }
}

function renderKPIs(kpis, year) {
    updateKpiCard('total-casualties-kpi', kpis.Total_CY_Casualties, kpis.Total_Casualties_Change_Percent, 'kpi-year-label');
    updateKpiCard('total-accidents-kpi', kpis.Total_CY_Accidents, kpis.Total_Accidents_Change_Percent, 'kpi-year-label-accidents');
    updateKpiCard('fatal-casualties-kpi', kpis.CY_Fatal_Casualties, kpis.Fatal_Casualties_Change_Percent, 'kpi-year-label-fatal');
    updateKpiCard('serious-casualties-kpi', kpis.CY_Serious_Casualties, kpis.Serious_Casualties_Change_Percent, 'kpi-year-label-serious');
    updateKpiCard('slight-casualties-kpi', kpis.CY_Slight_Casualties, kpis.Slight_Casualties_Change_Percent, 'kpi-year-label-slight');
}

function renderVehicleTypeChart(data) {
    const ctx = document.getElementById('vehicleTypeChart').getContext('2d');
    const labels = Object.keys(data).sort((a, b) => data[b] - data[a]); // Sort descending
    const values = labels.map(label => data[label]);

    if (vehicleTypeChart) {
        vehicleTypeChart.destroy();
    }
    vehicleTypeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Casualties',
                data: values,
                backgroundColor: '#00bcd4', // Accent color
                borderColor: '#00bcd4',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Horizontal bars
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: '#4a4a6a' },
                    ticks: { color: '#e0e0e0' }
                },
                y: {
                    grid: { color: '#4a4a6a' },
                    ticks: { color: '#e0e0e0' }
                }
            },
            plugins: {
                legend: { display: false },
                title: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw.toLocaleString();
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function renderMonthlyTrendChart(monthlyTrendCY, monthlyTrendPY) {
    const ctx = document.getElementById('monthlyTrendChart').getContext('2d');
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (monthlyTrendChart) {
        monthlyTrendChart.destroy();
    }
    monthlyTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: `Casualties ${currentYear}`,
                    data: labels.map(month => monthlyTrendCY[month]),
                    borderColor: '#00bcd4', // CY color
                    backgroundColor: 'rgba(0, 188, 212, 0.2)',
                    fill: true,
                    tension: 0.3
                },
                {
                    label: `Casualties ${currentYear - 1}`,
                    data: labels.map(month => monthlyTrendPY[month]),
                    borderColor: '#8bc34a', // PY color
                    backgroundColor: 'rgba(139, 195, 74, 0.2)',
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { color: '#4a4a6a' },
                    ticks: { color: '#e0e0e0' }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: '#4a4a6a' },
                    ticks: { color: '#e0e0e0' }
                }
            },
            plugins: {
                legend: { labels: { color: '#e0e0e0' } },
                title: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw.toLocaleString();
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function renderUrbanRuralChart(data) {
    const ctx = document.getElementById('urbanRuralChart').getContext('2d');
    const labels = Object.keys(data);
    const values = labels.map(label => data[label]);
    const total = values.reduce((sum, v) => sum + v, 0);

    if (urbanRuralChart) {
        urbanRuralChart.destroy();
    }
    urbanRuralChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ['#4CAF50', '#FFC107'], // Green for Urban, Yellow for Rural
                borderColor: '#2a2a4a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#e0e0e0' } },
                title: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.raw;
                            const percentage = (value / total * 100).toFixed(1);
                            label += `${value.toLocaleString()} (${percentage}%)`;
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function renderRoadTypeChart(data) {
    const ctx = document.getElementById('roadTypeChart').getContext('2d');
    const labels = Object.keys(data).sort((a, b) => data[b] - data[a]);
    const values = labels.map(label => data[label]);

    if (roadTypeChart) {
        roadTypeChart.destroy();
    }
    roadTypeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Casualties',
                data: values,
                backgroundColor: '#FF5722', // Orange accent
                borderColor: '#FF5722',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: '#4a4a6a' },
                    ticks: { color: '#e0e0e0' }
                },
                y: {
                    grid: { color: '#4a4a6a' },
                    ticks: { color: '#e0e0e0' }
                }
            },
            plugins: {
                legend: { display: false },
                title: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw.toLocaleString();
                            return label;
                        }
                    }
                },
                datalabels: { // Chart.js plugin for labels on bars (requires separate import)
                    display: false, // Set to true if you import chartjs-plugin-datalabels
                    color: '#e0e0e0',
                    anchor: 'end',
                    align: 'end',
                    formatter: function(value) {
                        return value.toLocaleString();
                    }
                }
            }
        }
    });
}

function renderLightConditionChart(data) {
    const ctx = document.getElementById('lightConditionChart').getContext('2d');
    const labels = Object.keys(data);
    const values = labels.map(label => data[label]);
    const total = values.reduce((sum, v) => sum + v, 0);

    if (lightConditionChart) {
        lightConditionChart.destroy();
    }
    lightConditionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ['#2196F3', '#673AB7', '#FFEB3B'], // Blue (Day), Purple (Dark-Lit), Yellow (Dark-No Light)
                borderColor: '#2a2a4a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#e0e0e0' } },
                title: { display: false },
                 tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const value = context.raw;
                            const percentage = (value / total * 100).toFixed(1);
                            label += `${value.toLocaleString()} (${percentage}%)`;
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function renderMap(locationData) {
    // Initialize map only once
    if (!map) {
        map = L.map('map').setView([53.0, -2.0], 6); // Centered on UK
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
    }

    locationData.forEach(point => {
        let color = 'blue';
        if (point.severity === 'Fatal') {
            color = 'red';
        } else if (point.severity === 'Serious') {
            color = 'orange';
        }

        const marker = L.circleMarker([point.lat, point.lng], {
            radius: Math.sqrt(point.casualties) * 5, // Scale marker size by casualties
            color: color,
            fillColor: color,
            fillOpacity: 0.7
        }).addTo(map);

        marker.bindPopup(`
            <b>City:</b> ${point.city || 'N/A'}<br>
            <b>Casualties:</b> ${point.casualties}<br>
            <b>Severity:</b> ${point.severity}
        `);
    });
}

// --- Main Data Loading and Rendering Logic ---

async function loadAndRenderDashboard() {
    // In a real application, you'd fetch data from an API:
    // const response = await fetch('/api/road-accidents-data');
    // const rawCsv = await response.text();
    // allData = parseCSV(rawCsv);

    // For this example, use the embedded sampleCsvData
    allData = parseCSV(sampleCsvData);

    const years = [...new Set(allData.map(d => new Date(d.Date).getFullYear()))].sort((a, b) => b - a);
    const yearFilter = document.getElementById('year-filter');
    yearFilter.innerHTML = ''; // Clear existing options
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    currentYear = years[0] || new Date().getFullYear(); // Set default to latest year
    yearFilter.value = currentYear; // Select the latest year in the filter

    renderDashboard();

    // Add event listeners for filters
    document.getElementById('year-filter').addEventListener('change', (event) => {
        currentYear = parseInt(event.target.value);
        renderDashboard();
    });
    document.getElementById('road-surface-filter').addEventListener('change', renderDashboard);
    document.getElementById('weather-conditions-filter').addEventListener('change', renderDashboard);
}

function renderDashboard() {
    const selectedRoadSurface = document.getElementById('road-surface-filter').value;
    const selectedWeatherConditions = document.getElementById('weather-conditions-filter').value;

    const { kpis, charts_data } = processData(allData, currentYear, selectedRoadSurface, selectedWeatherConditions);

    renderKPIs(kpis, currentYear);
    renderVehicleTypeChart(charts_data.casualtiesByVehicle);
    renderMonthlyTrendChart(charts_data.monthlyTrendCY, charts_data.monthlyTrendPY);
    renderUrbanRuralChart(charts_data.casualtiesByUrbanRural);
    renderRoadTypeChart(charts_data.casualtiesByRoadType);
    renderLightConditionChart(charts_data.casualtiesByLightCondition);
    renderMap(charts_data.locationData);
}

// Initial load
document.addEventListener('DOMContentLoaded', loadAndRenderDashboard);