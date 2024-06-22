document.addEventListener('DOMContentLoaded', () => {
    // Pobiera elementy z DOM
    const przyciskStart = document.getElementById('przycisk-start');
    const kontenerGry = document.getElementById('kontener-gry');
    const koszyk = document.getElementById('koszyk');
    const wyswietlaczWyniku = document.getElementById('wynik');
    const wyswietlaczTimera = document.getElementById('timer');

    // Inicjalizacja zmiennych gry
    let wynik = 0;
    let koszykLewo = 50;
    let interwalGry;
    let interwalSpadania;
    let interwalTimera;
    let czasPozostaly = 60;

    // Dodaje event listener do przycisku start
    przyciskStart.addEventListener('click', uruchomGre);

    // Funkcja uruchamiająca grę
    function uruchomGre() {
        wynik = 0; // Reset wyniku
        czasPozostaly = 60; // Reset timera
        aktualizujWynik(); // Aktualizacja wyświetlanego wyniku
        aktualizujTimer(); // Aktualizacja wyświetlanego czasu
        koszykLewo = 50; // Reset pozycji koszyka
        koszyk.style.left = `${koszykLewo}%`; // Ustawienie pozycji koszyka w stylu
        kontenerGry.innerHTML = ''; // Czyszczenie kontenera gry
        kontenerGry.appendChild(koszyk); // Dodanie koszyka do kontenera gry
        clearInterval(interwalGry); // Czyszczenie interwałów
        clearInterval(interwalSpadania);
        clearInterval(interwalTimera);
        interwalGry = setInterval(petlaGry, 20); // Ustawienie interwału pętli gry
        interwalSpadania = setInterval(spadajIkony, 1000); // Ustawienie interwału spadania ikon
        interwalTimera = setInterval(aktualizujTimer, 1000); // Ustawienie interwału timera
        przyciskStart.disabled = true; // Wyłączenie przycisku start
    }

    // Pętla gry
    function petlaGry() {
        document.addEventListener('keydown', przesunKoszyk); // Dodaje event listener na klawisze strzałek
        const ikony = document.querySelectorAll('.ikona-komputera, .ikona-smartfona, .ikona-zla, .ikona-windows'); // Pobiera wszystkie ikony
        ikony.forEach(ikona => {
            let top = parseFloat(ikona.style.top); // Pobiera aktualną pozycję ikony
            if (top > 400) { // Jeśli ikona przekroczyła dolną granicę
                ikona.remove(); // Usuwa ikonę
            } else {
                ikona.style.top = `${top + 2}px`; // Przesuwa ikonę w dół
                if (sprawdzKolizje(koszyk, ikona)) { // Sprawdza kolizję z koszykiem
                    if (ikona.classList.contains('ikona-zla')) { // Jeśli ikona to wirus
                        clearInterval(interwalGry); // Zatrzymuje grę
                        clearInterval(interwalSpadania);
                        clearInterval(interwalTimera);
                        alert('Przegrałeś! Złapałeś złą ikone!'); // Wyświetla alert
                        przyciskStart.disabled = false; // Włącza przycisk start
                        return;
                    } else {
                        wynik += 10; // Dodaje punkty do wyniku
                        aktualizujWynik(); // Aktualizuje wyświetlany wynik
                        ikona.remove(); // Usuwa ikonę
                    }
                }
            }
        });

        if (czasPozostaly <= 0) { // Jeśli czas się skończył
            clearInterval(interwalGry); // Zatrzymuje grę
            clearInterval(interwalSpadania);
            clearInterval(interwalTimera);
            alert('Koniec gry! Twój wynik: ' + wynik); // Wyświetla alert z wynikiem
            przyciskStart.disabled = false; // Włącza przycisk start
        }
    }

    // Funkcja przesuwająca koszyk
    function przesunKoszyk(e) {
        if (e.key === 'ArrowLeft' && koszykLewo > 0) { // Jeśli wciśnięto strzałkę w lewo i koszyk nie jest na lewej krawędzi
            koszykLewo -= 5; // Przesuwa koszyk w lewo
        } else if (e.key === 'ArrowRight' && koszykLewo < 95) { // Jeśli wciśnięto strzałkę w prawo i koszyk nie jest na prawej krawędzi
            koszykLewo += 5; // Przesuwa koszyk w prawo
        }
        koszyk.style.left = `${koszykLewo}%`; // Ustawia nową pozycję koszyka w stylu
    }

    // Funkcja dodająca nowe ikony
    function spadajIkony() {
        const losowaIkona = Math.random(); // Losuje liczbę
        if (losowaIkona < 0.35) {
            dodajIkone('ikona-komputera'); // Dodaje ikonę komputera
        } else if (losowaIkona < 0.7) {
            dodajIkone('ikona-smartfona'); // Dodaje ikonę smartfona
        } else if (losowaIkona < 0.9) {
            dodajIkone('ikona-windows'); // Dodaje ikonę Windows
        } else {
            dodajIkone('ikona-zla'); // Dodaje ikonę po której przegrasz
        }
    }

    // Funkcja tworząca nową ikonę
    function dodajIkone(klasa) {
        const ikona = document.createElement('div'); // Tworzy nowy element div
        ikona.classList.add(klasa); // Dodaje klasę do ikony
        ikona.style.left = `${Math.random() * 95}%`; // Ustawia losową pozycję poziomą ikony
        ikona.style.top = '0px'; // Ustawia początkową pozycję pionową ikony
        kontenerGry.appendChild(ikona); // Dodaje ikonę do kontenera gry
    }

    // Funkcja sprawdzająca kolizję
    function sprawdzKolizje(koszyk, ikona) {
        const koszykRect = koszyk.getBoundingClientRect(); // Pobiera pozycję i wymiary koszyka
        const ikonaRect = ikona.getBoundingClientRect(); // Pobiera pozycję i wymiary ikony

        // Sprawdza, czy koszyk i ikona się nakładają
        return !(koszykRect.top > ikonaRect.bottom ||
            koszykRect.right < ikonaRect.left ||
            koszykRect.bottom < ikonaRect.top ||
            koszykRect.left > ikonaRect.right);
    }

    // Funkcja aktualizująca wyświetlany wynik
    function aktualizujWynik() {
        wyswietlaczWyniku.textContent = `Wynik: ${wynik}`; // Aktualizuje tekst wyniku
    }

    // Funkcja aktualizująca timer
    function aktualizujTimer() {
        if (czasPozostaly > 0) { // Jeśli pozostał jeszcze czas
            czasPozostaly--; // Zmniejsza czas o 1 sekundę
        }
        const minuty = Math.floor(czasPozostaly / 60); // Oblicza pozostałe minuty
        const sekundy = czasPozostaly % 60; // Oblicza pozostałe sekundy
        wyswietlaczTimera.textContent = `Pozostały czas: ${minuty}:${sekundy < 10 ? '0' : ''}${sekundy}`; // Aktualizuje tekst timera
    }
});
