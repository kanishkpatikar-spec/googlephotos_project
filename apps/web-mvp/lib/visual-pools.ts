// ============================================================
// VISUAL POOLS — memory-demo-v2-720
// ============================================================
// Each pool maps a thematic category to an array of Picsum photo IDs
// that have been selected to visually represent that category.
//
// These pools are used by the dataset generator to assign
// visually-appropriate images to each event in the 12-episode structure.
//
// Picsum IDs sourced from https://picsum.photos — all images are
// from Unsplash (https://unsplash.com) and are free to use.
// ============================================================

export const VISUAL_POOLS: Record<string, (number | string)[]> = {
    // ── ACCOMMODATION ──────────────────────────────────────────
    hotel_room: [
        "https://upload.wikimedia.org/wikipedia/commons/b/b4/Double_room_of_Conscious_Hotel_The_Tire_Staion_2024-11-26.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/5d/Hotel_Room_San_Francisco_California_June_1987_-_02.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/14/HK_TKT_%E5%A4%A7%E8%A7%92%E5%92%80%E9%81%93_86_Tai_Kok_Tsui_Road_%E4%B9%9D%E9%BE%8D%E7%8F%80%E9%BA%97%E9%85%92%E5%BA%97_Rosedale_Kowloon_Hotel_room_bedroom_September_2021_SS2_01.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/92/Hotel_room_in_Paris%2C_France%2C_with_metal-sphere-lamp_with_reflections_of_photographer%2C_2013.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Millican_Dalton%27s_cave-_view_of_%22living_room%22_from_%22bedroom%22.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/73/Bancroft_Hotel%2C_Berkeley%2C_California_-_Room_with_ceiling_fan.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/62/Boys_Hostel_Room.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6e/Hotel_room_at_Kings_Hotel_Munich.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/GD_%E5%BB%A3%E6%9D%B1_Guangdong_%E5%BB%A3%E5%B7%9E_Guangzhou_Huangpu_MUSTEL_Hotel_Knowledge_City_bed_room_double_sigle_beds_June_2025_R12S_01.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Novotel_room.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/1b/Aria_Resort_and_Casino_-_Hotel_room_-_Sarah_Stierch_-_Feb_2019_03.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/4f/MC_%E6%BE%B3%E9%96%80_Macau_%E6%BE%B3%E9%96%80%E5%8D%8A%E5%B3%B6_Macao_Peninsula_%E5%BE%97%E5%8B%9D%E9%A6%AC%E8%B7%AF_2_Estrada_da_Vit%C3%B3ria_%E7%9A%87%E9%83%BD%E9%85%92%E5%BA%97_Royal_Macau_Hotel_hotel_room_supply_items_November_2024_R12S_107.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/5c/Pensacola_Hotel_Room_Fun_July_2017.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/1b/Hotel_room_bedroom_in_building_on_Chapel_Street%2C_Salford%2C_Greater_Manchester%2C_England%2C_on_5_October_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Pensacola_Hotel_Room_Fun_July_2017_-_Lounging.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/45/Leonardo_Royal_Hotel_Frankfurt_room.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/89/1946-07-01_Hotel_Edison_Green_Room_bar%2C_ball_room%2C_dining_room%2C_chamber_A.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/ca/Days_Inn_motel_room_Needles_CA_2026-04-04_19-12-45_1.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/ba/Cozumel_Caribe_Hotel_Room_1973.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/81/Dining_Lounge_of_Hotel_Nusantara_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/4d/A_Comfort_Inn_%26_Suites_hotel_guest_room_in_Huntingdon%2C_Pennsylvania_12.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Room_at_the_Toy_Story_Hotel_in_Tokyo_Disney_Resort.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/ba/Continental_Hotel_Zara_%28former_Hung%C3%A1ria_Bath%29_room._-_Budapest.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/cf/Room_in_the_Copley_Plaza_Hotel%2C_Boston%2C_May_1975_02.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/70/GD_%E5%BB%A3%E6%9D%B1_Guangdong_%E5%BB%A3%E5%B7%9E_Guangzhou_Huangpu_MUSTEL_Hotel_Knowledge_City_%E5%96%AE%E4%BA%BA%E5%BA%8A_bed_room_double_sigle_beds_June_2025_R12S_06.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/86/Renaissance_Reno_-_June_2019_-_Stierch_03.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/95/Margaritaville_Island_Hotel_-_April_2026_-_Sarah_Stierch_03.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    hotel_exterior: [
        252,
        255,
        272,
        282,
        293,
        304,
        565,
        566,
        610,
        611
    ],

    // ── BEACH & COAST ──────────────────────────────────────────
    beach: [
        564,
        568,
        454,
        473,
        533,
        559,
        571
    ],
    ocean: [
        594,
        596,
        618,
        628,
        634,
        637,
        639,
        514
    ],

    // ── URBAN & ARCHITECTURE ───────────────────────────────────
    city_street: [
        "https://upload.wikimedia.org/wikipedia/commons/b/b7/Urban_street_03_%E2%80%93_Preview_%28Andreas_Mischok_via_Poly_Haven%29.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/17/Urban_street_01_%E2%80%93_Preview_%28Andreas_Mischok_via_Poly_Haven%29.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d3/Cape_Town_%28ZA%29%2C_Wale_Street_--_2024_--_3536.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/df/Backplate_%E2%80%93_Urban_Courtyard_02_%28Sergej_Majboroda_via_Poly_Haven%29_DSC_6776_RAW-Export.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/ff/Urban_Street_Furniture_-_geograph.org.uk_-_6735976.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d3/Tiny_urban_park_between_Hitec_City_and_Timmidkunta_%2825604%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/61/Urban_toadflax%2C_corner_of_Meriden_Street_and_Bordesley_Street%2C_Birmingham_-_geograph.org.uk_-_6838979.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/18/2010.12_-_%27Photo_of_a_Dutch_winter_still-life_in_snow_outdoors%2C_a_bicycle_wheel_in_the_snow%2C_Amsterdam_city%3B_Dutch_urban_photography_in_the_public_domain_by_Fons_Heijnsbroek%3B_The_Netherlands%2C_geotagged_photo_%2827625575802%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/85/2016.04_-_Amsterdam_photo%2C_Urban_nature%3B_a_street-view_over_Sarphatistraat_in_Amsterdam%2C_in_the_light_of_Spring_-_geotagged_free_urban_picture%2C_in_public_domain_Commons%3B_Dutch_photography%2C_Fons_Heijnsbroek%2C_The_Netherlands_%2825637863963%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/Urban_street_04_%E2%80%93_Preview_%28Andreas_Mischok_via_Poly_Haven%29.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/1a/Urban_street_01_%E2%80%93_Panorama_%28Andreas_Mischok_via_Poly_Haven%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ad/Urban_courtyard_02_%E2%80%93_Preview_%28Sergej_Majboroda_via_Poly_Haven%29.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/ca/The_City_%28198895997%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Urban_street_02_%E2%80%93_Preview_%28Andreas_Mischok_via_Poly_Haven%29.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Urban_street_at_Kaduna.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/23/Qom_city_Photos%2C_Iran_country_Wallpaper%2C_Shia_Muslim_religion%2C_Mostafa_Meraji-_Urban_landscapes_-_City_Design_07.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Tiny_urban_park_between_Hitec_City_and_Timmidkunta.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/84/Photo_The_urban_police_of_Milan_while_using_a_noise_measurement_device_for_sound_level_control_on_city_streets_1955_-_Touring_Club_Italiano_07_0626.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/69/Urban_Outfitters%2C_Oxford_Street_-_geograph.org.uk_-_7427993.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Photo_of_green_Spring_nature_in_a_long_garden_along_the_street_Sarphatistraat_in_Amsterdam_city_street_photography_in_The_Netherlands_in_free_download_nature_photo_in_high_resolution.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Tokyo_Tower%2C_Minato_City.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/83/Urban_street_04_%E2%80%93_Panorama_%28Andreas_Mischok_via_Poly_Haven%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Timorplein_square_in_neighbourhood_Indische_buurt_of_Amsterdam_city_with_an_urban_park_and_former_brick_school_building_-_free_street_photo_by_Fons_Heijnsbroek.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/26/Urban_street_03_%E2%80%93_Panorama_%28Andreas_Mischok_via_Poly_Haven%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b4/Urban_two-storey_wooden_house.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Urban_Fox_-_Corn_Street_-_geograph.org.uk_-_6922740.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Urban_Outfitters_-_Albion_Street_-_geograph.org.uk_-_1963726.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Urban_street_02_%E2%80%93_Panorama_%28Andreas_Mischok_via_Poly_Haven%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/2016.03_-_Amsterdam_photo_of_street-painting_art_on_the_wall_at_the_canal-street_Prinsengracht%3B_geotagged_free_urban_picture%2C_in_public_domain_Commons%3B_Dutch_photography%2C_Fons_Heijnsbroek%2C_The_Netherlands_%2825919888942%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/84/2016.10_-_Amsterdam_in_photo_-_%27Old_Bird%27%2C_a_fading_sprayed_wall-painting_on_the_Prins_Hendrikkade_-_geo-tagged_free_urban_picture%2C_in_public_domain_Commons_CCO%3B_Dutch_urban_photography_by_Fons_Heijnsbroek%2C_The_Netherlands_%2830186407212%29.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7f/Graffiti_in_Istanbul_city._Turkey_country_13.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    buildings: [
        "https://upload.wikimedia.org/wikipedia/commons/6/65/Hungarian_Parliament_Building_2023-9.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b3/Ripon_Building_panorama.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a2/Windows_of_the_Frost_Building_%28Toronto%2C_Canada%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/11/Victoria_Harbour_skyscrapers.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/30/Building_in_Paulista_Avenue_09.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/45/British_Columbia_Parliament_Building_in_Victoria%2C_British_Columbia%2C_Canada_07.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/FEMA_-_5399_-_Photograph_by_Andrea_Booher_taken_on_09-28-2001_in_New_York.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Manhattan_1931.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/General_Staff_Building_Eastern_Wing.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Looking_upward_at_the_Yick_Cheong_Building%2C_13_June_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    landmark: [
        158,
        197,
        1040,
        1044,
        1057,
        173,
        121,
        50,
        184,
        218,
        13,
        191
    ],

    // ── NATURE & OUTDOORS ──────────────────────────────────────
    mountain: [
        "https://upload.wikimedia.org/wikipedia/commons/9/93/Sumas_Mountain_panorama.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/23/Mountain_lake%2C_Mylgval_mountain_cirque%2C_Western_Caucasus.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Cheops_Mountain_seen_the_Sir_Donald_Trail.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c0/Castle_Mountain.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Zagedan_Lakes%2C_Mountain_cirque%2C_Caucasus_Mountains.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/de/Blue_Mountains_National_Park_%28AU%29%2C_Three_Sisters_--_2019_--_1987-9.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/cf/Ergaki%2C_Mountain_lake_Skazka%2C_Rock_formations%2C_Sayan_Mountains%2C_Russia.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    hiking_trail: [
        1018,
        1036,
        1043,
        1050,
        1015,
        278,
        253,
        547,
        228,
        607,
        412,
        160,
        603,
        474,
        617
    ],
    forest: [
        240,
        424,
        15,
        28,
        155,
        167,
        180,
        186,
        195,
        213
    ],
    sunset: [
        334,
        337,
        392,
        399,
        405,
        450,
        468,
        491,
        505,
        558,
        599
    ],
    park_outdoor: [
        10,
        11,
        16,
        17,
        18,
        29,
        36,
        37,
        38,
        41,
        52,
        56,
        68
    ],

    // ── TRANSPORT ──────────────────────────────────────────────
    car_road: [
        "https://upload.wikimedia.org/wikipedia/commons/d/d3/Traffic_congestion_on_Church_Street%2C_Naseby_-_geograph.org.uk_-_7531355.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b2/A_Traffic_Island_on_Bolebridge_Street_%28_1%29_-_geograph.org.uk_-_1036219.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/73/Road_NH_71_B_to_Shekhawati-Traffic_jams-20131006.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f0/Painted_taxi_cab%2C_Haven_Street_NW1_-_geograph.org.uk_-_2008093.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d4/311_taxi_cab.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/3d/LUAS_tram_No._4001_on_test_accompanied_by_Garda_Traffic_Corps_car%2C_Parnell_Street%2C_Dublin_-_geograph.org.uk_-_8267387.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Checker_Taxi_Cab.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/e1/Northbound_traffic_waiting_for_the_convoy_guiding_vehicle_on_the_A34_-_geograph.org.uk_-_3268146.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/ce/The_%27taxi-cab%27_of_1644_years_ago-_the_measure-mile-drum_carriage._%281909%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b0/CHP_HOV_traffic_stop.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Car_Driving_in_Outback_Queensland%2C_Diamantina_Developmental%2C_Charleville_-_Quilpie_Highway_%281979%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/Evening_peak_traffic%2C_Middlepath_Street%2C_Belfast_%28May_2015%29_-_geograph.org.uk_-_4495239.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/M-Cabs_taxi_and_office%2C_Lyme_Regis_-_geograph.org.uk_-_5850757.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/3e/Traffic_accident_scene_involving_two_cars_and_emergency_services_on_%C5%9Aliwki_Street%2C_Gliwice%2C_Silesian_Voivodeship%2C_Poland%2C_March_2026.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/db/One-way_traffic_in_Morrisons_car_park%2C_Cwmbran_-_geograph.org.uk_-_3308667.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/da/Specialist_Traffic_Management_Vehicle.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/24/%28SGP-Singapore%29_Yellow-Top_Taxi_SH3070K_2024-02-26.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c9/A_convoy_vehicle_leads_traffic_through_works_on_the_B3230_-_geograph.org.uk_-_5268436.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/cd/Sawston%2C_parked_cars_and_next_to_no_traffic_-_geograph.org.uk_-_4061415.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Ace_Taxi_Cab_Office%2C_Tregenna_Hill%2C_St_Ives%2C_Cornwall_-_October_2021.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Unic_Taxi_Cab_%2852713336185%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/66/Excite_Taxi_Cab.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/57/Matiz_2.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/38/The_Frazer_Ferries%27_vehicle_park_and_traffic_marshalling_area_at_Greenore_Ferry_Terminal_-_geograph.org.uk_-_5693153.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Dantaxi_taxi_cab_Tesla.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/57/Timing_car_on_Hope_Street_-_geograph.org.uk_-_7312489.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bangkok_skytrain_sunset.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f6/Mors%2C_B_1801%2C_London_to_Brighton_Veteran_Car_Run_2009%2C_15_CV_1902_-_Traffic_jam_in_High_Street%2C_Croydon_-_geograph.org.uk_-_1566840.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/58/Film_cars_Disneyland_Paris_01.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/20/Peerless_New_York_Taxi_Cab%2C_Devonshire_Square_-_geograph.org.uk_-_4478337.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/74/Desert_Road_3June2005.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/German_Police_car_in_green_and_silver-grey.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/3d/1908_Unic_Taxi_Cab_%285949479861%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/83/Turkish_Bentley_traffic_police_car.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/en/e/e3/1938_photograph_by_noted_photographer_Raoul_Ubac_of_detail_of_1938_artwork_titled_%22Rainy_Taxi%22_%28also_known_as_%22Mannequin_Rotting_in_a_Taxi-Cab%22%29_by_noted_artist_Salvador_Dal%C3%AD_consisting_of_an_actual_automobile_containing_two_mannequins.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/86/L%C3%A4nsiv%C3%A4yl%C3%A4.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Checker_Taxi_Cab_%289439228676%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/ee/Arusha_city_centre_traffic_congestion.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/eb/Yellow_Taxi_Cab_1930.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/LF5795_1912_Unic_Taxi_Cab.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/55/Western_Cape_Traffic_patrol_car.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f2/Checker_Taxi_Cab_%283%29_%289436450843%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/0d/Radio_Cabs_taxi_office%2C_Bridgend_-_geograph.org.uk_-_3243121.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f4/Taxi_Cab_in_South_Korea.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c6/Car_boot_sale_traffic%2C_Himley%2C_Staffordshire_-_geograph.org.uk_-_1799125.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f5/Car_driving_along_a_road_surrounded_by_trees.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/56/Traffic_accident_involving_a_battery-powered_vehicle_on_Huaide_S_Rd._%28Jiangsu_Provincial_Highway_340%29_heading_from_east_to_west.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b6/RMS_Traffic_Signals_sillitoe_tartan_vehicle_markings.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/e9/Ridge_Route_Reservoir_Summit_hp.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f9/Warning_sign_-_two_way_traffic%2C_Bailey_Street%2C_Newport_-_geograph.org.uk_-_4904930.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/e2/Pachnoda_-_Taxi_Cab_Beetle_02.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/Croxton-Keeton_taxi_cab_for_Walden_W_Shaw_Auto_Livery_Co_%281910%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/79/A39_traffic_from_County_Gate_car_park_-_geograph.org.uk_-_5120197.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Traffic_on_Station_Road%2C_Kimberley_-_geograph.org.uk_-_5818830.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/03/TAXI.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/35/View_of_parked_cars_crowding_Pine_Street_at_Broadway_in_Long_Beach%2C_ca.1925.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6c/Car_park_and_Traffic_Street_-_geograph.org.uk_-_8119229.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/CabLook_Taxi_Cab.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Suzuki_Ertiga_XL7_Taxi_Cab.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/84/Chrysler_of_Yellow_cab_on_Universal_Studios_Japan.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/57/Bersey_cab.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c6/Taxis%2C_taxis_everywhere%2C_nor_a_cab_to_hire_-_geograph.org.uk_-_4193427.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/ba/Cars_waiting_at_the_traffic_lights_on_James_Street%2C_Omagh_-_geograph.org.uk_-_6507360.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/28/Traffic_on_Marston_Road%2C_Tockwith_-_geograph.org.uk_-_2306222.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/ec/1987_Chevrolet_Caprice_New_York_Taxi_Cab.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Traffic_Waiting_at_the_Bridge_Street_Level_Crossing_-_geograph.org.uk_-_4910311.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/Cab_Calloway_%281907-1994%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/fb/New-York-City-Taxi-Medallion.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/65/Yellow_cab_on_Times_Square_Manhattan_-_New_York_City.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/be/Green_Taxi_Cab_%284027017178%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Checker_Taxi_Cab_%282%29_%289436452127%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/92/Quantum_Traffic_Management_vehicle%2C_Malpas_Road%2C_Newport_-_geograph.org.uk_-_6147535.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/Traffic_warden_enforcing_in_Camden.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d3/Fietsdemonstratie_tegen_autoverkeer_in_binnenstad_in_Amsterdam_fietsdemonstrati%2C_Bestanddeelnr_927-5079.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/bc/2005_car_traffic_in_Taipei.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    highway: [
        290,
        310,
        367,
        387,
        449,
        33,
        44,
        94,
        133,
        149,
        171,
        183,
        199,
        210,
        235
    ],
    airport: [
        457,
        35,
        108,
        130,
        221,
        326
    ],
    airplane: [
        7,
        49,
        89,
        247
    ],

    // ── FOOD & DINING ──────────────────────────────────────────
    restaurant: [
        "https://upload.wikimedia.org/wikipedia/commons/1/13/LRC_Ansbach_supports_warfighters_with_food_service_needs%2C_plans_improvements_%286674708%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ad/Burger_King_%E2%80%A2_Estaci%C3%B3n_Retiro_Mitre_%E2%80%A2_8.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Chopt_side_Cabin_John_Village_MD_2023-04-18_07-44-37.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/HK_%E4%B8%8A%E7%92%B0%E5%B8%82%E6%94%BF%E5%A4%A7%E5%BB%88_Sheung_Wan_Municipal_Building_%E7%86%9F%E9%A3%9F%E4%B8%AD%E5%BF%83_Cooked_food_centre_Wong_Kee_Restaurant_round_table_n_chairs_July_2025_N13P_02.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Smart_phones_and_food_Exchange_Place_NOLA.JPG?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/73/Order_up-_Ramstein_reopens_DFAC_%287335380%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/Ritual_of_Dining_Together.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    cafe: [
        "https://upload.wikimedia.org/wikipedia/commons/d/db/Coffee_Shop_Stop_and_Dhoon_Cafe_-_geograph.org.uk_-_3160560.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "/demo-images/cafe_1_1790224285642.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b8/Coffee_shop_and_cafe_in_Carna_-_geograph.org.uk_-_7794962.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9c/Caf%C3%A9_and_coffee_shop%2C_Torquay_-_geograph.org.uk_-_3745488.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Nantwich_Book_Store%2C_Coffee_Shop_and_Pavement_Side_Cafe_-_geograph.org.uk_-_5443429.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "/demo-images/cafe_3_1790224320567.jpg",
        "/demo-images/cafe_4_1790224334758.jpg",
        "/demo-images/cafe_2_1790224307091.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/1/1e/Sweet_Shop_and_Coffee_Reef_cafe%2C_Bournemouth_-_geograph.org.uk_-_5194670.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2c/Cafe_Nero_coffee_shop%2C_Back_Quay%2C_Truro%2C_Cornwall_-_March_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "/demo-images/cafe_10_1790224845052.jpg",
        "/demo-images/cafe_8_1790224407461.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/9/92/Snow_White_Coffee_Shop%2C_Hollywood_Boulevard_District.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "/demo-images/cafe_9_1790224546149.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/1/16/Coffee_shop-Cafe_in_Magdalen_Road_%22Village%22%2C_Exeter_-_geograph.org.uk_-_3396267.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/HK_SKD_TKO_%E5%AF%B6%E7%90%B3_Po_Lam_MCP_2_Two_Central_%E5%95%86%E5%A0%B4_Shopping_mall_void_shop_Luckin_Coffee_%26_Cafe_June_2026_N13P_02.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/28/The_Grind_coffee_shop_%5E_cafe%2C_Kelham_Island%2C_Sheffield_-_geograph.org.uk_-_4188233.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/0d/D%C3%BClmen%2C_Privatr%C3%B6sterei_Schr%C3%B6er%2C_Kaffeebeh%C3%A4lter_--_2018_--_0529.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "/demo-images/cafe_7_1790224394928.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/Cafe%26Draw_sketch_in_coffee_shop_at_Tel_Aviv.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Cafe_Cups_Coffee_Shop%2C_Homer%2C_Alaska_02.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/Jammer_Joe%27s_-_Interior_of_Lake_McDonald_Lodge_Coffee_Shot_-_NPS_photo_by_Lon_Johnson.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "/demo-images/cafe_6_1790224381078.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/The_Sea_Cafe_Coffee_Shop%2C_Deal_-_geograph.org.uk_-_6392266.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "/demo-images/cafe_5_1790224349729.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b4/Riverside_Coffee_Shop_%5E_Cafe%2C_Adpar%2C_Ceredigion_-_geograph.org.uk_-_6225277.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    food: [
        "https://upload.wikimedia.org/wikipedia/commons/c/ce/Speisen_im_italienischen_Restaurant_20250416_HOF7324_RAW-Export.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/David%27s_Tea_House_%E7%81%AB%E9%8D%8B_Hotpot_Restaurant_Manila_diningB.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f6/The_Block_food_hall_Pike_and_Rose_MD_2023-11-25_15-56-03.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7d/Nightlife_%26_Establishments.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/18/Shake_Shack_Sisters_Colada_Cabin_John_Village_MD_2023-04-18_07-43-21.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/72/U_S_Army_Soldiers_Celebrate_Thanksgiving_at_Camp_Casey%2C_South_Korea_%289412441%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/52/King_of_Falafel_%26_Shawarma_Dining_Area.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/Let%27s_dine_out_on_foreign_food_tonight_-_geograph.org.uk_-_1955628.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    breakfast: [
        225,
        302,
        312,
        431,
        445,
        451,
        506,
        530,
        600
    ],

    // ── PEOPLE & SOCIAL ────────────────────────────────────────
    friends_group: [
        306,
        215,
        482,
        339,
        336,
        1011,
        1012
    ],
    party: [
        512
    ],
    gathering_formal: [
        372,
        528,
        453,
        60
    ],
    crowd: [
        1027,
        342,
        338,
        66,
        542,
        58,
        74,
        263
    ],

    // ── INDOOR / HOME ──────────────────────────────────────────
    home_interior: [
        365,
        376,
        379,
        271,
        164,
        239,
        354,
        357,
        374,
        377,
        380,
        384,
        385,
        396,
        398
    ],
    desk_workspace: [
        0,
        1,
        2,
        3,
        4,
        5
    ],

    // ── STUDY & EDUCATION ──────────────────────────────────────
    campus: [
        55,
        61,
        65,
        233,
        244
    ],
    classroom: [
        363,
        181,
        176,
        625,
        543,
        143,
        494,
        289,
        64,
        178
    ],
    library: [
        "https://upload.wikimedia.org/wikipedia/commons/c/cd/State_Library_of_Victoria_La_Trobe_Reading_room_5th_floor_view.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9f/Clementinum_baroque_library_2.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/George-peabody-library.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/4c/Toronto_Reference_Library_%2801618%292.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    laptop_study: [
        20,
        21,
        22,
        23,
        24,
        25,
        48
    ],

    // ── MEDICAL ────────────────────────────────────────────────
    clinic: [
        498,
        511,
        500,
        127,
        519,
        539,
        82,
        484,
        550
    ],
    medicine: [
        "/demo-images/medicine_desk_4_1789837141119.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/5/55/VariousPills.jpg",
        "/demo-images/medicine_desk_3_1789837128011.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/1/1a/Dexamethasone_tablets.jpg",
        "/demo-images/medicine_desk_1_1789837098828.jpg",
        "/demo-images/medicine_desk_2_1789837113073.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/8/8b/Ecstasy_Pills.jpg",
        "/demo-images/medicine_desk_5_1789837212512.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/9/94/Huperzine_A_in_China.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Amneal_Pharmaceuticals_ibuprofen_tablets.jpg"
    ],
    documents: [
        "https://upload.wikimedia.org/wikipedia/commons/b/b4/Edwin_Smith_Papyrus_v2.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Constitution_of_the_United_States%2C_page_1.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/8/87/Magna_Carta_%28British_Library_Cotton_MS_Augustus_II.106%29.jpg"
    ],

    // ── SHOPPING ───────────────────────────────────────────────
    mall: [
        248
    ],
    store_products: [
        202
    ],

    // ── PETS ───────────────────────────────────────────────────
    pets: [
        237,
        1025,
        169,
        219,
        593,
        417,
        12,
        524,
        297,
        267,
        502,
        177,
        420,
        69
    ],

    // ── NIGHT ──────────────────────────────────────────────────
    night_city: [
        1047,
        1048,
        274,
        257
    ],
    night_lights: [
        259,
        261,
        83,
        570
    ],

    // ── LANDSCAPE ──────────────────────────────────────────────
    landscape: [
        45,
        92,
        93,
        95,
        14,
        19
    ],

    // ── MARKET / FESTIVAL ──────────────────────────────────────
    market_stalls: [
        96,
        598,
        201,
        104,
        47,
        560
    ],
    festival: [
        488
    ],
};

const poolUsage: Record<string, number> = {};

// Convenience function: get a URL from a pool
export function getPoolImageUrl(poolName: string, index: number, w = 800, h = 800): { url: string; highUrl: string } {
    const pool = VISUAL_POOLS[poolName] || VISUAL_POOLS['landscape'];
    
    const usageCount = poolUsage[poolName] || 0;
    poolUsage[poolName] = usageCount + 1;

    if (usageCount < pool.length) {
        const id = pool[usageCount];
        if (typeof id === 'string') {
            return { url: id, highUrl: id };
        }
        return {
            url: `https://picsum.photos/id/${id}/${w}/${h}`,
            highUrl: `https://picsum.photos/id/${id}/1200/1200`
        };
    }
    
    // Fallback to a globally unique seed if the pool is exhausted
    return {
        url: `https://picsum.photos/seed/mem_${index}/${w}/${h}`,
        highUrl: `https://picsum.photos/seed/mem_${index}/1200/1200`
    };
}
