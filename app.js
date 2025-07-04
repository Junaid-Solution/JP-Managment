document.getElementById('translateBtn').addEventListener('click', function() {
  const text = document.getElementById('inputText').value;
  const source = document.getElementById('sourceLang').value;
  const target = document.getElementById('targetLang').value;

  fetch('https://libretranslate.de/translate', {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      source: source,
      target: target,
      format: "text"
    }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('outputText').innerText = data.translatedText;
  })
  .catch(() => {
    document.getElementById('outputText').innerText = "Translation failed.";
  });
});