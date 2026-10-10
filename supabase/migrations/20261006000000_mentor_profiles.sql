-- Mentor profile pages (/mentors/[slug]): slug, highlights (one per line) and bio (paragraphs separated by blank lines).
alter table public.mentors add column if not exists slug text;
alter table public.mentors add column if not exists highlights text;
alter table public.mentors add column if not exists bio text;

create unique index if not exists mentors_slug_key on public.mentors (slug) where slug is not null and slug <> '';

update public.mentors set slug = 'lt-gen-dushyant-singh',
highlights = $h$Commissioned into the 9th Battalion, Maratha Light Infantry in December 1981
Commanded an infantry battalion, brigade and division in Jammu & Kashmir
Served twice with the NSG as DIG (Operations) and IG (Operations)
Commanded a corps and headed the Army War College, Mhow
Awarded the Param Vishisht Seva Medal and Ati Vishisht Seva Medal
Author of "Grey Zone Warfare: Way Ahead for India"
Professor Emeritus, Rashtriya Raksha University$h$,
bio = $b$Lt. Gen. Dushyant Singh, PVSM, AVSM (Retd.) was commissioned into the 9th Battalion of the Maratha Light Infantry Regiment in December 1981. He is an alumnus of the National Defence College, Defence Services Staff College, College of Defence Management and the Naval Postgraduate School in California, USA, and attended the Regional Defence Counter Terrorism Program in the US with a specialisation in terrorist operations and financing. He has served in varied terrains and theatres of operations in India and with the United Nations as a military observer, and was an instructor of human resource development at the College of Defence Management, Secunderabad.

The General commanded an infantry battalion, a brigade and a division in Jammu and Kashmir. He holds the distinction of serving twice with the elite National Security Guard — as Deputy Inspector General (Operations) and Inspector General (Operations) — and has been Brigadier General Staff of a Corps in the East and Chief of Staff, Eastern Command. He went on to command a corps and then headed the Army War College. For his distinguished service he was awarded the Ati Vishisht Seva Medal and the Param Vishisht Seva Medal.

A regular contributor to defence journals and newspapers, he has written chapters in "Understanding Suicide Terrorism", "Countering Terrorism: Psychological Strategies" (Sage Publications) and "Life and War Strategies of Maharana Pratap". His book "Grey Zone Warfare: Way Ahead for India" is widely read in the strategic community. He has served as Vice Chairman of the STRIVE India think tank and as Professor Emeritus at Rashtriya Raksha University, an institution of national importance under the Ministry of Home Affairs.$b$
where name ilike 'Lt. Gen. Dushyant Singh%';

update public.mentors set slug = 'maj-gen-vikram-kumar',
highlights = $h$Joined the National Defence Academy at 16½
Commissioned into The 64th Cavalry in June 1988 and later commanded it
Instructor at the Armoured Corps Centre & School and DSSC Wellington
Chief Instructor, Officers Training Academy, Chennai
Additional Director General, NCC Directorate UP — 11 groups, 110 battalions, ~1.85 lakh cadets
M.Phil in Strategic Studies & International Relations$h$,
bio = $b$Major General Vikram Kumar (Retd.) is a second-generation Army officer with nearly four decades of selfless service to the nation. He joined the National Defence Academy at the age of sixteen and a half and, after four years of rigorous training, was commissioned into The 64th Cavalry, a tank regiment, in June 1988 — a unit he later went on to command. A thoroughbred cavalry officer, he has served with distinction in all terrains and operations of war against both China and Pakistan.

He is an alumnus of the School of Armoured Warfare, Army War College, College of Air Warfare, Counter Insurgency and Jungle Warfare School and the Defence Services Staff College. He holds a Diploma in Senior Defence Management, a master's degree in Defence Studies and an M.Phil in Strategic Studies and International Relations, and is pursuing a doctorate in Strategic Studies from Madras University.

He has served in the plains of Punjab, the deserts of Rajasthan, the mountains of Jammu & Kashmir and Arunachal Pradesh, and the jungles of the North East, including extensive tenures with counter-terrorist and counter-infiltration forces such as the Rashtriya Rifles and Assam Rifles in J&K, Nagaland and Punjab — a true scholar warrior.

As an instructor at the Armoured Corps Centre & School and the Defence Services Staff College, he trained future military leaders of India and of almost 35 friendly foreign countries, and served as Chief Instructor at the Officers Training Academy, Chennai. He superannuated on 31 December 2025 as Additional Director General of the NCC Directorate, Uttar Pradesh, where — with 11 NCC Groups and 110 battalions under his command — he trained approximately 1.85 lakh cadets to become responsible citizens and future leaders. An avid sportsman, he is a keen cyclist, biker and horse rider.$b$
where name ilike 'Maj. Gen. Vikram Kumar%';

