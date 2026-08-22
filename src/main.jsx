import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertCircle,
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Eye,
  EyeOff,
  FileText,
  HeartPulse,
  History,
  LayoutDashboard,
  LineChart,
  Lock,
  LogOut,
  NotebookTabs,
  PanelLeftClose,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  User,
  Users,
  WalletCards
} from 'lucide-react';
import './styles.css';
import juniorLogo from './assets/junior-processing-mill-logo.png';

const ROLES = Object.freeze({
  EMPLOYEE: 'EMPLOYEE',
  HR: 'HR',
  MD: 'MD'
});

const users = [
  {
    username: 'employee',
    password: 'demo123',
    role: ROLES.EMPLOYEE,
    name: 'Arun Prakash',
    employeeId: 'EMP-1042',
    department: 'Production',
    designation: 'Process Associate'
  },
  {
    username: 'hr',
    password: 'demo123',
    role: ROLES.HR,
    name: 'Meera Nair',
    employeeId: 'HR-008',
    department: 'Human Resources',
    designation: 'HR Lead'
  },
  {
    username: 'md',
    password: 'demo123',
    role: ROLES.MD,
    name: 'Dev Menon',
    employeeId: 'MD-001',
    department: 'Executive Office',
    designation: 'Managing Director'
  }
];

const employees = [
  { id: 'EMP-1042', name: 'Arun Prakash', department: 'Production', role: 'Process Associate', onboarding: 80, training: 64, assessment: 78, status: 'Active' },
  { id: 'EMP-1087', name: 'Nisha Raj', department: 'Office', role: 'Accounts Executive', onboarding: 100, training: 92, assessment: 88, status: 'Active' },
  { id: 'EMP-1113', name: 'Rahul S', department: 'Quality', role: 'QC Analyst', onboarding: 60, training: 48, assessment: 71, status: 'Grace Review' },
  { id: 'EMP-1199', name: 'Priya K', department: 'Production', role: 'Line Coordinator', onboarding: 100, training: 86, assessment: 91, status: 'Active' }
];

const trainings = [
  { title: 'Workplace Induction', type: 'Video', due: 'Aug 28', progress: 88, owner: 'HR', status: 'In progress' },
  { title: 'Production Safety Essentials', type: 'Material', due: 'Sep 02', progress: 45, owner: 'Operations', status: 'Assigned' },
  { title: 'Data Privacy Basics', type: 'Assessment', due: 'Sep 05', progress: 0, owner: 'HR', status: 'Pending' }
];

const notifications = [
  'Onboarding policy acknowledgement pending.',
  'Production Safety Essentials assigned for this month.',
  'Assessment window closes on Sep 05.'
];

const onboardingSections = [
  {
    key: 'timing',
    title: 'Office Timing & Attendance Policy',
    icon: CalendarDays,
    locked: false,
    items: [
      'Office timing: 9:00 AM - 6:00 PM',
      '5 minutes cushion time',
      '9:06 AM onwards -> Late Minute Debit',
      'Lunch break: 1 hour',
      'No permission',
      'No CL (Casual Leave)'
    ],
    note: 'This is a company policy acknowledgement only.'
  },
  {
    key: 'salary',
    title: 'Salary, Benefits & Increment',
    icon: WalletCards,
    locked: true,
    items: [
      'Bonus: 8.33% yearly',
      'Increment: Yearly',
      'Bonus eligibility and date are checked by HR',
      'Increment records are maintained by the company'
    ],
    note: 'Salary-related data is secured and visible only by role permission.'
  },
  {
    key: 'incentive',
    title: 'Monthly Incentive (IM)',
    icon: Target,
    locked: true,
    items: [
      'Incentive is based on target achievement',
      'Approx. 8 months per year',
      'Monthly target tracking is company controlled',
      'Achievement calculation and payment records are read-only'
    ],
    note: 'Employees can view relevant incentive information but cannot modify controlled values.'
  },
  {
    key: 'ovm',
    title: 'OVM Grace Period',
    icon: ShieldCheck,
    locked: false,
    items: [
      'Grace period: 1 week to 1 month',
      'Applicable to management and candidate',
      'Suitability is reviewed during the grace period',
      'Continuation is confirmed after the grace period'
    ],
    note: 'Current status: Under standard onboarding review.'
  },
  {
    key: 'health',
    title: 'Health Information',
    icon: HeartPulse,
    locked: true,
    items: [
      'Employee must inform health issues in advance',
      'Office category -> Inform AO',
      'Production and other categories -> Inform GM',
      'Important health-related information is recorded with privacy controls'
    ],
    note: 'Sensitive information is protected and limited by business need.'
  }
];

