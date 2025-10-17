# Egyptian college admission limits for Saudi high school certificate

[النسخة العربية هنا](/README.md)

A full rewrite of [AbdullahMRiad/clean-tansik-v2](https://www.github.com/AbdullahMRiad/clean-tansik-v2) using React with more features

##

A simple website to view the Egyptian university admission limits for the Saudi high school certificate in the years 2019-2025, separated by boys data and girls data. It supports quick search and filtering by school grade and Saudi GAT score or by college name and limit.

🔗 **Live site:** [tansik.pages.dev](https://tansik.pages.dev)\
🔗 **Testing site:** [dev.tansik.pages.dev](https://dev.tansik.pages.dev/)

---

## Table of contents

[1. 📌 What does the site offer?](#-what-does-the-site-offer)\
[2. 📱 How to use](#-how-to-use)\
[3. 🛠️ How was the site made?](#️-how-was-the-site-made)\
[4. 💡 Have a suggestion or want to report a problem?](#-have-a-suggestion-or-want-to-report-a-problem)\
[5. 💻 How to run the website](#-how-to-run-the-website)

---

## 📌 What does the site offer?

- Displays admission data for the years 2019-2025 separated for boys and girls
- Instant search across all colleges by name or limit
- Ability to filter results based on school score and Saudi GAT score
- Ability to filter results based on majors and type
- Simple and responsive design for all devices\*

\* Only phones are supported for now

---

## 📱 How to use

1. Open the site using the link above
2. Choose the year and either "boys" or "girls" from the top
3. Choose the way you want to search (using name and limit or school and GAT scores)
4. Enter the name and limit (or school and GAT scores)
    - Optional: Choose the majors and type

---

## 🛠️ How was the site made?

- All of the data was extracted from the official tansik website and put into [data/data.xlsx](/data/data.xlsx)
- The data was extracted from the file into CSV files for each year and gender
- Then the data was categorized by major and type and converted to json using [data/scripts/CategorizeAndConvert.ps1](/data/scripts/CategorizeAndConvert.ps1)
- The website was designed in [Excalidraw](https://www.excalidraw.com/) (saved as [v3_ui.excalidraw](/v3_ui.excalidraw))
- The website was made from the ground up using React and Tailwind CSS

---

## 💡 Have a suggestion or want to report a problem?

You can:

- Contribute via a Pull Request
- Raise an [Issue on GitHub](https://github.com/AbdullahMRiad/clean-tansik/issues/new)
- Contact me directly:
    - Telegram: [@AbdullahMRiad](https://t.me/AbdullahMRiad)
    - WhatsApp: [From this link](https://wa.me/966547332469)

---

## 💻 How to run the website

1. Clone this repo using `git clone https://www.github.com/AbdullahMRiad/clean-tansik-v3.git` and navigate to the folder `cd clean-tansik-v3`
2. Install dependencies with `npm install`
3. Prepare data with `cd data; scripts/CategorizeAndConvert.ps1` (PowerShell only)
4. From here, you can:
    - Run the development server with `npm run dev` (supports hot reload)
    - Build and run the website with `npm run build` then `npm run preview`
    - Deploy it to ~~Vercel~~[^1] Netlify or Cloudflare Pages for free (signup required)

[^1]: Do **NOT** use Vercel. [Guillermo Rauch, Vercel's CEO, is a close friend of war criminal Benjamin Netanyahu](https://x.com/rauchg/status/1972669025525158031)
