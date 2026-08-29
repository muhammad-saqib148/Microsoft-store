export interface CityData {
  city: string;
  state: string;
  zip: string;
  country: string;
  region?: string;
  popular?: boolean;
}

export const CITIES_DATABASE: CityData[] = [
  // --- PAKISTAN: PUNJAB ---
  { city: 'Lahore', state: 'Punjab', zip: '54000', country: 'Pakistan', popular: true },
  { city: 'Rawalpindi', state: 'Punjab', zip: '46000', country: 'Pakistan', popular: true },
  { city: 'Faisalabad', state: 'Punjab', zip: '38000', country: 'Pakistan', popular: true },
  { city: 'Multan', state: 'Punjab', zip: '60000', country: 'Pakistan', popular: true },
  { city: 'Gujranwala', state: 'Punjab', zip: '52250', country: 'Pakistan', popular: true },
  { city: 'Sialkot', state: 'Punjab', zip: '51310', country: 'Pakistan', popular: true },
  { city: 'Bahawalpur', state: 'Punjab', zip: '63100', country: 'Pakistan', popular: true },
  { city: 'Sargodha', state: 'Punjab', zip: '40100', country: 'Pakistan', popular: true },
  { city: 'Gujrat', state: 'Punjab', zip: '50700', country: 'Pakistan', popular: true },
  { city: 'Sheikhupura', state: 'Punjab', zip: '39350', country: 'Pakistan' },
  { city: 'Jhelum', state: 'Punjab', zip: '49600', country: 'Pakistan', popular: true },
  { city: 'Sahiwal', state: 'Punjab', zip: '57000', country: 'Pakistan' },
  { city: 'Kasur', state: 'Punjab', zip: '55050', country: 'Pakistan' },
  { city: 'Okara', state: 'Punjab', zip: '56300', country: 'Pakistan' },
  { city: 'Chiniot', state: 'Punjab', zip: '35400', country: 'Pakistan' },
  { city: 'Rahim Yar Khan', state: 'Punjab', zip: '64200', country: 'Pakistan', popular: true },
  { city: 'Dera Ghazi Khan', state: 'Punjab', zip: '32200', country: 'Pakistan' },
  { city: 'Taxila', state: 'Punjab', zip: '47080', country: 'Pakistan' },
  { city: 'Wah Cantt', state: 'Punjab', zip: '47040', country: 'Pakistan' },
  { city: 'Attock', state: 'Punjab', zip: '43600', country: 'Pakistan' },
  { city: 'Chakwal', state: 'Punjab', zip: '48800', country: 'Pakistan' },
  { city: 'Hafizabad', state: 'Punjab', zip: '52110', country: 'Pakistan' },
  { city: 'Mandi Bahauddin', state: 'Punjab', zip: '50400', country: 'Pakistan' },
  { city: 'Jhang', state: 'Punjab', zip: '35200', country: 'Pakistan' },
  { city: 'Vehari', state: 'Punjab', zip: '61100', country: 'Pakistan' },
  { city: 'Khanewal', state: 'Punjab', zip: '58150', country: 'Pakistan' },
  { city: 'Lodhran', state: 'Punjab', zip: '59320', country: 'Pakistan' },
  { city: 'Pakpattan', state: 'Punjab', zip: '57400', country: 'Pakistan' },
  { city: 'Toba Tek Singh', state: 'Punjab', zip: '36050', country: 'Pakistan' },
  { city: 'Muzaffargarh', state: 'Punjab', zip: '34200', country: 'Pakistan' },
  { city: 'Layyah', state: 'Punjab', zip: '31200', country: 'Pakistan' },
  { city: 'Bhakkar', state: 'Punjab', zip: '30000', country: 'Pakistan' },
  { city: 'Mianwali', state: 'Punjab', zip: '42200', country: 'Pakistan' },
  { city: 'Khushab', state: 'Punjab', zip: '41000', country: 'Pakistan' },
  { city: 'Rajanpur', state: 'Punjab', zip: '33500', country: 'Pakistan' },
  { city: 'Bahawalnagar', state: 'Punjab', zip: '62300', country: 'Pakistan' },
  { city: 'Kamoke', state: 'Punjab', zip: '50540', country: 'Pakistan' },
  { city: 'Muridke', state: 'Punjab', zip: '39010', country: 'Pakistan' },
  { city: 'Burewala', state: 'Punjab', zip: '61010', country: 'Pakistan' },
  { city: 'Gojra', state: 'Punjab', zip: '36120', country: 'Pakistan' },
  { city: 'Samundri', state: 'Punjab', zip: '37300', country: 'Pakistan' },
  { city: 'Jaranwala', state: 'Punjab', zip: '37200', country: 'Pakistan' },
  { city: 'Wazirabad', state: 'Punjab', zip: '52000', country: 'Pakistan' },
  { city: 'Daska', state: 'Punjab', zip: '51010', country: 'Pakistan' },
  { city: 'Pasrur', state: 'Punjab', zip: '51480', country: 'Pakistan' },
  { city: 'Sambrial', state: 'Punjab', zip: '51070', country: 'Pakistan' },
  { city: 'Narowal', state: 'Punjab', zip: '51600', country: 'Pakistan' },
  { city: 'Shakargarh', state: 'Punjab', zip: '51800', country: 'Pakistan' },
  { city: 'Bhalwal', state: 'Punjab', zip: '40410', country: 'Pakistan' },
  { city: 'Shahkot', state: 'Punjab', zip: '39630', country: 'Pakistan' },
  { city: 'Nankana Sahib', state: 'Punjab', zip: '39100', country: 'Pakistan' },
  { city: 'Pattoki', state: 'Punjab', zip: '55300', country: 'Pakistan' },
  { city: 'Chunian', state: 'Punjab', zip: '55270', country: 'Pakistan' },
  { city: 'Kot Radha Kishan', state: 'Punjab', zip: '55010', country: 'Pakistan' },
  { city: 'Renala Khurd', state: 'Punjab', zip: '56130', country: 'Pakistan' },
  { city: 'Chichawatni', state: 'Punjab', zip: '57200', country: 'Pakistan' },
  { city: 'Mailsi', state: 'Punjab', zip: '61200', country: 'Pakistan' },
  { city: 'Jahanian', state: 'Punjab', zip: '58200', country: 'Pakistan' },
  { city: 'Kabirwala', state: 'Punjab', zip: '58250', country: 'Pakistan' },
  { city: 'Shorkot', state: 'Punjab', zip: '35000', country: 'Pakistan' },
  { city: 'Ahmadpur East', state: 'Punjab', zip: '63350', country: 'Pakistan' },
  { city: 'Hasilpur', state: 'Punjab', zip: '63000', country: 'Pakistan' },
  { city: 'Haroonabad', state: 'Punjab', zip: '62110', country: 'Pakistan' },
  { city: 'Fort Abbas', state: 'Punjab', zip: '62020', country: 'Pakistan' },
  { city: 'Sadiqabad', state: 'Punjab', zip: '64350', country: 'Pakistan' },
  { city: 'Khanpur', state: 'Punjab', zip: '64100', country: 'Pakistan' },
  { city: 'Liaquatpur', state: 'Punjab', zip: '64000', country: 'Pakistan' },
  { city: 'Taunsa', state: 'Punjab', zip: '32100', country: 'Pakistan' },
  { city: 'Kot Addu', state: 'Punjab', zip: '34050', country: 'Pakistan' },
  { city: 'Alipur', state: 'Punjab', zip: '34100', country: 'Pakistan' },
  { city: 'Jatoi', state: 'Punjab', zip: '34300', country: 'Pakistan' },
  { city: 'Karor Lal Esan', state: 'Punjab', zip: '31100', country: 'Pakistan' },
  { city: 'Mankera', state: 'Punjab', zip: '30100', country: 'Pakistan' },
  { city: 'Darya Khan', state: 'Punjab', zip: '30200', country: 'Pakistan' },
  { city: 'Isa Khel', state: 'Punjab', zip: '42300', country: 'Pakistan' },
  { city: 'Piplan', state: 'Punjab', zip: '42100', country: 'Pakistan' },
  { city: 'Quaidabad', state: 'Punjab', zip: '41200', country: 'Pakistan' },
  { city: 'Noorpur Thal', state: 'Punjab', zip: '41100', country: 'Pakistan' },
  { city: 'Jauharabad', state: 'Punjab', zip: '41300', country: 'Pakistan' },
  { city: 'Talagang', state: 'Punjab', zip: '48100', country: 'Pakistan' },
  { city: 'Choa Saidan Shah', state: 'Punjab', zip: '48320', country: 'Pakistan' },
  { city: 'Kallar Kahar', state: 'Punjab', zip: '48530', country: 'Pakistan' },
  { city: 'Pind Dadan Khan', state: 'Punjab', zip: '49040', country: 'Pakistan' },
  { city: 'Dina', state: 'Punjab', zip: '49400', country: 'Pakistan' },
  { city: 'Sohawa', state: 'Punjab', zip: '49300', country: 'Pakistan' },
  { city: 'Gujar Khan', state: 'Punjab', zip: '47850', country: 'Pakistan' },
  { city: 'Kahuta', state: 'Punjab', zip: '47310', country: 'Pakistan' },
  { city: 'Kallar Syedan', state: 'Punjab', zip: '47410', country: 'Pakistan' },
  { city: 'Kotli Sattian', state: 'Punjab', zip: '47130', country: 'Pakistan' },
  { city: 'Murree', state: 'Punjab', zip: '47150', country: 'Pakistan', popular: true },
  { city: 'Fateh Jang', state: 'Punjab', zip: '43750', country: 'Pakistan' },
  { city: 'Hassan Abdal', state: 'Punjab', zip: '43730', country: 'Pakistan' },
  { city: 'Pindi Gheb', state: 'Punjab', zip: '43500', country: 'Pakistan' },
  { city: 'Jand', state: 'Punjab', zip: '43400', country: 'Pakistan' },
  { city: 'Hazro', state: 'Punjab', zip: '43470', country: 'Pakistan' },
  { city: 'Pindi Bhattian', state: 'Punjab', zip: '52180', country: 'Pakistan' },
  { city: 'Jalalpur Bhattian', state: 'Punjab', zip: '52130', country: 'Pakistan' },
  { city: 'Sukheke', state: 'Punjab', zip: '52160', country: 'Pakistan' },
  { city: 'Phalia', state: 'Punjab', zip: '50430', country: 'Pakistan' },
  { city: 'Malakwal', state: 'Punjab', zip: '50410', country: 'Pakistan' },
  { city: 'Kharian', state: 'Punjab', zip: '50090', country: 'Pakistan' },
  { city: 'Sarai Alamgir', state: 'Punjab', zip: '49700', country: 'Pakistan' },
  { city: 'Lalamusa', state: 'Punjab', zip: '50100', country: 'Pakistan' },

  // --- PAKISTAN: ISLAMABAD CAPITAL TERRITORY ---
  { city: 'Islamabad', state: 'Islamabad Capital Territory', zip: '44000', country: 'Pakistan', popular: true },

  // --- PAKISTAN: SINDH ---
  { city: 'Karachi', state: 'Sindh', zip: '74200', country: 'Pakistan', popular: true },
  { city: 'Hyderabad', state: 'Sindh', zip: '71000', country: 'Pakistan', popular: true },
  { city: 'Sukkur', state: 'Sindh', zip: '65200', country: 'Pakistan', popular: true },
  { city: 'Larkana', state: 'Sindh', zip: '77150', country: 'Pakistan', popular: true },
  { city: 'Nawabshah (Shaheed Benazirabad)', state: 'Sindh', zip: '67450', country: 'Pakistan' },
  { city: 'Mirpur Khas', state: 'Sindh', zip: '69000', country: 'Pakistan' },
  { city: 'Jacobabad', state: 'Sindh', zip: '79200', country: 'Pakistan' },
  { city: 'Shikarpur', state: 'Sindh', zip: '78100', country: 'Pakistan' },
  { city: 'Khairpur', state: 'Sindh', zip: '66020', country: 'Pakistan' },
  { city: 'Badin', state: 'Sindh', zip: '72200', country: 'Pakistan' },
  { city: 'Thatta', state: 'Sindh', zip: '73110', country: 'Pakistan' },
  { city: 'Dadu', state: 'Sindh', zip: '76200', country: 'Pakistan' },
  { city: 'Ghotki', state: 'Sindh', zip: '65110', country: 'Pakistan' },
  { city: 'Kashmore', state: 'Sindh', zip: '79150', country: 'Pakistan' },
  { city: 'Umerkot', state: 'Sindh', zip: '69100', country: 'Pakistan' },
  { city: 'Mithi', state: 'Sindh', zip: '69230', country: 'Pakistan' },
  { city: 'Sanghar', state: 'Sindh', zip: '68100', country: 'Pakistan' },
  { city: 'Tando Adam', state: 'Sindh', zip: '68000', country: 'Pakistan' },
  { city: 'Tando Allahyar', state: 'Sindh', zip: '70010', country: 'Pakistan' },
  { city: 'Kotri', state: 'Sindh', zip: '76000', country: 'Pakistan' },
  { city: 'Shahdadkot', state: 'Sindh', zip: '77300', country: 'Pakistan' },
  { city: 'Kandhkot', state: 'Sindh', zip: '79100', country: 'Pakistan' },

  // --- PAKISTAN: KHYBER PAKHTUNKHWA (KP) ---
  { city: 'Peshawar', state: 'Khyber Pakhtunkhwa', zip: '25000', country: 'Pakistan', popular: true },
  { city: 'Abbottabad', state: 'Khyber Pakhtunkhwa', zip: '22010', country: 'Pakistan', popular: true },
  { city: 'Mardan', state: 'Khyber Pakhtunkhwa', zip: '23200', country: 'Pakistan', popular: true },
  { city: 'Mingora (Swat)', state: 'Khyber Pakhtunkhwa', zip: '19130', country: 'Pakistan', popular: true },
  { city: 'Dera Ismail Khan', state: 'Khyber Pakhtunkhwa', zip: '29050', country: 'Pakistan' },
  { city: 'Kohat', state: 'Khyber Pakhtunkhwa', zip: '26000', country: 'Pakistan' },
  { city: 'Mansehra', state: 'Khyber Pakhtunkhwa', zip: '21300', country: 'Pakistan' },
  { city: 'Bannu', state: 'Khyber Pakhtunkhwa', zip: '28100', country: 'Pakistan' },
  { city: 'Nowshera', state: 'Khyber Pakhtunkhwa', zip: '24110', country: 'Pakistan' },
  { city: 'Swabi', state: 'Khyber Pakhtunkhwa', zip: '23430', country: 'Pakistan' },
  { city: 'Charsadda', state: 'Khyber Pakhtunkhwa', zip: '24420', country: 'Pakistan' },
  { city: 'Haripur', state: 'Khyber Pakhtunkhwa', zip: '22620', country: 'Pakistan' },
  { city: 'Batkhela (Malakand)', state: 'Khyber Pakhtunkhwa', zip: '23020', country: 'Pakistan' },
  { city: 'Chitral', state: 'Khyber Pakhtunkhwa', zip: '17200', country: 'Pakistan' },
  { city: 'Dir', state: 'Khyber Pakhtunkhwa', zip: '18000', country: 'Pakistan' },
  { city: 'Timargara', state: 'Khyber Pakhtunkhwa', zip: '18300', country: 'Pakistan' },
  { city: 'Hangu', state: 'Khyber Pakhtunkhwa', zip: '26100', country: 'Pakistan' },
  { city: 'Karak', state: 'Khyber Pakhtunkhwa', zip: '27200', country: 'Pakistan' },
  { city: 'Tank', state: 'Khyber Pakhtunkhwa', zip: '29400', country: 'Pakistan' },

  // --- PAKISTAN: BALOCHISTAN ---
  { city: 'Quetta', state: 'Balochistan', zip: '87300', country: 'Pakistan', popular: true },
  { city: 'Gwadar', state: 'Balochistan', zip: '91200', country: 'Pakistan', popular: true },
  { city: 'Turbat', state: 'Balochistan', zip: '92600', country: 'Pakistan' },
  { city: 'Khuzdar', state: 'Balochistan', zip: '89100', country: 'Pakistan' },
  { city: 'Chaman', state: 'Balochistan', zip: '86000', country: 'Pakistan' },
  { city: 'Hub', state: 'Balochistan', zip: '90250', country: 'Pakistan' },
  { city: 'Sibi', state: 'Balochistan', zip: '82000', country: 'Pakistan' },
  { city: 'Zhob', state: 'Balochistan', zip: '85200', country: 'Pakistan' },
  { city: 'Loralai', state: 'Balochistan', zip: '84800', country: 'Pakistan' },
  { city: 'Jafarabad (Dera Allah Yar)', state: 'Balochistan', zip: '80000', country: 'Pakistan' },
  { city: 'Nushki', state: 'Balochistan', zip: '87000', country: 'Pakistan' },
  { city: 'Kalat', state: 'Balochistan', zip: '88300', country: 'Pakistan' },
  { city: 'Panjgur', state: 'Balochistan', zip: '93000', country: 'Pakistan' },
  { city: 'Pasni', state: 'Balochistan', zip: '91300', country: 'Pakistan' },

  // --- PAKISTAN: AZAD JAMMU & KASHMIR (AJK) ---
  { city: 'Muzaffarabad', state: 'Azad Kashmir', zip: '13100', country: 'Pakistan', popular: true },
  { city: 'Mirpur', state: 'Azad Kashmir', zip: '10250', country: 'Pakistan', popular: true },
  { city: 'Kotli', state: 'Azad Kashmir', zip: '11100', country: 'Pakistan' },
  { city: 'Rawalakot', state: 'Azad Kashmir', zip: '12350', country: 'Pakistan' },
  { city: 'Bhimber', state: 'Azad Kashmir', zip: '10040', country: 'Pakistan' },
  { city: 'Bagh', state: 'Azad Kashmir', zip: '12500', country: 'Pakistan' },
  { city: 'Pallandri (Sudhanoti)', state: 'Azad Kashmir', zip: '12050', country: 'Pakistan' },
  { city: 'Hattian Bala', state: 'Azad Kashmir', zip: '13150', country: 'Pakistan' },
  { city: 'Haveli (Kahuta)', state: 'Azad Kashmir', zip: '12400', country: 'Pakistan' },
  { city: 'Neelum (Athmuqam)', state: 'Azad Kashmir', zip: '13200', country: 'Pakistan' },

  // --- PAKISTAN: GILGIT-BALTISTAN (GB) ---
  { city: 'Gilgit', state: 'Gilgit-Baltistan', zip: '15100', country: 'Pakistan', popular: true },
  { city: 'Skardu', state: 'Gilgit-Baltistan', zip: '16100', country: 'Pakistan', popular: true },
  { city: 'Hunza (Karimabad)', state: 'Gilgit-Baltistan', zip: '15700', country: 'Pakistan', popular: true },
  { city: 'Chilas (Diamer)', state: 'Gilgit-Baltistan', zip: '14100', country: 'Pakistan' },
  { city: 'Ghanche (Khaplu)', state: 'Gilgit-Baltistan', zip: '16200', country: 'Pakistan' },
  { city: 'Astore', state: 'Gilgit-Baltistan', zip: '14200', country: 'Pakistan' },
  { city: 'Ghizer (Gakuch)', state: 'Gilgit-Baltistan', zip: '15200', country: 'Pakistan' },
  { city: 'Nagar', state: 'Gilgit-Baltistan', zip: '15600', country: 'Pakistan' },
  { city: 'Kharmang', state: 'Gilgit-Baltistan', zip: '16300', country: 'Pakistan' },
  { city: 'Shigar', state: 'Gilgit-Baltistan', zip: '16400', country: 'Pakistan' },

  // --- INTERNATIONAL / GLOBAL HUBS ---
  { city: 'New York', state: 'New York', zip: '10001', country: 'United States', popular: true },
  { city: 'Seattle', state: 'Washington', zip: '98101', country: 'United States', popular: true },
  { city: 'San Francisco', state: 'California', zip: '94102', country: 'United States' },
  { city: 'Los Angeles', state: 'California', zip: '90001', country: 'United States' },
  { city: 'Chicago', state: 'Illinois', zip: '60601', country: 'United States' },
  { city: 'Austin', state: 'Texas', zip: '78701', country: 'United States' },
  { city: 'London', state: 'Greater London', zip: 'EC1A 1BB', country: 'United Kingdom', popular: true },
  { city: 'Manchester', state: 'Greater Manchester', zip: 'M1 1AE', country: 'United Kingdom' },
  { city: 'Toronto', state: 'Ontario', zip: 'M5H 2N2', country: 'Canada', popular: true },
  { city: 'Vancouver', state: 'British Columbia', zip: 'V6B 1A1', country: 'Canada' },
  { city: 'Dubai', state: 'Dubai', zip: '00000', country: 'United Arab Emirates', popular: true },
  { city: 'Abu Dhabi', state: 'Abu Dhabi', zip: '00000', country: 'United Arab Emirates' },
  { city: 'Riyadh', state: 'Riyadh Province', zip: '11564', country: 'Saudi Arabia', popular: true },
  { city: 'Jeddah', state: 'Makkah Province', zip: '21577', country: 'Saudi Arabia' },
  { city: 'Singapore', state: 'Central Region', zip: '018989', country: 'Singapore' },
  { city: 'Sydney', state: 'New South Wales', zip: '2000', country: 'Australia' },
  { city: 'Melbourne', state: 'Victoria', zip: '3000', country: 'Australia' },
  { city: 'Tokyo', state: 'Tokyo Prefecture', zip: '100-0001', country: 'Japan' },
  { city: 'Berlin', state: 'Berlin State', zip: '10115', country: 'Germany' },
  { city: 'Paris', state: 'Île-de-France', zip: '75001', country: 'France' },
];

/**
 * Searches cities by query string (matches city, state, zip, or country).
 */
export function searchCities(query: string): CityData[] {
  if (!query || !query.trim()) {
    return CITIES_DATABASE.slice(0, 30);
  }
  const clean = query.toLowerCase().trim();
  return CITIES_DATABASE.filter(c => 
    c.city.toLowerCase().includes(clean) ||
    c.state.toLowerCase().includes(clean) ||
    c.zip.toLowerCase().includes(clean) ||
    c.country.toLowerCase().includes(clean)
  );
}

/**
 * Finds exact or closest city entry
 */
export function findCityData(cityName: string): CityData | undefined {
  if (!cityName) return undefined;
  const clean = cityName.toLowerCase().trim();
  return CITIES_DATABASE.find(c => c.city.toLowerCase() === clean);
}

/**
 * Get popular default cities for quick chips
 */
export function getPopularCities(): CityData[] {
  return CITIES_DATABASE.filter(c => c.popular);
}