function App() {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('lms-session');
    return saved ? JSON.parse(saved) : null;
  });
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(''), 2600);
  };

  const login = (user) => {
    localStorage.setItem('lms-session', JSON.stringify(user));
    setSession(user);
    showToast(`Signed in as ${user.role}`);
  };

  const logout = () => {
    localStorage.removeItem('lms-session');
    setSession(null);
  };

  return (
    <>
      {!session ? <LoginPage onLogin={login} /> : <Portal session={session} onLogout={logout} showToast={showToast} />}
      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </>
  );
}

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Employee ID / Username and password are required.');
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      const match = users.find((user) => user.username.toLowerCase() === username.trim().toLowerCase() && user.password === password);
      setLoading(false);
      if (!match) {
        setError('Invalid credentials. Try employee, hr, or md with password demo123.');
        return;
      }
      onLogin(match);
    }, 500);
  };

  return (
    <main className="login-page">
      <section className="login-art" aria-label="Junior Processing Mill LMS overview">
        <div className="brand-mark"><img src={juniorLogo} alt="Junior Processing Mill logo" />Junior Processing Mill</div>
        <div className="login-copy">
          <p className="eyebrow">Enterprise learning and onboarding</p>
          <h1>Junior Processing Mill LMS Portal</h1>
          <p>Secure role-based access for mill employee onboarding, assigned training, assessments, and leadership reporting.</p>
        </div>
        <div className="login-stats">
          <StatCard value="92%" label="Training completion" />
          <StatCard value="5" label="Onboarding sections" />
          <StatCard value="3" label="Authorized roles" />
        </div>
      </section>
      <section className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <div>
            <div className="mobile-brand"><img src={juniorLogo} alt="Junior Processing Mill logo" /> Junior Processing Mill LMS</div>
            <h2>Sign in</h2>
            <p>Use your company credentials to continue.</p>
          </div>
          <label>
            Employee ID / Username
            <div className="input-wrap">
              <User size={18} />
              <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="employee" autoComplete="username" />
            </div>
          </label>
          <label>
            Password
            <div className="input-wrap">
              <Lock size={18} />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="demo123" autoComplete="current-password" />
              <button className="icon-button" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          {error && <div className="form-error"><AlertCircle size={16} />{error}</div>}
          <button className="primary-button" type="submit" disabled={loading}>{loading ? 'Validating...' : 'Login'}</button>
          <button className="link-button" type="button">Forgot password?</button>
          <div className="demo-users">
            <span>Demo users:</span>
            <strong>employee</strong>
            <strong>hr</strong>
            <strong>md</strong>
          </div>
        </form>
      </section>
    </main>
  );
}

function Portal({ session, onLogout, showToast }) {
  const onboardingKey = `lms-onboarding-${session.employeeId}`;
  const [active, setActive] = useState('Dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [trainingItems, setTrainingItems] = useState(trainings);
  const [generatedReports, setGeneratedReports] = useState([]);
  const [approvalItems, setApprovalItems] = useState([
    { id: 'report', text: 'Approve monthly learning report', status: 'Ready' },
    { id: 'grace', text: 'Review 4 grace-period cases', status: 'Review' },
    { id: 'budget', text: 'Approve training budget recommendation', status: 'Pending' }
  ]);
  const [modal, setModal] = useState(null);
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem(onboardingKey);
    return saved ? JSON.parse(saved) : ['timing'];
  });

  const onboardingPercent = Math.round((completed.length / onboardingSections.length) * 100);
  const nav = getNavigation(session.role, onboardingPercent);

  const visibleActive = session.role === ROLES.EMPLOYEE && onboardingPercent < 100 && !['Dashboard', 'Onboarding', 'Notifications', 'Profile'].includes(active)
    ? 'Onboarding'
    : active;

  const markSection = (key) => {
    setCompleted((current) => {
      const next = current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
      localStorage.setItem(onboardingKey, JSON.stringify(next));
      showToast('Onboarding progress saved');
      return next;
    });
  };

  const completeAll = () => {
    const all = onboardingSections.map((section) => section.key);
    setCompleted(all);
    localStorage.setItem(onboardingKey, JSON.stringify(all));
    showToast('Onboarding completed. LMS access unlocked.');
  };

  const openModal = (title, description, fields = []) => {
    setModal({ title, description, fields });
  };

  return (
    <div className="portal">
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-top">
          <div className="brand"><img src={juniorLogo} alt="Junior Processing Mill logo" /><span>Junior Processing Mill LMS</span></div>
          <button className="icon-button" type="button" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle navigation"><PanelLeftClose size={18} /></button>
        </div>
        <nav>
          {nav.map((item) => (
            <button key={item.label} className={visibleActive === item.label ? 'active' : ''} onClick={() => setActive(item.label)} type="button" disabled={item.locked}>
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.locked && <Lock size={14} />}
            </button>
          ))}
        </nav>
        <div className="sidebar-profile">
          <div className="sidebar-avatar">{session.name.split(' ').map((part) => part[0]).join('')}</div>
          <div>
            <strong>{session.name}</strong>
            <span>{session.role}</span>
          </div>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">{session.role} Portal</p>
            <h1>{visibleActive}</h1>
          </div>
          <div className="top-actions">
            <div className="search"><Search size={17} /><input placeholder="Search portal" /></div>
            <button className="icon-button" aria-label="Notifications" onClick={() => setActive('Notifications')}><Bell size={19} /></button>
            <button className="logout" onClick={onLogout}><LogOut size={17} />Logout</button>
          </div>
        </header>
        {session.role === ROLES.EMPLOYEE && onboardingPercent < 100 && visibleActive !== 'Onboarding' && (
          <div className="banner">
            <ShieldCheck size={20} />
            Complete onboarding before entering the full LMS workspace. Current progress is {onboardingPercent}%.
            <button onClick={() => setActive('Onboarding')}>Continue onboarding</button>
          </div>
        )}
        <Content
          active={visibleActive}
          session={session}
          completed={completed}
          onboardingPercent={onboardingPercent}
          markSection={markSection}
          completeAll={completeAll}
          showToast={showToast}
          trainingItems={trainingItems}
          setTrainingItems={setTrainingItems}
          generatedReports={generatedReports}
          setGeneratedReports={setGeneratedReports}
          approvalItems={approvalItems}
          setApprovalItems={setApprovalItems}
          openModal={openModal}
        />
      </main>
      {modal && <ProcessModal modal={modal} onClose={() => setModal(null)} showToast={showToast} />}
    </div>
  );
}

