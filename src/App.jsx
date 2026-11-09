import { useState } from "react";

function App() {
    const [convertedTemperature, setConvertedTemperature] = useState(null);
    const [error, setError] = useState(null);

    function convertToCelsius(temperature, unit) {
            if (unit === "celsius") {
                return temperature;
            } else if (unit === "fahrenheit") {
                return ((temperature - 32) / 1.8);
            } else if (unit === "kelvin") {
                return temperature - 273.15;
            }
        }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const originalTemperature = Number(formData.get("temperature-input"));
        const originalUnit = formData.get("original-unit-select");
        const unitToConvertTo = formData.get("to-unit-select");
        let convertedTemperature;

        const celsiusUnit = convertToCelsius(originalTemperature, originalUnit);
        if (celsiusUnit < -273.15) {
            setError("Temperature cannot be below absolute zero.");
            setConvertedTemperature(null);
            return;
        }

        setError(null);

        if (unitToConvertTo === "fahrenheit") {
            convertedTemperature = (celsiusUnit * 1.8) + 32;
        } else if (unitToConvertTo === "kelvin") {
            convertedTemperature = celsiusUnit + 273.15;
        } else if (unitToConvertTo === "celsius") {
            convertedTemperature = celsiusUnit;
        } 

        setConvertedTemperature(` ${originalTemperature} ${originalUnit[0].toUpperCase() + originalUnit.slice(1)} is ${convertedTemperature.toFixed(2)} ${unitToConvertTo[0].toUpperCase() + unitToConvertTo.slice(1)}`)
    }

    return (
        <main>
            <h1>Temperature Converter</h1>
            <p>Enter the temperature, select units and submit</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    id="temperature-input"
                    name="temperature-input"
                    required
                />

                <select 
                    id="original-unit-select"
                    name="original-unit-select"
                    defaultValue="from-unit"
                    required
                >
                    <option value="from-unit" disabled>From Unit</option>
                    <option value="fahrenheit">Fahrenheit</option>
                    <option value="celsius">Celsius</option>
                    <option value="kelvin">Kelvin</option>
                </select>

                <select
                    id="to-unit-select"
                    name="to-unit-select"
                    defaultValue="to-unit"
                    required
                >
                    <option value="to-unit" disabled>To Unit</option>
                    <option value="fahrenheit">Fahrenheit</option>
                    <option value="celsius">Celsius</option>
                    <option value="kelvin">Kelvin</option>
                </select>

                <button 
                    id="convert-button"
                >
                    Convert
                </button>
            </form>

            {convertedTemperature !== null && (
                <p className="converted-temp">{convertedTemperature}</p>
            )}

            {error && <p className="error">{error}</p>}
        </main>
    )
}

export default App;