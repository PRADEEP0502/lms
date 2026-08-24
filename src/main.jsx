import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertCircle,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Film,
  Filter,
  HeartPulse,
  HelpCircle,
  History,
  Info,
  Layers,
  LayoutDashboard,
  LineChart,
  Lock,
  LogOut,
  NotebookTabs,
  PanelLeftClose,
  Play,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Square,
  Target,
  Upload,
  User,
  Users,
  Video,
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
  'Data Entry (20 works) with demo videos assigned inside My Training.',
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

// Initial 20 Work Items for Data Entry (With Video Links)
const defaultWorkItems = [
  { id: 'W-01', title: 'Compacting Card Entry', level: 'L1', description: 'Hard Work — Compacting department daily card entries & log verification', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Compacting Card Entry Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 92, performanceStatus: 'Excellent', hrRemarks: 'Accurate entry and timely log submission.', hrApproved: true },
  { id: 'W-02', title: 'Stenter Job Card Entry', level: 'L1', description: 'Hard Work — Stenter machine job card parameters logging', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Stenter Job Card Entry Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 88, performanceStatus: 'Good', hrRemarks: 'Verified against machine output logs.', hrApproved: true },
  { id: 'W-03', title: 'Stenter Batch Card Entry', level: 'L2', description: 'Medium Work — Batch identification and batch card updates', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Stenter Batch Card Entry Demo', stageA: true, stageB: true, stageC: false, status: 'Practical', score: 85, performanceStatus: 'Satisfactory', hrRemarks: 'Under 4-day practical observation.', hrApproved: false },
  { id: 'W-04', title: 'LRN Lab Card Entry', level: 'L2', description: 'Medium Work — Lab research note card test value entry', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'LRN Lab Card Entry Demo', stageA: true, stageB: true, stageC: false, status: 'Practical', score: 90, performanceStatus: 'Good', hrRemarks: 'Well documented lab entries.', hrApproved: false },
  { id: 'W-05', title: 'LDN Lab Card Entry', level: 'L2', description: 'Medium Work — Dyeing note lab card entry and verification', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'LDN Lab Card Entry Demo', stageA: true, stageB: false, stageC: false, status: 'Learned', score: null, performanceStatus: 'Pending', hrRemarks: '', hrApproved: false },
  { id: 'W-06', title: 'LRN RC Card Entry', level: 'L2', description: 'Medium Work — Lab shade recipe card computer log', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'LRN RC Card Entry Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 94, performanceStatus: 'Excellent', hrRemarks: 'Verified by Lab Incharge.', hrApproved: true },
  { id: 'W-07', title: 'LDN RC Card Entry', level: 'L2', description: 'Medium Work — Dyeing lab RC card logging', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'LDN RC Card Entry Demo', stageA: true, stageB: true, stageC: false, status: 'Practical', score: 82, performanceStatus: 'Satisfactory', hrRemarks: 'Good progress.', hrApproved: false },
  { id: 'W-08', title: 'Lab RL', level: 'L3', description: 'Easy Work — Re-leveling lab test register entry', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Lab RL Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 95, performanceStatus: 'Excellent', hrRemarks: 'Flawless execution.', hrApproved: true },
  { id: 'W-09', title: 'Book Preparation', level: 'L3', description: 'Easy Work — Daily mill logbook index & binding prep', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Book Preparation Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 90, performanceStatus: 'Good', hrRemarks: 'Proper formatting.', hrApproved: true },
  { id: 'W-10', title: 'Format Making', level: 'L2', description: 'Medium Work — Standard data entry template formatting', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Format Making Demo', stageA: true, stageB: true, stageC: false, status: 'Practical', score: null, performanceStatus: 'Pending', hrRemarks: '', hrApproved: false },
  { id: 'W-11', title: 'Petrol Statement Preparation', level: 'L1', description: 'Hard Work — Fuel consumption logs and statement cross-verification', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Petrol Statement Demo', stageA: true, stageB: false, stageC: false, status: 'Learned', score: null, performanceStatus: 'Pending', hrRemarks: '', hrApproved: false },
  { id: 'W-12', title: 'Dryer Entry', level: 'L1', description: 'Hard Work — Thermal dryer operation card entry', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Dryer Entry Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 89, performanceStatus: 'Good', hrRemarks: 'Good consistency.', hrApproved: true },
  { id: 'W-13', title: 'QAD Entry', level: 'L2', description: 'Medium Work — Quality Assurance Department audit log', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'QAD Entry Demo', stageA: true, stageB: true, stageC: false, status: 'Practical', score: 87, performanceStatus: 'Satisfactory', hrRemarks: '', hrApproved: false },
  { id: 'W-14', title: 'Daily Movement Register Checking', level: 'L3', description: 'Easy Work — Gate movement & material transit audit', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Daily Movement Register Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 98, performanceStatus: 'Excellent', hrRemarks: 'High accuracy.', hrApproved: true },
  { id: 'W-15', title: 'Transport Report', level: 'L1', description: 'Hard Work — Dispatch vehicle log & transport invoice tallying', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Transport Report Demo', stageA: true, stageB: false, stageC: false, status: 'Learned', score: null, performanceStatus: 'Pending', hrRemarks: '', hrApproved: false },
  { id: 'W-16', title: 'Contract Wages Manual Production Report', level: 'L1', description: 'Hard Work — Contract labor production tallying', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Contract Wages Report Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 91, performanceStatus: 'Good', hrRemarks: 'Timely calculation.', hrApproved: true },
  { id: 'W-17', title: 'Stationary Follow-ups (PO, GRN, ISSUE, BMS)', level: 'L1', description: 'Hard Work — Store PO, GRN, Issue slips and BMS tracking', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Stationary Follow-ups Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 96, performanceStatus: 'Excellent', hrRemarks: 'Comprehensive tracking.', hrApproved: true },
  { id: 'W-18', title: 'TDM Follow-ups', level: 'L3', description: 'Easy Work — Technical Data Management task follow-up', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'TDM Follow-ups Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 90, performanceStatus: 'Good', hrRemarks: '', hrApproved: true },
  { id: 'W-19', title: 'ABC Chart Follow-ups', level: 'L3', description: 'Easy Work — Inventory ABC classification updating', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'ABC Chart Follow-ups Demo', stageA: true, stageB: true, stageC: true, status: 'Completed', score: 93, performanceStatus: 'Excellent', hrRemarks: '', hrApproved: true },
  { id: 'W-20', title: 'Production Card Upload to OD', level: 'L3', description: 'Easy Work — OD drive upload of daily production scans', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', videoTitle: 'Production Card Upload Demo', stageA: false, stageB: false, stageC: false, status: 'Not Started', score: null, performanceStatus: 'Pending', hrRemarks: '', hrApproved: false }
];

const initialWorkSets = [
  {
    id: 'WS-101',
    name: 'Data Entry',
    employeeId: 'EMP-1042',
    employeeName: 'Arun Prakash',
    department: 'Production',
    assignedDate: '2026-08-15',
    works: defaultWorkItems
  },
  {
    id: 'WS-102',
    name: 'Accounts & Office Data Entry',
    employeeId: 'EMP-1087',
    employeeName: 'Nisha Raj',
    department: 'Office',
    assignedDate: '2026-08-18',
    works: defaultWorkItems.slice(0, 15).map(item => ({ ...item, stageA: true, stageB: true, stageC: true, status: 'Completed', score: 95, hrApproved: true }))
  }
];

function calculateWorkStatus(item) {
  if (item.stageA && item.stageB && item.stageC) {
    return 'Completed';
  }
  if (item.stageA && (item.stageB || item.stageC)) {
    return 'Practical';
  }
  if (item.stageA) {
    return 'Learned';
  }
  return 'Not Started';
}

function getWorkSetStats(works) {
  const total = works.length;
  const completed = works.filter((w) => w.status === 'Completed').length;
  const learned = works.filter((w) => w.stageA).length;
  const practical = works.filter((w) => w.stageB || w.stageC).length;
  const pending = total - completed;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, learned, practical, pending, progressPercent };
}

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
      {toast && (
        <div className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}
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
        <div className="brand-mark">
          <img src={juniorLogo} alt="Junior Processing Mill logo" />
          Junior Processing Mill
        </div>
        <div className="login-copy">
          <p className="eyebrow">Enterprise learning and onboarding</p>
          <h1>Junior Processing Mill LMS Portal</h1>
          <p>Secure role-based access for mill employee onboarding, assigned training, practical data entry work sets, assessments, and leadership reporting.</p>
        </div>
        <div className="login-stats">
          <StatCard value="92%" label="Training completion" />
          <StatCard value="20" label="Data Entry works" />
          <StatCard value="3" label="Authorized roles" />
        </div>
      </section>
      <section className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <div>
            <div className="mobile-brand">
              <img src={juniorLogo} alt="Junior Processing Mill logo" /> Junior Processing Mill LMS
            </div>
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
          {error && (
            <div className="form-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Validating...' : 'Login'}
          </button>
          <button className="link-button" type="button">
            Forgot password?
          </button>
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
    { id: 'workset', text: 'Approve Data Entry evaluation grades', status: 'Review' },
    { id: 'grace', text: 'Review 4 grace-period cases', status: 'Review' },
    { id: 'budget', text: 'Approve training budget recommendation', status: 'Pending' }
  ]);
  const [modal, setModal] = useState(null);
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem(onboardingKey);
    return saved ? JSON.parse(saved) : ['timing'];
  });

  // Work Sets State Management
  const [workSets, setWorkSets] = useState(() => {
    const saved = localStorage.getItem('lms-worksets');
    return saved ? JSON.parse(saved) : initialWorkSets;
  });

  const updateWorkSets = (nextWorkSets) => {
    setWorkSets(nextWorkSets);
    localStorage.setItem('lms-worksets', JSON.stringify(nextWorkSets));
  };

  const toggleWorkStage = (workSetId, workId, stageKey) => {
    const updated = workSets.map((set) => {
      if (set.id !== workSetId) return set;
      const updatedWorks = set.works.map((w) => {
        if (w.id !== workId) return w;
        const nextItem = { ...w, [stageKey]: !w[stageKey] };
        nextItem.status = calculateWorkStatus(nextItem);
        return nextItem;
      });
      return { ...set, works: updatedWorks };
    });
    updateWorkSets(updated);
    showToast('Work stage progress updated');
  };

  const hrUpdatePerformance = (workSetId, workId, score, performanceStatus, hrRemarks, hrApproved, videoUrl) => {
    const updated = workSets.map((set) => {
      if (set.id !== workSetId) return set;
      const updatedWorks = set.works.map((w) => {
        if (w.id !== workId) return w;
        return {
          ...w,
          score: score !== '' && score !== null ? Number(score) : null,
          performanceStatus: performanceStatus || 'Pending',
          hrRemarks: hrRemarks || '',
          hrApproved: Boolean(hrApproved),
          videoUrl: videoUrl || w.videoUrl
        };
      });
      return { ...set, works: updatedWorks };
    });
    updateWorkSets(updated);
    showToast('HR Performance & Video record updated');
  };

  const hrUpdateWorkVideo = (workSetId, workId, videoUrl) => {
    const updated = workSets.map((set) => {
      if (set.id !== workSetId) return set;
      const updatedWorks = set.works.map((w) => {
        if (w.id !== workId) return w;
        return { ...w, videoUrl };
      });
      return { ...set, works: updatedWorks };
    });
    updateWorkSets(updated);
    showToast('Training video link updated');
  };

  const hrAddWorkItem = (workSetId, newItem) => {
    const updated = workSets.map((set) => {
      if (set.id !== workSetId) return set;
      const id = `W-${String(set.works.length + 1).padStart(2, '0')}`;
      const itemToAdd = {
        id,
        title: newItem.title,
        level: newItem.level || 'L2',
        description: newItem.description || `${newItem.level || 'L2'} — ${newItem.title}`,
        videoUrl: newItem.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoTitle: `${newItem.title} Demo`,
        stageA: false,
        stageB: false,
        stageC: false,
        status: 'Not Started',
        score: null,
        performanceStatus: 'Pending',
        hrRemarks: '',
        hrApproved: false
      };
      return { ...set, works: [...set.works, itemToAdd] };
    });
    updateWorkSets(updated);
    showToast('New work item added with video');
  };

  const hrCreateWorkSet = (newSetData) => {
    const id = `WS-${100 + workSets.length + 1}`;
    const emp = employees.find((e) => e.id === newSetData.employeeId) || employees[0];
    const newSet = {
      id,
      name: newSetData.name || 'Data Entry',
      employeeId: emp.id,
      employeeName: emp.name,
      department: emp.department,
      assignedDate: new Date().toISOString().split('T')[0],
      works: defaultWorkItems.map((item) => ({ ...item, stageA: false, stageB: false, stageC: false, status: 'Not Started', score: null, performanceStatus: 'Pending', hrRemarks: '', hrApproved: false }))
    };
    const updated = [...workSets, newSet];
    updateWorkSets(updated);
    showToast(`Data Entry assigned to ${emp.name}`);
  };

  const onboardingPercent = Math.round((completed.length / onboardingSections.length) * 100);
  const nav = getNavigation(session.role, onboardingPercent);

  const visibleActive = session.role === ROLES.EMPLOYEE && onboardingPercent < 100 && !['Dashboard', 'Onboarding', 'Notifications', 'Profile'].includes(active) ? 'Onboarding' : active;

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
          <div className="brand">
            <img src={juniorLogo} alt="Junior Processing Mill logo" />
            <span>Junior Processing Mill LMS</span>
          </div>
          <button className="icon-button" type="button" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle navigation">
            <PanelLeftClose size={18} />
          </button>
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
            <div className="search">
              <Search size={17} />
              <input placeholder="Search portal" />
            </div>
            <button className="icon-button" aria-label="Notifications" onClick={() => setActive('Notifications')}>
              <Bell size={19} />
            </button>
            <button className="logout" onClick={onLogout}>
              <LogOut size={17} />
              Logout
            </button>
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
          workSets={workSets}
          toggleWorkStage={toggleWorkStage}
          hrUpdatePerformance={hrUpdatePerformance}
          hrUpdateWorkVideo={hrUpdateWorkVideo}
          hrAddWorkItem={hrAddWorkItem}
          hrCreateWorkSet={hrCreateWorkSet}
          setActive={setActive}
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
      { label: 'Training', icon: BookOpen },
      { label: 'Onboarding', icon: ClipboardCheck },
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

function EmployeeContent(props) {
  const { active, session, completed, onboardingPercent, markSection, completeAll, showToast, trainingItems, setTrainingItems, workSets, toggleWorkStage, setActive, openModal, hrUpdateWorkVideo } = props;

  if (active === 'Onboarding') return <Onboarding completed={completed} markSection={markSection} completeAll={completeAll} percent={onboardingPercent} />;
  if (active === 'My Training' || active === 'Data Entry Work Set' || active === 'Data Entry') {
    return (
      <TrainingView
        role={session.role}
        session={session}
        showToast={showToast}
        trainingItems={trainingItems}
        setTrainingItems={setTrainingItems}
        workSets={workSets}
        toggleWorkStage={toggleWorkStage}
        hrUpdateWorkVideo={hrUpdateWorkVideo}
        openModal={openModal}
        initialSubTab="WORK_SET"
      />
    );
  }
  if (active === 'Assessments') return <AssessmentsView showToast={showToast} />;
  if (active === 'Progress') return <ProgressView workSet={workSets.find((s) => s.employeeId === session.employeeId) || workSets[0]} />;
  if (active === 'History') return <HistoryView />;
  if (active === 'Notifications') return <NotificationsView />;
  if (active === 'Profile') return <ProfileView session={session} />;
  return <EmployeeDashboard session={session} onboardingPercent={onboardingPercent} trainingItems={trainingItems} workSet={workSets.find((s) => s.employeeId === session.employeeId) || workSets[0]} setActive={setActive} />;
}

function EmployeeDashboard({ session, onboardingPercent, trainingItems, workSet, setActive }) {
  const completedSections = Math.round((onboardingPercent / 100) * onboardingSections.length);
  const pendingAssessments = trainingItems.filter((item) => item.type === 'Assessment' && item.progress < 100);
  const stats = getWorkSetStats(workSet.works);

  return (
    <div className="dashboard-simple">
      <section className="simple-welcome">
        <div>
          <h2>Welcome, {session.name}</h2>
          <p>Employee ID: {session.employeeId}</p>
          <p>
            {session.department} / {session.designation}
          </p>
        </div>
      </section>
      <div className="simple-grid">
        <SimpleCard icon={ClipboardCheck} title="Onboarding">
          <SimpleProgress value={onboardingPercent} />
          <p>
            {completedSections} of {onboardingSections.length} sections completed
          </p>
        </SimpleCard>
        <SimpleCard icon={Layers} title="Data Entry">
          <div className="workset-mini-summary">
            <div className="workset-mini-val">
              <strong>{stats.completed} / {stats.total}</strong>
              <span className="badge success">{stats.progressPercent}% Completed</span>
            </div>
            <div className="bar" style={{ margin: '10px 0' }}>
              <span style={{ width: `${stats.progressPercent}%` }} />
            </div>
            <button className="link-button" type="button" onClick={() => setActive('My Training')}>
              Open Data Entry in My Training →
            </button>
          </div>
        </SimpleCard>
        <SimpleCard icon={BookOpen} title="My Training">
          <SimpleList items={trainingItems.slice(0, 2).map((item) => item.title)} />
        </SimpleCard>
        <SimpleCard icon={NotebookTabs} title="Pending Assessment">
          <SimpleList items={pendingAssessments.length ? pendingAssessments.map((item) => item.title) : ['No pending assessments']} />
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
          {current.items.map((item) => (
            <div key={item}>
              <Check size={16} />
              {item}
            </div>
          ))}
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
        <button className="secondary-button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>
          <ChevronLeft size={17} />
          Previous
        </button>
        <button className="secondary-button" onClick={() => setIndex((value) => Math.min(onboardingSections.length - 1, value + 1))} disabled={index === onboardingSections.length - 1}>
          Next
          <ChevronRight size={17} />
        </button>
        <button className="primary-button compact" onClick={completeAll}>
          Save & complete onboarding
        </button>
      </div>
    </div>
  );
}

// Data Entry Main View Component (With Video Support)
function DataEntryWorkSetView({ workSet, role, toggleWorkStage, hrUpdatePerformance, hrUpdateWorkVideo, showToast }) {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showHelp, setShowHelp] = useState(true);
  const [selectedWorkForHr, setSelectedWorkForHr] = useState(null);
  const [selectedVideoWork, setSelectedVideoWork] = useState(null);

  if (!workSet) return <div className="empty">No Data Entry assigned.</div>;

  const stats = getWorkSetStats(workSet.works);

  const filteredWorks = workSet.works.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'ALL' || item.level === levelFilter;
    const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchSearch && matchLevel && matchStatus;
  });

  return (
    <div className="stack">
      {/* Header Banner */}
      <section className="workset-header-card">
        <div className="workset-header-top">
          <div>
            <div className="workset-badge-group">
              <span className="badge-pill primary">Practical Training</span>
              <span className="badge-pill secondary">Assigned: {workSet.assignedDate}</span>
            </div>
            <h2>{workSet.name}</h2>
            <p className="workset-employee-meta">
              <strong>{workSet.employeeName}</strong> ({workSet.employeeId}) · {workSet.department} Department
            </p>
          </div>
          <div className="workset-progress-ring-box">
            <div className="workset-progress-big">
              <strong>{stats.completed} / {stats.total}</strong>
              <span>Works Completed</span>
            </div>
            <div className="workset-progress-bar-wrap">
              <div className="workset-progress-bar">
                <span style={{ width: `${stats.progressPercent}%` }} />
              </div>
              <span className="workset-percent-label">{stats.progressPercent}% Completed</span>
            </div>
          </div>
        </div>

        {/* 5 Stats Pills */}
        <div className="workset-stats-grid">
          <div className="workset-stat-pill">
            <span className="stat-num">{stats.total}</span>
            <span className="stat-lbl">Total Works</span>
          </div>
          <div className="workset-stat-pill learned">
            <span className="stat-num">{stats.learned}</span>
            <span className="stat-lbl">Learned (A)</span>
          </div>
          <div className="workset-stat-pill practical">
            <span className="stat-num">{stats.practical}</span>
            <span className="stat-lbl">Practical (B/C)</span>
          </div>
          <div className="workset-stat-pill completed">
            <span className="stat-num">{stats.completed}</span>
            <span className="stat-lbl">Completed</span>
          </div>
          <div className="workset-stat-pill pending">
            <span className="stat-num">{stats.pending}</span>
            <span className="stat-lbl">Pending</span>
          </div>
        </div>
      </section>

      {/* Information / Help Box */}
      <section className="workset-help-card">
        <div className="help-head" onClick={() => setShowHelp(!showHelp)}>
          <div className="help-title">
            <HelpCircle size={20} />
            <span>Training Stages & Difficulty Level Reference</span>
          </div>
          <button className="icon-button" type="button">
            {showHelp ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {showHelp && (
          <div className="help-content-grid">
            <div className="help-column">
              <h4>A / B / C Training Tracking Stages</h4>
              <ul className="help-stage-list">
                <li>
                  <strong className="chip-stage a">A — Learned</strong> Initial training & theoretical understanding completed.
                </li>
                <li>
                  <strong className="chip-stage b">B — Practical Data Entry</strong> Active live data entry performed under observation.
                </li>
                <li>
                  <strong className="chip-stage c">C — Practical for 4 Days</strong> Consistent error-free data entry maintained for 4 consecutive days.
                </li>
              </ul>
            </div>
            <div className="help-column">
              <h4>Work Difficulty Levels</h4>
              <ul className="help-level-list">
                <li>
                  <span className="badge-level l1">L1 — Hard Work</span> Complex multi-variable mill entries (Compacting, Stenter, Petrol).
                </li>
                <li>
                  <span className="badge-level l2">L2 — Medium Work</span> Standard lab cards & batch format logging (LRN, LDN, QAD).
                </li>
                <li>
                  <span className="badge-level l3">L3 — Easy Work</span> Routine register audits & follow-ups (Lab RL, Book Prep, ABC).
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Filters and Search Bar */}
      <div className="workset-toolbar">
        <div className="search flex-1">
          <Search size={17} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search work title or description..." />
        </div>
        <div className="filter-group">
          <div className="select-wrap">
            <Filter size={16} />
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
              <option value="ALL">All Levels</option>
              <option value="L1">L1 — Hard Work</option>
              <option value="L2">L2 — Medium Work</option>
              <option value="L3">L3 — Easy Work</option>
            </select>
          </div>
          <div className="select-wrap">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="Learned">Learned</option>
              <option value="Practical">Practical</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Responsive Table View */}
      <div className="workset-table-container desktop-only">
        <table className="workset-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>S.No</th>
              <th>Work Details & Training Video</th>
              <th style={{ width: '100px' }}>Level</th>
              <th style={{ width: '60px', textAlign: 'center' }} title="A — Learned">A</th>
              <th style={{ width: '60px', textAlign: 'center' }} title="B — Practical Data Entry">B</th>
              <th style={{ width: '60px', textAlign: 'center' }} title="C — Practical Data Entry for 4 days">C</th>
              <th style={{ width: '180px' }}>Performance</th>
              <th style={{ width: '120px' }}>Status</th>
              {role === 'HR' && <th style={{ width: '100px' }}>HR Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredWorks.length === 0 ? (
              <tr>
                <td colSpan={role === 'HR' ? 9 : 8} className="empty-table-cell">
                  No matching work items found.
                </td>
              </tr>
            ) : (
              filteredWorks.map((item, index) => (
                <tr key={item.id} className={`work-row ${item.status.toLowerCase().replace(' ', '-')}`}>
                  <td className="sno-cell">{index + 1}</td>
                  <td className="work-details-cell">
                    <div className="work-title-row">
                      <strong className="work-title">{item.title}</strong>
                      <button
                        type="button"
                        className={`video-btn ${role === 'HR' ? 'hr-btn' : ''}`}
                        onClick={() => setSelectedVideoWork(item)}
                        title={role === 'HR' ? 'Add or Edit video link for employees' : 'Watch practical demo video for this task'}
                      >
                        {role === 'HR' ? <Video size={13} /> : <Play size={12} />}
                        {role === 'HR' ? 'Add/Edit Video' : 'Watch Video'}
                      </button>
                    </div>
                    <p className="work-desc">{item.description}</p>
                  </td>
                  <td>
                    <span className={`badge-level ${item.level.toLowerCase()}`}>{item.level}</span>
                  </td>
                  <td className="stage-check-cell">
                    <label className={`checkbox-wrap ${role !== 'HR' ? 'readonly' : ''}`} title={role !== 'HR' ? 'Stage marked by HR' : 'Toggle Stage A'}>
                      <input
                        type="checkbox"
                        checked={item.stageA}
                        disabled={role !== 'HR'}
                        onChange={() => role === 'HR' && toggleWorkStage(workSet.id, item.id, 'stageA')}
                      />
                      <span className={`custom-checkbox ${role !== 'HR' ? 'readonly' : ''}`}><Check size={14} /></span>
                    </label>
                  </td>
                  <td className="stage-check-cell">
                    <label className={`checkbox-wrap ${role !== 'HR' ? 'readonly' : ''}`} title={role !== 'HR' ? 'Stage marked by HR' : 'Toggle Stage B'}>
                      <input
                        type="checkbox"
                        checked={item.stageB}
                        disabled={role !== 'HR'}
                        onChange={() => role === 'HR' && toggleWorkStage(workSet.id, item.id, 'stageB')}
                      />
                      <span className={`custom-checkbox ${role !== 'HR' ? 'readonly' : ''}`}><Check size={14} /></span>
                    </label>
                  </td>
                  <td className="stage-check-cell">
                    <label className={`checkbox-wrap ${role !== 'HR' ? 'readonly' : ''}`} title={role !== 'HR' ? 'Stage marked by HR' : 'Toggle Stage C'}>
                      <input
                        type="checkbox"
                        checked={item.stageC}
                        disabled={role !== 'HR'}
                        onChange={() => role === 'HR' && toggleWorkStage(workSet.id, item.id, 'stageC')}
                      />
                      <span className={`custom-checkbox ${role !== 'HR' ? 'readonly' : ''}`}><Check size={14} /></span>
                    </label>
                  </td>
                  <td className="performance-cell">
                    <div className="perf-box">
                      <div className="perf-top">
                        <span className={`perf-badge ${item.performanceStatus.toLowerCase()}`}>{item.performanceStatus}</span>
                        {item.score !== null && <span className="score-tag">{item.score}/100</span>}
                      </div>
                      {item.hrRemarks && <p className="hr-remarks-text">"{item.hrRemarks}"</p>}
                      {item.hrApproved && <span className="hr-verified-tag"><ShieldCheck size={12} /> HR Verified</span>}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  {role === 'HR' && (
                    <td>
                      <div className="flex-stack-sm">
                        <button
                          className="secondary-button compact text-xs"
                          onClick={() => setSelectedWorkForHr({ workSetId: workSet.id, item })}
                        >
                          <Edit3 size={13} /> Evaluate
                        </button>
                        <button
                          className="link-button compact text-xs"
                          onClick={() => setSelectedVideoWork(item)}
                        >
                          <Video size={13} /> Edit Video
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Expandable Cards View */}
      <div className="mobile-cards-container mobile-only">
        {filteredWorks.length === 0 ? (
          <div className="empty">No matching work items found.</div>
        ) : (
          filteredWorks.map((item, index) => (
            <div key={item.id} className={`work-card-mobile ${item.status.toLowerCase().replace(' ', '-')}`}>
              <div className="mobile-card-header">
                <span className="mobile-sno">#{index + 1}</span>
                <span className={`badge-level ${item.level.toLowerCase()}`}>{item.level}</span>
                <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>
              </div>
              <h3 className="mobile-work-title">{item.title}</h3>
              <p className="mobile-work-desc">{item.description}</p>

              {/* Mobile Video Action Button */}
              <button
                type="button"
                className="mobile-video-btn"
                onClick={() => setSelectedVideoWork(item)}
              >
                {role === 'HR' ? <Video size={14} /> : <Play size={14} />}
                {role === 'HR' ? 'Add / Edit Training Video' : 'Watch Training Video Demo'}
              </button>

              {/* Mobile Stage Checkboxes */}
              <div className="mobile-stages-row">
                <label className={`mobile-stage-btn ${item.stageA ? 'checked' : ''} ${role !== 'HR' ? 'readonly' : ''}`}>
                  <input
                    type="checkbox"
                    checked={item.stageA}
                    disabled={role !== 'HR'}
                    onChange={() => role === 'HR' && toggleWorkStage(workSet.id, item.id, 'stageA')}
                  />
                  <span>A (Learned)</span>
                </label>
                <label className={`mobile-stage-btn ${item.stageB ? 'checked' : ''} ${role !== 'HR' ? 'readonly' : ''}`}>
                  <input
                    type="checkbox"
                    checked={item.stageB}
                    disabled={role !== 'HR'}
                    onChange={() => role === 'HR' && toggleWorkStage(workSet.id, item.id, 'stageB')}
                  />
                  <span>B (Practical)</span>
                </label>
                <label className={`mobile-stage-btn ${item.stageC ? 'checked' : ''} ${role !== 'HR' ? 'readonly' : ''}`}>
                  <input
                    type="checkbox"
                    checked={item.stageC}
                    disabled={role !== 'HR'}
                    onChange={() => role === 'HR' && toggleWorkStage(workSet.id, item.id, 'stageC')}
                  />
                  <span>C (4 Days)</span>
                </label>
              </div>

              {/* Mobile Performance Box */}
              <div className="mobile-perf-box">
                <div className="mobile-perf-head">
                  <span className="label">Performance:</span>
                  <span className={`perf-badge ${item.performanceStatus.toLowerCase()}`}>{item.performanceStatus}</span>
                  {item.score !== null && <span className="score-tag">{item.score}/100</span>}
                </div>
                {item.hrRemarks && <p className="hr-remarks-text">"{item.hrRemarks}"</p>}
              </div>

              {role === 'HR' && (
                <button
                  className="secondary-button compact full-width margin-top-sm"
                  onClick={() => setSelectedWorkForHr({ workSetId: workSet.id, item })}
                >
                  <Edit3 size={14} /> Evaluate Performance
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideoWork && (
        <WorkVideoModal
          item={selectedVideoWork}
          role={role}
          onClose={() => setSelectedVideoWork(null)}
          onUpdateVideo={(workId, newUrl) => {
            if (hrUpdateWorkVideo) hrUpdateWorkVideo(workSet.id, workId, newUrl);
          }}
        />
      )}

      {/* HR Evaluation Modal */}
      {selectedWorkForHr && (
        <HrPerformanceModal
          target={selectedWorkForHr}
          onClose={() => setSelectedWorkForHr(null)}
          onSave={hrUpdatePerformance}
        />
      )}
    </div>
  );
}

// Training Video Modal Component
function WorkVideoModal({ item, onClose, role, onUpdateVideo }) {
  const [editing, setEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(item.videoUrl || '');

  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (onUpdateVideo) {
      onUpdateVideo(item.id, videoUrl);
    }
    setEditing(false);
  };

  let embedUrl = videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  if (embedUrl.includes('watch?v=')) {
    embedUrl = embedUrl.replace('watch?v=', 'embed/');
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="video-modal">
        <div className="video-modal-head">
          <div>
            <div className="workset-badge-group margin-bottom-xs">
              <span className={`badge-level ${item.level.toLowerCase()}`}>{item.level}</span>
              <span className="badge-pill primary">Practical Training Video</span>
            </div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose}>X</button>
        </div>

        {/* Video Player Frame */}
        <div className="video-player-container">
          {embedUrl.endsWith('.mp4') || embedUrl.endsWith('.webm') ? (
            <video controls src={embedUrl} className="video-element" autoPlay>
              Your browser does not support video playback.
            </video>
          ) : (
            <iframe
              src={embedUrl}
              title={`${item.title} Training Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            />
          )}
        </div>

        {/* HR Edit Video Link Form */}
        {role === 'HR' && (
          <div className="hr-video-edit-bar">
            {editing ? (
              <form onSubmit={handleSaveVideo} className="video-edit-form">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste YouTube embed URL or MP4 video link..."
                  className="input-wrap flex-1"
                />
                <button type="submit" className="primary-button compact">Save Video Link</button>
                <button type="button" className="secondary-button compact" onClick={() => setEditing(false)}>Cancel</button>
              </form>
            ) : (
              <button className="link-button" type="button" onClick={() => setEditing(true)}>
                <Edit3 size={14} /> Edit Video Link (HR Only)
              </button>
            )}
          </div>
        )}

        <div className="video-modal-footer">
          <div className="video-instruction-note">
            <Info size={16} />
            <span>Watch the practical video demo carefully before logging entries on the system.</span>
          </div>
          <button className="primary-button compact" type="button" onClick={onClose}>Close Video</button>
        </div>
      </div>
    </div>
  );
}

// HR Performance Evaluation Modal
function HrPerformanceModal({ target, onClose, onSave }) {
  const { workSetId, item } = target;
  const [score, setScore] = useState(item.score !== null ? item.score : '');
  const [perfStatus, setPerfStatus] = useState(item.performanceStatus || 'Satisfactory');
  const [remarks, setRemarks] = useState(item.hrRemarks || '');
  const [videoUrl, setVideoUrl] = useState(item.videoUrl || '');
  const [approved, setApproved] = useState(Boolean(item.hrApproved));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(workSetId, item.id, score, perfStatus, remarks, approved, videoUrl);
    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <form className="process-modal" onSubmit={handleSubmit}>
        <div className="modal-head">
          <div>
            <h2>HR Performance Evaluation</h2>
            <p>Work Item: <strong>{item.title}</strong> ({item.level})</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose}>X</button>
        </div>
        <div className="modal-fields">
          <label>
            Performance Status
            <select value={perfStatus} onChange={(e) => setPerfStatus(e.target.value)} className="input-wrap select-input">
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Satisfactory">Satisfactory</option>
              <option value="Needs Improvement">Needs Improvement</option>
              <option value="Pending">Pending</option>
            </select>
          </label>
          <label>
            Practical Score / Mark (0 - 100)
            <div className="input-wrap">
              <input type="number" min="0" max="100" value={score} onChange={(e) => setScore(e.target.value)} placeholder="e.g. 92" />
            </div>
          </label>
          <label>
            Training Video Link (YouTube embed or MP4 URL)
            <div className="input-wrap">
              <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="e.g. https://www.youtube.com/embed/..." />
            </div>
          </label>
          <label>
            HR Remarks / Observations
            <div className="input-wrap">
              <textarea rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Enter HR comments or practical feedback..." style={{ width: '100%', border: 0, outline: 0, background: 'transparent', padding: '8px 0', fontFamily: 'inherit' }} />
            </div>
          </label>
          <label className="check-row margin-top-xs">
            <input type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} />
            Mark as HR Verified & Approved (Locks score)
          </label>
        </div>
        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="submit">Save Evaluation</button>
        </div>
      </form>
    </div>
  );
}

// HR Work Sets Manager View Component
function HrWorkSetManager({ workSets, toggleWorkStage, hrUpdatePerformance, hrUpdateWorkVideo, hrAddWorkItem, hrCreateWorkSet, showToast }) {
  const [selectedSetId, setSelectedSetId] = useState(workSets[0]?.id || '');
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const [showCreateSetModal, setShowCreateSetModal] = useState(false);

  const currentSet = workSets.find((s) => s.id === selectedSetId) || workSets[0];

  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">HR TRAINING ADMINISTRATION</p>
          <h2>Data Entry</h2>
          <p>Create work sets, assign 20+ data entry items with video demos, set difficulty levels, and verify practical performance.</p>
        </div>
        <div className="top-actions">
          <button className="secondary-button compact" onClick={() => setShowAddWorkModal(true)}>
            <Plus size={17} /> Add Work Item
          </button>
          <button className="primary-button compact" onClick={() => setShowCreateSetModal(true)}>
            <Layers size={17} /> Assign New Work Set
          </button>
        </div>
      </section>

      {/* Select Employee Work Set */}
      <div className="workset-selector-bar">
        <label>
          Select Employee Work Set:
          <select value={selectedSetId} onChange={(e) => setSelectedSetId(e.target.value)} className="workset-select">
            {workSets.map((set) => {
              const stats = getWorkSetStats(set.works);
              return (
                <option key={set.id} value={set.id}>
                  {set.employeeName} ({set.employeeId}) — {set.name} ({stats.completed}/{stats.total} Completed)
                </option>
              );
            })}
          </select>
        </label>
      </div>

      {currentSet ? (
        <DataEntryWorkSetView
          workSet={currentSet}
          role="HR"
          toggleWorkStage={toggleWorkStage}
          hrUpdatePerformance={hrUpdatePerformance}
          hrUpdateWorkVideo={hrUpdateWorkVideo}
          showToast={showToast}
        />
      ) : (
        <div className="empty">No Work Sets available.</div>
      )}

      {/* Add Work Item Modal */}
      {showAddWorkModal && currentSet && (
        <HrAddWorkItemModal
          workSet={currentSet}
          onClose={() => setShowAddWorkModal(false)}
          onAdd={hrAddWorkItem}
        />
      )}

      {/* Create Work Set Modal */}
      {showCreateSetModal && (
        <HrCreateWorkSetModal
          employees={employees}
          onClose={() => setShowCreateSetModal(false)}
          onCreate={hrCreateWorkSet}
        />
      )}
    </div>
  );
}

// Modal: HR Add Work Item
function HrAddWorkItemModal({ workSet, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('L2');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(workSet.id, { title, level, description, videoUrl });
    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <form className="process-modal" onSubmit={handleSubmit}>
        <div className="modal-head">
          <div>
            <h2>Add New Work Item</h2>
            <p>Add to Data Entry: <strong>{workSet.name}</strong> ({workSet.employeeName})</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose}>X</button>
        </div>
        <div className="modal-fields">
          <label>
            Work Details / Title
            <div className="input-wrap">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Fabric Inspection Entry" required />
            </div>
          </label>
          <label>
            Difficulty Level
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="input-wrap select-input">
              <option value="L1">L1 — Hard Work</option>
              <option value="L2">L2 — Medium Work</option>
              <option value="L3">L3 — Easy Work</option>
            </select>
          </label>
          <label>
            Work Description & Instructions
            <div className="input-wrap">
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Daily fabric defect log verification" />
            </div>
          </label>
          <label>
            Training Video Link (YouTube embed or MP4 URL)
            <div className="input-wrap">
              <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="e.g. https://www.youtube.com/embed/..." />
            </div>
          </label>
        </div>
        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="submit">Add Item</button>
        </div>
      </form>
    </div>
  );
}

// Modal: HR Create / Assign Work Set
function HrCreateWorkSetModal({ employees, onClose, onCreate }) {
  const [name, setName] = useState('Data Entry');
  const [employeeId, setEmployeeId] = useState(employees[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, employeeId });
    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <form className="process-modal" onSubmit={handleSubmit}>
        <div className="modal-head">
          <div>
            <h2>Assign New Data Entry Work Set</h2>
            <p>Assign default 20-item Data Entry set with video demos to an employee.</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose}>X</button>
        </div>
        <div className="modal-fields">
          <label>
            Work Set Name
            <div className="input-wrap">
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </label>
          <label>
            Assign To Employee
            <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="input-wrap select-input">
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.id}) — {emp.department}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="submit">Assign Work Set</button>
        </div>
      </form>
    </div>
  );
}

// MD Practical Training Analytics Component
function MdWorkSetOverview({ workSets }) {
  const allWorks = workSets.flatMap((s) => s.works);
  const total = allWorks.length;
  const completed = allWorks.filter((w) => w.status === 'Completed').length;
  const practical = allWorks.filter((w) => w.status === 'Practical').length;

  const l1Works = allWorks.filter((w) => w.level === 'L1');
  const l2Works = allWorks.filter((w) => w.level === 'L2');
  const l3Works = allWorks.filter((w) => w.level === 'L3');

  const l1Completed = Math.round((l1Works.filter((w) => w.status === 'Completed').length / (l1Works.length || 1)) * 100);
  const l2Completed = Math.round((l2Works.filter((w) => w.status === 'Completed').length / (l2Works.length || 1)) * 100);
  const l3Completed = Math.round((l3Works.filter((w) => w.status === 'Completed').length / (l3Works.length || 1)) * 100);

  const overallPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stack">
      <section className="section-head executive">
        <div>
          <p className="eyebrow">Executive Leadership Overview</p>
          <h2>Data Entry Analytics</h2>
          <p>Mill-wide practical training execution stats across difficulty levels and employee work sets.</p>
        </div>
        <ProgressRing value={overallPercent} label="Practical Readiness" />
      </section>

      <section className="metric-grid">
        <Metric icon={Layers} label="Total Assigned Works" value={total} />
        <Metric icon={CheckCircle2} label="Fully Completed Works" value={completed} />
        <Metric icon={BriefcaseBusiness} label="Under Practical Entry" value={practical} />
        <Metric icon={Award} label="Avg Practical Score" value="91/100" />
      </section>

      <div className="md-chart-grid">
        <section className="md-chart-card">
          <div className="md-chart-head">
            <h3>Completion by Difficulty Level</h3>
            <span className="badge">Live</span>
          </div>
          <div className="md-ring-row">
            <MdChartRing value={l1Completed} label="L1 Hard Work" />
            <MdChartRing value={l2Completed} label="L2 Medium Work" />
            <MdChartRing value={l3Completed} label="L3 Easy Work" />
          </div>
        </section>

        <section className="md-chart-card">
          <div className="md-chart-head">
            <h3>Employee Practical Completion</h3>
            <span className="badge">Assigned Work Sets</span>
          </div>
          <div className="md-bars">
            {workSets.map((set) => {
              const stats = getWorkSetStats(set.works);
              return (
                <div key={set.id} className="md-bar-line">
                  <span>{set.employeeName}</span>
                  <div className="bar">
                    <span style={{ width: `${stats.progressPercent}%` }} />
                  </div>
                  <strong>{stats.completed}/{stats.total} ({stats.progressPercent}%)</strong>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <Panel title="Assigned Work Sets Overview">
        <DataTable
          columns={['Employee', 'Work Set Name', 'Assigned Date', 'Total', 'Completed', 'Progress', 'Status']}
          rows={workSets.map((set) => {
            const stats = getWorkSetStats(set.works);
            return [
              set.employeeName,
              set.name,
              set.assignedDate,
              stats.total,
              stats.completed,
              `${stats.progressPercent}%`,
              stats.progressPercent === 100 ? 'Completed' : 'In Training'
            ];
          })}
        />
      </Panel>
    </div>
  );
}

function HrContent(props) {
  const { active, session, showToast, trainingItems, setTrainingItems, generatedReports, setGeneratedReports, openModal, workSets, toggleWorkStage, hrUpdatePerformance, hrUpdateWorkVideo, hrAddWorkItem, hrCreateWorkSet } = props;

  if (active === 'Employees') return <EmployeesView showToast={showToast} openModal={openModal} />;
  if (active === 'Training' || active === 'Data Entry') {
    return (
      <TrainingView
        role="HR"
        session={session}
        showToast={showToast}
        trainingItems={trainingItems}
        setTrainingItems={setTrainingItems}
        openModal={openModal}
        workSets={workSets}
        toggleWorkStage={toggleWorkStage}
        hrUpdatePerformance={hrUpdatePerformance}
        hrUpdateWorkVideo={hrUpdateWorkVideo}
        hrAddWorkItem={hrAddWorkItem}
        hrCreateWorkSet={hrCreateWorkSet}
        initialSubTab="WORK_SET"
      />
    );
  }
  if (active === 'Onboarding') return <OnboardingMonitor />;
  if (active === 'Assessments') return <AssessmentsView canManage showToast={showToast} openModal={openModal} />;
  if (active === 'Progress') return <ProgressView company workSet={workSets[0]} />;
  if (active === 'Reports') return <ReportsView generatedReports={generatedReports} setGeneratedReports={setGeneratedReports} showToast={showToast} />;
  if (active === 'Notifications') return <NotificationsView />;
  if (active === 'Profile') return <ProfileView session={session} />;
  return <HrDashboard showToast={showToast} openModal={openModal} workSets={workSets} />;
}

function HrDashboard({ showToast, openModal, workSets }) {
  const actionFields = {
    'Add Employee': ['Employee name', 'Employee ID', 'Department', 'Designation'],
    'Assign Training': ['Training title', 'Employee or department', 'Due date'],
    'Upload Material': ['Material title', 'Material type', 'Assigned department'],
    'View Reports': []
  };
  const totalAssignedWorks = workSets.reduce((sum, set) => sum + set.works.length, 0);
  const totalCompletedWorks = workSets.reduce((sum, set) => sum + set.works.filter((w) => w.status === 'Completed').length, 0);

  return (
    <div className="dashboard-simple">
      <section className="simple-welcome">
        <div>
          <h2>HR Dashboard</h2>
          <p>Simple overview of employees, onboarding, practical data entry, and training.</p>
        </div>
      </section>
      <div className="simple-stats">
        <Metric icon={Users} label="Total Employees" value="124" />
        <Metric icon={Layers} label="Data Entry Works" value={`${totalCompletedWorks}/${totalAssignedWorks}`} />
        <Metric icon={BookOpen} label="Training Assigned" value="81" />
        <Metric icon={NotebookTabs} label="Pending Assessments" value="7" />
      </div>
      <div className="simple-two-column">
        <SimpleCard icon={History} title="Recent Employee Activity">
          <SimpleList items={['Arun watched Compacting Card Entry training video', 'Nisha completed Accounts Data Entry', 'Rahul onboarding in grace review']} />
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
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
        </SimpleCard>
      </div>
    </div>
  );
}

function MdContent(props) {
  const { active, session, showToast, generatedReports, setGeneratedReports, approvalItems, setApprovalItems, workSets, toggleWorkStage, openModal, trainingItems, setTrainingItems, hrUpdateWorkVideo } = props;

  if (active === 'Employees') return <EmployeesView readOnly />;
  if (active === 'Training Overview' || active === 'Data Entry Analytics' || active === 'Data Entry') {
    return (
      <TrainingView
        role="MD"
        session={session}
        showToast={showToast}
        trainingItems={trainingItems}
        setTrainingItems={setTrainingItems}
        openModal={openModal}
        workSets={workSets}
        toggleWorkStage={toggleWorkStage}
        hrUpdateWorkVideo={hrUpdateWorkVideo}
        initialSubTab="WORK_SET"
      />
    );
  }
  if (active === 'Performance') return <PerformanceView workSets={workSets} />;
  if (active === 'Reports') return <ReportsView executive generatedReports={generatedReports} setGeneratedReports={setGeneratedReports} showToast={showToast} />;
  if (active === 'Approvals') return <ApprovalsView approvalItems={approvalItems} setApprovalItems={setApprovalItems} showToast={showToast} />;
  if (active === 'Notifications') return <NotificationsView />;
  if (active === 'Profile') return <ProfileView session={session} />;
  return <MdDashboard approvalItems={approvalItems} workSets={workSets} />;
}

function MdDashboard({ approvalItems, workSets }) {
  const pendingApprovals = approvalItems.filter((item) => item.status !== 'Approved').length;
  const allWorks = workSets.flatMap((s) => s.works);
  const completedRate = Math.round((allWorks.filter((w) => w.status === 'Completed').length / (allWorks.length || 1)) * 100);

  return (
    <div className="dashboard-simple">
      <section className="simple-welcome">
        <div>
          <h2>MD Dashboard</h2>
          <p>Management-focused LMS and Practical Training summary for Junior Processing Mill.</p>
        </div>
      </section>
      <div className="simple-stats">
        <Metric icon={Users} label="Total employees" value="124" />
        <Metric icon={Layers} label="Data Entry Completion" value={`${completedRate}%`} />
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
            <MdChartRing value={completedRate} label="Data Entry" />
            <MdChartRing value={76} label="Training" />
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
          <SimpleList items={['Data Entry (20 works) 60% completed', 'Monthly learning report is ready', '7 assessments currently open']} />
        </SimpleCard>
        <SimpleCard icon={FileText} title="Quick Reports">
          <SimpleList items={['Data Entry Practical Summary', 'Onboarding Summary', 'Assessment Status']} />
        </SimpleCard>
        <SimpleCard icon={ShieldCheck} title="Pending Decisions">
          <div className="decision-list">
            <StatusLine text="Monthly learning report" status="Ready" />
            <StatusLine text="Data Entry evaluations" status="Review" />
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
        {!readOnly && (
          <button className="primary-button compact" onClick={() => openModal('Add Employee', 'Create a new employee profile for LMS onboarding.', ['Employee name', 'Employee ID', 'Department', 'Designation'])}>
            <Users size={17} />
            Add employee
          </button>
        )}
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
      <section className="section-head">
        <div>
          <p className="eyebrow">Monitoring</p>
          <h2>Employee onboarding status</h2>
        </div>
      </section>
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

// Unified TrainingView with Sub-Tabs
function TrainingView({ role, session, showToast, trainingItems = trainings, setTrainingItems, openModal, workSets, toggleWorkStage, hrUpdatePerformance, hrUpdateWorkVideo, hrAddWorkItem, hrCreateWorkSet, initialSubTab = 'WORK_SET' }) {
  const [activeTab, setActiveTab] = useState(initialSubTab);
  const isHr = role === 'HR' || role === 'hr';
  const isMd = role === 'MD' || role === 'md';
  const isEmp = role === 'EMPLOYEE' || role === 'employee';
  const uploadFields = ['Material title', 'Type: video / document / assessment', 'Department', 'Due date'];

  const userSet = workSets ? (workSets.find((s) => s.employeeId === session?.employeeId) || workSets[0]) : null;

  return (
    <div className="stack">
      {/* Sub Navigation Bar for Training */}
      <div className="training-subnav-tabs">
        <button
          type="button"
          className={`subnav-tab ${activeTab === 'WORK_SET' ? 'active' : ''}`}
          onClick={() => setActiveTab('WORK_SET')}
        >
          <Layers size={18} />
          <span>Data Entry</span>
        </button>
        <button
          type="button"
          className={`subnav-tab ${activeTab === 'MATERIALS' ? 'active' : ''}`}
          onClick={() => setActiveTab('MATERIALS')}
        >
          <BookOpen size={18} />
          <span>Videos & Course Materials</span>
        </button>
      </div>

      {activeTab === 'WORK_SET' ? (
        isEmp ? (
          <DataEntryWorkSetView
            workSet={userSet}
            role="EMPLOYEE"
            toggleWorkStage={toggleWorkStage}
            hrUpdateWorkVideo={hrUpdateWorkVideo}
            showToast={showToast}
          />
        ) : isHr ? (
          <HrWorkSetManager
            workSets={workSets}
            toggleWorkStage={toggleWorkStage}
            hrUpdatePerformance={hrUpdatePerformance}
            hrUpdateWorkVideo={hrUpdateWorkVideo}
            hrAddWorkItem={hrAddWorkItem}
            hrCreateWorkSet={hrCreateWorkSet}
            showToast={showToast}
          />
        ) : (
          <MdWorkSetOverview workSets={workSets} />
        )
      ) : (
        <div className="stack">
          <section className="section-head">
            <div>
              <p className="eyebrow">{isHr ? 'Training administration' : 'Assigned learning'}</p>
              <h2>{isHr ? 'Training videos and materials' : 'Videos & Course Materials'}</h2>
              <p>{isHr ? 'Upload learning materials, schedule training, and assign employees.' : 'General learning videos and reference materials assigned to you.'}</p>
            </div>
            {isHr && (
              <button className="primary-button compact" onClick={() => openModal('Upload Material', 'Add training video or material and assign it to employees.', uploadFields)}>
                <Upload size={17} />
                Upload material
              </button>
            )}
          </section>

          <section className="training-grid">
            {trainingItems.map((item) => (
              <TrainingCard key={item.title} item={item} isHr={isHr} showToast={showToast} setTrainingItems={setTrainingItems} openModal={openModal} />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}

function AssessmentsView({ canManage, showToast, openModal }) {
  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">{canManage ? 'Assessment management' : 'Quiz / Assessment'}</p>
          <h2>{canManage ? 'Create and monitor assessments' : 'Assigned assessments'}</h2>
        </div>
        {canManage && (
          <button className="primary-button compact" onClick={() => openModal('Create Assessment', 'Prepare an assessment and assign it to a department or employee.', ['Assessment title', 'Department', 'Due date', 'Passing score'])}>
            <NotebookTabs size={17} />
            Create assessment
          </button>
        )}
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

function ProgressView({ company, workSet }) {
  const stats = workSet ? getWorkSetStats(workSet.works) : { progressPercent: 60 };
  return (
    <div className="stack">
      <section className="metric-grid">
        <Metric icon={LineChart} label={company ? 'Company overall' : 'My training progress'} value={company ? '76%' : '64%'} />
        <Metric icon={Layers} label="Data Entry" value={`${stats.progressPercent}%`} />
        <Metric icon={Target} label="Target achievement" value={company ? '81%' : '74%'} />
        <Metric icon={NotebookTabs} label="Assessment score" value={company ? '84%' : '78%'} />
      </section>
      <Panel title="Progress Breakdown">
        <DepartmentBars />
      </Panel>
    </div>
  );
}

function HistoryView() {
  return <DataTable columns={['Training', 'Completed on', 'Score', 'Status']} rows={[['Junior Processing Mill Induction', 'Aug 12', '92%', 'Completed'], ['Policy Basics', 'Aug 14', '88%', 'Completed'], ['Safety Orientation', 'Aug 18', 'In progress', 'Open']]} />;
}

function PerformanceView({ workSets }) {
  return (
    <div className="stack">
      <Panel title="Assessment & Practical Performance">
        <DepartmentBars />
      </Panel>
      <DataTable columns={['Department', 'Employees', 'Data Entry', 'Assessment', 'Risk']} rows={[['Production', '58', '60%', '81%', 'Medium'], ['Office', '24', '100%', '89%', 'Low'], ['Quality', '19', '75%', '76%', 'Medium'], ['Operations', '23', '80%', '85%', 'Low']]} />
    </div>
  );
}

function ReportsView({ executive, generatedReports = [], setGeneratedReports, showToast }) {
  const reportNames = ['Data Entry Practical Report', 'Onboarding Summary', 'Training Completion', executive ? 'Executive Decision Pack' : 'Employee Progress'];
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
    setApprovalItems(approvalItems.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item)));
    showToast('Decision recorded');
  };
  return (
    <div className="stack">
      <Panel title="Approval / Important Decisions">
        {approvalItems.map((item) => (
          <div className="approval" key={item.id}>
            <span>{item.text}</span>
            <span className={item.status === 'Approved' ? 'badge success' : 'badge'}>{item.status}</span>
            <button className="primary-button compact" onClick={() => approve(item.id)} disabled={item.status === 'Approved'}>
              {item.status === 'Approved' ? 'Approved' : 'Approve'}
            </button>
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
            <p>
              {session.employeeId} · {session.role}
            </p>
            <p>
              {session.department} · {session.designation}
            </p>
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
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Panel({ title, action, children }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h3>{title}</h3>
        {action && <button className="link-button">{action}</button>}
      </div>
      {children}
    </section>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <article className="metric">
      <Icon size={22} />
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
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
      <div className="bar">
        <span style={{ width: `${value}%` }} />
      </div>
      <strong>{value}%</strong>
    </div>
  );
}

function SimpleList({ items }) {
  return (
    <ul className="simple-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
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
          <div className="bar">
            <span style={{ width: `${value}%` }} />
          </div>
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
      <div className="bar">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function ProgressRing({ value, label }) {
  const style = { background: `conic-gradient(var(--primary) ${value * 3.6}deg, #e5e5ea 0deg)` };
  return (
    <div className="ring" style={style}>
      <div>
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function TrainingRow({ item }) {
  return (
    <div className="training-row">
      <div>
        <strong>{item.title}</strong>
        <span>
          {item.type} · Due {item.due}
        </span>
      </div>
      <div className="bar">
        <span style={{ width: `${item.progress}%` }} />
      </div>
      <span className="badge">{item.status}</span>
    </div>
  );
}

function TrainingCard({ item, isHr, showToast, setTrainingItems, openModal }) {
  const advanceTraining = () => {
    const nextProgress = Math.min(100, item.progress + 25);
    setTrainingItems((current) =>
      current.map((training) =>
        training.title === item.title
          ? { ...training, progress: nextProgress, status: nextProgress === 100 ? 'Completed' : 'In progress' }
          : training
      )
    );
    showToast(nextProgress === 100 ? 'Training completed' : 'Training progress saved');
  };

  return (
    <article className="training-card">
      <div className="card-icon">
        <BookOpen size={22} />
      </div>
      <h3>{item.title}</h3>
      <p>
        {item.type} · Owner: {item.owner}
      </p>
      <div className="bar">
        <span style={{ width: `${item.progress}%` }} />
      </div>
      <div className="card-actions">
        <span className="badge">{item.status}</span>
        <button
          className="secondary-button"
          onClick={() =>
            isHr
              ? openModal('Assign Training', `Assign ${item.title} to employees or a department.`, ['Employee or department', 'Due date', 'Priority'])
              : advanceTraining()
          }
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
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog">
            X
          </button>
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
          <button className="secondary-button" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-button" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save process'}
          </button>
        </div>
      </form>
    </div>
  );
}

function StatusLine({ text, status }) {
  return (
    <div className="status-line">
      <span>{text}</span>
      <span className="badge">{status}</span>
    </div>
  );
}

function EmployeeMini({ employee, value }) {
  return (
    <div className="employee-mini">
      <div>
        <strong>{employee.name}</strong>
        <span>
          {employee.id} · {employee.department}
        </span>
      </div>
      <div className="bar">
        <span style={{ width: `${value}%` }} />
      </div>
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
  return (
    <div className="dept-bars">
      {data.map(([label, value]) => (
        <EmployeeMini key={label} employee={{ name: label, id: 'Department', department: 'Progress' }} value={value} />
      ))}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
