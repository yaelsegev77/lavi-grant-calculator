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
    reportingType: "", // חודשי או דו חודשי
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
    let drop = ((1 - avg25 / avg24) * 100);

    // התאמה לפי סוג דיווח
    const reportType = form.reportingType;
    const threshold = reportType === "דו חודשי" ? 12.5 : 25;

    let grant = 0;
    const salary = Number(form.salary), vat = Number(form.vat);

    if (drop < threshold) {
      setResult({ grant: 0, drop: drop.toFixed(2), message: "לא זכאי למענק עקב ירידה נמוכה מהסף המינימלי." });
      return;
    }

    if (y <= 300000) {
      if (y <= 50000) grant = 1750;
      else if (y <= 90000) grant = 3150;
      else if (y <= 107000) grant = 4200;
      else if (y <= 150000) grant = getTier(dro
