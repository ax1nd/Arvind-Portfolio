import { useState } from 'react';
import { sound } from '../utils/audio.ts';

export function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brief: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.play('switch');
    setSubmitted(true);
  };

  const copyEmailToClipboard = () => {
    sound.play('click');
    navigator.clipboard.writeText('thearvind2065@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none">
      {/* Title */}
      <div className="border-b-2 border-[#2a2a2a] pb-6 mb-10">
        <div className="font-mono text-xs text-[#d4ff00] tracking-widest uppercase mb-2">
          [DIRECT DISPATCH TERMINAL]
        </div>
        <h1 className="font-syne font-black text-4xl sm:text-7xl text-[#f5f5f5] uppercase tracking-tighter">
          Contact
        </h1>
        <p className="mt-4 font-mono text-xs text-[#8e8e8e] max-w-xl">
          Open for systems engineering collaborations, low-latency infrastructure projects, and research opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Contact Info & Address */}
        <div className="md:col-span-5 space-y-6">
          <div className="border-2 border-[#2a2a2a] bg-[#121212] p-5">
            <div className="font-syne font-bold text-lg text-[#f5f5f5] uppercase">
              Arvind
            </div>
            <div className="font-mono text-xs text-[#8e8e8e] mt-2 leading-relaxed">
              Mogappair
              <br />
              Chennai, Tamil Nadu 600037
              <br />
              India
            </div>
          </div>

          <div className="border-2 border-[#2a2a2a] bg-[#121212] p-5">
            <div className="font-mono text-xs text-[#ff007f] uppercase mb-2">
              [Email]
            </div>
            <div className="font-mono text-xs text-[#f5f5f5] mb-3 select-all">
              thearvind2065@gmail.com
            </div>
            <button
              onClick={copyEmailToClipboard}
              className="brutal-btn-outline w-full py-2 text-xs uppercase cursor-pointer"
            >
              {copiedEmail ? 'Copied to Clipboard ✓' : 'Copy Direct Address'}
            </button>
          </div>
        </div>

        {/* Right: Commission Terminal Form */}
        <div className="md:col-span-7">
          {submitted ? (
            <div className="border-2 border-[#d4ff00] bg-[#121212] p-8 text-center animate-jitter">
              <div className="font-syne font-black text-2xl text-[#d4ff00] uppercase mb-3">
                Inquiry Logged
              </div>
              <p className="font-mono text-xs text-[#f5f5f5] leading-relaxed">
                Your dispatch has been received at our Chennai terminal. We evaluate incoming briefs weekly and will respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  sound.play('click');
                  setSubmitted(false);
                }}
                className="mt-6 brutal-btn-primary px-6 py-2.5 text-xs tracking-wider cursor-pointer"
              >
                Submit Another Brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border-2 border-[#2a2a2a] bg-[#121212] p-6 space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-[#8e8e8e] uppercase mb-1">
                  Name / Organization
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Systems Lab / Org Name"
                  className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:border-[#d4ff00] p-3 text-xs font-mono text-[#f5f5f5] outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[#8e8e8e] uppercase mb-1">
                  Direct Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:border-[#d4ff00] p-3 text-xs font-mono text-[#f5f5f5] outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[#8e8e8e] uppercase mb-1">
                  Brief
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder="Outline the scope, problem statement, or technical parameter..."
                  className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:border-[#d4ff00] p-3 text-xs font-mono text-[#f5f5f5] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="brutal-btn-primary w-full py-3.5 text-xs tracking-wider cursor-pointer"
              >
                Transmit Dispatch ↗
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
