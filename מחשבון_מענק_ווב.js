"use client";
import { useState } from "react";

export default function GrantCalculator() {
  const [form, setForm] = useState({
    yearly: "",
    may24: "",
    jun24: "",
    may25: "",
    jun25: "",
    salary: "",
    vat: "",
    reportingType: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getTier = (drop, amounts) => {
    if (drop < 40) return amounts[0];
    if (drop < 60) return amounts[1];
    if (drop < 80) return amounts[2];
    return amounts[3];
  };

  const calculate = () => {
    const y = Number(form.yearly);
    const rType = form.reportingType;

    const base24 =
      rType === "דו חודשי"
        ? Number(form.may24) + Number(form.jun24)
        : Number(form.jun24);
    const base25 =
      rType === "דו חודשי"
        ? Number(form.may25) + Number(form.jun25)
        : Number(form.jun25);

    if (!rType || base24 === 0) {
      setResult({ grant: 0, drop: 0, message: "אנא מלא את כל השדות וודא שהתקבול ביוני 2024 אינו 0." });
      return;
    }

    const rawDrop = (1 - base25 / base24) * 100;
    const drop = Number(rawDrop.toFixed(2));
    const threshold = rType === "דו חודשי" ? 12.5 : 25;

    if (drop < threshold) {
      setResult({
        grant: 0,
        drop,
        message: "לא זכאי למענק – הירידה נמוכה מסף הזכאות.",
      });
      return;
    }

    let grant = 0;
    const salary = Number(form.salary);
    const vat = Number(form.vat);

    if (y <= 300000) {
      if (y <= 50000) grant = 1750;
      else if (y <= 90000) grant = 3150;
      else if (y <= 107000) grant = 4200;
      else if (y <= 150000) grant = getTier(drop, [2650, 4687, 7500, 7950]);
      else if (y <= 200000) grant = getTier(drop, [3125, 4687, 7500, 9375]);
      else if (y <= 250000) grant = getTier(drop, [4000, 6000, 9600, 12000]);
      else grant = getTier(drop, [4675, 7013, 11220, 14025]);
    } else {
      let vatRate = 0;
      if (drop <= 40) vatRate = 0.07;
      else if (drop <= 60) vatRate = 0.11;
      else if (drop <= 80) vatRate = 0.15;
      else vatRate = 0.22;
      const salaryComp = salary * 0.75 * (drop / 100);
      const vatComp = vat * vatRate;
      grant = Math.round(salaryComp + vatComp);
    }

    setResult({
      grant,
      drop,
      message:
        y <= 300000
          ? "החישוב מתבסס על טבלת המדרגות לעסקים קטנים."
          : "החישוב משקלל 75% שכר + הוצאות קבועות מדורגות.",
    });
  };

  return (
    <div className="container">
      <h2>מחשבון מענק לעסקים</h2>
      <select name="reportingType" onChange={handleChange}>
        <option value="">בחר סוג דיווח למע״מ</option>
        <option value="חודשי">חודשי</option>
        <option value="דו חודשי">דו חודשי</option>
      </select>

      <input name="yearly" placeholder="מחזור שנתי (₪)" onChange={handleChange} />
      <input name="may24" placeholder="הכנסות מאי 2024" onChange={handleChange} />
      <input name="jun24" placeholder="הכנסות יוני 2024" onChange={handleChange} />
      <input name="may25" placeholder="הכנסות מאי 2025" onChange={handleChange} />
      <input name="jun25" placeholder="הכנסות יוני 2025" onChange={handleChange} />

      {Number(form.yearly) > 300000 && (
        <>
          <input name="salary" placeholder="הוצאות שכר (₪)" onChange={handleChange} />
          <input name="vat" placeholder="תשומות שנתיות (₪)" onChange={handleChange} />
        </>
      )}

      <button onClick={calculate}>חשב מענק</button>

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <p>אחוז ירידה: {result.drop}%</p>
          <p>מענק משוער: {result.grant.toLocaleString()} ₪</p>
          <small>{result.message}</small>
        </div>
      )}

      {/* לוגו בתחתית המחשבון */}
      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <img
          src="/logocol.png"
          alt="לוגו יעל שגב"
          style={{ maxWidth: "180px", opacity: 0.7 }}
        />
      </div>
    </div>
  );
}
