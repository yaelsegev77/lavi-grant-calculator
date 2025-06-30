"use client";
import { useState } from "react";

export default function GrantCalculator() {
  const [form, setForm] = useState({
    type: "", yearly: "", may24: "", jun24: "",
    may25: "", jun25: "", salary: "", vat: ""
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
    const drop = ((1 - avg25 / avg24) * 100).toFixed(2);
    let grant = 0;
    const salary = Number(form.salary), vat = Number(form.vat);

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

    setResult({ grant, drop });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>מחשבון מענק לעסקים</h2>
      <input name="type" placeholder="סוג העוסק" onChange={handleChange} /><br/>
      <input name="yearly" placeholder="מחזור שנתי" onChange={handleChange} /><br/>
      <input name="may24" placeholder="הכנסות מאי 2024" onChange={handleChange} /><br/>
      <input name="jun24" placeholder="הכנסות יוני 2024" onChange={handleChange} /><br/>
      <input name="may25" placeholder="הכנסות מאי 2025" onChange={handleChange} /><br/>
      <input name="jun25" placeholder="הכנסות יוני 2025" onChange={handleChange} /><br/>
      {Number(form.yearly) > 300000 && (
        <>
          <input name="salary" placeholder="הוצאות שכר" onChange={handleChange} /><br/>
          <input name="vat" placeholder="תשומות שנתיות" onChange={handleChange} /><br/>
        </>
      )}
      <button onClick={calculate}>חשב מענק</button>
      {result && (
        <div>
          <p>אחוז ירידה: {result.drop}%</p>
          <p>מענק משוער: {result.grant.toLocaleString()} ש\"ח</p>
        </div>
      )}
    </div>
  );
}
