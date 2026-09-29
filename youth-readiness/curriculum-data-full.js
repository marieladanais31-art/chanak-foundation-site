/* ==========================================================================
   CHANAK SAINT CLOUD YOUTH LIFE & CAREER READINESS PROGRAM
   Full Curriculum Data Engine (Based 100% on Karen Pujols' Official Plan)
   ========================================================================== */

window.CHANAK_PROGRAM = {
  meta: {
    title: {
      en: "Chanak Saint Cloud Youth Life & Career Readiness Program",
      es: "Programa Chanak de Preparación Laboral y de Vida para Jóvenes de St. Cloud"
    },
    tagline: {
      en: "Preparing High School Students Ages 16–18 for Their First Job, Volunteer Experience & Independence",
      es: "Preparando a Jóvenes de 16 a 18 años para su Primer Empleo, Voluntariado e Independencia"
    },
    location: "Veterans Memorial St. Cloud Library & Chanak Virtual Campus",
    partner: "Walmart Spark Good Local Grants · Supercenter #5214 (St. Cloud, FL)",
    grantAmount: "$3,500 USD",
    cohortSize: 15,
    duration: "4 Weeks (4 In-Person Saturdays + 16 Daily 30-min Online Modules)"
  },

  // 4 Weeks Structure from Karen's Curriculum
  weeks: [
    {
      id: 1,
      num: 1,
      title: { en: "Week 1: Know Yourself & Build Your Résumé", es: "Semana 1: Conócete a Ti Mismo y Construye Tu Currículum" },
      subtitle: {
        en: "Explore interests, strengths, skills, and create your first working professional résumé.",
        es: "Explora intereses, fortalezas, habilidades y crea tu primer borrador de currículum profesional."
      },
      badge: "Self-Discovery & Résumé",
      color: "#2563EB",
      days: [
        {
          dayId: "w1-d1",
          dayNum: 1,
          type: "in-person",
          title: { en: "In-Person Day 1: Start With Yourself", es: "Día 1 Presencial: Comienza Contigo Mismo" },
          time: "Saturday 10:00 AM – 11:30 AM (90 mins)",
          location: "Veterans Memorial St. Cloud Library Meeting Room",
          goal: {
            en: "Students begin building their résumé immediately and understand what they have to offer.",
            es: "Los estudiantes comienzan a elaborar su currículum de inmediato y comprenden el valor real que tienen para ofrecer."
          },
          learnings: {
            en: [
              "What employers and volunteer organizations look for in entry-level applicants",
              "Why a résumé matters, even with zero previous employment history",
              "How school, activities, volunteering, sports, clubs, and responsibilities demonstrate real experience",
              "Identifying personal interests and hidden strengths",
              "Beginning to think about what type of work or volunteer experience interests them",
              "Why they want to work, volunteer, or gain experience"
            ],
            es: [
              "Qué buscan los empleadores y organizaciones en postulantes sin experiencia",
              "Por qué un currículum es vital, incluso si nunca has tenido un trabajo formal",
              "Cómo la escuela, deportes, clubes, grupos juveniles y responsabilidades familiares demuestran experiencia real",
              "Identificación de intereses personales y talentos ocultos",
              "Comenzar a definir qué tipo de trabajo o servicio comunitario se alinea contigo",
              "Definir el propósito personal: por qué quieres trabajar o servir"
            ]
          },
          agenda: [
            { time: "10:00 - 10:15", title: { en: "Student Introductions & Icebreaker", es: "Presentación de los Jóvenes y Dinámica Rompehielo" } },
            { time: "10:15 - 10:35", title: { en: "Personal Interests & Strengths Discovery Activity", es: "Actividad de Descubrimiento: Intereses y Fortalezas" } },
            { time: "10:35 - 10:55", title: { en: "Résumé Walkthrough (Anatomy of a High School CV)", es: "Paso a Paso del Currículum: Anatomía de un CV Juvenil" } },
            { time: "10:55 - 11:20", title: { en: "Live Hands-on Drafting with Facilitator Guidance", es: "Redacción en Vivo con Apoyo Individualizado de Karen" } },
            { time: "11:20 - 11:30", title: { en: "Takeaway & Weekly Online Roadmap Briefing", es: "Cierre: Los estudiantes salen con su primer borrador en mano" } }
          ],
          interactiveTool: "resumeBuilder"
        },
        {
          dayId: "w1-d2",
          dayNum: 2,
          type: "online",
          title: { en: "Online Day 2: Who Am I?", es: "Día 2 Online: ¿Quién soy yo?" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Students explore interests, hobbies, activities, values, things they enjoy learning, and core personal motivations.",
            es: "Los estudiantes exploran sus intereses, pasatiempos, actividades, valores, lo que disfrutan aprender y qué los motiva."
          },
          assignment: {
            en: "Personal Interests Inventory: Select your top 3 passions and identify 2 core values.",
            es: "Inventario de Intereses Personales: Selecciona 3 pasiones y define 2 valores rectores."
          },
          interactiveTool: "interestsInventory"
        },
        {
          dayId: "w1-d3",
          dayNum: 3,
          type: "online",
          title: { en: "Online Day 3: What Are My Strengths?", es: "Día 3 Online: ¿Cuáles son mis fortalezas?" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Students learn the crucial difference between: Strengths, Hard Skills, Abilities, and Personal Qualities (Reliable, Organized, Creative, Good listener, Team player, Problem solver, Responsible).",
            es: "Comprende la diferencia entre: Fortalezas, Habilidades Técnicas, Aptitudes y Cualidades Personales (Confiable, Organizado, Creativo, Buen oyente, Trabajo en equipo, Solucionador, Responsable)."
          },
          assignment: {
            en: "Strengths & Skills Inventory: Categorize your capabilities and identify evidence for each.",
            es: "Inventario de Fortalezas y Habilidades: Clasifica tus destrezas y encuentra evidencias de tu vida escolar o diaria."
          },
          interactiveTool: "strengthsClassifier"
        },
        {
          dayId: "w1-d4",
          dayNum: 4,
          type: "online",
          title: { en: "Online Day 4: What Can I Bring to an Organization?", es: "Día 4 Online: ¿Qué puedo aportar a una organización?" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Students connect their interests and strengths to what an employer or volunteer organization actually needs: Reliability, Responsibility, Teamwork, Clear Communication, Quick Learning, Following Directions, and Helping Others.",
            es: "Conecta tus intereses y talentos con lo que realmente necesitan los negocios u ONGs: Confiabilidad, Responsabilidad, Trabajo en equipo, Buena comunicación, Aprendizaje rápido, Seguir indicaciones y Servir."
          },
          assignment: {
            en: "'What I Can Bring' Matrix: Map 3 personal traits directly to employer pain points.",
            es: "Matriz 'Lo que Puedo Aportar': Vincula 3 cualidades personales con soluciones reales para un negocio."
          },
          interactiveTool: "valueProposition"
        },
        {
          dayId: "w1-d5",
          dayNum: 5,
          type: "online",
          title: { en: "Online Day 5: Why Do I Want to Work or Volunteer?", es: "Día 5 Online: ¿Por qué quiero trabajar o hacer voluntariado?" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Students explore why they want their first job, how volunteering builds professional references, preferred work environments, and what they hope their first experience will teach them.",
            es: "Analiza el porqué de tu primer empleo, el valor del voluntariado para conseguir referencias de adultos, el tipo de ambiente que prefieres y qué habilidades deseas aprender."
          },
          assignment: {
            en: "Identify 3 types of jobs or volunteer opportunities in St. Cloud / Osceola County and refine your Week 1 Résumé.",
            es: "Identifica 3 tipos de empleo o voluntariado en St. Cloud / Osceola y pule tu currículum de la Semana 1."
          },
          interactiveTool: "opportunityFinder"
        }
      ]
    },
    {
      id: 2,
      num: 2,
      title: { en: "Week 2: Get Prepared (Communication, Etiquette & Paycheck)", es: "Semana 2: Prepárate (Comunicación, Etiqueta y Nómina)" },
      subtitle: {
        en: "Master professional body language, present your résumé, and decode paychecks, paystubs, and taxes.",
        es: "Domina el lenguaje corporal profesional, presenta tu CV y descifra cheques, talones de nómina e impuestos."
      },
      badge: "Communication & Financial Literacy",
      color: "#059669",
      days: [
        {
          dayId: "w2-d6",
          dayNum: 6,
          type: "in-person",
          title: { en: "In-Person Day 2: Professional Communication, Etiquette & Résumé Presentation", es: "Día 2 Presencial: Comunicación Profesional, Etiqueta y Presentación de Currículum" },
          time: "Saturday 10:00 AM – 11:30 AM (90 mins)",
          location: "Veterans Memorial St. Cloud Library Meeting Room",
          goal: {
            en: "Students arrive with their completed résumé, learn communication/etiquette rules, and present their actual résumé live to peers and facilitators.",
            es: "Llegan con su currículum impreso, dominan las normas de etiqueta y presentan su CV en vivo recibiendo retroalimentación."
          },
          learnings: {
            en: [
              "Speaking clearly, introducing yourself without slang, and active listening",
              "Speaking to adults and supervisors professionally with appropriate vocabulary and tone",
              "Confidence without being overly casual",
              "Professional etiquette: eye contact, body language, firm handshake, posture, appearance, punctuality, phone away",
              "Knowing when to speak and when to listen"
            ],
            es: [
              "Vocalización clara, presentarse formalmente sin modismos informales y escucha activa",
              "Cómo comunicarse con adultos y supervisores con respeto y vocabulario adecuado",
              "Seguridad y confianza sin caer en informalidad excesiva",
              "Etiqueta profesional: contacto visual, postura firme, saludo respetuoso, celular guardado y puntualidad",
              "Saber cuándo hablar y cuándo escuchar con atención"
            ]
          },
          agenda: [
            { time: "10:00 - 10:20", title: { en: "Professional Etiquette Drills (Body language, greetings, phone discipline)", es: "Entrenamiento de Etiqueta (Lenguaje corporal, saludo y regla del celular)" } },
            { time: "10:20 - 10:55", title: { en: "Live Student Résumé Presentations (Walk up, eye contact, pitch, presentation)", es: "Presentaciones en Vivo de Currículum por cada estudiante (1-2 min c/u)" } },
            { time: "10:55 - 11:15", title: { en: "Constructive Peer & Facilitator Feedback Loop", es: "Ronda de Retroalimentación Positiva y Constructiva" } },
            { time: "11:15 - 11:30", title: { en: "Preview of Week 2 Online: The Real Paycheck & Taxes", es: "Introducción a la Semana 2 Online: Tu Primer Sueldo e Impuestos" } }
          ],
          interactiveTool: "etiquetteSimulator"
        },
        {
          dayId: "w2-d7",
          dayNum: 7,
          type: "online",
          title: { en: "Online Day 7: Going Deeper Into Workplace Etiquette", es: "Día 7 Online: Profundizando en la Etiqueta Laboral" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Workplace behavior, respecting supervisors, working with coworkers, appropriate phone use, social media footprint, punctuality, following instructions, asking for clarification, receiving correction, and handling disagreements professionally.",
            es: "Comportamiento laboral, trato con supervisores y compañeros, uso del celular en turno, redes sociales, puntualidad, cómo recibir correcciones con madurez y resolver desacuerdos con respeto."
          },
          assignment: {
            en: "Workplace Dilemma Solver: Resolve 4 real-world ethical scenarios.",
            es: "Solucionador de Dilemas Laborales: Toma decisiones en 4 situaciones laborales reales."
          },
          interactiveTool: "workplaceDilemmas"
        },
        {
          dayId: "w2-d8",
          dayNum: 8,
          type: "online",
          title: { en: "Online Day 8: What Should I Expect at Work?", es: "Día 8 Online: ¿Qué debo esperar en el trabajo?" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Attendance, scheduling, being dependable, workplace safety, taking initiative, making mistakes and correcting them, asking for help, and proactive supervisor communication.",
            es: "Asistencia, manejo de horarios, confiabilidad, seguridad laboral, tomar iniciativa, qué hacer al cometer un error, pedir ayuda a tiempo y comunicación proactiva con supervisores."
          },
          assignment: {
            en: "Draft a professional emergency notice email or text to a manager.",
            es: "Redacta un mensaje profesional para notificar un retraso imprevisto o enfermedad."
          },
          interactiveTool: "communicationScripts"
        },
        {
          dayId: "w2-d9",
          dayNum: 9,
          type: "online",
          title: { en: "Online Day 9: Understanding My First Paycheck", es: "Día 9 Online: Entendiendo Mi Primer Cheque de Pago" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Hourly wage, hours worked, gross pay, deductions, net pay, pay frequency, and why the amount deposited is less than hours multiplied by rate. Basic payroll taxes.",
            es: "Salario por hora, horas trabajadas, salario bruto, deducciones, salario neto y por qué el depósito en tu banco es menor al cálculo mental. Impuestos básicos sobre la nómina."
          },
          assignment: {
            en: "Calculate gross vs. net pay for 20 hours at $14.00/hr in Florida.",
            es: "Calcula el sueldo bruto vs. neto para 20 horas a $14.00/hr en Florida."
          },
          interactiveTool: "paycheckSimulator"
        },
        {
          dayId: "w2-d10",
          dayNum: 10,
          type: "online",
          title: { en: "Online Day 10: Understanding a Paystub", es: "Día 10 Online: Entendiendo un Talón de Pago (Paystub)" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Identify: Pay period, regular hours, rate of pay, gross earnings, Federal withholding, Social Security (6.2%), Medicare (1.45%), FL 0% state tax, net pay, and direct deposit.",
            es: "Aprende a leer cada línea de tu talón: período de pago, horas regulares, tarifa, retención federal W-4, Seguro Social (6.2%), Medicare (1.45%), exención estatal de Florida y depósito neto."
          },
          assignment: {
            en: "Interactive Paystub Explorer: Click and explain all 6 components of the official paystub.",
            es: "Explorador Interactivo del Paystub: Haz clic y descubre los 6 componentes de un talón de cheque real."
          },
          interactiveTool: "paystubInspector"
        }
      ]
    },
    {
      id: 3,
      num: 3,
      title: { en: "Week 3: Get Ready (Personal Budgeting & Safe Job Search)", es: "Semana 3: Prepárate (Presupuesto Personal y Búsqueda Segura)" },
      subtitle: {
        en: "Build a realistic entry-level budget, master workplace problem-solving, and identify legitimate jobs without scams.",
        es: "Crea tu presupuesto mensual real, resuelve conflictos laborales en vivo y aprende a detectar ofertas falsas o estafas."
      },
      badge: "Budgeting & Safety",
      color: "#D97706",
      days: [
        {
          dayId: "w3-d11",
          dayNum: 11,
          type: "online",
          title: { en: "Online Day 11: Money & My First Budget", es: "Día 11 Online: El Dinero y Mi Primer Presupuesto" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Needs vs. wants, fixed vs. variable expenses, emergency savings buffer, intentional giving/stewardship, and planning based on real take-home net income.",
            es: "Necesidades vs. deseos, gastos fijos vs. variables, ahorro para imprevistos, generosidad/diezmo y planificación basada en tu sueldo neto real."
          },
          assignment: {
            en: "Categorize 10 everyday high-school expenses into Needs, Wants, and Savings.",
            es: "Clasifica 10 gastos habituales de un joven entre Necesidades, Deseos y Ahorro."
          },
          interactiveTool: "needsVsWants"
        },
        {
          dayId: "w3-d12",
          dayNum: 12,
          type: "online",
          title: { en: "Online Day 12: Building My Monthly Budget", es: "Día 12 Online: Construyendo Mi Presupuesto Mensual" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Calculate: monthly income, transportation/gas, phone plan, food, personal expenses, savings, and remaining funds. Bring completed budget to Saturday in-person session.",
            es: "Calcula: ingresos mensuales, transporte/gasolina, plan de celular, comida, salidas, ahorro y balance final. Llena tu presupuesto para revisarlo el sábado."
          },
          assignment: {
            en: "Generate your official Personal Monthly Budget card for group review.",
            es: "Genera tu tarjeta de Presupuesto Mensual para la sesión presencial."
          },
          interactiveTool: "monthlyBudgetLab"
        },
        {
          dayId: "w3-d13",
          dayNum: 13,
          type: "in-person",
          title: { en: "In-Person Day 3: My Money, My Workplace & My Next Step", es: "Día 3 Presencial: Mi Dinero, Mi Trabajo y Mi Próximo Paso" },
          time: "Saturday 10:00 AM – 11:30 AM (90 mins)",
          location: "Veterans Memorial St. Cloud Library Meeting Room",
          goal: {
            en: "Review budgets together (what happens when expenses > income), role-play real workplace conflict situations, and introduce finding opportunities.",
            es: "Revisar presupuestos grupales (qué pasa cuando el gasto supera al ingreso), dramatizar situaciones laborales difíciles e iniciar la búsqueda de oportunidades."
          },
          learnings: {
            en: [
              "What to do when expenses exceed income; living within your means",
              "Role-playing: Running late, not understanding an assignment, making a mistake, supervisor correction, difficult coworker, asking for help, calling out sick, prioritizing multiple urgent tasks",
              "Thinking through situations instead of merely memorizing workplace rules",
              "Bridging to the final stage: How to find and vet a real opportunity in St. Cloud"
            ],
            es: [
              "Qué hacer cuando los gastos superan los ingresos; vivir dentro de tus posibilidades",
              "Dramatizaciones en vivo: Llegar tarde, no entender una orden, cometer un fallo, corrección de un jefe, lidiar con un compañero difícil, pedir ayuda, reportar falta, priorizar tareas",
              "Aprender a pensar bajo presión en vez de memorizar normas frías",
              "Transición a la etapa final: Cómo buscar y validar una oportunidad real en St. Cloud"
            ]
          },
          agenda: [
            { time: "10:00 - 10:25", title: { en: "Interactive Budget Debrief & Living Within Means", es: "Revisión Grupal de Presupuestos y Estrategias de Ahorro" } },
            { time: "10:25 - 10:55", title: { en: "Live Workplace Roleplays (Teams act out 8 real scenarios)", es: "Dramatizaciones Laborales en Vivo (8 escenarios de improvisación)" } },
            { time: "10:55 - 11:15", title: { en: "Introduction to Job Search & Scam Detection", es: "Introducción a la Búsqueda de Empleo y Detección de Estafas" } },
            { time: "11:15 - 11:30", title: { en: "Assigning the Final Project: Selecting a Real Opportunity", es: "Asignación del Proyecto Final: Elegir una Oportunidad Real" } }
          ],
          interactiveTool: "roleplayDeck"
        },
        {
          dayId: "w3-d14",
          dayNum: 14,
          type: "online",
          title: { en: "Online Day 14: Finding Legitimate Opportunities Safely", es: "Día 14 Online: Encontrando Oportunidades Legítimas de Forma Segura" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Where to search (entry-level, volunteer, internships) and recognizing online scams. Critical safety rules: never pay to get a job, guard SSN/bank info, verify organizations, talk with a parent/guardian.",
            es: "Dónde buscar vacantes legítimas y cómo detectar fraudes en internet. Reglas de oro: nunca pagar por trabajar, proteger tu Seguro Social, verificar a la empresa y consultar con tus padres."
          },
          assignment: {
            en: "Scam or Legit? Play the interactive detector game and find 2 real local St. Cloud opportunities.",
            es: "¿Estafa o Empleo Legítimo? Supera el detector interactivo y selecciona 2 opciones locales reales en St. Cloud."
          },
          interactiveTool: "scamDetectorGame"
        },
        {
          dayId: "w3-d15",
          dayNum: 15,
          type: "online",
          title: { en: "Online Day 15: Research the Organization & Prepare Your Pitch", es: "Día 15 Online: Investiga la Organización y Prepara tu Pitch" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Select a real opportunity. Research: mission, requirements, schedule, skills needed, who to contact. Develop your 30-second Elevator Pitch answering: Who am I? What am I interested in? What can I offer? Why this organization?",
            es: "Selecciona una vacante real. Investiga: qué hacen, requisitos, horarios y a quién contactar. Desarrolla tu Elevator Pitch de 30 segundos: ¿Quién soy? ¿Qué me interesa? ¿Qué puedo aportar? ¿Por qué esta empresa?"
          },
          assignment: {
            en: "Complete the Opportunity Research sheet and craft your 30-second Elevator Pitch.",
            es: "Completa la ficha de investigación de tu oportunidad y graba/escribe tu Elevator Pitch."
          },
          interactiveTool: "elevatorPitchArchitect"
        },
        {
          dayId: "w3-d16",
          dayNum: 16,
          type: "online",
          title: { en: "Online Day 16: Interview Preparation (The 9 Core Questions)", es: "Día 16 Online: Preparación de Entrevista (Las 9 Preguntas Clave)" },
          time: "30 minutes (Self-paced online module)",
          summary: {
            en: "Master answers to the 9 essential interview questions: Tell me about yourself; Why interested?; Strengths; Areas of improvement; Why should we consider you?; Teamwork story; Handling a mistake; Unclear instructions; Questions for the interviewer.",
            es: "Domina las respuestas a las 9 preguntas obligadas de entrevista laboral: Cuéntame de ti; Por qué te interesa; Fortalezas; Áreas a mejorar; Por qué elegirte; Historia de trabajo en equipo; Cómo manejas un error; Instrucciones dudosas; Preguntas para el empleador."
          },
          assignment: {
            en: "Simulate and record answers for all 9 questions in the Interview Lab.",
            es: "Simula y ensaya las 9 preguntas en el Laboratorio Interactivo con cronómetro."
          },
          interactiveTool: "interviewLabSuite"
        }
      ]
    },
    {
      id: 4,
      num: 4,
      title: { en: "Week 4: Final In-Person Day 4 — Career Readiness Day", es: "Semana 4: Día Presencial 4 Final — Día de Preparación Laboral" },
      subtitle: {
        en: "The grand culmination: Professional introduction, Elevator pitch, Mock interview, Feedback, and Certificate of Completion.",
        es: "La gran culminación: Saludo formal, Elevator pitch, Entrevista simulada completa, Retroalimentación y Certificado de Graduación."
      },
      badge: "Graduation & Career Day",
      color: "#7C3AED",
      days: [
        {
          dayId: "w4-d17",
          dayNum: 17,
          type: "in-person",
          title: { en: "FINAL IN-PERSON DAY 4 — CAREER READINESS DAY", es: "DÍA FINAL PRESENCIAL 4 — DÍA DE PREPARACIÓN LABORAL" },
          time: "Saturday 10:00 AM – 11:30 AM (90 mins)",
          location: "Veterans Memorial St. Cloud Library Meeting Room",
          goal: {
            en: "Every student arrives with final résumé in hand, pitches their chosen opportunity, completes a realistic mock interview, receives facilitator feedback, builds a Personal Next-Step Plan, and graduates with an official Certificate of Completion.",
            es: "Cada estudiante asiste con su currículum final en mano, presenta su pitch ante el panel, completa una entrevista simulada realista, recibe su rúbrica de evaluación, diseña su Plan de Próximo Paso y recibe su Certificado Oficial de Chanak."
          },
          learnings: {
            en: [
              "1. Professional Introduction (Eye contact, presence)",
              "2. Elevator Pitch (Who I am -> What I offer -> Why interested -> Why this opportunity)",
              "3. Résumé Presentation (Explaining skills, activities, strengths)",
              "4. Realistic Mock Interview (Listening, complete answers, asking questions, closing)",
              "5. Opportunity Presentation (Explaining the company, why chosen, how to apply)",
              "6. Comprehensive Facilitator Feedback on 8 dimensions",
              "7. Personal Next-Step Plan (Opportunity pursuing, contact, deadline)",
              "8. Official Certificate of Completion Ceremony"
            ],
            es: [
              "1. Saludo y Presentación Profesional (Presencia escénica y postura)",
              "2. Elevator Pitch (Quién soy -> Qué aporto -> Por qué me interesa -> Por qué esta oportunidad)",
              "3. Exposición del Currículum (Destacando habilidades, deportes y servicio)",
              "4. Entrevista Simulada Realista (Respuestas seguras, preguntas al entrevistador y cierre formal)",
              "5. Presentación de la Oportunidad (Empresa elegida, requisitos y proceso de aplicación)",
              "6. Rúbrica Oficial de Retroalimentación en 8 áreas clave",
              "7. Plan de Acción de Próximo Paso (Qué oportunidad solicitaré, a quién contactaré y cuándo)",
              "8. Ceremonia Oficial de Entrega de Certificados Chanak"
            ]
          },
          agenda: [
            { time: "10:00 - 10:15", title: { en: "Opening & Welcome to Families and Evaluators", es: "Apertura y Bienvenida a Familias y Evaluadores Invitados" } },
            { time: "10:15 - 10:40", title: { en: "Round 1: Professional Introductions & 30-Second Elevator Pitches", es: "Ronda 1: Presentaciones Profesionales y Elevator Pitches en Vivo" } },
            { time: "10:40 - 11:10", title: { en: "Round 2: Live Mock Interviews & Résumé Defenses", es: "Ronda 2: Entrevistas Simuladas en Vivo y Defensa de Currículum" } },
            { time: "11:10 - 11:20", title: { en: "Personal Next-Step Commitments & Facilitator Review", es: "Firma de Planes de Próximo Paso y Mentoría Individual" } },
            { time: "11:20 - 11:30", title: { en: "Official Graduation & Certificate of Completion Award Ceremony", es: "Graduación Oficial y Entrega de Diplomas Chanak con Sello Dorado" } }
          ],
          interactiveTool: "careerDayShowcase"
        }
      ]
    }
  ],

  // 15 Sample Cohort Students for Karen's Facilitator Dashboard
  cohortStudents: [
    { id: 1, name: "Mateo Rodriguez", age: 17, school: "St. Cloud High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 94, status: "Graduated" },
    { id: 2, name: "Sofia Morales", age: 16, school: "Harmony High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 98, status: "Graduated" },
    { id: 3, name: "Lucas Gomez", age: 17, school: "St. Cloud High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 91, status: "Graduated" },
    { id: 4, name: "Valentina Ortiz", age: 16, school: "Tohopekaliga High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 96, status: "Graduated" },
    { id: 5, name: "Gabriel Santos", age: 18, school: "St. Cloud High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 89, status: "Graduated" },
    { id: 6, name: "Isabella Cruz", age: 17, school: "Harmony High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 95, status: "Graduated" },
    { id: 7, name: "Daniel Rivera", age: 16, school: "Chanak Homeschool", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 97, status: "Graduated" },
    { id: 8, name: "Camila Torres", age: 17, school: "St. Cloud High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 92, status: "Graduated" },
    { id: 9, name: "Sebastian Vega", age: 18, school: "Osceola High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 90, status: "Graduated" },
    { id: 10, name: "Emma Hernandez", age: 16, school: "Harmony High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 94, status: "Graduated" },
    { id: 11, name: "Adrian Perez", age: 17, school: "Tohopekaliga High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 88, status: "Graduated" },
    { id: 12, name: "Mia Castillo", age: 16, school: "St. Cloud High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 96, status: "Graduated" },
    { id: 13, name: "Julian Ramirez", age: 17, school: "Chanak Homeschool", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 99, status: "Graduated" },
    { id: 14, name: "Elena Fernandez", age: 18, school: "St. Cloud High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 93, status: "Graduated" },
    { id: 15, name: "David Alvarez", age: 17, school: "Harmony High", attendance: [1, 1, 1, 1], resumeReady: true, budgetReady: true, pitchReady: true, mockScore: 95, status: "Graduated" }
  ],

  // Official Rubric for Saturday Presentations (8 Dimensions from Karen's Document)
  rubricCategories: [
    { id: "resume", name: { en: "Professional Résumé", es: "Currículum Profesional" }, desc: { en: "Format, clarity, strengths highlighted without errors", es: "Formato limpio, sin faltas ortográficas y fortalezas claras" } },
    { id: "communication", name: { en: "Verbal Communication", es: "Comunicación Verbal" }, desc: { en: "Clear tone, proper vocabulary, no filler words", es: "Voz clara, buen volumen, sin muletillas ni modismos casuales" } },
    { id: "eyeContact", name: { en: "Eye Contact & Posture", es: "Contacto Visual y Postura" }, desc: { en: "Maintains eye contact, confident upright posture", es: "Mantiene mirada a los ojos, hombros erguidos y sin balancearse" } },
    { id: "bodyLanguage", name: { en: "Body Language & Greeting", es: "Lenguaje Corporal y Saludo" }, desc: { en: "Professional greeting, no nervous fidgeting, phone away", es: "Saludo respetuoso, manos seguras y celular 100% guardado" } },
    { id: "pitch", name: { en: "30-Second Elevator Pitch", es: "Elevator Pitch de 30 Segundos" }, desc: { en: "Covers who I am, what I offer, why interested, why company", es: "Estructura impecable en menos de 30 segundos" } },
    { id: "interviewResponses", name: { en: "Interview Responses", es: "Respuestas de Entrevista" }, desc: { en: "Honest, complete answers using real examples (STAR)", es: "Respuestas completas, sinceras y respaldadas con ejemplos reales" } },
    { id: "opportunityPrep", name: { en: "Opportunity Research", es: "Investigación de Oportunidad" }, desc: { en: "Knows the employer mission, requirements, and next step", es: "Demuestra conocimiento genuino de la empresa y cómo aplicar" } },
    { id: "overallPresence", name: { en: "Overall Presentation", es: "Presencia y Madurez General" }, desc: { en: "Ready for entry-level workplace or volunteer placement", es: "Muestra actitud lista para incorporarse al entorno laboral" } }
  ]
};
