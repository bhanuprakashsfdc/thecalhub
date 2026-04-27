import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, TrendingUp, Scale, Calculator, Heart, Activity, DollarSign, Binary, Ruler, Hammer, Flame, Calendar, Target, Sparkles, Brain, Lightbulb, ChevronRight, ArrowLeft } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Understanding EMI: How Your Loan Payments Work',
    excerpt: 'Learn how Equated Monthly Installments are calculated and understand the principal vs interest breakdown in your loan.',
    content: `An Equated Monthly Installment (EMI) is a fixed payment you make to a lender each month to repay a loan. Understanding how EMI works helps you make informed financial decisions.

## How EMI is Calculated

EMI is calculated using the formula: E = P × r × (1 + r)^n / ((1 + r)^n - 1)

Where:
- E = EMI
- P = Principal loan amount
- r = Monthly interest rate
- n = Number of monthly installments

## Principal vs Interest

In the early years of a loan, most of your EMI goes towards paying interest. As time progresses, a larger portion goes towards reducing the principal. This is why making prepayments can significantly reduce total interest paid.

## Tips for Managing EMI

1. Choose the right tenure - longer tenure means lower EMIs but more interest
2. Consider prepayments when you have extra funds
3. Compare offers from multiple lenders before taking a loan`,
    category: 'Financial',
    readTime: '5 min read',
    date: '2024-01-15',
    icon: TrendingUp,
    path: 'emi-calculation-guide.html'
  },
  {
    id: 2,
    title: 'BMI Explained: What Your Body Mass Index Really Means',
    excerpt: 'Understand how BMI is calculated, its limitations, and why it should be used as a general guideline rather than a definitive health measure.',
    content: `Body Mass Index (BMI) is a simple calculation using a person's height and weight. While widely used, it's important to understand its limitations.

## How BMI is Calculated

BMI = Weight (kg) / Height (m)²

Categories:
- Underweight: < 18.5
- Normal: 18.5 - 24.9
- Overweight: 25 - 29.9
- Obese: 30 or higher

## Limitations of BMI

BMI doesn't account for:
- Muscle mass (athletes may have high BMI but be healthy)
- Bone density
- Fat distribution
- Individual health factors

## Better Alternatives

Consider using BMI alongside:
- Waist circumference
- Body fat percentage
- Overall health assessment
- Consultation with healthcare providers`,
    category: 'Health',
    readTime: '4 min read',
    date: '2024-01-10',
    icon: Scale,
    path: 'bmi-explained.html'
  },
  {
    id: 3,
    title: 'The Power of Compound Interest: Growing Your Wealth Over Time',
    excerpt: 'Discover why compound interest is called the eighth wonder of the world and how small investments can grow significantly over long periods.',
    content: `Albert Einstein reportedly called compound interest the eighth wonder of the world. Here's why it can be your most powerful wealth-building tool.

## How Compound Interest Works

Unlike simple interest, compound interest is calculated on the initial principal AND accumulated interest.

Example: $10,000 at 7% annual interest
- Year 1: $10,700
- Year 10: $19,672
- Year 20: $38,697
- Year 30: $76,123

## The Time Factor

The longer your money compounds, the more dramatic the growth. Starting early is far more powerful than investing more later.

## Maximize Compound Interest

1. Start investing early
2. Be consistent with contributions
3. Reinvest dividends and interest
4. Choose tax-advantaged accounts
5. Be patient - time is your greatest ally`,
    category: 'Financial',
    readTime: '6 min read',
    date: '2024-01-05',
    icon: Calculator,
    path: 'compound-interest.html'
  },
  {
    id: 4,
    title: 'How to Calculate Percentage Increase and Decrease',
    excerpt: 'A simple guide to calculating percentage changes, commonly used in discounts, price adjustments, and data analysis.',
    content: `Percentage calculations are essential in everyday life - from calculating discounts to analyzing data growth.

## Percentage Increase Formula

New Value - Original Value / Original Value × 100

Example: Price increased from $50 to $65
(65 - 50) / 50 × 100 = 30% increase

## Percentage Decrease Formula

Original Value - New Value / Original Value × 100

Example: Price decreased from $80 to $60
(80 - 60) / 80 × 100 = 25% decrease

## Practical Applications

- Shopping discounts
- Salary increases
- Population growth
- Financial investments
- Data analysis

## Quick Mental Math Tips

- 10% = move decimal one place left
- 5% = half of 10%
- 25% = quarter of the value`,
    category: 'Math',
    readTime: '3 min read',
    date: '2023-12-28',
    icon: Calculator,
    path: 'percentage-calculation.html'
  },
  {
    id: 5,
    title: 'Understanding BMR: Your Basal Metabolic Rate',
    excerpt: 'Learn what BMR is, how it differs from TDEE, and why knowing your metabolic rate can help with fitness goals.',
    content: `Your Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest just to maintain basic functions.

## What BMR Represents

BMR accounts for 60-75% of your daily calorie burn and includes:
- Breathing
- Circulation
- Cell production
- Nutrient processing
- Temperature regulation

## How to Calculate BMR

The Mifflin-St Jeor equation is widely used:

Men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
Women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161

## BMR vs TDEE

- BMR = calories at complete rest
- TDEE (Total Daily Energy Expenditure) = BMR × Activity Factor

## Using BMR for Goals

- Weight loss: Eat below TDEE
- Weight gain: Eat above TDEE
- Maintenance: Eat at TDEE`,
    category: 'Health',
    readTime: '5 min read',
    date: '2023-12-20',
    icon: Scale,
    path: 'bmr-explained.html'
  },
  {
    id: 6,
    title: 'SIP vs Lump Sum Investment: Which is Better?',
    excerpt: 'Compare Systematic Investment Plans with lump sum investments and understand when each strategy works best.',
    content: `Both SIP (Systematic Investment Plan) and lump sum investing have their place. Understanding when to use each can optimize your returns.

## SIP Advantages

- Rupee cost averaging
- Disciplined investing
- Lower emotional decision-making
- Starts with smaller amounts
- Averaged market volatility

## Lump Sum Advantages

- Full exposure to market early
- Potentially higher returns
- No ongoing management needed
- Simpler to execute

## When to Choose SIP

- Unpredictable income
- New to investing
- Risk-averse investors
- Long-term goals with uncertain markets

## When to Choose Lump Sum

- Having surplus funds
- Market at lows
- Short-term investment horizon
- Experienced investors`,
    category: 'Financial',
    readTime: '7 min read',
    date: '2023-12-15',
    icon: DollarSign,
    path: 'sip-vs-lumpsum.html'
  },
  {
    id: 7,
    title: 'Binary Numbers: A Complete Guide for Beginners',
    excerpt: 'Learn how computers use binary numbers and how to convert between decimal and binary systems.',
    content: `Binary is the foundation of all modern computing. Understanding it helps you grasp how computers process information.

## What is Binary?

Binary uses only two digits: 0 and 1. Each digit is called a "bit" (binary digit). Computers use these to represent everything.

## Decimal to Binary

To convert decimal to binary:
1. Divide by 2
2. Record remainder
3. Repeat until quotient is 0
4. Read remainders backwards

Example: 13 → 1101

## Binary to Decimal

Multiply each bit by 2^n where n is position from right (starting at 0).

Example: 1101 = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13

## Why Computers Use Binary

- Simple on/off electrical states
- Reliable data transmission
- Easy to implement in hardware
- Error detection is simpler`,
    category: 'Programming',
    readTime: '6 min read',
    date: '2023-12-10',
    icon: Binary,
    path: 'binary-numbers-guide.html'
  },
  {
    id: 8,
    title: 'How to Calculate Your Daily Water Intake',
    excerpt: 'Find out exactly how much water you should drink daily based on your weight, activity level, and climate.',
    content: `Proper hydration is essential for overall health. While individual needs vary, there are proven methods to estimate your daily water requirements.

## Basic Calculation

A common guideline: 30-35ml per kg of body weight

Example: 70kg person = 2.1-2.5 liters daily

## Adjust for Activity

Add 350-500ml per 30 minutes of exercise

## Climate Adjustments

- Hot/humid weather: increase by 20-30%
- Cold weather: maintain normal intake
- High altitude: increase by 10-15%

## Signs of Dehydration

- Dark urine color
- Fatigue
- Headaches
- Dry skin
- Dizziness

## Hydration Tips

- Start day with warm water
- Keep water visible
- Set reminders
- Eat water-rich foods
- Monitor urine color`,
    category: 'Health',
    readTime: '4 min read',
    date: '2023-12-05',
    icon: Heart,
    path: 'water-intake-guide.html'
  },
  {
    id: 9,
    title: 'Understanding Loan Amortization Schedules',
    excerpt: 'Learn how amortization works and how to read your loan schedule to understand principal vs interest payments.',
    content: `An amortization schedule breaks down each payment into principal and interest, showing how your loan balance decreases over time.

## How Amortization Works

Each payment contains:
- Interest (based on current balance)
- Principal (remaining goes to principal)

Early payments = mostly interest
Late payments = mostly principal

## Reading Your Schedule

A typical schedule shows:
- Payment number
- Payment amount
- Principal portion
- Interest portion
- Remaining balance

## Why It Matters

Understanding your schedule helps:
- See total interest paid
- Plan prepayments
- Compare loan options
- Understand equity building

## Strategies to Save Interest

1. Make bi-weekly payments
2. Add extra to principal
3. Refinance at lower rates
4. Pay extra during grace period`,
    category: 'Financial',
    readTime: '8 min read',
    date: '2023-11-28',
    icon: Calculator,
    path: 'amortization-schedule.html'
  },
  {
    id: 10,
    title: 'How to Calculate Body Fat Percentage at Home',
    excerpt: 'Different methods to measure body fat percentage without expensive equipment - from calipers to online calculators.',
    content: `Knowing your body fat percentage is more useful than BMI for understanding your true health status and fitness level.

## US Navy Method

Requires neck and waist measurements:
1. Measure neck circumference
2. Measure waist at navel
3. Input into calculator
4. Get estimated body fat %

## Skinfold Calipers

1. Pinch fat at specific sites
2. Measure with calipers
3. Use charts to calculate %

Common sites: chest, abdomen, thigh (men); tricep, suprailiac, thigh (women)

## Body Fat Categories

Men:
- Essential: 2-5%
- Athletes: 6-13%
- Fitness: 14-17%
- Average: 18-24%
- Obese: 25%+

Women:
- Essential: 10-13%
- Athletes: 14-20%
- Fitness: 21-24%
- Average: 25-31%
- Obese: 32%+`,
    category: 'Fitness',
    readTime: '5 min read',
    date: '2023-11-20',
    icon: Activity,
    path: 'body-fat-percentage.html'
  },
  {
    id: 11,
    title: 'Square Root Basics: Everything You Need to Know',
    excerpt: 'Master square root calculations including perfect squares, estimation, and practical applications.',
    content: `Square roots are fundamental to mathematics. Understanding them opens doors to more advanced concepts.

## What is a Square Root?

The square root of a number is a value that, when multiplied by itself, gives the original number.

√16 = 4 because 4 × 4 = 16

## Perfect Squares

Numbers like 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 that have integer square roots.

## Estimation Method

For non-perfect squares:
1. Find nearest perfect square
2. Estimate between those roots
3. Refine using averaging

Example: √20
- Between 16 (√4) and 25 (√5)
- Estimate ~4.5
- 4.5² = 20.25 (close!)

## Properties

- √a × √b = √(a×b)
- √a / √b = √(a/b)
- √(a²) = a (when a ≥ 0)`,
    category: 'Math',
    readTime: '5 min read',
    date: '2023-11-15',
    icon: Ruler,
    path: 'square-root-guide.html'
  },
  {
    id: 12,
    title: 'Concrete Calculator: How Much Do You Need?',
    excerpt: 'Calculate exactly how much concrete you need for your construction project and avoid wastage.',
    content: `Ordering the right amount of concrete saves money and prevents project delays. Here's how to calculate accurately.

## Basic Calculation

Volume = Length × Width × Height

Convert all measurements to feet or meters before calculating.

## Example: Patio Slab

10ft × 10ft × 4 inches thick
= 10 × 10 × 0.333
= 33.3 cubic feet

## Adding Waste Factor

Always add 5-10% for:
- Spillage
- Slight over-excavation
- Uneven surfaces

33.3 × 1.1 = 36.6 cubic feet

## Converting to Bags

- 60lb bag = 0.45 cubic feet
- 80lb bag = 0.6 cubic feet

36.6 / 0.6 = 61 bags (80lb)

## Tips

- Measure twice, order once
- Consider ready-mix for large jobs
- Account for slope/grade
- Check with supplier for advice`,
    category: 'Construction',
    readTime: '6 min read',
    date: '2023-11-10',
    icon: Hammer,
    path: 'concrete-calculator-guide.html'
  },
  {
    id: 13,
    title: 'Understanding Calorie Deficit for Weight Loss',
    excerpt: 'Learn how to create a sustainable calorie deficit to lose weight without compromising your health.',
    content: `Creating a calorie deficit is the key to weight loss. Understanding how to do it safely leads to sustainable results.

## The Science

1 pound of fat = 3,500 calories
To lose 1 lb/week: 500 calorie deficit daily

## Safe Deficit Guidelines

- Maximum 1,000 cal deficit per day
- Minimum 1,200 cal for women, 1,500 for men
- 0.5-2 lbs per week is sustainable

## Creating Deficit

Through diet:
- Track intake accurately
- Choose nutrient-dense foods
- Control portion sizes
- Limit processed foods

Through exercise:
- Strength training
- Cardiovascular exercise
- Daily movement
- NEAT (non-exercise activity)

## Warning Signs

- Fatigue
- Mood changes
- Nutrient deficiencies
- Muscle loss

## Sustainable Approach

- Make small changes
- Focus on habits
- Allow flexibility
- Prioritize protein`,
    category: 'Fitness',
    readTime: '6 min read',
    date: '2023-11-05',
    icon: Flame,
    path: 'calorie-deficit-guide.html'
  },
  {
    id: 14,
    title: 'Date Calculations: Days Between Dates Made Easy',
    excerpt: 'Learn different methods to calculate days between dates including business days and leap year handling.',
    content: `Date calculations are useful for project planning, age verification, and many business applications.

## Simple Day Count

Subtract the earlier date from later date:
Jan 10 - Jan 1 = 9 days

## Business Days Calculation

Exclude weekends:
- Use date functions
- Consider holidays
- Account for partial weeks

## Leap Year Rules

A year is a leap year if:
- Divisible by 4 AND
- Not divisible by 100, OR divisible by 400

2024 is leap year (divisible by 4)
1900 was NOT (divisible by 100, not 400)
2000 WAS (divisible by 400)

## Quick Calculations

- 30 days = roughly 1 month
- 365 days = 1 year
- Decade = 3,650 days (3,652 with leap year)

## Digital Tools

Use calculators for:
- Pregnancy due dates
- Project deadlines
- Age verification
- Contract periods`,
    category: 'Date & Time',
    readTime: '4 min read',
    date: '2023-10-28',
    icon: Calendar,
    path: 'date-calculation-guide.html'
  },
  {
    id: 15,
    title: 'Risk-Reward Ratio: The Key to Profitable Trading',
    excerpt: 'Understand how to use risk-reward ratios to improve your trading success and minimize losses.',
    content: `The risk-reward ratio is a critical concept that separates profitable traders from losing ones.

## Understanding the Ratio

Risk-Reward = Potential Loss / Potential Profit

Example:
- Stop loss: $100
- Take profit: $300
- Ratio: 1:3

## Why It Matters

Even with 50% win rate:
- 1:2 ratio = break even
- 1:3 ratio = profitable

## Finding Good Ratios

Look for:
- Minimum 1:2
- Technical setup confirmation
- Clear support/resistance
- Defined entry/exit points

## Risk Management

- Never risk more than 2% per trade
- Use position sizing
- Keep losses small
- Let winners run

## Common Mistakes

- Risking more than potential gain
- Not using stop losses
- Moving stop loss further
- Taking trades without clear plan`,
    category: 'Trading',
    readTime: '7 min read',
    date: '2023-10-20',
    icon: Target,
    path: 'risk-reward-ratio.html'
  },
  {
    id: 16,
    title: 'Understanding HEX Color Codes for Web Design',
    excerpt: 'Learn how to read and use hexadecimal color codes for web design and digital graphics.',
    content: `HEX color codes are the standard for digital colors. Understanding them gives you precise control over your designs.

## HEX Format

#RRGGBB where:
- RR = Red (00-FF)
- GG = Green (00-FF)
- BB = Blue (00-FF)

#FF0000 = pure red
#00FF00 = pure green
#0000FF = pure blue

## Short Form

For repeating pairs, use 3 digits:
#F00 = #FF0000
#0F0 = #00FF00

## Common Colors

- #000000 = Black
- #FFFFFF = White
- #808080 = Gray
- #FFA500 = Orange

## Using Transparency

Add alpha channel:
#RRGGBBAA
- FF = fully opaque
- 80 = 50% transparent
- 00 = fully transparent

## Color Mixing

- #FF + #00FF00 = #FFFF00 = Yellow
- #FF + #0000FF = #FF00FF = Magenta
- #00FF00 + #0000FF = #00FFFF = Cyan`,
    category: 'Programming',
    readTime: '5 min read',
    date: '2023-10-15',
    icon: Sparkles,
    path: 'hex-color-codes.html'
  },
  {
    id: 17,
    title: 'Probability Basics: Understanding Odds and Outcomes',
    excerpt: 'Learn the fundamentals of probability and how to calculate odds for everyday decisions.',
    content: `Probability helps us make better decisions by quantifying uncertainty. It's essential for statistics, gaming, and real-life choices.

## Basic Probability

P(event) = favorable outcomes / total outcomes

Example: Rolling a 4 on a die
P(4) = 1/6 = 0.167 = 16.7%

## Probability Rules

- Sum of all outcomes = 1
- Impossible = 0
- Certain = 1
- P(A) + P(not A) = 1

## Odds vs Probability

Odds = favorable : unfavorable
Probability = favorable / total

If P = 1/4:
Odds = 1:3
Probability = 25%

## Expected Value

EV = (outcome1 × prob1) + (outcome2 × prob2) + ...

Used to determine if a bet is worth taking.

## Independent Events

Two events don't affect each other:
P(A and B) = P(A) × P(B)

Example: Two dice rolls:
P(both 6) = (1/6) × (1/6) = 1/36`,
    category: 'Math',
    readTime: '6 min read',
    date: '2023-10-10',
    icon: Brain,
    path: 'probability-basics.html'
  },
  {
    id: 18,
    title: 'Position Sizing: The Most Important Trading Rule',
    excerpt: 'Learn how to calculate proper position sizes to protect your trading capital and minimize risk.',
    content: `Position sizing determines how much to risk on each trade. It's the most important factor in long-term trading success.

## The Core Formula

Position Size = Risk Amount / (Entry - Stop Loss)

Example:
- Account: $10,000
- Risk per trade: 2% = $200
- Entry: $100
- Stop Loss: $95
- Risk per share: $5
- Position: 200/5 = 40 shares

## Position Sizing Rules

1. Never risk more than 2% per trade
2. Adjust for volatility
3. Account for slippage
4. Consider correlations

## Why It Matters

Proper sizing:
- Prevents large drawdowns
- Keeps you in the game
- Enables compounding
- Removes emotional stress

## Common Mistakes

- Using fixed share count
- Ignoring account size changes
- Risking too much on "sure" trades
- Not adjusting for volatility

## Kelly Criterion (Advanced)

f* = (bp - q) / b
Where:
- f* = optimal fraction
- b = odds received
- p = probability of win
- q = probability of loss

Use conservatively (fractional Kelly)`,
    category: 'Trading',
    readTime: '6 min read',
    date: '2023-10-05',
    icon: Target,
    path: 'position-sizing-guide.html'
  },
  {
    id: 19,
    title: "Understanding JSON: A Beginner's Guide",
    excerpt: "Learn what JSON is, how it's used in programming, and how to read and write JSON data.",
    content: `JSON (JavaScript Object Notation) is the most common data format for APIs and data storage in modern web development.

## What is JSON?

A lightweight, human-readable format for storing and transporting data.

## JSON Structure

Objects: { "key": "value" }
Arrays: [ "item1", "item2" ]
Nested: { "user": { "name": "John" } }

## Data Types

- String: "hello"
- Number: 42, 3.14
- Boolean: true, false
- Null: null
- Array: [1, 2, 3]
- Object: {"a": 1}

## JSON vs JavaScript

Differences:
- No comments
- No trailing commas
- Keys must be strings
- No undefined

## Common Uses

- API responses
- Configuration files
- Data storage
- Data exchange

## Parsing JSON

JavaScript:
JSON.parse(string) → object
JSON.stringify(object) → string

Python:
json.loads(string) → dict
json.dumps(dict) → string`,
    category: 'Programming',
    readTime: '5 min read',
    date: '2023-09-28',
    icon: Lightbulb,
    path: 'json-beginners-guide.html'
  },
  {
    id: 20,
    title: 'Pregnancy Due Date Calculation: How It Works',
    excerpt: 'Understand how due dates are calculated and what factors can affect your estimated delivery date.',
    content: `Due dates are calculated based on a standardized method, though only about 5% of babies arrive on their actual due date.

## Naegele's Rule

Add 7 days to first day of last period, subtract 3 months, add 1 year.

Example:
LMP: January 1, 2024
+7 days = January 8
-3 months = October 8
+1 year = October 8, 2024

## Key Assumptions

- 28-day menstrual cycle
- Ovulation on day 14
- Conception at ovulation

## Ultrasound Dating

First trimester ultrasound is most accurate:
- Crown-rump length
- Less variation
- Earlier = more accurate

## Factors Affecting Due Date

- Irregular cycles
- Conception timing
- Multiple pregnancies
- Certain health conditions
- Previous pregnancy history

## Important Reminders

- Due date is an estimate
- Full term: 37-42 weeks
- Normal pregnancy: 280 days
- Don't stress about early/late`,
    category: 'Health',
    readTime: '4 min read',
    date: '2023-09-20',
    icon: Calendar,
    path: 'pregnancy-due-date.html'
  }
];

