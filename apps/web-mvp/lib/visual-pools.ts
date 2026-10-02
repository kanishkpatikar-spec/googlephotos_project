// ============================================================
// VISUAL POOLS — memory-demo-v2-720
// ============================================================
// Each pool maps a thematic category to an array of direct Unsplash
// image URLs, semantically matched and globally diverse.
//
// All images served via images.unsplash.com CDN — 100% uptime,
// zero rate-limiting, instant global delivery via Cloudflare.
//
// Images include locations from India, Europe, Asia, Americas
// for authentic global diversity.
// ============================================================

export const VISUAL_POOLS: Record<string, (number | string)[]> = {
    // ── HOTEL / ACCOMMODATION ────────────────────────────────────
    hotel_room: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",   // hotel bed
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",   // luxury room
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",   // modern room
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",   // cozy bed
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",   // twin beds
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",   // boutique room
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",   // elegant suite
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",   // hotel interior
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",   // resort room
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop",   // warm room
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",   // living room // from home_interior
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop",   // cozy living // from home_interior
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",   // bedroom // from home_interior
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop",   // kitchen counter // from home_interior
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",   // bookshelf // from home_interior
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",   // apartment view // from home_interior
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",   // modern apartment // from home_interior
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",   // minimalist room // from home_interior
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",   // resort exterior // from hotel_exterior
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",   // grand hotel // from hotel_exterior
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",   // pool hotel // from hotel_exterior
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",   // tropical hotel // from hotel_exterior
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop",   // heritage hotel // from hotel_exterior
    ],
    hotel_exterior: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",   // resort exterior
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",   // grand hotel
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",   // pool hotel
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",   // tropical hotel
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop",   // heritage hotel
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",   // hotel bed // from hotel_room
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",   // luxury room // from hotel_room
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",   // modern room // from hotel_room
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",   // cozy bed // from hotel_room
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",   // twin beds // from hotel_room
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",   // boutique room // from hotel_room
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",   // elegant suite // from hotel_room
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",   // hotel interior // from hotel_room
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",   // resort room // from hotel_room
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop",   // warm room // from hotel_room
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",   // living room // from home_interior
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop",   // cozy living // from home_interior
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",   // bedroom // from home_interior
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop",   // kitchen counter // from home_interior
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",   // bookshelf // from home_interior
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",   // apartment view // from home_interior
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",   // modern apartment // from home_interior
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",   // minimalist room // from home_interior
    ],

    // ── BEACH / OCEAN ─────────────────────────────────────────────
    beach: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",   // tropical beach
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",   // sandy shore
        "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop",   // ocean waves
        "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=600&fit=crop",   // palm beach
        "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&h=600&fit=crop",   // clear water beach
        "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&h=600&fit=crop",   // sunset beach
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=600&fit=crop",   // coastal cliff
        "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&h=600&fit=crop",   // Goa-style beach
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",   // boats on shore
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop",   // deep ocean // from ocean
        "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&h=600&fit=crop",   // ocean surface // from ocean
        "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800&h=600&fit=crop",   // sea horizon // from ocean
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",   // ocean waves // from ocean
        "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&h=600&fit=crop",   // calm sea // from ocean
    ],
    ocean: [
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop",   // deep ocean
        "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&h=600&fit=crop",   // ocean surface
        "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800&h=600&fit=crop",   // sea horizon
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",   // ocean waves
        "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&h=600&fit=crop",   // calm sea
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",   // tropical beach // from beach
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",   // sandy shore // from beach
        "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop",   // ocean waves // from beach
        "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=600&fit=crop",   // palm beach // from beach
        "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&h=600&fit=crop",   // clear water beach // from beach
        "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&h=600&fit=crop",   // sunset beach // from beach
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=600&fit=crop",   // coastal cliff // from beach
        "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&h=600&fit=crop",   // Goa-style beach // from beach
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",   // boats on shore // from beach
    ],

    // ── CITY / BUILDINGS ──────────────────────────────────────────
    city_street: [
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",   // NYC skyline
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",   // city avenue
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",   // urban skyline
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",   // city at dusk
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop",   // night street
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // downtown
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",   // urban night
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",   // Indian street
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",   // European town
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",   // London bridge
        "https://images.unsplash.com/photo-1515876305430-f06edab8282a?w=800&h=600&fit=crop",   // highway sunset // from highway
        "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop",   // winding highway // from highway
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop",   // coastal highway // from highway
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",   // adventure highway // from highway
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",   // road trip scenic // from car_road
        "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&h=600&fit=crop",   // desert highway // from car_road
        "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=800&h=600&fit=crop",   // coastal road // from car_road
        "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop",   // mountain road // from car_road
        "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=800&h=600&fit=crop",   // city taxi // from car_road
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",   // bus travel // from car_road
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop",   // Varanasi ghats India // from car_road
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&h=600&fit=crop",   // car driving // from car_road
        "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop",   // rural road India // from car_road
        "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=800&h=600&fit=crop",   // train window // from car_road
        "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop",   // scenic drive // from car_road
        "https://images.unsplash.com/photo-1519818187420-8e49de7adeef?w=800&h=600&fit=crop",   // tuk tuk // from car_road
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan road // from car_road
        "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800&h=600&fit=crop",   // winding road // from car_road
        "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?w=800&h=600&fit=crop",   // evening road // from car_road
        "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&h=600&fit=crop",   // countryside drive // from car_road
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop",   // sunset road // from car_road
        "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&h=600&fit=crop",   // morning drive landscape // from car_road
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",   // travel bags car // from car_road
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",   // lake road trip // from car_road
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",   // airport taxi // from car_road
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",   // road ahead // from car_road
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop",   // Mediterranean coast drive // from car_road
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop",   // tropical travel // from car_road
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",   // scenic vista // from car_road
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",   // morning fog road // from car_road
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",   // garden arrival // from car_road
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop",   // Italian coast // from car_road
        "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&h=600&fit=crop",   // Rajasthan desert road // from car_road
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop",   // mountain valley road // from car_road
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",   // Kerala India // from car_road
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // Swiss valley drive // from car_road
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",   // adventure travel // from car_road
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=600&fit=crop",   // golden hour drive // from car_road
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",   // camping road trip // from car_road
        "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=600&fit=crop",   // travel wanderlust // from car_road
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=600&fit=crop",   // sunrise journey // from car_road
        "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop",   // backpacker travel // from car_road
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",   // nature drive // from car_road
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",   // Udaipur lake // from car_road
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",   // India Gate road // from car_road
    ],
    buildings: [
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",   // modern towers
        "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop",   // glass building
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop",   // historic arch
        "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop",   // architecture
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",   // apartments
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",   // building facade
        "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=600&fit=crop",   // modern design
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",   // Jaipur palace
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",   // Taj Mahal
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",   // India monument
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",   // Eiffel Tower // from landmark
        "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&h=600&fit=crop",   // Colosseum // from landmark
        "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=600&fit=crop",   // London // from landmark
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",   // Taj Mahal // from landmark
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",   // monument // from landmark
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",   // Paris // from landmark
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",   // Taj Mahal front // from landmark
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&h=600&fit=crop",   // Gateway of India // from landmark
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // city night // from night_city
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",   // night skyline // from night_city
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop",   // neon city // from night_city
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",   // cityscape night // from night_city
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",   // evening city // from night_city
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",   // city lights // from night_city
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // lights // from night_lights
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",   // night glow // from night_lights
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",   // urban night // from night_lights
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",   // bokeh lights // from night_lights
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",   // sparklers // from night_lights
    ],
    landmark: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",   // Eiffel Tower
        "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&h=600&fit=crop",   // Colosseum
        "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=600&fit=crop",   // London
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",   // Taj Mahal
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",   // monument
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",   // Paris
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",   // Taj Mahal front
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&h=600&fit=crop",   // Gateway of India
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",   // modern towers // from buildings
        "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop",   // glass building // from buildings
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop",   // historic arch // from buildings
        "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop",   // architecture // from buildings
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",   // apartments // from buildings
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",   // building facade // from buildings
        "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=600&fit=crop",   // modern design // from buildings
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",   // Jaipur palace // from buildings
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",   // Taj Mahal // from buildings
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",   // India monument // from buildings
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // city night // from night_city
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",   // night skyline // from night_city
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop",   // neon city // from night_city
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",   // cityscape night // from night_city
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",   // evening city // from night_city
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",   // city lights // from night_city
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // lights // from night_lights
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",   // night glow // from night_lights
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",   // urban night // from night_lights
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",   // bokeh lights // from night_lights
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",   // sparklers // from night_lights
    ],

    // ── NATURE / MOUNTAIN ─────────────────────────────────────────
    mountain: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",   // dramatic peaks
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // snow mountain
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",   // Himalaya style
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop",   // misty mountain
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",   // starry mountain
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",   // alpine
        "https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?w=800&h=600&fit=crop",   // mountain range
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",   // green mountain
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",   // deep forest // from forest
        "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop",   // green woods // from forest
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop",   // tall trees // from forest
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop",   // autumn forest // from forest
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop",   // sunlit forest // from forest
        "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&h=600&fit=crop",   // misty trees // from forest
        "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&h=600&fit=crop",   // enchanted woods // from forest
        "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=800&h=600&fit=crop",   // bamboo grove // from forest
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",   // hiker on trail // from hiking_trail
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",   // adventure walk // from hiking_trail
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",   // forest path // from hiking_trail
        "https://images.unsplash.com/photo-1510227272981-87123e259b17?w=800&h=600&fit=crop",   // mountain path // from hiking_trail
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&h=600&fit=crop",   // trail view // from hiking_trail
        "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?w=800&h=600&fit=crop",   // nature trail // from hiking_trail
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",   // scenic trek // from hiking_trail
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800&h=600&fit=crop",   // mountain hike // from hiking_trail
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&h=600&fit=crop",   // city park // from park_outdoor
        "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800&h=600&fit=crop",   // park bench // from park_outdoor
        "https://images.unsplash.com/photo-1510265236892-329bfd7de7a1?w=800&h=600&fit=crop",   // garden path // from park_outdoor
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=600&fit=crop",   // green park // from park_outdoor
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // rolling hills // from park_outdoor
        "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&h=600&fit=crop",   // flower garden // from park_outdoor
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",   // botanical garden // from park_outdoor
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // mountain vista // from landscape
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",   // green valley // from landscape
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",   // countryside // from landscape
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // aerial green // from landscape
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",   // waterfall // from landscape
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",   // Swiss hills // from landscape
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley // from landscape
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&h=600&fit=crop",   // Munnar tea fields India // from landscape
    ],
    hiking_trail: [
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",   // hiker on trail
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",   // adventure walk
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",   // forest path
        "https://images.unsplash.com/photo-1510227272981-87123e259b17?w=800&h=600&fit=crop",   // mountain path
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&h=600&fit=crop",   // trail view
        "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?w=800&h=600&fit=crop",   // nature trail
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",   // scenic trek
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800&h=600&fit=crop",   // mountain hike
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",   // deep forest // from forest
        "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop",   // green woods // from forest
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop",   // tall trees // from forest
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop",   // autumn forest // from forest
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop",   // sunlit forest // from forest
        "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&h=600&fit=crop",   // misty trees // from forest
        "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&h=600&fit=crop",   // enchanted woods // from forest
        "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=800&h=600&fit=crop",   // bamboo grove // from forest
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",   // dramatic peaks // from mountain
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // snow mountain // from mountain
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",   // Himalaya style // from mountain
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop",   // misty mountain // from mountain
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",   // starry mountain // from mountain
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",   // alpine // from mountain
        "https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?w=800&h=600&fit=crop",   // mountain range // from mountain
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley // from mountain
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",   // green mountain // from mountain
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&h=600&fit=crop",   // city park // from park_outdoor
        "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800&h=600&fit=crop",   // park bench // from park_outdoor
        "https://images.unsplash.com/photo-1510265236892-329bfd7de7a1?w=800&h=600&fit=crop",   // garden path // from park_outdoor
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=600&fit=crop",   // green park // from park_outdoor
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // rolling hills // from park_outdoor
        "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&h=600&fit=crop",   // flower garden // from park_outdoor
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",   // botanical garden // from park_outdoor
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // mountain vista // from landscape
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",   // green valley // from landscape
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",   // countryside // from landscape
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // aerial green // from landscape
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",   // waterfall // from landscape
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",   // Swiss hills // from landscape
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley // from landscape
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&h=600&fit=crop",   // Munnar tea fields India // from landscape
    ],
    forest: [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",   // deep forest
        "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop",   // green woods
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop",   // tall trees
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop",   // autumn forest
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop",   // sunlit forest
        "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&h=600&fit=crop",   // misty trees
        "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&h=600&fit=crop",   // enchanted woods
        "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=800&h=600&fit=crop",   // bamboo grove
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",   // hiker on trail // from hiking_trail
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",   // adventure walk // from hiking_trail
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",   // forest path // from hiking_trail
        "https://images.unsplash.com/photo-1510227272981-87123e259b17?w=800&h=600&fit=crop",   // mountain path // from hiking_trail
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&h=600&fit=crop",   // trail view // from hiking_trail
        "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?w=800&h=600&fit=crop",   // nature trail // from hiking_trail
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",   // scenic trek // from hiking_trail
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800&h=600&fit=crop",   // mountain hike // from hiking_trail
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",   // dramatic peaks // from mountain
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // snow mountain // from mountain
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",   // Himalaya style // from mountain
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop",   // misty mountain // from mountain
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",   // starry mountain // from mountain
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",   // alpine // from mountain
        "https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?w=800&h=600&fit=crop",   // mountain range // from mountain
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley // from mountain
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",   // green mountain // from mountain
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&h=600&fit=crop",   // city park // from park_outdoor
        "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800&h=600&fit=crop",   // park bench // from park_outdoor
        "https://images.unsplash.com/photo-1510265236892-329bfd7de7a1?w=800&h=600&fit=crop",   // garden path // from park_outdoor
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=600&fit=crop",   // green park // from park_outdoor
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // rolling hills // from park_outdoor
        "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&h=600&fit=crop",   // flower garden // from park_outdoor
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",   // botanical garden // from park_outdoor
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // mountain vista // from landscape
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",   // green valley // from landscape
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",   // countryside // from landscape
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // aerial green // from landscape
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",   // waterfall // from landscape
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",   // Swiss hills // from landscape
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley // from landscape
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&h=600&fit=crop",   // Munnar tea fields India // from landscape
    ],
    sunset: [
        "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&h=600&fit=crop",   // ocean sunset
        "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=800&h=600&fit=crop",   // golden sunset
        "https://images.unsplash.com/photo-1506815444479-bfdb1e96c566?w=800&h=600&fit=crop",   // sunset sky
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",   // field sunset
        "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&h=600&fit=crop",   // purple sunset
        "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&h=600&fit=crop",   // mountain sunset
    ],
    park_outdoor: [
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&h=600&fit=crop",   // city park
        "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800&h=600&fit=crop",   // park bench
        "https://images.unsplash.com/photo-1510265236892-329bfd7de7a1?w=800&h=600&fit=crop",   // garden path
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=600&fit=crop",   // green park
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // rolling hills
        "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&h=600&fit=crop",   // flower garden
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",   // botanical garden
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",   // deep forest // from forest
        "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop",   // green woods // from forest
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop",   // tall trees // from forest
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop",   // autumn forest // from forest
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop",   // sunlit forest // from forest
        "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&h=600&fit=crop",   // misty trees // from forest
        "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&h=600&fit=crop",   // enchanted woods // from forest
        "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=800&h=600&fit=crop",   // bamboo grove // from forest
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",   // hiker on trail // from hiking_trail
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",   // adventure walk // from hiking_trail
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",   // forest path // from hiking_trail
        "https://images.unsplash.com/photo-1510227272981-87123e259b17?w=800&h=600&fit=crop",   // mountain path // from hiking_trail
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&h=600&fit=crop",   // trail view // from hiking_trail
        "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?w=800&h=600&fit=crop",   // nature trail // from hiking_trail
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",   // scenic trek // from hiking_trail
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800&h=600&fit=crop",   // mountain hike // from hiking_trail
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",   // dramatic peaks // from mountain
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // snow mountain // from mountain
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",   // Himalaya style // from mountain
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop",   // misty mountain // from mountain
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",   // starry mountain // from mountain
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",   // alpine // from mountain
        "https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?w=800&h=600&fit=crop",   // mountain range // from mountain
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley // from mountain
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",   // green mountain // from mountain
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // mountain vista // from landscape
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",   // green valley // from landscape
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",   // countryside // from landscape
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // aerial green // from landscape
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",   // waterfall // from landscape
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",   // Swiss hills // from landscape
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley // from landscape
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&h=600&fit=crop",   // Munnar tea fields India // from landscape
    ],

    // ── TRANSPORT (HUGE VARIETY - used 6 times!) ──────────────────
    car_road: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",   // road trip scenic
        "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&h=600&fit=crop",   // desert highway
        "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=800&h=600&fit=crop",   // coastal road
        "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop",   // mountain road
        "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=800&h=600&fit=crop",   // city taxi
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",   // bus travel
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop",   // Varanasi ghats India
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&h=600&fit=crop",   // car driving
        "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop",   // rural road India
        "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=800&h=600&fit=crop",   // train window
        "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop",   // scenic drive
        "https://images.unsplash.com/photo-1519818187420-8e49de7adeef?w=800&h=600&fit=crop",   // tuk tuk
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan road
        "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800&h=600&fit=crop",   // winding road
        "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?w=800&h=600&fit=crop",   // evening road
        "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&h=600&fit=crop",   // countryside drive
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop",   // sunset road
        "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&h=600&fit=crop",   // morning drive landscape
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",   // travel bags car
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",   // lake road trip
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",   // airport taxi
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",   // road ahead
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop",   // Mediterranean coast drive
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop",   // tropical travel
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",   // scenic vista
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",   // morning fog road
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",   // garden arrival
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop",   // Italian coast
        "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&h=600&fit=crop",   // Rajasthan desert road
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop",   // mountain valley road
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",   // Kerala India
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // Swiss valley drive
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",   // adventure travel
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=600&fit=crop",   // golden hour drive
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",   // camping road trip
        "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=600&fit=crop",   // travel wanderlust
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=600&fit=crop",   // sunrise journey
        "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop",   // backpacker travel
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",   // nature drive
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",   // Udaipur lake
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",   // India Gate road
        "https://images.unsplash.com/photo-1515876305430-f06edab8282a?w=800&h=600&fit=crop",   // highway sunset // from highway
        "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop",   // winding highway // from highway
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop",   // coastal highway // from highway
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",   // adventure highway // from highway
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",   // NYC skyline // from city_street
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",   // city avenue // from city_street
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",   // urban skyline // from city_street
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",   // city at dusk // from city_street
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop",   // night street // from city_street
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // downtown // from city_street
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",   // urban night // from city_street
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",   // Indian street // from city_street
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",   // European town // from city_street
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",   // London bridge // from city_street
    ],
    highway: [
        "https://images.unsplash.com/photo-1515876305430-f06edab8282a?w=800&h=600&fit=crop",   // highway sunset
        "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop",   // winding highway
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop",   // coastal highway
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",   // adventure highway
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",   // road trip scenic // from car_road
        "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&h=600&fit=crop",   // desert highway // from car_road
        "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=800&h=600&fit=crop",   // coastal road // from car_road
        "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop",   // mountain road // from car_road
        "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=800&h=600&fit=crop",   // city taxi // from car_road
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",   // bus travel // from car_road
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop",   // Varanasi ghats India // from car_road
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&h=600&fit=crop",   // car driving // from car_road
        "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop",   // rural road India // from car_road
        "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=800&h=600&fit=crop",   // train window // from car_road
        "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop",   // scenic drive // from car_road
        "https://images.unsplash.com/photo-1519818187420-8e49de7adeef?w=800&h=600&fit=crop",   // tuk tuk // from car_road
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan road // from car_road
        "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800&h=600&fit=crop",   // winding road // from car_road
        "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?w=800&h=600&fit=crop",   // evening road // from car_road
        "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&h=600&fit=crop",   // countryside drive // from car_road
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop",   // sunset road // from car_road
        "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&h=600&fit=crop",   // morning drive landscape // from car_road
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",   // travel bags car // from car_road
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",   // lake road trip // from car_road
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",   // airport taxi // from car_road
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",   // road ahead // from car_road
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop",   // Mediterranean coast drive // from car_road
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop",   // tropical travel // from car_road
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",   // scenic vista // from car_road
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",   // morning fog road // from car_road
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",   // garden arrival // from car_road
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop",   // Italian coast // from car_road
        "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&h=600&fit=crop",   // Rajasthan desert road // from car_road
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop",   // mountain valley road // from car_road
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",   // Kerala India // from car_road
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // Swiss valley drive // from car_road
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",   // adventure travel // from car_road
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=600&fit=crop",   // golden hour drive // from car_road
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",   // camping road trip // from car_road
        "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=600&fit=crop",   // travel wanderlust // from car_road
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=600&fit=crop",   // sunrise journey // from car_road
        "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop",   // backpacker travel // from car_road
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",   // nature drive // from car_road
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",   // Udaipur lake // from car_road
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",   // India Gate road // from car_road
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",   // NYC skyline // from city_street
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",   // city avenue // from city_street
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",   // urban skyline // from city_street
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",   // city at dusk // from city_street
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop",   // night street // from city_street
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // downtown // from city_street
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",   // urban night // from city_street
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",   // Indian street // from city_street
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",   // European town // from city_street
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",   // London bridge // from city_street
    ],
    airport: [
        "https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=800&h=600&fit=crop",   // airport terminal
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",   // airport lobby
        "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&h=600&fit=crop",   // check-in counter
        "https://images.unsplash.com/photo-1540339832862-474599807836?w=800&h=600&fit=crop",   // runway
        "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&h=600&fit=crop",   // airport window
        "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=600&fit=crop",   // luggage belt
        "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=800&h=600&fit=crop",   // boarding pass
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",   // airplane window // from airplane
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop",   // sky view // from airplane
        "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&h=600&fit=crop",   // plane wing // from airplane
        "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&h=600&fit=crop",   // airplane cabin // from airplane
        "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&h=600&fit=crop",   // clouds from plane // from airplane
        "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=600&fit=crop",   // sunset from plane // from airplane
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&h=600&fit=crop",   // travel concept // from airplane
    ],
    airplane: [
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",   // airplane window
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop",   // sky view
        "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&h=600&fit=crop",   // plane wing
        "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&h=600&fit=crop",   // airplane cabin
        "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&h=600&fit=crop",   // clouds from plane
        "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=600&fit=crop",   // sunset from plane
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&h=600&fit=crop",   // travel concept
        "https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=800&h=600&fit=crop",   // airport terminal // from airport
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",   // airport lobby // from airport
        "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&h=600&fit=crop",   // check-in counter // from airport
        "https://images.unsplash.com/photo-1540339832862-474599807836?w=800&h=600&fit=crop",   // runway // from airport
        "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&h=600&fit=crop",   // airport window // from airport
        "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=600&fit=crop",   // luggage belt // from airport
        "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=800&h=600&fit=crop",   // boarding pass // from airport
    ],

    // ── FOOD / CAFE / RESTAURANT ──────────────────────────────────
    restaurant: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",   // fancy restaurant
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",   // restaurant interior
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",   // dining area
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",   // plated food
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop",   // restaurant table
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",   // outdoor dining
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",   // Indian restaurant thali
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800&h=600&fit=crop",   // cozy bistro
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop",   // dinner table
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",   // gourmet plate // from food
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&h=600&fit=crop",   // brunch spread // from food
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=600&fit=crop",   // pizza // from food
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",   // colorful salad // from food
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",   // pizza fresh // from food
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",   // pancakes // from food
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",   // healthy bowl // from food
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",   // BBQ grill // from food
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",   // Indian thali // from food
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop",   // biryani // from food
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",   // Indian meal // from food
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",   // samosa // from food
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop",   // toast & eggs // from breakfast
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=600&fit=crop",   // breakfast table // from breakfast
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop",   // coffee & pastry // from breakfast
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&h=600&fit=crop",   // pancake stack // from breakfast
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",   // coffee cup // from breakfast
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",   // waffles // from breakfast
    ],
    cafe: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",   // fancy restaurant // from restaurant
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",   // restaurant interior // from restaurant
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",   // dining area // from restaurant
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",   // plated food // from restaurant
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop",   // restaurant table // from restaurant
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",   // outdoor dining // from restaurant
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",   // Indian restaurant thali // from restaurant
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800&h=600&fit=crop",   // cozy bistro // from restaurant
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop",   // dinner table // from restaurant
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",   // gourmet plate // from food
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&h=600&fit=crop",   // brunch spread // from food
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=600&fit=crop",   // pizza // from food
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",   // colorful salad // from food
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",   // pizza fresh // from food
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",   // pancakes // from food
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",   // healthy bowl // from food
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",   // BBQ grill // from food
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",   // Indian thali // from food
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop",   // biryani // from food
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",   // Indian meal // from food
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",   // samosa // from food
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop",   // toast & eggs // from breakfast
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=600&fit=crop",   // breakfast table // from breakfast
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop",   // coffee & pastry // from breakfast
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&h=600&fit=crop",   // pancake stack // from breakfast
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",   // coffee cup // from breakfast
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",   // waffles // from breakfast
    ],
    food: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",   // gourmet plate
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&h=600&fit=crop",   // brunch spread
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=600&fit=crop",   // pizza
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",   // colorful salad
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",   // pizza fresh
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",   // pancakes
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",   // healthy bowl
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",   // BBQ grill
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",   // Indian thali
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop",   // biryani
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",   // Indian meal
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",   // samosa
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",   // fancy restaurant // from restaurant
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",   // restaurant interior // from restaurant
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",   // dining area // from restaurant
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",   // plated food // from restaurant
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop",   // restaurant table // from restaurant
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",   // outdoor dining // from restaurant
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",   // Indian restaurant thali // from restaurant
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800&h=600&fit=crop",   // cozy bistro // from restaurant
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop",   // dinner table // from restaurant
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop",   // toast & eggs // from breakfast
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=600&fit=crop",   // breakfast table // from breakfast
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop",   // coffee & pastry // from breakfast
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&h=600&fit=crop",   // pancake stack // from breakfast
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",   // coffee cup // from breakfast
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",   // waffles // from breakfast
    ],
    breakfast: [
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop",   // toast & eggs
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=600&fit=crop",   // breakfast table
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop",   // coffee & pastry
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&h=600&fit=crop",   // pancake stack
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",   // coffee cup
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",   // waffles
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",   // fancy restaurant // from restaurant
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",   // restaurant interior // from restaurant
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",   // dining area // from restaurant
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",   // plated food // from restaurant
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop",   // restaurant table // from restaurant
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",   // outdoor dining // from restaurant
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",   // Indian restaurant thali // from restaurant
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800&h=600&fit=crop",   // cozy bistro // from restaurant
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop",   // dinner table // from restaurant
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",   // gourmet plate // from food
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&h=600&fit=crop",   // brunch spread // from food
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=600&fit=crop",   // pizza // from food
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",   // colorful salad // from food
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",   // pizza fresh // from food
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",   // pancakes // from food
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",   // healthy bowl // from food
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",   // BBQ grill // from food
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",   // Indian thali // from food
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop",   // biryani // from food
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",   // Indian meal // from food
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",   // samosa // from food
    ],

    // ── PEOPLE / GATHERING ────────────────────────────────────────
    friends_group: [
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",   // friends walking
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",   // beach group
        "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&h=600&fit=crop",   // selfie group
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop",   // friends outdoor
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",   // team working
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",   // graduation group
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",   // diverse friends
        "https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=800&h=600&fit=crop",   // bonfire friends
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop",   // rooftop gathering
        "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=800&h=600&fit=crop",   // celebration // from party
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",   // concert lights // from party
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",   // festival crowd // from party
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",   // sparklers party // from party
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",   // balloons party // from party
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop",   // dance party // from party
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=600&fit=crop",   // DJ night // from party
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop",   // champagne toast // from party
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",   // Holi celebration India // from party
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",   // conference // from gathering_formal
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",   // formal event // from gathering_formal
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",   // seminar // from gathering_formal
        "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop",   // formal gathering // from gathering_formal
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",   // wedding setup // from gathering_formal
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",   // Indian wedding // from gathering_formal
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",   // wedding ceremony // from gathering_formal
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",   // concert crowd // from crowd
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",   // festival crowd // from crowd
        "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop",   // street crowd // from crowd
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",   // night crowd // from crowd
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&h=600&fit=crop",   // marathon crowd // from crowd
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",   // Holi festival // from crowd
    ],
    party: [
        "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=800&h=600&fit=crop",   // celebration
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",   // concert lights
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",   // festival crowd
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",   // sparklers party
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",   // balloons party
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop",   // dance party
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=600&fit=crop",   // DJ night
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop",   // champagne toast
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",   // Holi celebration India
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",   // friends walking // from friends_group
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",   // beach group // from friends_group
        "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&h=600&fit=crop",   // selfie group // from friends_group
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop",   // friends outdoor // from friends_group
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",   // team working // from friends_group
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",   // graduation group // from friends_group
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",   // diverse friends // from friends_group
        "https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=800&h=600&fit=crop",   // bonfire friends // from friends_group
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop",   // rooftop gathering // from friends_group
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",   // conference // from gathering_formal
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",   // formal event // from gathering_formal
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",   // seminar // from gathering_formal
        "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop",   // formal gathering // from gathering_formal
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",   // wedding setup // from gathering_formal
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",   // Indian wedding // from gathering_formal
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",   // wedding ceremony // from gathering_formal
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",   // concert crowd // from crowd
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",   // festival crowd // from crowd
        "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop",   // street crowd // from crowd
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",   // night crowd // from crowd
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&h=600&fit=crop",   // marathon crowd // from crowd
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",   // Holi festival // from crowd
    ],
    gathering_formal: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",   // conference
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",   // formal event
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",   // seminar
        "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop",   // formal gathering
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",   // wedding setup
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",   // Indian wedding
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",   // wedding ceremony
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",   // friends walking // from friends_group
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",   // beach group // from friends_group
        "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&h=600&fit=crop",   // selfie group // from friends_group
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop",   // friends outdoor // from friends_group
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",   // team working // from friends_group
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",   // graduation group // from friends_group
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",   // diverse friends // from friends_group
        "https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=800&h=600&fit=crop",   // bonfire friends // from friends_group
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop",   // rooftop gathering // from friends_group
        "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=800&h=600&fit=crop",   // celebration // from party
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",   // concert lights // from party
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",   // festival crowd // from party
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",   // sparklers party // from party
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",   // balloons party // from party
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop",   // dance party // from party
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=600&fit=crop",   // DJ night // from party
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop",   // champagne toast // from party
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",   // Holi celebration India // from party
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",   // concert crowd // from crowd
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",   // festival crowd // from crowd
        "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop",   // street crowd // from crowd
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",   // night crowd // from crowd
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&h=600&fit=crop",   // marathon crowd // from crowd
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",   // Holi festival // from crowd
    ],
    crowd: [
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",   // concert crowd
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",   // festival crowd
        "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop",   // street crowd
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",   // night crowd
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&h=600&fit=crop",   // marathon crowd
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",   // Holi festival
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",   // friends walking // from friends_group
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",   // beach group // from friends_group
        "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&h=600&fit=crop",   // selfie group // from friends_group
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop",   // friends outdoor // from friends_group
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",   // team working // from friends_group
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",   // graduation group // from friends_group
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",   // diverse friends // from friends_group
        "https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=800&h=600&fit=crop",   // bonfire friends // from friends_group
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop",   // rooftop gathering // from friends_group
        "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=800&h=600&fit=crop",   // celebration // from party
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",   // concert lights // from party
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",   // festival crowd // from party
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",   // sparklers party // from party
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",   // balloons party // from party
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop",   // dance party // from party
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=600&fit=crop",   // DJ night // from party
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop",   // champagne toast // from party
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",   // Holi celebration India // from party
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",   // conference // from gathering_formal
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",   // formal event // from gathering_formal
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",   // seminar // from gathering_formal
        "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop",   // formal gathering // from gathering_formal
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",   // wedding setup // from gathering_formal
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",   // Indian wedding // from gathering_formal
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",   // wedding ceremony // from gathering_formal
    ],

    // ── INDOORS / DAILY ───────────────────────────────────────────
    home_interior: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",   // living room
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop",   // cozy living
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",   // bedroom
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop",   // kitchen counter
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",   // bookshelf
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",   // apartment view
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",   // modern apartment
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",   // minimalist room
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",   // hotel bed // from hotel_room
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",   // luxury room // from hotel_room
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",   // modern room // from hotel_room
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",   // cozy bed // from hotel_room
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",   // twin beds // from hotel_room
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",   // boutique room // from hotel_room
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",   // elegant suite // from hotel_room
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",   // hotel interior // from hotel_room
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",   // resort room // from hotel_room
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop",   // warm room // from hotel_room
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",   // resort exterior // from hotel_exterior
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",   // grand hotel // from hotel_exterior
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",   // pool hotel // from hotel_exterior
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",   // tropical hotel // from hotel_exterior
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop",   // heritage hotel // from hotel_exterior
    ],
    desk_workspace: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",   // coding desk
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",   // laptop open
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",   // team working
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=600&fit=crop",   // workspace
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop",   // monitor desk
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",   // MacBook work
    ],
    campus: [
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",   // graduation
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",   // university building
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop",   // campus walkway
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop",   // students
        "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&h=600&fit=crop",   // Indian college
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",   // graduates
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",   // empty classroom // from classroom
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",   // lecture hall // from classroom
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",   // teaching // from classroom
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",   // study materials // from classroom
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",   // school building // from classroom
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",   // library shelves // from library
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",   // grand library // from library
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",   // books stacked // from library
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",   // open books // from library
        "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",   // reading corner // from library
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop",   // stacked books // from library
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",   // laptop cafe // from laptop_study
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",   // coding screen // from laptop_study
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",   // writing notes // from laptop_study
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop",   // studying books // from laptop_study
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop",   // desk study // from laptop_study
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",   // laptop work // from laptop_study
    ],
    classroom: [
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",   // empty classroom
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",   // lecture hall
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",   // teaching
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",   // study materials
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",   // school building
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",   // graduation // from campus
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",   // university building // from campus
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop",   // campus walkway // from campus
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop",   // students // from campus
        "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&h=600&fit=crop",   // Indian college // from campus
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",   // graduates // from campus
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",   // library shelves // from library
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",   // grand library // from library
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",   // books stacked // from library
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",   // open books // from library
        "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",   // reading corner // from library
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop",   // stacked books // from library
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",   // laptop cafe // from laptop_study
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",   // coding screen // from laptop_study
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",   // writing notes // from laptop_study
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop",   // studying books // from laptop_study
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop",   // desk study // from laptop_study
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",   // laptop work // from laptop_study
    ],
    library: [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",   // library shelves
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",   // grand library
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",   // books stacked
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",   // open books
        "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",   // reading corner
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop",   // stacked books
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",   // graduation // from campus
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",   // university building // from campus
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop",   // campus walkway // from campus
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop",   // students // from campus
        "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&h=600&fit=crop",   // Indian college // from campus
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",   // graduates // from campus
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",   // empty classroom // from classroom
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",   // lecture hall // from classroom
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",   // teaching // from classroom
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",   // study materials // from classroom
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",   // school building // from classroom
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",   // laptop cafe // from laptop_study
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",   // coding screen // from laptop_study
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",   // writing notes // from laptop_study
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop",   // studying books // from laptop_study
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop",   // desk study // from laptop_study
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",   // laptop work // from laptop_study
    ],
    laptop_study: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",   // laptop cafe
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",   // coding screen
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",   // writing notes
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop",   // studying books
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop",   // desk study
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",   // laptop work
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",   // graduation // from campus
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",   // university building // from campus
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop",   // campus walkway // from campus
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop",   // students // from campus
        "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&h=600&fit=crop",   // Indian college // from campus
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",   // graduates // from campus
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",   // empty classroom // from classroom
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",   // lecture hall // from classroom
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",   // teaching // from classroom
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",   // study materials // from classroom
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",   // school building // from classroom
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",   // library shelves // from library
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",   // grand library // from library
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",   // books stacked // from library
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",   // open books // from library
        "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",   // reading corner // from library
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop",   // stacked books // from library
    ],

    // ── HEALTH / CLINIC ───────────────────────────────────────────
    clinic: [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",   // hospital hallway
        "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&h=600&fit=crop",   // doctor office
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop",   // hospital room
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop",   // stethoscope
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop",   // medical team
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",   // waiting room
    ],
    medicine: [
        "/demo-images/medicine_desk_1_1789837098828.jpg",
        "/demo-images/medicine_desk_2_1789837113073.jpg",
        "/demo-images/medicine_desk_3_1789837128011.jpg",
        "/demo-images/medicine_desk_4_1789837141119.jpg",
        "/demo-images/medicine_desk_5_1789837212512.jpg",
    ],
    documents: [
        "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",   // documents
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",   // papers
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",   // receipts
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",   // signing papers
    ],

    // ── RETAIL / MARKET ───────────────────────────────────────────
    mall: [
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop",   // mall interior
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",   // shopping bags
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",   // boutique store
        "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=800&h=600&fit=crop",   // escalator
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",   // retail store
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop",   // clothing store
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",   // store display // from store_products
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",   // shopping // from store_products
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",   // products // from store_products
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",   // shopping cart // from store_products
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=600&fit=crop",   // market goods // from store_products
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop",   // clothing rack // from store_products
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",   // fruit market // from market_stalls
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",   // vegetable stall // from market_stalls
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=600&fit=crop",   // local market // from market_stalls
        "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=800&h=600&fit=crop",   // street vendor // from market_stalls
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",   // market stall // from market_stalls
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop",   // spice market India // from market_stalls
    ],
    store_products: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",   // store display
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",   // shopping
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",   // products
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",   // shopping cart
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=600&fit=crop",   // market goods
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop",   // clothing rack
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop",   // mall interior // from mall
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",   // shopping bags // from mall
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",   // boutique store // from mall
        "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=800&h=600&fit=crop",   // escalator // from mall
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",   // retail store // from mall
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop",   // clothing store // from mall
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",   // fruit market // from market_stalls
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",   // vegetable stall // from market_stalls
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=600&fit=crop",   // local market // from market_stalls
        "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=800&h=600&fit=crop",   // street vendor // from market_stalls
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",   // market stall // from market_stalls
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop",   // spice market India // from market_stalls
    ],
    market_stalls: [
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",   // fruit market
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",   // vegetable stall
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=600&fit=crop",   // local market
        "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=800&h=600&fit=crop",   // street vendor
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",   // market stall
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop",   // spice market India
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop",   // mall interior // from mall
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",   // shopping bags // from mall
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",   // boutique store // from mall
        "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=800&h=600&fit=crop",   // escalator // from mall
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",   // retail store // from mall
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop",   // clothing store // from mall
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",   // store display // from store_products
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",   // shopping // from store_products
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",   // products // from store_products
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",   // shopping cart // from store_products
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=600&fit=crop",   // market goods // from store_products
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop",   // clothing rack // from store_products
    ],
    festival: [
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",   // music festival
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",   // concert stage
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",   // festival crowd
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",   // live music
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",   // festival night
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",   // Holi India
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=600&fit=crop",   // DJ booth
    ],

    // ── PETS ──────────────────────────────────────────────────────
    pets: [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop",   // golden retriever
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop",   // puppy
        "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=800&h=600&fit=crop",   // cat
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop",   // dogs playing
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop",   // dog outdoors
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop",   // orange cat
    ],

    // ── NIGHT ─────────────────────────────────────────────────────
    night_city: [
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // city night
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",   // night skyline
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop",   // neon city
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",   // cityscape night
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",   // evening city
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",   // city lights
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",   // modern towers // from buildings
        "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop",   // glass building // from buildings
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop",   // historic arch // from buildings
        "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop",   // architecture // from buildings
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",   // apartments // from buildings
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",   // building facade // from buildings
        "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=600&fit=crop",   // modern design // from buildings
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",   // Jaipur palace // from buildings
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",   // Taj Mahal // from buildings
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",   // India monument // from buildings
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",   // Eiffel Tower // from landmark
        "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&h=600&fit=crop",   // Colosseum // from landmark
        "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=600&fit=crop",   // London // from landmark
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",   // Taj Mahal // from landmark
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",   // monument // from landmark
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",   // Paris // from landmark
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",   // Taj Mahal front // from landmark
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&h=600&fit=crop",   // Gateway of India // from landmark
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // lights // from night_lights
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",   // night glow // from night_lights
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",   // urban night // from night_lights
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",   // bokeh lights // from night_lights
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",   // sparklers // from night_lights
    ],
    night_lights: [
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // lights
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",   // night glow
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",   // urban night
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",   // bokeh lights
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",   // sparklers
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",   // modern towers // from buildings
        "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop",   // glass building // from buildings
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop",   // historic arch // from buildings
        "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop",   // architecture // from buildings
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",   // apartments // from buildings
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",   // building facade // from buildings
        "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=600&fit=crop",   // modern design // from buildings
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",   // Jaipur palace // from buildings
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",   // Taj Mahal // from buildings
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",   // India monument // from buildings
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",   // Eiffel Tower // from landmark
        "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&h=600&fit=crop",   // Colosseum // from landmark
        "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=600&fit=crop",   // London // from landmark
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",   // Taj Mahal // from landmark
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",   // monument // from landmark
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",   // Paris // from landmark
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",   // Taj Mahal front // from landmark
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&h=600&fit=crop",   // Gateway of India // from landmark
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",   // city night // from night_city
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",   // night skyline // from night_city
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop",   // neon city // from night_city
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",   // cityscape night // from night_city
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",   // evening city // from night_city
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",   // city lights // from night_city
    ],

    // ── LANDSCAPE ─────────────────────────────────────────────────
    landscape: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // mountain vista
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",   // green valley
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",   // countryside
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // aerial green
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",   // waterfall
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",   // Swiss hills
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&h=600&fit=crop",   // Munnar tea fields India
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",   // deep forest // from forest
        "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop",   // green woods // from forest
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop",   // tall trees // from forest
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop",   // autumn forest // from forest
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop",   // sunlit forest // from forest
        "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&h=600&fit=crop",   // misty trees // from forest
        "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&h=600&fit=crop",   // enchanted woods // from forest
        "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?w=800&h=600&fit=crop",   // bamboo grove // from forest
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",   // hiker on trail // from hiking_trail
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",   // adventure walk // from hiking_trail
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",   // forest path // from hiking_trail
        "https://images.unsplash.com/photo-1510227272981-87123e259b17?w=800&h=600&fit=crop",   // mountain path // from hiking_trail
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&h=600&fit=crop",   // trail view // from hiking_trail
        "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?w=800&h=600&fit=crop",   // nature trail // from hiking_trail
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",   // scenic trek // from hiking_trail
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800&h=600&fit=crop",   // mountain hike // from hiking_trail
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",   // dramatic peaks // from mountain
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",   // snow mountain // from mountain
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",   // Himalaya style // from mountain
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop",   // misty mountain // from mountain
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",   // starry mountain // from mountain
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",   // alpine // from mountain
        "https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?w=800&h=600&fit=crop",   // mountain range // from mountain
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",   // Himalayan valley // from mountain
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=600&fit=crop",   // green mountain // from mountain
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&h=600&fit=crop",   // city park // from park_outdoor
        "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800&h=600&fit=crop",   // park bench // from park_outdoor
        "https://images.unsplash.com/photo-1510265236892-329bfd7de7a1?w=800&h=600&fit=crop",   // garden path // from park_outdoor
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=600&fit=crop",   // green park // from park_outdoor
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",   // rolling hills // from park_outdoor
        "https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800&h=600&fit=crop",   // flower garden // from park_outdoor
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",   // botanical garden // from park_outdoor
    ],
};

