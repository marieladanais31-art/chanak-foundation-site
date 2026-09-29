import { PROGRAM_INFO, CURRICULUM_WEEKS, MOCK_INTERVIEW_QUESTIONS } from './curriculum-data.js';

// Application State
const state = {
  lang: 'es', // default to Spanish as user requested
  activeTab: 'curriculum',
  interviewIdx: 0,
  timerSeconds: 60,
  timerInterval: null,
  showAnswer: false,
  resumeData: {
    fullName: "Mateo Rodriguez",
    phone: "(407) 555-0192",
    email: "mateo.rodriguez@email.com",
    city: "St. Cloud, FL",
    headline: "Motivated High School Junior seeking first customer service or volunteer opportunity",
    educationSchool: "St. Cloud High School",
    educationGrade: "11th Grade · Expected Graduation May 2028",
    educationGpa: "GPA: 3.6 / 4.0 · Honors English & Computer Science",
    skills: "Bilingual (English/Spanish), Punctual, Fast Learner, POS Cash Handling, Teamwork, Google Docs/Sheets",
    activities: "Varsity Soccer Team (Captain 2026), Church Youth Choir Leader, Coding Club Member",
    volunteerExp: "St. Cloud Community Food Pantry (15 hours) — Organized grocery boxes, assisted elderly patrons with translation and cart loading."
  },
  budgetData: {
    hourlyRate: 14.00,
    hoursWeek: 20,
    payFrequency: 'biweekly',
    phoneExp: 45,
    transportExp: 70,
    foodExp: 90,
    entertainmentExp: 60,
    personalExp: 40,
    savingsExp: 100,
    givingExp: 40
  },
  pitchData: {
    whoAmI: "I am a high school junior in St. Cloud passionate about customer service and bilingual communication.",
    whatIOffer: "I bring strong teamwork skills, dependability, and native fluency in both English and Spanish.",
    whyInterested: "I want to gain hands-on professional work experience and learn how to support customers effectively.",
    whyCompany: "Your team is known across St. Cloud for exceptional service, and I want to contribute to that reputation."
  },
  certStudentName: "Mateo Rodriguez"
};

// UI Translations Dictionary
const UI_TEXT = {
  headerTitle: {
    en: "Chanak Youth Life & Career Readiness",
    es: "Chanak Preparación Laboral y de Vida Juvenil"
  },
  headerSubtitle: {
    en: "St. Cloud Community Youth Pilot · Hybrid 2027",
    es: "Piloto Juvenil Comunitario St. Cloud · Híbrido 2027"
  },
  tabs: {
    curriculum: { en: "📚 Curriculum & Lessons", es: "📚 Currículum y Clases" },
    resume: { en: "📄 Résumé Builder", es: "📄 Creador de Currículum" },
    paycheck: { en: "💵 Paycheck & Paystub", es: "💵 Nómina y Talón (Paystub)" },
    budget: { en: "💰 Monthly Budget", es: "💰 Presupuesto Mensual" },
    interview: { en: "🎙️ Interview Lab & Pitch", es: "🎙️ Simulador de Entrevista" },
    libraryGuide: { en: "🏛️ St. Cloud Library Days", es: "🏛️ Guía Sábados Presenciales" },
    certificate: { en: "🎓 Certificate", es: "🎓 Certificado Oficial" }
  },
  hero: {
    heading: {
      en: "Preparing High School Students for Their First Job & Independence",
      es: "Preparando a Jóvenes de Secundaria para su Primer Empleo e Independencia"
    },
    subtext: {
      en: "A 4-week hybrid experience: 4 Saturdays in person at Veterans Memorial St. Cloud Library + 30-minute daily weekday online modules.",
      es: "Experiencia híbrida de 4 semanas: 4 sábados presenciales en la Biblioteca Veterans Memorial de St. Cloud + módulos diarios de 30 minutos online."
    },
    grantBadge: {
      en: "Walmart Spark Good Grant Initiative · Supercenter #5214",
      es: "Iniciativa Walmart Spark Good Grant · Supercenter #5214"
    },
    cohortBadge: {
      en: "Cohort: 15 High School Students (Ages 16–18)",
      es: "Cohorte: 15 Jóvenes de High School (16–18 Años)"
    },
    locationBadge: {
      en: "Veterans Memorial St. Cloud Library",
      es: "Biblioteca Veterans Memorial de St. Cloud"
    }
  }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupLanguageToggle();
  setupNavigationTabs();
  renderAllViews();
  setupResumeListeners();
  setupPaycheckBudgetListeners();
  setupInterviewListeners();
  setupCertificateListeners();
});