update public.mentors set slug = 'cdr-sudarshan-chakrapani',
highlights = $h$36-year career, including 24+ years in the Indian Navy
Served aboard submarines INS Sindhughosh, Sindhuvir and Sindhuvijay
Staff Officer (CINCAN), APAO (FOMA) and Officer-in-Charge, NOM Varuna
Ex-Interviewing Officer at the Bhopal and Allahabad SSB boards$h$,
bio = $b$Commander Sudarshan Chakrapani (Retd.), known to his students as "Chax", has a career spanning 36 years, including more than 24 years in the Indian Navy. He served aboard the submarines INS Sindhughosh, Sindhuvir and Sindhuvijay and the warships Darshak, Bhavnagar, Sindhudurg, Vindhyagiri and Kavaratti, and held staff appointments including Staff Officer (CINCAN), APAO (FOMA) and Officer-in-Charge, NOM Varuna.

A seasoned Interviewing Officer with extensive SSB experience, he knows exactly how candidates are evaluated — and he instils in aspirants the resilience they need at the SSB and beyond. His coaching record includes a long line of recommended candidates.$b$
where name ilike 'Cdr. Sudarshan Chakrapani%';

update public.mentors set slug = 'commandant-yogesh-datta',
highlights = $h$25 years in the Indian Coast Guard
Helicopter pilot trained in Southampton, UK — about 2,000 hours of sea operations
Psych Assessor, Coast Guard Selection Board, Noida
Joint Director, Coast Guard Recruitment Directorate
M.A. Applied Psychology with PG in Guidance & Counselling
DIPR-qualified Technical Officer (Psychology Assessor)$h$,
bio = $b$Commandant Yogesh Datta (Retd.) served in the Indian Coast Guard for 25 years, with rich experience in sea operations, planning, security operations, training and development. His appointments include Executive Officer, Gunnery Officer, Navigating Officer, Communications Officer, Training Officer, Maritime Law Enforcement Officer, Principal Warfare Officer, and Nuclear, Biological & Chemical Defence and Firefighting Officer.

A helicopter pilot who trained and earned his rating in Southampton, United Kingdom, he has completed about 2,000 hours of helicopter sea operations. He served as Joint Director in the Recruitment Directorate and as a Psych Assessor with the Coast Guard Selection Board (CGSB), Noida, and as a training officer aboard Indian Naval and Coast Guard training ships, grooming the cadets who become future Navy and Coast Guard officers.

He holds a master's degree in Applied Psychology with a post-graduation in Guidance and Counselling, and is qualified as a Technical Officer (Psychology Assessor) from the Defence Institute of Psychological Research (DIPR), Delhi.$b$
where name ilike 'Commandant Yogesh Datta%';

update public.mentors set slug = 'cdr-tlp-babu',
highlights = $h$36 years of service (1983–2019)
3,974 flying hours, 2,776 as Pilot in Command
Nao Sena Medal (Gallantry), 2001
Group Testing Officer — No. 207 GTO course; ex-GTO at 24 & 12 SSB Bangalore
First in the Flight Safety and Accident Investigation Course$h$,
bio = $b$Commander T.L.P. Babu (Retd.) was commissioned on 1 January 1983 and served the nation for 36 years until retiring on 10 May 2019. A naval aviator, he flew the HS-748 (Avro) and IL-38 before operating the TU-142M four-engine turboprop from 1989 to 2007, logging 3,974 flying hours — 2,776 of them as Pilot in Command.

In 2001 he was awarded the Nao Sena Medal (Gallantry) for safely recovering an aircraft and its crew during a challenging situation. He stood first in the Flight Safety and Accident Investigation Course and held appointments including Staff/Senior Pilot of premier MR/ASW squadrons, Station Flight Safety Officer, Armed Forces Public Relations Officer and Public Information Officer.

For SSB aspirants, his most valuable experience is as a Group Testing Officer: he completed the No. 207 Group Testing Officers course and assessed numerous candidates for the officer cadre of the Indian Navy. Fluent in English, Telugu and Hindi, he continues to guide young aspirants through career counselling.$b$
where name ilike 'Cdr. T.L.P. Babu%';

update public.mentors set slug = 'col-vijay-chauhan',
highlights = $h$33+ years as an Armed Forces Medical Officer
Leadership in patient care, emergency response and strategic management
Personality development mentor for SSB aspirants$h$,
bio = $b$Col. Vijay Chauhan is an Armed Forces Medical Officer with over 33 years of service. Throughout his career he has led teams in patient care, emergency response and strategic management, earning a reputation as a trusted professional with a compassionate approach.

He is known for building strong relationships at every level — senior management, peers and recruits. That empathetic, solution-oriented communication style is what he brings to students at Warriors Defence Academy as a personality development mentor, helping them carry themselves with confidence through the SSB.$b$
where name ilike 'Col. Vijay Chauhan%';

update public.mentors set slug = 'col-rk-tewari' where name ilike 'Col. R.K. Tewari%' and slug is null;
