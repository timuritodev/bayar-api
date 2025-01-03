const express = require("express");
const promoModel = require("../models/promo");

const router = express.Router();
// Добавление промокода

router.post("/api/promo-codes", async (req, res, next) => {
  try {
    const { promo, discount, valid_from, valid_until } = req.body;

    // Проверка на существование промокода с таким же кодом
    const existingPromoCode = await promoModel.findPromoCodeByCode(promo);
    if (existingPromoCode) {
      throw new Error("Промокод с таким кодом уже существует");
    }

    // Добавление промокода в базу данных
    const promoCodeId = await promoModel.createPromoCode({
      promo,
      discount,
      valid_from,
      valid_until,
    });

    res.status(201).json({ id: promoCodeId });
  } catch (error) {
    next(error);
  }
});

// Применение промокода к заказу
router.post("/api/apply-promo-code", async (req, res, next) => {
  try {
    const { promo, userId } = req.body;

    // Поиск промокода по коду
    const promoCode = await promoModel.findPromoCodeByCode(promo);
    if (!promoCode) {
      throw new Error("Промокод не найден");
    }

    // Проверка на валидность промокода
    const currentDate = new Date();
    if (
      currentDate < promoCode.valid_from ||
      currentDate > promoCode.valid_until
    ) {
      throw new Error("Промокод недействителен");
    }

    // Проверка на использование промокода текущим пользователем
    const isPromoCodeUsed = await promoModel.isPromoCodeAlreadyUsed(
      userId,
      promoCode.id
    );
    if (isPromoCodeUsed) {
      throw new Error("Промокод уже использован текущим пользователем");
    }

    // Применение промокода к заказу пользователя (логика применения промокода к заказу здесь)

    // Запись информации о использовании промокода текущим пользователем
    await promoModel.recordPromoCodeUsage(userId, promoCode.id);

    res.json({ discount: promoCode.discount });
  } catch (error) {
    next(error);
  }
});

// Получение списка промокодов
router.get("/api/promo-codes", async (req, res, next) => {
  try {
    const promoCodes = await promoModel.getAllPromoCodes();
    res.json({ promoCodes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
