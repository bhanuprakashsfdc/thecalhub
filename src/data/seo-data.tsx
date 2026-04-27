
import { TrendingUp, Activity, Calculator, Heart, Clock, Hammer, FlaskConical } from 'lucide-react';

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
  // STANDARD CALCULATORS
  addition_calculator: {
    title: "Master Basic Arithmetic with Our Instant",
    subtitle: "Addition Calculator",
    introduction: "Addition is the foundation of all mathematical operations. Our free online addition calculator helps you quickly add two or more numbers with precision and accuracy.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Addition</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Addition is one of the four fundamental arithmetic operations. When you add numbers, you combine their values to get a sum. Our calculator supports whole numbers, decimals, and negative numbers.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Use the commutative property: a + b = b + a. This means the order of numbers doesn't change the sum. Great for mental math and verification.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I add multiple numbers?", answer: "Simply enter each number separated by plus signs, or use our multi-number addition feature to add several values at once." },
      { question: "Can I add decimal numbers?", answer: "Yes, our calculator handles decimal numbers with precision up to 15 decimal places." },
      { question: "What is the largest number I can add?", answer: "Our calculator can handle numbers up to 10^308, covering virtually all practical use cases." },
      { question: "How do I add negative numbers?", answer: "Enter the negative number with a minus sign. The calculator will correctly handle the sign." },
      { question: "Can I add fractions?", answer: "For fractions, use our dedicated fraction calculator for accurate results." },
      { question: "Is this calculator free?", answer: "Yes, all calculators on TheCalHub are completely free to use." },
      { question: "Does it work on mobile?", answer: "Yes, our addition calculator is fully responsive and works on all devices." },
      { question: "Can I copy the result?", answer: "Yes, click on the result to copy it to your clipboard." },
      { question: "Does it show calculation steps?", answer: "Yes, for complex additions, we display the step-by-step process." },
      { question: "Can I use keyboard shortcuts?", answer: "Yes, press Enter to calculate and use Tab to navigate between input fields." }
    ],
    relatedCalculators: [
      { name: 'Subtraction', path: '/subtraction-calculator.html', icon: Calculator },
      { name: 'Multiplication', path: '/multiplication-calculator.html', icon: Calculator },
      { name: 'Average', path: '/average-calculator.html', icon: Calculator }
    ]
  },
  subtraction_calculator: {
    title: "Calculate Differences Instantly with Our",
    subtitle: "Subtraction Calculator",
    introduction: "Subtraction is the inverse of addition and essential for calculating differences, remainders, and changes. Our online tool makes quick and accurate calculations.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How Subtraction Works</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Subtraction finds the difference between two numbers. The order matters: a - b is not the same as b - a. Use our calculator to find exact differences.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Pro Tip</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            When subtracting from a larger number, you can think of it as finding how much larger the first number is. This is useful for quick mental calculations.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is subtraction?", answer: "Subtraction is finding the difference between two numbers by removing one number from another." },
      { question: "Can I subtract multiple numbers?", answer: "Yes, you can chain multiple subtractions in one calculation." },
      { question: "How do negative results work?", answer: "A negative result indicates the second number is larger than the first." },
      { question: "Can I use decimals?", answer: "Yes, our calculator handles decimal values with high precision." },
      { question: "What if I subtract zero?", answer: "Any number minus zero equals the original number." },
      { question: "Does order matter in subtraction?", answer: "Yes, a - b is different from b - a in most cases." },
      { question: "Is this calculator accurate?", answer: "Yes, calculations are precise up to 15 decimal places." },
      { question: "Can I copy results?", answer: "Click on any result to copy it to your clipboard." },
      { question: "Does it work offline?", answer: "Once loaded, it works without internet connection." },
      { question: "Are there keyboard shortcuts?", answer: "Use Enter to calculate and Tab to move between fields." }
    ],
    relatedCalculators: [
      { name: 'Addition', path: '/addition-calculator.html', icon: Calculator },
      { name: 'Multiplication', path: '/multiplication-calculator.html', icon: Calculator },
      { name: 'Division', path: '/division-calculator.html', icon: Calculator }
    ]
  },
  multiplication_calculator: {
    title: "Multiply Numbers Instantly with Our Free",
    subtitle: "Multiplication Calculator",
    introduction: "Multiplication is one of the four basic arithmetic operations. Our online multiplication calculator helps you multiply two or more numbers quickly and accurately.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Multiplication</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Multiplication is repeated addition. When you multiply 3 × 4, you're adding 3 four times (3+3+3+3=12). This operation is essential for scaling, counting, and many real-world applications.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Multiplication Properties</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Multiplication is commutative (a×b = b×a) and associative ((a×b)×c = a×(b×c)). These properties make mental math easier.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I multiply two numbers?", answer: "Enter both numbers and click calculate. The result appears instantly." },
      { question: "Can I multiply more than two numbers?", answer: "Yes, our calculator supports multiplying multiple numbers in one go." },
      { question: "What about decimal multiplication?", answer: "The calculator handles decimals accurately up to 15 decimal places." },
      { question: "What's the largest number I can multiply?", answer: "Numbers up to 10^308 can be handled by our calculator." },
      { question: "Does multiplication always give a larger number?", answer: "Not always. Multiplying by a fraction or decimal less than 1 gives a smaller result." },
      { question: "What is 0 multiplied by anything?", answer: "Any number multiplied by 0 equals 0." },
      { question: "What is 1 multiplied by anything?", answer: "Any number multiplied by 1 equals itself." },
      { question: "Can I copy the result?", answer: "Yes, click on the result to copy it." },
      { question: "Is this tool free?", answer: "Yes, completely free to use." },
      { question: "Does it work on mobile?", answer: "Yes, fully responsive on all devices." }
    ],
    relatedCalculators: [
      { name: 'Division', path: '/division-calculator.html', icon: Calculator },
      { name: 'Power', path: '/power-calculator.html', icon: Calculator },
      { name: 'Addition', path: '/addition-calculator.html', icon: Calculator }
    ]
  },
  division_calculator: {
    title: "Divide Numbers Accurately with Our",
    subtitle: "Division Calculator",
    introduction: "Division is the inverse of multiplication and essential for sharing, grouping, and calculating rates. Our free online division calculator provides instant, accurate results.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How Division Works</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Division splits a number into equal parts. For example, 12 ÷ 3 means splitting 12 into 3 equal groups of 4. The number being divided is the dividend, the number dividing by is the divisor, and the result is the quotient.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Special Cases</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Dividing by 0 is undefined. Any number divided by 1 is itself. And any number divided by itself (except 0) equals 1.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I divide two numbers?", answer: "Enter the dividend and divisor, then click calculate to see the quotient." },
      { question: "What if the division isn't even?", answer: "The calculator shows both the quotient and remainder." },
      { question: "Can I divide decimals?", answer: "Yes, decimal division is fully supported." },
      { question: "What happens if I divide by zero?", answer: "Division by zero is mathematically undefined and will show an error." },
      { question: "Can I get a fraction result?", answer: "Yes, the calculator can show results as fractions for exact values." },
      { question: "What about negative numbers?", answer: "The calculator handles negative division correctly following standard rules." },
      { question: "Does it show remainders?", answer: "Yes, for whole number division, the remainder is displayed." },
      { question: "Is this free to use?", answer: "Yes, 100% free." },
      { question: "Can I copy results?", answer: "Click any result to copy it." },
      { question: "Works on mobile?", answer: "Yes, responsive on all devices." }
    ],
    relatedCalculators: [
      { name: 'Multiplication', path: '/multiplication-calculator.html', icon: Calculator },
      { name: 'Fraction', path: '/fraction-calculator.html', icon: Calculator },
      { name: 'Percentage', path: '/percentage-calculator.html', icon: Calculator }
    ]
  },
  percentage_calculator: {
    title: "Calculate Percentages Instantly with Our",
    subtitle: "Percentage Calculator",
    introduction: "Percentages are used everywhere—from discounts to interest rates to statistical data. Our online percentage calculator makes quick work of any percentage calculation.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Percentages</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A percentage is a fraction of 100. The word 'percent' means 'per hundred.' So 25% means 25 out of 100, or 0.25 as a decimal. This universal format makes comparing ratios easy.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Common Percentage Formulas</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Find percentage: (value/total)×100. Find value: (percentage/100)×total. Calculate change: ((new-old)/old)×100.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate percentage of a number?", answer: "Enter the percentage and the total value. For example, 20% of 150 = (20/100)×150 = 30." },
      { question: "How do I find what percentage one number is of another?", answer: "Divide the first number by the second and multiply by 100." },
      { question: "How do I calculate percentage increase?", answer: "Subtract the original from the new value, divide by original, multiply by 100." },
      { question: "How do I calculate percentage decrease?", answer: "Subtract new from original, divide by original, multiply by 100, then make negative." },
      { question: "What is 10% of 100?", answer: "10. Simply multiply 100 by 0.10." },
      { question: "How do I convert fraction to percentage?", answer: "Divide numerator by denominator, then multiply by 100." },
      { question: "Can I calculate reverse percentage?", answer: "Yes, to find original value after a percentage increase, divide by (1 + percentage/100)." },
      { question: "Does this work with decimals?", answer: "Yes, all percentage calculations handle decimals." },
      { question: "Is it free?", answer: "Yes, completely free." },
      { question: "Mobile friendly?", answer: "Yes, works on all devices." }
    ],
    relatedCalculators: [
      { name: 'Ratio', path: '/ratio-calculator.html', icon: Calculator },
      { name: 'Fraction', path: '/fraction-calculator.html', icon: Calculator },
      { name: 'Average', path: '/average-calculator.html', icon: Calculator }
    ]
  },
  square_root_calculator: {
    title: "Find Square Roots Instantly with Our",
    subtitle: "Square Root Calculator",
    introduction: "Square roots are essential in geometry, physics, finance, and many other fields. Our free online calculator instantly computes square roots with high precision.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">What is a Square Root?</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The square root of a number is a value that, when multiplied by itself, gives the original number. For example, the square root of 25 is 5 because 5×5=25.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Perfect Squares</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Numbers like 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 are perfect squares—their square roots are whole numbers.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate square root?", answer: "Enter any number and click calculate. The square root appears instantly." },
      { question: "What's the square root of 0?", answer: "The square root of 0 is 0." },
      { question: "What's the square root of negative numbers?", answer: "Negative square roots are imaginary numbers. Use our complex number calculator for those." },
      { question: "Can I calculate cube roots?", answer: "For cube roots, use our power calculator with exponent 1/3." },
      { question: "What's the largest number supported?", answer: "The calculator handles numbers up to 10^308." },
      { question: "Does it show exact vs decimal?", answer: "For perfect squares, it shows exact integers. For others, it shows decimal approximations." },
      { question: "Is it free?", answer: "Yes, 100% free." },
      { question: "Works offline?", answer: "Works without internet after loading." },
      { question: "Mobile support?", answer: "Yes, responsive on all devices." },
      { question: "Can I copy result?", answer: "Click result to copy." }
    ],
    relatedCalculators: [
      { name: 'Power Calculator', path: '/power-calculator.html', icon: Calculator },
      { name: 'Exponential', path: '/exponential-calculator.html', icon: Calculator },
      { name: 'Geometry', path: '/geometry-calculator.html', icon: Calculator }
    ]
  },
  power_calculator: {
    title: "Calculate Powers and Exponents with Our",
    subtitle: "Power Calculator",
    introduction: "Powers and exponents are fundamental in mathematics, science, and engineering. Our online power calculator handles any base raised to any exponent with precision.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Exponents</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          An exponent (or power) tells you how many times to multiply a number by itself. For example, 2^3 means 2×2×2=8. The number being raised is the base, and the exponent tells you the power.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Exponent Rules</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            a^m × a^n = a^(m+n). (a^m)^n = a^(m×n). a^m / a^n = a^(m-n). a^0 = 1 (for any non-zero a).
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate powers?", answer: "Enter the base number and the exponent, then click calculate." },
      { question: "What is 2 to the power of 10?", answer: "2^10 = 1024." },
      { question: "What does 0 to the power of 0 equal?", answer: "This is mathematically undefined." },
      { question: "What is any number to the power of 0?", answer: "Any non-zero number raised to power 0 equals 1." },
      { question: "Can I calculate negative exponents?", answer: "Yes, negative exponents represent reciprocals: a^-n = 1/a^n." },
      { question: "What about fractional exponents?", answer: "Fractional exponents represent roots: a^(1/n) is the nth root of a." },
      { question: "What's the largest exponent supported?", answer: "The calculator handles very large exponents within computational limits." },
      { question: "Is it free?", answer: "Yes, completely free." },
      { question: "Mobile friendly?", answer: "Yes, works on all devices." },
      { question: "Can I copy result?", answer: "Click result to copy." }
    ],
    relatedCalculators: [
      { name: 'Square Root', path: '/square-root-calculator.html', icon: Calculator },
      { name: 'Scientific Notation', path: '/scientific-notation-calculator.html', icon: Calculator },
      { name: 'Logarithm', path: '/logarithm-calculator.html', icon: Calculator }
    ]
  },
  fraction_calculator: {
    title: "Perform Fraction Calculations with Our",
    subtitle: "Fraction Calculator",
    introduction: "Fractions represent parts of a whole and are essential in cooking, measurements, and mathematics. Our free fraction calculator handles all fraction operations accurately.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Fractions</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A fraction has a numerator (top number) and denominator (bottom number). The numerator tells how many parts you have, and the denominator tells the total number of equal parts.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Common Denominators</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            To add or subtract fractions, find a common denominator. The smallest common denominator is the LCM of the denominators.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I add fractions?", answer: "Enter both fractions and select add. For different denominators, the calculator finds a common denominator first." },
      { question: "How do I multiply fractions?", answer: "Multiply numerators together and denominators together: a/b × c/d = (a×c)/(b×d)." },
      { question: "How do I divide fractions?", answer: "Multiply by the reciprocal: a/b ÷ c/d = a/b × d/c." },
      { question: "How do I simplify fractions?", answer: "Divide numerator and denominator by their greatest common divisor (GCD)." },
      { question: "Can I convert to mixed number?", answer: "Yes, improper fractions can be shown as mixed numbers." },
      { question: "What about decimal conversion?", answer: "The calculator shows decimal equivalents as well." },
      { question: "Is it free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Can I copy results?", answer: "Click result to copy." },
      { question: "Does it show steps?", answer: "Yes, calculation steps are displayed." }
    ],
    relatedCalculators: [
      { name: 'Percentage', path: '/percentage-calculator.html', icon: Calculator },
      { name: 'Ratio', path: '/ratio-calculator.html', icon: Calculator },
      { name: 'Decimal', path: '/decimal-calculator.html', icon: Calculator }
    ]
  },
  ratio_calculator: {
    title: "Compare Proportions with Our",
    subtitle: "Ratio Calculator",
    introduction: "Ratios express the relationship between two or more quantities. Our free online ratio calculator helps you simplify, compare, and work with ratios easily.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Ratios</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A ratio shows the relative size of two or more values. Written as a:b, it means 'a to b'. For example, a 3:1 ratio means three of one thing for every one of another.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Simplifying Ratios</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Divide all parts of the ratio by their greatest common divisor to simplify. For example, 6:8 simplifies to 3:4.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I simplify a ratio?", answer: "Divide both terms by their greatest common divisor to get the simplest form." },
      { question: "How do I find missing value in a ratio?", answer: "Use cross multiplication: if a:b = c:d, then a×d = b×c." },
      { question: "Can I compare two ratios?", answer: "Convert both to equivalent fractions or decimals to compare." },
      { question: "What is a ratio in simplest form?", answer: "When the terms have no common divisor other than 1." },
      { question: "How do I scale a ratio?", answer: "Multiply or divide all terms by the same number." },
      { question: "Can ratios be decimals?", answer: "Yes, ratios can include decimal values." },
      { question: "What's the difference between ratio and fraction?", answer: "A ratio compares two quantities; a fraction represents part of a whole." },
      { question: "Is it free?", answer: "Yes, completely free." },
      { question: "Mobile friendly?", answer: "Yes, works on all devices." },
      { question: "Can I copy result?", answer: "Click to copy." }
    ],
    relatedCalculators: [
      { name: 'Fraction', path: '/fraction-calculator.html', icon: Calculator },
      { name: 'Percentage', path: '/percentage-calculator.html', icon: Calculator },
      { name: 'Proportion', path: '/proportion-calculator.html', icon: Calculator }
    ]
  },
  average_calculator: {
    title: "Calculate Averages Instantly with Our",
    subtitle: "Average Calculator",
    introduction: "The average (mean) is one of the most commonly used statistical measures. Our free average calculator quickly computes the arithmetic mean of any set of numbers.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Average (Mean)</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The arithmetic mean is calculated by adding all values together and dividing by the count of values. It's useful for understanding typical values in a dataset.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">When to Use Average</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Use average for symmetrical distributions without outliers. For skewed data, consider median as an alternative.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate average?", answer: "Enter all values separated by commas, spaces, or new lines, then click calculate." },
      { question: "What's the difference between mean and median?", answer: "Mean is the arithmetic average; median is the middle value when data is sorted." },
      { question: "Can I calculate weighted average?", answer: "Use our weighted average calculator for that." },
      { question: "What if I have negative numbers?", answer: "The calculator handles negative values correctly." },
      { question: "Does it work for large datasets?", answer: "Yes, can handle hundreds of values." },
      { question: "What about decimal values?", answer: "Decimal numbers are fully supported." },
      { question: "Can I exclude outliers?", answer: "Enter only the values you want to include in the calculation." },
      { question: "Is it free?", answer: "Yes, 100% free." },
      { question: "Mobile friendly?", answer: "Yes, works on all devices." },
      { question: "Can I copy result?", answer: "Click to copy." }
    ],
    relatedCalculators: [
      { name: 'Median', path: '/median-calculator.html', icon: Calculator },
      { name: 'Standard Deviation', path: '/standard-deviation-calculator.html', icon: Calculator },
      { name: 'Percentage', path: '/percentage-calculator.html', icon: Calculator }
    ]
  },
  // FINANCIAL CALCULATORS
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
  loan_calculator: {
    title: "Plan Your Borrowing with Our Comprehensive",
    subtitle: "Loan Calculator",
    introduction: "Understanding your loan payments is crucial for financial planning. Our online loan calculator helps you calculate monthly payments, total interest, and total cost of any loan.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How Loan Calculations Work</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Loan EMI is calculated using the same formula as EMI calculator: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1], where P is principal, r is monthly interest rate, and n is number of months.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Total Cost of Loan</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Remember that the total cost of a loan includes both principal and interest. A longer tenure means lower EMIs but higher total interest paid.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is a loan calculator?", answer: "A loan calculator computes your monthly payment, total interest, and total payment for any loan amount, interest rate, and tenure." },
      { question: "How is loan interest calculated?", answer: "Most loans use reducing balance method where interest is calculated on the outstanding principal each month." },
      { question: "What is the difference between fixed and floating rates?", answer: "Fixed rates remain constant throughout the loan tenure, while floating rates change based on market conditions." },
      { question: "Can I prepay my loan?", answer: "Most loans allow prepayment, which can save interest. Check with your lender for prepayment terms." },
      { question: "How does tenure affect my loan?", answer: "Longer tenure = lower EMI but higher total interest. Shorter tenure = higher EMI but lower total interest." },
      { question: "What is processing fee?", answer: "A one-time fee charged by lenders, usually 0.5-2% of loan amount." },
      { question: "Can I calculate for different loan types?", answer: "Yes, the same formula applies to home, car, personal, and education loans." },
      { question: "Is this free to use?", answer: "Yes, completely free." },
      { question: "Does it show amortization?", answer: "Yes, you can see the complete payment schedule." },
      { question: "Is my data secure?", answer: "All calculations happen in your browser; no data is stored or sent." }
    ],
    relatedCalculators: [
      { name: 'EMI Calculator', path: '/emi-calculator.html', icon: TrendingUp },
      { name: 'Home Loan', path: '/home-loan-calculator.html', icon: TrendingUp },
      { name: 'Car Loan', path: '/car-loan-calculator.html', icon: TrendingUp }
    ]
  },
  sip_calculator: {
    title: "Plan Your Wealth with Our Powerful",
    subtitle: "SIP Calculator",
    introduction: "Systematic Investment Plan (SIP) allows you to invest fixed amounts regularly in mutual funds. Our SIP calculator helps estimate future value of your monthly investments.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How SIP Calculations Work</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          SIP uses the future value of annuity formula: FV = P × [((1+r)^n - 1)/r] × (1+r), where P is monthly investment, r is monthly return rate, and n is number of months.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Power of Compounding</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Starting early gives your investments more time to compound. A small monthly SIP started early can grow larger than a larger SIP started later.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is SIP?", answer: "SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in mutual funds at predetermined intervals." },
      { question: "How is SIP return calculated?", answer: "SIP returns use the future value of annuity formula accounting for compounding over time." },
      { question: "What is a good SIP return rate?", answer: "Historical equity mutual fund returns have been 12-15% annually, though returns are not guaranteed." },
      { question: "Can I increase my SIP amount?", answer: "Yes, most funds allow SIP top-up to increase investment amounts periodically." },
      { question: "What happens if I miss a SIP payment?", answer: "Most funds allow a grace period; otherwise, SIP may lapse but can be restarted." },
      { question: "Is SIP better than lump sum?", answer: "SIP provides Rupee Cost Averaging, reducing impact of market volatility compared to lump sum." },
      { question: "Can I withdraw my SIP anytime?", answer: "Yes, but some funds have exit loads if withdrawn within one year." },
      { question: "What's the minimum SIP amount?", answer: "Most funds allow starting SIP with as little as ₹500 or $25 monthly." },
      { question: "Is this calculator accurate?", answer: "Results are estimates based on assumed returns; actual returns vary with market performance." },
      { question: "Is it free?", answer: "Yes, 100% free to use." }
    ],
    relatedCalculators: [
      { name: 'EMI Calculator', path: '/emi-calculator.html', icon: TrendingUp },
      { name: 'Compound Interest', path: '/compound-interest-calculator.html', icon: TrendingUp },
      { name: 'Investment', path: '/investment-calculator.html', icon: TrendingUp }
    ]
  },
  cagr_calculator: {
    title: "Measure Growth Rate with Our",
    subtitle: "CAGR Calculator",
    introduction: "Compound Annual Growth Rate (CAGR) smooths out volatile returns to show the constant rate that would result in the same final value. It's the standard way to measure investment performance.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding CAGR</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          CAGR = (Ending Value / Beginning Value)^(1/years) - 1. It represents what the annual return would be if growth was compounded steadily each year.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">CAGR vs Simple Average</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            CAGR is more accurate than simple average because it accounts for compounding. A 10% average return doesn't mean you earned 10% every year.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What does CAGR mean?", answer: "CAGR stands for Compound Annual Growth Rate, the年均复合增长率 that would produce the same final value." },
      { question: "How is CAGR calculated?", answer: "CAGR = (Ending Value / Beginning Value)^(1/n) - 1, where n is the number of years." },
      { question: "What's a good CAGR?", answer: "Good CAGR varies by asset class; equities historically have 8-12%, but past performance doesn't guarantee future results." },
      { question: "Can CAGR be negative?", answer: "Yes, if the ending value is less than the beginning value, CAGR will be negative." },
      { question: "What's the difference between CAGR and IRR?", answer: "CAGR assumes steady growth; IRR accounts for irregular cash flows and timing." },
      { question: "Is CAGR the same as annual return?", answer: "Not exactly; CAGR smooths out volatility while annual return shows actual yearly performance." },
      { question: "How do I use CAGR for comparison?", answer: "Use CAGR to compare investments over the same time period with different return patterns." },
      { question: "Can I calculate CAGR for months?", answer: "Yes, convert months to years by dividing by 12 in the formula." },
      { question: "Does CAGR show risk?", answer: "No, CAGR doesn't account for volatility or downside risk." },
      { question: "Is it free?", answer: "Yes, completely free." }
    ],
    relatedCalculators: [
      { name: 'Compound Interest', path: '/compound-interest-calculator.html', icon: TrendingUp },
      { name: 'Investment', path: '/investment-calculator.html', icon: TrendingUp },
      { name: 'ROI Calculator', path: '/roi-calculator.html', icon: TrendingUp }
    ]
  },
  simple_interest_calculator: {
    title: "Calculate Simple Interest with Our Free",
    subtitle: "Simple Interest Calculator",
    introduction: "Simple interest is calculated only on the principal amount. It's commonly used for short-term loans, bonds, and fixed deposits. Our calculator provides instant, accurate results.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Simple Interest Formula</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Simple Interest = (P × R × T) / 100, where P is principal, R is annual interest rate (as percentage), and T is time in years.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Simple vs Compound Interest</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            With simple interest, interest is always calculated on the original principal. With compound interest, interest is calculated on accumulated interest as well.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is simple interest?", answer: "Simple interest is interest calculated only on the original principal amount, not on accumulated interest." },
      { question: "How is simple interest calculated?", answer: "SI = (Principal × Rate × Time) / 100." },
      { question: "Where is simple interest used?", answer: "Short-term loans, certain bonds, some fixed deposits, and educational loans often use simple interest." },
      { question: "What is the difference from compound interest?", answer: "Simple interest doesn't add interest to principal; compound interest does, leading to faster growth." },
      { question: "Can I calculate for months?", answer: "Yes, convert months to years (e.g., 6 months = 0.5 years) or use (P × R × M) / 1200." },
      { question: "Is simple interest better?", answer: "For short-term, simple interest is often better. For long-term, compound interest grows wealth faster." },
      { question: "Does it work for daily rates?", answer: "Yes, convert the rate and time to matching periods." },
      { question: "Is this calculator free?", answer: "Yes, 100% free." },
      { question: "Can I see total amount?", answer: "Yes, total amount = Principal + Simple Interest." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." }
    ],
    relatedCalculators: [
      { name: 'Compound Interest', path: '/compound-interest-calculator.html', icon: TrendingUp },
      { name: 'FD Calculator', path: '/fd-calculator.html', icon: TrendingUp },
      { name: 'Interest Difference', path: '/interest-calculator.html', icon: TrendingUp }
    ]
  },
  inflation_calculator: {
    title: "Understand Purchasing Power with Our",
    subtitle: "Inflation Calculator",
    introduction: "Inflation erodes purchasing power over time. Our inflation calculator shows how much your money will be worth in the future given the inflation rate.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How Inflation Affects Money</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          With 3% annual inflation, something costing ₹100 today will cost ₹134 in 10 years. The calculator uses the formula: Future Value = Present Value × (1 + r)^n.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Planning for Inflation</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            To maintain purchasing power, your investments should earn returns higher than inflation. This is why equity investments are often recommended for long-term goals.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is inflation?", answer: "Inflation is the rate at which prices for goods and services increase over time, reducing purchasing power of money." },
      { question: "How is inflation calculated?", answer: "Using the formula: Future Value = Present Value × (1 + inflation rate)^years." },
      { question: "What is a typical inflation rate?", answer: "Historical inflation varies; developed countries target 2%, while developing economies often have 4-7%." },
      { question: "How does inflation affect savings?", answer: "Savings lose value over time if the interest rate is lower than inflation rate." },
      { question: "What is real return?", answer: "Real return = Nominal return - inflation rate. It shows actual purchasing power gain." },
      { question: "Can I calculate past inflation effect?", answer: "Yes, enter current amount and historical inflation rate and years." },
      { question: "What's the rule of 72 for inflation?", answer: "Divide 72 by inflation rate to find years for prices to double." },
      { question: "Is this calculator free?", answer: "Yes." },
      { question: "Does it work for different countries?", answer: "Yes, enter any currency amount and relevant inflation rate." },
      { question: "Mobile friendly?", answer: "Yes, fully responsive." }
    ],
    relatedCalculators: [
      { name: 'Compound Interest', path: '/compound-interest-calculator.html', icon: TrendingUp },
      { name: 'Retirement', path: '/retirement-calculator.html', icon: TrendingUp },
      { name: 'Investment', path: '/investment-calculator.html', icon: TrendingUp }
    ]
  },
  retirement_calculator: {
    title: "Plan Your Retirement with Our Comprehensive",
    subtitle: "Retirement Calculator",
    introduction: "Planning for retirement is crucial to maintain your lifestyle after you stop working. Our retirement calculator helps you estimate how much you need to save to retire comfortably.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Retirement Planning Basics</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The retirement corpus needed depends on your current age, retirement age, current savings, expected expenses, and inflation. Use our calculator to find your target.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">The 4% Rule</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            The 4% rule suggests you can withdraw 4% of your retirement corpus annually without running out of money for 30 years.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate retirement corpus?", answer: "Estimate annual expenses in retirement, multiply by years in retirement, adjust for inflation, then divide by 0.04 for the 4% rule." },
      { question: "What age should I retire?", answer: "Most people retire between 60-65, but it depends on savings, health, and lifestyle preferences." },
      { question: "How much should I save for retirement?", answer: "Aim to save 15-20% of your income. Use our calculator to find your specific target based on your situation." },
      { question: "What is the best retirement investment?", answer: "Diversified portfolio with equities, bonds, and other assets. Consult a financial advisor for personalized advice." },
      { question: "How does inflation affect retirement planning?", answer: "Higher inflation means you need a larger corpus. Plan for 3-5% inflation when estimating future expenses." },
      { question: "Should I include healthcare costs?", answer: "Yes, healthcare costs typically increase with age and should be factored into retirement planning." },
      { question: "What is the retirement age in my country?", answer: "Retirement age varies by country; check your local regulations." },
      { question: "Can I retire early?", answer: "Early retirement is possible with sufficient savings and a solid plan, often called FIRE (Financial Independence, Retire Early)." },
      { question: "Is this calculator free?", answer: "Yes, 100% free." },
      { question: "Does it account for Social Security?", answer: "You can add expected Social Security benefits as income in the calculator." }
    ],
    relatedCalculators: [
      { name: 'SIP Calculator', path: '/sip-calculator.html', icon: TrendingUp },
      { name: 'Compound Interest', path: '/compound-interest-calculator.html', icon: TrendingUp },
      { name: 'Inflation', path: '/inflation-calculator.html', icon: TrendingUp }
    ]
  },
  tax_calculator: {
    title: "Estimate Your Taxes with Our",
    subtitle: "Tax Calculator",
    introduction: "Understanding your tax liability helps with financial planning. Our online tax calculator estimates your income tax based on your income, deductions, and applicable tax slabs.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How Tax Calculations Work</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Income tax is calculated using progressive tax slabs. Higher income is taxed at higher rates. Deductions reduce taxable income, lowering your tax liability.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Tax Deductions</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Common deductions include 80C investments, medical insurance, home loan interest, and HRA. These reduce your taxable income.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How is income tax calculated?", answer: "Taxable income is computed by subtracting deductions from gross income, then applying tax slabs to the result." },
      { question: "What are tax slabs?", answer: "Tax slabs define different tax rates for different income ranges. Higher income is taxed at higher rates." },
      { question: "What is standard deduction?", answer: "A fixed deduction available to all salaried employees, reducing taxable income without any investment." },
      { question: "How do deductions work?", answer: "Deductions reduce your taxable income. For example, ₹1.5 lakh in 80C deductions saves tax at your marginal rate." },
      { question: "What is surcharge?", answer: "An additional tax on high-income earners, added on top of normal tax liability." },
      { question: "How is relief calculated?", answer: "Tax relief includes deductions for taxes paid in foreign countries or certain investments." },
      { question: "What is effective tax rate?", answer: "Total tax divided by total income. It's lower than marginal rate due to progressive slabs." },
      { question: "Can I calculate for different years?", answer: "Yes, select different financial years to see how tax rules affect your liability." },
      { question: "Is this accurate?", answer: "Provides estimates based on tax rules; consult a tax professional for precise calculations." },
      { question: "Is it free?", answer: "Yes, 100% free." }
    ],
    relatedCalculators: [
      { name: 'Salary Calculator', path: '/salary-calculator.html', icon: TrendingUp },
      { name: 'HRA Calculator', path: '/hra-calculator.html', icon: TrendingUp },
      { name: 'TDS Calculator', path: '/tds-calculator.html', icon: TrendingUp }
    ]
  },
  npv_calculator: {
    title: "Evaluate Investments with Our",
    subtitle: "NPV Calculator",
    introduction: "Net Present Value (NPV) is a fundamental capital budgeting method that calculates the present value of all cash flows from an investment, helping determine its profitability.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding NPV</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          NPV = Sum of (Cash Flow / (1+r)^t) - Initial Investment. A positive NPV means the investment adds value; a negative NPV means it destroys value.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Discount Rate Selection</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            The discount rate (or hurdle rate) should reflect the risk of the project and the company's cost of capital.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is NPV?", answer: "Net Present Value is the difference between present value of cash inflows and outflows over time." },
      { question: "How is NPV calculated?", answer: "NPV = Sum of [Cash Flow / (1+r)^t] - Initial Investment, where r is discount rate and t is time period." },
      { question: "What does positive NPV mean?", answer: "Positive NPV indicates the investment will generate more value than its cost and should be accepted." },
      { question: "What discount rate should I use?", answer: "Use your required rate of return or the company's weighted average cost of capital (WACC)." },
      { question: "Can NPV be negative and still be acceptable?", answer: "Generally no; negative NPV means the investment destroys value. Some strategic investments may still be considered." },
      { question: "What is the difference between NPV and IRR?", answer: "NPV gives the absolute value added; IRR gives the return percentage. NPV is generally more reliable." },
      { question: "How do I handle unequal cash flows?", answer: "Enter each period's cash flow individually; the calculator handles varying amounts." },
      { question: "Does this work for projects with different lifespans?", answer: "Yes, enter the actual number of periods for each project." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Mobile friendly?", answer: "Yes, fully responsive." }
    ],
    relatedCalculators: [
      { name: 'IRR Calculator', path: '/irr-calculator.html', icon: TrendingUp },
      { name: 'ROI Calculator', path: '/roi-calculator.html', icon: TrendingUp },
      { name: 'Payback Period', path: '/payback-calculator.html', icon: TrendingUp }
    ]
  },
  irr_calculator: {
    title: "Find Your Return Rate with Our",
    subtitle: "IRR Calculator",
    introduction: "Internal Rate of Return (IRR) is the discount rate that makes NPV zero. It's widely used to evaluate the profitability of investments and compare different projects.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding IRR</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          IRR is the rate at which the present value of all cash flows equals the initial investment. It's found through iteration since there's no direct formula.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Using IRR for Decisions</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Accept projects with IRR higher than your required rate of return. Compare IRRs of different projects to prioritize the most profitable.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is IRR?", answer: "Internal Rate of Return is the discount rate that makes the Net Present Value of all cash flows equal to zero." },
      { question: "How is IRR calculated?", answer: "IRR is calculated through iteration (trial and error) or using software. It finds the rate where NPV = 0." },
      { question: "What does a higher IRR mean?", answer: "Higher IRR indicates a more profitable investment. Compare IRR to your required return to make decisions." },
      { question: "When should I use IRR over NPV?", answer: "Use IRR when comparing projects of similar size and timing. Use NPV for projects with different cash flow patterns." },
      { question: "Can IRR be negative?", answer: "Yes, if the investment never recovers the initial cost, IRR will be negative." },
      { question: "What is the difference between IRR and ROI?", answer: "IRR accounts for timing of cash flows; ROI is a simple ratio of gain to cost." },
      { question: "What is MIRR?", answer: "Modified IRR addresses some IRR limitations by using separate financing and reinvestment rates." },
      { question: "Can I compare projects with different lifespans?", answer: "Not directly with IRR. Use NPV or Equivalent Annual Annuity (EAA) for comparing different-length projects." },
      { question: "Is this calculator free?", answer: "Yes, 100% free." },
      { question: "How accurate is the result?", answer: "Calculations are precise to multiple decimal places; iteration continues until NPV is effectively zero." }
    ],
    relatedCalculators: [
      { name: 'NPV Calculator', path: '/npv-calculator.html', icon: TrendingUp },
      { name: 'ROI Calculator', path: '/roi-calculator.html', icon: TrendingUp },
      { name: 'Profit Calculator', path: '/profit-calculator.html', icon: TrendingUp }
    ]
  },
  // HEALTH CALCULATORS
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
  bmr_calculator: {
    title: "Discover Your Basal Metabolic Rate with Our",
    subtitle: "BMR Calculator",
    introduction: "Your Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest. Understanding your BMR helps you plan nutrition and weight management.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding BMR</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          BMR accounts for 60-75% of daily calorie burn. Even without exercise, your body burns calories for breathing, circulation, cell production, and other essential functions.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">BMR Formulas</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            We use Mifflin-St Jeor equation, considered the most accurate. For men: BMR = 10×weight + 6.25×height - 5×age + 5. For women: BMR = 10×weight + 6.25×height - 5×age - 161.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is BMR?", answer: "Basal Metabolic Rate is the calories your body burns at complete rest to maintain basic life functions." },
      { question: "Why is knowing BMR important?", answer: "BMR helps you understand minimum calorie needs and is the foundation for calculating total daily energy expenditure (TDEE)." },
      { question: "How is BMR different from TDEE?", answer: "BMR is calories at rest; TDEE includes all activity levels. TDEE = BMR × Activity Multiplier." },
      { question: "Does BMR change with age?", answer: "Yes, BMR generally decreases with age due to muscle mass loss and metabolic slowdown." },
      { question: "Can I increase my BMR?", answer: "Building muscle through strength training can slightly increase BMR, as muscle burns more calories than fat." },
      { question: "What's a normal BMR?", answer: "Varies widely; typical adult ranges from 1200-2000 kcal/day depending on size, age, and gender." },
      { question: "Should I eat below my BMR?", answer: "Not recommended for extended periods. Eating below BMR can slow metabolism and cause nutrient deficiencies." },
      { question: "Which formula is most accurate?", answer: "Mifflin-St Jeor is widely considered the most accurate for most people." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Does exercise affect BMR?", answer: "Regular exercise can slightly increase BMR by building metabolically active muscle tissue." }
    ],
    relatedCalculators: [
      { name: 'BMI Calculator', path: '/bmi-calculator.html', icon: Heart },
      { name: 'TDEE Calculator', path: '/tdee-calculator.html', icon: Activity },
      { name: 'Calorie Calculator', path: '/calorie-calculator.html', icon: Heart }
    ]
  },
  // MATH CALCULATORS
  algebra_solver: {
    title: "Solve Algebra Problems with Our",
    subtitle: "Algebra Solver",
    introduction: "Algebra uses symbols and letters to represent unknown values. Our algebra solver handles equations, simplifies expressions, and provides step-by-step solutions.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Algebra</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Algebra introduces variables (x, y, z) that represent unknown values. The goal is to find the value of these variables that makes the equation true.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Basic Operations</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Remember: What you do to one side, do to the other. Balance the equation by performing the same operation on both sides.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I solve an equation?", answer: "Isolate the variable by performing inverse operations. For x+5=10, subtract 5 from both sides to get x=5." },
      { question: "What is a linear equation?", answer: "An equation where the variable has exponent 1. Example: 2x + 3 = 7." },
      { question: "What is a quadratic equation?", answer: "An equation where the variable is squared. Example: x² + 5x + 6 = 0." },
      { question: "How do I simplify expressions?", answer: "Combine like terms and use distributive property: a(b + c) = ab + ac." },
      { question: "What is substitution?", answer: "Replace variables with given values to evaluate expressions." },
      { question: "What are coefficients?", answer: "The number multiplying a variable. In 5x, 5 is the coefficient." },
      { question: "How do I check my answer?", answer: "Substitute your solution back into the original equation. Both sides should be equal." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows steps?", answer: "Yes, step-by-step solutions are provided." }
    ],
    relatedCalculators: [
      { name: 'Equation Solver', path: '/equation-solver.html', icon: Calculator },
      { name: 'Quadratic', path: '/quadratic-calculator.html', icon: Calculator },
      { name: 'Geometry', path: '/geometry-calculator.html', icon: Calculator }
    ]
  },
  equation_solver: {
    title: "Solve Equations Instantly with Our",
    subtitle: "Equation Solver",
    introduction: "Our equation solver handles linear, quadratic, and polynomial equations. Enter your equation and get instant solutions with step-by-step explanations.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Types of Equations</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Linear equations have one solution. Quadratic equations have up to two. Higher-degree polynomials can have multiple solutions.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Checking Solutions</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Always verify by substituting your answer back into the original equation.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What types of equations can I solve?", answer: "Linear (ax+b=c), quadratic (ax²+bx+c=0), and polynomial equations." },
      { question: "How do I enter equations?", answer: "Use standard notation: x^2 for x squared, x/2 for x divided by 2." },
      { question: "What if there are multiple solutions?", answer: "All real solutions are displayed. Complex solutions are noted." },
      { question: "Can it solve systems of equations?", answer: "Use our system of equations calculator for multiple equations." },
      { question: "What is a root?", answer: "A solution to the equation where the expression equals zero." },
      { question: "How accurate are results?", answer: "Results are precise to 10 decimal places." },
      { question: "Shows working?", answer: "Yes, step-by-step solution provided." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Can I copy results?", answer: "Click to copy any solution." }
    ],
    relatedCalculators: [
      { name: 'Quadratic Calculator', path: '/quadratic-calculator.html', icon: Calculator },
      { name: 'Algebra Solver', path: '/algebra-solver.html', icon: Calculator },
      { name: 'Graphing Calculator', path: '/graphing-calculator.html', icon: Calculator }
    ]
  },
  quadratic_calculator: {
    title: "Solve Quadratic Equations with Our",
    subtitle: "Quadratic Calculator",
    introduction: "Quadratic equations have the form ax² + bx + c = 0. Our calculator finds roots using the quadratic formula, factoring, or completing the square.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Quadratic Formula</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          For ax² + bx + c = 0, x = (-b ± √(b²-4ac)) / 2a. The discriminant b²-4ac determines the nature of roots.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Discriminant</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            b²-4ac &gt; 0: two real roots. b²-4ac = 0: one real root. b²-4ac &lt; 0: two complex roots.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is a quadratic equation?", answer: "An equation where the highest power of the variable is 2: ax² + bx + c = 0." },
      { question: "How do I use the quadratic formula?", answer: "x = (-b ± √(b²-4ac)) / 2a. Plug in a, b, and c values." },
      { question: "What is the discriminant?", answer: "b²-4ac determines how many real roots: positive=2, zero=1, negative=0 real." },
      { question: "Can I factor instead?", answer: "Yes, if the quadratic can be factored into (x-m)(x-n)=0." },
      { question: "What are complex roots?", answer: "Roots with imaginary numbers, occurring when discriminant is negative." },
      { question: "What is vertex form?", answer: "y = a(x-h)² + k, where (h,k) is the parabola's vertex." },
      { question: "What is axis of symmetry?", answer: "x = -b/2a, the vertical line that divides the parabola into equal halves." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows steps?", answer: "Yes, step-by-step solution." }
    ],
    relatedCalculators: [
      { name: 'Equation Solver', path: '/equation-solver.html', icon: Calculator },
      { name: 'Graphing Calculator', path: '/graphing-calculator.html', icon: Calculator },
      { name: 'Factorial', path: '/factorial-calculator.html', icon: Calculator }
    ]
  },
  lcm_calculator: {
    title: "Find Least Common Multiple with Our",
    subtitle: "LCM Calculator",
    introduction: "The Least Common Multiple (LCM) is the smallest number divisible by two or more numbers. It's essential for adding fractions and finding common denominators.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding LCM</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          LCM(4, 6) = 12 because 12 is the smallest number both 4 and 6 divide into evenly. It's also called Least Common Denominator (LCD).
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Methods to Find LCM</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            List multiples, use prime factorization, or the formula: LCM(a,b) = a×b / GCD(a,b).
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is LCM?", answer: "Least Common Multiple is the smallest positive number divisible by both numbers." },
      { question: "How do I find LCM of 3 numbers?", answer: "Find LCM of first two, then find LCM of that result with the third." },
      { question: "What is LCM used for?", answer: "Adding fractions, scheduling, and finding common time intervals." },
      { question: "What is the difference between LCM and GCD?", answer: "LCM is the smallest common multiple; GCD is the largest common factor." },
      { question: "Can LCM be larger than the numbers?", answer: "Yes, LCM is always greater than or equal to the largest number." },
      { question: "What if one number is 0?", answer: "LCM with 0 is 0, but typically you work with positive integers." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Maximum numbers?", answer: "Supports up to 10 numbers at once." },
      { question: "Can I copy result?", answer: "Click to copy." }
    ],
    relatedCalculators: [
      { name: 'GCD Calculator', path: '/gcd-calculator.html', icon: Calculator },
      { name: 'Fraction Calculator', path: '/fraction-calculator.html', icon: Calculator },
      { name: 'Prime Number', path: '/prime-number-calculator.html', icon: Calculator }
    ]
  },
  gcd_calculator: {
    title: "Find Greatest Common Divisor with Our",
    subtitle: "GCD Calculator",
    introduction: "The Greatest Common Divisor (GCD) is the largest number that divides two or more numbers evenly. It's also known as Highest Common Factor (HCF).",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding GCD</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          GCD(24, 36) = 12 because 12 is the largest number that divides both 24 and 36 without remainder. It helps simplify fractions.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Euclidean Algorithm</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Divide the larger by smaller, take remainder, divide remainder by previous remainder. Repeat until remainder is 0.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is GCD?", answer: "Greatest Common Divisor is the largest number that divides both numbers evenly." },
      { question: "How is GCD used?", answer: "Simplifying fractions, cryptography, and finding common denominators." },
      { question: "What is the Euclidean algorithm?", answer: "A method to find GCD by repeated division: GCD(a,b) = GCD(b, a mod b)." },
      { question: "What is co-prime?", answer: "Two numbers are co-prime if their GCD is 1." },
      { question: "What's the relationship between GCD and LCM?", answer: "GCD(a,b) × LCM(a,b) = a × b." },
      { question: "Can GCD be 0?", answer: "GCD(0, n) = n. GCD(0, 0) is undefined." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Maximum numbers?", answer: "Supports up to 10 numbers." },
      { question: "Shows steps?", answer: "Yes, Euclidean algorithm steps shown." }
    ],
    relatedCalculators: [
      { name: 'LCM Calculator', path: '/lcm-calculator.html', icon: Calculator },
      { name: 'Fraction Calculator', path: '/fraction-calculator.html', icon: Calculator },
      { name: 'Prime Number', path: '/prime-number-calculator.html', icon: Calculator }
    ]
  },
  probability_calculator: {
    title: "Calculate Probabilities with Our",
    subtitle: "Probability Calculator",
    introduction: "Probability measures the likelihood of an event occurring, expressed as a number between 0 and 1. Our calculator handles basic to advanced probability calculations.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Probability</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Probability = (favorable outcomes) / (total outcomes). A probability of 0 means impossible; 1 means certain.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Probability Rules</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            P(A) + P(not A) = 1. P(A or B) = P(A) + P(B) - P(A and B).
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate probability?", answer: "Divide the number of favorable outcomes by total possible outcomes." },
      { question: "What is conditional probability?", answer: "Probability of event A given event B has occurred: P(A|B) = P(A and B) / P(B)." },
      { question: "What is independent events?", answer: "Events where occurrence of one doesn't affect the other. P(A and B) = P(A) × P(B)." },
      { question: "What is the binomial distribution?", answer: "Probability of k successes in n trials with probability p: P = C(n,k) × p^k × (1-p)^(n-k)." },
      { question: "What is expected value?", answer: "The average outcome if an experiment is repeated many times: E = Σ(x × P(x))." },
      { question: "Odds vs probability?", answer: "Odds = P/(1-P). Probability = Odds/(1+Odds)." },
      { question: "What is Bayes' theorem?", answer: "P(A|B) = P(B|A) × P(A) / P(B)." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows formula?", answer: "Yes, formula used is displayed." }
    ],
    relatedCalculators: [
      { name: 'Permutation', path: '/permutation-calculator.html', icon: Calculator },
      { name: 'Combination', path: '/combination-calculator.html', icon: Calculator },
      { name: 'Statistics', path: '/statistics-calculator.html', icon: Calculator }
    ]
  },
  permutation_calculator: {
    title: "Calculate Permutations with Our",
    subtitle: "Permutation Calculator",
    introduction: "A permutation is an arrangement of objects in a specific order. Our calculator computes P(n,r) - the number of ways to arrange r objects from n objects.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Permutations</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          P(n,r) = n! / (n-r)! where n is total items and r is items to arrange. Order matters in permutations.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Permutation vs Combination</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Permutations: order matters. Combinations: order doesn't matter.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is a permutation?", answer: "An ordered arrangement of r objects from n different objects." },
      { question: "How is P(n,r) calculated?", answer: "P(n,r) = n! / (n-r)! or n × (n-1) × ... × (n-r+1)." },
      { question: "What's the difference between permutation and combination?", answer: "Permutations consider order; combinations don't. ABC is different from ACB in permutations." },
      { question: "What is n factorial?", answer: "n! = n × (n-1) × (n-2) × ... × 2 × 1. 5! = 120." },
      { question: "What is a circular permutation?", answer: "Arrangements around a circle: (n-1)! for n distinct objects." },
      { question: "What if repetition is allowed?", answer: "With repetition: n^r arrangements." },
      { question: "Real-world examples?", answer: "Arranging people in seats, forming passwords, race results." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows steps?", answer: "Yes, calculation steps shown." }
    ],
    relatedCalculators: [
      { name: 'Combination', path: '/combination-calculator.html', icon: Calculator },
      { name: 'Probability', path: '/probability-calculator.html', icon: Calculator },
      { name: 'Factorial', path: '/factorial-calculator.html', icon: Calculator }
    ]
  },
  combination_calculator: {
    title: "Calculate Combinations with Our",
    subtitle: "Combination Calculator",
    introduction: "A combination is a selection of objects where order doesn't matter. Our calculator computes C(n,r) - the number of ways to choose r objects from n.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Combinations</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          C(n,r) = n! / (r! × (n-r)!). The order of selection doesn't matter. Choosing A,B is the same as B,A.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Combination Formula</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Also written as nCr or 'n choose r'. C(5,2) = 10 means 10 ways to choose 2 from 5.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is a combination?", answer: "A selection of objects where order doesn't matter." },
      { question: "How is C(n,r) calculated?", answer: "C(n,r) = n! / (r! × (n-r)!)." },
      { question: "Difference between combination and permutation?", answer: "Combinations ignore order; permutations consider order." },
      { question: "What is Pascal's triangle?", answer: "A triangular array of combination numbers C(n,r)." },
      { question: "When to use combinations?", answer: "Choosing teams, lottery numbers, committee formation." },
      { question: "What is the binomial theorem?", answer: "(a+b)^n = Σ C(n,r) × a^(n-r) × b^r." },
      { question: "What if n is small?", answer: "Use Pascal's triangle or list all combinations." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows formula?", answer: "Yes, formula and steps displayed." }
    ],
    relatedCalculators: [
      { name: 'Permutation', path: '/permutation-calculator.html', icon: Calculator },
      { name: 'Probability', path: '/probability-calculator.html', icon: Calculator },
      { name: 'Factorial', path: '/factorial-calculator.html', icon: Calculator }
    ]
  },
  prime_number_calculator: {
    title: "Check Prime Numbers with Our",
    subtitle: "Prime Number Calculator",
    introduction: "A prime number is divisible only by 1 and itself. Our calculator checks if a number is prime and can generate prime numbers within a range.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Prime Numbers</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Primes are the building blocks of all numbers. Every integer can be written as a product of primes (fundamental theorem of arithmetic).
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Prime Testing</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            To check if n is prime, test divisibility by all primes up to √n.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is a prime number?", answer: "A number greater than 1 with exactly two factors: 1 and itself." },
      { question: "What is the first prime?", answer: "2 is the smallest and only even prime." },
      { question: "How many primes are there?", answer: "Infinitely many primes (proved by Euclid around 300 BC)." },
      { question: "What is the Sieve of Eratosthenes?", answer: "An ancient algorithm to find all primes up to n by eliminating multiples." },
      { question: "What is a prime factorization?", answer: "Writing a number as product of its prime factors, e.g., 60 = 2² × 3 × 5." },
      { question: "What are twin primes?", answer: "Prime pairs with difference 2, like (3,5), (11,13)." },
      { question: "What is the largest known prime?", answer: "As of 2024, over 41 million digits long (Mersenne prime)." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Generate primes?", answer: "Yes, find all primes in a range." }
    ],
    relatedCalculators: [
      { name: 'Factorial', path: '/factorial-calculator.html', icon: Calculator },
      { name: 'GCD Calculator', path: '/gcd-calculator.html', icon: Calculator },
      { name: 'LCM Calculator', path: '/lcm-calculator.html', icon: Calculator }
    ]
  },
  factorial_calculator: {
    title: "Calculate Factorials with Our",
    subtitle: "Factorial Calculator",
    introduction: "The factorial of n (n!) is the product of all positive integers up to n. It's used in permutations, combinations, and probability calculations.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Factorials</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          n! = n × (n-1) × (n-2) × ... × 2 × 1. By convention, 0! = 1. Factorials grow very quickly—10! = 3,628,800.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Uses of Factorials</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Permutations: P(n,r) = n!/(n-r)!. Combinations: C(n,r) = n!/(r!(n-r)!).
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is n factorial?", answer: "n! = n × (n-1) × ... × 2 × 1. Example: 5! = 120." },
      { question: "What is 0 factorial?", answer: "0! = 1 by mathematical convention." },
      { question: "Why do factorials grow so fast?", answer: "Each multiplication adds another factor. Even 20! exceeds 2 quintillion." },
      { question: "What is double factorial?", answer: "n!! = n × (n-2) × (n-4)..., multiplying every second number." },
      { question: "What is gamma function?", answer: "Γ(n) = (n-1)! for non-integer values, extending factorial to reals." },
      { question: "What is n! approximations?", answer: "Stirling's approximation: n! ≈ √(2πn) × (n/e)^n." },
      { question: "Real-world uses?", answer: "Probability, statistics, combinatorics, arranging objects." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Max value?", answer: "Handles up to 170! exactly, larger with approximation." }
    ],
    relatedCalculators: [
      { name: 'Permutation', path: '/permutation-calculator.html', icon: Calculator },
      { name: 'Combination', path: '/combination-calculator.html', icon: Calculator },
      { name: 'Prime Number', path: '/prime-number-calculator.html', icon: Calculator }
    ]
  },
  sequence_calculator: {
    title: "Analyze Number Sequences with Our",
    subtitle: "Sequence Calculator",
    introduction: "A sequence is an ordered list of numbers following a pattern. Our calculator finds the nth term, sum, and identifies the pattern type (arithmetic, geometric, etc.).",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Sequences</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Sequences follow rules: arithmetic (add constant), geometric (multiply constant), Fibonacci (sum previous two).
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Arithmetic Sequence</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            a_n = a_1 + (n-1)d, where d is the common difference.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is a number sequence?", answer: "An ordered list of numbers that follow a specific pattern or rule." },
      { question: "What is an arithmetic sequence?", answer: "A sequence where each term differs by a constant: a, a+d, a+2d, ..." },
      { question: "What is a geometric sequence?", answer: "A sequence where each term is multiplied by a constant: a, ar, ar², ..." },
      { question: "What is the Fibonacci sequence?", answer: "Each term is sum of previous two: 1, 1, 2, 3, 5, 8, 13, ..." },
      { question: "How do I find the nth term?", answer: "Identify the pattern type, then use the appropriate formula." },
      { question: "What is the sum of a sequence?", answer: "For arithmetic: S = n(a_1 + a_n)/2. For geometric: S = a_1(1-r^n)/(1-r)." },
      { question: "What is a recursive formula?", answer: "Defines each term using previous terms, e.g., a_n = a_(n-1) + d." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Finds pattern?", answer: "Yes, identifies pattern type automatically." }
    ],
    relatedCalculators: [
      { name: 'Algebra Solver', path: '/algebra-solver.html', icon: Calculator },
      { name: 'Factorial', path: '/factorial-calculator.html', icon: Calculator },
      { name: 'Series Calculator', path: '/series-calculator.html', icon: Calculator }
    ]
  },
  geometry_calculator: {
    title: "Solve Geometry Problems with Our",
    subtitle: "Geometry Calculator",
    introduction: "Geometry deals with shapes, sizes, and positions. Our calculator computes area, perimeter, volume, and other properties for 2D and 3D shapes.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Geometry</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Geometry uses formulas to calculate properties. Key formulas include area, perimeter for 2D shapes and volume, surface area for 3D.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Common Formulas</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Circle: A = πr². Rectangle: A = l×w. Triangle: A = ½bh.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What can I calculate?", answer: "Area, perimeter, volume, surface area, angles for various shapes." },
      { question: "What shapes are supported?", answer: "Circle, triangle, rectangle, square, trapezoid, sphere, cube, cylinder, cone." },
      { question: "What is the Pythagorean theorem?", answer: "a² + b² = c², where c is the hypotenuse in a right triangle." },
      { question: "What is π?", answer: "Pi (π) ≈ 3.14159, the ratio of circle's circumference to its diameter." },
      { question: "How do I find volume?", answer: "Volume = area of base × height for prisms. Different formulas for different shapes." },
      { question: "What is surface area?", answer: "Total area of all faces of a 3D shape." },
      { question: "What are complementary angles?", answer: "Two angles that sum to 90 degrees." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows formula?", answer: "Yes, formula used is displayed." }
    ],
    relatedCalculators: [
      { name: 'Area Calculator', path: '/area-calculator.html', icon: Calculator },
      { name: 'Volume Calculator', path: '/volume-calculator.html', icon: Calculator },
      { name: 'Trigonometry', path: '/trigonometry-calculator.html', icon: FlaskConical }
    ]
  },
  // FITNESS CALCULATORS
  calories_burned_calculator: {
    title: "Calculate Calories Burned with Our",
    subtitle: "Calories Burned Calculator",
    introduction: "Our calories burned calculator estimates energy expenditure during various activities based on your weight and duration.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Calorie Burn</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Calories burned = MET × weight (kg) × duration (hours). MET (Metabolic Equivalent of Task) varies by activity intensity.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">MET Values</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Sitting: 1, Walking: 3.5, Running: 8-11, Cycling: 4-8, depending on intensity.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How accurate is this calculator?", answer: "Uses standard MET values; actual burn varies by individual metabolism." },
      { question: "What is MET?", answer: "Metabolic Equivalent of Task, a ratio of working metabolic rate to resting rate." },
      { question: "Does weight affect calorie burn?", answer: "Yes, heavier people burn more calories for the same activity." },
      { question: "What activities can I calculate?", answer: "Running, walking, cycling, swimming, gym workouts, sports." },
      { question: "Does intensity matter?", answer: "Yes, higher intensity activities have higher MET values and burn more." },
      { question: "Can I use for weight loss?", answer: "Yes, create calorie deficit through exercise and diet." },
      { question: "What's the most efficient cardio?", answer: "High-intensity interval training burns the most calories in less time." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Can I add custom activity?", answer: "Select closest activity and adjust intensity." }
    ],
    relatedCalculators: [
      { name: 'TDEE Calculator', path: '/tdee-calculator.html', icon: Activity },
      { name: 'Heart Rate', path: '/heart-rate-calculator.html', icon: Activity },
      { name: 'Pace Calculator', path: '/pace-calculator.html', icon: Activity }
    ]
  },
  one_rep_max_calculator: {
    title: "Find Your 1RM with Our",
    subtitle: "One Rep Max Calculator",
    introduction: "One Rep Max (1RM) is the maximum weight you can lift for one repetition. It's used to calculate training loads and track strength progress.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding 1RM</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          We use Brzycki formula: 1RM = weight × (36 / (37 - reps)). Accurate for 1-10 reps; less accurate for higher rep ranges.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Percentage Training</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            100% = 1RM, 80% = 5 reps, 70% = 10 reps. Use percentages to plan training.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is one rep max?", answer: "The maximum weight you can lift for a single repetition with proper form." },
      { question: "How do I calculate 1RM?", answer: "Use a submaximal lift: weight × (36 / (37 - reps)). Test with 3-5 reps for accuracy." },
      { question: "Why know my 1RM?", answer: "To plan training loads, track progress, and program percentage-based workouts." },
      { question: "How often should I test 1RM?", answer: "Every 4-6 weeks or at the start of new training blocks." },
      { question: "Is it safe to test 1RM?", answer: "Only with proper warm-up and spotters. Most people don't need to test often." },
      { question: "What percentage should I train at?", answer: "Strength: 85-100%, Hypertrophy: 70-85%, Endurance: 50-70%." },
      { question: "Can I estimate for multiple exercises?", answer: "Yes, calculate each exercise separately as they have different strength levels." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows percentage table?", answer: "Yes, common rep ranges and percentages shown." }
    ],
    relatedCalculators: [
      { name: 'TDEE Calculator', path: '/tdee-calculator.html', icon: Activity },
      { name: 'Macro Calculator', path: '/macro-calculator.html', icon: Activity },
      { name: 'Workout Timer', path: '/workout-timer.html', icon: Activity }
    ]
  },
  pace_calculator: {
    title: "Calculate Running Pace with Our",
    subtitle: "Pace Calculator",
    introduction: "Running pace is measured in minutes per mile or kilometer. Our calculator helps you pace your runs and convert between different pace and distance formats.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Pace</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Pace = time / distance. A 10 min/mile pace means 10 minutes to cover one mile. Use it to plan splits and race strategies.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Race Equivalents</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            5K pace often slightly faster than half marathon. Sprint distances require very different pacing.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate pace?", answer: "Divide total time by total distance. 30 min for 5K = 6 min/km." },
      { question: "What's a good pace?", answer: "Varies by fitness. Beginner: 7-8 min/km. Intermediate: 5-6 min/km. Advanced: under 5 min/km." },
      { question: "Can I convert between miles and km?", answer: "Yes, 1 mile = 1.609 km. Multiply/divide accordingly." },
      { question: "What's the difference between pace and speed?", answer: "Pace is time per distance (min/km); speed is distance per time (km/h)." },
      { question: "How do I calculate split times?", answer: "Divide goal time by distance, or use pace calculator for each mile/km." },
      { question: "What about heart rate zones?", answer: "Combine pace with heart rate training for optimal results." },
      { question: "How does altitude affect pace?", answer: "Slower times expected at altitude due to lower oxygen." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows race predictions?", answer: "Yes, predicts times for standard race distances." }
    ],
    relatedCalculators: [
      { name: 'Calories Burned', path: '/calories-burned-calculator.html', icon: Activity },
      { name: 'Heart Rate', path: '/heart-rate-calculator.html', icon: Activity },
      { name: 'VO2 Max', path: '/vo2-max-calculator.html', icon: Activity }
    ]
  },
  vo2_max_calculator: {
    title: "Estimate Your VO2 Max with Our",
    subtitle: "VO2 Max Calculator",
    introduction: "VO2 max measures your maximum oxygen uptake - a key indicator of cardiovascular fitness. Higher values mean better endurance capacity.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding VO2 Max</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          VO2 max is measured in ml/kg/min. Elite endurance athletes: 70-85. Average adult: 35-45.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Improving VO2 Max</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            High-intensity interval training and consistent aerobic exercise improve VO2 max over time.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is VO2 max?", answer: "Maximum amount of oxygen your body can utilize during intense exercise, measured in ml/kg/min." },
      { question: "Why is it important?", answer: "It measures cardiovascular fitness - higher values mean better endurance capacity." },
      { question: "How is it estimated?", answer: "Using heart rate-based formulas like Cooper test or Rockport walk test." },
      { question: "What is a good VO2 max?", answer: "Men: 40-60 good, 60+ excellent. Women: 35-50 good, 50+ excellent." },
      { question: "Can I improve it?", answer: "Yes, through consistent aerobic training, especially interval training." },
      { question: "How often to test?", answer: "Every 2-3 months to track improvement." },
      { question: "What's the difference between estimated and lab tested?", answer: "Lab tests are more accurate using gas analysis; estimates are close but less precise." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows improvement tips?", answer: "Yes, provides training recommendations." }
    ],
    relatedCalculators: [
      { name: 'Heart Rate', path: '/heart-rate-calculator.html', icon: Activity },
      { name: 'Pace Calculator', path: '/pace-calculator.html', icon: Activity },
      { name: 'TDEE Calculator', path: '/tdee-calculator.html', icon: Activity }
    ]
  },
  lean_mass_calculator: {
    title: "Calculate Lean Body Mass with Our",
    subtitle: "Lean Mass Calculator",
    introduction: "Lean body mass is total weight minus body fat. It's important for athletes and those tracking body composition changes.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Lean Mass</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Lean mass = total weight - fat weight. Includes muscle, bone, water, and organs. More accurate than BMI for fitness assessment.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Why Track Lean Mass</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Gaining lean mass while losing fat is ideal. Scale weight doesn't tell the whole story.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How is lean mass calculated?", answer: "Lean mass = weight × (1 - body fat percentage). Alternatively, use lean mass formulas." },
      { question: "What's the difference between lean mass and muscle?", answer: "Lean mass includes muscle, bone, water, organs. Muscle is just skeletal muscle." },
      { question: "What is a good lean mass percentage?", answer: "Men: 75-90% lean. Women: 60-80% lean. Athletes typically higher." },
      { question: "How do I increase lean mass?", answer: "Strength training, adequate protein, calorie surplus, proper recovery." },
      { question: "Is it the same as fat-free mass?", answer: "Almost, but fat-free mass includes essential fat. Lean mass excludes it." },
      { question: "How often to measure?", answer: "Monthly with body fat measurements." },
      { question: "What tool to use?", answer: "Use body fat percentage from skinfold, DEXA, or BIA, then calculate." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows progress?", answer: "Track over time for body composition changes." }
    ],
    relatedCalculators: [
      { name: 'Body Fat', path: '/body-fat-calculator.html', icon: Heart },
      { name: 'BMI Calculator', path: '/bmi-calculator.html', icon: Heart },
      { name: 'Macro Calculator', path: '/macro-calculator.html', icon: Activity }
    ]
  },
  tdee_calculator: {
    title: "Calculate TDEE with Our",
    subtitle: "TDEE Calculator",
    introduction: "Total Daily Energy Expenditure (TDEE) is the total calories you burn in a day including exercise. It's essential for weight management planning.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding TDEE</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          TDEE = BMR × Activity Factor. Your BMR is calories at rest; activity factor accounts for exercise.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Activity Factors</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Sedentary: 1.2, Light: 1.375, Moderate: 1.55, Active: 1.725, Very Active: 1.9.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is TDEE?", answer: "Total Daily Energy Expenditure is total calories burned per day including all activities." },
      { question: "How is TDEE calculated?", answer: "BMR × Activity Factor. Choose activity level closest to your weekly exercise." },
      { question: "What is BMR?", answer: "Basal Metabolic Rate is calories burned at complete rest." },
      { question: "How do I use TDEE for weight loss?", answer: "Eat 300-500 calories below TDEE for sustainable weight loss." },
      { question: "What about weight gain?", answer: "Eat 300-500 calories above TDEE for muscle gain." },
      { question: "How accurate is the estimate?", answer: "Within 10-15% for most people. Adjust based on actual weight changes." },
      { question: "Does exercise affect TDEE?", answer: "Yes, more exercise = higher activity factor = higher TDEE." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows macros?", answer: "Yes, calculates recommended macronutrient split." }
    ],
    relatedCalculators: [
      { name: 'Calorie Calculator', path: '/calorie-calculator.html', icon: Heart },
      { name: 'BMR Calculator', path: '/bmr-calculator.html', icon: Heart },
      { name: 'Macro Calculator', path: '/macro-calculator.html', icon: Activity }
    ]
  },
  step_counter_calculator: {
    title: "Convert Steps to Calories with Our",
    subtitle: "Step Counter Calculator",
    introduction: "Our step counter calculator estimates calories burned based on steps taken and body weight. Use it to track daily activity and meet fitness goals.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Steps</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Approximately 2,000 steps per mile. Calories per step vary by weight: heavier = more calories per step.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Daily Goals</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            10,000 steps is popular but 8,000-12,000 depending on intensity works well.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How many calories per step?", answer: "Roughly 0.04-0.06 calories per step depending on body weight." },
      { question: "How accurate is step counting?", answer: "Phone/p watches can count steps accurately if worn consistently." },
      { question: "How many steps for weight loss?", answer: "10,000+ steps plus calorie deficit for meaningful weight loss." },
      { question: "What's a good daily step goal?", answer: "10,000 is common; adjust based on current activity level." },
      { question: "Does stride length matter?", answer: "Longer stride covers more distance per step but doesn't affect calorie calculation much." },
      { question: "Walking vs running steps?", answer: "Running burns more per step but fewer steps for same distance." },
      { question: "Can I use for inactive time?", answer: "Add steps from any movement: cleaning, gardening, parking farther." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows distance?", answer: "Yes, converts steps to miles/kilometers." }
    ],
    relatedCalculators: [
      { name: 'Calories Burned', path: '/calories-burned-calculator.html', icon: Activity },
      { name: 'TDEE Calculator', path: '/tdee-calculator.html', icon: Activity },
      { name: 'Pace Calculator', path: '/pace-calculator.html', icon: Activity }
    ]
  },
  workout_timer: {
    title: "Time Your Workouts with Our",
    subtitle: "Workout Timer",
    introduction: "A workout timer helps structure training sessions, rest periods, and intervals. Use it for HIIT, circuit training, or any timed workout.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Using Workout Timers</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Timers create structure: work time, rest time, rounds. This ensures consistent intensity and proper rest.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">HIIT Workouts</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Common: 30 sec work, 30 sec rest, 8-12 rounds. Adjust based on fitness level.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What types of timers can I use?", answer: "Stopwatch, interval timer, HIIT timer, tabata (20 sec work, 10 sec rest)." },
      { question: "How do I set up interval training?", answer: "Set work time, rest time, and number of rounds. Timer handles the rest." },
      { question: "What is Tabata?", answer: "20 seconds work, 10 seconds rest, 8 rounds = 4 minutes total." },
      { question: "How long should rest be?", answer: "Strength: 2-3 min, Hypertrophy: 60-90 sec, Endurance: 30-60 sec." },
      { question: "Does it make sounds?", answer: "Yes, audio cues for work/rest transitions." },
      { question: "Can I save custom workouts?", answer: "Create and save your own interval combinations." },
      { question: "Works for running?", answer: "Yes, use interval setting for run/walk or fartlek training." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Keep screen on?", answer: "Yes, prevents screen from sleeping during workout." }
    ],
    relatedCalculators: [
      { name: 'Calories Burned', path: '/calories-burned-calculator.html', icon: Activity },
      { name: 'Heart Rate', path: '/heart-rate-calculator.html', icon: Activity },
      { name: 'One Rep Max', path: '/one-rep-max-calculator.html', icon: Activity }
    ]
  },
  macro_split_calculator: {
    title: "Calculate Macro Split with Our",
    subtitle: "Macro Split Calculator",
    introduction: "A macro split determines your protein, carbs, and fat ratio. Our calculator helps you find the right balance based on your goals and activity level.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Macros</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Protein: 4 cal/g, Carbs: 4 cal/g, Fat: 9 cal/g. Your total calories determine the grams of each macro.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Goal-Based Splits</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Weight loss: Higher protein. Muscle gain: Moderate protein, higher carbs. Maintenance: Balanced.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is a macro split?", answer: "The percentage of calories from each macronutrient in your diet." },
      { question: "What are common splits?", answer: "Balanced: 40% carb, 30% protein, 30% fat. Low-carb: 25% carb, 40% protein, 35% fat." },
      { question: "How much protein do I need?", answer: "0.8-1g per pound of body weight for active individuals." },
      { question: "How many carbs for athletes?", answer: "4-6g per pound of body weight for high training volume." },
      { question: "How much fat is enough?", answer: "Minimum 0.3g per pound; 20-30% of total calories is common." },
      { question: "Should I count macros?", answer: "Yes, for precise nutrition control and achieving specific goals." },
      { question: "What's IIFYM?", answer: "If It Fits Your Macros - flexible dieting approach focusing on meeting macro targets." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows gram amounts?", answer: "Yes, calculates both percentages and gram amounts." }
    ],
    relatedCalculators: [
      { name: 'Calorie Calculator', path: '/calorie-calculator.html', icon: Heart },
      { name: 'TDEE Calculator', path: '/tdee-calculator.html', icon: Activity },
      { name: 'BMR Calculator', path: '/bmr-calculator.html', icon: Heart }
    ]
  },
  // DATETIME CALCULATORS
  age_calculator: {
    title: "Calculate Age with Our",
    subtitle: "Age Calculator",
    introduction: "Our age calculator determines exact age in years, months, and days. Use it to calculate age for official documents, school admissions, or just curiosity.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Age Calculation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Age is calculated by subtracting birth date from current date. The exact age includes years, months, and days for precision.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Age in Different Cultures</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            East Asian age counts one at birth. Western age counts from zero.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate exact age?", answer: "Subtract birth date from current date. Account for incomplete years as months and days." },
      { question: "What is my age in days?", answer: "Multiply years by 365.25 (accounting for leap years) plus days from incomplete year." },
      { question: "What is age in months?", answer: "Years × 12 + months in incomplete year." },
      { question: "How accurate is this calculator?", answer: "Exact to the day, accounting for all leap years." },
      { question: "Can I calculate someone else's age?", answer: "Yes, enter their birth date to see their current age." },
      { question: "What about different calendars?", answer: "Currently uses Gregorian calendar. For other calendars, convert first." },
      { question: "What is my Chinese age?", answer: "Add 1-2 years depending on birth month relative to Chinese New Year." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows milestone dates?", answer: "Yes, upcoming birthdays and major birthdays shown." }
    ],
    relatedCalculators: [
      { name: 'Date Difference', path: '/date-difference-calculator.html', icon: Clock },
      { name: 'Birthday', path: '/birthday-calculator.html', icon: Clock },
      { name: 'Anniversary', path: '/anniversary-calculator.html', icon: Clock }
    ]
  },
  date_difference_calculator: {
    title: "Calculate Days Between Dates with Our",
    subtitle: "Date Difference Calculator",
    introduction: "Calculate the exact number of days, weeks, months, or years between any two dates. Useful for planning events, tracking durations, or milestone counting.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Date Differences</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Count all days between start and end dates. Exclude or include end date depending on your needs.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Leap Years</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Leap years occur every 4 years (except centuries not divisible by 400). 2024 is a leap year.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate days between dates?", answer: "Subtract the earlier date from the later date. Our calculator handles all calendar complexities." },
      { question: "Does it include the end date?", answer: "Usually excludes end date, but you can toggle this setting." },
      { question: "What about working days?", answer: "Use our business days calculator to exclude weekends." },
      { question: "Can I calculate across years?", answer: "Yes, handles multi-year spans correctly." },
      { question: "What about leap years?", answer: "Calculator automatically accounts for all leap years." },
      { question: "Can I calculate in weeks or months?", answer: "Yes, view results in days, weeks, months, or years." },
      { question: "What about BC dates?", answer: "Enter negative years for BC dates (e.g., -500 for 500 BC)." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Can I copy result?", answer: "Click to copy." }
    ],
    relatedCalculators: [
      { name: 'Age Calculator', path: '/age-calculator.html', icon: Clock },
      { name: 'Business Days', path: '/business-days-calculator.html', icon: Clock },
      { name: 'Countdown', path: '/countdown-timer.html', icon: Clock }
    ]
  },
  time_duration_calculator: {
    title: "Calculate Time Duration with Our",
    subtitle: "Time Duration Calculator",
    introduction: "Calculate time differences or add/subtract hours, minutes, and seconds from any time. Useful for time tracking, work hours, and scheduling.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Time Duration</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A day has 24 hours, hour has 60 minutes, minute has 60 seconds. Time wraps at 12 (12-hour) or 24 (24-hour) format.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">PM/AM</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            12-hour format uses AM (before noon) and PM (after noon). 24-hour format runs 0-23.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate duration?", answer: "Subtract start time from end time, accounting for AM/PM transitions." },
      { question: "What if time crosses midnight?", answer: "Calculator adds 24 hours automatically when end time is earlier than start." },
      { question: "Can I add time?", answer: "Yes, add hours/minutes to a start time to find end time." },
      { question: "What about work hours?", answer: "Calculate total work hours by subtracting start from end minus breaks." },
      { question: "Can I use 24-hour format?", answer: "Yes, toggle between 12-hour and 24-hour formats." },
      { question: "What is military time?", answer: "24-hour time without AM/PM. 13:00 = 1 PM, 22:30 = 10:30 PM." },
      { question: "How precise is it?", answer: "Calculate to the second." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Can I copy result?", answer: "Click to copy." }
    ],
    relatedCalculators: [
      { name: 'Time Zone', path: '/time-zone-converter.html', icon: Clock },
      { name: 'Age Calculator', path: '/age-calculator.html', icon: Clock },
      { name: 'Workdays', path: '/workdays-calculator.html', icon: Clock }
    ]
  },
  time_zone_converter: {
    title: "Convert Time Zones with Our",
    subtitle: "Time Zone Converter",
    introduction: "Convert times between different time zones worldwide. Essential for international calls, travel planning, and working with global teams.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Time Zones</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Earth is divided into 24 time zones, each roughly 15° of longitude. Local time changes as you move east or west.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Daylight Saving Time</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Many regions shift clocks forward in summer. Check if your locations observe DST.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I convert time zones?", answer: "Find the time difference between zones and add/subtract from the original time." },
      { question: "What is UTC?", answer: "Coordinated Universal Time, the primary time standard. All time zones are offset from UTC." },
      { question: "What about daylight saving?", answer: "DST adds or subtracts an hour. Some zones don't observe it." },
      { question: "What is my time zone offset?", answer: "Your offset from UTC. EST is UTC-5, PST is UTC-8, etc." },
      { question: "Can I convert multiple zones?", answer: "Yes, see multiple time zones simultaneously." },
      { question: "What is the International Date Line?", answer: "A line at ~180° where the date changes. Crossing it adds/subtracts a day." },
      { question: "Best tool for travel?", answer: "Use when scheduling calls or meetings across time zones." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows all zones?", answer: "Yes, major time zones worldwide." }
    ],
    relatedCalculators: [
      { name: 'Time Duration', path: '/time-duration-calculator.html', icon: Clock },
      { name: 'World Clock', path: '/world-clock.html', icon: Clock },
      { name: 'Date Calculator', path: '/date-calculator.html', icon: Clock }
    ]
  },
  workdays_calculator: {
    title: "Calculate Business Days with Our",
    subtitle: "Workdays Calculator",
    introduction: "Calculate working days between dates, excluding weekends and optionally holidays. Useful for project timelines and delivery estimates.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Workdays</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Standard workweek is Monday through Friday. Weekend days (Saturday, Sunday) are excluded from business day counts.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Adding Holidays</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Add specific holidays to exclude them from the count for more accurate business day calculation.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do business days work?", answer: "Count only Monday through Friday, excluding weekends." },
      { question: "Can I add custom holidays?", answer: "Yes, specify which dates to exclude in addition to weekends." },
      { question: "What if start day is weekend?", answer: "Count begins from the next business day." },
      { question: "Can I calculate end date from start + days?", answer: "Yes, find the date that is N business days after start." },
      { question: "What about part-time workers?", answer: "Adjust to your specific workweek." },
      { question: "Different for different countries?", answer: "Some countries have different standard workdays." },
      { question: "What is the difference from calendar days?", answer: "Business days exclude weekends (and holidays); calendar days include all days." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows end date?", answer: "Yes, calculates the resulting business day." }
    ],
    relatedCalculators: [
      { name: 'Date Difference', path: '/date-difference-calculator.html', icon: Clock },
      { name: 'Time Duration', path: '/time-duration-calculator.html', icon: Clock },
      { name: 'Countdown', path: '/countdown-timer.html', icon: Clock }
    ]
  },
  countdown_timer: {
    title: "Create Countdown with Our",
    subtitle: "Countdown Timer",
    introduction: "Create countdowns to future events or measure time since past events. Great for birthdays, holidays, project deadlines, or milestones.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Countdowns</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Countdowns show time remaining until an event. Positive countdown = future, negative = time since event.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Real-Time Updates</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Countdowns update every second showing days, hours, minutes, seconds.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I create a countdown?", answer: "Enter the target date and time. The countdown shows time remaining." },
      { question: "Can I save countdowns?", answer: "Bookmark or save the page. Countdowns recalculate each time." },
      { question: "What if the event passed?", answer: "Shows negative time or time since event." },
      { question: "Can I add multiple countdowns?", answer: "Use the page repeatedly for different events." },
      { question: "What events work best?", answer: "Birthdays, holidays, product launches, project deadlines, anniversaries." },
      { question: "Does it show in different units?", answer: "Yes, see in days, hours, minutes, or total hours." },
      { question: "Time zone aware?", answer: "Yes, use your local time zone or specify one." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Can I share?", answer: "Copy the page URL; it remembers your event." }
    ],
    relatedCalculators: [
      { name: 'Date Difference', path: '/date-difference-calculator.html', icon: Clock },
      { name: 'Age Calculator', path: '/age-calculator.html', icon: Clock },
      { name: 'Time Duration', path: '/time-duration-calculator.html', icon: Clock }
    ]
  },
  leap_year_calculator: {
    title: "Check Leap Years with Our",
    subtitle: "Leap Year Calculator",
    introduction: "A leap year has 366 days instead of 365. Our calculator checks if any year is a leap year and explains why.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Leap Years</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Leap years are divisible by 4, except centuries unless divisible by 400. This keeps calendar aligned with Earth's orbit.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">The 400-Year Cycle</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Over 400 years, there are exactly 97 leap years, making the average year 365.2425 days.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What makes a year a leap year?", answer: "Divisible by 4, but century years must be divisible by 400. 2000 was leap; 1900 was not." },
      { question: "Why do we have leap years?", answer: "Earth takes ~365.2422 days to orbit. Without leap years, calendar would drift from seasons." },
      { question: "How many leap years in 100 years?", answer: "Usually 24, but in a century boundary (non-400), only 23." },
      { question: "What is the next leap year?", answer: "2024, then 2028, then 2032, then 2036." },
      { question: "Can February have 30 days?", answer: "No, it has 29 in leap years, 28 in common years." },
      { question: "What countries don't use leap years?", answer: "Most use Gregorian calendar. Some use different calendars (e.g., Hijri, Hebrew)." },
      { question: "What happens in the year 2100?", answer: "2100 is divisible by 100 but not 400, so not a leap year." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows leap years in range?", answer: "Yes, find all leap years between any two years." }
    ],
    relatedCalculators: [
      { name: 'Date Difference', path: '/date-difference-calculator.html', icon: Clock },
      { name: 'Calendar', path: '/calendar-calculator.html', icon: Clock },
      { name: 'Week Number', path: '/week-number-calculator.html', icon: Clock }
    ]
  },
  week_number_calculator: {
    title: "Find Week Numbers with Our",
    subtitle: "Week Number Calculator",
    introduction: "Calculate the week number (1-52 or 1-53) for any date. Useful for project planning, reporting, and ISO standards.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Week Numbers</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          ISO week starts Monday. Week 1 contains the first Thursday of the year. US week system starts Sunday.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">ISO vs US</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            ISO 8601 is common internationally. US week numbering uses different rules.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is week number?", answer: "The sequential number of a week within a year. Year has 52 or 53 weeks." },
      { question: "What is ISO week number?", answer: "Standard week numbering where Week 1 is the first week with a Thursday." },
      { question: "How do I calculate week number?", answer: "Count weeks from the start of the year, accounting for partial first week." },
      { question: "Why do some years have 53 weeks?", answer: "When January 1 falls on Thursday, or in leap years on Wednesday, there are 53 weeks." },
      { question: "Different systems?", answer: "ISO (Monday start), US (Sunday start), and others exist." },
      { question: "How is this used in business?", answer: "Project schedules, fiscal calendars, reporting periods." },
      { question: "What week is today?", answer: "Enter today's date to see the current week number." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows week range?", answer: "Yes, see the dates covered by each week." }
    ],
    relatedCalculators: [
      { name: 'Date Difference', path: '/date-difference-calculator.html', icon: Clock },
      { name: 'Leap Year', path: '/leap-year-calculator.html', icon: Clock },
      { name: 'Calendar', path: '/calendar-calculator.html', icon: Clock }
    ]
  },
  business_days_calculator: {
    title: "Calculate Business Days with Our",
    subtitle: "Business Days Calculator",
    introduction: "Calculate business days (working days) between two dates, excluding weekends and holidays. Essential for SLA calculations and project estimation.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Business Day Calculation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Standard business days are Monday-Friday. Exclude weekends and holidays to get accurate working days.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Adding Holidays</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            You can add country-specific holidays to get accurate business day count.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What are business days?", answer: "Working days, typically Monday through Friday, excluding weekends." },
      { question: "How do I calculate business days?", answer: "Count Monday-Friday between dates, excluding specified holidays." },
      { question: "Can I exclude specific holidays?", answer: "Yes, add custom dates to exclude." },
      { question: "What about international holidays?", answer: "Select your country for relevant holiday exclusion." },
      { question: "How is this used for shipping?", answer: "Add business days to order date to estimate delivery date." },
      { question: "What about part-week holidays?", answer: "If holiday falls on weekend, it's usually observed on closest weekday." },
      { question: "Different for different countries?", answer: "Yes, holiday calendars vary by country." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows end date?", answer: "Yes, calculates deadline date." }
    ],
    relatedCalculators: [
      { name: 'Date Difference', path: '/date-difference-calculator.html', icon: Clock },
      { name: 'Workdays', path: '/workdays-calculator.html', icon: Clock },
      { name: 'Time Duration', path: '/time-duration-calculator.html', icon: Clock }
    ]
  },
  date_add_subtract_calculator: {
    title: "Add/Subtract Dates with Our",
    subtitle: "Date Add/Subtract Calculator",
    introduction: "Add or subtract days, weeks, months, or years from any date. Quickly calculate deadlines, past dates, or future milestones.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Date Arithmetic</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Add or subtract time units from a starting date. Handles month boundaries, leap years, and varying month lengths.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Month End Handling</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            If you add 1 month to Jan 31, you get Feb 28 (or 29 in leap years).
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I add days to a date?", answer: "Enter the start date and number of days to add. Result shows the new date." },
      { question: "Can I subtract from a date?", answer: "Yes, enter negative number or use subtract mode." },
      { question: "What about adding months?", answer: "Account for different month lengths. End of month handling applies." },
      { question: "What is 90 days from today?", answer: "Use calculator to find exact date 90 days in the future." },
      { question: "How do I calculate deadline?", answer: "Add working days to find project deadline." },
      { question: "What about business days?", answer: "Use business days calculator for excluding weekends." },
      { question: "Can I add combination of units?", answer: "Yes, add years, months, and days together." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Can I copy result?", answer: "Click to copy." }
    ],
    relatedCalculators: [
      { name: 'Date Difference', path: '/date-difference-calculator.html', icon: Clock },
      { name: 'Age Calculator', path: '/age-calculator.html', icon: Clock },
      { name: 'Countdown', path: '/countdown-timer.html', icon: Clock }
    ]
  },
  // CONSTRUCTION CALCULATORS
  concrete_calculator: {
    title: "Calculate Concrete with Our",
    subtitle: "Concrete Calculator",
    introduction: "Calculate the volume of concrete needed for slabs, footings, columns, and more. Enter dimensions to get exact cubic yards or meters required.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Concrete Volume</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Volume = length × width × depth. Convert to cubic yards (27 cu ft = 1 cu yd) or cubic meters (1000L = 1m³).
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Ordering Extra</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Order 5-10% extra for waste, spillage, and over-excavation.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate concrete volume?", answer: "Multiply length × width × depth in consistent units." },
      { question: "How much does concrete cost?", answer: "Average $120-150 per cubic yard, varies by location and strength." },
      { question: "What's the mix ratio?", answer: "Standard is 1:2:3 (cement:sand:gravel) or use pre-mixed bags." },
      { question: "How many bags do I need?", answer: "One 80lb bag = 0.6 cubic feet. Divide total volume by bag size." },
      { question: "What about reinforcement?", answer: "Add wire mesh or rebar for structural concrete. Not included in volume." },
      { question: "How do I calculate for odd shapes?", answer: "Break into rectangles, calculate each, then sum." },
      { question: "What is curing time?", answer: "Allow 7 days for walking, 28 days for full strength." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows metric and imperial?", answer: "Yes, toggle between feet/inches and meters/cm." }
    ],
    relatedCalculators: [
      { name: 'Cement Calculator', path: '/cement-calculator.html', icon: Hammer },
      { name: 'Brick Calculator', path: '/brick-calculator.html', icon: Hammer },
      { name: 'Volume Calculator', path: '/volume-calculator.html', icon: Calculator }
    ]
  },
  cement_calculator: {
    title: "Calculate Cement with Our",
    subtitle: "Cement Calculator",
    introduction: "Calculate the amount of cement needed for concrete mixes, mortar, and plaster. Specify the mix ratio and total volume required.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Cement Calculation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Cement is one part of a mix. For 1:2:4 ratio, divide total volume by sum of ratio (1+2+4=7), then multiply by cement portion.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Bag Sizes</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            50kg (94lb) or 25kg (55lb) bags. One 50kg bag = approximately 1.25 cubic feet.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate cement amount?", answer: "Total volume × (cement ratio / total ratio) = cement volume. Convert to bags." },
      { question: "What are common mix ratios?", answer: "1:3 (mortar), 1:2:4 (concrete), 1:1.5:3 (strong concrete)." },
      { question: "How many bags per cubic meter?", answer: "About 7-8 bags of 50kg cement per cubic meter for 1:2:4 mix." },
      { question: "What about sand and aggregate?", answer: "Sand = cement × 2, Aggregate = cement × 4 for 1:2:4 mix." },
      { question: "How much water do I add?", answer: "Approximately 0.5 times cement weight. Adjust for workability." },
      { question: "What's the yield per bag?", answer: "One 50kg bag makes about 0.035 cubic meters or 1.25 cubic feet." },
      { question: "Can I use for mortar calculation?", answer: "Yes, for bricklaying or tiling mortar." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows total cost?", answer: "Enter price per bag for cost estimate." }
    ],
    relatedCalculators: [
      { name: 'Concrete Calculator', path: '/concrete-calculator.html', icon: Hammer },
      { name: 'Brick Calculator', path: '/brick-calculator.html', icon: Hammer },
      { name: 'Tile Calculator', path: '/tile-calculator.html', icon: Hammer }
    ]
  },
  brick_calculator: {
    title: "Calculate Bricks with Our",
    subtitle: "Brick Calculator",
    introduction: "Calculate the number of bricks needed for walls, patios, and other masonry projects. Account for mortar gaps and waste.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Brick Calculation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Standard brick: 8\" × 2.25\" × 4\" plus 3/8\" mortar joint. About 7 bricks per sq ft in standard running bond.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Add Extra</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Add 5-10% for cuts, breakage, and waste.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate bricks needed?", answer: "Wall area ÷ brick area with mortar = number of bricks. Add 10% waste." },
      { question: "How many bricks per square foot?", answer: "Approximately 7 bricks for standard modular bricks in running bond." },
      { question: "What about different brick sizes?", answer: "Enter your brick dimensions; calculator adjusts accordingly." },
      { question: "What is mortar joint?", answer: "The gap between bricks, typically 3/8 inch." },
      { question: "How do I calculate for a wall?", answer: "Length × height = wall area. Subtract openings (doors, windows)." },
      { question: "What about patterns?", answer: "Herringbone or other patterns may require 15-20% extra." },
      { question: "How much does brick cost?", answer: "Varies by type, average $0.50-1.50 per brick plus labor." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows mortar needed?", answer: "Yes, estimates mortar volume." }
    ],
    relatedCalculators: [
      { name: 'Concrete Calculator', path: '/concrete-calculator.html', icon: Hammer },
      { name: 'Cement Calculator', path: '/cement-calculator.html', icon: Hammer },
      { name: 'Wall Area', path: '/wall-area-calculator.html', icon: Hammer }
    ]
  },
  tile_calculator: {
    title: "Calculate Tiles with Our",
    subtitle: "Tile Calculator",
    introduction: "Calculate the number of tiles needed for flooring, walls, or backsplash projects. Account for cuts, patterns, and waste.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Tile Calculation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Tile area = length × width. Divide room area by tile area. Add 10-15% for cuts and waste.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Pattern Waste</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Diagonal layout: 15%. Complex patterns: 20%.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate tiles needed?", answer: "Room area ÷ tile area = number of tiles. Add 10-15% for waste." },
      { question: "How much extra to buy?", answer: "10% for straight lay, 15% for diagonal, 20% for complex patterns." },
      { question: "Should I account for grout?", answer: "Grout lines are included in tile spacing. Tile size is face dimension." },
      { question: "What about trim pieces?", answer: "Add 5-10% for edge cuts. Order bullnose or trim separately." },
      { question: "How do I measure odd shapes?", answer: "Break into rectangles, calculate each, sum for total." },
      { question: "What is square footage?", answer: "Length × width in feet. Convert inches to decimal first." },
      { question: "How many tiles per box?", answer: "Varies by manufacturer, typically 10-20 for floor tiles." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows cost estimate?", answer: "Enter price per tile or box." }
    ],
    relatedCalculators: [
      { name: 'Flooring Calculator', path: '/flooring-calculator.html', icon: Hammer },
      { name: 'Grout Calculator', path: '/grout-calculator.html', icon: Hammer },
      { name: 'Area Calculator', path: '/area-calculator.html', icon: Calculator }
    ]
  },
  paint_calculator: {
    title: "Calculate Paint with Our",
    subtitle: "Paint Calculator",
    introduction: "Calculate the amount of paint needed for walls, ceilings, or trim. Enter room dimensions and number of coats for accurate estimates.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Paint Coverage</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          One gallon covers approximately 350-400 sq ft with one coat. Two coats are usually recommended for best coverage.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Surface Types</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            New drywall absorbs more paint. Dark colors may need more coats.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate paint needed?", answer: "Wall area ÷ coverage per gallon = gallons needed. Multiply by coats." },
      { question: "How much area does one gallon cover?", answer: "350-400 sq ft per gallon with one coat." },
      { question: "How many coats do I need?", answer: "Two coats for new paint, repaints often need one coat." },
      { question: "Do I subtract for windows and doors?", answer: "Yes, subtract window/door area from wall area." },
      { question: "What about ceiling paint?", answer: "Calculate ceiling separately: length × width." },
      { question: "What is primer?", answer: "First coat helping paint adhere. Use for new surfaces or color changes." },
      { question: "What about trim?", answer: "Calculate trim length × width separately. Use paint designed for trim." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows cost estimate?", answer: "Enter price per gallon for total cost." }
    ],
    relatedCalculators: [
      { name: 'Wall Area', path: '/wall-area-calculator.html', icon: Hammer },
      { name: 'Coverage Calculator', path: '/coverage-calculator.html', icon: Hammer },
      { name: 'Primer Calculator', path: '/primer-calculator.html', icon: Hammer }
    ]
  },
  steel_weight_calculator: {
    title: "Calculate Steel Weight with Our",
    subtitle: "Steel Weight Calculator",
    introduction: "Calculate the weight of steel beams, bars, plates, and tubes. Essential for structural engineering and construction cost estimation.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Steel Weight</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Steel density ≈ 7850 kg/m³ or 490 lb/ft³. Weight = volume × density. Different sections have different formulas.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Section Types</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            I-beam, H-beam, channel, angle, tube, plate, round bar.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate steel weight?", answer: "Volume × density. Use formulas for different shapes." },
      { question: "What is the density of steel?", answer: "7850 kg/m³ (490 lb/ft³) for carbon steel." },
      { question: "How do I calculate for a beam?", answer: "Enter dimensions and length; calculator handles the rest." },
      { question: "What's the difference between kg and lbs?", answer: "1 kg = 2.205 lbs. Results shown in both units." },
      { question: "What about stainless steel?", answer: "Density slightly different (~8000 kg/m³). Use appropriate density." },
      { question: "How do I calculate multiple pieces?", answer: "Enter quantity; weight is per piece and total." },
      { question: "What about hollow sections?", answer: "Subtract inner volume from outer for tubes and hollow sections." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows section properties?", answer: "Yes, also provides cross-sectional area." }
    ],
    relatedCalculators: [
      { name: 'Metal Calculator', path: '/metal-calculator.html', icon: Hammer },
      { name: 'Load Calculator', path: '/load-calculator.html', icon: Hammer },
      { name: 'Volume Calculator', path: '/volume-calculator.html', icon: Calculator }
    ]
  },
  area_calculator: {
    title: "Calculate Area with Our",
    subtitle: "Area Calculator",
    introduction: "Calculate the area of various shapes including rectangles, circles, triangles, and more. Enter dimensions to get instant results in multiple units.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Area Calculation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Area formulas: Rectangle = l×w, Circle = πr², Triangle = ½bh. Square feet, meters, or other units.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Unit Conversion</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Convert between sq ft, sq m, sq yd, acres, hectares, and more.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What shapes can I calculate?", answer: "Rectangle, square, circle, triangle, trapezoid, ellipse, and more." },
      { question: "How do I calculate irregular area?", answer: "Break into known shapes, calculate each, sum total." },
      { question: "Can I convert between units?", answer: "Yes, select input and output units. Automatic conversion." },
      { question: "What is square footage?", answer: "Area in feet squared. Length × width in feet." },
      { question: "How do I measure for flooring?", answer: "Measure length and width, calculate area. Add 10% waste." },
      { question: "What about acres?", answer: "43,560 sq ft = 1 acre. Used for large land areas." },
      { question: "What is a hectare?", answer: "10,000 square meters. Common for land measurement." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows perimeter?", answer: "Yes, for applicable shapes." }
    ],
    relatedCalculators: [
      { name: 'Volume Calculator', path: '/volume-calculator.html', icon: Calculator },
      { name: 'Flooring Calculator', path: '/flooring-calculator.html', icon: Hammer },
      { name: 'Tile Calculator', path: '/tile-calculator.html', icon: Hammer }
    ]
  },
  volume_calculator: {
    title: "Calculate Volume with Our",
    subtitle: "Volume Calculator",
    introduction: "Calculate the volume of 3D shapes including cubes, spheres, cylinders, cones, and more. Results in cubic feet, meters, or other units.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Volume Calculation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Volume = length × width × height for rectangular. Different formulas for spheres, cylinders, cones.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Unit Conversion</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Convert between cubic feet, meters, yards, gallons, liters.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What shapes can I calculate?", answer: "Cube, rectangular prism, sphere, cylinder, cone, pyramid, and more." },
      { question: "How do I calculate cylinder volume?", answer: "π × radius² × height." },
      { question: "What about sphere volume?", answer: "4/3 × π × radius³." },
      { question: "How do I convert cubic feet to gallons?", answer: "1 cubic foot = 7.48 gallons." },
      { question: "What is cubic meter in liters?", answer: "1 cubic meter = 1000 liters." },
      { question: "How do I calculate for odd shapes?", answer: "Break into known shapes, calculate each, sum total." },
      { question: "What about partial shapes?", answer: "Calculate based on actual dimensions (e.g., partially filled cylinder)." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows surface area?", answer: "Yes, also calculates surface area for most shapes." }
    ],
    relatedCalculators: [
      { name: 'Area Calculator', path: '/area-calculator.html', icon: Calculator },
      { name: 'Concrete Calculator', path: '/concrete-calculator.html', icon: Hammer },
      { name: 'Concrete Calculator', path: '/concrete-calculator.html', icon: Hammer }
    ]
  },
  roofing_calculator: {
    title: "Calculate Roofing Materials with Our",
    subtitle: "Roofing Calculator",
    introduction: "Calculate shingles, tiles, or other roofing materials needed for your roof. Enter roof dimensions and pitch for accurate estimates.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Roof Calculation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Roof area = footprint area × pitch factor. Pitch of 4/12 means rise 4 inches per horizontal 12 inches.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Waste Factor</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Add 10-15% for cuts, ridges, and waste.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate roof area?", answer: "Footprint × pitch factor. Or measure each plane and sum." },
      { question: "What is roof pitch?", answer: "The slope of the roof, expressed as rise:run (e.g., 4:12)." },
      { question: "How do I find pitch factor?", answer: "Use pitch multiplier table: 4/12 = 1.054, 6/12 = 1.118, 8/12 = 1.202." },
      { question: "How many shingles per square?", answer: "One square = 100 sq ft = 3 bundles of shingles (or 1 square of tiles)." },
      { question: "What about underlayment?", answer: "Calculate same as roof area. Use proper overlap." },
      { question: "What is a roofing square?", answer: "100 square feet (10×10 ft). Standard unit for roofing materials." },
      { question: "How do I handle complex roofs?", answer: "Break into sections, calculate each, sum total." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows cost estimate?", answer: "Enter price per square for material cost." }
    ],
    relatedCalculators: [
      { name: 'Area Calculator', path: '/area-calculator.html', icon: Calculator },
      { name: 'Pitch Calculator', path: '/pitch-calculator.html', icon: Calculator },
      { name: 'Siding Calculator', path: '/siding-calculator.html', icon: Hammer }
    ]
  },
  flooring_calculator: {
    title: "Calculate Flooring with Our",
    subtitle: "Flooring Calculator",
    introduction: "Calculate flooring materials needed for hardwood, laminate, tile, or carpet. Enter room dimensions and get accurate material estimates.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Flooring Calculation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Room area = length × width. Add 10-20% for waste, cuts, and pattern matching.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Waste Factors</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Hardwood: 10%, Tile: 10-15%, Carpet: 10-15%, Laminate: 10-20%.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate flooring area?", answer: "Measure room length and width, multiply. Subtract areas not flooring." },
      { question: "How much extra should I buy?", answer: "10% for simple rooms, 15% for complex layouts, 20% for diagonal patterns." },
      { question: "How do I convert to boxes?", answer: "Divide total sq ft by sq ft per box. Round up." },
      { question: "What about pattern direction?", answer: "Running flooring in one direction may require more material." },
      { question: "Do I need underlayment?", answer: "Most floating floors need underlayment. Calculate separately." },
      { question: "What about transitions?", answer: "Add for room transitions and thresholds." },
      { question: "How do I measure stairs?", answer: "Calculate each step: (tread + riser) × width. Sum for total." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows cost estimate?", answer: "Enter price per sq ft or box." }
    ],
    relatedCalculators: [
      { name: 'Area Calculator', path: '/area-calculator.html', icon: Calculator },
      { name: 'Tile Calculator', path: '/tile-calculator.html', icon: Hammer },
      { name: 'Carpet Calculator', path: '/carpet-calculator.html', icon: Hammer }
    ]
  },
  // TRADING CALCULATORS
  position_size_calculator: {
    title: "Calculate Position Size with Our",
    subtitle: "Position Size Calculator",
    introduction: "Calculate the correct position size based on account size, risk percentage, and stop loss. Essential for risk management and capital preservation.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Position Sizing</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Position size = (Account × Risk%) / (Entry - Stop Loss). This ensures you risk only your planned amount per trade.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Risk Management</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Most traders risk 1-2% per trade to preserve capital and allow for losing streaks.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is position sizing?", answer: "Determining how many units/shares to buy based on your risk parameters." },
      { question: "How do I calculate position size?", answer: "Divide risk amount by stop loss distance to get units." },
      { question: "What is a good risk per trade?", answer: "1-2% of account balance is standard recommendation." },
      { question: "How does stop loss affect position size?", answer: "Wider stop = smaller position size for same risk amount." },
      { question: "Should I use fixed dollar risk or percentage?", answer: "Percentage is recommended as account grows." },
      { question: "What about pip value?", answer: "For forex, calculate pip value to determine risk in terms of currency." },
      { question: "Can I use for different markets?", answer: "Yes, works for stocks, forex, futures, crypto." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows total risk?", answer: "Yes, displays risk amount in your account currency." }
    ],
    relatedCalculators: [
      { name: 'Risk Reward', path: '/risk-reward-calculator.html', icon: TrendingUp },
      { name: 'Stop Loss', path: '/stop-loss-calculator.html', icon: TrendingUp },
      { name: 'P&L Calculator', path: '/pnl-calculator.html', icon: TrendingUp }
    ]
  },
  risk_reward_calculator: {
    title: "Calculate Risk/Reward with Our",
    subtitle: "Risk Reward Calculator",
    introduction: "Calculate the risk-reward ratio for trades to ensure favorable risk-reward. Enter entry, stop loss, and target to see the ratio.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Risk/Reward</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Risk/Reward ratio = (Entry - Stop Loss) / (Target - Entry). A 1:3 ratio means risking 1 to potentially make 3.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Profitability</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            With 1:2 risk-reward, you only need 33% win rate to be profitable.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is risk/reward ratio?", answer: "Ratio of potential loss to potential profit in a trade." },
      { question: "How do I calculate it?", answer: "Divide the risk distance by the reward distance." },
      { question: "What is a good risk/reward ratio?", answer: "1:2 or higher is recommended. Avoid trades below 1:1." },
      { question: "Why does ratio matter?", answer: "Higher ratio allows for lower win rate while still being profitable." },
      { question: "How do I set profit targets?", answer: "Based on support/resistance, structure, or fixed multiples of risk." },
      { question: "What about breakeven trades?", answer: "Move stop to breakeven after half of reward is captured." },
      { question: "Can I use for any market?", answer: "Yes, works for stocks, forex, futures, crypto." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows win rate needed?", answer: "Yes, calculates break-even win rate for your ratio." }
    ],
    relatedCalculators: [
      { name: 'Position Size', path: '/position-size-calculator.html', icon: TrendingUp },
      { name: 'Stop Loss', path: '/stop-loss-calculator.html', icon: TrendingUp },
      { name: 'P&L Calculator', path: '/pnl-calculator.html', icon: TrendingUp }
    ]
  },
  pnl_calculator: {
    title: "Calculate Profit and Loss with Our",
    subtitle: "P&L Calculator",
    introduction: "Calculate profit and loss for trades including percentage gains, dollar values, and breakeven points. Essential for tracking trading performance.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding P&L</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          P&L = (Current Price - Entry Price) × Quantity. Can be expressed in dollars or percentage.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Long vs Short</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Long: profit when price rises. Short: profit when price falls.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I calculate P&L?", answer: "Multiply the price difference by the number of units." },
      { question: "How do I calculate percentage return?", answer: "(Exit Price - Entry Price) / Entry Price × 100." },
      { question: "What is unrealized P&L?", answer: "Current profit/loss on open positions. Becomes realized when closed." },
      { question: "How do I calculate for short positions?", answer: "Entry Price - Exit Price = profit. Negative if loss." },
      { question: "What about fees and commissions?", answer: "Subtract fees from gross P&L for net result." },
      { question: "Can I calculate for multiple trades?", answer: "Sum individual trade P&Ls for total performance." },
      { question: "What is cumulative P&L?", answer: "Total of all closed positions over a period." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows breakeven?", answer: "Yes, calculates breakeven after fees." }
    ],
    relatedCalculators: [
      { name: 'Position Size', path: '/position-size-calculator.html', icon: TrendingUp },
      { name: 'Risk Reward', path: '/risk-reward-calculator.html', icon: TrendingUp },
      { name: 'Stop Loss', path: '/stop-loss-calculator.html', icon: TrendingUp }
    ]
  },
  stop_loss_calculator: {
    title: "Calculate Stop Loss with Our",
    subtitle: "Stop Loss Calculator",
    introduction: "Calculate appropriate stop loss levels based on position size and risk amount. Set exit points to limit potential losses.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Stop Loss</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Stop loss = Entry - (Risk Amount / Quantity) for long positions. Protects capital by limiting maximum loss per trade.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Placement Strategies</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Place below support for longs, above resistance for shorts.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is a stop loss?", answer: "An order to exit a position at a predetermined price to limit losses." },
      { question: "How do I calculate stop loss?", answer: "Set at price where loss equals your risk amount. Adjust for position size." },
      { question: "Should I use percentage or fixed stop?", answer: "Percentage of account is more consistent for risk management." },
      { question: "What is a trailing stop?", answer: "Stop that moves as price moves, locking in profits." },
      { question: "How far should stop be from entry?", answer: "Based on technical levels, not arbitrary distance." },
      { question: "What about gap risk?", answer: "Leave buffer for normal market gaps. Use mental stop if concerned." },
      { question: "Should I use guaranteed stop?", answer: "Pay for guarantee if market is volatile or low liquidity." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows risk amount?", answer: "Yes, calculates dollar risk at each stop level." }
    ],
    relatedCalculators: [
      { name: 'Position Size', path: '/position-size-calculator.html', icon: TrendingUp },
      { name: 'Risk Reward', path: '/risk-reward-calculator.html', icon: TrendingUp },
      { name: 'Breakeven Calculator', path: '/breakeven-calculator.html', icon: TrendingUp }
    ]
  },
  breakeven_calculator: {
    title: "Calculate Breakeven with Our",
    subtitle: "Breakeven Calculator",
    introduction: "Calculate the breakeven price after accounting for all fees and commissions. Essential for knowing true profit requirements.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Breakeven</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Breakeven = Entry Price + (Total Fees / Quantity). Must exceed this to make any profit.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Impact of Fees</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Even small fees significantly impact breakeven for frequent trading.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is breakeven price?", answer: "Price at which you recover all costs including fees. Any higher is profit." },
      { question: "How do I calculate breakeven?", answer: "Entry price plus all costs divided by quantity." },
      { question: "What fees should I include?", answer: "Commission, spread, slippage, and any other transaction costs." },
      { question: "Does breakeven change with position size?", answer: "Percentage-based fees have constant breakeven; fixed fees vary." },
      { question: "How does this affect trading?", answer: "High-frequency traders must be aware of cumulative fee impact." },
      { question: "What about short selling?", answer: "Include borrow costs and dividends paid in breakeven." },
      { question: "Can I reduce breakeven?", answer: "Negotiate lower commissions, choose efficient brokers." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows profit after fees?", answer: "Yes, calculates net profit after all costs." }
    ],
    relatedCalculators: [
      { name: 'P&L Calculator', path: '/pnl-calculator.html', icon: TrendingUp },
      { name: 'Commission', path: '/commission-calculator.html', icon: TrendingUp },
      { name: 'Margin Calculator', path: '/margin-calculator.html', icon: TrendingUp }
    ]
  },
  kelly_criterion_calculator: {
    title: "Calculate Kelly Criterion with Our",
    subtitle: "Kelly Criterion Calculator",
    introduction: "The Kelly Criterion calculates optimal bet size based on win rate and win/loss ratio. Used for optimal capital allocation in trading.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Kelly Criterion</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Kelly % = W - (1-W)/R, where W is win rate and R is win/loss ratio. Represents optimal % of bankroll to risk.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Fractional Kelly</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Many use half-Kelly to reduce volatility while still capturing most growth.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is Kelly Criterion?", answer: "A formula for determining optimal position size based on edge and odds." },
      { question: "How do I use it?", answer: "Calculate your win rate and average win/loss ratio, then apply formula." },
      { question: "What is fractional Kelly?", answer: "Using less than full Kelly (e.g., half) to reduce variance." },
      { question: "Why use Kelly?", answer: "Maximizes long-term growth rate of capital mathematically." },
      { question: "What if Kelly is negative?", answer: "No edge exists; don't take the bet." },
      { question: "What is full Kelly?", answer: "Using the full calculated percentage. High volatility." },
      { question: "How accurate does my win rate need to be?", answer: "Accurate estimation is critical; errors lead to overbetting." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows optimal size?", answer: "Yes, calculates recommended % of bankroll." }
    ],
    relatedCalculators: [
      { name: 'Position Size', path: '/position-size-calculator.html', icon: TrendingUp },
      { name: 'Risk Reward', path: '/risk-reward-calculator.html', icon: TrendingUp },
      { name: 'Risk of Ruin', path: '/risk-of-ruin-calculator.html', icon: TrendingUp }
    ]
  },
  risk_of_ruin_calculator: {
    title: "Calculate Risk of Ruin with Our",
    subtitle: "Risk of Ruin Calculator",
    introduction: "Calculate the probability of losing your entire bankroll given your win rate, risk per trade, and number of trades.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Risk of Ruin</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Risk of ruin is the probability of reaching zero before reaching a target, given the randomness of trading outcomes.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Risk Reduction</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Lower risk per trade dramatically reduces risk of ruin.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is risk of ruin?", answer: "Probability of losing your entire bankroll before reaching your goal." },
      { question: "How is it calculated?", answer: "Using formulas based on win rate, win/loss ratio, and risk per trade." },
      { question: "What is a good risk of ruin?", answer: "Less than 1% is often considered acceptable." },
      { question: "Does win rate matter?", answer: "Yes, higher win rate reduces ruin probability significantly." },
      { question: "What about losing streaks?", answer: "Worst-case losing streak is accounted for in ruin calculations." },
      { question: "How do I reduce risk of ruin?", answer: "Lower risk per trade, increase win rate, improve win/loss ratio." },
      { question: "What is safe risk percentage?", answer: "Below 2% is common; 1% is very conservative." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows probability?", answer: "Yes, displays probability as percentage." }
    ],
    relatedCalculators: [
      { name: 'Position Size', path: '/position-size-calculator.html', icon: TrendingUp },
      { name: 'Kelly Criterion', path: '/kelly-criterion-calculator.html', icon: TrendingUp },
      { name: 'Drawdown', path: '/drawdown-calculator.html', icon: TrendingUp }
    ]
  },
  trading_cagr_calculator: {
    title: "Calculate CAGR for Trading with Our",
    subtitle: "Trading CAGR Calculator",
    introduction: "Calculate the Compound Annual Growth Rate of your trading account. Measure your true annual return accounting for the effect of compounding.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Trading CAGR</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          CAGR = (Final/Beginning)^(1/years) - 1. Shows smoothed annual return over the trading period.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">vs Total Return</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            CAGR is more meaningful than total return for comparing different time periods.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is trading CAGR?", answer: "Annualized return showing what return would be if compounded each year." },
      { question: "How do I calculate CAGR?", answer: "Divide final by beginning, raise to power of 1/years, subtract 1." },
      { question: "Why use CAGR instead of average?", answer: "CAGR accounts for compounding effect and is more accurate." },
      { question: "What is a good trading CAGR?", answer: "Consistency matters more than extreme returns. 10-20% is strong." },
      { question: "Does it account for deposits?", answer: "Use net return accounting for all deposits and withdrawals." },
      { question: "What about fees?", answer: "Use net returns after all fees for accurate CAGR." },
      { question: "Can I compare to benchmarks?", answer: "Yes, compare your CAGR to index returns for context." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows yearly breakdown?", answer: "Yes, displays annual returns." }
    ],
    relatedCalculators: [
      { name: 'P&L Calculator', path: '/pnl-calculator.html', icon: TrendingUp },
      { name: 'Drawdown', path: '/drawdown-calculator.html', icon: TrendingUp },
      { name: 'ROI Calculator', path: '/roi-calculator.html', icon: TrendingUp }
    ]
  },
  drawdown_calculator: {
    title: "Calculate Drawdown with Our",
    subtitle: "Drawdown Calculator",
    introduction: "Calculate the drawdown (peak to trough decline) of your trading account. Important metric for understanding risk and capital preservation.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Drawdown</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Drawdown = (Peak - Trough) / Peak. Maximum drawdown is the largest peak-to-trough decline.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Recovery</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            50% drawdown requires 100% gain to recover. This is why avoiding large drawdowns is crucial.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is drawdown?", answer: "The decline from peak equity to subsequent trough." },
      { question: "What is maximum drawdown?", answer: "The largest peak-to-trough decline over a period." },
      { question: "How do I calculate drawdown?", answer: "Divide the drop by the peak value. Express as percentage." },
      { question: "Why is drawdown important?", answer: "Large drawdowns are hard to recover from and indicate high risk." },
      { question: "What is a good maximum drawdown?", answer: "Less than 20% is often considered acceptable for active trading." },
      { question: "How long does it take to recover?", answer: "Depends on returns. Higher returns = faster recovery." },
      { question: "Can I reduce drawdown?", answer: "Use smaller position sizes, lower risk per trade, add diversification." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows current drawdown?", answer: "Yes, compares current equity to peak." }
    ],
    relatedCalculators: [
      { name: 'P&L Calculator', path: '/pnl-calculator.html', icon: TrendingUp },
      { name: 'Risk of Ruin', path: '/risk-of-ruin-calculator.html', icon: TrendingUp },
      { name: 'CAGR Calculator', path: '/cagr-calculator.html', icon: TrendingUp }
    ]
  },
  margin_calculator: {
    title: "Calculate Margin with Our",
    subtitle: "Margin Calculator",
    introduction: "Calculate the margin required for trading positions. Understand how much capital is needed to open and maintain positions.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Understanding Margin</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Required Margin = Contract Size × Leverage × Price / Account Currency. Margin allows controlled position sizing.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Leverage</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Higher leverage = lower margin requirement but higher risk.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is margin in trading?", answer: "The collateral required to open and maintain a leveraged position." },
      { question: "How do I calculate margin required?", answer: "Position value divided by leverage. 100:1 leverage = 1% margin." },
      { question: "What is initial margin?", answer: "Margin required to open a position." },
      { question: "What is maintenance margin?", answer: "Minimum margin to keep position open. Usually lower than initial." },
      { question: "What happens if margin drops?", answer: "Margin call or forced liquidation occurs when margin falls below minimum." },
      { question: "What is used vs free margin?", answer: "Used margin is locked; free margin is available for new positions." },
      { question: "Does margin requirement change?", answer: "Yes, based on leverage, volatility, and broker rules." },
      { question: "Is this free?", answer: "Yes, 100% free." },
      { question: "Works on mobile?", answer: "Yes, fully responsive." },
      { question: "Shows margin call level?", answer: "Yes, calculates estimated margin call price." }
    ],
    relatedCalculators: [
      { name: 'Position Size', path: '/position-size-calculator.html', icon: TrendingUp },
      { name: 'Leverage Calculator', path: '/leverage-calculator.html', icon: TrendingUp },
      { name: 'P&L Calculator', path: '/pnl-calculator.html', icon: TrendingUp }
    ]
  },
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

const getRandomRelatedCalculators = (currentId: string, count: number = 5): Array<{ name: string; path: string; icon?: any }> => {
  const allKeys = Object.keys(SEO_DATA).filter(key => key !== currentId);
  
  const shuffled = allKeys.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  return selected.map(key => {
    const item = SEO_DATA[key];
    return {
      name: item.subtitle.replace('Calculator', '').trim(),
      path: `/${key.replace(/_/g, '-')}.html`,
      icon: item.relatedCalculators[0]?.icon || Calculator
    };
  });
};

export const getSEOContent = (id: string, category: string = 'finance'): CalculatorSEOContent => {
  const content = SEO_DATA[id];
  if (content) {
    const randomRelated = getRandomRelatedCalculators(id, 5);
    return {
      ...content,
      relatedCalculators: randomRelated
    };
  }

  const fallbackRelated = getRandomRelatedCalculators(id, 5);

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
    relatedCalculators: fallbackRelated
  };
};

