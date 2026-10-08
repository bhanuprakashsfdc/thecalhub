import type { CalculatorSEOContent } from './seo-data';

export const SEO_DATA_BATCH_B: Record<string, CalculatorSEOContent> = {
  'calorie-calculator': {
    title: "Daily Calories, TDEE and Cutting: Understanding the",
    subtitle: "Calorie Calculator",
    introduction: "Every calorie figure published online comes from the same two steps: an estimate of what your body burns doing nothing, and a multiplier for how you actually live. Our Calorie Calculator runs both in a single pass. Enter your weight in kilograms, your height in centimetres, your age and your sex, choose the activity level that honestly matches your week, and it returns your total daily energy expenditure — the number of calories required to hold your weight roughly where it stands today. Around that maintenance figure the tool shows a moderate 500-calorie deficit for gradual fat loss and an equivalent surplus for gaining. The maths underneath is the Mifflin-St Jeor equation, published in 1990 and still the resting-metabolism formula most dietitians consult first. Treat the result as a starting hypothesis you refine with real-world data, not as a prescription: every body, every training block and every appetite behaves a little differently.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">From resting metabolism to maintenance calories</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The calculation has two stages. First the calculator estimates your basal metabolic rate (BMR) — the energy your body spends on breathing, circulation, temperature regulation and cellular repair over a full day of complete rest. It uses the Mifflin-St Jeor equation, which asks only for weight, height, age and sex, and which comparison studies have generally placed ahead of the older Harris-Benedict equation for accuracy in adults. BMR typically accounts for roughly 60 to 75 percent of everything you burn. The second stage multiplies that figure by an activity factor between 1.2 and 1.9. This is where honesty matters more than precision: an office worker who walks 4,000 steps and lifts twice a week sits near the 1.375 mark, not 1.55. Choosing one step too high can silently add three or four hundred calories to your daily target and stall a cut that was otherwise working.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">A 500-calorie deficit is a guideline, not a law</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The maintenance, loss and gain cards below the result apply a simple 500-calorie shift in each direction. That figure persists in popular fitness writing because 500 calories a day roughly maps to one pound of body mass per week at the theoretical exchange rate of about 3,500 calories per pound. In practice the exchange rate is not linear, water weight moves faster than fat in the first fortnight, and a large deficit raises the odds that you will lose muscle alongside fat. A gentler 250-to-300 calorie deficit is slower on paper but far easier to sustain through a holiday, a broken night of sleep or a stressful week at work. Nobody should eat below their BMR for a prolonged stretch; the calculator deliberately keeps its loss target above that floor for exactly this reason.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Why your number drifts over time</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A calorie target is a snapshot, not a constant. As you lose weight your BMR falls simply because there is less tissue to maintain, and non-exercise activity tends to shrink without you noticing — fewer incidental steps, more sitting, slightly lazier movements. The practical response is to recalculate every four to six weeks, or whenever your weight shifts by about five kilograms. Recomposition adds another wrinkle: two people at identical body weight can differ by several hundred daily calories if one carries substantially more muscle. If you strength train, expect your maintenance to sit near the upper end of any published estimate for your size.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Weigh yourself at the same time of day, under the same conditions, and judge the trend across two weeks rather than any single morning. If the scale has not moved in fourteen days while your logged intake matches the calculator, drop the activity factor one notch and recalculate — that is data, not failure.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Does this use Mifflin-St Jeor or Harris-Benedict?", answer: "It uses Mifflin-St Jeor, the 1990 equation that most dietetic bodies treat as the default for adults. The older Harris-Benedict equation, and its 1990 revision, tends to return a slightly higher number for the same person, which is why two free calculators can disagree by a hundred calories or more." },
      { question: "What does TDEE mean?", answer: "Total Daily Energy Expenditure is everything you burn in 24 hours: basal metabolism plus the thermic effect of digesting food plus movement, exercise and fidgeting. It is the number to match if your goal is to hold your current weight steady." },
      { question: "How large should my calorie deficit be?", answer: "A deficit of about 500 calories a day is the familiar middle ground, corresponding roughly to half a kilogram a week. Slower cuts of 250 calories are easier to adhere to and often produce better long-term results. Anything far beyond that should be discussed with a clinician." },
      { question: "Should I ever eat below my BMR?", answer: "Not for long. BMR covers the essential cost of keeping you alive, and eating under it consistently pushes the body toward fatigue, poor recovery and nutrient shortfalls. If a calculated target sits below your BMR, the activity factor is probably set too low or the goal is too aggressive." },
      { question: "Why do two people with the same weight and height get different results?", answer: "Sex and age shift the equation directly, but so do activity choices, muscle mass and non-exercise movement. The formula is a population estimate, and no equation can see how much of your weight is muscle." },
      { question: "How often do I need to recalculate?", answer: "Every four to six weeks is a sensible rhythm, or sooner if your body weight has moved by around five kilograms. Recalculating keeps the deficit effective instead of letting it silently shrink as your metabolism follows your weight down." },
      { question: "How accurate is the activity multiplier?", answer: "It is the least precise part of the calculation. Multipliers are coarse buckets covering an entire week of behaviour, so it pays to start at the lower end and only step up when the scale and your training logs say you should." },
      { question: "Does the calculator account for muscle mass?", answer: "No. It sees only weight, height, age and sex, so a muscular athlete and a less active person of the same measurements receive the same output. Muscle is metabolically active tissue, so lifters usually find the estimate runs conservative." },
      { question: "Can I use this while pregnant or breastfeeding?", answer: "Pregnancy and lactation raise energy and nutrient requirements in ways this general formula does not model. Use it for orientation only and follow the individual guidance of your obstetric provider or dietitian." },
      { question: "Is my weight or age stored anywhere?", answer: "No. Everything is calculated inside your browser and nothing you type is transmitted or saved, so you can adjust your inputs as often as you like without leaving a record behind." }
    ],
    relatedCalculators: [
      { name: 'TDEE Calculator', path: '/tdee-calculator.html' },
      { name: 'BMR Calculator', path: '/bmr-calculator.html' },
      { name: 'Macro Calculator', path: '/macro-calculator.html' },
      { name: 'BMI Calculator', path: '/bmi-calculator.html' }
    ],
    howWeCalculate: {
      formula: "BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5 (men) / − 161 (women);  TDEE = BMR × activity factor",
      explanation: "The Mifflin-St Jeor resting equation returns a baseline burn rate, which is then scaled by 1.2, 1.375, 1.55, 1.725 or 1.9 depending on the activity level you select. Maintenance is that TDEE figure; the loss and gain cards simply subtract or add 500 calories.",
      example: "70 kg, 170 cm, 30-year-old man, moderate activity: BMR = 700 + 1062.5 − 150 + 5 = 1617.5; TDEE = 1617.5 × 1.55 ≈ 2,507 kcal/day"
    },
    workedExample: {
      scenario: "A 30-year-old woman, 65 kg, 165 cm, light exercise twice a week, aiming to maintain",
      steps: [
        "Mifflin-St Jeor for women: 10 × 65 + 6.25 × 165 − 5 × 30 − 161",
        "Compute: 650 + 1031.25 − 150 − 161 = 1,370.25 kcal BMR",
        "Apply the light activity factor: 1,370.25 × 1.375 ≈ 1,884 kcal",
        "For gradual fat loss subtract 500: 1,884 − 500 = 1,384 kcal"
      ],
      result: "Maintenance ≈ 1,884 kcal/day; a 500-calorie deficit gives ≈ 1,384 kcal/day"
    },
    commonValues: {
      heading: "Activity factors used to turn BMR into TDEE",
      columns: ["Activity level", "Factor", "Typical week"],
      rows: [
        ["Sedentary", "1.2", "Desk job, almost no planned exercise"],
        ["Light", "1.375", "Exercise 1 to 3 days a week"],
        ["Moderate", "1.55", "Exercise 3 to 5 days a week"],
        ["Very active", "1.725", "Hard training 6 to 7 days a week"],
        ["Extra active", "1.9", "Physical job plus daily training"]
      ]
    }
  },

  'body-fat-calculator': {
    title: "Body Fat Without Calipers, Estimated by the",
    subtitle: "Body Fat Calculator",
    introduction: "Weight on a scale cannot tell you whether a change is fat, muscle or simply a salty dinner, which is why body fat percentage has become the metric athletes, coaches and clinicians watch instead. This Body Fat Calculator uses the United States Navy circumference method: three tape measurements — waist, neck and height, plus the hip for women — fed into a logarithmic equation developed from hydrostatic weighing data in the 1980s. It needs no calipers, no dunking and no expensive scanner, and it returns a result in seconds from measurements you can take at home with a fabric tape. Like every field method it is an estimate rather than a lab value: expect it to track your own trend reliably even when the absolute number sits a couple of percentage points away from a DEXA scan. Read the result as a position within a band, not a verdict, and never as a substitute for medical advice.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How three tape measurements become a percentage</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The circumference method rests on a straightforward observation: fat redistributes around the trunk in predictable proportions, so the difference between your waist and your neck tells the equation a great deal about abdominal adiposity, while the hip measurement adds information about fat distribution below the waist in women. The formula itself is a ratio scaled by 495, with the measurements entered as base-10 logarithms. The logarithm matters — girth does not relate to body fat linearly, so taking logs flattens the curve and keeps the output sensible across the full range of human shapes. Height enters the equation because a taller frame carries the same girth differently. For men only the waist, neck and height are required; for women the hip is added because women store proportionally more fat around the hips and thighs.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Reading your number: essential, athletic and obesity bands</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A percentage on its own means very little without context. Essential fat is the minimum the body needs for hormonal production, nerve conduction and organ protection, and it sits far lower for men than for women — a difference driven largely by reproductive tissue and essential stores in the breasts and hips. Below that band lies genuine risk: menstrual disruption, impaired immunity and weakened bone density are all associated with chronically low body fat in women. At the other end, the widely used adult obesity thresholds start around 25 percent for men and 32 percent for women. Between those extremes the useful signal is the direction of travel over four to eight weeks, measured at the same time of day under the same conditions.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Where the tape measure goes wrong</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Almost every serious error here is a measurement error rather than a maths error. Measure against bare skin, at the end of a normal exhale, without sucking in or pushing out. The waist point sits at the natural waist or at the navel depending on which protocol you adopt — pick one and stay with it, because switching will show up as a phantom two-percent swing. Keep the tape snug and level all the way around, never compressing the skin. Take each measurement twice and average them. Hydration, a large meal and recent training all shift girth within a single day, so morning measurements before breakfast produce the most repeatable trend.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Field Notes</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Log your tape readings and the calculated percentage on the same morning every two weeks. A single reading tells you almost nothing; a six-point trend tells you whether your training and nutrition are actually working. If two readings disagree by more than two percent, remeasure before drawing conclusions.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Which formula does this calculator use?", answer: "The US Navy circumference equation. For men it is 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450, with all measurements in inches. For women a hip measurement is added and the constants change accordingly." },
      { question: "How accurate is the Navy method compared to a DEXA scan?", answer: "Field methods of this kind are generally within a few percentage points of laboratory testing for the average person, and considerably less accurate at the extremes of leanness or obesity. It is reliable for following your own trend, far less reliable as an absolute clinical figure." },
      { question: "What are essential body fat levels?", answer: "Roughly 2 to 5 percent for men and 10 to 13 percent for women by the commonly cited adult bands. Essential fat supports hormone production and organ function, and dipping below it carries real health consequences, particularly for women." },
      { question: "Where exactly should I measure my waist?", answer: "Either at the narrowest point of the torso or at the navel — the important thing is consistency. Measure at the end of a normal exhale, standing relaxed, with the tape horizontal and touching the skin without compressing it." },
      { question: "Why does the calculator ask for hip measurements only for women?", answer: "Women carry proportionally more fat around the hips and thighs, so including the hip circumference materially improves the estimate. For men the waist-to-neck difference already captures most of the useful signal." },
      { question: "Can I turn my percentage into pounds of fat?", answer: "Yes. Multiply your body weight by the percentage as a decimal: a 90 kg person at 20 percent carries about 18 kg of fat and about 72 kg of lean mass. Track both figures when you diet so muscle loss does not hide behind falling scale weight." },
      { question: "Does age change the result?", answer: "The formula does not take age as an input, but real bodies shift fat distribution over the decades. Older adults tend to accumulate abdominal fat at the same percentage reading, so waist circumference is worth watching alongside the number." },
      { question: "Why did my reading jump after a big meal or a hard session?", answer: "Girth responds to food volume, water retention, sodium and glycogen within hours. Always measure fasted, in the morning, after using the bathroom, and compare like with like." },
      { question: "Can pregnant women use this calculator?", answer: "No. Abdominal circumference changes dramatically during pregnancy and the equation is not validated for that state. Any body composition question during pregnancy belongs with your obstetric provider." },
      { question: "Are my measurements stored?", answer: "No. Your tape readings are processed locally in the browser and are never sent to a server or written to a database, so repeated checks leave no record behind." }
    ],
    relatedCalculators: [
      { name: 'BMI Calculator', path: '/bmi-calculator.html' },
      { name: 'Lean Mass Calculator', path: '/lean-mass-calculator.html' },
      { name: 'Macro Calculator', path: '/macro-calculator.html' },
      { name: 'Ideal Weight Calculator', path: '/ideal-weight-calculator.html' }
    ],
    howWeCalculate: {
      formula: "Men: 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450   |   Women: 495 ÷ (1.29579 − 0.35004 × log10(waist + hip − neck) + 0.22100 × log10(height)) − 450",
      explanation: "Every measurement is entered in inches and converted to a base-10 logarithm before the constants are applied. The ratio is scaled by 495 and offset by 450 so the answer lands on a percentage scale, which is then compared against adult body fat bands for interpretation.",
      example: "Man, waist 36 in, neck 15 in, height 70 in: 495 ÷ (1.0324 − 0.19077 × 1.3222 + 0.15456 × 1.8451) − 450 ≈ 14.6%"
    },
    workedExample: {
      scenario: "A 6 ft man with a 34 in waist and 15 in neck checking whether his cut is working",
      steps: [
        "Waist minus neck: 34 − 15 = 19 inches",
        "log10(19) = 1.2788 and log10(72) = 1.8573",
        "Denominator: 1.0324 − 0.19077 × 1.2788 + 0.15456 × 1.8573 = 1.0755",
        "495 ÷ 1.0755 = 460.2, then subtract 450"
      ],
      result: "Body fat ≈ 10.2 percent, inside the athletic band for men"
    },
    commonValues: {
      heading: "Adult body fat bands (widely cited ranges)",
      columns: ["Category", "Men", "Women"],
      rows: [
        ["Essential fat", "2 – 5%", "10 – 13%"],
        ["Athletes", "6 – 13%", "14 – 20%"],
        ["Fitness", "14 – 17%", "21 – 24%"],
        ["Average", "18 – 24%", "25 – 31%"],
        ["Obesity", "25% and above", "32% and above"]
      ]
    }
  },

  'macro-calculator': {
    title: "Protein, Carbs and Fat in Grams: Meet the",
    subtitle: "Macro Calculator",
    introduction: "Calories tell you how much energy you are eating; macros tell you what that energy is built from, and the difference decides how a diet feels, performs and holds up over months. Our Macro Calculator takes a daily calorie target — ideally one you have already pulled from the Calorie or TDEE calculator — and converts it into grams of protein, carbohydrate and fat for three goals: losing, maintaining or gaining. The arithmetic uses the standard 4-4-9 energy factors, so the split you pick always reconciles exactly to the calorie total you entered. Beyond the raw numbers this page explains why protein rises when you cut, why carbohydrate is not the villain it was once painted as, and how the grams-per-kilogram ranges used by sports nutritionists compare with the percentage splits most apps display. Everything here is general educational guidance, not a clinical or medical nutrition plan.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Calories are energy, macros are structure</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Protein and carbohydrate each supply roughly 4 calories per gram, while fat supplies about 9. That asymmetry is the whole engine of macro counting: shifting ten percent of your intake from fat to protein adds four grams for every one gram you remove, which is why percentage-based plans can produce surprisingly different plate compositions. Protein builds and repairs tissue, supports immune function and is the most satiating of the three. Carbohydrate refills muscle glycogen and is the fuel most people reach for during hard intervals or long sessions. Fat supports hormone production, vitamin absorption and cell membranes — it cannot be driven to zero without consequence. The percentages you choose must total 100 percent, and the calculator enforces that balance for you.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">How each goal shifts the split</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The three presets are deliberately different. While cutting, protein climbs to 40 percent of intake because a deficit is the one context where the risk of losing lean tissue is highest, and protein plus a sensible resistance program is what blunts it. Carbohydrate drops to 35 percent and fat to 25 percent, trimming the most calorie-dense macro. While maintaining, the split settles at 30-40-30, a balanced default that suits most mixed diets. While gaining, carbohydrate rises to 45 percent to fuel the extra training volume that is supposed to justify the surplus in the first place, with protein held at 30 percent and fat at 25 percent. These are starting positions; individual preference, activity and medical history all justify moving them.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Grams per kilogram: the number professionals actually use</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Behind the percentages sits a second way of setting protein, expressed per kilogram of body weight. The reference intake for a healthy sedentary adult sits around 0.8 grams per kilogram, while the ranges commonly quoted for people undertaking resistance training fall between roughly 1.4 and 2.0 grams per kilogram. Checking your preset against that range is a useful sanity test: a 70 kg person cutting at 1,800 calories lands near 180 grams of protein from this calculator, which is about 2.6 grams per kilogram — comfortable for a short aggressive phase, but more than a relaxed deficit requires. Endurance athletes and people in a large deficit often benefit from the higher end; purely sedentary adults rarely do.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Weigh food raw or use the nutrition label's cooked weights, because a hundred grams of dry rice and a hundred grams of cooked rice differ by roughly three times the calories. Track for a full week before changing anything — most macro mistakes are logging mistakes, not formula mistakes.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Why do protein and carbs have 4 calories while fat has 9?", answer: "Those are the Atwater general factors, derived from studies of how the macronutrients are digested and oxidised. They are rounded values — carbohydrate sits closer to 4.1 and protein to 4.4 in more detailed analyses — but 4-4-9 is the convention food labelling uses." },
      { question: "What split does this calculator use for each goal?", answer: "Losing uses 40 percent protein, 35 percent carbohydrate and 25 percent fat. Maintaining uses 30-40-30. Gaining uses 30 percent protein, 45 percent carbohydrate and 25 percent fat. Every split totals 100 percent so the grams always reconcile to your calorie target." },
      { question: "How much protein should I eat per kilogram?", answer: "Around 0.8 g/kg is the reference intake for a healthy sedentary adult, while published ranges for people who lift sit near 1.4 to 2.0 g/kg. Your own target depends on body composition, training volume and how large your calorie deficit is." },
      { question: "Should I try low-carb or keto with these numbers?", answer: "These presets are balanced starting points, not medical diets. Low-carb and ketogenic patterns work by rearranging the same percentages — usually raising fat while cutting carbohydrate sharply — and should be reviewed with a clinician if you have an underlying condition." },
      { question: "Does fibre count toward my carbohydrate grams?", answer: "Yes. Fibre is carbohydrate; it simply is not digested in the small intestine. Most nutrition labels already show fibre within the total carbohydrate line, so keeping it inside your carb figure is the simplest and most consistent approach." },
      { question: "Where do I get my daily calorie number?", answer: "Start with the Calorie or TDEE calculator, which estimates maintenance from your weight, height, age and activity. Use that figure as the input here, then revisit your macros whenever your calories change." },
      { question: "Do I have to hit the gram targets exactly every day?", answer: "No. Weekly averages matter far more than single-day precision. A dinner out, a training day with extra carbohydrate, or a light day where fat lands higher are all normal — consistency across seven days is the goal." },
      { question: "What about alcohol in my macro plan?", answer: "Alcohol provides about 7 calories per gram and does not belong to any of the three macros, so it is not counted here. If you drink, subtract those calories from your daily budget rather than trying to fit them into the split." },
      { question: "Are these numbers appropriate during pregnancy?", answer: "Pregnancy and breastfeeding raise protein and energy requirements in individual ways that percentage presets do not model. Use this calculator for general education only and follow guidance from your obstetric provider or dietitian." },
      { question: "Do you save my calorie target or goal?", answer: "No. Inputs stay in your browser for the session and are not transmitted or stored, so you can experiment with different goals freely." }
    ],
    relatedCalculators: [
      { name: 'Calorie Calculator', path: '/calorie-calculator.html' },
      { name: 'Macro Split Calculator', path: '/macro-split-calculator.html' },
      { name: 'TDEE Calculator', path: '/tdee-calculator.html' },
      { name: 'Body Fat Calculator', path: '/body-fat-calculator.html' }
    ],
    howWeCalculate: {
      formula: "protein g = calories × protein% ÷ 4;  carbs g = calories × carbs% ÷ 4;  fat g = calories × fat% ÷ 9",
      explanation: "Each macro percentage is converted into its share of daily calories, then divided by the Atwater factor for that macronutrient to reach grams. Because 4, 4 and 9 reconcile against 100 percent, the three gram figures always reproduce the calorie total you entered.",
      example: "2,000 kcal at the maintain split of 30-40-30: 600 ÷ 4 = 150 g protein, 800 ÷ 4 = 200 g carbs, 600 ÷ 9 ≈ 67 g fat"
    },
    workedExample: {
      scenario: "Cutting at 1,800 calories with the 40-35-25 split",
      steps: [
        "Protein: 1,800 × 0.40 = 720 kcal ÷ 4 = 180 g",
        "Carbohydrate: 1,800 × 0.35 = 630 kcal ÷ 4 = 158 g",
        "Fat: 1,800 × 0.25 = 450 kcal ÷ 9 = 50 g",
        "Check the total: 720 + 630 + 450 = 1,800 kcal"
      ],
      result: "180 g protein, 158 g carbohydrate, 50 g fat per day"
    },
    commonValues: {
      heading: "Goal splits expressed in grams at 2,000 kcal",
      columns: ["Goal", "Protein", "Carbohydrate", "Fat"],
      rows: [
        ["Lose", "40% = 200 g", "35% = 175 g", "25% = 56 g"],
        ["Maintain", "30% = 150 g", "40% = 200 g", "30% = 67 g"],
        ["Gain", "30% = 150 g", "45% = 225 g", "25% = 56 g"]
      ]
    }
  },

  'ideal-weight-calculator': {
    title: "What Counts as an Ideal Weight? Ask the",
    subtitle: "Ideal Weight Calculator",
    introduction: "The phrase ideal weight is older than most of the diet industry that now surrounds it, and the formulas behind it were built for an entirely different purpose: the Devine equation of 1974 was created to size medication doses, not to set body image targets. Our Ideal Weight Calculator takes your height in inches, applies the Devine method with its sex-specific base weights, and reports the result in pounds alongside the kilogram conversion so you can compare it with any other published range. Before you treat the number as a goal it is worth understanding what the formula does and does not capture — frame size, muscle mass, age and the plain fact that a healthy population spreads across a wide band rather than converging on a single figure. Use the output as one reference point among several, and pair it with body fat percentage, waist measurement and how you actually feel. It is educational information, not medical advice.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Where the formula comes from</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Dr Bernard Devine published his equation in 1974 as a way of estimating lean body weight for prescribing drugs that distribute through fat-free tissue. The structure is deliberately simple: a base weight of 50 kilograms for men or 45.5 kilograms for women, plus 2.3 kilograms for every inch of height above five feet. Two rival formulas appeared shortly afterwards — Robinson in 1983 and Miller in 1983 — using the same shape but different constants, which is why published ideal weights for a six-foot man can differ by several kilograms depending on which reference you open. Devine remains the most widely quoted, and it is what this calculator applies. Heights below five feet use the base figure directly, which is one reason the equation is criticised for short stature.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Frame size, muscle and the limits of a single number</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A formula that knows only your height cannot know your wrist breadth, your bone density or how many years you have spent under a barbell. Broad-framed individuals routinely carry ten or more kilograms of legitimate mass above the Devine figure without carrying excess fat, while a lightly built person may sit below it and still be entirely healthy. Muscle is denser than fat, so a strength-trained adult of the same height and weight as a sedentary peer will look visibly leaner at identical scale weight. This is the same blind spot that makes BMI imperfect, and it is exactly why the ideal weight figure works best as a band. Cross-check it against body fat percentage and waist circumference — two measures that see composition rather than just mass.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">How to use the target without chasing it</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The healthiest use of an ideal weight range is as a reference band for a longer conversation, not as a daily weigh-in target. Health markers — blood pressure, resting heart rate, training performance, sleep, energy — move on their own timetable and often improve well before the scale reaches a predicted figure. If your calculated target sits far from your current weight, treat the gap as information rather than instruction: a large gap may warrant a slower timeline and professional input, while a small gap usually needs only consistent habits. Children and teenagers should never be assessed with adult formulas at all; paediatric growth is tracked on age-specific percentile charts by a clinician.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Reality Check</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Healthy adults of the same height routinely span a fifteen-kilogram range. If your result sits a few kilograms away from where you are, the number is telling you almost nothing — body fat percentage, waist measurement and daily energy levels will tell you far more.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Which formula does this calculator use?", answer: "The Devine equation from 1974: for men, 50 kg + 2.3 kg for each inch over 5 ft; for women, 45.5 kg + 2.3 kg for each inch over 5 ft. The kilogram result is converted to pounds at 2.2046 lb per kilogram." },
      { question: "What is a healthy weight for my height?", answer: "Rather than a single figure, most guidance uses a band. An adult BMI of 18.5 to 24.9 gives roughly 114 to 154 pounds at 5 ft 6 in — a wide interval that the Devine result normally falls inside." },
      { question: "Why do different ideal weight formulas disagree?", answer: "Devine, Robinson and Miller share the same linear structure but use different constants, and each was derived from a different historical sample. Differences of five kilograms or more between them for the same person are entirely normal." },
      { question: "Does frame size matter?", answer: "Yes, and no standard height formula accounts for it. A practical proxy is wrist circumference: broad-wristed people tend to carry more skeletal mass and commonly sit above the calculated figure without being overweight." },
      { question: "Is ideal weight the same as a weight loss goal?", answer: "Not necessarily. It is a reference value derived from population data, not a prescription for any individual. Sustainable targets are usually set with body composition, waist measurement and clinical markers in view." },
      { question: "How do I convert kilograms to pounds?", answer: "Multiply kilograms by 2.2046. The calculator does this for you and shows both units, which makes comparing against metric references straightforward." },
      { question: "Can I use this for children or teenagers?", answer: "No. Adult equations are meaningless during growth. Paediatric weight is assessed on age- and sex-specific growth percentiles by a paediatrician or family doctor." },
      { question: "Do the numbers differ much for athletes?", answer: "Athletes frequently sit above the calculated value because muscle is heavy, while their body fat percentage sits low. Scale weight alone will misread them; body fat percentage and waist circumference will not." },
      { question: "Does ideal weight change with age?", answer: "The formula itself never changes, but body composition does — muscle mass tends to fall and fat mass to rise at the same weight. Staying within the band while holding strength is a better goal than chasing a figure from decades ago." },
      { question: "Do you store my height or gender selection?", answer: "No. The calculation happens entirely in your browser and no personal measurement leaves the device or is written to storage." }
    ],
    relatedCalculators: [
      { name: 'BMI Calculator', path: '/bmi-calculator.html' },
      { name: 'Body Fat Calculator', path: '/body-fat-calculator.html' },
      { name: 'Calorie Calculator', path: '/calorie-calculator.html' },
      { name: 'Lean Mass Calculator', path: '/lean-mass-calculator.html' }
    ],
    howWeCalculate: {
      formula: "Men: 50 kg + 2.3 kg × (height in inches − 60);  Women: 45.5 kg + 2.3 kg × (height in inches − 60);  pounds = kg × 2.2046",
      explanation: "Height is measured from the five-foot (60 inch) mark, and every inch above that adds 2.3 kilograms to a sex-specific base weight. The kilogram result is then converted to pounds, giving a single reference figure rather than a range.",
      example: "Man, 70 in: 50 + 2.3 × 10 = 73 kg ≈ 160.9 lb.   Woman, 65 in: 45.5 + 2.3 × 5 = 57 kg ≈ 125.7 lb"
    },
    workedExample: {
      scenario: "A 5 ft 6 in woman checking her target against a healthy BMI band",
      steps: [
        "Convert height: 66 inches, so 66 − 60 = 6 inches above five feet",
        "Apply Devine for women: 45.5 + 2.3 × 6 = 59.3 kg",
        "Convert to pounds: 59.3 × 2.2046 ≈ 130.7 lb",
        "Healthy BMI band at 66 in: 18.5 to 24.9 × (1.676 m)² ≈ 114 to 154 lb"
      ],
      result: "≈ 130.7 lb (59.3 kg), comfortably inside the 114 – 154 lb BMI band for 5 ft 6 in"
    },
    commonValues: {
      heading: "Devine targets by height",
      columns: ["Height", "Men", "Women"],
      rows: [
        ["5 ft 4 in", "125 lb / 56.9 kg", "116 lb / 52.4 kg"],
        ["5 ft 8 in", "151 lb / 68.4 kg", "141 lb / 63.9 kg"],
        ["6 ft 0 in", "171 lb / 77.6 kg", "161 lb / 73.1 kg"],
        ["6 ft 4 in", "191 lb / 86.8 kg", "181 lb / 82.3 kg"]
      ]
    }
  },

  'water-intake-calculator': {
    title: "Hydration Needs by Weight and Activity: Your",
    subtitle: "Water Intake Calculator",
    introduction: "Hydration advice tends to arrive as a single memorable slogan — eight glasses a day, half your body weight in ounces, drink before you are thirsty — and none of those slogans captures the fact that requirements scale with body size and with physical effort. Our Water Intake Calculator starts from body weight, applies the widely used 35 millilitres per kilogram rule, and adds a modest top-up for every minute of daily activity you report, returning a figure in litres you can aim at across the day. It is worth being precise about what that figure represents: the National Academies of Sciences set adequate intake for total water at about 3.7 litres a day for men and 2.7 litres for women from all beverages and food combined, of which roughly a fifth typically arrives through meals. Treat this tool as a practical drinking target, then adjust for climate, sweat rate and thirst. It is general guidance, not advice for anyone with a medical condition.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The 35 millilitres per kilogram rule</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The core of the calculation is a per-kilogram allowance rather than a fixed glass count, which is why it scales sensibly from a 50 kilogram teenager to a 100 kilogram athlete. Thirty-five millilitres per kilogram is a planning heuristic that appears across sports nutrition handbooks and clinical fluid guides; it sits near the lower end of observed intakes and leaves room for coffee, tea, milk and water-rich food already in the diet. The calculator accepts weight in pounds and divides by 2.2 to reach kilograms before applying the rate, so imperial users get the same answer as metric users. Because the result is an average of population data, a very large or very small person should expect their personal optimum to sit somewhat above or below the line — the number is a floor to build habits around, not a ceiling.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Total water versus the water you actually drink</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Confusion about hydration almost always comes from mixing two different quantities. Total water intake counts every source: plain water, tea, coffee, juice, milk, soup and the water bound inside fruit and vegetables. Surveys of typical diets suggest food contributes roughly twenty percent of the total, so someone who eats a produce-heavy diet is closer to their target than the glass count implies. Caffeine deserves a fair hearing as well — the mild diuretic effect of coffee and tea is small and largely disappears in people who drink them habitually, so counting a morning espresso toward your intake is reasonable. Alcohol is the exception: it suppresses the antidiuretic hormone and genuinely increases fluid loss, which is why a night of drinking calls for extra water rather than less.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Activity minutes, heat and sweat rates</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The activity input adds half a millilitre for every active minute — thirty millilitres an hour — which is a deliberately conservative top-up for a walk, a commute or a light session. Real sweat rates during prolonged exercise in heat can reach well over a litre an hour, so anyone training hard outdoors needs considerably more than this baseline suggests. A practical way to personalise is to weigh yourself before and after a session: each kilogram of body mass lost represents roughly a litre of sweat that should be replaced, ideally with fluid plus electrolytes for sessions longer than an hour. Thirst remains a usable signal for most healthy adults, and urine that runs pale straw rather than deep amber is the classic field check.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Spread intake across the day instead of drinking a litre at once — the kidneys process roughly 800 to 1,000 millilitres an hour at most, and anything beyond that is largely passed straight through. Keep a bottle at your desk and finish it before lunch.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Is the eight glasses a day rule accurate?", answer: "Eight 250-millilitre glasses total about 2 litres of plain water, which is a convenient minimum rather than a scientific target. The National Academies adequate intake for total water is around 3.7 litres a day for men and 2.7 litres for women, including water from food." },
      { question: "Do coffee and tea count toward my intake?", answer: "Yes. Their mild diuretic effect is small and blunted in regular drinkers, so the fluid in a normal cup of coffee still contributes to your daily total. Very large caffeine doses can increase urine output, but ordinary consumption nets out positive." },
      { question: "How much of my water comes from food?", answer: "Roughly twenty percent for a typical mixed diet, and more for anyone eating generous amounts of fruit and vegetables. Soups, yoghurt and porridge also contribute meaningfully, which is why food-first eaters often need less plain water than the glass count suggests." },
      { question: "What are the signs of not drinking enough?", answer: "Thirst, darker urine, dry mouth and reduced energy are the common early signals. Urine colour is the simplest field check: pale straw suggests adequacy, deep amber suggests you are behind. Persistent symptoms deserve medical attention rather than more guesswork." },
      { question: "Can I drink too much water?", answer: "Yes. Very large volumes in a short period can dilute blood sodium, a condition called hyponatraemia, and it can be dangerous. Drink to thirst plus your planned target, and never force several litres in an hour." },
      { question: "Should intake change during pregnancy or breastfeeding?", answer: "Requirements generally rise during pregnancy and lactation. This calculator does not model those states, so treat its output as a starting point and confirm an appropriate target with your obstetric provider." },
      { question: "Why does the calculator ask for daily activity minutes?", answer: "Every active minute adds a small 0.5 millilitre allowance on top of the weight-based baseline. It is meant to catch moderate everyday movement rather than replace the larger volumes lost in long or sweaty sessions." },
      { question: "Do I need more when it is hot or I am unwell?", answer: "Fever, heat, vomiting and diarrhoea all raise losses quickly and warrant extra fluid, often with electrolytes. People with kidney, heart or liver conditions should follow an individualised fluid plan from their clinician instead of a general formula." },
      { question: "What units does the calculator use?", answer: "Body weight is entered in pounds and activity in minutes, and the result comes back in litres. Pounds are converted internally to kilograms at 2.2 pounds per kilogram before the 35 millilitres per kilogram rate is applied." },
      { question: "Is my weight recorded anywhere?", answer: "No. Your weight and activity minutes stay in the browser for the session, are never transmitted and are not saved, so you can recalculate freely." }
    ],
    relatedCalculators: [
      { name: 'Calorie Calculator', path: '/calorie-calculator.html' },
      { name: 'TDEE Calculator', path: '/tdee-calculator.html' },
      { name: 'Heart Rate Calculator', path: '/heart-rate-calculator.html' },
      { name: 'Step Counter Calculator', path: '/step-counter-calculator.html' }
    ],
    howWeCalculate: {
      formula: "litres = ( (weight_lb ÷ 2.2) × 35 mL + 0.5 mL × activity minutes ) ÷ 1,000",
      explanation: "Weight is converted from pounds to kilograms, multiplied by the 35 millilitres per kilogram planning rate, then a small activity allowance of half a millilitre per active minute is added. The millilitre total is divided by 1,000 to report litres.",
      example: "150 lb with 30 active minutes: 68.2 kg × 35 = 2,386 mL, plus 15 mL = 2,401 mL ≈ 2.4 L"
    },
    workedExample: {
      scenario: "An 180 lb office worker who walks for 45 minutes across the lunch break",
      steps: [
        "Convert weight: 180 ÷ 2.2 = 81.8 kg",
        "Weight-based allowance: 81.8 × 35 = 2,864 mL",
        "Activity top-up: 45 × 0.5 = 22.5 mL",
        "Total: 2,864 + 23 = 2,887 mL"
      ],
      result: "≈ 2.9 litres a day from drinks, about 12 standard cups"
    },
    commonValues: {
      heading: "Daily water from body weight alone (35 mL/kg)",
      columns: ["Body weight", "Kilograms", "Litres"],
      rows: [
        ["120 lb", "54.5 kg", "1.9 L"],
        ["150 lb", "68.2 kg", "2.4 L"],
        ["180 lb", "81.8 kg", "2.9 L"],
        ["200 lb", "90.9 kg", "3.2 L"],
        ["220 lb", "100.0 kg", "3.5 L"]
      ]
    }
  },

  'heart-rate-calculator': {
    title: "Max HR, Target Zones and the Method Behind the",
    subtitle: "Heart Rate Calculator",
    introduction: "Heart rate is the one piece of training data almost every athlete can collect for free, and knowing what to do with it turns a raw beats-per-minute number into a plan. Our Heart Rate Calculator asks for your age, works out an estimated maximum with the classic 220-minus-age equation, and lays out three target bands: moderate effort at 50 to 70 percent, vigorous effort at 70 to 85 percent, and a top band from 85 percent up to maximum. Those percentages follow the intensity ranges used in general physical activity guidance, which is why they appear in public health recommendations as well as on watch faces. Everything here is an estimate for apparently healthy adults — maximum heart rate varies widely between individuals, and medication, fitness and genetics all shift the real numbers. If you take heart medication or have a cardiovascular condition, work from perceived effort and your clinician's advice instead of any formula.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Where 220 minus age comes from</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The equation is a regression through observed data rather than a physiological law: researchers plotted maximal heart rates measured in treadmill tests against age and fitted a straight line with a slope near one beat per year and an intercept around 200. The result is a population average with real scatter around it — individuals commonly sit ten beats or more either side of the prediction, and lifelong endurance athletes often test higher than sedentary peers of the same age. Alternative regressions exist and produce similar averages with slightly different slopes, but no formula beats a properly supervised maximal test. For planning purposes, treat 220 minus age as a ceiling estimate and then confirm it with performance: if you can hold 185 at true maximum at forty, the formula was simply conservative for you.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">What each zone is actually for</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The moderate band from 50 to 70 percent of maximum is the easy conversational zone: most of the work here is aerobic, fat oxidation is high relative to intensity, and you could hold a sentence throughout. It is where base building, recovery days and long slow distance live. The vigorous band from 70 to 85 percent is where tempo work, threshold intervals and race-specific efforts sit — carbohydrate becomes the dominant fuel and the session becomes hard enough to demand recovery. The top band above 85 percent is sprint and VO2max territory: genuinely hard, best used sparingly, and only after a proper warm-up. Public health guidance describes moderate intensity more simply still, using the talk test — breathing heavier than usual but still able to speak — which works surprisingly well as a cross-check against the arithmetic.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Heart rate reserve: the Karvonen method</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Percent-of-maximum formulas ignore a crucial individual variable: your resting heart rate. The Karvonen method, or heart rate reserve, corrects for it. Subtract your resting rate from your estimated maximum to get the reserve, then apply the desired intensity to that reserve and add the resting rate back. A fit cyclist with a resting rate of 48 and an age-predicted maximum of 190 reaches a given training stimulus at a different absolute heart rate than an unfit beginner resting at 75, even though both are forty years old. To use it, take your resting rate first thing in the morning on several consecutive days and average them — a single reading swings with sleep, caffeine and stress.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Zone Discipline</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Watch-based optical sensors lag during sharp intervals and can misread arm cadence for heart rate. For zone work a chest strap or a manual pulse check at the wrist or neck is more trustworthy, and the talk test remains a free sanity check that no sensor can replace.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How accurate is the 220 minus age formula?", answer: "It is a population average, so treat it as a starting estimate with a realistic spread of about ten beats either side. Research comparisons show it is no more or less reliable than most wearable-generated max estimates, and a supervised maximal test remains the only precise measurement." },
      { question: "What is the Karvonen method?", answer: "Heart rate reserve training: target = ((max HR − resting HR) × intensity) + resting HR. Because it accounts for your resting rate, it usually produces a more individualised zone than applying a percentage directly to predicted maximum." },
      { question: "Which zone burns the most fat?", answer: "The proportion of energy drawn from fat peaks at lower intensities, but total calories still rise with effort, so the best fat-loss stimulus is the one you can sustain. Easy zone work builds the aerobic base that makes harder sessions possible." },
      { question: "How do I measure my resting heart rate?", answer: "Take it lying down, first thing in the morning, before coffee, counting for thirty seconds and multiplying by two. Average several mornings — one reading moves with sleep quality and stress. Typical adult values fall roughly between 60 and 80 bpm, with fitter people often lower." },
      { question: "Why does my watch report a different maximum?", answer: "Wearables blend age with resting rate, heart rate variability and observed session data to model a personal maximum. That can be useful, but it is still an estimate, and optical wrist sensors are least reliable at exactly the intensities where accurate zones matter most." },
      { question: "Do medications like beta blockers affect these zones?", answer: "Yes. Beta blockers and several other cardiac medicines blunt the heart rate response, so percentage-of-max zones become misleading. Anyone on such medication should plan training around perceived exertion under medical supervision." },
      { question: "How long should I spend in each zone?", answer: "A common structure puts most weekly volume in the moderate zone, with short focused blocks of vigorous work and only occasional all-out efforts. Beginners should build the easy base first — the top band is demanding on joints and recovery." },
      { question: "Is it safe to train at 85 to 100 percent?", answer: "For healthy adults, after a warm-up and in moderation, yes. Anyone experiencing chest pain, dizziness or unusual breathlessness should stop and seek medical advice, and older or deconditioned beginners should build up gradually." },
      { question: "Do pregnant women need different heart rate zones?", answer: "Pregnancy changes heart rate and perceived effort in ways fixed percentages do not capture. Most guidance leans on the talk test and perceived exertion, with the plan agreed alongside your obstetric provider." },
      { question: "Do you save my age or results?", answer: "No. Your age is used for a single in-browser calculation and is never transmitted or stored, so you can check as many ages as you like." }
    ],
    relatedCalculators: [
      { name: 'VO2 Max Calculator', path: '/vo2-max-calculator.html' },
      { name: 'Pace Calculator', path: '/pace-calculator.html' },
      { name: 'Calories Burned Calculator', path: '/calories-burned-calculator.html' },
      { name: 'Water Intake Calculator', path: '/water-intake-calculator.html' }
    ],
    howWeCalculate: {
      formula: "Max HR ≈ 220 − age;  zone = max HR × intensity;  Karvonen: target = ((max − resting) × intensity) + resting",
      explanation: "The age-predicted maximum is scaled by the intensity percentages for each band — 50 to 70 percent for moderate, 70 to 85 percent for vigorous and 85 to 100 percent for maximum. The optional Karvonen variant applies the same percentages to heart rate reserve instead, which corrects for individual resting rates.",
      example: "Age 30 → max ≈ 190 bpm; moderate 50–70% = 95–133 bpm; vigorous 70–85% = 133–162 bpm"
    },
    workedExample: {
      scenario: "A 45-year-old beginner checking her easy days and her hard days",
      steps: [
        "Predicted maximum: 220 − 45 = 175 bpm",
        "Moderate band: 175 × 0.50 = 88 and 175 × 0.70 = 123 bpm",
        "Vigorous band: 175 × 0.70 = 123 and 175 × 0.85 ≈ 149 bpm",
        "Karvonen cross-check with a resting rate of 65: reserve = 110, so 60% effort = 65 + 0.60 × 110 = 131 bpm"
      ],
      result: "Max ≈ 175 bpm; easy 88–123 bpm, hard 123–149 bpm; Karvonen 60% = 131 bpm"
    },
    commonValues: {
      heading: "Maximum heart rate and zone bands by age",
      columns: ["Age", "Max HR (220 − age)", "Moderate 50–70%", "Vigorous 70–85%"],
      rows: [
        ["20", "200 bpm", "100 – 140", "140 – 170"],
        ["30", "190 bpm", "95 – 133", "133 – 162"],
        ["40", "180 bpm", "90 – 126", "126 – 153"],
        ["50", "170 bpm", "85 – 119", "119 – 145"],
        ["60", "160 bpm", "80 – 112", "112 – 136"]
      ]
    }
  },

  'pregnancy-calculator': {
    title: "Due Date, Trimesters and Week One: How the",
    subtitle: "Pregnancy Calculator",
    introduction: "Few dates in medicine are quoted as confidently as a due date, and almost none deserve more scepticism. Our Pregnancy Calculator takes the first day of your last menstrual period and adds 280 days — forty weeks — the convention used across obstetrics to estimate term. Behind that simple addition sit two facts that confuse almost everyone at first: gestational age is counted from the last period rather than from fertilisation, so you are technically about two weeks pregnant before conception occurs, and the arithmetic only holds when cycles are regular and ovulation fell where the calendar expected it. First-trimester ultrasound refines the estimate considerably, while later scans can drift by a week or more. Use this page to understand the dating conventions, trimester boundaries and what the number can and cannot tell you. It is general information only, not medical advice, and your obstetric provider remains the authority on your care.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Naegele's rule and the 280-day count</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The calculator applies the standard obstetric shortcut: add 280 days to the first day of the last menstrual period. That figure has a tidy derivation — about 266 days from fertilisation to birth, plus the 14 days of the luteal phase that preceded ovulation. The older mnemonic form of the same rule reads: subtract three months, add seven days, then add a year, which lands on the same date for most starting points. The arithmetic is unfailingly simple, which is precisely why the assumptions matter. It presumes a 28-day cycle with ovulation on day 14, a woman with a typical cycle length and no significant pathology. Every deviation from that pattern — long cycles, late ovulation, breastfeeding, recent stopping of hormonal contraception — pushes the true date later than 280 days will suggest.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Why week one starts before you conceived</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Obstetricians count gestational weeks from the last period because that is the date most patients know reliably, long before anyone can confirm fertilisation. The consequence is that gestational age runs about two weeks ahead of embryonic age: at ten weeks gestation the embryo is roughly eight weeks old, having been conceived around week two of the count. Confusion here causes real anxiety — someone told they are eight weeks pregnant on a scan who reads that as eight weeks since intercourse has miscounted entirely. It also explains why pregnancy lasts forty weeks by the calendar yet only about thirty-eight weeks of actual development. The convention is universal in dating, growth charts and anomaly scanning, so it is worth mastering early.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Trimesters, scans and how dating improves</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Trimester boundaries are conventions rather than biological switches: the first runs from week 1 to 13+6, the second from week 14 to 27+6, and the third from week 28 until birth. Dating accuracy follows a clear hierarchy. A first-trimester crown-rump length measurement is considered the most precise reference, typically narrowing the estimate to within about a week; mid-pregnancy scans are less exact because fetuses grow at different rates; and third-trimester measurements are the least reliable for dating of all. This is why providers seldom move a due date based on a late scan. When cycles are irregular or the last period is uncertain, an early scan becomes the anchor and the 280-day calculation is set aside.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Due-Date Reality</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            A due date is a planning estimate, not an appointment. Only a small minority of babies arrive on the predicted day, and the great majority arrive within the two weeks either side. Past 40 weeks, care providers increase monitoring and discuss timing with you rather than treating the date as a deadline.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How does this calculator work out the due date?", answer: "It takes the first day of your last menstrual period and adds 280 days, which equals 40 gestational weeks. That is the standard convention used across obstetrics, equivalent to the older Naegele rule of minus three months, plus seven days, plus one year." },
      { question: "What is the difference between gestational age and fetal age?", answer: "Gestational age is measured from the last menstrual period and is roughly two weeks ahead of fetal age measured from fertilisation. At 12 weeks gestation the baby is about 10 weeks old from conception." },
      { question: "How accurate is a due date calculated this way?", answer: "Accurate only as accurate as the assumed ovulation date. Dating is most precise when confirmed by a first-trimester ultrasound, which can narrow the estimate to about a week; later scans are considerably less reliable." },
      { question: "What if my cycles are longer than 28 days?", answer: "Later ovulation means the 280-day count will predict a date earlier than the true one. Long or irregular cycles are one of the main reasons providers confirm dating with an early scan." },
      { question: "When is a pregnancy considered overdue?", answer: "Term is 39 to 40+6 weeks, late term runs 41 to 41+6 weeks, and 42 weeks and beyond is described as post-term. Care providers increase surveillance after 40 weeks and discuss induction options as those thresholds approach." },
      { question: "Can I use this calculator from a conception date?", answer: "No, this version works from the last menstrual period. If you know your conception or embryo transfer date, add 266 days for the same 40-week estimate, or discuss dating with your provider." },
      { question: "Do twins usually arrive earlier?", answer: "Twin pregnancies commonly run shorter than singleton ones, and the due date itself is not fundamentally different — but planned delivery timing is usually brought forward. That decision belongs entirely with your obstetric team." },
      { question: "What are the trimester boundaries?", answer: "First trimester: week 1 through 13+6. Second trimester: week 14 through 27+6. Third trimester: week 28 onwards. The anatomy scan is typically scheduled around week 20, in the middle of the second trimester." },
      { question: "Should I change anything based on this result?", answer: "No. A calculated date is for orientation and planning only. Any question about your dates, your symptoms or your care plan should go to your midwife or obstetric provider, who can confirm with clinical examination and ultrasound." },
      { question: "Are my dates saved?", answer: "No. The date you enter is used for a single calculation inside your browser and is never transmitted or stored on our servers." }
    ],
    relatedCalculators: [
      { name: 'Ovulation Calculator', path: '/ovulation-calculator.html' },
      { name: 'Date Calculator', path: '/date-calculator.html' },
      { name: 'Age Calculator', path: '/age-calculator.html' },
      { name: 'Date Difference Calculator', path: '/date-difference-calculator.html' }
    ],
    howWeCalculate: {
      formula: "due date = first day of last menstrual period + 280 days (40 gestational weeks)",
      explanation: "280 days combines 266 days of development after fertilisation with the 14 days of the luteal phase before ovulation. The calculator simply adds that span to your start date, then derives trimester position from the same gestational week count.",
      example: "Last period 1 January 2025 → 8 October 2025, which is also what Naegele's minus-three-months, plus-seven-days, plus-one-year rule gives."
    },
    workedExample: {
      scenario: "A woman whose last period started on 15 March 2026 wants to know her estimated due date",
      steps: [
        "Confirm the starting point: the first day of full flow, 15 March 2026",
        "Add 280 days: 16 days remain in March, leaving 264 days",
        "Count forward through April to November: 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 = 244 days",
        "244 days reaches 30 November, with 20 days still to add"
      ],
      result: "Estimated due date: 20 December 2026, exactly 40 weeks from the last period"
    },
    commonValues: {
      heading: "Trimester boundaries and what happens in each",
      columns: ["Trimester", "Gestational weeks", "Common milestones"],
      rows: [
        ["First", "Week 1 – 13+6", "Dating scan, first heartbeat"],
        ["Second", "Week 14 – 27+6", "Anatomy scan around week 20"],
        ["Third", "Week 28 – 40", "Growth checks and labour planning"],
        ["Post-term", "Week 41 onwards", "Closer monitoring, timing discussion"]
      ]
    }
  },

  'ovulation-calculator': {
    title: "Counting Ovulation Days and the Fertile Window: The",
    subtitle: "Ovulation Calculator",
    introduction: "Whether you are trying to conceive or simply trying to understand your own cycle, ovulation is the single event everything else hangs from — and it is far easier to predict than most people expect. Our Ovulation Calculator works from the first day of your last period plus your average cycle length, subtracting the fourteen days of the luteal phase that follow ovulation in almost every adult cycle. From that estimate it shows the ovulation day and the fertile window, the six-day span in which conception is biologically possible. The method is the classic calendar approach, and it deserves both respect and scepticism: it is transparent, free and useful for spotting patterns, but it assumes a regular cycle and says nothing about what actually happened hormonally this month. Treat the dates as an informed estimate rather than a guarantee, and never rely on calendar arithmetic alone to prevent pregnancy. This is educational information, not medical advice.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Why ovulation sits 14 days before your next period</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The menstrual cycle has two phases, and only one of them is really variable. The follicular phase — from the first day of bleeding until ovulation — can run anywhere from ten days to three weeks or more depending on stress, illness, body composition and plain individual biology. The luteal phase, which begins at ovulation and ends when the next period starts, is far more constant, clustering tightly around twelve to sixteen days for a given person. That consistency is the whole basis of the calculator: rather than guessing when ovulation happened, count backwards from the expected next period. Subtracting fourteen days from the typical cycle length therefore estimates ovulation day with reasonable reliability for people whose cycles repeat within a few days of each other.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">The six-day fertile window</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Sperm can survive in cervical mucus for up to roughly five days, while the released oocyte remains viable for only about twelve to twenty-four hours. Multiply those two facts and the window in which pregnancy can occur is six days: the five days leading up to ovulation, plus ovulation day itself. Conception odds peak in the two days immediately before ovulation, because sperm arrive ahead of the egg rather than chasing it — which is why the fertile window opens earlier than many people assume. After ovulation the window shuts quickly; by the day after, the chance has collapsed. The calculator therefore reports the fertile window as opening five days before the estimated ovulation date and closing on the ovulation day itself.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Where the calendar method breaks down</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Calendar predictions describe a typical cycle, not this one. Ovulation shifts with travel, sleep disruption, illness, intense training blocks, low energy availability and acute stress, all of which can push it several days later than the formula suggests. Polycystic ovary syndrome, perimenopause, breastfeeding and the months after stopping hormonal contraception all produce genuinely irregular cycles in which the arithmetic stops being informative. People who need certainty usually combine the calendar estimate with objective signs: urinary luteinising hormone tests that anticipate ovulation by a day or two, a sustained basal body temperature rise that confirms it has passed, and changes in cervical mucus consistency. Tracking three consecutive cycles is the minimum needed before any pattern is worth trusting.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Tracking Tip</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Record cycle start dates for three months before trusting any prediction. Adult cycles that repeat every 21 to 35 days are generally considered within the normal range; persistently shorter or longer cycles, or cycles that swing wildly month to month, are worth raising with a doctor.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How does the calculator estimate the ovulation day?", answer: "It takes your cycle length, subtracts 14 days for the luteal phase and adds the result to the first day of your last period. A 28-day cycle starting on 1 January puts ovulation around 15 January." },
      { question: "What exactly is the fertile window?", answer: "The six days ending on ovulation day: the five days before, because sperm can survive that long, plus the day itself. The highest-chance days are the two immediately preceding ovulation, when sperm are already waiting when the egg is released." },
      { question: "Does day one mean the first day of my period?", answer: "Yes. Day one is the first day of full flow rather than the day of spotting beforehand, and using spotting as day one will shift your estimate earlier by a day or so." },
      { question: "Does everyone ovulate on day 14?", answer: "No — day 14 only holds for a textbook 28-day cycle. Ovulation moves with cycle length, which is exactly why the calculator subtracts 14 from your own average rather than assuming a fixed date." },
      { question: "How long does the egg survive after ovulation?", answer: "Roughly twelve to twenty-four hours. If fertilisation does not happen inside that window, the egg disintegrates and the opportunity closes until the following cycle." },
      { question: "How long can sperm survive inside the body?", answer: "Up to about five days in fertile cervical mucus. That asymmetry between five-day sperm survival and a one-day egg lifespan is the reason the fertile window is six days long rather than one." },
      { question: "Can I use this method to avoid pregnancy?", answer: "No. Calendar prediction is far too imprecise for contraception, and ovulation can shift without warning. Anyone avoiding pregnancy needs a method with demonstrated effectiveness, ideally discussed with a healthcare provider." },
      { question: "Can stress or illness delay ovulation?", answer: "Yes. Travel, poor sleep, illness, intense training and energy deficit can all push ovulation several days later, which means a late period is often a late ovulation rather than a pregnancy." },
      { question: "What about irregular cycles?", answer: "If cycles regularly fall outside 21 to 35 days, vary by more than a week from month to month, or have stopped entirely, calendar estimates become unreliable. Persistently irregular cycles are worth discussing with a doctor, as conditions such as PCOS are common and treatable." },
      { question: "Do you store my cycle dates?", answer: "No. Your period date and cycle length are used for one calculation inside your browser and are never transmitted or written to storage." }
    ],
    relatedCalculators: [
      { name: 'Pregnancy Calculator', path: '/pregnancy-calculator.html' },
      { name: 'Date Calculator', path: '/date-calculator.html' },
      { name: 'Week Number Calculator', path: '/week-number-calculator.html' },
      { name: 'Age Calculator', path: '/age-calculator.html' }
    ],
    howWeCalculate: {
      formula: "ovulation day = first day of last period + (cycle length − 14);  fertile window = ovulation day − 5 through ovulation day",
      explanation: "The luteal phase is treated as a fixed 14 days, so subtracting it from your cycle length gives the offset from your period start to ovulation. The fertile window is then drawn backwards from that date to cover the five days sperm can survive plus the day of ovulation itself.",
      example: "28-day cycle starting 1 January: 28 − 14 = 14, so ovulation ≈ 15 January, with a fertile window from 10 to 15 January"
    },
    workedExample: {
      scenario: "A 32-day cycle beginning on 3 February 2026",
      steps: [
        "Luteal phase subtraction: 32 − 14 = 18 days from period start to ovulation",
        "Ovulation estimate: 3 February + 18 days = 21 February 2026",
        "Fertile window opens five days earlier: 21 − 5 = 16 February",
        "Next expected period: 3 February + 32 days = 7 March 2026"
      ],
      result: "Ovulation ≈ 21 February 2026, fertile window 16 – 21 February, next period ≈ 7 March 2026"
    },
    commonValues: {
      heading: "Ovulation timing by cycle length",
      columns: ["Cycle length", "Ovulation (period start + n)", "Fertile window"],
      rows: [
        ["26 days", "+ 12 days", "Day 7 – 12"],
        ["28 days", "+ 14 days", "Day 9 – 14"],
        ["30 days", "+ 16 days", "Day 11 – 16"],
        ["32 days", "+ 18 days", "Day 13 – 18"],
        ["35 days", "+ 21 days", "Day 16 – 21"]
      ]
    }
  },

  'date-calculator': {
    title: "Find the Gap Between Two Dates in Seconds: The",
    subtitle: "Date Calculator",
    introduction: "Almost everyone eventually needs the same small piece of arithmetic: how many days lie between two dates, and how many weeks, hours or minutes that represents. Contract deadlines, project plans, countdowns, age gaps and billing cycles all depend on it, and doing the count by hand across a leap February is where mistakes creep in. Our Date Calculator takes a start date and an end date, measures the elapsed time between them and reports the answer in days, whole weeks, hours and minutes simultaneously, so you never have to convert yourself. The tool handles real calendar lengths, including leap years, and treats the order of the dates as irrelevant — it measures the distance either way. This page explains the counting convention it uses, why your manual tally may come out one day differently, and how leap years and daylight saving affect the result. It is a precise piece of calendar arithmetic, not a legal or business-day calculation.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Inclusive or exclusive: why your count is off by one</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The single most common complaint about any date calculator is a one-day discrepancy, and almost always it is a counting-convention problem rather than a bug. This tool measures elapsed time: it takes the end date, subtracts the start date and reports whole days of difference. Monday to Tuesday is therefore one day. If instead you count both endpoints — Monday, Tuesday — you get two, which is the inclusive convention used when scheduling rules say a period begins on the day of notice. Neither is wrong; they answer different questions. When a contract or a notice period specifies counting the first day, add one to the elapsed figure. When you are measuring duration, age or countdown distance, the elapsed convention is the correct one and is what this calculator returns.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Leap years and the 365 or 366 split</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A calendar year is 365 days because that approximates the solar year, with a leap day added most years to correct the drift. The rule has two layers: a year is a leap year if it is divisible by four, except that years divisible by 100 are not leap years unless they are also divisible by 400. That is why 2024 and 2020 gained a day, 2100 will not, and 2000 did. Because this calculator works from the actual calendar rather than assuming 365-day years, any span crossing 29 February comes out correctly — a count from January to March in a leap year runs one day longer than the same span in a common year. Whole-day results are unaffected by daylight saving, because the calculation compares calendar dates rather than clock timestamps.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Weeks, hours and minutes from the same span</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Once the day count is fixed, everything else is division. Weeks are the whole number of seven-day blocks in the span, so 100 days gives fourteen full weeks with two days left over. Hours are days multiplied by 24 and minutes by 1,440 — straightforward, though it is worth remembering that a calendar year is 8,760 hours normally and 8,784 in a leap year. For spans crossing daylight saving transitions, elapsed hours measured by a real clock will differ by one from the simple multiplication, because a clock hour was added or removed. When precision at that level matters, such as SLA or shift timing, work with timestamps in a single time zone rather than calendar dates.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Counting Convention</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            This calculator counts the gap, not the calendar days touched. If you need the inclusive count used for notice periods, deadlines and lease terms — where both the start and end day are counted — add one to the day total shown.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Does it include both the start and the end date?", answer: "No. The result is elapsed time: the end date minus the start date. Monday to Tuesday shows one day. If you need both endpoints counted, add one to the figure shown." },
      { question: "Why is my result one day different from my manual count?", answer: "Because you are probably counting inclusively while the calculator counts elapsed days. Inclusive counting adds one, and it is the right convention for notice periods and deadlines; elapsed counting is right for durations and ages." },
      { question: "Does the calculator handle leap years?", answer: "Yes. It reads the real calendar, so any span crossing 29 February is counted correctly — 2024, 2020 and 2000 all have 366 days, while 1900 and 2100 do not." },
      { question: "Can I count working days instead?", answer: "For weekdays only, use the business days calculator, which skips weekends and can account for public holidays. This tool counts every calendar day including weekends and holidays." },
      { question: "How are weeks calculated?", answer: "The whole-week figure is the day count divided by seven, rounded down. The remaining days are simply what is left over — 100 days is 14 weeks and 2 days." },
      { question: "Do time zones or daylight saving change the answer?", answer: "Not for whole days. Dates are treated as calendar days, so a span crossing a daylight saving change still counts the correct number of days; only elapsed hour counts taken from real timestamps would differ by an hour." },
      { question: "Can I run the calculation with the dates in reverse?", answer: "Yes. The tool measures the absolute distance between the two dates, so entering them the other way round produces the same day, week, hour and minute totals." },
      { question: "How many hours are in a year?", answer: "8,760 hours in a common year of 365 days, and 8,784 hours in a leap year. A 100-day span, by contrast, is exactly 2,400 hours and 144,000 minutes." },
      { question: "Does it work for dates before 1970?", answer: "Yes. The calculation uses the civil calendar rather than Unix epoch timestamps, so historical dates, future dates and spans crossing centuries all resolve correctly." },
      { question: "Is this calculator free and private?", answer: "Yes — it is free to use, needs no account, and your dates stay in the browser because the calculation runs entirely on your device." }
    ],
    relatedCalculators: [
      { name: 'Date Difference Calculator', path: '/date-difference-calculator.html' },
      { name: 'Date Add/Subtract Calculator', path: '/date-add-subtract-calculator.html' },
      { name: 'Time Duration Calculator', path: '/time-duration-calculator.html' },
      { name: 'Leap Year Calculator', path: '/leap-year-calculator.html' },
      { name: 'Age Calculator', path: '/age-calculator.html' }
    ],
    howWeCalculate: {
      formula: "days = |end date − start date| in whole days;  weeks = floor(days ÷ 7);  hours = days × 24;  minutes = days × 1,440",
      explanation: "Both dates are converted to timestamps at local midnight, the absolute difference is taken so the order does not matter, and the span is divided into whole days. Weeks come from whole seven-day blocks, while hours and minutes follow from the day count at 24 and 1,440 units per day.",
      example: "1 January 2024 → 31 December 2024 = 365 days = 52 weeks = 8,760 hours = 525,600 minutes"
    },
    workedExample: {
      scenario: "Counting the days from 14 June 2026 to 30 September 2026",
      steps: [
        "Remainder of June: 30 − 14 = 16 days",
        "Add July, August and September: 16 + 31 + 31 + 30 = 108 days",
        "Whole weeks: 108 ÷ 7 = 15 weeks with 3 days remaining",
        "Hours and minutes: 108 × 24 = 2,592 hours and 108 × 1,440 = 155,520 minutes"
      ],
      result: "108 days — 15 weeks and 3 days, 2,592 hours, 155,520 minutes"
    },
    commonValues: {
      heading: "Common date gaps",
      columns: ["Start", "End", "Days"],
      rows: [
        ["1 Jan 2025", "31 Dec 2025", "364"],
        ["1 Jan 2024", "31 Dec 2024", "365"],
        ["1 Feb 2024", "1 Mar 2024", "29"],
        ["1 Feb 2025", "1 Mar 2025", "28"],
        ["1 Jun 2025", "1 Sep 2025", "92"]
      ]
    }
  },

  'stair-calculator': {
    title: "Building Stairs That Pass Inspection: The",
    subtitle: "Stair Calculator",
    introduction: "Stairs are the one part of a build where a centimetre of laziness becomes a building-code violation, a trip hazard and a lifelong annoyance. Get the riser height wrong and every step in the house feels wrong; get the headroom wrong and the inspector stops the job. Our Stair Calculator takes the total rise from finished floor to finished floor, the tread depth you intend to use, the number of steps and the stair width, then works out the riser height per step, the total horizontal run and the concrete volume for a slab or footing underneath. The numbers it produces are the ones you check against the residential code limits — riser heights, tread depths, uniformity and headroom — before a single stringer is cut. Read this page for the division method, the limits that matter, and the volume maths; then confirm your local amendments, because jurisdictions do adapt these figures. It is planning information, not a substitute for an engineer or a permit check.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Dividing the total rise</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Everything starts with the total rise: measure from the finished floor at the bottom to the finished floor of the landing at the top, in inches, accounting for any flooring still to be laid. Divide that by the number of steps and you have the riser height. In practice you work backwards — choose a comfortable riser near seven and a half inches, divide the total rise by it, round to a whole number of steps, then redivide so every riser comes out identical. Uniformity is not optional: the common residential limit allows risers to differ by no more than three-eighths of an inch across the whole flight, because even a small inconsistency is enough to catch a toe. A result over roughly seven and three-quarter inches per riser fails the standard residential code in most places, so add a step rather than accept a steep flight.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Run, total run and headroom</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The run you enter is the tread depth for each step, and the total horizontal run equals that tread multiplied by the number of steps minus one — the top step is usually the landing itself, so it consumes no run. Comfort follows a rough relationship: twice the rise plus the tread should land near 24 to 25 inches, which is why a 7.5-inch riser pairs naturally with a 10-inch tread. Tread depth limits also exist in their own right, with 10 inches the familiar residential minimum for the going excluding nosings. Above the staircase, headroom must clear roughly 6 feet 8 inches measured vertically from the nosing line to the ceiling or soffit below. Take the total run seriously when you lay out the floor opening — it determines how much of the upper floor you have to frame out.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Concrete beneath the flight</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Where a straight run sits on a poured slab or fills solid underneath, the volume is a simple box once every dimension is in feet: total run multiplied by width multiplied by the total rise, divided by 27 to reach cubic yards. Mixed units are the classic error here — inches of run times inches of width times feet of rise produces a meaningless figure, so convert everything before you multiply. Note also that the box is an upper bound. If the space beneath an open staircase is left hollow, the actual wedge-shaped pour is closer to half that volume; if you are filling it solid for storage or structure, the full figure applies. Order five to ten percent over the calculated volume for over-excavation and spillage, exactly as you would with any concrete pour.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Code First</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            The limits quoted here follow the widely used international residential code pattern: risers up to 7¾ inches, treads of at least 10 inches, riser uniformity within 3⁄8 inch and headroom of at least 6 ft 8 in. Local amendments and commercial or exterior stairs use different numbers — check before you cut.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How is riser height calculated?", answer: "Divide the total rise by the number of steps. A 108-inch floor-to-floor height over 14 steps gives 7.71 inches per riser; over 12 steps it gives 9 inches, which would be far too steep for residential use." },
      { question: "What is the maximum riser height?", answer: "Under the common residential code pattern the limit is 7¾ inches, with risers required to stay within 3⁄8 inch of each other across the flight. Stairs serving other occupancies, exterior steps and local amendments can all impose stricter limits." },
      { question: "What is the minimum tread depth?", answer: "Ten inches is the familiar residential minimum for tread depth, measured from nosing to nosing or excluding nosings depending on the jurisdiction. Deeper treads feel safer and help taller users, so many builders go to 11 inches." },
      { question: "How do I measure total rise correctly?", answer: "Measure vertically from the finished floor at the bottom to the finished floor at the top landing, in the same units you will use for the steps. Include any finish flooring, tile or carpet that has not yet been laid, or your risers will all end up short." },
      { question: "What is the riser and tread rule of thumb?", answer: "Twice the rise plus the tread should come to roughly 24 to 25 inches. A 7.5-inch riser with a 10-inch tread gives 25 inches, which is the classic comfortable combination." },
      { question: "How many steps do I need?", answer: "Divide the total rise by about 7.5 inches and round to a whole number, then redivide the total rise by that number to equalise the risers. If the result exceeds the code maximum, add a step and redivide." },
      { question: "How much concrete does the calculator estimate?", answer: "Total run in feet multiplied by width in feet multiplied by the total rise in feet, divided by 27 for cubic yards. That is the full box volume; an open space beneath a staircase would use roughly half of it." },
      { question: "How many stringers does a staircase need?", answer: "Stringers are commonly spaced about 16 inches on centre, so a 36-inch-wide flight usually takes three. Tread thickness, material and span all affect the count, and engineered treads can span further than dimensional lumber." },
      { question: "What headroom is required above stairs?", answer: "At least 6 feet 8 inches (80 inches) measured vertically from the nosing line to the ceiling or soffit above, under the common residential pattern. Openings in the upper floor must be framed large enough to preserve that clearance." },
      { question: "Is this calculator free to use?", answer: "Yes. It is free, needs no account, and every dimension you enter stays on your device because the arithmetic runs in the browser." }
    ],
    relatedCalculators: [
      { name: 'Concrete Calculator', path: '/concrete-calculator.html' },
      { name: 'Cubic Yards Calculator', path: '/cubic-yards-calculator.html' },
      { name: 'Volume Calculator', path: '/volume-calculator.html' },
      { name: 'Gravel Calculator', path: '/gravel-calculator.html' }
    ],
    howWeCalculate: {
      formula: "rise per step = total rise ÷ steps;  total run = tread depth × (steps − 1);  concrete cu yd = total run (ft) × width (ft) × rise (ft) ÷ 27",
      explanation: "The total rise is distributed evenly across the steps, the horizontal footprint comes from the tread depth times every step except the last, and the concrete volume converts all three dimensions to feet before dividing by the 27 cubic feet that make one cubic yard.",
      example: "108 in rise over 12 steps = 9 in riser; tread 11 in → total run = 11 × 11 = 121 in = 10.08 ft; 10.08 × 3 × 9 ÷ 27 ≈ 10.1 cu yd"
    },
    workedExample: {
      scenario: "A ten-foot floor-to-floor rise for a straight interior staircase",
      steps: [
        "Total rise = 120 inches, target a comfortable 7.5-inch riser",
        "120 ÷ 7.5 = 16 steps exactly, so each riser is 7.50 in",
        "Tread 10 in → total run = 10 × (16 − 1) = 150 in = 12.5 ft",
        "Comfort check: 2 × 7.5 + 10 = 25 in, inside the 24–25 in range"
      ],
      result: "16 risers at 7.5 in, total run 150 in (12.5 ft), 2R + T = 25 in"
    },
    commonValues: {
      heading: "Step counts for common floor-to-floor heights",
      columns: ["Total rise", "Steps at 7.5 in", "Exact riser"],
      rows: [
        ["96 in", "13", "7.38 in"],
        ["108 in", "14", "7.71 in"],
        ["120 in", "16", "7.50 in"],
        ["132 in", "18", "7.33 in"],
        ["144 in", "19", "7.58 in"]
      ]
    }
  },

  'gravel-calculator': {
    title: "How Much Gravel Do You Really Need? The",
    subtitle: "Gravel Calculator",
    introduction: "Gravel is bought by the cubic yard, sold by the truckload and spread by eye, which is why so many driveway projects end with either two tonnes of stone left on the lawn or a frantic second delivery halfway through the job. Our Gravel Calculator turns length, width and depth into the numbers suppliers actually quote: square footage, cubic feet, cubic yards, approximate tonnage and a cost estimate at whatever price per yard you have been given. The depth input is in inches, because that is how gravel depth is specified on site, while the plan dimensions are in feet — the conversion between the two is where most hand calculations go wrong. This page covers depth guidance for different uses, the relationship between volume and weight, coverage rates and the compaction allowance you should always add. It is an estimating tool for landscaping and drainage work, not an engineering specification.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Area first, depth second</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Measure the area in feet and the depth in inches, then let the calculator handle the unit mismatch: area times depth divided by 12 gives cubic feet, and cubic feet divided by 27 gives cubic yards. For a rectangular drive that is all there is to it; for curves, circles or multiple beds, break the plan into rectangles, calculate each and add them together. Depth is where estimates are usually lost. Three inches spread over a five-hundred-square-foot drive is 125 cubic feet, which sounds like a lot until you remember that a single cubic yard covers about 100 square feet at exactly that depth. Spreading thin material over a large area is deceptive, and a half-inch shortfall over the whole project can quietly consume several cubic yards of your order.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Cubic yards, tons and why they differ</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Suppliers quote either volume or weight, and the two are linked by density. Crushed stone and pea gravel typically sit in the range of roughly 95 to 120 pounds per cubic foot, which works out to about 1.3 to 1.6 tons per cubic yard depending on stone type, grading and how well it is compacted. A commonly used planning conversion is therefore around 1.4 tons per cubic yard. The practical consequence is that a yard of open-graded drainage stone weighs less than a yard of dense-grade material even though both occupy the same space. If your quote is in tons and your plan is in yards, agree the density with the supplier first — otherwise the conversion is a guess.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Depth by use, and the compaction allowance</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Depth depends entirely on the job. Decorative paths and borders usually run two to three inches, enough to suppress weeds and stay put underfoot. Driveways want four to six inches of compacted base, sometimes more over soft ground, because the stone has to distribute vehicle loads rather than simply look tidy. Drainage trenches and French drains often take six inches or a full pipe diameter of washed stone. Gravel compacts when it is rolled and driven on, commonly losing ten to twenty percent of its loose volume, so order accordingly: a project that measures exactly 4.6 cubic yards should be ordered at five or five and a half. A layer of landscape fabric beneath the stone is cheap insurance against mixing with the soil below.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Ordering Tip</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Round every order up to the nearest quarter cubic yard. Gravel beds down, spreads wider at the edges than you planned and leaves low spots that need touching up — a five to ten percent surplus almost always gets used, and a shortfall costs more in delivery fees than the stone itself.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How much gravel does a driveway need?", answer: "Four to six inches of compacted stone for a typical residential drive, more over soft or clay ground. For scale, a 100 square foot section at 3 inches takes about 0.93 cubic yards, so a 500 square foot drive at 6 inches needs roughly 4.6 cubic yards before compaction allowance." },
      { question: "Should I order in cubic yards or tons?", answer: "Either — they are linked by density. Most aggregate is quoted per cubic yard, while some suppliers price per ton. Roughly 1.3 to 1.6 tons makes a cubic yard for common gravels, so confirm the density with your supplier before converting." },
      { question: "How many cubic feet are in a cubic yard?", answer: "Twenty-seven. A cubic yard is a three-foot cube: 3 × 3 × 3 = 27 cubic feet. To convert, divide your cubic feet figure by 27." },
      { question: "How much does a cubic yard of gravel weigh?", answer: "Commonly between about 2,600 and 3,200 pounds, depending on stone type, size grading and moisture. Pea gravel runs lighter than dense-grade crushed stone because it packs differently." },
      { question: "How deep should gravel be for different uses?", answer: "Two to three inches for paths and decorative borders, four to six inches compacted for driveways, and around six inches or more for drainage trenches. Under concrete slabs a four-inch compacted sub-base is typical." },
      { question: "Does gravel compact, and should I order extra?", answer: "Yes, typically losing 10 to 20 percent of loose volume once rolled or driven over. Order at least that much extra, and more if the ground is uneven, or you will be short at the far end of the project." },
      { question: "How far will one cubic yard spread?", answer: "About 100 square feet at 3 inches deep, 50 square feet at 6 inches, and 300 square feet at 1 inch. Coverage falls linearly with depth, which makes the per-100-square-foot table below a quick reference." },
      { question: "Do I need landscape fabric under the gravel?", answer: "It is usually recommended for paths and driveways, because it separates the stone from the soil below, suppresses weed growth and keeps the base from sinking into soft ground over time." },
      { question: "What gravel size should I choose?", answer: "Three-quarter-inch crushed stone is the standard for driveways because the angular pieces lock together, while pea gravel gives a smoother, looser finish suited to paths and decorative areas. Washed stone is preferable wherever drainage is the goal." },
      { question: "Do you save my measurements or price?", answer: "No. Dimensions and pricing are used for one calculation in your browser and are never transmitted or stored, so you can price up several options without leaving a trace." }
    ],
    relatedCalculators: [
      { name: 'Cubic Yards Calculator', path: '/cubic-yards-calculator.html' },
      { name: 'Concrete Calculator', path: '/concrete-calculator.html' },
      { name: 'Volume Calculator', path: '/volume-calculator.html' },
      { name: 'Area Calculator', path: '/area-calculator.html' }
    ],
    howWeCalculate: {
      formula: "cubic feet = length (ft) × width (ft) × depth (in) ÷ 12;  cubic yards = cubic feet ÷ 27;  tons ≈ cubic yards × 27 × density (lb/ft³) ÷ 2,000",
      explanation: "The plan area is multiplied by the depth after it is converted from inches to feet, then the volume is divided by 27 to reach cubic yards. Tonnage applies a bulk density of about 100 pounds per cubic foot, and cost multiplies the yardage by your price per cubic yard.",
      example: "50 × 10 ft at 3 in: 500 sq ft × 0.25 ft = 125 cu ft → 4.63 cu yd → about 6.5 tons at ~105 lb/ft³"
    },
    workedExample: {
      scenario: "A 50 ft by 10 ft driveway needing 3 inches of gravel at $40 per cubic yard",
      steps: [
        "Area: 50 × 10 = 500 square feet",
        "Depth in feet: 3 ÷ 12 = 0.25 ft, so volume = 500 × 0.25 = 125 cubic feet",
        "Convert to yards: 125 ÷ 27 = 4.63 cubic yards",
        "Add a 10 percent compaction allowance: 4.63 × 1.10 ≈ 5.1 cubic yards to order"
      ],
      result: "4.63 cu yd (125 cu ft), ≈ 6.5 tons, ≈ $185 at $40/yd — order about 5.1 yd with waste"
    },
    commonValues: {
      heading: "Gravel needed per 100 square feet",
      columns: ["Depth", "Cubic yards", "Approx. tons"],
      rows: [
        ["1 in", "0.31 cu yd", "0.43 t"],
        ["2 in", "0.62 cu yd", "0.87 t"],
        ["3 in", "0.93 cu yd", "1.30 t"],
        ["4 in", "1.23 cu yd", "1.72 t"],
        ["6 in", "1.85 cu yd", "2.59 t"]
      ]
    }
  },

  'wood-calculator': {
    title: "Counting Board Feet and Lumber Cost with the",
    subtitle: "Wood Calculator",
    introduction: "Lumber has its own unit of account, and anyone who has stood in a hardwood yard staring at a price tag already knows it: the board foot. Deck estimates, framing takeoffs, furniture budgets and timber purchases all run through that single measure, yet the arithmetic trips up even experienced builders at least once. Our Wood Calculator takes the length and width of the area you are covering, the thickness of the boards you plan to buy and the price per board foot, then returns the area, the board-foot total and a cost figure you can take to the yard. This page explains exactly what a board foot is, why nominal lumber sizes are not the sizes you measure, how the quarter-system thickness notation works, and how much waste to add before you order. It is an estimating aid for planning and budgeting, not a mill invoice.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">One board foot means 144 cubic inches</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A board foot is a volume: twelve inches long, twelve inches wide and one inch thick, which is 144 cubic inches. In practice you never cut a foot-square board, so the working forms are what matter. For a single piece, board feet equal the nominal width in inches multiplied by the thickness in inches multiplied by the length in feet, all divided by twelve. For a surface you are covering, board feet simply equal the area in square feet multiplied by the thickness in inches, because one square foot one inch thick is exactly one board foot by definition. That second identity is the one worth memorising: eighty square feet of one-inch material is eighty board feet, no matter how the boards are cut. Confusing the two formulas is the most common source of an estimate that is out by a factor of twelve.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Nominal sizes, actual sizes and the quarter system</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Board feet are calculated from nominal dimensions — the trade names, not the tape measure. A nominal two-by-four is actually 1½ by 3½ inches after drying and planing; a nominal one-by-ten is three-quarters by nine and a quarter. Lumber is sold on the nominal figure, so your board-foot count stays consistent with the yard's pricing even though the wood in your hand is smaller. Thickness in hardwood is quoted in quarters of an inch: four-quarter stock is one inch nominal, five-quarter is an inch and a quarter, six-quarter an inch and a half and eight-quarter two inches. Getting this backwards inflates a quote badly, which is why it is worth confirming the notation with the yard before you order.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Waste, grading and how yards actually price</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Every takeoff needs a waste factor, and ten to fifteen percent is the usual starting point: it covers cut ends, knots, checks and the boards you reject at the rack. Angled or herringbone layouts push that figure higher, and long continuous runs often do too because you are matching grain rather than minimising cuts. Hardwood is typically sold by the board foot at a price that varies sharply by species, grade and figure, while construction softwood is often priced per piece or per linear foot — so check which basis your quote uses before comparing. Plywood does not belong in this calculation at all: sheets are sold by area, a standard 4 by 8 sheet providing 32 square feet regardless of thickness.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Buyer's Note</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Ask the yard how they round board feet before you commit — some round each piece up, others round the line total. On a large order that difference is worth real money, and it is much easier to negotiate at the counter than to discover it on the invoice.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What exactly is a board foot?", answer: "A volume equal to 144 cubic inches: twelve inches by twelve inches by one inch. For a single piece, board feet = nominal width (in) × thickness (in) × length (ft) ÷ 12." },
      { question: "What is the difference between nominal and actual size?", answer: "Nominal is the trade name; actual is what you measure after the board is dried and planed. A nominal 2×4 measures 1½ × 3½ inches, and a nominal 1×10 measures ¾ × 9¼ inches. Board feet always use the nominal figures." },
      { question: "What does 4/4, 6/4 or 8/4 lumber mean?", answer: "Quarters of an inch of thickness: 4/4 is one inch, 5/4 is one and a quarter inches, 6/4 is one and a half inches and 8/4 is two inches. It is the standard way hardwood thickness is quoted at the yard." },
      { question: "How many board feet are in a 2×4 eight feet long?", answer: "Nominal dimensions give (4 × 2 × 8) ÷ 12 = 5.33 board feet. That is the figure a yard would charge you for, even though the finished board measures 1½ × 3½ inches." },
      { question: "How do I convert square feet to board feet?", answer: "Multiply the area in square feet by the thickness in inches. Eighty square feet of one-inch stock is 80 board feet; the same area in two-inch stock is 160 board feet." },
      { question: "What waste factor should I add?", answer: "Ten to fifteen percent for straightforward layouts, and more for angled patterns, curved cuts or stock with known defects. Adding waste before you price is far cheaper than a second delivery later." },
      { question: "Why do hardwood and softwood price differently?", answer: "Hardwood is graded and sold by the board foot because pieces vary so much in length and width, while construction softwood is dimensional and usually priced per piece or per linear foot. Always confirm which basis a quote uses." },
      { question: "Can I use this calculator for plywood or sheet goods?", answer: "No. Sheets are sold by area rather than board feet — a standard 4 by 8 sheet covers 32 square feet at any thickness. Use the sheet count and price per sheet instead." },
      { question: "Does moisture content change the volume?", answer: "Kiln-dried lumber is slightly smaller than green stock once it shrinks, but board feet are always reckoned on nominal dimensions, so pricing is unaffected by how much the board has moved since milling." },
      { question: "Do you save my project dimensions?", answer: "No. Your length, width, thickness and price are used for one calculation in the browser and are never transmitted or stored anywhere." }
    ],
    relatedCalculators: [
      { name: 'Area Calculator', path: '/area-calculator.html' },
      { name: 'Flooring Calculator', path: '/flooring-calculator.html' },
      { name: 'Volume Calculator', path: '/volume-calculator.html' },
      { name: 'Cubic Yards Calculator', path: '/cubic-yards-calculator.html' }
    ],
    howWeCalculate: {
      formula: "board feet = nominal width (in) × thickness (in) × length (ft) ÷ 12;   for a surface: area (sq ft) × thickness (in);   cost = board feet × price per BF",
      explanation: "Both forms express the same 144-cubic-inch definition: one form for individual pieces, the other for a covered area. Thickness is always nominal, area is measured in square feet, and the total is multiplied by your price per board foot to reach a budget figure.",
      example: "A 1 in × 10 in × 8 ft board: (10 × 1 × 8) ÷ 12 = 6.67 BF; twelve boards cover 80 sq ft, which is 80 × 1 in = 80 BF"
    },
    workedExample: {
      scenario: "Decking for an 8 ft by 10 ft frame using one-inch nominal boards at $5 per board foot",
      steps: [
        "Area: 8 × 10 = 80 square feet",
        "Board feet at 1 in nominal: 80 × 1 = 80 BF",
        "Add 12 percent for cuts and rejects: 80 × 1.12 ≈ 90 BF",
        "Price it: 90 × $5.00 = $450 (80 BF without waste = $400)"
      ],
      result: "80 board feet for the area, ≈ 90 BF with waste, ≈ $450 at $5 per board foot"
    },
    commonValues: {
      heading: "Board feet per square foot of surface",
      columns: ["Thickness", "Inches", "BF per sq ft"],
      rows: [
        ["4/4", "1 in", "1.00"],
        ["5/4", "1.25 in", "1.25"],
        ["6/4", "1.5 in", "1.50"],
        ["8/4", "2 in", "2.00"]
      ]
    }
  },

  'cubic-yards-calculator': {
    title: "Soil, Mulch and Excavation Volumes, Converted by the",
    subtitle: "Cubic Yards Calculator",
    introduction: "Bulk material is sold by the cubic yard, but almost nobody plans a project in cubic yards — we measure beds in feet, depths in inches and bags in cubic feet, then hope the arithmetic works out at the yard. Our Cubic Yards Calculator does that conversion properly: enter length and width in feet and depth in inches, and it returns cubic feet and cubic yards side by side so you can quote, order and compare with confidence. The tool suits topsoil, mulch, sand, fill, compost, gravel base and excavation volumes alike, because all of them are simply boxes of material measured the same way. This page covers why the 27-cubic-foot conversion exists, where depth units go wrong, how compaction and truckload sizes affect what you actually receive, and how to translate the answer into bag counts. It is an estimating aid for planning and budgeting rather than a certified earthworks measurement.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Why 27 cubic feet make a yard</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A cubic yard is a cube three feet on each side, so its volume is 3 × 3 × 3 = 27 cubic feet. That single identity is the hinge of every bulk-material estimate: take your cubic feet, divide by 27 and you have cubic yards, which is the unit quarries, landscape suppliers and ready-mix companies quote in. Useful companions follow from the same cube — one cubic yard holds about 202 US gallons or roughly 765 litres, and in metric it equals 0.7646 cubic metres, while a cubic metre converts back at 1.308 cubic yards. Keeping those pairs in mind makes it easy to sanity-check a supplier's figure: if someone quotes 40 cubic feet and calls it a yard and a half, the arithmetic does not hold.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Depth is where estimates fail</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Almost every wrong bulk-material order traces back to a unit mismatch on depth. Inches are how depth is specified on site, feet are how length and width are measured, and mixing them without dividing by twelve produces an answer wrong by a factor of twelve — the classic way a one-yard job becomes a twelve-yard disaster. The calculator takes depth in inches and does the conversion for you, so a six-inch layer over 200 square feet resolves to 100 cubic feet, or 3.70 cubic yards. On uneven ground, take several spot depths and average them; a single measurement at the deepest point will inflate the order, while one at the shallowest will leave bald patches. Uniformity matters more than precision: thin spots in mulch and topsoil show up visually long before a few percent of volume does.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Waste, compaction and truckloads</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Loose material rarely stays loose. Topsoil commonly settles twenty to thirty percent once placed and watered, so a bed that measures exactly one cubic yard will visibly shrink — order the calculated volume plus a healthy margin if you want full depth after settling. Compost and mulch behave similarly, while sand and gravel compact harder still. On the transport side, a full-size pickup truck typically carries about 1.5 to 2.5 cubic yards loose depending on payload, and a small dump truck runs perhaps ten to fifteen. Converting to bag counts helps with small jobs: at two cubic feet per bag you need thirteen and a half bags for every cubic yard, and it is worth remembering that bagged material costs far more per yard than bulk delivery for anything over a couple of cubic yards.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Waste Rule</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Add ten percent to any bulk order as a minimum, and twenty percent if the ground is uneven or the material settles heavily. One extra cubic yard is cheap insurance; a second delivery fee for a half-yard shortfall is not.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How many cubic feet are in a cubic yard?", answer: "Twenty-seven. A cubic yard is a three-foot cube, so 3 × 3 × 3 = 27 cubic feet. Divide your cubic feet by 27 to convert, or multiply cubic yards by 27 to go the other way." },
      { question: "How many bags do I need for a cubic yard?", answer: "With standard two-cubic-foot bags, thirteen and a half bags make one cubic yard, so a 3.70 cubic yard order equals about 50 bags. Bagged material costs considerably more per yard than bulk delivery." },
      { question: "How many gallons are in a cubic yard?", answer: "About 202 US gallons, or roughly 765 litres. A cubic yard also equals 0.7646 cubic metres, and one cubic metre converts to 1.308 cubic yards." },
      { question: "Why does my topsoil estimate come up short?", answer: "Settling and compaction. Topsoil commonly loses twenty to thirty percent of its loose volume once placed and watered, and mulch similar amounts, so order above the geometric volume rather than exactly on it." },
      { question: "Should I think in cubic yards or tons?", answer: "Volume for most landscaping materials; weight when a supplier quotes by the ton, which depends on the material's density. Ask which basis a price uses before comparing quotes." },
      { question: "How much fits in a pickup truck?", answer: "Roughly 1.5 to 2.5 cubic yards loose in a full-size bed, limited more by payload than by space. Gravel is heavy, so weight limits are reached well before the bed is full." },
      { question: "Can I use this calculator for concrete?", answer: "Yes for raw volume — enter length, width and depth in the usual way. For a ready-mix order, allow extra for over-excavation and spillage and use the dedicated concrete calculator as a cross-check." },
      { question: "How do I measure depth on uneven ground?", answer: "Take spot depths across the area with a tape or stake, add them up and divide by the number of readings. Averaging several points is far more reliable than trusting the deepest or shallowest one." },
      { question: "Does the calculator handle metric units?", answer: "It works in feet and inches, which is how bulk material is usually specified. Convert metric plans first: one metre is about 3.28 feet, and one cubic metre equals 1.308 cubic yards." },
      { question: "Are my dimensions stored?", answer: "No. Length, width and depth stay in your browser for the calculation and are never transmitted or saved, so you can price as many scenarios as you like." }
    ],
    relatedCalculators: [
      { name: 'Volume Calculator', path: '/volume-calculator.html' },
      { name: 'Concrete Calculator', path: '/concrete-calculator.html' },
      { name: 'Gravel Calculator', path: '/gravel-calculator.html' },
      { name: 'Area Calculator', path: '/area-calculator.html' }
    ],
    howWeCalculate: {
      formula: "cubic feet = length (ft) × width (ft) × depth (in) ÷ 12;   cubic yards = cubic feet ÷ 27",
      explanation: "Length and width are multiplied to give the plan area, the depth in inches is converted to a fraction of a foot, and the resulting volume is divided by the 27 cubic feet that make up one cubic yard. Both outputs are shown so you can quote in either unit.",
      example: "20 × 10 ft, 6 in deep: 200 sq ft × 0.5 ft = 100 cu ft; 100 ÷ 27 = 3.70 cu yd"
    },
    workedExample: {
      scenario: "Topsoil for a 20 ft by 10 ft garden bed, six inches deep",
      steps: [
        "Area: 20 × 10 = 200 square feet",
        "Depth in feet: 6 ÷ 12 = 0.5 ft, so volume = 200 × 0.5 = 100 cubic feet",
        "Convert: 100 ÷ 27 = 3.70 cubic yards",
        "If buying two-cubic-foot bags: 100 ÷ 2 = 50 bags, or about 67 with a 30% settling allowance"
      ],
      result: "100 cu ft = 3.70 cu yd — roughly 50 two-cubic-foot bags before settling"
    },
    commonValues: {
      heading: "Volume for a 100 square foot area by depth",
      columns: ["Depth", "Cubic feet", "Cubic yards"],
      rows: [
        ["4 in", "33.3 cu ft", "1.23 cu yd"],
        ["6 in", "50.0 cu ft", "1.85 cu yd"],
        ["8 in", "66.7 cu ft", "2.47 cu yd"],
        ["12 in", "100 cu ft", "3.70 cu yd"]
      ]
    }
  }
};
