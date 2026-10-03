const categories = [
  { name: 'Allergy and Flu', description: 'Medicines and products for allergy, flu, cold and seasonal symptoms.' },
  { name: 'Cough', description: 'Cough syrups, lozenges and related throat-care medicines.' },
  { name: 'Constipation', description: 'Digestive relief and constipation support products.' },
  { name: 'Fever', description: 'Fever relief medicines and general pain management products.' },
  { name: 'Dehydration', description: 'ORS and hydration support products.' },
  { name: 'Digestion', description: 'Digestion, acidity and stomach-care products.' },
  { name: 'Antiseptics', description: 'Antiseptic liquids, creams and wound-care products.' },
  { name: 'Ear and Nose', description: 'Ear drops, nasal sprays and related care products.' },
  { name: 'Vitamins', description: 'Vitamins, minerals and health supplements.' }
];

const products = [
  ['Cetirizine Tablets', 'Allergy and Flu', 'Antihistamine tablets for allergy symptom relief.', 120, 150, 'MediCare Labs', '10mg', '10 tablets', 80, false, 'CarePharma'],
  ['Loratadine Tablets', 'Allergy and Flu', 'Non-drowsy allergy relief tablets.', 180, 210, 'HealthFirst', '10mg', '10 tablets', 60, false, 'HealthFirst Pharma'],
  ['Flu Relief Capsules', 'Allergy and Flu', 'Combination flu relief product for demo listing.', 260, 300, 'Bismillah Care', 'Standard', '12 capsules', 45, false, 'Bismillah Pharma'],
  ['Nasal Saline Spray', 'Allergy and Flu', 'Saline nasal spray for nasal dryness and congestion support.', 350, 390, 'ClearAir', '0.65%', '30ml bottle', 30, false, 'ClearAir Laboratories'],
  ['Dextromethorphan Syrup', 'Cough', 'Cough syrup product for dry cough symptom relief listing.', 220, 260, 'CoughCare', '15mg/5ml', '120ml bottle', 35, false, 'CoughCare Pharma'],
  ['Honey Lemon Lozenges', 'Cough', 'Throat soothing lozenges with honey lemon flavor.', 95, 120, 'ThroatPlus', 'Standard', '12 lozenges', 100, false, 'ThroatPlus'],
  ['Expectorant Syrup', 'Cough', 'Expectorant syrup demo product for productive cough category.', 245, 280, 'Respirex', 'Standard', '120ml bottle', 28, false, 'Respirex Labs'],
  ['Herbal Cough Syrup', 'Cough', 'Herbal-style cough syrup product entry for demo use.', 310, 350, 'NatureCure', 'Standard', '120ml bottle', 25, false, 'NatureCure Pharma'],
  ['Lactulose Solution', 'Constipation', 'Osmotic laxative solution product for constipation relief listing.', 420, 460, 'DigestWell', '10g/15ml', '120ml bottle', 20, false, 'DigestWell Labs'],
  ['Fiber Sachets', 'Constipation', 'Fiber supplement sachets for digestive regularity.', 550, 600, 'FiberMax', 'Standard', '10 sachets', 32, false, 'FiberMax Health'],
  ['Glycerin Suppositories', 'Constipation', 'Constipation relief product requiring pharmacist guidance.', 190, 220, 'ReliefCare', 'Adult', '6 pieces', 18, true, 'ReliefCare Pharma'],
  ['Paracetamol Tablets', 'Fever', 'Fever and pain relief medicine product listing.', 90, 110, 'MediCare Labs', '500mg', '10 tablets', 150, false, 'MediCare Labs'],
  ['Ibuprofen Tablets', 'Fever', 'Pain and fever relief medicine product listing.', 160, 190, 'PainAway', '400mg', '10 tablets', 70, true, 'PainAway Pharma'],
  ['Children Fever Syrup', 'Fever', 'Pediatric fever syrup product listing for demo use.', 210, 250, 'KidCare', '120mg/5ml', '60ml bottle', 40, true, 'KidCare Pharma'],
  ['Digital Thermometer', 'Fever', 'Digital thermometer for home fever monitoring.', 850, 950, 'MediTools', 'Digital', '1 unit', 20, false, 'MediTools'],
  ['ORS Sachets Orange', 'Dehydration', 'Oral rehydration salts orange flavor.', 60, 75, 'HydraLife', 'Standard', '1 sachet', 200, false, 'HydraLife'],
  ['ORS Sachets Lemon', 'Dehydration', 'Oral rehydration salts lemon flavor.', 60, 75, 'HydraLife', 'Standard', '1 sachet', 180, false, 'HydraLife'],
  ['Electrolyte Drink Powder', 'Dehydration', 'Electrolyte hydration powder for demo listing.', 450, 500, 'HydraMax', 'Standard', '10 sachets', 45, false, 'HydraMax Health'],
  ['Antacid Tablets', 'Digestion', 'Antacid tablets for acidity relief product listing.', 130, 160, 'DigestWell', 'Standard', '20 tablets', 95, false, 'DigestWell Labs'],
  ['Omeprazole Capsules', 'Digestion', 'Acidity and stomach-care capsule product listing.', 280, 320, 'GastroCare', '20mg', '14 capsules', 50, true, 'GastroCare Pharma'],
  ['Probiotic Capsules', 'Digestion', 'Probiotic digestive support capsule product listing.', 650, 720, 'BioGut', 'Standard', '10 capsules', 22, false, 'BioGut Laboratories'],
  ['Digestive Enzyme Syrup', 'Digestion', 'Digestive support syrup product for demo use.', 260, 310, 'DigestPlus', 'Standard', '120ml bottle', 36, false, 'DigestPlus Pharma'],
  ['Povidone Iodine Solution', 'Antiseptics', 'Antiseptic solution for wound cleansing support.', 180, 210, 'SafeClean', '10%', '60ml bottle', 70, false, 'SafeClean Labs'],
  ['Antiseptic Liquid', 'Antiseptics', 'General antiseptic liquid for hygiene and wound care.', 320, 360, 'CleanGuard', 'Standard', '250ml bottle', 42, false, 'CleanGuard'],
  ['Wound Care Cream', 'Antiseptics', 'Topical wound-care cream product for demo listing.', 240, 280, 'HealFast', 'Standard', '20g tube', 34, true, 'HealFast Pharma'],
  ['Sterile Gauze Pads', 'Antiseptics', 'Sterile gauze pads for first-aid care.', 140, 170, 'FirstAid Pro', 'Sterile', '10 pieces', 90, false, 'FirstAid Pro'],
  ['Ear Wax Drops', 'Ear and Nose', 'Ear wax softening drops product listing.', 260, 300, 'EarCare', 'Standard', '10ml bottle', 25, false, 'EarCare Labs'],
  ['Nasal Decongestant Drops', 'Ear and Nose', 'Nasal drops product requiring careful usage guidance.', 210, 240, 'ClearNose', 'Standard', '15ml bottle', 30, true, 'ClearNose Pharma'],
  ['Vitamin C Tablets', 'Vitamins', 'Vitamin C supplement tablets.', 390, 450, 'VitaPlus', '500mg', '30 tablets', 75, false, 'VitaPlus Health'],
  ['Vitamin D3 Capsules', 'Vitamins', 'Vitamin D3 supplement capsules.', 520, 600, 'VitaPlus', '2000 IU', '30 capsules', 55, false, 'VitaPlus Health'],
  ['Multivitamin Tablets', 'Vitamins', 'Daily multivitamin supplement tablets.', 780, 850, 'DailyVita', 'Standard', '30 tablets', 40, false, 'DailyVita'],
  ['Zinc Tablets', 'Vitamins', 'Zinc supplement tablets for general wellness.', 340, 390, 'MineralCare', '20mg', '20 tablets', 52, false, 'MineralCare Labs']
];

module.exports = { categories, products };
