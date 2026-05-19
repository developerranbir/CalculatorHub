(function () {
  "use strict";

  const categories = [
    { id: "finance", name: "Finance Calculators", icon: "Rs", description: "Loans, investments, tax, salary and business money math." },
    { id: "education", name: "Education Calculators", icon: "Ed", description: "Marks, grades, attendance, GPA and admission planning." },
    { id: "health", name: "Health & Fitness Calculators", icon: "Ht", description: "Body, nutrition, pregnancy, pace and sleep estimates." },
    { id: "electrical", name: "Electrical Calculators", icon: "El", description: "Power, current, batteries, solar, wiring and energy bills." },
    { id: "construction", name: "Construction Calculators", icon: "Ct", description: "Paint, concrete, brick, tile, steel and land measurements." },
    { id: "date-time", name: "Date & Time Calculators", icon: "Dt", description: "Age, date gaps, working days, countdowns and events." },
    { id: "math", name: "Math Calculators", icon: "Mt", description: "Percentages, fractions, ratios, roots, matrices and equations." },
    { id: "unit", name: "Unit Conversion Calculators", icon: "Un", description: "Convert length, area, volume, speed, data, pressure and more." },
    { id: "vehicle", name: "Vehicle Calculators", icon: "Vh", description: "Fuel, mileage, trip cost, insurance, EMI and EV charging." },
    { id: "business", name: "Business Calculators", icon: "Bz", description: "Revenue, ROI, payroll, inventory, commission and invoices." },
    { id: "creator", name: "Social Media & Creator Calculators", icon: "Cr", description: "YouTube, Instagram, CPM, ads, affiliate and SEO ROI." },
    { id: "lifestyle", name: "Lifestyle Calculators", icon: "Lf", description: "Budgets, rent split, cooking scale and fun daily tools." }
  ];

  const categoryMap = Object.fromEntries(categories.map((category) => [category.id, category]));
  const calculators = [];
  const palette = ["#0f766e", "#d97706", "#2563eb", "#be123c", "#15803d", "#7c3aed", "#475569", "#ea580c"];

  const selectOptions = {
    yesNo: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ],
    regime: [
      { value: "new", label: "New tax regime" },
      { value: "old", label: "Old tax regime" }
    ],
    ageGroup: [
      { value: "under60", label: "Below 60 years" },
      { value: "senior", label: "60 to 79 years" },
      { value: "super", label: "80 years or more" }
    ],
    gender: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" }
    ],
    activity: [
      { value: "1.2", label: "Sedentary" },
      { value: "1.375", label: "Light activity" },
      { value: "1.55", label: "Moderate activity" },
      { value: "1.725", label: "Very active" },
      { value: "1.9", label: "Athlete level" }
    ],
    goal: [
      { value: "-500", label: "Weight loss" },
      { value: "0", label: "Maintain weight" },
      { value: "350", label: "Lean gain" }
    ],
    gstMode: [
      { value: "add", label: "Add GST to base amount" },
      { value: "remove", label: "Remove GST from total" }
    ],
    gradeScale: [
      { value: "10", label: "10 point scale" },
      { value: "4", label: "4 point scale" }
    ],
    operation: [
      { value: "add", label: "Add" },
      { value: "subtract", label: "Subtract" },
      { value: "multiply", label: "Multiply" },
      { value: "divide", label: "Divide" }
    ],
    shape: [
      { value: "circle", label: "Circle" },
      { value: "rectangle", label: "Rectangle" },
      { value: "triangle", label: "Triangle" },
      { value: "sphere", label: "Sphere" },
      { value: "cylinder", label: "Cylinder" }
    ],
    phase: [
      { value: "single", label: "Single phase" },
      { value: "three", label: "Three phase" }
    ],
    currency: [
      { value: "INR", label: "INR" },
      { value: "USD", label: "USD" },
      { value: "EUR", label: "EUR" },
      { value: "GBP", label: "GBP" },
      { value: "AED", label: "AED" },
      { value: "SGD", label: "SGD" }
    ],
    weekend: [
      { value: "satSun", label: "Saturday and Sunday" },
      { value: "sun", label: "Sunday only" }
    ],
    conversionUnit: {
      length: [
        ["mm", "Millimeter"], ["cm", "Centimeter"], ["m", "Meter"], ["km", "Kilometer"], ["in", "Inch"], ["ft", "Foot"], ["yd", "Yard"], ["mi", "Mile"]
      ],
      weight: [
        ["mg", "Milligram"], ["g", "Gram"], ["kg", "Kilogram"], ["tonne", "Tonne"], ["oz", "Ounce"], ["lb", "Pound"]
      ],
      area: [
        ["sqm", "Square meter"], ["sqft", "Square foot"], ["sqyd", "Square yard"], ["acre", "Acre"], ["hectare", "Hectare"]
      ],
      volume: [
        ["ml", "Milliliter"], ["l", "Liter"], ["cum", "Cubic meter"], ["cft", "Cubic foot"], ["gal", "US gallon"]
      ],
      speed: [
        ["mps", "m/s"], ["kmh", "km/h"], ["mph", "mph"], ["knot", "knot"]
      ],
      time: [
        ["sec", "Second"], ["min", "Minute"], ["hr", "Hour"], ["day", "Day"], ["week", "Week"], ["month", "Month"], ["year", "Year"]
      ],
      fuel: [
        ["kmpl", "km/l"], ["l100km", "L/100 km"], ["mpg_us", "mpg US"], ["mpg_uk", "mpg UK"]
      ],
      pressure: [
        ["pa", "Pascal"], ["kpa", "Kilopascal"], ["bar", "Bar"], ["psi", "PSI"], ["atm", "Atmosphere"]
      ],
      data: [
        ["b", "Byte"], ["kb", "KB"], ["mb", "MB"], ["gb", "GB"], ["tb", "TB"]
      ]
    }
  };

  function add(definition) {
    calculators.push({
      keywords: "",
      disclaimer: "",
      ...definition
    });
  }

  function n(id, label, value, options = {}) {
    return { id, label, type: "number", default: value, min: options.min ?? 0, max: options.max, step: options.step ?? "any", hint: options.hint || "", wide: options.wide || false };
  }

  function text(id, label, value, options = {}) {
    return { id, label, type: options.type || "text", default: value, hint: options.hint || "", wide: options.wide || false };
  }

  function area(id, label, value, options = {}) {
    return { id, label, type: "textarea", default: value, hint: options.hint || "", wide: true };
  }

  function sel(id, label, value, options, hint = "") {
    return { id, label, type: "select", default: value, options, hint };
  }

  function dateField(id, label, value, hint = "") {
    return { id, label, type: "date", default: value, hint };
  }

  function timeField(id, label, value, hint = "") {
    return { id, label, type: "time", default: value, hint };
  }

  function optionPairs(pairs) {
    return pairs.map(([value, label]) => ({ value, label }));
  }

  function todayISO(offsetDays = 0) {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().slice(0, 10);
  }

  function nowTime() {
    const date = new Date();
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  function num(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function safeDiv(top, bottom, fallback = 0) {
    return Math.abs(bottom) > 1e-9 ? top / bottom : fallback;
  }

  function round(value, digits = 2) {
    const factor = 10 ** digits;
    return Math.round((num(value) + Number.EPSILON) * factor) / factor;
  }

  function fmt(value, digits = 2) {
    return num(value).toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });
  }

  function fmtLoose(value, digits = 2) {
    return num(value).toLocaleString("en-IN", { maximumFractionDigits: digits });
  }

  function money(value) {
    const sign = num(value) < 0 ? "-" : "";
    return `${sign}Rs. ${Math.abs(num(value)).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  }

  function pct(value) {
    return `${fmt(value, 2)}%`;
  }

  function daysText(days) {
    return `${fmtLoose(days, 0)} days`;
  }

  function result(summary, metrics, chart, notes = "") {
    return { summary, metrics, chart, notes };
  }

  function metric(label, value) {
    return { label, value };
  }

  function bar(labels, values) {
    return { type: "bar", labels, values: values.map((value) => Math.max(0, num(value))) };
  }

  function donut(labels, values) {
    return { type: "donut", labels, values: values.map((value) => Math.max(0, num(value))) };
  }

  function parseList(value) {
    return String(value || "")
      .split(/[,\n ]+/)
      .map((item) => Number(item.trim()))
      .filter((item) => Number.isFinite(item));
  }

  function parseDate(value) {
    if (!value) return new Date();
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? new Date() : date;
  }

  function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function dateLabel(date) {
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  function daysBetween(start, end) {
    return Math.round((parseDate(end) - parseDate(start)) / 86400000);
  }

  function timeToMinutes(value) {
    const [hours, minutes] = String(value || "00:00").split(":").map(Number);
    return (num(hours) * 60) + num(minutes);
  }

  function minutesToTime(totalMinutes) {
    const minutes = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  }

  function emi(principal, annualRate, months) {
    const p = Math.max(0, num(principal));
    const m = Math.max(1, num(months));
    const rate = num(annualRate) / 1200;
    if (Math.abs(rate) < 1e-9) {
      const payment = p / m;
      return { emi: payment, total: payment * m, interest: 0 };
    }
    const power = (1 + rate) ** m;
    const payment = p * rate * power / (power - 1);
    return { emi: payment, total: payment * m, interest: payment * m - p };
  }

  function emiResult(title, principal, rate, months, extra = []) {
    const calc = emi(principal, rate, months);
    return result(
      `${title}: estimated monthly EMI is ${money(calc.emi)}.`,
      [
        metric("Monthly EMI", money(calc.emi)),
        metric("Principal", money(principal)),
        metric("Total interest", money(calc.interest)),
        metric("Total payment", money(calc.total)),
        metric("Tenure", `${fmtLoose(months, 0)} months`),
        ...extra
      ],
      donut(["Principal", "Interest"], [principal, calc.interest])
    );
  }

  function addSimpleLoan(id, name, description, defaults, keywords) {
    add({
      id,
      name,
      category: "finance",
      description,
      keywords,
      fields: [
        n("principal", "Loan amount", defaults.principal, { min: 1 }),
        n("rate", "Annual interest rate (%)", defaults.rate, { min: 0, step: 0.01 }),
        n("tenure", "Tenure (years)", defaults.tenure, { min: 0.1, step: 0.1 })
      ],
      calculate: (v) => emiResult(name, v.principal, v.rate, v.tenure * 12)
    });
  }

  function addAssetLoan(id, name, description, assetLabel, defaults, keywords) {
    add({
      id,
      name,
      category: "finance",
      description,
      keywords,
      fields: [
        n("assetPrice", assetLabel, defaults.assetPrice, { min: 1 }),
        n("downPayment", "Down payment", defaults.downPayment, { min: 0 }),
        n("rate", "Annual interest rate (%)", defaults.rate, { min: 0, step: 0.01 }),
        n("tenure", "Tenure (years)", defaults.tenure, { min: 0.1, step: 0.1 }),
        n("processing", "Processing fee", defaults.processing || 0, { min: 0 })
      ],
      calculate: (v) => {
        const principal = Math.max(0, v.assetPrice - v.downPayment);
        const calc = emi(principal, v.rate, v.tenure * 12);
        return result(
          `${name}: loan amount is ${money(principal)} and estimated EMI is ${money(calc.emi)}.`,
          [
            metric("Loan amount", money(principal)),
            metric("Monthly EMI", money(calc.emi)),
            metric("Total interest", money(calc.interest)),
            metric("Processing fee", money(v.processing)),
            metric("Total outflow", money(calc.total + v.processing))
          ],
          donut(["Down payment", "Principal", "Interest", "Fee"], [v.downPayment, principal, calc.interest, v.processing])
        );
      }
    });
  }

  function futureValueLump(principal, annualRate, years) {
    return num(principal) * (1 + num(annualRate) / 100) ** num(years);
  }

  function futureValueSip(monthly, annualRate, years, stepUp = 0) {
    const months = Math.max(1, Math.round(num(years) * 12));
    const monthlyRate = num(annualRate) / 1200;
    let balance = 0;
    let invested = 0;
    let contribution = num(monthly);
    for (let month = 1; month <= months; month += 1) {
      if (month > 1 && (month - 1) % 12 === 0) contribution *= 1 + (num(stepUp) / 100);
      balance = (balance + contribution) * (1 + monthlyRate);
      invested += contribution;
    }
    return { value: balance, invested, gain: balance - invested };
  }

  function addUnitConverter(type, name, description, baseFactors, defaults) {
    add({
      id: `${type}-converter`,
      name,
      category: "unit",
      description,
      keywords: `${type} conversion converter unit`,
      fields: [
        n("amount", "Amount", defaults.amount, { step: 0.0001 }),
        sel("from", "From", defaults.from, optionPairs(selectOptions.conversionUnit[type])),
        sel("to", "To", defaults.to, optionPairs(selectOptions.conversionUnit[type]))
      ],
      calculate: (v) => {
        let converted;
        if (type === "temperature") {
          converted = convertTemperature(v.amount, v.from, v.to);
        } else if (type === "fuel") {
          converted = convertFuelEconomy(v.amount, v.from, v.to);
        } else {
          converted = v.amount * baseFactors[v.from] / baseFactors[v.to];
        }
        const rate = type === "fuel" ? convertFuelEconomy(1, v.from, v.to) : baseFactors[v.from] / baseFactors[v.to];
        return result(
          `${fmtLoose(v.amount, 4)} ${v.from} = ${fmtLoose(converted, 4)} ${v.to}.`,
          [
            metric("Input", `${fmtLoose(v.amount, 4)} ${v.from}`),
            metric("Converted value", `${fmtLoose(converted, 4)} ${v.to}`),
            metric("Rate", `1 ${v.from} = ${fmtLoose(rate, 6)} ${v.to}`)
          ],
          bar(["Input", "Converted"], [Math.abs(v.amount), Math.abs(converted)])
        );
      }
    });
  }

  function convertTemperature(amount, from, to) {
    let celsius = num(amount);
    if (from === "f") celsius = (amount - 32) * 5 / 9;
    if (from === "k") celsius = amount - 273.15;
    if (to === "f") return celsius * 9 / 5 + 32;
    if (to === "k") return celsius + 273.15;
    return celsius;
  }

  function convertFuelEconomy(amount, from, to) {
    const value = Math.max(0.000001, num(amount));
    let kmPerLiter = value;
    if (from === "l100km") kmPerLiter = 100 / value;
    if (from === "mpg_us") kmPerLiter = value * 0.425144;
    if (from === "mpg_uk") kmPerLiter = value * 0.354006;
    if (to === "l100km") return 100 / kmPerLiter;
    if (to === "mpg_us") return kmPerLiter / 0.425144;
    if (to === "mpg_uk") return kmPerLiter / 0.354006;
    return kmPerLiter;
  }

  function gcd(a, b) {
    let x = Math.abs(Math.round(a));
    let y = Math.abs(Math.round(b));
    while (y) [x, y] = [y, x % y];
    return x || 1;
  }

  function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
  }

  function gradeFromPercentage(value) {
    const percent = num(value);
    if (percent >= 90) return "A+";
    if (percent >= 80) return "A";
    if (percent >= 70) return "B+";
    if (percent >= 60) return "B";
    if (percent >= 50) return "C";
    if (percent >= 40) return "D";
    return "F";
  }

  function taxBySlabs(income, slabs) {
    let last = 0;
    let tax = 0;
    for (const slab of slabs) {
      const upper = slab.upTo;
      const taxable = Math.max(0, Math.min(income, upper) - last);
      tax += taxable * slab.rate;
      if (income <= upper) break;
      last = upper;
    }
    return tax;
  }

  function incomeTax(values) {
    const income = Math.max(0, num(values.income));
    const regime = values.regime;
    const newSlabs = [
      { upTo: 400000, rate: 0 },
      { upTo: 800000, rate: 0.05 },
      { upTo: 1200000, rate: 0.10 },
      { upTo: 1600000, rate: 0.15 },
      { upTo: 2000000, rate: 0.20 },
      { upTo: 2400000, rate: 0.25 },
      { upTo: Infinity, rate: 0.30 }
    ];
    const oldUnder60 = [
      { upTo: 250000, rate: 0 },
      { upTo: 500000, rate: 0.05 },
      { upTo: 1000000, rate: 0.20 },
      { upTo: Infinity, rate: 0.30 }
    ];
    const oldSenior = [
      { upTo: 300000, rate: 0 },
      { upTo: 500000, rate: 0.05 },
      { upTo: 1000000, rate: 0.20 },
      { upTo: Infinity, rate: 0.30 }
    ];
    const oldSuper = [
      { upTo: 500000, rate: 0 },
      { upTo: 1000000, rate: 0.20 },
      { upTo: Infinity, rate: 0.30 }
    ];
    const slabs = regime === "new" ? newSlabs : values.ageGroup === "super" ? oldSuper : values.ageGroup === "senior" ? oldSenior : oldUnder60;
    let baseTax = taxBySlabs(income, slabs);
    const rebate = regime === "new" && income <= 1200000 ? Math.min(baseTax, 60000) : regime === "old" && income <= 500000 ? Math.min(baseTax, 12500) : 0;
    baseTax = Math.max(0, baseTax - rebate);
    let surchargeRate = 0;
    if (income > 50000000) surchargeRate = regime === "new" ? 0.25 : 0.37;
    else if (income > 20000000) surchargeRate = 0.25;
    else if (income > 10000000) surchargeRate = 0.15;
    else if (income > 5000000) surchargeRate = 0.10;
    const surcharge = baseTax * surchargeRate;
    const cess = (baseTax + surcharge) * 0.04;
    return { baseTax, rebate, surcharge, cess, total: baseTax + surcharge + cess };
  }

  function makeAge(dob, onDate) {
    const birth = parseDate(dob);
    const end = parseDate(onDate);
    let years = end.getFullYear() - birth.getFullYear();
    let months = end.getMonth() - birth.getMonth();
    let days = end.getDate() - birth.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  }

  function loveScore(a, b) {
    const textValue = `${String(a).trim().toLowerCase()}|${String(b).trim().toLowerCase()}`;
    let hash = 0;
    for (let i = 0; i < textValue.length; i += 1) hash = ((hash << 5) - hash) + textValue.charCodeAt(i);
    return 35 + (Math.abs(hash) % 66);
  }

  addSimpleLoan("emi-calculator", "EMI Calculator", "Calculate monthly EMI, total interest and full repayment for any loan.", { principal: 500000, rate: 9, tenure: 5 }, "emi loan monthly installment");
  addAssetLoan("home-loan-calculator", "Home Loan Calculator", "Estimate home loan EMI from property price, down payment, rate and tenure.", "Property price", { assetPrice: 5000000, downPayment: 1000000, rate: 8.5, tenure: 20, processing: 10000 }, "home loan housing emi");
  addAssetLoan("car-loan-calculator", "Car Loan Calculator", "Estimate car loan EMI and total ownership finance outflow.", "Car on-road price", { assetPrice: 1200000, downPayment: 250000, rate: 9.5, tenure: 5, processing: 5000 }, "car auto vehicle emi");
  addSimpleLoan("personal-loan-calculator", "Personal Loan Calculator", "Calculate EMI and interest for a personal loan.", { principal: 300000, rate: 14, tenure: 3 }, "personal loan emi");
  add({
    id: "education-loan-calculator",
    name: "Education Loan Calculator",
    category: "finance",
    description: "Estimate education loan cost including moratorium interest and repayment EMI.",
    keywords: "education student loan emi",
    fields: [
      n("principal", "Course loan amount", 1000000, { min: 1 }),
      n("rate", "Annual interest rate (%)", 10.5, { step: 0.01 }),
      n("moratorium", "Course plus grace period (years)", 4, { step: 0.1 }),
      n("repayYears", "Repayment tenure (years)", 7, { step: 0.1 })
    ],
    calculate: (v) => {
      const interestDuringStudy = v.principal * (v.rate / 100) * v.moratorium;
      const repayPrincipal = v.principal + interestDuringStudy;
      return emiResult("Education loan", repayPrincipal, v.rate, v.repayYears * 12, [metric("Moratorium interest", money(interestDuringStudy))]);
    }
  });
  add({
    id: "sip-calculator",
    name: "SIP Calculator",
    category: "finance",
    description: "Project future value of monthly SIP investments with optional yearly step-up.",
    keywords: "sip mutual fund investment",
    fields: [
      n("monthly", "Monthly investment", 10000, { min: 1 }),
      n("rate", "Expected annual return (%)", 12, { step: 0.01 }),
      n("years", "Investment duration (years)", 10, { step: 0.1 }),
      n("stepUp", "Yearly step-up (%)", 0, { step: 0.1 })
    ],
    calculate: (v) => {
      const calc = futureValueSip(v.monthly, v.rate, v.years, v.stepUp);
      return result(`SIP maturity value is estimated at ${money(calc.value)}.`, [
        metric("Invested amount", money(calc.invested)),
        metric("Estimated gain", money(calc.gain)),
        metric("Maturity value", money(calc.value)),
        metric("Duration", `${fmtLoose(v.years, 1)} years`)
      ], donut(["Invested", "Gain"], [calc.invested, calc.gain]));
    }
  });
  add({
    id: "lumpsum-investment-calculator",
    name: "Lumpsum Investment Calculator",
    category: "finance",
    description: "Calculate future value of a one-time investment.",
    keywords: "lumpsum investment future value",
    fields: [n("principal", "Investment amount", 100000, { min: 1 }), n("rate", "Expected annual return (%)", 12, { step: 0.01 }), n("years", "Duration (years)", 10, { step: 0.1 })],
    calculate: (v) => {
      const value = futureValueLump(v.principal, v.rate, v.years);
      return result(`Estimated future value is ${money(value)}.`, [metric("Investment", money(v.principal)), metric("Gain", money(value - v.principal)), metric("Future value", money(value))], donut(["Investment", "Gain"], [v.principal, value - v.principal]));
    }
  });
  add({
    id: "mutual-fund-calculator",
    name: "Mutual Fund Calculator",
    category: "finance",
    description: "Combine lumpsum and monthly SIP to estimate mutual fund value.",
    keywords: "mutual fund sip lumpsum",
    fields: [n("lumpsum", "Initial investment", 50000), n("monthly", "Monthly SIP", 5000), n("rate", "Expected annual return (%)", 12, { step: 0.01 }), n("expense", "Expense ratio (%)", 1, { step: 0.01 }), n("years", "Duration (years)", 10, { step: 0.1 })],
    calculate: (v) => {
      const effective = Math.max(0, v.rate - v.expense);
      const sip = futureValueSip(v.monthly, effective, v.years, 0);
      const lump = futureValueLump(v.lumpsum, effective, v.years);
      const invested = v.lumpsum + sip.invested;
      const total = lump + sip.value;
      return result(`Estimated mutual fund value after expenses is ${money(total)}.`, [metric("Invested amount", money(invested)), metric("Estimated gain", money(total - invested)), metric("Future value", money(total)), metric("Effective return", pct(effective))], donut(["Invested", "Gain"], [invested, total - invested]));
    }
  });
  add({
    id: "fixed-deposit-calculator",
    name: "Fixed Deposit (FD) Calculator",
    category: "finance",
    description: "Calculate FD maturity amount with compound interest.",
    keywords: "fd fixed deposit maturity",
    fields: [n("principal", "Deposit amount", 200000, { min: 1 }), n("rate", "Annual interest rate (%)", 7, { step: 0.01 }), n("years", "Tenure (years)", 3, { step: 0.1 }), n("compound", "Compounding per year", 4, { min: 1, step: 1 })],
    calculate: (v) => {
      const maturity = v.principal * (1 + v.rate / (100 * v.compound)) ** (v.compound * v.years);
      return result(`FD maturity amount is ${money(maturity)}.`, [metric("Principal", money(v.principal)), metric("Interest earned", money(maturity - v.principal)), metric("Maturity amount", money(maturity))], donut(["Principal", "Interest"], [v.principal, maturity - v.principal]));
    }
  });
  add({
    id: "recurring-deposit-calculator",
    name: "Recurring Deposit (RD) Calculator",
    category: "finance",
    description: "Estimate maturity amount for monthly recurring deposits.",
    keywords: "rd recurring deposit maturity",
    fields: [n("monthly", "Monthly deposit", 5000, { min: 1 }), n("rate", "Annual interest rate (%)", 7, { step: 0.01 }), n("months", "Tenure (months)", 36, { min: 1, step: 1 })],
    calculate: (v) => {
      const monthlyRate = v.rate / 1200;
      let balance = 0;
      for (let i = 0; i < v.months; i += 1) balance = (balance + v.monthly) * (1 + monthlyRate);
      const invested = v.monthly * v.months;
      return result(`RD maturity amount is ${money(balance)}.`, [metric("Total deposit", money(invested)), metric("Interest earned", money(balance - invested)), metric("Maturity amount", money(balance))], donut(["Deposits", "Interest"], [invested, balance - invested]));
    }
  });
  add({
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "finance",
    description: "Calculate compound interest and final amount.",
    keywords: "compound interest",
    fields: [n("principal", "Principal", 100000, { min: 1 }), n("rate", "Annual rate (%)", 10, { step: 0.01 }), n("years", "Time (years)", 5, { step: 0.1 }), n("compound", "Compounding per year", 12, { min: 1, step: 1 })],
    calculate: (v) => {
      const amount = v.principal * (1 + v.rate / (100 * v.compound)) ** (v.compound * v.years);
      return result(`Compound amount is ${money(amount)}.`, [metric("Principal", money(v.principal)), metric("Interest", money(amount - v.principal)), metric("Amount", money(amount))], donut(["Principal", "Interest"], [v.principal, amount - v.principal]));
    }
  });
  add({
    id: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    category: "finance",
    description: "Calculate simple interest for principal, rate and time.",
    keywords: "simple interest",
    fields: [n("principal", "Principal", 100000, { min: 1 }), n("rate", "Annual rate (%)", 10, { step: 0.01 }), n("years", "Time (years)", 3, { step: 0.1 })],
    calculate: (v) => {
      const interest = v.principal * v.rate * v.years / 100;
      return result(`Simple interest is ${money(interest)}.`, [metric("Principal", money(v.principal)), metric("Interest", money(interest)), metric("Total amount", money(v.principal + interest))], donut(["Principal", "Interest"], [v.principal, interest]));
    }
  });
  add({
    id: "gst-calculator",
    name: "GST Calculator",
    category: "finance",
    description: "Add or remove GST from an amount using a chosen GST rate.",
    keywords: "gst tax goods services india",
    fields: [n("amount", "Amount", 10000, { min: 0 }), n("rate", "GST rate (%)", 18, { min: 0, step: 0.01 }), sel("mode", "Calculation mode", "add", selectOptions.gstMode)],
    calculate: (v) => {
      const tax = v.mode === "add" ? v.amount * v.rate / 100 : v.amount - (v.amount / (1 + v.rate / 100));
      const base = v.mode === "add" ? v.amount : v.amount - tax;
      const total = base + tax;
      return result(`GST amount is ${money(tax)} and final total is ${money(total)}.`, [metric("Base amount", money(base)), metric("GST", money(tax)), metric("Total", money(total)), metric("CGST + SGST", `${money(tax / 2)} + ${money(tax / 2)}`)], donut(["Base", "GST"], [base, tax]));
    }
  });
  add({
    id: "income-tax-calculator",
    name: "Income Tax Calculator",
    category: "finance",
    description: "Estimate Indian income tax using AY 2026-27 old and new regime slabs.",
    keywords: "income tax india ay 2026 27 old new regime",
    disclaimer: "Uses slab rates, rebate, surcharge and cess. It does not handle every special income, exemption or marginal relief case.",
    fields: [n("income", "Taxable annual income after deductions", 1200000, { min: 0 }), sel("regime", "Tax regime", "new", selectOptions.regime), sel("ageGroup", "Age group", "under60", selectOptions.ageGroup)],
    calculate: (v) => {
      const tax = incomeTax(v);
      return result(`Estimated income tax payable is ${money(tax.total)}.`, [metric("Base tax after rebate", money(tax.baseTax)), metric("Rebate applied", money(tax.rebate)), metric("Surcharge", money(tax.surcharge)), metric("Health and education cess", money(tax.cess)), metric("Total tax", money(tax.total))], donut(["Base tax", "Surcharge", "Cess"], [tax.baseTax, tax.surcharge, tax.cess]));
    }
  });
  add({
    id: "salary-calculator",
    name: "Salary Calculator",
    category: "finance",
    description: "Break down annual CTC into basic pay, HRA, PF and monthly gross salary.",
    keywords: "salary ctc basic hra pf",
    fields: [n("ctc", "Annual CTC", 900000, { min: 0 }), n("basicPct", "Basic salary (% of CTC)", 40, { step: 0.1 }), n("hraPct", "HRA (% of basic)", 50, { step: 0.1 }), n("employerPfPct", "Employer PF (% of basic)", 12, { step: 0.1 }), n("bonus", "Annual bonus included in CTC", 50000)],
    calculate: (v) => {
      const basic = v.ctc * v.basicPct / 100;
      const hra = basic * v.hraPct / 100;
      const pf = basic * v.employerPfPct / 100;
      const other = Math.max(0, v.ctc - basic - hra - pf - v.bonus);
      return result(`Estimated monthly gross salary is ${money((basic + hra + other) / 12)}.`, [metric("Annual basic", money(basic)), metric("Annual HRA", money(hra)), metric("Employer PF", money(pf)), metric("Other allowance", money(other)), metric("Monthly gross", money((basic + hra + other) / 12))], bar(["Basic", "HRA", "PF", "Other", "Bonus"], [basic, hra, pf, other, v.bonus]));
    }
  });
  add({
    id: "in-hand-salary-calculator",
    name: "In-hand Salary Calculator",
    category: "finance",
    description: "Estimate take-home salary after PF, tax and other deductions.",
    keywords: "take home in hand salary",
    fields: [n("gross", "Monthly gross salary", 70000, { min: 0 }), n("employeePf", "Employee PF", 3600), n("professionalTax", "Professional tax", 200), n("tds", "Monthly TDS", 5000), n("other", "Other deductions", 1000)],
    calculate: (v) => {
      const deductions = v.employeePf + v.professionalTax + v.tds + v.other;
      const net = v.gross - deductions;
      return result(`Estimated in-hand salary is ${money(net)} per month.`, [metric("Gross salary", money(v.gross)), metric("Total deductions", money(deductions)), metric("In-hand salary", money(net)), metric("Annual take-home", money(net * 12))], donut(["In-hand", "Deductions"], [net, deductions]));
    }
  });
  add({
    id: "retirement-calculator",
    name: "Retirement Calculator",
    category: "finance",
    description: "Estimate retirement corpus and monthly investment requirement.",
    keywords: "retirement corpus inflation sip",
    fields: [n("age", "Current age", 30, { min: 1 }), n("retireAge", "Retirement age", 60, { min: 1 }), n("monthlyExpense", "Current monthly expense", 50000), n("inflation", "Inflation (%)", 6, { step: 0.1 }), n("returnRate", "Expected investment return (%)", 10, { step: 0.1 }), n("currentSavings", "Current retirement savings", 500000), n("postRetireYears", "Years after retirement", 25, { min: 1 })],
    calculate: (v) => {
      const years = Math.max(0, v.retireAge - v.age);
      const futureMonthlyExpense = v.monthlyExpense * (1 + v.inflation / 100) ** years;
      const corpus = futureMonthlyExpense * 12 * v.postRetireYears;
      const futureSavings = futureValueLump(v.currentSavings, v.returnRate, years);
      const target = Math.max(0, corpus - futureSavings);
      const monthlyNeeded = safeDiv(target, (((1 + v.returnRate / 1200) ** (years * 12) - 1) / (v.returnRate / 1200 || 1)) * (1 + v.returnRate / 1200), target / Math.max(1, years * 12));
      return result(`Estimated retirement corpus needed is ${money(corpus)}.`, [metric("Future monthly expense", money(futureMonthlyExpense)), metric("Corpus needed", money(corpus)), metric("Future value of current savings", money(futureSavings)), metric("Monthly investment needed", money(monthlyNeeded))], bar(["Corpus", "Current savings FV", "Gap"], [corpus, futureSavings, target]));
    }
  });
  add({
    id: "inflation-calculator",
    name: "Inflation Calculator",
    category: "finance",
    description: "Find future cost after inflation.",
    keywords: "inflation future value price",
    fields: [n("cost", "Current cost", 100000), n("inflation", "Annual inflation (%)", 6, { step: 0.1 }), n("years", "Years", 10, { step: 0.1 })],
    calculate: (v) => {
      const future = v.cost * (1 + v.inflation / 100) ** v.years;
      return result(`${money(v.cost)} today may cost ${money(future)} in ${fmtLoose(v.years, 1)} years.`, [metric("Current cost", money(v.cost)), metric("Inflation impact", money(future - v.cost)), metric("Future cost", money(future))], donut(["Current", "Inflation"], [v.cost, future - v.cost]));
    }
  });
  add({
    id: "currency-converter",
    name: "Currency Converter",
    category: "finance",
    description: "Convert currency using a manually entered exchange rate.",
    keywords: "currency converter forex exchange",
    fields: [n("amount", "Amount", 1000, { step: 0.01 }), sel("from", "From currency", "INR", selectOptions.currency), sel("to", "To currency", "USD", selectOptions.currency), n("rate", "Exchange rate: 1 from = to", 0.012, { step: 0.000001, hint: "Enter the current market rate manually." })],
    calculate: (v) => {
      const converted = v.amount * v.rate;
      return result(`${fmtLoose(v.amount, 2)} ${v.from} = ${fmtLoose(converted, 2)} ${v.to}.`, [metric("Input", `${fmtLoose(v.amount, 2)} ${v.from}`), metric("Rate", fmtLoose(v.rate, 6)), metric("Converted amount", `${fmtLoose(converted, 2)} ${v.to}`)], bar(["Input", "Converted"], [Math.abs(v.amount), Math.abs(converted)]));
    }
  });
  add({
    id: "loan-eligibility-calculator",
    name: "Loan Eligibility Calculator",
    category: "finance",
    description: "Estimate eligible loan amount from income, obligations and FOIR.",
    keywords: "loan eligibility foir",
    fields: [n("income", "Monthly net income", 80000), n("obligations", "Existing monthly EMIs", 10000), n("foir", "Allowed EMI as % of income", 50, { step: 0.1 }), n("rate", "Loan interest rate (%)", 9, { step: 0.01 }), n("years", "Tenure (years)", 20, { step: 0.1 })],
    calculate: (v) => {
      const maxEmi = Math.max(0, v.income * v.foir / 100 - v.obligations);
      const monthlyRate = v.rate / 1200;
      const months = v.years * 12;
      const principal = monthlyRate ? maxEmi * ((1 + monthlyRate) ** months - 1) / (monthlyRate * (1 + monthlyRate) ** months) : maxEmi * months;
      return result(`Estimated eligible loan is ${money(principal)}.`, [metric("Maximum EMI", money(maxEmi)), metric("Eligible loan", money(principal)), metric("Tenure", `${fmtLoose(months, 0)} months`)], bar(["Income", "Existing EMI", "New EMI"], [v.income, v.obligations, maxEmi]));
    }
  });
  add({
    id: "loan-affordability-calculator",
    name: "Loan Affordability Calculator",
    category: "finance",
    description: "Find a comfortable loan size based on household monthly budget.",
    keywords: "loan affordability budget",
    fields: [n("income", "Monthly income", 100000), n("expenses", "Monthly expenses excluding EMI", 45000), n("savings", "Target monthly savings", 20000), n("rate", "Interest rate (%)", 9, { step: 0.01 }), n("years", "Tenure (years)", 15, { step: 0.1 })],
    calculate: (v) => {
      const affordableEmi = Math.max(0, v.income - v.expenses - v.savings);
      const monthlyRate = v.rate / 1200;
      const months = v.years * 12;
      const principal = monthlyRate ? affordableEmi * ((1 + monthlyRate) ** months - 1) / (monthlyRate * (1 + monthlyRate) ** months) : affordableEmi * months;
      return result(`Affordable loan amount is around ${money(principal)}.`, [metric("Affordable EMI", money(affordableEmi)), metric("Loan amount", money(principal)), metric("Budget left after EMI", money(v.income - v.expenses - affordableEmi))], bar(["Income", "Expenses", "Savings", "EMI"], [v.income, v.expenses, v.savings, affordableEmi]));
    }
  });
  add({
    id: "credit-card-emi-calculator",
    name: "Credit Card EMI Calculator",
    category: "finance",
    description: "Estimate EMI, interest and fee for a credit card purchase conversion.",
    keywords: "credit card emi",
    fields: [n("purchase", "Purchase amount", 60000), n("rate", "Annual interest rate (%)", 18, { step: 0.01 }), n("months", "EMI tenure (months)", 12, { min: 1, step: 1 }), n("feePct", "Processing fee (%)", 1, { step: 0.01 })],
    calculate: (v) => {
      const calc = emi(v.purchase, v.rate, v.months);
      const fee = v.purchase * v.feePct / 100;
      return result(`Credit card EMI is ${money(calc.emi)} per month.`, [metric("Monthly EMI", money(calc.emi)), metric("Interest", money(calc.interest)), metric("Processing fee", money(fee)), metric("Total cost", money(calc.total + fee))], donut(["Principal", "Interest", "Fee"], [v.purchase, calc.interest, fee]));
    }
  });
  add({
    id: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    category: "finance",
    description: "Calculate profit, margin and markup from cost and selling price.",
    keywords: "profit margin markup",
    fields: [n("cost", "Cost price", 700), n("selling", "Selling price", 1000)],
    calculate: (v) => {
      const profit = v.selling - v.cost;
      return result(`Profit margin is ${pct(safeDiv(profit, v.selling) * 100)}.`, [metric("Profit", money(profit)), metric("Margin", pct(safeDiv(profit, v.selling) * 100)), metric("Markup", pct(safeDiv(profit, v.cost) * 100))], donut(["Cost", "Profit"], [v.cost, profit]));
    }
  });
  add({
    id: "break-even-calculator",
    name: "Break-even Calculator",
    category: "finance",
    description: "Calculate units and sales needed to break even.",
    keywords: "break even fixed variable cost",
    fields: [n("fixed", "Fixed cost", 200000), n("price", "Selling price per unit", 500), n("variable", "Variable cost per unit", 250)],
    calculate: (v) => {
      const contribution = v.price - v.variable;
      const units = Math.ceil(safeDiv(v.fixed, contribution));
      return result(`Break-even point is ${fmtLoose(units, 0)} units.`, [metric("Contribution per unit", money(contribution)), metric("Break-even units", fmtLoose(units, 0)), metric("Break-even revenue", money(units * v.price))], bar(["Fixed cost", "Break-even revenue"], [v.fixed, units * v.price]));
    }
  });
  add({
    id: "discount-calculator",
    name: "Discount Calculator",
    category: "finance",
    description: "Calculate final price after discount and tax.",
    keywords: "discount sale offer",
    fields: [n("price", "Marked price", 5000), n("discount", "Discount (%)", 20, { step: 0.01 }), n("tax", "Tax after discount (%)", 0, { step: 0.01 })],
    calculate: (v) => {
      const discount = v.price * v.discount / 100;
      const subtotal = v.price - discount;
      const tax = subtotal * v.tax / 100;
      return result(`Final price is ${money(subtotal + tax)}.`, [metric("Discount saved", money(discount)), metric("Price after discount", money(subtotal)), metric("Tax", money(tax)), metric("Final price", money(subtotal + tax))], donut(["Final price", "Discount", "Tax"], [subtotal, discount, tax]));
    }
  });

  add({
    id: "percentage-calculator",
    name: "Percentage Calculator",
    category: "education",
    description: "Calculate percentage from obtained and total marks.",
    keywords: "percentage marks",
    fields: [n("obtained", "Obtained marks", 435), n("total", "Total marks", 500)],
    calculate: (v) => {
      const percentage = safeDiv(v.obtained, v.total) * 100;
      return result(`Percentage is ${pct(percentage)}.`, [metric("Obtained marks", fmtLoose(v.obtained, 2)), metric("Total marks", fmtLoose(v.total, 2)), metric("Percentage", pct(percentage))], donut(["Obtained", "Remaining"], [v.obtained, Math.max(0, v.total - v.obtained)]));
    }
  });
  add({
    id: "marks-calculator",
    name: "Marks Calculator",
    category: "education",
    description: "Calculate exam score from correct and wrong answers.",
    keywords: "marks exam negative marking",
    fields: [n("correct", "Correct answers", 75, { step: 1 }), n("wrong", "Wrong answers", 10, { step: 1 }), n("mark", "Marks per correct answer", 1), n("negative", "Negative marks per wrong answer", 0.25)],
    calculate: (v) => {
      const score = v.correct * v.mark - v.wrong * v.negative;
      return result(`Estimated score is ${fmtLoose(score, 2)} marks.`, [metric("Positive marks", fmtLoose(v.correct * v.mark, 2)), metric("Negative marks", fmtLoose(v.wrong * v.negative, 2)), metric("Final score", fmtLoose(score, 2))], bar(["Positive", "Negative", "Score"], [v.correct * v.mark, v.wrong * v.negative, Math.max(0, score)]));
    }
  });
  add({
    id: "grade-calculator",
    name: "Grade Calculator",
    category: "education",
    description: "Convert percentage into a common letter grade.",
    keywords: "grade percentage",
    fields: [n("percentage", "Percentage", 82, { min: 0, max: 100, step: 0.01 })],
    calculate: (v) => result(`Grade is ${gradeFromPercentage(v.percentage)}.`, [metric("Percentage", pct(v.percentage)), metric("Grade", gradeFromPercentage(v.percentage))], bar(["Percentage"], [v.percentage]))
  });
  add({
    id: "gpa-calculator",
    name: "GPA Calculator",
    category: "education",
    description: "Calculate GPA from total grade points and credits.",
    keywords: "gpa grade point average",
    fields: [n("gradePoints", "Sum of grade point x credit", 172), n("credits", "Total credits", 20), sel("scale", "Scale", "10", selectOptions.gradeScale)],
    calculate: (v) => {
      const gpa = safeDiv(v.gradePoints, v.credits);
      return result(`GPA is ${fmt(gpa, 2)} on ${v.scale} point scale.`, [metric("GPA", fmt(gpa, 2)), metric("Credits", fmtLoose(v.credits, 0)), metric("Scale", `${v.scale} point`)], bar(["GPA", "Scale max"], [gpa, Number(v.scale)]));
    }
  });
  add({
    id: "cgpa-calculator",
    name: "CGPA Calculator",
    category: "education",
    description: "Calculate CGPA from semester grade points and credits.",
    keywords: "cgpa semester grade",
    fields: [n("totalPoints", "Total grade point x credit", 820), n("totalCredits", "Total credits", 96), sel("scale", "Scale", "10", selectOptions.gradeScale)],
    calculate: (v) => {
      const cgpa = safeDiv(v.totalPoints, v.totalCredits);
      return result(`CGPA is ${fmt(cgpa, 2)}.`, [metric("CGPA", fmt(cgpa, 2)), metric("Equivalent percent", pct(cgpa * 9.5)), metric("Credits", fmtLoose(v.totalCredits, 0))], bar(["CGPA", "Scale max"], [cgpa, Number(v.scale)]));
    }
  });
  add({
    id: "attendance-calculator",
    name: "Attendance Calculator",
    category: "education",
    description: "Check current attendance and classes needed to reach target.",
    keywords: "attendance required classes",
    fields: [n("held", "Classes held", 80, { step: 1 }), n("attended", "Classes attended", 62, { step: 1 }), n("target", "Target attendance (%)", 75, { step: 0.1 })],
    calculate: (v) => {
      const current = safeDiv(v.attended, v.held) * 100;
      const need = Math.max(0, Math.ceil((v.target * v.held - 100 * v.attended) / (100 - v.target)));
      const canMiss = current >= v.target ? Math.floor((100 * v.attended - v.target * v.held) / v.target) : 0;
      return result(`Current attendance is ${pct(current)}.`, [metric("Current attendance", pct(current)), metric("Classes needed", fmtLoose(need, 0)), metric("Can miss now", fmtLoose(canMiss, 0))], donut(["Attended", "Missed"], [v.attended, Math.max(0, v.held - v.attended)]));
    }
  });
  add({
    id: "study-time-calculator",
    name: "Study Time Calculator",
    category: "education",
    description: "Plan required study hours per day before an exam.",
    keywords: "study time plan",
    fields: [n("topics", "Topics or chapters", 24, { step: 1 }), n("hoursPerTopic", "Hours per topic", 2, { step: 0.1 }), n("revision", "Revision buffer (%)", 20, { step: 0.1 }), n("days", "Days left", 30, { step: 1 })],
    calculate: (v) => {
      const totalHours = v.topics * v.hoursPerTopic * (1 + v.revision / 100);
      const perDay = safeDiv(totalHours, v.days);
      return result(`Study about ${fmt(perDay, 2)} hours per day.`, [metric("Total study hours", fmt(totalHours, 1)), metric("Daily hours", fmt(perDay, 2)), metric("Days left", fmtLoose(v.days, 0))], bar(["Total hours", "Daily hours"], [totalHours, perDay]));
    }
  });
  add({
    id: "age-for-school-admission-calculator",
    name: "Age for School Admission Calculator",
    category: "education",
    description: "Check child age and eligibility for school admission.",
    keywords: "school admission age",
    fields: [dateField("birthDate", "Child date of birth", "2021-06-01"), dateField("admissionDate", "Admission cutoff date", todayISO()), n("minAge", "Minimum age (years)", 3, { step: 0.1 }), n("maxAge", "Maximum age (years)", 6, { step: 0.1 })],
    calculate: (v) => {
      const age = makeAge(v.birthDate, v.admissionDate);
      const ageYears = daysBetween(v.birthDate, v.admissionDate) / 365.25;
      const eligible = ageYears >= v.minAge && ageYears <= v.maxAge;
      return result(`Child age is ${age.years} years, ${age.months} months, ${age.days} days.`, [metric("Eligibility", eligible ? "Eligible" : "Not eligible"), metric("Age in years", fmt(ageYears, 2)), metric("Required range", `${v.minAge} to ${v.maxAge} years`)], bar(["Age", "Minimum", "Maximum"], [ageYears, v.minAge, v.maxAge]));
    }
  });
  add({
    id: "rank-predictor",
    name: "Rank Predictor",
    category: "education",
    description: "Estimate rank from percentile and total candidates.",
    keywords: "rank predictor percentile",
    fields: [n("candidates", "Total candidates", 100000, { step: 1 }), n("percentile", "Percentile", 95, { min: 0, max: 100, step: 0.001 })],
    calculate: (v) => {
      const rank = Math.max(1, Math.ceil((100 - v.percentile) / 100 * v.candidates));
      return result(`Estimated rank is around ${fmtLoose(rank, 0)}.`, [metric("Percentile", pct(v.percentile)), metric("Estimated rank", fmtLoose(rank, 0)), metric("Candidates ahead", fmtLoose(Math.max(0, rank - 1), 0))], bar(["Candidates", "Estimated rank"], [v.candidates, rank]));
    }
  });
  add({
    id: "semester-gpa-calculator",
    name: "Semester GPA Calculator",
    category: "education",
    description: "Calculate semester GPA using credits and weighted grade points.",
    keywords: "semester gpa sgpa",
    fields: [n("weighted", "Sum of course grade point x credit", 186), n("credits", "Semester credits", 22), sel("scale", "Scale", "10", selectOptions.gradeScale)],
    calculate: (v) => {
      const sgpa = safeDiv(v.weighted, v.credits);
      return result(`Semester GPA is ${fmt(sgpa, 2)}.`, [metric("SGPA", fmt(sgpa, 2)), metric("Credits", fmtLoose(v.credits, 0)), metric("Scale", `${v.scale} point`)], bar(["SGPA", "Scale max"], [sgpa, Number(v.scale)]));
    }
  });
  add({
    id: "result-calculator",
    name: "Result Calculator",
    category: "education",
    description: "Calculate total, percentage and pass status from subject marks.",
    keywords: "result marks pass fail",
    fields: [area("marks", "Subject marks", "78, 82, 91, 69, 88", { hint: "Enter marks separated by commas." }), n("maxPerSubject", "Maximum marks per subject", 100), n("passMark", "Pass mark per subject", 35)],
    calculate: (v) => {
      const marks = parseList(v.marks);
      const total = marks.reduce((sum, item) => sum + item, 0);
      const max = marks.length * v.maxPerSubject;
      const percentage = safeDiv(total, max) * 100;
      const passed = marks.every((mark) => mark >= v.passMark);
      return result(`Result is ${passed ? "Pass" : "Fail"} with ${pct(percentage)}.`, [metric("Total marks", fmtLoose(total, 2)), metric("Percentage", pct(percentage)), metric("Grade", gradeFromPercentage(percentage)), metric("Subjects", fmtLoose(marks.length, 0))], bar(marks.map((_, index) => `Sub ${index + 1}`), marks));
    }
  });
  add({
    id: "aggregate-calculator",
    name: "Aggregate Calculator",
    category: "education",
    description: "Calculate weighted aggregate from percentages and weights.",
    keywords: "aggregate weighted percentage",
    fields: [area("percentages", "Percentages", "82, 76, 88", { hint: "Example: semester percentages." }), area("weights", "Weights", "30, 30, 40", { hint: "Use matching weights. If blank, equal weights are used." })],
    calculate: (v) => {
      const values = parseList(v.percentages);
      let weights = parseList(v.weights);
      if (weights.length !== values.length) weights = values.map(() => 1);
      const aggregate = safeDiv(values.reduce((sum, value, index) => sum + value * weights[index], 0), weights.reduce((sum, value) => sum + value, 0));
      return result(`Weighted aggregate is ${pct(aggregate)}.`, [metric("Aggregate", pct(aggregate)), metric("Items", fmtLoose(values.length, 0)), metric("Grade", gradeFromPercentage(aggregate))], bar(values.map((_, index) => `Item ${index + 1}`), values));
    }
  });

  add({
    id: "bmi-calculator",
    name: "BMI Calculator",
    category: "health",
    description: "Calculate body mass index from height and weight.",
    keywords: "bmi body mass index",
    fields: [n("weight", "Weight (kg)", 70), n("height", "Height (cm)", 170)],
    calculate: (v) => {
      const bmi = safeDiv(v.weight, (v.height / 100) ** 2);
      const label = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
      return result(`BMI is ${fmt(bmi, 2)} (${label}).`, [metric("BMI", fmt(bmi, 2)), metric("Category", label), metric("Healthy weight range", `${fmt(18.5 * (v.height / 100) ** 2, 1)} to ${fmt(24.9 * (v.height / 100) ** 2, 1)} kg`)], bar(["BMI", "Normal lower", "Normal upper"], [bmi, 18.5, 24.9]));
    }
  });
  add({
    id: "calories-burn-calculator",
    name: "Calories Burn Calculator",
    category: "health",
    description: "Estimate calories burned using MET value.",
    keywords: "calories burn met",
    fields: [n("met", "Activity MET value", 6, { step: 0.1, hint: "Walking is around 3, running can be 8 to 12." }), n("weight", "Weight (kg)", 70), n("minutes", "Duration (minutes)", 45)],
    calculate: (v) => {
      const calories = v.met * 3.5 * v.weight / 200 * v.minutes;
      return result(`Estimated calories burned: ${fmtLoose(calories, 0)} kcal.`, [metric("Calories", `${fmtLoose(calories, 0)} kcal`), metric("Duration", `${fmtLoose(v.minutes, 0)} min`), metric("MET", fmt(v.met, 1))], bar(["Calories", "Minutes"], [calories, v.minutes]));
    }
  });
  add({
    id: "daily-calorie-needs-calculator",
    name: "Daily Calorie Needs Calculator",
    category: "health",
    description: "Calculate daily calorie needs using BMR and activity level.",
    keywords: "tdee calories daily needs",
    fields: [n("age", "Age", 30), sel("gender", "Gender", "male", selectOptions.gender), n("weight", "Weight (kg)", 70), n("height", "Height (cm)", 170), sel("activity", "Activity level", "1.55", selectOptions.activity), sel("goal", "Goal", "0", selectOptions.goal)],
    calculate: (v) => {
      const bmr = (10 * v.weight) + (6.25 * v.height) - (5 * v.age) + (v.gender === "male" ? 5 : -161);
      const maintenance = bmr * Number(v.activity);
      const target = maintenance + Number(v.goal);
      return result(`Daily target is about ${fmtLoose(target, 0)} kcal.`, [metric("BMR", `${fmtLoose(bmr, 0)} kcal`), metric("Maintenance", `${fmtLoose(maintenance, 0)} kcal`), metric("Goal target", `${fmtLoose(target, 0)} kcal`)], bar(["BMR", "Maintenance", "Target"], [bmr, maintenance, target]));
    }
  });
  add({
    id: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    category: "health",
    description: "Estimate ideal body weight using Devine formula.",
    keywords: "ideal weight",
    fields: [sel("gender", "Gender", "male", selectOptions.gender), n("height", "Height (cm)", 170)],
    calculate: (v) => {
      const inches = v.height / 2.54;
      const overFiveFeet = Math.max(0, inches - 60);
      const ideal = v.gender === "male" ? 50 + 2.3 * overFiveFeet : 45.5 + 2.3 * overFiveFeet;
      return result(`Estimated ideal weight is ${fmt(ideal, 1)} kg.`, [metric("Ideal weight", `${fmt(ideal, 1)} kg`), metric("Healthy lower", `${fmt(18.5 * (v.height / 100) ** 2, 1)} kg`), metric("Healthy upper", `${fmt(24.9 * (v.height / 100) ** 2, 1)} kg`)], bar(["Ideal", "BMI lower", "BMI upper"], [ideal, 18.5 * (v.height / 100) ** 2, 24.9 * (v.height / 100) ** 2]));
    }
  });
  add({
    id: "body-fat-calculator",
    name: "Body Fat Calculator",
    category: "health",
    description: "Estimate body fat using the US Navy circumference method.",
    keywords: "body fat navy waist neck",
    fields: [sel("gender", "Gender", "male", selectOptions.gender), n("height", "Height (cm)", 170), n("waist", "Waist (cm)", 85), n("neck", "Neck (cm)", 38), n("hip", "Hip (cm, female only)", 95)],
    calculate: (v) => {
      const height = v.height / 2.54;
      const waist = v.waist / 2.54;
      const neck = v.neck / 2.54;
      const hip = v.hip / 2.54;
      const bodyFat = v.gender === "male"
        ? 86.010 * Math.log10(Math.max(1, waist - neck)) - 70.041 * Math.log10(height) + 36.76
        : 163.205 * Math.log10(Math.max(1, waist + hip - neck)) - 97.684 * Math.log10(height) - 78.387;
      return result(`Estimated body fat is ${pct(bodyFat)}.`, [metric("Body fat", pct(bodyFat)), metric("Lean mass share", pct(100 - bodyFat)), metric("Method", "Navy estimate")], donut(["Body fat", "Lean share"], [bodyFat, Math.max(0, 100 - bodyFat)]));
    }
  });
  add({
    id: "water-intake-calculator",
    name: "Water Intake Calculator",
    category: "health",
    description: "Estimate daily water intake from body weight and activity.",
    keywords: "water intake hydration",
    fields: [n("weight", "Weight (kg)", 70), n("activityMinutes", "Exercise minutes per day", 45), n("climateExtra", "Extra for hot climate (ml)", 300)],
    calculate: (v) => {
      const liters = (v.weight * 35 + v.activityMinutes * 12 + v.climateExtra) / 1000;
      return result(`Estimated water intake is ${fmt(liters, 2)} liters per day.`, [metric("Base water", `${fmt(v.weight * 35 / 1000, 2)} L`), metric("Activity extra", `${fmt(v.activityMinutes * 12 / 1000, 2)} L`), metric("Daily target", `${fmt(liters, 2)} L`)], bar(["Base", "Activity", "Climate"], [v.weight * 35 / 1000, v.activityMinutes * 12 / 1000, v.climateExtra / 1000]));
    }
  });
  add({
    id: "pregnancy-due-date-calculator",
    name: "Pregnancy Due Date Calculator",
    category: "health",
    description: "Estimate due date from the first day of the last menstrual period.",
    keywords: "pregnancy due date lmp",
    fields: [dateField("lmp", "First day of last period", todayISO(-70)), n("cycle", "Average cycle length (days)", 28, { step: 1 })],
    calculate: (v) => {
      const due = addDays(parseDate(v.lmp), 280 + (v.cycle - 28));
      const remaining = daysBetween(todayISO(), due.toISOString().slice(0, 10));
      return result(`Estimated due date is ${dateLabel(due)}.`, [metric("Due date", dateLabel(due)), metric("Days remaining", daysText(remaining)), metric("Estimated pregnancy length", `${fmtLoose(280 + (v.cycle - 28), 0)} days`)], bar(["Days elapsed", "Days remaining"], [280 - remaining, Math.max(0, remaining)]));
    }
  });
  add({
    id: "ovulation-calculator",
    name: "Ovulation Calculator",
    category: "health",
    description: "Estimate ovulation date and fertile window.",
    keywords: "ovulation fertile window",
    fields: [dateField("lastPeriod", "First day of last period", todayISO(-14)), n("cycle", "Cycle length (days)", 28, { step: 1 }), n("luteal", "Luteal phase (days)", 14, { step: 1 })],
    calculate: (v) => {
      const ovulation = addDays(parseDate(v.lastPeriod), v.cycle - v.luteal);
      const fertileStart = addDays(ovulation, -5);
      const fertileEnd = addDays(ovulation, 1);
      return result(`Estimated ovulation date is ${dateLabel(ovulation)}.`, [metric("Fertile window starts", dateLabel(fertileStart)), metric("Ovulation", dateLabel(ovulation)), metric("Fertile window ends", dateLabel(fertileEnd))], bar(["Before ovulation", "After ovulation"], [5, 1]));
    }
  });
  add({
    id: "heart-rate-calculator",
    name: "Heart Rate Calculator",
    category: "health",
    description: "Calculate maximum heart rate and training zones.",
    keywords: "heart rate zones",
    fields: [n("age", "Age", 30), n("resting", "Resting heart rate", 65)],
    calculate: (v) => {
      const max = 220 - v.age;
      const reserve = max - v.resting;
      const zone2Low = v.resting + reserve * 0.6;
      const zone2High = v.resting + reserve * 0.7;
      return result(`Estimated max heart rate is ${fmtLoose(max, 0)} bpm.`, [metric("Maximum HR", `${fmtLoose(max, 0)} bpm`), metric("Zone 2 low", `${fmtLoose(zone2Low, 0)} bpm`), metric("Zone 2 high", `${fmtLoose(zone2High, 0)} bpm`)], bar(["Resting", "Zone 2 low", "Zone 2 high", "Max"], [v.resting, zone2Low, zone2High, max]));
    }
  });
  add({
    id: "bmr-calculator",
    name: "BMR Calculator",
    category: "health",
    description: "Calculate basal metabolic rate using Mifflin-St Jeor formula.",
    keywords: "bmr basal metabolic rate",
    fields: [n("age", "Age", 30), sel("gender", "Gender", "male", selectOptions.gender), n("weight", "Weight (kg)", 70), n("height", "Height (cm)", 170)],
    calculate: (v) => {
      const bmr = (10 * v.weight) + (6.25 * v.height) - (5 * v.age) + (v.gender === "male" ? 5 : -161);
      return result(`BMR is approximately ${fmtLoose(bmr, 0)} kcal/day.`, [metric("BMR", `${fmtLoose(bmr, 0)} kcal`), metric("Weekly baseline", `${fmtLoose(bmr * 7, 0)} kcal`)], bar(["Daily", "Weekly / 7"], [bmr, bmr]));
    }
  });
  add({
    id: "protein-intake-calculator",
    name: "Protein Intake Calculator",
    category: "health",
    description: "Estimate daily protein target from body weight and activity goal.",
    keywords: "protein intake gym",
    fields: [n("weight", "Weight (kg)", 70), sel("goal", "Goal", "1.6", [{ value: "1.2", label: "General fitness" }, { value: "1.6", label: "Muscle gain" }, { value: "2.0", label: "Fat loss training" }])],
    calculate: (v) => {
      const grams = v.weight * Number(v.goal);
      return result(`Daily protein target is ${fmtLoose(grams, 0)} grams.`, [metric("Protein", `${fmtLoose(grams, 0)} g/day`), metric("Per meal across 4 meals", `${fmtLoose(grams / 4, 0)} g`)], bar(["Daily protein", "Per meal"], [grams, grams / 4]));
    }
  });
  add({
    id: "weight-loss-calculator",
    name: "Weight Loss Calculator",
    category: "health",
    description: "Estimate time needed to reach a target weight from calorie deficit.",
    keywords: "weight loss calorie deficit",
    fields: [n("current", "Current weight (kg)", 82), n("target", "Target weight (kg)", 75), n("deficit", "Daily calorie deficit", 500)],
    calculate: (v) => {
      const kg = Math.max(0, v.current - v.target);
      const days = safeDiv(kg * 7700, v.deficit);
      return result(`Estimated time needed is ${daysText(days)}.`, [metric("Weight to lose", `${fmt(kg, 2)} kg`), metric("Estimated weeks", fmt(days / 7, 1)), metric("Daily deficit", `${fmtLoose(v.deficit, 0)} kcal`)], bar(["Kg to lose", "Weeks"], [kg, days / 7]));
    }
  });
  add({
    id: "running-pace-calculator",
    name: "Running Pace Calculator",
    category: "health",
    description: "Calculate running pace and speed from distance and time.",
    keywords: "running pace speed",
    fields: [n("distance", "Distance (km)", 5), n("hours", "Hours", 0, { step: 1 }), n("minutes", "Minutes", 30, { step: 1 }), n("seconds", "Seconds", 0, { step: 1 })],
    calculate: (v) => {
      const totalMinutes = v.hours * 60 + v.minutes + v.seconds / 60;
      const pace = safeDiv(totalMinutes, v.distance);
      const speed = safeDiv(v.distance, totalMinutes / 60);
      return result(`Pace is ${fmtLoose(Math.floor(pace), 0)}:${String(Math.round((pace % 1) * 60)).padStart(2, "0")} min/km.`, [metric("Pace", `${fmt(pace, 2)} min/km`), metric("Speed", `${fmt(speed, 2)} km/h`), metric("Total time", `${fmt(totalMinutes, 1)} min`)], bar(["Distance", "Time", "Speed"], [v.distance, totalMinutes, speed]));
    }
  });
  add({
    id: "sleep-calculator",
    name: "Sleep Calculator",
    category: "health",
    description: "Find bedtime options based on 90-minute sleep cycles.",
    keywords: "sleep cycle bedtime",
    fields: [timeField("wake", "Wake-up time", "06:30"), n("fallAsleep", "Minutes to fall asleep", 15, { step: 1 })],
    calculate: (v) => {
      const wake = timeToMinutes(v.wake);
      const options = [6, 5, 4].map((cycles) => ({ cycles, bedtime: minutesToTime(wake - cycles * 90 - v.fallAsleep) }));
      return result(`Best bedtime options: ${options.map((item) => `${item.bedtime} (${item.cycles} cycles)`).join(", ")}.`, options.map((item) => metric(`${item.cycles} cycles`, item.bedtime)), bar(options.map((item) => `${item.cycles} cycles`), options.map((item) => item.cycles * 90 / 60)));
    }
  });

  add({
    id: "electricity-bill-calculator",
    name: "Electricity Bill Calculator",
    category: "electrical",
    description: "Estimate electricity bill from units, tariff and fixed charges.",
    keywords: "electricity bill units tariff",
    fields: [n("units", "Units consumed (kWh)", 250), n("rate", "Rate per unit", 7.5, { step: 0.01 }), n("fixed", "Fixed charges", 150), n("duty", "Duty/tax (%)", 5, { step: 0.01 })],
    calculate: (v) => {
      const energy = v.units * v.rate;
      const duty = (energy + v.fixed) * v.duty / 100;
      return result(`Estimated electricity bill is ${money(energy + v.fixed + duty)}.`, [metric("Energy charge", money(energy)), metric("Fixed charge", money(v.fixed)), metric("Duty/tax", money(duty)), metric("Total bill", money(energy + v.fixed + duty))], donut(["Energy", "Fixed", "Duty"], [energy, v.fixed, duty]));
    }
  });
  add({
    id: "power-consumption-calculator",
    name: "Power Consumption Calculator",
    category: "electrical",
    description: "Calculate units and running cost for an appliance.",
    keywords: "power consumption appliance units",
    fields: [n("watts", "Appliance wattage", 1000), n("hours", "Hours per day", 4), n("days", "Days", 30), n("tariff", "Tariff per unit", 7.5)],
    calculate: (v) => {
      const units = v.watts * v.hours * v.days / 1000;
      return result(`Power consumption is ${fmt(units, 2)} units.`, [metric("Units", `${fmt(units, 2)} kWh`), metric("Cost", money(units * v.tariff)), metric("Daily units", fmt(units / v.days, 2))], bar(["Units", "Cost"], [units, units * v.tariff]));
    }
  });
  add({
    id: "wire-size-calculator",
    name: "Wire Size Calculator",
    category: "electrical",
    description: "Estimate copper conductor area from current, length and voltage drop.",
    keywords: "wire size voltage drop copper",
    fields: [n("current", "Current (A)", 20), n("length", "One-way cable length (m)", 30), n("voltage", "System voltage", 230), n("dropPct", "Allowed voltage drop (%)", 3, { step: 0.1 })],
    calculate: (v) => {
      const dropVolts = v.voltage * v.dropPct / 100;
      const area = safeDiv(2 * v.length * v.current * 0.0175, dropVolts);
      return result(`Estimated copper wire size is ${fmt(area, 2)} sq mm.`, [metric("Minimum area", `${fmt(area, 2)} sq mm`), metric("Allowed drop", `${fmt(dropVolts, 2)} V`), metric("Current", `${fmt(v.current, 1)} A`)], bar(["Area sq mm", "Current A", "Drop V"], [area, v.current, dropVolts]), "Use local electrical code and a licensed electrician for final sizing.");
    }
  });
  add({
    id: "voltage-drop-calculator",
    name: "Voltage Drop Calculator",
    category: "electrical",
    description: "Calculate voltage drop for a copper cable run.",
    keywords: "voltage drop cable",
    fields: [n("current", "Current (A)", 20), n("length", "One-way cable length (m)", 30), n("area", "Cable area (sq mm)", 4), n("voltage", "System voltage", 230)],
    calculate: (v) => {
      const drop = safeDiv(2 * v.length * v.current * 0.0175, v.area);
      return result(`Voltage drop is ${fmt(drop, 2)} V (${pct(drop / v.voltage * 100)}).`, [metric("Voltage drop", `${fmt(drop, 2)} V`), metric("Drop percent", pct(drop / v.voltage * 100)), metric("Receiving voltage", `${fmt(v.voltage - drop, 2)} V`)], bar(["Supply", "Drop", "Receiving"], [v.voltage, drop, Math.max(0, v.voltage - drop)]));
    }
  });
  add({
    id: "battery-backup-calculator",
    name: "Battery Backup Calculator",
    category: "electrical",
    description: "Estimate backup time from battery capacity and load.",
    keywords: "battery backup ah load",
    fields: [n("voltage", "Battery voltage", 12), n("ah", "Battery capacity (Ah)", 150), n("load", "Load (W)", 300), n("efficiency", "System efficiency (%)", 85), n("dod", "Usable depth of discharge (%)", 80)],
    calculate: (v) => {
      const wh = v.voltage * v.ah * v.efficiency / 100 * v.dod / 100;
      const hours = safeDiv(wh, v.load);
      return result(`Estimated backup time is ${fmt(hours, 2)} hours.`, [metric("Usable energy", `${fmt(wh, 0)} Wh`), metric("Backup time", `${fmt(hours, 2)} hours`), metric("Load", `${fmt(v.load, 0)} W`)], bar(["Energy Wh", "Load W"], [wh, v.load]));
    }
  });
  add({
    id: "solar-panel-calculator",
    name: "Solar Panel Calculator",
    category: "electrical",
    description: "Estimate solar system size and panel count.",
    keywords: "solar panel system kw",
    fields: [n("dailyUnits", "Daily energy need (kWh)", 12), n("sunHours", "Peak sun hours", 5), n("loss", "System loss (%)", 20), n("panelWatt", "Panel wattage", 550)],
    calculate: (v) => {
      const systemKw = safeDiv(v.dailyUnits, v.sunHours * (1 - v.loss / 100));
      const panels = Math.ceil(systemKw * 1000 / v.panelWatt);
      return result(`Recommended solar size is about ${fmt(systemKw, 2)} kW with ${panels} panels.`, [metric("System size", `${fmt(systemKw, 2)} kW`), metric("Panel count", fmtLoose(panels, 0)), metric("Daily generation target", `${fmt(v.dailyUnits, 1)} kWh`)], bar(["System kW", "Panels"], [systemKw, panels]));
    }
  });
  add({
    id: "ups-capacity-calculator",
    name: "UPS Capacity Calculator",
    category: "electrical",
    description: "Estimate UPS VA rating and battery Ah for backup.",
    keywords: "ups capacity va battery",
    fields: [n("load", "Connected load (W)", 800), n("pf", "Power factor", 0.8, { step: 0.01 }), n("backup", "Backup time (hours)", 1), n("batteryVoltage", "Battery bank voltage", 24), n("efficiency", "Efficiency (%)", 85)],
    calculate: (v) => {
      const va = safeDiv(v.load, v.pf);
      const ah = safeDiv(v.load * v.backup, v.batteryVoltage * v.efficiency / 100);
      return result(`UPS capacity should be at least ${fmt(va, 0)} VA.`, [metric("UPS rating", `${fmt(va, 0)} VA`), metric("Battery capacity", `${fmt(ah, 1)} Ah`), metric("Load", `${fmt(v.load, 0)} W`)], bar(["Load W", "UPS VA", "Battery Ah"], [v.load, va, ah]));
    }
  });
  add({
    id: "inverter-calculator",
    name: "Inverter Calculator",
    category: "electrical",
    description: "Calculate inverter VA and battery capacity requirement.",
    keywords: "inverter battery load",
    fields: [n("load", "Total load (W)", 600), n("hours", "Backup hours", 3), n("batteryVoltage", "Battery voltage", 12), n("efficiency", "Efficiency (%)", 85), n("pf", "Power factor", 0.8)],
    calculate: (v) => {
      const va = safeDiv(v.load, v.pf);
      const ah = safeDiv(v.load * v.hours, v.batteryVoltage * v.efficiency / 100);
      return result(`Choose at least ${fmt(va, 0)} VA inverter and ${fmt(ah, 0)} Ah battery capacity.`, [metric("Inverter size", `${fmt(va, 0)} VA`), metric("Battery capacity", `${fmt(ah, 0)} Ah`), metric("Backup energy", `${fmt(v.load * v.hours, 0)} Wh`)], bar(["Inverter VA", "Battery Ah"], [va, ah]));
    }
  });
  add({
    id: "transformer-calculator",
    name: "Transformer Calculator",
    category: "electrical",
    description: "Calculate transformer primary and secondary current.",
    keywords: "transformer kva current",
    fields: [n("kva", "Transformer rating (kVA)", 100), n("primary", "Primary voltage", 11000), n("secondary", "Secondary voltage", 433), sel("phase", "Phase", "three", selectOptions.phase)],
    calculate: (v) => {
      const factor = v.phase === "three" ? Math.sqrt(3) : 1;
      const primaryCurrent = safeDiv(v.kva * 1000, factor * v.primary);
      const secondaryCurrent = safeDiv(v.kva * 1000, factor * v.secondary);
      return result(`Secondary current is ${fmt(secondaryCurrent, 2)} A.`, [metric("Primary current", `${fmt(primaryCurrent, 2)} A`), metric("Secondary current", `${fmt(secondaryCurrent, 2)} A`), metric("Rating", `${fmt(v.kva, 1)} kVA`)], bar(["Primary A", "Secondary A"], [primaryCurrent, secondaryCurrent]));
    }
  });
  add({
    id: "current-calculator",
    name: "Current Calculator",
    category: "electrical",
    description: "Calculate electrical current from power, voltage and power factor.",
    keywords: "current ampere power voltage",
    fields: [n("power", "Power (W)", 5000), n("voltage", "Voltage", 230), n("pf", "Power factor", 0.9, { step: 0.01 }), sel("phase", "Phase", "single", selectOptions.phase)],
    calculate: (v) => {
      const factor = v.phase === "three" ? Math.sqrt(3) : 1;
      const current = safeDiv(v.power, factor * v.voltage * v.pf);
      return result(`Current is ${fmt(current, 2)} A.`, [metric("Current", `${fmt(current, 2)} A`), metric("Power", `${fmt(v.power, 0)} W`), metric("Voltage", `${fmt(v.voltage, 0)} V`)], bar(["Current A", "Power kW"], [current, v.power / 1000]));
    }
  });
  add({
    id: "kw-to-hp-calculator",
    name: "kW to HP Calculator",
    category: "electrical",
    description: "Convert kilowatts to horsepower.",
    keywords: "kw to hp horsepower",
    fields: [n("kw", "Kilowatts", 7.5, { step: 0.01 })],
    calculate: (v) => result(`${fmt(v.kw, 2)} kW = ${fmt(v.kw / 0.746, 2)} HP.`, [metric("kW", fmt(v.kw, 2)), metric("HP", fmt(v.kw / 0.746, 2))], bar(["kW", "HP"], [v.kw, v.kw / 0.746]))
  });
  add({
    id: "hp-to-kw-calculator",
    name: "HP to kW Calculator",
    category: "electrical",
    description: "Convert horsepower to kilowatts.",
    keywords: "hp to kw horsepower",
    fields: [n("hp", "Horsepower", 10, { step: 0.01 })],
    calculate: (v) => result(`${fmt(v.hp, 2)} HP = ${fmt(v.hp * 0.746, 2)} kW.`, [metric("HP", fmt(v.hp, 2)), metric("kW", fmt(v.hp * 0.746, 2))], bar(["HP", "kW"], [v.hp, v.hp * 0.746]))
  });
  add({
    id: "unit-consumption-calculator",
    name: "Unit Consumption Calculator",
    category: "electrical",
    description: "Calculate electricity units from wattage and usage time.",
    keywords: "unit consumption kwh",
    fields: [n("watts", "Wattage", 1500), n("hours", "Hours per day", 2), n("days", "Days", 30)],
    calculate: (v) => {
      const units = v.watts * v.hours * v.days / 1000;
      return result(`Consumption is ${fmt(units, 2)} units.`, [metric("Units", `${fmt(units, 2)} kWh`), metric("Daily units", fmt(units / v.days, 2)), metric("Monthly hours", fmt(v.hours * v.days, 1))], bar(["Units", "Hours"], [units, v.hours * v.days]));
    }
  });
  add({
    id: "load-calculator",
    name: "Load Calculator",
    category: "electrical",
    description: "Estimate connected and demand load for appliances.",
    keywords: "electrical load demand",
    fields: [n("applianceWatt", "Watt per appliance", 60), n("quantity", "Quantity", 20, { step: 1 }), n("extraLoad", "Other load (W)", 2000), n("demand", "Demand factor (%)", 80)],
    calculate: (v) => {
      const connected = v.applianceWatt * v.quantity + v.extraLoad;
      const demandLoad = connected * v.demand / 100;
      return result(`Demand load is ${fmt(demandLoad / 1000, 2)} kW.`, [metric("Connected load", `${fmt(connected / 1000, 2)} kW`), metric("Demand load", `${fmt(demandLoad / 1000, 2)} kW`), metric("Quantity", fmtLoose(v.quantity, 0))], bar(["Connected", "Demand"], [connected, demandLoad]));
    }
  });

  add({
    id: "paint-calculator",
    name: "Paint Calculator",
    category: "construction",
    description: "Estimate paint required for room walls.",
    keywords: "paint wall area",
    fields: [n("length", "Room length (ft)", 14), n("width", "Room width (ft)", 12), n("height", "Wall height (ft)", 10), n("openings", "Doors/windows area (sq ft)", 45), n("coats", "Number of coats", 2, { step: 1 }), n("coverage", "Coverage per liter (sq ft)", 110)],
    calculate: (v) => {
      const areaValue = Math.max(0, 2 * (v.length + v.width) * v.height - v.openings);
      const liters = safeDiv(areaValue * v.coats, v.coverage);
      return result(`Paint required is about ${fmt(liters, 2)} liters.`, [metric("Paintable area", `${fmt(areaValue, 1)} sq ft`), metric("Paint needed", `${fmt(liters, 2)} L`), metric("Coats", fmtLoose(v.coats, 0))], bar(["Area", "Liters"], [areaValue, liters]));
    }
  });
  add({
    id: "cement-calculator",
    name: "Cement Calculator",
    category: "construction",
    description: "Estimate cement bags for concrete volume and mix ratio.",
    keywords: "cement bags concrete",
    fields: [n("volume", "Wet concrete volume (cubic meter)", 1), n("cementPart", "Cement ratio part", 1), n("sandPart", "Sand ratio part", 2), n("aggregatePart", "Aggregate ratio part", 4)],
    calculate: (v) => {
      const dryVolume = v.volume * 1.54;
      const cementVolume = dryVolume * v.cementPart / (v.cementPart + v.sandPart + v.aggregatePart);
      const bags = cementVolume * 1440 / 50;
      return result(`Cement required is about ${fmt(bags, 1)} bags.`, [metric("Dry volume", `${fmt(dryVolume, 2)} cu m`), metric("Cement volume", `${fmt(cementVolume, 2)} cu m`), metric("50 kg bags", fmt(bags, 1))], bar(["Dry volume", "Cement volume", "Bags"], [dryVolume, cementVolume, bags]));
    }
  });
  add({
    id: "brick-calculator",
    name: "Brick Calculator",
    category: "construction",
    description: "Estimate number of bricks for a wall.",
    keywords: "brick wall quantity",
    fields: [n("wallLength", "Wall length (ft)", 20), n("wallHeight", "Wall height (ft)", 10), n("thickness", "Wall thickness (inches)", 9), n("brickLength", "Brick length (inches)", 7.5), n("brickHeight", "Brick height (inches)", 3.5), n("brickWidth", "Brick width (inches)", 3.5), n("wastage", "Wastage (%)", 5)],
    calculate: (v) => {
      const wallVolume = v.wallLength * v.wallHeight * (v.thickness / 12);
      const brickVolume = (v.brickLength / 12) * (v.brickHeight / 12) * (v.brickWidth / 12);
      const bricks = Math.ceil(safeDiv(wallVolume, brickVolume) * (1 + v.wastage / 100));
      return result(`Estimated bricks required: ${fmtLoose(bricks, 0)}.`, [metric("Wall volume", `${fmt(wallVolume, 2)} cu ft`), metric("Bricks", fmtLoose(bricks, 0)), metric("Wastage", pct(v.wastage))], bar(["Wall volume", "Bricks / 100"], [wallVolume, bricks / 100]));
    }
  });
  add({
    id: "tile-calculator",
    name: "Tile Calculator",
    category: "construction",
    description: "Calculate tile count from floor area and tile size.",
    keywords: "tile floor quantity",
    fields: [n("area", "Floor area (sq ft)", 240), n("tileLength", "Tile length (ft)", 2), n("tileWidth", "Tile width (ft)", 2), n("wastage", "Wastage (%)", 10)],
    calculate: (v) => {
      const tileArea = v.tileLength * v.tileWidth;
      const count = Math.ceil(safeDiv(v.area, tileArea) * (1 + v.wastage / 100));
      return result(`Tiles required: ${fmtLoose(count, 0)} pieces.`, [metric("Floor area", `${fmt(v.area, 1)} sq ft`), metric("Tile area", `${fmt(tileArea, 2)} sq ft`), metric("Tiles", fmtLoose(count, 0))], bar(["Area", "Tile count"], [v.area, count]));
    }
  });
  add({
    id: "sand-calculator",
    name: "Sand Calculator",
    category: "construction",
    description: "Calculate sand weight from volume and density.",
    keywords: "sand quantity weight",
    fields: [n("volume", "Sand volume (cubic meter)", 2), n("density", "Density (kg/cubic meter)", 1600), n("wastage", "Wastage (%)", 5)],
    calculate: (v) => {
      const weight = v.volume * v.density * (1 + v.wastage / 100);
      return result(`Sand required is ${fmt(weight, 0)} kg.`, [metric("Volume", `${fmt(v.volume, 2)} cu m`), metric("Weight", `${fmt(weight, 0)} kg`), metric("Tonnes", fmt(weight / 1000, 2))], bar(["Volume", "Tonnes"], [v.volume, weight / 1000]));
    }
  });
  add({
    id: "concrete-calculator",
    name: "Concrete Calculator",
    category: "construction",
    description: "Calculate concrete volume and rough material split.",
    keywords: "concrete volume materials",
    fields: [n("length", "Length (m)", 4), n("width", "Width (m)", 3), n("depth", "Depth (m)", 0.15), n("cementPart", "Cement part", 1), n("sandPart", "Sand part", 2), n("aggregatePart", "Aggregate part", 4)],
    calculate: (v) => {
      const wet = v.length * v.width * v.depth;
      const dry = wet * 1.54;
      const totalParts = v.cementPart + v.sandPart + v.aggregatePart;
      const cementBags = dry * v.cementPart / totalParts * 1440 / 50;
      const sand = dry * v.sandPart / totalParts;
      const aggregate = dry * v.aggregatePart / totalParts;
      return result(`Concrete volume is ${fmt(wet, 2)} cubic meters.`, [metric("Wet volume", `${fmt(wet, 2)} cu m`), metric("Cement bags", fmt(cementBags, 1)), metric("Sand", `${fmt(sand, 2)} cu m`), metric("Aggregate", `${fmt(aggregate, 2)} cu m`)], bar(["Cement bags", "Sand", "Aggregate"], [cementBags, sand, aggregate]));
    }
  });
  add({
    id: "flooring-calculator",
    name: "Flooring Calculator",
    category: "construction",
    description: "Estimate flooring material and installation cost.",
    keywords: "flooring cost",
    fields: [n("length", "Room length (ft)", 16), n("width", "Room width (ft)", 12), n("materialRate", "Material rate per sq ft", 120), n("laborRate", "Labor rate per sq ft", 35), n("wastage", "Wastage (%)", 8)],
    calculate: (v) => {
      const areaValue = v.length * v.width;
      const materialArea = areaValue * (1 + v.wastage / 100);
      const material = materialArea * v.materialRate;
      const labor = areaValue * v.laborRate;
      return result(`Estimated flooring cost is ${money(material + labor)}.`, [metric("Area", `${fmt(areaValue, 1)} sq ft`), metric("Material cost", money(material)), metric("Labor cost", money(labor)), metric("Total", money(material + labor))], donut(["Material", "Labor"], [material, labor]));
    }
  });
  add({
    id: "steel-weight-calculator",
    name: "Steel Weight Calculator",
    category: "construction",
    description: "Calculate steel bar weight from diameter, length and quantity.",
    keywords: "steel weight rebar",
    fields: [n("diameter", "Bar diameter (mm)", 12), n("length", "Length per bar (m)", 12), n("quantity", "Quantity", 10, { step: 1 })],
    calculate: (v) => {
      const kgPerMeter = v.diameter * v.diameter / 162;
      const weight = kgPerMeter * v.length * v.quantity;
      return result(`Steel weight is ${fmt(weight, 2)} kg.`, [metric("Kg per meter", fmt(kgPerMeter, 3)), metric("Total length", `${fmt(v.length * v.quantity, 1)} m`), metric("Total weight", `${fmt(weight, 2)} kg`)], bar(["Length", "Weight"], [v.length * v.quantity, weight]));
    }
  });
  add({
    id: "land-area-calculator",
    name: "Land Area Calculator",
    category: "construction",
    description: "Calculate land area and common conversions.",
    keywords: "land area acre sqft sqm",
    fields: [n("length", "Length (ft)", 60), n("width", "Width (ft)", 40)],
    calculate: (v) => {
      const sqft = v.length * v.width;
      const sqm = sqft * 0.092903;
      const acre = sqft / 43560;
      return result(`Land area is ${fmt(sqft, 2)} sq ft.`, [metric("Square feet", fmt(sqft, 2)), metric("Square meters", fmt(sqm, 2)), metric("Acres", fmt(acre, 4)), metric("Square yards", fmt(sqft / 9, 2))], bar(["Sq ft", "Sq m", "Sq yd"], [sqft, sqm, sqft / 9]));
    }
  });
  add({
    id: "room-area-calculator",
    name: "Room Area Calculator",
    category: "construction",
    description: "Calculate floor area, wall area and room volume.",
    keywords: "room area wall volume",
    fields: [n("length", "Length (ft)", 14), n("width", "Width (ft)", 12), n("height", "Height (ft)", 10), n("openings", "Openings area (sq ft)", 30)],
    calculate: (v) => {
      const floor = v.length * v.width;
      const wall = Math.max(0, 2 * (v.length + v.width) * v.height - v.openings);
      const volume = floor * v.height;
      return result(`Room floor area is ${fmt(floor, 2)} sq ft.`, [metric("Floor area", `${fmt(floor, 2)} sq ft`), metric("Wall area", `${fmt(wall, 2)} sq ft`), metric("Volume", `${fmt(volume, 2)} cu ft`)], bar(["Floor", "Wall", "Volume / 10"], [floor, wall, volume / 10]));
    }
  });
  add({
    id: "roof-calculator",
    name: "Roof Calculator",
    category: "construction",
    description: "Estimate roof surface area from plan area and slope.",
    keywords: "roof area slope",
    fields: [n("length", "Building length (ft)", 40), n("width", "Building width (ft)", 30), n("slope", "Roof slope angle (degrees)", 25), n("wastage", "Wastage/overlap (%)", 10)],
    calculate: (v) => {
      const plan = v.length * v.width;
      const roof = plan / Math.cos(v.slope * Math.PI / 180) * (1 + v.wastage / 100);
      return result(`Estimated roof area is ${fmt(roof, 2)} sq ft.`, [metric("Plan area", `${fmt(plan, 2)} sq ft`), metric("Roof area", `${fmt(roof, 2)} sq ft`), metric("Wastage", pct(v.wastage))], bar(["Plan", "Roof"], [plan, roof]));
    }
  });

  add({
    id: "age-calculator",
    name: "Age Calculator",
    category: "date-time",
    description: "Calculate exact age between a date of birth and another date.",
    keywords: "age date of birth",
    fields: [dateField("birthDate", "Date of birth", "1995-05-10"), dateField("onDate", "Calculate age on", todayISO())],
    calculate: (v) => {
      const age = makeAge(v.birthDate, v.onDate);
      const totalDays = daysBetween(v.birthDate, v.onDate);
      return result(`Age is ${age.years} years, ${age.months} months and ${age.days} days.`, [metric("Years", age.years), metric("Months after last birthday", age.months), metric("Days after last month", age.days), metric("Total days", fmtLoose(totalDays, 0))], bar(["Years", "Months", "Days"], [age.years, age.months, age.days]));
    }
  });
  add({
    id: "date-difference-calculator",
    name: "Date Difference Calculator",
    category: "date-time",
    description: "Calculate days and weeks between two dates.",
    keywords: "date difference days",
    fields: [dateField("start", "Start date", todayISO()), dateField("end", "End date", todayISO(30))],
    calculate: (v) => {
      const days = Math.abs(daysBetween(v.start, v.end));
      return result(`Difference is ${daysText(days)}.`, [metric("Days", fmtLoose(days, 0)), metric("Weeks", fmt(days / 7, 2)), metric("Months approx.", fmt(days / 30.44, 2))], bar(["Days", "Weeks", "Months"], [days, days / 7, days / 30.44]));
    }
  });
  add({
    id: "working-days-calculator",
    name: "Working Days Calculator",
    category: "date-time",
    description: "Count working days between two dates.",
    keywords: "working days weekdays",
    fields: [dateField("start", "Start date", todayISO()), dateField("end", "End date", todayISO(30)), sel("weekend", "Weekend type", "satSun", selectOptions.weekend), n("holidays", "Public holidays in range", 2, { step: 1 })],
    calculate: (v) => {
      let count = 0;
      const start = parseDate(v.start);
      const end = parseDate(v.end);
      const direction = start <= end ? 1 : -1;
      for (let date = new Date(start); direction === 1 ? date <= end : date >= end; date.setDate(date.getDate() + direction)) {
        const day = date.getDay();
        const weekend = v.weekend === "satSun" ? day === 0 || day === 6 : day === 0;
        if (!weekend) count += 1;
      }
      const working = Math.max(0, count - v.holidays);
      return result(`Working days: ${fmtLoose(working, 0)}.`, [metric("Calendar weekdays", fmtLoose(count, 0)), metric("Holidays deducted", fmtLoose(v.holidays, 0)), metric("Working days", fmtLoose(working, 0))], bar(["Weekdays", "Holidays", "Working"], [count, v.holidays, working]));
    }
  });
  add({
    id: "time-duration-calculator",
    name: "Time Duration Calculator",
    category: "date-time",
    description: "Calculate duration between two times after break deduction.",
    keywords: "time duration hours minutes",
    fields: [timeField("start", "Start time", "09:00"), timeField("end", "End time", "17:30"), n("break", "Break minutes", 45, { step: 1 })],
    calculate: (v) => {
      let minutes = timeToMinutes(v.end) - timeToMinutes(v.start);
      if (minutes < 0) minutes += 1440;
      const net = Math.max(0, minutes - v.break);
      return result(`Net duration is ${fmt(Math.floor(net / 60), 0)}h ${fmtLoose(net % 60, 0)}m.`, [metric("Gross duration", `${fmt(Math.floor(minutes / 60), 0)}h ${fmtLoose(minutes % 60, 0)}m`), metric("Break", `${fmtLoose(v.break, 0)} min`), metric("Net hours", fmt(net / 60, 2))], bar(["Gross min", "Break", "Net min"], [minutes, v.break, net]));
    }
  });
  add({
    id: "countdown-calculator",
    name: "Countdown Calculator",
    category: "date-time",
    description: "Count remaining time until a target date.",
    keywords: "countdown days",
    fields: [dateField("target", "Target date", todayISO(100)), timeField("targetTime", "Target time", nowTime())],
    calculate: (v) => {
      const target = new Date(`${v.target}T${v.targetTime || "00:00"}`);
      const diff = target - new Date();
      const days = Math.max(0, Math.floor(diff / 86400000));
      const hours = Math.max(0, Math.floor((diff % 86400000) / 3600000));
      return result(`${daysText(days)} and ${fmtLoose(hours, 0)} hours remaining.`, [metric("Days", fmtLoose(days, 0)), metric("Hours after days", fmtLoose(hours, 0)), metric("Target", dateLabel(target))], bar(["Days", "Hours"], [days, hours]));
    }
  });
  add({
    id: "leap-year-calculator",
    name: "Leap Year Calculator",
    category: "date-time",
    description: "Check whether a year is a leap year.",
    keywords: "leap year",
    fields: [n("year", "Year", new Date().getFullYear(), { step: 1 })],
    calculate: (v) => {
      const y = Math.round(v.year);
      const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      return result(`${y} is ${leap ? "" : "not "}a leap year.`, [metric("Year", y), metric("Days in year", leap ? 366 : 365), metric("Leap year", leap ? "Yes" : "No")], bar(["Days"], [leap ? 366 : 365]));
    }
  });
  add({
    id: "birthday-calculator",
    name: "Birthday Calculator",
    category: "date-time",
    description: "Find next birthday and days remaining.",
    keywords: "birthday days remaining",
    fields: [dateField("birthDate", "Date of birth", "1995-05-10")],
    calculate: (v) => {
      const birth = parseDate(v.birthDate);
      const today = new Date();
      let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
      if (next < today) next = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
      const days = Math.ceil((next - today) / 86400000);
      const turning = next.getFullYear() - birth.getFullYear();
      return result(`Next birthday is in ${daysText(days)}.`, [metric("Next birthday", dateLabel(next)), metric("Turning age", turning), metric("Days remaining", fmtLoose(days, 0))], bar(["Days remaining", "Turning age"], [days, turning]));
    }
  });
  add({
    id: "anniversary-calculator",
    name: "Anniversary Calculator",
    category: "date-time",
    description: "Find completed years and next anniversary date.",
    keywords: "anniversary years",
    fields: [dateField("eventDate", "Event date", "2018-02-14")],
    calculate: (v) => {
      const event = parseDate(v.eventDate);
      const today = new Date();
      let next = new Date(today.getFullYear(), event.getMonth(), event.getDate());
      if (next < today) next = new Date(today.getFullYear() + 1, event.getMonth(), event.getDate());
      const completed = today.getFullYear() - event.getFullYear() - (new Date(today.getFullYear(), event.getMonth(), event.getDate()) > today ? 1 : 0);
      const days = Math.ceil((next - today) / 86400000);
      return result(`${fmtLoose(completed, 0)} years completed; next anniversary in ${daysText(days)}.`, [metric("Completed years", fmtLoose(completed, 0)), metric("Next anniversary", dateLabel(next)), metric("Days remaining", fmtLoose(days, 0))], bar(["Completed years", "Days remaining"], [completed, days]));
    }
  });
  add({
    id: "days-between-dates-calculator",
    name: "Days Between Dates Calculator",
    category: "date-time",
    description: "Calculate exact number of days between dates.",
    keywords: "days between dates",
    fields: [dateField("start", "Start date", todayISO(-15)), dateField("end", "End date", todayISO(45)), sel("inclusive", "Include end date", "no", selectOptions.yesNo)],
    calculate: (v) => {
      const days = Math.abs(daysBetween(v.start, v.end)) + (v.inclusive === "yes" ? 1 : 0);
      return result(`There are ${daysText(days)} between the dates.`, [metric("Days", fmtLoose(days, 0)), metric("Weeks", fmt(days / 7, 2)), metric("Inclusive", v.inclusive === "yes" ? "Yes" : "No")], bar(["Days", "Weeks"], [days, days / 7]));
    }
  });

  add({
    id: "percentage-increase-calculator",
    name: "Percentage Increase Calculator",
    category: "math",
    description: "Calculate percentage increase from old to new value.",
    keywords: "percentage increase",
    fields: [n("old", "Original value", 100), n("newValue", "New value", 125)],
    calculate: (v) => {
      const increase = v.newValue - v.old;
      return result(`Percentage increase is ${pct(safeDiv(increase, v.old) * 100)}.`, [metric("Increase", fmtLoose(increase, 2)), metric("Percent increase", pct(safeDiv(increase, v.old) * 100))], bar(["Original", "New"], [v.old, v.newValue]));
    }
  });
  add({
    id: "percentage-decrease-calculator",
    name: "Percentage Decrease Calculator",
    category: "math",
    description: "Calculate percentage decrease from old to new value.",
    keywords: "percentage decrease",
    fields: [n("old", "Original value", 100), n("newValue", "New value", 80)],
    calculate: (v) => {
      const decrease = v.old - v.newValue;
      return result(`Percentage decrease is ${pct(safeDiv(decrease, v.old) * 100)}.`, [metric("Decrease", fmtLoose(decrease, 2)), metric("Percent decrease", pct(safeDiv(decrease, v.old) * 100))], bar(["Original", "New"], [v.old, v.newValue]));
    }
  });
  add({
    id: "fraction-calculator",
    name: "Fraction Calculator",
    category: "math",
    description: "Add, subtract, multiply or divide two fractions.",
    keywords: "fraction add subtract multiply divide",
    fields: [n("aNum", "First numerator", 1), n("aDen", "First denominator", 2), sel("op", "Operation", "add", selectOptions.operation), n("bNum", "Second numerator", 1), n("bDen", "Second denominator", 3)],
    calculate: (v) => {
      let numValue;
      let denValue;
      if (v.op === "add") [numValue, denValue] = [v.aNum * v.bDen + v.bNum * v.aDen, v.aDen * v.bDen];
      if (v.op === "subtract") [numValue, denValue] = [v.aNum * v.bDen - v.bNum * v.aDen, v.aDen * v.bDen];
      if (v.op === "multiply") [numValue, denValue] = [v.aNum * v.bNum, v.aDen * v.bDen];
      if (v.op === "divide") [numValue, denValue] = [v.aNum * v.bDen, v.aDen * v.bNum];
      const divisor = gcd(numValue, denValue);
      const simpleNum = numValue / divisor;
      const simpleDen = denValue / divisor;
      return result(`Result is ${simpleNum}/${simpleDen}.`, [metric("Fraction", `${simpleNum}/${simpleDen}`), metric("Decimal", fmt(safeDiv(simpleNum, simpleDen), 4))], bar(["Numerator", "Denominator"], [Math.abs(simpleNum), Math.abs(simpleDen)]));
    }
  });
  add({
    id: "average-calculator",
    name: "Average Calculator",
    category: "math",
    description: "Calculate average of a list of numbers.",
    keywords: "average mean",
    fields: [area("numbers", "Numbers", "10, 20, 30, 40, 50")],
    calculate: (v) => {
      const values = parseList(v.numbers);
      const average = safeDiv(values.reduce((sum, value) => sum + value, 0), values.length);
      return result(`Average is ${fmt(average, 2)}.`, [metric("Average", fmt(average, 2)), metric("Count", fmtLoose(values.length, 0)), metric("Sum", fmtLoose(values.reduce((sum, value) => sum + value, 0), 2))], bar(values.map((_, index) => `N${index + 1}`), values));
    }
  });
  add({
    id: "ratio-calculator",
    name: "Ratio Calculator",
    category: "math",
    description: "Simplify a two-number ratio.",
    keywords: "ratio simplify",
    fields: [n("a", "First number", 24), n("b", "Second number", 36)],
    calculate: (v) => {
      const divisor = gcd(v.a, v.b);
      return result(`Simplified ratio is ${v.a / divisor}:${v.b / divisor}.`, [metric("Simplified ratio", `${v.a / divisor}:${v.b / divisor}`), metric("Common factor", divisor)], bar(["First", "Second"], [v.a, v.b]));
    }
  });
  add({
    id: "scientific-calculator",
    name: "Scientific Calculator",
    category: "math",
    description: "Evaluate a safe math expression with common functions.",
    keywords: "scientific calculator expression sin cos log",
    fields: [text("expression", "Expression", "sin(30) + sqrt(81) + 2^3", { wide: true, hint: "Allowed: + - * / ^ ( ) and sin cos tan sqrt log ln abs. Trig uses degrees." })],
    calculate: (v) => {
      const expression = String(v.expression || "").toLowerCase().replace(/\^/g, "**");
      if (!/^[0-9+\-*/().,\s*a-z*]+$/.test(expression)) throw new Error("Expression contains unsupported characters.");
      const transformed = expression
        .replace(/\bsin\s*\(/g, "sin(")
        .replace(/\bcos\s*\(/g, "cos(")
        .replace(/\btan\s*\(/g, "tan(")
        .replace(/\bsqrt\s*\(/g, "Math.sqrt(")
        .replace(/\blog\s*\(/g, "Math.log10(")
        .replace(/\bln\s*\(/g, "Math.log(")
        .replace(/\babs\s*\(/g, "Math.abs(");
      if (/[a-z]/.test(transformed.replace(/Math\.(sqrt|log10|log|abs)/g, "").replace(/\b(sin|cos|tan)\(/g, ""))) throw new Error("Only listed math functions are allowed.");
      const deg = Math.PI / 180;
      const value = Function("Math", "sin", "cos", "tan", `"use strict"; return (${transformed});`)(Math, (x) => Math.sin(x * deg), (x) => Math.cos(x * deg), (x) => Math.tan(x * deg));
      return result(`Result is ${fmtLoose(value, 6)}.`, [metric("Expression result", fmtLoose(value, 6))], bar(["Result"], [Math.abs(value)]));
    }
  });
  add({
    id: "matrix-calculator",
    name: "Matrix Calculator",
    category: "math",
    description: "Calculate determinant and inverse of a 2x2 matrix.",
    keywords: "matrix determinant inverse",
    fields: [n("a", "a", 1), n("b", "b", 2), n("c", "c", 3), n("d", "d", 4)],
    calculate: (v) => {
      const determinant = v.a * v.d - v.b * v.c;
      const inverse = determinant ? `[${fmt(v.d / determinant, 2)}, ${fmt(-v.b / determinant, 2)}; ${fmt(-v.c / determinant, 2)}, ${fmt(v.a / determinant, 2)}]` : "Not invertible";
      return result(`Determinant is ${fmt(determinant, 2)}.`, [metric("Determinant", fmt(determinant, 2)), metric("Inverse", inverse)], bar(["a", "b", "c", "d"], [Math.abs(v.a), Math.abs(v.b), Math.abs(v.c), Math.abs(v.d)]));
    }
  });
  add({
    id: "equation-solver",
    name: "Equation Solver",
    category: "math",
    description: "Solve a linear equation ax + b = c.",
    keywords: "equation solver linear",
    fields: [n("a", "a", 2), n("b", "b", 3), n("c", "c", 11)],
    calculate: (v) => {
      const x = safeDiv(v.c - v.b, v.a);
      return result(`x = ${fmt(x, 4)}.`, [metric("Solution x", fmt(x, 4)), metric("Equation", `${v.a}x + ${v.b} = ${v.c}`)], bar(["a", "b", "c", "x"], [Math.abs(v.a), Math.abs(v.b), Math.abs(v.c), Math.abs(x)]));
    }
  });
  add({
    id: "prime-number-calculator",
    name: "Prime Number Calculator",
    category: "math",
    description: "Check prime number and list prime factors.",
    keywords: "prime number factors",
    fields: [n("number", "Number", 97, { step: 1 })],
    calculate: (v) => {
      let x = Math.abs(Math.round(v.number));
      const original = x;
      const factors = [];
      for (let factor = 2; factor * factor <= x; factor += 1) {
        while (x % factor === 0) {
          factors.push(factor);
          x /= factor;
        }
      }
      if (x > 1) factors.push(x);
      const prime = original > 1 && factors.length === 1 && factors[0] === original;
      return result(`${original} is ${prime ? "" : "not "}prime.`, [metric("Prime", prime ? "Yes" : "No"), metric("Factors", factors.join(" x ") || "None"), metric("Factor count", factors.length)], bar(["Number", "Factor count"], [original, factors.length]));
    }
  });
  add({
    id: "lcm-calculator",
    name: "LCM Calculator",
    category: "math",
    description: "Calculate least common multiple of numbers.",
    keywords: "lcm least common multiple",
    fields: [area("numbers", "Numbers", "12, 18, 30")],
    calculate: (v) => {
      const values = parseList(v.numbers).map(Math.round).filter(Boolean);
      const answer = values.reduce((acc, value) => lcm(acc, value), values[0] || 0);
      return result(`LCM is ${fmtLoose(answer, 0)}.`, [metric("LCM", fmtLoose(answer, 0)), metric("Numbers", values.join(", "))], bar(values.map(String), values));
    }
  });
  add({
    id: "hcf-calculator",
    name: "HCF Calculator",
    category: "math",
    description: "Calculate highest common factor of numbers.",
    keywords: "hcf gcd highest common factor",
    fields: [area("numbers", "Numbers", "24, 36, 60")],
    calculate: (v) => {
      const values = parseList(v.numbers).map(Math.round).filter(Boolean);
      const answer = values.reduce((acc, value) => gcd(acc, value), values[0] || 0);
      return result(`HCF is ${fmtLoose(answer, 0)}.`, [metric("HCF", fmtLoose(answer, 0)), metric("Numbers", values.join(", "))], bar(values.map(String), values));
    }
  });
  add({
    id: "log-calculator",
    name: "Log Calculator",
    category: "math",
    description: "Calculate logarithm of a number with any base.",
    keywords: "log logarithm",
    fields: [n("number", "Number", 1000), n("base", "Base", 10)],
    calculate: (v) => {
      const value = Math.log(v.number) / Math.log(v.base);
      return result(`Log result is ${fmt(value, 6)}.`, [metric("Log value", fmt(value, 6)), metric("Number", fmtLoose(v.number, 2)), metric("Base", fmtLoose(v.base, 2))], bar(["Number", "Base", "Log"], [v.number, v.base, Math.abs(value)]));
    }
  });
  add({
    id: "square-root-calculator",
    name: "Square Root Calculator",
    category: "math",
    description: "Calculate square root of a number.",
    keywords: "square root sqrt",
    fields: [n("number", "Number", 144)],
    calculate: (v) => {
      const value = Math.sqrt(v.number);
      return result(`Square root is ${fmt(value, 6)}.`, [metric("Square root", fmt(value, 6)), metric("Square", fmt(value * value, 2))], bar(["Number", "Root"], [v.number, value]));
    }
  });
  add({
    id: "cube-calculator",
    name: "Cube Calculator",
    category: "math",
    description: "Calculate cube and cube root.",
    keywords: "cube cube root",
    fields: [n("number", "Number", 5)],
    calculate: (v) => {
      const cube = v.number ** 3;
      return result(`Cube is ${fmtLoose(cube, 4)}.`, [metric("Cube", fmtLoose(cube, 4)), metric("Cube root", fmtLoose(Math.cbrt(v.number), 4))], bar(["Number", "Cube"], [Math.abs(v.number), Math.abs(cube)]));
    }
  });
  add({
    id: "geometry-calculator",
    name: "Geometry Calculator",
    category: "math",
    description: "Calculate area, perimeter or volume for common shapes.",
    keywords: "geometry area volume",
    fields: [sel("shape", "Shape", "circle", selectOptions.shape), n("radius", "Radius", 5), n("length", "Length", 10), n("width", "Width", 6), n("height", "Height", 8), n("base", "Triangle base", 10)],
    calculate: (v) => {
      let metrics;
      if (v.shape === "circle") metrics = [metric("Area", fmt(Math.PI * v.radius ** 2, 2)), metric("Circumference", fmt(2 * Math.PI * v.radius, 2))];
      if (v.shape === "rectangle") metrics = [metric("Area", fmt(v.length * v.width, 2)), metric("Perimeter", fmt(2 * (v.length + v.width), 2))];
      if (v.shape === "triangle") metrics = [metric("Area", fmt(v.base * v.height / 2, 2)), metric("Base", fmt(v.base, 2)), metric("Height", fmt(v.height, 2))];
      if (v.shape === "sphere") metrics = [metric("Surface area", fmt(4 * Math.PI * v.radius ** 2, 2)), metric("Volume", fmt(4 / 3 * Math.PI * v.radius ** 3, 2))];
      if (v.shape === "cylinder") metrics = [metric("Surface area", fmt(2 * Math.PI * v.radius * (v.radius + v.height), 2)), metric("Volume", fmt(Math.PI * v.radius ** 2 * v.height, 2))];
      return result(`Geometry result for ${v.shape}.`, metrics, bar(metrics.map((item) => item.label), metrics.map((item) => Number(String(item.value).replace(/,/g, "")) || 0)));
    }
  });

  addUnitConverter("length", "Length Converter", "Convert common length units.", { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 }, { amount: 10, from: "m", to: "ft" });
  addUnitConverter("weight", "Weight Converter", "Convert common weight units.", { mg: 0.000001, g: 0.001, kg: 1, tonne: 1000, oz: 0.0283495, lb: 0.453592 }, { amount: 75, from: "kg", to: "lb" });
  addUnitConverter("area", "Area Converter", "Convert common area units.", { sqm: 1, sqft: 0.092903, sqyd: 0.836127, acre: 4046.856, hectare: 10000 }, { amount: 1000, from: "sqft", to: "sqm" });
  addUnitConverter("volume", "Volume Converter", "Convert common volume units.", { ml: 0.001, l: 1, cum: 1000, cft: 28.3168, gal: 3.78541 }, { amount: 10, from: "l", to: "gal" });
  addUnitConverter("speed", "Speed Converter", "Convert common speed units.", { mps: 1, kmh: 0.277778, mph: 0.44704, knot: 0.514444 }, { amount: 60, from: "kmh", to: "mph" });
  add({
    id: "temperature-converter",
    name: "Temperature Converter",
    category: "unit",
    description: "Convert Celsius, Fahrenheit and Kelvin.",
    keywords: "temperature converter celsius fahrenheit kelvin",
    fields: [n("amount", "Temperature", 37, { step: 0.01 }), sel("from", "From", "c", optionPairs([["c", "Celsius"], ["f", "Fahrenheit"], ["k", "Kelvin"]])), sel("to", "To", "f", optionPairs([["c", "Celsius"], ["f", "Fahrenheit"], ["k", "Kelvin"]]))],
    calculate: (v) => {
      const converted = convertTemperature(v.amount, v.from, v.to);
      return result(`${fmt(v.amount, 2)} ${v.from.toUpperCase()} = ${fmt(converted, 2)} ${v.to.toUpperCase()}.`, [metric("Input", `${fmt(v.amount, 2)} ${v.from.toUpperCase()}`), metric("Converted", `${fmt(converted, 2)} ${v.to.toUpperCase()}`)], bar(["Input", "Converted"], [Math.abs(v.amount), Math.abs(converted)]));
    }
  });
  addUnitConverter("time", "Time Converter", "Convert common time units.", { sec: 1, min: 60, hr: 3600, day: 86400, week: 604800, month: 2629800, year: 31557600 }, { amount: 48, from: "hr", to: "day" });
  addUnitConverter("fuel", "Fuel Converter", "Convert common fuel economy units.", { kmpl: 1, l100km: 100, mpg_us: 0.425144, mpg_uk: 0.354006 }, { amount: 18, from: "kmpl", to: "mpg_us" });
  addUnitConverter("pressure", "Pressure Converter", "Convert pressure units.", { pa: 1, kpa: 1000, bar: 100000, psi: 6894.76, atm: 101325 }, { amount: 32, from: "psi", to: "bar" });
  addUnitConverter("data", "Data Storage Converter", "Convert digital storage units.", { b: 1, kb: 1024, mb: 1024 ** 2, gb: 1024 ** 3, tb: 1024 ** 4 }, { amount: 5, from: "gb", to: "mb" });

  add({
    id: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "vehicle",
    description: "Estimate fuel cost for a trip.",
    keywords: "fuel cost trip",
    fields: [n("distance", "Distance (km)", 250), n("mileage", "Mileage (km/l)", 16), n("price", "Fuel price per liter", 105)],
    calculate: (v) => {
      const liters = safeDiv(v.distance, v.mileage);
      return result(`Fuel cost is ${money(liters * v.price)}.`, [metric("Fuel needed", `${fmt(liters, 2)} L`), metric("Cost", money(liters * v.price)), metric("Distance", `${fmt(v.distance, 1)} km`)], bar(["Liters", "Cost"], [liters, liters * v.price]));
    }
  });
  add({
    id: "mileage-calculator",
    name: "Mileage Calculator",
    category: "vehicle",
    description: "Calculate vehicle mileage from distance and fuel used.",
    keywords: "mileage kmpl",
    fields: [n("distance", "Distance traveled (km)", 420), n("fuel", "Fuel used (liters)", 28)],
    calculate: (v) => {
      const mileage = safeDiv(v.distance, v.fuel);
      return result(`Mileage is ${fmt(mileage, 2)} km/l.`, [metric("Mileage", `${fmt(mileage, 2)} km/l`), metric("Fuel per 100 km", `${fmt(safeDiv(100, mileage), 2)} L`)], bar(["Distance", "Fuel"], [v.distance, v.fuel]));
    }
  });
  add({
    id: "road-trip-cost-calculator",
    name: "Road Trip Cost Calculator",
    category: "vehicle",
    description: "Estimate road trip cost including fuel, tolls and food.",
    keywords: "road trip cost",
    fields: [n("distance", "Round trip distance (km)", 600), n("mileage", "Mileage (km/l)", 15), n("fuelPrice", "Fuel price per liter", 105), n("tolls", "Tolls and parking", 1200), n("foodHotel", "Food and hotel", 5000), n("people", "People sharing", 4, { step: 1 })],
    calculate: (v) => {
      const fuel = safeDiv(v.distance, v.mileage) * v.fuelPrice;
      const total = fuel + v.tolls + v.foodHotel;
      return result(`Road trip cost is ${money(total)} total, ${money(total / v.people)} per person.`, [metric("Fuel cost", money(fuel)), metric("Other cost", money(v.tolls + v.foodHotel)), metric("Total cost", money(total)), metric("Per person", money(total / v.people))], donut(["Fuel", "Tolls", "Food/hotel"], [fuel, v.tolls, v.foodHotel]));
    }
  });
  addAssetLoan("vehicle-car-emi-calculator", "Car EMI Calculator", "Calculate EMI for a car purchase.", "Car price", { assetPrice: 1000000, downPayment: 200000, rate: 9.5, tenure: 5, processing: 4000 }, "vehicle car emi");
  calculators[calculators.length - 1].category = "vehicle";
  add({
    id: "insurance-calculator",
    name: "Insurance Calculator",
    category: "vehicle",
    description: "Estimate vehicle insurance premium from IDV and rates.",
    keywords: "vehicle insurance premium",
    fields: [n("idv", "Insured declared value", 800000), n("ownDamageRate", "Own damage rate (%)", 2.5, { step: 0.01 }), n("thirdParty", "Third-party premium", 3500), n("addons", "Add-ons", 2500), n("ncb", "No claim bonus (%)", 20, { step: 0.01 })],
    calculate: (v) => {
      const od = v.idv * v.ownDamageRate / 100;
      const ncbDiscount = od * v.ncb / 100;
      const premium = od - ncbDiscount + v.thirdParty + v.addons;
      return result(`Estimated insurance premium is ${money(premium)}.`, [metric("Own damage", money(od)), metric("NCB discount", money(ncbDiscount)), metric("Third party + add-ons", money(v.thirdParty + v.addons)), metric("Premium", money(premium))], donut(["OD after NCB", "Third party", "Add-ons"], [od - ncbDiscount, v.thirdParty, v.addons]));
    }
  });
  add({
    id: "ev-charging-cost-calculator",
    name: "EV Charging Cost Calculator",
    category: "vehicle",
    description: "Estimate EV charging units and cost.",
    keywords: "ev charging cost",
    fields: [n("battery", "Battery capacity (kWh)", 40), n("current", "Current charge (%)", 20), n("target", "Target charge (%)", 90), n("tariff", "Electricity tariff per unit", 8), n("efficiency", "Charging efficiency (%)", 90)],
    calculate: (v) => {
      const energyToBattery = v.battery * Math.max(0, v.target - v.current) / 100;
      const gridEnergy = safeDiv(energyToBattery, v.efficiency / 100);
      return result(`Charging cost is ${money(gridEnergy * v.tariff)}.`, [metric("Energy to battery", `${fmt(energyToBattery, 2)} kWh`), metric("Grid energy", `${fmt(gridEnergy, 2)} kWh`), metric("Cost", money(gridEnergy * v.tariff))], bar(["Battery kWh", "Grid kWh", "Cost"], [energyToBattery, gridEnergy, gridEnergy * v.tariff]));
    }
  });
  add({
    id: "vehicle-depreciation-calculator",
    name: "Vehicle Depreciation Calculator",
    category: "vehicle",
    description: "Estimate vehicle value after depreciation.",
    keywords: "vehicle depreciation value",
    fields: [n("purchase", "Purchase price", 1000000), n("rate", "Annual depreciation (%)", 15, { step: 0.1 }), n("age", "Vehicle age (years)", 3, { step: 0.1 })],
    calculate: (v) => {
      const value = v.purchase * (1 - v.rate / 100) ** v.age;
      return result(`Estimated current value is ${money(value)}.`, [metric("Purchase price", money(v.purchase)), metric("Depreciation", money(v.purchase - value)), metric("Current value", money(value))], donut(["Current value", "Depreciation"], [value, v.purchase - value]));
    }
  });

  add({
    id: "gst-profit-calculator",
    name: "GST Profit Calculator",
    category: "business",
    description: "Calculate profit before GST and GST payable on selling price.",
    keywords: "gst profit business",
    fields: [n("cost", "Cost excluding GST", 7000), n("selling", "Selling price excluding GST", 10000), n("gst", "GST rate (%)", 18, { step: 0.01 })],
    calculate: (v) => {
      const profit = v.selling - v.cost;
      const gst = v.selling * v.gst / 100;
      return result(`Profit before GST is ${money(profit)}.`, [metric("Profit", money(profit)), metric("Margin", pct(safeDiv(profit, v.selling) * 100)), metric("Output GST", money(gst)), metric("Invoice total", money(v.selling + gst))], donut(["Cost", "Profit", "GST"], [v.cost, profit, gst]));
    }
  });
  add({
    id: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    category: "business",
    description: "Calculate tax and total sale price.",
    keywords: "sales tax",
    fields: [n("price", "Price before tax", 10000), n("tax", "Sales tax (%)", 8, { step: 0.01 })],
    calculate: (v) => {
      const tax = v.price * v.tax / 100;
      return result(`Total price is ${money(v.price + tax)}.`, [metric("Tax", money(tax)), metric("Total", money(v.price + tax))], donut(["Price", "Tax"], [v.price, tax]));
    }
  });
  add({
    id: "revenue-calculator",
    name: "Revenue Calculator",
    category: "business",
    description: "Calculate gross and net revenue.",
    keywords: "revenue units price",
    fields: [n("units", "Units sold", 1000), n("price", "Price per unit", 499), n("returns", "Returns/refunds", 25000), n("discounts", "Discounts", 10000)],
    calculate: (v) => {
      const gross = v.units * v.price;
      const net = gross - v.returns - v.discounts;
      return result(`Net revenue is ${money(net)}.`, [metric("Gross revenue", money(gross)), metric("Returns + discounts", money(v.returns + v.discounts)), metric("Net revenue", money(net))], donut(["Net", "Returns", "Discounts"], [net, v.returns, v.discounts]));
    }
  });
  add({
    id: "roi-calculator",
    name: "ROI Calculator",
    category: "business",
    description: "Calculate return on investment.",
    keywords: "roi return investment",
    fields: [n("investment", "Investment cost", 100000), n("returnValue", "Final value or gain", 135000)],
    calculate: (v) => {
      const gain = v.returnValue - v.investment;
      return result(`ROI is ${pct(safeDiv(gain, v.investment) * 100)}.`, [metric("Gain", money(gain)), metric("ROI", pct(safeDiv(gain, v.investment) * 100)), metric("Final value", money(v.returnValue))], donut(["Investment", "Gain"], [v.investment, gain]));
    }
  });
  add({
    id: "payroll-calculator",
    name: "Payroll Calculator",
    category: "business",
    description: "Estimate total payroll cost.",
    keywords: "payroll employer cost",
    fields: [n("employees", "Employees", 10, { step: 1 }), n("avgSalary", "Average monthly gross salary", 45000), n("employerCost", "Employer overhead (%)", 15, { step: 0.1 }), n("bonus", "Monthly bonus total", 20000)],
    calculate: (v) => {
      const gross = v.employees * v.avgSalary;
      const overhead = gross * v.employerCost / 100;
      const total = gross + overhead + v.bonus;
      return result(`Monthly payroll cost is ${money(total)}.`, [metric("Gross salaries", money(gross)), metric("Employer overhead", money(overhead)), metric("Bonus", money(v.bonus)), metric("Total payroll", money(total))], donut(["Gross", "Overhead", "Bonus"], [gross, overhead, v.bonus]));
    }
  });
  add({
    id: "inventory-calculator",
    name: "Inventory Calculator",
    category: "business",
    description: "Calculate inventory turnover and days in inventory.",
    keywords: "inventory turnover",
    fields: [n("cogs", "Cost of goods sold", 1200000), n("opening", "Opening inventory", 300000), n("closing", "Closing inventory", 250000)],
    calculate: (v) => {
      const avg = (v.opening + v.closing) / 2;
      const turnover = safeDiv(v.cogs, avg);
      return result(`Inventory turnover is ${fmt(turnover, 2)} times.`, [metric("Average inventory", money(avg)), metric("Turnover", fmt(turnover, 2)), metric("Days in inventory", fmt(safeDiv(365, turnover), 1))], bar(["COGS", "Average inventory"], [v.cogs, avg]));
    }
  });
  add({
    id: "commission-calculator",
    name: "Commission Calculator",
    category: "business",
    description: "Calculate sales commission.",
    keywords: "commission sales",
    fields: [n("sales", "Sales amount", 250000), n("rate", "Commission rate (%)", 5, { step: 0.01 }), n("base", "Base incentive", 0)],
    calculate: (v) => {
      const commission = v.sales * v.rate / 100 + v.base;
      return result(`Commission earned is ${money(commission)}.`, [metric("Commission", money(commission)), metric("Rate", pct(v.rate)), metric("Sales", money(v.sales))], donut(["Sales retained", "Commission"], [Math.max(0, v.sales - commission), commission]));
    }
  });
  add({
    id: "margin-calculator",
    name: "Margin Calculator",
    category: "business",
    description: "Calculate product margin and markup.",
    keywords: "business margin markup",
    fields: [n("cost", "Cost", 350), n("price", "Selling price", 500)],
    calculate: (v) => {
      const profit = v.price - v.cost;
      return result(`Margin is ${pct(safeDiv(profit, v.price) * 100)}.`, [metric("Profit", money(profit)), metric("Margin", pct(safeDiv(profit, v.price) * 100)), metric("Markup", pct(safeDiv(profit, v.cost) * 100))], donut(["Cost", "Profit"], [v.cost, profit]));
    }
  });
  add({
    id: "invoice-calculator",
    name: "Invoice Calculator",
    category: "business",
    description: "Calculate invoice total with discount, tax and shipping.",
    keywords: "invoice total tax discount",
    fields: [n("subtotal", "Subtotal", 50000), n("discount", "Discount (%)", 5, { step: 0.01 }), n("tax", "Tax/GST (%)", 18, { step: 0.01 }), n("shipping", "Shipping/other charges", 500)],
    calculate: (v) => {
      const discount = v.subtotal * v.discount / 100;
      const taxable = v.subtotal - discount;
      const tax = taxable * v.tax / 100;
      const total = taxable + tax + v.shipping;
      return result(`Invoice total is ${money(total)}.`, [metric("Discount", money(discount)), metric("Tax", money(tax)), metric("Shipping", money(v.shipping)), metric("Total", money(total))], donut(["Taxable", "Tax", "Shipping"], [taxable, tax, v.shipping]));
    }
  });

  add({
    id: "youtube-income-calculator",
    name: "YouTube Income Calculator",
    category: "creator",
    description: "Estimate YouTube revenue from views and RPM.",
    keywords: "youtube income rpm views",
    fields: [n("views", "Monthly views", 100000), n("rpm", "RPM", 80), n("monetized", "Monetized views (%)", 70, { step: 0.1 })],
    calculate: (v) => {
      const revenue = v.views * v.monetized / 100 / 1000 * v.rpm;
      return result(`Estimated YouTube income is ${money(revenue)}.`, [metric("Monetized views", fmtLoose(v.views * v.monetized / 100, 0)), metric("RPM", money(v.rpm)), metric("Revenue", money(revenue))], bar(["Views / 1000", "Revenue"], [v.views / 1000, revenue]));
    }
  });
  add({
    id: "instagram-engagement-calculator",
    name: "Instagram Engagement Calculator",
    category: "creator",
    description: "Calculate engagement rate from followers and interactions.",
    keywords: "instagram engagement rate",
    fields: [n("followers", "Followers", 25000), n("likes", "Likes", 1800), n("comments", "Comments", 120), n("shares", "Shares", 80), n("saves", "Saves", 150)],
    calculate: (v) => {
      const interactions = v.likes + v.comments + v.shares + v.saves;
      const rate = safeDiv(interactions, v.followers) * 100;
      return result(`Engagement rate is ${pct(rate)}.`, [metric("Interactions", fmtLoose(interactions, 0)), metric("Engagement rate", pct(rate)), metric("Followers", fmtLoose(v.followers, 0))], donut(["Likes", "Comments", "Shares", "Saves"], [v.likes, v.comments, v.shares, v.saves]));
    }
  });
  add({
    id: "cpm-calculator",
    name: "CPM Calculator",
    category: "creator",
    description: "Calculate cost per thousand impressions.",
    keywords: "cpm ads",
    fields: [n("cost", "Campaign cost", 50000), n("impressions", "Impressions", 1000000)],
    calculate: (v) => {
      const cpm = safeDiv(v.cost, v.impressions) * 1000;
      return result(`CPM is ${money(cpm)}.`, [metric("CPM", money(cpm)), metric("Cost", money(v.cost)), metric("Impressions", fmtLoose(v.impressions, 0))], bar(["Cost", "CPM"], [v.cost, cpm]));
    }
  });
  add({
    id: "ad-revenue-calculator",
    name: "Ad Revenue Calculator",
    category: "creator",
    description: "Estimate ad revenue from impressions, fill rate and CPM.",
    keywords: "ad revenue cpm fill rate",
    fields: [n("impressions", "Impressions", 500000), n("fillRate", "Fill rate (%)", 80, { step: 0.1 }), n("cpm", "CPM", 120)],
    calculate: (v) => {
      const filled = v.impressions * v.fillRate / 100;
      const revenue = filled / 1000 * v.cpm;
      return result(`Estimated ad revenue is ${money(revenue)}.`, [metric("Filled impressions", fmtLoose(filled, 0)), metric("CPM", money(v.cpm)), metric("Revenue", money(revenue))], bar(["Impressions / 1000", "Revenue"], [filled / 1000, revenue]));
    }
  });
  add({
    id: "affiliate-earnings-calculator",
    name: "Affiliate Earnings Calculator",
    category: "creator",
    description: "Estimate affiliate income from clicks, conversions and commission.",
    keywords: "affiliate earnings commission",
    fields: [n("clicks", "Clicks", 10000), n("conversion", "Conversion rate (%)", 3, { step: 0.01 }), n("orderValue", "Average order value", 2500), n("commission", "Commission (%)", 8, { step: 0.01 })],
    calculate: (v) => {
      const orders = v.clicks * v.conversion / 100;
      const revenue = orders * v.orderValue * v.commission / 100;
      return result(`Affiliate earnings are ${money(revenue)}.`, [metric("Orders", fmt(orders, 1)), metric("Gross sales", money(orders * v.orderValue)), metric("Earnings", money(revenue))], bar(["Clicks / 100", "Orders", "Earnings"], [v.clicks / 100, orders, revenue]));
    }
  });
  add({
    id: "seo-roi-calculator",
    name: "SEO ROI Calculator",
    category: "creator",
    description: "Estimate ROI from organic traffic and SEO cost.",
    keywords: "seo roi organic traffic",
    fields: [n("visits", "Monthly organic visits", 20000), n("conversion", "Conversion rate (%)", 2, { step: 0.01 }), n("orderValue", "Average order value", 3000), n("margin", "Gross margin (%)", 35, { step: 0.1 }), n("cost", "Monthly SEO cost", 80000)],
    calculate: (v) => {
      const orders = v.visits * v.conversion / 100;
      const grossProfit = orders * v.orderValue * v.margin / 100;
      const roi = safeDiv(grossProfit - v.cost, v.cost) * 100;
      return result(`SEO ROI is ${pct(roi)}.`, [metric("Orders", fmt(orders, 1)), metric("Gross profit", money(grossProfit)), metric("SEO cost", money(v.cost)), metric("ROI", pct(roi))], donut(["Profit after cost", "SEO cost"], [Math.max(0, grossProfit - v.cost), v.cost]));
    }
  });

  add({
    id: "love-percentage-calculator",
    name: "Love Percentage Calculator",
    category: "lifestyle",
    description: "A fun deterministic compatibility score from two names.",
    keywords: "love percentage fun",
    fields: [text("nameA", "First name", "Aarav"), text("nameB", "Second name", "Diya")],
    calculate: (v) => {
      const score = loveScore(v.nameA, v.nameB);
      return result(`Compatibility score is ${score}%.`, [metric("Score", `${score}%`), metric("Match type", score > 80 ? "Strong" : score > 60 ? "Warm" : "Playful")], donut(["Score", "Remaining"], [score, 100 - score]), "This calculator is for fun only.");
    }
  });
  add({
    id: "wedding-budget-calculator",
    name: "Wedding Budget Calculator",
    category: "lifestyle",
    description: "Estimate wedding budget from guests and major cost heads.",
    keywords: "wedding budget",
    fields: [n("guests", "Guests", 250), n("venue", "Venue cost", 200000), n("foodPerGuest", "Food per guest", 1200), n("decor", "Decor", 150000), n("photo", "Photo/video", 100000), n("misc", "Miscellaneous", 75000)],
    calculate: (v) => {
      const food = v.guests * v.foodPerGuest;
      const total = v.venue + food + v.decor + v.photo + v.misc;
      return result(`Estimated wedding budget is ${money(total)}.`, [metric("Food", money(food)), metric("Venue", money(v.venue)), metric("Decor/photo/misc", money(v.decor + v.photo + v.misc)), metric("Total", money(total))], donut(["Food", "Venue", "Decor", "Photo", "Misc"], [food, v.venue, v.decor, v.photo, v.misc]));
    }
  });
  add({
    id: "travel-budget-calculator",
    name: "Travel Budget Calculator",
    category: "lifestyle",
    description: "Estimate total travel budget and per-person cost.",
    keywords: "travel budget",
    fields: [n("people", "People", 2, { step: 1 }), n("days", "Days", 5, { step: 1 }), n("hotel", "Hotel per night", 3500), n("transport", "Transport total", 15000), n("foodPerDay", "Food per person per day", 900), n("activities", "Activities/misc total", 10000)],
    calculate: (v) => {
      const hotel = v.hotel * Math.max(0, v.days - 1);
      const food = v.foodPerDay * v.people * v.days;
      const total = hotel + v.transport + food + v.activities;
      return result(`Travel budget is ${money(total)} total, ${money(total / v.people)} per person.`, [metric("Hotel", money(hotel)), metric("Food", money(food)), metric("Transport + activities", money(v.transport + v.activities)), metric("Total", money(total))], donut(["Hotel", "Food", "Transport", "Activities"], [hotel, food, v.transport, v.activities]));
    }
  });
  add({
    id: "party-budget-calculator",
    name: "Party Budget Calculator",
    category: "lifestyle",
    description: "Estimate party budget from guests and cost categories.",
    keywords: "party budget",
    fields: [n("guests", "Guests", 40), n("foodPerGuest", "Food per guest", 500), n("venue", "Venue", 8000), n("decor", "Decor", 5000), n("entertainment", "Entertainment", 7000)],
    calculate: (v) => {
      const food = v.guests * v.foodPerGuest;
      const total = food + v.venue + v.decor + v.entertainment;
      return result(`Party budget is ${money(total)}.`, [metric("Food", money(food)), metric("Venue", money(v.venue)), metric("Other", money(v.decor + v.entertainment)), metric("Per guest", money(total / v.guests))], donut(["Food", "Venue", "Decor", "Entertainment"], [food, v.venue, v.decor, v.entertainment]));
    }
  });
  add({
    id: "rent-split-calculator",
    name: "Rent Split Calculator",
    category: "lifestyle",
    description: "Split rent by room size and utilities.",
    keywords: "rent split roommates",
    fields: [n("rent", "Monthly rent", 40000), n("utilities", "Utilities", 6000), n("people", "People", 3, { step: 1 }), n("yourRoom", "Your room area (sq ft)", 130), n("totalPrivate", "Total private room area (sq ft)", 390)],
    calculate: (v) => {
      const roomShare = v.rent * safeDiv(v.yourRoom, v.totalPrivate);
      const utilityShare = v.utilities / v.people;
      return result(`Your estimated share is ${money(roomShare + utilityShare)}.`, [metric("Room rent share", money(roomShare)), metric("Utility share", money(utilityShare)), metric("Total share", money(roomShare + utilityShare))], donut(["Room share", "Utilities"], [roomShare, utilityShare]));
    }
  });
  add({
    id: "cooking-ingredient-calculator",
    name: "Cooking Ingredient Calculator",
    category: "lifestyle",
    description: "Scale ingredient quantity by servings.",
    keywords: "cooking ingredient scale recipe",
    fields: [n("originalServings", "Original servings", 4), n("targetServings", "Target servings", 10), n("ingredientAmount", "Original ingredient amount", 250), text("unit", "Ingredient unit", "g")],
    calculate: (v) => {
      const scaled = v.ingredientAmount * safeDiv(v.targetServings, v.originalServings);
      return result(`Use ${fmt(scaled, 2)} ${v.unit}.`, [metric("Original amount", `${fmt(v.ingredientAmount, 2)} ${v.unit}`), metric("Scale factor", fmt(safeDiv(v.targetServings, v.originalServings), 2)), metric("New amount", `${fmt(scaled, 2)} ${v.unit}`)], bar(["Original", "Scaled"], [v.ingredientAmount, scaled]));
    }
  });

  add({
    id: "savings-goal-calculator",
    name: "Savings Goal Calculator",
    category: "finance",
    description: "Calculate monthly saving needed to reach a target amount.",
    keywords: "savings goal monthly saving target",
    fields: [n("target", "Target amount", 500000), n("current", "Current savings", 75000), n("rate", "Expected annual return (%)", 6, { step: 0.01 }), n("months", "Months to goal", 36, { step: 1 })],
    calculate: (v) => {
      const monthlyRate = v.rate / 1200;
      const futureCurrent = v.current * (1 + monthlyRate) ** v.months;
      const gap = Math.max(0, v.target - futureCurrent);
      const monthly = monthlyRate ? gap * monthlyRate / (((1 + monthlyRate) ** v.months - 1) * (1 + monthlyRate)) : safeDiv(gap, v.months);
      return result(`Save about ${money(monthly)} per month to reach the goal.`, [metric("Target", money(v.target)), metric("Future value of current savings", money(futureCurrent)), metric("Monthly saving needed", money(monthly)), metric("Remaining gap", money(gap))], bar(["Target", "Current FV", "Gap"], [v.target, futureCurrent, gap]));
    }
  });
  add({
    id: "emergency-fund-calculator",
    name: "Emergency Fund Calculator",
    category: "finance",
    description: "Estimate the emergency fund target for monthly expenses.",
    keywords: "emergency fund monthly expenses savings",
    fields: [n("expenses", "Monthly essential expenses", 45000), n("months", "Months of cover", 6, { step: 1 }), n("current", "Current emergency savings", 100000)],
    calculate: (v) => {
      const target = v.expenses * v.months;
      const gap = Math.max(0, target - v.current);
      return result(`Emergency fund target is ${money(target)}.`, [metric("Target fund", money(target)), metric("Current savings", money(v.current)), metric("Gap", money(gap)), metric("Cover available", `${fmt(safeDiv(v.current, v.expenses), 1)} months`)], donut(["Current savings", "Gap"], [v.current, gap]));
    }
  });
  add({
    id: "debt-payoff-calculator",
    name: "Debt Payoff Calculator",
    category: "finance",
    description: "Estimate debt payoff time and interest from a fixed monthly payment.",
    keywords: "debt payoff credit loan repayment",
    fields: [n("balance", "Debt balance", 200000), n("rate", "Annual interest rate (%)", 18, { step: 0.01 }), n("payment", "Monthly payment", 12000)],
    calculate: (v) => {
      const monthlyRate = v.rate / 1200;
      if (v.payment <= v.balance * monthlyRate) throw new Error("Monthly payment must be higher than monthly interest.");
      const months = monthlyRate ? Math.ceil(-Math.log(1 - monthlyRate * v.balance / v.payment) / Math.log(1 + monthlyRate)) : Math.ceil(safeDiv(v.balance, v.payment));
      const total = v.payment * months;
      const interest = Math.max(0, total - v.balance);
      return result(`Debt can be paid off in about ${fmtLoose(months, 0)} months.`, [metric("Payoff time", `${fmtLoose(months, 0)} months`), metric("Total paid", money(total)), metric("Interest", money(interest)), metric("Monthly payment", money(v.payment))], donut(["Principal", "Interest"], [v.balance, interest]));
    }
  });
  add({
    id: "loan-prepayment-calculator",
    name: "Loan Prepayment Calculator",
    category: "finance",
    description: "Estimate EMI interest saving after a one-time loan prepayment.",
    keywords: "loan prepayment emi saving foreclosure",
    fields: [n("outstanding", "Outstanding principal", 2000000), n("rate", "Annual interest rate (%)", 8.5, { step: 0.01 }), n("remainingMonths", "Remaining tenure (months)", 180, { step: 1 }), n("prepayment", "One-time prepayment", 200000)],
    calculate: (v) => {
      const before = emi(v.outstanding, v.rate, v.remainingMonths);
      const afterPrincipal = Math.max(0, v.outstanding - v.prepayment);
      const after = emi(afterPrincipal, v.rate, v.remainingMonths);
      const saving = before.interest - after.interest;
      return result(`Estimated interest saving is ${money(saving)}.`, [metric("Old EMI", money(before.emi)), metric("New EMI", money(after.emi)), metric("Interest saving", money(saving)), metric("Principal after prepayment", money(afterPrincipal))], bar(["Old interest", "New interest", "Saving"], [before.interest, after.interest, saving]));
    }
  });
  add({
    id: "net-worth-calculator",
    name: "Net Worth Calculator",
    category: "finance",
    description: "Calculate personal net worth from assets and liabilities.",
    keywords: "net worth assets liabilities",
    fields: [n("cash", "Cash and bank balance", 150000), n("investments", "Investments", 850000), n("property", "Property value", 4500000), n("otherAssets", "Other assets", 200000), n("loans", "Loans outstanding", 1800000), n("otherLiabilities", "Other liabilities", 100000)],
    calculate: (v) => {
      const assets = v.cash + v.investments + v.property + v.otherAssets;
      const liabilities = v.loans + v.otherLiabilities;
      const netWorth = assets - liabilities;
      return result(`Your estimated net worth is ${money(netWorth)}.`, [metric("Total assets", money(assets)), metric("Total liabilities", money(liabilities)), metric("Net worth", money(netWorth))], donut(["Net worth", "Liabilities"], [Math.max(0, netWorth), liabilities]));
    }
  });
  add({
    id: "rent-affordability-calculator",
    name: "Rent Affordability Calculator",
    category: "finance",
    description: "Find comfortable rent from income, expenses and target savings.",
    keywords: "rent affordability monthly budget",
    fields: [n("income", "Monthly take-home income", 80000), n("expenses", "Non-rent monthly expenses", 30000), n("savings", "Target savings", 20000), n("rentLimitPct", "Maximum rent as % of income", 30, { step: 0.1 })],
    calculate: (v) => {
      const budgetBased = Math.max(0, v.income - v.expenses - v.savings);
      const percentBased = v.income * v.rentLimitPct / 100;
      const affordable = Math.min(budgetBased, percentBased);
      return result(`Comfortable rent is about ${money(affordable)} per month.`, [metric("Budget-based rent", money(budgetBased)), metric("Percent-based rent", money(percentBased)), metric("Recommended rent", money(affordable)), metric("Rent limit", pct(v.rentLimitPct))], bar(["Income", "Expenses", "Savings", "Rent"], [v.income, v.expenses, v.savings, affordable]));
    }
  });
  add({
    id: "tip-calculator",
    name: "Tip Calculator",
    category: "lifestyle",
    description: "Calculate tip, bill total and share per person.",
    keywords: "tip restaurant bill split",
    fields: [n("bill", "Bill amount", 2500), n("tip", "Tip (%)", 10, { step: 0.1 }), n("people", "People", 4, { step: 1 })],
    calculate: (v) => {
      const tipAmount = v.bill * v.tip / 100;
      const total = v.bill + tipAmount;
      return result(`Total bill is ${money(total)}, or ${money(total / v.people)} per person.`, [metric("Tip", money(tipAmount)), metric("Total", money(total)), metric("Per person", money(total / v.people))], donut(["Bill", "Tip"], [v.bill, tipAmount]));
    }
  });
  add({
    id: "bill-split-calculator",
    name: "Bill Split Calculator",
    category: "lifestyle",
    description: "Split a shared bill with tax, tip and unequal paid amount.",
    keywords: "bill split shared expense",
    fields: [n("subtotal", "Subtotal", 4200), n("tax", "Tax/service charge (%)", 5, { step: 0.1 }), n("tip", "Tip (%)", 8, { step: 0.1 }), n("people", "People", 5, { step: 1 }), n("alreadyPaid", "Amount already paid by you", 0)],
    calculate: (v) => {
      const tax = v.subtotal * v.tax / 100;
      const tipAmount = v.subtotal * v.tip / 100;
      const total = v.subtotal + tax + tipAmount;
      const share = total / v.people;
      return result(`Each person should pay ${money(share)}.`, [metric("Tax/service", money(tax)), metric("Tip", money(tipAmount)), metric("Total bill", money(total)), metric("Your balance", money(share - v.alreadyPaid))], donut(["Subtotal", "Tax/service", "Tip"], [v.subtotal, tax, tipAmount]));
    }
  });
  add({
    id: "grocery-budget-calculator",
    name: "Grocery Budget Calculator",
    category: "lifestyle",
    description: "Estimate monthly grocery budget for a household.",
    keywords: "grocery budget household food",
    fields: [n("people", "People", 4, { step: 1 }), n("weeklyPerPerson", "Weekly grocery per person", 1200), n("eatingOut", "Monthly eating-out budget", 4000), n("bulkSavings", "Bulk buying savings (%)", 5, { step: 0.1 })],
    calculate: (v) => {
      const monthlyGroceries = v.people * v.weeklyPerPerson * 4.345;
      const savings = monthlyGroceries * v.bulkSavings / 100;
      const total = monthlyGroceries - savings + v.eatingOut;
      return result(`Estimated monthly food budget is ${money(total)}.`, [metric("Groceries", money(monthlyGroceries - savings)), metric("Eating out", money(v.eatingOut)), metric("Bulk savings", money(savings)), metric("Total", money(total))], donut(["Groceries", "Eating out", "Savings"], [monthlyGroceries - savings, v.eatingOut, savings]));
    }
  });
  add({
    id: "household-budget-calculator",
    name: "Household Budget Calculator",
    category: "lifestyle",
    description: "Create a quick monthly household budget and savings estimate.",
    keywords: "household budget monthly expenses savings",
    fields: [n("income", "Monthly household income", 120000), n("rent", "Rent/EMI", 35000), n("food", "Food and groceries", 18000), n("utilities", "Utilities", 8000), n("transport", "Transport", 10000), n("other", "Other expenses", 15000)],
    calculate: (v) => {
      const expenses = v.rent + v.food + v.utilities + v.transport + v.other;
      const savings = v.income - expenses;
      return result(`Estimated monthly savings are ${money(savings)}.`, [metric("Total income", money(v.income)), metric("Total expenses", money(expenses)), metric("Savings", money(savings)), metric("Savings rate", pct(safeDiv(savings, v.income) * 100))], donut(["Rent/EMI", "Food", "Utilities", "Transport", "Other", "Savings"], [v.rent, v.food, v.utilities, v.transport, v.other, Math.max(0, savings)]));
    }
  });
  add({
    id: "subscription-cost-calculator",
    name: "Subscription Cost Calculator",
    category: "lifestyle",
    description: "Calculate monthly and yearly cost of recurring subscriptions.",
    keywords: "subscription cost monthly yearly",
    fields: [n("monthly", "Monthly subscriptions total", 2500), n("annual", "Annual subscriptions total", 12000), n("unusedPct", "Unused subscription share (%)", 20, { step: 0.1 })],
    calculate: (v) => {
      const yearly = v.monthly * 12 + v.annual;
      const unused = yearly * v.unusedPct / 100;
      return result(`Subscriptions cost ${money(yearly)} per year.`, [metric("Monthly equivalent", money(yearly / 12)), metric("Yearly cost", money(yearly)), metric("Potential unused cost", money(unused))], donut(["Used cost", "Unused estimate"], [yearly - unused, unused]));
    }
  });
  add({
    id: "commute-cost-calculator",
    name: "Commute Cost Calculator",
    category: "lifestyle",
    description: "Estimate monthly commuting cost by vehicle or cab.",
    keywords: "commute cost office travel",
    fields: [n("distance", "One-way distance (km)", 14), n("days", "Commute days per month", 22, { step: 1 }), n("mileage", "Vehicle mileage (km/l)", 15), n("fuelPrice", "Fuel price per liter", 105), n("parking", "Monthly parking/tolls", 1500)],
    calculate: (v) => {
      const monthlyDistance = v.distance * 2 * v.days;
      const fuel = safeDiv(monthlyDistance, v.mileage) * v.fuelPrice;
      const total = fuel + v.parking;
      return result(`Monthly commute cost is ${money(total)}.`, [metric("Monthly distance", `${fmt(monthlyDistance, 0)} km`), metric("Fuel cost", money(fuel)), metric("Parking/tolls", money(v.parking)), metric("Total", money(total))], donut(["Fuel", "Parking/tolls"], [fuel, v.parking]));
    }
  });
  add({
    id: "internet-data-usage-calculator",
    name: "Internet Data Usage Calculator",
    category: "lifestyle",
    description: "Estimate monthly data usage from video, calls, browsing and downloads.",
    keywords: "internet data usage gb monthly",
    fields: [n("videoHours", "Video streaming hours per day", 2), n("videoGb", "GB per video hour", 1.5, { step: 0.1 }), n("callsHours", "Video call hours per day", 1), n("callsGb", "GB per call hour", 0.8, { step: 0.1 }), n("downloads", "Downloads per month (GB)", 50), n("browsing", "Browsing/social per day (GB)", 1, { step: 0.1 })],
    calculate: (v) => {
      const video = v.videoHours * v.videoGb * 30;
      const calls = v.callsHours * v.callsGb * 30;
      const browsing = v.browsing * 30;
      const total = video + calls + browsing + v.downloads;
      return result(`Estimated monthly data usage is ${fmt(total, 1)} GB.`, [metric("Video", `${fmt(video, 1)} GB`), metric("Calls", `${fmt(calls, 1)} GB`), metric("Browsing/social", `${fmt(browsing, 1)} GB`), metric("Total", `${fmt(total, 1)} GB`)], donut(["Video", "Calls", "Browsing", "Downloads"], [video, calls, browsing, v.downloads]));
    }
  });
  add({
    id: "ac-running-cost-calculator",
    name: "AC Running Cost Calculator",
    category: "electrical",
    description: "Estimate air conditioner electricity units and monthly cost.",
    keywords: "ac running cost electricity air conditioner",
    fields: [n("tonnage", "AC tonnage", 1.5, { step: 0.1 }), n("iseER", "ISEER / efficiency rating", 3.8, { step: 0.1 }), n("hours", "Hours per day", 8), n("days", "Days per month", 30), n("tariff", "Tariff per unit", 8)],
    calculate: (v) => {
      const coolingWatts = v.tonnage * 3517;
      const inputKw = safeDiv(coolingWatts, v.iseER * 1000);
      const units = inputKw * v.hours * v.days;
      return result(`Estimated AC running cost is ${money(units * v.tariff)} per month.`, [metric("Input power", `${fmt(inputKw, 2)} kW`), metric("Monthly units", `${fmt(units, 1)} kWh`), metric("Monthly cost", money(units * v.tariff))], bar(["Input kW", "Units", "Cost"], [inputKw, units, units * v.tariff]));
    }
  });
  add({
    id: "hourly-to-salary-calculator",
    name: "Hourly to Salary Calculator",
    category: "business",
    description: "Convert hourly pay into weekly, monthly and annual salary.",
    keywords: "hourly salary wage",
    fields: [n("hourly", "Hourly pay", 250), n("hours", "Hours per week", 40), n("weeks", "Paid weeks per year", 52, { step: 1 })],
    calculate: (v) => {
      const annual = v.hourly * v.hours * v.weeks;
      return result(`Annual salary equivalent is ${money(annual)}.`, [metric("Weekly pay", money(v.hourly * v.hours)), metric("Monthly average", money(annual / 12)), metric("Annual salary", money(annual))], bar(["Weekly", "Monthly", "Annual / 10"], [v.hourly * v.hours, annual / 12, annual / 10]));
    }
  });
  add({
    id: "overtime-pay-calculator",
    name: "Overtime Pay Calculator",
    category: "business",
    description: "Calculate regular and overtime pay.",
    keywords: "overtime pay wage salary",
    fields: [n("hourly", "Hourly rate", 300), n("regularHours", "Regular hours", 40), n("overtimeHours", "Overtime hours", 8), n("multiplier", "Overtime multiplier", 1.5, { step: 0.1 })],
    calculate: (v) => {
      const regular = v.hourly * v.regularHours;
      const overtime = v.hourly * v.multiplier * v.overtimeHours;
      return result(`Total pay is ${money(regular + overtime)}.`, [metric("Regular pay", money(regular)), metric("Overtime pay", money(overtime)), metric("Total pay", money(regular + overtime))], donut(["Regular", "Overtime"], [regular, overtime]));
    }
  });
  add({
    id: "time-card-calculator",
    name: "Time Card Calculator",
    category: "date-time",
    description: "Calculate work hours from clock-in, clock-out and break time.",
    keywords: "time card work hours attendance",
    fields: [timeField("inTime", "Clock in", "09:00"), timeField("outTime", "Clock out", "18:00"), n("break", "Break minutes", 60, { step: 1 }), n("days", "Days worked", 5, { step: 1 })],
    calculate: (v) => {
      let minutes = timeToMinutes(v.outTime) - timeToMinutes(v.inTime);
      if (minutes < 0) minutes += 1440;
      const daily = Math.max(0, minutes - v.break) / 60;
      const weekly = daily * v.days;
      return result(`Worked time is ${fmt(daily, 2)} hours per day, ${fmt(weekly, 2)} hours total.`, [metric("Daily hours", fmt(daily, 2)), metric("Total hours", fmt(weekly, 2)), metric("Break", `${fmtLoose(v.break, 0)} min`)], bar(["Daily hours", "Total hours"], [daily, weekly]));
    }
  });
  add({
    id: "cooking-measurement-converter",
    name: "Cooking Measurement Converter",
    category: "unit",
    description: "Convert common kitchen volume measurements.",
    keywords: "cooking measurement cup tablespoon teaspoon ml",
    fields: [n("amount", "Amount", 2), sel("from", "From", "cup", optionPairs([["tsp", "Teaspoon"], ["tbsp", "Tablespoon"], ["cup", "Cup"], ["ml", "Milliliter"], ["l", "Liter"], ["floz", "Fluid ounce"]])), sel("to", "To", "ml", optionPairs([["tsp", "Teaspoon"], ["tbsp", "Tablespoon"], ["cup", "Cup"], ["ml", "Milliliter"], ["l", "Liter"], ["floz", "Fluid ounce"]]))],
    calculate: (v) => {
      const mlMap = { tsp: 5, tbsp: 15, cup: 240, ml: 1, l: 1000, floz: 29.5735 };
      const converted = v.amount * mlMap[v.from] / mlMap[v.to];
      return result(`${fmt(v.amount, 3)} ${v.from} = ${fmt(converted, 3)} ${v.to}.`, [metric("Input", `${fmt(v.amount, 3)} ${v.from}`), metric("Converted", `${fmt(converted, 3)} ${v.to}`), metric("Milliliters", `${fmt(v.amount * mlMap[v.from], 2)} ml`)], bar(["Input", "Converted"], [Math.abs(v.amount), Math.abs(converted)]));
    }
  });

  function resolveDefault(field) {
    return typeof field.default === "function" ? field.default() : field.default;
  }

  function defaultValues(calculator) {
    return Object.fromEntries(calculator.fields.map((field) => [field.id, resolveDefault(field)]));
  }

  function normalizeValues(calculator, form) {
    const data = {};
    calculator.fields.forEach((field) => {
      const control = form ? form.querySelector(`[name="${field.id}"]`) : null;
      const raw = control ? control.value : resolveDefault(field);
      data[field.id] = field.type === "number" ? num(raw) : raw;
    });
    return data;
  }

  function findCalculator(id) {
    return calculators.find((calculator) => calculator.id === id) || calculators[0];
  }

  let activeCalculator = calculators[0];
  let currentFilter = "";

  function init() {
    const count = document.getElementById("calculatorCount");
    if (count) count.textContent = `${calculators.length}`;
    renderCategoryStrip();
    renderDirectory();
    const search = document.getElementById("siteSearch");
    search.addEventListener("input", () => {
      currentFilter = search.value.trim().toLowerCase();
      renderDirectory();
    });
    document.getElementById("calculatorDirectory").addEventListener("click", (event) => {
      const card = event.target.closest("[data-calculator-card]");
      if (!card) return;
      event.preventDefault();
      openCalculatorById(card.getAttribute("data-calculator-card"), true);
    });
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
  }

  function openFromHash() {
    const id = decodeURIComponent(location.hash.replace("#", ""));
    if (!id) {
      openCalculatorById("emi-calculator", false, false);
      return;
    }
    if (id.startsWith("category-")) return;
    const calculator = calculators.find((item) => item.id === id);
    if (!calculator) return;
    openCalculatorById(id, true, false);
  }

  function openCalculatorById(id, shouldScroll, shouldPush = true) {
    const calculator = findCalculator(id || "emi-calculator");
    activeCalculator = calculator;
    renderActiveCalculator(calculator);
    updateActiveStates();
    if (shouldPush && location.hash !== `#${calculator.id}`) {
      history.pushState(null, "", `#${calculator.id}`);
    }
    if (shouldScroll) scrollToCalculatorArea();
  }

  function scrollToCalculatorArea() {
    const panel = document.getElementById("calculatorArea");
    if (!panel) return;
    const jump = () => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      if (typeof panel.scrollIntoView === "function") {
        panel.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        location.hash = "calculatorArea";
      }
      root.style.scrollBehavior = previousScrollBehavior;
      if (typeof panel.focus === "function") panel.focus({ preventScroll: true });
    };
    if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(jump);
    else jump();
    if (typeof window.setTimeout === "function") window.setTimeout(jump, 120);
  }

  function renderCategoryStrip() {
    const target = document.getElementById("categoryStrip");
    target.innerHTML = categories.map((category) => `<a class="category-chip" href="#category-${category.id}" data-category-chip="${category.id}">${category.name}</a>`).join("");
  }

  function calculatorMatches(calculator, filter) {
    if (!filter) return true;
    const haystack = `${calculator.name} ${calculator.description} ${calculator.keywords} ${categoryMap[calculator.category]?.name || ""}`.toLowerCase();
    return haystack.includes(filter);
  }

  function renderDirectory() {
    const target = document.getElementById("calculatorDirectory");
    const status = document.getElementById("searchStatus");
    const matching = calculators.filter((calculator) => calculatorMatches(calculator, currentFilter));
    status.textContent = currentFilter ? `Showing ${matching.length} result${matching.length === 1 ? "" : "s"}` : "Showing all calculators";
    if (!matching.length) {
      target.innerHTML = `<div class="empty-state">No calculators matched your search. Try EMI, GST, BMI, GPA, wire, tax or budget.</div>`;
      return;
    }
    target.innerHTML = categories.map((category) => {
      const items = matching.filter((calculator) => calculator.category === category.id);
      if (!items.length) return "";
      return `
        <section class="category-section" id="category-${category.id}">
          <div class="category-title">
            <span class="category-icon">${category.icon}</span>
            <div>
              <h3>${category.name}</h3>
              <p>${category.description}</p>
            </div>
          </div>
          <div class="calculator-grid">
            ${items.map(renderCard).join("")}
          </div>
        </section>
      `;
    }).join("");
    updateActiveStates();
  }

  function renderCard(calculator) {
    const category = categoryMap[calculator.category];
    return `
      <a class="calculator-card" href="#${calculator.id}" data-calculator-card="${calculator.id}">
        <div>
          <h4>${calculator.name}</h4>
          <p>${calculator.description}</p>
        </div>
        <span class="card-foot"><span>${category.icon}</span><span>Open</span></span>
      </a>
    `;
  }

  function renderActiveCalculator(calculator) {
    const category = categoryMap[calculator.category];
    document.getElementById("activeCategory").textContent = category.name;
    document.getElementById("activeTitle").textContent = calculator.name;
    document.getElementById("activeDescription").textContent = calculator.description;
    const form = document.getElementById("calculatorForm");
    form.innerHTML = calculator.fields.map(renderField).join("");
    form.oninput = () => updateResult(calculator);
    form.onchange = () => updateResult(calculator);
    updateResult(calculator);
  }

  function renderField(field) {
    const value = resolveDefault(field);
    const wide = field.wide || field.type === "textarea" ? " wide" : "";
    const hint = field.hint ? `<small>${field.hint}</small>` : "";
    let control = "";
    if (field.type === "select") {
      control = `<select id="${field.id}" name="${field.id}">${field.options.map((option) => `<option value="${option.value}"${String(option.value) === String(value) ? " selected" : ""}>${option.label}</option>`).join("")}</select>`;
    } else if (field.type === "textarea") {
      control = `<textarea id="${field.id}" name="${field.id}">${value}</textarea>`;
    } else {
      const attrs = [
        `type="${field.type}"`,
        `id="${field.id}"`,
        `name="${field.id}"`,
        `value="${value}"`
      ];
      if (field.type === "number") {
        attrs.push(`min="${field.min ?? ""}"`);
        if (field.max !== undefined) attrs.push(`max="${field.max}"`);
        attrs.push(`step="${field.step ?? "any"}"`);
      }
      control = `<input ${attrs.join(" ")}>`;
    }
    return `<div class="field${wide}"><label for="${field.id}">${field.label}</label>${control}${hint}</div>`;
  }

  function updateResult(calculator) {
    const form = document.getElementById("calculatorForm");
    const summary = document.getElementById("resultSummary");
    const metrics = document.getElementById("resultMetrics");
    const notes = document.getElementById("resultNotes");
    try {
      const values = normalizeValues(calculator, form);
      const output = calculator.calculate(values);
      summary.textContent = output.summary;
      metrics.innerHTML = output.metrics.map((item) => `<div class="metric"><span>${item.label}</span><strong>${item.value}</strong></div>`).join("");
      notes.textContent = [calculator.disclaimer, output.notes].filter(Boolean).join(" ");
      drawChart(output.chart);
    } catch (error) {
      summary.textContent = error.message || "Please check the inputs.";
      metrics.innerHTML = "";
      notes.textContent = "";
      drawChart(null);
    }
  }

  function updateActiveStates() {
    document.querySelectorAll("[data-calculator-card]").forEach((card) => {
      card.classList.toggle("active", card.getAttribute("data-calculator-card") === activeCalculator.id);
    });
    document.querySelectorAll("[data-category-chip]").forEach((chip) => {
      chip.classList.toggle("active", chip.getAttribute("data-category-chip") === activeCalculator.category);
    });
  }

  function drawChart(chart) {
    const canvas = document.getElementById("resultChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.max(320, Math.floor(rect.width * ratio));
    canvas.height = Math.max(220, Math.floor(rect.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const width = canvas.width / ratio;
    const height = canvas.height / ratio;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    if (!chart || !chart.values?.length) {
      ctx.fillStyle = "#607089";
      ctx.font = "14px sans-serif";
      ctx.fillText("Result chart appears here", 18, 32);
      return;
    }
    const labels = chart.labels;
    const values = chart.values.map((value) => Math.max(0, num(value))).filter((value) => Number.isFinite(value));
    if (!values.length || values.every((value) => value === 0)) return;
    if (chart.type === "donut") drawDonut(ctx, width, height, labels, values);
    else drawBars(ctx, width, height, labels, values);
  }

  function drawDonut(ctx, width, height, labels, values) {
    const total = values.reduce((sum, value) => sum + value, 0);
    const centerX = width * 0.32;
    const centerY = height * 0.52;
    const radius = Math.min(width, height) * 0.28;
    let start = -Math.PI / 2;
    values.forEach((value, index) => {
      const angle = value / total * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = palette[index % palette.length];
      ctx.fill();
      start += angle;
    });
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#14213d";
    ctx.font = "700 13px sans-serif";
    ctx.fillText("Breakdown", centerX - 34, centerY + 5);
    labels.forEach((label, index) => {
      const x = width * 0.62;
      const y = 36 + index * 28;
      ctx.fillStyle = palette[index % palette.length];
      ctx.fillRect(x, y - 10, 14, 14);
      ctx.fillStyle = "#14213d";
      ctx.font = "13px sans-serif";
      ctx.fillText(`${label}: ${fmtLoose(safeDiv(values[index], total) * 100, 1)}%`, x + 22, y + 2);
    });
  }

  function drawBars(ctx, width, height, labels, values) {
    const max = Math.max(...values, 1);
    const left = 42;
    const bottom = height - 38;
    const chartWidth = width - 70;
    const chartHeight = height - 66;
    const gap = 10;
    const barWidth = Math.max(18, (chartWidth - gap * (values.length - 1)) / values.length);
    ctx.strokeStyle = "#dbe3ea";
    ctx.beginPath();
    ctx.moveTo(left, 22);
    ctx.lineTo(left, bottom);
    ctx.lineTo(width - 20, bottom);
    ctx.stroke();
    values.forEach((value, index) => {
      const x = left + index * (barWidth + gap) + 8;
      const barHeight = value / max * chartHeight;
      const y = bottom - barHeight;
      ctx.fillStyle = palette[index % palette.length];
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.fillStyle = "#14213d";
      ctx.font = "11px sans-serif";
      const label = String(labels[index] || "").slice(0, 12);
      ctx.fillText(label, x, bottom + 16);
    });
  }

  globalThis.CalculatorHub = {
    calculators,
    categories,
    calculateDefault(id) {
      const calculator = findCalculator(id);
      return calculator.calculate(defaultValues(calculator));
    }
  };

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", init);
  }
}());
