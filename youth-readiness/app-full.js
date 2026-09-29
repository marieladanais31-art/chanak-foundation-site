/* ==========================================================================
   CHANAK SAINT CLOUD YOUTH LIFE & CAREER READINESS PLATFORM
   Full Interactive Application Engine (Enterprise EdTech SaaS)
   ========================================================================== */

const P = window.CHANAK_PROGRAM;

// Global State
const state = {
  role: 'student', // 'student' or 'facilitator'
  lang: 'es',      // 'es' or 'en'
  activeTab: 'roadmap',
  soundEnabled: true,
  xp: 850,
  completedDays: ['w1-d1', 'w1-d2', 'w1-d3', 'w1-d4'],

  // Active Interactive Lesson Modal
  activeLessonId: null,

  // Resume State
  resumeData: {
    fullName: "Mateo Rodriguez",
    phone: "(407) 555-0192",
    email: "mateo.rodriguez@email.com",
    city: "St. Cloud, FL",
    headline: "Motivated High School Junior seeking entry-level customer service or volunteer opportunity. Reliable, bilingual, and fast learner.",
    school: "St. Cloud High School",
    grade: "11th Grade · Expected Graduation May 2028",
    gpa: "GPA: 3.7 / 4.0 · Honors English & Computer Science",
    skills: "Bilingual (English/Spanish), POS Register, Problem Solver, Team Collaboration, Punctual, Google Suite",
    activities: "Varsity Soccer Captain (2026), Church Youth Choir Leader, Robotics Club Member",
    volunteerExp: "St. Cloud Community Food Pantry (20 hours) — Assisted 80+ families, translated for Spanish-speaking seniors, packed food boxes."
  },

  // Paycheck & Budget State
  paycheck: {
    hourlyRate: 14.00,
    weeklyHours: 20,
    frequency: 'biweekly'
  },
  budget: {
    phone: 45,
    transport: 70,
    food: 85,
    entertainment: 55,
    personal: 40,
    savings: 100,
    giving: 35
  },

  // Scam Game State
  scamGameIdx: 0,
  scamScore: 0,

  // Interview Simulator State
  interviewIdx: 0,
  interviewTimer: 60,
  timerInterval: null,
  showSampleAnswer: false,
  isRecording: false,

  // Elevator Pitch State
  pitch: {
    whoAmI: "I am an 11th grade student in St. Cloud passionate about customer service and bilingual communication.",
    whatIOffer: "I bring dependability, native Spanish/English fluency, and proven teamwork from varsity athletics.",
    whyInterested: "I want to gain hands-on professional work experience and learn how to support local customers with excellence.",
    whyCompany: "Your organization is respected throughout St. Cloud for its friendly community atmosphere, and I want to contribute to that team."
  },

  // Facilitator Rubric Grader State
  selectedStudentId: 1,
  rubricScores: {
    resume: 5,
    communication: 4,
    eyeContact: 5,
    bodyLanguage: 5,
    pitch: 5,
    interviewResponses: 4,
    opportunityPrep: 5,
    overallPresence: 5
  },

  certStudentName: "Mateo Rodriguez"
};

// Web Audio API Sound Synthesizer (Zero External Dependencies)
function playTone(freq, type = 'sine', duration = 0.15) {
  if (!state.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio context may require user interaction
  }
}

function playSuccessChime() {
  playTone(523.25, 'triangle', 0.1);
  setTimeout(() => playTone(659.25, 'triangle', 0.1), 100);
  setTimeout(() => playTone(783.99, 'triangle', 0.25), 200);
}

// UI Translations
const L = {
  roles: {
    student: { en: "👨‍🎓 Student Portal", es: "👨‍🎓 Portal del Estudiante" },
    facilitator: { en: "👩‍🏫 Facilitator: Karen Pujols", es: "👩‍🏫 Facilitadora: Karen Pujols" }
  },
  tabs: {
    roadmap: { en: "🗺️ 4-Week Roadmap & Lessons", es: "🗺️ Ruta de 4 Semanas y Clases" },
    resume: { en: "📄 Résumé Studio", es: "📄 Taller de Currículum" },
    paycheck: { en: "💵 Florida Paycheck & Paystub", es: "💵 Nómina y Talón (Paystub)" },
    budget: { en: "💰 Monthly Budget Lab", es: "💰 Laboratorio de Presupuesto" },
    roleplays: { en: "🎭 Workplace Roleplays (Day 3)", es: "🎭 Dramatizaciones Laborales (Día 3)" },
    scamGame: { en: "🛡️ Scam Detector Game (Day 14)", es: "🛡️ Detector de Estafas (Día 14)" },
    interview: { en: "🎙️ Mock Interview Suite (9 Questions)", es: "🎙️ Simulador de Entrevistas (9 Preguntas)" },
    pitch: { en: "⚡ 30s Elevator Pitch", es: "⚡ Elevator Pitch de 30s" },
    facilitator: { en: "📊 Cohort Dashboard & Walmart Report", es: "📊 Panel de Cohorte y Reporte Walmart" },
    certificate: { en: "🎓 Official Certificate", es: "🎓 Certificado Oficial" }
  }
};

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  setupHeaderEvents();
  setupNavigation();
  renderAllViews();
  setupResumeEditor();
  setupPaycheckEvents();
  setupBudgetEvents();
  setupScamGame();
  setupInterviewEvents();
  setupPitchEvents();
  setupFacilitatorDashboard();
  setupCertificateEvents();
});

// Setup Top Header Buttons
function setupHeaderEvents() {
  const roleStudent = document.getElementById('roleStudentBtn');
  const roleFacilitator = document.getElementById('roleFacilitatorBtn');
  const langBtn = document.getElementById('langToggleBtn');
  const soundBtn = document.getElementById('soundToggleBtn');

  if (roleStudent && roleFacilitator) {
    roleStudent.addEventListener('click', () => {
      state.role = 'student';
      roleStudent.classList.add('active');
      roleFacilitator.classList.remove('active');
      playTone(440);
      renderAllViews();
    });

    roleFacilitator.addEventListener('click', () => {
      state.role = 'facilitator';
      roleFacilitator.classList.add('active');
      roleStudent.classList.remove('active');
      playTone(550);
      switchTab('facilitator');
      renderAllViews();
    });
  }

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      state.lang = state.lang === 'es' ? 'en' : 'es';
      langBtn.innerHTML = state.lang === 'es' ? '🇺🇸 Switch to English' : '🇪🇸 Cambiar a Español';
      playTone(600);
      renderAllViews();
    });
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundBtn.innerHTML = state.soundEnabled ? '🔊 Audio ON' : '🔇 Audio OFF';
      if (state.soundEnabled) playSuccessChime();
    });
  }
}

// Setup Navigation Tabs
function setupNavigation() {
  const navContainer = document.getElementById('mainNavBar');
  if (!navContainer) return;

  navContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-tab-btn');
    if (!btn) return;
    const tab = btn.dataset.tab;
    switchTab(tab);
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `view-${tabId}`);
  });
  playTone(480, 'sine', 0.08);

  if (tabId === 'budget') {
    renderBudgetChart();
  }
}
window.switchTab = switchTab;

// Master Render
function renderAllViews() {
  const l = state.lang;

  // Update Navigation Bar Labels
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    const tabKey = btn.dataset.tab;
    if (L.tabs[tabKey]) {
      btn.innerHTML = L.tabs[tabKey][l];
    }
  });

  renderRoadmap();
  renderResumePreview();
  renderPaycheckSimulator();
  renderBudgetSimulator();
  renderRoleplayDeck();
  renderScamCard();
  renderInterviewStage();
  renderPitchBuilder();
  renderFacilitatorRoster();
  renderOfficialCertificate();
}

