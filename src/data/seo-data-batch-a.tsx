import type { CalculatorSEOContent } from './seo-data';

export const SEO_DATA_BATCH_A: Record<string, CalculatorSEOContent> = {
  'standard': {
    title: "Standard Math Made Easy with Our Free",
    subtitle: "Standard Calculator",
    introduction: "Sometimes you do not need a scientific engine or a spreadsheet. You need to add up a few numbers, split a bill, check the figure printed on an invoice, and you need the answer in three seconds. The standard calculator on TheCalHub is exactly that: a clean four-function tool for addition, subtraction, multiplication and division, with a running equation line so you can always see what you typed. It is built for students checking homework, shoppers totting up a basket, office workers tallying expenses, and anyone who wants a dependable result without opening a heavyweight calculator app. Everything runs locally in your browser, so no figure you enter is ever transmitted anywhere, and long results are rounded to six decimal places so the display stays readable. Below you will find how this calculator sequences its operations, where it deliberately stops short of full algebra, and a few practical shortcuts for checking your own arithmetic.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How the Standard Calculator Sequences Operations</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The standard calculator evaluates your expression from left to right, in the order you press the keys. It holds a running total, applies the next operator to that total, then moves on. That means typing <strong>2 + 3 × 4</strong> gives <strong>20</strong>, because it computes 2 + 3 first and multiplies the result by 4 — not the 14 you would get from strict order-of-operations rules. If your calculation depends on BODMAS or PEMDAS precedence, enter it in stages or switch to our scientific calculator, which honours operator precedence.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Precision, Rounding and the Equation Line</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Results are rounded to six decimal places, which is more than enough for everyday money and measurement work while keeping the screen tidy. The equation line above the display keeps your pending expression visible, so a half-finished sum is easy to audit before you press equals. Decimals are handled throughout, and dividing by zero is caught and reported as an error rather than producing a silent wrong number.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Verify any result by running the inverse operation: if 45 × 12 gives 540, then 540 ÷ 12 must return 45. This single habit catches mistyped digits faster than re-reading the display, and it costs only one extra calculation.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Does this calculator follow BODMAS or PEMDAS?", answer: "No. It evaluates strictly left to right as you press the keys, so 2 + 3 × 4 returns 20. For precedence-aware calculations use our scientific or graphing calculator." },
      { question: "How many decimal places does it show?", answer: "Results are rounded to six decimal places. Values longer than that are trimmed, while shorter values display without trailing zeros where possible." },
      { question: "What happens if I divide by zero?", answer: "The calculator stops and shows Error instead of a number, because division by zero is mathematically undefined." },
      { question: "Can I correct a digit without clearing everything?", answer: "The delete key removes the last digit you entered, while the clear key resets the whole calculation back to zero." },
      { question: "Does it handle negative numbers?", answer: "Yes. Subtracting a larger number from a smaller one returns a negative result, and you can continue calculating from that negative value." },
      { question: "Can it do percentages, roots or powers?", answer: "Not in this view. Use the percentage calculator for discounts and shares, or the square root and power calculators for exponents." },
      { question: "How large a number can it accept?", answer: "It comfortably handles figures up to the limits of standard floating point arithmetic, which is far beyond any everyday budget or measurement." },
      { question: "What is the equation line for?", answer: "It shows the expression you are building, for example 1,250 + 340 −, so you can confirm the operator before committing to the next step." },
      { question: "Can I use it on a phone?", answer: "Yes. The keypad is touch friendly and the layout adapts from desktop to mobile without losing any buttons." },
      { question: "Do you store the numbers I enter?", answer: "No. Every calculation runs in your browser and nothing is uploaded, saved on a server or shared with third parties." }
    ],
    howWeCalculate: {
      formula: "running = (((((v₁ op₁ v₂) op₂ v₃) op₃ v₄) …",
      explanation: "Each operator is applied to the running total produced by everything typed before it, left to right. The final value is rounded to six decimal places, and a division by zero aborts the calculation with an error flag.",
      example: "2 + 3 × 4 = 20, because the calculator computes (2 + 3) first and then multiplies by 4."
    },
    workedExample: {
      scenario: "Check a shop total by typing 1,250 + 340 − 190 × 2 from left to right",
      steps: [
        "1,250 + 340 = 1,590 (running total)",
        "1,590 − 190 = 1,400",
        "1,400 × 2 = 2,800"
      ],
      result: "2,800 with left-to-right entry (strict BODMAS would give 1,210)"
    },
    commonValues: {
      heading: "Handy four-function checks",
      columns: ["Calculation", "Result"],
      rows: [
        ["1,250 + 340", "1,590"],
        ["159 − 64", "95"],
        ["12 × 25", "300"],
        ["1,000 ÷ 8", "125"]
      ]
    },
    relatedCalculators: [
      { name: 'Percentage', path: '/percentage-calculator.html' },
      { name: 'Average', path: '/average-calculator.html' },
      { name: 'Ratio', path: '/ratio-calculator.html' }
    ]
  },
  'percent-calculator': {
    title: "Percent Questions Solved with Our Free",
    subtitle: "Percent Calculator",
    introduction: "Percentages hide inside almost every number you meet: the discount on a tag, the tax line on a receipt, the growth figure in a quarterly report, the score on a test. The percent calculator on this page answers the three questions people actually ask about percentages, and nothing else, so there is no mode hunting and no guesswork. You can find what a percentage of a number is, work out what share one number is of another, and measure the percentage change between two values — the exact operation you need when comparing prices, sales targets, exam scores, weight loss or investment returns. Each answer updates as you type, with the full written-out equation shown alongside it so you can follow the logic instead of trusting a black box. This page explains how each mode is calculated, why percentage change behaves less intuitively than it seems, and includes a worked example showing how two stacked discounts do not add up the way most people assume.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Three Modes and What Each One Answers</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          <strong>X% of Y</strong> multiplies Y by the percentage and divides by 100 — this is the discount, tax and tip mode. <strong>X is what % of Y</strong> divides X by Y and multiplies by 100, which is how you find a score, a market share or what proportion of your budget is spent. <strong>% change</strong> takes the difference between two values, divides it by the original value and multiplies by 100, which is how growth, decline and inflation are reported. The tool writes each equation out in full so the arithmetic can be checked by eye.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Percentage Change Is Not Symmetric — and Other Traps</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Moving from 50 to 75 is a 50% gain, but moving back from 75 to 50 is only a 33.33% loss, because each percentage is measured against a different base. Percentage changes above 100% are perfectly legal when a value more than doubles, and a change of 0% means the two figures are identical. Watch the wording too: a fall of 20 percentage points is an absolute subtraction, while a fall of 20% is relative to where you started — mixing the two is the most common reporting error.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            A rise and an equal fall do not cancel out. A 50% gain followed by a 50% loss leaves you 25% down overall, because the second percentage applies to a larger number. Always ask what the percentage is measured against before comparing two growth figures.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the difference between percent of and percent change?", answer: "Percent of asks how big a piece of a number is, for example 15% of 200. Percent change compares two different numbers and reports the relative movement between them." },
      { question: "How do I calculate a 30% discount?", answer: "Use X% of Y: enter 30 as the percentage and the marked price as the value. The result is the amount saved; subtract it from the price to get what you pay." },
      { question: "Why is percentage change asymmetric?", answer: "Because the base changes. Going from 50 to 75 is +50% of 50, while going back from 75 to 50 is −33.33% of 75. Reverse movements rarely produce equal percentages." },
      { question: "Can a percentage be greater than 100?", answer: "Yes. If a value grows from 40 to 120, that is a 200% increase. Percentages above 100 simply mean the new figure is larger than the original base." },
      { question: "What does a negative percentage change mean?", answer: "It means the value fell. A −12% change means the new figure is 12% lower than the original, not that it dropped by 12 units." },
      { question: "What is a percentage point?", answer: "A percentage point is the plain arithmetic difference between two percentages. If a rate moves from 8% to 10%, it rose by 2 percentage points, or 25% in relative terms." },
      { question: "How do I find what percent one number is of another?", answer: "Use the X is what % of Y mode. Divide the part by the whole and multiply by 100 — for example 45 of 60 is 75%." },
      { question: "How do I strip tax or GST out of a total?", answer: "Divide the inclusive amount by 1 plus the rate as a decimal. A total of 1,180 at 18% gives 1,180 ÷ 1.18 = 1,000, so the tax portion is 180." },
      { question: "What if the original value is zero?", answer: "Percentage change is undefined when the starting value is zero, because you cannot divide by nothing. The calculator reports it as undefined rather than guessing." },
      { question: "Does the result get rounded?", answer: "Percentage outputs are shown to two decimal places so small movements stay visible, and the full equation is printed next to the answer." }
    ],
    howWeCalculate: {
      formula: "part = (X × Y) ÷ 100  ·  share% = (X ÷ Y) × 100  ·  change% = ((new − old) ÷ old) × 100",
      explanation: "Each mode uses the standard definition of a percentage as a fraction of 100. Percentage change always divides by the original value, which is why gains and losses of the same size do not reverse cleanly.",
      example: "15% of 250 = 37.5  ·  60 is 24% of 250  ·  a move from 200 to 260 is +30%"
    },
    workedExample: {
      scenario: "A 2,400 jacket is reduced by 30%, then a further 10% comes off the sale price",
      steps: [
        "30% of 2,400 = 720, so the sale price is 2,400 − 720 = 1,680",
        "10% of 1,680 = 168, so the final price is 1,680 − 168 = 1,512",
        "Total saved = 2,400 − 1,512 = 888, and 888 ÷ 2,400 × 100 = 37%"
      ],
      result: "You saved 888, which is 37% overall — not the 40% the two discounts suggest"
    },
    commonValues: {
      heading: "Percentage benchmarks at a glance",
      columns: ["Rate", "Of 100", "Of 250", "Of 1,000"],
      rows: [
        ["10%", "10", "25", "100"],
        ["15%", "15", "37.5", "150"],
        ["25%", "25", "62.5", "250"],
        ["50%", "50", "125", "500"]
      ]
    },
    relatedCalculators: [
      { name: 'Percentage', path: '/percentage-calculator.html' },
      { name: 'GST', path: '/gst-calculator.html' },
      { name: 'Ratio', path: '/ratio-calculator.html' }
    ]
  },
  'gst-calculator': {
    title: "Add or Remove GST Instantly with Our Free",
    subtitle: "GST Calculator",
    introduction: "Goods and Services Tax appears on nearly every invoice, quotation and price tag in a GST economy, and getting it wrong is expensive: bill too little and you absorb the difference, bill too much and the customer questions your arithmetic. This GST calculator handles both directions of the problem. Enter a base amount and it adds the tax to produce the payable total; enter a tax-inclusive amount and it strips the tax back out to reveal the taxable value — the operation most people get wrong by simply taking a percentage of the total. The standard slab buttons cover the common rates in one tap, while the rate field accepts any figure you need, including the reduced rates that apply to particular goods and services. It is designed for shopkeepers raising invoices, freelancers quoting clients, students learning indirect tax, and anyone who wants to check a bill before paying it. The sections below explain the slab structure, why removing GST is not the reverse of adding it, and how intra-state transactions split into central and state components.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">GST Slabs and Where Each Rate Applies</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Most GST systems classify goods and services into a small set of rates — commonly nil, 5%, 12%, 18% and 28% — with essential food and healthcare at the lowest end, everyday items and standard services in the middle, and luxury or demerit goods at the top. The exact items in each slab are decided by the tax authority and revised from time to time, so always confirm the current classification for your product rather than assuming last year's rate still applies. Entering a rate manually lets you handle reduced rates, compounding levies and imported goods that sit outside the standard slabs.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Adding GST vs Removing GST</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Adding is straightforward: tax equals the base multiplied by the rate. Removing is not the same calculation run backwards. If a printed price of 1,180 already includes 18% tax, the taxable value is 1,180 ÷ 1.18 = 1,000, not 1,180 − 18% (which would wrongly give 967.60). The tax is 18% of the base, not 18% of the inclusive total, which is why the calculator uses a separate removal mode instead of asking you to reverse the sign.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            On an intra-state sale the GST you charge is split equally between central and state components, so an 18% charge becomes 9% central plus 9% state. Cross-state supplies carry the combined amount as a single integrated tax. Check which applies before you print the invoice.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What are the standard GST rates?", answer: "Common slabs are nil, 5%, 12%, 18% and 28%, sometimes with an additional compensation cess on luxury items. Slab membership is set by the tax authority and changes occasionally." },
      { question: "What is the difference between adding and removing GST?", answer: "Adding applies the rate to a tax-exclusive base. Removing extracts the tax from a tax-inclusive price by dividing by one plus the rate, which produces a larger base than simply subtracting a percentage." },
      { question: "Why is subtracting 18% from an inclusive price wrong?", answer: "Because the 18% was charged on the base, not on the total. Taking 18% of 1,180 gives 212.40 and leaves 967.60, whereas the correct taxable value is 1,180 ÷ 1.18 = 1,000." },
      { question: "How do I split GST into central and state parts?", answer: "For an intra-state supply, divide the total rate in half. At 18% that is 9% central and 9% state; the calculator's output can be split the same way for your invoice." },
      { question: "When is the integrated rate used instead?", answer: "When the supplier and the customer are in different states, the full rate is charged as one integrated tax and then appropriated between the two governments." },
      { question: "Is the taxable value always the printed price?", answer: "Not for retail goods. Many shelf prices already include tax, which is when the remove mode applies. Wholesale quotations are often quoted exclusive of tax, where the add mode applies." },
      { question: "Can I enter rates other than the four preset slabs?", answer: "Yes. The rate field accepts any percentage, so reduced rates, zero-rated exports and cess-adjusted effective rates can all be modelled." },
      { question: "Does the calculator round the tax amount?", answer: "It shows results to two decimal places for precision. On a formal invoice you may round the tax figure to the nearest whole unit as permitted by the invoicing rules that apply to you." },
      { question: "Who needs this calculator most?", answer: "Small traders, freelancers, consultants and e-commerce sellers who raise invoices daily, plus anyone checking whether a quoted price is genuinely tax inclusive." },
      { question: "Is this tool free to use?", answer: "Yes, it is free, works in your browser, and no amount you enter is stored or transmitted anywhere." }
    ],
    howWeCalculate: {
      formula: "Add: tax = amount × rate ÷ 100, total = amount + tax  |  Remove: base = amount ÷ (1 + rate ÷ 100), tax = amount − base",
      explanation: "GST is always levied on the taxable value. Addition therefore applies the rate to the given base, while removal solves the inclusive equation amount = base × (1 + rate) for the base, which is what makes the two modes asymmetric.",
      example: "1,000 at 18% adds 180 to give 1,180; removing 18% from 1,180 returns a base of 1,000 and tax of 180"
    },
    workedExample: {
      scenario: "A customer is quoted 1,180 inclusive of 18% GST — find the taxable value",
      steps: [
        "Base = 1,180 ÷ 1.18 = 1,000",
        "GST = 1,180 − 1,000 = 180",
        "Intra-state split: central 90 and state 90"
      ],
      result: "Taxable value 1,000, GST 180 (90 + 90 intra-state)"
    },
    commonValues: {
      heading: "GST at 18% on common invoice values",
      columns: ["Amount (excl.)", "GST", "Total (incl.)"],
      rows: [
        ["500", "90.00", "590.00"],
        ["1,000", "180.00", "1,180.00"],
        ["2,500", "450.00", "2,950.00"],
        ["10,000", "1,800.00", "11,800.00"]
      ]
    },
    relatedCalculators: [
      { name: 'Tax', path: '/tax-calculator.html' },
      { name: 'Percentage', path: '/percentage-calculator.html' },
      { name: 'Tip', path: '/tip-calculator.html' }
    ]
  },
  'tip-calculator': {
    title: "Work Out the Perfect Tip with Our Free",
    subtitle: "Tip Calculator",
    introduction: "Few small financial decisions cause as much table-side awkwardness as tipping. You are trying to enjoy a meal, split a bill fairly between friends and arrive at a number that feels generous without being careless — all while the card machine waits. This tip calculator takes the bill amount, the tip percentage you want to leave and the number of people sharing, then returns the tip, the grand total and the exact amount each person owes. It works just as well for a solo coffee, a family dinner, a group of colleagues on a work night out or a delivery order where the total is assembled from several lines. Because the arithmetic happens the moment you change a value, you can play with the percentage — what does 15% cost versus 20% on this bill? — before anyone reaches for a phone. The guidance below covers how much is customary in different countries, why tipping on the pre-tax amount matters, and how to split a bill without leaving somebody short by a few cents.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">What Tip Percentage Is Customary?</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          In the United States, 15% to 20% of the pre-tax bill is the everyday range, with 20% or more expected for genuinely good service and automatic gratuities commonly added for larger parties. In the United Kingdom and much of Europe, service is less heavily tipped and a round-up or 10% is common where no service charge appears. In Japan and several other countries, tipping is unnecessary and can even cause confusion, while in India rounding up the bill or leaving around 10% is typical at restaurants. None of these rules are laws — they are conventions — so treat them as a starting point and adjust for the venue and the service.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Splitting the Bill Without the Awkwardness</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Enter the number of people and the calculator divides the combined total — bill plus tip — evenly, so nobody has to work out their share on a napkin. Tipping is normally calculated on the bill before tax, since the tip rewards the service rather than the government's take, although tipping after tax is acceptable and changes the amount only slightly. When the division leaves an awkward remainder, rounding everyone's share up to the next convenient note is the simplest way to keep the group friendly.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Pro Tip</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            On a 600 bill, moving from 10% to 15% costs just 60 more, while doubling the tip from 10% to 20% adds 120. Percentage points feel abstract until they are converted into the note in your pocket — run both numbers before you decide.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How much should I tip for table service?", answer: "In the US, 15% to 20% of the pre-tax bill is standard, 20% and above for excellent service. Elsewhere, 10% or rounding up the bill is common where a service charge has not already been added." },
      { question: "Should I tip before or after tax?", answer: "Before tax is the customary basis, because the tip pays for service rather than the tax. On a 1,000 bill with 9% tax, the difference between the two methods is under 10." },
      { question: "What about takeaway and delivery orders?", answer: "A smaller percentage is normal: a modest amount for collection and a fuller 10% to 15% for delivery, since the driver is absorbing travel time and costs." },
      { question: "Is a service charge the same as a tip?", answer: "No. A mandatory service charge is part of the bill and goes to the establishment, while a discretionary tip is paid directly and is usually yours to decide the amount of." },
      { question: "What happens when the restaurant adds a gratuity automatically?", answer: "For larger parties many restaurants add 15% to 20% automatically. Check the bill before adding anything extra, and only tip further if the service genuinely exceeds the automatic amount." },
      { question: "How do I split a bill where one person ordered more?", answer: "Settle the difference separately: divide the shared dishes and the tip evenly, then have each person cover their own premium items. The calculator handles the even portion in seconds." },
      { question: "How do I round the tip?", answer: "Enter the percentage, then round the per-person figure up to the next whole unit. Rounding up rather than down covers the remainder and keeps everyone square." },
      { question: "Does the calculator include tax in the bill field?", answer: "Enter the pre-tax amount for the most accurate result. If your bill is a single tax-inclusive figure, the tip will be slightly larger, which most people consider acceptable." },
      { question: "Can I use it for splitting other shared costs?", answer: "Yes. Set the tip to zero and the tool becomes a straightforward bill splitter for rent, groceries, tickets or any shared expense." },
      { question: "Does it work offline on my phone?", answer: "Yes. It is fully responsive, and once the page has loaded the calculation itself needs no connection because it runs entirely on your device." }
    ],
    howWeCalculate: {
      formula: "tip = bill × rate ÷ 100  ·  total = bill + tip  ·  each = total ÷ people",
      explanation: "The tip is computed as a percentage of the bill you enter, added to the bill to give the total, then divided evenly across the group. Changing any one of the three inputs recalculates all three outputs immediately.",
      example: "Bill 1,200 at 18% split 4 ways → tip 216, total 1,416, 354 each"
    },
    workedExample: {
      scenario: "Dinner for four: 3,600 of food before tax, 300 tax, 20% tip on the pre-tax bill",
      steps: [
        "Tip on the food subtotal: 3,600 × 20% = 720",
        "Grand total to pay: 3,600 + 300 + 720 = 4,620",
        "Split four ways: 4,620 ÷ 4 = 1,155 each"
      ],
      result: "1,155 per person, including 180 of tip each"
    },
    commonValues: {
      heading: "Tip and total on a 1,000 bill",
      columns: ["Tip %", "Tip amount", "Grand total"],
      rows: [
        ["10%", "100", "1,100"],
        ["15%", "150", "1,150"],
        ["18%", "180", "1,180"],
        ["20%", "200", "1,200"]
      ]
    },
    relatedCalculators: [
      { name: 'GST', path: '/gst-calculator.html' },
      { name: 'Percentage', path: '/percentage-calculator.html' },
      { name: 'Average', path: '/average-calculator.html' }
    ]
  },
  'financial-calculator': {
    title: "Financial Planning Math Made Simple with Our",
    subtitle: "Financial Calculator",
    introduction: "Before you sign any credit agreement, somebody should tell you what it actually costs — and that somebody is usually nobody. The financial calculator on this page is the compact answer: give it a loan amount, an annual interest rate and a tenure in years, and it returns the monthly instalment, the total you will hand back over the life of the loan, and the portion of that total which is pure interest. It is deliberately small, which makes it ideal for the moment you are comparing two offers in a browser tab, checking whether a car fits your budget, or testing how much a quarter of a percent on the rate is really worth. Because it uses the standard reducing-balance method that banks and lenders apply to amortising credit, the figure you see here matches what an amortisation schedule will show you. The sections below explain why interest dominates the early payments, how to read the three outputs together, and what this calculator deliberately leaves out — fees, insurance and statutory charges — so you are never surprised by the fine print.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">What the Financial Calculator Works Out</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Three inputs produce three outputs. The loan amount, the annual rate and the tenure in years are converted into a fixed monthly instalment using the standard amortisation formula, then multiplied across the tenure to give total payable, with the principal subtracted to reveal total interest. The same engine applies to a home loan, a car loan, a personal loan, a education loan or equipment finance — anything where you borrow a sum and repay it in equal monthly instalments.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">The Reducing-Balance Method Behind the Number</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Interest is charged only on what you still owe, so every payment does two jobs: it clears the interest accrued that month and reduces the balance for the next one. On a 50,00,000 loan at 8.5%, the first month's interest alone is about 35,417 against an instalment of 43,391 — only around 7,974 touches principal. After twelve payments the balance has fallen to roughly 49,00,489, and the interest share shrinks a little every month thereafter. This front-loading is why the total interest figure is so large and why early prepayment saves so much.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Rate differences compound silently. On every 1,00,000 borrowed over ten years, 8% costs 1,213 a month while 9% costs 1,267 — a 54 difference that adds up to 6,480 across 120 payments. Always compare offers on the total payable column, not the instalment alone.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What inputs does this calculator need?", answer: "Only three: the amount you want to borrow, the annual interest rate as a percentage, and the tenure in whole years. Everything else is derived from those figures." },
      { question: "What do the three results mean?", answer: "The monthly instalment is what you pay each month, total payable is every rupee that leaves your account over the tenure, and total interest is the cost of borrowing — total payable minus the amount you borrowed." },
      { question: "Why does most of my first payment go towards interest?", answer: "Because interest is calculated on the full balance before any principal is repaid. On a 50,00,000 loan at 8.5%, the first month's interest is roughly 35,417 while only about 7,974 reduces the balance." },
      { question: "How much difference does half a percent make?", answer: "On 1,00,000 over ten years, 8% costs 1,213 a month and 9% costs 1,267 — 6,480 more across the full tenure for just one percentage point, and roughly half that for half a percent." },
      { question: "Does the result include processing fees and insurance?", answer: "No. It models only principal and interest. Lender fees, documentation charges, insurance premiums and taxes on those fees sit on top of the instalment and should be added separately when you budget." },
      { question: "Can I use it for home, car and personal loans?", answer: "Yes. Any loan repaid in equal monthly instalments on a reducing balance follows this formula, which is why the same calculation underpins our dedicated home, car and personal loan calculators." },
      { question: "Is the number valid for a floating rate loan?", answer: "It is the instalment at the rate you enter. With a floating rate the lender can reprice the loan when the benchmark moves, so treat the figure as a snapshot and re-run it after any rate change." },
      { question: "How does prepayment change the outcome?", answer: "Every extra amount you pay reduces the principal immediately, so all future interest is calculated on a smaller balance. Shortening the tenure typically saves far more than lowering the instalment." },
      { question: "Should I choose a longer or shorter tenure?", answer: "A longer tenure lowers the monthly instalment but raises total interest; a shorter tenure does the reverse. Pick the longest tenure you can comfortably beat with voluntary prepayment." },
      { question: "Is my loan data sent anywhere?", answer: "No. The calculation runs in your browser using only the numbers you type, and none of them are stored on a server or shared with anyone." }
    ],
    howWeCalculate: {
      formula: "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1),  r = annual rate ÷ 12 ÷ 100,  n = years × 12",
      explanation: "The formula amortises the loan so that every instalment is identical while the interest and principal components shift each month. Total payable is the instalment multiplied by the number of months, and total interest is that figure minus the principal.",
      example: "1,00,000 at 8.5% for 5 years → instalment ≈ 2,052, total payable ≈ 1,23,120, interest ≈ 23,120"
    },
    workedExample: {
      scenario: "Borrow 50,00,000 at 8.5% for 20 years and check the full cost",
      steps: [
        "Monthly rate r = 8.5 ÷ 12 ÷ 100 = 0.007083, months n = 240",
        "Instalment = 50,00,000 × 0.007083 × (1.007083)^240 ÷ ((1.007083)^240 − 1) ≈ 43,391",
        "Total payable = 43,391 × 240 ≈ 1,04,13,840"
      ],
      result: "Instalment 43,391 a month, total interest ≈ 54,13,840 — more than the principal itself"
    },
    commonValues: {
      heading: "Monthly instalment per 1,00,000 borrowed",
      columns: ["Tenure", "8% p.a.", "9% p.a.", "10% p.a."],
      rows: [
        ["5 years", "2,028", "2,076", "2,125"],
        ["10 years", "1,213", "1,267", "1,322"],
        ["20 years", "836", "900", "965"],
        ["30 years", "734", "805", "878"]
      ]
    },
    relatedCalculators: [
      { name: 'EMI Calculator', path: '/emi-calculator.html' },
      { name: 'Loan Calculator', path: '/loan-calculator.html' },
      { name: 'Home Loan', path: '/home-loan-calculator.html' }
    ]
  },
  'compound-interest-calculator': {
    title: "See How Compound Interest Grows with Our",
    subtitle: "Compound Interest Calculator",
    introduction: "Compound interest is the reason a retirement fund opened at twenty-five can outweigh a much larger one opened at forty-five: each period's interest joins the balance and starts earning interest of its own. This calculator lets you watch that effect in isolation. Enter a principal, an annual rate, a number of years and the compounding frequency — monthly, quarterly, half-yearly or yearly — and you get the maturity value, the interest earned, a principal-versus-interest breakdown and a year-by-year growth curve. It is aimed at savers sizing up a deposit, students learning the difference between simple and compound growth, investors checking a long-range projection, and anyone who has seen a headline rate and wants to know what it really produces. The sections below unpack the formula letter by letter, show how much the compounding frequency alone can move the answer, and introduce the Rule of 72, the quickest mental shortcut for estimating how long it takes money to double.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Formula and What Each Letter Means</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The amount is <strong>A = P × (1 + r ÷ n)^(n × t)</strong>, where P is the principal, r the annual rate as a decimal, n the number of compounding periods per year and t the tenure in years. Interest is simply A minus P. With one compounding period a year the calculation is identical to what a simple deposit earns; raise n and the balance gets repriced more often, so each new interest payment is calculated on a slightly larger base.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Why the Compounding Frequency Changes the Answer</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          On 1,00,000 at 8.5% for five years, yearly compounding reaches about 1,50,366, quarterly reaches 1,52,279 and monthly reaches 1,52,730 — a spread of more than 2,300 with no change to the quoted rate. That gap is the effective annual rate: a nominal 10% compounded monthly actually delivers 10.47% a year, while daily compounding nudges it to roughly 10.52%. This is why two banks advertising the same rate can pay different amounts, and why the frequency disclosure in the terms sheet matters.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">The Rule of 72</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Divide 72 by the annual return to get the approximate number of years needed to double your money. At 8% that is nine years, which matches the precise figure almost exactly; at 12% it gives six years against a true 6.1. The approximation works best for rates between about 6% and 12%, and it cuts both ways — it is equally useful for estimating how quickly debt doubles if you only pay the minimum.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Compound interest works on debt just as ruthlessly as it works on savings. A credit card balance left untouched at 36% compounded monthly grows by almost 43% in a year. Paying down a compounding liability is itself an investment with a guaranteed, tax-free return equal to the rate you avoid.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Which compounding frequency should I choose?", answer: "Match the product. Savings accounts typically credit daily or monthly, fixed deposits quarterly, and many bonds annually. Selecting a more frequent option in this tool shows how much that convention adds to the maturity value." },
      { question: "What is the effective annual rate?", answer: "It is the return you actually earn once compounding inside the year is counted: (1 + r ÷ n)^n − 1. A nominal 10% compounded monthly is an effective 10.47%." },
      { question: "How does the Rule of 72 work?", answer: "Divide 72 by the annual rate to estimate the doubling time in years. At 8% that is nine years; the rule is most accurate for rates around 6% to 12%." },
      { question: "How much better is compounding than simple interest?", answer: "On 1,00,000 at 10% for five years, simple interest pays 50,000 while annual compounding pays 61,051. Over thirty years the gap becomes 3,00,000 versus more than 16 lakhs." },
      { question: "Can I add monthly contributions in this calculator?", answer: "This tool models a single lump sum so the effect of compounding stays visible. For regular monthly investing use the investment or SIP calculator, which adds a contribution annuity on top of the initial amount." },
      { question: "Does compounding apply to loans as well?", answer: "Yes. Any balance that accrues interest which then capitalises — credit cards, revolving credit, some overdrafts — is compounding in reverse, which is why those balances grow so quickly." },
      { question: "What is the difference between nominal and real return?", answer: "Real return strips out inflation. A 10% return with 6% inflation leaves roughly 3.77% of purchasing power growth, which is the figure that matters for long-term goals." },
      { question: "Can the result be negative?", answer: "Not for a positive rate and principal. But apply the same formula to a depreciating asset or an inflation rate and you can model erosion of value with identical maths." },
      { question: "Which return rate should I assume?", answer: "It depends on the asset: bank deposits usually sit in the six to seven and a half percent range, government securities a little higher, and equity has historically returned more but with far greater volatility. Rates change, so treat any projection as a scenario rather than a promise." },
      { question: "Is the maturity value guaranteed?", answer: "No. The output is exact for the rate you enter, but only fixed-income products promise that rate. Market-linked returns vary, and the calculator is a projection tool rather than an assurance." }
    ],
    howWeCalculate: {
      formula: "A = P × (1 + r ÷ n)^(n × t),  interest = A − P",
      explanation: "P is the principal, r the annual rate as a decimal, n the compounding periods per year (12 monthly, 4 quarterly, 2 half-yearly, 1 yearly) and t the years. Interest capitalises at each period, so later growth is earned on interest as well as principal.",
      example: "1,00,000 at 8.5% for 5 years compounded monthly → 1,52,730 (interest 52,730)"
    },
    workedExample: {
      scenario: "Leave 1,00,000 in an instrument paying 7% compounded quarterly for 20 years",
      steps: [
        "Rate per period = 7 ÷ 4 = 1.75% each quarter",
        "Number of periods = 20 × 4 = 80 quarters",
        "A = 1,00,000 × (1.0175)^80 ≈ 4,00,639"
      ],
      result: "Maturity 4,00,639 — interest of 3,00,639 on a single deposit, with no additions"
    },
    commonValues: {
      heading: "1,00,000 at 8.5% for 5 years by compounding frequency",
      columns: ["Frequency", "Periods per year", "Maturity value"],
      rows: [
        ["Yearly", "1", "1,50,366"],
        ["Half-yearly", "2", "1,51,621"],
        ["Quarterly", "4", "1,52,279"],
        ["Monthly", "12", "1,52,730"]
      ]
    },
    relatedCalculators: [
      { name: 'Simple Interest', path: '/simple-interest-calculator.html' },
      { name: 'Fixed Deposit', path: '/fd-calculator.html' },
      { name: 'Investment', path: '/investment-calculator.html' }
    ]
  },
  'fd-calculator': {
    title: "FD Maturity Made Clear with Our Free",
    subtitle: "Fixed Deposit Calculator",
    introduction: "A fixed deposit is the plainest promise in banking: hand over a lump sum, agree a rate and a tenure, and receive a larger lump sum at the end. Everything else — compounding, renewal, premature closure, tax deduction at source — is detail that decides how much larger that sum actually is. This calculator works out the maturity value and interest earned for any principal, rate and tenure, using the quarterly compounding convention that most banks follow for cumulative deposits. It is intended for savers deciding between two banks, parents parking a windfall, retirees laddering deposits across maturities, and anyone who wants to see the number before signing the form rather than after. The sections below explain exactly how the interest is compounded, why cumulative and non-cumulative deposits behave differently, how senior citizen rates and deposit insurance fit in, and what premature withdrawal really costs you in both penalty and lost compounding.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How a Fixed Deposit Compounds</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Cumulative deposits compound quarterly: the rate is divided by four, applied every three months, and each quarter's interest joins the principal for the next. So 1,00,000 at 7% for one year does not grow to 1,07,000 but to about 1,07,186, because the first quarter's interest itself earns interest for the remaining three quarters. Over a five-year deposit that convention lifts the maturity value to roughly 1,41,478 on the same principal and rate.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Payout Options, Rates and Tenure</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A cumulative deposit pays everything at maturity and therefore compounds. A non-cumulative deposit pays interest monthly, quarterly, half-yearly or annually into your account — convenient for income, but that paid-out interest no longer compounds, so the final figure is lower. Advertised rates vary by bank, by tenure and by the prevailing policy rate, and are usually revised from time to time; senior citizens are commonly offered a higher rate, often around half a percent above the standard one. Check the rate in force on the day you book rather than the one in last month's advertisement.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Laddering beats a single long lock-in. Splitting a lump sum across one, two, three and five year deposits means a portion matures every year, ready to be reinvested at whatever rate prevails then — you capture rising rates without ever being fully locked out of your money.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How often is fixed deposit interest compounded?", answer: "Most banks compound cumulative deposits quarterly. The calculator follows that convention, dividing the annual rate by four and applying it at the end of every quarter." },
      { question: "What is the difference between cumulative and non-cumulative?", answer: "Cumulative deposits pay everything at maturity and let interest compound. Non-cumulative deposits pay interest out at a chosen interval, which provides income but reduces the compounding benefit." },
      { question: "How much will 1,00,000 grow to at 7% in one year?", answer: "About 1,07,186 with quarterly compounding. Simple interest would have paid exactly 1,07,000, so compounding adds roughly 186 in the first year alone." },
      { question: "Do senior citizens get a better rate?", answer: "Usually yes — banks typically add around half a percent for senior citizens, though the exact uplift and eligible ages vary between institutions and are revised from time to time." },
      { question: "What is the minimum amount for a fixed deposit?", answer: "Many banks start at 1,000, while some special deposits require a much larger commitment in exchange for a better rate. Confirm the threshold with your own bank before transferring funds." },
      { question: "What happens if I break the deposit early?", answer: "Premature closure usually attracts a penalty of around half a to one percent on the contracted rate, and the bank may pay a lower rate for the period the deposit actually ran. You also lose the compounding you had not yet reached." },
      { question: "Is fixed deposit interest taxable?", answer: "Yes, it is added to your income and taxed at your slab rate. Banks deduct tax at source once your interest crosses the threshold fixed for the year, which you can avoid by submitting the appropriate declaration if your income is below the taxable limit." },
      { question: "Does this calculator deduct tax or penalties?", answer: "No. It reports gross maturity value on the rate and tenure you enter, so you can see the contractual outcome before tax, fees or premature closure charges are applied." },
      { question: "Can a fixed deposit be renewed automatically?", answer: "Yes, most deposits carry an auto-renewal instruction that rolls the matured amount into a fresh deposit of the same tenure at the rate prevailing on the renewal date, unless you opt out." },
      { question: "Is my deposit safe if a bank fails?", answer: "Deposits are protected by statutory deposit insurance up to a fixed limit per depositor per bank, which in India is 5,00,000. Amounts above that limit are not automatically covered, so very large savings may be spread across institutions." }
    ],
    howWeCalculate: {
      formula: "A = P × (1 + r ÷ 400)^(4 × t),  interest = A − P",
      explanation: "P is the deposit, r the annual rate in percent and t the tenure in years. Dividing the rate by 400 gives the quarterly rate as a decimal, and the exponent 4 × t counts the total number of quarters the money is locked for.",
      example: "1,00,000 at 7% for 1 year → 1,07,186 (interest 7,186)"
    },
    workedExample: {
      scenario: "Book a 5,00,000 fixed deposit for 3 years at 7.1% and find the maturity value",
      steps: [
        "Quarterly rate = 7.1 ÷ 4 = 1.775%",
        "Number of quarters = 3 × 4 = 12",
        "A = 5,00,000 × (1.01775)^12 ≈ 6,17,538"
      ],
      result: "Maturity value 6,17,538 — interest of 1,17,538 on the deposit"
    },
    commonValues: {
      heading: "Maturity of 1,00,000 at 7% compounded quarterly",
      columns: ["Tenure", "Maturity value", "Interest earned"],
      rows: [
        ["1 year", "1,07,186", "7,186"],
        ["3 years", "1,23,144", "23,144"],
        ["5 years", "1,41,478", "41,478"],
        ["10 years", "2,00,160", "1,00,160"]
      ]
    },
    relatedCalculators: [
      { name: 'Recurring Deposit', path: '/rd-calculator.html' },
      { name: 'Compound Interest', path: '/compound-interest-calculator.html' },
      { name: 'PPF', path: '/ppf-calculator.html' }
    ]
  },
  'rd-calculator': {
    title: "RD Maturity Sums, Step by Step with Our",
    subtitle: "Recurring Deposit Calculator",
    introduction: "A recurring deposit solves a problem that fixed deposits cannot: you have a salary arriving monthly, not a lump sum sitting in an account. Commit a fixed amount every month for a chosen tenure and the bank pays you interest on the whole accumulating pile at the end — turning a savings habit into a maturity value you can plan around. This calculator takes the monthly instalment, the annual rate and the tenure in years, then reports total deposits, interest earned and the final maturity amount, with a year-by-year growth curve so you can see where the compounding starts to bite. It suits salaried savers funding a goal two or three years out, students storing away part of a stipend, and anyone comparing a recurring deposit against a mutual fund SIP or a fixed deposit of the same eventual size. The sections below describe how each instalment earns interest from the day it lands, what happens when you miss a payment, and how premature closure or a loan against the deposit works when plans change.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How a Recurring Deposit Compounds</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Each instalment starts earning from the date it is credited and keeps earning until maturity, so the first deposit works for the full term and the last one for a single month. The calculator models this as a monthly annuity: <strong>FV = P × ((1 + r)^n − 1) ÷ r</strong>, where P is the monthly deposit, r the monthly rate and n the total number of instalments. On 5,000 a month at 8.5% for five years, deposits of 3,00,000 mature to roughly 3,72,212 — 72,212 of it interest, all earned on money that arrived in bite-sized pieces.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Instalments, Missed Payments and Early Closure</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Most banks accept recurring deposits from around 100 to 500 a month up to whatever you can carry, with tenures from six months to ten years. A missed instalment usually attracts a flat monthly penalty, and after several consecutive defaults the bank may close the deposit and pay you the balance at a reduced rate. If you need the money early you can generally close the deposit — accepting a lower rate on what you have paid in — or take a loan against it, which keeps the compounding intact and is usually the cheaper option.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Start the debit the day after your salary lands. A recurring deposit only compounds on what has actually been paid in, so an instalment that slips to the next month silently shortens its own interest-earning life — automate the transfer and let the schedule do the discipline for you.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How is interest earned on each instalment?", answer: "Every deposit earns from its credit date until maturity, so early instalments earn far more than later ones. The calculator treats the series as a monthly annuity to reflect that staggered accumulation." },
      { question: "What is the minimum monthly deposit?", answer: "Commonly between 100 and 500 a month depending on the bank, with amounts often required in round multiples. Post office schemes have their own lower minimums, so check before you start." },
      { question: "What tenure can I open an RD for?", answer: "Typically anywhere from six months to ten years. Longer tenures lock in the rate for longer, while shorter ones give you the money back sooner at the cost of less compounding." },
      { question: "Can I change the instalment amount mid-term?", answer: "Generally the monthly amount is fixed for the life of the deposit. If your savings capacity changes, the usual approach is to close this one and open another, or run a second deposit alongside it." },
      { question: "What happens if I miss a payment?", answer: "A flat penalty is usually charged for each defaulted month, and several consecutive defaults can lead to the deposit being closed at a reduced interest rate. Some banks permit a short pause under their own terms." },
      { question: "Does the interest compound monthly?", answer: "Banks apply their own compounding and day-count conventions, which vary. This calculator assumes monthly compounding on each instalment — a close practical approximation of what you will receive." },
      { question: "How does an RD differ from a mutual fund SIP?", answer: "A recurring deposit returns a contractually fixed amount with no market risk. A SIP invests in market-linked units, so the outcome can be higher or lower than projected. The RD number is a promise; the SIP number is an estimate." },
      { question: "Is recurring deposit interest taxable?", answer: "Yes, it is added to your income and taxed at your applicable slab rate, and tax may be deducted at source above the threshold set for the year." },
      { question: "Can I withdraw part of an RD?", answer: "Partial withdrawal is rarely allowed — most deposits must be closed in full. A loan against the deposit, often up to around 90% of its value, lets you access funds without breaking the compounding." },
      { question: "Does this calculator apply penalties for missed instalments?", answer: "No, it projects an uninterrupted schedule. If you expect breaks, model the deposit as it will actually run, since penalties and reduced rates lower the final figure." }
    ],
    howWeCalculate: {
      formula: "FV = P × ((1 + r)^n − 1) ÷ r,  r = annual rate ÷ 12 ÷ 100,  n = years × 12",
      explanation: "P is the monthly deposit and n the number of instalments. The annuity factor sums the future value of every payment, each compounded for the months remaining until maturity, which is why earlier deposits contribute disproportionately.",
      example: "5,000 a month at 8.5% for 5 years → 3,72,212 (deposits 3,00,000, interest 72,212)"
    },
    workedExample: {
      scenario: "Deposit 10,000 every month for 10 years at an assumed 8% and read off the maturity",
      steps: [
        "Monthly rate = 8 ÷ 12 ÷ 100 = 0.006667",
        "Number of instalments = 10 × 12 = 120",
        "FV = 10,000 × ((1.006667)^120 − 1) ÷ 0.006667 ≈ 18,29,460"
      ],
      result: "Maturity 18,29,460 against deposits of 12,00,000 — interest of 6,29,460"
    },
    commonValues: {
      heading: "Recurring deposit maturity at 8% p.a.",
      columns: ["Monthly", "Tenure", "Deposited", "Maturity"],
      rows: [
        ["2,000", "3 years", "72,000", "81,071"],
        ["5,000", "5 years", "3,00,000", "3,67,384"],
        ["10,000", "5 years", "6,00,000", "7,34,769"],
        ["10,000", "10 years", "12,00,000", "18,29,460"]
      ]
    },
    relatedCalculators: [
      { name: 'Fixed Deposit', path: '/fd-calculator.html' },
      { name: 'SIP', path: '/sip-calculator.html' },
      { name: 'PPF', path: '/ppf-calculator.html' }
    ]
  },
  'nps-calculator': {
    title: "Plan Your NPS Corpus with Our Free",
    subtitle: "NPS Calculator",
    introduction: "The National Pension System was built for one job: to turn small, regular contributions into a retirement corpus big enough to buy a monthly pension for life. It is a long-duration, market-linked scheme with its own contribution rules, asset choices and exit conditions, which makes a projection tool almost mandatory before you commit. Enter the amount you can set aside each month, an expected annual return and the number of years until you retire, and this calculator shows the corpus you are heading towards, how much of it came from your pocket and how much from market growth. It is written for employees supplementing a employer scheme, self-funded professionals without a pension, and anyone comparing the NPS against a PPF or mutual fund route for the same monthly outgo. The sections below explain how monthly compounding builds the corpus, why the return is a range rather than a guarantee, and what the exit rules at sixty mean for the shape of your retirement income.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How the Corpus Builds Up Month by Month</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Contributions are invested continuously and the balance is compounded monthly, so the projection uses the same future-value annuity formula as any regular-investment plan. A contribution of 5,000 a month at an assumed 10% for thirty years reaches roughly 1,13,02,440 — against contributions of just 18,00,000, meaning more than four fifths of the final corpus comes from compounding rather than from you. Double the monthly figure and the corpus doubles, because the formula scales linearly with the contribution.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Asset Mix and Why the Return Varies</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The NPS lets you split contributions across equity, corporate bonds and government securities, either through an active choice or a lifecycle default that shifts towards safer assets as you age. Equity has historically offered the highest long-run returns but with far wider swings, while government securities move more gently. Because the return depends on what the pension fund managers earn, there is no contracted rate — projections in the five to ten percent range are plausible scenarios, not commitments, and a single percentage point on the rate changes the corpus by millions over three decades.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            At least 40% of the corpus must be used to buy an annuity at retirement, and annuity rates vary widely between providers and payout options. Price that annuity first — then work backwards to the corpus you need — instead of treating the lump sum figure as the goal in itself.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "Who is eligible to join the NPS?", answer: "Any citizen aged between 18 and 65 can open an account, subject to completing identity and know-your-customer formalities through a point of presence. Rules for non-residents and the upper age limit are set by the regulator and can change." },
      { question: "What is the difference between Tier I and Tier II?", answer: "Tier I is the locked retirement account with associated tax concessions and strict withdrawal conditions. Tier II is a voluntary, flexible account that can be opened by existing Tier I subscribers and withdrawn from more freely, without the same tax treatment." },
      { question: "What return should I assume?", answer: "Anything between five and ten percent is a reasonable scenario depending on your equity allocation, but the return is market linked and never guaranteed. Run the projection at more than one rate and plan against the conservative end." },
      { question: "How much annuity will my corpus buy?", answer: "Annuity rates are quoted by the provider at the time of purchase. As a rough guide, an annual pension of 6,00,000 at a 6% annuity rate requires a corpus of about one crore, which is why the 40% annuity rule matters so much." },
      { question: "What happens to the money at age sixty?", answer: "At least 40% of the corpus must go towards purchasing an annuity for a regular pension, while up to 60% can be taken as a lump sum. The tax treatment of that lump sum depends on the rules in force at the time." },
      { question: "Can I exit before sixty?", answer: "Premature exit is permitted only in specified circumstances such as education or critical illness, and most of the corpus must still be converted into an annuity. Exact conditions are prescribed by the regulator." },
      { question: "Does the NPS qualify for tax deductions?", answer: "Contributions can qualify for deduction within the limits prescribed for the year, including an additional window over and above the main section 80C ceiling. Tax rules change, so confirm the current limits before filing." },
      { question: "How does the calculator compound my contributions?", answer: "It treats the monthly contribution as an annuity earning the expected rate each month, which mirrors how a pension fund compounds a regular inflow across a long horizon." },
      { question: "Can I change my contribution later?", answer: "Yes, the monthly contribution can be increased, decreased or paused through your point of presence, and you can also switch between scheme providers or alter your asset allocation subject to the permitted choices." },
      { question: "Is the annuity rate fixed for life?", answer: "It depends on the annuity provider and the option you choose — with or without return of purchase price, with or without escalation. Rates are locked at purchase but differ between providers, so comparison shopping matters." }
    ],
    howWeCalculate: {
      formula: "FV = C × ((1 + r)^n − 1) ÷ r,  r = expected rate ÷ 12 ÷ 100,  n = years × 12",
      explanation: "C is the monthly contribution. Each instalment compounds for the months remaining until retirement, and the annuity factor totals them. The tool reports the corpus, total contributions and the growth attributable to market returns.",
      example: "5,000 a month at 10% for 30 years → corpus ≈ 1,13,02,440 on contributions of 18,00,000"
    },
    workedExample: {
      scenario: "Contribute 10,000 a month for 30 years at an assumed 10% annual return",
      steps: [
        "Monthly rate r = 10 ÷ 12 ÷ 100 = 0.008333",
        "Number of contributions n = 30 × 12 = 360",
        "FV = 10,000 × ((1.008333)^360 − 1) ÷ 0.008333 ≈ 2,26,04,879"
      ],
      result: "Corpus 2,26,04,879 against contributions of 36,00,000 — market growth of 1,90,04,879"
    },
    commonValues: {
      heading: "NPS corpus after 30 years at 10% p.a.",
      columns: ["Monthly", "Total invested", "Estimated corpus"],
      rows: [
        ["5,000", "18,00,000", "1,13,02,440"],
        ["10,000", "36,00,000", "2,26,04,879"],
        ["15,000", "54,00,000", "3,39,07,319"],
        ["25,000", "90,00,000", "5,65,12,198"]
      ]
    },
    relatedCalculators: [
      { name: 'PPF', path: '/ppf-calculator.html' },
      { name: 'Retirement', path: '/retirement-calculator.html' },
      { name: 'SIP', path: '/sip-calculator.html' }
    ]
  },
  'ppf-calculator': {
    title: "Track Your PPF Growth with Our Free",
    subtitle: "PPF Calculator",
    introduction: "The Public Provident Fund has survived every market cycle since 1968 on one strength: it never promises a market return, because it never takes market risk. Contributions, interest and maturity proceeds are all treated favourably for tax, the account is backed by the sovereign, and the only real costs are a fifteen-year lock-in and a rate that the government can revise each quarter. This calculator projects the maturity value from the amount you contribute each year, the notified rate and the number of years you plan to run the account, and splits the result into your contributions and the interest the scheme added on top. It is designed for disciplined savers maxing out the annual allowance, parents funding a child's future, and anyone weighing the PPF against a tax-saving deposit or an equity fund. The sections below cover the annual contribution window, why interest is calculated on a particular balance each month, and the extension and withdrawal rules that decide what you can actually do with the money after year fifteen.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Contribution Limits and the Interest Window</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          You must contribute at least the annual minimum to keep the account active and cannot put in more than the annual ceiling across all PPF accounts held by the same person — in India that ceiling is 1,50,000 in a financial year, with a minimum of 500. Deposits may be made in any number of instalments, but interest for each month is calculated on the lowest balance between the fifth day and the last day of that month. Money that arrives on the sixth therefore earns nothing for that month, which is why the first week of April is the traditional date for the year's largest deposit.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">A Rate That Is Reviewed, Not Locked</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The PPF rate is notified by the government each quarter rather than fixed for the life of the deposit, so a projection made at 7.1% is a scenario built on today's rate, not a contractual figure. Over fifteen years the rate will move up and down around whatever is notified, and the compounding means even a quarter of a percent matters: on maximum contributions it is worth well over a lakh across a full term. Enter the rate you expect to average and revisit the projection whenever the notification changes.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Maturity, Extension and Access</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The account matures after fifteen years and can then be extended in five-year blocks — with or without further contributions — any number of times. Partial withdrawal is allowed only after five financial years have been completed from the year of opening, and is capped at half the balance at the end of the preceding year. Between years three and six you may also borrow against the balance at a concessional rate, which is usually less damaging to the corpus than breaking the account.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Contribute before the fifth of April. Because monthly interest is credited on the lowest balance between the fifth and the month end, a full year's deposit placed on the first working day of April earns interest for twelve months instead of eleven — a habit worth roughly a month of free compounding every single year.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What does the EEE treatment of PPF mean?", answer: "Exempt, exempt, exempt: contributions qualify for deduction within the annual ceiling, the interest is not taxed, and the maturity proceeds are not taxed either, subject to the rules in force at the time." },
      { question: "On which balance is interest calculated?", answer: "On the lowest balance between the fifth day and the last day of each month. A deposit made after the fifth earns nothing for that month, which is why the timing of your contribution matters." },
      { question: "How much can I contribute each year?", answer: "A minimum of 500 and a maximum of 1,50,000 per financial year, counted across every PPF account you hold. Excess deposits do not earn interest and may be returned." },
      { question: "Can I contribute every month instead of once a year?", answer: "Yes, instalments are permitted from as little as 100 each. If you do contribute monthly, schedule the transfer before the fifth so every instalment earns interest in the month it lands." },
      { question: "Is the 7.1% rate fixed for fifteen years?", answer: "No. The rate is notified quarterly and can change during the term. The calculator uses whatever rate you enter, so treat the output as a projection and update it when notifications move." },
      { question: "Can I open a PPF account for my child?", answer: "A guardian may open an account for a minor, but the combined contributions across a family's PPF accounts remain subject to the same annual ceiling, so plan the split deliberately." },
      { question: "What happens if I skip a year's contribution?", answer: "The account becomes inactive but can be revived by paying the minimum along with any prescribed penalty for the dormant period. Interest continues on the existing balance while it is dormant." },
      { question: "How does PPF compare with a five-year tax deposit?", answer: "Both offer tax deductions, but the PPF runs for fifteen years with a reviewed rate and fully tax-free interest, while a tax deposit locks five years and its interest is taxable at your slab rate." },
      { question: "Is the maturity amount completely tax free?", answer: "Under the prevailing EEE treatment, yes — the corpus is not taxed on maturity. Because tax rules are amended from time to time, confirm the position in the year you actually withdraw." },
      { question: "Can I nominate a beneficiary?", answer: "Yes, nomination is permitted at opening and can be changed later, which avoids succession delays if the account holder dies during the term." }
    ],
    howWeCalculate: {
      formula: "M = C × ((1 + i)^n − 1) ÷ i × (1 + i)",
      explanation: "C is the annual contribution, i the yearly interest rate as a decimal and n the number of years. The final (1 + i) term reflects the fact that each contribution is treated as arriving at the start of the year and earning a full year's interest, an annuity-due.",
      example: "1,50,000 a year at 7.1% for 15 years → 40,68,209"
    },
    workedExample: {
      scenario: "Contribute the full 1,50,000 every year for fifteen years at the current 7.1% rate",
      steps: [
        "Total contributed = 1,50,000 × 15 = 22,50,000",
        "Annuity factor = ((1.071)^15 − 1) ÷ 0.071 ≈ 25.33",
        "M = 1,50,000 × 25.33 × 1.071 ≈ 40,68,209"
      ],
      result: "Maturity 40,68,209 — interest of 18,18,209, tax free under the prevailing treatment"
    },
    commonValues: {
      heading: "PPF maturity at 7.1% p.a.",
      columns: ["Per year", "Years", "Invested", "Maturity"],
      rows: [
        ["50,000", "15", "7,50,000", "13,56,070"],
        ["1,00,000", "15", "15,00,000", "27,12,139"],
        ["1,50,000", "15", "22,50,000", "40,68,209"],
        ["1,50,000", "25", "37,50,000", "1,03,08,015"]
      ]
    },
    relatedCalculators: [
      { name: 'NPS', path: '/nps-calculator.html' },
      { name: 'Fixed Deposit', path: '/fd-calculator.html' },
      { name: 'Retirement', path: '/retirement-calculator.html' }
    ]
  },
  'home-loan-calculator': {
    title: "Plan Your Home Loan EMI with Our Free",
    subtitle: "Home Loan Calculator",
    introduction: "A home loan is likely to be the largest financial commitment you ever make, and the instalment you agree to will follow you for two or three decades. This calculator exists so that the number on the sanction letter holds no surprises: enter the amount you intend to borrow, the interest rate offered and the tenure in years, and it returns the monthly instalment, the total interest you will pay and the full amount that leaves your account by the end. It is built for first-time buyers comparing approvals from two banks, families testing whether a bigger flat is affordable, and anyone considering whether a shorter tenure is worth the tighter monthly budget. Because home loans amortise on a reducing balance, the split between principal and interest changes every single month — heavily in the lender's favour at the start. The sections below walk through that mechanics, explain how lenders size a loan against your income and the property's value, and cover prepayment, rate types and the charges that sit outside the instalment.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Reading the Three Numbers Together</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          On 25,00,000 at 8.5% for twenty years, the instalment is about 21,696 — but the total payable is roughly 52,06,939, meaning 27,06,939 of pure interest, more than the house deposit you saved for. Extend the same 50,00,000 loan from twenty to thirty years at 8.5% and the instalment falls from 43,391 to 38,446, while total interest climbs from about 54,13,840 to 88,40,560. The tenure slider is the single most expensive control on any home loan, so read it in the interest column, never in the instalment column.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">How Lenders Decide What You Can Borrow</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Two constraints bind. The first is the loan-to-value ratio: lenders will fund only a percentage of the property's value, typically somewhere between about 75% and 90% depending on the size of the loan, leaving you to fund the rest plus registration and stamp duty separately. The second is your repayment capacity, usually assessed by totalling your existing obligations and capping them at a fixed share of net monthly income — commonly in the region of 40% to 60%, though the exact ceiling, the tenure cap and the credit score required all vary by lender and applicant profile.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Part-prepayment is the most powerful lever you have. Even one voluntary prepayment a year, applied directly to principal, can cut years off a twenty-year loan because every future interest calculation starts from a smaller balance. Floating-rate home loans taken by individuals are generally prepayable without a penalty — confirm the terms before you sign.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How is my home loan EMI calculated?", answer: "With the standard amortisation formula: EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the principal, r the monthly rate and n the number of months. For 25,00,000 at 8.5% over 20 years that gives about 21,696 a month." },
      { question: "What does loan-to-value mean?", answer: "It is the share of the property's value the lender will finance. If the limit is 80%, a flat valued at 60,00,000 can be financed up to 48,00,000 and you must arrange the balance, plus registration and duty, yourself." },
      { question: "How does my credit score affect the offer?", answer: "A stronger score usually unlocks a lower rate and a smoother approval, while a weak profile can mean a higher rate, a lower cap or a rejection. Score weightings and thresholds differ between lenders and are revised from time to time." },
      { question: "Should I choose a fixed or a floating rate?", answer: "Fixed rates give budget certainty for a set period at a premium; floating rates track a benchmark and can move either way. If you expect to hold the loan through a full rate cycle and can absorb an EMI reset, floating has historically been cheaper more often than not — but that is a tendency, not a guarantee." },
      { question: "What is pre-EMI on an under-construction property?", answer: "Until possession you pay interest only on the amount disbursed so far, called pre-EMI. The full instalment begins after possession, which means your budget must absorb both the pre-EMI today and the EMI later if you are still paying rent." },
      { question: "When does a floating rate actually change?", answer: "When the benchmark it is linked to moves, or at the scheduled reset date — many loans now reset annually against an external benchmark. Each change re-casts the remaining schedule, so re-run the calculator after any revision." },
      { question: "How much interest does the tenure really cost?", answer: "On 50,00,000 at 8.5%, twenty years costs about 54,13,840 in interest while thirty years costs roughly 88,40,560 — around 34 lakh more, in exchange for an instalment that is 4,945 lower each month." },
      { question: "Are stamp duty and registration included?", answer: "No. Those are one-time costs paid upfront, commonly a percentage of the property value that varies by state, and they sit outside the loan unless you borrow a larger sanctioned amount against them." },
      { question: "Which tax concessions apply to a home loan?", answer: "Many jurisdictions allow a deduction on the interest and another on the principal repaid, subject to caps and conditions that change over time. Check the limits in force for the financial year you are claiming in." },
      { question: "Is my loan data stored anywhere?", answer: "No. All figures are computed in your browser from the numbers you type, and nothing is transmitted to a server or shared with lenders." }
    ],
    howWeCalculate: {
      formula: "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1),  r = annual rate ÷ 12 ÷ 100,  n = years × 12",
      explanation: "The formula spreads repayment so the instalment stays constant while the interest portion shrinks and the principal portion grows each month. Total interest is the instalment multiplied by the months, minus the amount borrowed.",
      example: "25,00,000 at 8.5% for 20 years → EMI ≈ 21,696, total payable ≈ 52,06,939"
    },
    workedExample: {
      scenario: "Compare a 50,00,000 loan at 8.5% over twenty years against thirty years",
      steps: [
        "20-year term: EMI ≈ 43,391 × 240 months = 1,04,13,840 total",
        "30-year term: EMI ≈ 38,446 × 360 months = 1,38,40,560 total",
        "Interest: 54,13,840 versus 88,40,560 — a difference of 34,26,720"
      ],
      result: "Thirty years lowers the instalment by 4,945 a month but costs about 34,26,720 more in interest"
    },
    commonValues: {
      heading: "Home loan instalment at 8.5% p.a.",
      columns: ["Loan amount", "20 years", "30 years"],
      rows: [
        ["25,00,000", "21,696", "19,223"],
        ["50,00,000", "43,391", "38,446"],
        ["75,00,000", "65,087", "57,669"],
        ["1,00,00,000", "86,782", "76,892"]
      ]
    },
    relatedCalculators: [
      { name: 'EMI Calculator', path: '/emi-calculator.html' },
      { name: 'Mortgage', path: '/mortgage-calculator.html' },
      { name: 'Loan Calculator', path: '/loan-calculator.html' }
    ]
  },
  'car-loan-calculator': {
    title: "Size Up Your Car Loan EMI with Our Free",
    subtitle: "Car Loan Calculator",
    introduction: "The number the dealership quotes as a monthly instalment is designed to sound comfortable. What it hides is the total you will hand back, the fee deducted before the money reaches the showroom, and how much two extra years of tenure quietly add. This calculator puts those figures back on the table: enter the amount you need to finance, the rate you have been offered and the tenure in years, and you get the monthly instalment, total payment and total interest within seconds. It is meant for buyers sitting in a dealership waiting for an approval, families choosing between a compact and a mid-size car, and anyone weighing a three-year against a five-year commitment. Car loans are short, high-rate and depreciating-asset debt, which makes the arithmetic unusually consequential — the car is losing value while the interest accrues. The sections below cover what lenders actually finance, how tenure changes the cost, and the fees and foreclosure rules to check before signing the agreement.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Ex-Showroom, On-Road and What Gets Financed</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The ex-showroom price is the car before registration, road tax, insurance and handling charges; the on-road price is what you actually pay to drive it away. Lenders typically finance a high percentage of the vehicle's value but not always the entire on-road figure, which is why the deposit you need is rarely just the gap between two car prices. Accessories, extended warranties and dealer add-ons are usually paid out of pocket, and it is worth treating them as cash costs rather than folding them into the loan.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Tenure: Cheap Instalments, Expensive Total</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Car loans generally run between one and seven years, with used-car financing often capped shorter and priced higher. On 5,00,000 at 9.5%, a five-year term costs about 10,501 a month and roughly 1,30,060 in interest. Stretch that to seven years and the instalment drops to 8,172 — but total interest rises to about 1,86,448, some 56,388 more for two extra years of driving a depreciating asset. Shorter tenures also leave more equity in the car, which matters if you want to trade it in before the loan is cleared.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Compare the total-cost column across lenders, not just the instalment. A lower rate with a higher processing fee can lose to a slightly higher rate with no fee, and dealer-arranged finance is not obliged to be the cheapest option available to you — take the offer away and price it against a bank directly.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What tenure can I get on a car loan?", answer: "Typically one to seven years. Newer vehicles qualify for the longer terms while used cars are usually capped at a shorter tenure and priced at a higher rate, reflecting the faster depreciation." },
      { question: "How much of the on-road price will a lender fund?", answer: "It depends on the lender and the vehicle, but financing generally covers most of the value with a deposit required from you. Budget separately for registration, insurance, accessories and extended warranty." },
      { question: "How is the car loan instalment calculated?", answer: "The same reducing-balance amortisation used for any instalment loan. On 5,00,000 at 9.5% for five years, the monthly instalment works out to about 10,501 with total interest near 1,30,060." },
      { question: "Is a used car loan priced differently?", answer: "Yes. Rates on used vehicles are generally higher and tenures shorter, and lenders often cap the age of the car at the end of the loan. Always check the maximum vehicle age allowed before you commit to a model." },
      { question: "Can I repay the loan early?", answer: "Most agreements allow part-prepayment or full foreclosure after a few instalments. Floating-rate loans taken by individuals are usually prepayable without a penalty, while fixed-rate loans may attract a charge — read the schedule of charges carefully." },
      { question: "Does the calculator include processing fees?", answer: "No. It returns principal and interest only. Lender fees, documentation charges, insurance premiums and taxes on those fees are additional, and some can be deducted from the disbursement itself." },
      { question: "How much is a typical processing fee?", answer: "Commonly around half a percent to two percent of the loan amount plus applicable taxes, though it varies between lenders and is sometimes negotiable on a strong credit profile." },
      { question: "How does a trade-in affect the loan?", answer: "The value of your existing car offsets the price, so you borrow less principal and pay interest on a smaller amount. Settle any outstanding dues on the traded vehicle first, since the equity cannot be counted twice." },
      { question: "Will this EMI affect my eligibility elsewhere?", answer: "Yes. Existing instalments count towards your total obligation ratio, so a car EMI reduces the headroom available for a home or personal loan until it is repaid." },
      { question: "What is the best tenure for a car loan?", answer: "As short as you can afford without stretching your budget, because the asset is depreciating while interest accrues. A common guideline is to keep the total vehicle cost, including finance, within a manageable share of your annual income." }
    ],
    howWeCalculate: {
      formula: "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1),  r = annual rate ÷ 12 ÷ 100,  n = years × 12",
      explanation: "P is the financed amount, r the monthly interest rate and n the tenure in months. Interest is charged on the outstanding balance each month, so the principal component grows steadily across the tenure.",
      example: "5,00,000 at 9.5% for 5 years → EMI ≈ 10,501, interest ≈ 1,30,060"
    },
    workedExample: {
      scenario: "Finance 8,00,000 at 9.5% over five years and check the full cost",
      steps: [
        "Monthly rate r = 9.5 ÷ 12 ÷ 100 = 0.007917, months n = 60",
        "EMI = 8,00,000 × 0.007917 × (1.007917)^60 ÷ ((1.007917)^60 − 1) ≈ 16,801",
        "Total payable = 16,801 × 60 = 10,08,060"
      ],
      result: "Instalment 16,801 a month, total interest ≈ 2,08,060 over the five years"
    },
    commonValues: {
      heading: "Car loan instalments at 9.5% p.a.",
      columns: ["Loan", "5 years", "7 years", "Interest (5 years)"],
      rows: [
        ["3,00,000", "6,301", "4,903", "78,060"],
        ["5,00,000", "10,501", "8,172", "1,30,060"],
        ["8,00,000", "16,801", "13,075", "2,08,060"],
        ["10,00,000", "21,002", "16,344", "2,60,120"]
      ]
    },
    relatedCalculators: [
      { name: 'Personal Loan', path: '/personal-loan-calculator.html' },
      { name: 'EMI Calculator', path: '/emi-calculator.html' },
      { name: 'Loan Calculator', path: '/loan-calculator.html' }
    ]
  },
  'personal-loan-calculator': {
    title: "Check Your Personal Loan EMI with Our",
    subtitle: "Personal Loan Calculator",
    introduction: "Personal loans are the fastest credit to get and among the most expensive to carry. Nothing secures them, so lenders price the risk directly into the rate, and approval can arrive the same day — which is exactly why people sign without modelling what the repayments will cost over three or five years. This calculator does that modelling in one screen: loan amount, annual rate and tenure go in, instalment, total payable and total interest come out. Use it to compare an offer against a credit card balance transfer, to test whether consolidating several debts into one instalment genuinely saves money, or to decide whether stretching the tenure is worth the interest it adds. The sections below explain why unsecured credit carries a premium, how processing fees distort the real cost, what foreclosure charges are actually permitted, and how lenders size your eligibility before they ever show you a rate.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Why Unsecured Credit Costs More</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          With no asset behind the loan, the lender's only security is your income and track record, so rates on personal loans sit well above secured products and vary widely with your profile, the lender and the prevailing market — often comfortably into double digits even for strong borrowers. The tenures are short, typically one to seven years, which is the feature that keeps the total cost bounded. On 1,00,000 at 12% for three years the instalment is about 3,321 and total interest roughly 19,556; the same principal over five years at that rate would carry 2,224 a month and far more interest overall.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">The Real Cost: Fees, Foreclosure and Effective Outlay</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A processing fee of one to three percent is charged on the sanctioned amount, sometimes deducted upfront so the amount reaching your account is smaller than the amount you repay interest on. Prepayment rules matter too: for individual borrowers, floating-rate loans are generally prepayable without a foreclosure charge, while fixed-rate loans may still carry one of around two to five percent of the amount prepaid. Any debt consolidation plan must clear its own hurdle — the new loan's fee plus its interest has to beat the combined cost of what it replaces.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Tenure is the most expensive choice you will make. Taking 3,00,000 at 12% over five years instead of three cuts the instalment from about 9,964 to 6,673 — and raises the total interest from 58,704 to 1,00,380. That is 41,676 saved simply by borrowing for two years less.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How is my personal loan EMI calculated?", answer: "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1). For 1,00,000 at 12% over three years, the monthly instalment is about 3,321 and the total interest about 19,556." },
      { question: "What is a processing fee?", answer: "A one-time charge, often between one and three percent of the sanctioned amount plus taxes, levied for evaluating and documenting the loan. It may be deducted from the disbursement or added to your liability." },
      { question: "Is there a lock-in period?", answer: "The tenure itself runs to term, but most lenders permit part-prepayment or foreclosure after a small number of instalments have been paid. The exact window is stated in your loan agreement." },
      { question: "Can I be charged for repaying early?", answer: "For floating-rate loans taken by individuals, regulators generally prohibit foreclosure and prepayment charges. Fixed-rate loans and loans taken by businesses may still attract a charge of a few percent of the amount prepaid." },
      { question: "What tenure should I choose?", answer: "Shorter is cheaper. One to seven years is typical, and while a longer tenure lowers the instalment it raises total interest sharply — on 3,00,000 at 12%, the two extra years in a five-year plan cost 41,676 more than a three-year plan." },
      { question: "Can I get one with a weak credit score?", answer: "Possibly, but expect a higher rate, a lower limit or a stronger co-applicant requirement. The score is one of the main underwriting inputs, so improving it before applying is often worth the wait." },
      { question: "What is a balance transfer on a personal loan?", answer: "Moving an outstanding loan to a new lender at a lower rate. Compare the transfer fee and legal charges against the interest you would save over the remaining tenure — it only makes sense when the saving clearly exceeds the cost." },
      { question: "Should I take a top-up on an existing loan?", answer: "A top-up adds principal to an ongoing loan, usually at a similar rate, but it may reset the tenure and the interest clock on the whole balance. Compare it against a fresh loan before committing." },
      { question: "What happens if I miss an instalment?", answer: "Late fees and additional interest accrue, and the default is reported to credit bureaus, which raises the cost of every future borrowing. Most lenders permit a short grace period before reporting." },
      { question: "Does the result include the processing fee?", answer: "No. It models only the principal and interest on the amount you enter, so add any fee separately when you work out your total outlay for the first year." }
    ],
    howWeCalculate: {
      formula: "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1),  r = annual rate ÷ 12 ÷ 100,  n = years × 12",
      explanation: "The formula produces a level instalment in which the interest component falls and the principal component rises each month. Total payable is the instalment across all months, and total interest is that figure minus the principal.",
      example: "1,00,000 at 12% for 3 years → EMI ≈ 3,321, total interest ≈ 19,556"
    },
    workedExample: {
      scenario: "Borrow 3,00,000 at 12% and compare a three-year term against a five-year term",
      steps: [
        "Three years: EMI ≈ 9,964 over 36 months → total interest ≈ 58,704",
        "Five years: EMI ≈ 6,673 over 60 months → total interest ≈ 1,00,380",
        "The longer term adds 24 payments while lowering the instalment by 3,291"
      ],
      result: "Stretching to five years saves 3,291 a month but costs 41,676 more in interest"
    },
    commonValues: {
      heading: "Personal loan at 12% p.a.",
      columns: ["Loan", "3 years", "5 years", "Interest (3 years)"],
      rows: [
        ["1,00,000", "3,321", "2,224", "19,556"],
        ["3,00,000", "9,964", "6,673", "58,704"],
        ["5,00,000", "16,605", "11,120", "97,780"],
        ["10,00,000", "33,210", "22,240", "1,95,560"]
      ]
    },
    relatedCalculators: [
      { name: 'EMI Calculator', path: '/emi-calculator.html' },
      { name: 'Loan Calculator', path: '/loan-calculator.html' },
      { name: 'Financial Calculator', path: '/financial-calculator.html' }
    ]
  },
  'mortgage-calculator': {
    title: "Map Your Mortgage Repayment with Our Free",
    subtitle: "Mortgage Calculator",
    introduction: "A mortgage is a decades-long promise secured against your home, which makes the monthly payment one of the few numbers worth modelling obsessively before you commit. This calculator takes the loan amount, the annual rate and the term in years, and returns the payment, total repayment and total interest, with an amortisation view of how the balance declines over time. It suits buyers comparing offers from several lenders, homeowners considering a shorter term, and anyone trying to understand why the first years of repayment feel as though they barely move the needle. Beyond the headline payment, a real mortgage carries structures that change the maths — a deposit requirement that determines your loan-to-value ratio, optional insurance when that ratio is high, taxes and insurance that may be escrowed alongside principal and interest, and rate structures that can reset after an initial period. The sections below separate those layers and show exactly what this figure includes and excludes.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Inside the Monthly Payment</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The payment this calculator returns is principal and interest only — the amortisation core. On 3,00,000 at 6.5% over thirty years that is about 1,896 a month, and the interest across the term reaches roughly 3,82,633, far more than the amount borrowed. Property taxes and insurance are frequently collected in a separate escrow alongside the payment, so the figure you actually transfer each month will be higher. Reading the principal and interest columns of an amortisation schedule explains the slow start: on a long loan, the early payments are overwhelmingly interest, and the principal only begins to fall quickly in the later years.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Term, Deposit and Rate Structure</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Term is the biggest lever. The same 3,00,000 at 6.5% over fifteen years costs about 2,613 a month but only 1,70,398 in interest — 2,12,235 less than the thirty-year route, for 717 more each month. Your deposit sets the loan-to-value ratio: a larger deposit lowers the ratio, reduces or removes the need for mortgage insurance and often earns a better rate. On the rate itself, fixed structures keep the payment constant for the whole term, while adjustable structures start lower and then reprice at intervals, usually with caps on how far each adjustment can move.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Paying half the monthly amount every two weeks produces thirteen full payments a year instead of twelve. That single schedule change can take years off a long mortgage without any change to your monthly cash flow, provided your lender accepts biweekly payments and charges no extra processing.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How is the mortgage payment calculated?", answer: "Principal and interest are combined with the amortisation formula: M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1). On 3,00,000 at 6.5% over thirty years, that gives roughly 1,896 a month." },
      { question: "What is the difference between principal and interest?", answer: "Principal is the part that reduces what you owe; interest is the cost of borrowing. Early in a long mortgage most of each payment is interest, and the balance between the two shifts with every instalment." },
      { question: "How does a 15-year term compare with a 30-year?", answer: "On 3,00,000 at 6.5%, fifteen years costs about 2,613 a month and 1,70,398 in interest, while thirty years costs 1,896 a month and 3,82,633 in interest — 2,12,235 more for the longer term." },
      { question: "What is an amortisation schedule?", answer: "A table showing every payment broken into interest and principal, plus the remaining balance. It makes visible why the balance barely moves at first and accelerates towards the end of the term." },
      { question: "What does loan-to-value mean for my rate?", answer: "Loan-to-value is the loan divided by the property's value. A lower ratio signals less risk to the lender and is often rewarded with better pricing, while a high ratio may require mortgage insurance as well." },
      { question: "Are taxes and insurance included here?", answer: "No. This tool models principal and interest only. Where taxes and insurance are escrowed, add them to the result to see your true monthly outflow." },
      { question: "How do biweekly payments shorten the loan?", answer: "Half-payments every two weeks add up to one extra full payment each year. Those additional amounts go straight to principal, which shortens the term and reduces total interest." },
      { question: "Can I make extra principal payments?", answer: "Usually yes, and they are applied directly to the balance, cutting future interest. Check whether your loan carries any prepayment charge and instruct the lender to apply the amount to principal rather than to future payments." },
      { question: "Is an adjustable rate cheaper than a fixed one?", answer: "It often starts lower, which is the appeal, but it reprices later — usually with caps on each adjustment and over the life of the loan. Fixed costs more at the start in exchange for certainty for the whole term." },
      { question: "Do you send my figures to a lender?", answer: "No. The calculation runs entirely in your browser; nothing you enter is stored or shared with any financial institution." }
    ],
    howWeCalculate: {
      formula: "M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1),  r = annual rate ÷ 12 ÷ 100,  n = years × 12",
      explanation: "P is the loan, r the monthly rate and n the number of monthly payments. The formula produces a level payment while the outstanding balance declines, so the interest portion shrinks every period.",
      example: "3,00,000 at 6.5% over 30 years → payment ≈ 1,896, total interest ≈ 3,82,633"
    },
    workedExample: {
      scenario: "Compare 3,00,000 at 6.5% across a fifteen-year and a thirty-year term",
      steps: [
        "Thirty years: 1,896 × 360 = 6,82,633 total, interest 3,82,633",
        "Fifteen years: 2,613 × 180 = 4,70,398 total, interest 1,70,398",
        "Difference in payment = 717 a month"
      ],
      result: "The fifteen-year term costs 717 more per month and saves 2,12,235 in interest"
    },
    commonValues: {
      heading: "Payment on 3,00,000 at 6.5% by term",
      columns: ["Term", "Monthly payment", "Total interest"],
      rows: [
        ["10 years", "3,406", "1,08,773"],
        ["15 years", "2,613", "1,70,398"],
        ["20 years", "2,237", "2,36,813"],
        ["30 years", "1,896", "3,82,633"]
      ]
    },
    relatedCalculators: [
      { name: 'Home Loan', path: '/home-loan-calculator.html' },
      { name: 'EMI Calculator', path: '/emi-calculator.html' },
      { name: 'Loan Calculator', path: '/loan-calculator.html' }
    ]
  },
  'investment-calculator': {
    title: "Project Your Investment Growth with Our",
    subtitle: "Investment Calculator",
    introduction: "Every long-term financial goal — a house deposit, a wedding, a retirement — is really a question about compounding: what does a starting amount plus a regular contribution grow to, and how much of the answer depends on time rather than on the amount you put in? This calculator answers it with four inputs: an initial investment, a monthly contribution, an expected annual return and a number of years. It returns the future value, how much of that came from your own savings and how much from growth, and a year-by-year chart showing the point where returns overtake contributions. It is intended for goal-based savers, first-time investors testing a projection before committing, and anyone who has been quoted a corpus figure without being shown the assumptions behind it. The sections below break out the two levers you control, explain how to set a return assumption that survives contact with inflation, and show why the final years of a long projection do most of the heavy lifting.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Two Levers: the Lump Sum and the Contribution</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The projection compounds the initial amount for the full term and treats each monthly contribution as an annuity that compounds for as long as it remains invested. Start with 10,000, add 500 a month at an assumed 8% for ten years and the corpus reaches about 1,13,669 against 70,000 of actual outlay — 43,669 of growth. Both levers matter, but they behave differently: the initial amount compounds untouched, while contributions build up gradually, so a larger starting sum does more work than an equivalent total spread over the years.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Setting an Assumption That Survives Inflation</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Projected returns are not returns promised. Conservative instruments tend to cluster in the mid single digits, while equity has historically delivered more with far wider swings — and none of these figures are fixed for the future. What matters more is the real return: a nominal 8% with 6% inflation leaves only about 1.9% of purchasing power growth, which is the number your goal should be measured against. Run the projection at a conservative rate, then check whether the answer still funds the goal you had in mind.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Where the Growth Actually Comes From</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          On 500 a month at 8%, the first ten years turn 60,000 of contributions into 91,473 — growth of 31,473. The next ten years add another 60,000 of contributions and produce 2,94,510 in total, meaning that second decade generated roughly 1,43,000 of growth, more than four times the first. This is compounding's exponential shape in numbers, and it is why the length of the projection often matters more than the rate you assume.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Raising the contribution is more reliable than chasing a higher return. On a twenty-year horizon, increasing 500 a month to 750 lifts the projection from about 2,94,510 to 4,41,765 — a 47% improvement you control completely, instead of one that depends on markets cooperating.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What inputs does this calculator take?", answer: "An initial investment, a monthly contribution, an expected annual percentage return and the number of years. Future value, total invested and total growth are all derived from those four figures." },
      { question: "How much difference does the monthly contribution make?", answer: "It scales the result almost proportionally, because each instalment compounds for a shorter time than the last. Doubling 500 a month to 1,000 roughly doubles the contribution-driven portion of the corpus." },
      { question: "What is the difference between absolute and annualised return?", answer: "Absolute return is the total percentage gain over the whole period. Annualised return, or CAGR, is the steady yearly rate that would produce the same ending value — the only fair way to compare investments held for different lengths of time." },
      { question: "How should I adjust the projection for inflation?", answer: "Either subtract inflation from the assumed return for a quick real-rate estimate, or grow the goal's cost by inflation alongside the corpus. A nominal 8% with 6% inflation is roughly 1.9% in real terms." },
      { question: "Does the calculator account for market volatility?", answer: "No. It applies a smooth constant rate, which is a planning simplification. Sequence risk — a poor run of returns early on — can produce a different outcome from the same average, so treat the figure as a central scenario." },
      { question: "What return rate is realistic for a long projection?", answer: "It depends entirely on the asset mix you intend to hold, and projections in the mid single digits for conservative allocations or higher for equity-heavy ones are common assumptions rather than forecasts. Test the goal against the conservative end of your range." },
      { question: "Can I model step-ups in my contribution?", answer: "This tool keeps the monthly figure constant. For escalating contributions, model the plan in stages — run the early years, then use the resulting corpus as the initial investment for the next block." },
      { question: "How much can I withdraw from the corpus each year?", answer: "A common rule of thumb is four percent of the corpus annually, adjusted for inflation thereafter. It is a heuristic, not a guarantee, and should be stress-tested against your actual spending needs." },
      { question: "How long will it take to double my money?", answer: "Divide 72 by the annual return for a quick estimate: at 8% that is about nine years. The Rule of 72 is most accurate for rates roughly between six and twelve percent." },
      { question: "Is the projected value guaranteed?", answer: "No. The arithmetic is exact for the assumptions you enter, but returns on market-linked assets are not contracted. Fixed-income products come closer, though their rates also change over time." }
    ],
    howWeCalculate: {
      formula: "FV = P × (1 + r)^n + C × ((1 + r)^n − 1) ÷ r,  r = rate ÷ 12 ÷ 100,  n = years × 12",
      explanation: "P is the initial investment and C the monthly contribution. The first term compounds the lump sum across the whole horizon; the second is an annuity that compounds each contribution for the months it stays invested.",
      example: "10,000 initial plus 500 a month at 8% for 10 years → 1,13,669 on 70,000 invested"
    },
    workedExample: {
      scenario: "Invest 10,000 up front, add 500 a month for ten years at an assumed 8%",
      steps: [
        "Monthly rate = 8 ÷ 12 ÷ 100 = 0.006667, months = 120",
        "Lump sum grows to 10,000 × (1.006667)^120 ≈ 22,196",
        "Contributions grow to 500 × ((1.006667)^120 − 1) ÷ 0.006667 ≈ 91,473"
      ],
      result: "Future value 1,13,669 — 70,000 invested and 43,669 of growth"
    },
    commonValues: {
      heading: "500 a month at 8% p.a. by horizon",
      columns: ["Horizon", "Total invested", "Projected value"],
      rows: [
        ["10 years", "60,000", "91,473"],
        ["15 years", "90,000", "1,73,019"],
        ["20 years", "1,20,000", "2,94,510"],
        ["30 years", "1,80,000", "7,45,180"]
      ]
    },
    relatedCalculators: [
      { name: 'SIP', path: '/sip-calculator.html' },
      { name: 'Compound Interest', path: '/compound-interest-calculator.html' },
      { name: 'CAGR', path: '/cagr-calculator.html' }
    ]
  },
  'investment-pnl-calculator': {
    title: "Measure Your Investment P&L and CAGR with",
    subtitle: "Investment P&L Calculator",
    introduction: "Knowing whether a trade made money is easy. Knowing whether it made money at a rate worth repeating is the part most investors get wrong. This calculator takes a buy date and price, a sell date and price and the quantity held, then reports the absolute profit or loss, the percentage return, the exact holding period in days and the annualised growth rate over that window. It was built for investors reviewing a completed position, for anyone checking whether an exit improved or damaged their long-run performance, and for traders who want a holding-period-adjusted figure instead of a raw percentage. Because the annualisation uses the actual number of days between the two dates, short trades produce startlingly large annualised numbers — which is precisely the insight the tool is designed to deliver. The sections below separate absolute from annualised return, list what the calculation excludes so your net figure stays honest, and explain how to use the holding period when comparing two very different trades.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Absolute Return vs Annualised Return</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Absolute return is simply the gain divided by what you paid: buy at 100, sell at 150 and you are up 50%, whatever the calendar says. Annualised return converts that into a yearly rate by raising the growth factor to the power of one over the number of years held. The same 50% gain held for two years is a CAGR of about 22.47% a year — but held for only 180 days it annualises to roughly 127.68%. Both are correct, and quoting the second without its context is how short-term performance gets badly mis-sold.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">What the Figure Includes — and What It Leaves Out</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The result is a gross price result. Dividends, brokerage and commission, exchange and regulatory fees, taxes on gains and any currency movement on foreign holdings are all excluded, because they depend on your account rather than on the trade itself. For a fair comparison between two investments, apply the same treatment to both — either compare gross against gross, or deduct the same categories from each before judging. If you accumulated shares in several tranches, use the average entry price as your buy price so the position is measured as one holding.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Compare every holding against the benchmark over exactly the same dates. A 25% gain looks excellent until you learn the index rose 30% over the identical window; running both numbers through this calculator with the same buy and sell dates settles the argument in seconds.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "What information does the calculator need?", answer: "Buy date, buy price, quantity and sell date, sell price. Dates are used to compute the holding period in days, which drives the annualised figure." },
      { question: "How is the profit percentage calculated?", answer: "Gain divided by cost: ((sell price − buy price) ÷ buy price) × 100. Buy at 100 and sell at 150 and the absolute return is 50%." },
      { question: "How is CAGR worked out?", answer: "CAGR = (sell ÷ buy)^(1 ÷ years) − 1, where years = days ÷ 365.25. Two years on a 100 to 150 move gives about 22.47% a year." },
      { question: "Why is the annualised return so large on a short trade?", answer: "Because a small gain is extrapolated over a full year. A 50% gain in 180 days annualises to roughly 127.68%, a number that says more about the brevity of the holding than about repeatable performance." },
      { question: "Are dividends included in the result?", answer: "No. The calculation uses entry and exit prices only. If a dividend was received during the holding period, add it manually to the profit for a true total return." },
      { question: "Are brokerage fees and taxes deducted?", answer: "No, the output is gross. Deduct commissions, statutory charges and any capital gains tax yourself to arrive at the net result you actually keep." },
      { question: "What if I bought in several instalments?", answer: "Enter the volume-weighted average entry price and the combined quantity. The tool models one entry and one exit, so collapsing multiple tranches into a single average keeps the maths honest." },
      { question: "Can it show a loss?", answer: "Yes. If the sell price is below the buy price both the profit percentage and the CAGR come out negative, and the holding period still annualises the result on the same basis." },
      { question: "How is this different from the P&L calculator?", answer: "This tool is oriented around a completed investment: it adds dates, the exact holding period and annualisation. The general P&L calculator focuses on quantity and price without the time dimension." },
      { question: "Do you store my trade history?", answer: "No. Every figure is computed in your browser from the values you enter, and nothing is uploaded or retained when you leave the page." }
    ],
    howWeCalculate: {
      formula: "profit = (sell − buy) × qty  ·  return% = (sell − buy) ÷ buy × 100  ·  CAGR = (sell ÷ buy)^(1 ÷ years) − 1",
      explanation: "Absolute return measures the gain against the entry price. Annualised return raises the growth factor to the power of one over the holding period expressed in years, using days ÷ 365.25 so partial years are handled precisely.",
      example: "Buy 100 at 100, sell at 150 after 2 years → profit 5,000, absolute 50%, CAGR 22.47%"
    },
    workedExample: {
      scenario: "100 units bought at 100 and sold at 150 after 180 days",
      steps: [
        "Profit = (150 − 100) × 100 = 5,000",
        "Absolute return = 50 ÷ 100 × 100 = 50%",
        "Years = 180 ÷ 365.25 = 0.4928, so CAGR = (1.5)^(1 ÷ 0.4928) − 1"
      ],
      result: "Profit 5,000 (+50% absolute), annualised 127.68% — a reminder that short windows distort annual figures"
    },
    commonValues: {
      heading: "Return from a 100 entry price",
      columns: ["Exit price", "Absolute return", "CAGR over 2 years"],
      rows: [
        ["110", "10.00%", "4.88%"],
        ["125", "25.00%", "11.80%"],
        ["150", "50.00%", "22.47%"],
        ["200", "100.00%", "41.42%"]
      ]
    },
    relatedCalculators: [
      { name: 'P&L', path: '/pnl-calculator.html' },
      { name: 'CAGR', path: '/cagr-calculator.html' },
      { name: 'Investment', path: '/investment-calculator.html' }
    ]
  },
  'liquidation-calculator': {
    title: "Find Your Liquidation Price with Our Free",
    subtitle: "Liquidation Calculator",
    introduction: "Leverage compresses time. The same market move that is a routine fluctuation for a cash investor is an account-ending event for a leveraged position, and the price at which the exchange steps in is a number you should know before you click buy rather than while you watch the position unwind. This calculator works it out from three inputs: entry price, leverage and the maintenance margin required to keep the position open. It reports the liquidation price for both long and short positions, the distance in price and in percentage terms, and the margin your position consumes — giving you a concrete distance to build a stop-loss around. It is intended for traders using margin or perpetual futures, for anyone sizing a position for the first time, and for risk managers who would rather see the number than feel it. The sections below show the formulas for each direction, quantify how quickly the buffer disappears as leverage rises, and explain where the real liquidation price drifts once fees and funding are counted.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Two Inputs That Decide Your Distance</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Leverage determines your initial margin — at 10x you post 10% of the position value — and the maintenance margin is the minimum equity the exchange demands to keep the position alive. The tolerable adverse move is the difference between those two: 1 ÷ leverage minus the maintenance margin as a decimal. Open a long at 100 with 10x and a 0.5% maintenance margin and the buffer is 9.5%, putting liquidation at 90.50. For a short the formula mirrors: entry × (1 + 1 ÷ leverage − maintenance margin), so a short at 100 on 5x with the same maintenance margin is liquidated at 119.50, 19.5% above your entry.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Why Leverage Destroys the Buffer</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The relationship is brutally non-linear. At 2x you can absorb a 49.5% move against you before the exchange intervenes; at 10x only 9.5%; at 25x 3.5%; at 50x 1.5%; and at 100x just 0.5% — less than a routine daily swing in almost any liquid market. Your initial margin requirement falls as leverage rises, but so does every scrap of room for error. The position gets cheaper to open and dramatically easier to lose.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Isolated, Cross and the Real-World Buffer</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Under isolated margin only the collateral assigned to the position is at risk, so the liquidation price above applies directly. Under cross margin your whole available balance backstops the position, pushing the liquidation price further away but placing the entire account behind a single trade. In practice the trigger also arrives slightly early: trading fees, funding payments and the exchange's own rounding all nibble at your equity, so treat the calculated price as the theoretical edge of the cliff rather than a safe distance from it.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Place your stop-loss before your liquidation price, with a deliberate gap between them. If liquidation sits 9.5% away, a stop at 7% protects the position and lets you exit on your own terms — after that, adding margin to defend a losing trade simply moves the cliff rather than removing it.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How is the liquidation price for a long calculated?", answer: "liquidation = entry × (1 − (1 ÷ leverage) + maintenance margin). At 100 with 10x leverage and a 0.5% maintenance margin, the price sits at 90.50 — 9.5% below entry." },
      { question: "How is the liquidation price for a short calculated?", answer: "liquidation = entry × (1 + (1 ÷ leverage) − maintenance margin). A short at 100 with 5x leverage and a 0.5% maintenance margin is liquidated at 119.50, 19.5% above entry." },
      { question: "What initial margin does my leverage require?", answer: "One divided by the leverage. At 2x you must post 50% of the position value, at 10x ten percent, at 100x one percent — the mirror image of the buffer you are left with." },
      { question: "Do fees and funding change the liquidation price?", answer: "They bring it slightly closer. Trading fees and periodic funding payments are deducted from your equity before the exchange checks it, so the practical trigger can arrive marginally earlier than the theoretical figure." },
      { question: "What is the difference between isolated and cross margin?", answer: "Isolated margin rings off the collateral assigned to the position, so only that amount can be lost. Cross margin uses your whole account balance as backing, moving the liquidation price away but exposing the entire balance to one trade." },
      { question: "What happens to my margin after liquidation?", answer: "The position is closed at the liquidation price and the assigned margin is consumed. On isolated margin the loss stops there; depending on the exchange, remaining losses can in some circumstances run beyond it." },
      { question: "Can I avoid liquidation by adding funds?", answer: "Transferring or reducing leverage can move the liquidation price away from the market, and closing part of the position releases margin. Whether you should is a different question from whether you can." },
      { question: "Is the liquidation price the same on every exchange?", answer: "No. Maintenance margin schedules differ, and many exchanges use tiered requirements that rise with position size, so the same trade can have a different trigger venue to venue." },
      { question: "How does position size affect the calculation?", answer: "Larger positions consume more of your available margin, leaving less equity in reserve. Even at the same leverage, a bigger position reduces the headroom between the mark price and liquidation." },
      { question: "Does this calculator include funding rates?", answer: "No. It computes the structural liquidation price from entry, leverage and maintenance margin. Funding and fee drag should be treated as an extra buffer on top of the figure shown." }
    ],
    howWeCalculate: {
      formula: "buffer = (1 ÷ leverage) − maintenance margin  ·  long liq = entry × (1 − buffer)  ·  short liq = entry × (1 + buffer)",
      explanation: "The initial margin set by leverage is reduced by the maintenance margin the exchange requires, and the remainder is the percentage move the position can absorb. Longs liquidate below entry, shorts above it, by that buffer.",
      example: "Entry 100, 10x long, 0.5% maintenance margin → buffer 9.5%, liquidation at 90.50"
    },
    workedExample: {
      scenario: "Open a short at 100 using 5x leverage with a 0.5% maintenance margin",
      steps: [
        "Initial margin required = 1 ÷ 5 = 20% of position value",
        "Adverse buffer = 0.20 − 0.005 = 0.195, so 19.5%",
        "Short liquidation = 100 × (1 + 0.195) = 119.50"
      ],
      result: "Liquidation at 119.50 — a 19.5% rise against the short closes the position"
    },
    commonValues: {
      heading: "Distance to liquidation with a 0.5% maintenance margin",
      columns: ["Leverage", "Move tolerated", "Long liquidation from 100"],
      rows: [
        ["2x", "49.50%", "50.50"],
        ["5x", "19.50%", "80.50"],
        ["10x", "9.50%", "90.50"],
        ["25x", "3.50%", "96.50"]
      ]
    },
    relatedCalculators: [
      { name: 'Position Size', path: '/position-size-calculator.html' },
      { name: 'Stop Loss', path: '/stop-loss-calculator.html' },
      { name: 'P&L', path: '/pnl-calculator.html' }
    ]
  },
  'dca-calculator': {
    title: "Put Your DCA Strategy to Work with Our",
    subtitle: "DCA Calculator",
    introduction: "Dollar cost averaging is less a clever technique than a discipline: invest a fixed sum on a fixed schedule regardless of what the market is doing, and let the maths of repeated purchasing do the work you cannot do reliably — namely, predict the next move. This calculator projects that discipline forward. Give it an initial amount, a monthly contribution, a horizon in years and an expected return, and it shows the future value, how much you actually put in and how much growth the plan produced, with an invested-versus-growth breakdown. It is aimed at salaried investors automating a monthly transfer, people sitting on a lump sum who are nervous about deploying it all at once, and anyone who wants to see the effect of consistency rather than timing. The sections below show how repeated purchases at falling prices lower your average cost, how the strategy compares honestly with investing a lump sum immediately, and why the behavioural benefit may matter more than the arithmetic one.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">How Repeated Purchases Lower Your Average Cost</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Because each contribution buys whatever number of units the current price allows, a falling market means more units per instalment. Invest 500 each at prices of 100, 80, 60 and 80 and you accumulate 5.000, 6.250, 8.333 and 6.250 units — 25.833 in total for 2,000 spent, an average cost of 77.42 against a simple average price of 80. That gap is the mechanism at work: volatility that punishes a single lump-sum entry becomes the reason your cost basis improves, and the units bought at 60 carry the position when the price recovers.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">DCA vs Lump Sum — An Honest Comparison</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          In a market that rises, investing a lump sum immediately usually wins, simply because all the money is exposed from day one. Spread 1,20,000 across monthly contributions for ten years and part of it sits in cash for years, never earning anything. That is the real trade-off: dollar cost averaging sacrifices some expected return in exchange for removing the risk of deploying everything at a peak. Where markets are volatile or the sum represents your entire savings, that insurance is often worth paying for — and many investors deploy a lump sum over six to twelve months as a deliberate middle path.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">
            The hardest instalments are the ones you make after a fall, and they are also the ones that do the most good — a contribution of 500 at 60 buys more than twice the units of the same amount at 100. Automate the transfer so the decision is made in a calm week, not in a panicking one.
          </p>
        </div>
      </>
    ),
    faqs: [
      { question: "How does the calculator work out my average cost?", answer: "It divides each contribution by the price paid at that point and compares total units with total spent. Five hundred at 100, 80, 60 and 80 buys 25.833 units for 2,000, an average cost of 77.42." },
      { question: "Does dollar cost averaging guarantee a profit?", answer: "No. It controls the timing of your entries, not the direction of the market. If prices fall and stay down, the position can still show a loss — the strategy averages your cost rather than eliminating risk." },
      { question: "What return should I assume for the projection?", answer: "The same return you would use for the underlying asset class, held conservatively. It is a planning assumption rather than a forecast, and the output should be treated as a scenario you stress-test at a lower rate." },
      { question: "How much and how often should I contribute?", answer: "An amount you can sustain every month without strain, on a schedule that matches your income. Monthly is the most common choice because it aligns with salary cycles; consistency matters far more than frequency." },
      { question: "How does the future value calculation work?", answer: "It compounds the initial amount for the full horizon and treats each contribution as an annuity earning the expected rate monthly — the same mechanics as any regular investment plan, reported with invested and growth split out." },
      { question: "Can I use DCA with a lump sum I already have?", answer: "Yes, by deploying it over a set period — commonly six to twelve months — rather than all at once. You accept a little expected upside in exchange for removing the risk of entering at a single, potentially unlucky, price." },
      { question: "How does DCA differ from value averaging?", answer: "Value averaging adjusts the contribution each period to hit a target portfolio value, buying more when prices fall and less when they rise. It can improve on DCA but requires flexible cash flow, which most salaried investors do not have." },
      { question: "Does DCA reduce the volatility of my portfolio?", answer: "It reduces the volatility of your entry price and removes timing risk, but the portfolio's value still moves with the market. Volatility comes from what you hold, not from how often you buy it." },
      { question: "How do contributions interact with rebalancing?", answer: "Directing each new contribution to whichever asset is below its target weight lets you rebalance with fresh money instead of selling winners, which is more tax efficient and avoids transaction costs." },
      { question: "Is a regular plan the same as a mutual fund SIP?", answer: "Yes in substance. A systematic investment plan is simply dollar cost averaging applied to a fund, with the transfer automated. The label changes; the mechanics and the discipline are identical." }
    ],
    howWeCalculate: {
      formula: "units = contribution ÷ price  ·  avg cost = total invested ÷ total units  ·  FV = initial × (1 + r)^n + C × ((1 + r)^n − 1) ÷ r",
      explanation: "The averaging half divides each purchase by its price to track the cost basis; the projection half compounds the starting amount and the contribution annuity monthly at the expected rate over the chosen horizon.",
      example: "500 each at 100, 80, 60 and 80 buys 25.833 units at an average cost of 77.42"
    },
    workedExample: {
      scenario: "Start with 1,000 and contribute 500 a month for five years at an assumed 10%",
      steps: [
        "Monthly rate = 10 ÷ 12 ÷ 100 = 0.008333, months = 60",
        "Initial amount grows to 1,000 × (1.008333)^60 ≈ 1,645",
        "Contributions grow to 500 × ((1.008333)^60 − 1) ÷ 0.008333 ≈ 38,719"
      ],
      result: "Future value ≈ 40,364 on 31,000 invested — growth of 9,364"
    },
    commonValues: {
      heading: "Cost averaging across four purchases of 500",
      columns: ["Price paid", "Units bought", "Running average cost"],
      rows: [
        ["100", "5.000", "100.00"],
        ["80", "6.250", "88.89"],
        ["60", "8.333", "76.60"],
        ["80", "6.250", "77.42"]
      ]
    },
    relatedCalculators: [
      { name: 'SIP', path: '/sip-calculator.html' },
      { name: 'Investment', path: '/investment-calculator.html' },
      { name: 'Compound Interest', path: '/compound-interest-calculator.html' }
    ]
  }
};
