import type { CalculatorSEOContent } from './seo-data';

export const SEO_DATA_BATCH_D: Record<string, CalculatorSEOContent> = {
  'time-complexity-calculator': {
    title: "Read Your Loops with a Time Complexity Calculator",
    subtitle: "Time Complexity Calculator",
    introduction: "Two programs can print exactly the same table and still finish at wildly different times. The gap almost never comes from the language or the laptop — it comes from how much work each program does as the input grows, and that is precisely what time complexity measures. Instead of asking whether your code is slow, time complexity asks what happens when you double the rows: does the work double, quadruple, or explode? A time complexity calculator answers that by mapping your code structure onto the standard growth ladder — constant O(1), logarithmic O(log n), linear O(n), linearithmic O(n log n), quadratic O(n²), exponential O(2ⁿ) and factorial O(n!). Paste a snippet, compare it against the handful of patterns that cover most real code (single loops, nested loops, halving loops, branchy recursion), and copy the classification you need for a pull request, a query review or interview preparation.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Where the Classification Actually Comes From</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Complexity is not a stopwatch measurement. You count how many times the innermost statement executes as n, the size of the input, grows without bound, and then clean up the expression: drop constant multipliers and any terms that grow more slowly. The expression 3n + 50 does linear work plus a fixed overhead, so it collapses to O(n). The expression n² + 10n collapses to O(n²), because the squared term wins in the long run. Nothing about hardware, cache lines or language runtime enters the formula — which is why the same label transfers between Python, Java and C++.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Big-O is an upper bound on growth rather than a prediction of wall-clock time. O(n) means the work grows no faster than linear, which is why 2n is also O(n). When someone needs a tighter promise, they reach for Ω (a lower bound) or Θ (a tight bound on both sides). Interviews, code reviews and this tool all speak in worst-case O by default, so state the case explicitly whenever the best case differs — binary search is O(1) in the lucky case and O(log n) in the worst.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Reading a Snippet the Way a Reviewer Does</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Start at the innermost operation and ask one question: what controls this loop bound?
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400 leading-relaxed mb-6">
          <li><code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">for (i = 0; i &lt; n; i++)</code> — the bound is n, so O(n).</li>
          <li>Two independent loops over n — 2n operations, still O(n).</li>
          <li>Nested loops both bounded by n — n × n, so O(n²).</li>
          <li>A loop that halves or doubles its counter (<code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">while (low &lt; high)</code> with a midpoint, or <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">i *= 2</code>) — O(log n).</li>
          <li>An outer loop over n that performs a binary search inside — n × log n, so O(n log n).</li>
          <li>Recursion that calls itself twice per level, like naive <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">fib(n)</code> — the call tree doubles every level, so O(2ⁿ).</li>
          <li>Sorting a list and then scanning it once — O(n log n) + O(n), and the dominant O(n log n) term wins.</li>
        </ul>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The trap is assuming every pair of braces means quadratic. If the inner bound shrinks with the outer index, or is itself logarithmic, the class changes — exactly the case worth checking against the pattern list before you leave a review comment.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Always name the case you mean — worst, average or best. A complexity without a case label is ambiguous.</li>
            <li>Constants vanish from the label but not from production: 40n beats n² ÷ 20 for every n below 800.</li>
            <li>For database work, count rows scanned and round trips, not just lines of code.</li>
            <li>If a loop bound depends on data (hash collisions, sorted input), describe both the average and the worst case.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "What does the time complexity calculator actually analyze?", answer: "It maps your code structure onto the standard growth patterns — single loop, nested loops, halving loop, one-call and two-call recursion — and gives you the complexity class that pattern produces. You confirm the match against the pattern table on the page, then copy the label." },
      { question: "Why is 3n + 400 simplified to O(n)?", answer: "Constants and lower-order terms are dropped because they do not change how the work grows. 3n + 400 and n both double when n doubles; the +400 stays fixed. At n = 10 the constant dominates, at n = 1,000,000 it is noise, and Big-O only describes the long run." },
      { question: "Why is binary search O(log n) instead of O(n)?", answer: "Each comparison discards half of the remaining range. One million sorted records need at most 20 comparisons (2^20 = 1,048,576), while a linear scan may need all one million. The logarithm base is dropped in the label, so log base 2 and log base 10 are both written O(log n)." },
      { question: "What is the difference between O(n) and O(n log n)?", answer: "At one million items, a single linear pass is about one million operations while an O(n log n) sort performs roughly twenty million — one extra factor of about 20. The gap looks small next to O(n²) (one trillion operations at the same size), which is why O(n log n) is considered the practical target for general-purpose sorting." },
      { question: "When is O(n²) perfectly acceptable?", answer: "For small n. Sorting 100 items with a quadratic algorithm costs about 10,000 operations — nothing. Quadratic code only becomes painful in the tens of thousands of elements, and for very small inputs a simple O(n²) insertion sort can beat more complex algorithms because its constant factor is so low." },
      { question: "Can a nested loop be O(n log n) instead of O(n²)?", answer: "Yes, when the inner loop does not iterate n times. If the outer loop runs n times and the inner operation is a binary search, the cost is n × log n. Merge sort works the same way: log n levels of splitting, each level doing n work, gives n log n." },
      { question: "What is the difference between time and space complexity?", answer: "Time complexity counts executed operations as the input grows; space complexity counts the extra memory an algorithm allocates — arrays, hash maps and the call stack all count. Sorting a list in place is O(1) extra space, while recursion depth becomes memory: a recursion n levels deep uses O(n) space even if it allocates no variables." },
      { question: "Should I report best, average or worst case?", answer: "Worst case unless you say otherwise, because it is the guarantee you can rely on. Quicksort is the classic illustration: O(n log n) on average with a randomized pivot, but O(n²) if every pivot lands at the extreme end. Always label which one you are quoting." },
      { question: "Does a faster computer change the complexity of my code?", answer: "No. A faster machine shrinks constants, not growth. Doubling CPU speed buys you roughly one extra doubling of input for a linear algorithm, but it does nothing about an exponential one: O(2ⁿ) still doubles its work with each extra element no matter how fast the hardware is." },
      { question: "Is my code uploaded when I use this tool?", answer: "No. The page runs entirely in your browser. Your snippet is never sent to a server, stored, or logged." }
    ],
    relatedCalculators: [
      { name: 'Big-O Analyzer', path: '/big-o-analyzer.html' },
      { name: 'Binary/Hex/Decimal', path: '/binary-hex-decimal-converter.html' },
      { name: 'Programming Calculator', path: '/programming-calculator.html' },
      { name: 'Regex Tester', path: '/regex-tester.html' }
    ],
    howWeCalculate: {
      formula: "work(n) → drop constant multipliers and lower-order terms → O(fastest-growing term)",
      explanation: "Count how often the innermost statement runs as n grows, write that count as a function of n, then discard constants and slower-growing terms. Only the fastest-growing term decides the class, so 3n² + 100n + 500 becomes O(n²) and n log n + 5n becomes O(n log n).",
      example: "for (i = 0; i < n; i++) runs the body n times → n → O(n)"
    },
    workedExample: {
      scenario: "A function loops over n records and runs a binary search inside a sorted index for each one",
      steps: [
        "Outer loop: the body runs once for each of the n records",
        "Inner operation: binary search halves the range each step, so about log₂ n comparisons per record",
        "Multiply the layers: n × log₂ n total comparisons",
        "Clean up: no constants or smaller terms remain, so the class stands as written"
      ],
      result: "O(n log n) — linear work per record plus a logarithmic search"
    },
    commonValues: {
      heading: "How each growth class behaves at n = 1,000",
      columns: ["Class", "Operations at n = 1,000", "Real-world reading"],
      rows: [
        ["O(1)", "1", "Hash lookup, array index"],
        ["O(log n)", "≈ 10", "Binary search"],
        ["O(n)", "1,000", "Scan every row once"],
        ["O(n log n)", "≈ 10,000", "Merge sort, heap sort"],
        ["O(n²)", "1,000,000", "Nested loops over the input"],
        ["O(2ⁿ)", "2^1000 ≈ 1.07 × 10³⁰¹", "Naive recursive Fibonacci"],
        ["O(n!)", "1000! ≈ 4 × 10²⁵⁶⁷", "Generate every permutation"]
      ]
    }
  },
  'big-o-analyzer': {
    title: "Rank Any Algorithm with a Big-O Analyzer",
    subtitle: "Big-O Notation Analyzer",
    introduction: "Ask five developers why one function beats another and you will get five different answers: it is the cache, it is the JIT, it is the database. Big-O notation is the shared language that cuts through that argument, because it describes only one thing — how the cost of an algorithm grows as the input gets bigger. A Big-O analyzer organizes the seven classes every programmer is expected to know, ranks them from best to worst with a plain efficiency tag, and attaches a real algorithm to each one: hash table lookup at O(1), binary search at O(log n), merge sort at O(n log n), recursive Fibonacci at O(2ⁿ). It also pairs the classes with concrete complexities you will meet in production code — O(V + E) for graph traversal, O(E log V) for Dijkstra's shortest path — plus a quick reference for what n, V and E stand for, so you can compare two candidate solutions before you write either of them.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Growth Ladder, in Strict Order</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          From fastest to slowest, the classes every analyzer should rank the same way: <strong className="text-white">O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ) &lt; O(n!)</strong>. Constant time never looks at the input size. Logarithmic time halves the problem each step. Linear time touches every element once. Linearithmic time adds one logarithmic factor on top of a pass — the accepted cost of comparison-based sorting, which cannot do better than Ω(n log n). Quadratic time squares the input. Exponential time adds one operation per extra element. Factorial time is worse still: it explores every ordering of the input.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The ordering matters more than the labels. At n = 1,000, O(n) costs 1,000 operations while O(n²) costs 1,000,000 — and at n = 1,000,000 the gap becomes 1,000 versus 1,000,000,000,000. Exponential classes leave the universe of computable work behind quickly: 2¹⁰⁰ already has 31 digits. If a feature scales with exponential complexity, the fix is almost never a faster loop; it is a different algorithm.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">The Comparisons That Actually Settle Arguments</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          O(n) versus O(log n): searching one million sorted records takes at most one million comparisons linearly, but at most twenty with binary search — a fifty-thousand-fold difference for the same data. O(n) versus O(n log n): the logarithmic factor is genuinely small (about 20 at a million items), so linear scans stay preferable when the data is already in memory, while sorting to enable fast repeated lookups pays for itself after a handful of searches.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          O(n log n) versus O(n²): at one million items, twenty million operations versus one trillion. That is the difference between a responsive feature and a timeout. And when two algorithms share a class, the label stops helping — cache locality, branch prediction and constant factors decide the winner, which is why insertion sort still beats quicksort on tiny arrays even though both are discussed as comparison sorts.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Big-O is an upper bound; Θ is a tight bound and Ω is a lower bound. Say Θ(n log n) when you want to claim the algorithm is exactly that fast.</li>
            <li>Amortized claims deserve a label too: a dynamic array push is O(1) amortized but O(n) on the single push that triggers a resize.</li>
            <li>Hash tables are O(1) average and O(n) worst case — always quote both when the keys come from user input.</li>
            <li>When the classes match, stop reasoning about Big-O and start measuring.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "What does O(n) actually mean?", answer: "That the running time grows no faster than some constant times n as the input grows. It is an upper bound: an algorithm doing 3n + 50 operations is O(n), and so is one doing n operations. If you need to state that growth is both bounded above and below by n, the notation for that is Θ(n)." },
      { question: "Why do we ignore constant factors in Big-O?", answer: "Because they do not change the growth curve. 100n + 500 and n² meet near n = 100; below that the linear version is slower in absolute terms, above it the quadratic version runs away. Big-O describes what happens as n grows without bound, where constants and additive terms stop mattering — though in production those constants still decide which of two O(n) functions wins." },
      { question: "How much faster is O(log n) than O(n)?", answer: "For one million elements, linear search may need 1,000,000 comparisons while binary search needs at most 20, because each comparison discards half the remaining range. At ten million elements the linear scan needs 10,000,000 and binary search needs about 24 — the ratio keeps widening with every doubling of the input." },
      { question: "Is O(n log n) nearly as good as O(n)?", answer: "Asymptotically yes, practically it depends on the multiplier. At one million items the log factor is roughly 20, so an O(n log n) pass costs about twenty times a linear pass. Compared with O(n²) at the same size (a factor of one million), O(n log n) is close to linear — which is why it is the target for sorting and for database index builds." },
      { question: "What does amortized O(1) mean?", answer: "That the average cost per operation over a long sequence is constant even though a single operation can occasionally cost more. A dynamic array doubles its storage when it fills: n pushes cost about n + n/2 + n/4 + … ≈ 2n operations total, so each push averages O(1) — but the push that triggers the copy alone is O(n)." },
      { question: "Why is a hash table O(1) but also sometimes O(n)?", answer: "Lookups are O(1) on average because a good hash spreads keys across buckets so each one holds a couple of entries. If many keys collide into one bucket, that bucket degrades into a linear scan, making a single lookup O(n). Modern engines add tree fallbacks to cap the damage, but the theoretical worst case stays linear." },
      { question: "What is space complexity?", answer: "The extra memory an algorithm needs as the input grows, beyond the input itself. An in-place sort is O(1) auxiliary space, recursion reserves space proportional to its depth (O(n) for a chain of n calls), and a memo table for dynamic programming is O(n) if it stores one entry per state." },
      { question: "What are Ω and Θ notation?", answer: "Ω(n) states a lower bound — the algorithm is at least that slow in the given case. Θ(n) states a tight bound — both O(n) and Ω(n) hold. Merge sort is Θ(n log n) in every case, while quicksort is O(n log n) average and O(n²) worst, with Ω(n log n) lower bound for comparison-based sorts." },
      { question: "Does Big-O predict how long my program takes?", answer: "No. It predicts how the time scales. Two functions that are both O(n) can differ tenfold because of cache behaviour, allocation and instruction counts, and an O(n log n) algorithm with great locality can beat an O(n) algorithm that jumps randomly through memory at realistic sizes. Big-O eliminates candidates; profiling picks the winner." },
      { question: "Do I need to install anything to use this analyzer?", answer: "No. The analyzer runs in your browser with no install, no account and no upload — the notation list, algorithm table and reference values are all available the moment the page loads." }
    ],
    relatedCalculators: [
      { name: 'Time Complexity', path: '/time-complexity-calculator.html' },
      { name: 'Programming Calculator', path: '/programming-calculator.html' },
      { name: 'Code Beautifier', path: '/code-beautifier.html' },
      { name: 'Regex Tester', path: '/regex-tester.html' }
    ],
    howWeCalculate: {
      formula: "O(f(n)) = fastest-growing term of work(n), with constants and lower-order terms removed",
      explanation: "Write the exact operation count as a function of n, expand it, and keep only the term that dominates as n approaches infinity. Terms that are multiplied by constants (7n → n) and terms added beneath a stronger term (n² + n → n²) are discarded, because they cannot change the growth rate.",
      example: "3n² + 100n + 500 → drop 100n and 500 → drop the 3 → O(n²)"
    },
    workedExample: {
      scenario: "Comparing a full linear scan against binary search over 1,000,000 sorted records",
      steps: [
        "Linear search checks records one by one: worst case is one comparison per record",
        "Worst-case comparisons = 1,000,000 → O(n)",
        "Binary search halves the range on every comparison: ⌈log₂ 1,000,000⌉ = 20 comparisons",
        "20 comparisons → O(log n)"
      ],
      result: "1,000,000 versus 20 comparisons — O(n) vs O(log n)"
    },
    commonValues: {
      heading: "Growth ladder at n = 1,000",
      columns: ["Notation", "Name", "Operations at n = 1,000"],
      rows: [
        ["O(1)", "Constant", "1"],
        ["O(log n)", "Logarithmic", "≈ 10"],
        ["O(n)", "Linear", "1,000"],
        ["O(n log n)", "Linearithmic", "≈ 10,000"],
        ["O(n²)", "Quadratic", "1,000,000"],
        ["O(2ⁿ)", "Exponential", "2^1000 ≈ 1.07 × 10³⁰¹"],
        ["O(n!)", "Factorial", "1000! ≈ 4 × 10²⁵⁶⁷"]
      ]
    }
  },
  'binary-hex-decimal-converter': {
    title: "Switch Bases with a Binary Hex Decimal Converter",
    subtitle: "Binary/Hex/Decimal Converter",
    introduction: "The string 0xFF tells a machine exactly one thing and tells most people nothing, yet hexadecimal is the notation behind memory addresses, colour codes, file permissions and every hex dump you will ever read. The reason is arithmetic: each hexadecimal digit packs exactly four binary digits, so a byte of data reads as two hex characters instead of eight ones and zeros, while every hex value converts back to decimal with nothing more than place-value multiplication. This binary hex decimal converter keeps four fields in sync at once — decimal, binary, hexadecimal and octal — so typing in any one of them updates the other three instantly. Use it to translate a colour token into bits for a graphics routine, check what 65535 means for a 16-bit register, confirm that 4096 is a clean power of two in every base, or work through the preset values developers reach for daily without reaching for a calculator.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Why Hexadecimal Exists at All</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Positional notation means each digit position represents the base raised to a power: in base 16, the positions are 16⁰, 16¹, 16² and so on. Because 16 = 2⁴, one hex digit corresponds to exactly four binary digits (a nibble), so conversion is mechanical grouping rather than arithmetic. The binary string 1111 1111 splits into two nibbles, 1111 and 1111, each of which is 15, and 15 is written F — so 11111111 is FF, which is 255 in decimal. Two hex digits therefore always cover one byte, four cover a 32-bit word, and eight cover a 64-bit word.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          This is why hex dominates low-level work. A CSS colour such as <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">#FF5733</code> is three bytes of red, green and blue. A pointer such as 0x7fff5fbff700 is readable as a digit string but still shows the bit structure at a glance. Octal survives in the same niche because three bits fit one octal digit perfectly: the permission string 0755 is three groups of three bits, each group readable as rwx flags.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Converting by Hand, Both Directions</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Decimal to any base uses repeated division: divide by the base and keep the remainder, then divide the quotient again until it reaches zero, reading the remainders upwards. For 255 into hex: 255 ÷ 16 = 15 remainder 15, then 15 ÷ 16 = 0 remainder 15. Read upwards, both remainders are 15 = F, giving FF. The reverse direction is place-value multiplication: 0x2F means 2 × 16 + 15 = 47, and 0x1A3 means 1 × 256 + 10 × 16 + 3 = 419.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          One boundary matters: these conversions describe unsigned magnitudes. Real machines store negative numbers in two's complement, where the highest bit is the sign. In an 8-bit register, −13 becomes 256 − 13 = 243, which is 11110011 in binary and F3 in hex. Our converter keeps a visible minus sign for readability, so if you need the encoded bit pattern of a negative value, convert the magnitude and then apply two's complement yourself.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Prefixes remove the guessing: 0x1F is hex (31), 0b11111 is binary (31), 0o37 is octal (31).</li>
            <li>Leading zeros are dropped by display conversions, so a byte written 007 appears as 7 — pad manually when the fixed width matters.</li>
            <li>1024 = 0x400 and 4096 = 0x1000 are powers of two; if a hex value ends in zeros like 1000, it is almost certainly a size or alignment constant.</li>
            <li>Pick a byte boundary (FF, FFFF, FFFFFFFF) and you instantly know the register width you are working with.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "How do I convert decimal 255 to hexadecimal?", answer: "Divide repeatedly by 16 and collect the remainders: 255 ÷ 16 = 15 remainder 15, then 15 ÷ 16 = 0 remainder 15. Reading the remainders upwards gives FF, because 15 is written as F. Verify by place value: 15 × 16 + 15 = 240 + 15 = 255." },
      { question: "Why does one byte always need exactly two hex digits?", answer: "A byte is 8 bits and a hex digit carries 4 bits (16 = 2⁴), so 8 ÷ 4 = 2 digits. The nibble boundary is exact: 1111 = F, so the byte 11111111 splits into FF with no remainder — that clean fit is the entire reason hex became the standard notation for bytes." },
      { question: "How many binary digits are in one decimal digit?", answer: "Any single decimal digit (0 through 9) fits into four bits, but it carries log₂10 ≈ 3.32 bits of information, while one bit carries only log₁₀2 ≈ 0.30 decimal digits. So ten decimal digits encode about 33 bits: 10,000,000,000 sits between 2³³ (8,589,934,592) and 2³⁴ (17,179,869,184). The reverse rule of thumb is that 10 bits hold roughly three decimal digits." },
      { question: "What do the prefixes 0x, 0b and 0o mean?", answer: "They declare the base so the parser does not guess: 0x is hexadecimal (0x1F = 31), 0b is binary (0b11111 = 31) and 0o is octal (0o37 = 31). JavaScript, Python and C-family languages all accept these prefixes; writing a value that starts with a zero and no prefix, such as 0755, is how accidental octal interpretation bites people in C-style languages — and how Python 3 and strict-mode JavaScript end up throwing a syntax error instead." },
      { question: "How are negative numbers represented in binary?", answer: "Most systems use two's complement: invert every bit of the magnitude and add one. For 8-bit −13: 13 is 00001101, invert to 11110010, add one to get 11110011 (243 decimal, F3 hex). The same rule makes −1 all ones (11111111), which is why unsigned and signed ranges differ: 0–255 versus −128 to 127 for eight bits." },
      { question: "What is the largest value in 32-bit unsigned and signed form?", answer: "Unsigned 32-bit maxes out at 4,294,967,295, written 0xFFFFFFFF. Signed 32-bit reserves one bit for the sign, so it runs from −2,147,483,648 (0x80000000) to 2,147,483,647 (0x7FFFFFFF). Adding 1 to the signed maximum wraps to the minimum — the classic integer overflow bug." },
      { question: "Why does octal still exist?", answer: "Because three bits map exactly onto one octal digit, which is how Unix file permissions are written: 0755 is 111 101 101, giving rwx for the owner and r-x for group and other. Octal also survived on 12- and 36-bit machines where bits grouped in threes, and it lives on as Python's 0o prefix and in legacy address dumps." },
      { question: "How do I convert hex to decimal without a calculator?", answer: "Multiply each digit by its positional power of sixteen and add. For 0x1A3: the digits are 1, A (10) and 3, so 1 × 16² + 10 × 16¹ + 3 × 16⁰ = 256 + 160 + 3 = 419. The same method works in any base — binary is just powers of two." },
      { question: "Can this tool convert floating-point numbers?", answer: "It converts integers between bases. Fractions require the IEEE 754 format, where a value is split into sign, exponent and mantissa bits. Note that most decimals have no exact binary form: 0.1 is the repeating binary fraction 0.00011001100110011…, which is why 0.1 + 0.2 is not exactly 0.3 in floating point." },
      { question: "Does any of my input leave the browser?", answer: "No. Conversion happens locally in the page: nothing you type is transmitted, logged or saved, so it is safe to use with internal addresses, tokens or keys." }
    ],
    relatedCalculators: [
      { name: 'Bitwise Calculator', path: '/bitwise-calculator.html' },
      { name: 'Memory Size', path: '/memory-size-calculator.html' },
      { name: 'Hash Generator', path: '/hash-generator.html' },
      { name: 'Programming Calculator', path: '/programming-calculator.html' }
    ],
    howWeCalculate: {
      formula: "value = Σ (digitᵢ × baseⁱ)  ·  reverse: repeatedly divide by the base and read remainders upwards",
      explanation: "Every field is derived from the decimal value, which is treated as the source of truth. Entering binary, hex or octal parses the string in that base into a number, then each other field is rendered with toString(2), toString(16) and toString(8), so all four representations always describe the same quantity.",
      example: "0x2F = 2 × 16¹ + 15 × 16⁰ = 32 + 15 = 47 decimal = 101111 binary = 57 octal"
    },
    workedExample: {
      scenario: "Convert 65,535 — the largest unsigned 16-bit value — into hex and binary",
      steps: [
        "65,535 ÷ 16 = 4,095 remainder 15 → digit F",
        "4,095 ÷ 16 = 255 remainder 15 → digit F",
        "255 ÷ 16 = 15 remainder 15 → digit F, then 15 ÷ 16 = 0 remainder 15 → digit F",
        "Read the remainders upwards: FFFF, which is 16 ones in binary"
      ],
      result: "65,535 = FFFF (hex) = 1111111111111111 (binary) = 177777 (octal)"
    },
    commonValues: {
      heading: "Digit counts by register width (unsigned)",
      columns: ["Bits", "Maximum value", "Hex digits", "Example"],
      rows: [
        ["8", "255", "2", "FF"],
        ["16", "65,535", "4", "FFFF"],
        ["32", "4,294,967,295", "8", "FFFFFFFF"],
        ["64", "18,446,744,073,709,551,615", "16", "FFFFFFFFFFFFFFFF"]
      ]
    }
  },
  'bitwise-calculator': {
    title: "Test Every Flag with a Bitwise Operation Calculator",
    subtitle: "Bitwise Operation Calculator",
    introduction: "Underneath every integer, boolean flag, colour value and permission string sits a row of bits, and bitwise operators are the only tools that touch them directly. An AND clears bits you do not want, an OR switches bits on, an XOR toggles them, a NOT inverts them, and the shift operators move a whole value left or right as if it were a slider. That vocabulary is how feature flags get packed into one integer, how Unix decides who may execute a script, how a GPU paints a pixel from three colour channels, and how low-level code multiplies by two without ever calling a multiply instruction. This bitwise operation calculator takes two numbers and one operator — AND, OR, XOR, NOT, left shift or right shift — returns the result, and shows you the underlying binary so you can see exactly which bit flipped and why, using the same 32-bit integer semantics your language applies.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Four Foundations and Their Truth Tables</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          AND (<code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">&amp;</code>) yields 1 only when both bits are 1 — that is masking: 01011011 &amp; 00001111 keeps the low four bits and clears everything above them — widen the mask to 0xFF and the same trick extracts a whole byte out of a larger integer. OR (<code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">|</code>) yields 1 when either bit is 1 — that is flag setting: <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">flags |= READ</code> switches one permission on without disturbing the rest. XOR (<code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">^</code>) yields 1 only when the bits differ, which makes it the toggling operator: <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">flags ^= READ</code> flips that permission back and forth, and two useful identities fall out — x ^ x = 0 and x ^ 0 = x. NOT (<code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">~</code>) inverts every bit, and because signed integers use two's complement, ~x always equals −x − 1: ~5 = −6.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Shifts: Multiplication's Quiet Cousin</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">x &lt;&lt; k</code> multiplies by 2ᵏ — one left shift is ×2, ten left shifts is ×1024 — and <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">x &gt;&gt; k</code> divides by 2ᵏ, rounding toward negative infinity. The subtlety is that signed right shift keeps the sign bit, while the unsigned shift <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">&gt;&gt;&gt;</code> (JavaScript and Java) fills with zeros instead. So −8 &gt;&gt; 1 = −4, but −8 &gt;&gt;&gt; 1 = 2147483644, because the pattern 1111…11111000 becomes 0111…11111100 once the sign bit is pushed out. Two more edge rules bite regularly: JavaScript coerces every bitwise operand to a signed 32-bit integer, and shift counts are taken modulo 32, so <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">1 &lt;&lt; 32</code> equals 1, not 4,294,967,296.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Bit k (counting from 0) has value 1 &lt;&lt; k: set with <code className="font-mono">|=</code>, clear with <code className="font-mono">&amp;= ~</code>, toggle with <code className="font-mono">^=</code>, test with <code className="font-mono">(x &gt;&gt; k) &amp; 1</code>.</li>
            <li><code className="font-mono">x &amp; 1</code> is the parity check: 1 means odd, 0 means even.</li>
            <li>Always parenthesize: <code className="font-mono">a &amp; b == c</code> parses as <code className="font-mono">a &amp; (b == c)</code> in C, Java and JavaScript because == binds tighter than &amp;.</li>
            <li>Three steps swap without a temporary: a ^= b; b ^= a; a ^= b.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "What do AND, OR and XOR do to each pair of bits?", answer: "AND gives 1 only when both bits are 1 (0&0=0, 0&1=0, 1&0=0, 1&1=1). OR gives 1 when at least one bit is 1 (0|0=0, 0|1=1, 1|0=1, 1|1=1). XOR gives 1 when the bits differ (0^0=0, 0^1=1, 1^0=1, 1^1=0) — which is why it is the toggling and parity operator." },
      { question: "What does x & 1 tell me?", answer: "It isolates the least significant bit: result 1 means the number is odd, 0 means even. The same trick generalizes — x & 3 is x modulo 4, x & 7 is x modulo 8, and x & 0xFF keeps only the low byte of a 32-bit integer." },
      { question: "What is the difference between >> and >>>?", answer: "The signed right shift >> propagates the sign bit, while the unsigned right shift >>> always fills with zeros. In Java and JavaScript, −8 >> 1 = −4 (arithmetic division by two) but −8 >>> 1 = 2147483644, because the 32-bit pattern of −8 (0xFFFFFFF8) shifts in a zero at the top, producing 0x7FFFFFFC." },
      { question: "Why does ~5 equal −6?", answer: "Bitwise NOT inverts all 32 bits, and signed integers use two's complement, where ~x = −x − 1. Binary 5 is 0000…0101; inverting gives 1111…1010, which is the two's complement encoding of −6. The formula holds universally: ~0 = −1, ~99 = −100." },
      { question: "Is x << 1 always the same as multiplying by 2?", answer: "Until you reach the sign bit. In 32-bit signed arithmetic, 1 << 30 = 1,073,741,824 but 1 << 31 = −2,147,483,648, because the shift pushes a 1 into the sign position. Beyond that, JavaScript and Java take the shift count modulo 32, so 1 << 32 equals 1 again while 2 ** 32 would be 4,294,967,296." },
      { question: "How do I set, clear, toggle and test a single bit?", answer: "Use a mask with the bit at position k: set with x | (1 << k), clear with x & ~(1 << k), toggle with x ^ (1 << k), and test with (x >> k) & 1. All four keep every other bit untouched, which is the whole point of a mask." },
      { question: "Why does the XOR swap work?", answer: "Let a and b start as A and B. After a ^= b, a holds A^B. After b ^= a, b becomes A^B^B = A. After a ^= b, a becomes A^B^A = B. No temporary variable is needed — though modern compilers produce faster code with a plain temp swap, so readability usually wins." },
      { question: "Where are bitwise flags used in real code?", answer: "Unix permissions are the classic case: 0755 is 111 101 101 in binary, three groups of three bits that decode as rwxr-xr-x. Elsewhere, permission masks, packet header fields, GPU colour channels (each byte of RGB), feature toggles packed into one int, and compression bitstreams all rely on the same four operators." },
      { question: "Does operator precedence cause bugs with these operators?", answer: "Yes. In C, C++, Java and JavaScript, == binds more tightly than bitwise & and |, so if (flags & MASK == 1) is read as flags & (MASK == 1). Wrap the bitwise operation in parentheses — (flags & MASK) === MASK, or simply (flags & MASK) !== 0 — and the condition means what you intended." },
      { question: "Do my numbers stay in the browser?", answer: "Yes. Both operands and the result are computed on the page; nothing is transmitted or stored, so you can test permission masks and packet values freely." }
    ],
    relatedCalculators: [
      { name: 'Binary/Hex/Decimal', path: '/binary-hex-decimal-converter.html' },
      { name: 'Memory Size', path: '/memory-size-calculator.html' },
      { name: 'Programming Calculator', path: '/programming-calculator.html' },
      { name: 'Time Complexity', path: '/time-complexity-calculator.html' }
    ],
    howWeCalculate: {
      formula: "a & b, a | b, a ^ b, ~a, a << k, a >> k — evaluated on 32-bit two's complement integers",
      explanation: "Each operand is coerced to a signed 32-bit integer, the operation is applied bit by bit from the most significant position down, and the result is converted back to a JavaScript number. Shifts move every bit by k positions (with the count reduced modulo 32) and fill with the sign bit for >> or with zeros for unsigned shifts.",
      example: "5 & 3 = 0101 & 0011 = 0001 = 1  ·  5 | 3 = 0111 = 7  ·  5 ^ 3 = 0110 = 6"
    },
    workedExample: {
      scenario: "Check whether a file with permission mask 0755 allows its owner to execute",
      steps: [
        "Convert octal 0755 to decimal: 7 × 64 + 5 × 8 + 5 = 448 + 40 + 5 = 493",
        "The owner bits are the top three (mask 0o100 = 64). Test them: 493 & 64 = 64, which is non-zero",
        "Because the result is non-zero, the owner-execute bit is set",
        "Decode the remaining groups: 7 = 111 (rwx), 5 = 101 (r-x), 5 = 101 (r-x)"
      ],
      result: "493 (0755) → rwxr-xr-x, owner execute granted"
    },
    commonValues: {
      heading: "Truth table for AND, OR and XOR",
      columns: ["A", "B", "A & B", "A | B", "A ^ B"],
      rows: [
        ["0", "0", "0", "0", "0"],
        ["0", "1", "0", "1", "1"],
        ["1", "0", "0", "1", "1"],
        ["1", "1", "1", "1", "0"]
      ]
    }
  },
  'regex-tester': {
    title: "Debug Patterns in Real Time with a Regex Tester",
    subtitle: "Regex Tester",
    introduction: "Validation built from string splits, charCodeAt loops and chained conditionals always works right up until someone pastes a name with an accent or a phone number with brackets. Regular expressions replace that pile of branches with one declarative line that says what a valid value looks like — but only if the line is right, and a pattern that looks correct can still be quietly wrong. A regex tester closes that gap: you type the pattern, toggle the global, case-insensitive and multiline flags, paste a test string, and immediately see whether it matched, how many matches were found, and what the engine captured. Six ready-made patterns (US phone, email, URL, IP address, ISO date and hex colour) give you a working starting point, and because everything runs in the page you can paste internal identifiers, log lines or configuration values without worrying about where they end up. Break a pattern on purpose, tighten it, and move on.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Building Blocks That Cover Most Patterns</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Anchors define position: <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">^</code> matches the start of the string and <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">$</code> the end, so an unanchored pattern happily matches a substring anywhere in the input — the most common reason a validator accepts garbage. Character classes describe sets: <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'\\d'}</code> is any digit, <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'\\w'}</code> is a word character, <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'\\s'}</code> is whitespace, and negated forms like <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">[^"]</code> match everything except that set. Quantifiers repeat: <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">*</code> zero or more, <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">+</code> one or more, <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">?</code> optional, and <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'{3,4}'}</code> an explicit count. Groups in parentheses capture text and let alternation with the pipe operator apply to a whole branch.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          One detail worth knowing before you trust a pattern in JavaScript: <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'\\d'}</code> matches only ASCII 0–9, not the Arabic-Indic or fullwidth digits that look identical on screen. Matching those requires the Unicode property escape <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'/^\\p{Nd}+$/u'}</code>. If your users type digits in another script, this distinction decides whether your form works for them.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Greedy, Lazy and the Backtracking Cliff</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Quantifiers are greedy by default: they consume as much as they can and only give characters back when the rest of the pattern fails. Against <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'<a><b>'}</code>, the pattern <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'<.*>'}</code> runs all the way to the final angle bracket and returns the whole string, while the lazy variant <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'<.*?>'}</code> stops at the first one and returns just <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'<a>'}</code>. Neither is universally right — the choice depends on whether you want the first or the last closing delimiter.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Backtracking is where patterns get expensive. A construct like <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'(a+)+$'}</code> on a string of thirty a's followed by a non-matching character forces the engine to try an exponential number of ways to split the run between the outer and inner groups. Modern engines prune some of these paths, but patterns that nest quantifiers over overlapping sets — <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'([a-z]+)+!'}</code> being the textbook case — can still stall a server. Prefer a single possessive-feeling structure, anchor the match, and avoid quantified groups that can match the same characters.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Start from a preset, then break it with an input it should reject — a pattern you have never seen fail is untested.</li>
            <li>Anchor with ^ and $ unless you deliberately want a substring search.</li>
            <li>The global flag changes results: with g, match returns every hit and hides capture groups; without g, it returns the first hit plus its groups.</li>
            <li>JavaScript has no inline (?i) flag syntax — set the g, i and m toggles instead.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "What do the ^ and $ anchors actually control?", answer: "Without the m flag they bind to the whole input: ^ matches only at the very start and $ only at the very end, so '^123-4567$' rejects 'ext 123-4567' instead of matching it. With m, both anchors move to each line boundary, which is what you want when scanning multiline logs." },
      { question: "Why does my email pattern reject addresses that are perfectly valid?", answer: "Because real email syntax is far larger than a quick pattern. The preset ^[\\w.-]+@[\\w.-]+\\.\\w+$ rejects a plus tag such as user+tag@example.co.uk (the + is not in the class) and simultaneously accepts malformed input like a@b..c. It is a pragmatic check, not RFC 5322 — treat it as a first pass and let a mail server confirm the rest." },
      { question: "What is catastrophic backtracking?", answer: "It happens when nested quantifiers can partition the same characters in exponentially many ways. Testing (a+)+$ against thirty a's followed by a 'b' makes the engine retry splits until the match fails, and each extra 'a' roughly doubles the work. The fix is to remove the redundant nesting: a+$ or a* followed by the rest of the pattern matches the same language without the combinatorial blow-up." },
      { question: "What is the difference between greedy and lazy quantifiers?", answer: "Greedy (.*, .+, .{m,n}) matches as much as possible before backtracking; lazy (.*?, .+?, .{m,n}?) matches as little as possible. On input <a><b> the pattern <.*> returns <a><b> because it expands to the last '>', while <.*?> returns <a> because it stops at the first one." },
      { question: "How do the g, i and m flags change a match?", answer: "i makes matching case-insensitive, so 'Hello' matches 'hello'. m lets ^ and $ anchor at every line start and end instead of only the string boundaries. g asks for every match in the input rather than the first one — which also means the match count reported by the tool reflects each occurrence, not just the initial hit." },
      { question: "Why does \\d not match the digits 123 in Arabic script?", answer: "In JavaScript, \\d is exactly the ASCII class [0-9] by specification; it never matches numerals from other scripts. To include them, use the Unicode property escape with the u flag: /^\\p{Nd}+$/u matches any decimal digit from any writing system. The same applies to \\w, which is ASCII-only unless you build a Unicode-aware class." },
      { question: "Can I use a regular expression to parse HTML or JSON?", answer: "Formally no — HTML and JSON are not regular languages, and arbitrarily nested tags or objects cannot be matched by a regular expression. Quick patterns work for clean, predictable fragments, but for real documents use a parser: mismatched quotes, CDATA sections, escaped characters and nesting will break a regex sooner or later." },
      { question: "Does a server-side regex risk being exploited?", answer: "Yes. If an attacker controls the pattern itself, they can supply one that forces exponential backtracking and tie up a CPU core (ReDoS). Never evaluate user-supplied regex on the server; if you must accept patterns, bound the input length, run them with a timeout, and vet the pattern against known catastrophic shapes first." },
      { question: "Why do my matches change when I toggle the g flag?", answer: "Because String.match behaves differently in each mode. Without g it returns the full match at index 0 followed by the captured groups; with g it returns an array of every full match and omits the groups entirely. The tool's results panel reflects that switch, so compare like with like when you are counting occurrences." },
      { question: "Is my test string sent anywhere?", answer: "No. The pattern, flags and test string are evaluated in your browser with JavaScript's own RegExp engine. Nothing is uploaded, logged or stored, so it is safe to paste real log lines or internal identifiers." }
    ],
    relatedCalculators: [
      { name: 'JSON Formatter', path: '/json-formatter.html' },
      { name: 'Code Beautifier', path: '/code-beautifier.html' },
      { name: 'Time Complexity', path: '/time-complexity-calculator.html' },
      { name: 'Hash Generator', path: '/hash-generator.html' }
    ],
    howWeCalculate: {
      formula: "matches = String.match(new RegExp(pattern, flags)) with flags assembled from the g, i and m toggles",
      explanation: "The engine attempts the pattern at each position in the test string, scanning left to right and backtracking whenever a quantifier has consumed too much. The g flag makes it continue to collect every subsequent match, i folds case before comparing, and m redefines ^ and $ as line anchors. If compilation fails, the parser error is reported instead of a match count.",
      example: "Pattern ^\\d{3}-\\d{4}$ against '123-4567' → 1 match; against '12-34567' → no match (the anchors reject it)"
    },
    workedExample: {
      scenario: "Validate a US phone number, then make the pattern accept both common written forms",
      steps: [
        "Load the preset ^\\d{3}-\\d{3}-\\d{4}$ and test 123-456-7890: the pattern reports a single match",
        "Test the parenthesised form (123) 456-7890 — it fails because the pattern demands literal hyphens",
        "Relax only the separators: ^\\(?\\d{3}\\)?[- ]?\\d{3}-\\d{4}$ makes brackets and the space optional",
        "Re-test both forms: each returns a single match, while 12-345-67890 is still rejected by the anchors"
      ],
      result: "Both 123-456-7890 and (123) 456-7890 match with ^\\(?\\d{3}\\)?[- ]?\\d{3}-\\d{4}$"
    },
    commonValues: {
      heading: "Pattern presets and what each one proves",
      columns: ["Pattern", "Matches", "Deliberately rejects"],
      rows: [
        ["^\\d{4}-\\d{2}-\\d{2}$", "2026-10-08 (ISO date)", "2026/10/08, 26-10-08"],
        ["^#[0-9A-Fa-f]{6}$", "#FF5733", "#FF573, #GG5733"],
        ["https?://[\\w.-]+", "http://a.co and https://a.co", "ftp://a.co"],
        ["^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$", "192.168.0.1", "192.168.0"]
      ]
    }
  },
  'json-formatter': {
    title: "Pretty-Print and Validate with a JSON Formatter",
    subtitle: "JSON Formatter",
    introduction: "A single stray comma has cost more debugging hours than every off-by-one error combined, because JSON fails loudly at the parser and says almost nothing about what you meant. The fix is a formatter that tells you the truth in the first second: paste your payload, choose a two-space or four-space indent, and get either clean, aligned structure or a precise parser error pointing at the character that broke it. This JSON formatter does exactly that — validation through a real JSON.parse, pretty output through JSON.stringify with your chosen indentation, a one-click switch to minified output when you need to see the wire size, and a copy button for the result. It also demonstrates a behaviour that surprises almost everyone at least once: formatting can change the way your keys come back out, because integer-like keys are reordered on parse. Everything runs locally, which matters when the payload in your clipboard contains customer data or API secrets.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Rules JSON Actually Enforces</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          JSON is smaller than the JavaScript object literal syntax it resembles, and the differences are exactly where files break. Strings must use double quotes — single quotes and unquoted keys are errors. Commas separate members, but a trailing comma after the last member is illegal. There is no comment syntax, no undefined, no function values and no trailing commas inside arrays either. Numbers must look like this: no leading plus, no leading zeros (007 is invalid), no bare hexadecimal, and no NaN or Infinity literals. A document must be a single value at the top level, so an object and a side-by-side array will not parse.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Everything else — indentation, spaces around colons, line breaks — is decorative. The specification treats whitespace as insignificant, which is why a minified payload and a pretty-printed one parse into identical data. That is also why the tool can flip between formatted and minified output without changing a single value: <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">JSON.parse</code> reads one, <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">JSON.stringify</code> writes the other, and the round trip is lossless for well-formed input.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">What Formatting Cannot Fix</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Three categories of trouble survive a perfect format. Duplicate keys: the parser keeps the last one and discards the rest silently, so a config with two <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'"debug":'}</code> entries looks fine after formatting while half your settings vanish. Key order: integer-like keys are sorted numerically and placed before all other keys, so parsing <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'{"b":1,"2":2,"a":3}'}</code> and writing it back yields 2, b, a — the source order is simply not preserved. Large integers: anything beyond 9,007,199,254,740,991 (2⁵³ − 1) loses precision because JSON numbers are IEEE 754 doubles, which is why Snowflake-style IDs must travel as strings.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          When two systems must sign or hash the same JSON document, byte-identical output stops being a nicety. Canonical JSON (RFC 8785) fixes the details: keys sorted by their UTF-16 code units, no insignificant whitespace, and a precise number format. Only a canonical form guarantees that a signature created in one language still verifies in another.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Read the error before you read the JSON: the parser reports the character position, and 90% of failures are a trailing comma or a single quote.</li>
            <li>Keep IDs larger than 2⁵³ as strings, or your client will silently alter them.</li>
            <li>Use two-space indent for payloads you will read; use minified output when you are measuring bytes on the wire.</li>
            <li>Formatting proves syntax, not semantics — a perfectly formatted document can still fail a schema check.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "Why does my JSON fail with an unexpected token error?", answer: "The three usual culprits, in order of frequency: a trailing comma after the last member, single-quoted strings instead of double quotes, and a comment line. JSON has no trailing commas and no comments, so the parser stops at the exact character where the grammar breaks and reports its position in the message." },
      { question: "Is formatted JSON different from minified JSON?", answer: "Not to any parser. Whitespace and line breaks are not part of the data model, so both forms produce the same object with the same values. The only difference is bytes on the wire — and after gzip compression, most of that difference disappears, because repeated indentation compresses extremely well." },
      { question: "Why did the order of my keys change after formatting?", answer: "JSON.parse does not preserve source order for every key. Keys that look like array indices (digits from 0 up to 4,294,967,294, with no leading zeros) are sorted numerically and emitted first, then the remaining string keys in insertion order. So {\"b\":1,\"2\":2,\"a\":3} comes back as 2, b, a. If order matters for signatures, use a canonicalization library rather than relying on parse order." },
      { question: "Can I put comments in JSON?", answer: "Not in standard JSON — there is no comment syntax at all. If your file needs comments, it is probably JSONC, JSON5 or a YAML document wearing JSON's clothes. Many tools still accept // comments in configuration files, but strict parsers such as JSON.parse will reject them." },
      { question: "Why does 1.0 come back as 1?", answer: "JSON has no integer type: every number is a double-precision floating point value, and 1.0 and 1 are the same value. Stringify emits the shortest representation that round-trips, so the trailing .0 disappears. You cannot preserve the distinction in standard JSON — store the value as a string if the format matters downstream." },
      { question: "What happens to very large integers?", answer: "They lose precision above 9,007,199,254,740,991, which is 2⁵³ − 1. The value 9007199254740993 parses to 9007199254740992 because the double representation cannot tell them apart. Large IDs, timestamps in microseconds and 64-bit counters should be passed as strings, or parsed with a BigInt-aware parser." },
      { question: "Why are NaN and Infinity rejected?", answer: "They are not part of the JSON grammar. JSON.stringify converts non-finite numbers to null, which is a silent data loss you will only notice when a calculation downstream divides by null. Represent those states explicitly as null plus a status field, or as the strings \"Infinity\" and \"NaN\", and document the convention." },
      { question: "What is canonical JSON and when do I need it?", answer: "A single defined serialization of the same data: RFC 8785 sorts object keys by UTF-16 code units, removes all insignificant whitespace and specifies exact number formatting. You need it whenever bytes must match — digital signatures over JSON, content-addressed storage, deterministic hashing, or reproducible builds where two serializers must agree." },
      { question: "Should I use two or four spaces of indentation?", answer: "It changes nothing except readability, and both are offered here. Two spaces is the common choice for APIs and JavaScript style guides; four spaces is popular for configuration files read on wide monitors. What matters is picking one per project and letting a formatter enforce it, so diffs stay small." },
      { question: "Does my JSON get uploaded for formatting?", answer: "No. Parsing and stringifying happen in your browser with the built-in JSON engine — the document is never transmitted, logged or stored, so it is safe to format configurations and API responses that contain sensitive values." }
    ],
    relatedCalculators: [
      { name: 'Regex Tester', path: '/regex-tester.html' },
      { name: 'Code Beautifier', path: '/code-beautifier.html' },
      { name: 'Hash Generator', path: '/hash-generator.html' },
      { name: 'Base64 Encoder', path: '/base64-encoder.html' }
    ],
    howWeCalculate: {
      formula: "validate: JSON.parse(text)  ·  format: JSON.stringify(JSON.parse(text), null, indent)",
      explanation: "The input is parsed with the platform's JSON grammar checker, which either throws at the first invalid character or produces a value. That value is then re-serialized with your chosen indentation (2 or 4 spaces) or with no whitespace at all when minified, so the output is guaranteed well-formed even if the input was not spaced consistently.",
      example: "{ \"b\": 1, \"a\": 2 } with indent 2 → three lines: {, then \"b\": 1, then \"a\": 2, then } — two spaces before each member"
    },
    workedExample: {
      scenario: "A configuration blob pasted from a chat message fails to parse and then formats cleanly",
      steps: [
        "Paste the blob: the parser stops at the single quote and reports the position instead of a vague failure",
        "Replace the single quotes with double quotes and delete the comma after the final member — the two changes JSON forbids",
        "Parse again: the document is now valid, so the tool emits pretty output with the selected indent",
        "Switch the output toggle to Minified to measure the payload that will actually go over the wire"
      ],
      result: "Valid JSON, pretty-printed with 2-space indentation (identical data in minified form)"
    },
    commonValues: {
      heading: "JSON data types and what they become after parsing",
      columns: ["JSON type", "Example", "JavaScript type"],
      rows: [
        ["string", "\"hello\"", "string"],
        ["number", "30 or 2.5", "number"],
        ["boolean", "true", "boolean"],
        ["null", "null", "object (typeof null)"],
        ["array", "[1, 2, 3]", "Array"],
        ["object", "{\"k\": 1}", "Object"]
      ]
    }
  },
  'hash-generator': {
    title: "Fingerprint Any String with a Hash Generator",
    subtitle: "Hash Generator",
    introduction: "Every integrity check you have ever relied on rests on the same idea: compress a message of any length into a fixed-length fingerprint, then compare fingerprints instead of the messages themselves. A single flipped bit in a download should change the fingerprint completely; two identical inputs should produce identical fingerprints forever; and nobody should be able to work backwards from the fingerprint to the message. That is what a hash function does, and it is why git objects, TLS certificates, package checksums and blockchain transactions all carry one. This hash generator shows the three algorithms you will meet most often — MD5 at 128 bits, SHA-1 at 160 bits and SHA-256 at 256 bits — as 32, 40 and 64 hexadecimal characters respectively, so the relationship between digest length and hex output is visible rather than memorised. The on-page values are fast in-browser demo fingerprints that reproduce each algorithm's output length, which makes the tool useful for learning the format and watching the avalanche effect while keeping the honest boundaries of each algorithm in view.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Five Properties That Make a Hash a Hash</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          <strong className="text-white">Deterministic:</strong> the same input must always produce the same digest, or you could never compare two runs. <strong className="text-white">Fixed length:</strong> whether you hash one character or one gigabyte, the output stays at the algorithm's width — 32 hex characters for MD5, 40 for SHA-1, 64 for SHA-256. <strong className="text-white">One-way (preimage resistance):</strong> given a digest, recovering the original input should be computationally impossible; there is no inverse function, only brute force over the input space. <strong className="text-white">Collision resistant:</strong> finding two different inputs that share a digest should be infeasible. And <strong className="text-white">avalanche effect:</strong> flipping a single input bit should change roughly half of the output bits, so closely related inputs (yourname vs yourName) produce completely unrelated fingerprints.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The fixed-length requirement creates an unavoidable mathematical fact: the output space is finite while the input space is infinite, so collisions must exist. The birthday bound says that with a b-bit digest you need roughly 2^(b/2) attempts to stumble on one — 2⁶⁴ for MD5's 128 bits, which is why MD5 is treated as broken: attacks far cheaper than brute force have produced real collisions.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Where Each Algorithm Stands Today</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          MD5 (1991) was broken for collision resistance by Wang and colleagues in 2004, and chosen-prefix attacks now make forging two files with the same MD5 practical in hours on ordinary hardware. SHA-1 carried the web for two decades until Project Shattered produced the first full collision in 2017, after which NIST's earlier deprecation for digital signatures became final: browsers, certificate authorities and code-signing systems moved to SHA-2. Both remain perfectly serviceable for detecting accidental corruption — a corrupted download still will not match — where the adversary is a flipped bit rather than an attacker.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          For security decisions, reach for SHA-256 (or SHA-384/SHA-512, both available through the Web Crypto API) and for passwords reach for something else entirely: a slow, salted KDF such as Argon2id, bcrypt or scrypt. A fast hash is exactly what an attacker wants — they can test billions of candidates per second against unsalted digests, and a rainbow table turns any common password into an instant lookup. Salting defeats tables; a work factor defeats GPUs.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Integrity without an adversary: MD5 or SHA-1 are fine. Integrity against an attacker: SHA-256 minimum.</li>
            <li>Passwords never go through a bare hash — use Argon2id or bcrypt with a per-user salt.</li>
            <li>In the browser, real digests come from <code className="font-mono">crypto.subtle.digest('SHA-256', data)</code>; MD5 is deliberately absent from that API.</li>
            <li>Hex is just base-16 packing: each character carries four bits, so 256 bits = 64 characters exactly.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the difference between MD5, SHA-1 and SHA-256?", answer: "Digest width and security status. MD5 produces 128 bits (32 hex characters), SHA-1 produces 160 bits (40 characters), SHA-256 produces 256 bits (64 characters). MD5 has been broken since 2004 and SHA-1 since 2017, so both are checksum-only today; SHA-256 anchors TLS certificates, code signing and most security standards." },
      { question: "Is a hash reversible?", answer: "Not by any known efficient method — that is the one-way property. But reversibility is a property of the input, not just the algorithm: an attacker with a rainbow table can recover 'password' from its MD5 instantly, and can test millions of guesses per second. Hashes protect high-entropy secrets only if you add salt and slow the guessing down." },
      { question: "Why does each result look like a repeated block of characters?", answer: "Because this page builds each fingerprint from a single 32-bit (eight-character) core repeated to fill the digest: four times for MD5's 32 characters, five for SHA-1's 40, eight for SHA-256's 64. That makes it a demo of digest length, not a certified implementation — real MD5, SHA-1 and SHA-256 output is fully mixed with no visible repetition, so use Web Crypto or a vetted library when the digest itself is compared or signed." },
      { question: "Are MD5 or SHA-1 safe for storing passwords?", answer: "No, on two counts. Both have practical collision attacks, which matters for signatures and certificates, and both are far too fast for password storage: a GPU can compute billions of MD5s per second. Use Argon2id, bcrypt or scrypt with a unique salt per user and a work factor tuned to your hardware." },
      { question: "Can two different inputs produce the same hash?", answer: "Mathematically they must — a finite output space cannot map uniquely onto an infinite input space. The goal is to make finding such a pair infeasible. For MD5 and SHA-1 that goal has failed: researchers have constructed distinct inputs with identical digests, which is why both are banned from signatures." },
      { question: "Why is the output always the same length?", answer: "Fixed-width digests make comparison, indexing and chaining cheap: two 64-character strings are trivially equal, and Merkle trees can combine them without knowing the original data. The trade-off is the pigeonhole collision risk described above, which is compensated by making collisions hard to construct rather than impossible." },
      { question: "What is the difference between hashing and encryption?", answer: "Encryption is two-way: a key transforms data so a holder of the key can reverse it. Hashing is one-way and keyless: it produces a fingerprint for comparison. You hash to verify that data has not changed; you encrypt to keep it secret. Base64, incidentally, is neither — it is a reversible encoding." },
      { question: "Why does a SHA-256 digest have exactly 64 characters?", answer: "Because hexadecimal packs four bits per character: 256 ÷ 4 = 64. The same arithmetic gives MD5 32 characters (128 ÷ 4) and SHA-1 40 characters (160 ÷ 4). If you see a 'SHA-256' value that is not 64 characters long, it is truncated or something else entirely." },
      { question: "What should I use to verify file integrity?", answer: "SHA-256 is the safe default: every major OS ships a tool for it (shasum -a 256 on macOS, certutil -hashfile on Windows, sha256sum on Linux) and every language has a library. For very large files at high throughput, BLAKE3 is a modern alternative that is dramatically faster while remaining cryptographically strong." },
      { question: "Does my input stay on my machine?", answer: "Yes. Fingerprinting runs locally in the page, and nothing you paste is transmitted or stored — useful when the string is a token, a key fragment or customer data you would not paste into an online tool." }
    ],
    relatedCalculators: [
      { name: 'Base64 Encoder', path: '/base64-encoder.html' },
      { name: 'JSON Formatter', path: '/json-formatter.html' },
      { name: 'Regex Tester', path: '/regex-tester.html' },
      { name: 'Binary/Hex/Decimal', path: '/binary-hex-decimal-converter.html' }
    ],
    howWeCalculate: {
      formula: "digest = H(message) → fixed width: MD5 128 bit (32 hex), SHA-1 160 bit (40 hex), SHA-256 256 bit (64 hex)",
      explanation: "The message is padded to a multiple of the algorithm's block size and processed block by block, with every output bit depending on every input bit. Each digest is rendered as hexadecimal, where one character encodes four bits — so the character count is simply digest length divided by four. The values shown here are in-browser demo fingerprints sized to each algorithm's length; use Web Crypto or a vetted library when a certified digest is required.",
      example: "SHA-256 of the empty string = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 (64 characters)"
    },
    workedExample: {
      scenario: "See how a one-character change affects a fingerprint, and confirm determinism",
      steps: [
        "Hash the string TheCalHub and record the digest",
        "Hash TheCalhub — one letter changes case — and compare: no shared prefix survives, roughly half the bits differ",
        "Hash TheCalHub again and compare with the first run: the digests are byte-identical",
        "Length check: MD5 output is 32 characters, SHA-1 is 40 and SHA-256 is 64, regardless of input length"
      ],
      result: "Same input → identical digest; one character changed → unrelated digest; output length never varies"
    },
    commonValues: {
      heading: "Hash digest lengths and security status",
      columns: ["Algorithm", "Digest bits", "Hex characters", "Status"],
      rows: [
        ["MD5", "128", "32", "Broken (2004) — checksums only"],
        ["SHA-1", "160", "40", "Broken (2017) — legacy compatibility only"],
        ["SHA-256", "256", "64", "Current standard for security"],
        ["SHA-512", "512", "128", "Wider digest, faster on 64-bit CPUs"]
      ]
    }
  },
  'base64-encoder': {
    title: "Encode and Decode Text with a Base64 Encoder",
    subtitle: "Base64 Encoder/Decoder",
    introduction: "You have met base64 dozens of times without noticing: the background image sitting inline in your stylesheet, the middle segment of every JSON Web Token, the Authorization header that logs you into an API, the attachment embedded in a MIME email. Base64 solves a narrow problem beautifully — binary data cannot travel through channels that expect text, so it rewrites bytes into a 64-character alphabet that survives URLs, headers, XML and JSON untouched. The cost is size (about one third longer) and the misconception is secrecy (there is none: anyone can decode it in one line). This encoder and decoder works in both directions with a single toggle, shows the padding exactly as the standard requires, and ships with two quick examples — encode TheCalHub, decode SGVsbG8gV29ybGQ= — so you can watch a payload grow by a third as it encodes and see exactly where every equals sign comes from. Everything is computed in the page.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">The Alphabet, the Grouping and the Padding</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The base64 alphabet is 26 uppercase letters, 26 lowercase letters, 10 digits, a plus and a slash: 2⁶ = 64 symbols, each carrying exactly six bits. Input is consumed in groups of three bytes — 24 bits — which is exactly four base64 characters, with no remainder. That 3-to-4 relationship is the whole arithmetic: output length is always the input length multiplied by 4/3 (rounded up), so 300 bytes becomes 400 characters and a megabyte becomes roughly 1.4 million.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Padding handles the leftovers. If the input ends with one byte (8 bits), two characters can carry it and the remaining four bits are filled with zeros, marked by <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">==</code>. Two leftover bytes (16 bits) fit into three characters plus a single <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">=</code>. A multiple of three needs no padding at all. Encode the five bytes of "Hello" and you get <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">SGVsbG8=</code>: five bytes in, eight characters out, one equals sign explaining the leftover byte.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Where It Is Used, and Why It Is Not Encryption</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Base64 exists wherever a system accepts text but you need to carry bytes: a PNG inlined as <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">data:image/png;base64,…</code>, the header and payload segments of a JSON Web Token, an <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">Authorization: Basic</code> credential, an attachment inside a MIME email, or a certificate pasted into a configuration file. None of those channels would accept raw bytes, and every one of them accepts a 64-character alphabet without complaint. The transformation is public, deterministic and reversible in a single call, so anyone holding the string recovers the original instantly — if the content must stay secret, encrypt it first or rely on TLS, and treat base64 purely as formatting for transport.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Two variants exist because the standard alphabet does not survive every transport. The slash breaks URL paths, the plus becomes a space inside form-encoded data, and the equals sign collides with query-string syntax. RFC 4648 section 5 therefore defines the URL-safe alphabet — <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">-</code> instead of <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">+</code> and <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">_</code> instead of <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">/</code> — which is what JWTs use, usually with the padding omitted entirely.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Base64 is encoding, not encryption. If the payload must stay secret, use TLS or encrypt first, then encode.</li>
            <li>A base64 string containing + in a query string will decode as spaces server-side — switch to the URL-safe alphabet or percent-encode it.</li>
            <li>Encode to UTF-8 bytes before base64 for anything beyond Latin-1: a browser's btoa refuses characters above code point 255.</li>
            <li>Short inputs over-expand because of padding (5 bytes → 8 characters); judge the 33% figure over large payloads.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "Is base64 encryption?", answer: "No — it is an encoding. The transform is public, symmetric and trivial: atob(), Buffer.from(s, 'base64') or any online tool recovers the original in one step, no key involved. Encoding exists so binary can travel through text-only channels; if you need confidentiality, encrypt the data or use TLS and treat base64 purely as transport formatting." },
      { question: "Why does my base64 string end with equals signs?", answer: "The equals signs are padding markers showing how many bytes were in the final group. One leftover byte produces two characters plus '==', two leftover bytes produce three characters plus '=', and a complete three-byte group needs none. Decoders use them to know how many bits of the last character were meaningful rather than filler." },
      { question: "How much bigger does my data get?", answer: "Exactly 4/3 for full groups: 3,000 bytes become 4,000 characters, and one mebibyte (1,048,576 bytes) becomes 1,398,104 characters once padding is added. Short inputs look worse because padding is fixed at up to two characters — five bytes become eight, a 60% jump. If the data is already compressed, base64 adds the 33% on top of the compressed size." },
      { question: "Which characters are allowed in standard base64?", answer: "A–Z, a–z, 0–9, + and / — that is 26 + 26 + 10 + 2 = 64 symbols, matching the 6-bit groups exactly — plus = used only for padding. The URL-safe variant swaps + for - and / for _, giving an alphabet that can sit inside a path or query string unescaped." },
      { question: "Can base64 encode Unicode text such as emoji?", answer: "Yes, but the bytes must be UTF-8 first. The emoji U+1F600 occupies four UTF-8 bytes (F0 9F 98 80) and encodes to 8J+YgA== — eight characters for one visible symbol. Encoding UTF-16 code units instead of UTF-8 bytes produces a different, non-interoperable result, which is a classic cross-platform bug." },
      { question: "Why are data URIs written as base64?", answer: "A data: URI carries the asset inline with the document: data:image/png;base64,iVBORw0KGgo… The browser needs no extra request, which used to be a big win for small icons and critical CSS. The trade-offs are a 33% size increase and no separate caching — the asset is refetched whenever the referencing file changes." },
      { question: "Why did my plus signs turn into spaces?", answer: "Because application/x-www-form-urlencoded treats + as a space when a query string is decoded. The fix is to use the URL-safe alphabet (with - and _), percent-encode the plus as %2B, or wrap the value with encodeURIComponent before sending it." },
      { question: "Is base64 always padded?", answer: "Standard base64 (RFC 4648 section 4) is padded, but URL-safe output such as JWT segments commonly omits the equals signs, and the forgiving decoders in browsers accept input with padding removed as long as the length is not left at a single dangling character. Our decoder handles the padded form shown by the encoder; re-add the '=' characters if a strict server rejects your string." },
      { question: "Does base64 change my data?", answer: "No. It is a lossless isomorphism between bytes and a text alphabet: decode(encode(x)) returns x byte for byte, which is why tools can round-trip a PNG through a JSON field and still produce a valid image. What does change is size — and that is worth remembering before embedding large assets." },
      { question: "Does the encoding happen in my browser?", answer: "Yes. Encoding and decoding run locally through the page's built-in routines; nothing you paste is transmitted or stored, so API keys, tokens and customer records are safe to process here." }
    ],
    relatedCalculators: [
      { name: 'Hash Generator', path: '/hash-generator.html' },
      { name: 'JSON Formatter', path: '/json-formatter.html' },
      { name: 'Code Beautifier', path: '/code-beautifier.html' },
      { name: 'Binary/Hex/Decimal', path: '/binary-hex-decimal-converter.html' }
    ],
    howWeCalculate: {
      formula: "output characters = ⌈(input bytes × 8) ÷ 6⌉, padded up to a multiple of 4 with '='",
      explanation: "Bytes are re-cut from eight-bit groups into six-bit groups: every three input bytes (24 bits) become exactly four output characters, and any trailing 8 or 16 bits are carried into two or three characters with zero bits added before the '=' markers. Decoding reverses the cut, discarding those filler bits and returning the original bytes.",
      example: "3 bytes → 4 characters (no padding) · 1 byte → 2 characters + '==' · 'Hello World' (11 bytes) → SGVsbG8gV29ybGQ= (16 characters)"
    },
    workedExample: {
      scenario: "Encode 'Hello World' and account for every output character",
      steps: [
        "Split the 11 bytes into groups of three: 'Hel', 'lo ', 'Wor' and the final 'ld'",
        "Each complete group becomes four characters: SGVs, bG8g and V29y",
        "The last group has only two bytes (16 bits), so three characters carry them and one '=' marks the 4 filler bits: bGQ=",
        "Concatenate the pieces: SGVsbG8gV29ybGQ="
      ],
      result: "SGVsbG8gV29ybGQ= (11 bytes → 16 characters, one '=' of padding)"
    },
    commonValues: {
      heading: "Base64 expansion at common input sizes",
      columns: ["Input", "Output characters", "Effective growth"],
      rows: [
        ["3 bytes", "4", "+33% (no padding)"],
        ["9 bytes", "12", "+33% (no padding)"],
        ["5 bytes", "8", "+60% (one '=' pad)"],
        ["1 MiB (1,048,576 bytes)", "1,398,104", "+33%"],
        ["64 bytes", "88", "+37.5% (two '=' pad)"]
      ]
    }
  },
  'code-beautifier': {
    title: "Tidy Minified Code with an Instant Code Beautifier",
    subtitle: "Code Beautifier",
    introduction: "Nobody has ever enjoyed opening a three-hundred-kilobyte minified bundle at two in the morning to find the one line that throws. Minification is a deployment optimization — it strips the whitespace and comments that help humans and keeps the ones that make bytes cheap — and the moment you need to read, diff or repair that file, you want the opposite transformation. This code beautifier runs both ways on the three languages you are most likely to meet in a browser: JavaScript, CSS and HTML, with a Beautify mode that reintroduces line breaks and indentation and a Minify mode that collapses them again. It is a formatting tool, not a compiler: no tokens are added or removed, no variable is renamed, no logic is touched. Paste a squashed function, get a readable stack of indented lines, copy the result, and — when you are done reading — minify it back to see exactly what your build pipeline ships.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">What Formatting Changes, and What It Must Never Change</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          JavaScript, CSS and HTML are all whitespace-insensitive in most positions, which is what makes round-tripping safe: a newline between tokens is not a token. Beautifying moves line breaks and indentation only, so <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'if(a){b();}'}</code> becomes three readable lines that compile to the identical program. Two cautions are worth knowing before you trust any formatter blindly. First, JavaScript has automatic semicolon insertion: a line break after <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">return</code>, <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">throw</code>, <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">break</code> or a postfix <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">++</code> causes the engine to end the statement there, so a formatter that splits such a line changes behaviour. Second, whitespace inside string literals and CSS values is content: collapsing <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">{'content: "a  b"'}</code> to a single space alters what the browser renders.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          HTML adds a third wrinkle: whitespace between inline elements collapses to a single space in normal flow (so newline-indent formatting between tags is harmless) but is preserved inside <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">pre</code> and <code className="bg-white/5 px-1.5 py-0.5 rounded text-primary-fixed font-mono text-[13px]">textarea</code>, and a space between inline-block elements changes layout. Formatting those regions needs a parser; a tag-splitting tool like this one is ideal for structure, not for pixel-critical markup.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Minify, Compress, and the Difference Between Them</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Minification removes characters from the source itself — comments, indentation, redundant spaces — and is done once at build time. Compression (gzip, brotli) is a reversible transport layer applied per response, and the client undoes it transparently. They compound: minifying first removes the obvious redundancy, then gzip squeezes the repeating patterns that remain, typically taking a hundred kilobytes of JavaScript to a fraction of that on the wire. Neither replaces the other, and neither belongs in your repository — commit the readable source, let the build emit the minified artifact.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Reading minified code is a different job from producing it, and it is the one this tool serves. Bringing structure back before debugging a stack trace, comparing two bundle versions, or reviewing a pasted snippet for a colleague all start with indentation. The rule of thumb: beautify to read, re-run your tests afterwards, and reach for a language-aware minifier (terser, cssnano, an HTML minifier) whenever the output is headed for production rather than your editor.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Strip <code className="font-mono">//</code> comments before whitespace-minifying: on a collapsed line, the rest of your code becomes part of the comment.</li>
            <li>Indentation here is tracked by counting braces — strings and template literals containing braces will shift the depth, so verify the output.</li>
            <li>Beautified output is for reading; run it past a linter before anyone executes it.</li>
            <li>Keep minified artifacts out of version control — diffs of minified files are unreadable and reviews silently stop happening.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "Does beautifying change how my code runs?", answer: "It should not — moving whitespace and adding indentation does not alter tokens, which is why JavaScript, CSS and HTML can all be reformatted safely. The exceptions are behavioural whitespace: automatic semicolon insertion after return or throw, whitespace inside string literals and CSS content values, and HTML inside pre or textarea. Check those three spots on any formatter you adopt." },
      { question: "What is the difference between minifying and compressing?", answer: "Minifying edits the source permanently — comments and whitespace are deleted, and only the client's copy is smaller. Compressing (gzip, brotli) is reversible: the server sends a compact stream and the browser expands it before executing. Minify once when you build; compress on every response. Used together they account for most of a modern page's byte savings." },
      { question: "Which languages does this beautifier support?", answer: "JavaScript, CSS and HTML, each with a strategy matched to its syntax. JavaScript gets a newline at every brace with a depth counter driving two-space indentation; CSS gets line breaks after braces and semicolons with spacing tightened around selectors; HTML gets a line break between tags with two-space nesting. Both modes are available for all three." },
      { question: "Why did my CSS content string lose its extra spaces?", answer: "Whitespace minification collapses every run of spaces into one, and a minifier that is not parsing your file cannot tell a string literal from ordinary spacing. If a repeated space inside content: or a data: URI matters, restore it by hand after minifying, or let a parser-based tool such as cssnano handle the file instead." },
      { question: "Is it safe to re-minify a third-party bundle with this tool?", answer: "For inspection, yes — you are reading, not shipping. For production, prefer the library's own build or a token-aware minifier, because pattern-based minification cannot distinguish a regular expression from division, a template literal from an expression, or a comment from a string containing //. Read the output, ship a trusted artifact." },
      { question: "Will beautifying create a huge git diff?", answer: "If your project indents with tabs and the output uses two spaces (or vice versa), every line changes at once. Run one formatter — Prettier, ESLint --fix or editorformat-on-save — across the codebase as a single committed change, then hook it into pre-commit so the style stays normalized and diffs stay reviewable." },
      { question: "Can this tool fix code with syntax errors?", answer: "No. It only moves whitespace, so a missing brace cannot be repaired, and because indentation is derived by counting braces the depth will drift from the first mismatch onward. Fix the syntax first — your runtime error message or linter will point at it — then format the corrected source." },
      { question: "Why does indentation stop lining up halfway through my file?", answer: "The beautifier increments depth at every { and decrements at every }, including braces that live inside strings, regular expressions or template literals. One brace in a string literal throws the count off for the rest of the file. Extract those strings or accept the drift for a quick read — a full parser-based formatter handles them correctly." },
      { question: "What happens to my comments when I minify?", answer: "Whitespace-based minification does not parse comments, so a // comment survives as text — and once newlines collapse, everything after it on the line becomes part of the comment, silently deleting your code. Block comments are no safer: any */ sequence inside them ends the comment early, even one sitting in quoted text. Remove comments first, or minify with a tool that tokenizes." },
      { question: "Does my code leave the browser when I use this?", answer: "No. All beautifying and minifying happens on the page; the snippet in the textarea is never transmitted or stored, so it is safe to use on proprietary code, internal configuration or anything under NDA." }
    ],
    relatedCalculators: [
      { name: 'JSON Formatter', path: '/json-formatter.html' },
      { name: 'Regex Tester', path: '/regex-tester.html' },
      { name: 'Hash Generator', path: '/hash-generator.html' },
      { name: 'Programming Calculator', path: '/programming-calculator.html' }
    ],
    howWeCalculate: {
      formula: "beautify: depth += 1 at '{', depth −= 1 at '}', indent = depth × 2 spaces  ·  minify: collapse whitespace runs, tighten around { } ; : ,",
      explanation: "The beautifier walks the source character by character, breaking after opening and closing braces and prefixing each resulting line with two spaces per depth level, so nesting is restored without reordering anything. The minifier does the inverse: every run of whitespace becomes one space, and spaces around punctuation are removed, leaving the token stream untouched.",
      example: "if(a){b();} → if(a){, then b(); indented two spaces, then } — three lines, identical tokens"
    },
    workedExample: {
      scenario: "Round-trip the tool's default snippet through beautify and back to minify",
      steps: [
        "Paste function test(){console.log(\"hello\");var x=1;} — 46 characters on a single line",
        "Beautify: insert a newline after { and place the closing } on its own line",
        "The depth counter is 1 inside the braces, so the inner statement is prefixed with two spaces: 50 characters across three lines",
        "Switch to Minify: whitespace runs collapse and spacing around punctuation is removed, returning the original 46-character line"
      ],
      result: "46 characters minified → 50 characters beautified → 46 characters again (identical tokens throughout)"
    },
    commonValues: {
      heading: "How each language is handled",
      columns: ["Language", "Beautify strategy", "Minify strategy"],
      rows: [
        ["JavaScript", "Newline after { and }, two-space depth indent", "Collapse whitespace, tighten around { } ; : ,"],
        ["CSS", "Break after { } and ;, normalise selector spacing", "Collapse whitespace, tighten around { } : ;"],
        ["HTML", "Line break between tags, two-space nesting", "Collapse whitespace, join adjacent tags"]
      ]
    }
  },
  'memory-size-calculator': {
    title: "Convert Bytes to Petabytes with a Memory Size Calculator",
    subtitle: "Memory Size Calculator",
    introduction: "Why does a drive sold as one terabyte show up as roughly 931 gigabytes? The answer is not marketing tricks — it is two legitimate systems of measurement sharing the same letter. Engineers count in powers of two because address lines work that way: ten lines address 1,024 locations, so memory people wrote K for 1,024 for decades. The International System counts in powers of ten, which is what drive manufacturers and network operators use. A memory size calculator reconciles the two by starting from bytes — the only unambiguous unit — and fanning out along the binary ladder that your RAM actually uses, while keeping the decimal equivalents visible. Enter any byte count or tap a preset (1 KB, 1 MB, 1 GB, a 4 GB module, a 1 TB drive) and watch bits, kilobytes, megabytes, gigabytes, terabytes and petabytes update together, so the number you quote in a spec sheet is the number everyone else expects.",
    mainContent: (
      <>
        <h3 className="text-xl font-bold text-white mb-4">Two Ladders, One Set of Letters</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The binary ladder multiplies by 1,024 at each step because 1,024 = 2¹⁰: 1 KB = 1,024 bytes, 1 MB = 1,048,576 bytes, 1 GB = 1,073,741,824 bytes, 1 TB = 1,099,511,627,776 bytes, and 1 PB = 1,125,899,906,842,624 bytes. This is the ladder in this calculator, and it matches how operating systems address memory: a 16 GB module is exactly 17,179,869,184 bytes, and 2¹⁰ possible addresses are needed to reach 1,024 locations because ten binary digits produce that many combinations.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          The decimal ladder multiplies by 1,000: 1 kB = 1,000 bytes, 1 MB = 10⁶, 1 GB = 10⁹, 1 TB = 10¹², 1 PB = 10¹⁵. It is the SI standard, it is what hard-drive and SSD vendors publish, and it is not a scam — it simply describes a different quantity. To end the ambiguity the IEC defined separate names in 1998: KiB, MiB, GiB, TiB and PiB for powers of 1,024, leaving kB, MB, GB, TB and PB exclusively for powers of 1,000. Software documentation that cares uses the IEC names; consumer labels rarely do, which is where the confusion lives.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Reading the Numbers You Actually See</h3>
        <p className="text-neutral-400 leading-relaxed mb-6">
          A 1 TB drive holds 10¹² bytes. Divide by 2³⁰ bytes per gibibyte and you get 931.32 — which is why Windows reports about 931 GB for the same hardware the box calls 1 TB. The gap is a constant 7.4%, present at every unit above kilobyte. The same arithmetic explains RAM claims (an 8 GB module is 8,589,934,592 bytes), operating-system free-space figures, and why two tools disagree about a file's size when one is dividing by 1,024 and the other by 1,000.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-6">
          Bits versus bytes causes a second round of confusion. Eight bits make one byte, storage is quoted in bytes, and network links are quoted in bits per second — so a 100 megabit connection delivers 100,000,000 bits per second, which is 12.5 megabytes per second of actual transfer. For text, size depends on encoding: UTF-8 uses one byte for ASCII characters, two bytes for many Latin, Cyrillic and Greek letters, three bytes for most CJK characters and four for emoji, so one mebibyte holds about 1,048,576 English characters but only about 349,525 Chinese ones.
        </p>
        <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
          <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Quick Tips</h4>
          <ul className="text-neutral-300 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>When two systems disagree, compare raw bytes: 1 GB = 1,000,000,000 B, 1 GiB = 1,073,741,824 B — 7.4% apart.</li>
            <li>32-bit address spaces top out at 2³² = 4,294,967,296 bytes, which is the 4 GB memory wall in one line.</li>
            <li>Speeds in Mbps are bits: divide by 8 to get megabytes per second.</li>
            <li>Powers of two are not arbitrary — 2¹⁰ = 1,024, 2²⁰ ≈ 10⁶, 2³⁰ ≈ 10⁹, so each binary unit sits within 7% of its decimal twin.</li>
          </ul>
        </div>
      </>
    ),
    faqs: [
      { question: "Is a kilobyte 1,000 or 1,024 bytes?", answer: "Both, depending on who is counting. The SI kilobyte is 1,000 bytes and is what drive vendors and network equipment use; the traditional binary kilobyte is 1,024 bytes and is what memory addressing and most operating systems use. The IEC resolved the collision in 1998 by naming the binary unit KiB. This calculator uses the 1,024 ladder and flags the decimal convention in its note." },
      { question: "Why does my 1 TB drive show about 931 GB?", answer: "The drive contains 1,000,000,000,000 bytes (SI terabyte). Windows divides by 2³⁰ to display gibibytes: 10¹² ÷ 1,073,741,824 = 931.32. So the same hardware is one terabyte by the box's arithmetic and 931 gigabytes by the operating system's — a 7.4% difference, not missing storage." },
      { question: "How many bytes are in a gigabyte?", answer: "1 GB (decimal) = 1,000,000,000 bytes. 1 GiB (binary) = 1,073,741,824 bytes. The difference between them is 73,741,824 bytes, and the ratio is the same 1.074 factor you see between kilobytes, megabytes and terabytes." },
      { question: "What is the difference between bits and bytes?", answer: "A byte is eight bits, and the two units appear in different places: storage and file sizes are counted in bytes, while network bandwidth is quoted in bits per second. A 1,000 megabit (1 Gbps) link therefore transfers about 125 megabytes per second — divide by 8 every time you convert between the two families." },
      { question: "How many characters fit in a megabyte?", answer: "With ASCII or plain English UTF-8 text, one character takes one byte, so a megabyte holds 1,000,000 characters (1,048,576 in a mebibyte). Text in Chinese, Japanese or Korean typically uses three bytes per character in UTF-8, dropping capacity to about 349,525 characters per mebibyte, and emoji take four bytes each." },
      { question: "Why are memory sizes powers of two?", answer: "Because hardware addresses are binary. Ten address lines select one of 2¹⁰ = 1,024 locations, twenty select 2²⁰ ≈ a million, thirty select 2³⁰ ≈ a billion — so modules, pages and buffers are built in powers of two to use every combination an address bus can express. That is also why 1,024 was casually written as 1K for so long." },
      { question: "What is the largest number a 64-bit system can hold?", answer: "Unsigned, 2⁶⁴ − 1 = 18,446,744,073,709,551,615 bytes — about 16 exbibytes. Signed, the range is −9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. Addressing is a separate question from counting: 64-bit hardware often implements 48 or 52 usable address bits, which is still far beyond any single machine's memory." },
      { question: "How many bytes are in a petabyte?", answer: "Decimal: 1 PB = 1,000,000,000,000,000 bytes (10¹⁵). Binary: 1 PiB = 1024⁵ = 1,125,899,906,842,624 bytes (2⁵⁰). The calculator reports the binary figure, since its ladder is 1,024-based throughout — check which convention your storage vendor is quoting before you compare numbers." },
      { question: "Why does my phone show less storage than advertised?", answer: "Three effects stack up: the advertised capacity is decimal (so a 64 GB device holds 64,000,000,000 bytes, not 68,719,476,736), the file system reserves space for its own structures, and the operating system, recovery partition and preinstalled apps occupy part of the device. Seeing roughly 10–15% less than the box number is normal." },
      { question: "Does the calculator store the numbers I enter?", answer: "No. Conversion runs entirely in your page session — the byte value you type is processed locally and is never transmitted, logged or saved, so you can size internal datasets and capacity plans without exposing them." }
    ],
    relatedCalculators: [
      { name: 'Binary/Hex/Decimal', path: '/binary-hex-decimal-converter.html' },
      { name: 'Bitwise Calculator', path: '/bitwise-calculator.html' },
      { name: 'Unit Conversion', path: '/unit-conversion-calculator.html' },
      { name: 'Programming Calculator', path: '/programming-calculator.html' }
    ],
    howWeCalculate: {
      formula: "unit = bytes ÷ 1024ᵏ  (k = 1 KB, 2 MB, 3 GB, 4 TB, 5 PB)  ·  bits = bytes × 8",
      explanation: "Bytes are treated as the source of truth and divided along the binary ladder, because each higher unit is exactly 1,024 of the one below it (2¹⁰). Bits are reported by multiplying by eight. The page also carries a note with the SI equivalents, where each unit is 1,000 of the previous one, so both conventions can be quoted accurately.",
      example: "1,073,741,824 ÷ 1024³ = 1 GB  ·  1,073,741,824 × 8 = 8,589,934,592 bits"
    },
    workedExample: {
      scenario: "A 1 TB external drive is plugged into a computer that reports gibibytes",
      steps: [
        "Manufacturer size (SI): 1 TB = 10¹² = 1,000,000,000,000 bytes",
        "Bytes per binary gibibyte: 2³⁰ = 1,073,741,824",
        "Divide: 1,000,000,000,000 ÷ 1,073,741,824 = 931.32",
        "The operating system rounds that to 931 and labels the unit GB"
      ],
      result: "1 TB = 931.32 GiB — the ~7% gap is the 1,000 versus 1,024 base difference"
    },
    commonValues: {
      heading: "Binary ladder (this tool) versus decimal ladder (SI)",
      columns: ["Unit", "Bytes (binary, ×1024)", "Bytes (decimal, ×1000)"],
      rows: [
        ["KB", "1,024", "1,000"],
        ["MB", "1,048,576", "1,000,000"],
        ["GB", "1,073,741,824", "1,000,000,000"],
        ["TB", "1,099,511,627,776", "1,000,000,000,000"],
        ["PB", "1,125,899,906,842,624", "1,000,000,000,000,000"]
      ]
    }
  }
};
