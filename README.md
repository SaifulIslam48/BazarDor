# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — Daily essential product prices at a glance.
---

## 📖 About

বাজার দর (BazarDor) is a Bangla market-price tracker. It shows today's prices of rice, dal, oil, vegetables, fish, meat, dairy and spices, how each price changed since yesterday, and a bazar-by-bazar price comparison across Bangladesh.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js (App Router) | Building the UI and handling page navigation |
| TypeScript | Type-safe code |
| Tailwind CSS | Styling and responsive design |
| Better Auth | Email/password, Google and GitHub authentication |
| MongoDB | Database for users and sessions |
| react-hot-toast | Toast notifications |
| Bazardor REST API | Product and category data |

## ✨ Key Features

1. **Live price ticker** — an infinite scrolling strip with emoji, name, price and ▲/▼ change, plus a category navbar that highlights the active link.
2. **Smart home page** — "আজ দাম বেড়েছে" (top 6 risers), "আজ দাম কমেছে" (top 6 fallers) and an all-products grid, with skeleton loaders while data loads.
3. **Category pages with sorting** — sort by default, price low to high, or price high to low, with correct handling of Bengali numerals.
4. **Product details page** — a protected route showing minimum, maximum and average price plus a bazar-wise price table.
5. **Complete authentication** — sign up, sign in, sign out, Google and GitHub login, protected routes, toast messages and profile name update.
