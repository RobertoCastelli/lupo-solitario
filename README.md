# 🐺 Registro di Guerra – Lupo Solitario

o[![Netlify Status](https://api.netlify.com/api/v1/badges/41181a45-abce-4127-a1c1-8d7d2dd17d75/deploy-status)](https://app.netlify.com/projects/to-lonewolf/deploys)

Registro di Guerra digitale per i **librogame di Lupo Solitario (Libri 1–5)**.  
Un semplice strumento web per gestire **scheda del personaggio** e **combattimenti**, mantenendo **fedeltà alle regole originali** e allo spirito del gioco cartaceo.

---

## 🎯 Obiettivo del progetto

Questo progetto nasce per:

- digitalizzare il **Registro di Guerra** cartaceo;
- velocizzare la gestione di **Combattività, Resistenza, Discipline, Zaino e Combattimenti**;
- rimanere **il più possibile fedele** alle regole originali dei librogame;
- offrire uno strumento **discreto**, da usare mentre si legge il libro, senza “videogiocare” l’esperienza.

Non è un videogioco, ma **un supporto alla lettura e al gioco**.

---

## 🧩 Funzionalità principali

- 📜 **Scheda personaggio**

  - Combattività (CS)
  - Resistenza (EP)
  - Corone d’oro
  - Pasti
  - Segnalibro del paragrafo
  - Tiro di dado (Random Number Table 0–9)

- 🧠 **Discipline Kai**

  - Selezione fino a 5 discipline
  - Gestione speciale della _Scherma_

- 🎒 **Inventario**

  - Zaino (max 8 oggetti)
  - Oggetti speciali (illimitati)
  - Armi (max 2)

- ⚔️ **Combattimento**

  - Calcolo automatico del Rapporto di Forza
  - Applicazione dei modificatori (Psicolaser, Scherma, Disarmato)
  - Risultati conformi alla tabella originale
  - **Combat log** stile _diario di guerra_
  - Evidenziazione dell’ultimo turno

- 💾 **Salvataggio automatico**
  - Stato persistente tramite `localStorage`

---

## 🎨 Scelte di design

- Grafica ispirata a **carta / pergamena**
- Tipografia fantasy sobria
- Layout a scheda, non “dashboard moderna”
- Uso di **icone intuitive** al posto di testi superflui
- Focus su **leggibilità e rapidità**

---

## 🛠️ Tecnologie utilizzate

- **React**
- **React Icons**
- **CSS custom (no framework UI)**
- **LocalStorage** per il salvataggio

Nessuna libreria superflua: il progetto è volutamente **leggero**.

---

## 📜 Disclaimer – Fan Project

Questo progetto è un **fan project non ufficiale**, realizzato **senza scopo di lucro**, a fini **personali, ludici e di studio**.

**Lupo Solitario (Lone Wolf)**, i nomi, le ambientazioni, le regole di gioco e tutti i contenuti originali associati sono **proprietà dei rispettivi detentori dei diritti**, in particolare **Joe Dever** e **Holmgard Press / Magnamund**.

Questo progetto:

- non è affiliato, sponsorizzato o approvato dai detentori dei diritti;
- non distribuisce testi dei libri, immagini ufficiali o altri contenuti protetti da copyright;
- fornisce esclusivamente **uno strumento digitale di supporto** (registro di guerra / scheda di gioco) per l’utilizzo personale durante la lettura dei librogame.

Tutti i diritti sui contenuti originali restano ai legittimi proprietari.

Se sei un titolare dei diritti e ritieni che questo progetto violi in qualche modo tali diritti, **contattami** e il materiale verrà rimosso o modificato tempestivamente.

## 🚀 Avvio del progetto

```bash
npm install
npm run dev
```
