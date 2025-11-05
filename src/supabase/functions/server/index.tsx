import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Bangalore areas (Highest Priority - 0.5)
const bangaloreAreas = [
  { name: 'Hebbal', state: 'Bangalore', country: 'IN', lat: 13.0358, lon: 77.5970, priority: 0.5 },
  { name: 'Indiranagar', state: 'Bangalore', country: 'IN', lat: 12.9716, lon: 77.6412, priority: 0.5 },
  { name: 'Koramangala', state: 'Bangalore', country: 'IN', lat: 12.9352, lon: 77.6245, priority: 0.5 },
  { name: 'Whitefield', state: 'Bangalore', country: 'IN', lat: 12.9698, lon: 77.7499, priority: 0.5 },
  { name: 'Jayanagar', state: 'Bangalore', country: 'IN', lat: 12.9250, lon: 77.5838, priority: 0.5 },
  { name: 'Malleswaram', state: 'Bangalore', country: 'IN', lat: 13.0034, lon: 77.5709, priority: 0.5 },
  { name: 'Yelahanka', state: 'Bangalore', country: 'IN', lat: 13.1007, lon: 77.5963, priority: 0.5 },
  { name: 'Electronic City', state: 'Bangalore', country: 'IN', lat: 12.8456, lon: 77.6603, priority: 0.5 },
  { name: 'BTM Layout', state: 'Bangalore', country: 'IN', lat: 12.9165, lon: 77.6101, priority: 0.5 },
  { name: 'HSR Layout', state: 'Bangalore', country: 'IN', lat: 12.9082, lon: 77.6476, priority: 0.5 },
  { name: 'Marathahalli', state: 'Bangalore', country: 'IN', lat: 12.9591, lon: 77.6974, priority: 0.5 },
  { name: 'Banashankari', state: 'Bangalore', country: 'IN', lat: 12.9250, lon: 77.5487, priority: 0.5 },
  { name: 'Rajajinagar', state: 'Bangalore', country: 'IN', lat: 12.9915, lon: 77.5553, priority: 0.5 },
  { name: 'JP Nagar', state: 'Bangalore', country: 'IN', lat: 12.9082, lon: 77.5850, priority: 0.5 },
  { name: 'Basavanagudi', state: 'Bangalore', country: 'IN', lat: 12.9423, lon: 77.5743, priority: 0.5 },
  { name: 'Vijayanagar', state: 'Bangalore', country: 'IN', lat: 12.9698, lon: 77.5380, priority: 0.5 },
  { name: 'Sadashivanagar', state: 'Bangalore', country: 'IN', lat: 13.0049, lon: 77.5851, priority: 0.5 },
  { name: 'RT Nagar', state: 'Bangalore', country: 'IN', lat: 13.0269, lon: 77.5968, priority: 0.5 },
  { name: 'Bannerghatta', state: 'Bangalore', country: 'IN', lat: 12.8007, lon: 77.5774, priority: 0.5 },
  { name: 'Bommanahalli', state: 'Bangalore', country: 'IN', lat: 12.9104, lon: 77.6290, priority: 0.5 },
  { name: 'Yeshwanthpur', state: 'Bangalore', country: 'IN', lat: 13.0280, lon: 77.5385, priority: 0.5 },
  { name: 'KR Puram', state: 'Bangalore', country: 'IN', lat: 12.9989, lon: 77.6966, priority: 0.5 },
  { name: 'Sarjapur', state: 'Bangalore', country: 'IN', lat: 12.8839, lon: 77.7808, priority: 0.5 },
  { name: 'Bellandur', state: 'Bangalore', country: 'IN', lat: 12.9259, lon: 77.6766, priority: 0.5 },
  { name: 'Kadugodi', state: 'Bangalore', country: 'IN', lat: 12.9909, lon: 77.7577, priority: 0.5 },
  { name: 'Hoodi', state: 'Bangalore', country: 'IN', lat: 12.9932, lon: 77.7217, priority: 0.5 },
  { name: 'Ramamurthy Nagar', state: 'Bangalore', country: 'IN', lat: 13.0109, lon: 77.6677, priority: 0.5 },
  { name: 'CV Raman Nagar', state: 'Bangalore', country: 'IN', lat: 12.9851, lon: 77.6632, priority: 0.5 },
  { name: 'Kaggadasapura', state: 'Bangalore', country: 'IN', lat: 12.9870, lon: 77.6840, priority: 0.5 },
  { name: 'Mahadevapura', state: 'Bangalore', country: 'IN', lat: 12.9898, lon: 77.6972, priority: 0.5 },
];

// Karnataka cities (Priority 1)
const karnatakaCities = [
  { name: 'Bangalore', state: 'Karnataka', country: 'IN', lat: 12.9716, lon: 77.5946, priority: 1 },
  { name: 'Bengaluru', state: 'Karnataka', country: 'IN', lat: 12.9716, lon: 77.5946, priority: 1 },
  { name: 'Mysore', state: 'Karnataka', country: 'IN', lat: 12.2958, lon: 76.6394, priority: 1 },
  { name: 'Mysuru', state: 'Karnataka', country: 'IN', lat: 12.2958, lon: 76.6394, priority: 1 },
  { name: 'Mangalore', state: 'Karnataka', country: 'IN', lat: 12.9141, lon: 74.8560, priority: 1 },
  { name: 'Mangaluru', state: 'Karnataka', country: 'IN', lat: 12.9141, lon: 74.8560, priority: 1 },
  { name: 'Hubli', state: 'Karnataka', country: 'IN', lat: 15.3647, lon: 75.1240, priority: 1 },
  { name: 'Hubballi', state: 'Karnataka', country: 'IN', lat: 15.3647, lon: 75.1240, priority: 1 },
  { name: 'Belgaum', state: 'Karnataka', country: 'IN', lat: 15.8497, lon: 74.4977, priority: 1 },
  { name: 'Belagavi', state: 'Karnataka', country: 'IN', lat: 15.8497, lon: 74.4977, priority: 1 },
  { name: 'Davangere', state: 'Karnataka', country: 'IN', lat: 14.4644, lon: 75.9218, priority: 1 },
  { name: 'Shimoga', state: 'Karnataka', country: 'IN', lat: 13.9299, lon: 75.5681, priority: 1 },
  { name: 'Shivamogga', state: 'Karnataka', country: 'IN', lat: 13.9299, lon: 75.5681, priority: 1 },
  { name: 'Tumkur', state: 'Karnataka', country: 'IN', lat: 13.3392, lon: 77.1006, priority: 1 },
  { name: 'Tumakuru', state: 'Karnataka', country: 'IN', lat: 13.3392, lon: 77.1006, priority: 1 },
  { name: 'Gulbarga', state: 'Karnataka', country: 'IN', lat: 17.3297, lon: 76.8343, priority: 1 },
  { name: 'Kalaburagi', state: 'Karnataka', country: 'IN', lat: 17.3297, lon: 76.8343, priority: 1 },
  { name: 'Bellary', state: 'Karnataka', country: 'IN', lat: 15.1394, lon: 76.9214, priority: 1 },
  { name: 'Ballari', state: 'Karnataka', country: 'IN', lat: 15.1394, lon: 76.9214, priority: 1 },
  { name: 'Bijapur', state: 'Karnataka', country: 'IN', lat: 16.8302, lon: 75.7100, priority: 1 },
  { name: 'Vijayapura', state: 'Karnataka', country: 'IN', lat: 16.8302, lon: 75.7100, priority: 1 },
  { name: 'Udupi', state: 'Karnataka', country: 'IN', lat: 13.3389, lon: 74.7421, priority: 1 },
  { name: 'Hassan', state: 'Karnataka', country: 'IN', lat: 13.0033, lon: 76.1004, priority: 1 },
  { name: 'Dharwad', state: 'Karnataka', country: 'IN', lat: 15.4589, lon: 75.0078, priority: 1 },
  { name: 'Mandya', state: 'Karnataka', country: 'IN', lat: 12.5244, lon: 76.8958, priority: 1 },
  { name: 'Raichur', state: 'Karnataka', country: 'IN', lat: 16.2120, lon: 77.3439, priority: 1 },
  { name: 'Chikmagalur', state: 'Karnataka', country: 'IN', lat: 13.3161, lon: 75.7755, priority: 1 },
  { name: 'Chikkamagaluru', state: 'Karnataka', country: 'IN', lat: 13.3161, lon: 75.7755, priority: 1 },
  { name: 'Kolar', state: 'Karnataka', country: 'IN', lat: 13.1377, lon: 78.1297, priority: 1 },
  { name: 'Chitradurga', state: 'Karnataka', country: 'IN', lat: 14.2226, lon: 76.3984, priority: 1 },
  { name: 'Gadag', state: 'Karnataka', country: 'IN', lat: 15.4292, lon: 75.6347, priority: 1 },
  { name: 'Bagalkot', state: 'Karnataka', country: 'IN', lat: 16.1695, lon: 75.6955, priority: 1 },
  { name: 'Koppal', state: 'Karnataka', country: 'IN', lat: 15.3508, lon: 76.1541, priority: 1 },
  { name: 'Yadgir', state: 'Karnataka', country: 'IN', lat: 16.7696, lon: 77.1379, priority: 1 },
  { name: 'Haveri', state: 'Karnataka', country: 'IN', lat: 14.7951, lon: 75.4057, priority: 1 },
  { name: 'Karwar', state: 'Karnataka', country: 'IN', lat: 14.8134, lon: 74.1296, priority: 1 },
  { name: 'Bhadravati', state: 'Karnataka', country: 'IN', lat: 13.8486, lon: 75.7050, priority: 1 },
  { name: 'Ranebennur', state: 'Karnataka', country: 'IN', lat: 14.6167, lon: 75.6294, priority: 1 },
  { name: 'Puttur', state: 'Karnataka', country: 'IN', lat: 12.7597, lon: 75.2065, priority: 1 },
  { name: 'Kanakapura', state: 'Karnataka', country: 'IN', lat: 12.5410, lon: 77.4160, priority: 1 },
  { name: 'Anekal', state: 'Karnataka', country: 'IN', lat: 12.7111, lon: 77.6953, priority: 1 },
  { name: 'Devanahalli', state: 'Karnataka', country: 'IN', lat: 13.2429, lon: 77.7122, priority: 1 },
  { name: 'Ramanagara', state: 'Karnataka', country: 'IN', lat: 12.7171, lon: 77.2800, priority: 1 },
  { name: 'Channapatna', state: 'Karnataka', country: 'IN', lat: 12.6513, lon: 77.2062, priority: 1 },
  { name: 'Chintamani', state: 'Karnataka', country: 'IN', lat: 13.4000, lon: 78.0519, priority: 1 },
  { name: 'Hoskote', state: 'Karnataka', country: 'IN', lat: 13.0710, lon: 77.7980, priority: 1 },
  { name: 'Nelamangala', state: 'Karnataka', country: 'IN', lat: 13.0993, lon: 77.3936, priority: 1 },
  { name: 'Doddaballapur', state: 'Karnataka', country: 'IN', lat: 13.2271, lon: 77.5468, priority: 1 },
  { name: 'Sira', state: 'Karnataka', country: 'IN', lat: 13.7407, lon: 76.9026, priority: 1 },
  { name: 'Tiptur', state: 'Karnataka', country: 'IN', lat: 13.2567, lon: 76.4767, priority: 1 },
  { name: 'Kunigal', state: 'Karnataka', country: 'IN', lat: 13.0233, lon: 77.0262, priority: 1 },
  { name: 'Madhugiri', state: 'Karnataka', country: 'IN', lat: 13.6594, lon: 77.2103, priority: 1 },
  { name: 'Pavagada', state: 'Karnataka', country: 'IN', lat: 14.0994, lon: 77.2824, priority: 1 },
  { name: 'Hiriyur', state: 'Karnataka', country: 'IN', lat: 13.9465, lon: 76.6193, priority: 1 },
  { name: 'Channagiri', state: 'Karnataka', country: 'IN', lat: 14.0238, lon: 75.9258, priority: 1 },
  { name: 'Harihar', state: 'Karnataka', country: 'IN', lat: 14.5126, lon: 75.8059, priority: 1 },
  { name: 'Holalkere', state: 'Karnataka', country: 'IN', lat: 14.0531, lon: 76.1830, priority: 1 },
  { name: 'Jagalur', state: 'Karnataka', country: 'IN', lat: 14.5212, lon: 76.3391, priority: 1 },
  { name: 'Hosadurga', state: 'Karnataka', country: 'IN', lat: 13.7947, lon: 76.2814, priority: 1 },
  { name: 'Molakalmuru', state: 'Karnataka', country: 'IN', lat: 14.7176, lon: 76.7493, priority: 1 },
  { name: 'Challakere', state: 'Karnataka', country: 'IN', lat: 14.3158, lon: 76.6511, priority: 1 },
  { name: 'Sirsi', state: 'Karnataka', country: 'IN', lat: 14.6188, lon: 74.8365, priority: 1 },
  { name: 'Sagar', state: 'Karnataka', country: 'IN', lat: 14.1649, lon: 75.0257, priority: 1 },
  { name: 'Soraba', state: 'Karnataka', country: 'IN', lat: 14.3741, lon: 75.0644, priority: 1 },
  { name: 'Thirthahalli', state: 'Karnataka', country: 'IN', lat: 13.6887, lon: 75.2464, priority: 1 },
  { name: 'Hosanagara', state: 'Karnataka', country: 'IN', lat: 13.8969, lon: 75.0630, priority: 1 },
  { name: 'Shikaripura', state: 'Karnataka', country: 'IN', lat: 14.2711, lon: 75.3568, priority: 1 },
  { name: 'Arsikere', state: 'Karnataka', country: 'IN', lat: 13.3141, lon: 76.2570, priority: 1 },
  { name: 'Belur', state: 'Karnataka', country: 'IN', lat: 13.1655, lon: 75.8660, priority: 1 },
  { name: 'Holenarasipura', state: 'Karnataka', country: 'IN', lat: 13.1143, lon: 76.3504, priority: 1 },
  { name: 'Sakleshpur', state: 'Karnataka', country: 'IN', lat: 12.9413, lon: 75.7847, priority: 1 },
  { name: 'Kadur', state: 'Karnataka', country: 'IN', lat: 13.5534, lon: 76.0137, priority: 1 },
  { name: 'Mudigere', state: 'Karnataka', country: 'IN', lat: 13.1343, lon: 75.6361, priority: 1 },
  { name: 'Koppa', state: 'Karnataka', country: 'IN', lat: 13.5320, lon: 75.3619, priority: 1 },
  { name: 'Tarikere', state: 'Karnataka', country: 'IN', lat: 13.7095, lon: 75.8137, priority: 1 },
  { name: 'Narasimharajapura', state: 'Karnataka', country: 'IN', lat: 13.6109, lon: 75.5122, priority: 1 },
  { name: 'Pandavapura', state: 'Karnataka', country: 'IN', lat: 12.6503, lon: 76.6862, priority: 1 },
  { name: 'Maddur', state: 'Karnataka', country: 'IN', lat: 12.5823, lon: 77.0438, priority: 1 },
  { name: 'Malavalli', state: 'Karnataka', country: 'IN', lat: 12.3852, lon: 77.0633, priority: 1 },
  { name: 'Nagamangala', state: 'Karnataka', country: 'IN', lat: 12.8180, lon: 76.7546, priority: 1 },
  { name: 'Srirangapatna', state: 'Karnataka', country: 'IN', lat: 12.4224, lon: 76.6947, priority: 1 },
  { name: 'KR Pet', state: 'Karnataka', country: 'IN', lat: 12.6663, lon: 76.4027, priority: 1 },
];

