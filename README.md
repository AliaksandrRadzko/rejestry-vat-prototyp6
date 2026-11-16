# Rejestry i VAT — prototyp (zadanie testowe)

Statyczny prototyp ekranu „Rejestry i VAT” (HTML + CSS + JS, bez budowania i bez zależności).
Dane są demonstracyjne.

## Uruchomienie
Otwórz `index.html` w przeglądarce albo wrzuć folder na Vercel (Framework Preset: *Other*, bez Build Command, Output Directory: `.`).

## Co zmieniono względem referencji
- Na wierzchu tylko to, co najważniejsze: wyszukiwarka, Filtry, Eksport, trzy sumy (Brutto wyróżnione) i tabela.
- Filtry (Rok, Miesiąc, Rodzaj operacji, Kod JPK V7, Serie dokumentów, Wyczyść) są w panelu „Filtry”; aktywne zawsze widać jako chipy.
- Rzadkie akcje (Etykiety, Drukuj, Widok tabeli) są w menu „⋯”.
- „Kwoty według stawek VAT” to zwijany pasek z podglądem kwot.
- Plakietka „Wymaga potwierdzenia” jest zawsze widoczna; klik pokazuje pełny komunikat o danych demonstracyjnych (domyślnie ukryty, żeby nie dublować informacji).
- Tabela: sortowanie po kolumnach, szczegóły dokumentu pod strzałką (Netto/VAT/Brutto, stawka, rodzaj operacji, JPK V7, seria, etykiety), kolejność i widoczność kolumn w „Widok tabeli” (przeciąganie lub strzałki).
- Telefon: tabela zamienia się w karty; filtry i okna działają jak arkusz od dołu.

## Wariant „tylko ekran”
Ta wersja pokazuje wyłącznie ekran „Rejestry i VAT”; ramka strony z pierwszego zrzutu jest ukryta (usuń `class="only"` z `<body>`, aby ją włączyć).

## Ramka strony (pierwszy skrin)
- Pasek górny: powiadomienia (4 nowe, „Oznacz jako przeczytane”), menu konta.
- „Okres księgowy · 2026” i „Dostępność obszarów” są zwijane (opis i 6 obszarów po rozwinięciu, każdy z przyciskiem „Przejdź do zakładki”).
- Zakładki obszarów: Rejestry i VAT (przebudowany ekran), Księgowania / Majątek / Kontrole — puste widoki poza zakresem zadania.

## Pola i akcje z oryginału
Wszystkie zachowane: Szukaj, Etykiety, Drukuj, Eksport (CSV), Widok tabeli, Rok, Miesiąc, Rodzaj operacji, Kod JPK V7, Serie dokumentów, Wyczyść filtry, Netto/VAT/Brutto, stawki VAT (23%, np), kolumny Kontrahent / Data / Numer dokumentu / Numer KSeF / Identyfikator, rozwijanie wiersza, paginacja i „na stronie”.

## Stany
Przełącznik „Stan widoku” na dole: **Dane**, **Pusty**, **Błąd** (z przyciskiem „Spróbuj ponownie”). Stan „brak wyników” pojawia się też po filtrowaniu i wyszukiwaniu. Przy przełączeniu widać krótki stan ładowania.

## Pod backend
Dane pochodzą z `salesData()` / `purchaseData()` w `app.js`; wystarczy zastąpić je odpowiedzią API o tym samym kształcie.