// Setup Language Toggle
function setupLanguageToggle() {
  const btn = document.getElementById('langToggleBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    state.lang = state.lang === 'es' ? 'en' : 'es';
    btn.innerHTML = state.lang === 'es' ? '🇺🇸 Switch to English' : '🇪🇸 Cambiar a Español';
    renderAllViews();
  });
}

// Setup Navigation Tabs
function setupNavigationTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeTab = tab.dataset.tab;
      document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
      const activeSection = document.getElementById(`view-${state.activeTab}`);
      if (activeSection) activeSection.classList.add('active');
    });
  });
}

// Render All Views
function renderAllViews() {
  const l = state.lang;
  // Update header text
  const appHeaderTitle = document.getElementById('appHeaderTitle');
  const appHeaderSubtitle = document.getElementById('appHeaderSubtitle');
  if (appHeaderTitle) appHeaderTitle.textContent = UI_TEXT.headerTitle[l];
  if (appHeaderSubtitle) appHeaderSubtitle.textContent = UI_TEXT.headerSubtitle[l];

  // Update nav tabs text
  document.querySelectorAll('.nav-tab').forEach(tab => {
    const key = tab.dataset.tab;
    if (UI_TEXT.tabs[key]) {
      tab.innerHTML = UI_TEXT.tabs[key][l];
    }
  });

  // Render Views
  renderCurriculumView();
  renderResumeView();
  renderPaycheckView();
  renderBudgetView();
  renderInterviewView();
  renderLibraryGuideView();
  renderCertificateView();
}

/* ==========================================================================
   VIEW 1: CURRICULUM & TIMELINE
   ========================================================================== */