// Other Indian cities (Priority 2)
const indianCities = [
  // Metro cities
  { name: 'Delhi', state: 'Delhi', country: 'IN', lat: 28.7041, lon: 77.1025, priority: 2 },
  { name: 'New Delhi', state: 'Delhi', country: 'IN', lat: 28.6139, lon: 77.2090, priority: 2 },
  { name: 'Mumbai', state: 'Maharashtra', country: 'IN', lat: 19.0760, lon: 72.8777, priority: 2 },
  { name: 'Kolkata', state: 'West Bengal', country: 'IN', lat: 22.5726, lon: 88.3639, priority: 2 },
  { name: 'Chennai', state: 'Tamil Nadu', country: 'IN', lat: 13.0827, lon: 80.2707, priority: 2 },
  { name: 'Hyderabad', state: 'Telangana', country: 'IN', lat: 17.3850, lon: 78.4867, priority: 2 },
  
  // Maharashtra
  { name: 'Pune', state: 'Maharashtra', country: 'IN', lat: 18.5204, lon: 73.8567, priority: 2 },
  { name: 'Nagpur', state: 'Maharashtra', country: 'IN', lat: 21.1458, lon: 79.0882, priority: 2 },
  { name: 'Nashik', state: 'Maharashtra', country: 'IN', lat: 19.9975, lon: 73.7898, priority: 2 },
  { name: 'Thane', state: 'Maharashtra', country: 'IN', lat: 19.2183, lon: 72.9781, priority: 2 },
  { name: 'Aurangabad', state: 'Maharashtra', country: 'IN', lat: 19.8762, lon: 75.3433, priority: 2 },
  { name: 'Solapur', state: 'Maharashtra', country: 'IN', lat: 17.6599, lon: 75.9064, priority: 2 },
  { name: 'Kolhapur', state: 'Maharashtra', country: 'IN', lat: 16.7050, lon: 74.2433, priority: 2 },
  { name: 'Amravati', state: 'Maharashtra', country: 'IN', lat: 20.9333, lon: 77.7500, priority: 2 },
  { name: 'Nanded', state: 'Maharashtra', country: 'IN', lat: 19.1383, lon: 77.3210, priority: 2 },
  { name: 'Akola', state: 'Maharashtra', country: 'IN', lat: 20.7002, lon: 77.0082, priority: 2 },
  
  // Tamil Nadu
  { name: 'Coimbatore', state: 'Tamil Nadu', country: 'IN', lat: 11.0168, lon: 76.9558, priority: 2 },
  { name: 'Madurai', state: 'Tamil Nadu', country: 'IN', lat: 9.9252, lon: 78.1198, priority: 2 },
  { name: 'Tiruchirappalli', state: 'Tamil Nadu', country: 'IN', lat: 10.7905, lon: 78.7047, priority: 2 },
  { name: 'Trichy', state: 'Tamil Nadu', country: 'IN', lat: 10.7905, lon: 78.7047, priority: 2 },
  { name: 'Salem', state: 'Tamil Nadu', country: 'IN', lat: 11.6643, lon: 78.1460, priority: 2 },
  { name: 'Tirunelveli', state: 'Tamil Nadu', country: 'IN', lat: 8.7139, lon: 77.7567, priority: 2 },
  { name: 'Erode', state: 'Tamil Nadu', country: 'IN', lat: 11.3410, lon: 77.7172, priority: 2 },
  { name: 'Vellore', state: 'Tamil Nadu', country: 'IN', lat: 12.9165, lon: 79.1325, priority: 2 },
  { name: 'Thanjavur', state: 'Tamil Nadu', country: 'IN', lat: 10.7870, lon: 79.1378, priority: 2 },
  { name: 'Dindigul', state: 'Tamil Nadu', country: 'IN', lat: 10.3673, lon: 77.9803, priority: 2 },
  { name: 'Kanchipuram', state: 'Tamil Nadu', country: 'IN', lat: 12.8342, lon: 79.7036, priority: 2 },
  
  // Gujarat
  { name: 'Ahmedabad', state: 'Gujarat', country: 'IN', lat: 23.0225, lon: 72.5714, priority: 2 },
  { name: 'Surat', state: 'Gujarat', country: 'IN', lat: 21.1702, lon: 72.8311, priority: 2 },
  { name: 'Vadodara', state: 'Gujarat', country: 'IN', lat: 22.3072, lon: 73.1812, priority: 2 },
  { name: 'Rajkot', state: 'Gujarat', country: 'IN', lat: 22.3039, lon: 70.8022, priority: 2 },
  { name: 'Bhavnagar', state: 'Gujarat', country: 'IN', lat: 21.7645, lon: 72.1519, priority: 2 },
  { name: 'Jamnagar', state: 'Gujarat', country: 'IN', lat: 22.4707, lon: 70.0577, priority: 2 },
  { name: 'Junagadh', state: 'Gujarat', country: 'IN', lat: 21.5222, lon: 70.4579, priority: 2 },
  { name: 'Gandhinagar', state: 'Gujarat', country: 'IN', lat: 23.2156, lon: 72.6369, priority: 2 },
  
  // Rajasthan
  { name: 'Jaipur', state: 'Rajasthan', country: 'IN', lat: 26.9124, lon: 75.7873, priority: 2 },
  { name: 'Jodhpur', state: 'Rajasthan', country: 'IN', lat: 26.2389, lon: 73.0243, priority: 2 },
  { name: 'Udaipur', state: 'Rajasthan', country: 'IN', lat: 24.5854, lon: 73.7125, priority: 2 },
  { name: 'Kota', state: 'Rajasthan', country: 'IN', lat: 25.2138, lon: 75.8648, priority: 2 },
  { name: 'Bikaner', state: 'Rajasthan', country: 'IN', lat: 28.0229, lon: 73.3119, priority: 2 },
  { name: 'Ajmer', state: 'Rajasthan', country: 'IN', lat: 26.4499, lon: 74.6399, priority: 2 },
  { name: 'Alwar', state: 'Rajasthan', country: 'IN', lat: 27.5530, lon: 76.6346, priority: 2 },
  
  // Uttar Pradesh
  { name: 'Lucknow', state: 'Uttar Pradesh', country: 'IN', lat: 26.8467, lon: 80.9462, priority: 2 },
  { name: 'Kanpur', state: 'Uttar Pradesh', country: 'IN', lat: 26.4499, lon: 80.3319, priority: 2 },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', country: 'IN', lat: 28.6692, lon: 77.4538, priority: 2 },
  { name: 'Agra', state: 'Uttar Pradesh', country: 'IN', lat: 27.1767, lon: 78.0081, priority: 2 },
  { name: 'Varanasi', state: 'Uttar Pradesh', country: 'IN', lat: 25.3176, lon: 82.9739, priority: 2 },
  { name: 'Meerut', state: 'Uttar Pradesh', country: 'IN', lat: 28.9845, lon: 77.7064, priority: 2 },
  { name: 'Allahabad', state: 'Uttar Pradesh', country: 'IN', lat: 25.4358, lon: 81.8463, priority: 2 },
  { name: 'Prayagraj', state: 'Uttar Pradesh', country: 'IN', lat: 25.4358, lon: 81.8463, priority: 2 },
  { name: 'Bareilly', state: 'Uttar Pradesh', country: 'IN', lat: 28.3670, lon: 79.4304, priority: 2 },
  { name: 'Aligarh', state: 'Uttar Pradesh', country: 'IN', lat: 27.8974, lon: 78.0880, priority: 2 },
  { name: 'Moradabad', state: 'Uttar Pradesh', country: 'IN', lat: 28.8389, lon: 78.7378, priority: 2 },
  { name: 'Gorakhpur', state: 'Uttar Pradesh', country: 'IN', lat: 26.7606, lon: 83.3732, priority: 2 },
  { name: 'Noida', state: 'Uttar Pradesh', country: 'IN', lat: 28.5355, lon: 77.3910, priority: 2 },
  
  // Madhya Pradesh
  { name: 'Indore', state: 'Madhya Pradesh', country: 'IN', lat: 22.7196, lon: 75.8577, priority: 2 },
  { name: 'Bhopal', state: 'Madhya Pradesh', country: 'IN', lat: 23.2599, lon: 77.4126, priority: 2 },
  { name: 'Jabalpur', state: 'Madhya Pradesh', country: 'IN', lat: 23.1815, lon: 79.9864, priority: 2 },
  { name: 'Gwalior', state: 'Madhya Pradesh', country: 'IN', lat: 26.2183, lon: 78.1828, priority: 2 },
  { name: 'Ujjain', state: 'Madhya Pradesh', country: 'IN', lat: 23.1765, lon: 75.7885, priority: 2 },
  { name: 'Sagar', state: 'Madhya Pradesh', country: 'IN', lat: 23.8388, lon: 78.7378, priority: 2 },
  
  // Kerala
  { name: 'Kochi', state: 'Kerala', country: 'IN', lat: 9.9312, lon: 76.2673, priority: 2 },
  { name: 'Thiruvananthapuram', state: 'Kerala', country: 'IN', lat: 8.5241, lon: 76.9366, priority: 2 },
  { name: 'Kozhikode', state: 'Kerala', country: 'IN', lat: 11.2588, lon: 75.7804, priority: 2 },
  { name: 'Calicut', state: 'Kerala', country: 'IN', lat: 11.2588, lon: 75.7804, priority: 2 },
  { name: 'Thrissur', state: 'Kerala', country: 'IN', lat: 10.5276, lon: 76.2144, priority: 2 },
  { name: 'Kannur', state: 'Kerala', country: 'IN', lat: 11.8745, lon: 75.3704, priority: 2 },
  { name: 'Kollam', state: 'Kerala', country: 'IN', lat: 8.8932, lon: 76.6141, priority: 2 },
  { name: 'Alappuzha', state: 'Kerala', country: 'IN', lat: 9.4981, lon: 76.3388, priority: 2 },
  { name: 'Palakkad', state: 'Kerala', country: 'IN', lat: 10.7867, lon: 76.6548, priority: 2 },
  { name: 'Malappuram', state: 'Kerala', country: 'IN', lat: 11.0510, lon: 76.0711, priority: 2 },
  
  // Andhra Pradesh & Telangana
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'IN', lat: 17.6869, lon: 83.2185, priority: 2 },
  { name: 'Vijayawada', state: 'Andhra Pradesh', country: 'IN', lat: 16.5062, lon: 80.6480, priority: 2 },
  { name: 'Guntur', state: 'Andhra Pradesh', country: 'IN', lat: 16.3067, lon: 80.4365, priority: 2 },
  { name: 'Nellore', state: 'Andhra Pradesh', country: 'IN', lat: 14.4426, lon: 79.9865, priority: 2 },
  { name: 'Tirupati', state: 'Andhra Pradesh', country: 'IN', lat: 13.6288, lon: 79.4192, priority: 2 },
  { name: 'Warangal', state: 'Telangana', country: 'IN', lat: 17.9689, lon: 79.5941, priority: 2 },
  { name: 'Nizamabad', state: 'Telangana', country: 'IN', lat: 18.6725, lon: 78.0941, priority: 2 },
  
  // West Bengal
  { name: 'Asansol', state: 'West Bengal', country: 'IN', lat: 23.6739, lon: 86.9524, priority: 2 },
  { name: 'Siliguri', state: 'West Bengal', country: 'IN', lat: 26.7271, lon: 88.3953, priority: 2 },
  { name: 'Durgapur', state: 'West Bengal', country: 'IN', lat: 23.5204, lon: 87.3119, priority: 2 },
  { name: 'Howrah', state: 'West Bengal', country: 'IN', lat: 22.5958, lon: 88.2636, priority: 2 },
  
  // Bihar & Jharkhand
  { name: 'Patna', state: 'Bihar', country: 'IN', lat: 25.5941, lon: 85.1376, priority: 2 },
  { name: 'Gaya', state: 'Bihar', country: 'IN', lat: 24.7955, lon: 85.0002, priority: 2 },
  { name: 'Bhagalpur', state: 'Bihar', country: 'IN', lat: 25.2425, lon: 86.9842, priority: 2 },
  { name: 'Muzaffarpur', state: 'Bihar', country: 'IN', lat: 26.1225, lon: 85.3906, priority: 2 },
  { name: 'Ranchi', state: 'Jharkhand', country: 'IN', lat: 23.3441, lon: 85.3096, priority: 2 },
  { name: 'Jamshedpur', state: 'Jharkhand', country: 'IN', lat: 22.8046, lon: 86.2029, priority: 2 },
  { name: 'Dhanbad', state: 'Jharkhand', country: 'IN', lat: 23.7957, lon: 86.4304, priority: 2 },
  
  // Punjab & Haryana
  { name: 'Chandigarh', state: 'Chandigarh', country: 'IN', lat: 30.7333, lon: 76.7794, priority: 2 },
  { name: 'Ludhiana', state: 'Punjab', country: 'IN', lat: 30.9010, lon: 75.8573, priority: 2 },
  { name: 'Amritsar', state: 'Punjab', country: 'IN', lat: 31.6340, lon: 74.8723, priority: 2 },
  { name: 'Jalandhar', state: 'Punjab', country: 'IN', lat: 31.3260, lon: 75.5762, priority: 2 },
  { name: 'Patiala', state: 'Punjab', country: 'IN', lat: 30.3398, lon: 76.3869, priority: 2 },
  { name: 'Faridabad', state: 'Haryana', country: 'IN', lat: 28.4089, lon: 77.3178, priority: 2 },
  { name: 'Gurgaon', state: 'Haryana', country: 'IN', lat: 28.4595, lon: 77.0266, priority: 2 },
  { name: 'Gurugram', state: 'Haryana', country: 'IN', lat: 28.4595, lon: 77.0266, priority: 2 },
  { name: 'Panipat', state: 'Haryana', country: 'IN', lat: 29.3909, lon: 76.9635, priority: 2 },
  { name: 'Ambala', state: 'Haryana', country: 'IN', lat: 30.3782, lon: 76.7767, priority: 2 },
  { name: 'Rohtak', state: 'Haryana', country: 'IN', lat: 28.8955, lon: 76.6066, priority: 2 },
  
  // Odisha
  { name: 'Bhubaneswar', state: 'Odisha', country: 'IN', lat: 20.2961, lon: 85.8245, priority: 2 },
  { name: 'Cuttack', state: 'Odisha', country: 'IN', lat: 20.4625, lon: 85.8828, priority: 2 },
  { name: 'Rourkela', state: 'Odisha', country: 'IN', lat: 22.2604, lon: 84.8536, priority: 2 },
  { name: 'Puri', state: 'Odisha', country: 'IN', lat: 19.8135, lon: 85.8312, priority: 2 },
  
  // Assam & Northeast
  { name: 'Guwahati', state: 'Assam', country: 'IN', lat: 26.1445, lon: 91.7362, priority: 2 },
  { name: 'Dibrugarh', state: 'Assam', country: 'IN', lat: 27.4728, lon: 94.9120, priority: 2 },
  { name: 'Silchar', state: 'Assam', country: 'IN', lat: 24.8333, lon: 92.7789, priority: 2 },
  { name: 'Jorhat', state: 'Assam', country: 'IN', lat: 26.7509, lon: 94.2037, priority: 2 },
  { name: 'Imphal', state: 'Manipur', country: 'IN', lat: 24.8170, lon: 93.9368, priority: 2 },
  { name: 'Agartala', state: 'Tripura', country: 'IN', lat: 23.8315, lon: 91.2868, priority: 2 },
  { name: 'Shillong', state: 'Meghalaya', country: 'IN', lat: 25.5788, lon: 91.8933, priority: 2 },
  { name: 'Aizawl', state: 'Mizoram', country: 'IN', lat: 23.7307, lon: 92.7173, priority: 2 },
  
  // Uttarakhand & Himachal Pradesh
  { name: 'Dehradun', state: 'Uttarakhand', country: 'IN', lat: 30.3165, lon: 78.0322, priority: 2 },
  { name: 'Haridwar', state: 'Uttarakhand', country: 'IN', lat: 29.9457, lon: 78.1642, priority: 2 },
  { name: 'Nainital', state: 'Uttarakhand', country: 'IN', lat: 29.3803, lon: 79.4636, priority: 2 },
  { name: 'Mussoorie', state: 'Uttarakhand', country: 'IN', lat: 30.4598, lon: 78.0644, priority: 2 },
  { name: 'Shimla', state: 'Himachal Pradesh', country: 'IN', lat: 31.1048, lon: 77.1734, priority: 2 },
  { name: 'Manali', state: 'Himachal Pradesh', country: 'IN', lat: 32.2432, lon: 77.1892, priority: 2 },
  { name: 'Dharamshala', state: 'Himachal Pradesh', country: 'IN', lat: 32.2190, lon: 76.3234, priority: 2 },
  
  // Jammu & Kashmir
  { name: 'Srinagar', state: 'Jammu and Kashmir', country: 'IN', lat: 34.0837, lon: 74.7973, priority: 2 },
  { name: 'Jammu', state: 'Jammu and Kashmir', country: 'IN', lat: 32.7266, lon: 74.8570, priority: 2 },
  
  // Goa
  { name: 'Panaji', state: 'Goa', country: 'IN', lat: 15.4909, lon: 73.8278, priority: 2 },
  { name: 'Margao', state: 'Goa', country: 'IN', lat: 15.2708, lon: 73.9958, priority: 2 },
  { name: 'Vasco da Gama', state: 'Goa', country: 'IN', lat: 15.3983, lon: 73.8113, priority: 2 },
  
  // Chhattisgarh
  { name: 'Raipur', state: 'Chhattisgarh', country: 'IN', lat: 21.2514, lon: 81.6296, priority: 2 },
  { name: 'Bhilai', state: 'Chhattisgarh', country: 'IN', lat: 21.2094, lon: 81.3773, priority: 2 },
  { name: 'Bilaspur', state: 'Chhattisgarh', country: 'IN', lat: 22.0797, lon: 82.1409, priority: 2 },
];