function getNavigation(role, onboardingPercent) {
  if (role === ROLES.EMPLOYEE) {
    const lmsLocked = onboardingPercent < 100;
    return [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Onboarding', icon: ClipboardCheck },
      { label: 'My Training', icon: BookOpen, locked: lmsLocked },
      { label: 'Assessments', icon: NotebookTabs, locked: lmsLocked },
      { label: 'Progress', icon: LineChart, locked: lmsLocked },
      { label: 'History', icon: History, locked: lmsLocked },
      { label: 'Notifications', icon: Bell },
      { label: 'Profile', icon: User }
    ];
  }
  if (role === ROLES.HR) {
    return [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Employees', icon: Users },
      { label: 'Onboarding', icon: ClipboardCheck },
      { label: 'Training', icon: BookOpen },
      { label: 'Assessments', icon: NotebookTabs },
      { label: 'Progress', icon: LineChart },
      { label: 'Reports', icon: FileText },
      { label: 'Notifications', icon: Bell },
      { label: 'Profile', icon: User }
    ];
  }
  return [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Employees', icon: Users },
    { label: 'Training Overview', icon: BookOpen },
    { label: 'Performance', icon: BarChart3 },
    { label: 'Reports', icon: FileText },
    { label: 'Approvals', icon: ShieldCheck },
    { label: 'Notifications', icon: Bell },
    { label: 'Profile', icon: User }
  ];
}

function Content(props) {
  const { active, session } = props;
  if (session.role === ROLES.EMPLOYEE) return <EmployeeContent {...props} />;
  if (session.role === ROLES.HR) return <HrContent {...props} />;
  return <MdContent {...props} />;
}

function EmployeeContent({ active, session, completed, onboardingPercent, markSection, completeAll, showToast, trainingItems, setTrainingItems }) {
  if (active === 'Onboarding') return <Onboarding completed={completed} markSection={markSection} completeAll={completeAll} percent={onboardingPercent} />;
  if (active === 'My Training') return <TrainingView role="employee" showToast={showToast} trainingItems={trainingItems} setTrainingItems={setTrainingItems} />;
  if (active === 'Assessments') return <AssessmentsView showToast={showToast} />;
  if (active === 'Progress') return <ProgressView />;
  if (active === 'History') return <HistoryView />;
  if (active === 'Notifications') return <NotificationsView />;
  if (active === 'Profile') return <ProfileView session={session} />;
  return <EmployeeDashboard session={session} onboardingPercent={onboardingPercent} trainingItems={trainingItems} />;
}

