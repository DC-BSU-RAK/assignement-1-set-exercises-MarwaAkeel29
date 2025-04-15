// Wait until the page has fully loaded
window.addEventListener('DOMContentLoaded', function () {
    // Get references to input and output elements
    const priceInput = document.getElementById('price');
    const litersInput = document.getElementById('liters');
    const distanceInput = document.getElementById('distance');
    const calculateBtn = document.getElementById('calculateBtn');
  
    const costOutput = document.getElementById('costOutput');
    const efficiencyOutput = document.getElementById('efficiencyOutput');
  
    // Add a click event to the Calculate button
    calculateBtn.addEventListener('click', function () {
      // Get the user inputs
      const price = parseFloat(priceInput.value);
      const liters = parseFloat(litersInput.value);
      const distance = parseFloat(distanceInput.value);
  
      // Basic input validation
      if (isNaN(price) || isNaN(liters) || isNaN(distance) || liters === 0) {
        alert("Please enter valid numbers (liters can't be 0).");
        return;
      }
  
      // Calculate total cost
      const cost = price * liters;
      costOutput.textContent = `Total Cost: £${cost.toFixed(2)}`;
  
      // Calculate fuel efficiency
      const efficiency = distance / liters;
      efficiencyOutput.textContent = `Efficiency: ${efficiency.toFixed(2)} km/l`;
    });
  });
  
  