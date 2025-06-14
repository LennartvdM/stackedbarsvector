// Application initialization and coordination 

// Main application initialization and chart management
let charts = {};

// Initialize all charts
function initializeCharts() {
    charts.leadership = new SVGChart('leadership-container', chartData.leadership, params);
    charts.hr = new SVGChart('hr-container', chartData.hr, params);
    charts.strategy = new SVGChart('strategy-container', chartData.strategy, params);
    charts.communication = new SVGChart('communication-container', chartData.communication, params);
    charts.knowledge = new SVGChart('knowledge-container', chartData.knowledge, params);
    charts.climate = new SVGChart('climate-container', chartData.climate, params);
    
    // After charts are rendered, position any remaining dividers
    positionVerticalDividers();
}

// Update all charts with new parameters
function updateAllCharts() {
    Object.values(charts).forEach(chart => {
        if (chart && chart.update) {
            chart.update(params);
        }
    });
    
    // Reposition dividers after chart updates
    positionVerticalDividers();
}

// Position vertical dividers based on chart heights in left columns
function positionVerticalDividers() {
    // Page 1 - position divider based on leadership + strategy heights
    const page1 = document.getElementById('page1');
    const leadershipSlot = document.getElementById('leadership-slot');
    const strategySlot = document.getElementById('strategy-slot');
    
    if (leadershipSlot && strategySlot) {
        const totalLeftHeight = leadershipSlot.offsetHeight + strategySlot.offsetHeight + 10; // +gap
        const hrSlot = page1.querySelector('#hr-container').parentElement;
        
        // Ensure HR slot has some minimum content-based height
        requestAnimationFrame(() => {
            // Don't force HR to match left column - let it size to its content
            // This was causing the artificial stretching
        });
    }
}

// Application initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing PDF Generation Rig...');
    
    // Setup controls
    setupControls();
    
    // Initialize charts
    initializeCharts();
    
    // Make functions globally available for onclick handlers
    window.randomizeData = randomizeData;
    window.toggleDebugMode = toggleDebugMode;
    window.generatePDF = generatePDF;
    window.applyPreset = applyPreset;
    window.updateAllCharts = updateAllCharts;
    
    console.log('PDF Generation Rig ready!');
});

// Expose for debugging
window.ChartSystem = {
    charts,
    params,
    updateAllCharts,
    chartData
}; 