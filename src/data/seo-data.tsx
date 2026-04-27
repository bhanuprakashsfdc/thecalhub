
import { TrendingUp, Terminal, Grid3X3, Activity, Calculator } from 'lucide-react';

export interface FAQ {
  question: string;
  answer: string;
}

export interface CalculatorSEOContent {
  title: string;
  subtitle: string;
  introduction: string;
  mainContent: React.ReactNode;
  faqs: FAQ[];
  relatedCalculators: Array<{ name: string; path: string; icon?: any }>;
}

export const SEO_DATA: Record<string, CalculatorSEOContent> = {
  emi: {
    title: "Master Your Debt with the Most Accurate",
    subtitle: "EMI Calculator Online",
    introduction: "Understanding your monthly financial commitments is the cornerstone of responsible wealth management. An EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How is EMI Calculated? The Math Behind Your Loan</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The mathematical formula used to calculate EMI is: <strong>EMI = [P x R x (1+R)^N] / [(1+R)^N-1]</strong>. Where P is Principal, R is Rate of Interest, and N is Tenure in months.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Strategic Financial Planning</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            By using our EMI calculator, you can experiment with different tenures. While a longer tenure reduces your monthly EMI, it significantly increases the total interest paid. Conversely, a shorter tenure increases your EMI but saves you thousands in interest.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is an EMI?", answer: "EMI stands for Equated Monthly Installment. It is a fixed amount of money that a borrower pays to a lender at a specific date every month until the loan is fully repaid." },
      { question: "How does an EMI calculator help?", answer: "An EMI calculator helps you plan your monthly budget by giving you a clear picture of how much you need to pay towards your loan principal and interest." },
      { question: "Can the EMI amount change during the loan tenure?", answer: "Yes, if you have a floating interest rate loan, the EMI can change when the base lending rate is adjusted by the bank." },
      { question: "What factors affect the EMI amount?", answer: "The three main factors are the loan amount (Principal), the interest rate, and the loan tenure (duration)." },
      { question: "Is it better to have a shorter or longer tenure?", answer: "A shorter tenure means higher monthly EMIs but lower total interest. A longer tenure means lower monthly EMIs but higher total interest paid over time." },
      { question: "What is the reducing balance method?", answer: "It is a method where interest is calculated on the remaining principal amount every month, rather than the original loan amount." },
      { question: "Does the EMI calculator include processing fees?", answer: "Most basic EMI calculators do not include processing fees or insurance costs unless specified." },
      { question: "Can I use this for home and car loans?", answer: "Yes, the standard EMI formula applies to almost all types of amortized loans including home, car, and personal loans." },
      { question: "How is interest calculated in an EMI?", answer: "Interest is usually calculated using the formula: Interest = Principal * Rate / 12." },
      { question: "What happens if I miss an EMI payment?", answer: "Missing an EMI payment can lead to late fees, increased interest burden, and a significant drop in your credit score." }
    ],
    relatedCalculators: [
      { name: 'Home Loan Calc', path: '/home-loan-calculator.html', icon: TrendingUp },
      { name: 'Car Loan Calc', path: '/car-loan-calculator.html', icon: TrendingUp },
      { name: 'Personal Loan', path: '/personal-loan-calculator.html', icon: TrendingUp },
      { name: 'Mortgage Calc', path: '/mortgage-calculator.html', icon: TrendingUp }
    ]
  },
  bmi: {
    title: "The Science of Body Composition: Beyond the",
    subtitle: "BMI Number",
    introduction: "Body Mass Index (BMI) is a simple yet powerful screening tool used to categorize individuals into weight groups that may signal potential health risks.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding BMI Categories</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Our BMI Calculator uses the standard WHO (World Health Organization) classifications to help you identify where you stand in terms of body weight health.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Health Optimization</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            While BMI is an excellent baseline, it's important to remember it doesn't directly measure body fat percentage. Athletes with high muscle mass may have a high BMI but low body fat.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What does BMI stand for?", answer: "BMI stands for Body Mass Index, a value derived from the mass and height of a person." },
      { question: "Is BMI accurate for everyone?", answer: "BMI is a general guide. It may not be accurate for athletes, pregnant women, or the elderly as it doesn't distinguish between muscle and fat." },
      { question: "What is a healthy BMI range?", answer: "For most adults, a healthy BMI is between 18.5 and 24.9." },
      { question: "How is BMI calculated?", answer: "BMI is calculated by dividing your weight in kilograms by the square of your height in meters (kg/m²)." },
      { question: "What are the risks of a high BMI?", answer: "A high BMI is associated with increased risk of heart disease, Type 2 diabetes, and certain cancers." },
      { question: "Can a low BMI be dangerous?", answer: "Yes, a BMI below 18.5 can indicate malnutrition, osteoporosis, or an underlying health condition." },
      { question: "How often should I check my BMI?", answer: "Checking your BMI once every few months is usually sufficient to track long-term trends." },
      { question: "Does age affect BMI interpretation?", answer: "While the formula is the same, healthy BMI ranges for children and teens are interpreted differently using age-specific percentiles." },
      { question: "Is BMI the same as body fat percentage?", answer: "No, BMI is a measure of weight relative to height, while body fat percentage measures the actual proportion of fat in your body." },
      { question: "How can I improve my BMI?", answer: "A combination of a balanced diet and regular physical activity is the most effective way to reach a healthy BMI range." }
    ],
    relatedCalculators: [
      { name: 'BMR Estimator', path: '/bmr-calculator.html', icon: Activity },
      { name: 'Calorie Tracker', path: '/calorie-calculator.html', icon: Activity },
      { name: 'TDEE Calculator', path: '/tdee-calculator.html', icon: Activity },
      { name: 'Pace Calculator', path: '/pace-calculator.html', icon: Activity }
    ]
  },
  compound_interest: {
    title: "Harness the Power of Exponential Growth with our",
    subtitle: "Compound Interest Calculator",
    introduction: "Albert Einstein famously called compound interest the 'eighth wonder of the world.' It is the process where the interest you earn on your savings is reinvested, earning you even more interest over time.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Magic of Compounding</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Unlike simple interest, which is only calculated on the principal amount, compound interest is calculated on the initial principal and also on the accumulated interest of previous periods.
        </p>
      </>
    ),
    faqs: [
      { question: "What is compound interest?", answer: "Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods." },
      { question: "How is it different from simple interest?", answer: "Simple interest is only calculated on the principal, while compound interest adds previous interest to the principal before calculating the next period's interest." },
      { question: "What is the formula for compound interest?", answer: "The standard formula is A = P(1 + r/n)^(nt), where A is the final amount, P is principal, r is annual interest rate, n is compounding frequency, and t is time in years." },
      { question: "What is the 'Rule of 72'?", answer: "It is a quick way to estimate how long it will take to double your money: divide 72 by your annual interest rate." },
      { question: "How does compounding frequency affect growth?", answer: "The more frequently interest is compounded (e.g., daily vs. annually), the faster your wealth will grow." },
      { question: "Can compound interest work against me?", answer: "Yes, in the case of credit card debt, compounding interest can cause your balance to grow rapidly if not paid off." },
      { question: "What is APY?", answer: "APY stands for Annual Percentage Yield, which reflects the real rate of return on an investment by accounting for the effect of compounding." },
      { question: "Does inflation affect compound interest?", answer: "Yes, while your money grows, inflation reduces its purchasing power over time. You should aim for a return higher than the inflation rate." },
      { question: "Is compound interest guaranteed?", answer: "Only if the investment vehicle (like a fixed deposit or bond) guarantees a specific interest rate." },
      { question: "When is the best time to start compounding?", answer: "The best time is as early as possible. Time is the most critical factor in exponential growth." }
    ],
    relatedCalculators: [
      { name: 'SIP Calculator', path: '/sip-calculator.html', icon: TrendingUp },
      { name: 'FD Calculator', path: '/fd-calculator.html', icon: TrendingUp },
      { name: 'Investment Calc', path: '/investment-calculator.html', icon: TrendingUp },
      { name: 'Retirement Calc', path: '/retirement-calculator.html', icon: TrendingUp }
    ]
  },
  scientific: {
    title: "Precision Engineering for Complex Equations:",
    subtitle: "Advanced Scientific Calculator",
    introduction: "Our online scientific calculator is designed for students, engineers, and researchers who require high-precision mathematical functions beyond basic arithmetic.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Advanced Mathematical Functions</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Perform trigonometry, logarithms, exponentials, and complex algebraic calculations with ease. Our tool supports order of operations (PEMDAS) to ensure accuracy in multi-step problems.
        </p>
      </>
    ),
    faqs: [
      { question: "What functions does this calculator support?", answer: "It supports basic arithmetic, trigonometry (sin, cos, tan), logarithms (log, ln), square roots, and power functions." },
      { question: "Does it follow the order of operations?", answer: "Yes, it follows the standard PEMDAS/BODMAS rules for mathematical precedence." },
      { question: "Can I calculate in degrees and radians?", answer: "Yes, you can toggle between degree and radian modes for all trigonometric functions." },
      { question: "What is the maximum precision?", answer: "The calculator provides precision up to 15 decimal places for most standard calculations." },
      { question: "Is there a memory function?", answer: "Yes, you can use the M+, M-, and MR buttons to store and recall values during complex calculations." },
      { question: "Can it handle very large numbers?", answer: "It can handle numbers in scientific notation up to 10^308." },
      { question: "Does it support complex numbers?", answer: "This version is optimized for real number calculations; complex number support is coming in a future update." },
      { question: "Is it mobile-friendly?", answer: "Absolutely, the interface is fully responsive and works perfectly on smartphones and tablets." },
      { question: "Can I see my calculation history?", answer: "Yes, the calculator maintains a local session history of your recent equations." },
      { question: "Is this tool free for academic use?", answer: "Yes, all tools on TheCalHub are 100% free for students and educators." }
    ],
    relatedCalculators: [
      { name: 'Standard Calc', path: '/standard.html', icon: Calculator },
      { name: 'Programming Calc', path: '/programming-calculator.html', icon: Terminal },
      { name: 'Fraction Calc', path: '/fraction-calculator.html', icon: Grid3X3 },
      { name: 'Percent Calc', path: '/percent-calculator.html', icon: Grid3X3 }
    ]
  },
  sip: {
    title: "Plan Your Wealth with the Most Powerful",
    subtitle: "SIP Calculator Online",
    introduction: "Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. Our SIP calculator helps you estimate the future value of your monthly investments over time.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Why SIP is Better Than Lumpsum</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          SIP allows you to benefit from Rupee Cost Averaging. When markets are low, you buy more units, and when markets are high, you buy fewer units, effectively lowering your average cost per unit over time.
        </p>
      </>
    ),
    faqs: [
      { question: "What is a SIP?", answer: "SIP stands for Systematic Investment Plan, which allows you to invest a fixed amount in mutual funds at regular intervals." },
      { question: "How does a SIP calculator work?", answer: "It uses the formula for future value of an annuity to estimate your total wealth based on monthly investment, rate of return, and tenure." },
      { question: "Is SIP return guaranteed?", answer: "No, mutual fund returns are subject to market risks, but SIPs are generally considered safer for long-term wealth creation." },
      { question: "What is Rupee Cost Averaging?", answer: "It's an investment strategy where you invest a fixed amount regularly, buying more units when prices are low and fewer when they're high." },
      { question: "What is the minimum SIP amount?", answer: "Most mutual funds allow you to start a SIP with as little as $10 or $20 per month." },
      { question: "Can I stop my SIP anytime?", answer: "Yes, you can stop, pause, or modify your SIP amount at any time without penalties in most funds." },
      { question: "What is a Top-up SIP?", answer: "A Top-up SIP allows you to increase your monthly investment amount by a fixed percentage or amount every year." },
      { question: "Does SIP help in tax saving?", answer: "Yes, SIPs in ELSS (Equity Linked Savings Scheme) mutual funds can provide tax benefits under specific sections of the tax code." },
      { question: "What is the best tenure for a SIP?", answer: "The longer the tenure, the better the compounding effect. Ideally, a tenure of 5-10 years or more is recommended." },
      { question: "Can I have multiple SIPs?", answer: "Yes, you can have as many SIPs as you want in different mutual fund schemes." }
    ],
    relatedCalculators: [
      { name: 'Compound Interest', path: '/compound-interest-calculator.html', icon: TrendingUp },
      { name: 'Mutual Fund Calc', path: '/mutual-fund-calculator.html', icon: TrendingUp },
      { name: 'Lumpsum Calc', path: '/lumpsum-calculator.html', icon: TrendingUp },
      { name: 'Retirement Calc', path: '/retirement-calculator.html', icon: TrendingUp }
    ]
  },
  mortgage: {
    title: "Plan Your Dream Home with our Precise",
    subtitle: "Mortgage Calculator",
    introduction: "Buying a home is the biggest financial decision for most people. Our mortgage calculator helps you understand your monthly payments, including principal, interest, taxes, and insurance.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Your Mortgage Components</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A standard mortgage payment consists of PITI: Principal, Interest, Taxes, and Insurance. Our calculator breaks these down so you know exactly where your money is going.
        </p>
      </>
    ),
    faqs: [
      { question: "What is a mortgage?", answer: "A mortgage is a loan specifically used to purchase a property, where the property itself serves as collateral." },
      { question: "How is mortgage interest calculated?", answer: "Mortgage interest is usually calculated monthly based on the remaining principal balance." },
      { question: "What is PMI?", answer: "Private Mortgage Insurance (PMI) is usually required if your down payment is less than 20% of the home's value." },
      { question: "Should I choose a 15-year or 30-year mortgage?", answer: "A 15-year mortgage has higher monthly payments but lower interest rates and total interest paid. A 30-year mortgage is more affordable monthly but more expensive overall." },
      { question: "What are closing costs?", answer: "Closing costs are fees paid at the end of a real estate transaction, typically ranging from 2% to 5% of the purchase price." },
      { question: "Can I pay off my mortgage early?", answer: "Most modern mortgages allow for extra payments or full early repayment, but check for prepayment penalties in your contract." },
      { question: "What is an escrow account?", answer: "An escrow account is used by your lender to hold funds for property taxes and homeowners insurance premiums." },
      { question: "How do interest rates affect my mortgage?", answer: "Even a 1% difference in interest rates can cost or save you tens of thousands of dollars over the life of the loan." },
      { question: "What is a fixed-rate mortgage?", answer: "A fixed-rate mortgage maintains the same interest rate for the entire life of the loan." },
      { question: "What is an ARM?", answer: "An Adjustable-Rate Mortgage (ARM) has an interest rate that can change periodically after an initial fixed period." }
    ],
    relatedCalculators: [
      { name: 'EMI Calculator', path: '/emi-calculator.html', icon: TrendingUp },
      { name: 'Home Loan Calc', path: '/home-loan-calculator.html', icon: TrendingUp },
      { name: 'Rent vs Buy', path: '/rent-vs-buy-calculator.html', icon: TrendingUp },
      { name: 'Affordability Calc', path: '/affordability-calculator.html', icon: TrendingUp }
    ]
  }
};

