import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Clock, TrendingUp, Scale, Calculator, Heart, Activity, DollarSign, Hammer, Flame, Calendar, Brain, ChevronRight, ArrowLeft, Home, Percent, Target, Binary } from 'lucide-react';

const BASE_URL = 'https://thecalhub.com';

const inlinePattern = /\[([^\]]+)\]\((\/[^)\s]+)\)|\*\*([^*]+)\*\*/g;

function renderInline(text: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  let match: RegExpExecArray | null;
  inlinePattern.lastIndex = 0;
  while ((match = inlinePattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined && match[2] !== undefined) {
      nodes.push(
        <Link
          key={`${keyPrefix}-l${i}`}
          to={match[2]}
          className="text-primary-fixed underline underline-offset-2 hover:text-primary-fixed/70 transition-colors"
        >
          {match[1]}
        </Link>
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b${i}`} className="text-white font-semibold">
          {match[3]}
        </strong>
      );
    }
    last = match.index + match[0].length;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function splitCells(row: string) {
  return row
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableSeparator(row: string) {
  return /^\|[\s|:-]+\|$/.test(row.trim());
}

function renderTable(block: string, key: string) {
  const rows = block
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => row.length > 0 && !isTableSeparator(row));
  if (rows.length < 2) return null;
  const header = splitCells(rows[0]);
  const body = rows.slice(1).map(splitCells);
  return (
    <div key={key} className="overflow-x-auto my-6 border border-white/10 rounded-xl">
      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-white/5">
          <tr>
            {header.map((cell, i) => (
              <th key={i} className="px-4 py-3 text-primary-fixed font-semibold whitespace-nowrap">
                {renderInline(cell, `${key}-h${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, r) => (
            <tr key={r} className="border-t border-white/5">
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-3 text-neutral-300 align-top">
                  {renderInline(cell, `${key}-${r}-${i}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlocks(content: string) {
  return content.split('\n\n').map((block, idx) => {
    const key = `b${idx}`;
    if (block.startsWith('## ')) {
      return (
        <h2 key={key} className="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">
          {renderInline(block.slice(3), key)}
        </h2>
      );
    }
    if (block.startsWith('### ')) {
      return (
        <h3 key={key} className="text-xl font-semibold text-white mt-6 mb-3">
          {renderInline(block.slice(4), key)}
        </h3>
      );
    }
    if (block.startsWith('> ')) {
      return (
        <blockquote
          key={key}
          className="border-l-4 border-primary-fixed/60 bg-primary-fixed/5 rounded-r-xl px-5 py-4 my-6 text-neutral-300"
        >
          {block.split('\n').map((line, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>
              {renderInline(line.replace(/^>\s*/, ''), `${key}-${i}`)}
            </p>
          ))}
        </blockquote>
      );
    }
    const lines = block.split('\n');
    if (lines.every((line) => line.trim().startsWith('|')) && lines.length >= 2) {
      return renderTable(block, key);
    }
    if (lines.every((line) => line.trim().startsWith('- '))) {
      return (
        <ul key={key} className="list-disc list-inside text-neutral-300 space-y-2 mb-5">
          {lines.map((item, i) => (
            <li key={i}>{renderInline(item.replace(/^\s*-\s*/, ''), `${key}-${i}`)}</li>
          ))}
        </ul>
      );
    }
    if (lines.every((line) => /^\s*\d+\.\s/.test(line))) {
      return (
        <ol key={key} className="list-decimal list-inside text-neutral-300 space-y-2 mb-5">
          {lines.map((item, i) => (
            <li key={i}>{renderInline(item.replace(/^\s*\d+\.\s*/, ''), `${key}-${i}`)}</li>
          ))}
        </ol>
      );
    }
    return (
      <p key={key} className="text-neutral-300 leading-relaxed mb-5">
        {renderInline(block, key)}
      </p>
    );
  });
}

function wordCount(content: string) {
  const plain = content
    .replace(/[#>|*-]/g, ' ')
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '$1');
  const words = plain.split(/\s+/).filter(Boolean);
  return words.length;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const articles = [
  {
    id: 1,
    title: 'EMI Formula Explained: Calculate Your Loan EMI by Hand',
    excerpt: 'Work the EMI formula step by step with two real loan examples and see exactly how rate, tenure and prepayment change what you actually pay monthly.',
    content: `An Equated Monthly Installment, or EMI, is the fixed sum you hand a lender every month until a loan is gone. Each payment carries two components: interest charged on the balance you still owe, and principal that shrinks that balance. Lenders quote a single number, but behind it sits a small piece of algebra you can run yourself in under a minute. Once you can run it, you understand immediately why stretching a loan lowers the monthly burden while inflating total interest, and why a prepayment made in year one is worth several prepayments made in year eighteen.

In this guide we build the formula from scratch, convert an advertised annual rate into the monthly rate the formula actually needs, work two complete examples by hand, walk through the first six payments of a real schedule, and test what happens when the rate or the tenure changes.

## The EMI formula

Nearly every retail loan — personal, car, home, education — is priced with the same annuity formula:

**E = P × r × (1 + r)^n / ((1 + r)^n − 1)**

In that expression **E** is the equated monthly installment, **P** is the principal you borrow, **r** is the interest rate **per month**, and **n** is the total number of monthly payments. The formula is derived from the present value of an ordinary annuity: it solves for the level payment whose discounted stream exactly equals the amount lent to you.

Three details decide whether your answer is right or nonsense:

- The rate must be monthly. A quoted annual rate of 12% becomes r = 0.12 ÷ 12 = 0.01, not 12.
- The exponent counts months. Five years is 60 payments, ten years is 120, twenty years is 240.
- The formula assumes a rate that never moves and payments that never arrive late. Floating-rate loans are simply re-run through the same formula whenever the benchmark rate changes.

### Converting the quoted rate

Banks advertise an annual percentage rate, but the formula wants a monthly one, so divide by twelve and nothing else. An 8.5% home loan becomes 8.5 ÷ 12 = 0.7083% per month, or r = 0.0070833 in decimal form. Notice that dividing by twelve gives 0.7083% and not 0.7083 of a percent written as 0.7083 — the classic error is treating 8.5 ÷ 12 = 0.7083 as the decimal rate, which would price your loan at 70.83% a year. Always convert to a decimal: 8.5% = 0.085, divided by 12 = 0.0070833.

There is a second, subtler trap. Some lenders quote a flat rate ("9% flat") rather than a reducing balance rate. A flat rate is applied to the original principal for every month of the loan, so the effective cost is roughly double the flat figure. The formula on this page is a reducing-balance formula; if your quote says "flat", ask for the annual reducing rate before comparing.

## Worked example 1: a ₹5 lakh personal loan

Suppose you borrow **₹5,00,000** at **12% per year** for **5 years**. Converting: r = 0.12 ÷ 12 = 0.01, and n = 5 × 12 = 60.

1. Compute (1 + r)^n: (1.01)^60 = 1.8167.
2. Numerator: P × r × (1 + r)^n = 5,00,000 × 0.01 × 1.8167 = 9,083.49.
3. Denominator: (1 + r)^n − 1 = 0.8167.
4. Divide: 9,083.49 ÷ 0.8167 = **₹11,122 per month**.

Multiply back to see the full cost: 11,122 × 60 = ₹6,67,320 repaid in total, of which **₹1,67,320 is pure interest** — about a third of everything you pay. That ratio is not a flaw of the formula; it is what a 12% rate over five years genuinely costs.

## Worked example 2: a ₹25 lakh home loan

Now a bigger, cheaper, longer loan: **₹25,00,000** at **8.5%** for **20 years**. Here r = 0.085 ÷ 12 = 0.0070833 and n = 240.

1. (1.0070833)^240 = 5.4412.
2. Numerator: 25,00,000 × 0.0070833 × 5.4412 = 96,355.
3. Denominator: 5.4412 − 1 = 4.4412.
4. Divide: 96,355 ÷ 4.4412 = **₹21,695 per month**.

Over 240 payments you repay ₹52,06,800, so the interest is **₹27,06,800** — more than the house costs you in the first place. The rate is lower and the EMI as a share of the loan is far smaller, but twenty years of compounding is a long road. This is the single most useful thing the formula tells you: interest is a function of time as much as of rate.

## What the first six payments actually look like

A schedule applies the formula one month at a time: interest = opening balance × r, principal = EMI − interest, closing balance = opening balance − principal. For the ₹5 lakh loan at EMI ₹11,122:

| Month | Opening balance | Interest at 1% | Principal | Closing balance |
|---|---|---|---|---|
| 1 | ₹5,00,000 | ₹5,000 | ₹6,122 | ₹4,93,878 |
| 2 | ₹4,93,878 | ₹4,939 | ₹6,183 | ₹4,87,695 |
| 3 | ₹4,87,695 | ₹4,877 | ₹6,245 | ₹4,81,450 |
| 4 | ₹4,81,450 | ₹4,814 | ₹6,308 | ₹4,75,142 |
| 5 | ₹4,75,142 | ₹4,751 | ₹6,371 | ₹4,68,771 |
| 6 | ₹4,68,771 | ₹4,688 | ₹6,434 | ₹4,62,337 |

Two observations worth internalising. First, principal already exceeds interest from month one here, because a 12% rate over a short five-year term forces a fast payoff. On the 20-year home loan the pattern is reversed: month one charges ₹17,708 of interest against only ₹3,987 of principal, and for roughly the first decade more than half of every rupee you pay is interest. Second, the principal column grows every single month — by month 60 of the personal loan you are clearing over ₹10,000 of principal per ₹1,122 of interest.

## How rate and tenure change the payment

Hold the loan amount fixed at ₹5 lakh and vary the tenure. At 12% per year:

| Tenure | EMI | Total repaid | Total interest |
|---|---|---|---|
| 5 years | ₹11,122 | ₹6,67,320 | ₹1,67,320 |
| 7 years | ₹8,826 | ₹7,41,384 | ₹2,41,384 |
| 10 years | ₹7,173 | ₹8,60,760 | ₹3,60,760 |

Going from five to ten years cuts the monthly payment by 36% but adds **₹1,93,440** of interest. Now hold the tenure at five years and vary the rate instead:

| Interest rate | EMI | Total repaid | Total interest |
|---|---|---|---|
| 9% | ₹10,379 | ₹6,22,740 | ₹1,22,740 |
| 12% | ₹11,122 | ₹6,67,320 | ₹1,67,320 |
| 15% | ₹11,895 | ₹7,13,700 | ₹2,13,700 |

A six-point rise in the rate adds ₹1,516 to every month and about ₹91,000 to the total. Which lever you pull depends on your cash flow: if the EMI is what hurts, extend the tenure and then attack the principal with voluntary prepayments; if total cost is what hurts, shorten the tenure or shop the rate. Rates differ between lenders, between countries and over time, so treat every figure here as an illustration of the mechanism rather than a quote you will be offered.

## Why prepayment in the early years saves the most

Return to the ₹5 lakh loan. After 12 payments the outstanding balance is ₹4,22,357. Suppose you receive a bonus and pay **₹50,000** straight into principal, leaving ₹3,72,357 outstanding, with 48 payments still scheduled. How many payments does the same EMI now clear? Rearranging the formula for n:

**n = −ln(1 − r × B / E) / ln(1 + r)**

With B = 3,72,357, r = 0.01 and E = 11,122: r × B / E = 0.3348, so 1 − 0.3348 = 0.6652, ln(0.6652) = −0.4076, and −0.4076 ÷ 0.00995 = **41 payments instead of 48**. You stop seven months early.

The money math: without the prepayment you would have paid 48 × 11,122 = ₹5,33,856. With it you pay 50,000 + 41 × 11,122 = ₹5,06,002. You save **₹27,854** of interest by redirecting ₹50,000 that was sitting idle. The same ₹50,000 prepayment made in month 48 of a 60-month loan would save only about ₹6,000, because barely any interest remains to be avoided. The formula makes the timing problem obvious: interest is charged on the balance, so kill the balance while it is large.

Most lenders permit two or three penalty-free prepayments a year, and many waive foreclosure charges entirely on floating-rate home loans, while personal and car loans often do not. Check your sanction letter before you plan around it.

## What the formula leaves out

The EMI equation prices the loan, but not the whole product:

- Processing fees (typically 0.5% to 2% of the loan, sometimes capped), documentation charges, and stamp duty on the mortgage deed.
- Insurance bundled into the deal — credit protection or property cover — which raises the cash you need without lowering the rate.
- Floating-rate resets. If the benchmark moves 0.5%, your EMI or your tenure is recomputed; lenders usually have a reset clause and a floor rate.
- Late-payment penalties and the fact that a missed EMI usually lands on interest first, stretching the schedule silently.
- Tax treatment, which depends on your country and, in India, on whether you took the loan under the old or the new tax regime.

Ask the lender for the amortisation schedule before signing. A serious lender will hand it over, and it will match the arithmetic above to the rupee.

## Five things to take away

1. Convert the annual rate to a monthly decimal before you touch the formula.
2. Longer tenure means a smaller EMI and a much larger total bill — the two always move together.
3. A small drop in the rate is worth more than you think, because it compounds for the whole tenure.
4. Prepay early, when the balance you are killing is at its largest.
5. The EMI is the price of the loan, not the cost of the loan; fees and insurance are extra.

## Try it yourself

Run your own numbers instead of trusting ours. Start with the [EMI calculator](/emi-calculator.html) for any personal, car or bike loan, move to the [home loan calculator](/home-loan-calculator.html) to test rate and tenure combinations on a mortgage, compare total outgo with the [loan calculator](/loan-calculator.html), and if you are refinancing, price the new deal against the outstanding balance of the old one with the [mortgage calculator](/mortgage-calculator.html).`,
    category: 'Financial',
    readTime: '9 min read',
    date: '2026-10-06',
    icon: TrendingUp,
    path: 'emi-calculation-guide.html'
  },
  {
    id: 2,
    title: 'SIP vs Lump Sum: Which Invests Better Over 10 Years?',
    excerpt: 'A rupee-for-rupee comparison of monthly SIPs and one-time lump sum investing, with worked returns, hidden volatility, and an honest verdict.',
    content: `Every investor eventually faces the same fork: invest the money you have now in one go, or feed the market a fixed amount every month? The question shows up as "SIP vs lump sum" in search boxes because the popular answer — always start a SIP — is only half true. Whether the monthly route wins depends on what the market does after you start, and that is exactly the thing nobody knows in advance.

This guide puts both strategies through the same arithmetic, shows a case where the lump sum wins by a wide margin and a case where the SIP wins, explains why rupee-cost averaging is a risk-control tool rather than a return-booster, and gives you a decision rule you can actually apply.

## What each strategy actually does

A **lump sum** puts the entire capital to work on day one. Every rupee immediately earns the market's return, good or bad. A **systematic investment plan (SIP)** invests a fixed amount at a fixed interval — usually monthly — regardless of price, so you buy more units when markets fall and fewer when they rise.

The mechanical difference is exposure. If you have ₹14,40,000 to deploy over ten years, the lump sum has ₹14,40,000 invested from month one. The SIP has an average invested balance of roughly half that, because the money arrives gradually. In a market that simply rises, the lump sum therefore has an unbeatable head start.

### The formulas

The future value of a lump sum is **A = P × (1 + i)^n**, where P is the principal, i the annual return and n the years. The future value of a monthly SIP is **A = M × [((1 + r)^k − 1) / r] × (1 + r)**, where M is the monthly amount, r the monthly rate and k the number of months. Both are ordinary annuity mathematics; nothing about the second one guarantees a higher return.

## Case A: a steadily rising market

Assume a market that returns 12% a year, compounding smoothly, and two investors with the same ₹14,40,000.

| Strategy | Money invested | Value after 10 years | Growth |
|---|---|---|---|
| SIP of ₹12,000/month | ₹14,40,000 | ₹27,88,100 | ₹13,48,100 |
| Lump sum of ₹14,40,000 on day one | ₹14,40,000 | ₹47,72,500 | ₹33,32,500 |

The SIP figure comes from r = 0.01 and k = 120: (1.01)^120 = 3.3004, (3.3004 − 1) ÷ 0.01 = 230.04, × 1.01 = 232.34, × 12,000 = ₹27,88,100. The lump sum compounds at 1.12^10 = 3.1058, giving 14,40,000 × 3.1058 = ₹47,72,500. Same total outlay, same market, and the lump sum is **₹19,84,400 ahead** — because its money worked for the full ten years while the SIP's money averaged only about five years of exposure.

This is the uncomfortable truth: in a market that only goes up, delaying money into the market is expensive.

## Case B: a market that falls first

Now assume the same investor faces a market that drops 25% in year one, drifts sideways for two more years, and then compounds strongly. The lump sum buys at the top and spends three years underwater; the SIP buys cheaply through the downturn.

| Year | Market path | Lump sum value | SIP invested so far |
|---|---|---|---|
| 1 | −25% | ₹10,80,000 | ₹1,44,000 |
| 2 | −5% | ₹10,26,000 | ₹2,88,000 |
| 3 | 0% | ₹10,26,000 | ₹4,32,000 |
| 4 | +18% | ₹12,10,680 | ₹5,76,000 |
| 10 | strong recovery | ends ahead in most paths | buys 30–40% more units per rupee in years 1–3 |

Numbers in the later rows depend on the exact recovery path, but the mechanism is fixed: the SIP investor transacted at depressed prices, so the average cost per unit is materially lower than the lump sum investor's purchase price. In paths that dip early and recover later, the SIP finishes ahead or closes most of the gap.

## Why rupee-cost averaging is not a free lunch

SIP marketing often implies that averaging automatically beats lump sum investing. It does not, on average. Backtested across long history in most markets, a lump sum beats a SIP roughly two times in three, because markets rise more often than they fall. What averaging genuinely buys you is **variance reduction**: a smoother ride, shallower drawdowns, and far less regret.

That matters more than it sounds. The investor who lump-sums into a 25% crash often panic-sells at the bottom, turning a paper loss into a permanent one. The SIP investor sleeping through the same crash keeps buying. Behavioural durability is a real return, even though it never appears in the CAGR column.

### The honest framing

- If you have a large sum and a stomach for a 25–30% drawdown with no intention of selling, history favours investing it now.
- If the money is earmarked for something within two to three years, it does not belong in equities at all — lump sum or SIP.
- If the sum is large relative to your net worth and you know you will lose sleep, a phased entry (for example, investing half now and the rest over six to twelve months) trades a little expected return for a lot of peace.

## Side-by-side comparison

| Dimension | SIP | Lump sum |
|---|---|---|
| Best market condition | Falling or sideways, then recovering | Steadily rising from day one |
| Capital needed up front | Small, repeatable | Large, one time |
| Average market exposure | ~50% of total over the period | 100% from day one |
| Typical long-run outcome | Slightly lower mean, lower variance | Higher mean, higher variance |
| Main risk | Staying invested through the grind | Buying near a peak |
| Discipline required | Automation does it for you | One decision, then patience |
| Tax treatment (India) | Each purchase has its own holding period for capital gains | Single holding period from the purchase date |

Tax rules vary by country and change over time — in India, for instance, equity fund gains and the holding periods that define them have been amended repeatedly — so confirm the current treatment before you act.

## A hybrid that most people should consider

Real life rarely offers a clean either-or. A common, defensible pattern:

1. Invest any windfall that exceeds your emergency fund immediately, up to a limit you are comfortable watching drop by a third.
2. Run a SIP for your monthly surplus for as long as you are earning.
3. Keep three to six months of expenses in a liquid fund or high-yield savings account so a job loss never forces an equity sale.
4. Rebalance annually: if equities have run far ahead of your target, trim; if they have fallen, buy with the proceeds.

This structure captures most of the lump sum's upside while removing the scenario that destroys portfolios, which is being a forced seller at the bottom.

## Sequencing risk: the mistake only one strategy can make

There are two timing errors, and a lump sum investor can commit both. Buying at the top of a cycle commits the first — capital deployed at an unfavourable price with no cash left to buy the dip. Sitting in cash waiting for the dip commits the second, which long-run data says is worse: markets spend much of their time at or near record highs, so the "better entry" you are waiting for may never arrive, and every month outside the market costs the compounding that month would have produced.

A SIP makes neither mistake structurally. It buys at bad prices and at good ones in a fixed rhythm, so the average entry price lands close to the average price across the window. What it cannot do is guarantee a specific return — no strategy can. The honest framing: a lump sum is a bet that today's price is acceptable, while a SIP is a bet that you cannot predict prices, which is a bet you always win.

Whichever route you take, the plan has to survive contact with a bad quarter. Write down in advance the condition under which you would change course — normally a change in your cash flow, never a change in the chart — and then follow the rule you wrote.

## The verdict

For the same total money and a market that rises throughout, the lump sum wins comfortably — we measured ₹47.7 lakh against ₹27.9 lakh. For a market that falls before it rises, the SIP's disciplined buying at low prices closes or reverses that gap, and it does so while keeping the investor solvent and sleeping. The correct question is not "which returns more?" but "which one will I still be holding in year seven of a bear market?"

Most readers arriving here are not sitting on a windfall; they are deciding whether to start a monthly investment. For them the answer is simple: start the SIP today, because an invested rupee at a known time beats a perfect entry price at an unknown one.

## Try it yourself

Model both paths with real inputs. Use the [SIP calculator](/sip-calculator.html) to project monthly contributions at different return assumptions, the [investment calculator](/investment-calculator.html) for a one-time sum, the [DCA calculator](/dca-calculator.html) to compare staged entries against a single buy, and the [compound interest calculator](/compound-interest-calculator.html) to see how the gap between the two strategies widens or narrows as the horizon stretches from five to twenty years.`,
    category: 'Financial',
    readTime: '8 min read',
    date: '2026-10-04',
    icon: DollarSign,
    path: 'sip-vs-lumpsum.html'
  },
  {
    id: 3,
    title: 'Compound Interest Explained: The Math Behind Every Savings Account',
    excerpt: 'See how compounding actually builds money with year-by-year tables, the rule of 72, the bite of inflation, and what the same math does to debt.',
    content: `Compound interest is the reason a bank balance left alone for twenty years looks nothing like the balance you deposited, and the reason a credit card bill you ignore for three years can nearly triple. It is the same mechanism running in both directions: interest earns interest, and the effect snowballs the longer it runs.

This guide builds the formula from first principles, compares the compounding frequencies inside a real deposit, measures how much of your final balance is interest versus deposits, and then covers the part most articles leave out — that nominal returns mean very little until you have removed inflation.

## Simple interest versus compound interest

With **simple interest**, the lender pays you interest only on the original principal. With **compound interest**, each period's interest is added to the balance, so the next period's interest is calculated on a larger number.

Take ₹1,00,000 at 8% for ten years:

| Year | Simple interest balance | Compound interest balance |
|---|---|---|
| 1 | ₹1,08,000 | ₹1,08,000 |
| 5 | ₹1,40,000 | ₹1,46,933 |
| 10 | ₹1,80,000 | ₹2,15,892 |
| 20 | ₹2,60,000 | ₹4,66,096 |
| 25 | ₹3,00,000 | ₹6,84,847 |

Both start identical and diverge brutally. By year ten the compound balance is ₹35,892 higher; by year twenty it is ₹2,06,096 higher; by year twenty-five the compound balance is more than double the simple one. Nothing changed about the rate — only whether the interest was allowed to rejoin the principal.

## The compound interest formula

The general formula is:

**A = P × (1 + r / n)^(n × t)**

**A** is the final amount, **P** is the principal, **r** is the annual interest rate as a decimal, **n** is the number of times interest is compounded each year, and **t** is the number of years. Divide first, then raise: for 8% compounded monthly at n = 12, you compute 1 + 0.08 ÷ 12 = 1.0066667 and then raise it to the power of 12 × t.

If you also contribute regularly, the annuity future value formula takes over: **A = M × [((1 + i)^n − 1) / i] × (1 + i)**, where M is the monthly contribution and i is the monthly rate. We use it further down.

### How often compounding happens

The same ₹1,00,000 at 8% for ten years, compounded at different frequencies:

| Compounding | Formula check | Final balance | Effective annual yield |
|---|---|---|---|
| Annually | (1.08)^10 | ₹2,15,892 | 8.00% |
| Semi-annually | (1.04)^20 | ₹2,19,112 | 8.16% |
| Quarterly | (1.02)^40 | ₹2,20,805 | 8.24% |
| Monthly | (1.0066667)^120 | ₹2,21,964 | 8.30% |
| Daily | (1.0002192)^3650 | ₹2,22,531 | 8.33% |
| Continuous | e^(0.8 × 10) | ₹2,22,554 | 8.33% |

The jump from annual to monthly adds ₹6,072 on a ₹1 lakh deposit; from monthly to continuous it adds only ₹590. There is a hard ceiling — the continuous-compounding limit — and most of the benefit is captured by monthly compounding. This is exactly why banks quote an **effective annual rate** alongside the headline rate: it is the number that includes compounding, and it is the only one you should compare across offers.

## Worked example: what one lakh becomes

Depositing ₹1,00,000 at 8% compounded annually:

- End of year 1: ₹1,08,000 — you earned ₹8,000.
- End of year 5: ₹1,46,933 — cumulative interest ₹46,933.
- End of year 10: ₹2,15,892 — cumulative interest ₹1,15,892.
- End of year 15: ₹3,17,217 — cumulative interest ₹2,17,217.
- End of year 20: ₹4,66,096 — cumulative interest ₹3,66,096.
- End of year 25: ₹6,84,847 — cumulative interest ₹5,84,847.

Read the last line again: after twenty-five years, **85% of the balance is interest you never earned with your own hands**. The first ₹1,00,000 did ₹5,84,847 of work. In the first year your money earned ₹8,000; in year twenty-five alone it earns ₹50,735 — more than six times the first year's output, from the same untouched deposit.

## The rule of 72

To find how long an investment takes to double at a given rate, divide 72 by the annual percentage. At 8%, 72 ÷ 8 = 9 years; the precise answer using logarithms is 9.01 years. At 15%, 72 ÷ 15 = 4.8 years against a true 4.96 years.

The rule works best between roughly 6% and 10% and drifts outside that band. It is a mental shortcut, not a calculator: useful for comparing offers in your head, useless as a plan. Note also that 72 is not magic — 69.3 is the more accurate divisor (it comes from ln 2), but 72 divides cleanly by more numbers, which is why it stuck.

The rule also works in reverse, which is where it becomes a planning tool. At 12% a year your money doubles every six years (72 ÷ 12 = 6), so eighteen years buys three doublings: ₹12.5 lakh becomes ₹25 lakh, then ₹50 lakh, then ₹1 crore. Turning ₹12.5 lakh into ₹1 crore needs no cleverness beyond three patient doublings. That single calculation is why starting early usually beats finding a slightly better rate — the rate moves the clock by months, but the start date moves it by decades.

The shortcut prices debt the same way: a card charging 36% a year roughly doubles an unpaid balance in two years (72 ÷ 36 = 2), and one at 24% does it in three. That is why clearing revolving debt is frequently the highest guaranteed return available to a household — the identical clock running in reverse.

## Regular contributions change everything

Most people do not deposit one lump sum and walk away. They invest every month, and compounding then works on both the contributions and the returns.

Investing ₹5,000 a month at 10% a year:

| Horizon | You contributed | Portfolio value | Interest earned |
|---|---|---|---|
| 10 years | ₹6,00,000 | ₹10,32,700 | ₹4,32,700 |
| 15 years | ₹9,00,000 | ₹20,89,000 | ₹11,89,000 |
| 20 years | ₹12,00,000 | ₹38,28,500 | ₹26,28,500 |
| 25 years | ₹15,00,000 | ₹66,89,000 | ₹51,89,000 |

The contributions rise linearly — ₹5,000 every month, no more, no less — while the balance rises on a curve. Between year twenty and year twenty-five you add ₹3,00,000 of savings and gain ₹28,60,500 of balance. That gap is compounding doing the heavy lifting.

## Time beats rate

The same ₹5,000 monthly at 10%, started at different ages and held to age 60:

| Starting age | Years invested | Total contributed | Value at 60 |
|---|---|---|---|
| 25 | 35 | ₹21,00,000 | ₹1,91,44,000 |
| 35 | 25 | ₹15,00,000 | ₹66,89,000 |
| 45 | 15 | ₹9,00,000 | ₹20,89,000 |

The investor who starts at 25 contributes ₹6,00,000 more than the one who starts at 35 and ends with **₹1,24,55,000 more** — roughly three times the final balance for 1.4 times the money. No rate shopping, no clever selection, just time. A ten-year delay costs far more than any realistic difference in returns between two decent funds.

## Inflation: the return you actually spend

Nominal returns are what the statement shows; real returns are what you can buy. A quick approximation is **real return ≈ nominal return − inflation**, but over long horizons compounding on both sides makes the approximation drift, so it is worth doing properly.

| Nominal return | Inflation | Value of ₹1 after 20 years in today's money |
|---|---|---|
| 6% | 4% | ₹1.46 |
| 8% | 6% | ₹1.45 |
| 10% | 7% | ₹1.74 |
| 8% | 8% | ₹1.00 |
| 5% | 9% | ₹0.70 |

At 8% nominal with 6% inflation your money still buys 45% more than it does today — real compounding, not an illusion. At 8% against 8% inflation you have compounded exactly nowhere. Against 9% inflation a 5% deposit loses 30% of its purchasing power. This is why the inflation rate in a retirement or education plan matters more than a decimal point of extra yield, and why equity risk exists at all: equities are historically held as the asset most likely to stay above inflation over a decade or more.

## Where compounding works against you

Debt compounds identically. A ₹50,000 credit card balance at 40% a year — a realistic range for cards in many countries, and fees can push it higher — grows as follows if nothing is repaid:

- After 1 year: ₹70,000
- After 2 years: ₹98,000
- After 3 years: ₹1,37,200

Three years, almost triple. Minimum payments make it worse, because most of a minimum payment goes to interest and the balance barely moves. The same table that flatters a savings account indicts revolving debt: compounding is a multiplier on whichever side of the ledger you are standing.

## Seven habits that let compounding work

1. Start earlier rather than larger — time contributes more than amount.
2. Reinvest every dividend and interest payment instead of spending the payout.
3. Automate the monthly contribution so it survives market dips and busy months.
4. Keep fees and expense ratios low; a 1% annual fee consumes roughly a quarter of a 20-year compounded gain.
5. Do not interrupt the compounding with unnecessary withdrawals — every withdrawal restarts a smaller clock.
6. Check the effective annual rate, not the headline rate, when comparing deposits.
7. Judge results against inflation, not against zero.

## Try it yourself

Put your own numbers in. The [compound interest calculator](/compound-interest-calculator.html) runs lump sums and contribution schedules side by side, the [SIP calculator](/sip-calculator.html) projects monthly investing, the [FD calculator](/fd-calculator.html) prices a fixed deposit at its actual compounding frequency, and the [inflation calculator](/inflation-calculator.html) strips nominal growth back to what it is really worth.`,
    category: 'Financial',
    readTime: '8 min read',
    date: '2026-10-02',
    icon: Calculator,
    path: 'compound-interest.html'
  },
  {
    id: 4,
    title: 'Loan Amortization Schedule: How to Read Every Payment',
    excerpt: 'A payment-by-payment walkthrough of an amortization table, showing where your money goes, and the three prepayment levers that cut interest.',
    content: `An amortization schedule is a table with one row per payment and five columns: payment number, instalment, interest, principal, closing balance. It looks like bookkeeping, but it is the clearest picture you will ever get of what a loan costs you — because it shows, rupee by rupee, how much of your payment is merely renting money and how much is actually buying your house back.

This guide builds a schedule from the EMI formula, walks through the first payments of a real ₹25 lakh mortgage, marks the crossover point where principal finally overtakes interest, and then shows the three levers — prepayment, tenure reduction and refinancing — that change the shape of the table.

## How a payment is decomposed

Each month the same three lines repeat:

- **Interest** = opening balance × monthly rate. This is the lender's fee for letting you keep the money.
- **Principal** = instalment − interest. This is what actually reduces your debt.
- **Closing balance** = opening balance − principal.

The instalment itself never changes on a fixed-rate loan, but its composition shifts every single month. Because interest is computed on a shrinking balance, the interest column falls and the principal column rises with each row. Nothing else in personal finance compounds so reliably in your favour.

### The amortization formula behind the balance

The balance after k payments is **B(k) = P × (1 + r)^k − E × [((1 + r)^k − 1) / r]**, where P is the original principal, r the monthly rate and E the EMI. The first term is what the original debt would owe if you paid nothing; the second is what your payments would be worth if they earned the same rate. The gap between them is your remaining debt. Every lender's schedule is this expression evaluated once a month.

## Worked example: ₹25 lakh at 8.5% for 20 years

The EMI works out to ₹21,695 (see our [EMI formula guide](/blog/emi-calculation-guide.html) for the full derivation). The first year:

| Payment | Opening balance | Interest | Principal | Closing balance |
|---|---|---|---|---|
| 1 | ₹25,00,000 | ₹17,708 | ₹3,987 | ₹24,96,013 |
| 2 | ₹24,96,013 | ₹17,681 | ₹4,014 | ₹24,91,999 |
| 3 | ₹24,91,999 | ₹17,653 | ₹4,042 | ₹24,87,957 |
| 6 | ₹24,79,700 | ₹17,565 | ₹4,130 | ₹24,75,570 |
| 12 | ₹24,54,574 | ₹17,387 | ₹4,308 | ₹24,50,228 |

Read row one: of your first ₹21,695 payment, **₹17,708 — 82% — is interest**, and only ₹3,987 moves the debt. Twelve payments later you have paid ₹2,60,340 and the balance has fallen by just ₹49,772, meaning **₹2,10,568 of year one went to the lender**. That is the sentence that surprises people, and it is the reason refinancing or prepaying early in a long loan is worth more than doing it late.

## The crossover point

There is a month where principal finally exceeds interest, and it is worth locating. Principal overtakes interest when the balance falls below E ÷ (2 × r). For this loan: 21,695 ÷ (2 × 0.0070833) = **₹15,31,350**. The balance crosses that line roughly around payment 105, near the end of year nine. Before that point more than half of every rupee you pay is interest; after it, more than half is yours.

Shorten the loan and the crossover arrives earlier. On the five-year ₹5 lakh example at 12%, the threshold is 11,122 ÷ 0.02 = ₹5,56,100 — above the loan from day one, so principal leads interest in the very first payment. The crossover is a direct function of rate and tenure, which is exactly what the two formulas above predict.

## Full-life cost of the example loan

| Metric | Value |
|---|---|
| Loan | ₹25,00,000 |
| Rate | 8.5% fixed for the term |
| Tenure | 240 months |
| EMI | ₹21,695 |
| Total repaid | ₹52,06,800 |
| Total interest | ₹27,06,800 |
| Interest as share of repaid amount | 52% |

The total interest exceeds the principal. Over the full schedule the lender earns ₹27.06 lakh for advancing ₹25 lakh over two decades — and that is at a rate well below many historical averages. When someone asks whether a one-year rate cut of 0.25% matters, note that on this loan it removes roughly ₹1.2 lakh of lifetime interest even though it saves only about ₹550 a month.

One number deserves attention early: in this loan, interest accounts for 82% of payment one and still 80% of payment two, and the share does not fall below half until year nine. Any adviser who tells you that "most of your EMI goes to the bank anyway" is describing the first decade of a long mortgage — which is exactly why the decisions you make in the first three years (prepayment, tenure choice, rate type) dominate the total cost, while decisions made in the final three years barely register at all.

## Lever 1: voluntary prepayment

Apply ₹2,00,000 against the balance at the end of year five. The outstanding balance at payment 60 is approximately ₹22,55,000; after the prepayment it is ₹20,55,000. Keeping the EMI unchanged, the remaining term falls from 180 months to about 168 — a full year cut — and total interest drops by roughly ₹4,50,000 to ₹5,00,000.

Banks differ on how extra money is credited. Some reduce the tenure automatically at an unchanged instalment, others reduce the instalment with the tenure fixed, and a few hold the surplus in an overdraft-style sub-account and only apply it at renewal — a version that earns little or nothing until the anniversary and can erase a year of the advantage. Read the sanction letter, or ask the branch to confirm in writing which of the three applies to your loan.

Keeping the tenure instead and reducing the EMI saves about ₹1,500 a month but almost none of the interest. The choice between them is a cash-flow decision, not a mathematical one, and most lenders let you switch between the options annually. Ask specifically whether the extra payment reduces tenure or reduces EMI; the default is not always the one you want.

## Lever 2: paying half the EMI every fortnight

Twenty-six half-payments a year equal thirteen full payments — one extra month of payment annually, or an effective ₹23,503 a month on this loan. Solving the amortization formula at that payment level gives a term of about **198 months instead of 240** and a total outlay of roughly ₹46,60,000 instead of ₹52,06,800: roughly **₹5.4 lakh saved and three and a half years cut**.

Caveats: some lenders charge a fee for unstructured extra payments, some apply extra payments to the next EMIs rather than to principal, and rounding differences accumulate. Confirm the mechanism in writing before you restructure your payments around it.

## Lever 3: refinancing

If market rates fall and your loan is fixed, refinancing means taking a new loan to retire the old one. The test is simple arithmetic: calculate the new EMI on the outstanding balance, compare total remaining outgo under both loans, and subtract the costs of switching (processing fee, legal charges, valuation, and any prepayment penalty on the old loan). A rate cut of 0.75% on a ₹20 lakh balance with ten years left typically saves more than the switching costs by a wide margin; a cut of 0.25% often does not, once fees are counted.

Refinancing resets the amortization clock — you go back to an interest-heavy schedule — so compare total cost, never monthly instalment alone.

## Build the schedule yourself in a spreadsheet

You do not need the lender's file to reproduce the table. Three functions do it in any spreadsheet:

1. **PMT(rate, nper, pv)** returns the instalment. With rate = 8.5% ÷ 12, nper = 240 and pv = 2500000, PMT gives −21,695.
2. **IPMT(rate, period, nper, pv)** returns the interest component of that month's payment.
3. **PPMT(rate, period, nper, pv)** returns the principal component, and IPMT + PPMT always equals the instalment exactly.

Lay out the columns — period, opening balance, payment, interest, principal, closing balance — then fill down, feeding each row's closing balance into the next row's opening balance. That is the entire logic of an amortization schedule.

Two sanity checks before trusting the sheet: the final closing balance must be zero to within a rupee, and the principal column must sum to exactly the original loan. Once those hold, you can answer questions no lender's calculator will: what happens if I add ₹2,000 every March, how much a 0.25% cut saves across the whole term, and in which year refinancing starts to beat staying put.

## How to read your own schedule

When you get the table from your lender, check four things:

1. Does the interest column in row one equal balance × rate? If not, the lender is charging on a flat basis or has loaded fees into the balance.
2. Does the final row close at exactly zero?
3. Where is your crossover month, and how far away is it?
4. Does the total interest column match your own EMI × n − P calculation?

If any of those fail to reconcile, ask before signing. A legitimate schedule will match to the last rupee.

## Try it yourself

Generate the table for your own loan. Start with the [loan calculator](/loan-calculator.html) for a quick amortization view, use the [mortgage calculator](/mortgage-calculator.html) to test rate and tenure scenarios, model the home loan itself with the [home loan calculator](/home-loan-calculator.html), and price any extra payment strategy through the [EMI calculator](/emi-calculator.html) before you commit to it.`,
    category: 'Financial',
    readTime: '8 min read',
    date: '2026-09-30',
    icon: Calculator,
    path: 'amortization-schedule.html'
  },
  {
    id: 5,
    title: 'How Much House Can I Afford on a ₹20 Lakh Salary?',
    excerpt: 'Turn an annual salary into a maximum loan amount, then add the deposit, stamp duty, registration and running costs that lenders forget to mention.',
    content: `"How much house can I afford?" is really three questions: how much will a lender advance, how much can you repay without being trapped, and what the property will cost you after the keys are handed over. The first has a formula, the second has a rule of thumb, and the third is where most budgets quietly fail.

Working from a ₹20 lakh annual salary, this guide derives a maximum loan, tests it against three interest rates and three tenures, and then stacks on the down payment, stamp duty, registration, furnishing and running costs that sit outside the loan entirely.

> The figures below use Indian rupees and Indian-style lending rules as the worked example. The method transfers anywhere: substitute your own take-home pay, your own tax rules and your own market's interest rates. This is general information, not financial advice.

## Step 1: convert salary into monthly cash

A ₹20,00,000 annual cost-to-company is not ₹1,66,667 a month in your hand. Employee provident fund contributions, professional tax, income tax and employer deductions typically leave **70–75% of CTC** as take-home. Assume **₹1,40,000 a month** for this exercise, and note that your real figure depends on your tax regime, your declarations and rules that change with every budget.

Two debt rules then compete for your EMI:

- The **28/36 rule** used in the United States: housing costs below 28% of gross income, all debt below 36%. On ₹1,66,667 gross that caps housing at **₹46,667**.
- The **fixed-obligation-to-income ratio (FOIR)** used by most Indian lenders: total EMIs (including the new one) capped at 40–50% of net income. On ₹1,40,000 net that allows **₹56,000 to ₹70,000**, depending on the lender and your existing debts.

Lenders will happily approve the higher number. Your budget should sit at the lower one unless you have no other debt, a stable income and a genuine emergency fund. We use **₹56,000** below — 40% of net — as a middle path.

## Step 2: turn the EMI into a loan amount

The loan a payment supports is the present value of an annuity:

**Loan = EMI × [1 − (1 + r)^-n] / r**

At 8.5% for 20 years, r = 0.0070833 and n = 240, so the factor is [1 − 1.0070833^-240] ÷ 0.0070833 = **115.23**. Multiply:

₹56,000 × 115.23 = **₹64,52,880 — call it ₹64.5 lakh**.

### Sensitivity to the interest rate

Holding the EMI at ₹56,000 and the tenure at 20 years:

| Interest rate | Loan eligible | Total repaid | Total interest |
|---|---|---|---|
| 7.5% | ₹69,51,000 | ₹1,34,40,000 | ₹64,89,000 |
| 8.5% | ₹64,52,880 | ₹1,34,40,000 | ₹69,87,120 |
| 9.5% | ₹60,07,680 | ₹1,34,40,000 | ₹74,32,320 |

A two-point swing in the rate moves your budget by **₹9.4 lakh**. Nothing about your salary changed. This is why rate shopping, and locking a rate when the cycle turns, is worth a weekend of effort — and why you should never stretch to the maximum at the top of the rate cycle.

### Sensitivity to the tenure

Holding the EMI at ₹56,000 and the rate at 8.5%:

| Tenure | Loan eligible | Total repaid | Total interest |
|---|---|---|---|
| 15 years | ₹56,86,800 | ₹1,00,80,000 | ₹43,93,200 |
| 20 years | ₹64,52,880 | ₹1,34,40,000 | ₹69,87,120 |
| 30 years | ₹72,83,360 | ₹2,01,60,000 | ₹1,28,76,640 |

Thirty years buys ₹8.3 lakh more house than twenty and costs **₹58.9 lakh more interest** — nearly the price of the original loan again. Fifteen years saves ₹26 lakh of interest but drops your budget by ₹7.6 lakh. Pick the tenure by asking which number you regret more: a smaller house or a longer debt.

Before any of this becomes a sanction letter, the bank wants evidence: usually six to twelve months of salary credit in a bank account, payslips, and employer confirmation for salaried applicants. Self-employed applicants face a longer list — audited accounts, GST returns, business bank statements — and lenders typically average two or three years of income to smooth out the volatility. Budget an extra month in the timeline for paperwork: the eligibility maths is fast, the verification is not.

## Step 3: the down payment and the costs nobody quotes

Suppose you buy at **₹80.5 lakh** with a ₹64.5 lakh loan. The 20% down payment is **₹16.1 lakh**, and that is only the beginning:

| Upfront cost (on an ₹80.5 lakh property) | Typical range | Estimate |
|---|---|---|
| Down payment | 10–25% of price | ₹16,10,000 |
| Stamp duty | 4–7% by state | ₹3,22,000 to ₹5,63,500 |
| Registration and transfer | 1–2% | ₹80,500 to ₹1,61,000 |
| GST on new under-construction stock | commonly 5%, with concessions in some segments | ₹4,02,500 where applicable |
| Legal, valuation, moving, basic furnishing | one-time | ₹2,00,000 to ₹5,00,000 |

Adding a middle estimate for each: **about ₹24–25 lakh needed before the first EMI**. Ready-to-move resale property usually avoids GST; stamp duty percentages change by state and by property value; affordable-housing categories get concessions in some jurisdictions. Verify current rates with the local registrar — these are among the most frequently revised charges in property transactions.

### The opportunity cost of that down payment

₹16.1 lakh left invested instead of paid as down payment, compounding at an illustrative 10% for twenty years, would be worth about **₹1.08 crore** (1.10^20 = 6.7275). Nobody should put money in equities instead of a down payment they need in two years — but it is worth recognising that a large down payment is a real investment decision with a real alternative, not a neutral transfer.

## Two levers that raise your eligibility

Before shopping around, three moves change the arithmetic more than haggling over a rate:

1. **Clear existing EMIs.** The lender nets every obligation from your income. A ₹12,000 car EMI removes more than ₹10 lakh of housing capacity — paying it off is the cheapest eligibility gain available to you.
2. **Add a co-applicant.** A working spouse or parent counted jointly adds their income to the ratio, often lifting the sanctioned amount by 30–50%. Both applicants carry the debt, and both credit records are assessed.
3. **Increase the deposit.** Every extra rupee down reduces the loan and the instalment linearly, and a lower loan-to-value ratio can unlock better rate tiers from the lender.

A fourth, slower lever: keep total obligations under 40% of net income for six months before applying, with no new card balances. Lenders assess recent behaviour, not just the salary certificate, and a clean six-month record is often worth more than a marginal improvement in the rate quote.

None of these change what you can comfortably afford — they change only what you can be approved for. Keep the two numbers apart, and let the comfortable one make the decision.

## Step 4: the running costs

The loan is not the house. Budget annually for:

- **Maintenance and society charges:** ₹3,000–8,000 a month in most Indian cities for a mid-size apartment.
- **Property tax:** typically 0.1–0.5% of assessed value per year, set locally.
- **Repairs and replacement:** a durable rule is **1% of property value per year** — on ₹80.5 lakh that is ₹80,500, covering everything from a failed geyser to repainting.
- **Home insurance and contents cover:** often required by the lender, cheap relative to the sum insured.
- **Utilities, water, parking:** expenses that do not exist while you rent the same space.

Add ₹10,000–15,000 a month to the EMI before judging affordability. A ₹56,000 EMI plus ₹12,000 of running costs is a **₹68,000 obligation** — 49% of your take-home, which is exactly the number the 28/36 rule was warning you about.

## Step 5: taxes, buffers and the honest question

**Tax deductions on home loans** exist in many countries. In India, interest of up to ₹2,00,000 on a self-occupied property and principal of up to ₹1,50,000 have been deductible historically under the old tax regime, while the new regime withdraws most of that benefit for loans taken more recently. Tax law changes frequently and differs between regimes, so confirm current provisions before you build them into your plan.

**The buffer rule:** keep six months of total household expenses in cash after the down payment. If one income stops, the bank still collects.

**The honest question:** run the EMI at your actual salary using the [home loan calculator](/home-loan-calculator.html), then ask whether you would still buy the same property if your income stayed flat for five years. If the answer is no, the property is too expensive — regardless of what the sanction letter says.

## What the bank actually looks at

Beyond income and existing EMIs, sanction decisions turn on three things you can influence. **Credit score:** a clean record with regular repayments typically prices better than a marginal improvement in income, while a recent default can block the application outright. **Stability:** two years in the same employer, or three years of business continuity for self-employed applicants, is a common minimum. **Property documents:** clear title, an approved plan and a builder with no pending litigation — lenders lend against the asset as much as against you, and title defects delay or kill disbursement even when the income arithmetic works perfectly.

## Summary of the numbers

- Maximum sensible EMI: **₹56,000** (40% of a ₹1.4 lakh take-home).
- Loan that supports it at 8.5% over 20 years: **₹64.5 lakh**.
- Property price at a 20% down payment: **₹80.5 lakh**.
- Cash needed upfront: **₹24–25 lakh**.
- Monthly running cost to add: **₹10,000–15,000**.

## Try it yourself

Replace every assumption above with your own. Use the [home loan calculator](/home-loan-calculator.html) to see the loan your salary supports, the [mortgage calculator](/mortgage-calculator.html) for amortization and total interest, the [EMI calculator](/emi-calculator.html) to test rate and tenure combinations, and the [tax calculator](/tax-calculator.html) to estimate how much salary actually reaches your account each month.`,
    category: 'Financial',
    readTime: '8 min read',
    date: '2026-10-07',
    icon: Home,
    path: 'house-affordability-guide.html'
  },
  {
    id: 6,
    title: 'What Is CAGR and Why It Can Flatter Your Portfolio',
    excerpt: 'CAGR smooths a bumpy ride into one tidy percentage. Here is how it is calculated, where it misleads badly, and what to judge a fund by instead.',
    content: `The compound annual growth rate is the most quoted number in investing and the most abused. A fund, a stock or a property "grew at 18% CAGR" sounds like a smooth climb of 18% a year. It was almost never smooth, and the number quietly hides the path you would have had to survive to get there.

This guide derives CAGR with worked numbers, shows two examples where it produces a headline that is technically correct and practically misleading, and then sets out the alternatives — average return, XIRR, rolling returns and real return — with a table telling you when each one is the right tool.

## The formula

**CAGR = (Ending value ÷ Beginning value)^(1 / n) − 1**

where n is the number of years. It is the single constant annual growth rate that would turn the beginning value into the ending value if applied every year.

### Worked example 1

₹1,00,000 becomes ₹2,00,000 in three years:

(200000 ÷ 100000)^(1/3) − 1 = 2^0.3333 − 1 = 1.2599 − 1 = **25.99%**

### Worked example 2

₹5,00,000 becomes ₹8,40,000 in four years:

(840000 ÷ 500000)^(1/4) − 1 = 1.68^0.25 − 1 = 1.1385 − 1 = **13.85%**

Two observations. First, CAGR says nothing about what happened in between — both portfolios could have fallen 40% midway. Second, CAGR ignores every cash flow: if you added money during those years, the calculation no longer describes your return at all.

## Example 1: the path the number erases

A portfolio returns +50%, then −30%, then +20%:

| Measure | Calculation | Result |
|---|---|---|
| Arithmetic average return | (50 − 30 + 20) ÷ 3 | 13.3% |
| Combined growth | 1.50 × 0.70 × 1.20 | 1.26 → +26% total |
| CAGR | 1.26^(1/3) − 1 | **8.0%** |

Neither number is wrong, but they describe different things. The arithmetic average flatters (13.3% looks like steady progress that never happened); the CAGR is the honest equivalent rate (8.0%), yet it tells you nothing about the gut-punch of the −30% year. An investor who entered at the peak of year one was underwater for most of the period while the final CAGR read a respectable 8%.

## Example 2: the doubling-then-halving trap

A stock doubles in year one and halves in year two:

- Arithmetic average: (100% − 50%) ÷ 2 = **+25% a year**.
- Actual outcome: 1,00,000 → 2,00,000 → 1,00,000 = **0% gained**.
- CAGR: 1.00^(1/2) − 1 = **0%**.

Here CAGR is the only figure that respects reality, and the average return is dangerously misleading. The lesson runs in both directions: averages can flatter, CAGRs can conceal timing, and you need to know which sin you are riskier for.

## CAGR versus the alternatives

| Measure | What it answers | Best used for | Its blind spot |
|---|---|---|---|
| CAGR | What constant rate turns start into end? | A single lump sum with no withdrawals | Hides volatility and cash flows |
| Absolute return | Total % gained over the whole period | Quick sanity check over short spans | Ignores time completely |
| Arithmetic average | Mean of each period's return | Describing a typical period | Compounding makes it wrong for multi-period returns |
| XIRR | Rate that ties all dated cash flows together | SIPs, STPs, withdrawals, any uneven timing | Needs actual transaction dates |
| Rolling returns | CAGR over every window of a given length | Testing whether the result was luck of the start date | Requires long history |
| Real (inflation-adjusted) return | What the money can buy | Long-term goals | Depends on an inflation estimate you must choose |

## Worked example: auditing a five-year fund

A fund fact sheet reports 13.4% CAGR over five years. Verify it rather than trusting it:

| Year | Return |
|---|---|
| 1 | +22% |
| 2 | −14% |
| 3 | +31% |
| 4 | −9% |
| 5 | +18% |

Compounding: 1.22 × 0.86 × 1.31 × 0.91 × 1.18 = 1.872, so the money nearly doubled. Annualised: 1.872^(1/5) − 1 = **13.4%** — the claim checks out. Now produce the numbers the fact sheet left out. The arithmetic average of the five years is 9.6%, the worst single year is −14%, and anyone who invested just before year two sat on a loss while the headline number climbed.

Ask instead for rolling five-year returns across the longest available history. If the rolling figure spans 4% to 18% and the headline sits in the upper third of that range, the reported return is a favourable start date rather than a dependable expectation.

## When CAGR is legitimate

CAGR is exactly right when three conditions hold: one investment made at the start, no contributions or withdrawals during the period, and a single comparison window. Compare two fixed deposits held for the same three years and CAGR (or, for deposits, the effective annual yield) is precisely the tool.

## When CAGR misleads: SIPs and regular contributions

A monthly SIP into a market that is flat for four years and then doubles will show a portfolio whose CAGR looks respectable while every rupee you actually invested earned far less, because most of your money arrived before the jump. Once cash flows exist, the return that reflects your experience is **XIRR** — the internal rate of return across dated transactions — not the CAGR of the portfolio value.

A concrete case: invest ₹10,000 a month for three years into an index that finishes at a 12% CAGR but only reaches that level in the final six months. Contributions total ₹3,60,000 and the portfolio ends around ₹3,95,000 — a gain of under 10% on money deployed over three years, even though the index compounded at 12% a year from its own starting price. Your XIRR sits in the single digits while the headline says twelve. Reverse the path — the index doubles early and then stagnates — and the same contributions finish well ahead of the index's CAGR. The path decides your result, and CAGR never mentions the path.

The practical rule: **CAGR describes an asset; XIRR describes you.** Statements that quote CAGR for a SIP plan are describing the index, not your account.

## Fees, taxes and the real number

CAGR is almost always quoted gross. After costs:

| Annual cost drag | 10-year value of ₹10 lakh at 10% gross | 20-year value |
|---|---|---|
| 0% fees (gross) | ₹25,93,742 | ₹67,27,500 |
| 1% annual fees | ₹23,67,364 | ₹56,04,411 |
| 2% annual fees | ₹21,58,925 | ₹46,60,957 |

A 1% annual charge looks trivial and removes **17% of your twenty-year balance**; 2% removes 30%. Then subtract inflation: a reported 10% CAGR with 6% inflation delivers a real return near 3.8% compounded, not 10%. For a twenty-year goal, always run the real, post-fee number.

### Three questions that expose a flattering number

1. **What were the worst twelve months inside the period?** A five-year 14% CAGR with a −32% peak-to-trough drawdown is a very different holding experience from a steady 14%, even though one number describes both.
2. **When did the money actually arrive?** If most contributions landed in the final year, the CAGR describes an asset you barely held.
3. **Would it survive a different start date?** Re-run the same five-year window a year earlier and a year later; if the answers swing by several points, the figure is start-date luck.

Report all three alongside the headline and the summary stops flattering anyone.

## CAGR outside the stock market

The same formula prices anything that grows or shrinks over time, and the interpretation rules travel with it:

- **Fixed deposits and bonds:** compare effective annual yields rather than nominal rates, because compounding frequency differs between products.
- **Property:** a flat going from ₹45 lakh to ₹78 lakh in seven years is an 8.2% CAGR before maintenance, registration, property tax and home-loan interest — all of which can push the true return negative.
- **Salary:** ₹40,000 a month rising to ₹72,000 in five years is 12.5% CAGR, but promotions are lumpy, so the figure describes an outcome rather than a repeatable process.
- **Business revenue:** useful for comparing periods, dangerous as a forecast, because the base grows and the opportunity set shrinks as the company scales.

In every case the question is identical: does a single constant rate faithfully represent a path that was not constant? With one initial sum and one final sum, yes. When money moved in and out, or when the path contained cliffs, reach for XIRR or rolling windows instead.

## Three habits that fix the CAGR problem

1. Ask for **rolling returns** over five- and ten-year windows, not one lucky start date.
2. Ask for the **maximum drawdown** alongside the CAGR — the worst peak-to-trough fall you would have sat through.
3. For any plan with contributions, compute **XIRR** from your own statements rather than trusting a fund's fact sheet.

A 12% CAGR with a 45% drawdown and a 9% CAGR with a 15% drawdown are not the same investment. Which one you can hold determines which return you actually earn.

## Try it yourself

Run the numbers on your own holdings. Use the [CAGR calculator](/cagr-calculator.html) to convert start and end values into an annual rate, the [investment calculator](/investment-calculator.html) to project a lump sum forward, the [SIP calculator](/sip-calculator.html) for regular contributions, and the [inflation calculator](/inflation-calculator.html) to translate the headline rate into purchasing power you can actually spend.`,
    category: 'Financial',
    readTime: '8 min read',
    date: '2026-10-05',
    icon: Percent,
    path: 'cagr-explained.html'
  },
  {
    id: 15,
    title: 'Risk-Reward Ratio: Why a 40% Win Rate Can Still Make Money',
    excerpt: 'Risk and reward decide the win rate you need before the trade is placed. Work the break-even arithmetic for 1:1, 1:2 and 1:3 setups step by step.',
    content: `Most trading advice reduces to picking the right direction. The arithmetic says something less comfortable: the gap between what you are willing to lose and what you are aiming to win decides whether your accuracy matters at all. A trader who is right three times out of ten and collects every target walks away ahead. A trader who is right seven times out of ten and cuts every winner short does not.

A risk-reward ratio is a description of that gap, written down before the trade rather than after it. This guide works out the two numbers, derives the break-even win rate from them, runs complete ten-trade sequences by hand, and then looks at the three quiet things — trading costs, position size and moved stops — that turn a written 1:2 into a live 1:0.8.

> This article is general education about position arithmetic, not investment advice. Markets gap through stops, and no ratio survives a position that is too large for the account behind it.

## The two numbers behind the ratio

For a long trade, two prices define everything: the entry and the stop. The distance between them is what you risk. The distance from the entry to the target is what you stand to gain.

**Risk = entry − stop**
**Reward = target − entry**
**Ratio = reward ÷ risk**, written as 1 : R

Suppose you buy at **₹1,000**, place a stop at **₹950**, and aim for **₹1,100**. Risk is 50 rupees a share, reward is 100 rupees a share, and the ratio is 100 ÷ 50 = 2, written **1:2**: you are risking ₹1 to try to make ₹2.

The direction of the trade changes nothing. A short at ₹1,000 with a stop at ₹1,050 and a target at ₹900 also risks 50 to make 100, so it is the same 1:2. Only the three prices matter.

| Entry | Stop | Target | Risk | Reward | Ratio |
|---|---|---|---|---|---|
| 1,000 | 950 | 1,100 | 50 | 100 | 1:2.00 |
| 1,000 | 970 | 1,030 | 30 | 30 | 1:1.00 |
| 500 | 470 | 560 | 30 | 60 | 1:2.00 |
| 240 | 230 | 255 | 10 | 15 | 1:1.50 |

Notice that the ratio is scale-free: it does not matter whether the share costs ₹240 or ₹1,000, only how far the stop and target sit from the entry as proportions of each other.

## The break-even win rate

The ratio answers "how much per trade". The next question is "how often do I need to be right". Let R be the reward multiple, p the probability of a win, and assume every win makes R units and every loss costs exactly 1 unit. Expected value per trade:

**p × R − (1 − p) × 1 = 0**

Rearranging: p × R + p = 1, so **p = 1 ÷ (1 + R)**.

| Ratio | R multiple | Break-even win rate | Plain English |
|---|---|---|---|
| 1:0.5 | 0.5 | 66.7% | Need two wins for every loss |
| 1:1 | 1.0 | 50.0% | Coin flip before costs |
| 1:1.5 | 1.5 | 40.0% | Four wins in ten is enough |
| 1:2 | 2.0 | 33.3% | Three wins in ten is enough |
| 1:3 | 3.0 | 25.0% | One win in four is enough |

These are idealised figures. Costs, slippage and the occasional stop that executes a few paise worse all push the real break-even rate higher — the costs section below shows exactly how far.

## Ten trades at 1:3 versus ten trades at 1:1

Take a trader who is right **40% of the time**, risking **₹10,000** on each of ten trades, with a fixed ₹10,000 of risk per position.

At **1:1**: four winners make 4 × 10,000 = ₹40,000 and six losers cost 6 × 10,000 = ₹60,000. Net: **−₹20,000**, or −2R.

At **1:3**: the same four winners make 4 × 30,000 = ₹1,20,000 and the same six losers still cost ₹60,000. Net: **+₹60,000**, or +6R.

Identical accuracy, identical losses, opposite results — the only variable was the target distance.

| Win rate | Ratio | Ten-trade result | Net |
|---|---|---|---|
| 40% (4 of 10) | 1:1 | 4 × 1 − 6 × 1 | −2R |
| 40% (4 of 10) | 1:2 | 4 × 2 − 6 × 1 | +2R |
| 40% (4 of 10) | 1:3 | 4 × 3 − 6 × 1 | +6R |
| 60% (6 of 10) | 1:0.5 | 6 × 0.5 − 4 × 1 | −1R |
| 60% (6 of 10) | 1:1 | 6 × 1 − 4 × 1 | +2R |

The last two rows are the trap that high-accuracy traders fall into: a 60% win rate at 1:0.5 still loses money. Accuracy is the number people quote; the ratio is the number that pays.

One caveat belongs here rather than in the fine print. These are arithmetic expectations over many trades, not a promise about the next ten. Variance is real: a trader running 1:3 at a true 40% win rate can still post four losing trades in a row, because four losses in a row is exactly what a 60% loss rate produces now and then.

## R-multiples and how they drive sizing

Once risk is fixed at the entry stage, every outcome can be expressed as a multiple of it. An R-multiple is simply the result divided by the initial risk: hitting a 1:2 target is a **+2R** trade, stopping out is **−1R**, and an early exit halfway to the stop is **−0.5R**.

Sizing follows from the same number. Suppose the account is **₹5,00,000** and the rule is to risk **1%** of equity per trade, which is ₹5,000. With an entry at ₹1,000 and a stop at ₹950, the stop is 5% below the entry, so the position must be sized so that 5% of it equals ₹5,000:

**Position = 5,000 ÷ 0.05 = ₹1,00,000**, or 100 shares.

Now every outcome is one unit of R by construction: the stop costs ₹5,000, the target at 1:2 banks ₹10,000, and the equity curve can be read directly in R.

### Why fixed-fractional sizing keeps the arithmetic honest

Fixed-fractional means the next risk is always a fixed percentage of the current equity, so a losing streak automatically shrinks the following positions. The alternative — recovering a loss with one bigger trade — quietly converts a 1:2 plan into a martingale, where the required size grows without limit precisely during the losing streak that is already underway. Sizing is not a separate decision from the ratio; it is the same decision expressed in rupees.

## Placing the stop and the target where the chart says

A ratio is only meaningful if the two prices are honest. The stop belongs at the level where the original idea is proven wrong — below a support for a long, above a resistance for a short — not at a convenient round number and not at whatever distance produces the ratio you wanted. The target belongs at the next level where sellers are demonstrably waiting, which is usually the previous swing high, a supply zone, or a measured move.

When there is no clear level, volatility gives a defensible default. The average true range (ATR) measures typical bar-to-bar movement, and a common construction is a stop at 1.5 × ATR with a target at 2 × ATR.

Worked: the ATR of a stock at ₹1,000 is **₹18**. Stop = 1,000 − 1.5 × 18 = **₹973**, so risk is ₹27. Target = 1,000 + 2 × 18 = **₹1,036**, so reward is ₹36. The ratio is 36 ÷ 27 = 1:1.33.

| Stop distance | Target distance | Ratio | Break-even win rate |
|---|---|---|---|
| 1.0 × ATR | 1.0 × ATR | 1:1.00 | 50.0% |
| 1.5 × ATR | 2.0 × ATR | 1:1.33 | 42.9% |
| 1.0 × ATR | 2.0 × ATR | 1:2.00 | 33.3% |
| 1.0 × ATR | 3.0 × ATR | 1:3.00 | 25.0% |

### When the structure will not give you 1:2

Sometimes the invalidation sits 2% away and the nearest realistic target is 3% away, which is a 1:1.5 trade. The disciplined responses are to take the 1:1.5, shrink the position to match the smaller ratio, or skip the setup. What does not work is sliding the stop further away to manufacture a bigger reward number — that changes the risk too, and usually changes it faster than it changes the reward.

## Trading costs quietly rewrite the ratio

Every trade pays a spread, a commission or brokerage, statutory charges, and a slippage allowance. On a wide trade these look trivial; on a tight trade they dominate.

Take the standard setup: entry ₹1,000, stop ₹950, target ₹1,100 — a gross 1:2 with 50 rupees at risk. Assume round-trip costs of **0.1% of turnover** for a delivery trade. On the winning leg, turnover is 1,000 + 1,100 = ₹2,100, so costs are ₹2.10 and the net reward is 100 − 2.10 = **₹97.90**. On the losing leg, turnover is 1,000 + 950 = ₹1,950, so costs are ₹1.95 and the net risk is 50 + 1.95 = **₹51.95**. The net ratio is 97.90 ÷ 51.95 = **1:1.88** — the trade still works.

Now the same percentage on a tight intraday setup: entry ₹1,000, stop ₹995, target ₹1,010 — again a gross 1:2, but with only 5 rupees of risk. Assume **0.3% of turnover** once brokerage, charges and slippage are added. The winning leg turns over ₹2,010 and costs ₹6.03, leaving a net reward of 10 − 6.03 = **₹3.97**. The losing leg turns over ₹1,995 and costs ₹5.99, leaving a net risk of 5 + 5.99 = **₹10.99**. The net ratio is 3.97 ÷ 10.99 = **1:0.36**.

| Setup | Gross ratio | Gross break-even | Net ratio | Net break-even |
|---|---|---|---|---|
| Wide stop, delivery costs | 1:2.00 | 33.3% | 1:1.88 | 34.7% |
| Tight stop, intraday costs | 1:2.00 | 33.3% | 1:0.36 | 73.5% |

That second row is the one worth remembering: a two-rupee stop needs roughly three wins in four just to stand still, because the cost of doing the trade is larger than the distance being traded. Costs scale with turnover, risk scales with the stop, and a stop that is too tight is mostly paying for itself.

## Five mistakes that destroy the ratio

1. **Widening the stop after entry.** Doubling the stop from ₹50 to ₹100 with the same ₹100 target turns a 1:2 into a 1:1 and the break-even rate from 33.3% to 50%, without any new information.
2. **Taking profit early.** Cutting the ₹100 target at ₹40 turns the same trade into 1:0.8, which needs a 55.6% win rate — often more accuracy than the setup ever had.
3. **Setting the target from the account need.** "I need ₹30,000 from this trade" is a budget, not a price level, and it has no relationship to where the sellers are.
4. **Sizing for the reward instead of the risk.** The position must be derived from the stop distance and the amount of equity at risk, never from how large the target looks.
5. **Computing the ratio only after entering.** Retrofitting a justification is how a 1:0.6 idea gets described as a 1:2 plan.

## Risk of ruin: why a good ratio can still blow up

A sound ratio does not protect an oversized account. If each trade risks a fixed percentage of equity, a run of losses compounds against you:

| Risk per trade | Equity after 5 straight losses | Recovery needed |
|---|---|---|
| 1% | −4.9% | 5.2% |
| 2% | −9.6% | 10.6% |
| 5% | −22.6% | 29.3% |
| 10% | −41.0% | 69.5% |

Five losses in a row is not a freak event; at a 40% win rate, six losses in ten is the normal outcome, and clusters appear comfortably within any normal run. The 10% column shows why survival dominates: after five such losses the trader needs a 69.5% gain just to return to the starting balance, which typically forces either larger risks or a pause that breaks the plan entirely. Keeping risk near 1–2% keeps the recovery column boring, which is the point.

## Try it yourself

Run the arithmetic on setups you are actually watching. The [risk-reward calculator](/risk-reward-calculator.html) converts entry, stop and target into a ratio and its break-even win rate, the [stop-loss calculator](/stop-loss-calculator.html) works the distance and the share count, the [position size calculator](/position-size-calculator.html) turns equity at risk into an exposure figure, the [risk of ruin calculator](/risk-of-ruin-calculator.html) shows how streaks compound, the [Kelly criterion calculator](/kelly-criterion-calculator.html) gives the mathematically optimal fraction, and the [drawdown calculator](/drawdown-calculator.html) translates a losing run into the gain required to recover it.`,
    category: 'Trading',
    readTime: '11 min read',
    date: '2026-10-03',
    icon: Target,
    path: 'risk-reward-ratio.html'
  },
  {
    id: 7,
    title: 'BMI by Age and Sex: Why One Number Is Not Enough',
    excerpt: 'BMI ignores age, sex, muscle and ethnicity. See what the number genuinely measures, where it fails outright, and which tests to add instead.',
    content: `Body Mass Index is the most widely used health number on earth and the most over-interpreted. It is a two-variable ratio — weight divided by height squared — and everything it cannot see (age, sex, muscle, fat distribution, ethnicity, fitness) is exactly what determines whether a given number means anything for you.

Searches for "BMI by age and sex" usually expect a lookup table. There is no official adult lookup: the adult cut-offs are identical for men and women at every age. What changes is how you should interpret them — and for children and teenagers the system genuinely is different, because growth is involved. This guide covers all three layers.

> BMI is a population screening tool, not a diagnosis. This article is not medical advice; if a number below concerns you, take it to a clinician who can assess you properly.

## The formula and three worked examples

**BMI = weight in kilograms ÷ height in metres squared**

| Person | Weight | Height | Calculation | BMI |
|---|---|---|---|---|
| A | 78 kg | 1.75 m | 78 ÷ 3.0625 | 25.5 |
| B | 55 kg | 1.60 m | 55 ÷ 2.56 | 21.5 |
| C | 95 kg | 1.80 m | 95 ÷ 3.24 | 29.3 |

Imperial users can use the constant 703: BMI = (pounds ÷ inches²) × 703. Person A at 172 lb and 69 inches: (172 ÷ 4761) × 703 = 25.4, matching the metric result to within rounding.

## The adult categories

The World Health Organization's adult bands are fixed:

| BMI | WHO category |
|---|---|
| Below 18.5 | Underweight |
| 18.5 – 24.9 | Normal range |
| 25.0 – 29.9 | Overweight |
| 30.0 – 34.9 | Obesity class I |
| 35.0 – 39.9 | Obesity class II |
| 40.0 and above | Obesity class III |

These bands were derived primarily from European populations and from the observation that mortality risk rises steeply above roughly BMI 25–30. They are a coarse filter: excellent at separating populations, blunt at judging individuals.

## Sex: same formula, different body

A man and a woman with identical BMI do not have identical bodies. Essential fat — the minimum needed for hormone production and organ protection — sits around **2–5% for men and 10–13% for women**, so at any given BMI a woman typically carries several percentage points more body fat, while a man carries more lean mass.

Consider two 30-year-olds, both 175 cm and 74 kg, both BMI 24.1. A man at that build might sit near 19% body fat; a woman of the same height and weight might sit near 29%. Both read "normal range", yet the woman's value is close to the upper half of the healthy fat distribution and the man's is comfortably mid-range. The BMI did not distinguish them because it has no sex term in the equation.

Fat distribution differs too. Men tend toward **android** (abdominal) fat, women toward **gynoid** (hip and thigh) fat. Abdominal fat is the metabolically active kind most strongly linked to insulin resistance and cardiovascular risk, which is why waist circumference is measured alongside BMI rather than instead of it.

### Waist thresholds worth knowing

| Population | Elevated risk (men) | Elevated risk (women) |
|---|---|---|
| South Asian, Chinese, Japanese | ≥ 90 cm | ≥ 80 cm |
| Europid | ≥ 102 cm | ≥ 88 cm |

(Thresholds as published by the International Diabetes Federation; exact clinical definitions vary by guideline.) A person with a normal BMI but a waist above these values — sometimes called normal-weight central obesity — can carry more cardiometabolic risk than someone with a higher BMI and a narrow waist.

## Age: the cut-offs stay, the bodies change

Muscle mass declines roughly **3–8% per decade after age 30**, accelerating after 60, while fat mass tends to rise. Two consequences follow.

First, a 65-year-old and a 25-year-old with the same BMI do not have the same body composition. The older adult may have a lower waist-to-hip ratio at a higher BMI simply because muscle has moved elsewhere, or a higher body-fat percentage at a "healthy" BMI because muscle has been lost.

Second, **the lowest mortality risk in older adults is not always at BMI 20–22**. Several large observational studies have found the lowest all-cause mortality among people aged 65+ at BMI values around 25–27 rather than at the low end of the normal range. That finding comes with heavy caveats: it is observational, not causal, and illness-related weight loss can make low BMI look more dangerous than it is. It does not mean obesity becomes safe with age — it means extreme leanness in the elderly carries its own well-documented risks (frailty, sarcopenia, osteoporosis) that a BMI table cannot capture.

### Children and teenagers use percentiles, not cut-offs

For ages 2 to 20, BMI is meaningless without the child's age and sex, because both distributions shift during growth. Clinicians plot BMI against growth references and read the **percentile**:

| BMI-for-age percentile | CDC interpretation |
|---|---|
| Below 5th | Underweight |
| 5th to 84th | Healthy weight |
| 85th to 94th | Overweight |
| 95th and above | Obesity |

A 12-year-old girl at the 85th percentile is classified differently from the same raw BMI in an adult, and her trajectory across previous check-ups matters more than any single reading. The WHO 2006 child growth standards use the same percentile logic with slightly different reference curves. Adults should never apply child percentiles to themselves, and parents should never apply adult cut-offs to children.

## Ethnicity: where the 25 cut-off is too generous

Risk studies in Asian populations found higher rates of type 2 diabetes, hypertension and cardiovascular disease at lower BMI values than in European populations — with body fat percentages roughly 3–5 points higher at the same BMI. In response, the WHO issued **lower action points for Asian populations**:

| | Global cut-off | Asian action point |
|---|---|---|
| Threshold for increased risk | 25.0 | 23.0 |
| Threshold for high risk | 30.0 | 27.5 |

Person A from our table (BMI 25.5) is "overweight" globally and already above the first Asian action point. Several national bodies, including India's ICMR, use the 23/27.5 framing in public health guidance. The right cut-off depends on your ancestry, and using the wrong one systematically underestimates risk for South, East and Southeast Asian populations.

## Where BMI demonstrably fails

| Situation | What BMI says | What is actually true |
|---|---|---|
| Trained athlete, 175 cm, 85 kg | 27.8, overweight | Body fat around 10–14% with very high lean mass |
| Sedentary office worker, 165 cm, 58 kg | 21.2, healthy | Body fat around 30–33%, poor fitness — normal-weight obesity |
| Pregnant woman in third trimester | Rises every month | Weight gain is the pregnancy, not adiposity |
| Significant oedema or dialysis fluid | Elevated | Fluid volume, not fat |
| Person with limb amputation | Distorted | Height–mass ratio no longer represents the body |

None of these are exotic. The athlete case alone accounts for a large share of "falsely alarming" BMI readings, and normal-weight obesity accounts for a large share of falsely reassuring ones.

## What to measure instead, or alongside

A defensible personal dashboard uses four numbers instead of one:

1. **Waist circumference** — reflects abdominal fat directly, cheap, repeatable at home with a tape.
2. **Waist-to-hip ratio** — WHO high-risk values are above 0.90 for men and 0.85 for women.
3. **Body fat percentage** — via calipers, a bioimpedance scale, or a DEXA scan if you want precision; the trend over time matters more than a single reading.
4. **Fitness markers** — resting heart rate, blood pressure, fasting glucose, and whether you can complete a brisk 30-minute walk without distress.

Add one behavioural measure: what you can do. Two people at BMI 27, one who runs 10 km and one who cannot climb a flight of stairs, are not the same person, and no ratio on this page says so.

### Finding the right table first

For adults, the WHO bands earlier on this page apply worldwide. For children and teenagers you need the CDC or WHO growth references, which are sex-specific and read off a percentile grid. For adults of South, East or Southeast Asian ancestry, use the 23 and 27.5 action points. Online calculators silently apply whichever default they were built with, which is why two sites can report different categories for identical height and weight. If a result matters to you, check which reference produced it — the arithmetic never changes, only the interpretation does.

## Using BMI correctly in four steps

1. Calculate it, then read it against the right table — adult bands, child percentiles for under-20s, or the lower Asian action points where they apply.
2. Pair it with waist circumference in the same session; the combination catches the normal-weight central obesity case that BMI alone misses.
3. Track the trend across months rather than any single morning; hydration, meals and training shift the scale by a kilo or two.
4. Take it to a clinician as one input among blood pressure, glucose, lipids and family history — that is where risk is actually decided.

If the number is high while every other marker is clean, you are probably carrying muscle, or you belong to the group for which the cut-off is simply too blunt. If the number is normal while your waist, blood pressure or glucose are not, the normal reading has told you nothing useful — and the other markers should drive whatever you do next.

## Try it yourself

Start with the [BMI calculator](/bmi-calculator.html) to get the raw number, then build context: check body composition with the [body fat calculator](/body-fat-calculator.html), see what weight range fits your frame with the [ideal weight calculator](/ideal-weight-calculator.html), and find the calorie and activity targets that match your actual goals with the [TDEE calculator](/tdee-calculator.html).`,
    category: 'Health',
    readTime: '8 min read',
    date: '2026-10-01',
    icon: Scale,
    path: 'bmi-explained.html'
  },
  {
    id: 8,
    title: 'BMR vs TDEE: Which Number Should You Actually Eat To?',
    excerpt: 'Work out your basal metabolic rate, multiply it by activity, and stop eating to the wrong target. With full formulas and activity tables inside.',
    content: `Two numbers dominate online calorie advice: BMR and TDEE. The first is what your body burns doing nothing at all; the second is what it burns living a full day. People who eat to their BMR while exercising daily are, in effect, starving themselves — and people who eat to their TDEE while sedentary are gaining steadily. The difference between the two is your activity, and it is usually worth more than the BMR itself.

This article derives both numbers with the standard equations, compares the equations against each other on the same body, and shows the exact arithmetic for turning a maintenance number into a weight-loss or weight-gain target.

> These are estimation equations for healthy adults, not clinical measurements. This is not medical advice or dietetic guidance, and anyone with a chronic condition, an eating disorder history, or a pregnancy should work with a qualified professional instead.

## What BMR actually measures

Basal Metabolic Rate is the energy your body spends at complete physical and mental rest, in a temperate environment, twelve hours after the last meal — the cost of breathing, circulating blood, maintaining temperature, building proteins and running the brain. It typically accounts for **60–70% of everything you burn in a day**.

Daily expenditure splits roughly like this:

| Component | Share of daily burn | What it covers |
|---|---|---|
| BMR | 60–70% | Organs, respiration, circulation, cell repair |
| Thermic effect of food | 8–15% | Digesting and processing what you eat |
| Exercise activity | 5–15% | Workouts, sport, deliberate training |
| Non-exercise activity (NEAT) | 15–30% | Walking, standing, fidgeting, posture |

Two points follow. NEAT varies more between individuals than exercise does — a person who paces while on calls can burn several hundred more calories a day than a colleague who sits — and the thermic effect is highest for protein (roughly 20–30% of its calories are spent digesting it) versus 5–10% for carbohydrate and near 0% for fat.

## The Mifflin-St Jeor equation

Since 1990 this has been the default in clinical and fitness practice, and the one we recommend for estimation:

- **Men:** BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5
- **Women:** BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161

### Worked example

A 30-year-old man, 75 kg, 175 cm:

10 × 75 = 750; 6.25 × 175 = 1,093.75; 5 × 30 = 150.
BMR = 750 + 1,093.75 − 150 + 5 = **1,699 kcal/day**.

A 30-year-old woman of the same height and weight:

BMR = 750 + 1,093.75 − 150 − 161 = **1,533 kcal/day**.

The 166 kcal gap comes entirely from the constant term, which encodes the average difference in lean mass between sexes. A woman with above-average muscle mass will often outburn that model — another reason to treat the output as a starting point.

### How the equations compare

Same body — 75 kg, 175 cm, 30 years, 60 kg lean mass:

| Equation | Male result | Female result | Notes |
|---|---|---|---|
| Mifflin-St Jeor (1990) | 1,699 kcal | 1,533 kcal | Best default for most adults |
| Harris-Benedict (revised) | 1,763 kcal | 1,553 kcal | Older; slightly higher output |
| Katch-McArdle | 1,666 kcal | 1,666 kcal | Needs lean mass; sex-neutral |

Katch-McArdle is **370 + 21.6 × lean mass(kg)**, so 370 + 21.6 × 60 = 1,666 kcal. Because it uses lean mass instead of weight, it is the fairer equation for athletes and for anyone who knows their body-fat percentage — and it exposes why the sex constants exist: give the woman 45 kg of lean mass instead of 60 and the formula drops to 1,342 kcal.

Pick one equation and stay with it. Switching when the scale stalls produces confusion, not information.

### What the equation cannot see

Two people of identical weight, height, age and sex can differ in BMR by several hundred kilocalories, because lean tissue burns far more energy at rest than fat tissue does. The equations only see the scale, so they systematically overestimate the BMR of people with high body fat and underestimate it for trained lifters. Pregnancy, a recent thyroid change, prolonged dieting and a history of significant weight loss all shift expenditure beyond what any regression captures. When your measured results disagree with the formula by more than 10%, trust the measurements and adjust the starting number — the equation is a convenient prior, not a laboratory reading.

## From BMR to TDEE

Multiply BMR by an activity factor:

| Factor | Activity level | Who it fits |
|---|---|---|
| 1.2 | Sedentary | Desk job, under 5,000 steps, no training |
| 1.375 | Lightly active | Desk job plus 1–3 light sessions a week |
| 1.55 | Moderately active | 3–5 sessions a week or an active job |
| 1.725 | Very active | 6–7 hard sessions, or a physical job plus training |
| 1.9 | Athlete | Twice-daily training or manual labour plus training |

For our male example at 1,699 kcal:

- Sedentary: 1,699 × 1.2 = **2,039 kcal**
- Lightly active: × 1.375 = **2,336 kcal**
- Moderately active: × 1.55 = **2,633 kcal**
- Very active: × 1.725 = **2,931 kcal**

The spread from the least to the most active factor is **892 kcal a day** — more than the entire difference between the male and female equations, and more than most structured workouts burn. Activity selection matters more than refining the BMR formula, which is why honest self-assessment of step counts and training intensity is the highest-value step in this whole process.

## Accuracy: what these formulas get wrong

Predictive equations are population regressions. Against metabolic chamber measurements, individual error of **±10% is common and ±15% is not unusual** — on a 2,000 kcal TDEE that is ±200–300 kcal, easily enough to erase a modest deficit.

Systematic sources of error:

- **Body composition.** Two 75 kg people at the same height can differ by 10 kg of lean mass and hundreds of kcal of BMR.
- **Adaptive thermogenesis.** Prolonged dieting makes the body slightly cheaper to run; the drop is usually small (a few percent) but real, and it is one reason progress slows.
- **Hormonal and medical factors** — thyroid status, diabetes, prior weight loss, and medications all shift expenditure.
- **Age and pregnancy** — equations are built on adults and are not validated for children.
- **Recent exercise.** BMR is measured rested; a hard session elevates burn for hours afterwards.

Treat the number as a hypothesis. Measure for two to three weeks, compare against real scale and tape trend, and adjust by 100–200 kcal rather than restarting from a different equation.

## Turning maintenance into a goal

Body fat stores approximately **7,700 kcal per kilogram** (the familiar 3,500 kcal per pound figure is the same thing converted). So a daily deficit of X kcal produces a weekly loss of X × 7 ÷ 7,700 kg:

| Daily deficit | Weekly loss | 10-week loss | Realistic for |
|---|---|---|---|
| 250 kcal | 0.23 kg | 2.3 kg | Very light cut, high training volume |
| 500 kcal | 0.45 kg | 4.5 kg | Standard sustainable cut |
| 750 kcal | 0.68 kg | 6.8 kg | Larger frames, higher starting weight |
| 1,000 kcal | 0.91 kg | 9.1 kg | Short, supervised phases only |

For our moderately active man: TDEE 2,633 → target **2,133 kcal** for a 500 kcal deficit. Recalculate every time weight moves 4–5 kg, because a lighter body burns less — at 10 kg lighter, Mifflin gives 1,699 − 100 = 1,599 kcal of BMR, and the TDEE falls proportionally.

For muscle gain, run a **surplus of 200–300 kcal** rather than a large one; beyond roughly 0.5% of body weight gained per week, the extra is mostly fat.

## NEAT: the multiplier nobody tracks

The activity factor you choose is a guess about non-exercise activity, and the spread between people is wider than it looks. Two adults with identical BMRs can differ by 300–400 kcal a day purely in NEAT: the one who walks to meetings, stands while on calls, takes the stairs and paces while thinking will out-burn a sedentary twin by roughly the calories in a full meal, without ever exercising.

This is why step counts are such a good calibration tool. If your recorded steps average 3,500 a day, the "moderately active" factor of 1.55 is almost certainly wrong for you — 1.375 or even 1.2 is closer to reality. A nurse or warehouse worker logging 15,000 steps has the opposite problem: 1.375 undersells them and 1.55 or above may be right.

A practical protocol: choose the factor that matches your step count first, then correct it using two weeks of real-world scale data. Weight falling faster than expected means the factor was too low; weight flat means it was too high. The equation is a starting hypothesis, and your own results supply the correction.

## Four common mistakes

1. **Eating back every exercise calorie.** Fitness trackers overestimate burn by 20–40% commonly; use half the reported figure as a credit.
2. **Using BMR as a target.** BMR is the floor of what your body needs at rest, not a day's food budget.
3. **Changing equations mid-cut.** Keep the baseline fixed so that the only variable is your real-world response.
4. **Ignoring protein and strength training.** A deficit without resistance work costs muscle, which lowers BMR and worsens the very number you are managing.

## Try it yourself

Compute both numbers with real inputs. The [BMR calculator](/bmr-calculator.html) gives the resting figure, the [TDEE calculator](/tdee-calculator.html) applies the activity multiplier, the [calorie calculator](/calorie-calculator.html) converts maintenance into a goal-based target, and the [macro calculator](/macro-calculator.html) splits that target into protein, carbohydrate and fat.`,
    category: 'Health',
    readTime: '8 min read',
    date: '2026-09-28',
    icon: Activity,
    path: 'bmr-explained.html'
  },
  {
    id: 9,
    title: 'How Much Water Should You Drink a Day? A Worked Answer',
    excerpt: 'Weight-based formulas, sweat rates, climate adjustments and a urine-colour check, plus the surprisingly real risk of drinking far too much water.',
    content: `"Drink eight glasses a day" is the most repeated hydration advice in the world and the least defensible. Real fluid needs scale with body size, activity, heat and humidity — a 90 kg construction worker in a hot climate and a 55 kg office worker in a temperate one need very different amounts, and the difference between them is larger than the eight-glass rule itself.

This guide derives a daily target from body weight, adds exercise and climate adjustments with actual numbers, gives you a measurement you can check without equipment, and covers the genuine danger at the other end of the scale: overhydration.

> Hydration guidance is general information for healthy adults. It is not medical advice. People with kidney disease, heart failure, liver disease, or anyone advised to restrict fluids should follow their clinician's instructions instead.

## The weight-based starting point

The most cited usable guideline is **30–35 ml per kilogram of body weight per day** for a healthy adult at rest in a temperate climate:

| Body weight | At 30 ml/kg | At 35 ml/kg |
|---|---|---|
| 50 kg | 1,500 ml | 1,750 ml |
| 60 kg | 1,800 ml | 2,100 ml |
| 70 kg | 2,100 ml | 2,450 ml |
| 80 kg | 2,400 ml | 2,800 ml |
| 90 kg | 2,700 ml | 3,150 ml |

One important clarification: this figure counts **total water intake**, which includes water inside food. Typical mixed diets supply roughly 20% of daily water — fruit, vegetables, yogurt, dal, soups and bread all contribute. So a 70 kg person targeting 2.1–2.45 L total needs about **1.7–2.0 L actually drunk**, with the balance arriving through meals.

For comparison, the European Food Safety Authority sets adequate intake at **2.0 L/day for women and 2.5 L/day for men** from all beverages and food, and the US National Academies use 3.7 L and 2.7 L of total water respectively. These ranges are consistent with the per-kilogram rule once you account for average body sizes — they are the same advice measured differently.

## Worked example: a 70 kg desk worker

1. Resting need: 70 × 30–35 = **2.1–2.45 L total water**.
2. Remove food contribution (20%): **1.7–2.0 L of drinks**.
3. Spread across the day: two glasses on waking, one with each meal, one mid-morning and mid-afternoon.
4. Add a 45-minute evening walk: see the exercise rule below — roughly **+300–600 ml**.

That lands at around **2.0–2.4 L of fluid drunk**, which is the number most people expect to hear and now it has arithmetic behind it rather than a proverb.

### Exercise: replace what you sweat

Sweat rates vary enormously — roughly **0.5 to 2.5 litres per hour** depending on intensity, heat, humidity and the individual — so generic advice has to be a range. Practical guidance from sports nutrition bodies:

- Drink **400–800 ml in the hour before** exercise.
- Sip **150–350 ml every 15–20 minutes** during, adjusted to sweat rate.
- Replace **125–150% of the weight lost** after: a runner who finishes 1 kg lighter should drink 1.25–1.5 L over the following hours, not in one sitting.

The before-and-after weigh-in is the only accurate sweat-rate test: weigh yourself naked before a session, exercise for a fixed hour, towel off, weigh again. Each kilogram lost is one litre of fluid. Doing this twice in different weather gives you a personal hydration plan instead of a guess.

## Climate adjustments

| Condition | Adjustment to the baseline | Why |
|---|---|---|
| Hot and humid | +20–30% | Sweating rises and evaporative cooling fails |
| Hot and dry | +20–30% | High sweat rates, fast unnoticed loss |
| Cold weather | +10–15% | Respiratory and urinary losses rise, thirst falls |
| High altitude | +10–20% | Increased respiration and diuresis |
| Fever, vomiting, diarrhoea | Replace as lost, seek advice | Acute losses can exceed a litre an hour |

Thirst is a lagging indicator — by the time it is obvious, you are already mildly behind — but it is not useless for non-athletes. For most people with a bottle in sight, drinking to thirst plus the baseline target is sufficient.

### A three-day household audit

Most people discover their real intake is nothing like they assumed. For three days, count every drink: two full one-litre bottles hits the common 2 L target, not the 3 L you were aiming for. Note the timing as well — if four-fifths of your fluid arrives after 6 p.m., you are chronically behind during working hours and then paying for it with broken sleep. The audit produces one of two findings: distribution was the problem rather than the target, or the target itself was wrong for your weight and workload. Either way you finish with data instead of an impression.

## The urine colour check

The cheapest monitoring tool available, and better than any app:

| Colour | What it suggests |
|---|---|
| Clear | Possibly over-hydrated; steady pale straw is the goal |
| Pale straw | Well hydrated |
| Light yellow | Fine, trending towards behind |
| Dark yellow | Behind — drink now |
| Amber or brown | Significantly dehydrated; if persistent, see a clinician |

Caveats: B vitamins turn urine bright yellow, beetroot and blackberries tint it pink or red, and many antibiotics, laxatives and painkillers change its colour. If the colour does not match your intake or diet, get it checked rather than guessing.

## Signs you are short

- Headache and a dry mouth, especially in the afternoon
- Concentration dips and mild fatigue
- Constipation
- Urine output falling and colour darkening
- Reduced exercise performance — even 2% body-mass dehydration impairs endurance

Note that thirst, headache and fatigue have many causes. Hydration is the first thing to rule out because it is free to test.

One adjustment for long sessions: sweating removes sodium as well as water — typically 0.5–1.5 g per litre of sweat. Beyond about two hours of sustained effort, plain water alone can dilute what is left, which is why endurance guides talk about fuelling rather than hydration in isolation. An electrolyte drink or a salty snack alongside your fluid covers the loss.

## The other end: drinking too much

Overhydration is rarer but more dangerous than dehydration. Drinking large volumes of plain water faster than the kidneys can excrete it (roughly 0.8–1.0 L per hour at maximum) dilutes blood sodium — **exercise-associated hyponatremia**, defined below 135 mmol/L — which can cause confusion, nausea, seizures and, in severe cases, is life-threatening. It has occurred in marathon runners who drank heavily without replacing sodium.

Guardrails for healthy adults:

1. Do not exceed about **1 litre per hour** of plain water during prolonged exercise; use an electrolyte drink beyond two hours.
2. Do not force water beyond thirst or beyond the targets above in a single sitting.
3. Eating normal meals supplies ample sodium; plain water alone during very long events does not.

## Special situations

**Kidney stones.** Higher fluid intake is one of the best-supported non-drug measures for reducing stone recurrence; increasing urine volume dilutes stone-forming salts. Patients who have had stones are typically advised to keep urine pale and output high — under a clinician's direction.

**Urinary tract infections.** Evidence is mixed but several trials suggest regular fluid intake reduces recurrence in women prone to UTIs.

**Pregnancy and breastfeeding.** Needs rise — breastfeeding in particular adds roughly 700–1,000 ml a day of fluid requirement.

**Illness.** Fever, vomiting and diarrhoea create deficits faster than normal drinking corrects them; oral rehydration solutions replace sodium as well as water.

**Caffeine and alcohol.** Both have diuretic effects at higher doses, but habitual caffeine use largely blunts the response — coffee still nets hydration for regular drinkers. Alcohol does not: it suppresses antidiuretic hormone and produces net fluid loss, which is part of why hangovers feel the way they do.

**Medical conditions.** Kidney disease, heart failure and liver cirrhosis often require fluid restriction. For these, the numbers on this page do not apply at all.

## Does coffee, tea and soup count?

Short answer: mostly yes. Beverages other than plain water contribute to the daily total — milk, tea, coffee, soup, juice and water-rich foods all deliver fluid. The caveats:

- **Caffeine:** a mild diuretic in doses you are not used to, but regular drinkers develop tolerance and studies of habitual consumers show a net hydrating effect. Your morning cup counts.
- **Alcohol:** net loss. It suppresses the hormone that tells the kidneys to hold water, which is the mechanism behind both the extra trips to the toilet and the dehydration of a hangover. Plan water alongside every round.
- **Salty and sugary drinks:** they deliver fluid but load the kidneys with solute to clear; they are not substitutes for water at meals.
- **Herbal teas and infused water:** identical to water for hydration purposes.

A workable rule for healthy adults: aim for roughly 80% of the daily target from water and unsweetened drinks, and let food, milk and tea cover the remainder.

## Six habits that make it automatic

1. Drink a glass immediately on waking, before coffee.
2. Keep a visible bottle at your desk; refilling a bottle beats finding a glass.
3. Pair water with existing anchors — every meal, every bathroom break, every meeting.
4. Eat more water-rich foods: cucumber, watermelon, oranges, soups, curd.
5. Mark a light line on your bottle for 10 a.m. and 2 p.m.; check the colour against the table above.
6. Weigh before and after hard sessions and replace 125–150% of what you lost.

## Try it yourself

Get a number specific to your body. Use the [water intake calculator](/water-intake-calculator.html) for a weight- and activity-based target, the [calorie calculator](/calorie-calculator.html) and [TDEE calculator](/tdee-calculator.html) to see how hydration supports training and recovery, and the [heart rate calculator](/heart-rate-calculator.html) to gauge the intensity of the sessions you are replacing fluid for.`,
    category: 'Health',
    readTime: '8 min read',
    date: '2026-09-26',
    icon: Heart,
    path: 'water-intake-guide.html'
  },
  {
    id: 16,
    title: 'Pregnancy Due Date: How the Estimate Is Calculated and How Accurate It Is',
    excerpt: 'Naegele’s rule and the 280-day count give the same date. See what moves the estimate, why gestational age starts two weeks early, and what the range means.',
    content: `A due date is arithmetic, not prophecy. Two simple rules — one counting back through the calendar, one counting forward in days — produce the same date, and both rest on a single assumption: that the last menstrual period began fourteen days before ovulation. Everything that makes a pregnancy individual is a variation on that assumption.

This guide works both rules by hand on real dates, explains why gestational age is always about two weeks ahead of the pregnancy itself, shows what ultrasound does to the estimate, and sets out what the range around the date actually means for a normal, healthy pregnancy.

> This article explains how due dates are calculated. It is not medical advice — every pregnancy is different, and the dating scan performed by your care team overrides any arithmetic on this page.

## Why there is a range instead of a date

A due date marks forty completed weeks of gestation, which is 280 days from the first day of the last menstrual period. Birth does not read calendars: fewer than one in twenty babies arrive on the estimated date itself, while the large majority of uncomplicated singleton births happen somewhere between 37 and 42 completed weeks.

That spread comes from three ordinary sources of variation. Ovulation does not always happen on cycle day 14. Implantation takes a variable number of days. And growth, which is what later scans measure, differs between babies by more than dating methods do in the first trimester. The date is therefore best read as the centre of a window of roughly two weeks in either direction, with the first-trimester scan supplying the most precise edge to that window.

## Gestational age starts before conception

Clinical dating counts from the first day of the last menstrual period (LMP), which sits about two weeks before ovulation and fertilisation. Obstetric language therefore always runs two weeks ahead of the pregnancy itself: a woman who conceived on 20 January with an LMP of 6 January is, on 3 February, described as being four weeks pregnant — but the embryo is only two weeks old by fertilisation date.

Worked: LMP **6 January 2026**, conception around **20 January 2026** (cycle day 14), and today **3 February 2026**.

- Gestational age: 3 February − 6 January = 28 days = **4 weeks 0 days**
- Fertilisation age: 3 February − 20 January = 14 days = **2 weeks 0 days**

The same convention runs through every scan report, screening window and milestone table, which is why "12 weeks" in a screening invitation and "10 weeks since conception" describe the same day.

## Naegele's rule, step by step

The classic calendar rule, published by Karl Naegele in the nineteenth century, is stated in one sentence: **add seven days to the LMP, subtract three months, add one year**.

Worked example 1: LMP **5 January 2026**.

1. Add seven days: 5 January → **12 January 2026**.
2. Subtract three months: 12 January → **12 October 2025**.
3. Add one year: **12 October 2026**.

Worked example 2: LMP **20 March 2026**.

1. Add seven days: **27 March 2026**.
2. Subtract three months: **27 December 2025**.
3. Add one year: **27 December 2026**.

Both steps are pure calendar arithmetic — no day counts, no month lengths to memorise — which is exactly why the rule survived two centuries of better technology.

### The month-length trap

The seven days are added first for a reason. Subtract three months from 31 May and you land on 31 February, a date that does not exist; subtract three months from 30 November and you land on 30 August, which does. Adding the seven days first moves nearly every end-of-month LMP into the following month, so the subtraction lands on a valid day. LMP **31 May 2026** becomes 7 June 2026, then 7 March 2026, then **7 March 2027** — a date that exists, even though it may be a day or two off the pure count.

## The 280-day method

The second rule counts days instead of months: **due date = LMP + 280 days**, because forty weeks is forty × seven = 280 days. The same folk memory — "nine months and seven days" — is the same arithmetic seen from the calendar side.

Worked, with the same LMP of **5 January 2026**, counting day by day through 2026, which is not a leap year:

| Month | Days counted | Running total |
|---|---|---|
| January (from the 5th) | 26 | 26 |
| February | 28 | 54 |
| March | 31 | 85 |
| April | 30 | 115 |
| May | 31 | 146 |
| June | 30 | 176 |
| July | 31 | 207 |
| August | 31 | 238 |
| September | 30 | 268 |
| October (12 more days) | 12 | 280 |

That lands on **12 October 2026** — identical to Naegele's answer, as it must be, since the two rules are the same calculation expressed in different units.

The same count gives the boundaries of the term itself:

| Gestational age | Days from LMP | Label |
|---|---|---|
| 37 weeks | 259 days | Early term begins |
| 39 weeks | 273 days | Full term begins |
| 40 weeks | 280 days | Estimated due date |
| 41 weeks | 287 days | Late term |
| 42 weeks | 294 days | Postterm |

## Why the estimate moves

Three inputs decide the date, and all three can differ from the textbook case.

### Ovulation timing and irregular cycles

The fourteen-day luteal phase is an average, not a rule. Some women ovulate on day 10, others on day 21, and a woman with a 35-day cycle who ovulates on day 21 has a due date about a week later than Naegele's rule suggests — because the rule assumes the LMP-to-ovulation gap was fourteen days when it was twenty-one.

Worked: LMP **1 September 2026** on a 28-day cycle predicts ovulation on 15 September and a due date from a 14-day gap. If the cycle is 35 days and ovulation lands on day 21 (22 September), the true due date shifts **seven days later** than the naive calculation. Charts and predictor kits that record the actual ovulation day remove this entire source of error.

### Ultrasound dating

An early scan measures the crown-rump length of the embryo and converts it to a gestational age. The measurement is most accurate early, when embryos of the same age look most alike:

| Trimester of the scan | Typical accuracy |
|---|---|
| First (6–13 weeks) | ±3 to 5 days |
| Second (14–27 weeks) | ±7 to 10 days |
| Third (28 weeks onward) | ±2 to 3 weeks |

This is why clinics date a pregnancy from a first-trimester scan rather than adjusting an established date late: by the third trimester, babies grow at genuinely different rates, and re-dating on size would confuse normal variation with gestational age. A date set before 14 weeks and then left alone is the standard outcome.

### IVF and known ovulation dates

When conception is assisted, the dates are known rather than estimated. For a five-day blastocyst transferred on **10 February 2026**, the gestational age on transfer day is 2 weeks 5 days, so the equivalent LMP is transfer minus 19 days: **22 January 2026**. Adding 280 days to that gives **29 October 2026**, which is also transfer plus 261 days. Two independent routes, one answer — and no estimation error beyond the transfer itself.

### Twins and other factors

Twins generally arrive earlier: spontaneous twin pregnancies deliver at an average of around 36 weeks rather than 40, so a singleton-based due date overestimates the time available by roughly a month. Previous preterm birth, certain uterine conditions and some medications also shift the expected timing, which is why those histories change a care plan rather than only the calendar.

## Week-by-week milestones

Dates matter because clinical milestones hang off them. These are typical landmarks, and normal pregnancies vary around every one of them:

| Gestational week | Days | What is generally expected |
|---|---|---|
| 4 | 28 | Implantation complete; hCG detectable |
| 6 | 42 | Embryonic cardiac activity often visible on scan |
| 12 | 84 | First-trimester screening window closes |
| 20 | 140 | Anatomy scan; about halfway |
| 24 | 168 | Commonly cited viability threshold |
| 28 | 196 | Third trimester; movement counts matter more |
| 37 | 259 | Early term begins |
| 40 | 280 | Estimated due date |
| 42 | 294 | Postterm; induction commonly offered |

The distinction between "expected by" and "must happen by" is the whole point of the table: the dates organise attention, they do not grade performance.

## When dates and symptoms disagree

The calendar and the body occasionally say different things, and in that situation the body wins. Reduced or absent fetal movement after about 28 weeks, regular contractions before 37 weeks, waters breaking before labour starts, or any bleeding are reasons to contact a care provider the same day, regardless of what week the arithmetic says.

> Dates are an estimate used to organise care. This article is not medical advice; symptoms, kick counts and scans — assessed by a clinician — are what should drive any decision about your own pregnancy.

## Try it yourself

Check the arithmetic on your own dates. The [pregnancy calculator](/pregnancy-calculator.html) applies Naegele's rule and the 280-day count side by side, the [ovulation calculator](/ovulation-calculator.html) estimates the fertile window from cycle length, the [date difference calculator](/date-difference-calculator.html) counts the days between any two dates, the [age calculator](/age-calculator.html) works completed years, months and days, and the [week number calculator](/week-number-calculator.html) tells you which of the forty weeks any date falls in.`,
    category: 'Health',
    readTime: '8 min read',
    date: '2026-10-01',
    icon: Calendar,
    path: 'pregnancy-due-date.html'
  },
  {
    id: 10,
    title: 'Calorie Deficit Explained: The Only Math Behind Weight Loss',
    excerpt: 'How a daily calorie deficit turns into kilograms, how large yours should honestly be, and the five ways people quietly undo it week after week.',
    content: `Weight loss has a reputation for being complicated because the behaviour is complicated. The physics is not: lose more energy than you take in and body tissue is used to make up the difference. Every diet that has ever worked — low carbohydrate, intermittent fasting, portion control, the potato diet — works by producing a calorie deficit, and every diet that has failed did so because the deficit disappeared.

This article does the arithmetic properly, converts deficits into realistic timelines, and then walks through the five practical failure points that undo most attempts.

> This is general educational information about energy balance, not medical advice or dietetic guidance. Rapid weight loss, eating disorders and chronic conditions require a qualified professional.

## The arithmetic of fat loss

Adipose tissue stores approximately **7,700 kcal per kilogram** of fat mass (the familiar 3,500 kcal per pound figure is the same value converted: 3,500 × 2.2046 = 7,716). So:

**Weekly loss (kg) = daily deficit × 7 ÷ 7,700**

| Daily deficit | Weekly loss | 10-week loss | 12-week loss |
|---|---|---|---|
| 250 kcal | 0.23 kg | 2.3 kg | 2.7 kg |
| 500 kcal | 0.45 kg | 4.5 kg | 5.5 kg |
| 750 kcal | 0.68 kg | 6.8 kg | 8.2 kg |
| 1,000 kcal | 0.91 kg | 9.1 kg | 10.9 kg |

### A complete worked example

A 78 kg, 35-year-old, 170 cm person with a sedentary job who trains three times a week:

1. BMR (Mifflin-St Jeor) = 10 × 78 + 6.25 × 170 − 5 × 35 + 5 = 780 + 1,062.5 − 175 + 5 = **1,673 kcal**.
2. TDEE at factor 1.55 = 1,673 × 1.55 = **2,593 kcal**.
3. Eat at 2,093 kcal → deficit **500 kcal/day**.
4. Expected loss: 0.45 kg a week, **4.5 kg in ten weeks**, taking body weight to about 73.5 kg.
5. At 73.5 kg, BMR falls to 10 × 73.5 + 1,062.5 − 175 + 5 = 1,628, so TDEE becomes ~2,523 and the target must fall to ~2,023 to hold the same deficit.

Step five is the one most people miss: **the goalposts move as you succeed**. Recalculate whenever weight drops 4–5 kg.

## Diet or exercise: where the deficit should come from

| Method | Effort for a 500 kcal deficit |
|---|---|
| Skip a dessert and a sugary drink | ~30 seconds of decision-making |
| Reduce daily intake by one roti and a bowl of rice | ~100 kcal × 5 portions of attention |
| Burn 500 kcal by jogging | ~45–60 minutes at a moderate pace for a 70 kg person |
| Burn 500 kcal by walking | ~90–100 minutes at 5 km/h |

Typical energy expenditure for a 70 kg adult: a 30-minute brisk walk is roughly 150–180 kcal, a 30-minute run around 280–350 kcal, a 30-minute weights session 130–200 kcal. Exercise is invaluable — appetite control, muscle preservation, cardiovascular health, mood — but as the primary engine of a deficit it is slow and easily cancelled by a single latte.

The evidence-supported split is **diet creates the deficit, training protects the muscle**. Combine both, but do not plan a 500 kcal deficit that requires seven training sessions a week; adherence will fail by week three.

## How large should the deficit be?

Three constraints bound it:

1. **Never eat below your BMR.** And as a practical floor, most guidance suggests not dropping under about **1,200 kcal/day for women or 1,500 kcal for men** without supervision, because hitting micronutrient and protein needs below that becomes genuinely difficult.
2. **Aim for 0.5–1% of body weight lost per week.** For a 78 kg person that is 0.4–0.8 kg; for a 120 kg person, up to 1.2 kg is reasonable. Heavier bodies have more to lose and tolerate faster loss safely; lighter, already-lean individuals should go slower.
3. **Stay at or above ~1.6 g of protein per kilogram** to protect lean mass — for our 78 kg example, **125–160 g a day**. Protein also has the highest thermic effect (20–30% of its calories are spent digesting it) and is the most satiating macronutrient.

A 750–1,000 kcal deficit works for short, structured phases in people with higher starting weight. Chronic deficits that large raise muscle-loss risk, hunger, training-performance decline and — eventually — rebound eating.

Whatever size you choose, expect hunger to peak in weeks two to four and then settle as the routine becomes normal. Protein, fibre, the volume from vegetables, seven or more hours of sleep and a daily walking habit each do more for adherence than willpower does. If you are ravenous every day for a month, the deficit is too aggressive for your schedule — cut it to 300 kcal and keep going rather than abandoning the plan in week five. A smaller deficit held for twelve weeks beats a larger one quit in three.

## What a 1,900 kcal day can look like

Illustrative only; portions and values vary with preparation and brands:

| Meal | Example | Approx. kcal | Protein |
|---|---|---|---|
| Breakfast | Oats with milk, banana, spoon of peanut butter | 450 | 20 g |
| Lunch | Rice, dal, sabzi, curd | 550 | 22 g |
| Snack | Greek yogurt or a handful of almonds | 150 | 12 g |
| Dinner | Chicken or paneer with roti and salad | 600 | 40 g |
| Drinks | Tea without sugar, water, black coffee | 60 | 0 g |
| **Total** | | **1,810** | **94 g** |

To reach 130 g of protein in the same calorie budget, swap rice for extra roti/paneer at lunch or add egg whites at breakfast — protein per rupee and per calorie is the variable worth optimising, not meal timing.

## Why progress stalls — and what to do

**The maths changed.** Losing 5 kg lowers BMR by roughly 50 kcal and TDEE proportionally; the deficit that produced 0.45 kg a week now produces 0.25 kg. Fix: recalculate, or add a walk.

**NEAT collapsed.** People unconsciously move less while dieting — fewer steps, less fidgeting, more sitting — which can quietly erase 200–300 kcal of the deficit. Fix: track steps, not just food.

**Under-reporting.** Controlled studies consistently find people underestimate intake, often by 30–50%, through uncounted oils, sauces, tasting while cooking and weekend days. Fix: weigh the two weeks you think you are eating "perfectly".

**Metabolic adaptation.** Prolonged restriction makes the body somewhat more efficient; the drop beyond what body composition predicts is typically modest but it accumulates. Fix: diet breaks of one to two weeks at maintenance, which also restore training quality and adherence.

**The 80/20 week.** Five careful days and two social ones can generate a weekly average deficit of zero: five days at −500 = −2,500, two days at +1,200 = +2,400. Fix: plan the social meals rather than fitting them around the deficit.

## Diet breaks and what happens after

Two related tools decide whether a diet ends well.

**A diet break** means two weeks at maintenance after every 8–12 weeks of deficit. The scale may hold or rise a kilo as glycogen and salt refill — that is not fat regain — and in exchange you get restored training performance, lower hunger, a psychological reset, and proof that maintenance is still achievable. Research on extended weight-loss phases consistently finds better adherence and less rebound when breaks are planned rather than improvised.

**Reverse dieting** follows the final phase: raise calories in steps of 100–150 kcal a week back toward maintenance while continuing resistance training. The goal is not further loss but stabilising the new weight, rebuilding the metabolic rate that fell during restriction, and — critically — removing the panic that sends people back to their old intake in a single weekend.

Neither tool changes the physics; both change whether you can keep following them. The diet that ends at a maintained weight beats the diet that delivers a faster loss and a heavier spring.

## Five habits that keep the deficit intact

1. Weigh food for two weeks to calibrate your eye, then portion by habit.
2. Hit the protein target first; everything else is easier once it is met.
3. Keep resistance training in the programme — a deficit without it loses muscle, not just fat.
4. Walk daily; NEAT is the cheapest lever in the entire energy-budget.
5. Expect 0.4–0.9 kg a week and judge success by the monthly average, not the morning after a salty dinner.

Weight fluctuates 1–2 kg daily from glycogen, salt and gut contents. The trend line is the only honest measurement.

## A two-week starter plan

Rather than rebuild your life in an afternoon:

1. Log what you already eat for three days without changing anything, to surface the real baseline including oils, sauces and snacks that never get counted.
2. Make one structural swap per meal: a smaller rice portion, protein at breakfast, a bottled drink replaced by water.
3. Set the first fortnight at maintenance minus 300 kcal while the tracking habit forms.
4. Add resistance training twice a week and a daily walk before cutting harder.
5. Weigh daily, take the seven-day average, and judge after fourteen days rather than after one difficult evening.

Structure beats intensity. The people who keep weight off are the ones whose plan survived a holiday, a deadline and a bad night's sleep — and that is a design problem, not a character one.

## Try it yourself

Build your own plan. Start with the [TDEE calculator](/tdee-calculator.html) for maintenance, drop 500 kcal and confirm the timeline in the [calorie calculator](/calorie-calculator.html), split the target into protein, carbohydrate and fat with the [macro calculator](/macro-calculator.html), and recheck resting expenditure after every 5 kg with the [BMR calculator](/bmr-calculator.html).`,
    category: 'Fitness',
    readTime: '8 min read',
    date: '2026-09-24',
    icon: Flame,
    path: 'calorie-deficit-guide.html'
  },
  {
    id: 11,
    title: 'Body Fat Percentage: How to Measure It at Home and Read It',
    excerpt: 'Four measurement methods compared for cost and accuracy, the US Navy formula worked through in full, and healthy fat ranges for men and women.',
    content: `Two men, both 175 cm and 80 kg, both BMI 26.1 and both flagged "overweight". One lifts four times a week and measures 13% body fat; the other has not exercised in years and measures 29%. The scale and the BMI formula cannot separate them because neither has any idea how the weight is distributed. Body fat percentage can.

This guide compares the measurement methods you can actually access, walks through the US Navy tape formula on real numbers, gives the category tables for men and women, and explains why the trend over eight weeks matters more than any single reading.

> Body fat percentages are estimates produced by proxies, not lab values, and the ranges below are general reference bands for healthy adults. This is not medical advice.

## Why it beats BMI

BMI is weight relative to height. Body fat percentage is fat relative to total mass. The distinction shows up immediately:

| Person | Height | Weight | BMI | Body fat | Reading |
|---|---|---|---|---|---|
| Weightlifter | 175 cm | 80 kg | 26.1 | 13% | Lean and athletic |
| Sedentary worker | 175 cm | 80 kg | 26.1 | 29% | Excess fat, normal risk profile otherwise |

Same height, same weight, opposite health picture. Body fat percentage also resolves the sex question that BMI ignores entirely: essential fat sits around **2–5% for men and 10–13% for women**, so the healthy bands differ substantially between them.

## Four methods compared

| Method | Typical accuracy | Cost | Where |
|---|---|---|---|
| Bioimpedance (smart scales, handhelds) | ±3–5% | Low | Home |
| Skin-fold calipers | ±3–4% with practice | Very low | Home |
| Tape measures (US Navy method) | ±3% | Free | Home |
| DEXA scan | ±1–2% | High | Clinic or gym |
| Hydrostatic weighing | ±1.5% | Medium-high | Specialist lab |

**Bioimpedance** passes a tiny electrical current through the body; fat resists current more than lean tissue. It is heavily influenced by hydration, recent meals and exercise — a dehydraved morning reading can differ by 2% from a well-hydrated evening reading. Use the same device at the same time of day, and treat it as a trend line only.

**Calipers** pinch subcutaneous fat at specific sites and convert thickness to a percentage using equations (Jackson-Pollock three-site is the standard: chest, abdomen and thigh for men; tricep, suprailiac and thigh for women). Cheap and reasonably repeatable, but the pinch technique takes practice, and the equations were built on specific populations.

**DEXA** uses low-dose X-ray to differentiate bone, lean and fat tissue. It is the practical gold standard for civilians — but still an estimate (it relies on a two-compartment model and varies with hydration), it costs real money, and its precision is more useful for comparing scans of the same person over time than for chasing the exact value.

**Tape measures** cost nothing and are the method we work through next.

## The US Navy method, worked through

Developed for populations where scales and calipers were impractical, it needs three measurements: height, neck circumference and waist (plus hip for women). All in centimetres.

**Men:**

%BF = 495 ÷ [1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)] − 450

**Women:**

%BF = 495 ÷ [1.29579 − 0.35004 × log10(waist + hip − neck) + 0.22100 × log10(height)] − 450

### Worked example: a man, 175 cm, waist 90 cm, neck 38 cm

1. waist − neck = 52; log10(52) = 1.7160; × 0.19077 = 0.32735.
2. log10(175) = 2.2430; × 0.15456 = 0.34668.
3. Denominator = 1.0324 − 0.32735 + 0.34668 = 1.05174.
4. 495 ÷ 1.05174 = 470.6; minus 450 = **20.7% body fat**.

### Worked example: a woman, 165 cm, waist 74 cm, hip 98 cm, neck 33 cm

1. waist + hip − neck = 139; log10(139) = 2.1430; × 0.35004 = 0.75014.
2. log10(165) = 2.2175; × 0.22100 = 0.49006.
3. Denominator = 1.29579 − 0.75014 + 0.49006 = 1.03571.
4. 495 ÷ 1.03571 = 477.9; minus 450 = **27.9% body fat**.

One warning about smart scales: two devices from different brands, or even two units of the same model, can disagree by 2–3 percentage points on the same person at the same moment, because the algorithms behind each impedance reading are proprietary and trained on different populations. Stick to one device, at the same time of day, and never compare its output with a clinic's DEXA figure.

### Getting a number you can trust

- Measure in the **morning, after the toilet, before eating**, skin dry.
- Pull the tape snug without compressing tissue; keep it level all the way round.
- Take **two readings** a minute apart and average them; if they differ by more than 1 cm, take a third.
- For the waist, measure at the navel for the Navy method; for general risk tracking, measure at the narrowest point or just above the iliac crest — but always the same place.
- Never compare a morning fasted number with an evening post-training number.

## The reference ranges

| Category | Men | Women |
|---|---|---|
| Essential fat | 2–5% | 10–13% |
| Athletes | 6–13% | 14–20% |
| Fitness | 14–17% | 21–24% |
| Average | 18–24% | 25–31% |
| Obese (by fat mass) | 25%+ | 32%+ |

Two cautions. These bands were assembled from athletic and general-population studies and do not translate equally across ages and ethnicities — at the same body fat percentage, South Asian populations tend to carry more visceral fat. And "essential" does not mean target: essential fat is the physiological minimum below which hormonal and organ function deteriorates, not a goal to chase.

## Reading the trend, not the number

Practical protocol:

1. Measure once a week, same conditions, same device.
2. Take a **four-week average** as your real value — individual readings swing more than people expect.
3. Judge after **eight weeks**. A fall of 1–2 percentage points in two months is a solid, sustainable rate for a non-obese person; a drop of 4 points in three weeks is mostly water.
4. Track waist circumference alongside. If body fat is flat but the waist is shrinking, recomposition is happening.
5. Recheck the picture every 5 kg of weight change — both the Navy formula and the body-fat categories assume a stable body.

Note the arithmetic on body composition: losing 5 kg of fat from an 80 kg person at 29% fat (23.2 kg fat, 56.8 kg lean) while holding lean mass leaves 75 kg at 24.3% fat — a 4.7-point improvement from one change in the numerator.

## Visceral fat: the number worth knowing

Total body fat describes quantity; location describes risk. Visceral fat — the layer wrapped around the abdominal organs — is metabolically active, releasing inflammatory signals and free fatty acids straight into the portal circulation, and it is the depot most strongly associated with insulin resistance, fatty liver and cardiovascular risk.

You cannot pinch it and no bathroom scale reports it, so the practical proxies are:

- **Waist circumference**, the cheapest and most reproducible marker; a rising waist at stable weight means visceral fat is accumulating.
- **Waist-to-hip ratio**, which adjusts for hip shape. WHO high-risk values are above 0.90 for men and 0.85 for women.
- **Waist-to-height ratio**, stated simply as "keep the waist below half your height" — a 175 cm adult targets under 87.5 cm. The rule works across sexes and ages with no lookup table.

The encouraging part is that visceral fat responds fastest to the least exotic intervention: a moderate calorie deficit plus resistance training and daily walking reduces abdominal fat preferentially in most controlled studies, and the waist moves within weeks — long before the scale looks dramatic. If your body fat percentage is flat but your waist has fallen 3 cm in two months, you have shifted the metric that matters most.

## What the number should change

- If body fat is high and strength is low: prioritise a moderate calorie deficit plus resistance training and adequate protein.
- If body fat is low and performance is poor: stop cutting; energy availability is the constraint.
- If body fat reads high but the waist is normal and strength is good: you may be misreading a bioimpedance device, not gaining fat.
- If the number is stable but blood pressure, glucose or resting heart rate are moving the wrong way: those markers outrank any body composition estimate.

Body fat is one instrument on the dashboard. Waist, fitness, bloodwork and habits drive the decisions.

## Frequently misread results

- **"My body fat went up while I lost weight."** If you dropped 4 kg and the percentage fell, fat mass went down. If the percentage rose while weight fell, you probably lost muscle or water — check protein intake and training before blaming the scale.
- **"The caliper and the scale disagree by five points."** They can, legitimately. Calipers see only subcutaneous fat, bioimpedance sees water as well, and DEXA counts bone too. Use one method consistently and compare it only with itself.
- **"My morning reading is three points below my evening one."** Hydration and food volume move bioimpedance readings substantially; treat the number as a range, not a fact.

Consistency converts a noisy instrument into a usable trend line — which is all this measurement has ever been.

## Try it yourself

Get your baseline and then watch it move. Use the [body fat calculator](/body-fat-calculator.html) for the Navy-method estimate, cross-check the composition with the [lean mass calculator](/lean-mass-calculator.html), see how the same weight reads on the [BMI calculator](/bmi-calculator.html), and check whether your height and frame match expectations with the [ideal weight calculator](/ideal-weight-calculator.html).`,
    category: 'Fitness',
    readTime: '8 min read',
    date: '2026-09-22',
    icon: Activity,
    path: 'body-fat-percentage.html'
  },
  {
    id: 12,
    title: 'Percentage Increase and Decrease: Formulas With Worked Examples',
    excerpt: 'Discounts, salary rises, price changes and tax-inclusive totals — every percentage calculation you meet, worked through step by step with examples.',
    content: `Percentage calculations are the most common arithmetic in adult life and the most common place a confident answer turns out to be wrong. The formula is trivial; the trap is using the wrong starting number, and then reporting a precise answer to a question nobody asked.

This guide covers every percentage problem that shows up in real life — increases, decreases, repeated discounts, reverse percentages, percentage points and averaging — each with the working shown.

## The two core formulas

**Percentage increase = (New value − Original value) ÷ Original value × 100**

**Percentage decrease = (Original value − New value) ÷ Original value × 100**

Always divide by the **original**. Everything else follows from that sentence.

### Worked example: a price rise

A jacket goes from ₹2,000 to ₹2,600:

1. Difference = 2,600 − 2,000 = 600.
2. Divide by the original: 600 ÷ 2,000 = 0.30.
3. × 100 = **30% increase**.

### Worked example: a discount

A phone drops from ₹40,000 to ₹34,000:

1. Difference = 40,000 − 34,000 = 6,000.
2. 6,000 ÷ 40,000 = 0.15.
3. **15% off**.

The common failure is dividing by whichever number you happen to be looking at last. If you divide the jacket's 600 by the new price of 2,600 you get 23.1% — a real number describing a question nobody asked.

### The three-step method that never fails

1. Find the difference.
2. Divide by the **original** value.
3. Multiply by 100 and label it.

## Why a gain needs a bigger fall to undo it

Percentages are asymmetric, which is why markets and diets both feel harder on the way back:

| Gain | Loss needed to return to start |
|---|---|
| +10% | −9.1% |
| +20% | −16.7% |
| +30% | −23.1% |
| +50% | −33.3% |
| +100% | −50% |

The table follows from dividing the gain by 1 + gain: a 30% gain to ₹1,300 needs 300 ÷ 1,300 = 23.1% to get back to ₹1,000. This asymmetry is the arithmetic behind stop-loss discipline: recovery gets harder the further you fall, because each percentage point of a smaller base is worth less.

## Successive percentages multiply, they do not add

A shop advertising "20% then a further 10% off" is not giving 30% off. On a ₹1,000 item:

- After 20% off: 1,000 × 0.80 = ₹800.
- After a further 10% off: 800 × 0.90 = ₹720.
- Total discount: **28%**, not 30%.

| Sequential discounts | Combined reduction |
|---|---|
| 20% then 10% | 28% |
| 30% then 20% | 44% |
| 50% then 10% | 55% |
| 10% then 10% | 19% |
| 5% then 5% | 9.75% |

Multiply the complements (0.8 × 0.9 = 0.72) and subtract from 1. The same rule governs investment returns across years: +18% then −10% is 1.18 × 0.90 = 1.062, a **6.2%** gain overall — not +8%.

## Reverse percentages

These appear as "if the sale price including 18% tax is ₹1,180, what was the base?" or "65 is 130% of what?"

**Base = Final ÷ (1 + rate as a decimal)**

- 65 is 130% of what? 65 ÷ 1.30 = **50**.
- Price including 18% GST is ₹1,180: 1,180 ÷ 1.18 = **₹1,000 base**, so the GST component is ₹180.
- A ₹2,360 bill including 18% GST: 2,360 ÷ 1.18 = **₹2,000 base**, GST ₹360.

The whole trick is that the multiplier must match the rate: for an increase of r%, divide by (1 + r/100); for a decrease, divide by (1 − r/100). Dividing a tax-inclusive amount by the tax rate instead of by 1 + rate is one of the most widespread errors in everyday finance.

## Percentage points versus percent

When the base is itself a rate, the words change the meaning:

- Interest rates move from 4% to 6%: that is **2 percentage points**, and a **50% increase** in the rate (2 ÷ 4).
- Inflation falls from 5% to 4%: **1 percentage point**, but a **20% decrease** in the inflation rate — while prices still rose 4%.
- A pass rate rising from 60% to 70%: 10 points, 16.7% relative.

Journalists and politicians use the two interchangeably; arithmetic does not. Always ask: points, or relative change?

## Mental math shortcuts

| Shortcut | Method | Example (of ₹1,200) |
|---|---|---|
| 10% | Move the decimal one place left | ₹120 |
| 5% | Half of 10% | ₹60 |
| 1% | Move the decimal two places | ₹12 |
| 15% | 10% + 5% | ₹180 |
| 25% | Quarter (halve, halve again) | ₹300 |
| 50% | Halve | ₹600 |
| 33.3% | Third | ₹400 |
| 7.5% | 5% + half of 5% | ₹90 |

For any percentage, decompose: 18% of 1,200 = 10% (120) + 5% (60) + 1% (12) + 1% (12) = ₹304. That takes about four seconds and no calculator.

## The errors that survive into adulthood

**Averaging percentages without weights.** If a branch where 10 people work has a 50% pass rate and one where 90 people work has a 70% pass rate, the company's rate is not 60%. It is (10 × 0.50 + 90 × 0.70) ÷ 100 = **68%**. Only averages of counts may be averaged directly.

**Percent change when the base is zero or negative.** Percentage change from zero is undefined; "growth" claims built on a near-zero base are meaningless without absolute numbers.

**Confusing "percent of" with "percent change".** "Staff costs are 40% of revenue" is a share. "Staff costs rose 40%" is a change. The two never mix in one calculation.

**Forgetting × 100** and reporting 0.3 as 0.3% instead of 30%.

## Percentages of a number: the everyday set

Most percentage questions are "what is x% of y", and the fastest route is decomposition rather than multiplication:

| Percentage | Method | 15% of 2,400 |
|---|---|---|
| 1% | Divide by 100 | 24 |
| 10% | Move the decimal one place | 240 |
| 5% | Half of 10% | 120 |
| 20% | Double 10% | 480 |
| 25% | Half, then half again | 600 |
| 15% | 10% + 5% | 360 |

Building 15% from 240 + 120 takes a second and needs no calculator, and the same decomposition handles awkward values: 8.5% of 3,000 is 10% (300) minus 1.5% (45) = 255. Practise the six anchors above and almost every retail, invoice or salary percentage becomes mental arithmetic.

The reverse operation — "240 is 15% of what?" — is division: 240 ÷ 0.15 = 1,600. Verify by multiplying back: 15% of 1,600 is indeed 240.

## Annualising a multi-period return

Three years of +10%, +6% and −4% are never averaged by adding and dividing. Compound the factors first: 1.10 × 1.06 × 0.96 = 1.1203, a total gain of 12.03% over three years, which annualises to 1.1203^(1/3) − 1 = **3.9% a year**. The arithmetic mean of (10 + 6 − 4) ÷ 3 = 4.0% happens to land close here, but the two diverge sharply as volatility rises — as the +50%, −30%, +20% sequence shows, where the mean reads 13.3% and the compounded result is 8.0%.

The same discipline applies to inflation, fees and salary raises: convert each period to a factor, multiply the factors, then take the root. Never average percentages directly unless the periods and the underlying bases are identical.

## Percentage problems in job offers

Two questions come up constantly:

1. **A rise from ₹80,000 to ₹92,000.** The difference of 12,000 ÷ 80,000 is a **15% rise** — but with inflation at 6%, the real increase is 1.15 ÷ 1.06 − 1 = **8.5%**. Always deflate a raise before celebrating it.
2. **A cut from ₹90,000 to ₹76,500.** 13,500 ÷ 90,000 = **15%**, and getting back to the old figure needs 13,500 ÷ 76,500 = **17.6%** — the asymmetry from the table above, showing up in your salary.

Bonus percentages work the same way: 8% on ₹10,00,000 is ₹80,000, but a bonus is discretionary while a raise is permanent — within two years a 6% raise outranks an 8% bonus. Convert every offer to the same base before comparing, and remember that ## One last check: does the answer make sense?

Every percentage result deserves a magnitude sanity check. A 15% rise on ₹80,000 cannot be ₹12,00,000 — it is ₹12,000, because fifteen percent is a little more than a tenth. A 40% discount on a ₹9,999 phone cannot take it below ₹5,999 unless the store is losing money. If your figure looks wildly unlike your intuition, the base is wrong rather than the arithmetic.

Train the intuition on round numbers first: 10% of anything is the number with the decimal moved once, 50% is the half, and 100% is the original. A correct answer always sits inside a band you can feel — less than the original for any discount, more than the original for any increase, and never negative when both inputs were positive.

a percentage of cost to company and a percentage of take-home are different animals.

## Where you will use this next

Salary negotiations (percent rise against your current base, not against the band), investment returns across multiple years, GST and VAT on invoices, tips at restaurants, inflation against your raise, and discount stacking during sales — every one of these is one of the formulas above with different labels attached.

## Try it yourself

Skip the mental arithmetic when it matters. Use the [percentage calculator](/percentage-calculator.html) for increase and decrease problems, the [percent calculator](/percent-calculator.html) for quick "what is x% of y" questions, the [GST calculator](/gst-calculator.html) for inclusive and exclusive tax amounts, the [tip calculator](/tip-calculator.html) for splitting bills, and the [tax calculator](/tax-calculator.html) for income tax on your actual salary.`,
    category: 'Math',
    readTime: '8 min read',
    date: '2026-09-20',
    icon: Calculator,
    path: 'percentage-calculation.html'
  },
  {
    id: 13,
    title: 'Probability Basics: Odds, Expected Value and Common Traps',
    excerpt: 'The core rules of probability using dice, cards and coins, then expected value, odds conversion, and the fallacies that fool otherwise smart people.',
    content: `Probability is the mathematics of not knowing. It does not tell you what will happen on Saturday; it tells you how much of your money, time or attention a decision deserves given what you know today. Master five rules and you can price a bet, read a medical test result and stop being impressed by streaks.

Everything below uses one worked example per concept — dice, cards, coins — because they are transparent enough to count on your fingers and verify with arithmetic.

## The basic definition

**P(event) = favourable outcomes ÷ total possible outcomes**

Assuming every outcome is equally likely:

- Rolling a 4 on a fair six-sided die: 1 ÷ 6 = 0.167 = **16.7%**.
- Drawing an ace from a standard 52-card deck: 4 ÷ 52 = 0.077 = **7.7%**.
- Getting heads in one coin toss: 1 ÷ 2 = **50%**.
- Drawing a spade: 13 ÷ 52 = **25%**.

Three anchor properties: probabilities run from 0 (impossible) to 1 (certain); the probabilities of all mutually exclusive outcomes sum to 1; and P(not A) = 1 − P(A).

## The addition and multiplication rules

**Addition (OR):** for mutually exclusive events, P(A or B) = P(A) + P(B).

- Probability of rolling a 1, 2 or 3: 0.167 + 0.167 + 0.167 = **50%**.
- Probability of drawing a heart or a diamond: 0.25 + 0.25 = **50%**.

**Multiplication (AND), independent events:** P(A and B) = P(A) × P(B).

- Two heads in a row: 0.5 × 0.5 = 0.25.
- Ten heads in a row: 0.5^10 = 1 ÷ 1024 = **0.098%**.
- Rolling a six twice: (1/6) × (1/6) = 1/36 = **2.8%**.

The sum of the two dice being exactly seven is a favourite example: the combinations are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — six of thirty-six equally likely outcomes, so **6 ÷ 36 = 16.7%**, the single most likely total.

### Dependent events: when the deck changes

Draw two aces in a row **without replacement**: the first draw is 4/52, and the deck now has 51 cards with 3 aces, so the second is 3/51.

4/52 × 3/51 = 12 ÷ 2652 = **1 ÷ 221 = 0.45%**.

Replace the cards after each draw and the answer becomes (4/52)^2 = 0.59%. Small difference, correct method: ask whether the first event changed the composition of the world the second event occurs in.

## Conditional probability and the test that fools everyone

**P(A | B) = P(A and B) ÷ P(B)** — the probability of A given that B happened.

Consider a screening test for a condition that affects **1%** of people. The test correctly identifies **95%** of those who have it, and falsely flags **5%** of healthy people. You test positive. How likely are you to be ill?

Imagine 1,000 people:

| Group | Count | Test positive |
|---|---|---|
| Have the condition | 10 | 9.5 (95% of 10) |
| Do not have it | 990 | 49.5 (5% of 990) |
| Total positives | — | 59 |

P(condition | positive) = 9.5 ÷ 59 = **16.1%**.

A positive result on a rare condition still means you are more likely to be healthy than ill. This is not a defect of the test — it is base rates, and it is why doctors confirm with a second, more specific test rather than treating a single screen as a diagnosis.

## Odds versus probability

**Odds = favourable : unfavourable**, while probability = favourable ÷ total. Conversion: odds = p ÷ (1 − p).

| Probability | Odds in favour |
|---|---|
| 10% | 1 : 9 |
| 25% | 1 : 3 |
| 50% | 1 : 1 (evens) |
| 75% | 3 : 1 |
| 90% | 9 : 1 |

Betting markets quote odds; studies quote probabilities; news stories alternate between them without saying so. Fractional odds (5/2) mean you win 5 for every 2 staked — an implied probability of 2 ÷ (5 + 2) = 28.6% after removing the bookmaker's margin.

## Expected value: the number that decides

**EV = Σ (outcome × probability of that outcome)**

**Example 1 — a fair coin bet.** Stake ₹100 to win ₹100 on heads: EV = (0.5 × 100) + (0.5 × −100) = **₹0**. Fair.

**Example 2 — the same bet with a handicap.** Suppose the coin is biased and you win only 40% of the time: EV = (0.4 × 100) + (0.6 × −100) = 40 − 60 = **−₹40 per ₹100 staked**. You will not lose exactly ₹40 on any single flip — you will lose ₹100 sixty percent of the time — but that is what long-run average loss looks like.

**Example 3 — a roulette wheel.** The US wheel has 38 slots (1–36, 0, 00). A straight-up number pays 35:1:

EV = (1/38 × 35) + (37/38 × −1) = (35 − 37) ÷ 38 = **−5.26%**.

Every spin costs 5.26% of your stake on average. The European single-zero wheel runs **−2.70%**. No combination of bets changes either figure — only the rules of the game do.

Expected value is the discipline behind every insurance decision, every investment allocation and every "should I do this again?" question: multiply each outcome by how likely it is, add them up, and act on the sum rather than on the most exciting outcome.

## Counting: where the huge numbers come from

When order matters you have permutations; when it does not, combinations. The combination formula:

**C(n, k) = n! ÷ [k! × (n − k)!]**

- A five-card poker hand from 52: C(52,5) = **2,598,960** distinct hands.
- Choosing six numbers from 49 in a typical lottery: C(49,6) = **13,983,816** — so the jackpot probability is 1 in 13.98 million.
- Arranging all 52 cards: 52! ≈ 8 × 10^67, a number larger than atoms in the observable universe.

This is why lottery EV is negative with the vig included, and why poker is a game of skill: you control which of the 2,598,960 hands you put money into.

## Five fallacies that survive contact with reality

1. **Gambler's fallacy.** After nine reds, black is not "due". Each spin is independent: 0.5^10 says nothing about spin eleven.
2. **The hot-hand dismissal.** Short streaks in independent sequences are expected, not evidence of a pattern — but also not evidence that patterns never exist. Test with sample size, not vibes.
3. **Small samples.** A drug that helps 3 of 10 patients sounds meaningful until the control group also shows 2 of 10. n = 10 is noise.
4. **Confusing probability with magnitude.** A 1% chance of losing everything outranks a 100% chance of a small gain in most portfolios. Expected value needs both the chance and the size.
5. **The inverse probability error.** P(test | disease) is not P(disease | test) — the medical test example above is precisely that mistake, made real.

## The law of large numbers, and what it does not say

A fair coin flipped ten times can easily produce seven heads — that happens about 12% of the time, nothing remarkable. Flipped a thousand times, a 70% heads result would be extraordinary, because the expected share is 50% and the spread shrinks with the square root of the number of trials.

That is the law of large numbers: as trials increase, observed frequency converges on the true probability. It emphatically does not mean a deviation must correct itself — the sequence owes you nothing. Seven heads in ten flips is luck; seven hundred in a thousand is a biased coin, and sample size is the only thing that separates the two. It is the first question to ask of any claim: how many trials, and how variable were the outcomes?

When a headline reports a risk increase, three questions dispose of most misleading health and finance stories:

1. **Absolute or relative?** "Risk doubles" from 2 in 10,000 to 4 in 10,000 is a 100% relative rise and a 0.02% absolute one.
2. **How many participants, and for how long?** Small, short trials produce wild swings.
3. **What was the comparison group doing?** Without a control arm, a before-and-after change says almost nothing about cause.

## Probability in everyday decisions

The rules earn their keep far outside casinos:

- **Insurance.** A policy covering a 0.1% annual chance of a ₹10,00,000 loss carries an expected loss of ₹1,000 a year. If the premium is ₹1,400, about ₹40 buys administration and peace of mind — a fair reading of the trade rather than a scam. Insure against losses you cannot absorb, not small expected ones.
- **Warranties.** Same arithmetic: ₹3,000 of extended cover on a ₹40,000 appliance is a 7.5% premium against a failure probability the seller understands far better than you do.
- **Small daily odds.** Something with a 1% daily chance of occurring is near certain within a year — 1 − 0.99^365 ≈ 97%. Rare-and-daily deserves attention; rare-and-independent does not.
- **Sunk costs.** Whether a project that is 80% complete will succeed is independent of what reaching 80% cost. Past spending changes no probability whatsoever.

Each case needs the same three questions: what are the outcomes, how likely is each, and how big is each.

## Try it yourself

Work through your own scenarios. The [probability calculator](/probability-calculator.html) handles single and compound events, the [combination calculator](/combination-calculator.html) and [permutation calculator](/permutation-calculator.html) handle the counting problems behind cards and lotteries, and the [ratio calculator](/ratio-calculator.html) converts between odds, probabilities and proportions without you doing the division twice.`,
    category: 'Math',
    readTime: '8 min read',
    date: '2026-09-18',
    icon: Brain,
    path: 'probability-basics.html'
  },
  {
    id: 17,
    title: 'How to Calculate Days Between Two Dates (Without Getting It Wrong)',
    excerpt: 'Month lengths, leap years and inclusive counting cause most date errors. Work two examples by hand, learn the business-day rule and see why 365-day years lie.',
    content: `Date arithmetic looks trivial until it is not. Two people count the same span and disagree by a day; a subscription charged "every 30 days" drifts away from the calendar; a project plan claims a year has 365 days when it has 366. The failures are not random — they come from four specific mistakes, and each one has a small, repeatable fix.

This guide works two complete examples by hand, sets out the month-length and leap-year rules once so you never have to look them up again, and explains the difference between counting days, counting business days and counting completed years.

## Month lengths and leap years

Everything else follows from knowing the twelve numbers:

| Month | Days |
|---|---|
| January | 31 |
| February | 28 (29 in a leap year) |
| March | 31 |
| April | 30 |
| May | 31 |
| June | 30 |
| July | 31 |
| August | 31 |
| September | 30 |
| October | 31 |
| November | 30 |
| December | 31 |

A useful total: **365 days**, or **366** in a leap year. February is the only month that moves.

The leap-year rule has three clauses, and you apply them in order:

1. Divisible by 4 → leap year.
2. Except divisibility by 100 → not a leap year.
3. Except divisibility by 400 → leap year again.

So 1996, 2000 and 2024 are leap years; 1900 and 2100 are not. The practical consequence: over the twentieth century (1901–2000) there were 24 leap years, not 25, and the twenty-first century will have 24 as well — 2000 counted, 2100 excluded.

## Worked example 1: 15 March 2026 to 3 January 2027

Two methods reach the same answer, and it is worth being able to do both.

### Method A: month by month

Walk forward from the start date, adding only the days you actually pass through.

- Remaining days of March: 31 − 15 = **16** (the 16th through the 31st)
- April: **30**
- May: **31**
- June: **30**
- July: **31**
- August: **31**
- September: **30**
- October: **31**
- November: **30**
- December: **31**
- January: **3**

Sum: 16 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31 + 3 = **294 days**.

The counting excludes the start date and includes the end date — the standard convention for "difference".

### Method B: day-of-year subtraction

Number the days of the year from 1 January. For 2026, a non-leap year, 15 March is day 31 + 28 + 15 = **74**. The year has 365 days, so 365 − 74 = **291** days remain from 16 March to 31 December. Add the three days of January and 291 + 3 = **294** — the same answer, with fewer additions and far less chance of skipping a month.

### The inclusive trap

If instead you count both endpoints — "we were on site from the 15th through the 3rd" — the total is **295**, not 294. Neither answer is wrong; they answer different questions. The fix is to state the convention: for differences, exclude the start; for attendance and occupancy, include both. Systems that silently mix the two produce the classic off-by-one bug.

## Worked example 2: business days

Weekends have to be removed, and the cleanest way is to count in whole weeks.

Take **Monday 2 March 2026 to Friday 27 March 2026, including both ends**. That span is 26 calendar days: three complete Monday-to-Sunday weeks (2–8, 9–15, 16–22) covering 21 days, plus Monday 23rd through Friday 27th covering 5 more.

- Three full weeks × 5 working days = **15**
- Final Monday-to-Friday stretch = **5**
- Total = **20 business days**

The general rule for spans of any size:

**Business days = total calendar days − weekend days − holidays**

Two caveats make or break the answer. First, holidays are not the same in every country, state or company: if the span includes a public holiday, it is subtracted once, and the correct count depends on which calendar you are using. Second, you must decide whether the start date counts — here it does, because both endpoints are working days; if the span had started on Saturday, including it would add nothing.

For recurring schedules, the trap is different: "add 5 business days" from a Friday lands on Friday of the following week, because Saturday and Sunday do not advance the counter. Rolling a date forward one calendar day and rolling it forward one business day are unrelated operations.

## Completed years versus elapsed days

Two different questions hide behind "how old is it". Elapsed days is a subtraction. Completed years is a calendar walk, and the two answers do not convert cleanly into each other.

Worked: someone born on **12 June 2000**, today **8 October 2026**.

Completed calendar walk:

- 12 June 2000 → 12 June 2026 = **26 years**
- 12 June → 12 July → 12 August → 12 September = **3 months**
- 12 September → 8 October = **26 days**

Answer: **26 years, 3 months and 26 days**. Note that the last segment is 26 days, not 25: September has 30 days, so 30 − 12 = 18 days remain in September, plus 8 days of October.

### Why 365-day years lie

The same period in pure days: 26 years × 365 = 9,490 days, plus six leap days (29 February 2004, 2008, 2012, 2016, 2020 and 2024 — 2000's leap day fell before 12 June and is outside the span) = **9,496 days** from 12 June 2000 to 12 June 2026. Adding the 118 days from 12 June to 8 October 2026 (18 + 31 + 31 + 30 + 8) gives **9,614 days** in total.

Dividing 9,614 by 365 gives 26.34 years, which rounds to "26 years" but discards the months entirely. Divide by 365.25 and you get 26.32 — closer to the true average, still wrong for any individual date. Dates are not multiples of 365; that is precisely why calendars exist.

## Time zones and the date line

Calendar arithmetic assumes everyone agrees on what day it is, and they do not. Three rules prevent the classic failures:

1. **Store instants in UTC, display in local time.** A meeting recorded as 2026-10-10T23:30+09:00 (Tokyo) is a single moment; converting it to Los Angeles time gives 07:30 the same day — ten hours earlier on the clock, before any travel happens.
2. **Crossing the date line moves the day, not the flight.** A plane leaving Tokyo at 23:30 on 10 October and flying about ten hours lands in Los Angeles at roughly 17:30 on 10 October. Ten real hours have passed, yet the arrival clock reads eight hours earlier than the departure clock, because the calendar date steps back by one day as the aircraft crosses the line eastward — and because Tokyo and Los Angeles sit sixteen hours apart to begin with.
3. **Comparing local dates without offsets is meaningless.** "It arrived yesterday" is ambiguous between two different twenty-four-hour periods; ISO 8601 strings with explicit offsets are not.

Daylight saving adds a fourth wrinkle. In zones that spring forward, a night is only 23 hours long: a reminder scheduled for "the same time tomorrow" arrives 23 real hours later, while a reminder scheduled as elapsed time fires an hour later on the clock than you pictured. India does not observe daylight saving, but servers, email clients and users in the United States, Europe and Australia do — and any date range that crosses their changeover includes a day that is an hour shorter than its neighbours.

## Four shortcuts that are usually wrong

1. **"Every month has 30 days."** A 360-day year drifts five days behind the calendar every year — two weeks off after three years, a month off after six.
2. **"Every year has 365 days."** Across a forty-year span this ignores about ten leap days, which is exactly the error that makes naive age and tenure calculations disagree with the real one.
3. **Adding months to the 31st.** "Three months from 31 March" is 31 June, which does not exist. Clamping to the last valid day of the target month — 30 June — is the convention used by billing systems, and it is why a subscription started on the 31st quietly migrates to the 30th.
4. **Mixing inclusive and exclusive counts.** One in a subtraction, the other in an attendance count, and the two never meet. Write the convention down at the start of any calculation that other people will check.

## Try it yourself

Check the arithmetic with tools rather than by hand when the span is long. The [date difference calculator](/date-difference-calculator.html) returns calendar days, weeks and months between any two dates, the [business days calculator](/business-days-calculator.html) strips weekends out of a span, the [age calculator](/age-calculator.html) works completed years, months and days, the [leap year calculator](/leap-year-calculator.html) tests the three-clause rule, the [week number calculator](/week-number-calculator.html) gives the ISO week for any date, the [time duration calculator](/time-duration-calculator.html) handles hours, minutes and seconds, and the [date calculator](/date-calculator.html) adds or subtracts any number of days, weeks, months or years from a start date.`,
    category: 'Date & Time',
    readTime: '8 min read',
    date: '2026-09-28',
    icon: Calendar,
    path: 'date-calculation-guide.html'
  },
  {
    id: 14,
    title: 'How Much Concrete Do You Need? Slabs, Bags and Ready-Mix',
    excerpt: 'Work out concrete volume for slabs, paths and footings in metric and imperial units, add the waste margin, and choose between bags or ready-mix.',
    content: `Concrete is ordered by volume and paid for by the cubic metre or cubic yard, and the two ways the job goes wrong are ordering too little — leaving a cold joint in the middle of a slab — or ordering too much, paying for a truckload that sets in the mixer. Both are avoidable with one multiplication and a waste allowance.

This guide works the volume formula in metric and imperial units, converts volume into bag counts and ready-mix loads, gives typical slab thicknesses and mix strengths, and finishes with an ordering checklist you can hand to a supplier.

## The volume formula

**Volume = length × width × depth**

Every dimension must be in the same unit before you multiply. Mixing centimetres and metres, or inches and feet, is the single most common cause of a short order.

### Worked example: a metric patio

A patio 4 m × 3 m poured 100 mm deep:

1. Convert depth: 100 mm = 0.1 m.
2. Volume = 4 × 3 × 0.1 = **1.20 m³**.
3. With a 10% waste allowance: 1.20 × 1.10 = **1.32 m³** to order.

### Worked example: an imperial patio

A 10 ft × 10 ft slab at 4 inches thick:

1. Convert depth: 4 ÷ 12 = 0.333 ft.
2. Volume = 10 × 10 × 0.333 = **33.3 cu ft**.
3. Convert to cubic yards (ready-mix is sold by the yard): 33.3 ÷ 27 = **1.23 cu yd**.
4. With 10% waste: 1.23 × 1.10 = **1.36 cu yd**.

Two conversion constants to memorise: **27 cu ft = 1 cu yd**, and **1 m³ = 35.3 cu ft = 1.307 cu yd**.

## The waste allowance

| Job | Waste factor | Why |
|---|---|---|
| Level, simple slab on compacted base | 5% | Clean forms, little spillage |
| Paths, steps, uneven ground | 10% | Cuts, crowning, sub-grade variation |
| Reinforced or complex formwork | 10–15% | Rebar displacement, difficult corners |
| First-time DIY pour | 15% | Mixing, tipping and finishing losses |

Under-ordering by even 0.1 m³ mid-pour is a serious problem: fresh concrete cannot be paused, and a second batch that arrives hours later creates a weak plane where the two loads meet. Slightly over-ordering is far cheaper than running out.

## Bags versus ready-mix

**Bagged mix** suits anything you can place before it stiffens — a post footing, a set of steps, a patch. Typical yields:

| Bag | Approximate yield |
|---|---|
| 20 kg bag | 0.010 m³ (0.35 cu ft) |
| 25 kg bag | 0.0125 m³ (0.44 cu ft) |
| 50 kg bag | 0.018–0.020 m³ (0.63–0.70 cu ft) |
| 60 lb bag (US) | 0.45 cu ft (0.0127 m³) |
| 80 lb bag (US) | 0.60 cu ft (0.017 m³) |

For our 1.32 m³ patio: at 0.020 m³ per 50 kg bag, **66 bags** — about 1.3 tonnes of material to carry, mix and place. In imperial terms: 46.6 cu ft ÷ 0.60 = **78 eighty-pound bags**.

Always read the yield printed on the specific bag in front of you; mixes differ, and the stated yield accounts for the water the manufacturer expects you to add.

**Ready-mix (transit-mixed concrete)** arrives wet and is pumped or barrowed into place. It makes sense above roughly 1–1.5 m³ because:

- Suppliers typically have a **minimum load** — often around 1 cubic yard / 1 cubic metre — plus a short-load fee below that.
- The cost per cubic metre falls sharply once you clear the minimum.
- A truck places in minutes what takes a DIY crew a full day.

Order 5–10% above your calculated volume to cover over-excavation, and tell the driver about access, pump requirements and the slump you need before the truck leaves the yard.

## Typical slab thicknesses

| Application | Common thickness | Notes |
|---|---|---|
| Interior floor on grade | 100 mm (4 in) | On vapour barrier and compacted base |
| Garden patio / path | 100 mm (4 in) | Edge restraint essential |
| Driveway | 125–150 mm (5–6 in) | Usually with mesh or fibre reinforcement |
| Heavily loaded commercial slab | 150–200 mm (6–8 in) | Engineer's specification |
| Strip footing | 200–300 mm (8–12 in) | Depends on soil and wall loads |

Thickness is governed by load, sub-grade and local building code — the table is a starting point for a conversation with your inspector, not a substitute for one. A slab on poor soil needs a thicker section or a better base regardless of what the patio catalogue says.

## Choosing a mix strength

| Use | Typical strength |
|---|---|
| Kerbs, non-structural paths | 20 MPa (≈ 3,000 psi) |
| Residential patio, floor slab | 25 MPa (≈ 3,600 psi) |
| Driveway, exposed to de-icing | 30 MPa (≈ 4,000 psi) |
| Footings, foundations | 25–30 MPa, as specified |
| Structural columns and beams | 30–40 MPa, engineer-specified |

Stronger is not automatically better for flatwork: very high-strength mixes set faster, generate more heat and shrink more, which can mean more cracking on an unreinforced patio. Match the mix to the exposure and the specification.

## Other shapes

**Circular slab** — volume = π × radius² × depth. A 3 m diameter circle, 100 mm deep: 3.1416 × 1.5² × 0.1 = **0.71 m³** (0.78 m³ with 10% waste).

**Rectangular footing trench** — length × width × depth along the whole run. A 12 m trench, 0.4 m wide, 0.5 m deep: 12 × 0.4 × 0.5 = **2.4 m³**.

**Steps** — treat each step as a small slab: tread × riser × step width, summed. For a typical 1.2 m wide step with a 0.30 m tread and a 0.18 m riser: 0.30 × 0.18 × 1.2 = 0.065 m³ each, and a four-step flight is **0.26 m³** plus waste.

**Circular post footing** — π r² d. A 300 mm diameter hole, 1 m deep: 3.1416 × 0.15² × 1.0 = **0.071 m³** per hole; ten holes is 0.71 m³.

## The ordering checklist

1. Measure twice, in one consistent unit — write the units down.
2. Calculate volume for each separate pour, not the whole project at once.
3. Add the waste factor appropriate to the job.
4. Round up; concrete suppliers quote in load sizes.
5. Confirm bag yields from the packaging, or the minimum load from the supplier.
6. Check access: can a truck reach the pour, or is a pump needed?
7. Have your forms, reinforcement and base compacted **before** you confirm the order.
8. Ask about setting time and finishing conditions for the day's forecast — hot, windy weather accelerates set and changes the finishing window.

## Pour-day mistakes that cost money

| Mistake | Consequence | Prevention |
|---|---|---|
| Forms not staked or braced | Blowout mid-pour and hours of cleanup | Stake every 60–90 cm and check diagonals for square |
| No compacted sub-base | Settling and cracking within a season | 100–150 mm crushed rock, compacted in lifts |
| Dry-trowelling the surface | Dusting and rapid surface failure | Finish only after bleed water has disappeared |
| Pouring in direct sun | Skin sets before you can finish | Work in the cooler part of the day or use a retarder |
| No control joints | Random cracking as the slab shrinks | Saw-cut within 6–12 hours |
| Walking on it too early | Footprints and a weakened surface | Keep off for 24–48 hours |
| Skipping curing | Surface dust and reduced strength | Water, membrane or curing compound for seven days |

Control joints deserve emphasis: a 100 mm slab wants joints roughly every 1.5–2 m, cut before cracking decides for you. Concrete shrinks as it hydrates, and a joint is simply an invitation to crack along a straight line you chose.

Curing is the step most DIY pours skip. Concrete gains strength from a chemical reaction with water rather than from drying — keep it damp for a week and the same mix reaches far more of its designed strength than a slab left to bake in the sun.

## Estimating the cost before you order

Three components make up the bill:

- **Material:** bagged mix is priced per bag and convenient in small quantities; ready-mix is priced per cubic metre plus a delivery or short-load charge, and becomes cheaper per unit above the supplier's minimum.
- **Labour:** entirely location-dependent, and often larger than the material on anything structural.
- **Hidden items:** formwork timber, stakes, rebar or mesh, plastic sheeting, joint sealer, curing compound, and plant hire if you need a compactor or a mixer.

Ask for a delivered price per cubic metre including everything, then compare it honestly against bag prices with your own labour counted. On jobs above about 1.5 m³, ready-mix almost always wins on both cost and finish; below that, bags win on flexibility.

## Curing, strength and waiting times

Strength is not a single number. Concrete is specified by its 28-day strength — typically 20–30 MPa for domestic work — but it earns a large share of that within the first week if it stays hydrated:

| Age of concrete | Approximate share of design strength |
|---|---|
| 1 day | 15–25% |
| 3 days | 40–50% |
| 7 days | 65–75% |
| 28 days | 100% (the design figure) |

Light foot traffic is usually acceptable after 24–48 hours on a domestic slab, but full service — parked cars, delivery vehicles, furniture on a suspended floor — waits for the 28-day figure. Cold weather slows hydration sharply: below about 5°C the reaction crawls, and insulated blankets stop being optional. Hot weather does the opposite, accelerating the set and raising the risk of plastic shrinkage cracks before finishing is finished.

## Try it yourself

Run the numbers before you call anyone. The [concrete calculator](/concrete-calculator.html) works slabs and footings, the [cubic yards calculator](/cubic-yards-calculator.html) handles unit conversion for imperial orders, the [cement calculator](/cement-calculator.html) estimates materials for a site-mixed batch, and the [gravel calculator](/gravel-calculator.html) covers the sub-base you need under the slab in the first place.`,
    category: 'Construction',
    readTime: '8 min read',
    date: '2026-09-16',
    icon: Hammer,
    path: 'concrete-calculator-guide.html'
  },
  {
    id: 18,
    title: 'Binary Numbers Explained: Convert, Add and Read Bits by Hand',
    excerpt: 'Base 2 is positional notation with two digits. Learn the powers-of-two table, convert both directions by hand, do binary addition and see why computers use it.',
    content: `Binary is not a different kind of mathematics; it is the same positional notation you have used since childhood, run with two digits instead of ten. Every rule that makes 347 mean three hundreds, four tens and seven units works identically with ones, twos, fours and eights — the only thing that changes is the base.

Once that clicks, conversions become short exercises rather than tricks, and the strange numbers in computing — 1,024 bytes in a kilobyte, 4,294,967,296 addresses in a 32-bit system, a hard drive showing 466 GiB out of a advertised 500 GB — stop being arbitrary.

## Positional notation: base 10 beside base 2

In base 10, the number 347 is unpacked as:

**3 × 100 + 4 × 10 + 7 × 1**

Each column is ten times the column to its right, because the base is 10. In base 2, each column is twice the column to its right, because the base is 2. So 1101 is:

**1 × 8 + 1 × 4 + 0 × 2 + 1 × 1 = 13**

The digits are read from the right, starting at position 0:

| Bit position | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|---|
| Power of two | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| Example digit in 10110101 | 1 | 0 | 1 | 1 | 0 | 1 | 0 | 1 |

Two digits only — 0 and 1 — because each position holds one binary digit, or **bit**, and a bit is a single yes-or-no answer.

## Decimal to binary: two reliable methods

### Method 1: repeated division by two

Divide the number by 2 repeatedly, recording each remainder, then read the remainders from the last one back to the first.

Worked: convert **13**.

| Division | Quotient | Remainder |
|---|---|---|
| 13 ÷ 2 | 6 | 1 |
| 6 ÷ 2 | 3 | 0 |
| 3 ÷ 2 | 1 | 1 |
| 1 ÷ 2 | 0 | 1 |

Reading the remainders upwards — 1, 1, 0, 1 — gives **1101**.

### Method 2: subtract the largest powers of two

Find the largest power of two that fits, subtract it, and mark that position with a 1; positions you skip get a 0.

Worked: convert **100**.

- Largest power that fits: 64 → 100 − 64 = **36**, bit 6 set
- Next: 32 fits 36 → 36 − 32 = **4**, bit 5 set
- 16 and 8 do not fit 4 → bits 4 and 3 are **0**
- 4 fits → 4 − 4 = **0**, bit 2 set
- 2 and 1 do not fit → bits 1 and 0 are **0**

Reading positions 6, 5 and 2: **1100100**. Check: 64 + 32 + 4 = 100 ✓.

Both methods produce the same string; division is faster mechanically, subtraction shows you which magnitudes make up the number.

## Binary to decimal: one worked example

Convert **10110101** by adding the powers of two where a 1 appears:

| Position | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|---|
| Bit | 1 | 0 | 1 | 1 | 0 | 1 | 0 | 1 |
| Value | 128 | 0 | 32 | 16 | 0 | 4 | 0 | 1 |

128 + 32 + 16 + 4 + 1 = **181**. The zero positions contribute nothing, which is why reading zeros quickly — and never accidentally adding them — is the whole skill.

## The powers-of-two table

Memorising the first eleven values removes almost all friction:

| Power | 2⁰ | 2¹ | 2² | 2³ | 2⁴ | 2⁵ | 2⁶ | 2⁷ | 2⁸ | 2⁹ | 2¹⁰ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Value | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1,024 |

From there the larger milestones fall out: 2²⁰ = 1,048,576 and 2³⁰ = 1,073,741,824, which is why a "megabyte" of memory is 1,048,576 bytes while a megabyte of storage marketed in decimal is 1,000,000.

### Why your 500 GB drive shows 466 GiB

Drive manufacturers count in powers of ten: 500 GB = 500 × 10⁹ = 500,000,000,000 bytes. Operating systems traditionally count in powers of two: 1 GiB = 2³⁰ = 1,073,741,824 bytes. Dividing:

**500,000,000,000 ÷ 1,073,741,824 ≈ 465.66**

So the same physical drive is 500 GB under the decimal standard and about 466 GiB under the binary one. Nothing is missing; two prefixes share one name. The IEC fixed this by naming the binary units distinctly — KiB, MiB, GiB, TiB — while keeping kB, MB, GB, TB for powers of ten.

## Why computers really use binary

A transistor is a switch, and a switch that can reliably sit in one of two states is far easier to build by the billion than one that must hold a precise continuous value. Modern logic signals are separated by fractions of a volt, and noise margins — the gap a signal must clear to be read correctly — are only comfortable when there are two clear levels to distinguish. Billions of switches flip billions of times a second; a scheme with a hundred distinguishable voltage levels per wire would need that level of precision to be correct every single time, and would fail far more often.

Binary also makes error detection cheap. Parity, checksums and cyclic redundancy checks all reduce to asking whether the count of 1s is even or odd — questions that have simple answers in base 2 and messy ones in base 10.

### Where binary gets stretched: multi-level flash

Solid-state storage breaks the strict two-state rule on purpose. A single-level cell stores one bit with two voltage states; a multi-level cell stores two bits by dividing the same voltage window into four levels, and a triple-level cell stores three bits across eight levels. The gains in density are real, so are the costs: the levels sit closer together, wear levelling and error correction work harder, and endurance falls with each extra bit packed in. The trade-off is visible — SLC lasts far longer than TLC — but the underlying representation is still binary to everything above the flash controller.

## Binary arithmetic

Addition works column by column exactly as in base 10, with the rule that 1 + 1 = 10 in binary: write 0, carry 1.

Worked: **1011 + 1101** (decimal 11 + 13).

| Step | Column | Operation | Result | Carry out |
|---|---|---|---|---|
| 1 | 2⁰ | 1 + 1 | 0 | 1 |
| 2 | 2¹ | 1 + 0 + 1 (carry) | 0 | 1 |
| 3 | 2² | 0 + 1 + 1 (carry) | 0 | 1 |
| 4 | 2³ | 1 + 1 + 1 (carry) | 1 | 1 |
| 5 | 2⁴ | carry alone | 1 | 0 |

The answer is **11000** — 16 + 8 = 24, matching 11 + 13 ✓.

The three basic logic operations are what processors actually run, and each has a truth table worth knowing by heart:

| A | B | A AND B | A OR B | A XOR B |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

XOR is the interesting one: it is addition without the carry, which is why it powers checksums, RAID parity, and the trick of swapping two variables without a temporary. AND masks off bits you do not want; OR sets bits you do.

## Hexadecimal: four bits at a time

Hexadecimal is base 16, using the digits 0–9 followed by A–F for ten through fifteen. Its only job in computing is to be a compact rendering of binary: four bits fit into exactly one hex digit, so conversion is transcription, not arithmetic.

**10110101** splits into nibbles **1011** and **0101**. 1011 = 11 = **B**, and 0101 = 5, so the byte is **B5** — written 0xB5. Checking against the decimal value from earlier: 11 × 16 + 5 = 176 + 5 = **181** ✓.

| Binary nibble | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 |
|---|---|---|---|---|---|---|---|---|
| Hex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| Binary nibble | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |
| Hex | 8 | 9 | A | B | C | D | E | F |

This is why colours are written as six hex digits — **#FF8800** is three bytes, one per channel — why file permissions are written **755** as three octal digits (111 101 111, or rwxr-xr-x), and why memory addresses appear as 0x7fff5fbff0a0. One notation, three conventions, all hiding the same bits.

## Bits, bytes and the 32-bit limit

Eight bits make a byte, and the byte is the smallest addressable chunk in most architectures. From there the limits follow directly from the powers of two:

- A 32-bit address space offers 2³² = **4,294,967,296** distinct addresses — which is why a 32-bit operating system caps out around 4 GB of address space in total, and roughly 3.2–3.5 GB of usable RAM once devices claim their share.
- A 64-bit address space offers 2⁶⁴ = **18,446,744,073,709,551,616** addresses — over eighteen quintillion, which is why no current machine runs out of address space and the migration to 64-bit was driven by memory and performance rather than by exhaustion.

The interesting part is that nothing physical changed when architectures moved from 32 to 64 bits: the transistors still hold two states. What widened was how many of them are read together at once.

## Try it yourself

Convert without reaching for a calculator, then check yourself against one. The [binary, hex and decimal converter](/binary-hex-decimal-converter.html) moves between all three bases at once, the [bitwise calculator](/bitwise-calculator.html) runs AND, OR, XOR, shifts and NOT on real values, the [base64 encoder](/base64-encoder.html) shows how text becomes a different binary alphabet for transport, the [JSON formatter](/json-formatter.html) handles the structured data that rides on top of all this, and the [programming calculator](/programming-calculator.html) keeps base conversion, bitwise work and everyday arithmetic in one place.`,
    category: 'Programming',
    readTime: '9 min read',
    date: '2026-09-14',
    icon: Binary,
    path: 'binary-numbers-guide.html'
  }
];

export default function Blog() {
  const params = useParams();
  const slug = params.slug;
  const [activeCategory, setActiveCategory] = useState('All');

  const article = slug ? articles.find(a => a.path === slug || a.path === `${slug}.html`) : null;

  if (article) {
    const Icon = article.icon;
    const articleUrl = `${BASE_URL}/blog/${article.path}`;
    const words = wordCount(article.content);
    return (
      <div className="pt-24 pb-12 px-6 md:px-12 max-w-3xl mx-auto">
        <Helmet>
          <title>{`${article.title} | TheCalHub Blog`}</title>
          <meta name="description" content={article.excerpt} />
          <link rel="canonical" href={articleUrl} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={article.title} />
          <meta property="og:description" content={article.excerpt} />
          <meta property="og:url" content={articleUrl} />
          <meta property="og:site_name" content="TheCalHub" />
          <meta property="article:published_time" content={article.date} />
          <meta property="article:section" content={article.category} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={article.title} />
          <meta name="twitter:description" content={article.excerpt} />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: article.title,
              description: article.excerpt,
              datePublished: article.date,
              wordCount: words,
              articleSection: article.category,
              author: { '@type': 'Organization', name: 'TheCalHub Editorial Team' },
              publisher: { '@type': 'Organization', name: 'TheCalHub' },
              mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl }
            })}
          </script>
        </Helmet>

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
              <div className="flex items-center gap-3 text-neutral-500 text-xs mt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.date)}
                </span>
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
          {renderBlocks(article.content)}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-neutral-500 text-sm">
            This article is general information for educational purposes only. It is not financial, medical or legal advice — check current rates, rules and regulations before making decisions, and speak to a qualified professional where it matters.
          </p>
          <Link
            to="/blog.html"
            className="inline-flex items-center gap-2 text-primary-fixed font-medium text-sm mt-6 group/link"
          >
            Browse all articles
            <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
  const visibleArticles = activeCategory === 'All' ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
      <Helmet>
        <title>TheCalHub Blog: Guides on Finance, Health, Math and Building</title>
        <meta
          name="description"
          content="Long-form guides with worked examples on EMI, SIP, BMI, calories, concrete and more — each one links to the free calculator you need."
        />
        <link rel="canonical" href={`${BASE_URL}/blog.html`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TheCalHub Blog: Guides on Finance, Health, Math and Building" />
        <meta
          property="og:description"
          content="Long-form guides with worked examples on EMI, SIP, BMI, calories, concrete and more — each one links to the free calculator you need."
        />
        <meta property="og:url" content={`${BASE_URL}/blog.html`} />
        <meta property="og:site_name" content="TheCalHub" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'TheCalHub Blog',
            description:
              'Long-form guides with worked examples on EMI, SIP, BMI, calories, concrete and more.',
            url: `${BASE_URL}/blog.html`,
            publisher: { '@type': 'Organization', name: 'TheCalHub' },
            blogPost: articles.map((a) => ({
              '@type': 'BlogPosting',
              headline: a.title,
              datePublished: a.date,
              url: `${BASE_URL}/blog/${a.path}`
            }))
          })}
          </script>
      </Helmet>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-primary-fixed" />
          <span className="text-primary-fixed font-bold uppercase tracking-wider text-sm">Blog</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Calculation Guides and Tutorials
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl">
          In-depth explainers on loans, investing, health and construction — every formula worked through with real numbers, and a link to the calculator that finishes the job for you.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              category === activeCategory
                ? 'bg-primary-fixed text-on-primary-fixed'
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleArticles.map((article) => {
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
