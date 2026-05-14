import { NextResponse } from 'next/server';

const BASE_URL        = 'https://www.mycontinentalfoodstore.co.uk';
const CONSUMER_KEY    = process.env.WOOCOMMERCE_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET!;
const ADMIN_TOKEN     = process.env.ADMIN_LINK_TOKEN || 'mycontinental-link-2026';

const IMAGE_INDEX = [
  { path: "2025/07/AFRICAN-OLIVE-MIRACLE-LEAVE-IN.jpg", name: "AFRICAN-OLIVE-MIRACLE-LEAVE-IN.jpg" },
  { path: "2025/07/AFRICAN-PRIDE-Black-Castor-Miracle.jpg", name: "AFRICAN-PRIDE-Black-Castor-Miracle.jpg" },
  { path: "2025/07/AFRICAN-PRIDE-Bouncy-Curls-Pudding.jpg", name: "AFRICAN-PRIDE-Bouncy-Curls-Pudding.jpg" },
  { path: "2025/07/AFRICAN-PRIDE-Foam-setting-mousse.jpg", name: "AFRICAN-PRIDE-Foam-setting-mousse.jpg" },
  { path: "2025/07/AFRICAN-PRIDE-HONEY-AND-COCONUT-OIL.jpg", name: "AFRICAN-PRIDE-HONEY-AND-COCONUT-OIL.jpg" },
  { path: "2025/07/AFRICAN-PRIDE-MAGICAL-GRO.jpg", name: "AFRICAN-PRIDE-MAGICAL-GRO.jpg" },
  { path: "2025/07/AFRICAN-PRIDE-Max-Hold-Styling-Gela.jpg", name: "AFRICAN-PRIDE-Max-Hold-Styling-Gela.jpg" },
  { path: "2025/07/AFRICAN-PRIDE-OLIVE-MIRACLE.jpg", name: "AFRICAN-PRIDE-OLIVE-MIRACLE.jpg" },
  { path: "2025/07/AFRICAN-PRIDE-STRENGTHENING-MASK.jpg", name: "AFRICAN-PRIDE-STRENGTHENING-MASK.jpg" },
  { path: "2025/07/AFRICAN-PRIDE-STRENGTHENING-OIL.jpg", name: "AFRICAN-PRIDE-STRENGTHENING-OIL.jpg" },
  { path: "2025/07/African-Essence-Braid-Spray-355ml.jpg", name: "African-Essence-Braid-Spray-355ml.jpg" },
  { path: "2025/07/African-Essence-Control-Wig-Shampoo-355ml.jpg", name: "African-Essence-Control-Wig-Shampoo-355ml.jpg" },
  { path: "2025/07/African-Essence-Weave-spray-6-in-1.jpg", name: "African-Essence-Weave-spray-6-in-1.jpg" },
  { path: "2025/07/African-Pride-Black-castor-Miracle-Gel.jpg", name: "African-Pride-Black-castor-Miracle-Gel.jpg" },
  { path: "2025/07/African-Pride-Braid-Sheen-Spray-355ml.jpg", name: "African-Pride-Braid-Sheen-Spray-355ml.jpg" },
  { path: "2025/07/African-Pride-Coconut-Baobab-Leave-in-Cream.jpg", name: "African-Pride-Coconut-Baobab-Leave-in-Cream.jpg" },
  { path: "2025/07/African-Pride-Curl-Defining-Gel-510g.webp", name: "African-Pride-Curl-Defining-Gel-510g.webp" },
  { path: "2025/07/African-Pride-Curl-MilkDetangler-354ml-e1761393011893.jpg", name: "African-Pride-Curl-MilkDetangler-354ml-e1761393011893.jpg" },
  { path: "2025/07/African-Pride-Curl-MilkDetangler-354ml.jpg", name: "African-Pride-Curl-MilkDetangler-354ml.jpg" },
  { path: "2025/07/African-Pride-Daily-Hydration-Oil-Mosturizer.webp", name: "African-Pride-Daily-Hydration-Oil-Mosturizer.webp" },
  { path: "2025/07/African-Pride-Edge-Styling-Wax-170g.jpg", name: "African-Pride-Edge-Styling-Wax-170g.jpg" },
  { path: "2025/07/African-Pride-Heat-Protection-Shine-Mist.jpg", name: "African-Pride-Heat-Protection-Shine-Mist.jpg" },
  { path: "2025/07/African-Pride-Magical-Growth-Sheen-226ml.jpg", name: "African-Pride-Magical-Growth-Sheen-226ml.jpg" },
  { path: "2025/07/African-Pride-Moisture-Miracle-5-Essential-Oils.jpg", name: "African-Pride-Moisture-Miracle-5-Essential-Oils.jpg" },
  { path: "2025/07/African-Pride-Moisture-Miracle-Coconut-Honey.jpg", name: "African-Pride-Moisture-Miracle-Coconut-Honey.jpg" },
  { path: "2025/07/African-Pride-Moisture-Miracle-Conditioner.jpg", name: "African-Pride-Moisture-Miracle-Conditioner.jpg" },
  { path: "2025/07/African-Pride-Moisture-Miracle-Curling-Cream.jpg", name: "African-Pride-Moisture-Miracle-Curling-Cream.jpg" },
  { path: "2025/07/African-Pride-Moisture-Miracle-Honey-Coconut.jpg", name: "African-Pride-Moisture-Miracle-Honey-Coconut.jpg" },
  { path: "2025/07/African-Pride-Moisture-Miracle.jpg", name: "African-Pride-Moisture-Miracle.jpg" },
  { path: "2025/07/African-Pride-Olive-Miracle-2in1-Shampoo.jpg", name: "African-Pride-Olive-Miracle-2in1-Shampoo.jpg" },
  { path: "2025/07/African-Pride-Olive-Miracle-7in1-Curl-Refresher.jpg", name: "African-Pride-Olive-Miracle-7in1-Curl-Refresher.jpg" },
  { path: "2025/07/African-Pride-Olive-Miracle-Braid-Sheen-Spray-e1761393064976.jpg", name: "African-Pride-Olive-Miracle-Braid-Sheen-Spray-e1761393064976.jpg" },
  { path: "2025/07/African-Pride-Olive-Miracle-Braid-Sheen-Spray.jpg", name: "African-Pride-Olive-Miracle-Braid-Sheen-Spray.jpg" },
  { path: "2025/07/African-Pride-Olive-Miracle-Treatment-170g.jpg", name: "African-Pride-Olive-Miracle-Treatment-170g.jpg" },
  { path: "2025/07/African-Pride-Shea-Butter-Miracle-Conditioning.jpg", name: "African-Pride-Shea-Butter-Miracle-Conditioning.jpg" },
  { path: "2025/07/African-Pride-Shea-Miracle-Curl-Styling-Custard.jpg", name: "African-Pride-Shea-Miracle-Curl-Styling-Custard.jpg" },
  { path: "2025/07/African-Pride-Shea-Miracle-Twist.jpg", name: "African-Pride-Shea-Miracle-Twist.jpg" },
  { path: "2025/07/African-Pride-Tea-Tree-Eucalyptus-Conditioner.jpg", name: "African-Pride-Tea-Tree-Eucalyptus-Conditioner.jpg" },
  { path: "2025/07/African-Sea-Dried-anchovies.webp", name: "African-Sea-Dried-anchovies.webp" },
  { path: "2025/07/African-Sea-Sardines-in-Vegetable-OIL.jpg", name: "African-Sea-Sardines-in-Vegetable-OIL.jpg" },
  { path: "2025/07/African-Shea-Butter.jpg", name: "African-Shea-Butter.jpg" },
  { path: "2025/07/African-Sun-Dried-Efirin.webp", name: "African-Sun-Dried-Efirin.webp" },
  { path: "2025/07/African-Sun-Utazi-Leaves.jpg", name: "African-Sun-Utazi-Leaves.jpg" },
  { path: "2025/07/African-Venus-Antiseptic-Soap-5oz.webp", name: "African-Venus-Antiseptic-Soap-5oz.webp" },
  { path: "2025/07/AfricanPride-RepairReplenish-Conditioner.jpg", name: "AfricanPride-RepairReplenish-Conditioner.jpg" },
  { path: "2025/07/Africas-Finest-Ground-Egusi.webp", name: "Africas-Finest-Ground-Egusi.webp" },
  { path: "2025/07/Africas-Finest-Obe-Ata-Seasoning.jpg", name: "Africas-Finest-Obe-Ata-Seasoning.jpg" },
  { path: "2025/07/Africas-Finest-Palm-oil.jpg", name: "Africas-Finest-Palm-oil.jpg" },
  { path: "2025/07/Africas-Finest-Peanut-Butter.jpg", name: "Africas-Finest-Peanut-Butter.jpg" },
  { path: "2025/07/Africas-Finest-Shito-Chilli-Sauce.jpg", name: "Africas-Finest-Shito-Chilli-Sauce.jpg" },
  { path: "2025/07/Africas-Finest-Stockfish-Cod.jpg", name: "Africas-Finest-Stockfish-Cod.jpg" },
  { path: "2025/07/Africas-Finest-Stockfish-Tusk.jpg", name: "Africas-Finest-Stockfish-Tusk.jpg" },
  { path: "2025/07/Africas-Finest-Suya-Pepper-Mix.jpg", name: "Africas-Finest-Suya-Pepper-Mix.jpg" },
  { path: "2025/07/Africas-finest-Jollof.jpg", name: "Africas-finest-Jollof.jpg" },
  { path: "2025/07/Africas-finest-Zomi-palm-Oil.jpg", name: "Africas-finest-Zomi-palm-Oil.jpg" },
  { path: "2025/07/Africas-finest-smoked-catfish-chips.jpg", name: "Africas-finest-smoked-catfish-chips.jpg" },
  { path: "2025/07/Africas-finest-stockfish-fillet.webp", name: "Africas-finest-stockfish-fillet.webp" },
  { path: "2025/07/Afrimalt-Malt-Drink.webp", name: "Afrimalt-Malt-Drink.webp" },
  { path: "2025/07/Afro-Comb-234.webp", name: "Afro-Comb-234.webp" },
  { path: "2025/07/Alcolada-Glacial-Splash-Up-Cool-Down-125ml.jpg", name: "Alcolada-Glacial-Splash-Up-Cool-Down-125ml.jpg" },
  { path: "2025/07/Alhaji-Suya-Kilishi.webp", name: "Alhaji-Suya-Kilishi.webp" },
  { path: "2025/07/All-Gold-Strawberry-Jam.jpg", name: "All-Gold-Strawberry-Jam.jpg" },
  { path: "2025/07/All-good-brai-relish.jpg", name: "All-good-brai-relish.jpg" },
  { path: "2025/07/All-good-tomato-and-onion-mix.webp", name: "All-good-tomato-and-onion-mix.webp" },
  { path: "2025/07/All-good-tomato-sauce-700ml.webp", name: "All-good-tomato-sauce-700ml.webp" },
  { path: "2025/07/All-good-tomato-sauce.jpg", name: "All-good-tomato-sauce.jpg" },
  { path: "2025/07/AllDay-LOCKS-Braid-Gel.jpg", name: "AllDay-LOCKS-Braid-Gel.jpg" },
  { path: "2025/07/Allday-LOCKS-Braid-Oil.jpg", name: "Allday-LOCKS-Braid-Oil.jpg" },
  { path: "2025/07/Americam-Dream-Cocoa-Butter-for-men-Body.webp", name: "Americam-Dream-Cocoa-Butter-for-men-Body.webp" },
  { path: "2025/07/American-Dream-Cocoa-Butter-Lotion.webp", name: "American-Dream-Cocoa-Butter-Lotion.webp" },
  { path: "2025/07/American-Dream-Lemon-body-cream.webp", name: "American-Dream-Lemon-body-cream.webp" },
  { path: "2025/07/American-Dream-Maxi-Super-4-in1.jpg", name: "American-Dream-Maxi-Super-4-in1.jpg" },
  { path: "2025/07/Amoy-Japnese-Teriyaki-Sauce.jpg", name: "Amoy-Japnese-Teriyaki-Sauce.jpg" },
  { path: "2025/07/Amoy-Premium-Oyster-Sauce.webp", name: "Amoy-Premium-Oyster-Sauce.webp" },
  { path: "2025/07/Amoy-Sweet-Sour-Sauce.jpg", name: "Amoy-Sweet-Sour-Sauce.jpg" },
  { path: "2025/07/Amoy-chilli-Sauce.jpg", name: "Amoy-chilli-Sauce.jpg" },
  { path: "2025/07/Amoy-dark-soy-sauce.jpg", name: "Amoy-dark-soy-sauce.jpg" },
  { path: "2025/07/Amoy-light-Soy-sauce.jpg", name: "Amoy-light-Soy-sauce.jpg" },
  { path: "2025/07/Ampro-Pro-Styl-Hair-Gel.webp", name: "Ampro-Pro-Styl-Hair-Gel.webp" },
  { path: "2025/07/Amstel-malta-e1761388296211.jpg", name: "Amstel-malta-e1761388296211.jpg" },
  { path: "2025/07/Amstel-malta.jpg", name: "Amstel-malta.jpg" },
  { path: "2025/07/Andrew-Zimmern-Citrus-Herb.webp", name: "Andrew-Zimmern-Citrus-Herb.webp" },
  { path: "2025/07/Andrew-Zimmern-Curry-Powdr.jpg", name: "Andrew-Zimmern-Curry-Powdr.jpg" },
  { path: "2025/07/Andrew-Zimmern-Italian-Seasoning.jpg", name: "Andrew-Zimmern-Italian-Seasoning.jpg" },
  { path: "2025/07/Annie-concentrator-nozzle.jpg", name: "Annie-concentrator-nozzle.jpg" },
  { path: "2025/07/Aunt-Jackies-Butter-Fusions-Magic-Mend.jpg", name: "Aunt-Jackies-Butter-Fusions-Magic-Mend.jpg" },
  { path: "2025/07/Aunt-Jackies-Butter-Fusions-Soothe-Operator.webp", name: "Aunt-Jackies-Butter-Fusions-Soothe-Operator.webp" },
  { path: "2025/07/Aunt-Jackies-Coconut-Creme-Curling-Gelee.jpg", name: "Aunt-Jackies-Coconut-Creme-Curling-Gelee.jpg" },
  { path: "2025/07/Aunt-Jackies-Defining-Curl-Custard-426g.jpg", name: "Aunt-Jackies-Defining-Curl-Custard-426g.jpg" },
  { path: "2025/07/Aunt-Jackies-Defining-Curl-Whip-426g.jpg", name: "Aunt-Jackies-Defining-Curl-Whip-426g.jpg" },
  { path: "2025/07/Aunt-Jackies-Flaxseed-Elongating-Curling-Gel.jpg", name: "Aunt-Jackies-Flaxseed-Elongating-Curling-Gel.jpg" },
  { path: "2025/07/Aunt-Jackies-Grapeseed-Style-Glossy-Curling.jpg", name: "Aunt-Jackies-Grapeseed-Style-Glossy-Curling.jpg" },
  { path: "2025/07/Aunt-Jackies-Moisturizing-Softening.jpg", name: "Aunt-Jackies-Moisturizing-Softening.jpg" },
  { path: "2025/07/Aunt-Jackies-heads-up-Moisturizing-Softening.webp", name: "Aunt-Jackies-heads-up-Moisturizing-Softening.webp" },
  { path: "2025/07/Aunt-Jackies-knot-on-my-watch-Detangling.jpg", name: "Aunt-Jackies-knot-on-my-watch-Detangling.jpg" },
  { path: "2025/07/CreamAmerican-Dream-Cocoa-Butter.jpg", name: "CreamAmerican-Dream-Cocoa-Butter.jpg" },
  { path: "2025/07/Pork-Adobo-3.jpg", name: "Pork-Adobo-3.jpg" },
  { path: "2025/07/Shampoo-355m-AFRICAN-PRIDE-SHEA-MIRACLE.jpg", name: "Shampoo-355m-AFRICAN-PRIDE-SHEA-MIRACLE.jpg" },
  { path: "2025/07/assorted-sweet-bread-closeup-breads-99258541.webp", name: "assorted-sweet-bread-closeup-breads-99258541.webp" },
  { path: "2025/07/best-canned-food-to-stockpile-for-survival-prepping-and-preparedness.jpg", name: "best-canned-food-to-stockpile-for-survival-prepping-and-preparedness.jpg" },
  { path: "2025/07/bitter-gourd-tea-600nw-760735240.webp", name: "bitter-gourd-tea-600nw-760735240.webp" },
  { path: "2025/07/c32b48d9-e62e-400a-9359-c607d2e1b187.webp", name: "c32b48d9-e62e-400a-9359-c607d2e1b187.webp" },
  { path: "2025/07/hero-carousel-one_cokestudio2024_fans-enjoying-coke-at-festival_desktop.webp", name: "hero-carousel-one_cokestudio2024_fans-enjoying-coke-at-festival_desktop.webp" },
  { path: "2025/07/png-clipart-atta-flour-maida-flour-bakery-bread-flour-food-bread-thumbnail.png", name: "png-clipart-atta-flour-maida-flour-bakery-bread-flour-food-bread-thumbnail.png" },
  { path: "2025/07/png-clipart-various-seeds-with-wooden-ladles-dal-grocery-store-organic-food-supermarket-others-food-dried-fruit-thumbnail.png", name: "png-clipart-various-seeds-with-wooden-ladles-dal-grocery-store-organic-food-supermarket-others-food-dried-fruit-thumbnail.png" },
  { path: "2025/07/sugar-on-a-black-background-sugar-crystals-close-up-black-background-granulated-sugar-photo.jpg", name: "sugar-on-a-black-background-sugar-crystals-close-up-black-background-granulated-sugar-photo.jpg" },
  { path: "2025/08/AFM01715-800x800.jpg.webp", name: "AFM01715-800x800.jpg.webp" },
  { path: "2025/08/AN313-Tomatoes-732x549-Thumb.jpg", name: "AN313-Tomatoes-732x549-Thumb.jpg" },
  { path: "2025/08/APMM_BONUS-Shampoo_FRONT-scaled.jpg", name: "APMM_BONUS-Shampoo_FRONT-scaled.jpg" },
  { path: "2025/08/APMM_BONUS-Shampoo_FRONT.jpg", name: "APMM_BONUS-Shampoo_FRONT.jpg" },
  { path: "2025/08/Africas-Finest-Ground-Egusi-100g.jpg", name: "Africas-Finest-Ground-Egusi-100g.jpg" },
  { path: "2025/08/Asiko-Plantain-Chips-Sweet-Unsalted.jpg", name: "Asiko-Plantain-Chips-Sweet-Unsalted.jpg" },
  { path: "2025/08/BC-White-Ogi.jpg", name: "BC-White-Ogi.jpg" },
  { path: "2025/08/BC-Yellow-Ogi.jpg", name: "BC-Yellow-Ogi.jpg" },
  { path: "2025/08/BUNNYS-RUBBING-ALCOHOL-236ml-.jpg", name: "BUNNYS-RUBBING-ALCOHOL-236ml-.jpg" },
  { path: "2025/08/BUNNYS-RUBBING-ALCOHOL-GREEN-472ML.jpg", name: "BUNNYS-RUBBING-ALCOHOL-GREEN-472ML.jpg" },
  { path: "2025/08/BUTTER-155ML-BOTTLE-3D-2020-v2.jpg", name: "BUTTER-155ML-BOTTLE-3D-2020-v2.jpg" },
  { path: "2025/08/CHERRY-ESSENCE-155ML.jpg", name: "CHERRY-ESSENCE-155ML.jpg" },
  { path: "2025/08/Derica-tomato-paste-70g_720x@2x.jpg", name: "Derica-tomato-paste-70g_720x@2x.jpg" },
  { path: "2025/08/Dr-Miracle-s-Strengthen-Temple-Nape-Gro-Balm-Super-Strength-4-oz_ed1186e6-a799-47d6-b909-09821d935200.78fb3e1ee6f7848aa0dd0fe26a2b0252.jpeg", name: "Dr-Miracle-s-Strengthen-Temple-Nape-Gro-Balm-Super-Strength-4-oz_ed1186e6-a799-47d6-b909-09821d935200.78fb3e1ee6f7848aa0dd0fe26a2b0252.jpeg" },
  { path: "2025/08/Dr-Miracle-s-Strong-Healthy-Restoring-Hair-Scalp-Oil_137ef20f-0d15-4e2f-a59c-77d0b4b2ada4.b1741e34bd3b924b04be18a15899b326.jpeg", name: "Dr-Miracle-s-Strong-Healthy-Restoring-Hair-Scalp-Oil_137ef20f-0d15-4e2f-a59c-77d0b4b2ada4.b1741e34bd3b924b04be18a15899b326.jpeg" },
  { path: "2025/08/Dream-World-Kid-s-Deluxe-Du-Rag_f66c6078-e276-4d36-9e04-ef84345aca10.7bb88f2d64e034823634462d9f70d99b.jpeg", name: "Dream-World-Kid-s-Deluxe-Du-Rag_f66c6078-e276-4d36-9e04-ef84345aca10.7bb88f2d64e034823634462d9f70d99b.jpeg" },
  { path: "2025/08/Dunns-River-Spices-e1771704471843.jpg", name: "Dunns-River-Spices-e1771704471843.jpg" },
  { path: "2025/08/Dunns-River-Spices.jpg", name: "Dunns-River-Spices.jpg" },
  { path: "2025/08/FADEOUT-ORIGINAL.jpg", name: "FADEOUT-ORIGINAL.jpg" },
  { path: "2025/08/FW-Original-AHA-Savon-200gr-b-zoom.jpg", name: "FW-Original-AHA-Savon-200gr-b-zoom.jpg" },
  { path: "2025/08/FW-Original-CremePurity-200ml-b-zoom.jpg", name: "FW-Original-CremePurity-200ml-b-zoom.jpg" },
  { path: "2025/08/F_WOriginalAHaLotion_0ead9c81-5fc7-4dc9-b301-8dbc1f2de87d_x668@2x.jpg", name: "F_WOriginalAHaLotion_0ead9c81-5fc7-4dc9-b301-8dbc1f2de87d_x668@2x.jpg" },
  { path: "2025/08/Fayrouz-Pineapple-Sleek-Can-33cl.jpg", name: "Fayrouz-Pineapple-Sleek-Can-33cl.jpg" },
  { path: "2025/08/Ghana-Taste-Tuo-Zaafi-Adepa-500g.webp", name: "Ghana-Taste-Tuo-Zaafi-Adepa-500g.webp" },
  { path: "2025/08/Ghanas-Best-100-Pure-Shea-Butter-19.4-oz-White-2.jpg", name: "Ghanas-Best-100-Pure-Shea-Butter-19.4-oz-White-2.jpg" },
  { path: "2025/08/Goya-Extra-Virgin.jpg", name: "Goya-Extra-Virgin.jpg" },
  { path: "2025/08/HEMANI-Coriander-Sauce-10-6-OZ-300g-Fresh-Zesty-SUGAR-FREE-KETO-SAUCE-100-Authentic-Chutney-Perfect-Dipping-Sauce-or-Marinade_a0d6b1be-a827-4d55-9905-ebe2081d2707.a484f6bb5d47e200cecf1cad246838f5.jpeg", name: "HEMANI-Coriander-Sauce-10-6-OZ-300g-Fresh-Zesty-SUGAR-FREE-KETO-SAUCE-100-Authentic-Chutney-Perfect-Dipping-Sauce-or-Marinade_a0d6b1be-a827-4d55-9905-ebe2081d2707.a484f6bb5d47e200cecf1cad246838f5.jpeg" },
  { path: "2025/08/Harina-PAN-Foto-Harina-PAN_1024x1024.jpg", name: "Harina-PAN-Foto-Harina-PAN_1024x1024.jpg" },
  { path: "2025/08/IMG-20231201-WA0087.jpg", name: "IMG-20231201-WA0087.jpg" },
  { path: "2025/08/IMG-20241014-WA0004.jpg", name: "IMG-20241014-WA0004.jpg" },
  { path: "2025/08/IMG_E8774-Copy-6-Copy.jpg", name: "IMG_E8774-Copy-6-Copy.jpg" },
  { path: "2025/08/JBCO-Lavender-Front.jpg", name: "JBCO-Lavender-Front.jpg" },
  { path: "2025/08/KTC-Black-Eye-Beans.jpg", name: "KTC-Black-Eye-Beans.jpg" },
  { path: "2025/08/KTC-Coconut-Oil-500x500__11083.jpg", name: "KTC-Coconut-Oil-500x500__11083.jpg" },
  { path: "2025/08/KTC_Spinach_Leaf_Small_Can_-min.jpg", name: "KTC_Spinach_Leaf_Small_Can_-min.jpg" },
  { path: "2025/08/Kuza-Leave-In-Conditioner-Herstellende-Creme-voor-0.jpg", name: "Kuza-Leave-In-Conditioner-Herstellende-Creme-voor-0.jpg" },
  { path: "2025/08/LARSOR-FRIED-RICE.jpeg", name: "LARSOR-FRIED-RICE.jpeg" },
  { path: "2025/08/LIME-FLAVOURED-HOT-SAUCE-155ML-BOTTLE.jpg", name: "LIME-FLAVOURED-HOT-SAUCE-155ML-BOTTLE.jpg" },
  { path: "2025/08/Lifestyle-Table-Salt-750g-Salt-scaled.jpg", name: "Lifestyle-Table-Salt-750g-Salt-scaled.jpg" },
  { path: "2025/08/Lifestyle-Table-Salt-750g-Salt.jpg", name: "Lifestyle-Table-Salt-750g-Salt.jpg" },
  { path: "2025/08/Lotion-Collection-BBC_1080x1080_crop_center.jpg", name: "Lotion-Collection-BBC_1080x1080_crop_center.jpg" },
  { path: "2025/08/Main_d2187247-669a-402e-9eb1-1e2e38a7de2d.jpg", name: "Main_d2187247-669a-402e-9eb1-1e2e38a7de2d.jpg" },
  { path: "2025/08/Maltina-classic-non-alc-350can_5584fea0-b732-46d8-b09e-96eaace5fdc8_500x.jpg", name: "Maltina-classic-non-alc-350can_5584fea0-b732-46d8-b09e-96eaace5fdc8_500x.jpg" },
  { path: "2025/08/Mama-Kitchen-Golden-crispy-Bread-crumbs.jpg", name: "Mama-Kitchen-Golden-crispy-Bread-crumbs.jpg" },
  { path: "2025/08/Mazuri-Olive-Oil-Hair-Serum_1800x1800.jpg", name: "Mazuri-Olive-Oil-Hair-Serum_1800x1800.jpg" },
  { path: "2025/08/Mother-Africa-Plantain-Fufu-Flour-680g.jpg", name: "Mother-Africa-Plantain-Fufu-Flour-680g.jpg" },
  { path: "2025/08/NUTMEG-ESSENCE-155ML.jpg", name: "NUTMEG-ESSENCE-155ML.jpg" },
  { path: "2025/08/ORANGE-155ML-BOTTLE-3D-2020-v2.jpg", name: "ORANGE-155ML-BOTTLE-3D-2020-v2.jpg" },
  { path: "2025/08/ORS-OLIVE-OIL-PROFESSIONAL-INCREDIBLY-RICH-OIL-MOISTURIZING-HAIR-LOTION-23-Oz-BEAUTY-TALK-LA_90169291-88c4-404b-8343-f6fcd0fc4176.184d909ea48fe828dbda1693e0a6112a.jpeg", name: "ORS-OLIVE-OIL-PROFESSIONAL-INCREDIBLY-RICH-OIL-MOISTURIZING-HAIR-LOTION-23-Oz-BEAUTY-TALK-LA_90169291-88c4-404b-8343-f6fcd0fc4176.184d909ea48fe828dbda1693e0a6112a.jpeg" },
  { path: "2025/08/ORS-Olive-Oil-Built-in-Protection-No-Lye-Relaxer-Extra-Strength-for-Coarse-Resistant-Hair-1-Application_be1bc64f-2918-4376-91f0-d0a8e1799e7a.ded042a86172965f8372bbc9fb2c126a.jpeg", name: "ORS-Olive-Oil-Built-in-Protection-No-Lye-Relaxer-Extra-Strength-for-Coarse-Resistant-Hair-1-Application_be1bc64f-2918-4376-91f0-d0a8e1799e7a.ded042a86172965f8372bbc9fb2c126a.jpeg" },
  { path: "2025/08/ORS-Olive-Oil-Deep-Cleansing-Creamy-Aloe-Shampoo-for-All-Hair-Types-Moisturizing-16-oz_97f22668-5d45-4d2a-99b1-0bc149b61953.573414c08db8fffacfc5781ca35d64ca.jpeg", name: "ORS-Olive-Oil-Deep-Cleansing-Creamy-Aloe-Shampoo-for-All-Hair-Types-Moisturizing-16-oz_97f22668-5d45-4d2a-99b1-0bc149b61953.573414c08db8fffacfc5781ca35d64ca.jpeg" },
  { path: "2025/08/ORS-Olive-Oil-Fix-It-Super-Hold-Wig-Grip-Spray-for-Wigs-Weaves-Grips-Holds-Lace-Frontals-6-2oz-Women_16078c26-04e6-4b03-8d55-262a92bcd6e2.def5fbf4d92cb36740da586aa791af30.jpeg", name: "ORS-Olive-Oil-Fix-It-Super-Hold-Wig-Grip-Spray-for-Wigs-Weaves-Grips-Holds-Lace-Frontals-6-2oz-Women_16078c26-04e6-4b03-8d55-262a92bcd6e2.def5fbf4d92cb36740da586aa791af30.jpeg" },
  { path: "2025/08/ORS-Olive-Oil-Hair-Masque-311.8-g-1.jpg", name: "ORS-Olive-Oil-Hair-Masque-311.8-g-1.jpg" },
  { path: "2025/08/ORS-Olive-Oil-Hold-Shine-Wrap-Set-Mousse_df575021-8819-4b54-9c56-6d5ab669d503.9095af53d3605e1983a6a68071ec2e16.jpeg", name: "ORS-Olive-Oil-Hold-Shine-Wrap-Set-Mousse_df575021-8819-4b54-9c56-6d5ab669d503.9095af53d3605e1983a6a68071ec2e16.jpeg" },
  { path: "2025/08/ORS-Olive-Oil-Style-Curl-Defining-Smooth-N-Hold-Pudding-for-All-Hair-Types-Lasting-Hold-13oz_3a468e76-ed8c-4378-b457-8640812af186.914e5952eaca348d300b0665c48fd68d.jpeg", name: "ORS-Olive-Oil-Style-Curl-Defining-Smooth-N-Hold-Pudding-for-All-Hair-Types-Lasting-Hold-13oz_3a468e76-ed8c-4378-b457-8640812af186.914e5952eaca348d300b0665c48fd68d.jpeg" },
  { path: "2025/08/ORS-Tea-Tree-Oil-Hairdress-Soothing-Hair-Scalp-Oil-5-5-oz_bcbd2768-dfc5-4076-9687-dd2ddb858e8c.c303c0bad107d637981fadc0efb224f8.jpeg", name: "ORS-Tea-Tree-Oil-Hairdress-Soothing-Hair-Scalp-Oil-5-5-oz_bcbd2768-dfc5-4076-9687-dd2ddb858e8c.c303c0bad107d637981fadc0efb224f8.jpeg" },
  { path: "2025/08/Ogbono_Seeds_f3bbfa17-73fb-41a1-b5f5-0136d4db8689.jpg", name: "Ogbono_Seeds_f3bbfa17-73fb-41a1-b5f5-0136d4db8689.jpg" },
  { path: "2025/08/Ors-Olive-Oil-Fix-It-Hair-Extension-Detangler-6-2-Oz_e37f0605-6c7c-4961-ace2-2464b1643dcc.7a917cfc77d28ad200615bf9c4a52175.jpeg", name: "Ors-Olive-Oil-Fix-It-Hair-Extension-Detangler-6-2-Oz_e37f0605-6c7c-4961-ace2-2464b1643dcc.7a917cfc77d28ad200615bf9c4a52175.jpeg" },
  { path: "2025/08/PCD-Pate-dArachide-Toasted-Peanut-Paste.jpg", name: "PCD-Pate-dArachide-Toasted-Peanut-Paste.jpg" },
  { path: "2025/08/Pack-of-6-Ghana-Taste-Smooth-Peanut-Paste-500G.jpg", name: "Pack-of-6-Ghana-Taste-Smooth-Peanut-Paste-500G.jpg" },
  { path: "2025/08/Pegasus-Olive-Oil-250ml-LOW-RES.jpg", name: "Pegasus-Olive-Oil-250ml-LOW-RES.jpg" },
  { path: "2025/08/Pro-Line-Hair-Food-Original-Formula-4.5oz-1.jpg", name: "Pro-Line-Hair-Food-Original-Formula-4.5oz-1.jpg" },
  { path: "2025/08/Pro-line-Comb-Thru-Softener-For-Instant-Style-Control-10oz-1.jpg", name: "Pro-line-Comb-Thru-Softener-For-Instant-Style-Control-10oz-1.jpg" },
  { path: "2025/08/Rain-Multi-Purpose-Insect-Killer-300ml.jpg", name: "Rain-Multi-Purpose-Insect-Killer-300ml.jpg" },
  { path: "2025/08/Revlon-Realistic-Black-Seed-Oil-Strengthening-Twisting-Pudding-Flake-free-10-1oz_b51fe8ec-aa14-4e4d-9a1a-bd753080a4f2.bcfe6440489c12138782c0ff30850bad.jpeg", name: "Revlon-Realistic-Black-Seed-Oil-Strengthening-Twisting-Pudding-Flake-free-10-1oz_b51fe8ec-aa14-4e4d-9a1a-bd753080a4f2.bcfe6440489c12138782c0ff30850bad.jpeg" },
  { path: "2025/08/SheaMoisture-Kids-Braiding-Jam-Hair-Gel-Coconut-and-Hibiscus-5-5-oz_ac1d3ffd-cd80-4863-889a-ac42413a277d.1dbff7b0acce81e866dc0533f22902b9.jpeg", name: "SheaMoisture-Kids-Braiding-Jam-Hair-Gel-Coconut-and-Hibiscus-5-5-oz_ac1d3ffd-cd80-4863-889a-ac42413a277d.1dbff7b0acce81e866dc0533f22902b9.jpeg" },
  { path: "2025/08/SofnFree-Coconut-Oil-Almond-Oil-Avocado-Oil-Gel-250ml.jpg", name: "SofnFree-Coconut-Oil-Almond-Oil-Avocado-Oil-Gel-250ml.jpg" },
  { path: "2025/08/Sofnfree-Curl-Activator-Lotion-1-Litre-2.jpg", name: "Sofnfree-Curl-Activator-Lotion-1-Litre-2.jpg" },
  { path: "2025/08/Sofnfree-Moisturizing-Conditioner-For-Natural-Hair-350ml-1.jpg", name: "Sofnfree-Moisturizing-Conditioner-For-Natural-Hair-350ml-1.jpg" },
  { path: "2025/08/Sofra-Fava-BeansLarge-650g-Middle-Eastern_720x.jpg", name: "Sofra-Fava-BeansLarge-650g-Middle-Eastern_720x.jpg" },
  { path: "2025/08/Soft-Drnk-Teem-500Ml-NRB-Bitter-Lemon-199.99.jpg", name: "Soft-Drnk-Teem-500Ml-NRB-Bitter-Lemon-199.99.jpg" },
  { path: "2025/08/Sta-Sof-Sro-Extra-Dry-Hair-Spray-16.91oz500ml.jpg", name: "Sta-Sof-Sro-Extra-Dry-Hair-Spray-16.91oz500ml.jpg" },
  { path: "2025/08/Stella-10-inch-Long-Rake-Handle-Styling-Comb-2441.jpg", name: "Stella-10-inch-Long-Rake-Handle-Styling-Comb-2441.jpg" },
  { path: "2025/08/Stella-Flawless-Detangling-Styling-Comb-2449.jpg", name: "Stella-Flawless-Detangling-Styling-Comb-2449.jpg" },
  { path: "2025/08/Stella-Long-Pan-Shape-Metal-Pik-Styling-Comb-2411.jpg", name: "Stella-Long-Pan-Shape-Metal-Pik-Styling-Comb-2411.jpg" },
  { path: "2025/08/Stella-Metal-Pik-Styling-Comb-Short-Pan-Shape-2412.jpg", name: "Stella-Metal-Pik-Styling-Comb-Short-Pan-Shape-2412.jpg" },
  { path: "2025/08/Stella-Tapered-Bone-Tail-Styling-Comb-2419BLA.jpg", name: "Stella-Tapered-Bone-Tail-Styling-Comb-2419BLA.jpg" },
  { path: "2025/08/Tiger-Tumeric.jpg", name: "Tiger-Tumeric.jpg" },
  { path: "2025/08/Top_Grenadine_-_AfroAsoaa.com_700x.jpg", name: "Top_Grenadine_-_AfroAsoaa.com_700x.jpg" },
  { path: "2025/08/Top_Pamplemousses_-_AfroAsia.com_400x.jpg", name: "Top_Pamplemousses_-_AfroAsia.com_400x.jpg" },
  { path: "2025/08/Tropical-Sun-Adobo-Seasoning_medium.jpg", name: "Tropical-Sun-Adobo-Seasoning_medium.jpg" },
  { path: "2025/08/Tropical-Sun-All-Purpose-Seasoning_medium.jpg", name: "Tropical-Sun-All-Purpose-Seasoning_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Arrowroot_medium.jpg", name: "Tropical-Sun-Arrowroot_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Bar-B-Que-Seasoning_medium.jpg", name: "Tropical-Sun-Bar-B-Que-Seasoning_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Cajun-Seasoning_medium.jpg", name: "Tropical-Sun-Cajun-Seasoning_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Chicken-Seasoning_medium.jpg", name: "Tropical-Sun-Chicken-Seasoning_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Curry-Goat-Seasoning_medium.jpg", name: "Tropical-Sun-Curry-Goat-Seasoning_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Everyday-Seasoning_medium.jpg", name: "Tropical-Sun-Everyday-Seasoning_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Garlic-Salt_medium.jpg", name: "Tropical-Sun-Garlic-Salt_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Ground-Pimento_medium.jpg", name: "Tropical-Sun-Ground-Pimento_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Hot-Curry-Powder_medium.jpg", name: "Tropical-Sun-Hot-Curry-Powder_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Lamb-Seasoning_medium.jpg", name: "Tropical-Sun-Lamb-Seasoning_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Lemon-Peppa_medium.jpg", name: "Tropical-Sun-Lemon-Peppa_medium.jpg" },
  { path: "2025/08/Tropical-Sun-Mild-Curry-Powder_1200x1200.jpg", name: "Tropical-Sun-Mild-Curry-Powder_1200x1200.jpg" },
  { path: "2025/08/Tropical-Sun-Mutton-Seasoning_1200x1200.jpg", name: "Tropical-Sun-Mutton-Seasoning_1200x1200.jpg" },
  { path: "2025/08/Tropical-Sun-Peri-Peri-Seasoning_1200x1200.jpg", name: "Tropical-Sun-Peri-Peri-Seasoning_1200x1200.jpg" },
  { path: "2025/08/Tropical-Sun-Salad-Seasoning_1200x1200.jpg", name: "Tropical-Sun-Salad-Seasoning_1200x1200.jpg" },
  { path: "2025/08/Tropical-Sun-Sea-Salt-Malt-Vinegar-Seasoning_1200x1200.jpg", name: "Tropical-Sun-Sea-Salt-Malt-Vinegar-Seasoning_1200x1200.jpg" },
  { path: "2025/08/Tropical-Sun-Tropical-Seasoning_1200x1200.jpg", name: "Tropical-Sun-Tropical-Seasoning_1200x1200.jpg" },
  { path: "2025/08/TropicalSunCrunchyCoconutPeanuts50g_ec8d4ba8-a050-43bb-8eda-a67b68efabbb_1200x1200.jpg", name: "TropicalSunCrunchyCoconutPeanuts50g_ec8d4ba8-a050-43bb-8eda-a67b68efabbb_1200x1200.jpg" },
  { path: "2025/08/Tropical_Sun_Black_Eyed_Beans_5Kg_0b201b82-9e30-406e-85ce-a6b544b89346_medium.jpg", name: "Tropical_Sun_Black_Eyed_Beans_5Kg_0b201b82-9e30-406e-85ce-a6b544b89346_medium.jpg" },
  { path: "2025/08/Tropical_Sun_Crushed_Red_Chillies_50g_Tub_4d7e67fe-fa45-4376-8394-55710b2e3d18_medium.jpg", name: "Tropical_Sun_Crushed_Red_Chillies_50g_Tub_4d7e67fe-fa45-4376-8394-55710b2e3d18_medium.jpg" },
  { path: "2025/08/Tropical_Sun_Red_Kidney_Beans_5Kg_27cc7dcc-08ce-4f92-9c79-1ad3e2f7c1ce_1200x1200.jpg", name: "Tropical_Sun_Red_Kidney_Beans_5Kg_27cc7dcc-08ce-4f92-9c79-1ad3e2f7c1ce_1200x1200.jpg" },
  { path: "2025/08/Untitled-3Artboard1_dec82562-c02b-4fbd-9b94-8ad7b682b891.jpg", name: "Untitled-3Artboard1_dec82562-c02b-4fbd-9b94-8ad7b682b891.jpg" },
  { path: "2025/08/VITA-BONGA-FILLET-10X120G.jpg", name: "VITA-BONGA-FILLET-10X120G.jpg" },
  { path: "2025/08/Village_Pride_Irish_Sea_Moss_-_80g_4370afe7-b3a0-4754-af98-3fa48419dcb3_994x994.jpg", name: "Village_Pride_Irish_Sea_Moss_-_80g_4370afe7-b3a0-4754-af98-3fa48419dcb3_994x994.jpg" },
  { path: "2025/08/VitalOliveOilHairPolisher177mlinpakistan-2-500x554_medium.jpg", name: "VitalOliveOilHairPolisher177mlinpakistan-2-500x554_medium.jpg" },
  { path: "2025/08/YEDVGZ1114622-0-dgl-NL.jpg", name: "YEDVGZ1114622-0-dgl-NL.jpg" },
  { path: "2025/08/a20fbdcb-312d-4d56-97c9-27aa73fb5fcb.webp", name: "a20fbdcb-312d-4d56-97c9-27aa73fb5fcb.webp" },
  { path: "2025/08/aHR0cHM6Ly93d3cubXloYWlyc2hvcC5ubC9tZWRpYS9jYXRhbG9nL3Byb2R1Y3Qvay9lL2tlcmFjYXJlX2h5ZHJhdGluZ19kZXRhbmdsaW5nX3N1bGZhdGVfZnJlZV9zaGFtcG9vXzk1MG1sLmpwZz93aWR0aD03OTAmaGVpZ2h0PTc5MCZzdG9yZT1ubCZpbWFnZS10eXBlPWltYWdl-1.jpg", name: "aHR0cHM6Ly93d3cubXloYWlyc2hvcC5ubC9tZWRpYS9jYXRhbG9nL3Byb2R1Y3Qvay9lL2tlcmFjYXJlX2h5ZHJhdGluZ19kZXRhbmdsaW5nX3N1bGZhdGVfZnJlZV9zaGFtcG9vXzk1MG1sLmpwZz93aWR0aD03OTAmaGVpZ2h0PTc5MCZzdG9yZT1ubCZpbWFnZS10eXBlPWltYWdl-1.jpg" },
  { path: "2025/08/aHR0cHM6Ly93d3cubXloYWlyc2hvcC5ubC9tZWRpYS9jYXRhbG9nL3Byb2R1Y3Qvay9lL2tlcmFjYXJlX2h5ZHJhdGluZ19kZXRhbmdsaW5nX3N1bGZhdGVfZnJlZV9zaGFtcG9vXzk1MG1sLmpwZz93aWR0aD03OTAmaGVpZ2h0PTc5MCZzdG9yZT1ubCZpbWFnZS10eXBlPWltYWdl-2.jpg", name: "aHR0cHM6Ly93d3cubXloYWlyc2hvcC5ubC9tZWRpYS9jYXRhbG9nL3Byb2R1Y3Qvay9lL2tlcmFjYXJlX2h5ZHJhdGluZ19kZXRhbmdsaW5nX3N1bGZhdGVfZnJlZV9zaGFtcG9vXzk1MG1sLmpwZz93aWR0aD03OTAmaGVpZ2h0PTc5MCZzdG9yZT1ubCZpbWFnZS10eXBlPWltYWdl-2.jpg" },
  { path: "2025/08/african-pride-dream-kids-olive-miracle-detangler-8_6093d387-14a3-486a-9b6f-5a937b827339.jpg", name: "african-pride-dream-kids-olive-miracle-detangler-8_6093d387-14a3-486a-9b6f-5a937b827339.jpg" },
  { path: "2025/08/africas-best-kids-organics-protein-plus-growth-oil.jpg", name: "africas-best-kids-organics-protein-plus-growth-oil.jpg" },
  { path: "2025/08/as-i-am-cleansing-pudding-237ml.jpg", name: "as-i-am-cleansing-pudding-237ml.jpg" },
  { path: "2025/08/b026d0fc-ce59-477e-a09a-b8a14e77b124.webp", name: "b026d0fc-ce59-477e-a09a-b8a14e77b124.webp" },
  { path: "2025/08/bb-clear-savon-eclaircissant-aux-acides-de-fruits-190-g_430x528.jpg", name: "bb-clear-savon-eclaircissant-aux-acides-de-fruits-190-g_430x528.jpg" },
  { path: "2025/08/buttermints-30_units.jpg", name: "buttermints-30_units.jpg" },
  { path: "2025/08/c6906b7b-62f7-4a5b-9752-a830ad9822cf_1012440124.jpeg", name: "c6906b7b-62f7-4a5b-9752-a830ad9822cf_1012440124.jpeg" },
  { path: "2025/08/cherish-drawstring-pony-tail-afro-puff-curling-iron-11.jpg", name: "cherish-drawstring-pony-tail-afro-puff-curling-iron-11.jpg" },
  { path: "2025/08/dark-and-lovely-gro-strong-hair-food-anti-dandruff-250ml.jpg", name: "dark-and-lovely-gro-strong-hair-food-anti-dandruff-250ml.jpg" },
  { path: "2025/08/dax-light-pomade-14-aug-v1.jpg", name: "dax-light-pomade-14-aug-v1.jpg" },
  { path: "2025/08/dd041621-db92-4fb9-9fcf-ed08206e9ce7.jpg", name: "dd041621-db92-4fb9-9fcf-ed08206e9ce7.jpg" },
  { path: "2025/08/dry-abacha-1.jpg", name: "dry-abacha-1.jpg" },
  { path: "2025/08/encona-wi-papaya-hot-pepper-sauce-142ml-41791517786350.jpg", name: "encona-wi-papaya-hot-pepper-sauce-142ml-41791517786350.jpg" },
  { path: "2025/08/ghana-taste-nkontomire-400g.jpg", name: "ghana-taste-nkontomire-400g.jpg" },
  { path: "2025/08/ghana-taste-pea-aubergine-400g-honesty-sales-u-k.jpg", name: "ghana-taste-pea-aubergine-400g-honesty-sales-u-k.jpg" },
  { path: "2025/08/glucoblocker-tea.jpeg", name: "glucoblocker-tea.jpeg" },
  { path: "2025/08/green-jackfruit-by-trs-vegan-14903-p.jpeg", name: "green-jackfruit-by-trs-vegan-14903-p.jpeg" },
  { path: "2025/08/honeyginger-1.jpg", name: "honeyginger-1.jpg" },
  { path: "2025/08/hot-lips-cocoa-butter.webp", name: "hot-lips-cocoa-butter.webp" },
  { path: "2025/08/https3A2F2Fwww.gracefoods.co_.uk2Fuploads2Fimg2F428826-Dunn_s-River-Peas-_-Beans-400g.webp", name: "https3A2F2Fwww.gracefoods.co_.uk2Fuploads2Fimg2F428826-Dunn_s-River-Peas-_-Beans-400g.webp" },
  { path: "2025/08/https3A2F2Fwww.gracefoods.co_.uk2Fuploads2Fimg2F428874-Dunn_s-River-Tropical-Seasoning-100g.webp", name: "https3A2F2Fwww.gracefoods.co_.uk2Fuploads2Fimg2F428874-Dunn_s-River-Tropical-Seasoning-100g.webp" },
  { path: "2025/08/https3A2F2Fwww.gracefoods.co_.uk2Fuploads2Fimg2F428876-Dunn_s-River-Whole-Pimento-70g.webp", name: "https3A2F2Fwww.gracefoods.co_.uk2Fuploads2Fimg2F428876-Dunn_s-River-Whole-Pimento-70g.webp" },
  { path: "2025/08/image-4-scaled.jpeg", name: "image-4-scaled.jpeg" },
  { path: "2025/08/image_039f770b-65b2-4d76-960b-537229c7c01d.jpg", name: "image_039f770b-65b2-4d76-960b-537229c7c01d.jpg" },
  { path: "2025/08/image_56f099e9-6989-470a-a6b6-550196040ce7_1800x1800.jpg", name: "image_56f099e9-6989-470a-a6b6-550196040ce7_1800x1800.jpg" },
  { path: "2025/08/images-2025-05-13T193810.430.jpeg", name: "images-2025-05-13T193810.430.jpeg" },
  { path: "2025/08/jr-beauty-bee-wax-max-strength-16oz-11250-p.jpg", name: "jr-beauty-bee-wax-max-strength-16oz-11250-p.jpg" },
  { path: "2025/08/jumbo-lamb-bouillon-cubes-80g-herbs-spices-and-seasonings-m-n-norwood-halal-butchers-and-grocers-167735_540x_00a09059-1c98-474a-a1e4-35294b8dac89.jpg", name: "jumbo-lamb-bouillon-cubes-80g-herbs-spices-and-seasonings-m-n-norwood-halal-butchers-and-grocers-167735_540x_00a09059-1c98-474a-a1e4-35294b8dac89.jpg" },
  { path: "2025/08/keracare-3-style-silken-seal-blow-drying-complex.jpg", name: "keracare-3-style-silken-seal-blow-drying-complex.jpg" },
  { path: "2025/08/keracare-conditioning-creme-hairdress.jpg", name: "keracare-conditioning-creme-hairdress.jpg" },
  { path: "2025/08/keracare-hydrating-detangling-sulfate-free-shampoo-1.jpg", name: "keracare-hydrating-detangling-sulfate-free-shampoo-1.jpg" },
  { path: "2025/08/keracare-hydrating-detangling-sulfate-free-shampoo.jpg", name: "keracare-hydrating-detangling-sulfate-free-shampoo.jpg" },
  { path: "2025/08/koo-whole-kernel-corn-410g.jpg", name: "koo-whole-kernel-corn-410g.jpg" },
  { path: "2025/08/kool-aid-mixed-berry-candy-district.jpg", name: "kool-aid-mixed-berry-candy-district.jpg" },
  { path: "2025/08/kool-aid_berry_cherry.jpg", name: "kool-aid_berry_cherry.jpg" },
  { path: "2025/08/lekair-shampoo.jpg", name: "lekair-shampoo.jpg" },
  { path: "2025/08/magic-collection-275-pcs-black-rubber-band-2751blk-342445_800x800.jpg", name: "magic-collection-275-pcs-black-rubber-band-2751blk-342445_800x800.jpg" },
  { path: "2025/08/main_f88330ac-cf99-4a24-aa79-75f2e3b27fa0_x668@2x.jpg", name: "main_f88330ac-cf99-4a24-aa79-75f2e3b27fa0_x668@2x.jpg" },
  { path: "2025/08/malta-guiness-33cl-can-buy-drinks-online-niaja-nigeria.jpg", name: "malta-guiness-33cl-can-buy-drinks-online-niaja-nigeria.jpg" },
  { path: "2025/08/mazuri-kids-olive-oil-shampoosie-moisturizing-detangling-shampoo.jpg", name: "mazuri-kids-olive-oil-shampoosie-moisturizing-detangling-shampoo.jpg" },
  { path: "2025/08/mazuri-original-olive-oil-detangling-curl-spray.jpg", name: "mazuri-original-olive-oil-detangling-curl-spray.jpg" },
  { path: "2025/08/medium_1fe6e283-f85e-449b-80eb-e1b753c1a3c5_1000x.jpg", name: "medium_1fe6e283-f85e-449b-80eb-e1b753c1a3c5_1000x.jpg" },
  { path: "2025/08/medium_c926d14c-42b6-4858-977b-018a303a3480_1000x.jpg", name: "medium_c926d14c-42b6-4858-977b-018a303a3480_1000x.jpg" },
  { path: "2025/08/mega-thick-formula-hair-oil-alt-1f431995.webp", name: "mega-thick-formula-hair-oil-alt-1f431995.webp" },
  { path: "2025/08/mega-thick-intense-repair-1-f6cfd208.webp", name: "mega-thick-intense-repair-1-f6cfd208.webp" },
  { path: "2025/08/miracle-hair-twist-double-sided-sponge-brush-e-191-p.jpg", name: "miracle-hair-twist-double-sided-sponge-brush-e-191-p.jpg" },
  { path: "2025/08/miracle-maxitone-acne-soap_large.jpg", name: "miracle-maxitone-acne-soap_large.jpg" },
  { path: "2025/08/moin-moin-mix.jpg", name: "moin-moin-mix.jpg" },
  { path: "2025/08/ndtc1116799_palmers-cocoa-night-renewal-cream-75-g.jpg", name: "ndtc1116799_palmers-cocoa-night-renewal-cream-75-g.jpg" },
  { path: "2025/08/original_6fdf69da-4995-40ea-ad1e-a317e211c2b5.jpg", name: "original_6fdf69da-4995-40ea-ad1e-a317e211c2b5.jpg" },
  { path: "2025/08/ors-olive-oil-replenishing-conditioner-12.25oz.jpeg", name: "ors-olive-oil-replenishing-conditioner-12.25oz.jpeg" },
  { path: "2025/08/patrol-grooming-bump-patrol-aftershave-sensitive-30471630389382.jpg", name: "patrol-grooming-bump-patrol-aftershave-sensitive-30471630389382.jpg" },
  { path: "2025/08/pokka-japanese-green-tea-export-02-1500ml.tmb-432_401.jpg", name: "pokka-japanese-green-tea-export-02-1500ml.tmb-432_401.jpg" },
  { path: "2025/08/preema-egg-yellow-food-colouring-powder-500g-home-baking-and-sugar-m-n-norwood-halal-butchers-and-grocers-851249.jpg", name: "preema-egg-yellow-food-colouring-powder-500g-home-baking-and-sugar-m-n-norwood-halal-butchers-and-grocers-851249.jpg" },
  { path: "2025/08/prime-lemon-lime-citron-vert-hydration-drink-500ml.jpg", name: "prime-lemon-lime-citron-vert-hydration-drink-500ml.jpg" },
  { path: "2025/08/prod-gel-color-treated.webp", name: "prod-gel-color-treated.webp" },
  { path: "2025/08/pure-heaven-sparkling-white-grape-1.jpg", name: "pure-heaven-sparkling-white-grape-1.jpg" },
  { path: "2025/08/qs2977h3-1-optimized.jpg", name: "qs2977h3-1-optimized.jpg" },
  { path: "2025/08/shea-moisture-strenghten-and-restore-conditioner-384ml.webp", name: "shea-moisture-strenghten-and-restore-conditioner-384ml.webp" },
  { path: "2025/08/skin-success-optimized.jpg", name: "skin-success-optimized.jpg" },
  { path: "2025/08/stress-free-oilsunny-isle-cbd-replenish-rejuvenate-stress-free-oil-2fl-oz-760757_1197x1197.jpg", name: "stress-free-oilsunny-isle-cbd-replenish-rejuvenate-stress-free-oil-2fl-oz-760757_1197x1197.jpg" },
  { path: "2025/08/strong-pure-peppermint-tea.jpeg", name: "strong-pure-peppermint-tea.jpeg" },
  { path: "2025/08/super-detox-tea.jpeg", name: "super-detox-tea.jpeg" },
  { path: "2025/08/top-orange-423383_1000x.jpg", name: "top-orange-423383_1000x.jpg" },
  { path: "2025/08/tumbnail_57441432-a104-4e64-841d-58beed858ccc.jpg", name: "tumbnail_57441432-a104-4e64-841d-58beed858ccc.jpg" },
  { path: "2025/08/ultimate-originals-cocoa-butter-shea-butter-body-l.webp", name: "ultimate-originals-cocoa-butter-shea-butter-body-l.webp" },
  { path: "2025/08/walker-tape-walker-tape-lace-release-118ml.jpg", name: "walker-tape-walker-tape-lace-release-118ml.jpg" },
  { path: "2025/08/whole-grain_1.webp", name: "whole-grain_1.webp" },
  { path: "2025/10/ChatGPT-Image-Oct-25-2025-02_02_41-AM.png", name: "ChatGPT-Image-Oct-25-2025-02_02_41-AM.png" },
  { path: "2026/02/Barbeque-Spice.jpg", name: "Barbeque-Spice.jpg" },
  { path: "2026/02/Copy-of-Fresh-Foods.jpg", name: "Copy-of-Fresh-Foods.jpg" },
  { path: "2026/02/Dunns-River-All-Purpose-100g-scaled.jpg", name: "Dunns-River-All-Purpose-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-All-Purpose-100g.jpg", name: "Dunns-River-All-Purpose-100g.jpg" },
  { path: "2026/02/Dunns-River-Beef-Steak-100g-scaled.jpg", name: "Dunns-River-Beef-Steak-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Beef-Steak-100g.jpg", name: "Dunns-River-Beef-Steak-100g.jpg" },
  { path: "2026/02/Dunns-River-Cock-scaled.jpg", name: "Dunns-River-Cock-scaled.jpg" },
  { path: "2026/02/Dunns-River-Cock.jpg", name: "Dunns-River-Cock.jpg" },
  { path: "2026/02/Dunns-River-Dried-Thyme-100g-scaled.jpg", name: "Dunns-River-Dried-Thyme-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Dried-Thyme-100g.jpg", name: "Dunns-River-Dried-Thyme-100g.jpg" },
  { path: "2026/02/Dunns-River-Fish-100g-scaled.jpg", name: "Dunns-River-Fish-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Fish-100g.jpg", name: "Dunns-River-Fish-100g.jpg" },
  { path: "2026/02/Dunns-River-Ginger-Garlic-Pimento-80g-scaled.jpg", name: "Dunns-River-Ginger-Garlic-Pimento-80g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Ginger-Garlic-Pimento-80g.jpg", name: "Dunns-River-Ginger-Garlic-Pimento-80g.jpg" },
  { path: "2026/02/Dunns-River-Ground-Nutmeg-100g-scaled.jpg", name: "Dunns-River-Ground-Nutmeg-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Ground-Nutmeg-100g.jpg", name: "Dunns-River-Ground-Nutmeg-100g.jpg" },
  { path: "2026/02/Dunns-River-Jerk-100g-scaled.jpg", name: "Dunns-River-Jerk-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Jerk-100g.jpg", name: "Dunns-River-Jerk-100g.jpg" },
  { path: "2026/02/Dunns-River-Lamb-100g-scaled.jpg", name: "Dunns-River-Lamb-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Lamb-100g.jpg", name: "Dunns-River-Lamb-100g.jpg" },
  { path: "2026/02/Dunns-River-Lemon-Jerk-100g-scaled.jpg", name: "Dunns-River-Lemon-Jerk-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Lemon-Jerk-100g.jpg", name: "Dunns-River-Lemon-Jerk-100g.jpg" },
  { path: "2026/02/Dunns-River-Mild-Curry-100g-scaled.jpg", name: "Dunns-River-Mild-Curry-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Mild-Curry-100g.jpg", name: "Dunns-River-Mild-Curry-100g.jpg" },
  { path: "2026/02/Dunns-River-Mixed-Herbs-100g-scaled.jpg", name: "Dunns-River-Mixed-Herbs-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Mixed-Herbs-100g.jpg", name: "Dunns-River-Mixed-Herbs-100g.jpg" },
  { path: "2026/02/Dunns-River-Oxtail-100g-scaled.jpg", name: "Dunns-River-Oxtail-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Oxtail-100g.jpg", name: "Dunns-River-Oxtail-100g.jpg" },
  { path: "2026/02/Dunns-River-Peri-Peri-100g-scaled.jpg", name: "Dunns-River-Peri-Peri-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Peri-Peri-100g.jpg", name: "Dunns-River-Peri-Peri-100g.jpg" },
  { path: "2026/02/Dunns-River-Peri-Peri-scaled.jpg", name: "Dunns-River-Peri-Peri-scaled.jpg" },
  { path: "2026/02/Dunns-River-Peri-Peri.jpg", name: "Dunns-River-Peri-Peri.jpg" },
  { path: "2026/02/Dunns-River-Tropical-100g-scaled.jpg", name: "Dunns-River-Tropical-100g-scaled.jpg" },
  { path: "2026/02/Dunns-River-Tropical-100g.jpg", name: "Dunns-River-Tropical-100g.jpg" },
  { path: "2026/02/Dunns-River-ground-black-pepper-scaled.jpg", name: "Dunns-River-ground-black-pepper-scaled.jpg" },
  { path: "2026/02/Dunns-River-ground-black-pepper.jpg", name: "Dunns-River-ground-black-pepper.jpg" },
  { path: "2026/02/Dunns-River-ground-pimento-scaled.jpg", name: "Dunns-River-ground-pimento-scaled.jpg" },
  { path: "2026/02/Dunns-River-ground-pimento.jpg", name: "Dunns-River-ground-pimento.jpg" },
  { path: "2026/02/Fresh-Foods-1.jpg", name: "Fresh-Foods-1.jpg" },
  { path: "2026/02/Fresh-Foods-2.jpg", name: "Fresh-Foods-2.jpg" },
  { path: "2026/02/Garlic-Salt-100g.jpg", name: "Garlic-Salt-100g.jpg" },
  { path: "2026/02/Jumbo-UK-Spices.jpg", name: "Jumbo-UK-Spices.jpg" },
  { path: "2026/02/Rajah-All-in-One-scaled.jpg", name: "Rajah-All-in-One-scaled.jpg" },
  { path: "2026/02/Rajah-All-in-One.jpg", name: "Rajah-All-in-One.jpg" },
  { path: "2026/02/Rajah-Flavourful-Mild-scaled.jpg", name: "Rajah-Flavourful-Mild-scaled.jpg" },
  { path: "2026/02/Rajah-Flavourful-Mild.jpg", name: "Rajah-Flavourful-Mild.jpg" },
  { path: "2026/02/Rajah-Hot-scaled.jpg", name: "Rajah-Hot-scaled.jpg" },
  { path: "2026/02/Rajah-Medium-scaled.jpg", name: "Rajah-Medium-scaled.jpg" },
  { path: "2026/02/Rajah-Medium.jpg", name: "Rajah-Medium.jpg" },
  { path: "2026/02/Rajah-Mild-Spicy-scaled.jpg", name: "Rajah-Mild-Spicy-scaled.jpg" },
  { path: "2026/02/Rajah-Mild-Spicy.jpg", name: "Rajah-Mild-Spicy.jpg" },
  { path: "2026/02/Shop-Front-Image.jpg", name: "Shop-Front-Image.jpg" },
  { path: "2026/02/Spicy-Hill-Farms-Logo.jpg", name: "Spicy-Hill-Farms-Logo.jpg" },
  { path: "2026/02/dunn-s-river-everyday-seasoning-100g.jpg", name: "dunn-s-river-everyday-seasoning-100g.jpg" },
  { path: "2026/02/dunn-s-river-mixed-spice-70g.jpg", name: "dunn-s-river-mixed-spice-70g.jpg" },
];