const CATEGORY_FAQS: Record<string, FAQ[]> = {
  finance: [
    { question: "Is this calculator free to use?", answer: "Yes, all calculators on TheCalHub are 100% free for everyone." },
    { question: "Do you store my financial data?", answer: "No, we value your privacy. All calculations are performed locally in your browser and no data is sent to our servers." },
    { question: "How accurate are the results?", answer: "Our calculators use industry-standard formulas and are tested for high precision. However, results should be used for estimation purposes only." },
    { question: "Can I use this on my mobile phone?", answer: "Yes, TheCalHub is fully responsive and optimized for all devices, including smartphones and tablets." },
    { question: "Do I need to sign up to use these tools?", answer: "No registration is required. You can use all our tools instantly without creating an account." },
    { question: "Can I save my results?", answer: "You can use your browser's print or save-as-PDF feature to keep a record of your calculations." },
    { question: "How is interest calculated?", answer: "Depending on the tool, we use either simple interest or compound interest formulas as per standard financial practices." },
    { question: "What is the compounding frequency?", answer: "Most of our investment tools allow you to choose between monthly, quarterly, or annual compounding." },
    { question: "Can I use these results for official bank applications?", answer: "While our results are highly accurate, we recommend consulting with a financial advisor or your bank for official loan applications." },
    { question: "How often do you update these tools?", answer: "We regularly update our tools to ensure they comply with current financial standards and provide the best user experience." }
  ],
  health: [
    { question: "Is this a medical diagnostic tool?", answer: "No, our health calculators are for informational purposes only and should not be used as a substitute for professional medical advice." },
    { question: "Are these formulas scientifically backed?", answer: "Yes, we use globally recognized formulas from organizations like the WHO and CDC." },
    { question: "Does age affect the results?", answer: "Most health tools like BMI and BMR factor in age to provide more accurate assessments." },
    { question: "Is my personal health data private?", answer: "Absolutely. We do not collect or store any personal metrics you enter into our calculators." },
    { question: "Can athletes use these tools?", answer: "Yes, though some tools like BMI may be less accurate for individuals with high muscle mass." },
    { question: "What is BMR vs TDEE?", answer: "BMR is the energy your body needs at rest, while TDEE includes the calories you burn through daily activity." },
    { question: "How can I improve my health metrics?", answer: "A balanced diet and regular exercise are key. Consult with a healthcare provider before starting any new fitness regime." },
    { question: "Are these tools suitable for children?", answer: "Our standard adult calculators may not be accurate for children. We recommend using age-specific growth charts for pediatric assessments." },
    { question: "How accurate is the calorie estimation?", answer: "It provides a very close estimate based on your height, weight, age, and activity level." },
    { question: "Can I use these tools offline?", answer: "Yes, if you have previously loaded the page, our PWA support allows many features to work offline." }
  ],
  math: [
    { question: "Does this calculator support scientific notation?", answer: "Yes, our advanced tools can handle very large and very small numbers using scientific notation." },
    { question: "What is PEMDAS?", answer: "It is the order of operations: Parentheses, Exponents, Multiplication and Division, and Addition and Subtraction." },
    { question: "Can I use this for my homework?", answer: "Yes, our tools are excellent for verifying your manual calculations and learning mathematical concepts." },
    { question: "Is there a limit to the number of calculations?", answer: "No, you can perform unlimited calculations for free." },
    { question: "Do you support trigonometry?", answer: "Yes, our scientific calculator includes sin, cos, tan, and their inverse functions." },
    { question: "Can I calculate fractions?", answer: "Yes, we have a dedicated fraction calculator for adding, subtracting, and simplifying fractions." },
    { question: "How precise are the decimal results?", answer: "We provide precision up to 15 decimal places for most mathematical operations." },
    { question: "Can I see my history?", answer: "We maintain a session history so you can refer back to your recent results." },
    { question: "Is there an API for developers?", answer: "We are currently working on a public API. Stay tuned for updates!" },
    { question: "How do I report a bug?", answer: "You can contact us via our support page if you find any inconsistencies in the results." }
  ]
};

export const getSEOContent = (id: string, category: string = 'finance'): CalculatorSEOContent => {
  const content = SEO_DATA[id];
  if (content) return content;

  // Fallback with category-specific FAQs
  return {
    title: "Free Online",
    subtitle: `${id.replace(/-/g, ' ').toUpperCase()} Tool`,
    introduction: "A powerful and accurate online tool designed to simplify your daily calculations. Built for speed, precision, and privacy.",
    mainContent: (
      <p className="text-neutral-400 leading-relaxed">
        Our professional {id.replace(/-/g, ' ')} helps you get instant results. 
        Designed with a focus on user experience and technical accuracy.
      </p>
    ),
    faqs: CATEGORY_FAQS[category] || CATEGORY_FAQS.finance,
    relatedCalculators: [
      { name: 'Dashboard', path: '/', icon: Calculator },
      { name: 'All Tools', path: '/all.html', icon: Calculator }
    ]
  };
};

