-- Fix gallery paths that reference files not in the repo
UPDATE gallery_images SET image_url = '/images/gallery/event-2.jpg' WHERE image_url = '/images/gallery/training-2.jpg';
UPDATE gallery_images SET image_url = '/images/gallery/event-3.jpg' WHERE image_url = '/images/gallery/gto-2.jpg';
UPDATE gallery_images SET image_url = '/images/gallery/success-1.webp' WHERE image_url = '/images/gallery/success-1.jpg';
UPDATE gallery_images SET image_url = '/images/gallery/event-1.jpg' WHERE image_url = '/images/gallery/success-2.jpg';

-- Mentor photos (match committed assets in public/images/mentors/)
UPDATE mentors SET image_url = '/images/mentors/lt-gen-dushyant.webp' WHERE sort_order = 1;
UPDATE mentors SET image_url = '/images/mentors/sudarshan-chakrapani.webp' WHERE sort_order = 2;
UPDATE mentors SET image_url = '/images/mentors/col-tiwari.webp' WHERE sort_order = 3;
UPDATE mentors SET
  name = 'Commandant Yogesh Datta',
  designation = 'Training Director',
  expertise = 'Officer Grooming & SSB Assessment',
  experience = '22+ Years',
  branch = 'Indian Army',
  initials = 'YD',
  image_url = '/images/mentors/yogesh-datta.webp'
WHERE sort_order = 4;
UPDATE mentors SET
  name = 'Commander TLP Babu',
  designation = 'SSB Mentor',
  expertise = 'Psychology & Interview Training',
  experience = '20+ Years',
  branch = 'Indian Navy',
  initials = 'TB',
  image_url = '/images/mentors/cmdr-babu.webp'
WHERE sort_order = 5;
UPDATE mentors SET
  name = 'Colonel Vijay Chauhan',
  designation = 'Academic Mentor',
  expertise = 'Written Exam Strategy & Discipline',
  experience = '24+ Years',
  branch = 'Indian Army',
  initials = 'VC',
  image_url = '/images/mentors/col-vijay-chauhan.webp'
WHERE sort_order = 6;

-- Prefer WebP course thumbnails where both formats exist
UPDATE courses SET image_url = REPLACE(image_url, '.jpg', '.webp') WHERE image_url LIKE '/images/courses/%.jpg';
