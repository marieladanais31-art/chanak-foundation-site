# Guía de Importación y Cumplimiento para Google Ads Editor (Ad Grants)
**Cuenta:** 502-900-6939 (`CHANAK TRAINUP EDUCATION INC`)  
**Estrategia:** Fondos Estatales de Educación (ESAs, Vouchers y Elección Escolar)  
**Dominio Aprobado:** `https://chanakfoundation.org`

---

## 1. Archivos Disponibles en esta Carpeta

* `arizona.csv`: Campaña prioritaria para el estado de Arizona (bilingüe EN/ES).
* `florida.csv`: Campaña prioritaria para el estado de Florida (bilingüe EN/ES).
* `utah.csv`: Campaña para el estado de Utah.
* `wyoming.csv`: Campaña para el estado de Wyoming.
* `alabama.csv`: Campaña para el estado de Alabama.
* `south-carolina.csv`: Campaña para el estado de Carolina del Sur.
* `new-hampshire.csv`: Campaña para el estado de New Hampshire.
* `all_states_combined.csv`: Archivo único consolidado con los 7 estados listos para importar en bloque.

---

## 2. Instrucciones para Importar en Google Ads Editor

1. Abre **Google Ads Editor** e inicia sesión en la cuenta **502-900-6939**.
2. Haz clic en **Cuenta > Importar > Desde archivo...**
3. Selecciona el archivo deseado (por ejemplo, `arizona.csv` o `all_states_combined.csv`).
4. Revisa la vista previa de cambios:
   * Verifica que las campañas se creen con el tipo **Búsqueda**.
   * Verifica que los grupos de anuncios tengan nombres claros (`[Estado] ESA - English` y `[Estado] ESA - Spanish`).
   * Confirma que todas las **URLs finales** apunten exclusivamente a `https://chanakfoundation.org/education-funding/...` o `https://chanakfoundation.org/es/education-funding/...`.
5. Haz clic en **Conservar cambios**.
6. **IMPORTANTE:** No publiques en la cuenta hasta haber revisado y validado las vistas previas oficiales.

---

## 3. Configuración Recomendada de Puja y Presupuesto

* **Estrategia Inicial:** **Maximizar clics** (*Maximize Clicks*) con un límite de puja por clic (CPC máx) de **$2.00 USD**.
  * *Motivo:* Permite generar tráfico inicial controlado y acumular datos de búsqueda sin agotar el presupuesto de forma errática.
* **Estrategia Posterior:** Una vez que la cuenta registre al menos **15 a 30 conversiones** en un período de 30 días, cambiar a **Maximizar conversiones** (*Maximize Conversions*). En Google Ad Grants, las estrategias de puja inteligente basadas en conversión pueden superar el límite tradicional de $2.00 USD por clic automáticamente si el algoritmo predice alta probabilidad de conversión.
* **Presupuesto:** Se asigna un presupuesto diario de prueba ($20 a $45 USD/día por campaña). El soporte de Ad Grants ajusta el límite global de la cuenta a $329 USD/día.

---

## 4. Medición de Conversiones (Ad Grants Compliance)

* **Conversión Principal de la Cuenta:** `Orientación ESA - solicitud confirmada` (`AW-18109980849/P_ijCL2Z3bAcELHBwbtD`)
  * Disparada exclusivamente tras el envío exitoso y validado del formulario en servidor.
  * No cuenta clics en botones ni visitas a la página de inicio.
* No crear enlaces, redirecciones, etiquetas ni eventos de derivación hacia la academia. La orientación se presta dentro de `chanakfoundation.org`.

---

## 5. Reglas Obligatorias de Cumplimiento de Google Ad Grants

1. **Meta de CTR de la Cuenta (mínimo 5%):**
   * Google Ad Grants exige mantener un CTR global mensual de al menos el 5%.
   * Todas las palabras clave incluidas en estos CSVs están en **concordancia de frase** (`"..."`) de 2 a 5 términos para filtrar búsquedas genéricas irrelevantes.
2. **Quality Score (Nivel de Calidad):**
   * Configurar una regla automática semanal en Google Ads: **Pausar automáticamente cualquier palabra clave con Nivel de Calidad de 1 o 2**.
3. **Cero Palabras Clave de un solo término:**
   * Ninguna palabra clave puede ser de una sola palabra (ej. "becas", "escuela", "educación").
4. **Separación de Marca:**
   * Ningún anuncio ni palabra clave apunta a dominios comerciales ajenos.