export default function Blog() {
  const params = useParams();
  const slug = params.slug;
  
  const article = slug ? articles.find(a => a.path === slug) : null;
  
  if (article) {
    const Icon = article.icon;
    return (
      <div className="pt-24 pb-12 px-6 md:px-12 max-w-3xl mx-auto">
        <Link to="/blog.html" className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary-fixed transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary-fixed" />
            </div>
            <div>
              <span className="text-primary-fixed text-xs font-bold uppercase tracking-wider">{article.category}</span>
              <div className="flex items-center gap-2 text-neutral-500 text-xs mt-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            {article.title}
          </h1>
          
          <p className="text-neutral-400 text-lg leading-relaxed">
            {article.excerpt}
          </p>
        </div>
        
        <div className="prose prose-invert max-w-none">
          {article.content.split('\n\n').map((para, idx) => {
            if (para.startsWith('## ')) {
              return <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">{para.replace('## ', '')}</h2>;
            }
            if (para.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
                  {para.split('\n').map((item, i) => (
                    <li key={i}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (para.includes(':') && !para.includes('=')) {
              const lines = para.split('\n').filter(l => l.includes(':'));
              if (lines.length > 1) {
                return (
                  <ul key={idx} className="space-y-2 mb-4">
                    {lines.map((line, i) => (
                      <li key={i} className="text-neutral-300"><span className="text-white font-medium">{line.split(':')[0]}:</span> {line.split(':').slice(1).join(':')}</li>
                    ))}
                  </ul>
                );
              }
            }
            return <p key={idx} className="text-neutral-300 leading-relaxed mb-4">{para}</p>;
          })}
        </div>
      </div>
    );
  }

  const categories = ['All', 'Financial', 'Health', 'Math', 'Programming', 'Fitness', 'Trading', 'Construction', 'Date & Time'];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-primary-fixed" />
          <span className="text-primary-fixed font-bold uppercase tracking-wider text-sm">Blog</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Latest Articles
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl">
          Expert insights, tutorials, and guides on calculators, finance, health, and more.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              category === 'All'
                ? 'bg-primary-fixed text-on-primary-fixed'
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
          const Icon = article.icon;
          return (
            <article
              key={article.id}
              className="group bg-surface-container-low border border-white/5 rounded-2xl overflow-hidden hover:border-primary-fixed/30 transition-all hover:shadow-lg hover:shadow-primary-fixed/5"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-fixed" />
                  </div>
                  <div>
                    <span className="text-primary-fixed text-xs font-bold uppercase tracking-wider">{article.category}</span>
                    <div className="flex items-center gap-2 text-neutral-500 text-xs mt-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary-fixed transition-colors">
                  {article.title}
                </h2>

                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>

                <Link
                  to={`/blog/${article.path}`}
                  className="inline-flex items-center gap-2 text-primary-fixed font-medium text-sm group/link"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}