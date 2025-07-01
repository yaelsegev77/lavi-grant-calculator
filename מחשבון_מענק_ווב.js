"use client";
import { useState } from "react";

export default function GrantCalculator() {
  const [form, setForm] = useState({
    report: "", yearly: "", may24: "", jun24: "",
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
    const may24 = Number(form.may24);
    const jun24 = Number(form.jun24);
    const may25 = Number(form.may25);
    const jun25 = Number(form.jun25);

    let drop = 0;
    if (form.report === "monthly") {
      drop = jun24 ? ((1 - jun25 / jun24) * 100).toFixed(2) : 0;
    } else {
      const avg24 = (may24 + jun24) / 2;
      const avg25 = (may25 + jun25) / 2;
      drop = ((1 - avg25 / avg24) * 100).toFixed(2);
    }

    let grant = 0;
    const salary = Number(form.salary), vat = Number(form.vat);

    if (y <= 300000) {
      if (y <= 50000) grant = 1750;
      else if (y <= 90000) grant = 3150;
      else if (y <= 107000) grant = 4200;
      else if (y <= 150000) grant = getTier(drop, [2650, 4687, 7500, 7950]);
      else if (y <= 200000) grant = getTier(drop, [3125, 4687, 7500, 9375]);
      else if (y <= 250000) grant = getTier(drop, [4000, 6000, 960]()
