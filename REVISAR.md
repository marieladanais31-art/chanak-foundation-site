# Registro de Puntos a Revisar y Validar con Mariela Andrade
> **Documento interno del repositorio**. Este archivo centraliza todas las notas de verificación operativa y documental para que ninguna nota interna aparezca en el HTML ni sea visible al público.

---

## 1. Estatus de Proveedor Chanak por Estado (Fondos de Educación / ESA)

Las siguientes notas describen el estatus operativo y administrativo interno de Chanak International Academy respecto a cada programa estatal y plataforma de desembolso:

| Estado | Programa Estatal | Plataforma | Estatus Interno / Nota de Revisión | Acción Requerida con Mariela |
| :--- | :--- | :--- | :--- | :--- |
| **Arizona** | Empowerment Scholarship Account (ESA) | ClassWallet | Aprobada como Online Private School en Arizona. Pendiente de confirmar facturación Full-Time. | Validar si los contratos de matrícula completa se están cobrando directamente por Direct Pay en ClassWallet o si las familias aplican como servicio complementario. |
| **Florida** | Step Up for Students (PEP y FES-UA) | EMA Marketplace | Registrada en FLDOE (#134620). Pendiente de formalización de catálogo de servicios en EMA. | Confirmar si el catálogo de materias y servicios educativos ya está activo para compra directa en EMA Marketplace o si se requiere carga adicional de items. |
| **Utah** | Utah Fits All Scholarship (UFA) | Odyssey | Aviso de aplicación incompleta / en proceso de subsanación o revisión. | Subsanar documentación pendiente requerida por ACE Scholarships / Odyssey para habilitar el perfil en el marketplace UFA. |
| **Wyoming** | Wyoming ESA | Odyssey | Proveedor registrado en Odyssey. | Verificar que el perfil de proveedor esté visible para padres de Wyoming y listo para recibir pagos directos. |
| **Alabama** | The CHOOSE Act of 2024 | ClassWallet | Proveedor registrado en ClassWallet / ALDOR. | Confirmar el cronograma de entrada en vigor de desembolsos para 2025-2026 bajo la normativa de ALDOR. |
| **Carolina del Sur** | Education Scholarship Trust Fund (ESTF) | ClassWallet | Proveedor registrado en ClassWallet. | Confirmar elegibilidad continua tras las resoluciones judiciales estatales del programa ESTF en SC. |
| **New Hampshire** | Education Freedom Account (EFA) | ClassWallet | Proveedor registrado en ClassWallet. | Validar la lista de servicios autorizados para facturación con Children's Scholarship Fund NH. |

*Texto público mostrado en el sitio*: **"Servicio sujeto a la aprobación del programa"** / **"Service subject to program approval"** (neutro y transparente, sin notas internas).

---

## 2. Niveles de Donación e Impacto Cuantificado (donate.html)

En `donate.html` se eliminaron del HTML público los montos fijos con impacto atribuido ($50, $150, $500) para cumplir con el estándar de veracidad y no mezclar donaciones filantrópicas con servicios arancelados o fondos ESA.

### Notas previas retiradas del público:
- **Nivel $50**: `"Apoya materiales formativos de Life Skills para un joven"` — *Nota de revisión*: Requiere soporte documental del desglose de costos unitarios de materiales formativos antes de publicarse como promesa de impacto.
- **Nivel $150**: `"Apoya la evaluación inicial y acompañamiento académico"` — *Nota de revisión*: Requiere separar explícitamente si se trata de una beca benéfica otorgada por la Fundación a una familia vulnerable o de un servicio arancelado de la Academia.
- **Nivel $500**: `"Apoya el equipamiento de un centro comunitario de aprendizaje (30+ familias)"` — *Nota de revisión*: Requiere plan y presupuesto de equipamiento de centros comunitarios en iglesias asociadas (España/Latam) con cotización de equipos y sedes activas.

---

## 3. Equipo Docente y Titulaciones (programas/dual-diploma)

- **Término anterior**: `"docentes certificados"`
- **Término actualizado**: `"equipo docente"` / `"equipo docente nativo en EE. UU."`
- **Nota de revisión**: Mantener "equipo docente" en todo el sitio web hasta que se cuente con el archivo documental de certificaciones y licencias docentes estatales de los instructores en EE. UU.

---

## 4. Auditoría de Páginas de Servicios de la Academia vs. Fundación

Se identificaron páginas históricas del repositorio que describen servicios arancelados o académicos (Dual Diploma, evaluaciones, homeschool). Mantener este sitio exclusivamente dentro del dominio chanakfoundation.org, con fines educativos e informativos sin ánimo de lucro. No crear derivaciones a dominios de la academia; consultar AGENTS.md.

---

## 3. Páginas Microschool y Fundadores (17 nov 2026), a validar con Mariela
Generadas con `build_ms.py` (14 páginas EN/ES). Nada de lo siguiente debe verse en el HTML público.

- **San Buenaventura (Panamá):** solo se conoce el nombre y que es secundaria para zonas de difícil acceso. Faltan provincia/distrito, número de estudiantes, estado de las autorizaciones con MEDUCA y datos de la comunidad. La página no afirma nada de eso.
- **Tarragona:** el texto del socio sale de la web de EducaFe (Mont-roig del Camp, Projecte Brúixola). El marco legal de la sede en España está indicado como "se confirma antes de abrir". Confirmar quién es el titular (EducaFe o entidad del socio).
- **Florida:** sin anfitriones concretos. Frase de ESA sujeta a aprobación del programa; mantener solo estados y servicios aprobados.
- **Fondo Semilla:** frase de uso alternativo de fondos ("el fin benéfico similar más cercano") es texto estándar; revisarla con contador o abogado. No hay importes públicos. El enlace de Stripe lleva `client_reference_id=microschool-seed-fund` para distinguir estas donaciones.
- **Fundadores:** la ficha de Mariela usa su perfil público (finanzas en Panamá, Philadelphia International School, Columbus University, A.C.E., MBA). La de Elías se limita a su cargo (presidente de la Junta de EducaFe, tecnología/SIS y acreditación). Philadelphia aparece solo en la historia de la fundadora, sin petición de fondos. Fotos: copiar `assets/founders/mariela.jpg` y `assets/founders/elias.jpg`; hasta entonces se ven iniciales.
- **Imágenes (17 nov):** colocadas florida/hub, panama, stem-lab y seed-fund (generadas con IA, 1600 px, <300 KB, con pie "Imagen ilustrativa"). Falta `tarragona.jpg` (en Canva: MAHbNsq8MbM); `assets/hub-spain-classroom.jpg` muestra menores identificables y no se usa. Cartelería de las aulas con texto ilegible (cosmético). La imagen de Panamá no es la escuela real de San Buenaventura: sustituir por foto real cuando exista.
- **Imágenes (nota anterior):** copiar a `assets/microschools/` (`hub.jpg`, `florida.jpg`, `tarragona.jpg`, `panama.jpg`, `stem-lab.jpg`, `seed-fund.jpg`) las imágenes de Canva en alta resolución. Sin archivo, la página se ve sin imagen de portada.
- **Conversión de donación (hecho en código):** la conversión `AW-18109980849/OJC0CI7GvqQdELHBwbtD` ahora solo se dispara en `thank-you.html`; el clic en Stripe es el evento aparte `donate_click` (sin conversión). **Paso manual de Mariela:** en Stripe, Payment Link > Después del pago > redirigir a `https://chanakfoundation.org/thank-you.html` (para cada enlace de pago usado en el sitio). Hasta entonces la conversión no contará donaciones.
- **Pilares:** la portada habla de tres iniciativas y donate/funders de tres pilares distintos. Falta unificar.
- **Redirecciones (hecho):** `/dual-diploma-espana/` → `/scholarships/spain/`, `/dual-diploma-panama/` → `/scholarships/panama/`, `/homeschool-espana/` → `/community-support/spain/` (301 en `vercel.json`). Revisar que el texto interno de esas páginas no hable de programa escolar.
