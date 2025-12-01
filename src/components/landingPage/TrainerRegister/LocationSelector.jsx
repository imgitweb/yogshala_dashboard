import React from "react";

const LocationSelector = ({
  countries, states, cities,
  selectedCountry, setSelectedCountry,
  selectedState, setSelectedState,
  selectedCity, setSelectedCity,
  setLocation
}) => (
  <>
    <div className="flex-1 mb-6">
      <label className="block text-sm font-600 text-dark mb-2">Country</label>
      <select
        value={selectedCountry}
        onChange={e => {
          setSelectedCountry(e.target.value);
          setLocation('');
        }}
        className="w-full px-4 py-3 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        required
      >
        <option value="">Select Country</option>
        {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
      </select>
    </div>

    <div className="flex-1 mb-6">
      <label className="block text-sm font-600 text-dark mb-2">State</label>
      <select
        value={selectedState}
        onChange={e => {
          setSelectedState(e.target.value);
          setLocation('');
        }}
        className="w-full px-4 py-3 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        required
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
      </select>
    </div>

    <div className="flex-1 mb-6">
      <label className="block text-sm font-600 text-dark mb-2">City</label>
      <select
        value={selectedCity}
        onChange={e => {
          setSelectedCity(e.target.value);
          setLocation(`${countries.find(c => c.isoCode === selectedCountry)?.name || ''}, ${states.find(s => s.isoCode === selectedState)?.name || ''}, ${e.target.value}`);
        }}
        className="w-full px-4 py-3 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        required
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map(city => <option key={city.name} value={city.name}>{city.name}</option>)}
      </select>
    </div>
  </>
);

export default LocationSelector;
