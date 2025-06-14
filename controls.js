// Control panel functionality and presets 

// Control panel functionality
function setupControls() {
    const controlMappings = [
        { id: 'fontScale', param: 'fontScale', suffix: 'x' },
        { id: 'padding', param: 'padding', suffix: 'px' },
        { id: 'lineHeight', param: 'lineHeight', suffix: '' },
        { id: 'barHeight', param: 'barHeight', suffix: 'px' },
        { id: 'barSpacing', param: 'barSpacing', suffix: 'px' },
        { id: 'columnWidth', param: 'columnWidth', suffix: 'px' }
    ];

    controlMappings.forEach(({ id, param, suffix }) => {
        const slider = document.getElementById(id);
        const valueSpan = document.getElementById(id + 'Value');
        
        if (slider && valueSpan) {
            // Set initial value
            slider.value = params[param];
            valueSpan.textContent = params[param] + suffix;
            
            // Handle changes
            slider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                valueSpan.textContent = value + suffix;
                params[param] = value;
                
                if (window.updateAllCharts) {
                    window.updateAllCharts();
                }
            });
        }
    });
}

// Preset functions
function applyPreset(presetName) {
    switch (presetName) {
        case 'compact':
            Object.assign(params, {
                fontScale: 0.8,
                padding: 10,
                lineHeight: 1.2,
                barHeight: 20,
                barSpacing: 3,
                columnWidth: 60
            });
            break;
        case 'spacious':
            Object.assign(params, {
                fontScale: 1.2,
                padding: 20,
                lineHeight: 1.5,
                barHeight: 30,
                barSpacing: 8,
                columnWidth: 80
            });
            break;
        case 'minimal':
            Object.assign(params, {
                fontScale: 0.9,
                padding: 12,
                lineHeight: 1.3,
                barHeight: 22,
                barSpacing: 4,
                columnWidth: 65
            });
            break;
    }
    
    // Update UI controls
    updateControlValues();
    
    if (window.updateAllCharts) {
        window.updateAllCharts();
    }
}

function updateControlValues() {
    const controlMappings = [
        { id: 'fontScale', param: 'fontScale', suffix: 'x' },
        { id: 'padding', param: 'padding', suffix: 'px' },
        { id: 'lineHeight', param: 'lineHeight', suffix: '' },
        { id: 'barHeight', param: 'barHeight', suffix: 'px' },
        { id: 'barSpacing', param: 'barSpacing', suffix: 'px' },
        { id: 'columnWidth', param: 'columnWidth', suffix: 'px' }
    ];

    controlMappings.forEach(({ id, param, suffix }) => {
        const slider = document.getElementById(id);
        const valueSpan = document.getElementById(id + 'Value');
        
        if (slider && valueSpan) {
            slider.value = params[param];
            valueSpan.textContent = params[param] + suffix;
        }
    });
}

// Debug mode
let debugMode = false;

function toggleDebugMode() {
    debugMode = !debugMode;
    document.body.classList.toggle('debug', debugMode);
}

// PDF generation placeholder
function generatePDF() {
    alert('PDF generation functionality will be implemented next!');
    // TODO: Implement PDF generation from the current layout
} 