// Indian Districts (Priority 2) - Major Districts from All States
const indianDistricts = [
  // Uttar Pradesh Districts
  { name: 'Prayagraj District', state: 'Uttar Pradesh', country: 'IN', lat: 25.4358, lon: 81.8463, priority: 2 },
  { name: 'Mathura', state: 'Uttar Pradesh', country: 'IN', lat: 27.4924, lon: 77.6737, priority: 2 },
  { name: 'Ayodhya', state: 'Uttar Pradesh', country: 'IN', lat: 26.7922, lon: 82.1998, priority: 2 },
  { name: 'Firozabad', state: 'Uttar Pradesh', country: 'IN', lat: 27.1591, lon: 78.3957, priority: 2 },
  { name: 'Jhansi', state: 'Uttar Pradesh', country: 'IN', lat: 25.4484, lon: 78.5685, priority: 2 },
  { name: 'Saharanpur', state: 'Uttar Pradesh', country: 'IN', lat: 29.9680, lon: 77.5460, priority: 2 },
  { name: 'Shahjahanpur', state: 'Uttar Pradesh', country: 'IN', lat: 27.8830, lon: 79.9119, priority: 2 },
  { name: 'Faizabad', state: 'Uttar Pradesh', country: 'IN', lat: 26.7754, lon: 82.1451, priority: 2 },
  { name: 'Etawah', state: 'Uttar Pradesh', country: 'IN', lat: 26.7855, lon: 79.0215, priority: 2 },
  { name: 'Rampur', state: 'Uttar Pradesh', country: 'IN', lat: 28.8055, lon: 79.0256, priority: 2 },
  { name: 'Budaun', state: 'Uttar Pradesh', country: 'IN', lat: 28.0340, lon: 79.1140, priority: 2 },
  { name: 'Mainpuri', state: 'Uttar Pradesh', country: 'IN', lat: 27.2340, lon: 79.0279, priority: 2 },
  { name: 'Azamgarh', state: 'Uttar Pradesh', country: 'IN', lat: 26.0686, lon: 83.1840, priority: 2 },
  { name: 'Mirzapur', state: 'Uttar Pradesh', country: 'IN', lat: 25.1460, lon: 82.5690, priority: 2 },
  { name: 'Unnao', state: 'Uttar Pradesh', country: 'IN', lat: 26.5464, lon: 80.4879, priority: 2 },
  { name: 'Sitapur', state: 'Uttar Pradesh', country: 'IN', lat: 27.5670, lon: 80.6828, priority: 2 },
  { name: 'Hardoi', state: 'Uttar Pradesh', country: 'IN', lat: 27.3960, lon: 80.1308, priority: 2 },
  { name: 'Raebareli', state: 'Uttar Pradesh', country: 'IN', lat: 26.2310, lon: 81.2460, priority: 2 },
  { name: 'Bulandshahr', state: 'Uttar Pradesh', country: 'IN', lat: 28.4067, lon: 77.8498, priority: 2 },
  { name: 'Muzaffarnagar', state: 'Uttar Pradesh', country: 'IN', lat: 29.4727, lon: 77.7085, priority: 2 },
  
  // Maharashtra Districts
  { name: 'Raigad', state: 'Maharashtra', country: 'IN', lat: 18.3667, lon: 73.1667, priority: 2 },
  { name: 'Ratnagiri', state: 'Maharashtra', country: 'IN', lat: 16.9944, lon: 73.3000, priority: 2 },
  { name: 'Sindhudurg', state: 'Maharashtra', country: 'IN', lat: 16.0000, lon: 73.6667, priority: 2 },
  { name: 'Satara', state: 'Maharashtra', country: 'IN', lat: 17.6805, lon: 74.0183, priority: 2 },
  { name: 'Sangli', state: 'Maharashtra', country: 'IN', lat: 16.8524, lon: 74.5815, priority: 2 },
  { name: 'Ahmednagar', state: 'Maharashtra', country: 'IN', lat: 19.0952, lon: 74.7496, priority: 2 },
  { name: 'Jalgaon', state: 'Maharashtra', country: 'IN', lat: 21.0077, lon: 75.5626, priority: 2 },
  { name: 'Dhule', state: 'Maharashtra', country: 'IN', lat: 20.9042, lon: 74.7749, priority: 2 },
  { name: 'Beed', state: 'Maharashtra', country: 'IN', lat: 18.9894, lon: 75.7606, priority: 2 },
  { name: 'Latur', state: 'Maharashtra', country: 'IN', lat: 18.3984, lon: 76.5604, priority: 2 },
  { name: 'Osmanabad', state: 'Maharashtra', country: 'IN', lat: 18.1760, lon: 76.0406, priority: 2 },
  { name: 'Parbhani', state: 'Maharashtra', country: 'IN', lat: 19.2608, lon: 76.7611, priority: 2 },
  { name: 'Jalna', state: 'Maharashtra', country: 'IN', lat: 19.8347, lon: 75.8800, priority: 2 },
  { name: 'Wardha', state: 'Maharashtra', country: 'IN', lat: 20.7453, lon: 78.5972, priority: 2 },
  { name: 'Yavatmal', state: 'Maharashtra', country: 'IN', lat: 20.3897, lon: 78.1307, priority: 2 },
  { name: 'Chandrapur', state: 'Maharashtra', country: 'IN', lat: 19.9615, lon: 79.2961, priority: 2 },
  { name: 'Gondia', state: 'Maharashtra', country: 'IN', lat: 21.4550, lon: 80.1947, priority: 2 },
  { name: 'Buldhana', state: 'Maharashtra', country: 'IN', lat: 20.5311, lon: 76.1844, priority: 2 },
  { name: 'Washim', state: 'Maharashtra', country: 'IN', lat: 20.1078, lon: 77.1342, priority: 2 },
  
  // Tamil Nadu Districts
  { name: 'Kanyakumari', state: 'Tamil Nadu', country: 'IN', lat: 8.0883, lon: 77.5385, priority: 2 },
  { name: 'Thoothukudi', state: 'Tamil Nadu', country: 'IN', lat: 8.7642, lon: 78.1348, priority: 2 },
  { name: 'Tuticorin', state: 'Tamil Nadu', country: 'IN', lat: 8.7642, lon: 78.1348, priority: 2 },
  { name: 'Karur', state: 'Tamil Nadu', country: 'IN', lat: 10.9601, lon: 78.0766, priority: 2 },
  { name: 'Namakkal', state: 'Tamil Nadu', country: 'IN', lat: 11.2189, lon: 78.1677, priority: 2 },
  { name: 'Cuddalore', state: 'Tamil Nadu', country: 'IN', lat: 11.7480, lon: 79.7714, priority: 2 },
  { name: 'Villupuram', state: 'Tamil Nadu', country: 'IN', lat: 11.9401, lon: 79.4861, priority: 2 },
  { name: 'Tiruvannamalai', state: 'Tamil Nadu', country: 'IN', lat: 12.2253, lon: 79.0747, priority: 2 },
  { name: 'Pudukottai', state: 'Tamil Nadu', country: 'IN', lat: 10.3833, lon: 78.8000, priority: 2 },
  { name: 'Sivaganga', state: 'Tamil Nadu', country: 'IN', lat: 9.8438, lon: 78.4809, priority: 2 },
  { name: 'Ramanathapuram', state: 'Tamil Nadu', country: 'IN', lat: 9.3639, lon: 78.8370, priority: 2 },
  { name: 'Nagapattinam', state: 'Tamil Nadu', country: 'IN', lat: 10.7658, lon: 79.8448, priority: 2 },
  { name: 'Tiruvarur', state: 'Tamil Nadu', country: 'IN', lat: 10.7730, lon: 79.6345, priority: 2 },
  { name: 'Ariyalur', state: 'Tamil Nadu', country: 'IN', lat: 11.1401, lon: 79.0782, priority: 2 },
  { name: 'Perambalur', state: 'Tamil Nadu', country: 'IN', lat: 11.2322, lon: 78.8800, priority: 2 },
  { name: 'Dharmapuri', state: 'Tamil Nadu', country: 'IN', lat: 12.1211, lon: 78.1582, priority: 2 },
  { name: 'Krishnagiri', state: 'Tamil Nadu', country: 'IN', lat: 12.5186, lon: 78.2137, priority: 2 },
  { name: 'Tiruppur', state: 'Tamil Nadu', country: 'IN', lat: 11.1085, lon: 77.3411, priority: 2 },
  { name: 'Nilgiris', state: 'Tamil Nadu', country: 'IN', lat: 11.4102, lon: 76.6950, priority: 2 },
  { name: 'Ooty', state: 'Tamil Nadu', country: 'IN', lat: 11.4102, lon: 76.6950, priority: 2 },
  
  // Gujarat Districts
  { name: 'Anand', state: 'Gujarat', country: 'IN', lat: 22.5645, lon: 72.9289, priority: 2 },
  { name: 'Kheda', state: 'Gujarat', country: 'IN', lat: 22.7561, lon: 72.6820, priority: 2 },
  { name: 'Mehsana', state: 'Gujarat', country: 'IN', lat: 23.5880, lon: 72.3693, priority: 2 },
  { name: 'Patan', state: 'Gujarat', country: 'IN', lat: 23.8333, lon: 72.1167, priority: 2 },
  { name: 'Banaskantha', state: 'Gujarat', country: 'IN', lat: 24.1719, lon: 72.4386, priority: 2 },
  { name: 'Sabarkantha', state: 'Gujarat', country: 'IN', lat: 23.0333, lon: 73.0500, priority: 2 },
  { name: 'Kutch', state: 'Gujarat', country: 'IN', lat: 23.7337, lon: 69.8597, priority: 2 },
  { name: 'Bhuj', state: 'Gujarat', country: 'IN', lat: 23.2420, lon: 69.6669, priority: 2 },
  { name: 'Surendranagar', state: 'Gujarat', country: 'IN', lat: 22.7039, lon: 71.6370, priority: 2 },
  { name: 'Morbi', state: 'Gujarat', country: 'IN', lat: 22.8173, lon: 70.8377, priority: 2 },
  { name: 'Porbandar', state: 'Gujarat', country: 'IN', lat: 21.6417, lon: 69.6293, priority: 2 },
  { name: 'Valsad', state: 'Gujarat', country: 'IN', lat: 20.6091, lon: 72.9342, priority: 2 },
  { name: 'Navsari', state: 'Gujarat', country: 'IN', lat: 20.9504, lon: 72.9342, priority: 2 },
  { name: 'Bharuch', state: 'Gujarat', country: 'IN', lat: 21.7051, lon: 72.9959, priority: 2 },
  { name: 'Narmada', state: 'Gujarat', country: 'IN', lat: 21.8644, lon: 73.5047, priority: 2 },
  
  // Rajasthan Districts
  { name: 'Sikar', state: 'Rajasthan', country: 'IN', lat: 27.6119, lon: 75.1397, priority: 2 },
  { name: 'Jhunjhunu', state: 'Rajasthan', country: 'IN', lat: 28.1308, lon: 75.3982, priority: 2 },
  { name: 'Churu', state: 'Rajasthan', country: 'IN', lat: 28.2969, lon: 74.9647, priority: 2 },
  { name: 'Ganganagar', state: 'Rajasthan', country: 'IN', lat: 29.9038, lon: 73.8772, priority: 2 },
  { name: 'Hanumangarh', state: 'Rajasthan', country: 'IN', lat: 29.5819, lon: 74.3220, priority: 2 },
  { name: 'Bharatpur', state: 'Rajasthan', country: 'IN', lat: 27.2152, lon: 77.4890, priority: 2 },
  { name: 'Sawai Madhopur', state: 'Rajasthan', country: 'IN', lat: 26.0173, lon: 76.3527, priority: 2 },
  { name: 'Tonk', state: 'Rajasthan', country: 'IN', lat: 26.1542, lon: 75.7873, priority: 2 },
  { name: 'Bundi', state: 'Rajasthan', country: 'IN', lat: 25.4305, lon: 75.6499, priority: 2 },
  { name: 'Bhilwara', state: 'Rajasthan', country: 'IN', lat: 25.3407, lon: 74.6351, priority: 2 },
  { name: 'Chittorgarh', state: 'Rajasthan', country: 'IN', lat: 24.8887, lon: 74.6269, priority: 2 },
  { name: 'Rajsamand', state: 'Rajasthan', country: 'IN', lat: 25.0714, lon: 73.8809, priority: 2 },
  { name: 'Dungarpur', state: 'Rajasthan', country: 'IN', lat: 23.8429, lon: 73.7147, priority: 2 },
  { name: 'Banswara', state: 'Rajasthan', country: 'IN', lat: 23.5411, lon: 74.4360, priority: 2 },
  { name: 'Pali', state: 'Rajasthan', country: 'IN', lat: 25.7711, lon: 73.3234, priority: 2 },
  { name: 'Sirohi', state: 'Rajasthan', country: 'IN', lat: 24.8857, lon: 72.8581, priority: 2 },
  { name: 'Jalore', state: 'Rajasthan', country: 'IN', lat: 25.3454, lon: 72.6156, priority: 2 },
  { name: 'Barmer', state: 'Rajasthan', country: 'IN', lat: 25.7521, lon: 71.3967, priority: 2 },
  { name: 'Jaisalmer', state: 'Rajasthan', country: 'IN', lat: 26.9157, lon: 70.9083, priority: 2 },
  
  // Madhya Pradesh Districts
  { name: 'Dewas', state: 'Madhya Pradesh', country: 'IN', lat: 22.9676, lon: 76.0534, priority: 2 },
  { name: 'Ratlam', state: 'Madhya Pradesh', country: 'IN', lat: 23.3315, lon: 75.0367, priority: 2 },
  { name: 'Mandsaur', state: 'Madhya Pradesh', country: 'IN', lat: 24.0734, lon: 75.0691, priority: 2 },
  { name: 'Neemuch', state: 'Madhya Pradesh', country: 'IN', lat: 24.4709, lon: 74.8698, priority: 2 },
  { name: 'Sehore', state: 'Madhya Pradesh', country: 'IN', lat: 23.2006, lon: 77.0844, priority: 2 },
  { name: 'Vidisha', state: 'Madhya Pradesh', country: 'IN', lat: 23.5251, lon: 77.8081, priority: 2 },
  { name: 'Hoshangabad', state: 'Madhya Pradesh', country: 'IN', lat: 22.7520, lon: 77.7282, priority: 2 },
  { name: 'Khandwa', state: 'Madhya Pradesh', country: 'IN', lat: 21.8245, lon: 76.3502, priority: 2 },
  { name: 'Khargone', state: 'Madhya Pradesh', country: 'IN', lat: 21.8233, lon: 75.6147, priority: 2 },
  { name: 'Burhanpur', state: 'Madhya Pradesh', country: 'IN', lat: 21.3084, lon: 76.2306, priority: 2 },
  { name: 'Katni', state: 'Madhya Pradesh', country: 'IN', lat: 23.8388, lon: 80.3959, priority: 2 },
  { name: 'Satna', state: 'Madhya Pradesh', country: 'IN', lat: 24.6005, lon: 80.8322, priority: 2 },
  { name: 'Rewa', state: 'Madhya Pradesh', country: 'IN', lat: 24.5364, lon: 81.2961, priority: 2 },
  { name: 'Singrauli', state: 'Madhya Pradesh', country: 'IN', lat: 24.2005, lon: 82.6759, priority: 2 },
  { name: 'Shivpuri', state: 'Madhya Pradesh', country: 'IN', lat: 25.4235, lon: 77.6605, priority: 2 },
  { name: 'Morena', state: 'Madhya Pradesh', country: 'IN', lat: 26.4956, lon: 78.0008, priority: 2 },
  { name: 'Datia', state: 'Madhya Pradesh', country: 'IN', lat: 25.6675, lon: 78.4636, priority: 2 },
  
  // Kerala Districts
  { name: 'Kasargod', state: 'Kerala', country: 'IN', lat: 12.4996, lon: 75.0014, priority: 2 },
  { name: 'Wayanad', state: 'Kerala', country: 'IN', lat: 11.6854, lon: 76.1320, priority: 2 },
  { name: 'Kottayam', state: 'Kerala', country: 'IN', lat: 9.5916, lon: 76.5222, priority: 2 },
  { name: 'Idukki', state: 'Kerala', country: 'IN', lat: 9.9188, lon: 77.1025, priority: 2 },
  { name: 'Ernakulam', state: 'Kerala', country: 'IN', lat: 9.9816, lon: 76.2999, priority: 2 },
  { name: 'Pathanamthitta', state: 'Kerala', country: 'IN', lat: 9.2648, lon: 76.7870, priority: 2 },
  
  // Andhra Pradesh Districts
  { name: 'Anantapur', state: 'Andhra Pradesh', country: 'IN', lat: 14.6819, lon: 77.6006, priority: 2 },
  { name: 'Chittoor', state: 'Andhra Pradesh', country: 'IN', lat: 13.2172, lon: 79.1003, priority: 2 },
  { name: 'Kadapa', state: 'Andhra Pradesh', country: 'IN', lat: 14.4673, lon: 78.8242, priority: 2 },
  { name: 'Kurnool', state: 'Andhra Pradesh', country: 'IN', lat: 15.8281, lon: 78.0373, priority: 2 },
  { name: 'Prakasam', state: 'Andhra Pradesh', country: 'IN', lat: 15.3500, lon: 79.5500, priority: 2 },
  { name: 'Srikakulam', state: 'Andhra Pradesh', country: 'IN', lat: 18.2949, lon: 83.8938, priority: 2 },
  { name: 'Vizianagaram', state: 'Andhra Pradesh', country: 'IN', lat: 18.1167, lon: 83.4000, priority: 2 },
  { name: 'East Godavari', state: 'Andhra Pradesh', country: 'IN', lat: 17.0000, lon: 81.8000, priority: 2 },
  { name: 'West Godavari', state: 'Andhra Pradesh', country: 'IN', lat: 16.7167, lon: 81.1667, priority: 2 },
  { name: 'Krishna District', state: 'Andhra Pradesh', country: 'IN', lat: 16.5193, lon: 80.6305, priority: 2 },
  
  // Telangana Districts
  { name: 'Karimnagar', state: 'Telangana', country: 'IN', lat: 18.4386, lon: 79.1288, priority: 2 },
  { name: 'Khammam', state: 'Telangana', country: 'IN', lat: 17.2473, lon: 80.1514, priority: 2 },
  { name: 'Mahbubnagar', state: 'Telangana', country: 'IN', lat: 16.7400, lon: 77.9900, priority: 2 },
  { name: 'Nalgonda', state: 'Telangana', country: 'IN', lat: 17.0500, lon: 79.2667, priority: 2 },
  { name: 'Rangareddy', state: 'Telangana', country: 'IN', lat: 17.3000, lon: 78.1000, priority: 2 },
  { name: 'Medak', state: 'Telangana', country: 'IN', lat: 18.0500, lon: 78.2667, priority: 2 },
  { name: 'Adilabad', state: 'Telangana', country: 'IN', lat: 19.6667, lon: 78.5333, priority: 2 },
  
  // West Bengal Districts
  { name: 'Darjeeling', state: 'West Bengal', country: 'IN', lat: 27.0410, lon: 88.2663, priority: 2 },
  { name: 'Jalpaiguri', state: 'West Bengal', country: 'IN', lat: 26.5167, lon: 88.7333, priority: 2 },
  { name: 'Cooch Behar', state: 'West Bengal', country: 'IN', lat: 26.3157, lon: 89.4425, priority: 2 },
  { name: 'Alipurduar', state: 'West Bengal', country: 'IN', lat: 26.4914, lon: 89.5270, priority: 2 },
  { name: 'Malda', state: 'West Bengal', country: 'IN', lat: 25.0096, lon: 88.1410, priority: 2 },
  { name: 'Murshidabad', state: 'West Bengal', country: 'IN', lat: 24.1833, lon: 88.2667, priority: 2 },
  { name: 'Nadia', state: 'West Bengal', country: 'IN', lat: 23.4731, lon: 88.5564, priority: 2 },
  { name: 'North 24 Parganas', state: 'West Bengal', country: 'IN', lat: 22.6157, lon: 88.4008, priority: 2 },
  { name: 'South 24 Parganas', state: 'West Bengal', country: 'IN', lat: 22.1667, lon: 88.4333, priority: 2 },
  { name: 'Hooghly', state: 'West Bengal', country: 'IN', lat: 22.9000, lon: 88.3964, priority: 2 },
  { name: 'Bankura', state: 'West Bengal', country: 'IN', lat: 23.2324, lon: 87.0715, priority: 2 },
  { name: 'Purulia', state: 'West Bengal', country: 'IN', lat: 23.3421, lon: 86.3593, priority: 2 },
  { name: 'Birbhum', state: 'West Bengal', country: 'IN', lat: 24.0500, lon: 87.6167, priority: 2 },
  { name: 'Burdwan', state: 'West Bengal', country: 'IN', lat: 23.2333, lon: 87.8500, priority: 2 },
  { name: 'Bardhaman', state: 'West Bengal', country: 'IN', lat: 23.2333, lon: 87.8500, priority: 2 },
  
  // Punjab Districts
  { name: 'Mohali', state: 'Punjab', country: 'IN', lat: 30.7046, lon: 76.7179, priority: 2 },
  { name: 'Rupnagar', state: 'Punjab', country: 'IN', lat: 30.9635, lon: 76.5282, priority: 2 },
  { name: 'Bathinda', state: 'Punjab', country: 'IN', lat: 30.2110, lon: 74.9455, priority: 2 },
  { name: 'Sangrur', state: 'Punjab', country: 'IN', lat: 30.2444, lon: 75.8417, priority: 2 },
  { name: 'Firozpur', state: 'Punjab', country: 'IN', lat: 30.9257, lon: 74.6145, priority: 2 },
  { name: 'Kapurthala', state: 'Punjab', country: 'IN', lat: 31.3800, lon: 75.3800, priority: 2 },
  { name: 'Hoshiarpur', state: 'Punjab', country: 'IN', lat: 31.5338, lon: 75.9119, priority: 2 },
  { name: 'Gurdaspur', state: 'Punjab', country: 'IN', lat: 32.0404, lon: 75.4053, priority: 2 },
  { name: 'Pathankot', state: 'Punjab', country: 'IN', lat: 32.2746, lon: 75.6521, priority: 2 },
  { name: 'Fazilka', state: 'Punjab', country: 'IN', lat: 30.4028, lon: 74.0281, priority: 2 },
  { name: 'Moga', state: 'Punjab', country: 'IN', lat: 30.8158, lon: 75.1702, priority: 2 },
  { name: 'Barnala', state: 'Punjab', country: 'IN', lat: 30.3782, lon: 75.5488, priority: 2 },
  
  // Haryana Districts
  { name: 'Karnal', state: 'Haryana', country: 'IN', lat: 29.6857, lon: 76.9905, priority: 2 },
  { name: 'Sonipat', state: 'Haryana', country: 'IN', lat: 28.9931, lon: 77.0151, priority: 2 },
  { name: 'Hisar', state: 'Haryana', country: 'IN', lat: 29.1492, lon: 75.7217, priority: 2 },
  { name: 'Jind', state: 'Haryana', country: 'IN', lat: 29.3157, lon: 76.3158, priority: 2 },
  { name: 'Sirsa', state: 'Haryana', country: 'IN', lat: 29.5353, lon: 75.0289, priority: 2 },
  { name: 'Fatehabad', state: 'Haryana', country: 'IN', lat: 29.5152, lon: 75.4551, priority: 2 },
  { name: 'Bhiwani', state: 'Haryana', country: 'IN', lat: 28.7930, lon: 76.1395, priority: 2 },
  { name: 'Mahendragarh', state: 'Haryana', country: 'IN', lat: 28.2833, lon: 76.1500, priority: 2 },
  { name: 'Rewari', state: 'Haryana', country: 'IN', lat: 28.1989, lon: 76.6193, priority: 2 },
  { name: 'Jhajjar', state: 'Haryana', country: 'IN', lat: 28.6063, lon: 76.6565, priority: 2 },
  { name: 'Palwal', state: 'Haryana', country: 'IN', lat: 28.1440, lon: 77.3259, priority: 2 },
  { name: 'Nuh', state: 'Haryana', country: 'IN', lat: 28.1027, lon: 77.0078, priority: 2 },
  { name: 'Mewat', state: 'Haryana', country: 'IN', lat: 28.1027, lon: 77.0078, priority: 2 },
  { name: 'Panchkula', state: 'Haryana', country: 'IN', lat: 30.6942, lon: 76.8535, priority: 2 },
  { name: 'Yamunanagar', state: 'Haryana', country: 'IN', lat: 30.1290, lon: 77.2674, priority: 2 },
  { name: 'Kurukshetra', state: 'Haryana', country: 'IN', lat: 29.9695, lon: 76.8783, priority: 2 },
  { name: 'Kaithal', state: 'Haryana', country: 'IN', lat: 29.8014, lon: 76.3995, priority: 2 },
  
  // Bihar Districts
  { name: 'Nalanda', state: 'Bihar', country: 'IN', lat: 25.1948, lon: 85.4431, priority: 2 },
  { name: 'Rohtas', state: 'Bihar', country: 'IN', lat: 24.9500, lon: 83.9667, priority: 2 },
  { name: 'Kaimur', state: 'Bihar', country: 'IN', lat: 25.0461, lon: 83.6105, priority: 2 },
  { name: 'Buxar', state: 'Bihar', country: 'IN', lat: 25.5647, lon: 83.9784, priority: 2 },
  { name: 'Ara', state: 'Bihar', country: 'IN', lat: 25.5583, lon: 84.6625, priority: 2 },
  { name: 'Bhojpur', state: 'Bihar', country: 'IN', lat: 25.5583, lon: 84.6625, priority: 2 },
  { name: 'Saran', state: 'Bihar', country: 'IN', lat: 25.9167, lon: 84.7500, priority: 2 },
  { name: 'Chapra', state: 'Bihar', country: 'IN', lat: 25.7805, lon: 84.7278, priority: 2 },
  { name: 'Siwan', state: 'Bihar', country: 'IN', lat: 26.2183, lon: 84.3569, priority: 2 },
  { name: 'Gopalganj', state: 'Bihar', country: 'IN', lat: 26.4690, lon: 84.4380, priority: 2 },
  { name: 'Vaishali', state: 'Bihar', country: 'IN', lat: 25.7205, lon: 85.1315, priority: 2 },
  { name: 'Samastipur', state: 'Bihar', country: 'IN', lat: 25.8647, lon: 85.7829, priority: 2 },
  { name: 'Darbhanga', state: 'Bihar', country: 'IN', lat: 26.1542, lon: 85.8918, priority: 2 },
  { name: 'Madhubani', state: 'Bihar', country: 'IN', lat: 26.3572, lon: 86.0737, priority: 2 },
  { name: 'Sitamarhi', state: 'Bihar', country: 'IN', lat: 26.5928, lon: 85.4836, priority: 2 },
  { name: 'Sheohar', state: 'Bihar', country: 'IN', lat: 26.5167, lon: 85.2833, priority: 2 },
  { name: 'Purnia', state: 'Bihar', country: 'IN', lat: 25.7771, lon: 87.4753, priority: 2 },
  { name: 'Katihar', state: 'Bihar', country: 'IN', lat: 25.5394, lon: 87.5678, priority: 2 },
  { name: 'Araria', state: 'Bihar', country: 'IN', lat: 26.1500, lon: 87.5167, priority: 2 },
  { name: 'Kishanganj', state: 'Bihar', country: 'IN', lat: 26.1058, lon: 87.9494, priority: 2 },
  { name: 'Begusarai', state: 'Bihar', country: 'IN', lat: 25.4182, lon: 86.1272, priority: 2 },
  { name: 'Khagaria', state: 'Bihar', country: 'IN', lat: 25.5022, lon: 86.4669, priority: 2 },
  { name: 'Munger', state: 'Bihar', country: 'IN', lat: 25.3753, lon: 86.4731, priority: 2 },
  { name: 'Lakhisarai', state: 'Bihar', country: 'IN', lat: 25.1730, lon: 86.0921, priority: 2 },
  { name: 'Jamui', state: 'Bihar', country: 'IN', lat: 24.9167, lon: 86.2167, priority: 2 },
  { name: 'Nawada', state: 'Bihar', country: 'IN', lat: 24.8833, lon: 85.5333, priority: 2 },
  { name: 'Aurangabad Bihar', state: 'Bihar', country: 'IN', lat: 24.7521, lon: 84.3742, priority: 2 },
  { name: 'Jehanabad', state: 'Bihar', country: 'IN', lat: 25.2167, lon: 84.9833, priority: 2 },
  { name: 'Arwal', state: 'Bihar', country: 'IN', lat: 25.2500, lon: 84.6667, priority: 2 },
  
  // Jharkhand Districts
  { name: 'Bokaro', state: 'Jharkhand', country: 'IN', lat: 23.7871, lon: 85.9564, priority: 2 },
  { name: 'Deoghar', state: 'Jharkhand', country: 'IN', lat: 24.4855, lon: 86.6947, priority: 2 },
  { name: 'Giridih', state: 'Jharkhand', country: 'IN', lat: 24.1914, lon: 86.3005, priority: 2 },
  { name: 'Hazaribagh', state: 'Jharkhand', country: 'IN', lat: 23.9929, lon: 85.3593, priority: 2 },
  { name: 'Dumka', state: 'Jharkhand', country: 'IN', lat: 24.2667, lon: 87.2500, priority: 2 },
  { name: 'Godda', state: 'Jharkhand', country: 'IN', lat: 24.8333, lon: 87.2167, priority: 2 },
  { name: 'Sahebganj', state: 'Jharkhand', country: 'IN', lat: 25.2500, lon: 87.6333, priority: 2 },
  { name: 'Pakur', state: 'Jharkhand', country: 'IN', lat: 24.6333, lon: 87.8500, priority: 2 },
  { name: 'Koderma', state: 'Jharkhand', country: 'IN', lat: 24.4667, lon: 85.6000, priority: 2 },
  { name: 'Chatra', state: 'Jharkhand', country: 'IN', lat: 24.2000, lon: 84.8667, priority: 2 },
  { name: 'Gumla', state: 'Jharkhand', country: 'IN', lat: 23.0467, lon: 84.5392, priority: 2 },
  { name: 'Lohardaga', state: 'Jharkhand', country: 'IN', lat: 23.4333, lon: 84.6833, priority: 2 },
  { name: 'Palamu', state: 'Jharkhand', country: 'IN', lat: 23.9167, lon: 84.0667, priority: 2 },
  { name: 'Garhwa', state: 'Jharkhand', country: 'IN', lat: 24.1667, lon: 83.8000, priority: 2 },
  { name: 'East Singhbhum', state: 'Jharkhand', country: 'IN', lat: 22.8000, lon: 86.2029, priority: 2 },
  { name: 'West Singhbhum', state: 'Jharkhand', country: 'IN', lat: 22.5667, lon: 85.5833, priority: 2 },
  { name: 'Seraikela Kharsawan', state: 'Jharkhand', country: 'IN', lat: 22.6989, lon: 85.9697, priority: 2 },
  
  // Odisha Districts
  { name: 'Balasore', state: 'Odisha', country: 'IN', lat: 21.4934, lon: 86.9335, priority: 2 },
  { name: 'Bhadrak', state: 'Odisha', country: 'IN', lat: 21.0542, lon: 86.4953, priority: 2 },
  { name: 'Kendrapara', state: 'Odisha', country: 'IN', lat: 20.5022, lon: 86.4217, priority: 2 },
  { name: 'Jagatsinghpur', state: 'Odisha', country: 'IN', lat: 20.2500, lon: 86.1667, priority: 2 },
  { name: 'Jajpur', state: 'Odisha', country: 'IN', lat: 20.8333, lon: 86.3333, priority: 2 },
  { name: 'Dhenkanal', state: 'Odisha', country: 'IN', lat: 20.6667, lon: 85.6000, priority: 2 },
  { name: 'Angul', state: 'Odisha', country: 'IN', lat: 20.8400, lon: 85.1016, priority: 2 },
  { name: 'Nayagarh', state: 'Odisha', country: 'IN', lat: 20.1279, lon: 85.0961, priority: 2 },
  { name: 'Khordha', state: 'Odisha', country: 'IN', lat: 20.1826, lon: 85.6187, priority: 2 },
  { name: 'Puri', state: 'Odisha', country: 'IN', lat: 19.8135, lon: 85.8312, priority: 2 },
  { name: 'Ganjam', state: 'Odisha', country: 'IN', lat: 19.3850, lon: 84.9783, priority: 2 },
  { name: 'Gajapati', state: 'Odisha', country: 'IN', lat: 18.8833, lon: 84.1667, priority: 2 },
  { name: 'Kandhamal', state: 'Odisha', country: 'IN', lat: 20.1333, lon: 84.1167, priority: 2 },
  { name: 'Boudh', state: 'Odisha', country: 'IN', lat: 20.8354, lon: 84.3286, priority: 2 },
  { name: 'Sonepur', state: 'Odisha', country: 'IN', lat: 20.8333, lon: 83.9167, priority: 2 },
  { name: 'Balangir', state: 'Odisha', country: 'IN', lat: 20.7097, lon: 83.4895, priority: 2 },
  { name: 'Kalahandi', state: 'Odisha', country: 'IN', lat: 19.9167, lon: 83.1667, priority: 2 },
  { name: 'Nuapada', state: 'Odisha', country: 'IN', lat: 20.8167, lon: 82.5500, priority: 2 },
  { name: 'Rayagada', state: 'Odisha', country: 'IN', lat: 19.1667, lon: 83.4167, priority: 2 },
  { name: 'Nabarangpur', state: 'Odisha', country: 'IN', lat: 19.2333, lon: 82.5500, priority: 2 },
  { name: 'Koraput', state: 'Odisha', country: 'IN', lat: 18.8000, lon: 82.7167, priority: 2 },
  { name: 'Malkangiri', state: 'Odisha', country: 'IN', lat: 18.3500, lon: 81.8833, priority: 2 },
  { name: 'Sambalpur', state: 'Odisha', country: 'IN', lat: 21.4704, lon: 83.9701, priority: 2 },
  { name: 'Bargarh', state: 'Odisha', country: 'IN', lat: 21.3333, lon: 83.6167, priority: 2 },
  { name: 'Jharsuguda', state: 'Odisha', country: 'IN', lat: 21.8556, lon: 84.0069, priority: 2 },
  { name: 'Sundargarh', state: 'Odisha', country: 'IN', lat: 22.1167, lon: 84.0333, priority: 2 },
  { name: 'Deogarh', state: 'Odisha', country: 'IN', lat: 21.5333, lon: 84.7333, priority: 2 },
  { name: 'Mayurbhanj', state: 'Odisha', country: 'IN', lat: 22.0000, lon: 86.5000, priority: 2 },
  { name: 'Keonjhar', state: 'Odisha', country: 'IN', lat: 21.6289, lon: 85.5817, priority: 2 },
  
  // Assam Districts
  { name: 'Tinsukia', state: 'Assam', country: 'IN', lat: 27.4900, lon: 95.3597, priority: 2 },
  { name: 'Tezpur', state: 'Assam', country: 'IN', lat: 26.6338, lon: 92.8000, priority: 2 },
  { name: 'Nagaon', state: 'Assam', country: 'IN', lat: 26.3478, lon: 92.6824, priority: 2 },
  { name: 'Barpeta', state: 'Assam', country: 'IN', lat: 26.3230, lon: 91.0050, priority: 2 },
  { name: 'Dhubri', state: 'Assam', country: 'IN', lat: 26.0199, lon: 89.9864, priority: 2 },
  { name: 'Goalpara', state: 'Assam', country: 'IN', lat: 26.1737, lon: 90.6275, priority: 2 },
  { name: 'Kokrajhar', state: 'Assam', country: 'IN', lat: 26.4013, lon: 90.2717, priority: 2 },
  { name: 'Bongaigaon', state: 'Assam', country: 'IN', lat: 26.4833, lon: 90.5667, priority: 2 },
  { name: 'Cachar', state: 'Assam', country: 'IN', lat: 24.8333, lon: 92.7789, priority: 2 },
  { name: 'Karimganj', state: 'Assam', country: 'IN', lat: 24.8697, lon: 92.3544, priority: 2 },
  { name: 'Hailakandi', state: 'Assam', country: 'IN', lat: 24.6833, lon: 92.5667, priority: 2 },
  { name: 'Karbi Anglong', state: 'Assam', country: 'IN', lat: 26.0000, lon: 93.4333, priority: 2 },
  { name: 'Dima Hasao', state: 'Assam', country: 'IN', lat: 25.5000, lon: 93.0167, priority: 2 },
  
  // Chhattisgarh Districts
  { name: 'Durg', state: 'Chhattisgarh', country: 'IN', lat: 21.1900, lon: 81.2849, priority: 2 },
  { name: 'Rajnandgaon', state: 'Chhattisgarh', country: 'IN', lat: 21.0974, lon: 81.0379, priority: 2 },
  { name: 'Korba', state: 'Chhattisgarh', country: 'IN', lat: 22.3450, lon: 82.6878, priority: 2 },
  { name: 'Raigarh', state: 'Chhattisgarh', country: 'IN', lat: 21.8974, lon: 83.3950, priority: 2 },
  { name: 'Janjgir Champa', state: 'Chhattisgarh', country: 'IN', lat: 22.0117, lon: 82.5778, priority: 2 },
  { name: 'Surguja', state: 'Chhattisgarh', country: 'IN', lat: 23.1167, lon: 83.2000, priority: 2 },
  { name: 'Bastar', state: 'Chhattisgarh', country: 'IN', lat: 19.0833, lon: 81.9667, priority: 2 },
  { name: 'Jagdalpur', state: 'Chhattisgarh', country: 'IN', lat: 19.0820, lon: 82.0305, priority: 2 },
  { name: 'Dantewada', state: 'Chhattisgarh', country: 'IN', lat: 18.8833, lon: 81.3500, priority: 2 },
  { name: 'Kanker', state: 'Chhattisgarh', country: 'IN', lat: 20.2667, lon: 81.5000, priority: 2 },
  { name: 'Mahasamund', state: 'Chhattisgarh', country: 'IN', lat: 21.1167, lon: 82.1000, priority: 2 },
  { name: 'Dhamtari', state: 'Chhattisgarh', country: 'IN', lat: 20.7074, lon: 81.5485, priority: 2 },
  
  // Uttarakhand Districts
  { name: 'Pauri Garhwal', state: 'Uttarakhand', country: 'IN', lat: 30.1500, lon: 78.7833, priority: 2 },
  { name: 'Tehri Garhwal', state: 'Uttarakhand', country: 'IN', lat: 30.3889, lon: 78.4800, priority: 2 },
  { name: 'Rudraprayag', state: 'Uttarakhand', country: 'IN', lat: 30.2833, lon: 78.9833, priority: 2 },
  { name: 'Chamoli', state: 'Uttarakhand', country: 'IN', lat: 30.4000, lon: 79.3333, priority: 2 },
  { name: 'Uttarkashi', state: 'Uttarakhand', country: 'IN', lat: 30.7268, lon: 78.4354, priority: 2 },
  { name: 'Pithoragarh', state: 'Uttarakhand', country: 'IN', lat: 29.5833, lon: 80.2167, priority: 2 },
  { name: 'Bageshwar', state: 'Uttarakhand', country: 'IN', lat: 29.8389, lon: 79.7706, priority: 2 },
  { name: 'Almora', state: 'Uttarakhand', country: 'IN', lat: 29.5971, lon: 79.6591, priority: 2 },
  { name: 'Champawat', state: 'Uttarakhand', country: 'IN', lat: 29.3333, lon: 80.0833, priority: 2 },
  { name: 'Udham Singh Nagar', state: 'Uttarakhand', country: 'IN', lat: 28.9758, lon: 79.4110, priority: 2 },
  
  // Himachal Pradesh Districts
  { name: 'Kangra', state: 'Himachal Pradesh', country: 'IN', lat: 32.0998, lon: 76.2689, priority: 2 },
  { name: 'Chamba', state: 'Himachal Pradesh', country: 'IN', lat: 32.5525, lon: 76.1258, priority: 2 },
  { name: 'Mandi', state: 'Himachal Pradesh', country: 'IN', lat: 31.7100, lon: 76.9318, priority: 2 },
  { name: 'Kullu', state: 'Himachal Pradesh', country: 'IN', lat: 31.9578, lon: 77.1093, priority: 2 },
  { name: 'Hamirpur HP', state: 'Himachal Pradesh', country: 'IN', lat: 31.6833, lon: 76.5167, priority: 2 },
  { name: 'Una', state: 'Himachal Pradesh', country: 'IN', lat: 31.4685, lon: 76.2708, priority: 2 },
  { name: 'Bilaspur HP', state: 'Himachal Pradesh', country: 'IN', lat: 31.3394, lon: 76.7568, priority: 2 },
  { name: 'Solan', state: 'Himachal Pradesh', country: 'IN', lat: 30.9045, lon: 77.0967, priority: 2 },
  { name: 'Sirmaur', state: 'Himachal Pradesh', country: 'IN', lat: 30.5580, lon: 77.2832, priority: 2 },
  { name: 'Kinnaur', state: 'Himachal Pradesh', country: 'IN', lat: 31.5833, lon: 78.4167, priority: 2 },
  { name: 'Lahaul Spiti', state: 'Himachal Pradesh', country: 'IN', lat: 32.5667, lon: 77.5833, priority: 2 },
];

