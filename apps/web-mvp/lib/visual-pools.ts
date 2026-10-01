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
        "https://upload.wikimedia.org/wikipedia/commons/f/fb/Landscape_during_Laugavegur_hiking_trail_2-CA_reduced.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Pirin_-_hiking_trail_from_Vihren.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Lady_fern_at_Myrstigen_trail_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/21/Trees_in_ICM_on_Myrstigen_hiking_trail%2C_Brastad_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f8/Babia_G%C3%B3ra%2C_20230304_0651_3162.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hiking_path_on_the_peninsula_La_Vict%C3%B2ria_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9d/Hiking_path_on_the_peninsula_La_Vict%C3%B2ria_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/3d/Hiking_trail_to_Biskupsk%C3%A1_kupa%2C_Czechia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Intertwined_roots_of_two_birches_next_to_Myrstigen_hiking_trail_in_Brastad.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/29/Hiking_trail_on_Mount_Obidowiec%2C_Gorce%2C_20260103_1214_6780.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    forest: [
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Hendrik_van_der_Borcht_%28I%29_-_Forest_Landscape_-_WGA02451.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/cc/Forest_road_Slavne_2017_BW_G9.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/eb/Lucas_van_Uden_-_Forest_landscape_with_cows.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Gillis_van_Coninxloo_-_Forest_Landscape_-_38.70_-_Detroit_Institute_of_Arts.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/4e/Beech_Forest_%28AU%29%2C_Great_Otway_National_Park%2C_Beauchamp_Falls_--_2019_--_1271.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/Forest_Landscape_with_Forest_Workers_and_People_Strolling_%28SM_669%29.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/13/John_William_North_-_Forest_Landscape_-_B2015.18.11_-_Yale_Center_for_British_Art.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/56/Wooden_staircase_steps_in_the_forest_of_Hallasan_Park_Eorimok_Trail_at_dusk_on_Jeju_Island_in_South_Korea.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/3c/Thomas_Stuart_Smith_%281813-1814-1869%29_-_Forest_Landscape_-_18002.120_-_Stirling_Smith_Museum_and_Art_Gallery.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Thomas_Stuart_Smith_%281813-1814-1869%29_-_Forest_Landscape_-_18003.011_-_Stirling_Smith_Museum_and_Art_Gallery.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    sunset: [
        "https://upload.wikimedia.org/wikipedia/commons/9/92/Crepuscular_rays_at_Sunset_near_Waterberg_Plateau.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b8/Backlit_Margarita_Island_Sunset_in_Las_Guevaras%2C_Venezuela_CaptureNX2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Kitesurfer_at_sunset%2C_Workum%2C_may_2017.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/cb/Don_Puay_river_bank_landscape_at_sunset.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/57/Panoramic_sunset_in_Conques_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/96/Sunset_by_Wapta_Falls.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ad/Tad_Hang_waterfalls_at_sunset%2C_Tad_Lo_village%2C_Bolaven_Plateau%2C_Laos.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Pirogue_running_on_the_Mekong_at_sunset_with_pink_clouds_in_Don_Det_Laos.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/Sunset_near_Great_Sand_Dunes_National_Park.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/78/Cypress_tree_alley_at_sunset_in_Asciano%2C_Tuscany.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    park_outdoor: [
        "https://upload.wikimedia.org/wikipedia/commons/0/0a/Central_Park_New_York_City_New_York_23_cropped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/56/Park_City%2C_Utah_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7d/Detailed_map_of_Park_City%2C_Kansas.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/27/Nara_Park%2C_November_2016.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/36/Park_City_night_sky_%28Unsplash%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/bb/Iconic_view_of_Rostov-on-Don%2C_panorama_of_Rostov-on-Don_city_centre_as_seen_from_Gorky_Park%2C_Rostov-on-Don%2C_Russia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/32/Park_%C5%9Arodula%2C_Sosnowiec%2C_Jesie%C5%84_2021.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/97/Park_City_Utah_-9.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c6/Park_City_Transit_Bus_658.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/48/The_Park_at_CityCenter_DC_at_sunset_in_February_2024.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
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
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/199_-_Buenos_Aires_-_A%C3%A9roport_international_Ezeiza_-_Janvier_2010.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/92/Washington_Dulles_International_Airport_at_Dusk.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/04/An_A380_at_Munich_airport%2C_2012.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a3/12-06-05-innsbruck-by-ralfr-164.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/67/Old_Port_Columbus_Airport_Terminal_Historical_Marker.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/36/Jet_bridge%2C_Paris-Charles_de_Gaulle_Airport%2C_Roissy_%28SIAE2156%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/45/Berlin_Brandenburg_Airport_Terminal_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Ayni_Airport_Terminal_%28Sughd%2C_Tajikistan%29.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b3/Singapore_Changi_Airport_Terminal_4_%28165259%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/40/Tocumen_International_Airport_alt.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    airplane: [
        "https://upload.wikimedia.org/wikipedia/commons/e/ef/B17g_and_b52h_in_flight.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/65/Patrouille_de_France_Radom_3_1.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9a/Aeroflot_Airbus_A330_Kustov.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f5/Sukhoi_SuperJet_100_%285114478300%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/77/Air-to-air_photo_of_a_Sukhoi_Superjet_100_%2897004%29_over_Italy.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/79/Finnish_Air_Force_Hawker_Hurricane_warbird_and_US_Navy_T-6_Texan_warbird_in_flight_over_Finland.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/43/20181208_JASDF_F-15C_E-2_formation_flight_Naha_Air_Show_2018-8.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/0a/A_beautiful_sunset_with_the_silhoutte_of_an_airplane_flying_across_the_image_frame.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/12/An_airplane_above_Sao_Paulo.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/94/Airplane_in_sky.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
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
        "https://upload.wikimedia.org/wikipedia/commons/9/93/20200410_100000_Breakfast_with_cereal%2C_pear_and_bilberry.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Petit_d%C3%A9jeuner_fran%C3%A7ais.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Serbian_Easter_breakfast.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Easter_breakfast_in_Serbia_%28close-up%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/47/Breakfast_meal_20210810-FNS-UNC-0019.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a1/Breakfast_in_%C3%8Ele_d%27Orl%C3%A9ans_072.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Breakfast_5.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a8/Brisket_breakfast_burrito_from_Buc-ee%27s_-_October_2023_-_Sarah_Stierch.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/5c/Breakfast_with_quark_and_nuts_2015.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9d/Breakfast_at_Ikea_Vantaa.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],

    // ── PEOPLE & SOCIAL ────────────────────────────────────────
    friends_group: [
        "https://upload.wikimedia.org/wikipedia/commons/b/b0/Friends_Group_of_the_Year_Friends_of_Red_River_NWR_%2810591099335%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9a/Friends_Group_of_the_Year_Friends_of_Red_River_NWR_2_%2810591155514%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6b/Louise_Breslau_-_A_Portrait-Group_of_Friends.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/31/A_group_of_friends_de_sarah_j_eddy.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Group_of_Friends_by_Lovis_Corinth_%281904%29%2C_Albertinum%2C_Dresden.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Friends_indian.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6b/Group_of_friends_seen_through_iron_railings%2C_Biblioteca_das_Galveias%2C_Lisbon%2C_Portugal_julesvernex2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Friends_group_picture.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a3/A_group_of_friends_on_a_casual_hike.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/de/Crystal_River_Friends_Group_workshop_%284580903829%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    party: [
        "https://upload.wikimedia.org/wikipedia/commons/2/25/Henri_Rousseau_%28French%29_-_A_Centennial_of_Independence_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/8d/Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/dd/Star_Wars_Celebration_III_-_Celebration_party_stage_%284878872618%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/3e/Star_Wars_Celebration_III_-_Celebration_party_band_%284878870870%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/35/Popovka%2C_Kazantip%2C_Crimea%2C_Sunset_party.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/Popovka%2C_Crimea%2C_Kazantip_Festival%2C_Celebration_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/25/Popovka%2C_Crimea%2C_Kazantip_Festival%2C_Celebration.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/e1/Popovka%2C_Crimea%2C_Kazantip_Festival%2C_Sunset_Party.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/8f/The_Yellow_Fellowship.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/3c/Isdera_Autobahnkurier_Classic-Gala_2021_1X7A0228.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    gathering_formal: [
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/FCN_Photo_Group.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/Fursuiters_at_Furry_Unlocked_2015.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/62/Swedish_furries.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/4f/Furry_Migration%2C_Furry_Convention_Dance_-_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/55/Furry_Migration%2C_Furry_Convention_Dance_-_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/18/Largest_furry_conventions_by_annual_attendance.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/ce/Furry_In_Russia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/98/Matchbox_label_-_Formal_Gathering_-_U.R.S.S_%28circa_1920s%29_-_MBP1628145891.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/06/Furries_at_ConFuzzled_2026.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/0f/Golam_Rabbani_at_a_formal_international_gathering.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    crowd: [
        "https://upload.wikimedia.org/wikipedia/commons/3/33/2008-04-12_Crowd_touring_Durham.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Walter_Johnson_and_Calvin_Coolidge_shake_hands_FINAL.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/Neurodiversity_Crowd_1.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Christ%27s_Entry_into_Brussels_in_1889.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/85/2019_Feb_04_-_Kumbh_Mela_-_Mauni_Amavasya_Crowd_4.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/1a/2019_Feb_04_-_Kumbh_Mela_-_Mauni_Amavasya_Crowd_11.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/8c/2019_Feb_04_-_Kumbh_Mela_-_Mauni_Amavasya_Crowd_16.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Crowd_at_Noam_Rotem_concert.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b3/The_Kaaba_during_Hajj_-_edited.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Crowd_of_People_at_Ridge%2C_Shimla.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],

    // ── INDOOR / HOME ──────────────────────────────────────────
    home_interior: [
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Living_Room_Interior.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/7/7b/Modern_living_room.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b3/Living_Room_in_Historic_House.jpg"
    ],
    desk_workspace: [
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Coffee-desk-notes-workspace_%2824243718641%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d6/Desk-office-workspace-coworking_%2823699033283%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/65/Workspace_%28Unsplash%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/8b/My_new_workspace_%283810862061%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/1d/Top_Workspace_Office.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/3b/Workspace_2009.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b6/Coffee_and_workspace_setup_on_a_desk_during_a_productive_morning_session.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Vintage_turquoise_desk_with_stylish_decor_in_a_cozy_indoor_workspace_filled_with_books_and_a_laptop.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/de/Laptop_and_small_plant_on_a_desk_in_a_modern_workspace_during_daylight_hours.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Workspace_setup_with_a_computer_monitor_and_desk_lamp_in_an_office_environment.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],

    // ── STUDY & EDUCATION ──────────────────────────────────────
    campus: [
        "https://upload.wikimedia.org/wikipedia/commons/d/da/Fietspad_naar_campus_Diepenbeek.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/77/Clifton_Campus_MMB_03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/Campus_WU_EA_DSC_1571w.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/90/McGill_University_downtown_campus_August_2017_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/ec/Burns_Building%2C_Lincoln_University_Campus%2C_New_Zealand_20.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/IIT_Mandi_North_Campus_Kandi_Ridge_Nov19_D72_12529.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/67/A_view_from_the_Back_Campus_of_the_University_of_Toronto.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Campus_of_Ministry_of_Interior_University%2C_Moscow.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/58/Lee_University_campus_in_Cleveland%2C_Tennessee_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/db/Lee_University_campus_in_Cleveland%2C_Tennessee_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    classroom: [
        "https://upload.wikimedia.org/wikipedia/commons/2/26/Andrew_Classroom_De_La_Salle_University.jpeg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9a/Grande_salle_ENC_n1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/bf/Palamuse_kihelkonnakooli_klassiruum.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a2/Empty_classroom_2020.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/62/Reconstructed_classroom%2C_Storer_College.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/90/Online_Classroom_Background.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f9/Hanoi_classroom%2C_summer_2003.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/76/Classroom_Rules.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/fe/Dorgah_Madrasah%2C_Dawra_Hadith_classroom.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f2/Classroom_with_greenchairs.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    library: [
        "https://upload.wikimedia.org/wikipedia/commons/c/cd/State_Library_of_Victoria_La_Trobe_Reading_room_5th_floor_view.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9f/Clementinum_baroque_library_2.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/George-peabody-library.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/4c/Toronto_Reference_Library_%2801618%292.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    laptop_study: [
        "https://upload.wikimedia.org/wikipedia/commons/9/98/Study_Area_in_Peckham_Hall%2C_Nazareth_College%2C_Rochester%2C_NY.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/28/20140903_Ukrainian_studies_Cyber_Endeavor_seminars_during_Exercise_Combined_Endeavor_2014.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Cyber-ethnography_Graduate_Anthropology_Students.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/6b/University_life.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f3/Laptop_and_girl_biting_pencil-pixabay.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/4/4e/According_to_the_prosecution%27s_investigation%2C_the_contact_information_of_an_Arabic_exchange_student_attending_Hankuk_University_of_Foreign_Studies%2C_which_was_kept_by_Mr._Lee%2C_found_in_suspect_Mr._Lee%27s_laptop.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/26/Study_Areas_on_3rd_Floor_at_the_HCC.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Creatividad_y_conocimiento.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/ba/JtPhoto.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/65/In_Zaporizhzhia%2C_the_President_Visited_an_Underground_School_and_Spoke_with_Children_on_December_12%2C_2024_-_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],

    // ── MEDICAL ────────────────────────────────────────────────
    clinic: [
        "https://upload.wikimedia.org/wikipedia/commons/4/4a/Garforth_Clinic_-_Lidgett_Lane_-_geograph.org.uk_-_730659.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c6/Crenellated_Chiropractic_Clinic_-_geograph.org.uk_-_774768.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/ea/Verwood%2C_clinic_and_vets_-_geograph.org.uk_-_953601.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/84/Expo_2012_Medical_Clinic_Center.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c4/Acupuncture_clinic%2C_La_Belle_Place%2C_Glasgow_%28geograph_4964139%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/50/Clinic_in_Exarcheia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/c6/Bull_Meadow_Clinic%2C_Exeter_-_geograph.org.uk_-_2158081.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/05/A_One_Medical_clinic_in_Bethesda%2C_Maryland_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2c/A_One_Medical_clinic_in_Bethesda%2C_Maryland_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/73/Cruise_Ship_Medical_Reception_Area.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
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
        "https://upload.wikimedia.org/wikipedia/commons/9/96/Melbourne_Old_Post_Office_%28Shopping_Mall_Interior%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/00/Petrovsky_Passage_interior_06-2015.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/CH.ZG.Zug_2024-04-24_Shopping-Mall-Metalli.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/61/Entrance_in_Torp_shopping_mall%2C_Uddevalla.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f6/Galeria_shopping_mall_interior_08.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/1/1b/Galeria_shopping_mall_interior_13.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/67/Galeria_shopping_mall_interior_18.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Galeria_shopping_mall_interior_46.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Galeria_shopping_mall_interior_60.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/03/Galeria_shopping_mall_interior_87.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    store_products: [
        "https://upload.wikimedia.org/wikipedia/commons/a/ad/Retail_grocery_store_shelf_display_of_broad_range_of_food_bars%2C_meal_bars%2C_and_snack_bars-_2013-04-19_14-39.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/e1/Veganz_Berlin_Vegan_Products_Grocery_Store_Shelf_15592862090.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/05/Egg_cartons_on_the_shelf_of_an_IGA_store.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/0/0d/Grocery_store_shelf_in_Russia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/e2/PORTAL_~_Dominon_shelf_portrait_%28372913%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Empty_grocery_store_shelf_coronavirus_2020.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/38/Nando%27s_peri_peri_sauces_on_a_grocery_store_shelf.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/92/Brie_on_a_Shelf.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/22/A_shelf_display_of_apples_marked_with_special_prices_at_a_local_grocery_store_in_Palapye%2CBotswana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9a/Shelf_of_ST25_rice_bags_in_Vietnamese_grocery_store.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],

    // ── PETS ───────────────────────────────────────────────────
    pets: [
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Narrowboat_cat_and_dog_-_geograph.org.uk_-_1772505.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Cat_and_dog_standoff_%283926784260%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/fe/Cute_cat_and_dog_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/58/Cat_and_Dog_Game.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Small_dog_and_cat_2020.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Dog_and_cat_bites.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Cat_and_dog_waiting_for_owner.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/97/Cat_and_Dog.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/82/Dog_and_cat%2C_Arco%2C_Madeira.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b6/Cat_and_Dog_in_Vertis_North.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],

    // ── NIGHT ──────────────────────────────────────────────────
    night_city: [
        "https://upload.wikimedia.org/wikipedia/commons/2/22/New_York_City_at_night_HDR.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/52/New_York_Midtown_Skyline_at_night_-_Jan_2006_edit1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b6/Lower_Manhattan_from_Jersey_City_November_2014_panorama_3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f4/Qu%C3%A9bec_city_at_night%2C_view_from_L%C3%A9vis_city.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Ch%C3%A2teau_Frontenac_city_at_night.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/8b/Price_Building_illuminated_at_night_in_Quebec_City.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Chateau_Frontenac_illuminated_at_night_in_Quebec_City.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/ba/Lower_Manhattan_from_Jersey_City_September_2020_panorama.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Minato_City%2C_Tokyo%2C_Japan_%28Night%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/71/At_New_York_City_2025_001_-_Hudson_Yards_skyline%2C_New_York%2C_at_night.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
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
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Market_stall_in_Tachbrook_Street_-_geograph.org.uk_-_1557032.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jedburgh_Easter_Market_2022_sweet_stall_and_stallholder_with_Oisin_behind.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Jedburgh_Easter_Market_2022_prime_cake_stall_and_stallholder.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/71/Jedburgh_Easter_Market_2022_calligraphy_stall_and_stallholder.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/52/Jedburgh_Easter_Market_2022_street_food_stall_and_stallholder.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/7/77/Jedburgh_Easter_Market_2022_High_Street_soap_stall_and_stallholder.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/f/f0/Vegetable_stall%2C_Surrey_Street_Market%2C_Croydon_-_geograph.org.uk_-_6286579.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/9/9b/Ornamental_fish_street_market_stall_in_Montevideo_in_2024.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/c/cf/Market_stall_Sclater_Street_Brick_Lane_Market_Shoreditch_London_England_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2b/Market_stall_Sclater_Street_Brick_Lane_Market_Shoreditch_London_England_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
    ],
    festival: [
        "https://upload.wikimedia.org/wikipedia/commons/0/06/Roz_Pappalardo_at_Urban_Country_Music_Festival_2010_Brisbane_AUSTRALIA_May_2010.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/ad/Kantishna_Valley_Bluegrass_Music_Festival_Denali_Borough_AK_August_2010.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Sabolai_Radio_Music_Festival-4.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/Pattaya_Music_Festival%2C_Girl_dancing_in_the_club.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/50/Pattaya_Music_Festival%2C_People_in_the_club.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Pattaya_Zoom_Music_Festival%2C_Main_stage_in_lights.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/2/2c/326-056.jpg.Larmer_Tree_Music_Festival_2009.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/Alienstock_2019_Music_Festival.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/5/56/Drift_Jam_-_Flotilla_Music_Festival.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
        "https://upload.wikimedia.org/wikipedia/commons/3/30/BUCKLE_N_BOOTS_performing_live_at_The_British_Country_Music_Festival_2025.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
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
            let thumbUrl = id;
            if (id.includes('upload.wikimedia.org/wikipedia/commons/') && !id.includes('/thumb/')) {
                const parts = id.split('?')[0].split('/');
                const filename = parts.pop();
                const hash2 = parts.pop();
                const hash1 = parts.pop();
                if (filename && hash1 && hash2) {
                    thumbUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash1}/${hash2}/${filename}/800px-${filename}`;
                }
            }
            return { url: thumbUrl, highUrl: id };
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
