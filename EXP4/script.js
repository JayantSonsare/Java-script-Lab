document.addEventListener('DOMContentLoaded', function() {
    const vehicleInput = document.getElementById('vehicleInput');

    // Real-time listener for vehicle registration number
    vehicleInput.addEventListener('input', function() {
        // Strip spaces and normalize to uppercase for the input
        let val = vehicleInput.value.replace(/\s+/g, '').toUpperCase();
        vehicleInput.value = val;
        
        updateVehicleRules(val, false);
    });
});

// Real-time vehicle rule verification
function updateVehicleRules(val, forceErrorState = false) {
    // 1. Not Empty Check
    const isNotEmpty = val.length > 0;
    setRuleState('ruleNotEmpty', isNotEmpty ? 'valid' : (forceErrorState ? 'invalid-touched' : 'invalid'));

    // 2. Length Check
    const isLength10 = val.length === 10;
    let lengthState = 'invalid';
    if (isLength10) {
        lengthState = 'valid';
    } else if (val.length > 10 || (forceErrorState && !isLength10)) {
        lengthState = 'invalid-touched';
    }
    setRuleState('ruleLength10', lengthState);

    // 3. First two characters: Uppercase alphabets (State Code)
    let stateStatus = 'invalid';
    if (val.length >= 2) {
        const isStateValid = /^[A-Z]{2}$/.test(val.substring(0, 2));
        stateStatus = isStateValid ? 'valid' : 'invalid-touched';
    } else if (forceErrorState) {
        stateStatus = 'invalid-touched';
    }
    setRuleState('ruleState', stateStatus);

    // 4. Next two characters: Digits (District Code)
    let districtStatus = 'invalid';
    if (val.length >= 4) {
        const isDistrictValid = /^[0-9]{2}$/.test(val.substring(2, 4));
        districtStatus = isDistrictValid ? 'valid' : 'invalid-touched';
    } else if (forceErrorState) {
        districtStatus = 'invalid-touched';
    }
    setRuleState('ruleDistrict', districtStatus);

    // 5. Next two characters: Uppercase alphabets (Series)
    let seriesStatus = 'invalid';
    if (val.length >= 6) {
        const isSeriesValid = /^[A-Z]{2}$/.test(val.substring(4, 6));
        seriesStatus = isSeriesValid ? 'valid' : 'invalid-touched';
    } else if (forceErrorState) {
        seriesStatus = 'invalid-touched';
    }
    setRuleState('ruleSeries', seriesStatus);

    // 6. Last four characters: Digits (Vehicle Number)
    let numberStatus = 'invalid';
    if (val.length >= 10) {
        const isNumberValid = /^[0-9]{4}$/.test(val.substring(6, 10));
        numberStatus = isNumberValid ? 'valid' : 'invalid-touched';
    } else if (forceErrorState) {
        numberStatus = 'invalid-touched';
    }
    setRuleState('ruleNumber', numberStatus);

    return isNotEmpty && isLength10 && 
           /^[A-Z]{2}$/.test(val.substring(0, 2)) &&
           /^[0-9]{2}$/.test(val.substring(2, 4)) &&
           /^[A-Z]{2}$/.test(val.substring(4, 6)) &&
           /^[0-9]{4}$/.test(val.substring(6, 10));
}

function setRuleState(elementId, stateClass) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.className = `rule-item ${stateClass}`;
}

// Vehicle Validation Submit
window.validateVehicleForm = function() {
    const val = document.getElementById('vehicleInput').value.trim();
    const plateDetailsPanel = document.getElementById('plateDetails');
    
    // Perform checking and highlight errors
    const isValid = updateVehicleRules(val, true);

    if (isValid) {
        showFeedback('vehicleFeedback', `Verification Successful! <strong>${val}</strong> is a valid registration number.`, 'success');
        
        // Populate and display parsed details
        document.getElementById('detailState').textContent = val.substring(0, 2);
        document.getElementById('detailDistrict').textContent = val.substring(2, 4);
        document.getElementById('detailSeries').textContent = val.substring(4, 6);
        document.getElementById('detailId').textContent = val.substring(6, 10);
        
        plateDetailsPanel.style.display = 'block';
    } else {
        showFeedback('vehicleFeedback', 'Verification Failed! Please correct the highlighted formatting errors.', 'error');
        plateDetailsPanel.style.display = 'none';
    }
};

// Helper methods for feedback elements
function showFeedback(id, message, type) {
    const banner = document.getElementById(id);
    if (!banner) return;
    banner.innerHTML = message;
    banner.className = `feedback-banner ${type}`;
    banner.style.display = 'block';
}