function EmployeeDashboard({ session, onboardingPercent, trainingItems }) {
  const completedSections = Math.round((onboardingPercent / 100) * onboardingSections.length);
  const pendingAssessments = trainingItems.filter((item) => item.type === 'Assessment' && item.progress < 100);
  return (
    <div className="dashboard-simple">
      <section className="simple-welcome">
        <div>
          <h2>Welcome, {session.name}</h2>
          <p>Employee ID: {session.employeeId}</p>
          <p>{session.department} / {session.designation}</p>
        </div>
      </section>
      <div className="simple-grid">
        <SimpleCard icon={ClipboardCheck} title="Onboarding">
          <SimpleProgress value={onboardingPercent} />
          <p>{completedSections} of {onboardingSections.length} sections completed</p>
        </SimpleCard>
        <SimpleCard icon={BookOpen} title="My Training">
          <SimpleList items={trainingItems.slice(0, 2).map((item) => item.title)} />
        </SimpleCard>
        <SimpleCard icon={NotebookTabs} title="Pending Assessment">
          <SimpleList items={pendingAssessments.length ? pendingAssessments.map((item) => item.title) : ['No pending assessments']} />
        </SimpleCard>
        <SimpleCard icon={Bell} title="Recent Notifications">
          <SimpleList items={['New training assigned', 'Policy acknowledgement pending']} />
        </SimpleCard>
      </div>
    </div>
  );
}

function Onboarding({ completed, markSection, completeAll, percent }) {
  const [index, setIndex] = useState(0);
  const current = onboardingSections[index];
  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">First-login onboarding process</p>
          <h2>Complete company onboarding</h2>
          <p>Review every section, acknowledge the policies, save progress, and unlock LMS training access.</p>
        </div>
        <ProgressRing value={percent} label="Complete" />
      </section>
      <div className="stepper">
        {onboardingSections.map((section, stepIndex) => (
          <button className={stepIndex === index ? 'current' : completed.includes(section.key) ? 'done' : ''} onClick={() => setIndex(stepIndex)} key={section.key}>
            {completed.includes(section.key) ? <Check size={16} /> : stepIndex + 1}
            <span>{section.title}</span>
          </button>
        ))}
      </div>
      <section className="policy-panel">
        <div className="policy-title">
          <current.icon size={24} />
          <div>
            <h3>{current.title}</h3>
            <span className={completed.includes(current.key) ? 'badge success' : 'badge'}>{completed.includes(current.key) ? 'Completed' : 'Pending'}</span>
          </div>
        </div>
        <div className="policy-list">
          {current.items.map((item) => <div key={item}><Check size={16} />{item}</div>)}
        </div>
        <div className={current.locked ? 'secure-note' : 'info-note'}>
          {current.locked ? <Lock size={17} /> : <AlertCircle size={17} />}
          {current.note}
        </div>
        <label className="check-row">
          <input type="checkbox" checked={completed.includes(current.key)} onChange={() => markSection(current.key)} />
          I have read and acknowledged this section.
        </label>
      </section>
      <div className="pager">
        <button className="secondary-button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}><ChevronLeft size={17} />Previous</button>
        <button className="secondary-button" onClick={() => setIndex((value) => Math.min(onboardingSections.length - 1, value + 1))} disabled={index === onboardingSections.length - 1}>Next<ChevronRight size={17} /></button>
        <button className="primary-button compact" onClick={completeAll}>Save & complete onboarding</button>
      </div>
    </div>
  );
}

function HrContent({ active, session, showToast, trainingItems, setTrainingItems, generatedReports, setGeneratedReports, openModal }) {
  if (active === 'Employees') return <EmployeesView showToast={showToast} openModal={openModal} />;
  if (active === 'Onboarding') return <OnboardingMonitor />;
  if (active === 'Training') return <TrainingView role="hr" showToast={showToast} trainingItems={trainingItems} setTrainingItems={setTrainingItems} openModal={openModal} />;
  if (active === 'Assessments') return <AssessmentsView canManage showToast={showToast} openModal={openModal} />;
  if (active === 'Progress') return <ProgressView company />;
  if (active === 'Reports') return <ReportsView generatedReports={generatedReports} setGeneratedReports={setGeneratedReports} showToast={showToast} />;
  if (active === 'Notifications') return <NotificationsView />;
  if (active === 'Profile') return <ProfileView session={session} />;
  return <HrDashboard showToast={showToast} openModal={openModal} />;
}

