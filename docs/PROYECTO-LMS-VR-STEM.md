# Proyecto: Laboratorio STEM de realidad virtual y plataforma de aprendizaje sin conexión para zonas de difícil acceso

Documento técnico interno. Estado: concepto en diseño. No hay piloto iniciado ni resultados. Lo que dice la web pública (`/microschools/stem-vr-lab/`) debe coincidir con este documento.

## 1. Objetivo
Llevar educación STEM de calidad, con cosmovisión cristiana y aprendizaje por dominio (Mastery Learning), a estudiantes de secundaria en comunidades sin buena conexión ni infraestructura, empezando por la microschool de San Buenaventura (Panamá). El modelo 60/20/20 se mantiene: 60 % núcleo estadounidense, 20 % extensión local, 20 % Life Skills y cosmovisión bíblica.

## 2. Principios
1. La Guía dirige, la pantalla apoya. Cada sesión de realidad virtual (RV) tiene introducción, experiencia y conversación posterior.
2. Todo funciona sin internet; la sincronización es oportunista.
3. Dominio antes de avanzar: cada experiencia termina con una comprobación de comprensión que alimenta el registro del estudiante.
4. Privacidad por diseño: identificadores de estudiante (los ID del SIS), nunca datos personales en el dispositivo ni en la nube. Sin cuentas personales de fabricantes para menores.
5. Seguridad física: sesiones cortas, supervisadas, con las edades mínimas recomendadas por cada fabricante (verificar para el modelo elegido antes de comprar).

## 3. Componentes
| Componente | Descripción | Decisión pendiente |
|---|---|---|
| Kit portátil | Visores RV autónomos, tableta resistente para la Guía, maleta rígida, estación solar portátil | Modelo y cantidad de visores; presupuesto (con proveedor) |
| Paquete de contenido sin conexión | Lecciones STEM empaquetadas (vídeo, RV, ejercicios) que se actualizan por sincronización | Origen del contenido: creado por Chanak, licenciado o abierto |
| Panel de la Guía | Progreso por estudiante y por estándar; funciona sin internet | Integración con el LMS (`chanak-lms-portal`) y el SIS |
| Sincronización | Cuando hay conexión, sube registros (solo ID y resultados) y baja contenido | Frecuencia y mecanismo (cola local, firma, reintentos) |
| Currículo | Módulos alineados a B.E.S.T. (Florida) y a la extensión local de Panamá | Mapa de estándares por módulo |
| Cosmovisión | Preguntas de reflexión y proyectos que conectan creación, diseño y mayordomía con cada módulo | Revisión teológica y pedagógica |

## 4. Módulos iniciales sugeridos (a validar con la Guía y la comunidad)
- Ciencias de la vida: célula, ecosistemas locales.
- Física: fuerzas, energía solar (conecta con el propio kit).
- Matemáticas aplicadas: medición, proporción, presupuesto.
- Ingeniería y diseño: resolver un problema real de la comunidad (agua, energía, caminos).
Cada módulo: objetivo de dominio, experiencia RV (10–15 min), actividad física sin pantalla, comprobación, reflexión.

## 5. Plan por fases
1. **Fase 0, necesidades y seguridad (4–6 semanas):** reuniones con familias y líderes, reglas de uso seguro, revisión de autoridades educativas de Panamá, elección de hardware.
2. **Fase 1, prototipo (2–3 meses):** 3–4 módulos y un kit; pruebas internas.
3. **Fase 2, piloto (1 ciclo escolar corto):** un grupo con una Guía formada; diagnósticos antes y después.
4. **Fase 3, evaluación y publicación:** resultados abiertos, apertura a evaluadores externos (ya declarado en la página Para financiadores).
Los plazos son orientativos; confirmar con el proveedor y con la comunidad.

## 6. Métricas (para financiadores)
Asistencia, dominio por módulo (% que alcanza el umbral), crecimiento diagnóstico, uso del kit, incidencias de seguridad (meta: cero), satisfacción de familias y de la Guía, y coste por estudiante.

## 7. Riesgos
- Hardware dañado o sin repuestos en zonas remotas (mitigación: maleta rígida, repuestos, formación de la Guía).
- Contenido insuficiente o de baja calidad (mitigación: empezar con pocos módulos bien hechos).
- Dependencia de la pantalla (mitigación: regla de sesión corta y actividad sin pantalla).
- Cumplimiento: edad mínima de los visores, protección de datos de menores y normativa educativa de Panamá. Validar con asesoría legal antes del piloto.

## 8. Mejoras al LMS actual (alcance posterior)
- Modo sin conexión de primera clase en el portal del alumno y de la Guía.
- Vista de dominio por estándar con exportación a expediente.
- Soporte de módulos RV como actividad evaluable.
- Panel multi-sede para supervisión desde Chanak (Florida, Tarragona, Panamá).
No se ha modificado el código del LMS en esta fase.

## 9. Lo que falta de la dueña del proyecto
Presupuesto real por componente, proveedor de hardware, fuente y licencia del contenido, aprobación de la comunidad de San Buenaventura y datos de la sede (ubicación, número de estudiantes, energía disponible).
