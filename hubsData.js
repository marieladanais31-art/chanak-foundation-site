/**
 * Architecture for Chanak Foundation Community Hubs
 * Dynamic data-driven model for Grants evaluators and responsive frontend.
 */

window.communityHubsData = [
  {
    id: "chiman-pacific-hub",
    regionCode: "PA-PAN",
    title: {
      es: "Pacific Coast & Remote Rural Hubs (Panamá Este — Chimán / San Buenaventura / Brujas)",
      en: "Pacific Coast & Remote Rural Hubs (Panama Este — Chimán / San Buenaventura / Brujas)"
    },
    locationBadge: {
      es: "Golfo de Panamá · Acceso Marítimo & Fluvial",
      en: "Gulf of Panama · Maritime & River Access"
    },
    image: {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      fallbackUrl: "/assets/180523_5.JPG",
      alt: "Comunidad costera tradicional del Pacífico y pescadores locales",
      caption: {
        es: "Comunidades costeras de Chimán: superando el aislamiento geográfico mediante educación comunitaria",
        en: "Coastal villages in Chimán: overcoming geographic isolation through community-anchored learning"
      }
    },
    context: {
      es: "En estas comunidades pesqueras y costeras de difícil acceso (Chimán, San Buenaventura, Brujas, El Corte), los jóvenes de secundaria enfrentan una disyuntiva crítica: verse forzados a abandonar sus hogares familiares a temprana edad para trasladarse a ciudades distantes en peligrosos trayectos de horas por mar o caminos de tierra, o renunciar a sus estudios. Ante los riesgos, el coste del desarraigo y la falta de alternativas locales, una gran mayoría desiste y permanece en la comunidad, quedando expuesta al desánimo, el rezago y problemáticas como el alcoholismo por carencia absoluta de oportunidades.",
      en: "In remote coastal fishing villages accessible only by boat or rugged terrain, secondary students face an impossible choice: leave their families behind to navigate hazardous journeys across water and land toward distant cities, or forfeit their education altogether. Facing extreme risks, financial strain, and geographic isolation, many youth drop out, remaining stranded in their villages where the lack of local opportunity often leads to social vulnerability and substance abuse."
    },
    solutions: {
      es: [
        {
          title: "Continuidad Educativa Acreditada",
          desc: "Acceso local a secundaria y bachillerato flexible mediante tecnología satelital y metodología de dominio (Mastery Learning)."
        },
        {
          title: "Habilidades para la Vida y Autosostenibilidad",
          desc: "Formación práctica en gestión de recursos locales, microemprendimiento costero y oficios sostenibles para el arraigo comunitario."
        },
        {
          title: "Proyectos de Impacto Comunitario",
          desc: "Aprendizaje basado en proyectos reales que transforman el entorno (conservación costera, soberanía alimentaria y liderazgo juvenil) respaldados por becas de Chanak Foundation."
        }
      ],
      en: [
        {
          title: "Accredited Local Secondary Pathways",
          desc: "Completing recognized middle and high school education without family displacement, enabled by satellite connectivity and mastery learning."
        },
        {
          title: "Self-Sustaining Life Skills",
          desc: "Vocational training focused on coastal resource management, entrepreneurship, and sustainable community livelihoods."
        },
        {
          title: "Community-Led Impact Projects",
          desc: "Student-driven initiatives that solve local challenges, restoring purpose and social mobility through donor-backed scholarship pathways."
        }
      ]
    },
    statusBadge: {
      es: "Active Grassroots Pilot · Retención Escolar y Resiliencia Comunitaria",
      en: "Active Grassroots Pilot · Youth Retention & Community Resilience"
    },
    tags: ["Pacific Coast", "Digital Inclusion", "Life Skills", "Youth Mentoring"]
  },
  {
    id: "churube-cocle-hub",
    regionCode: "PA-COC",
    title: {
      es: "Central Rural & Agricultural Hubs (Coclé — Churubé / Natá de los Caballeros)",
      en: "Central Rural & Agricultural Hubs (Coclé — Churubé / Natá de los Caballeros)"
    },
    locationBadge: {
      es: "Sabana Rural de Coclé · Comunidad Adyacente a Escuela Local",
      en: "Rural Coclé Farmlands · Adjacent to Local School"
    },
    image: {
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      fallbackUrl: "/assets/panama-classroom.jpg",
      alt: "Espacio comunitario rural de aprendizaje y formación en Coclé",
      caption: {
        es: "Churubé: Centro de nivelación escolar, alfabetización digital y apoyo a familias rurales",
        en: "Churubé: Community learning hub for school retention, digital skills, and family empowerment"
      }
    },
    context: {
      es: "Ubicado en el entorno rural de Coclé junto a la escuela comunitaria de Churubé, este Hub aborda directamente el abandono escolar temprano y la falta de terminalidad educativa en la población adulta y madres de familia.",
      en: "Located in the rural agricultural landscape of Coclé next to the local community school, this Hub directly tackles school dropout rates and empowers adult learners and local mothers to complete their education."
    },
    solutions: {
      es: [
        {
          title: "Aula Comunitaria en Terreno Local",
          desc: "Aprovechamiento de terreno comunitario para albergar estaciones de estudio digitales y apoyo pedagógico diario."
        },
        {
          title: "Educación de Adultos & Empoderamiento Femenino",
          desc: "Capacitación en competencias digitales y emprendimiento para las madres y facilitadoras de la OBC local."
        },
        {
          title: "Nivelación & Éxito Académico",
          desc: "Tutorías personalizadas contra el rezago escolar conectadas con el plan curricular de Chanak."
        }
      ],
      en: [
        {
          title: "Grassroots Learning Facility",
          desc: "Dedicated community-donated land hosting digital learning stations and daily academic support."
        },
        {
          title: "Adult Education & Women Mentors",
          desc: "Digital literacy and entrepreneurship pathways empowering local mothers and community facilitators."
        },
        {
          title: "Academic Remediation & Retention",
          desc: "Personalized mastery tutoring preventing school abandonment in coordination with Chanak's curriculum."
        }
      ]
    },
    statusBadge: {
      es: "Active Community Hub · Empoderamiento Familiar Rural",
      en: "Active Community Hub · Family & Adult Empowerment"
    },
    tags: ["Rural Coclé", "Adult Literacy", "Family Empowerment", "Mastery Learning"]
  },
  {
    id: "regional-global-hub",
    regionCode: "ES-INT",
    title: {
      es: "Regional & Global Learning Hubs (Spain & Global Distance Pathways)",
      en: "Regional & Global Learning Hubs (Spain & Global Distance Pathways)"
    },
    locationBadge: {
      es: "Red Comunitaria Europa & Acreditación Internacional US",
      en: "European Community Network & US International Accreditation"
    },
    image: {
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      fallbackUrl: "/assets/panama-graduation.jpg",
      alt: "Estudiantes en entorno colaborativo de aprendizaje internacional",
      caption: {
        es: "Red de micro-escuelas seguras, bienestar juvenil y Doble Titulación Internacional",
        en: "Safe micro-school network, youth well-being, and accredited Dual Diploma tracks"
      }
    },
    context: {
      es: "Espacios de aprendizaje protegidos enfocados en el bienestar emocional, ambientes libres de acoso y programas de Doble Titulación Internacional (US High School Diploma) para familias en España y a nivel internacional.",
      en: "Supportive educational micro-hubs fostering emotional well-being, anti-bullying environments, and accredited US High School Dual Diploma pathways for families across Spain and globally."
    },
    solutions: {
      es: [
        {
          title: "Doble Titulación Acreditada (US High School)",
          desc: "Acceso a titulación estadounidense oficial simultánea con estudios locales, abriendo puertas universitarias globales."
        },
        {
          title: "Salud Mental & Entornos Seguros",
          desc: "Comunidades de aprendizaje libres de acoso escolar que devuelven el propósito y la motivación al estudiante."
        },
        {
          title: "Liderazgo y Habilidades para la Vida (Ages 10–18)",
          desc: "Ruta formativa estructurada en 4 etapas: Seedling, Explorer, Builder y Launch."
        }
      ],
      en: [
        {
          title: "Accredited Dual Diploma Pathway",
          desc: "Concurrent US High School diploma alongside local curricula, unlocking international higher education."
        },
        {
          title: "Youth Well-being & Anti-Bullying",
          desc: "Safe, supportive micro-school spaces that restore academic confidence and emotional safety."
        },
        {
          title: "Life Skills & Leadership (Ages 10–18)",
          desc: "Structured developmental continuum across 4 core stages: Seedling, Explorer, Builder, and Launch."
        }
      ]
    },
    statusBadge: {
      es: "Active Network · Inscripción Abierta Internacional",
      en: "Active Network · Open International Enrollment"
    },
    tags: ["Dual Diploma", "Youth Well-Being", "US Accreditation", "Global Pathways"]
  }
];