function HrDashboard({ showToast, openModal }) {
  const actionFields = {
    'Add Employee': ['Employee name', 'Employee ID', 'Department', 'Designation'],
    'Assign Training': ['Training title', 'Employee or department', 'Due date'],
    'Upload Material': ['Material title', 'Material type', 'Assigned department'],
    'View Reports': []
  };
  return (
    <div className="dashboard-simple">
      <section className="simple-welcome">
        <div>
          <h2>HR Dashboard</h2>
          <p>Simple overview of employees, onboarding, training, and assessments.</p>
        </div>
      </section>
      <div className="simple-stats">
        <Metric icon={Users} label="Total Employees" value="124" />
        <Metric icon={ClipboardCheck} label="Pending Onboarding" value="22" />
        <Metric icon={BookOpen} label="Training Assigned" value="81" />
        <Metric icon={NotebookTabs} label="Pending Assessments" value="7" />
      </div>
      <div className="simple-two-column">
        <SimpleCard icon={History} title="Recent Employee Activity">
          <SimpleList items={['Arun completed Office Timing policy', 'Nisha finished Company Policies training', 'Rahul has onboarding pending']} />
        </SimpleCard>
        <SimpleCard icon={BriefcaseBusiness} title="Quick Actions">
          <div className="quick-actions">
            {[
              ['Add Employee', Users],
              ['Assign Training', BookOpen],
              ['Upload Material', Upload],
              ['View Reports', FileText]
            ].map(([label, Icon]) => (
              <button key={label} className="secondary-button" onClick={() => openModal(label, `${label} process for HR is ready.`, actionFields[label])}>
                <Icon size={17} />{label}
              </button>
            ))}
          </div>
        </SimpleCard>
      </div>
    </div>
  );
}

function MdContent({ active, session, showToast, generatedReports, setGeneratedReports, approvalItems, setApprovalItems }) {
  if (active === 'Employees') return <EmployeesView readOnly />;
  if (active === 'Training Overview') return <TrainingOverview />;
  if (active === 'Performance') return <PerformanceView />;
  if (active === 'Reports') return <ReportsView executive generatedReports={generatedReports} setGeneratedReports={setGeneratedReports} showToast={showToast} />;
  if (active === 'Approvals') return <ApprovalsView approvalItems={approvalItems} setApprovalItems={setApprovalItems} showToast={showToast} />;
  if (active === 'Notifications') return <NotificationsView />;
  if (active === 'Profile') return <ProfileView session={session} />;
  return <MdDashboard approvalItems={approvalItems} />;
}

function MdDashboard({ approvalItems }) {
  const pendingApprovals = approvalItems.filter((item) => item.status !== 'Approved').length;
  return (
    <div className="dashboard-simple">
      <section className="simple-welcome">
        <div>
          <h2>MD Dashboard</h2>
          <p>Management-focused LMS summary for Junior Processing Mill.</p>
        </div>
      </section>
      <div className="simple-stats">
        <Metric icon={Users} label="Total employees" value="124" />
        <Metric icon={ClipboardCheck} label="Onboarding completion" value="82%" />
        <Metric icon={BookOpen} label="Training completion" value="76%" />
        <Metric icon={ShieldCheck} label="Pending approvals" value={pendingApprovals} />
      </div>
      <div className="md-chart-grid">
        <section className="md-chart-card">
          <div className="md-chart-head">
            <h3>Company Progress</h3>
            <span className="badge">Live</span>
          </div>
          <div className="md-ring-row">
            <MdChartRing value={82} label="Onboarding" />
            <MdChartRing value={76} label="Training" />
            <MdChartRing value={84} label="Assessment" />
          </div>
        </section>
        <section className="md-chart-card">
          <div className="md-chart-head">
            <h3>Department Progress</h3>
            <span className="badge">This month</span>
          </div>
          <MdBarChart />
        </section>
      </div>
      <div className="simple-three-column">
        <SimpleCard icon={Bell} title="Recent Important Updates">
          <SimpleList items={['22 employees pending onboarding', 'Monthly learning report is ready', '7 assessments currently open']} />
        </SimpleCard>
        <SimpleCard icon={FileText} title="Quick Reports">
          <SimpleList items={['Onboarding Summary', 'Training Completion', 'Assessment Status']} />
        </SimpleCard>
        <SimpleCard icon={ShieldCheck} title="Pending Decisions">
          <div className="decision-list">
            <StatusLine text="Monthly learning report" status="Ready" />
            <StatusLine text="Grace-period cases" status="Review" />
            <StatusLine text="Training budget note" status="Pending" />
          </div>
        </SimpleCard>
      </div>
    </div>
  );
}

function EmployeesView({ readOnly, showToast, openModal }) {
  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">{readOnly ? 'Company employees' : 'Employee management'}</p>
          <h2>{readOnly ? 'Employee training statistics' : 'Manage employee learning records'}</h2>
        </div>
        {!readOnly && <button className="primary-button compact" onClick={() => openModal('Add Employee', 'Create a new employee profile for LMS onboarding.', ['Employee name', 'Employee ID', 'Department', 'Designation'])}><Users size={17} />Add employee</button>}
      </section>
      <DataTable
        columns={['Employee', 'Department', 'Designation', 'Onboarding', 'Training', 'Status']}
        rows={employees.map((employee) => [employee.name, employee.department, employee.role, `${employee.onboarding}%`, `${employee.training}%`, employee.status])}
      />
    </div>
  );
}

