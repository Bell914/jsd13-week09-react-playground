import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Send,
  RotateCcw,
  User,
  Mail,
  Lock,
  Briefcase
} from 'lucide-react';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'Frontend Developer',
  experience: '1-3',
  bio: '',
  agreeTerms: false,
};

export default function FormsPlayground({ onStateChange }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Single Change Handler สำหรับ Controlled Inputs ทุกตัว
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue, // Dynamic Object Key
    }));

    // ล้าง error หรือ validate ทันทีเมื่อพิมพ์
    validateField(name, fieldValue);
  };

  // 2. Mark field as touched when user clicks away (onBlur)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // 3. Validation Logic สำหรับแต่ละ Field
  const validateField = (fieldName, value) => {
    let errorMsg = '';

    switch (fieldName) {
      case 'fullName':
        if (!value.trim()) {
          errorMsg = 'กรุณากรอกชื่อ-นามสกุล';
        } else if (value.trim().length < 3) {
          errorMsg = 'ชื่อ-นามสกุลต้องมีความยาวอย่างน้อย 3 ตัวอักษร';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          errorMsg = 'กรุณากรอกอีเมล';
        } else if (!emailRegex.test(value)) {
          errorMsg = 'รูปแบบอีเมลไม่ถูกต้อง (เช่น user@example.com)';
        }
        break;

      case 'password':
        if (!value) {
          errorMsg = 'กรุณากำหนดรหัสผ่าน';
        } else if (value.length < 8) {
          errorMsg = 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร';
        } else if (!/\d/.test(value)) {
          errorMsg = 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          errorMsg = 'กรุณายืนยันรหัสผ่าน';
        } else if (value !== formData.password) {
          errorMsg = 'รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านด้านบน';
        }
        break;

      case 'agreeTerms':
        if (!value) {
          errorMsg = 'ต้องยอมรับข้อตกลงและเงื่อนไขก่อนลงทะเบียน';
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMsg,
    }));

    return !errorMsg;
  };

  // Calculate Password Strength (Score: 0 - 3)
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'ยังไม่กรอก', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/\d/.test(pass)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score++;

    if (score === 1) return { score: 1, label: 'อ่อน (Weak)', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'ปานกลาง (Medium)', color: 'bg-amber-500' };
    return { score: 3, label: 'แข็งแรงมาก (Strong)', color: 'bg-emerald-500' };
  };

  const passStrength = getPasswordStrength(formData.password);

  // 4. Form Submit Handler พร้อม e.preventDefault()
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const validFullName = validateField('fullName', formData.fullName);
    const validEmail = validateField('email', formData.email);
    const validPass = validateField('password', formData.password);
    const validConfirm = validateField('confirmPassword', formData.confirmPassword);
    const validTerms = validateField('agreeTerms', formData.agreeTerms);

    const isAllValid =
      validFullName && validEmail && validPass && validConfirm && validTerms;

    if (isAllValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmittedData({
          ...formData,
          submittedAt: new Date().toLocaleTimeString(),
        });
      }, 600);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  // Sync to Live State Inspector
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        formData,
        errors,
        touched,
        isFormValid: Object.values(errors).every((err) => !err) && formData.agreeTerms,
        submittedData,
      });
    }
  }, [formData, errors, touched, submittedData, onStateChange]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Module 3: Controlled Forms & Real-time Validation
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              ฝึกฝนการจัดการ Form State ด้วย Dynamic Handler <code className="text-amber-300 font-mono text-xs bg-amber-500/10 px-1.5 py-0.5 rounded">[e.target.name]</code>, การตรวจสอบความถูกต้องแบบ Real-time และการใช้งาน <code className="text-amber-300 font-mono text-xs bg-amber-500/10 px-1.5 py-0.5 rounded">e.preventDefault()</code>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Interactive Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Registration Form (Controlled)</span>
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Form</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>ชื่อ-นามสกุล:</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="เช่น สมชาย ใจดี"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-slate-100 focus:outline-none transition-colors ${
                  touched.fullName && errors.fullName
                    ? 'border-rose-500 focus:border-rose-500 bg-rose-950/10'
                    : 'border-slate-700 focus:border-amber-500'
                }`}
              />
              {touched.fullName && errors.fullName && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>อีเมล (Email):</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="developer@example.com"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-slate-100 focus:outline-none transition-colors ${
                  touched.email && errors.email
                    ? 'border-rose-500 focus:border-rose-500 bg-rose-950/10'
                    : 'border-slate-700 focus:border-amber-500'
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>รหัสผ่าน (อย่างน้อย 8 ตัว + เลข):</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className={`w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-950 border text-sm text-slate-100 focus:outline-none transition-colors ${
                      touched.password && errors.password
                        ? 'border-rose-500 focus:border-rose-500 bg-rose-950/10'
                        : 'border-slate-700 focus:border-amber-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>ความปลอดภัย:</span>
                      <span className="font-semibold">{passStrength.label}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full ${passStrength.color} transition-all duration-300`}
                        style={{ width: `${(passStrength.score / 3) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {touched.password && errors.password && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>ยืนยันรหัสผ่าน:</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-slate-100 focus:outline-none transition-colors ${
                    touched.confirmPassword && errors.confirmPassword
                      ? 'border-rose-500 focus:border-rose-500 bg-rose-950/10'
                      : 'border-slate-700 focus:border-amber-500'
                  }`}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Role & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>ตำแหน่ง (Role):</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Fullstack Developer">Fullstack Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">ประสบการณ์ทำงาน:</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="0-1">0 - 1 ปี (Junior / Entry)</option>
                  <option value="1-3">1 - 3 ปี (Mid-level)</option>
                  <option value="3-5">3 - 5 ปี (Senior)</option>
                  <option value="5+">5+ ปีขึ้นไป (Lead / Expert)</option>
                </select>
              </div>
            </div>

            {/* Checkbox: Terms */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-500"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  ฉันยอมรับ <span className="text-amber-400 font-semibold underline">ข้อกำหนดและนโยบายความเป็นส่วนตัว</span> ของระบบ
                </span>
              </label>
              {touched.agreeTerms && errors.agreeTerms && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 pl-6">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.agreeTerms}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>กำลังประมวลผล...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>ส่งข้อมูลลงทะเบียน (Submit Form)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Real-time Payload & Submitted Result (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Submitted Banner */}
          {submittedData ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>ส่งข้อมูลสำเร็จ (Form Submitted)!</span>
              </div>
              <p className="text-xs text-slate-300">
                เวลาที่บันทึก: <strong className="text-emerald-300 font-mono">{submittedData.submittedAt}</strong>
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
                <div>ชื่อ: <span className="text-white font-bold">{submittedData.fullName}</span></div>
                <div>อีเมล: <span className="text-sky-300">{submittedData.email}</span></div>
                <div>ตำแหน่ง: <span className="text-amber-300">{submittedData.role}</span></div>
                <div>ประสบการณ์: <span className="text-purple-300">{submittedData.experience} ปี</span></div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 text-center text-xs text-slate-500 space-y-2">
              <Sparkles className="w-6 h-6 mx-auto text-slate-600" />
              <p>กรอกข้อมูลและกดปุ่ม Submit เพื่อดูผลลัพธ์ที่ได้รับจากการ Validate</p>
            </div>
          )}

          {/* Validation Checklist Guide */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
            <span className="font-bold text-slate-200 block">เกณฑ์การตรวจสอบ (Validation Rules):</span>
            
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${formData.fullName.length >= 3 ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                <span>ชื่อมีความยาวตั้งแต่ 3 ตัวอักษรขึ้นไป</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                <span>อีเมลมี @ และ Domain ถูกต้อง</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${formData.password.length >= 8 && /\d/.test(formData.password) ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                <span>รหัสผ่าน 8 ตัวขึ้นไป และมีตัวเลข</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${formData.password && formData.password === formData.confirmPassword ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                <span>รหัสผ่านทั้งสองช่องตรงกัน</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${formData.agreeTerms ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                <span>ติ๊กยอมรับข้อกำหนด</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export const formsPlaygroundCode = `import React, { useState } from 'react';

export default function FormsPlayground() {
  // 1. Single State Object สำหรับทุก Input
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Frontend Developer',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});

  // 2. Dynamic Change Handler (ฟังก์ชันเดียวคุมทุกฟิลด์)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value // Dynamic Key
    }));
  };

  // 3. Submit Handler พร้อม e.preventDefault()
  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันหน้าเว็บรีโหลด
    
    // ตรวจสอบความถูกต้อง (Validation)
    if (!formData.fullName) {
      setErrors({ fullName: 'กรุณากรอกชื่อ' });
      return;
    }

    console.log('Submitted Payload:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="fullName"
        value={formData.fullName} 
        onChange={handleChange} 
        placeholder="ชื่อ"
      />
      {errors.fullName && <span>{errors.fullName}</span>}

      <input 
        type="checkbox"
        name="agreeTerms"
        checked={formData.agreeTerms}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}`;

export const formsPlaygroundExplanations = [
  {
    title: '1. Controlled Components',
    desc: 'Input ใน React ถือเป็น Controlled เมื่อค่า value หรือ checked ถูกผูกเข้ากับ React State โดยตรง ทำให้ React เป็น Single Source of Truth',
  },
  {
    title: '2. Dynamic Object Key [e.target.name]',
    desc: 'การใช้ไวยากรณ์ Computed Property Name [name]: value ช่วยให้เราเขียนฟังก์ชัน handleChange เพียงฟังก์ชันเดียวเพื่อจัดการทุก Input ในฟอร์มได้',
  },
  {
    title: '3. e.preventDefault()',
    desc: 'เมื่อกด Submit ในแท็ก <form> บราวเซอร์จะพยายามส่ง HTTP Request และรีเฟรชหน้าเว็บตามค่า Default เราจึงต้องเรียก e.preventDefault() เพื่อให้ React จัดการ Logic การส่งข้อมูลเอง',
  },
  {
    title: '4. Real-time vs OnBlur Validation',
    desc: 'การเก็บ State แยกสำหรับ touched ช่วยให้เราแสดงข้อความเตือน Error เฉพาะเมื่อผู้ใช้คลิกพิมพ์หรือเลื่อนเคอร์เซอร์ออกจากช่องนั้นแล้ว เพื่อ UX ที่ดี ไม่แสดง Error กวนใจก่อนเริ่มพิมพ์',
  },
];