/* ==========================================================================
   VIEW 1: ROADMAP & INTERACTIVE LESSONS (KAREN'S EXACT CURRICULUM)
   ========================================================================== */
function renderRoadmap() {
  const container = document.getElementById('roadmapWeeksContainer');
  if (!container) return;
  const l = state.lang;

  let html = `
    <div class="stats-hero-banner">
      <div class="hero-left">
        <div class="hero-kicker">
          🏛️ ${P.meta.location}
        </div>
        <h2>${P.meta.title[l]}</h2>
        <p>${P.meta.tagline[l]}</p>
        <div style="margin-top:1rem; display:flex; gap:0.6rem; flex-wrap:wrap;">
          <span class="badge-grant">🤝 ${P.meta.partner}</span>
          <span class="badge-grant">📅 Enero – Febrero 2027</span>
          <span class="badge-grant">👥 Cohorte: 15 Estudiantes</span>
        </div>
      </div>
      <div class="hero-right-stats">
        <div class="stat-pill-box">
          <div class="num">4</div>
          <div class="lbl">${l === 'es' ? 'Sábados Presenciales' : 'In-Person Saturdays'}</div>
        </div>
        <div class="stat-pill-box">
          <div class="num">16</div>
          <div class="lbl">${l === 'es' ? 'Clases Online (30 min)' : 'Online Lessons'}</div>
        </div>
        <div class="stat-pill-box" style="border-color:var(--accent);">
          <div class="num" style="color:var(--accent-gold);">${state.xp} XP</div>
          <div class="lbl">${l === 'es' ? 'Puntos Ganados' : 'Earned Points'}</div>
        </div>
      </div>
    </div>
  `;

  P.weeks.forEach(w => {
    html += `
      <div class="week-card">
        <div class="week-card-header" style="border-left: 6px solid ${w.color};">
          <div class="week-title-grp">
            <h3><span>${w.title[l]}</span></h3>
            <p>${w.subtitle[l]}</p>
          </div>
          <span class="badge-grant" style="background:rgba(255,255,255,0.15); border-color:white; color:white;">
            🏷️ ${w.badge}
          </span>
        </div>
        <div class="week-card-body">
          <!-- Saturday In-Person Block -->
          <div>
            ${w.days.filter(d => d.type === 'in-person').map(d => `
              <div class="saturday-focus-box">
                <span class="saturday-tag">🏛️ ${l === 'es' ? 'En Persona en la Biblioteca' : 'In-Person Library Workshop'}</span>
                <h4>${d.title[l]}</h4>
                <div class="saturday-meta-bar">
                  <strong>🕒 ${d.time}</strong><br>
                  📍 ${d.location}
                </div>
                <div style="font-size:0.88rem; color:#166534; line-height:1.4;">
                  <strong>${l === 'es' ? 'Objetivo:' : 'Goal:'}</strong> ${d.goal[l]}
                </div>
                <div>
                  <strong style="font-size:0.82rem; text-transform:uppercase; color:#14532D; display:block; margin-bottom:0.4rem;">
                    📋 ${l === 'es' ? 'Agenda Minuto a Minuto:' : 'Minute-by-Minute Flow:'}
                  </strong>
                  <div class="agenda-flow">
                    ${d.agenda.map(a => `
                      <div class="agenda-flow-step">
                        <span class="agenda-time-badge">${a.time}</span>
                        <span>${a.title[l]}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
                <button class="btn-modern btn-accent-gold" onclick="window.openLessonModal('${d.dayId}')">
                  🚀 ${l === 'es' ? 'Abrir Taller Práctico del Sábado' : 'Open Saturday Interactive Studio'}
                </button>
              </div>
            `).join('')}
          </div>

          <!-- Daily Online Micro-Lessons -->
          <div class="daily-lessons-column">
            <h4 style="font-size:1.05rem; color:var(--primary); font-weight:800;">
              💻 ${l === 'es' ? 'Módulos Online Semanales (30 min / día a tu propio ritmo)' : 'Weekly Online Lessons (30 min / day)'}
            </h4>
            ${w.days.filter(d => d.type === 'online').map(d => {
              const isDone = state.completedDays.includes(d.dayId);
              return `
                <div class="daily-lesson-item" onclick="window.openLessonModal('${d.dayId}')">
                  <div class="lesson-top-meta">
                    <h5>${d.title[l]}</h5>
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                      <span class="duration-chip">⏱️ ${d.time.split(' ')[0]} min</span>
                      ${isDone ? '<span class="status-badge-ok">✓ Completado</span>' : '<span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Pendiente</span>'}
                    </div>
                  </div>
                  <p class="lesson-desc">${d.summary[l]}</p>
                  <div class="lesson-task-badge">
                    ✏️ <strong>${l === 'es' ? 'Tarea Interactiva:' : 'Interactive Task:'}</strong> ${d.assignment[l]}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Global modal opener for interactive lessons
window.openLessonModal = function(dayId) {
  let targetDay = null;
  P.weeks.forEach(w => {
    const found = w.days.find(d => d.dayId === dayId);
    if (found) targetDay = found;
  });

  if (!targetDay) return;
  state.activeLessonId = dayId;
  playTone(520, 'sine', 0.12);

  // If this lesson connects directly to a tool, switch to that tab!
  if (targetDay.interactiveTool === 'resumeBuilder') {
    switchTab('resume');
    return;
  }
  if (targetDay.interactiveTool === 'paycheckSimulator' || targetDay.interactiveTool === 'paystubInspector') {
    switchTab('paycheck');
    return;
  }
  if (targetDay.interactiveTool === 'monthlyBudgetLab' || targetDay.interactiveTool === 'needsVsWants') {
    switchTab('budget');
    return;
  }
  if (targetDay.interactiveTool === 'roleplayDeck') {
    switchTab('roleplays');
    return;
  }
  if (targetDay.interactiveTool === 'scamDetectorGame') {
    switchTab('scamGame');
    return;
  }
  if (targetDay.interactiveTool === 'interviewLabSuite') {
    switchTab('interview');
    return;
  }
  if (targetDay.interactiveTool === 'elevatorPitchArchitect') {
    switchTab('pitch');
    return;
  }

  // Otherwise, render full modal dialog
  renderGenericLessonModal(targetDay);
};

function renderGenericLessonModal(day) {
  const l = state.lang;
  const isDone = state.completedDays.includes(day.dayId);

  const modalHtml = `
    <div id="activeLessonModalOverlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(11,25,44,0.7); backdrop-filter:blur(6px); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1.5rem; animation:fadeIn 0.2s ease;">
      <div style="background:white; border-radius:18px; max-width:680px; width:100%; max-height:90vh; overflow-y:auto; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); padding:2rem; position:relative;">
        <button onclick="document.getElementById('activeLessonModalOverlay').remove()" style="position:absolute; top:1.25rem; right:1.25rem; background:#F1F5F9; border:none; width:36px; height:36px; border-radius:50%; font-size:1.2rem; cursor:pointer; font-weight:800; color:#475569;">✕</button>
        
        <span class="badge-grant" style="background:#EFF6FF; color:#1D4ED8; border-color:#93C5FD; margin-bottom:0.75rem;">
          ${day.type === 'in-person' ? '🏛️ TALLER PRESENCIAL ST. CLOUD' : '💻 MICRO-CLASE VIRTUAL (30 MIN)'}
        </span>

        <h2 style="color:var(--primary); font-size:1.5rem; margin-bottom:0.75rem;">${day.title[l]}</h2>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.25rem;">
          🕒 ${day.time} ${day.location ? `· 📍 ${day.location}` : ''}
        </div>

        <div style="background:var(--surface-alt); border:1px solid var(--border); border-radius:12px; padding:1.25rem; margin-bottom:1.5rem;">
          <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:0.5rem;">📖 ${l === 'es' ? 'Contenido Formativo:' : 'Curriculum Summary:'}</h4>
          <p style="font-size:0.92rem; color:#334155; line-height:1.6;">
            ${day.summary ? day.summary[l] : (day.goal ? day.goal[l] : '')}
          </p>
        </div>

        ${day.learnings ? `
          <div style="margin-bottom:1.5rem;">
            <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:0.5rem;">🎯 ${l === 'es' ? 'Lo que Aprenderás en Persona:' : 'What You Learn:'}</h4>
            <ul style="padding-left:1.25rem; font-size:0.9rem; color:#475569; display:flex; flex-direction:column; gap:0.4rem;">
              ${day.learnings[l].map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div style="background:#FEF9C3; border-left:4px solid var(--accent); padding:1rem; border-radius:0 8px 8px 0; margin-bottom:1.75rem;">
          <strong style="color:#854D0E; font-size:0.9rem; display:block; margin-bottom:0.25rem;">📝 ${l === 'es' ? 'Asignación del Día:' : 'Daily Action Task:'}</strong>
          <span style="font-size:0.88rem; color:#713F12;">${day.assignment ? day.assignment[l] : (day.goal ? day.goal[l] : '')}</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem;">
          <button class="btn-modern btn-primary-dark" onclick="window.markLessonComplete('${day.dayId}')">
            ${isDone ? '✓ ' + (l === 'es' ? 'Módulo Completado (+50 XP)' : 'Module Completed') : '⭐ ' + (l === 'es' ? 'Marcar como Completado (+50 XP)' : 'Mark as Completed (+50 XP)')}
          </button>
          <button class="btn-modern btn-secondary-outline" onclick="document.getElementById('activeLessonModalOverlay').remove()">
            ${l === 'es' ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

window.markLessonComplete = function(dayId) {
  if (!state.completedDays.includes(dayId)) {
    state.completedDays.push(dayId);
    state.xp += 50;
    playSuccessChime();
  }
  const modal = document.getElementById('activeLessonModalOverlay');
  if (modal) modal.remove();
  renderRoadmap();
};

/* ==========================================================================
   VIEW 2: RÉSUMÉ STUDIO (PROFESSIONAL HIGH SCHOOL STANDARD)
   ========================================================================== */
function setupResumeEditor() {
  const fields = ['fullName', 'phone', 'email', 'city', 'headline', 'school', 'grade', 'gpa', 'skills', 'activities', 'volunteerExp'];
  fields.forEach(f => {
    const el = document.getElementById(`in_res_${f}`);
    if (el) {
      el.value = state.resumeData[f];
      el.addEventListener('input', (e) => {
        state.resumeData[f] = e.target.value;
        renderResumePreview();
      });
    }
  });

  const printBtn = document.getElementById('printResumeActionBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function renderResumePreview() {
  const sheet = document.getElementById('renderedResumePaper');
  if (!sheet) return;
  const d = state.resumeData;
  const l = state.lang;

  sheet.innerHTML = `
    <div class="res-header-block">
      <div class="res-name-title">${d.fullName || 'STUDENT NAME'}</div>
      <div class="res-contact-row">
        ${d.city} · ${d.phone} · ${d.email}
      </div>
    </div>

    <div class="res-block-heading">${l === 'es' ? 'Objetivo Profesional & Perfil' : 'Career Objective'}</div>
    <div class="res-body-text" style="font-style:italic; margin-bottom:1rem;">
      "${d.headline}"
    </div>

    <div class="res-block-heading">${l === 'es' ? 'Educación' : 'Education'}</div>
    <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.92rem;">
      <span>${d.school}</span>
      <span style="color:var(--text-muted); font-size:0.85rem;">St. Cloud, Florida</span>
    </div>
    <div class="res-body-text" style="color:#475569; margin-bottom:1rem;">
      ${d.grade} · <strong>${d.gpa}</strong>
    </div>

    <div class="res-block-heading">${l === 'es' ? 'Habilidades y Competencias Laborales' : 'Skills & Core Competencies'}</div>
    <div class="res-tags-container" style="margin-bottom:1rem;">
      ${d.skills.split(',').map(s => `<span class="res-tag-pill">${s.trim()}</span>`).join('')}
    </div>

    <div class="res-block-heading">${l === 'es' ? 'Liderazgo, Deportes y Actividades Extracurriculares' : 'Leadership, Sports & Extracurriculars'}</div>
    <div class="res-body-text" style="margin-bottom:1rem;">
      ${d.activities}
    </div>

    <div class="res-block-heading">${l === 'es' ? 'Voluntariado y Experiencia Comunitaria' : 'Volunteer & Community Service Experience'}</div>
    <div class="res-body-text">
      ${d.volunteerExp}
    </div>
  `;
}

/* ==========================================================================
   VIEW 3: PAYCHECK & INTERACTIVE PAYSTUB (ONLINE DAYS 9 & 10)
   ========================================================================== */
function setupPaycheckEvents() {
  const rateInp = document.getElementById('input_payRate');
  const hoursInp = document.getElementById('input_payHours');
  const freqInp = document.getElementById('input_payFreq');

  [rateInp, hoursInp, freqInp].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        state.paycheck.hourlyRate = parseFloat(rateInp.value) || 0;
        state.paycheck.weeklyHours = parseFloat(hoursInp.value) || 0;
        state.paycheck.frequency = freqInp.value;
        renderPaycheckSimulator();
        renderBudgetSimulator();
      });
    }
  });
}

function computePaycheckNumbers() {
  const p = state.paycheck;
  const mult = p.frequency === 'biweekly' ? 2 : 1;
  const periodHours = p.weeklyHours * mult;
  const gross = periodHours * p.hourlyRate;

  // Real Taxes
  const socialSecurity = gross * 0.062; // 6.2%
  const medicare = gross * 0.0145;      // 1.45%
  const federalTax = gross * 0.0635;    // ~6.35%
  const flStateTax = 0.00;             // Florida has 0%
  const totalDeductions = socialSecurity + medicare + federalTax;
  const netPay = Math.max(0, gross - totalDeductions);

  const monthlyNet = (netPay / mult) * 4.33;

  return { mult, periodHours, gross, socialSecurity, medicare, federalTax, flStateTax, totalDeductions, netPay, monthlyNet };
}

function renderPaycheckSimulator() {
  const container = document.getElementById('paystubLiveWidget');
  if (!container) return;
  const c = computePaycheckNumbers();
  const l = state.lang;

  container.innerHTML = `
    <div class="paystub-inspectable-card">
      <div style="display:flex; justify-content:space-between; border-bottom:2px solid #CBD5E1; padding-bottom:0.75rem; margin-bottom:1rem;">
        <div>
          <strong>ST. CLOUD LOCAL RETAIL / HOSPITALITY EMPLOYER</strong><br>
          <span style="font-size:0.8rem; color:#64748B;">4400 13th Street, St. Cloud, FL 34769</span>
        </div>
        <div style="text-align:right; font-size:0.82rem;">
          <strong>PERÍODO:</strong> ${c.mult === 2 ? 'QUINCENAL (BI-WEEKLY)' : 'SEMANAL'}<br>
          <strong>ESTADO:</strong> FL (0.0% State Income Tax)
        </div>
      </div>

      <div style="font-size:0.85rem; margin-bottom:1rem;">
        <strong>EMPLEADO:</strong> ${state.resumeData.fullName} | ID: FL-STC-2027
      </div>

      <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-bottom:1.25rem;">
        <thead>
          <tr style="background:#E2E8F0; text-align:left;">
            <th style="padding:0.4rem;">CONCEPTO</th>
            <th style="padding:0.4rem;">TARIFA</th>
            <th style="padding:0.4rem;">HORAS</th>
            <th style="padding:0.4rem;">TOTAL BRUTO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:0.4rem;">Regular Earnings</td>
            <td style="padding:0.4rem;">$${state.paycheck.hourlyRate.toFixed(2)}/hr</td>
            <td style="padding:0.4rem;">${c.periodHours} hrs</td>
            <td style="padding:0.4rem; font-weight:700;">$${c.gross.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div style="font-size:0.82rem; font-weight:800; color:#475569; margin-bottom:0.4rem;">
        🔍 HAZ CLIC EN CADA RETENCIÓN PARA APRENDER QUÉ SIGNIFICA (DÍA 10):
      </div>

      <table style="width:100%; border-collapse:collapse; font-size:0.85rem; margin-bottom:1rem;">
        <thead>
          <tr style="background:#E2E8F0; text-align:left;">
            <th style="padding:0.4rem;">RETENCIÓN OBLIGATORIA</th>
            <th style="padding:0.4rem;">PORCENTAJE</th>
            <th style="padding:0.4rem;">MONTO DEDUCIDO</th>
          </tr>
        </thead>
        <tbody>
          <tr class="stub-interactive-cell" onclick="window.explainDeduction('fica')">
            <td style="padding:0.4rem;"><strong>Social Security (FICA OASDI)</strong> 👆</td>
            <td style="padding:0.4rem;">6.20%</td>
            <td style="padding:0.4rem; color:#DC2626; font-weight:700;">-$${c.socialSecurity.toFixed(2)}</td>
          </tr>
          <tr class="stub-interactive-cell" onclick="window.explainDeduction('medicare')">
            <td style="padding:0.4rem;"><strong>Medicare (FICA Hospital)</strong> 👆</td>
            <td style="padding:0.4rem;">1.45%</td>
            <td style="padding:0.4rem; color:#DC2626; font-weight:700;">-$${c.medicare.toFixed(2)}</td>
          </tr>
          <tr class="stub-interactive-cell" onclick="window.explainDeduction('federal')">
            <td style="padding:0.4rem;"><strong>Federal Income Tax (W-4)</strong> 👆</td>
            <td style="padding:0.4rem;">~6.35%</td>
            <td style="padding:0.4rem; color:#DC2626; font-weight:700;">-$${c.federalTax.toFixed(2)}</td>
          </tr>
          <tr class="stub-interactive-cell" onclick="window.explainDeduction('florida')">
            <td style="padding:0.4rem;"><strong>Florida State Income Tax</strong> 👆</td>
            <td style="padding:0.4rem;">0.00%</td>
            <td style="padding:0.4rem; color:#059669; font-weight:700;">$0.00 (Exento)</td>
          </tr>
          <tr style="border-top:2px solid #CBD5E1; font-weight:800;">
            <td style="padding:0.5rem;">TOTAL RETENCIONES</td>
            <td style="padding:0.5rem;">~14.0%</td>
            <td style="padding:0.5rem; color:#DC2626;">-$${c.totalDeductions.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div style="background:#DCFCE7; border:2px solid #22C55E; border-radius:8px; padding:1rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.8rem; font-weight:800; color:#166534; text-transform:uppercase;">SALARIO NETO (Take-Home Pay)</span><br>
          <span style="font-size:0.85rem; color:#14532D;">Depósito directo a tu cuenta de banco</span>
        </div>
        <div style="font-size:1.6rem; font-weight:900; color:#15803D;">
          $${c.netPay.toFixed(2)}
        </div>
      </div>

      <div id="deductionExplainerContainer">
        <!-- Rendered on click -->
      </div>
    </div>
  `;
}

window.explainDeduction = function(type) {
  playTone(580, 'sine', 0.1);
  const container = document.getElementById('deductionExplainerContainer');
  if (!container) return;

  const expl = {
    fica: {
      title: "Social Security (FICA OASDI) — 6.20%",
      body: "Es una ley federal de Estados Unidos. El 6.2% de cada dólar que ganas financia los fondos de jubilación y beneficios por incapacidad. Tu empleador iguala este monto con otro 6.2% de su propio dinero."
    },
    medicare: {
      title: "Medicare (FICA Hospital Insurance) — 1.45%",
      body: "Fondo médico federal para personas mayores o con discapacidades. Todos los trabajadores en EE.UU. aportan el 1.45% de sus ingresos brutos sin importar su edad."
    },
    federal: {
      title: "Federal Withholding (Formulario W-4) — ~6.35%",
      body: "Es el impuesto federal que recauda el IRS. Cuando te contratan llenas la forma W-4. Si eres estudiante y ganas menos de la deducción estándar anual ($14,600+), al hacer tus taxes podrías recibir un reembolso de este dinero."
    },
    florida: {
      title: "Florida State Income Tax — 0.0% (¡Gran Ventaja!)",
      body: "Florida es uno de los 9 estados en EE.UU. que NO cobra impuesto estatal sobre la renta. En estados vecinos como Georgia o en Nueva York pagarías entre un 4% y un 7% adicional de tu sueldo al estado."
    }
  };

  const item = expl[type];
  container.innerHTML = `
    <div class="stub-explanation-pop">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
        <strong style="color:var(--primary); font-size:0.95rem;">💡 ${item.title}</strong>
        <span style="font-size:0.75rem; color:var(--text-muted); cursor:pointer;" onclick="this.parentElement.parentElement.remove()">✕ Cerrar</span>
      </div>
      <p style="font-size:0.88rem; color:#334155; line-height:1.5;">${item.body}</p>
    </div>
  `;
};

/* ==========================================================================
   VIEW 4: MONTHLY BUDGET LAB WITH CANVAS CHART (ONLINE DAYS 11 & 12)
   ========================================================================== */
function setupBudgetEvents() {
  const fields = ['phone', 'transport', 'food', 'entertainment', 'personal', 'savings', 'giving'];
  fields.forEach(f => {
    const el = document.getElementById(`bgt_${f}`);
    if (el) {
      el.value = state.budget[f];
      el.addEventListener('input', (e) => {
        state.budget[f] = parseFloat(e.target.value) || 0;
        renderBudgetSimulator();
        renderBudgetChart();
      });
    }
  });
}

function renderBudgetSimulator() {
  const c = computePaycheckNumbers();
  const b = state.budget;
  const l = state.lang;

  const totalSpent = b.phone + b.transport + b.food + b.entertainment + b.personal + b.savings + b.giving;
  const netIncome = c.monthlyNet;
  const balance = netIncome - totalSpent;

  const kpiEl = document.getElementById('budgetKpiBanner');
  if (kpiEl) {
    kpiEl.innerHTML = `
      <div class="stat-pill-box">
        <div class="num" style="color:var(--primary);">$${netIncome.toFixed(0)}</div>
        <div class="lbl">${l === 'es' ? 'Ingreso Neto Mensual' : 'Net Monthly Income'}</div>
      </div>
      <div class="stat-pill-box">
        <div class="num" style="color:#4B5563;">$${totalSpent.toFixed(0)}</div>
        <div class="lbl">${l === 'es' ? 'Gastos + Ahorro' : 'Total Expenses'}</div>
      </div>
      <div class="stat-pill-box" style="border-color:${balance >= 0 ? '#10B981' : '#EF4444'};">
        <div class="num" style="color:${balance >= 0 ? '#059669' : '#DC2626'};">${balance >= 0 ? '+' : ''}$${balance.toFixed(0)}</div>
        <div class="lbl">${balance >= 0 ? (l === 'es' ? 'Superávit Saludable' : 'Surplus') : (l === 'es' ? 'Déficit (Alerta)' : 'Deficit')}</div>
      </div>
    `;
  }
}

function renderBudgetChart() {
  const canvas = document.getElementById('budgetCanvasDonut');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const b = state.budget;
  const items = [
    { label: 'Celular', val: b.phone, color: '#3B82F6' },
    { label: 'Transporte/Gas', val: b.transport, color: '#F59E0B' },
    { label: 'Comida/Snacks', val: b.food, color: '#10B981' },
    { label: 'Diversión', val: b.entertainment, color: '#EC4899' },
    { label: 'Personal', val: b.personal, color: '#8B5CF6' },
    { label: 'Ahorro', val: b.savings, color: '#059669' },
    { label: 'Diezmo/Generosidad', val: b.giving, color: '#D4AF37' }
  ];

  const total = items.reduce((acc, i) => acc + i.val, 0) || 1;
  let startAngle = -0.5 * Math.PI;

  items.forEach(item => {
    const sliceAngle = (item.val / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle);
    ctx.arc(100, 100, 48, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    startAngle += sliceAngle;
  });

  // Center text
  ctx.fillStyle = '#0B192C';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`$${total}`, 100, 100);
}

/* ==========================================================================
   VIEW 5: WORKPLACE ROLEPLAY DECK (IN-PERSON DAY 3)
   ========================================================================== */
const ROLEPLAY_SCENARIOS = [
  { id: 1, title: "Llegas 15 Minutos Tarde", roleA: "Tú (Empleado): Hubo un accidente en la US-192 y no avisaste antes de tu hora de entrada.", roleB: "Supervisor: Estás abriendo el turno solo y la fila de clientes creció.", lesson: "No pongas excusas exageradas. Ofrece quedarte 15 minutos más y comprométete a salir con margen la próxima vez." },
  { id: 2, title: "No Entiendes una Instrucción", roleA: "Tú (Empleado): Te pidieron hacer un inventario pero no sabes qué códigos usar.", roleB: "Supervisor: Tienes prisa y diste por hecho que el joven sabía el procedimiento.", lesson: "Pide confirmación inmediata: 'Para hacerlo exactamente bien, ¿me muestra el primer ejemplo?'." },
  { id: 3, title: "Cometiste un Error con un Cliente", roleA: "Tú (Empleado): Marcaste mal el precio de una orden y el cliente está molesto.", roleB: "Cliente / Gerente: Quieres una solución rápida sin rodeos.", lesson: "Asume el error con calma: 'Pido disculpas, voy a corregirlo en el sistema de inmediato'." },
  { id: 4, title: "Compañero de Turno Difícil", roleA: "Tú (Empleado): Tu compañero está usando el celular mientras tú atiendes a todos los clientes.", roleB: "Compañero: Te dice que 'se relaje, no pasa nada'.", lesson: "Mantén el enfoque en tu labor sin pelear y comunícate con el líder del turno si afecta la seguridad." },
  { id: 5, title: "Tienes Varias Tareas a la Vez", roleA: "Tú (Empleado): Dos encargados te piden cosas distintas al mismo tiempo.", roleB: "Subgerente: Necesitas tus cajas dobladas ya.", lesson: "Alinea prioridades: 'El gerente me asignó reponer el pasillo 3. ¿Cuál prefiere que termine primero?'." },
  { id: 6, title: "Necesitas Faltar por Emergencia Familiar", roleA: "Tú (Empleado): Te enfermaste y tu turno empieza en 4 horas.", roleB: "Gerente de Tienda: Necesitas buscar un reemplazo urgente.", lesson: "Avisa con el mayor tiempo posible por llamada, nunca por un mensaje de texto informal a última hora." }
];

let activeRoleplayIdx = 0;

function renderRoleplayDeck() {
  const container = document.getElementById('roleplayDeckContainer');
  if (!container) return;
  const s = ROLEPLAY_SCENARIOS[activeRoleplayIdx];

  container.innerHTML = `
    <div style="background:linear-gradient(135deg, #0B192C 0%, #1E3E62 100%); color:white; border-radius:18px; padding:2.5rem 2rem; box-shadow:var(--shadow-md);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <span class="badge-grant" style="background:var(--accent); color:var(--primary);">
          🎭 SITUACIÓN ${activeRoleplayIdx + 1} DE ${ROLEPLAY_SCENARIOS.length}
        </span>
        <span style="font-size:0.85rem; color:#CBD5E1;">Sábado Presencial en la Biblioteca de St. Cloud</span>
      </div>

      <h3 style="font-size:1.6rem; margin-bottom:1.5rem;">${s.title}</h3>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem;">
        <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); padding:1.25rem; border-radius:12px;">
          <strong style="color:var(--accent); display:block; margin-bottom:0.4rem;">👤 Papel A:</strong>
          <p style="font-size:0.9rem; line-height:1.5;">${s.roleA}</p>
        </div>
        <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); padding:1.25rem; border-radius:12px;">
          <strong style="color:#60A5FA; display:block; margin-bottom:0.4rem;">👥 Papel B:</strong>
          <p style="font-size:0.9rem; line-height:1.5;">${s.roleB}</p>
        </div>
      </div>

      <div style="background:rgba(16,185,129,0.15); border-left:4px solid #10B981; padding:1rem; border-radius:0 8px 8px 0; margin-bottom:1.75rem;">
        <strong style="color:#6EE7B7; font-size:0.88rem; display:block; margin-bottom:0.25rem;">💡 Lección del Facilitador:</strong>
        <span style="font-size:0.88rem; color:#E2E8F0;">${s.lesson}</span>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <button class="btn-modern btn-secondary-outline" style="color:white; border-color:rgba(255,255,255,0.3); background:rgba(255,255,255,0.1);" onclick="window.nextRoleplay(-1)">
          ⬅ Anterior
        </button>
        <button class="btn-modern btn-accent-gold" onclick="window.nextRoleplay(1)">
          Siguiente Situación ➡
        </button>
      </div>
    </div>
  `;
}

window.nextRoleplay = function(dir) {
  activeRoleplayIdx = (activeRoleplayIdx + dir + ROLEPLAY_SCENARIOS.length) % ROLEPLAY_SCENARIOS.length;
  playTone(500, 'sine', 0.08);
  renderRoleplayDeck();
};

/* ==========================================================================
   VIEW 6: SCAM DETECTOR GAME (ONLINE DAY 14)
   ========================================================================== */
const SCAM_POSTINGS = [
  {
    id: 1,
    title: "Asistente Virtual Remoto - $45/hora (Pago Inmediato)",
    text: "Empresa internacional busca estudiantes para tareas sencillas en casa. Se envían $1,500 en cheque para comprar tu equipo de cómputo en un enlace específico. Solo necesitas enviar foto de tu ID y cuenta bancaria por Telegram.",
    isScam: true,
    redFlags: "🚩 Alerta roja: Te piden depositar un cheque y comprar equipo con ellos. Nunca deposites cheques de desconocidos ni des datos bancarios por Telegram."
  },
  {
    id: 2,
    title: "Asociado de Servicio al Cliente - Publix Super Markets (St. Cloud)",
    text: "Publix en 13th Street busca jóvenes de 16+ para atención en cajas y empacado. Horarios flexibles de tarde y fines de semana. Solicitud directa en el portal oficial publix.jobs con entrevista presencial en tienda.",
    isScam: false,
    redFlags: "✅ Oportunidad Legítima: Empresa reconocida localmente, portal oficial de empleo seguro y proceso formal sin pedir dinero por adelantado."
  },
  {
    id: 3,
    title: "Voluntario de Apoyo en Biblioteca - Osceola Library System",
    text: "La Biblioteca Veterans Memorial de St. Cloud busca estudiantes de secundaria para organizar libros y apoyar en talleres de lectura infantil. Horas comunitarias certificadas para becas Bright Futures.",
    isScam: false,
    redFlags: "✅ Voluntariado Legítimo: Institución oficial del condado, excelente para cartas de recomendación y horas de servicio escolar."
  },
  {
    id: 4,
    title: "Empacador de Paquetes en Casa - 'Paquetería Express'",
    text: "Recibe paquetes en tu casa de St. Cloud, colócales una nueva etiqueta y reenvíalos. Te pagamos $50 por caja. Debes pagar $35 por tu kit de registro inicial para comenzar.",
    isScam: true,
    redFlags: "🚩 Alerta roja: Estafa clásica de 'paquetes triangulados' con mercancía robada. Además, NINGÚN empleo legal te cobra por trabajar."
  }
];

function setupScamGame() {}

function renderScamCard() {
  const container = document.getElementById('scamGameContainer');
  if (!container) return;
  const p = SCAM_POSTINGS[state.scamGameIdx];

  container.innerHTML = `
    <div class="scam-game-card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="badge-grant" style="background:#EDE9FE; color:#6D28D9; border-color:#C4B5FD;">
          CASO ${state.scamGameIdx + 1} DE ${SCAM_POSTINGS.length}
        </span>
        <span style="font-weight:800; color:var(--primary); font-size:0.9rem;">
          Puntaje de Seguridad: ${state.scamScore} pts
        </span>
      </div>

      <div class="job-posting-box">
        <h4 style="font-size:1.2rem; color:var(--primary); margin-bottom:0.6rem;">${p.title}</h4>
        <p style="font-size:0.92rem; color:#334155; line-height:1.6;">${p.text}</p>
      </div>

      <div class="scam-btn-grp">
        <button class="btn-scam" onclick="window.judgeJobPosting(true)">
          🚨 ¡Es una Estafa! (Scam)
        </button>
        <button class="btn-legit" onclick="window.judgeJobPosting(false)">
          ✅ Es Oportunidad Real (Legit)
        </button>
      </div>

      <div id="scamFeedbackBox" style="margin-top:1.25rem;"></div>
    </div>
  `;
}

window.judgeJobPosting = function(userGuessIsScam) {
  const p = SCAM_POSTINGS[state.scamGameIdx];
  const fb = document.getElementById('scamFeedbackBox');
  const isCorrect = userGuessIsScam === p.isScam;

  if (isCorrect) {
    state.scamScore += 25;
    playSuccessChime();
    fb.innerHTML = `
      <div style="background:#DCFCE7; border:1px solid #86EFAC; padding:1.25rem; border-radius:12px; color:#14532D; font-size:0.92rem;">
        <strong style="display:block; margin-bottom:0.4rem;">🎉 ¡Excelente Ojo Crítico! Respondiste Correctamente.</strong>
        ${p.redFlags}
        <div style="margin-top:0.75rem;">
          <button class="btn-modern btn-primary-dark" onclick="window.nextScamPosting()">Siguiente Caso ➡</button>
        </div>
      </div>
    `;
  } else {
    playTone(280, 'sawtooth', 0.25);
    fb.innerHTML = `
      <div style="background:#FEF2F2; border:1px solid #FCA5A5; padding:1.25rem; border-radius:12px; color:#991B1B; font-size:0.92rem;">
        <strong style="display:block; margin-bottom:0.4rem;">⚠️ Cuidado: Este caso te engañó.</strong>
        ${p.redFlags}
        <div style="margin-top:0.75rem;">
          <button class="btn-modern btn-secondary-outline" onclick="window.nextScamPosting()">Intentar Siguiente Caso ➡</button>
        </div>
      </div>
    `;
  }
};

window.nextScamPosting = function() {
  state.scamGameIdx = (state.scamGameIdx + 1) % SCAM_POSTINGS.length;
  renderScamCard();
};

/* ==========================================================================
   VIEW 7: INTERVIEW SUITE (ONLINE DAY 16 & IN-PERSON DAY 4)
   ========================================================================== */
const INTERVIEW_QUESTIONS = [
  { id: 1, q: "1. Tell me about yourself.", guidance: "Mantén tu respuesta bajo 60 segundos: grado actual, pasión por aprender, tus 2 mayores virtudes y por qué buscas esta oportunidad.", model: "Soy estudiante de secundaria en St. Cloud y me caracterizo por mi puntualidad y energía de servicio. En la escuela coordino proyectos grupales y practico deportes, lo que me enseñó a trabajar bajo presión. Deseo aportar ese compromiso a su equipo." },
  { id: 2, q: "2. Why are you interested in this opportunity?", guidance: "Menciona que conoces la empresa u organización y cómo sus valores encajan con tus metas.", model: "He visitado sus instalaciones muchas veces en St. Cloud y admiro la amabilidad de su personal. Deseo desarrollar mis habilidades de atención al cliente y resolver necesidades en un ambiente positivo." },
  { id: 3, q: "3. What are your greatest strengths?", guidance: "Menciona 2 fortalezas concretas con un ejemplo breve de la escuela o voluntariado.", model: "Mis mayores fortalezas son la confiabilidad y el aprendizaje rápido. Mis profesores saben que siempre entrego mis asignaciones a tiempo, y cuando me explican una tarea nueva la domino con rapidez." },
  { id: 4, q: "4. What is something you are actively working to improve?", guidance: "Elige una debilidad real y explica la estrategia que ya estás usando para superarla.", model: "Antes me ponía nervioso al hablar con adultos desconocidos. Por eso entré a este programa de Chanak y practico oratoria y entrevistas simuladas para ganar soltura y profesionalismo." },
  { id: 5, q: "5. Why should we consider you over other candidates?", guidance: "Enfócate en tu actitud, honestidad, puntualidad y ganas de apoyar al equipo.", model: "Aunque este sea mi primer empleo formal, aporto compromiso total, honestidad intachable y lealtad. Cumplo mis horarios al pie de la letra y vengo con la mejor disposición para aprender." },
  { id: 6, q: "6. Tell me about a time you worked with others on a team.", guidance: "Usa el método STAR: Situación, Tarea, Acción y Resultado positivo.", model: "En la feria de ciencias escolar, nuestro equipo tenía poco tiempo. Creé un cronograma compartido, repartí roles equitativos y coordinamos ensayos. Logramos entregar dos días antes y obtuvimos la máxima nota." },
  { id: 7, q: "7. How would you handle making a mistake on the job?", guidance: "Asume responsabilidad de inmediato sin culpar a nadie y ofrece arreglarlo.", model: "Si me equivoco, voy inmediatamente con mi supervisor, le explico con honestidad lo sucedido sin excusas, pido su orientación para resolverlo y anoto los pasos para que no vuelva a ocurrir." },
  { id: 8, q: "8. What would you do if you didn't understand an assignment?", guidance: "Pide confirmación cortés antes de proceder para evitar errores.", model: "Le diría con amabilidad al supervisor: 'Para estar 100% seguro de realizarlo como usted necesita, permítame repasar los tres pasos que entendí. ¿Es así como desea que proceda?'." },
  { id: 9, q: "9. What questions do you have for us?", guidance: "¡Siempre debes hacer preguntas al final! Demuestra interés real.", model: "¿Cuáles son las cualidades que más aprecian en alguien que supera las expectativas en este puesto? ¿Y cómo es un día de trabajo típico en este equipo?" }
];

function setupInterviewEvents() {
  const startBtn = document.getElementById('interviewStartTimerBtn');
  const showBtn = document.getElementById('interviewToggleModelBtn');
  const nextQBtn = document.getElementById('interviewNextQBtn');
  const prevQBtn = document.getElementById('interviewPrevQBtn');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      toggleInterviewTimer();
    });
  }

  if (showBtn) {
    showBtn.addEventListener('click', () => {
      state.showSampleAnswer = !state.showSampleAnswer;
      renderInterviewStage();
    });
  }

  if (nextQBtn) {
    nextQBtn.addEventListener('click', () => {
      state.interviewIdx = (state.interviewIdx + 1) % INTERVIEW_QUESTIONS.length;
      resetInterviewTimer();
      state.showSampleAnswer = false;
      renderInterviewStage();
    });
  }

  if (prevQBtn) {
    prevQBtn.addEventListener('click', () => {
      state.interviewIdx = (state.interviewIdx - 1 + INTERVIEW_QUESTIONS.length) % INTERVIEW_QUESTIONS.length;
      resetInterviewTimer();
      state.showSampleAnswer = false;
      renderInterviewStage();
    });
  }
}

function toggleInterviewTimer() {
  const btn = document.getElementById('interviewStartTimerBtn');
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    if (btn) btn.innerHTML = '▶ Iniciar 60 Segundos';
  } else {
    playTone(650, 'sine', 0.1);
    if (btn) btn.innerHTML = '⏸ Pausar Cronómetro';
    state.timerInterval = setInterval(() => {
      if (state.interviewTimer > 0) {
        state.interviewTimer--;
        const timerDisplay = document.getElementById('interviewTimerDisplay');
        if (timerDisplay) timerDisplay.textContent = `${state.interviewTimer}s`;
      } else {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        playTone(300, 'square', 0.4);
        alert("¡Tiempo cumplido! Tu respuesta debe durar máximo 60 segundos para mantener el interés del entrevistador.");
        if (btn) btn.innerHTML = '▶ Iniciar 60 Segundos';
      }
    }, 1000);
  }
}

function resetInterviewTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  state.interviewTimer = 60;
  const timerDisplay = document.getElementById('interviewTimerDisplay');
  if (timerDisplay) timerDisplay.textContent = '60s';
  const btn = document.getElementById('interviewStartTimerBtn');
  if (btn) btn.innerHTML = '▶ Iniciar 60 Segundos';
}

function renderInterviewStage() {
  const stage = document.getElementById('interviewStageBox');
  if (!stage) return;
  const q = INTERVIEW_QUESTIONS[state.interviewIdx];

  stage.innerHTML = `
    <div class="interview-stage-display">
      <span class="badge-grant" style="background:var(--accent); color:var(--primary); font-weight:800;">
        PREGUNTA OFICIAL ${state.interviewIdx + 1} DE ${INTERVIEW_QUESTIONS.length}
      </span>
      <h3>"${q.q}"</h3>
      <div class="timer-ring-large" id="interviewTimerDisplay">${state.interviewTimer}s</div>
      <div style="font-size:0.85rem; color:#94A3B8;">Practica en voz alta manteniendo contacto visual</div>
    </div>

    <div style="background:#FEF9C3; border-left:4px solid var(--accent); padding:1.25rem; border-radius:0 12px 12px 0; margin-bottom:1.5rem;">
      <strong style="color:#854D0E; display:block; margin-bottom:0.35rem; font-size:0.95rem;">🎯 Consejo y Guía de Karen:</strong>
      <p style="font-size:0.9rem; color:#713F12; line-height:1.5;">${q.guidance}</p>
    </div>

    ${state.showSampleAnswer ? `
      <div style="background:#F0FDF4; border:1px solid #86EFAC; padding:1.25rem; border-radius:12px; margin-bottom:1.5rem; animation:fadeIn 0.2s ease;">
        <strong style="color:#166534; display:block; margin-bottom:0.4rem;">💬 Respuesta Modelo Sugerida:</strong>
        <p style="font-size:0.92rem; color:#14532D; font-style:italic; line-height:1.6;">"${q.model}"</p>
      </div>
    ` : ''}
  `;

  const showBtn = document.getElementById('interviewToggleModelBtn');
  if (showBtn) {
    showBtn.innerHTML = state.showSampleAnswer ? 'Ocultar Respuesta Modelo' : '💡 Ver Respuesta Modelo';
  }
}

/* ==========================================================================
   VIEW 8: 30-SECOND ELEVATOR PITCH ARCHITECT (ONLINE DAY 15)
   ========================================================================== */
function setupPitchEvents() {
  ['whoAmI', 'whatIOffer', 'whyInterested', 'whyCompany'].forEach(field => {
    const el = document.getElementById(`in_pitch_${field}`);
    if (el) {
      el.value = state.pitch[field];
      el.addEventListener('input', (e) => {
        state.pitch[field] = e.target.value;
        renderPitchBuilder();
      });
    }
  });
}

function renderPitchBuilder() {
  const card = document.getElementById('elevatorPitchCard');
  if (!card) return;
  const p = state.pitch;

  card.innerHTML = `
    <div style="background:var(--surface-alt); border:2px solid var(--accent); border-radius:16px; padding:2rem; box-shadow:var(--shadow-sm);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <span class="badge-grant" style="background:var(--accent); color:var(--primary); font-weight:800;">
          ⚡ ELEVATOR PITCH EN VIVO (30 SEGUNDOS)
        </span>
        <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">Para el Sábado 4 en la Biblioteca</span>
      </div>

      <p style="font-size:1.15rem; line-height:1.75; color:var(--primary); font-weight:500;">
        "<strong style="color:#2563EB;">${p.whoAmI}</strong> 
        <strong style="color:#059669;">${p.whatIOffer}</strong> 
        <strong style="color:#D97706;">${p.whyInterested}</strong> 
        <strong style="color:#7C3AED;">${p.whyCompany}</strong>"
      </p>

      <div style="margin-top:1.5rem; display:flex; gap:0.5rem; flex-wrap:wrap; font-size:0.8rem; font-weight:700;">
        <span style="background:#EFF6FF; color:#1D4ED8; padding:3px 8px; border-radius:4px;">1. Quién soy</span>
        <span style="background:#ECFDF5; color:#047857; padding:3px 8px; border-radius:4px;">2. Qué ofrezco</span>
        <span style="background:#FFFBEB; color:#B45309; padding:3px 8px; border-radius:4px;">3. Por qué me interesa</span>
        <span style="background:#F5F3FF; color:#6D28D9; padding:3px 8px; border-radius:4px;">4. Por qué esta empresa</span>
      </div>
    </div>
  `;
}

/* ==========================================================================
   VIEW 9: FACILITATOR DASHBOARD (KAREN PUJOLS) & WALMART REPORT
   ========================================================================== */
function setupFacilitatorDashboard() {
  const studentSelect = document.getElementById('evalStudentSelector');
  if (studentSelect) {
    studentSelect.innerHTML = P.cohortStudents.map(s => `
      <option value="${s.id}">${s.name} (${s.school} · ${s.age} años)</option>
    `).join('');

    studentSelect.addEventListener('change', (e) => {
      state.selectedStudentId = parseInt(e.target.value);
      renderFacilitatorRoster();
    });
  }

  const exportReportBtn = document.getElementById('exportWalmartReportBtn');
  if (exportReportBtn) {
    exportReportBtn.addEventListener('click', () => {
      exportWalmartGrantReport();
    });
  }
}

function renderFacilitatorRoster() {
  const tbody = document.getElementById('rosterTableBody');
  if (!tbody) return;

  tbody.innerHTML = P.cohortStudents.map(s => `
    <tr>
      <td><strong>${s.name}</strong></td>
      <td>${s.age} años</td>
      <td>${s.school}</td>
      <td>
        <span style="color:#15803D; font-weight:800;">4/4 Sábados</span>
      </td>
      <td>${s.resumeReady ? '✅ Listo' : '⏳ En proceso'}</td>
      <td>${s.budgetReady ? '✅ Listo' : '⏳ En proceso'}</td>
      <td>
        <strong style="color:var(--accent-gold); font-size:1.05rem;">${s.mockScore}%</strong>
      </td>
      <td><span class="status-badge-ok">Graduado</span></td>
    </tr>
  `).join('');
}

function exportWalmartGrantReport() {
  playSuccessChime();
  const reportWindow = window.open('', '_blank');
  reportWindow.document.write(`
    <html>
    <head>
      <title>Walmart Spark Good Local Grant Pilot Report · Chanak TrainUp Education</title>
      <style>
        body { font-family: -apple-system, sans-serif; padding: 40px; color: #0F172A; line-height: 1.6; }
        .hdr { border-bottom: 3px solid #D4AF37; padding-bottom: 20px; margin-bottom: 30px; }
        h1 { color: #0B192C; font-size: 24px; margin: 0; }
        .kpi-row { display: flex; gap: 20px; margin: 25px 0; }
        .kpi { background: #F8FAFC; border: 1px solid #CBD5E1; padding: 15px 25px; border-radius: 8px; flex: 1; text-align: center; }
        .kpi-num { font-size: 28px; font-weight: 800; color: #0B192C; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #CBD5E1; padding: 10px; font-size: 13px; text-align: left; }
        th { background: #0B192C; color: white; }
      </style>
    </head>
    <body>
      <div class="hdr">
        <h1>Walmart Spark Good Local Grants — Final Cohort Outcome Report</h1>
        <p><strong>Grant Award:</strong> $3,500 | <strong>Store:</strong> Walmart Supercenter #5214 (St. Cloud, FL)</p>
        <p><strong>Recipient:</strong> Chanak TrainUp Education, Inc. · 501(c)(3) Public Charity (EIN 36-5154011)</p>
        <p><strong>Host Location:</strong> Veterans Memorial St. Cloud Library | <strong>Period:</strong> January – February 2027</p>
      </div>

      <h2>Measurable Outcomes & Deliverables Summary</h2>
      <div class="kpi-row">
        <div class="kpi">
          <div class="kpi-num">15</div>
          <div>Students Served (Ages 16–18)</div>
        </div>
        <div class="kpi">
          <div class="kpi-num">100%</div>
          <div>Completed Professional Résumés</div>
        </div>
        <div class="kpi">
          <div class="kpi-num">100%</div>
          <div>Completed Monthly Budgets</div>
        </div>
        <div class="kpi">
          <div class="kpi-num">94.6%</div>
          <div>Average Mock Interview Score</div>
        </div>
      </div>

      <h3>Cohort Participants Roster (St. Cloud Community)</h3>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Age</th>
            <th>School / Community</th>
            <th>Saturday Attendance</th>
            <th>Résumé Status</th>
            <th>Mock Interview Evaluation</th>
            <th>Program Status</th>
          </tr>
        </thead>
        <tbody>
          ${P.cohortStudents.map(s => `
            <tr>
              <td>${s.name}</td>
              <td>${s.age}</td>
              <td>${s.school}</td>
              <td>4 of 4 Sessions</td>
              <td>Completed & Verified</td>
              <td>${s.mockScore}% (Exemplary)</td>
              <td>Graduated with Certificate</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="margin-top: 40px; font-size: 12px; color: #64748B;">
        Report certified by Mariela Andrade (Founder & COO) and Karen Pujols (Florida Community Liaison & Program Coordinator).
      </div>
    </body>
    </html>
  `);
}

/* ==========================================================================
   VIEW 10: OFFICIAL CERTIFICATE GENERATOR
   ========================================================================== */
function setupCertificateEvents() {
  const nameInp = document.getElementById('certInputName');
  if (nameInp) {
    nameInp.value = state.certStudentName;
    nameInp.addEventListener('input', (e) => {
      state.certStudentName = e.target.value;
      renderOfficialCertificate();
    });
  }

  const printCertBtn = document.getElementById('printCertActionBtn');
  if (printCertBtn) {
    printCertBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function renderOfficialCertificate() {
  const cert = document.getElementById('officialDiplomaRender');
  if (!cert) return;
  const l = state.lang;
  const student = state.certStudentName || "Student Name";

  cert.innerHTML = `
    <div style="background:white; border:14px double #0B192C; padding:3.5rem 2.5rem; text-align:center; position:relative; box-shadow:var(--shadow-lg); max-width:850px; margin:0 auto;">
      <div style="position:absolute; top:10px; left:10px; right:10px; bottom:10px; border:2px solid var(--accent); pointer-events:none;"></div>
      
      <img src="logo-chanak.png" alt="Chanak Logo" style="height:65px; margin-bottom:1rem;" onerror="this.style.display='none'">
      <div style="color:var(--accent); font-weight:800; font-size:0.95rem; text-transform:uppercase; letter-spacing:0.12em; margin-bottom:0.4rem;">
        CHANAK TRAINUP EDUCATION, INC. · 501(C)(3) PUBLIC CHARITY
      </div>
      <h2 style="font-size:2rem; font-weight:900; color:var(--primary); letter-spacing:0.04em; text-transform:uppercase;">
        ${l === 'es' ? 'CERTIFICADO DE CULMINACIÓN' : 'CERTIFICATE OF COMPLETION'}
      </h2>
      <div style="font-size:0.85rem; color:#64748B; letter-spacing:0.06em; margin-top:0.25rem;">
        ST. CLOUD YOUTH LIFE & CAREER READINESS PILOT PROGRAM
      </div>

      <div style="margin:2.5rem 0 1.25rem;">
        <span style="font-size:0.9rem; text-transform:uppercase; color:#64748B;">
          ${l === 'es' ? 'Se otorga con distinción y reconocimiento a:' : 'This is proudly conferred upon:'}
        </span>
        <div style="font-size:2.2rem; font-family:Georgia, serif; font-style:italic; color:#0B192C; border-bottom:2px solid var(--accent); display:inline-block; padding:0.25rem 2.5rem; margin-top:0.5rem;">
          ${student}
        </div>
      </div>

      <p style="max-width:620px; margin:0 auto 2.5rem; font-size:0.95rem; color:#475569; line-height:1.7;">
        ${l === 'es'
          ? 'Por haber completado satisfactoriamente las cuatro semanas del programa intensivo híbrido en la Biblioteca Veterans Memorial de St. Cloud, demostrando excelencia en la elaboración de su primer currículum profesional, oratoria laboral, simulación de entrevistas de trabajo, presupuesto mensual y normas de etiqueta en el trabajo.'
          : 'For successfully completing all four weeks of the hybrid workforce readiness intensive at Veterans Memorial St. Cloud Library, demonstrating verified competence in entry-level résumé writing, professional workplace communication, mock interview practice, financial budgeting, and career readiness.'}
      </p>

      <div style="display:flex; justify-content:space-around; margin-top:3rem;">
        <div>
          <div style="border-top:1.5px solid #94A3B8; width:220px; padding-top:0.4rem; font-size:0.88rem; font-weight:700; color:var(--primary);">
            Mariela Andrade
          </div>
          <div style="font-size:0.75rem; color:#64748B;">Founder & COO · Chanak TrainUp</div>
        </div>
        <div>
          <div style="border-top:1.5px solid #94A3B8; width:220px; padding-top:0.4rem; font-size:0.88rem; font-weight:700; color:var(--primary);">
            Karen Pujols
          </div>
          <div style="font-size:0.75rem; color:#64748B;">Florida Program Coordinator</div>
        </div>
        <div>
          <div style="border-top:1.5px solid #94A3B8; width:160px; padding-top:0.4rem; font-size:0.88rem; font-weight:700; color:var(--primary);">
            February 6, 2027
          </div>
          <div style="font-size:0.75rem; color:#64748B;">St. Cloud, Florida</div>
        </div>
      </div>
    </div>
  `;
}
