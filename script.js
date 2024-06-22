document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');

    // Funkcja przełączająca widoczność menu
    function toggleMenu() {
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }

    // Dodanie nasłuchiwacza na kliknięcie ikony hamburgera
    menuIcon.addEventListener('click', toggleMenu);

    // Funkcja ukrywająca menu i ikonę hamburgera po zmianie rozmiaru okna przeglądarki
    function handleResize() {
        if (window.innerWidth > 768) {
            menu.style.display = 'flex'; // Przywracanie menu w normalnym widoku
            menuIcon.style.display = 'none'; // Ukrywanie ikony hamburgera
        } else {
            menu.style.display = 'none'; // Ukrywanie menu w widoku mobilnym
            menuIcon.style.display = 'block'; // Pokaż ikonę hamburgera
        }
    }

    // Dodanie nasłuchiwacza na zmianę rozmiaru okna
    window.addEventListener('resize', handleResize);

    // Początkowe ustawienie widoczności menu i ikony hamburgera na podstawie rozmiaru okna
    handleResize();
});