const poolUsage: Record<string, number> = {};

// Convenience function: get a URL from a pool
export function getPoolImageUrl(poolName: string, index: number, w = 800, h = 600): { url: string; highUrl: string } {
    const pool = VISUAL_POOLS[poolName] || VISUAL_POOLS['landscape'];
    
    // Group semantically merged pools to share the same counter
    // This prevents different events of the same group from repeating the same sequence starting at index 0
    const groupMap: Record<string, string> = {
        'highway': 'road_group', 'car_road': 'road_group', 'city_street': 'road_group',
        'forest': 'nature_group', 'hiking_trail': 'nature_group', 'mountain': 'nature_group', 'park_outdoor': 'nature_group', 'landscape': 'nature_group',
        'beach': 'water_group', 'ocean': 'water_group',
        'cafe': 'dining_group', 'restaurant': 'dining_group', 'food': 'dining_group', 'breakfast': 'dining_group',
        'hotel_room': 'hotel_group', 'home_interior': 'hotel_group', 'hotel_exterior': 'hotel_group',
        'airport': 'flight_group', 'airplane': 'flight_group',
        'friends_group': 'people_group', 'party': 'people_group', 'gathering_formal': 'people_group', 'crowd': 'people_group',
        'campus': 'school_group', 'classroom': 'school_group', 'library': 'school_group', 'laptop_study': 'school_group',
        'clinic': 'medical_group', 'documents': 'medical_group',
        'buildings': 'city_group', 'landmark': 'city_group', 'night_city': 'city_group', 'night_lights': 'city_group',
        'mall': 'shopping_group', 'store_products': 'shopping_group', 'market_stalls': 'shopping_group'
    };
    
    const counterKey = groupMap[poolName] || poolName;
    const usageCount = poolUsage[counterKey] || 0;
    poolUsage[counterKey] = usageCount + 1;

    // Simply step through the pool sequentially based on usage count
    // This ensures EVERY image in the pool is used before any repetition occurs
    const hash = usageCount % pool.length;
    let id = pool[hash];

    if (typeof id === 'string') {
        // For Unsplash URLs, create a higher-res version for lightbox
        const highUrl = typeof id === 'string' && id.includes('unsplash.com')
            ? id.replace('w=800', 'w=1600').replace('h=600', 'h=1200')
            : id;
        return { url: id, highUrl };
    }
    return {
        url: `https://picsum.photos/id/${id}/${w}/${h}`,
        highUrl: `https://picsum.photos/id/${id}/1200/1200`
    };
}
