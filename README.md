#  Strandwacht Weerassistent met AI (Ollama + Mistral)

Deze applicatie is een AI-gestuurde strandwacht die actuele weerinformatie toont en vragen beantwoordt over het weer in Dishoek, Zeeland. Het gebruikt een lokaal taalmodel (Mistral via Ollama) en integreert weerdata van externe API's zoals Open-Meteo en MetaWeather.

##  Features

-  Streaming AI-antwoorden (woord voor woord)
-  Lokaal LLM via [Ollama](https://ollama.com/)
-  Live weerdata van [Open-Meteo](https://open-meteo.com/) en [MetaWeather](https://www.metaweather.com/)
-  Chatgeschiedenis per sessie
-  Prompt engineering voor gerichte, nuttige antwoorden



---

## 📦 Installatie

### 1. Clone deze repository

```bash
git clone https://github.com/jouw-gebruikersnaam/strandwacht-ai.git
cd strandwacht-ai
```
instaleer npm
```
npm install
```
download ollama mistral online en run de command
```
ollama run mistral
```
ten slot start de server
```
node server.js
```

en run de index.html