// Famous world cities (Priority 3)
const worldCities = [
  // USA
  { name: 'New York', state: 'New York', country: 'US', lat: 40.7128, lon: -74.0060, priority: 3 },
  { name: 'Los Angeles', state: 'California', country: 'US', lat: 34.0522, lon: -118.2437, priority: 3 },
  { name: 'Chicago', state: 'Illinois', country: 'US', lat: 41.8781, lon: -87.6298, priority: 3 },
  { name: 'Houston', state: 'Texas', country: 'US', lat: 29.7604, lon: -95.3698, priority: 3 },
  { name: 'Phoenix', state: 'Arizona', country: 'US', lat: 33.4484, lon: -112.0740, priority: 3 },
  { name: 'Philadelphia', state: 'Pennsylvania', country: 'US', lat: 39.9526, lon: -75.1652, priority: 3 },
  { name: 'San Antonio', state: 'Texas', country: 'US', lat: 29.4241, lon: -98.4936, priority: 3 },
  { name: 'San Diego', state: 'California', country: 'US', lat: 32.7157, lon: -117.1611, priority: 3 },
  { name: 'Dallas', state: 'Texas', country: 'US', lat: 32.7767, lon: -96.7970, priority: 3 },
  { name: 'San Jose', state: 'California', country: 'US', lat: 37.3382, lon: -121.8863, priority: 3 },
  { name: 'Austin', state: 'Texas', country: 'US', lat: 30.2672, lon: -97.7431, priority: 3 },
  { name: 'Seattle', state: 'Washington', country: 'US', lat: 47.6062, lon: -122.3321, priority: 3 },
  { name: 'Denver', state: 'Colorado', country: 'US', lat: 39.7392, lon: -104.9903, priority: 3 },
  { name: 'Washington', state: 'District of Columbia', country: 'US', lat: 38.9072, lon: -77.0369, priority: 3 },
  { name: 'Boston', state: 'Massachusetts', country: 'US', lat: 42.3601, lon: -71.0589, priority: 3 },
  { name: 'Las Vegas', state: 'Nevada', country: 'US', lat: 36.1699, lon: -115.1398, priority: 3 },
  { name: 'Miami', state: 'Florida', country: 'US', lat: 25.7617, lon: -80.1918, priority: 3 },
  { name: 'San Francisco', state: 'California', country: 'US', lat: 37.7749, lon: -122.4194, priority: 3 },
  
  // Europe
  { name: 'London', state: 'England', country: 'GB', lat: 51.5074, lon: -0.1278, priority: 3 },
  { name: 'Paris', state: 'Île-de-France', country: 'FR', lat: 48.8566, lon: 2.3522, priority: 3 },
  { name: 'Berlin', state: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050, priority: 3 },
  { name: 'Madrid', state: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038, priority: 3 },
  { name: 'Rome', state: 'Lazio', country: 'IT', lat: 41.9028, lon: 12.4964, priority: 3 },
  { name: 'Barcelona', state: 'Catalonia', country: 'ES', lat: 41.3851, lon: 2.1734, priority: 3 },
  { name: 'Amsterdam', state: 'North Holland', country: 'NL', lat: 52.3676, lon: 4.9041, priority: 3 },
  { name: 'Vienna', state: 'Vienna', country: 'AT', lat: 48.2082, lon: 16.3738, priority: 3 },
  { name: 'Milan', state: 'Lombardy', country: 'IT', lat: 45.4642, lon: 9.1900, priority: 3 },
  { name: 'Munich', state: 'Bavaria', country: 'DE', lat: 48.1351, lon: 11.5820, priority: 3 },
  { name: 'Prague', state: 'Prague', country: 'CZ', lat: 50.0755, lon: 14.4378, priority: 3 },
  { name: 'Budapest', state: 'Budapest', country: 'HU', lat: 47.4979, lon: 19.0402, priority: 3 },
  { name: 'Warsaw', state: 'Masovia', country: 'PL', lat: 52.2297, lon: 21.0122, priority: 3 },
  { name: 'Brussels', state: 'Brussels', country: 'BE', lat: 50.8503, lon: 4.3517, priority: 3 },
  { name: 'Zurich', state: 'Zurich', country: 'CH', lat: 47.3769, lon: 8.5417, priority: 3 },
  { name: 'Stockholm', state: 'Stockholm', country: 'SE', lat: 59.3293, lon: 18.0686, priority: 3 },
  { name: 'Copenhagen', state: 'Capital', country: 'DK', lat: 55.6761, lon: 12.5683, priority: 3 },
  { name: 'Oslo', state: 'Oslo', country: 'NO', lat: 59.9139, lon: 10.7522, priority: 3 },
  { name: 'Helsinki', state: 'Uusimaa', country: 'FI', lat: 60.1695, lon: 24.9354, priority: 3 },
  { name: 'Dublin', state: 'Dublin', country: 'IE', lat: 53.3498, lon: -6.2603, priority: 3 },
  { name: 'Lisbon', state: 'Lisbon', country: 'PT', lat: 38.7223, lon: -9.1393, priority: 3 },
  { name: 'Athens', state: 'Attica', country: 'GR', lat: 37.9838, lon: 23.7275, priority: 3 },
  { name: 'Istanbul', state: 'Istanbul', country: 'TR', lat: 41.0082, lon: 28.9784, priority: 3 },
  { name: 'Moscow', state: 'Moscow', country: 'RU', lat: 55.7558, lon: 37.6173, priority: 3 },
  { name: 'St Petersburg', state: 'Leningrad', country: 'RU', lat: 59.9343, lon: 30.3351, priority: 3 },
  
  // Asia
  { name: 'Tokyo', state: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503, priority: 3 },
  { name: 'Beijing', state: 'Beijing', country: 'CN', lat: 39.9042, lon: 116.4074, priority: 3 },
  { name: 'Shanghai', state: 'Shanghai', country: 'CN', lat: 31.2304, lon: 121.4737, priority: 3 },
  { name: 'Bangkok', state: 'Bangkok', country: 'TH', lat: 13.7563, lon: 100.5018, priority: 3 },
  { name: 'Singapore', state: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198, priority: 3 },
  { name: 'Hong Kong', state: 'Hong Kong', country: 'HK', lat: 22.3193, lon: 114.1694, priority: 3 },
  { name: 'Seoul', state: 'Seoul', country: 'KR', lat: 37.5665, lon: 126.9780, priority: 3 },
  { name: 'Osaka', state: 'Osaka', country: 'JP', lat: 34.6937, lon: 135.5023, priority: 3 },
  { name: 'Kuala Lumpur', state: 'Kuala Lumpur', country: 'MY', lat: 3.1390, lon: 101.6869, priority: 3 },
  { name: 'Manila', state: 'Manila', country: 'PH', lat: 14.5995, lon: 120.9842, priority: 3 },
  { name: 'Jakarta', state: 'Jakarta', country: 'ID', lat: -6.2088, lon: 106.8456, priority: 3 },
  { name: 'Ho Chi Minh City', state: 'Ho Chi Minh', country: 'VN', lat: 10.8231, lon: 106.6297, priority: 3 },
  { name: 'Taipei', state: 'Taipei', country: 'TW', lat: 25.0330, lon: 121.5654, priority: 3 },
  { name: 'Hanoi', state: 'Hanoi', country: 'VN', lat: 21.0285, lon: 105.8542, priority: 3 },
  { name: 'Colombo', state: 'Western', country: 'LK', lat: 6.9271, lon: 79.8612, priority: 3 },
  { name: 'Dhaka', state: 'Dhaka', country: 'BD', lat: 23.8103, lon: 90.4125, priority: 3 },
  { name: 'Kathmandu', state: 'Bagmati', country: 'NP', lat: 27.7172, lon: 85.3240, priority: 3 },
  { name: 'Karachi', state: 'Sindh', country: 'PK', lat: 24.8607, lon: 67.0011, priority: 3 },
  { name: 'Lahore', state: 'Punjab', country: 'PK', lat: 31.5497, lon: 74.3436, priority: 3 },
  { name: 'Islamabad', state: 'Islamabad', country: 'PK', lat: 33.6844, lon: 73.0479, priority: 3 },
  
  // Middle East
  { name: 'Dubai', state: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708, priority: 3 },
  { name: 'Abu Dhabi', state: 'Abu Dhabi', country: 'AE', lat: 24.4539, lon: 54.3773, priority: 3 },
  { name: 'Doha', state: 'Doha', country: 'QA', lat: 25.2854, lon: 51.5310, priority: 3 },
  { name: 'Riyadh', state: 'Riyadh', country: 'SA', lat: 24.7136, lon: 46.6753, priority: 3 },
  { name: 'Jeddah', state: 'Makkah', country: 'SA', lat: 21.4858, lon: 39.1925, priority: 3 },
  { name: 'Tel Aviv', state: 'Tel Aviv', country: 'IL', lat: 32.0853, lon: 34.7818, priority: 3 },
  { name: 'Jerusalem', state: 'Jerusalem', country: 'IL', lat: 31.7683, lon: 35.2137, priority: 3 },
  { name: 'Beirut', state: 'Beirut', country: 'LB', lat: 33.8886, lon: 35.4955, priority: 3 },
  { name: 'Cairo', state: 'Cairo', country: 'EG', lat: 30.0444, lon: 31.2357, priority: 3 },
  { name: 'Alexandria', state: 'Alexandria', country: 'EG', lat: 31.2001, lon: 29.9187, priority: 3 },
  
  // Oceania
  { name: 'Sydney', state: 'New South Wales', country: 'AU', lat: -33.8688, lon: 151.2093, priority: 3 },
  { name: 'Melbourne', state: 'Victoria', country: 'AU', lat: -37.8136, lon: 144.9631, priority: 3 },
  { name: 'Brisbane', state: 'Queensland', country: 'AU', lat: -27.4698, lon: 153.0251, priority: 3 },
  { name: 'Perth', state: 'Western Australia', country: 'AU', lat: -31.9505, lon: 115.8605, priority: 3 },
  { name: 'Adelaide', state: 'South Australia', country: 'AU', lat: -34.9285, lon: 138.6007, priority: 3 },
  { name: 'Auckland', state: 'Auckland', country: 'NZ', lat: -36.8485, lon: 174.7633, priority: 3 },
  { name: 'Wellington', state: 'Wellington', country: 'NZ', lat: -41.2865, lon: 174.7762, priority: 3 },
  
  // Africa
  { name: 'Johannesburg', state: 'Gauteng', country: 'ZA', lat: -26.2041, lon: 28.0473, priority: 3 },
  { name: 'Cape Town', state: 'Western Cape', country: 'ZA', lat: -33.9249, lon: 18.4241, priority: 3 },
  { name: 'Lagos', state: 'Lagos', country: 'NG', lat: 6.5244, lon: 3.3792, priority: 3 },
  { name: 'Nairobi', state: 'Nairobi', country: 'KE', lat: -1.2921, lon: 36.8219, priority: 3 },
  { name: 'Casablanca', state: 'Casablanca-Settat', country: 'MA', lat: 33.5731, lon: -7.5898, priority: 3 },
  { name: 'Accra', state: 'Greater Accra', country: 'GH', lat: 5.6037, lon: -0.1870, priority: 3 },
  { name: 'Addis Ababa', state: 'Addis Ababa', country: 'ET', lat: 9.0320, lon: 38.7469, priority: 3 },
  
  // South America
  { name: 'São Paulo', state: 'São Paulo', country: 'BR', lat: -23.5505, lon: -46.6333, priority: 3 },
  { name: 'Rio de Janeiro', state: 'Rio de Janeiro', country: 'BR', lat: -22.9068, lon: -43.1729, priority: 3 },
  { name: 'Buenos Aires', state: 'Buenos Aires', country: 'AR', lat: -34.6037, lon: -58.3816, priority: 3 },
  { name: 'Lima', state: 'Lima', country: 'PE', lat: -12.0464, lon: -77.0428, priority: 3 },
  { name: 'Bogotá', state: 'Bogotá', country: 'CO', lat: 4.7110, lon: -74.0721, priority: 3 },
  { name: 'Santiago', state: 'Santiago', country: 'CL', lat: -33.4489, lon: -70.6693, priority: 3 },
  { name: 'Caracas', state: 'Capital District', country: 'VE', lat: 10.4806, lon: -66.9036, priority: 3 },
  
  // Canada
  { name: 'Toronto', state: 'Ontario', country: 'CA', lat: 43.6532, lon: -79.3832, priority: 3 },
  { name: 'Vancouver', state: 'British Columbia', country: 'CA', lat: 49.2827, lon: -123.1207, priority: 3 },
  { name: 'Montreal', state: 'Quebec', country: 'CA', lat: 45.5017, lon: -73.5673, priority: 3 },
  { name: 'Calgary', state: 'Alberta', country: 'CA', lat: 51.0447, lon: -114.0719, priority: 3 },
  { name: 'Ottawa', state: 'Ontario', country: 'CA', lat: 45.4215, lon: -75.6972, priority: 3 },
];

