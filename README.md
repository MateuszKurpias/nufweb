# NUFENEN INTERIORS – Strona internetowa

## Struktura projektu

```
nufenen-website/
├── index.html              ← główna strona
├── css/
│   └── styles.css          ← wszystkie style
├── js/
│   └── main.js             ← JavaScript (karuzele, nawigacja, itp.)
├── images/
│   ├── favicon.svg         ← ikona zakładki przeglądarki
│   ├── hero-video.mp4      ← wideo tło hero (DODAJ SAM)
│   ├── sections/
│   │   ├── about.jpg       ← zdjęcie sekcji "5 lat doświadczenia"
│   │   ├── philosophy.jpg  ← zdjęcie sekcji "Projektujemy razem"
│   │   ├── technology.mp4  ← wideo sekcji technologia (opcjonalne)
│   │   └── technology.webm ← wideo sekcji technologia (opcjonalne)
│   ├── realizacje/
│   │   ├── R1_1.jpg … R1_4.jpg
│   │   ├── R2_1.jpg … R2_2.jpg
│   │   ├── R3_1.jpg … R3_3.jpg
│   │   ├── R4_1.jpg … R4_9.jpg
│   │   ├── R5_1.jpg … R5_18.jpg
│   │   ├── R6_1.jpg … R6_5.jpg
│   │   ├── R7_1.jpg … R7_2.jpg
│   │   ├── R8_1.jpg … R8_6.jpg
│   │   ├── R9_1.jpg … R9_3.jpg
│   │   └── R10_1.jpg … R10_2.jpg
│   └── projekty/
│       ├── P1_1.jpg … P1_4.jpg, P1_15.jpg … P1_21.jpg
│       ├── P2_1.jpg … P2_2.jpg
│       ├── P3_1.jpg … P3_2.jpg
│       ├── P4_1.jpg … P4_10.jpg
│       ├── P6_1.jpg … P6_5.jpg
│       └── P7_1.jpg … P7_5.jpg
├── netlify.toml            ← konfiguracja Netlify
└── .gitignore
```

---

## Wdrożenie na Netlify (przez GitHub)

### Krok 1 – Nowe repozytorium na GitHub

1. Wejdź na https://github.com/new
2. Nazwa: `nufenen-website` (lub inna)
3. Widoczność: **Public**
4. NIE zaznaczaj żadnych checkboxów (README, .gitignore itp.)
5. Kliknij **"Create repository"**

### Krok 2 – Wgraj pliki

1. Na stronie nowego repo kliknij **"uploading an existing file"**
2. Przeciągnij **wszystkie pliki i foldery** z tego katalogu
3. Commit message: `Initial commit`
4. Kliknij **"Commit changes"**

> ⚠️ GitHub nie obsługuje przeciągania całych folderów przez przeglądarkę.  
> Jeśli masz problem, wgraj najpierw `index.html`, `netlify.toml`, `.gitignore`,  
> a foldery `css/`, `js/`, `images/` wgraj osobno wchodząc do każdego folderu.

### Krok 3 – Podpięcie do Netlify

1. Wejdź na https://app.netlify.com
2. **"Add new site"** → **"Import an existing project"**
3. **"Deploy with GitHub"** → wybierz repo `nufenen-website`
4. Ustawienia:
   - Build command: **(zostaw puste)**
   - Publish directory: `.` ← wpisz **kropkę**
5. Kliknij **"Deploy site"**

### Krok 4 – Aktualizacja zdjęć

Aby dodać lub zaktualizować zdjęcia:
1. Wejdź na GitHub do swojego repo
2. Przejdź do folderu `images/realizacje/` lub `images/projekty/`
3. Kliknij **"Add file"** → **"Upload files"**
4. Netlify automatycznie zaktualizuje stronę

---

## Mapa Google – jak wygenerować prawdziwy embed

1. Wejdź na https://maps.google.com
2. Wyszukaj adres: **Jagiellońska 25, Kielce**
3. Kliknij **Udostępnij** (Share) → zakładka **Umieść mapę** (Embed a map)
4. Skopiuj cały kod `<iframe ...>`
5. W `index.html` znajdź komentarz `<!-- UWAGA: Wygeneruj prawdziwy embed -->` i zastąp go

---

## Edycja treści

Wszystkie teksty są w `index.html` – otwórz go dowolnym edytorem (VS Code, Notepad++).  
Style są w `css/styles.css` – zmienne kolorów na samej górze w `:root {}`.

Główne kolory:
```css
--color-accent: #b8956a;   /* złoty/brązowy akcent */
--color-bg-dark: #0a0a0a;  /* tło ciemne */
```

---

© 2020–2026 NUFENEN INTERIORS