function renderCommunityHubs(containerId, locale) {
  const container = document.getElementById(containerId);
  if (!container || !window.communityHubsData) return;
  const lang = (locale === 'es' || locale === 'en') ? locale : 'en';

  const html = window.communityHubsData.map(hub => {
    const title = hub.title[lang] || hub.title.en;
    const locBadge = hub.locationBadge[lang] || hub.locationBadge.en;
    const status = hub.statusBadge[lang] || hub.statusBadge.en;
    const context = hub.context[lang] || hub.context.en;
    const caption = hub.image.caption[lang] || hub.image.caption.en;
    const solutions = hub.solutions[lang] || hub.solutions.en;

    const solutionsHtml = solutions.map(s => `
      <li style="margin-bottom: 8px;">
        <strong style="color: #1a3a5c;">${s.title}:</strong> ${s.desc}
      </li>
    `).join('');

    const tagsHtml = hub.tags.map(t => `
      <span style="display:inline-block; margin-right:6px; margin-bottom:6px; background:#f1f5f9; color:#475569; font-size:0.75rem; padding:3px 8px; border-radius:4px; font-weight:600;">#${t}</span>
    `).join('');

    return `
      <article class="card feature-card hub-item-card" style="display: flex; flex-direction: column; height: 100%; border-top: 4px solid ${hub.regionCode === 'PA-PAN' ? '#3A7D2C' : (hub.regionCode === 'PA-COC' ? '#C9A84C' : '#1e437f')}; box-shadow: 0 10px 30px rgba(0,0,0,0.06); padding: 24px; border-radius: 14px; background: #ffffff;">
        <div style="position: relative; margin-bottom: 14px; overflow: hidden; border-radius: 10px; height: 200px; background: #e2e8f0;">
          <img 
            src="${hub.image.url}" 
            alt="${hub.image.alt}" 
            loading="lazy" 
            decoding="async" 
            onerror="this.onerror=null;this.src='${hub.image.fallbackUrl}';" 
            style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .3s ease;" 
            onmouseover="this.style.transform='scale(1.03)'" 
            onmouseout="this.style.transform='scale(1.0)'"
          />
          <span style="position: absolute; top: 10px; left: 10px; background: rgba(19,42,79,0.85); backdrop-filter: blur(4px); color: #ffffff; font-size: 0.72rem; padding: 4px 10px; border-radius: 4px; font-weight: 600;">
            📍 ${locBadge}
          </span>
        </div>
        
        <div style="margin-bottom: 10px;">
          <span class="badge" style="display:inline-block; margin-bottom: 8px; background:#e2f0d9; color:#276a3c; font-size:0.75rem; padding:3px 10px; border-radius:4px; font-weight:700; text-transform: uppercase;">
            ${status}
          </span>
          <h3 style="color: #1a3a5c; font-size: 1.25rem; font-family: 'Playfair Display', Georgia, serif; line-height: 1.35; margin: 6px 0 12px;">
            ${title}
          </h3>
        </div>

        <p style="font-size: 0.92rem; line-height: 1.6; color: #374151; margin-bottom: 14px;">
          ${context}
        </p>

        <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid #e2e8f0;">
          <h4 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px; color: #1a3a5c; margin-bottom: 8px; font-weight: 700;">
            ${lang === 'es' ? 'Solución del Hub y Pilares Misionales:' : 'The Hub Solution & Strategic Pillars:'}
          </h4>
          <ul style="margin: 0 0 16px 18px; font-size: 0.88rem; line-height: 1.5; color: #4b5563;">
            ${solutionsHtml}
          </ul>
          <div style="margin-top: 10px;">
            ${tagsHtml}
          </div>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = html;
}

window.renderCommunityHubs = renderCommunityHubs;