const allCities = [...bangaloreAreas, ...karnatakaCities, ...indianCities, ...indianDistricts, ...worldCities];

// Search locations endpoint with enhanced formatting
app.get('/make-server-2d6e0233/search-locations', async (c) => {
  try {
    const query = c.req.query('q')?.toLowerCase() || '';
    
    if (query.length < 1) {
      // Return top suggestions when query is empty (Bangalore areas + Karnataka cities)
      const topSuggestions = allCities
        .filter(city => city.priority === 0.5 || city.priority === 1)
        .slice(0, 12)
        .map(city => ({
          ...city,
          displayName: `${city.name}, ${city.country}`,
          subtitle: city.state || city.country,
        }));
      return c.json(topSuggestions);
    }

    // Score-based ranking for better relevance
    const scoredResults = allCities
      .map(city => {
        const nameLower = city.name.toLowerCase();
        const stateLower = city.state?.toLowerCase() || '';
        let score = 0;

        // Exact match gets highest score
        if (nameLower === query) score += 1000;
        // Starts with query
        else if (nameLower.startsWith(query)) score += 500;
        // Contains query
        else if (nameLower.includes(query)) score += 200;
        // State contains query
        else if (stateLower.includes(query)) score += 100;
        else return null; // No match

        // Priority bonus (Bangalore = highest, then Karnataka, then India, then World)
        if (city.priority === 0.5) score += 100; // Bangalore areas
        else if (city.priority === 1) score += 50; // Karnataka cities
        else if (city.priority === 2) score += 20; // Indian cities
        else if (city.priority === 3) score += 10; // World cities

        return {
          ...city,
          score,
          displayName: `${city.name}, ${city.country}`,
          subtitle: city.state || city.country,
        };
      })
      .filter(result => result !== null)
      .sort((a, b) => b!.score - a!.score)
      .slice(0, 10);

    // If no results in our database, try OpenWeatherMap geocoding
    if (scoredResults.length === 0) {
      const apiKey = Deno.env.get('OPENWEATHERMAP_API_KEY');
      if (apiKey) {
        try {
          const geoResponse = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`
          );
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            const externalResults = geoData.map((item: any) => ({
              name: item.name,
              state: item.state || item.country,
              country: item.country,
              lat: item.lat,
              lon: item.lon,
              priority: 3,
              displayName: `${item.name}, ${item.country}`,
              subtitle: item.state || item.country,
            }));
            return c.json(externalResults);
          }
        } catch (e) {
          console.log('Geocoding API error:', e);
        }
      }
    }

    return c.json(scoredResults);
  } catch (error) {
    console.log('Error searching locations:', error);
    return c.json({ error: 'Failed to search locations' }, 500);
  }
});

// Get coordinates for a location with multiple fallback strategies
async function getLocationCoordinates(location: string): Promise<{ lat: number; lon: number; name: string; country: string } | null> {
  try {
    const lowerLocation = location.toLowerCase().trim();
    // Extract city name (before comma if present)
    const cityName = lowerLocation.split(',')[0].trim();
    
    // Try exact match first
    let found = allCities.find(city => 
      city.name.toLowerCase() === cityName ||
      city.name.toLowerCase() === lowerLocation
    );
    
    // Try partial match
    if (!found) {
      found = allCities.find(city => 
        lowerLocation.includes(city.name.toLowerCase()) ||
        city.name.toLowerCase().includes(cityName)
      );
    }

    if (found) {
      console.log(`Found city in database: ${found.name}`);
      return {
        lat: found.lat,
        lon: found.lon,
        name: found.name,
        country: found.country,
      };
    }

    const apiKey = Deno.env.get('OPENWEATHERMAP_API_KEY');
    if (!apiKey) {
      console.log('OpenWeatherMap API key not found, using default coords for Bangalore');
      return {
        lat: 12.9716,
        lon: 77.5946,
        name: 'Bangalore',
        country: 'IN',
      };
    }

    // Try multiple query variations with the geocoding API
    const queryVariations = [
      location, // Original query
      cityName, // Just the city name
      `${cityName},IN`, // City with India country code
      cityName.replace(/\s+/g, ''), // Remove spaces (e.g., "kanakpura")
      cityName.split(' ')[0], // First word only
    ];

    console.log(`City not in database, trying geocoding API with variations for: ${location}`);
    
    for (const query of queryVariations) {
      if (!query || query.length < 2) continue; // Skip empty or too short queries
      
      console.log(`Trying geocoding query: ${query}`);
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`
      );
      
      if (!geoResponse.ok) {
        console.log(`Geocoding API failed for "${query}" with status: ${geoResponse.status}`);
        continue; // Try next variation
      }
      
      const geoData = await geoResponse.json();
      
      if (geoData && geoData.length > 0) {
        // Prioritize Indian cities if multiple results
        let result = geoData.find((r: any) => r.country === 'IN') || geoData[0];
        
        console.log(`Found via geocoding: ${result.name}, ${result.country} (from query: ${query})`);
        return {
          lat: result.lat,
          lon: result.lon,
          name: result.name,
          country: result.country,
        };
      }
    }
    
    console.log('No results from geocoding API after trying all variations');
    return null;
  } catch (error) {
    console.log('Geocoding error:', error);
    return null;
  }
}

// Generate mock weather data
function generateMockWeather(coords: { lat: number; lon: number; name: string; country: string }) {
  const baseTemp = coords.lat > 0 ? (30 - coords.lat * 0.5) : (25 + Math.abs(coords.lat) * 0.3);
  const temp = Math.round(baseTemp + (Math.random() * 6 - 3));
  
  const conditions = ['Clear', 'Clouds', 'Rain', 'Mist', 'Haze'];
  const icons = ['01d', '02d', '03d', '04d', '09d', '10d', '50d'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  return {
    location: coords.name,
    country: coords.country,
    temperature: temp,
    feelsLike: temp + Math.floor(Math.random() * 4 - 2),
    condition: randomCondition,
    icon: randomIcon,
    humidity: 60 + Math.floor(Math.random() * 30),
    windSpeed: Math.round((2 + Math.random() * 8) * 10) / 10,
    visibility: 8000 + Math.floor(Math.random() * 2000),
    pressure: 1010 + Math.floor(Math.random() * 20),
    lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };
}

// Get weather data
app.get('/make-server-2d6e0233/weather/:location', async (c) => {
  try {
    const location = c.req.param('location');
    console.log(`Weather request for: ${location}`);
    
    const coords = await getLocationCoordinates(location);
    
    if (!coords) {
      console.log(`Location not found: ${location}`);
      return c.json({ error: `Location not found: ${location}` }, 404);
    }

    console.log(`Using coordinates: lat=${coords.lat}, lon=${coords.lon} for ${coords.name}`);

    const apiKey = Deno.env.get('OPENWEATHERMAP_API_KEY');
    
    if (!apiKey) {
      console.log('⚠️ OpenWeatherMap API key not configured - Using demo data');
      const mockData = generateMockWeather(coords);
      return c.json(mockData);
    }

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
      );

      if (!weatherResponse.ok) {
        const errorText = await weatherResponse.text();
        console.log(`Weather API error: ${weatherResponse.status} - ${errorText}`);
        console.log('Falling back to demo data');
        const mockData = generateMockWeather(coords);
        return c.json(mockData);
      }

      const weatherData = await weatherResponse.json();

      const result = {
        location: coords.name,
        country: coords.country,
        temperature: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        condition: weatherData.weather[0].main,
        icon: weatherData.weather[0].icon,
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed * 10) / 10,
        visibility: weatherData.visibility,
        pressure: weatherData.main.pressure,
        lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      };

      return c.json(result);
    } catch (fetchError) {
      console.log('Error calling weather API:', fetchError);
      const mockData = generateMockWeather(coords);
      return c.json(mockData);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return c.json({ error: `Weather fetch failed: ${errorMessage}` }, 500);
  }
});

// Generate mock AQI data
function generateMockAQI(coords: { name: string }) {
  const cityName = coords.name.toLowerCase();
  let baseAQI = 50;
  
  // Delhi region - poor air quality
  if (cityName.includes('delhi') || cityName.includes('patna') || cityName.includes('lucknow')) {
    baseAQI = 150 + Math.floor(Math.random() * 50);
  }
  // Karnataka cities - moderate to good
  else if (cityName.includes('bangalore') || cityName.includes('mysore') || cityName.includes('mangalore')) {
    baseAQI = 60 + Math.floor(Math.random() * 40);
  }
  // Other cities
  else {
    baseAQI = 70 + Math.floor(Math.random() * 60);
  }

  let status: 'Good' | 'Moderate' | 'Poor';
  if (baseAQI <= 50) status = 'Good';
  else if (baseAQI <= 100) status = 'Moderate';
  else status = 'Poor';

  return {
    location: coords.name,
    aqi: baseAQI,
    status,
    lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };
}

// Get air quality data
app.get('/make-server-2d6e0233/air-quality/:location', async (c) => {
  try {
    const location = c.req.param('location');
    console.log(`AQI request for: ${location}`);
    
    const coords = await getLocationCoordinates(location);
    
    if (!coords) {
      console.log(`AQI: Location not found: ${location}`);
      return c.json({ error: `Location not found: ${location}` }, 404);
    }

    console.log(`AQI: Using coordinates for ${coords.name}`);

    const apiKey = Deno.env.get('IQAIR_API_KEY');
    
    if (!apiKey) {
      console.log('⚠️ IQAir API key not configured - Using demo data');
      const mockData = generateMockAQI(coords);
      return c.json(mockData);
    }

    try {
      const aqiResponse = await fetch(
        `https://api.airvisual.com/v2/nearest_city?lat=${coords.lat}&lon=${coords.lon}&key=${apiKey}`
      );

      if (!aqiResponse.ok) {
        const errorText = await aqiResponse.text();
        console.log(`IQAir API error: ${aqiResponse.status} - ${errorText}`);
        console.log('Falling back to demo data');
        const mockData = generateMockAQI(coords);
        return c.json(mockData);
      }

      const aqiData = await aqiResponse.json();
      const aqi = aqiData.data.current.pollution.aqius;

      let status: 'Good' | 'Moderate' | 'Poor';
      if (aqi <= 50) status = 'Good';
      else if (aqi <= 100) status = 'Moderate';
      else status = 'Poor';

      const result = {
        location: coords.name,
        aqi,
        status,
        lastUpdated: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      };

      return c.json(result);
    } catch (fetchError) {
      console.log('Error calling AQI API:', fetchError);
      const mockData = generateMockAQI(coords);
      return c.json(mockData);
    }
  } catch (error) {
    console.log('Error fetching AQI data:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get trend data
app.get('/make-server-2d6e0233/trends/:location', async (c) => {
  try {
    const location = c.req.param('location');
    const coords = await getLocationCoordinates(location);
    
    if (!coords) {
      return c.json({ weather: [], aqi: [] });
    }

    const apiKey = Deno.env.get('OPENWEATHERMAP_API_KEY');
    
    // Generate mock trend data
    const generateMockTrends = () => {
      const weatherTrends = [];
      const aqiTrends = [];
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      
      for (let i = 0; i < 7; i++) {
        weatherTrends.push({
          day: days[i],
          temp: 25 + Math.floor(Math.random() * 10),
        });
        aqiTrends.push({
          day: days[i],
          aqi: 50 + Math.floor(Math.random() * 50),
        });
      }
      
      return { weather: weatherTrends, aqi: aqiTrends };
    };

    if (!apiKey) {
      console.log('Using demo trend data');
      return c.json(generateMockTrends());
    }

    try {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
      );

      if (!forecastResponse.ok) {
        return c.json(generateMockTrends());
      }

      const forecastData = await forecastResponse.json();
      const dailyData = new Map();
      
      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        if (!dailyData.has(dayKey)) {
          dailyData.set(dayKey, { temps: [], day: dayKey });
        }
        
        dailyData.get(dayKey).temps.push(item.main.temp);
      });

      const weatherTrends: any[] = [];
      const aqiTrends: any[] = [];

      dailyData.forEach((value) => {
        const avgTemp = Math.round(value.temps.reduce((a: number, b: number) => a + b, 0) / value.temps.length);
        weatherTrends.push({
          day: value.day,
          temp: avgTemp,
        });
        const baseAQI = 50 + Math.floor(Math.random() * 50);
        aqiTrends.push({
          day: value.day,
          aqi: baseAQI,
        });
      });

      return c.json({ weather: weatherTrends.slice(0, 7), aqi: aqiTrends.slice(0, 7) });
    } catch (fetchError) {
      console.log('Error fetching forecast:', fetchError);
      return c.json(generateMockTrends());
    }
  } catch (error) {
    console.log('Error fetching trends:', error);
    return c.json({ weather: [], aqi: [] });
  }
});

// Helper function to extract city names from user message
function extractCityNames(message: string): string[] {
  const cities: string[] = [];
  const lowerMessage = message.toLowerCase();
  
  // Check all known cities
  allCities.forEach(city => {
    if (lowerMessage.includes(city.name.toLowerCase())) {
      cities.push(city.name);
    }
  });
  
  return cities;
}

// Helper function to get weather and AQI for a location
async function getLocationData(location: string) {
  const coords = await getLocationCoordinates(location);
  if (!coords) return null;

  const weatherKey = Deno.env.get('OPENWEATHERMAP_API_KEY');
  const aqiKey = Deno.env.get('IQAIR_API_KEY');

  let weatherInfo = null;
  let aqiInfo = null;

  // Fetch weather
  if (weatherKey) {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${weatherKey}&units=metric`
      );
      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        weatherInfo = {
          temp: Math.round(weatherData.main.temp),
          feelsLike: Math.round(weatherData.main.feels_like),
          condition: weatherData.weather[0].main,
          description: weatherData.weather[0].description,
          humidity: weatherData.main.humidity,
          windSpeed: Math.round(weatherData.wind.speed * 10) / 10,
        };
      }
    } catch (e) {
      console.log('Weather fetch error:', e);
    }
  }

  // Fetch AQI
  if (aqiKey) {
    try {
      const aqiResponse = await fetch(
        `https://api.airvisual.com/v2/nearest_city?lat=${coords.lat}&lon=${coords.lon}&key=${aqiKey}`
      );
      if (aqiResponse.ok) {
        const aqiData = await aqiResponse.json();
        const aqi = aqiData.data.current.pollution.aqius;
        let status: string;
        if (aqi <= 50) status = 'Good';
        else if (aqi <= 100) status = 'Moderate';
        else status = 'Poor';
        
        aqiInfo = { aqi, status };
      }
    } catch (e) {
      console.log('AQI fetch error:', e);
    }
  }

  return {
    location: coords.name,
    weather: weatherInfo,
    aqi: aqiInfo,
  };
}