function renderCurriculumView() {
  const container = document.getElementById('curriculumWeeksContainer');
  if (!container) return;
  const l = state.lang;

  let html = `
    <div class="program-hero">
      <div class="hero-text">
        <h2>${UI_TEXT.hero.heading[l]}</h2>
        <p>${UI_TEXT.hero.subtext[l]}</p>
        <div class="hero-meta-badges">
          <span class="meta-pill highlight">✨ ${UI_TEXT.hero.cohortBadge[l]}</span>
          <span class="meta-pill">🏛️ ${UI_TEXT.hero.locationBadge[l]}</span>
          <span class="meta-pill">🤝 ${UI_TEXT.hero.grantBadge[l]}</span>
        </div>
      </div>
    </div>
  `;

  CURRICULUM_WEEKS.forEach(w => {
    html += `
      <div class="week-block">
        <div class="week-header">
          <h3>
            <span>Semana ${w.weekNumber} · Week ${w.weekNumber}</span> — ${w.theme[l]}
          </h3>
          <span class="badge-tag">${w.onlineDays.length} Clases Online (30 min) + 1 Sábado Presencial</span>
        </div>
        <div class="week-content">
          <!-- In-person library block -->
          <div class="library-card">
            <span class="card-kicker">🏛️ ${l === 'es' ? 'Sábado en la Biblioteca de St. Cloud' : 'Saturday at St. Cloud Library'}</span>
            <h4>${w.inPersonSession.title[l]}</h4>
            <div class="library-meta">
              <strong>🕒 ${w.inPersonSession.time}</strong><br>
              📍 ${w.inPersonSession.place}
            </div>
            <p style="font-size:0.88rem; color:#15803D;"><strong>${l === 'es' ? 'Objetivo:' : 'Goal:'}</strong> ${w.inPersonSession.focus[l]}</p>
            <ul class="agenda-list">
              ${w.inPersonSession.agenda.map(item => `
                <li class="agenda-item">
                  <span class="agenda-time">${item.time}</span>
                  <span>${item.act[l]}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Online Daily Lessons Column -->
          <div class="online-modules-col">
            <h4 style="color:var(--primary); font-size:1rem; margin-bottom:0.25rem;">
              💻 ${l === 'es' ? 'Clases Virtuales Diarias (30 minutos a tu propio ritmo)' : 'Daily Online Modules (30 mins at your own pace)'}
            </h4>
            ${w.onlineDays.map(m => `
              <div class="online-module-card">
                <div class="module-header">
                  <h5>${m.title[l]}</h5>
                  <span class="module-duration">⏱️ ${m.duration}</span>
                </div>
                <div class="module-summary">${m.summary[l]}</div>
                <div class="module-takeaway">💡 <strong>${l === 'es' ? 'Concepto Clave:' : 'Key Takeaway:'}</strong> ${m.keyTakeaway[l]}</div>
                <div class="module-assignment">📝 <strong>${l === 'es' ? 'Asignación:' : 'Assignment:'}</strong> ${m.assignment[l]}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/* ==========================================================================
   VIEW 2: INTERACTIVE RÉSUMÉ BUILDER
   ========================================================================== */
function setupResumeListeners() {
  const fields = ['fullName', 'phone', 'email', 'city', 'headline', 'educationSchool', 'educationGrade', 'educationGpa', 'skills', 'activities', 'volunteerExp'];
  fields.forEach(field => {
    const input = document.getElementById(`resInput_${field}`);
    if (input) {
      input.value = state.resumeData[field];
      input.addEventListener('input', (e) => {
        state.resumeData[field] = e.target.value;
        renderResumeView();
      });
    }
  });

  const printBtn = document.getElementById('printResumeBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function renderResumeView() {
  const preview = document.getElementById('liveResumeSheet');
  if (!preview) return;
  const l = state.lang;
  const d = state.resumeData;

  preview.innerHTML = `
    <div class="resume-header">
      <div class="resume-name">${d.fullName || 'YOUR NAME'}</div>
      <div class="resume-contact">
        ${d.city} · ${d.phone} · ${d.email}
      </div>
    </div>

    <div class="resume-section">
      <div class="resume-section-title">${l === 'es' ? 'Perfil y Objetivo Profesional' : 'Professional Objective'}</div>
      <div class="resume-item-desc" style="font-size:0.92rem; font-style:italic;">
        "${d.headline}"
      </div>
    </div>

    <div class="resume-section">
      <div class="resume-section-title">${l === 'es' ? 'Educación y Logros Académicos' : 'Education & Academic Standing'}</div>
      <div class="resume-item">
        <div class="resume-item-header">
          <span>${d.educationSchool}</span>
          <span style="color:var(--text-muted); font-size:0.85rem;">St. Cloud, FL</span>
        </div>
        <div class="resume-item-desc">${d.educationGrade} · ${d.educationGpa}</div>
      </div>
    </div>

    <div class="resume-section">
      <div class="resume-section-title">${l === 'es' ? 'Habilidades y Competencias' : 'Skills & Competencies'}</div>
      <div class="resume-item-desc">
        ${d.skills.split(',').map(s => `<span style="display:inline-block; background:#F1F5F9; border:1px solid #CBD5E1; padding:2px 8px; border-radius:4px; margin:2px 4px 2px 0; font-weight:600; font-size:0.82rem;">${s.trim()}</span>`).join('')}
      </div>
    </div>

    <div class="resume-section">
      <div class="resume-section-title">${l === 'es' ? 'Actividades Extracurriculares, Deportes y Liderazgo' : 'Extracurriculars, Sports & Leadership'}</div>
      <div class="resume-item-desc">
        ${d.activities}
      </div>
    </div>

    <div class="resume-section">
      <div class="resume-section-title">${l === 'es' ? 'Experiencia de Voluntariado y Servicio Comunitario' : 'Volunteer Experience & Community Service'}</div>
      <div class="resume-item-desc">
        ${d.volunteerExp}
      </div>
    </div>
  `;
}

/* ==========================================================================
   VIEW 3: PAYCHECK & PAYSTUB SIMULATOR
   ========================================================================== */
function setupPaycheckBudgetListeners() {
  const rateInput = document.getElementById('payRate');
  const hoursInput = document.getElementById('payHours');
  const freqInput = document.getElementById('payFreq');

  [rateInput, hoursInput, freqInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        state.budgetData.hourlyRate = parseFloat(rateInput.value) || 0;
        state.budgetData.hoursWeek = parseFloat(hoursInput.value) || 0;
        state.budgetData.payFrequency = freqInput.value;
        renderPaycheckView();
        renderBudgetView();
      });
    }
  });

  const budgetFields = ['phoneExp', 'transportExp', 'foodExp', 'entertainmentExp', 'personalExp', 'savingsExp', 'givingExp'];
  budgetFields.forEach(bf => {
    const el = document.getElementById(`budget_${bf}`);
    if (el) {
      el.value = state.budgetData[bf];
      el.addEventListener('input', (e) => {
        state.budgetData[bf] = parseFloat(e.target.value) || 0;
        renderBudgetView();
      });
    }
  });
}

function calculatePaycheck() {
  const b = state.budgetData;
  const rate = b.hourlyRate;
  const hoursPerWeek = b.hoursWeek;
  const multiplier = b.payFrequency === 'biweekly' ? 2 : 1;

  const hoursWorked = hoursPerWeek * multiplier;
  const grossPay = hoursWorked * rate;

  // Taxes breakdown (Florida has 0% state income tax)
  const socialSecurity = grossPay * 0.062; // 6.2%
  const medicare = grossPay * 0.0145;      // 1.45%
  // Typical high school entry withholding approx 6.5% federal
  const federalTax = grossPay * 0.065;
  const totalDeductions = socialSecurity + medicare + federalTax;
  const netPay = Math.max(0, grossPay - totalDeductions);

  // Monthly estimate (4.33 weeks per month)
  const monthlyGross = (grossPay / multiplier) * 4.33;
  const monthlyNet = (netPay / multiplier) * 4.33;

  return {
    rate,
    hoursWorked,
    multiplier,
    grossPay,
    socialSecurity,
    medicare,
    federalTax,
    totalDeductions,
    netPay,
    monthlyGross,
    monthlyNet
  };
}

function renderPaycheckView() {
  const stubDisplay = document.getElementById('livePaystubDisplay');
  if (!stubDisplay) return;
  const l = state.lang;
  const calc = calculatePaycheck();

  stubDisplay.innerHTML = `
    <div class="paystub-card">
      <div class="paystub-header-row">
        <div>
          <strong>ST. CLOUD LOCAL EMPLOYER / RETAL PARTNER</strong><br>
          123 Commerce Way, St. Cloud, FL 34769
        </div>
        <div style="text-align:right;">
          <strong>${l === 'es' ? 'PERÍODO DE PAGO' : 'PAY PERIOD'}:</strong> BI-WEEKLY<br>
          <strong>${l === 'es' ? 'ESTADO' : 'STATE'}:</strong> FL (0.0% State Income Tax)
        </div>
      </div>

      <div style="margin-bottom:1rem; font-size:0.85rem;">
        <strong>${l === 'es' ? 'EMPLEADO' : 'EMPLOYEE'}:</strong> ${state.resumeData.fullName} | ID: HS-2027-015
      </div>

      <table class="paystub-table">
        <thead>
          <tr>
            <th>${l === 'es' ? 'CONCEPTO DE INGRESOS' : 'EARNINGS DESCRIPTION'}</th>
            <th>${l === 'es' ? 'TARIFA' : 'RATE'}</th>
            <th>${l === 'es' ? 'HORAS' : 'HOURS'}</th>
            <th>${l === 'es' ? 'TOTAL BRUTO' : 'GROSS TOTAL'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${l === 'es' ? 'Horas Regulares' : 'Regular Hourly Earnings'}</td>
            <td>$${calc.rate.toFixed(2)}/hr</td>
            <td>${calc.hoursWorked} hrs</td>
            <td>$${calc.grossPay.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <table class="paystub-table">
        <thead>
          <tr>
            <th>${l === 'es' ? 'RETENCIONES & DEDUCCIONES OBLIGATORIAS' : 'STATUTORY DEDUCTIONS'}</th>
            <th>% APLICADO</th>
            <th>${l === 'es' ? 'MONTO DEDUCIDO' : 'AMOUNT'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Social Security (FICA OASDI)</td>
            <td>6.20%</td>
            <td style="color:#DC2626;">-$${calc.socialSecurity.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Medicare (FICA Hospital Insurance)</td>
            <td>1.45%</td>
            <td style="color:#DC2626;">-$${calc.medicare.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Federal Withholding (IRS Form W-4)</td>
            <td>~6.50%</td>
            <td style="color:#DC2626;">-$${calc.federalTax.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Florida State Income Tax</td>
            <td>0.00%</td>
            <td>$0.00 (Exempt)</td>
          </tr>
          <tr style="border-top:1px solid #94A3B8; font-weight:700;">
            <td>${l === 'es' ? 'TOTAL DEDUCCIONES' : 'TOTAL DEDUCTIONS'}</td>
            <td>~14.15%</td>
            <td style="color:#DC2626;">-$${calc.totalDeductions.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div class="paystub-total-box">
        <span>${l === 'es' ? 'SALARIO NETO A DEPOSITAR (Take-Home Pay)' : 'NET PAY (Direct Deposit)'}:</span>
        <span style="color:#059669; font-size:1.3rem;">$${calc.netPay.toFixed(2)}</span>
      </div>

      <div style="margin-top:1rem; font-size:0.78rem; color:#475569;">
        ℹ️ <strong>${l === 'es' ? 'Lección Clave del Piloto:' : 'Core Pilot Lesson:'}</strong> ${l === 'es' 
          ? 'Nota que ganaste $' + calc.grossPay.toFixed(2) + ' en papel, pero recibes $' + calc.netPay.toFixed(2) + '. Esta diferencia es lo que aprenden en los Días 9 y 10 para evitar sorpresas.'
          : 'You earned $' + calc.grossPay.toFixed(2) + ' gross, but your actual take-home is $' + calc.netPay.toFixed(2) + '. This crucial insight is taught on Days 9 & 10 to avoid financial shock.'}
      </div>
    </div>
  `;
}

/* ==========================================================================
   VIEW 4: PERSONAL MONTHLY BUDGET
   ========================================================================== */
function renderBudgetView() {
  const calc = calculatePaycheck();
  const b = state.budgetData;
  const l = state.lang;

  const totalExpenses = b.phoneExp + b.transportExp + b.foodExp + b.entertainmentExp + b.personalExp + b.savingsExp + b.givingExp;
  const netMonthlyIncome = calc.monthlyNet;
  const netBalance = netMonthlyIncome - totalExpenses;

  const summaryGrid = document.getElementById('budgetKpiGrid');
  if (!summaryGrid) return;

  const isSurplus = netBalance >= 0;

  summaryGrid.innerHTML = `
    <div class="budget-kpi">
      <div class="budget-kpi-label">${l === 'es' ? 'Ingreso Neto Mensual' : 'Net Monthly Income'}</div>
      <div class="budget-kpi-val" style="color:var(--primary);">$${netMonthlyIncome.toFixed(0)}</div>
    </div>
    <div class="budget-kpi">
      <div class="budget-kpi-label">${l === 'es' ? 'Total Gastos y Ahorro' : 'Total Expenses & Savings'}</div>
      <div class="budget-kpi-val" style="color:#4B5563;">$${totalExpenses.toFixed(0)}</div>
    </div>
    <div class="budget-kpi ${isSurplus ? 'positive' : 'negative'}">
      <div class="budget-kpi-label">${l === 'es' ? 'Balance Mensual' : 'Monthly Cashflow'}</div>
      <div class="budget-kpi-val">${isSurplus ? '+' : ''}$${netBalance.toFixed(0)}</div>
    </div>
  `;

  const adviceBox = document.getElementById('budgetAdviceBox');
  if (adviceBox) {
    if (isSurplus) {
      adviceBox.innerHTML = `
        <div style="background:#ECFDF5; border:1px solid #6EE7B7; padding:1rem; border-radius:8px; color:#065F46; font-size:0.9rem;">
          ✅ <strong>${l === 'es' ? '¡Excelente Mayordomía!' : 'Great Financial Stewardship!'}</strong> 
          ${l === 'es' 
            ? 'Tu presupuesto está equilibrado con un saldo positivo de $' + netBalance.toFixed(0) + ' al mes. Estás ahorrando $' + b.savingsExp + ' e invirtiendo en tu futuro sin depender de deudas.'
            : 'Your budget is balanced with a positive cashflow of $' + netBalance.toFixed(0) + '/mo. You are actively saving $' + b.savingsExp + ' and building emergency resilience.'}
        </div>
      `;
    } else {
      adviceBox.innerHTML = `
        <div style="background:#FEF2F2; border:1px solid #FCA5A5; padding:1rem; border-radius:8px; color:#991B1B; font-size:0.9rem;">
          ⚠️ <strong>${l === 'es' ? 'Déficit Financiero Detectado' : 'Budget Deficit Alert'}</strong> 
          ${l === 'es' 
            ? 'Tus gastos proyectados superan tus ingresos por $' + Math.abs(netBalance).toFixed(0) + '. En el Día 3 presencial analizamos cómo recortar deseos no esenciales (entretenimiento o gastos personales) para volver a saldo positivo.'
            : 'Your spending exceeds take-home pay by $' + Math.abs(netBalance).toFixed(0) + '. In Saturday In-Person Day 3, students practice cutting non-essential wants to regain financial balance.'}
        </div>
      `;
    }
  }
}

/* ==========================================================================
   VIEW 5: INTERVIEW LAB & ELEVATOR PITCH
   ========================================================================== */
function setupInterviewListeners() {
  const prevBtn = document.getElementById('prevQuestionBtn');
  const nextBtn = document.getElementById('nextQuestionBtn');
  const timerToggleBtn = document.getElementById('timerToggleBtn');
  const toggleAnswerBtn = document.getElementById('toggleAnswerBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.interviewIdx > 0) {
        state.interviewIdx--;
        resetTimer();
        state.showAnswer = false;
        renderInterviewView();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.interviewIdx < MOCK_INTERVIEW_QUESTIONS.length - 1) {
        state.interviewIdx++;
        resetTimer();
        state.showAnswer = false;
        renderInterviewView();
      }
    });
  }

  if (timerToggleBtn) {
    timerToggleBtn.addEventListener('click', () => {
      if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
        timerToggleBtn.textContent = state.lang === 'es' ? '▶ Iniciar 60s' : '▶ Start 60s';
      } else {
        startTimer();
        timerToggleBtn.textContent = state.lang === 'es' ? '⏸ Pausar' : '⏸ Pause';
      }
    });
  }

  if (toggleAnswerBtn) {
    toggleAnswerBtn.addEventListener('click', () => {
      state.showAnswer = !state.showAnswer;
      renderInterviewView();
    });
  }

  // Pitch Inputs
  ['whoAmI', 'whatIOffer', 'whyInterested', 'whyCompany'].forEach(field => {
    const el = document.getElementById(`pitch_${field}`);
    if (el) {
      el.value = state.pitchData[field];
      el.addEventListener('input', (e) => {
        state.pitchData[field] = e.target.value;
        renderPitchCard();
      });
    }
  });
}

function startTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    if (state.timerSeconds > 0) {
      state.timerSeconds--;
      const timerEl = document.getElementById('interviewTimerCount');
      if (timerEl) timerEl.textContent = `${state.timerSeconds}s`;
    } else {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      alert(state.lang === 'es' ? '¡Tiempo cumplido! Tu respuesta debe durar máximo 60 segundos.' : 'Time is up! Your interview answer should stay under 60 seconds.');
    }
  }, 1000);
}

function resetTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  state.timerSeconds = 60;
  const timerBtn = document.getElementById('timerToggleBtn');
  if (timerBtn) timerBtn.textContent = state.lang === 'es' ? '▶ Iniciar 60s' : '▶ Start 60s';
  const timerEl = document.getElementById('interviewTimerCount');
  if (timerEl) timerEl.textContent = '60s';
}

function renderInterviewView() {
  const container = document.getElementById('interviewCardContainer');
  if (!container) return;
  const l = state.lang;
  const curQ = MOCK_INTERVIEW_QUESTIONS[state.interviewIdx];

  container.innerHTML = `
    <div class="interview-card-display">
      <span class="q-badge">${l === 'es' ? 'Pregunta' : 'Question'} ${state.interviewIdx + 1} / ${MOCK_INTERVIEW_QUESTIONS.length}</span>
      <span class="timer-badge">⏱️ <span id="interviewTimerCount">${state.timerSeconds}s</span></span>
      <h3>"${curQ.q[l]}"</h3>
    </div>

    <div class="guidance-box">
      <strong>🎯 ${l === 'es' ? 'Estrategia y Consejos del Facilitador:' : 'Facilitator Strategy & Advice:'}</strong>
      ${curQ.guidance[l]}
    </div>

    ${state.showAnswer ? `
      <div style="background:#F0FDF4; border:1px solid #86EFAC; padding:1.25rem; border-radius:8px; margin-bottom:1.5rem; animation:fadeIn 0.2s ease;">
        <strong style="color:#166534; display:block; margin-bottom:0.4rem;">💬 ${l === 'es' ? 'Ejemplo de Respuesta Modelo:' : 'Sample Model Answer:'}</strong>
        <p style="font-size:0.92rem; color:#14532D; font-style:italic;">"${curQ.sampleAnswer[l]}"</p>
      </div>
    ` : ''}
  `;

  const toggleAnswerBtn = document.getElementById('toggleAnswerBtn');
  if (toggleAnswerBtn) {
    toggleAnswerBtn.textContent = state.showAnswer 
      ? (l === 'es' ? 'Ocultar Respuesta Modelo' : 'Hide Sample Answer')
      : (l === 'es' ? '💡 Ver Respuesta Modelo' : '💡 Show Sample Answer');
  }

  renderPitchCard();
}

function renderPitchCard() {
  const display = document.getElementById('elevatorPitchOutput');
  if (!display) return;
  const p = state.pitchData;
  display.innerHTML = `
    <div style="background:var(--surface-alt); border:2px solid var(--accent); padding:1.5rem; border-radius:12px;">
      <h4 style="color:var(--primary); font-size:1.05rem; margin-bottom:0.75rem;">
        ⚡ ${state.lang === 'es' ? 'Tu Elevator Pitch de 30 Segundos' : 'Your 30-Second Elevator Pitch'}
      </h4>
      <p style="font-size:0.95rem; line-height:1.7; color:#1E293B;">
        "${p.whoAmI} ${p.whatIOffer} ${p.whyInterested} ${p.whyCompany}"
      </p>
    </div>
  `;
}

/* ==========================================================================
   VIEW 6: ST. CLOUD LIBRARY IN-PERSON GUIDE
   ========================================================================== */
function renderLibraryGuideView() {
  const guideContainer = document.getElementById('libraryGuideCards');
  if (!guideContainer) return;
  const l = state.lang;

  guideContainer.innerHTML = CURRICULUM_WEEKS.map(w => `
    <div class="panel-card" style="margin-bottom:1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:1rem; border-bottom:1px solid var(--border); padding-bottom:0.75rem;">
        <div>
          <span style="background:var(--primary); color:white; font-size:0.75rem; font-weight:800; padding:0.2rem 0.6rem; border-radius:9999px;">
            SÁBADO PRESENCIAL · DÍA ${w.inPersonSession.dayNumber}
          </span>
          <h3 style="color:var(--primary); font-size:1.25rem; margin-top:0.4rem;">${w.inPersonSession.title[l]}</h3>
        </div>
        <div style="font-size:0.88rem; color:var(--text-muted); text-align:right;">
          <strong>📍 ${w.inPersonSession.place}</strong><br>
          🕒 10:00 AM – 11:30 AM (90 mins)
        </div>
      </div>

      <div style="margin-bottom:1rem;">
        <strong>🎯 ${l === 'es' ? 'Propósito Central:' : 'Core Purpose:'}</strong> ${w.inPersonSession.focus[l]}
      </div>

      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:1rem; margin-bottom:1rem;">
        <strong style="color:var(--primary); display:block; margin-bottom:0.5rem;">📋 ${l === 'es' ? 'Desglose Minuto a Minuto del Facilitador:' : 'Facilitator Minute-by-Minute Breakdown:'}</strong>
        <table style="width:100%; font-size:0.88rem; border-collapse:collapse;">
          ${w.inPersonSession.agenda.map(a => `
            <tr style="border-bottom:1px solid #EDF2F7;">
              <td style="padding:0.4rem 0.5rem; font-weight:700; color:#15803D; width:130px;">${a.time}</td>
              <td style="padding:0.4rem 0.5rem;">${a.act[l]}</td>
            </tr>
          `).join('')}
        </table>
      </div>

      <div style="font-size:0.85rem; color:#4B5563; background:#FEF3C7; border-left:4px solid #F59E0B; padding:0.6rem 0.9rem; border-radius:0 6px 6px 0;">
        💡 <strong>${l === 'es' ? 'Consejo de Interacción Comunitaria:' : 'Community Outreach Note:'}</strong> 
        ${l === 'es' 
          ? 'Las familias locales acompañan a los estudiantes los primeros 10 minutos. Este es el espacio natural donde conocen la seriedad y excelencia del programa educativo Chanak sin necesidad de venta directa.'
          : 'Families often accompany youth during the first 10 minutes. This creates an organic, welcoming atmosphere showcasing Chanak\'s educational excellence.'}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   VIEW 7: OFFICIAL CERTIFICATE GENERATOR
   ========================================================================== */
function setupCertificateListeners() {
  const nameInput = document.getElementById('certStudentNameInput');
  if (nameInput) {
    nameInput.value = state.certStudentName;
    nameInput.addEventListener('input', (e) => {
      state.certStudentName = e.target.value;
      renderCertificateView();
    });
  }

  const printCertBtn = document.getElementById('printCertificateBtn');
  if (printCertBtn) {
    printCertBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function renderCertificateView() {
  const certDisplay = document.getElementById('officialCertificateDisplay');
  if (!certDisplay) return;
  const l = state.lang;
  const student = state.certStudentName || "Student Name";

  certDisplay.innerHTML = `
    <div class="cert-frame">
      <img src="logo-chanak.png" alt="Chanak Logo" class="cert-logo" onerror="this.style.display='none'">
      <div class="cert-sub">CHANAK TRAINUP EDUCATION · 501(C)(3) PUBLIC CHARITY</div>
      <h2 class="cert-title">${l === 'es' ? 'CERTIFICADO DE CULMINACIÓN' : 'CERTIFICATE OF COMPLETION'}</h2>
      <p style="font-size:0.9rem; color:#64748B; margin-top:0.25rem; letter-spacing:0.05em;">
        ST. CLOUD YOUTH LIFE & CAREER READINESS PILOT PROGRAM
      </p>

      <div style="margin:2.5rem 0 1rem;">
        <span style="font-size:0.95rem; text-transform:uppercase; color:#64748B;">${l === 'es' ? 'Se otorga con distinción a:' : 'This is proudly awarded to:'}</span><br>
        <div class="cert-name">${student}</div>
      </div>

      <p class="cert-desc">
        ${l === 'es'
          ? 'Por haber completado satisfactoriamente las cuatro semanas del programa intensivo híbrido de preparación laboral, demostrando dominio en la redacción de su primer currículum vitae, simulación de entrevistas de trabajo, oratoria profesional, presupuesto personal y normas de etiqueta en el lugar de trabajo.'
          : 'For successfully completing all four weeks of the hybrid intensive workforce readiness pilot, demonstrating mastery in first professional résumé drafting, mock job interview practice, professional etiquette, personal monthly budgeting, and career communication.'}
      </p>

      <div class="cert-signatures">
        <div>
          <div class="cert-sig-line">Mariela Andrade</div>
          <div style="font-size:0.75rem; color:#64748B;">Founder & COO · Chanak TrainUp Education</div>
        </div>
        <div>
          <div class="cert-sig-line">Karen Pujols</div>
          <div style="font-size:0.75rem; color:#64748B;">Florida Community Liaison & Coordinator</div>
        </div>
        <div>
          <div class="cert-sig-line">February 6, 2027</div>
          <div style="font-size:0.75rem; color:#64748B;">St. Cloud, Florida</div>
        </div>
      </div>
    </div>
  `;
}