function OnboardingMonitor() {
  return (
    <div className="stack">
      <section className="section-head"><div><p className="eyebrow">Monitoring</p><h2>Employee onboarding status</h2></div></section>
      <section className="metric-grid">
        <Metric icon={Check} label="Completed" value="98" />
        <Metric icon={AlertCircle} label="Pending" value="22" />
        <Metric icon={ShieldCheck} label="Grace review" value="4" />
        <Metric icon={HeartPulse} label="Private health records" value="Restricted" />
      </section>
      <Panel title="Onboarding Progress">{employees.map((employee) => <EmployeeMini key={employee.id} employee={employee} value={employee.onboarding} />)}</Panel>
    </div>
  );
}

function TrainingView({ role, showToast, trainingItems = trainings, setTrainingItems, openModal }) {
  const isHr = role === 'hr';
  const uploadFields = ['Material title', 'Type: video / document / assessment', 'Department', 'Due date'];
  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">{isHr ? 'Training administration' : 'Assigned learning'}</p>
          <h2>{isHr ? 'Training videos and materials' : 'My Training'}</h2>
          <p>{isHr ? 'Upload learning materials, schedule training, and assign employees.' : 'Only training assigned to you is shown here.'}</p>
        </div>
        {isHr && <button className="primary-button compact" onClick={() => openModal('Upload Material', 'Add training video or material and assign it to employees.', uploadFields)}><Upload size={17} />Upload material</button>}
      </section>
      <section className="training-grid">
        {trainingItems.map((item) => <TrainingCard key={item.title} item={item} isHr={isHr} showToast={showToast} setTrainingItems={setTrainingItems} openModal={openModal} />)}
      </section>
    </div>
  );
}

function AssessmentsView({ canManage, showToast, openModal }) {
  return (
    <div className="stack">
      <section className="section-head">
        <div><p className="eyebrow">{canManage ? 'Assessment management' : 'Quiz / Assessment'}</p><h2>{canManage ? 'Create and monitor assessments' : 'Assigned assessments'}</h2></div>
        {canManage && <button className="primary-button compact" onClick={() => openModal('Create Assessment', 'Prepare an assessment and assign it to a department or employee.', ['Assessment title', 'Department', 'Due date', 'Passing score'])}><NotebookTabs size={17} />Create assessment</button>}
      </section>
      <DataTable
        columns={['Assessment', 'Department', 'Due date', 'Average score', 'Status']}
        rows={[
          ['Data Privacy Basics', 'All', 'Sep 05', 'Pending', 'Open'],
          ['Production Safety Check', 'Production', 'Sep 02', '82%', 'Open'],
          ['Policy Acknowledgement Quiz', 'Office', 'Aug 30', '89%', 'Completed']
        ]}
      />
    </div>
  );
}

function ProgressView({ company }) {
  return (
    <div className="stack">
      <section className="metric-grid">
        <Metric icon={LineChart} label={company ? 'Company progress' : 'My progress'} value={company ? '76%' : '64%'} />
        <Metric icon={Target} label="Target achievement" value={company ? '81%' : '74%'} />
        <Metric icon={NotebookTabs} label="Assessment score" value={company ? '84%' : '78%'} />
        <Metric icon={Sparkles} label="Current status" value="On track" />
      </section>
      <Panel title="Progress Breakdown"><DepartmentBars /></Panel>
    </div>
  );
}

function HistoryView() {
  return <DataTable columns={['Training', 'Completed on', 'Score', 'Status']} rows={[['Junior Processing Mill Induction', 'Aug 12', '92%', 'Completed'], ['Policy Basics', 'Aug 14', '88%', 'Completed'], ['Safety Orientation', 'Aug 18', 'In progress', 'Open']]} />;
}

function TrainingOverview() {
  return (
    <div className="stack">
      <section className="metric-grid">
        <Metric icon={BookOpen} label="Assigned modules" value="21" />
        <Metric icon={FileText} label="Materials" value="36" />
        <Metric icon={Target} label="Completion" value="76%" />
        <Metric icon={AlertCircle} label="Delayed training" value="9" />
      </section>
      <Panel title="Training Statistics">{trainings.map((item) => <TrainingRow key={item.title} item={item} />)}</Panel>
    </div>
  );
}

