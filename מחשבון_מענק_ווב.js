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
    const i24 = [Number(form.may24), Number(form.jun24)];
    const i25 = [Number(form.may25), Number(form.jun25)];
    const avg24 = (i24[0] + i24[1]) / 2;
    const avg25 = (i25[0] + i25[1]) / 2;
    const drop = ((1 - avg25 / avg24) * 100);
    const salary = Number(form.salary);
    const vat = Number(form.vat);
    const threshold = form.reportingType === "דו חודשי" ? 12.5 : 25;

    if (isNaN(drop) || avg24 === 0) {
      setResult({ grant: 0, drop: 0, message: "נתונים חסרים או שגויים." });
      return;
    }

    if (drop < threshold) {
      setResult({
        grant: 0,
        drop: drop.toFixed(2),
        message: "לא זכאי למענק עקב ירידה נמוכה מהסף המינימלי.",
      });
      return;
    }

    let grant = 0;
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
      if (drop < 25) vatRate = 0;
      else if (drop <= 40) vatRate = 0.07;
      else if (drop <= 60) vatRate = 0.11;
      else if (drop <= 80) vatRate = 0.15;
      else vatRate = 0.22;
      const salaryComp = salary * 0.75 * (drop / 100);
      const vatComp = vat * vatRate;
      grant = Math.round(salaryComp + vatComp);
    }

    setResult({
      grant,
      drop: drop.toFixed(2),
      message: "*עוסק פטור - יש להסתמך על הנתונים ממערכת החשבוניות שלך",
    });
  };

  return (
    <div className="container">
      <h2>מחשבון מענק לעסקים</h2>
      <p style={{ marginBottom: "1rem" }}>
        מחשבון זה יסייע לך לחשב את גובה המענק על סמך נתוני ההכנסה השנתית שלך
        וההכנסות בחודשים הרלוונטיים, על פי הנתונים שפורסמו עד כה בתקשורת.
      </p>
      <select name="reportingType" onChange={handleChange}>
        <option value="">דיווח לרו"ח - בחר</option>
        <option value="חודשי">חודשי</option>
        <option value="דו חודשי">דו חודשי</option>
      </select>
      <input name="yearly" placeholder="מחזור שנתי" onChange={handleChange} />
      <input name="may24" placeholder="הכנסות מאי 2024" onChange={handleChange} />
      <input name="jun24" placeholder="הכנסות יוני 2024" onChange={handleChange} />
      <input name="may25" placeholder="הכנסות מאי 2025" onChange={handleChange} />
      <input name="jun25" placeholder="הכנסות יוני 2025" onChange={handleChange} />
      {Number(form.yearly) > 300000 && (
        <>
          <input name="salary" placeholder="הוצאות שכר" onChange={handleChange} />
          <input name="vat" placeholder="תשומות שנתיות" onChange={handleChange} />
        </>
      )}
      <button onClick={calculate}>חשב מענק</button>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <img
          src="/logocol.png"
          alt="לוגו יעל שגב"
          style={{ maxWidth: "180px", opacity: 0.7 }}
        />
      </div>

      {result && (
        <div>
          <p>אחוז ירידה: {result.drop}%</p>
          <p>מענק משוער: {result.grant.toLocaleString()} ש"ח</p>
          <p style={{ fontSize: "0.85rem", color: "#777" }}>{result.message}</p>
        </div>
      )}
    </div>
  );
}
