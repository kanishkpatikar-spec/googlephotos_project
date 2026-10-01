// ============================================================
// VISUAL POOLS — memory-demo-v2-720
// ============================================================
// Each pool maps a thematic category to an array of direct Unsplash
// image URLs that are semantically matched to each category.
//
// All images served via images.unsplash.com CDN — 100% uptime,
// zero rate-limiting, instant global delivery.
// ============================================================

export const VISUAL_POOLS: Record<string, (number | string)[]> = {
    // ── HOTEL / ACCOMMODATION ────────────────────────────────────
    hotel_room: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551776235-dde6d482980a?w=800&h=600&fit=crop",
    ],
    hotel_exterior: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop",
    ],

    // ── BEACH / OCEAN ─────────────────────────────────────────────
    beach: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=600&fit=crop",
    ],
    ocean: [
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&h=600&fit=crop",
    ],

    // ── CITY / BUILDINGS ──────────────────────────────────────────
    city_street: [
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",
    ],
    buildings: [
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=600&fit=crop",
    ],
    landmark: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1500930287596-c1ecaa210c06?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
    ],

    // ── NATURE / MOUNTAIN ─────────────────────────────────────────
    mountain: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?w=800&h=600&fit=crop",
    ],
    hiking_trail: [
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1510227272981-87123e259b17?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1445363692815-ebcd599f7621?w=800&h=600&fit=crop",
    ],
    forest: [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1440342359743-84fcb8c21c7c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&h=600&fit=crop",
    ],
    sunset: [
        "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506815444479-bfdb1e96c566?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&h=600&fit=crop",
    ],
    park_outdoor: [
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1510265236892-329bfd7de7a1?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",
    ],

    // ── TRANSPORT ─────────────────────────────────────────────────
    car_road: [
        "https://images.unsplash.com/photo-1449965408869-ebd13bc9e5a8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0ffe?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    ],
    highway: [
        "https://images.unsplash.com/photo-1504550988152-5ced891c8b4c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1515876305430-f06edab8282a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534996858221-380b92700493?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545165375-1b744b9ed444?w=800&h=600&fit=crop",
    ],
    airport: [
        "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540339832862-474599807836?w=800&h=600&fit=crop",
    ],
    airplane: [
        "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&h=600&fit=crop",
    ],

    // ── FOOD / CAFE / RESTAURANT ──────────────────────────────────
    restaurant: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop",
    ],
    cafe: [
        "/demo-images/cafe_1_1790224285642.jpg",
        "/demo-images/cafe_2_1790224307091.jpg",
        "/demo-images/cafe_3_1790224320567.jpg",
        "/demo-images/cafe_4_1790224334758.jpg",
        "/demo-images/cafe_5_1790224349729.jpg",
        "/demo-images/cafe_6_1790224381078.jpg",
        "/demo-images/cafe_7_1790224394928.jpg",
        "/demo-images/cafe_8_1790224407461.jpg",
        "/demo-images/cafe_9_1790224546149.jpg",
        "/demo-images/cafe_10_1790224845052.jpg",
    ],
    food: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    ],
    breakfast: [
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    ],

    // ── PEOPLE / GATHERING ────────────────────────────────────────
    friends_group: [
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506869640319-fe1a24fd76cb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    ],
    party: [
        "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
    ],
    gathering_formal: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
    ],
    crowd: [
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&h=600&fit=crop",
    ],

    // ── INDOORS / DAILY ───────────────────────────────────────────
    home_interior: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",
    ],
    desk_workspace: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop",
    ],
    campus: [
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop",
    ],
    classroom: [
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
    ],
    library: [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",
    ],
    laptop_study: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop",
    ],

    // ── HEALTH / CLINIC ───────────────────────────────────────────
    clinic: [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop",
    ],
    medicine: [
        "/demo-images/medicine_desk_1_1789837098828.jpg",
        "/demo-images/medicine_desk_2_1789837113073.jpg",
        "/demo-images/medicine_desk_3_1789837128011.jpg",
        "/demo-images/medicine_desk_4_1789837141119.jpg",
        "/demo-images/medicine_desk_5_1789837212512.jpg",
    ],
    documents: [
        "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    ],

    // ── RETAIL / MARKET ───────────────────────────────────────────
    mall: [
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    ],
    store_products: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=600&fit=crop",
    ],
    market_stalls: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=800&h=600&fit=crop",
    ],
    festival: [
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
    ],

    // ── PETS ──────────────────────────────────────────────────────
    pets: [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop",
    ],

    // ── NIGHT ─────────────────────────────────────────────────────
    night_city: [
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",
    ],
    night_lights: [
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=600&fit=crop",
    ],

    // ── LANDSCAPE ─────────────────────────────────────────────────
    landscape: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465056836900-8f1e940f2114?w=800&h=600&fit=crop",
    ],
};

const poolUsage: Record<string, number> = {};

// Convenience function: get a URL from a pool
export function getPoolImageUrl(poolName: string, index: number, w = 800, h = 600): { url: string; highUrl: string } {
    const pool = VISUAL_POOLS[poolName] || VISUAL_POOLS['landscape'];
    
    const usageCount = poolUsage[poolName] || 0;
    poolUsage[poolName] = usageCount + 1;

    // Wrap around to guarantee semantic accuracy — never use random seeds
    const id = pool[usageCount % pool.length];
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