// AI Chat endpoint with real-time data integration
app.post('/make-server-2d6e0233/ai-chat', async (c) => {
  try {
    const { message } = await c.req.json();
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey) {
      return c.json({
        response: "I'm here to help with weather and air quality queries. Try asking about specific cities like 'What's the weather in Bangalore?' or 'Show AQI for Delhi'",
        suggestedLocation: null,
      });
    }

    // Extract city names from message
    const cities = extractCityNames(message);
    
    // Fetch data for mentioned cities
    const locationDataPromises = cities.slice(0, 3).map(city => getLocationData(city));
    const locationDataResults = await Promise.all(locationDataPromises);
    const validLocationData = locationDataResults.filter(d => d !== null);

    // Build context for AI with real data
    let dataContext = '';
    if (validLocationData.length > 0) {
      dataContext = '\n\nCurrent data:\n';
      validLocationData.forEach(data => {
        if (data) {
          dataContext += `\n${data.location}:`;
          if (data.weather) {
            dataContext += `\n- Weather: ${data.weather.temp}°C, ${data.weather.condition} (${data.weather.description})`;
            dataContext += `\n- Feels like: ${data.weather.feelsLike}°C, Humidity: ${data.weather.humidity}%, Wind: ${data.weather.windSpeed} m/s`;
          }
          if (data.aqi) {
            dataContext += `\n- Air Quality: ${data.aqi.status} (AQI: ${data.aqi.aqi})`;
            
            // Add smart tips based on AQI
            if (data.aqi.status === 'Poor') {
              dataContext += '\n- Tip: Air quality is poor. Limit outdoor activities and consider wearing a mask.';
            } else if (data.aqi.status === 'Moderate') {
              dataContext += '\n- Tip: Air quality is moderate. Sensitive individuals should limit prolonged outdoor activities.';
            } else {
              dataContext += '\n- Tip: Air quality is good. Great for outdoor activities!';
            }
          }
        }
      });
    }

    try {
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful Smart City assistant focused on weather and air quality in India, especially Karnataka and Bangalore regions (Hebbal, Indiranagar, Whitefield, Koramangala, etc.).

Keep responses SHORT (2-3 sentences max), friendly, and helpful. Use the real-time data provided to give accurate information.

Air Quality Guidelines:
- Good (AQI 0-50): Green indicator, safe for all activities
- Moderate (AQI 51-100): Yellow indicator, sensitive groups should be cautious
- Poor (AQI 101+): Red indicator, limit outdoor activities, wear masks

Weather Tips:
- Hot weather (>30°C): Stay hydrated, avoid midday sun
- Rainy: Carry umbrella, watch for traffic
- Clear: Great for outdoor activities

Focus: Karnataka cities → Other Indian cities → World cities`,
            },
            {
              role: 'user',
              content: message + dataContext,
            },
          ],
          max_tokens: 250,
          temperature: 0.7,
        }),
      });

      if (openaiResponse.ok) {
        const data = await openaiResponse.json();
        const response = data.choices[0].message.content;

        // Suggest first mentioned city
        let suggestedLocation = cities.length > 0 ? cities[0] : null;

        return c.json({ response, suggestedLocation });
      }

      throw new Error('OpenAI API failed');
    } catch (fetchError) {
      console.log('OpenAI error:', fetchError);
      
      // Fallback response with data if available
      if (validLocationData.length > 0) {
        const data = validLocationData[0];
        let fallbackResponse = `📍 ${data.location}:\n`;
        if (data.weather) {
          fallbackResponse += `🌤 ${data.weather.temp}°C, ${data.weather.condition}\n`;
        }
        if (data.aqi) {
          fallbackResponse += `💨 Air Quality: ${data.aqi.status}`;
        }
        return c.json({ response: fallbackResponse, suggestedLocation: cities[0] || null });
      }
      
      return c.json({
        response: "I'm here to help! Ask me about weather or air quality in any city.",
        suggestedLocation: null,
      });
    }
  } catch (error) {
    console.log('AI chat error:', error);
    return c.json({
      response: "I'm here to help! Ask me about weather or air quality in any city.",
      suggestedLocation: null,
    });
  }
});

// Health check
app.get('/make-server-2d6e0233/health', (c) => {
  const hasWeatherKey = !!Deno.env.get('OPENWEATHERMAP_API_KEY');
  const hasAQIKey = !!Deno.env.get('IQAIR_API_KEY');
  const hasOpenAIKey = !!Deno.env.get('OPENAI_API_KEY');
  
  console.log('Health check - API keys status:', {
    weather: hasWeatherKey,
    aqi: hasAQIKey,
    openai: hasOpenAIKey
  });
  
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    server: 'Smart City Dashboard Server',
    version: '2.0',
    apiKeys: {
      openweathermap: hasWeatherKey ? 'configured' : 'missing (using demo data)',
      iqair: hasAQIKey ? 'configured' : 'missing (using demo data)',
      openai: hasOpenAIKey ? 'configured' : 'missing (using fallback responses)',
    }
  });
});

// Test endpoint
app.get('/make-server-2d6e0233/test', (c) => {
  return c.json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString(),
    allCitiesCount: allCities.length
  });
});

console.log('🚀 Server starting...');
console.log('📍 Endpoints:');
console.log('  - GET  /make-server-2d6e0233/test');
console.log('  - GET  /make-server-2d6e0233/health');
console.log('  - GET  /make-server-2d6e0233/search-locations');
console.log('  - GET  /make-server-2d6e0233/weather/:location');
console.log('  - GET  /make-server-2d6e0233/air-quality/:location');
console.log('  - GET  /make-server-2d6e0233/trends/:location');
console.log('  - POST /make-server-2d6e0233/ai-chat');

Deno.serve(app.fetch);