function normalise(str: string): string[] {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 1);
}

function bestMatch(productName: string): string | null {
  let best: string | null = null;
  let bestScore = 0;
  for (const img of IMAGE_INDEX) {
    const imgName   = img.name.replace(/\.[^.]+$/, '');
    const prodWords = new Set(normalise(productName));
    const imgWords  = normalise(imgName);
    if (!imgWords.length) continue;
    let matches = 0;
    for (const w of imgWords) if (prodWords.has(w)) matches++;
    const score = matches / imgWords.length;
    if (score > bestScore) { bestScore = score; best = img.path; }
  }
  return bestScore >= 0.5 ? best : null;
}

function getAuth(): string {
  return 'Basic ' + Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
}

async function getProducts(): Promise<any[]> {
  let page = 1, all: any[] = [];
  while (true) {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products?per_page=100&page=${page}&status=publish`,
      { headers: { Authorization: getAuth() }, cache: 'no-store' }
    );
    if (!res.ok) throw new Error(`WC API ${res.status}`);
    const batch = await res.json();
    if (!batch.length) break;
    all = all.concat(batch);
    page++;
    if (batch.length < 100) break;
  }
  return all;
}

async function setProductImage(id: number, imageUrl: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/wp-json/wc/v3/products/${id}`, {
    method: 'PUT',
    headers: { Authorization: getAuth(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ images: [{ src: imageUrl }] }),
  });
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('token') !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }
  const dryRun = searchParams.get('dry') === '1';

  try {
    const products = await getProducts();
    const noImage  = products.filter((p: any) => !p.images?.length);
    const hasImage = products.filter((p: any) => p.images?.length);
    const results: any[] = [];
    let updated = 0, skipped = 0, failed = 0;

    for (const product of noImage) {
      const matchPath = bestMatch(product.name);
      if (!matchPath) {
        skipped++;
        results.push({ id: product.id, name: product.name, status: 'no_match' });
        continue;
      }
      const imageUrl = `${BASE_URL}/wp-content/uploads/${matchPath}`;
      if (dryRun) {
        updated++;
        results.push({ id: product.id, name: product.name, status: 'would_update', image: imageUrl });
        continue;
      }
      try {
        await setProductImage(product.id, imageUrl);
        updated++;
        results.push({ id: product.id, name: product.name, status: 'updated', image: imageUrl });
      } catch (err: any) {
        failed++;
        results.push({ id: product.id, name: product.name, status: 'error', error: err.message });
      }
      await new Promise(r => setTimeout(r, 150));
    }

    return NextResponse.json({
      summary: { total: products.length, already_had_images: hasImage.length, missing_images: noImage.length, updated, skipped, failed, dry_run: dryRun },
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
