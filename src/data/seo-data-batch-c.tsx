import type { CalculatorSEOContent } from './seo-data';

// Owned by content agent C (scientific + programming + construction + trading). Fill with unique entries.
export const SEO_DATA_BATCH_C: Record<string, CalculatorSEOContent> = {
  'scientific-calculator': {
    title: "Scientific Functions, Roots and Trig with Our",
    subtitle: "Scientific Calculator",
    introduction: "A scientific calculator is the workhorse of every algebra, trigonometry and physics course, and this online version keeps the whole toolkit one click away. Beyond plain addition it handles square roots, powers, logarithms, natural logs, sine, cosine and tangent, and the constant π, inside an expression buffer that respects the order of operations, so 2 + 3 × 4 evaluates to 14 rather than 20. Students use it to double-check quadratic roots and compound-interest arithmetic, while engineers, technicians and hobbyists reach for it when a spreadsheet is overkill and a phone app wants an account. Two habits separate correct answers from confident-looking wrong ones. First, know your angle mode: geometry problems are almost always written in degrees, but calculus, physics and every programming language use radians, so sin(30) means something completely different in each system. Second, respect precedence and parentheses. This page explains both, along with the function definitions, the identities worth memorising, and the small entry mistakes that cause most errors in exams and lab reports.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">What a Scientific Calculator Adds Over a Basic One</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A four-function calculator only adds, subtracts, multiplies and divides. A scientific calculator adds the functions algebra and physics actually use: square root, powers such as x², log base 10, natural logarithm ln (base e), the trigonometric ratios and their inverses, and the constants π and e. Each function button applies to the number currently on the display, and the buffer then combines those results with +, −, × and ÷ while keeping the standard precedence, where multiplication and division are completed before addition and subtraction. Parentheses override that default completely: (2 + 3) × 4 is 20, while 2 + 3 × 4 is 14. Getting that single distinction right removes the largest source of marks lost in introductory algebra.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Radians First: the Angle Mode Trap</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Trigonometric functions are evaluated in radians, the convention used by JavaScript, Python, MATLAB and every scientific library. One radian is the angle that cuts an arc equal to the radius, so a full turn is 2π radians (about 6.2832) and 180° equals π radians exactly. If your problem is written in degrees, convert first: 30° × π ÷ 180 = 0.5236 rad, and sin(0.5236) = 0.5. Skip the conversion and sin(30) returns roughly −0.9880, an answer that looks perfectly ordinary but has nothing to do with the triangle you were solving. The same trap appears in physics whenever an angular velocity or a phase shift is quoted in degrees instead of radians.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Identities That Let You Check Your Own Answer</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          You rarely need to trust a single keystroke. The Pythagorean identity sin²θ + cos²θ = 1 must hold for every angle, so if your calculator reports sin(50°) = 0.7660 and cos(50°) = 0.6428, then 0.7660² + 0.6428² should land within rounding error of 1. Because tan θ = sin θ ÷ cos θ, a tangent result can be cross-checked by dividing the two values you already have, and the inverse functions reverse the process: asin(0.5) should return 30° (0.5236 rad). Special angles memorised once — 0°, 30°, 45°, 60°, 90° — let you spot a degree/radian mistake immediately, because sin(45°) is 0.7071, never 0.8509.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Round only at the very end: keep all the digits your calculator shows until the final answer, because early rounding is what makes hand checks disagree with the tool. For cube roots use the power key with a fraction, 8^(1/3) = 2, since √ only takes square roots. And when a logarithm or a root returns an error, the usual culprit is a negative input — square roots and real logarithms both reject negatives.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the difference between a scientific calculator and a basic calculator?", answer: "A basic calculator only adds, subtracts, multiplies and divides. A scientific calculator adds roots, powers, logarithms, trigonometric and inverse trigonometric functions, π and e, and it evaluates expressions in the correct order of operations." },
      { question: "Should I use degrees or radians?", answer: "Use degrees for school geometry and surveying problems, and radians for calculus, physics and anything coming from code. This calculator applies trigonometric functions in radians, so convert degrees with degrees × π ÷ 180 first." },
      { question: "What does sin(30) return if I forget to convert from degrees?", answer: "About −0.9880, because 30 is read as 30 radians. The correct value for 30 degrees is sin(π ÷ 6) = 0.5." },
      { question: "How do I raise a number to a power?", answer: "Use the power key: press x² for squares, or enter base ^ exponent for any power, for example 2 ^ 10 = 1024." },
      { question: "What is the difference between log and ln?", answer: "log is the base 10 logarithm, so log(1000) = 3. ln is the natural logarithm with base e ≈ 2.71828, so ln(e²) = 2. Both answer the same question: what exponent gives this number?" },
      { question: "Why does tan(90°) return an error?", answer: "tan θ = sin θ ÷ cos θ and cos(90°) = 0, so the ratio involves a division by zero. The tangent function genuinely has no value there; the graph has a vertical asymptote." },
      { question: "How do I take a cube root or any nth root?", answer: "Raise to the reciprocal power: the cube root of 27 is 27 ^ (1 ÷ 3) = 3, and the fifth root of 32 is 32 ^ 0.2 = 2." },
      { question: "Why is sin(π) not exactly zero?", answer: "π cannot be stored perfectly in a computer, it is stored as 3.141592653589793, so sin(π) returns a tiny number near 1.2 × 10⁻¹⁶ instead of exactly 0. Treat any result smaller than about 10⁻¹² as zero." },
      { question: "How many digits of precision does the result keep?", answer: "Calculations run in double precision, roughly 15 to 16 significant digits, and function results are displayed to six decimal places so long tails stay readable." },
      { question: "Is this scientific calculator free to use?", answer: "Yes, it is free, needs no account, and every calculation runs locally in your browser." }
    ],
    relatedCalculators: [
      { name: 'Scientific Constants', path: '/scientific-constants.html' },
      { name: 'Trigonometric', path: '/trigonometric-calculator.html' },
      { name: 'Graphing', path: '/graphing-calculator.html' },
      { name: 'Logarithmic', path: '/logarithmic-calculator.html' }
    ],
    howWeCalculate: {
      formula: "sin θ, cos θ, tan θ, log₁₀ x, ln x, √x, x² — with × and ÷ evaluated before + and −",
      explanation: "Each function button is applied to the value on the display using double-precision floating point arithmetic, then the expression buffer folds that result into the surrounding sum using the standard precedence rules. Trigonometric input is in radians, and logarithms reject values below zero.",
      example: "2 + 3 × 4 = 14, sin(π ÷ 6) = 0.5, log₁₀(1000) = 3"
    },
    workedExample: {
      scenario: "Evaluate 2 + 3 × 4² − √16 for a lab notebook check",
      steps: [
        "Square first because powers beat multiplication: 4² = 16",
        "Multiply: 3 × 16 = 48",
        "Add: 2 + 48 = 50",
        "Subtract the root: 50 − √16 = 50 − 4 = 46"
      ],
      result: "46"
    },
    commonValues: {
      heading: "Scientific calculator values worth memorising",
      columns: ["Expression", "Result"],
      rows: [
        ["sin(30°)", "0.5"],
        ["cos(60°)", "0.5"],
        ["tan(45°)", "1"],
        ["log₁₀(1000)", "3"],
        ["ln(e²)", "2"],
        ["√144", "12"],
        ["2¹⁰", "1024"],
        ["π × 10²", "314.159"]
      ]
    }
  },
  'basic-arithmetic-calculator': {
    title: "Everyday Arithmetic Made Easy with Our",
    subtitle: "Basic Arithmetic Calculator",
    introduction: "Addition, subtraction, multiplication and division are the four operations every other calculator in this collection is built on, and this tool does them without ceremony: enter two numbers, pick an operator, read the answer. It also covers modulo, which returns the remainder after division, and powers, which raise a base to an exponent, so one screen covers the arithmetic you need for splitting a bill, checking an invoice, reconciling a bank balance or verifying a homework step. The arithmetic itself is trivial; the mistakes come from setup and interpretation. Entering the operands in the wrong order changes a subtraction completely, dividing by zero has no answer at all, and a remainder is not the same thing as a percentage. This page walks through what each operation really means, why every operation has an inverse you can use to prove your result, and how order of operations still applies the moment you write an expression rather than pressing buttons.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Every Operation Has an Inverse — Use It to Check</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Addition and subtraction undo each other: if 47 + 58 = 105, then 105 − 58 must be 47. Multiplication is repeated addition, and division undoes it: 12 × 7 = 84 means 84 ÷ 12 = 7. That pairing is not just trivia, it is your built-in verification method. After any calculation, run the inverse operation with your answer and one of the inputs; if you do not land back on the other input, one of the two steps was wrong. Modulo works the same way as division with a twist — it reports only what is left over. 17 ÷ 5 = 3 remainder 2, so 17 % 5 = 2, and 17 % 2 = 1 tells you 17 is odd. Programmers use that parity test constantly, and scheduling logic uses it whenever something repeats every n days.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Order of Operations Still Applies</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The moment you write an expression instead of entering two numbers, precedence rules take over: exponents first, then multiplication and division from left to right, then addition and subtraction from left to right. So 100 − 5 × 10 is 50, not 950, and 24 ÷ 4 ÷ 3 is 2, not 8, because equal-precedence operators are processed left to right. Parentheses are the override switch — they force whatever is inside to evaluate first, which is why (100 − 5) × 10 = 950. When a result looks wildly wrong, read the expression the way the calculator does, operator by operator, before assuming the tool failed.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Division by zero has no answer because nothing multiplied by zero can produce a non-zero dividend, so the tool reports an error rather than guessing. Modulo is not percent: 25 % 4 is the remainder 1, while 25 % as a percentage means 25 out of 100. For powers, 3 ^ 4 = 81, and a negative exponent means one over the power — 2⁻³ = 1 ÷ 8 = 0.125.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the correct order of operations?", answer: "Exponents first, then multiplication and division from left to right, then addition and subtraction from left to right. Parentheses always win, so evaluate anything inside brackets before anything outside." },
      { question: "What happens when I divide by zero?", answer: "There is no valid answer, because no number multiplied by 0 gives a non-zero dividend. The calculator returns an error instead of a number." },
      { question: "What does the modulo operation do?", answer: "It returns the remainder of a division: 17 % 5 = 2 because 17 ÷ 5 leaves 2 over. Modulo 2 is the quickest odd/even test — an odd number always leaves 1." },
      { question: "How do I calculate a power?", answer: "Select the power operation and enter the base and exponent. For example base 3 with exponent 4 gives 3⁴ = 81." },
      { question: "Does the order of the two numbers matter?", answer: "For addition and multiplication it does not, but for subtraction and division it is everything: 10 − 4 = 6 while 4 − 10 = −6, and 10 ÷ 4 = 2.5 while 4 ÷ 10 = 0.4." },
      { question: "Can I enter negative numbers?", answer: "Yes. Enter a negative value such as −7 and the sign is carried through correctly, so −7 + 12 = 5 and −7 × 4 = −28." },
      { question: "Is modulo the same thing as a percentage?", answer: "No. Percentage means out of 100, so 25% of 80 is 20. Modulo means the remainder after dividing, so 25 % 8 = 1." },
      { question: "How do I multiply three numbers together?", answer: "Multiply the first two, then enter that product with the third number. Multiplying is associative, so (a × b) × c always equals a × (b × c)." },
      { question: "How do I verify my answer?", answer: "Apply the inverse operation. If the division 84 ÷ 12 gave 7, check 12 × 7 = 84. One reverse step catches almost every setup mistake." },
      { question: "Does it work on mobile?", answer: "Yes, the calculator is fully responsive and every calculation runs on your device." }
    ],
    relatedCalculators: [
      { name: 'Addition', path: '/addition-calculator.html' },
      { name: 'Percentage', path: '/percentage-calculator.html' },
      { name: 'Fraction', path: '/fraction-calculator.html' },
      { name: 'Scientific', path: '/scientific-calculator.html' }
    ],
    howWeCalculate: {
      formula: "a + b, a − b, a × b, a ÷ b, a % b, a ^ b",
      explanation: "The two inputs you provide are combined with the operator you select using double-precision arithmetic. Division by zero is rejected explicitly, modulo reports the remainder of the integer division, and powers use repeated multiplication through the standard exponential identity a^b = e^(b · ln a).",
      example: "84 ÷ 12 = 7 and 17 % 5 = 2 and 3 ^ 4 = 81"
    },
    workedExample: {
      scenario: "A team of four splits a $240 bill after a $60 discount, then each person pays their share",
      steps: [
        "Subtract the discount: 240 − 60 = 180",
        "Divide by the number of people: 180 ÷ 4 = 45",
        "Check with the inverse: 45 × 4 = 180, and 180 + 60 = 240"
      ],
      result: "$45 each"
    },
    commonValues: {
      heading: "Everyday arithmetic shortcuts",
      columns: ["Expression", "Result"],
      rows: [
        ["17 % 5", "2"],
        ["100 − 5 × 10", "50"],
        ["(100 − 5) × 10", "950"],
        ["3 ^ 4", "81"],
        ["2⁻³", "0.125"],
        ["1 ÷ 8", "0.125"],
        ["−7 + 12", "5"]
      ]
    }
  },
  'trigonometric-calculator': {
    title: "Explore Trigonometric Functions with Our Free",
    subtitle: "Trigonometric Calculator",
    introduction: "Trigonometry is the mathematics of angles and triangles, and it turns up everywhere an angle matters: roof pitches, navigation headings, alternating current, sound waves, projectile paths and the rotation of a carousel. This calculator evaluates the six trigonometric functions — sine, cosine, tangent, cotangent and their reciprocals — plus the inverse functions that hand an angle back to you, with a switch between degrees and radians and quick keys for the angles you use most. Start from a right triangle and the definitions are immediate: pick an angle, identify the opposite side, the adjacent side and the hypotenuse, and the three ratios follow. Move to the unit circle and the same functions describe any angle, including ones greater than 90°, which is how periodic phenomena get modelled. The sections below cover the triangle definitions, the special angles whose exact values are worth memorising, and the inverse functions that solve for the angle instead of the side.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">SOH CAH TOA: the Three Ratios</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          In a right triangle, sine is the opposite side divided by the hypotenuse, cosine is the adjacent side divided by the hypotenuse, and tangent is the opposite divided by the adjacent. The mnemonic SOH CAH TOA is enough to rebuild all three from scratch. Their reciprocals complete the set: cosecant is 1 ÷ sin, secant is 1 ÷ cos and cotangent is 1 ÷ tan, which equals cos θ ÷ sin θ. Because each ratio compares two lengths of the same triangle, its value depends only on the angle, never on how big the triangle is — a 3-4-5 triangle and a 300-400-500 triangle both give sin θ = 0.6 for the same angle. That scale invariance is exactly why trigonometry lets you measure a mountain you cannot reach.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Special Angles and the Unit Circle</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          On the unit circle of radius 1, every point is written (cos θ, sin θ), so reading a coordinate gives you a trigonometric value directly. The angles 0°, 30°, 45°, 60° and 90° produce the table every student memorises: sin 30° = 0.5, sin 45° = √2 ÷ 2 ≈ 0.7071, sin 60° = √3 ÷ 2 ≈ 0.8660, and cosine runs the same list backwards. Beyond 90° the coordinates change sign rather than stop, which is why sin 150° is still 0.5 and sin 210° is −0.5. Both functions repeat every 360°, or every 2π radians, so an angle and that angle plus a full revolution are indistinguishable to sine and cosine.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Inverse Functions: Solving for the Angle</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          When you know a ratio and want the angle, you need the inverse functions: asin, acos and atan (sometimes written sin⁻¹, cos⁻¹ and tan⁻¹). If a ramp rises 2 m over a 5 m slope, sin θ = 2 ÷ 5 = 0.4, so θ = asin(0.4) ≈ 23.58°. Each inverse has a restricted range so that it returns a single answer: asin and acos only output angles between −90° and 90° (acos between 0° and 180°), and atan returns between −90° and 90°. Their inputs are equally restricted — asin and acos reject anything outside −1 to 1, because no sine or cosine ratio can exceed 1 in magnitude.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Switch the unit selector to match the problem before you press anything: school triangle problems are usually in degrees, while physics and engineering equations are in radians. Use the quick angle keys for 30°, 45° and 60° to sanity-check a value against the memorised table, and remember tan θ = sin θ ÷ cos θ, so any tangent can be verified by dividing the two values you already trust.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the difference between sin, cos and tan?", answer: "They compare different sides of a right triangle: sin = opposite ÷ hypotenuse, cos = adjacent ÷ hypotenuse, tan = opposite ÷ adjacent. SOH CAH TOA is the standard way to remember which is which." },
      { question: "Degrees or radians — which should I pick?", answer: "Choose degrees when the angle is given in degrees (90°, 27°, 150°) and radians when it is given in π or comes from calculus or code. The unit switch on this calculator changes the interpretation of every function key." },
      { question: "What does the cotangent function do?", answer: "Cotangent is the reciprocal of tangent: cot θ = 1 ÷ tan θ = cos θ ÷ sin θ. It is undefined wherever tan θ is undefined, such as 0° and 180°." },
      { question: "How do inverse functions like asin differ from sin?", answer: "sin takes an angle and returns a ratio; asin takes a ratio between −1 and 1 and returns an angle. So sin(30°) = 0.5 while asin(0.5) = 30°." },
      { question: "Why is tan(90°) undefined?", answer: "Because tan θ = sin θ ÷ cos θ and cos(90°) = 0, giving a division by zero. The tangent graph has a vertical asymptote at that angle." },
      { question: "What is the exact value of sin 45°?", answer: "√2 ÷ 2 ≈ 0.7071. In a 45-45-90 triangle the two legs are equal, so the hypotenuse is leg × √2 and the ratio simplifies to 1 ÷ √2." },
      { question: "Why do sine and cosine repeat every 360°?", answer: "Going around a circle brings you back to the same coordinates, so the ratio depends only on your position on the circle. Adding a full turn of 360° (2π radians) never changes the value." },
      { question: "How do I find a missing side of a right triangle?", answer: "Pick the ratio that connects what you know to what you want. With a 65° angle and a 12 m hypotenuse, the opposite side is 12 × sin(65°) ≈ 10.88 m." },
      { question: "What does sin²θ + cos²θ = 1 mean?", answer: "It is the Pythagorean identity, the circle equation x² + y² = 1 written in trigonometric form. It holds for every angle and is the fastest way to catch a calculation mistake." },
      { question: "Is this trigonometric calculator free?", answer: "Yes, it is free to use and runs entirely in your browser with no sign-up." }
    ],
    relatedCalculators: [
      { name: 'Trigonometry', path: '/trigonometry-calculator.html' },
      { name: 'Scientific', path: '/scientific-calculator.html' },
      { name: 'Graphing', path: '/graphing-calculator.html' },
      { name: 'Vector', path: '/vector-calculator.html' }
    ],
    howWeCalculate: {
      formula: "sin θ = opposite ÷ hypotenuse; cos θ = adjacent ÷ hypotenuse; tan θ = opposite ÷ adjacent; θ_rad = θ_deg × π ÷ 180",
      explanation: "The angle you enter is converted to the unit selected, then each ratio is evaluated as a division of two side lengths, or of the two coordinates on the unit circle. Inverse functions reverse the process and return the angle whose ratio matches your input.",
      example: "Right triangle, hypotenuse 10 and angle 30°: opposite = 10 × sin(30°) = 5"
    },
    workedExample: {
      scenario: "A 12 m ladder rests against a wall, making 65° with the ground. How high does it reach and how far out is its base?",
      steps: [
        "Identify the parts: hypotenuse 12 m, angle to ground 65°, unknown height is the opposite side",
        "Height = 12 × sin(65°) = 12 × 0.9063 = 10.88 m",
        "Base distance = 12 × cos(65°) = 12 × 0.4226 = 5.07 m",
        "Check with Pythagoras: 10.88² + 5.07² ≈ 144 = 12²"
      ],
      result: "Height ≈ 10.88 m, base ≈ 5.07 m"
    },
    commonValues: {
      heading: "Exact trigonometric values for special angles",
      columns: ["Angle", "sin θ", "cos θ", "tan θ"],
      rows: [
        ["0°", "0", "1", "0"],
        ["30°", "0.5", "0.8660", "0.5774"],
        ["45°", "0.7071", "0.7071", "1"],
        ["60°", "0.8660", "0.5", "1.7321"],
        ["90°", "1", "0", "undefined"]
      ]
    }
  },
  'logarithmic-calculator': {
    title: "Master Logarithmic Calculations with Our",
    subtitle: "Logarithmic Calculator",
    introduction: "A logarithm answers one question: what exponent must a base be raised to, in order to produce this number? If 2⁵ = 32 then log₂(32) = 5; if 10³ = 1000 then log₁₀(1000) = 3. That single idea compresses enormous ranges into small, manageable numbers, which is why logarithmic scales describe the acidity of a solution (pH), the loudness of a sound (decibels), the energy of an earthquake (Richter magnitude), the brightness of a star (apparent magnitude) and the complexity of an algorithm (big O). This calculator takes any base you type, evaluates the logarithm exactly, and also runs the exponential functions that invert it, so you can move forwards and backwards along a scale without losing track of which direction you are travelling. The sections below explain the definition you should internalise, the three bases that cover almost all real work, and the handful of log rules that turn awkward multiplications into simple additions.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Definition That Does All the Work</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          log_b(x) = y means exactly the same thing as bʸ = x, with one condition: the base b must be positive and not equal to 1, and x must be greater than 0. Read in either direction and the same fact appears — log₂(64) = 6 because 2⁶ = 64, and 2⁶ = 64 because log₂(64) = 6. Working backwards from the definition solves exponential equations by hand: to solve 3ˣ = 81, either spot that 3⁴ = 81, or take log base 3 of both sides to get x = log₃(81) = 4. The base decides the direction of the curve: above 1 the logarithm grows slowly but without bound, while a base between 0 and 1 decreases instead, which is why a decay factor written as (0.5)ⁿ can also be expressed with a negative exponent.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">The Three Bases You Will Actually Meet</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Base 10 is the common logarithm, chosen because our number system is decimal: log₁₀(1000) = 3 counts the zeros. Base e (e ≈ 2.71828) is the natural logarithm, ln, which appears whenever growth is proportional to the current quantity — populations, compound interest, radioactive decay and capacitor charging all produce ln. Base 2 is the binary logarithm, used constantly in computing: log₂(1024) = 10, and n bits can encode 2ⁿ distinct values, so a 16-bit channel carries log₂(65536) = 16 states. Any other base can be evaluated from ln using the change of base identity, which is how the calculator handles bases like 7 or 0.25 without needing a separate algorithm for each.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Log Rules: Products Become Sums</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Three identities cover nearly every manipulation: log(ab) = log(a) + log(b), log(a ÷ b) = log(a) − log(b), and log(aⁿ) = n × log(a), all valid for any base as long as the base is the same throughout. The last rule is the practical one — it converts powers into multiplication, which is how slide rules once worked and how log-log plots straighten power laws today. A common error is adding logarithms that use different bases; log₁₀(2) + ln(2) has no simplification at all, because the units, so to speak, do not match. Check your work with the anchor values: every logarithm of 1 is 0, and the logarithm of the base itself is always 1.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Values between 0 and 1 produce negative logarithms — log₁₀(0.01) = −2 — because the exponent must be negative to reach a fraction. Zero has no logarithm: the limit of log₁₀(x) as x approaches 0 slides towards minus infinity, so the calculator reports an error rather than a number. When a problem mixes bases, convert everything with ln before you combine anything.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What does a logarithm actually tell me?", answer: "It tells you the exponent. log_b(x) = y asks: what power must b be raised to, to get x? Since 10³ = 1000, log₁₀(1000) = 3." },
      { question: "How do I find a logarithm with a base the calculator does not list?", answer: "Enter the custom base. Any base greater than 0 and not equal to 1 works, and it is evaluated internally with the change of base identity log_b(x) = ln(x) ÷ ln(b)." },
      { question: "Why is the logarithm of a negative number undefined?", answer: "A positive base raised to any real power is always positive, so no exponent can produce a negative result. The logarithm of zero or below is not a real number." },
      { question: "What is the difference between log and ln?", answer: "log uses base 10 and ln uses base e. log₁₀(1000) = 3, while ln(e³) = 3. To convert, divide two logs in the same base: log_b(x) = ln(x) ÷ ln(b)." },
      { question: "How is pH calculated?", answer: "pH = −log₁₀ of the hydrogen ion concentration in mol/L. A 0.0001 M solution gives −log₁₀(10⁻⁴) = 4, and every unit of pH is a tenfold change in concentration." },
      { question: "How do decibels use logarithms?", answer: "dB = 10 × log₁₀(P₁ ÷ P₂) for power. Because the scale is logarithmic, doubling power adds 10 × log₁₀(2) ≈ 3.01 dB, and multiplying power by 10 adds exactly 10 dB." },
      { question: "Why does a logarithm of a very small number come out negative?", answer: "Small positive numbers are fractions, and a fraction requires a negative exponent: 0.001 = 10⁻³, so log₁₀(0.001) = −3. The value stays defined as long as the input is above zero." },
      { question: "Which rules handle products and powers?", answer: "log(ab) = log(a) + log(b), log(a ÷ b) = log(a) − log(b), and log(aⁿ) = n × log(a). All three require the same base on every term." },
      { question: "What is log base 2 used for?", answer: "It counts bits. n bits hold 2ⁿ values, so log₂(4096) = 12 tells you a 4096-entry table needs 12 bits, and information entropy is measured in bits using log₂." },
      { question: "Is this logarithmic calculator free to use?", answer: "Yes, it is free and private — nothing you enter leaves your browser." }
    ],
    relatedCalculators: [
      { name: 'Exponential', path: '/exponential-calculator.html' },
      { name: 'Logarithm', path: '/logarithm-calculator.html' },
      { name: 'Scientific', path: '/scientific-calculator.html' },
      { name: 'Graphing', path: '/graphing-calculator.html' }
    ],
    howWeCalculate: {
      formula: "log_b(x) = y where bʸ = x; change of base: log_b(x) = ln(x) ÷ ln(b)",
      explanation: "The requested base is used to invert the exponential function. In practice the natural logarithm of the input is divided by the natural logarithm of the base, an identity that is exact for every valid base, then the result is rounded for display. Inputs of zero or below are rejected because no real logarithm exists there.",
      example: "log₂(1024) = ln(1024) ÷ ln(2) = 6.9315 ÷ 0.6931 = 10"
    },
    workedExample: {
      scenario: "A sound level meter reads 85 dB. What is the intensity of that sound, given the reference threshold I₀ = 10⁻¹² W/m²?",
      steps: [
        "Write the decibel definition: L = 10 × log₁₀(I ÷ I₀)",
        "Divide both sides by 10: 8.5 = log₁₀(I ÷ I₀)",
        "Rewrite in exponential form: I ÷ I₀ = 10^8.5 = 3.162 × 10⁸",
        "Multiply by I₀: I = 10⁻¹² × 3.162 × 10⁸ = 3.16 × 10⁻⁴ W/m²"
      ],
      result: "I ≈ 3.16 × 10⁻⁴ W/m²"
    },
    commonValues: {
      heading: "Logarithms worth knowing by heart",
      columns: ["Expression", "Value"],
      rows: [
        ["log₁₀(1000)", "3"],
        ["log₂(64)", "6"],
        ["ln(e³)", "3"],
        ["log₁₀(0.01)", "−2"],
        ["log₅(125)", "3"],
        ["log₁₀(2)", "0.3010"],
        ["log₇(49)", "2"]
      ]
    }
  },
  'complex-number-calculator': {
    title: "Complex Number Arithmetic Made Simple with",
    subtitle: "Complex Number Calculator",
    introduction: "Complex numbers extend the number line into a plane. Every number is written a + bi, where a is the real part, b is the imaginary part and i is the imaginary unit defined by i² = −1. They exist because some perfectly ordinary equations have no real answer: x² + 1 = 0 asks for a number whose square is −1, and i is the name we give to it. Once defined, complex arithmetic behaves exactly like algebra with one extra substitution rule, replace i² with −1 and continue. Engineers use them daily without a second thought — impedance in an alternating current circuit is a complex number, the Fourier transforms behind audio compression are complex-valued, and control systems are analysed in the complex s-plane. This calculator handles addition, subtraction, multiplication, division, conjugates, moduli and the polar form, so you can check a hand calculation in seconds instead of re-deriving it at every step.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Add by Parts, Multiply by Foil</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Addition and subtraction are component-wise: add the real parts together and the imaginary parts together, so (2 + 3i) + (4 − i) = 6 + 2i. Multiplication uses ordinary double distribution, the FOIL method, with one substitution at the end. Expanding (2 + 3i)(1 + i) gives 2 + 2i + 3i + 3i², and because i² = −1 the last term becomes −3, leaving −1 + 5i. That is the entire rule: multiply as though i were a variable, then simplify every i² you produced. Multiplication is commutative and associative for complex numbers, the same as for reals, but it is not the same as multiplying the parts separately — (2 + 3i) × 5 is 10 + 15i, while |2 + 3i| × 5 would give a different, purely magnitude-based answer.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Division Runs Through the Conjugate</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          You cannot leave an i in the denominator of a final answer, so division multiplies the top and bottom by the conjugate of the denominator. The conjugate of c + di is c − di, and the product (c + di)(c − di) = c² + d² is guaranteed to be real. Dividing (5 + 3i) by (1 − 2i) therefore means multiplying by (1 + 2i) over (1 + 2i): the numerator expands to −1 + 13i and the denominator becomes 5, giving −0.2 + 2.6i. The same trick appears whenever a quadratic with a negative discriminant is solved by the quadratic formula, because the two roots are complex conjugates of each other and have the same modulus.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Modulus, Polar Form and Euler's Formula</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The modulus |z| = √(a² + b²) is the distance from the origin to the point (a, b), so |3 + 4i| = 5. Pairing it with the argument θ (the angle from the positive real axis) gives the polar form z = r(cos θ + i sin θ), usually written r·e^(iθ). Euler's formula ties this to the exponential function: e^(iθ) = cos θ + i sin θ, and at θ = π it collapses to the famous e^(iπ) + 1 = 0. Polar form makes multiplication and division almost trivial — multiply the moduli and add the arguments, or divide the moduli and subtract the arguments — which is why engineers multiply signals as rotations rather than expanding brackets every time.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            The modulus of a product always equals the product of the moduli, so |z₁ × z₂| = |z₁| × |z₂| — a fast check on any multiplication. Every complex number has exactly two square roots, which are negatives of each other, and conjugating twice returns you to where you started. If a polynomial with real coefficients has a complex root, its conjugate is a root as well.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the imaginary unit i?", answer: "It is the symbol defined by i² = −1, introduced so that equations like x² + 1 = 0 have a solution. Since i² = −1, higher powers cycle: i³ = −i and i⁴ = 1." },
      { question: "What do the parts of a + bi represent?", answer: "a is the real part and b is the imaginary part. The number 3 + 4i sits at the point (3, 4) on the complex plane, three units right and four units up." },
      { question: "How do I multiply two complex numbers?", answer: "Distribute like normal algebra and replace every i² with −1. So (2 + 3i)(1 + i) = 2 + 2i + 3i + 3i² = 2 + 5i − 3 = −1 + 5i." },
      { question: "Why do I multiply by the conjugate when dividing?", answer: "Because (c + di)(c − di) = c² + d² is a real number. Multiplying numerator and denominator by the denominator's conjugate clears the i from the bottom in one step." },
      { question: "What is a complex conjugate?", answer: "Flip the sign of the imaginary part: the conjugate of 7 − 2i is 7 + 2i. It mirrors the number across the real axis and is the standard tool for division." },
      { question: "How do I find the modulus?", answer: "Use |z| = √(a² + b²), the Pythagorean distance from the origin. For 3 + 4i that is √(9 + 16) = 5." },
      { question: "What is polar form and why is it useful?", answer: "Polar form writes z as r(cos θ + i sin θ) or r e^{iθ}. Multiplication then only multiplies the radii r and adds the angles θ, which is far faster than expanding brackets." },
      { question: "Are real numbers complex numbers too?", answer: "Yes. Any real number a is the complex number a + 0i, sitting on the real axis with an imaginary part of zero." },
      { question: "Where do complex numbers appear outside textbooks?", answer: "In alternating current circuits as impedance, in audio and image compression via Fourier transforms, in control theory poles and stability, and whenever a quadratic has a negative discriminant." },
      { question: "Is this complex number calculator free?", answer: "Yes, it is free to use and processes every value locally in your browser." }
    ],
    relatedCalculators: [
      { name: 'Quadratic', path: '/quadratic-calculator.html' },
      { name: 'Graphing', path: '/graphing-calculator.html' },
      { name: 'Scientific', path: '/scientific-calculator.html' },
      { name: 'Vector', path: '/vector-calculator.html' }
    ],
    howWeCalculate: {
      formula: "(a + bi) + (c + di) = (a + c) + (b + d)i; (a + bi)(c + di) = (ac − bd) + (ad + bc)i; (a + bi) ÷ (c + di) = [(ac + bd) + (bc − ad)i] ÷ (c² + d²)",
      explanation: "Operations are applied to the real and imaginary parts separately, with the identity i² = −1 used to simplify products. Division multiplies through by the conjugate of the denominator so the result ends up in standard a + bi form, and the modulus uses the Pythagorean distance of that point from the origin.",
      example: "(3 + 2i)(1 − 4i) = 3 − 12i + 2i − 8i² = 11 − 10i"
    },
    workedExample: {
      scenario: "Evaluate (5 + 3i) ÷ (1 − 2i) and report the modulus of the result",
      steps: [
        "Multiply numerator and denominator by the conjugate 1 + 2i",
        "Numerator: (5 + 3i)(1 + 2i) = 5 + 10i + 3i + 6i² = −1 + 13i",
        "Denominator: (1 − 2i)(1 + 2i) = 1² + 2² = 5",
        "Divide each part: −1 ÷ 5 + (13 ÷ 5)i = −0.2 + 2.6i",
        "Modulus: √(0.2² + 2.6²) = √6.8 ≈ 2.608"
      ],
      result: "−0.2 + 2.6i, modulus ≈ 2.608"
    },
    commonValues: {
      heading: "Complex operations at a glance",
      columns: ["Operation", "Result"],
      rows: [
        ["(2 + 3i) + (4 − i)", "6 + 2i"],
        ["(2 + 3i) − (4 − i)", "−2 + 4i"],
        ["(2 + 3i)(1 + i)", "−1 + 5i"],
        ["(1 + i)²", "2i"],
        ["|3 + 4i|", "5"],
        ["conj(7 − 2i)", "7 + 2i"],
        ["i⁴", "1"]
      ]
    }
  },
  'matrix-calculator': {
    title: "Compute Matrix Determinants and Inverses with Our",
    subtitle: "Matrix Calculator",
    introduction: "A matrix is a rectangle of numbers arranged in rows and columns, labelled by its dimensions as m × n for m rows and n columns. Matrices are not decorative tables: they are the language of linear transformations, systems of linear equations, 3D graphics, stochastic models and data sets. A rotation of a game character, a structural load balance, a page-rank score and a spreadsheet of exam results are all matrices, and the operations you perform on them — addition, multiplication, determinant, inverse — carry precise geometric meaning. Multiplication composes transformations, the determinant measures how much a transformation scales area or volume, and a determinant of zero announces that information has been crushed into a lower dimension and cannot be undone. This calculator handles the dimensions, validates that operations are even defined, and returns products, determinants and inverses so you can check every step of a hand computation.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">When Two Matrices Can Be Multiplied</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Multiplication is defined only when the first matrix has as many columns as the second has rows. A 2 × 3 matrix times a 3 × 4 matrix produces a 2 × 4 result; a 3 × 2 times a 3 × 4 is rejected outright because 2 does not equal 3. Each entry of the product is a dot product: the element in row i and column j equals row i of the left matrix multiplied term by term by column j of the right matrix, then summed. That is why the inner dimensions must line up. It is also why multiplication is not commutative — AB and BA are frequently different sizes, and even when both exist they rarely agree. Only multiplication with the identity matrix, a square matrix with 1s on the diagonal and 0s everywhere else, leaves a matrix untouched.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Determinant: The Number That Decides Invertibility</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          For a 2 × 2 matrix the determinant is ad − bc: for [[2, 1], [1, 3]] it is 6 − 1 = 5. For larger square matrices it is built from minors and cofactors, but the interpretation never changes. Geometrically it is the signed area or volume of the parallelepiped the matrix describes — a sign flip means the transformation reverses orientation. Algebraically, det = 0 means the matrix is singular: its rows are linearly dependent, the mapped space collapses, and no inverse exists. A useful shortcut is that the determinant of a triangular matrix, one with zeros either above or below the diagonal, is simply the product of its diagonal entries. Other shortcuts worth knowing: det(AB) = det(A) × det(B), swapping two rows flips the sign, and transposing a matrix does not change its determinant.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Solving Systems with the Inverse</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A square matrix A has an inverse A⁻¹ exactly when det(A) is not zero, and it satisfies A × A⁻¹ = I, the identity matrix. That identity turns the system Ax = b into x = A⁻¹b, which is the cleanest way to state the solution of any consistent linear system. For a 2 × 2 matrix the inverse is explicit: multiply the matrix [[d, −b], [−c, a]] by 1 ÷ (ad − bc). Notice the determinant sitting in the denominator — it is the reason a zero determinant makes an inverse impossible. In practice, Gaussian elimination and LU decomposition do this work numerically for larger systems, because explicitly forming an inverse is both slower and less stable than solving directly.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Write the dimensions above each matrix before you multiply anything; most errors are dimension mismatches rather than arithmetic slips. Check a product by computing one entry twice, and check a determinant against a 2 × 2 expansion. If you get det = 0, do not chase an inverse that cannot exist — the system either has no solution or infinitely many.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "When can two matrices be multiplied?", answer: "When the number of columns in the first equals the number of rows in the second. A 2 × 3 matrix times a 3 × 4 matrix is valid and gives a 2 × 4 result; a 3 × 2 times a 3 × 4 is not defined." },
      { question: "How do I calculate a 2 × 2 determinant?", answer: "For [[a, b], [c, d]] the determinant is ad − bc. For [[3, 8], [4, 6]] that is 3 × 6 − 8 × 4 = 18 − 32 = −14." },
      { question: "What does a determinant of zero mean?", answer: "The matrix is singular and has no inverse. Geometrically the transformation flattens space into a line or plane, and the linear system it represents has either no solution or infinitely many." },
      { question: "Is matrix multiplication commutative?", answer: "No. AB and BA are usually different matrices, and often only one of them is defined because the inner dimensions do not match." },
      { question: "What is an identity matrix?", answer: "A square matrix with 1s on the main diagonal and 0s elsewhere, written I. It behaves like the number 1: AI = IA = A for any compatible matrix A." },
      { question: "What is the transpose of a matrix?", answer: "The transpose swaps rows and columns, so the entry at row i column j moves to row j column i. It is written with a superscript T and does not change the determinant." },
      { question: "How do I invert a 2 × 2 matrix?", answer: "Divide [[d, −b], [−c, a]] by the determinant ad − bc. For [[2, 1], [1, 3]] the determinant is 5, so the inverse is [[0.6, −0.2], [−0.2, 0.4]]." },
      { question: "What are the dimensions of a matrix product?", answer: "If A is m × n and B is n × q, the product AB is m × q. The inner n cancels and the outer dimensions survive." },
      { question: "Why is a triangular matrix's determinant just the diagonal product?", answer: "Row reduction to triangular form does not involve row swaps, and each elimination step leaves the determinant unchanged, so the product of the remaining diagonal entries is the original determinant." },
      { question: "Is this matrix calculator free?", answer: "Yes, it is free, has no sign-up, and computes everything on your own device." }
    ],
    relatedCalculators: [
      { name: 'Equation Solver', path: '/equation-solver.html' },
      { name: 'Vector', path: '/vector-calculator.html' },
      { name: 'Graphing', path: '/graphing-calculator.html' },
      { name: 'Statistical', path: '/statistical-calculator.html' }
    ],
    howWeCalculate: {
      formula: "det [[a, b], [c, d]] = ad − bc; (AB)ᵢⱼ = Σₖ Aᵢₖ × Bₖⱼ",
      explanation: "The determinant is expanded along a row or column using cofactors, while each product entry is formed as the dot product of a row of the left matrix with a column of the right one. Multiplication is rejected when the inner dimensions disagree, and an inverse is only attempted when the determinant is non-zero.",
      example: "det [[2, 1], [1, 3]] = (2 × 3) − (1 × 1) = 5"
    },
    workedExample: {
      scenario: "Multiply A = [[1, 2], [3, 4]] by B = [[2, 0], [1, 3]]",
      steps: [
        "Check dimensions: both are 2 × 2, so the product exists and is 2 × 2",
        "Row 1 with column 1: (1 × 2) + (2 × 1) = 4",
        "Row 1 with column 2: (1 × 0) + (2 × 3) = 6",
        "Row 2 with column 1: (3 × 2) + (4 × 1) = 10",
        "Row 2 with column 2: (3 × 0) + (4 × 3) = 12"
      ],
      result: "[[4, 6], [10, 12]]"
    },
    commonValues: {
      heading: "Determinants of common 2 × 2 matrices",
      columns: ["Matrix", "Determinant"],
      rows: [
        ["[[2, 1], [1, 3]]", "5"],
        ["[[4, 7], [2, 6]]", "10"],
        ["[[1, 0], [0, 1]]", "1"],
        ["[[5, 5], [5, 5]]", "0"],
        ["[[3, 8], [4, 6]]", "−14"],
        ["[[0, 1], [1, 0]]", "−1"]
      ]
    }
  },
  'statistical-calculator': {
    title: "Calculate Statistical Measures Instantly with Our",
    subtitle: "Statistical Calculator",
    introduction: "Statistics turns a pile of numbers into a description you can act on. Enter your data values one at a time and this calculator returns the mean, median, mode, minimum, maximum, range and quartiles, the same summary measures that appear in research papers, quality-control charts, sports tables and finance reports. The choice of measure matters more than the arithmetic: a single outlier can drag the mean far away from the typical value while leaving the median untouched, which is why income is normally reported as a median and grades are usually reported as a mean. Behind the summary sits the spread, and that is where the sample-versus-population question decides whether you divide by n or by n − 1 — a difference small in notation and surprisingly large in interpretation. The sections below explain when each measure earns its place, how variance and standard deviation are actually built, and how quartiles expose the shape of data that a single average hides.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Mean, Median and Mode: Choosing the Right Average</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The mean adds every value and divides by the count, so it uses every observation but is fully exposed to extremes. The median is the middle value after sorting, so it ignores magnitude entirely and reports what is typical. Take the set 2, 3, 4, 5, 100: the mean is 22.8, pulled upward by a value that may well be a data-entry error, while the median is 4 and describes the cluster honestly. The mode is the value that appears most often, and it is the only average that works on categories — you cannot take the mean of colour names, but you can certainly report the most common one. Datasets can also have no mode, or several modes when two values tie. Rule of thumb: symmetric data with no outliers, use the mean; skewed data or outliers, use the median; categories, use the mode.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Variance and Standard Deviation: n or n − 1?</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Variance averages the squared distances from the mean, which squares away the sign so that values above and below both count. For an entire population you divide by n and write σ². For a sample you divide by n − 1 and write s², a correction called Bessel's correction. The reason is degrees of freedom: once you use the data to estimate the mean, one piece of information is already spent, and dividing by n systematically underestimates the population variance. Standard deviation is simply the square root of variance, which returns the answer to the original units and makes it directly comparable with the data itself. For 1, 2, 3, 4, 5 the mean is 3, the squared deviations sum to 10, the sample variance is 10 ÷ 4 = 2.5 and s ≈ 1.581.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Range, Quartiles and the Shape Behind the Average</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The range is just the maximum minus the minimum, so one extreme value can dominate it completely — a single mistyped 999 makes the range meaningless. Quartiles split the sorted data into quarters: Q1 is the median of the lower half, Q3 the median of the upper half, and the interquartile range IQR = Q3 − Q1 covers the middle 50 percent while ignoring the tails. That makes IQR the robust companion to the median. It also gives a formal outlier test: any point below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR is flagged as a potential outlier, the same rule used in box plots. Reading the three together — mean against median, range against IQR — tells you whether your data is symmetric, skewed or contaminated.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Sort the data before you touch the median and quartiles; an unsorted middle value is the most common manual mistake. Compare the mean with the median as a quick skewness test — if the mean sits well above the median, a long right tail is pulling it. And always state which standard deviation you are reporting, because a sample figure and a population figure from the same data are not interchangeable.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the difference between mean and median?", answer: "The mean is the sum divided by the count and reacts to every value. The median is the middle of the sorted data and ignores extremes. For 2, 3, 4, 5, 100 the mean is 22.8 but the median is only 4." },
      { question: "When should I use the mode?", answer: "Use it for categorical data or when you want the most frequent entry. A dataset may have no mode if every value appears once, or two modes if the top values tie." },
      { question: "Why do you divide by n − 1 for a sample?", answer: "That is Bessel's correction. Dividing by n underestimates the population variance on average because the sample mean was estimated from the same data, so n − 1 restores an unbiased estimate." },
      { question: "How do I calculate standard deviation by hand?", answer: "Find the mean, subtract it from each value, square each difference, average those squares (with n − 1 for a sample), then take the square root. The square root puts the answer back into the data's own units." },
      { question: "What is the range and why can it mislead?", answer: "Range is the maximum minus the minimum. Because it depends on only two values, one outlier can inflate it dramatically, which is why the interquartile range is usually preferred for spread." },
      { question: "What are quartiles and the IQR?", answer: "Q1 is the median of the lower half of the sorted data and Q3 the median of the upper half. The interquartile range IQR = Q3 − Q1 spans the middle 50 percent of the data." },
      { question: "How do I flag outliers with the IQR rule?", answer: "Any value below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR is a suspected outlier. This is the exact rule that box plots use to draw their whiskers." },
      { question: "What happens to the mean when I add an extreme value?", answer: "It moves toward that value in proportion to how extreme it is, since every observation carries equal weight. The median only shifts by one position in the sorted list." },
      { question: "Is standard deviation in the same units as the data?", answer: "Yes. Variance is expressed in squared units, which is hard to interpret, so its square root, the standard deviation, is reported instead to stay comparable with the original measurements." },
      { question: "Is this statistical calculator free?", answer: "Yes, it is free and your data stays in the browser — nothing is uploaded." }
    ],
    relatedCalculators: [
      { name: 'Average', path: '/average-calculator.html' },
      { name: 'Probability', path: '/probability-calculator.html' },
      { name: 'Matrix', path: '/matrix-calculator.html' },
      { name: 'Percentage', path: '/percentage-calculator.html' }
    ],
    howWeCalculate: {
      formula: "x̄ = Σxᵢ ÷ n; s = √[Σ(xᵢ − x̄)² ÷ (n − 1)]; σ = √[Σ(xᵢ − μ)² ÷ n]",
      explanation: "Every value you enter is collected into a dataset. The mean is the total divided by the count, the median is read from the sorted list, and the spread is built from the squared deviations about that mean. Sample statistics divide the squared-deviation total by n − 1, while population statistics divide by n.",
      example: "Data 2, 4, 4, 4, 5, 5, 7, 9 → mean 5, population σ = 2, sample s ≈ 2.138"
    },
    workedExample: {
      scenario: "Five test scores are 72, 85, 90, 68 and 95. Report the mean, median and sample standard deviation.",
      steps: [
        "Mean: (72 + 85 + 90 + 68 + 95) ÷ 5 = 410 ÷ 5 = 82",
        "Sort the data: 68, 72, 85, 90, 95, so the middle value is 85",
        "Deviations from 82: −10, 3, 8, −14, 13",
        "Squared deviations: 100, 9, 64, 196, 169, which sum to 538",
        "Sample variance = 538 ÷ 4 = 134.5, so s = √134.5 ≈ 11.60"
      ],
      result: "Mean 82, median 85, sample standard deviation ≈ 11.60"
    },
    commonValues: {
      heading: "Mean and sample standard deviation for small datasets",
      columns: ["Dataset", "Mean", "Std dev (sample)"],
      rows: [
        ["1, 2, 3, 4, 5", "3", "1.581"],
        ["10, 20, 30", "20", "10"],
        ["5, 5, 5, 5", "5", "0"],
        ["2, 4, 8, 16", "7.5", "6.191"],
        ["68, 72, 85, 90, 95", "82", "11.597"]
      ]
    }
  },
  'unit-conversion-calculator': {
    title: "Master Unit Conversions with Our Precise",
    subtitle: "Unit Conversion Calculator",
    introduction: "Almost every practical calculation ends with a unit conversion. Recipes arrive in ounces but scales measure grams, a car review quotes miles per hour while the speedometer reads kilometres per hour, and a physics lab reports newtons where the textbook used pounds-force. This calculator covers length, mass, area, volume, temperature, speed, time and data sizes across metric and imperial systems, with the exact factors rather than rounded approximations. The method behind every conversion is the same and worth learning once: multiply by a fraction whose numerator and denominator are equal, so the unit you want cancels the unit you have. Beyond that, two pitfalls cause most mistakes. Area and volume conversions require squaring or cubing the linear factor, and temperature uses affine formulas with an offset rather than a simple multiplier. The sections below cover the method, the SI prefixes that make powers of ten readable, and the dimension changes that catch people out.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Dimensional Analysis: Multiplying by One</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Because 1 kg = 1000 g, the fraction 1000 g ÷ 1 kg is exactly equal to one, and multiplying by it changes the unit without changing the quantity. To turn 2.5 km into metres you write 2.5 km × (1000 m ÷ 1 km); the kilometres cancel and 2500 m remains. Chain the same trick for multi-step conversions: metres to inches to feet is two multiplications, each with its own cancelling fraction, and you can always confirm the setup because unwanted units must disappear from the answer. This is also why conversion factors should be exact where they exist — 1 inch is defined as exactly 2.54 cm, so no rounding creeps in until you choose to round. For speeds, 1 km/h = 1000 m ÷ 3600 s = 0.2778 m/s, which is why dividing km/h by 3.6 gives m/s directly.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">SI Prefixes Are Just Powers of Ten</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The metric system scales with prefixes, each one a power of ten: kilo is 10³, mega is 10⁶, giga is 10⁹ and tera is 10¹² upward; milli is 10⁻³, micro is 10⁻⁶, nano is 10⁻⁹ and pico is 10⁻¹² downward. That means 3.5 km is 3500 m, 450 mm is 0.45 m, and a 2 GB file is 2 × 10⁹ bytes when written in SI, or about 1.86 GiB when measured in binary units — the source of every confusing hard-drive capacity complaint. Note the oddity: the kilogram, not the gram, is the SI base unit of mass, so the prefix is already baked in. Reading a number in scientific notation and its prefix form is the same skill, just two spellings.
        </p>
        <ul className="space-y-2 text-neutral-400 text-sm leading-relaxed mb-6">
          <li><span className="text-white font-semibold">kilo (k)</span> — 10³, so 1 km = 1000 m and 1 kg = 1000 g</li>
          <li><span className="text-white font-semibold">milli (m)</span> — 10⁻³, so 1 mm = 0.001 m and 1 mg = 0.001 g</li>
          <li><span className="text-white font-semibold">micro (µ)</span> — 10⁻⁶, used for micrometres and micrograms</li>
          <li><span className="text-white font-semibold">nano (n)</span> — 10⁻⁹, the scale of visible light wavelengths and chip features</li>
          <li><span className="text-white font-semibold">mega (M) and giga (G)</span> — 10⁶ and 10⁹, the units memory and bandwidth are quoted in</li>
        </ul>
        <h3 className="text-xl font-bold text-white mb-4">When the Dimension Changes: Area, Volume and Temperature</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Linear factors do not transfer directly to higher dimensions. Since 1 inch = 2.54 cm, one square inch is 2.54² = 6.4516 cm² and one cubic inch is 2.54³ = 16.387 cm³. Whenever a unit carries a power, raise the conversion factor to that same power. Temperature is different again: it is not a ratio scale, so a difference of 1 °C is not a difference of 1.8 °F in the way a multiplication would suggest. Use the full affine formulas instead — °F = (°C × 9 ÷ 5) + 32 and °C = (°F − 32) × 5 ÷ 9 — and treat the −32 or +32 offsets as part of the conversion, never as rounding.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Write the target unit first, then build a fraction that cancels the starting unit — if a unit survives in the numerator when you wanted something else, the fraction is upside down. Keep one extra significant figure through intermediate steps and round only at the end. And check your order of magnitude by eye: a person weighing 70 kg is about 154 lb, not 1540, so a result ten times out is a factor error.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I convert km/h to m/s?", answer: "Divide by 3.6, because 1 km/h = 1000 m ÷ 3600 s = 0.2778 m/s. So 72 km/h ÷ 3.6 = 20 m/s." },
      { question: "Why do area conversions need squaring?", answer: "Area involves two length dimensions, so the linear factor applies twice. With 1 inch = 2.54 cm, one square inch is 2.54² = 6.4516 cm², and volume cubes it: 16.387 cm³." },
      { question: "What is the Fahrenheit to Celsius formula?", answer: "°C = (°F − 32) × 5 ÷ 9. Water freezes at 32 °F = 0 °C and boils at 212 °F = 100 °C, which is the quickest way to remember the two anchors." },
      { question: "Is 1 inch exactly 2.54 cm?", answer: "Yes. Since the 1959 international yard and pound agreement the inch is defined as exactly 2.54 cm, so the conversion introduces no rounding error at all." },
      { question: "Which prefixes should I memorise?", answer: "kilo 10³, milli 10⁻³ and micro 10⁻⁶ cover most everyday work; giga 10⁹ and nano 10⁻⁹ handle computing and physics. Each step of three zeroes is another thousand." },
      { question: "What is dimensional analysis?", answer: "It is the technique of multiplying by fractions equal to one, such as 1000 g ÷ 1 kg, so that unwanted units cancel and only the unit you asked for survives." },
      { question: "Is a tonne the same as a US ton?", answer: "No. A tonne (metric ton) is exactly 1000 kg, while a US short ton is 2000 lb ≈ 907.18 kg — about 9 percent lighter." },
      { question: "Why does a gallon differ between the US and the UK?", answer: "They use different definitions: the US liquid gallon is 3.78541 litres and the imperial gallon is 4.54609 litres. Always state which gallon a fuel figure refers to." },
      { question: "Which units does the metric system define as base units?", answer: "The SI base units are the metre, kilogram, second, ampere, kelvin, mole and candela; every other metric unit is derived from these." },
      { question: "Is this unit conversion calculator free?", answer: "Yes, it is free to use and performs conversions entirely on your device." }
    ],
    relatedCalculators: [
      { name: 'Area', path: '/area-calculator.html' },
      { name: 'Volume', path: '/volume-calculator.html' },
      { name: 'Geometry', path: '/geometry-calculator.html' },
      { name: 'Scientific', path: '/scientific-calculator.html' }
    ],
    howWeCalculate: {
      formula: "converted value = value × (target unit ÷ source unit)",
      explanation: "Each conversion uses an exact or CODATA-quality factor expressed as a fraction equal to one, so the source unit cancels and the target unit remains. Area and volume conversions raise the linear factor to the second or third power, and temperature applies its offset formula rather than a plain multiplier.",
      example: "2.5 km → m: 2.5 × (1000 m ÷ 1 km) = 2500 m"
    },
    workedExample: {
      scenario: "A car review quotes 65 mph. Convert it to km/h.",
      steps: [
        "Look up the exact factor: 1 mile = 1.609344 km",
        "Multiply: 65 × 1.609344",
        "Split the work: 65 × 1.6 = 104 and 65 × 0.009344 ≈ 0.61",
        "Add the parts and round sensibly: 104.61 km/h"
      ],
      result: "65 mph ≈ 104.61 km/h"
    },
    commonValues: {
      heading: "Conversion factors worth keeping handy",
      columns: ["From", "To", "Multiply by"],
      rows: [
        ["1 mile", "1 km", "1.609344"],
        ["1 kg", "1 lb", "2.20462"],
        ["1 US gallon", "1 litre", "3.78541"],
        ["1 m/s", "1 km/h", "3.6"],
        ["1 inch", "1 cm", "2.54"],
        ["1 hectare", "1 m²", "10000"],
        ["1 °C", "°F", "°C × 9 ÷ 5 + 32"]
      ]
    }
  },
  'graphing-calculator': {
    title: "Visual Graphing of Functions with Our Free",
    subtitle: "Graphing Calculator",
    introduction: "A graph turns an equation into a picture, and pictures reveal things tables hide. Plot y = x² − 4 and you see instantly that it crosses the x-axis at −2 and 2 and bottoms out at (0, −4); plot y = 1 ÷ x and you watch the curve chase the axes without ever touching them. This graphing calculator lets you type a function, choose the x range to sample over, and render the curve immediately, which makes it useful for checking homework roots, sanity-checking a model before you build it, and building intuition about how each part of an equation bends the shape. The skill that separates a useful graph from a misleading one is window selection: zoom in too far and a feature disappears, zoom out too far and everything flattens into a straight line, and sample too coarsely and a smooth wave turns into jagged zig-zags. The sections below cover how to read intercepts and asymptotes, how to set a window that tells the truth, and how intersections solve equations visually.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Reading a Graph: Intercepts, Roots and Asymptotes</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Three features carry most of the meaning. The y-intercept is simply f(0), where the curve meets the vertical axis, and it exists for every function defined at zero. The x-intercepts, also called roots or zeros, are the values where f(x) = 0 — the solutions of the equation you were probably asked to solve, visible as the points where the curve crosses the horizontal axis. Asymptotes are the lines the curve approaches indefinitely: y = 1 ÷ x has a vertical asymptote at x = 0 because the value grows without bound there, and a horizontal asymptote at y = 0 because the value shrinks toward zero as x runs off to infinity. Reading those three features correctly lets you describe a function's behaviour without evaluating a single extra point.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Windows, Scales and the Jagged Curve Trap</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A graph is a set of sampled points joined together, so the x range decides both which features appear and how smooth the result looks. Set the range too narrow and you might plot a monotonic slice of a curve that actually turns around outside your window, making a parabola look like a straight line. Set it too wide and every detail compresses into a flat streak. Sample too few points across a wide range and a sine wave becomes a jagged triangle — the same aliasing problem that makes a wagon wheel appear to spin backwards on film. Trigonometric graphs follow the same angle-mode rule as every other trig tool: if your period reads 360, you are graphing in degrees, and if it reads about 6.28 you are graphing in radians.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Solving Equations by Intersection</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Plotting two functions on the same axes turns an algebra problem into a visual one. The crossing point of y = f(x) and y = g(x) is the value of x where f(x) = g(x), which is exactly how systems of equations and iterative methods are understood. For instance, finding where y = 2x + 1 meets y = x² − 1 means reading the two x coordinates where the line and parabola intersect, then substituting back to confirm. Intersections also help when an equation cannot be solved in closed form: curves such as y = e^x and y = 3 − x cross at a point that no algebra formula will hand you, but a graph locates it immediately and gives a starting value for a numerical method.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Always plot a wider range first, then narrow in on the region that matters — you cannot find a feature you never displayed. Check the symmetry: even functions mirror across the y-axis, odd functions rotate around the origin, and that alone rules out whole classes of mistakes. Finally, verify one point by substitution; a single confirmed coordinate catches most entry typos.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I enter a function?", answer: "Use the form y = f(x), writing powers with ^ such as x^2 − 4, division with / such as 1/x, and the variable x itself. The curve is redrawn for every point in the chosen x range." },
      { question: "What does the x range control?", answer: "It sets the interval of x values that are sampled and plotted. A range of −10 to 10 is a good default, then narrow in once you can see where the interesting behaviour happens." },
      { question: "Why does my sine wave look jagged?", answer: "The range is too wide for the number of sample points, so the curve is being drawn through too few coordinates. Narrow the x range or increase the sampling and the wave smooths out." },
      { question: "How do I find zeros from the graph?", answer: "Zeros are the x coordinates where the curve crosses the x-axis. For y = x² − 4 the crossings are at x = −2 and x = 2, which you can confirm by substitution." },
      { question: "What is an asymptote?", answer: "A line the curve approaches but never reaches. y = 1/x has a vertical asymptote at x = 0, where the value explodes, and a horizontal asymptote at y = 0, which it approaches as x grows." },
      { question: "How do I find where two functions intersect?", answer: "Plot both curves; every crossing satisfies f(x) = g(x). Read the x coordinate of the crossing, then substitute it back into both equations to confirm they agree." },
      { question: "Should I graph trigonometric functions in degrees or radians?", answer: "Radians for calculus and physics, degrees when the problem is written that way. In degrees a sine wave repeats every 360 units; in radians it repeats every 2π ≈ 6.28 units." },
      { question: "Why does my parabola look squashed?", answer: "The x and y axes are scaled differently, so equal distances do not represent equal values. Use a square aspect ratio when shape matters, for example when comparing a curve to a circle." },
      { question: "What is end behaviour?", answer: "Where the function heads as x grows positively or negatively. 2^x climbs without bound to the right, 1/x approaches zero, and x² rises on both sides." },
      { question: "Is this graphing calculator free?", answer: "Yes, it is free, renders instantly, and keeps every calculation inside your browser." }
    ],
    relatedCalculators: [
      { name: 'Scientific', path: '/scientific-calculator.html' },
      { name: 'Equation Solver', path: '/equation-solver.html' },
      { name: 'Trigonometric', path: '/trigonometric-calculator.html' },
      { name: 'Logarithmic', path: '/logarithmic-calculator.html' }
    ],
    howWeCalculate: {
      formula: "y = f(x) sampled for every x in [x min, x max] and plotted as joined points",
      explanation: "The calculator evaluates your expression at evenly spaced x values across the selected range, then renders the resulting coordinate pairs as a continuous curve. Intercepts are read where the curve crosses an axis, and asymptotes appear where values diverge or settle toward a limit.",
      example: "y = x² − 4 over [−4, 4] → roots at x = −2 and x = 2, vertex at (0, −4)"
    },
    workedExample: {
      scenario: "Graph y = 2x + 1 and identify both intercepts",
      steps: [
        "Sample x = −2: y = 2(−2) + 1 = −3",
        "Sample x = 0: y = 1, so the y-intercept is (0, 1)",
        "Sample x = 1: y = 3, confirming a straight line with slope 2",
        "Set y = 0: 2x + 1 = 0 gives x = −0.5, the x-intercept"
      ],
      result: "y-intercept (0, 1), x-intercept (−0.5, 0)"
    },
    commonValues: {
      heading: "Key features of common graphs",
      columns: ["Function", "Key feature"],
      rows: [
        ["y = x²", "vertex (0, 0), opens upward"],
        ["y = 2^x", "y-intercept (0, 1), asymptote y = 0"],
        ["y = 1/x", "asymptotes x = 0 and y = 0"],
        ["y = sin x", "amplitude 1, period 360° (2π rad)"],
        ["y = √x", "domain x ≥ 0, starts at the origin"],
        ["y = ln x", "asymptote x = 0, crosses (1, 0)"]
      ]
    }
  },
  'scientific-constants': {
    title: "Trusted CODATA Values for Your",
    subtitle: "Scientific Constants",
    introduction: "Physical constants are the fixed numbers nature supplies — the speed of light, Planck's constant, Avogadro's number, the gravitational constant — and every quantitative science is built on them. Using a rounded value from memory is a quiet way to introduce error: the gravitational constant carries an uncertainty of about two parts in a hundred thousand, the elementary charge is known exactly, and mixing the two levels of precision is how a careful calculation goes wrong. This page collects the constants students, engineers and researchers look up most often, expressed in SI units with the values recommended by CODATA, the Committee on Data for Science and Technology that publishes a consolidated set of recommended values every four years. Since the 2019 revision of the SI, several constants are exact by definition rather than measured, which changed the game: the speed of light fixes the metre, Planck's constant fixes the kilogram, and the elementary charge fixes the ampere.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Exact by Definition vs Measured</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          After the 2019 SI redefinition, seven defining constants were frozen with no uncertainty at all: the speed of light c = 299792458 m/s, Planck's constant h = 6.62607015 × 10⁻³⁴ J·s, the elementary charge e = 1.602176634 × 10⁻¹⁹ C, the Boltzmann constant k_B = 1.380649 × 10⁻²³ J/K, the Avogadro constant N_A = 6.02214076 × 10²³ per mole, the unperturbed caesium-133 hyperfine frequency of 9192631770 Hz, and a luminous efficacy value. Everything else follows: the gas constant R = k_B × N_A = 8.31446261815324 J·mol⁻¹·K⁻¹ is now exact too. Gravitation, by contrast, remains stubbornly experimental — G = 6.67430 × 10⁻¹¹ m³·kg⁻¹·s⁻² with a relative uncertainty near 2 × 10⁻⁵ — because weighing two massive objects with that precision is extraordinarily hard.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Constants You Will Actually Use</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Standard gravity g₀ = 9.80665 m/s² is a defined value used for ordinary weight conversions, though real local gravity varies with latitude and altitude. The gas constant R connects pressure, volume and temperature through PV = nRT and appears in every chemistry and thermodynamics course. Avogadro's number scales atoms up to grams, so a molar mass in grams per mole is literally N_A particles worth of mass. Boltzmann's constant k_B converts temperature into energy, giving thermal energy k_BT ≈ 4.14 × 10⁻²¹ J at room temperature (300 K), the scale that decides whether a physical effect is swamped by heat. And the transcendental constants π = 3.141592653589793 and e = 2.718281828459045 are exact, infinite, and appear everywhere from trigonometry to compound growth.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Units and Significant Figures</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A constant without its unit is half a fact: c is 299792458 metres per second, not 299792458. Check dimensional consistency by cancelling units as if they were algebraic symbols — h times frequency gives joule-seconds times per second, which is joules, which is energy, and that is exactly what E = hf promises. For precision, never report more significant figures than your least precise input allows: multiplying an exact constant by a measurement known to three figures gives an answer with three figures, no matter how many digits the constant carries. Keep extra digits during intermediate steps and round once at the end.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Values marked exact can be used to the full written precision — they are definitions, not measurements. When a result depends on G, ε₀ or α, carry the uncertainty along rather than pretending it vanishes. For quick mental work, c ≈ 3 × 10⁸ m/s, h ≈ 6.63 × 10⁻³⁴ J·s and N_A ≈ 6 × 10²³ are close enough to estimate an order of magnitude.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is CODATA?", answer: "The Committee on Data for Science and Technology, an international body that consolidates measurements and publishes recommended values for fundamental constants every four years. Physics reference books and textbooks follow these recommendations." },
      { question: "Which constants are exact rather than measured?", answer: "Under the 2019 SI, c, h, e, k_B, N_A and the caesium hyperfine frequency are exact by definition. That is why they are quoted with no uncertainty and with a fixed number of digits." },
      { question: "What is the speed of light?", answer: "c = 299792458 m/s exactly. It is not a measurement anymore: the metre is defined as the distance light travels in 1 ÷ 299792458 of a second." },
      { question: "Why does the Planck constant have a fixed value?", answer: "h = 6.62607015 × 10⁻³⁴ J·s exactly. Since 2019 the kilogram is defined by fixing h, using a Kibble balance to relate mass to electrical measurements." },
      { question: "What is Avogadro's number used for?", answer: "N_A = 6.02214076 × 10²³ per mole converts between atoms and grams. It is why a molar mass in grams per mole contains exactly that many particles." },
      { question: "What is the Boltzmann constant?", answer: "k_B = 1.380649 × 10⁻²³ J/K, exact. It translates temperature into energy: at 300 K the thermal energy k_BT is about 4.14 × 10⁻²¹ J." },
      { question: "What is the ideal gas constant R?", answer: "R = N_A × k_B = 8.31446261815324 J·mol⁻¹·K⁻¹, exact under the current SI. It appears in PV = nRT for ideal gases." },
      { question: "Why do constants like G still have uncertainties?", answer: "They are determined experimentally from difficult measurements. G ≈ 6.67430 × 10⁻¹¹ m³·kg⁻¹·s⁻² carries roughly a two-part-in-a-hundred-thousand uncertainty, so results depending on it inherit that error." },
      { question: "How many significant figures should I keep?", answer: "Match the least precise value in your calculation, usually four to six digits for textbook problems. Keep extra digits in intermediate steps and round only the final answer." },
      { question: "Is this constants reference free to use?", answer: "Yes, the table is free to browse and the paired calculator runs entirely on your device." }
    ],
    relatedCalculators: [
      { name: 'Scientific', path: '/scientific-calculator.html' },
      { name: 'Scientific Notation', path: '/scientific-notation-calculator.html' },
      { name: 'Unit Conversion', path: '/unit-conversion-calculator.html' },
      { name: 'Graphing', path: '/graphing-calculator.html' }
    ],
    howWeCalculate: {
      formula: "E = h × f, E = m × c², P × V = n × R × T",
      explanation: "Constants act as fixed multipliers in physical formulas. This calculator substitutes the CODATA recommended value for each constant into the formula you choose, keeping exact values at full precision and carrying units through so the result comes out in the correct SI unit.",
      example: "Photon energy at 500 nm: E = h × c ÷ λ ≈ (6.626 × 10⁻³⁴ × 3.00 × 10⁸) ÷ (5.00 × 10⁻⁷) ≈ 3.98 × 10⁻¹⁹ J"
    },
    workedExample: {
      scenario: "Find the wavelength of orange light whose frequency is 5.00 × 10¹⁴ Hz",
      steps: [
        "Start from the wave relation c = λ × f",
        "Rearrange for wavelength: λ = c ÷ f",
        "Substitute: λ = (2.998 × 10⁸ m/s) ÷ (5.00 × 10¹⁴ Hz)",
        "λ = 5.996 × 10⁻⁷ m, which is 599.6 nm"
      ],
      result: "λ ≈ 600 nm, orange-red light"
    },
    commonValues: {
      heading: "Fundamental constants in SI units",
      columns: ["Constant", "Value (SI)"],
      rows: [
        ["Speed of light c", "299792458 m/s (exact)"],
        ["Planck constant h", "6.62607015 × 10⁻³⁴ J·s (exact)"],
        ["Boltzmann constant k_B", "1.380649 × 10⁻²³ J/K (exact)"],
        ["Avogadro constant N_A", "6.02214076 × 10²³ mol⁻¹ (exact)"],
        ["Elementary charge e", "1.602176634 × 10⁻¹⁹ C (exact)"],
        ["Gas constant R", "8.31446261815324 J·mol⁻¹·K⁻¹"],
        ["Gravitational constant G", "6.67430 × 10⁻¹¹ m³·kg⁻¹·s⁻²"],
        ["Standard gravity g₀", "9.80665 m/s² (defined)"],
        ["π", "3.141592653589793"],
        ["Euler's number e", "2.718281828459045"]
      ]
    }
  },
  'trigonometry-calculator': {
    title: "Trigonometry from First Principles with Our",
    subtitle: "Trigonometry Calculator",
    introduction: "Trigonometry is what happens when you stop looking only at right triangles. Real triangles rarely announce a right angle, so surveyors, navigators, architects and physicists rely on the sine rule and the cosine rule, which work for any triangle whatever its angles. This calculator takes the angle mode you choose, degrees or radians, returns the six trigonometric ratios, and applies those rules to the sides and angles you enter, so a triangle problem becomes arithmetic rather than a construction exercise. Beyond the rules sits the machinery that keeps answers consistent: the angles of a triangle sum to 180°, the Pythagorean identity ties sine to cosine, and the ambiguous case of two sides and a non-included angle warns you that one set of measurements can describe two entirely different triangles. The sections below walk through when each rule applies, why the ambiguous case exists, and which identities earn a permanent place in memory.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Sine Rule and Cosine Rule: Picking the Right One</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The sine rule states that each side divided by the sine of its opposite angle is the same for all three pairs: a ÷ sin A = b ÷ sin B = c ÷ sin C. Use it whenever you have a matched pair — a side together with its opposite angle — and one more piece, as in AAS or ASA configurations. The cosine rule, c² = a² + b² − 2ab cos C, is the generalisation of Pythagoras for triangles that are not right-angled, and it is the right choice when you know two sides and the included angle (SAS) or all three sides (SSS). Set C to 90° in the cosine rule and the last term vanishes because cos 90° = 0, leaving c² = a² + b² — a useful reminder that the two rules are the same idea at different levels of generality. Once two parts are known, the third angle falls out of the 180° sum.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">The Ambiguous Case: Two Sides and an Angle</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Given two sides and an angle that is not between them — say a = 8, b = 12 and A = 30° — the triangle may not exist, may exist once, or may exist twice, all from identical input. The test compares the side opposite the given angle with the height of the other side: height = b × sin A = 12 × 0.5 = 6. Because a = 8 exceeds the height but is shorter than b, the swinging side can meet the base in two places, giving two valid triangles with different third angles. If a were below 6 no triangle would close at all, and if a were at least 12 exactly one triangle would form. This is why SSA is not a congruence condition, and why a triangle problem with two solutions is not a calculator error.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Identities Worth Memorising</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Four identities do most of the work. The Pythagorean identity sin²θ + cos²θ = 1 is the circle equation in disguise and validates any pair of values instantly. The angle sum formulas, sin(A + B) = sin A cos B + cos A sin B and cos(A + B) = cos A cos B − sin A sin B, produce the double angle forms, of which sin 2θ = 2 sin θ cos θ and cos 2θ = cos²θ − sin²θ are the most useful. The third tool is simply the angle sum of a triangle: A + B + C = 180° in Euclidean geometry, which both closes a triangle and converts an unknown angle into an easy subtraction. Together they let you check almost any answer without a second calculation pass.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Sketch the triangle and label every known before choosing a rule; nine out of ten mistakes are the sine rule used where the cosine rule belongs. Convert the angle mode first, because a rule applied to radians labelled as degrees silently corrupts every side length. And after solving, check the three angles sum to 180° — if they do not, the error is upstream.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "When do I use the law of sines instead of the law of cosines?", answer: "Use the sine rule when you have a side and its opposite angle together (AAS or ASA). Use the cosine rule when you have two sides and the included angle (SAS), or all three sides (SSS)." },
      { question: "What is the law of cosines?", answer: "c² = a² + b² − 2ab cos C. It generalises Pythagoras: with C = 90° the cosine term is zero and it collapses to c² = a² + b²." },
      { question: "What is the ambiguous case in trigonometry?", answer: "Two sides and a non-included angle (SSA) can produce zero, one or two triangles. With a = 8, b = 12 and A = 30°, the height b sin A equals 6, so a is long enough to swing across the base twice and two triangles exist." },
      { question: "Do the angles of a triangle always add up to 180°?", answer: "In Euclidean (flat) geometry, yes. On a curved surface such as a sphere they add to more than 180°, which is the basis of non-Euclidean geometry and long-range navigation." },
      { question: "How do I solve a triangle when I know two angles and a side?", answer: "Subtract the two known angles from 180° to get the third, then apply the sine rule with the one known side to find the remaining sides." },
      { question: "What is the Pythagorean identity?", answer: "sin²θ + cos²θ = 1 for every angle. It follows from x² + y² = 1 on the unit circle and is the quickest way to verify a sine and cosine pair." },
      { question: "How do I convert degrees to radians?", answer: "Multiply by π ÷ 180. So 60° = π ÷ 3 radians and 45° = π ÷ 4 radians. Going the other way, multiply radians by 180 ÷ π." },
      { question: "Why can't I use SOHCAHTOA on a non-right triangle?", answer: "Those ratios are defined from a right triangle's sides. For triangles without a right angle, drop an altitude to create right triangles or use the sine and cosine rules, which hold for any triangle." },
      { question: "How do I find the area of a triangle from two sides?", answer: "Area = ½ × a × b × sin C when you know the included angle C. For sides 5 and 8 with a 30° included angle the area is ½ × 5 × 8 × 0.5 = 10." },
      { question: "Is this trigonometry calculator free?", answer: "Yes, it is free to use with no sign-up, and all calculations stay on your device." }
    ],
    relatedCalculators: [
      { name: 'Trigonometric', path: '/trigonometric-calculator.html' },
      { name: 'Scientific', path: '/scientific-calculator.html' },
      { name: 'Geometry', path: '/geometry-calculator.html' },
      { name: 'Vector', path: '/vector-calculator.html' }
    ],
    howWeCalculate: {
      formula: "a ÷ sin A = b ÷ sin B = c ÷ sin C; c² = a² + b² − 2ab cos C; A + B + C = 180°",
      explanation: "Angles are interpreted in the selected mode, the third angle is recovered from the triangle angle sum when needed, and the sine or cosine rule is applied depending on which values are known. The calculator reports every side and angle it can derive and rejects impossible configurations.",
      example: "A = 40°, B = 60°, a = 10 → b = 10 × sin 60° ÷ sin 40° ≈ 13.473"
    },
    workedExample: {
      scenario: "A triangular garden has sides of 7 m and 10 m with a 50° angle between them. Find the third side and the area.",
      steps: [
        "Third side with the cosine rule: c² = 7² + 10² − 2 × 7 × 10 × cos 50°",
        "c² = 49 + 100 − 140 × 0.6428 = 149 − 89.99 = 59.01",
        "c = √59.01 ≈ 7.68 m",
        "Area with two sides and the included angle: ½ × 7 × 10 × sin 50° = 35 × 0.7660 ≈ 26.81 m²"
      ],
      result: "Third side ≈ 7.68 m, area ≈ 26.81 m²"
    },
    commonValues: {
      heading: "Triangle problems and the rule that solves them",
      columns: ["Known values", "Rule", "Answer"],
      rows: [
        ["a = 7, b = 10, C = 50°", "cosine rule", "c ≈ 7.68"],
        ["A = 40°, B = 60°, a = 10", "sine rule", "b ≈ 13.473"],
        ["legs 3 and 4", "Pythagoras", "hypotenuse 5"],
        ["sides 5, 12, 13", "converse of Pythagoras", "right triangle"],
        ["cos θ = 0.6", "inverse cosine", "θ ≈ 53.13°"],
        ["a = 5, b = 8, C = 30°", "area formula", "10 m²"]
      ]
    }
  },
  'vector-calculator': {
    title: "Vector Operations Explained Simply with Our",
    subtitle: "Vector Calculator",
    introduction: "A vector is a quantity that carries both magnitude and direction, which is what makes it different from an ordinary number. Force, velocity, displacement, acceleration and field strength are all vectors: a 5 m/s eastward velocity is not interchangeable with a 5 m/s northward one, even though the speeds match. Written in component form as ⟨4, 3⟩ or ⟨1, −2, 5⟩, vectors become objects you can add, scale, measure and compare with arithmetic rather than geometry. Two products dominate real work. The dot product measures how aligned two vectors are and returns a single number, which is why it powers projections, work done in physics and similarity comparisons in machine learning. The cross product returns a new vector perpendicular to both inputs with a magnitude equal to the parallelogram area, which is why it gives torque direction and surface normals in graphics. This calculator handles magnitude, components, both products and the angles between them.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Components Turn Direction Into Arithmetic</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Splitting a vector into components along the axes removes the need to draw anything. The magnitude of ⟨a, b⟩ is √(a² + b²), the Pythagorean distance from the origin, so ⟨3, 4⟩ has magnitude 5 and ⟨−5, 12⟩ has magnitude 13. Adding becomes component-wise: ⟨4, 3⟩ + ⟨−1, 5⟩ = ⟨3, 8⟩, which is the resultant of two forces acting on the same point. Scaling multiplies every component by the same factor, and a unit vector — length exactly 1 — is obtained by dividing a vector by its own magnitude, preserving direction while discarding size. The angle of a vector follows from trigonometry, θ = arctan(b ÷ a), adjusted for the quadrant so that a vector pointing into the fourth quadrant does not come back as a mirror image.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Dot Product: How Aligned Are Two Vectors?</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The dot product has two equivalent definitions. Algebraically it is the sum of matching components: ⟨3, 4⟩ · ⟨1, 2⟩ = 3 + 8 = 11. Geometrically it is |a| × |b| × cos θ, which explains the result without any coordinates. When two vectors are perpendicular, cos 90° = 0, so their dot product is zero — that single fact is the fastest test for a right angle in coordinate form. When they point the same way, the dot product equals the product of the magnitudes. Because the angle appears explicitly, the dot product is also rearranged to solve for θ, and it produces the projection of one vector onto another, the foundation of work done by a force (W = F · d) and of the similarity scores behind recommendation systems.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Cross Product: Perpendicular by Construction</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The cross product exists only in three dimensions and returns a vector, not a number. Its magnitude is |a| × |b| × sin θ, which equals the area of the parallelogram spanned by the two vectors, and its direction is perpendicular to both, fixed by the right-hand rule: point the fingers of your right hand along the first vector, curl toward the second, and the thumb gives the result. Parallel vectors have sin 0° = 0 and therefore a zero cross product, which is another way to test alignment. Since the result flips when you swap the inputs — a × b = −(b × a) — order matters everywhere, unlike the dot product. Physics uses it constantly: torque is r × F, and angular momentum is r × p.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            A zero dot product means perpendicular and a zero cross product means parallel — memorise both, they are the two quickest tests in vector work. Keep the dimensions matched: a 2D vector cannot be crossed with a 3D one. And after any resultant calculation, sketch it — if the components say right and up but the picture says left, you have a sign error.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What makes a quantity a vector?", answer: "It needs both magnitude and direction. Force, velocity and displacement are vectors; mass, temperature and time are scalars, because rotating them changes nothing about their value." },
      { question: "How do I calculate the magnitude of a vector?", answer: "Take the square root of the sum of squared components: |⟨3, 4⟩| = √(9 + 16) = 5. In 3D add the third component's square as well." },
      { question: "What is a unit vector?", answer: "A vector of length 1 that keeps direction and drops size. Divide any vector by its magnitude to get one: ⟨3, 4⟩ ÷ 5 = ⟨0.6, 0.8⟩." },
      { question: "When is the dot product zero?", answer: "Exactly when the vectors are perpendicular, because cos 90° = 0. That gives a coordinate test for right angles without ever computing an angle." },
      { question: "What is the difference between dot and cross product?", answer: "The dot product returns a scalar and uses cos θ, measuring alignment. The cross product returns a vector using sin θ, pointing perpendicular to both inputs, and exists only in three dimensions." },
      { question: "How do I find the direction of a cross product?", answer: "Use the right-hand rule: align the fingers of your right hand with the first vector, curl them toward the second, and your thumb points along a × b. Swapping the inputs reverses the direction." },
      { question: "Can I add vectors of different lengths?", answer: "You can add vectors with the same number of components regardless of their magnitudes, because you add matching components. A 2D vector cannot be added to a 3D one — the dimensions must match." },
      { question: "What is component form used for?", answer: "It replaces angles with numbers so vectors can be added and scaled algebraically. ⟨4, 3⟩ + ⟨−1, 5⟩ = ⟨3, 8⟩ needs no diagram at all." },
      { question: "Why does velocity matter as a vector when speed is a scalar?", answer: "Speed ignores direction, velocity includes it. An object moving in a circle at constant speed is still accelerating, because its velocity vector keeps changing direction." },
      { question: "Is this vector calculator free?", answer: "Yes, it is free to use and every computation runs locally in your browser." }
    ],
    relatedCalculators: [
      { name: 'Matrix', path: '/matrix-calculator.html' },
      { name: 'Trigonometric', path: '/trigonometric-calculator.html' },
      { name: 'Scientific', path: '/scientific-calculator.html' },
      { name: 'Graphing', path: '/graphing-calculator.html' }
    ],
    howWeCalculate: {
      formula: "|a| = √(aₓ² + aᵧ² + a_z²); a · b = aₓbₓ + aᵧbᵧ + a_zb_z; cos θ = (a · b) ÷ (|a| × |b|)",
      explanation: "Components are combined according to the operation you select. Magnitude uses the Pythagorean sum, the dot product sums the products of matching components and can be turned back into an angle, and the cross product's magnitude equals |a| × |b| × sin θ, the area of the spanned parallelogram.",
      example: "⟨3, 4⟩ · ⟨1, 2⟩ = (3 × 1) + (4 × 2) = 11, and |⟨3, 4⟩| = √25 = 5"
    },
    workedExample: {
      scenario: "Two forces F₁ = ⟨4, 3⟩ N and F₂ = ⟨−1, 5⟩ N act on a bolt. Find the resultant and the angle between them.",
      steps: [
        "Resultant by components: ⟨4 + (−1), 3 + 5⟩ = ⟨3, 8⟩",
        "Magnitude of the resultant: √(3² + 8²) = √73 ≈ 8.54 N",
        "Dot product: (4 × −1) + (3 × 5) = 11, with |F₁| = 5 and |F₂| = √26 ≈ 5.099",
        "cos θ = 11 ÷ (5 × 5.099) = 0.4315, so θ ≈ 64.4°"
      ],
      result: "Resultant ⟨3, 8⟩ ≈ 8.54 N, angle ≈ 64.4°"
    },
    commonValues: {
      heading: "Vector magnitudes worth recognising",
      columns: ["Vector", "Magnitude"],
      rows: [
        ["⟨3, 4⟩", "5"],
        ["⟨6, 8⟩", "10"],
        ["⟨1, 1⟩", "1.4142"],
        ["⟨−5, 12⟩", "13"],
        ["⟨2, 3, 6⟩", "7"],
        ["⟨0, −7⟩", "7"]
      ]
    }
  },
  'scientific-notation-calculator': {
    title: "Convert to Scientific Notation in Seconds with",
    subtitle: "Scientific Notation Calculator",
    introduction: "Scientific notation writes very large or very small numbers as a single non-zero digit times a power of ten, and it is the only format that keeps astronomy, quantum physics and engineering arithmetic readable. An Avogadro number written in full is 602000000000000000000000 — six hundred and two sextillion — and one dropped zero changes it by a factor of ten without any visual warning. In notation form it becomes 6.02 × 10²³, where the exponent tells you the scale at a glance and the leading digits carry the actual information. This calculator converts any decimal into standard notation and back, handles the exponent arithmetic for multiplication and division, and understands the E format that keyboards, programming languages and calculators use, where 1.5e3 simply means 1.5 × 10³. The rules are short: one digit before the point, exponent equal to the number of places the decimal moved, and a negative exponent whenever the original number is below one.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Mantissa, Exponent and the Moving Decimal</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Standard form is m × 10ⁿ with exactly one non-zero digit to the left of the decimal point, so the magnitude of m always sits between 1 and 10. Converting 45200 means moving the decimal four places to the left, giving 4.52 × 10⁴, because each step left divides by ten and the exponent records how many steps you took. Converting 0.00073 means moving the decimal four places to the right, giving 7.3 × 10⁻⁴, and here the exponent is negative because each step right multiplies by ten while shrinking the visible value. The sign of the exponent therefore tracks the direction of travel, not the sign of the number: −4.5 × 10³ is a negative number with a positive exponent. Numbers of magnitude one or above get positive or zero exponents, and everything below one gets a negative exponent — no exceptions.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Arithmetic Without Counting Zeros</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Multiplication splits cleanly: multiply the mantissas and add the exponents. So (3.2 × 10⁵) × (4.5 × 10⁻³) has mantissa 3.2 × 4.5 = 14.4 and exponent 5 − 3 = 2, giving 14.4 × 10², which normalises to 1.44 × 10³ by shifting the mantissa one place left and adding one to the exponent. Division mirrors the rule with subtraction of exponents. Addition is the awkward one: you cannot add 3 × 10⁴ and 5 × 10³ directly because the exponents differ, so rewrite the first as 30 × 10³, add to get 35 × 10³, and renormalise to 3.5 × 10⁴. Getting that alignment step wrong is the most common error in scientific-notation arithmetic.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">E Notation, Keyboards and Code</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Keyboards have no superscript keys, so calculators and programming languages use E as shorthand for times ten to the power of. On screen 6.02e23 means 6.02 × 10²³, 1e-9 means 1 × 10⁻⁹, and in JavaScript, Python, C and JSON the same form is a valid numeric literal — parseFloat("2.5e4") returns 25000. The e carries no arithmetic meaning of its own; it is purely a display convention for an exponent that follows. Watch for the difference between a negative exponent and a negative number: 2e-3 is positive 0.002, while −2e3 is negative 2000. Sign confusion in E notation produces answers that are wrong by orders of magnitude and completely invisible on a quick read.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Significant figures survive notation untouched: 4.50 × 10³ has three of them, and 4.5 × 10³ has two, so never pad zeros into a mantissa to make it look precise. When you convert a number ending in zeros, drop them from the mantissa rather than keeping them as placeholder digits. And sanity-check the exponent by counting digits from the original decimal point — one count is worth a thousand re-derivations.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is scientific notation?", answer: "A number written as m × 10ⁿ where m has exactly one non-zero digit before the decimal point. 6020 becomes 6.02 × 10³, and 0.00045 becomes 4.5 × 10⁻⁴." },
      { question: "How do I convert a small number like 0.00045?", answer: "Move the decimal point four places to the right to get 4.5, so the exponent is −4: 4.5 × 10⁻⁴. A negative exponent always signals a value below one." },
      { question: "What does the E on my calculator screen mean?", answer: "It is shorthand for times ten to the power of. 1.5e3 means 1.5 × 10³ = 1500, and 2e-3 means 2 × 10⁻³ = 0.002." },
      { question: "How do I multiply numbers in scientific notation?", answer: "Multiply the mantissas and add the exponents: (3.2 × 10⁵) × (4.5 × 10⁻³) = 14.4 × 10² = 1.44 × 10³ after normalising." },
      { question: "Why must the mantissa be between 1 and 10?", answer: "It is the standard form that makes every number comparable at a glance. If the multiplication pushes the mantissa outside that range, shift the decimal point and adjust the exponent to bring it back." },
      { question: "What does a negative exponent mean?", answer: "It means a division by that power of ten: 10⁻³ = 0.001. It says nothing about the sign of the whole number, which is carried by the mantissa." },
      { question: "How do I add 3 × 10⁴ and 5 × 10³?", answer: "Match the exponents first: 3 × 10⁴ = 30 × 10³, then 30 × 10³ + 5 × 10³ = 35 × 10³, which normalises to 3.5 × 10⁴." },
      { question: "How many significant figures does scientific notation keep?", answer: "Exactly as many as the mantissa displays. 4.50 × 10³ carries three significant figures while 4.5 × 10³ carries two, so the notation preserves precision information instead of hiding it." },
      { question: "Is 1e6 the same as 1 × 10⁶?", answer: "Yes. In calculators and programming languages 1e6 is a literal meaning 1000000, and 1e-6 means 0.000001. The e only introduces the exponent." },
      { question: "Is this scientific notation calculator free?", answer: "Yes, it is free to use and every conversion runs locally in your browser." }
    ],
    relatedCalculators: [
      { name: 'Scientific', path: '/scientific-calculator.html' },
      { name: 'Scientific Constants', path: '/scientific-constants.html' },
      { name: 'Programming', path: '/programming-calculator.html' },
      { name: 'Logarithm', path: '/logarithm-calculator.html' }
    ],
    howWeCalculate: {
      formula: "N = m × 10ⁿ with 1 ≤ |m| < 10; n equals the number of places the decimal point moved",
      explanation: "The decimal point is shifted until one non-zero digit remains in front of it, and the exponent counts those steps: left moves give positive exponents and right moves give negative exponents. Arithmetic on pairs of notation values multiplies or divides mantissas while adding or subtracting exponents, then renormalises the result.",
      example: "45200 = 4.52 × 10⁴ and 0.00073 = 7.3 × 10⁻⁴"
    },
    workedExample: {
      scenario: "Multiply 3.2 × 10⁵ by 4.5 × 10⁻³ and give the answer in standard form",
      steps: [
        "Multiply the mantissas: 3.2 × 4.5 = 14.4",
        "Add the exponents: 5 + (−3) = 2",
        "Combine the parts: 14.4 × 10²",
        "Renormalise by shifting the mantissa one place left: 1.44 × 10³"
      ],
      result: "1.44 × 10³, which equals 1440"
    },
    commonValues: {
      heading: "Everyday numbers in scientific notation",
      columns: ["Number", "Scientific notation"],
      rows: [
        ["1,000", "1 × 10³"],
        ["250,000", "2.5 × 10⁵"],
        ["602000000000000000000000", "6.02 × 10²³"],
        ["98.7", "9.87 × 10¹"],
        ["0.042", "4.2 × 10⁻²"],
        ["0.000001", "1 × 10⁻⁶"]
      ]
    }
  },
  'logarithm-calculator': {
    title: "Find Any Logarithm with Our Step-by-Step",
    subtitle: "Logarithm Calculator",
    introduction: "Almost every exponential problem eventually asks the same question: what exponent produced this number? That is the logarithm, and learning to compute it turns equations that look impossible into simple arithmetic. If a population triples from 400 to 1200 under a model of 400 × 1.5^t, taking logs of both sides isolates t immediately instead of leaving you guessing between 2 and 3. This calculator takes a number and any valid base and returns the logarithm, using the change of base identity internally so that bases such as 7, 12 or 0.4 work as easily as base 10. Just as valuable is the reverse direction: rewriting a logarithmic answer as an exponential equation lets you verify it by eye, because log_b(N) = x and b^x = N are the same statement written two ways. The sections below cover solving for hidden exponents, computing unusual bases by hand, and the log rules that collapse messy products into clean sums.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Solving for the Exponent You Cannot See</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Exponential equations have the unknown in the exponent, which rules out ordinary isolation. Taking the logarithm of both sides fixes it, because a log applied to an exponential cancels the outer layer: from 2^x = 100, take log base 10 of both sides to get x × log(2) = log(100) = 2, so x = 2 ÷ 0.3010 ≈ 6.644. You may use any base as long as you use it on both sides — natural logs work just as well and are usually faster to type. The same move handles growth and decay models: if a quantity follows 500 × 2^(t ÷ 9) and you want the time to reach 4000, divide to get 2^(t ÷ 9) = 8, recognise that log₂(8) = 3, and read off t = 27 directly.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Any Base, Using Only ln</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Before calculators, unusual bases required printed tables or slide rules. The change of base identity removes that limitation: log_b(x) = ln(x) ÷ ln(b), valid for every valid base. To evaluate log₇(50), divide ln(50) ≈ 3.9120 by ln(7) ≈ 1.9459 to get about 2.0104, a result you can verify instantly because 7² = 49 sits just below 50. Base 10 and base e dominate practice — base 10 for scientific scales and engineering, base e for growth and calculus — while base 2 rules computing. Knowing that log₁₀(2) ≈ 0.3010 lets you convert any doubling into a decade: ten doublings give 10 × 0.3010 ≈ 3.01 in base-10 logs, a factor of about 1000.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Log Rules That Collapse the Mess</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Three identities do the heavy lifting: the log of a product is the sum of the logs, the log of a quotient is the difference, and the log of a power brings the exponent down in front. Written out: log(ab) = log(a) + log(b), log(a ÷ b) = log(a) − log(b), and log(aⁿ) = n × log(a). The power rule is what linearises exponential data — plotting log(y) against x turns y = 100 e^(0.5x) into a straight line whose slope is 0.5. What you cannot do is split the log of a sum: log(a + b) has no simplification at all, and treating it as log(a) + log(b) is a classic error that silently corrupts an entire derivation.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Always verify a logarithm by converting it back: if the calculator says log₅(125) = 3, then 5³ should equal 125, and it does. Anchors speed everything up — the logarithm of 1 is 0 in every base, the logarithm of the base itself is 1, and a value below 1 always produces a negative answer. Inputs of zero or less have no real logarithm and will be rejected.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "If 2^x = 56, what is x?", answer: "x = log₂(56). Using change of base, ln(56) ÷ ln(2) ≈ 4.0254 ÷ 0.6931 ≈ 5.807, which checks out because 2⁵ = 32 and 2⁶ = 64." },
      { question: "How do I evaluate log base 7 of 50 without a table?", answer: "Use change of base: ln(50) ÷ ln(7) ≈ 3.9120 ÷ 1.9459 ≈ 2.0104. Since 7² = 49, an answer just above 2 is exactly what you should expect." },
      { question: "Why can't I take a logarithm of zero?", answer: "No power of a positive base equals zero — the values only approach zero as the exponent slides toward minus infinity. Zero and negative inputs have no real logarithm." },
      { question: "How do I solve 3^(2x) = 250?", answer: "Take logs of both sides: 2x × ln(3) = ln(250), so x = ln(250) ÷ (2 × ln 3) ≈ 5.5215 ÷ 2.1972 ≈ 2.513." },
      { question: "Which log rules apply to products and quotients?", answer: "log(ab) = log(a) + log(b) and log(a ÷ b) = log(a) − log(b). Both require every term to share the same base, and neither works for a sum or difference inside the log." },
      { question: "What is an antilogarithm?", answer: "It is the inverse operation: the antilog base b of y is b^y. Antilog₁₀(3) = 1000, and it is how you convert a logarithmic answer back into the quantity it came from." },
      { question: "How long until a culture of 500 bacteria reaches 4000 if it doubles every 9 hours?", answer: "Set 500 × 2^(t ÷ 9) = 4000, giving 2^(t ÷ 9) = 8, so t ÷ 9 = log₂(8) = 3 and t = 27 hours." },
      { question: "Why is log₁₀(2) ≈ 0.3010 worth memorising?", answer: "Every doubling adds 0.3010 to a base-10 logarithm, so three doublings add about 0.903, an eightfold increase. It is also the basis of the rule of 70 used for doubling times." },
      { question: "What is the base of the natural logarithm?", answer: "Euler's number e ≈ 2.71828. ln(x) is simply log base e, written as ln rather than log to avoid confusion with the base 10 convention." },
      { question: "Is this logarithm calculator free?", answer: "Yes, it is free, needs no account, and runs entirely on your device." }
    ],
    relatedCalculators: [
      { name: 'Logarithmic', path: '/logarithmic-calculator.html' },
      { name: 'Exponential', path: '/exponential-calculator.html' },
      { name: 'Scientific', path: '/scientific-calculator.html' },
      { name: 'Sequence', path: '/sequence-calculator.html' }
    ],
    howWeCalculate: {
      formula: "log_b(N) = ln(N) ÷ ln(b); equivalently b^x = N means x = log_b(N)",
      explanation: "The natural logarithm of the target is divided by the natural logarithm of the requested base, an identity that works for any base above zero other than one. Results are verified against the defining exponential relation, and inputs of zero or below are rejected because no real logarithm exists for them.",
      example: "log₇(49) = ln(49) ÷ ln(7) = 3.8918 ÷ 1.9459 = 2"
    },
    workedExample: {
      scenario: "A bacteria culture starts at 500 and doubles every 9 hours. When does it reach 4000?",
      steps: [
        "Write the growth model: 500 × 2^(t ÷ 9) = 4000",
        "Divide both sides by 500: 2^(t ÷ 9) = 8",
        "Take log base 2: t ÷ 9 = log₂(8) = 3",
        "Multiply by 9: t = 27 hours"
      ],
      result: "t = 27 hours"
    },
    commonValues: {
      heading: "Logarithms of perfect powers",
      columns: ["Expression", "Value"],
      rows: [
        ["log₂(64)", "6"],
        ["log₁₀(0.001)", "−3"],
        ["ln(20)", "2.9957"],
        ["log₅(125)", "3"],
        ["log₄(8)", "1.5"],
        ["log₂(56)", "5.807"]
      ]
    }
  },
  'exponential-calculator': {
    title: "Exponential Functions Solved Instantly with Our",
    subtitle: "Exponential Calculator",
    introduction: "Exponential functions describe change that feeds on itself: money earning interest, a culture dividing, a virus spreading, a charge draining through a resistor. Their shape — slow at first, then relentless — is why compound interest is called the eighth wonder and why populations outgrow every linear forecast. The general form is a constant raised to a variable power, and the base decides everything: above 1 the curve grows without bound, between 0 and 1 it decays toward zero, and the special base e ≈ 2.71828 produces the only function whose rate of change equals its own value, which is why it appears in every growth law written in continuous form. This calculator evaluates any base to any exponent, including negative and fractional powers, and pairs with the logarithmic tools that invert it. The sections below separate growth from decay, explain what is genuinely special about e, and lay out the exponent laws that keep hand checks fast.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Growth, Decay and What the Base Decides</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          In y = a × b^x the coefficient a is the starting value at x = 0 and the base b controls direction. With b above 1 the quantity multiplies by the same factor over each equal step — a population tripling every generation — while a base between 0 and 1 shrinks it: 0.5^x halves the value each step, which is exactly what radioactive decay does. Because equal x steps produce equal ratios rather than equal differences, exponential change always eventually overtakes linear change, however cautious it looks at the start. Half-life is the decay twin of doubling time: for a continuous model N = N₀ × e^(−kt), the half-life is ln(2) ÷ k ≈ 0.693 ÷ k, independent of how much material you began with. That independence is what makes half-life a constant of the substance rather than of the sample.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Why e Is Not Just Another Base</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          e emerges from the limit of (1 + 1 ÷ n)^n as n grows, settling at 2.718281828…, and its defining property is that e^x is its own derivative. No other base has that: 2^x grows at 0.693 times its own value, 10^x at 2.303 times, and only e^x grows exactly at its current size. Physically that means continuous compounding — an account at rate r compounds to A = P × e^(r × t), which is always at least as much as discrete compounding at the same rate, and slightly more as compounding gets more frequent. Complex numbers finish the story: e^(iθ) = cos θ + i sin θ, and at θ = π gives e^(iπ) + 1 = 0, linking exponentials to trigonometry in one line.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Exponent Laws for Quick Checks</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Five rules cover almost every manipulation. Multiplying powers of the same base adds exponents, dividing subtracts them, a power of a power multiplies them, any non-zero base to the power zero is 1, and a negative exponent means the reciprocal: 2⁻³ = 1 ÷ 8 = 0.125. Fractional exponents are roots, so 9^(1 ÷ 2) = 3 and 8^(1 ÷ 3) = 2, which lets one notation replace every radical sign. Together these rules explain why 1.05^20 can be estimated without a calculator — split it into (1.05^10)^2 — and why logs and exponentials are treated as inverse operations of each other in every algebra course.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Order of magnitude beats decimal precision in exponential work: if your answer for e^10 is not somewhere near 22000, the setup is wrong regardless of how many digits you typed. Remember that b⁰ = 1 for every non-zero b, and that an exponent of 0.5 means a square root, not a division by two. When a decay model gives a negative exponent, that is not an error — it is the standard way of writing division.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is an exponential function?", answer: "A function of the form f(x) = b^x where the variable sits in the exponent. Equal steps in x produce equal ratios in y, which is why growth compounds instead of merely adding." },
      { question: "What is so special about the number e?", answer: "e ≈ 2.71828 is the unique base for which the function e^x grows at exactly its own current value — its derivative equals itself. That property makes it the natural base for continuous growth models." },
      { question: "What is the difference between 2^x and e^x?", answer: "Both grow, but at different rates. e^x grows at 1 times its own value, while 2^x grows at ln(2) ≈ 0.693 times its value, so e^x eventually pulls far ahead." },
      { question: "What is half-life and how do I calculate it?", answer: "It is the time for half of a decaying quantity to remain. For N = N₀ × e^(−kt), the half-life is ln(2) ÷ k ≈ 0.693 ÷ k, and it does not depend on the starting amount." },
      { question: "How do I handle negative exponents?", answer: "They mean the reciprocal: 2⁻³ = 1 ÷ 2³ = 0.125, and 10⁻⁴ = 0.0001. The base stays positive; only the direction changes." },
      { question: "How does compound interest connect to exponentials?", answer: "Discrete compounding gives A = P × (1 + r ÷ n)^(nt), and as compounding periods grow without limit the expression approaches A = P × e^(rt), the continuous version." },
      { question: "Why does exponential growth beat every linear trend?", answer: "A linear function adds a fixed amount each step while an exponential multiplies by a fixed factor, so beyond some point the multiplication always wins, no matter how small the factor." },
      { question: "What are the rules for multiplying powers?", answer: "With the same base you add exponents: 2³ × 2⁴ = 2⁷. Dividing subtracts them, and raising a power to a power multiplies them: (2³)⁴ = 2¹²." },
      { question: "What is zero to the power zero?", answer: "It is left undefined because the limits disagree: x⁰ = 1 for any non-zero x, while 0ⁿ = 0 for positive n. Calculators report it as an error rather than choosing a side." },
      { question: "Is this exponential calculator free?", answer: "Yes, it is free to use and all calculations stay in your own browser." }
    ],
    relatedCalculators: [
      { name: 'Logarithm', path: '/logarithm-calculator.html' },
      { name: 'Power', path: '/power-calculator.html' },
      { name: 'Graphing', path: '/graphing-calculator.html' },
      { name: 'Scientific', path: '/scientific-calculator.html' }
    ],
    howWeCalculate: {
      formula: "y = bˣ = e^(x × ln b); continuous growth A = P × e^(r × t)",
      explanation: "Powers are evaluated by converting the base to natural exponentials, which keeps full double precision for any base and exponent, including negative and fractional ones. Compound-growth variants apply the same exponential law to the principal, rate and time you provide.",
      example: "2¹⁰ = 1024, e⁰ = 1, 3⁻² = 1 ÷ 9 ≈ 0.1111"
    },
    workedExample: {
      scenario: "Deposit $1,000 at 5% annual interest compounded monthly for 6 years",
      steps: [
        "Identify the inputs: P = 1000, r = 0.05, n = 12, t = 6",
        "Number of periods: n × t = 12 × 6 = 72",
        "Periodic growth factor: 1 + 0.05 ÷ 12 = 1.0041667",
        "A = 1000 × 1.0041667^72 ≈ 1000 × 1.34902"
      ],
      result: "A ≈ $1,349.02, giving $349.02 of interest"
    },
    commonValues: {
      heading: "Exponential values at a glance",
      columns: ["Expression", "Value"],
      rows: [
        ["2⁵", "32"],
        ["3³", "27"],
        ["10⁻²", "0.01"],
        ["2⁻³", "0.125"],
        ["e⁰", "1"],
        ["e²", "7.3891"],
        ["9^0.5", "3"]
      ]
    }
  },
  'programming-calculator': {
    title: "Programming Math for Devs with Our",
    subtitle: "Programming Calculator",
    introduction: "Programmers do arithmetic that most calculators ignore. Values arrive in binary, octal and hexadecimal, colours are packed into six-digit hex strings, flags live in individual bits, and a signed integer that overflows wraps around to a negative number without any warning. This calculator covers the conversions and the bitwise operations that make up that daily arithmetic: decimal to binary, binary to hex, mask extraction, bit setting, XOR toggling and shift-based scaling. Understanding place value in base 2 and base 16 is the foundation — every hex digit is exactly four bits, which is why programmers read hex as shorthand for binary — and once bits are individual objects, AND, OR, XOR and NOT stop feeling like exotic operators and start feeling like the switchboard they are. The sections below walk through bases and conversion, the four bitwise operators with worked examples, and two's complement, the scheme that lets one range of bits hold both positive and negative numbers.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Number Bases and Place Value</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Base 10 works because we have ten fingers: each place is ten times the one to its right. Binary uses two digits, so each place doubles — 11001 is 16 + 8 + 1 = 25 — and hexadecimal uses sixteen digits, 0 to 9 then A to F, so each digit packs exactly four binary bits. That relationship is why 0xFF is 255, and why a hex literal such as 0x1A splits straight into the nibbles 0001 and 1010. Converting decimal to any base is repeated division: divide by the base and keep the remainders, then read them upwards, so 25 ÷ 2 gives remainders 1, 0, 0, 1, 1 and thus 11001. Reading hex as a colour code, an address or a bitmask becomes trivial once you accept that hex is binary with the zeros compressed.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Bitwise Operators, One Column at a Time</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Bitwise AND returns 1 only where both bits are 1, OR returns 1 where either is, XOR returns 1 where they differ, and NOT flips every bit. Line up 5 (101) and 3 (011) and the answers fall out: AND gives 001 = 1, OR gives 111 = 7, XOR gives 110 = 6. These are not arithmetic analogues of the logical operators — logical AND would treat both numbers as simply true and return 1, while bitwise AND inspects each column independently. Shifts move bits left or right: shifting 5 left by two places multiplies it by 4 to give 20, because each left shift doubles the value, and shifting right divides by two with truncation. Programmers use AND with a mask to test a bit, OR to set it, XOR to toggle it, and XOR again with the same value to restore it, since XORing twice is an identity.
        </p>
        <ul className="space-y-2 text-neutral-400 text-sm leading-relaxed mb-6">
          <li><span className="text-white font-semibold">AND</span> — a bit survives only where both are 1: 1101 AND 1011 = 1001</li>
          <li><span className="text-white font-semibold">OR</span> — a bit survives where either is 1: 1101 OR 1011 = 1111</li>
          <li><span className="text-white font-semibold">XOR</span> — a bit survives only where the two differ: 1101 XOR 1011 = 0110</li>
          <li><span className="text-white font-semibold">NOT</span> — every bit flips: NOT 1101 = 0010 in four-bit arithmetic</li>
          <li><span className="text-white font-semibold">Shift</span> — each place left doubles, each place right halves: 5 shifted left twice = 20</li>
        </ul>
        <h3 className="text-xl font-bold text-white mb-4">Two's Complement and Signed Integers</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The most significant bit doubles as a sign flag in two's complement, the scheme every modern language uses. To encode a negative number, invert all the bits of its positive form and add one: 5 is 00000101 in eight bits, inverting gives 11111010, and adding one gives 11111011, so −5 is 0xFB. The benefit is that addition and subtraction need no special case — the hardware simply adds, and the sign takes care of itself — while the cost is a range of −128 to 127 for eight bits with exactly one more negative than positive value. Overflow is the trap: 127 plus 1 in signed eight-bit arithmetic does not raise an error, it wraps to −128, which is the root cause of a whole genre of production bug.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Prefix literals to avoid base confusion: 0x for hexadecimal, 0b for binary, 0o for octal — 0xFF, 0b1010 and 0o17 are 255, 10 and 15. Hex digits group in fours for a reason, so 1101 0110 reads as D6 without counting. And when a mask question confuses you, write the bits in columns and apply one operator per column; the answer is rarely subtle.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I convert the decimal number 25 to binary?", answer: "Divide repeatedly by 2 and keep the remainders: 25 → 12 r1, 6 r0, 3 r0, 1 r1, 0 r1. Reading the remainders upwards gives 11001, which is 16 + 8 + 1." },
      { question: "Why do programmers use hexadecimal?", answer: "Each hex digit is exactly four bits, so binary becomes readable: 1111 1111 is simply FF, or 255. Colours (#FF8000), addresses and byte dumps all rely on that compression." },
      { question: "What is two's complement?", answer: "The signed integer encoding where a negative value is written as the inverted bits of its magnitude plus one. In 8 bits, −5 is 11111011 (0xFB), and adding it to 5 correctly yields zero." },
      { question: "What is the difference between bitwise AND and logical AND?", answer: "Bitwise AND compares corresponding bits of two integers and returns an integer pattern. Logical AND treats each whole operand as true or false and returns a single true or false." },
      { question: "How does a left shift work?", answer: "Shifting left by n places multiplies a non-negative integer by 2^n, because every bit gains a place value twice as large. So 5 shifted left twice is 20." },
      { question: "What is a bit mask?", answer: "A pattern with bits selected for inspection. AND with a mask keeps only those bits, OR sets them, and XOR toggles them — the standard way to read and write status flags." },
      { question: "What do the 0x, 0b and 0o prefixes mean?", answer: "They declare the base of a literal: 0xFF is hexadecimal for 255, 0b1010 is binary for 10, and 0o17 is octal for 15. Without them a reader would assume decimal." },
      { question: "What is integer overflow?", answer: "When a value exceeds what the fixed-width type can hold. In signed 8-bit arithmetic 127 + 1 wraps to −128 rather than raising an error, which is why overflow bugs are so easy to miss." },
      { question: "Why is XOR so useful?", answer: "XORing twice restores the original value, it flags differences, and it needs no temporary variable when swapping values. It also underpins parity checks, RAID striping and many hash and cipher designs." },
      { question: "Is this programming calculator free?", answer: "Yes, it is free to use and runs entirely on your own machine — no code or values are uploaded." }
    ],
    relatedCalculators: [
      { name: 'Binary/Hex/Decimal', path: '/binary-hex-decimal-converter.html' },
      { name: 'Bitwise', path: '/bitwise-calculator.html' },
      { name: 'Time Complexity', path: '/time-complexity-calculator.html' },
      { name: 'Memory Size', path: '/memory-size-calculator.html' }
    ],
    howWeCalculate: {
      formula: "value = Σ digit × base^position; x AND y, x OR y, x XOR y applied bit by bit",
      explanation: "Base conversion works by repeated division for decimal-to-base and by place-value summation for base-to-decimal. Bitwise operators align the two operands in binary columns and apply their truth table independently to each column, while shifts move every bit and therefore multiply or divide by powers of two.",
      example: "25 = 11001₂ = 0x19; 5 AND 3 = 1, 5 OR 3 = 7, 5 XOR 3 = 6"
    },
    workedExample: {
      scenario: "Set bit 2 in the status byte 0b11010010 and then verify that it is set",
      steps: [
        "Build a mask containing only bit 2: 0b00000100",
        "OR the mask with the flags: 11010010 OR 00000100 = 11010110, so 210 becomes 214",
        "Test the bit with AND: 11010110 AND 00000100 = 00000100",
        "A non-zero result means the bit is set; a zero result would mean it is clear"
      ],
      result: "Flags = 0b11010110 (214), bit 2 set"
    },
    commonValues: {
      heading: "Decimal, binary and hexadecimal equivalents",
      columns: ["Decimal", "Binary", "Hex"],
      rows: [
        ["0", "0", "0x0"],
        ["10", "1010", "0xA"],
        ["16", "10000", "0x10"],
        ["42", "101010", "0x2A"],
        ["255", "11111111", "0xFF"],
        ["1024", "10000000000", "0x400"],
        ["−5 (8-bit)", "11111011", "0xFB"]
      ]
    }
  }
};
