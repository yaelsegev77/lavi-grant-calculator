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
  const [formula, setFormula] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const calculateGrant = () => {
    const yearly = parseFloat(form.yearly) || 0;
    const may24 = parseFloat(form.may24) || 0;
    const jun24 = parseFloat(form.jun24) || 0;
    const may25 = parseFloat(form.may25) || 0;
    const jun25 = parseFloat(form.jun25) || 0;
    const salary = parseFloat(form.salary) || 0;
    const vat = parseFloat(form.vat) || 0;
    const isMonthly = form.reportingType === "monthly";

    let grant = 0;
    let formulaText = "";

    const base = isMonthly ? may24 + jun24 : (may24 + jun24) / 2;
    const actual = isMonthly ? may25 + jun25 : (may25 + jun25) / 2;

    const decrease = base - actual;

    if (yearly <= 300000) {
      grant = Math.min(decrease, salary);
      formulaText = `עסק עד 300,000 ש"ח שנפגע – מענק לפי הירידה במחזור בחודשים מאי–יוני, עד לתקרה של שכר העובד.
      
      נוסחה: מינימום בין (${base} - ${actual}) = ${decrease} לבין שכר = ${salary}.`;
    } else {
      const rate = 0.4; // 40% מהירידה
      grant = Math.min(decrease * rate, salary);
      formulaText = `עסק מעל 300,000 ש"ח – מענק לפי ${rate * 100}% מהירידה במחזור בחודשים מאי–יוני, עד לתקרה ש*
