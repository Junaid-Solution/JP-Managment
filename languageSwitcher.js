// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get saved language or default to English
    const currentLanguage = localStorage.getItem('language') || 'en';
    document.getElementById('language-select').value = currentLanguage;
    
    // Load translations
    loadTranslations(currentLanguage);
    
    // Add event listener for language change
    document.getElementById('language-select').addEventListener('change', (e) => {
        const newLanguage = e.target.value;
        loadTranslations(newLanguage);
        localStorage.setItem('language', newLanguage);
    });
});

// Function to load translations
async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        const translations = await response.json();
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
                
                // For input elements (like buttons, placeholders)
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key];
                }
            }
        });
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}