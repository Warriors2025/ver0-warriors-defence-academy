-- Align homepage mentors with warriorsdefenceacademy.com (verified names, roles, photos)

UPDATE mentors SET
  name = 'Lt. Gen. Dushyant Singh, PVSM, AVSM (Retd.)',
  designation = 'Mentor-Guide & Chief Advisor',
  expertise = 'Former head of Army War College, Mhow and ex-IG (Operations), NSG',
  experience = '35+ Years',
  branch = 'Indian Army',
  initials = 'DS',
  image_url = '/images/mentors/lt-gen-dushyant-singh.webp',
  sort_order = 1
WHERE name = 'Lt. Gen. Dushyant Singh';

INSERT INTO mentors (name, designation, expertise, experience, branch, initials, image_url, is_active, sort_order)
SELECT
  'Maj. Gen. Vikram Kumar (Retd.)',
  'Chief Mentor',
  'Former Additional Director General, NCC Directorate, Uttar Pradesh and ex-Chief Instructor, OTA Chennai',
  '37 Years',
  'Indian Army',
  'VK',
  '/images/mentors/maj-gen-vikram-kumar.webp',
  true,
  2
WHERE NOT EXISTS (SELECT 1 FROM mentors WHERE name = 'Maj. Gen. Vikram Kumar (Retd.)');

UPDATE mentors SET
  name = 'Cdr. Sudarshan Chakrapani (Retd.)',
  designation = 'SSB Expert',
  expertise = 'Ex-Interviewing Officer, Bhopal & Allahabad SSB Boards',
  experience = '24+ Years',
  branch = 'Indian Navy',
  image_url = '/images/mentors/sudarshan-chakrapani.webp',
  sort_order = 3
WHERE name = 'Cmdr. Sudarshan Chakrapani';

UPDATE mentors SET
  name = 'Commandant Yogesh Datta (Retd.)',
  designation = 'SSB Expert & Psychologist',
  expertise = 'Ex-Psych Assessor, Coast Guard Selection Board; DIPR-qualified psychology assessor',
  experience = '25 Years',
  branch = 'Indian Coast Guard',
  image_url = '/images/mentors/yogesh-datta.webp',
  sort_order = 4
WHERE name = 'Commandant Yogesh Datta';

UPDATE mentors SET
  name = 'Cdr. T.L.P. Babu (Retd.)',
  designation = 'SSB Expert',
  expertise = 'Ex-GTO, 24 & 12 SSB Bangalore; Nao Sena Medal (Gallantry)',
  experience = '36 Years',
  branch = 'Indian Navy',
  image_url = '/images/mentors/cmdr-tlp-babu.webp',
  sort_order = 5
WHERE name = 'Commander TLP Babu';

UPDATE mentors SET
  name = 'Col. Vijay Chauhan',
  designation = 'SSB Expert',
  expertise = 'Ex-Medical Officer and personality development mentor',
  experience = '33+ Years',
  branch = 'Indian Army',
  image_url = '/images/mentors/col-vijay-chauhan.webp',
  sort_order = 6
WHERE name = 'Colonel Vijay Chauhan';

-- Not shown on the reference homepage grid; keep the record with its correct photo
UPDATE mentors SET
  name = 'Col. R.K. Tewari (Retd.)',
  designation = 'SSB Expert',
  expertise = 'Ex-GTO & Psychologist, Bhopal & Allahabad SSB Boards',
  experience = '',
  image_url = '/images/mentors/col-rk-tewari.webp',
  is_active = false,
  sort_order = 7
WHERE name = 'Col. R.K. Tiwari (Retd.)';