function PerformanceView() {
  return (
    <div className="stack">
      <Panel title="Assessment Performance">
        <DepartmentBars />
      </Panel>
      <DataTable columns={['Department', 'Employees', 'Training', 'Assessment', 'Risk']} rows={[['Production', '58', '72%', '81%', 'Medium'], ['Office', '24', '88%', '89%', 'Low'], ['Quality', '19', '69%', '76%', 'Medium'], ['Operations', '23', '78%', '85%', 'Low']]} />
    </div>
  );
}

function ReportsView({ executive, generatedReports = [], setGeneratedReports, showToast }) {
  const reportNames = ['Onboarding Summary', 'Training Completion', 'Assessment Performance', executive ? 'Executive Decision Pack' : 'Employee Progress'];
  const generateReport = (title) => {
    if (!generatedReports.includes(title)) {
      setGeneratedReports([...generatedReports, title]);
    }
    showToast(`${title} generated`);
  };
  return (
    <div className="stack">
      <section className="report-grid">
        {reportNames.map((title) => (
          <article className="report-card" key={title}>
            <FileText size={22} />
            <h3>{title}</h3>
            <p>{generatedReports.includes(title) ? 'Generated and ready for review.' : 'Ready to generate with current sample data.'}</p>
            <button className={generatedReports.includes(title) ? 'primary-button' : 'secondary-button'} onClick={() => generateReport(title)}>
              {generatedReports.includes(title) ? 'Generated' : 'Generate'}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ApprovalsView({ approvalItems, setApprovalItems, showToast }) {
  const approve = (id) => {
    setApprovalItems(approvalItems.map((item) => item.id === id ? { ...item, status: 'Approved' } : item));
    showToast('Decision recorded');
  };
  return (
    <div className="stack">
      <Panel title="Approval / Important Decisions">
        {approvalItems.map((item) => (
          <div className="approval" key={item.id}>
            <span>{item.text}</span>
            <span className={item.status === 'Approved' ? 'badge success' : 'badge'}>{item.status}</span>
            <button className="primary-button compact" onClick={() => approve(item.id)} disabled={item.status === 'Approved'}>{item.status === 'Approved' ? 'Approved' : 'Approve'}</button>
          </div>
        ))}
      </Panel>
    </div>
  );
}

function NotificationsView() {
  return <Panel title="Notifications">{notifications.map((item) => <StatusLine key={item} text={item} status="Unread" />)}</Panel>;
}

function ProfileView({ session }) {
  const isMd = session.role === ROLES.MD;
  return (
    <div className="stack">
      <Panel title="Profile">
        <div className="profile">
          <div className="avatar">{session.name.split(' ').map((part) => part[0]).join('')}</div>
          <div>
            <h3>{session.name}</h3>
            <p>{session.employeeId} · {session.role}</p>
            <p>{session.department} · {session.designation}</p>
          </div>
        </div>
      </Panel>
      {isMd && (
        <section className="md-profile-panel">
          <div className="md-profile-summary">
            <div>
              <p className="eyebrow">MD Overview</p>
              <h2>Decision profile chart</h2>
              <p>Quick visual view of company LMS health and approvals.</p>
            </div>
            <MdChartRing value={91} label="Control" />
          </div>
          <div className="md-profile-charts">
            <MdMiniStat label="Employees monitored" value="124" progress={100} />
            <MdMiniStat label="Reports reviewed" value="18" progress={72} />
            <MdMiniStat label="Decisions pending" value="3" progress={38} />
            <MdMiniStat label="Training health" value="76%" progress={76} />
          </div>
        </section>
      )}
    </div>
  );
}

function DataTable({ columns, rows }) {
  if (!rows.length) return <div className="empty">No records available.</div>;
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Panel({ title, action, children }) {
  return <section className="panel"><div className="panel-head"><h3>{title}</h3>{action && <button className="link-button">{action}</button>}</div>{children}</section>;
}

function Metric({ icon: Icon, label, value }) {
  return <article className="metric"><Icon size={22} /><div><strong>{value}</strong><span>{label}</span></div></article>;
}

function StatCard({ value, label }) {
  return <div className="stat-card"><strong>{value}</strong><span>{label}</span></div>;
}

function SimpleCard({ icon: Icon, title, children }) {
  return (
    <section className="simple-card">
      <div className="simple-card-title">
        <Icon size={20} />
        <h3>{title}</h3>
      </div>
      {children}
    </section>
  );
}

function SimpleProgress({ value }) {
  return (
    <div className="simple-progress">
      <div className="bar"><span style={{ width: `${value}%` }} /></div>
      <strong>{value}%</strong>
    </div>
  );
}

function SimpleList({ items }) {
  return (
    <ul className="simple-list">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function MdChartRing({ value, label }) {
  const style = { background: `conic-gradient(var(--primary) ${value * 3.6}deg, #ececf1 0deg)` };
  return (
    <div className="md-ring" style={style}>
      <div>
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function MdBarChart() {
  const data = [
    ['Production', 72],
    ['Office', 88],
    ['Quality', 69],
    ['Operations', 78]
  ];
  return (
    <div className="md-bars">
      {data.map(([label, value]) => (
        <div className="md-bar-line" key={label}>
          <span>{label}</span>
          <div className="bar"><span style={{ width: `${value}%` }} /></div>
          <strong>{value}%</strong>
        </div>
      ))}
    </div>
  );
}

function MdMiniStat({ label, value, progress }) {
  return (
    <div className="md-mini-stat">
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
      <div className="bar"><span style={{ width: `${progress}%` }} /></div>
    </div>
  );
}

function ProgressRing({ value, label }) {
  const style = { background: `conic-gradient(var(--primary) ${value * 3.6}deg, #e5e5ea 0deg)` };
  return <div className="ring" style={style}><div><strong>{value}%</strong><span>{label}</span></div></div>;
}

function TrainingRow({ item }) {
  return (
    <div className="training-row">
      <div><strong>{item.title}</strong><span>{item.type} · Due {item.due}</span></div>
      <div className="bar"><span style={{ width: `${item.progress}%` }} /></div>
      <span className="badge">{item.status}</span>
    </div>
  );
}

function TrainingCard({ item, isHr, showToast, setTrainingItems, openModal }) {
  const advanceTraining = () => {
    const nextProgress = Math.min(100, item.progress + 25);
    setTrainingItems((current) => current.map((training) => (
      training.title === item.title
        ? { ...training, progress: nextProgress, status: nextProgress === 100 ? 'Completed' : 'In progress' }
        : training
    )));
    showToast(nextProgress === 100 ? 'Training completed' : 'Training progress saved');
  };

  return (
    <article className="training-card">
      <div className="card-icon"><BookOpen size={22} /></div>
      <h3>{item.title}</h3>
      <p>{item.type} · Owner: {item.owner}</p>
      <div className="bar"><span style={{ width: `${item.progress}%` }} /></div>
      <div className="card-actions">
        <span className="badge">{item.status}</span>
        <button
          className="secondary-button"
          onClick={() => isHr
            ? openModal('Assign Training', `Assign ${item.title} to employees or a department.`, ['Employee or department', 'Due date', 'Priority'])
            : advanceTraining()}
          disabled={!isHr && item.progress === 100}
        >
          {isHr ? 'Assign' : item.progress === 100 ? 'Done' : 'Continue'}
        </button>
      </div>
    </article>
  );
}

function ProcessModal({ modal, onClose, showToast }) {
  const [saving, setSaving] = useState(false);
  const completeProcess = (event) => {
    event.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      onClose();
      showToast(`${modal.title} saved`);
    }, 450);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <form className="process-modal" onSubmit={completeProcess}>
        <div className="modal-head">
          <div>
            <h2>{modal.title}</h2>
            <p>{modal.description}</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog">X</button>
        </div>
        {modal.fields.length ? (
          <div className="modal-fields">
            {modal.fields.map((field) => (
              <label key={field}>
                {field}
                <div className="input-wrap">
                  <input placeholder={field} />
                </div>
              </label>
            ))}
          </div>
        ) : (
          <div className="empty">This report section is ready. Use the Reports page to generate files for review.</div>
        )}
        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save process'}</button>
        </div>
      </form>
    </div>
  );
}

function StatusLine({ text, status }) {
  return <div className="status-line"><span>{text}</span><span className="badge">{status}</span></div>;
}

function ActionRow({ text }) {
  return <div className="action-row"><BriefcaseBusiness size={17} />{text}<ChevronDown size={16} /></div>;
}

function EmployeeMini({ employee, value }) {
  return (
    <div className="employee-mini">
      <div><strong>{employee.name}</strong><span>{employee.id} · {employee.department}</span></div>
      <div className="bar"><span style={{ width: `${value}%` }} /></div>
      <span>{value}%</span>
    </div>
  );
}

function DepartmentBars() {
  const data = [
    ['Production', 72],
    ['Office', 88],
    ['Quality', 69],
    ['Operations', 78]
  ];
  return <div className="dept-bars">{data.map(([label, value]) => <EmployeeMini key={label} employee={{ name: label, id: 'Department', department: 'Progress' }} value={value} />)}</div>;
}

createRoot(document.getElementById('root')).render(<App />);
