import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { UserRole } from '../../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Calendar,
  DollarSign,
  Calculator,
  Search,
  FileCheck,
  Award
} from 'lucide-react';

interface AdmissionsPageProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onNavigate }) => {
  const { departments, programs, submitAdmission, admissions } = useCollegeData();

  const [activeTab, setActiveTab] = useState<'apply' | 'status' | 'calculator'>('apply');
  const [step, setStep] = useState<number>(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState(departments[0]?.name || 'Computer Science & Engineering');
  const [program, setProgram] = useState(programs[0]?.name || 'B.Tech in Computer Science & Engineering');
  const [previousMarks, setPreviousMarks] = useState<number>(92);
  const [category, setCategory] = useState<'General' | 'OBC' | 'SC/ST' | 'International'>('General');

  // Submitted Application ID
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Status Check
  const [searchAppId, setSearchAppId] = useState('');
  const [searchedApp, setSearchedApp] = useState<any>(null);

  // Calculator State
  const [calcScore, setCalcScore] = useState<number>(90);
  const [calcDept, setCalcDept] = useState('Computer Science & Engineering');

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const appId = submitAdmission({
      fullName,
      email,
      phone,
      department,
      program,
      previousMarks,
      category
    });

    setSubmittedAppId(appId);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    const found = admissions.find(
      (a) => a.applicationNumber.toLowerCase() === searchAppId.trim().toLowerCase()
    );
    setSearchedApp(found || 'not_found');
  };

  const getScholarshipTier = (score: number) => {
    if (score >= 95) return { pct: '75% Merit Scholarship', waiver: 'Tuition Fee Waiver of $138,750/yr' };
    if (score >= 90) return { pct: '50% Merit Scholarship', waiver: 'Tuition Fee Waiver of $92,500/yr' };
    if (score >= 85) return { pct: '25% Dean Scholarship', waiver: 'Tuition Fee Waiver of $46,250/yr' };
    return { pct: 'Standard Admission', waiver: 'Eligible for Need-Based Financial Aid' };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Admissions Open: Academic Year 2026-27
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-heading">
          Apex University Admissions
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Begin your journey toward engineering leadership and world-class research. Simple online application with instant eligibility review.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 justify-center">
        <button
          onClick={() => setActiveTab('apply')}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'apply'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Online Application Wizard
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'status'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Track Application Status
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'calculator'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Scholarship & Fee Calculator
        </button>
      </div>

      {/* Tab 1: Application Wizard */}
      {activeTab === 'apply' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 max-w-3xl mx-auto shadow-2xl">
          {submittedAppId ? (
            <div className="text-center py-10 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  Application Submitted Successfully!
                </h2>
                <p className="text-sm text-slate-300">
                  Your admission dossier has been registered in the Apex Central Admissions ERP.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Application Reference Number:</span>
                  <span className="font-mono font-bold text-indigo-400">{submittedAppId}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Applicant Name:</span>
                  <span className="font-bold text-white">{fullName}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Selected Program:</span>
                  <span className="font-bold text-white">{program}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Status:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    Submitted & Under Review
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    setSubmittedAppId(null);
                    setStep(1);
                    setFullName('');
                    setEmail('');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
                >
                  Submit Another Application
                </button>
                <button
                  onClick={() => setActiveTab('status')}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Check Realtime Status
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitApplication} className="space-y-8">
              {/* Stepper Progress */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                {[
                  { num: 1, label: 'Personal Details' },
                  { num: 2, label: 'Academics & Program' },
                  { num: 3, label: 'Review & Confirm' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        step >= s.num
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {s.num}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold text-slate-300">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-lg font-bold text-white font-heading">Applicant Personal Details</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sterling"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. maya@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Applicant Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="General">General / Open Category</option>
                      <option value="OBC">Other Backward Classes (OBC)</option>
                      <option value="SC/ST">Scheduled Caste / Tribe (SC/ST)</option>
                      <option value="International">International Candidate (F-1 / NRI)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-lg font-bold text-white font-heading">Program Preference & Academic Marks</h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Academic Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Degree Program</label>
                    <select
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      {programs.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} - {p.duration}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      10+2 / High School Final Aggregate Percentage ({previousMarks}%)
                    </label>
                    <input
                      type="range"
                      min="60"
                      max="100"
                      value={previousMarks}
                      onChange={(e) => setPreviousMarks(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>Eligibility Min: 60%</span>
                      <span className="font-bold text-indigo-400">{previousMarks}% Aggregate</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-lg font-bold text-white font-heading">Review & Declaration</h3>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Full Name:</span>
                      <span className="font-bold text-white">{fullName || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Email:</span>
                      <span className="font-bold text-white">{email || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Phone:</span>
                      <span className="font-bold text-white">{phone || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Department:</span>
                      <span className="font-bold text-white">{department}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Program:</span>
                      <span className="font-bold text-indigo-400">{program}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Academic Score:</span>
                      <span className="font-bold text-emerald-400">{previousMarks}%</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                    ℹ️ By submitting, you confirm that all information provided is accurate and authentic as per high school records.
                  </div>
                </div>
              )}

              {/* Step Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2"
                  >
                    Submit Application <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab 2: Track Status */}
      {activeTab === 'status' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-white font-heading">Track Online Application</h3>
            <p className="text-xs text-slate-400">Enter your application reference number (e.g., ADM-2026-8801)</p>
          </div>

          <form onSubmit={handleCheckStatus} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. ADM-2026-8801"
              value={searchAppId}
              onChange={(e) => setSearchAppId(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 uppercase font-mono"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2"
            >
              <Search className="w-4 h-4" /> Lookup
            </button>
          </form>

          {searchedApp === 'not_found' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
              No application found with ID "{searchAppId}". Please check and try again.
            </div>
          )}

          {searchedApp && searchedApp !== 'not_found' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="font-mono text-xs font-bold text-indigo-400">{searchedApp.applicationNumber}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {searchedApp.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Applicant:</span>
                  <span className="font-semibold text-white">{searchedApp.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Applied Program:</span>
                  <span className="font-semibold text-white">{searchedApp.program}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date of Submission:</span>
                  <span className="font-semibold text-white">{searchedApp.submissionDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Academic Score:</span>
                  <span className="font-semibold text-emerald-400">{searchedApp.previousMarks}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Scholarship Calculator */}
      {activeTab === 'calculator' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-white font-heading">Merit Scholarship Estimator</h3>
            <p className="text-xs text-slate-400">Calculate fee waivers based on your high school aggregate percentage.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Your Academic Marks: <span className="text-indigo-400 font-bold">{calcScore}%</span>
              </label>
              <input
                type="range"
                min="65"
                max="100"
                value={calcScore}
                onChange={(e) => setCalcScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Result Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 text-center space-y-3">
              <Award className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="text-xl font-extrabold text-white font-heading">
                {getScholarshipTier(calcScore).pct}
              </h4>
              <p className="text-xs text-indigo-300 font-semibold">
                {getScholarshipTier(calcScore).waiver}
              </p>
              <p className="text-[11px] text-slate-400">
                Applicable for the entire 4-year undergraduate degree subject to maintaining CGPA &gt;= 8.5.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
