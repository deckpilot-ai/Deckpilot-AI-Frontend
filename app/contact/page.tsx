"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { api, type ContactInquiryPayload } from "@/lib/api";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  MessageSquare,
  HelpCircle,
  Briefcase,
  TrendingUp,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactInquiryPayload>({
    full_name: "",
    email: "",
    company: "",
    inquiry_type: "general",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Client validation
    if (!formData.full_name.trim() || formData.full_name.trim().length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage("Please enter a message with at least 10 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.submitContactInquiry(formData);
      setSuccessMessage(
        res.message ||
          "Thank you for contacting DeckPilotAI. Our team has received your message and will respond shortly."
      );
      setFormData({
        full_name: "",
        email: "",
        company: "",
        inquiry_type: "general",
        message: "",
        honeypot: "",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while sending your inquiry. Please try again or email us directly.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(
      `[DeckPilotAI Contact] ${formData.inquiry_type.toUpperCase()}: Inquiry from ${
        formData.full_name || "Website Visitor"
      }`
    );
    const body = encodeURIComponent(
      `Name: ${formData.full_name}\nEmail: ${formData.email}\nCompany: ${
        formData.company || "N/A"
      }\nInquiry Type: ${formData.inquiry_type}\n\nMessage:\n${formData.message}`
    );
    return `mailto:contact@deckpilotai.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#070a13] text-slate-100 selection:bg-[#0086FF]/30 selection:text-white bg-dot-grid relative">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 text-center">
          <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#0086FF]/12 blur-[140px]" />

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-4 py-1.5 text-xs font-medium text-[#38bdf8] backdrop-blur-md mb-6">
              <Mail className="h-3.5 w-3.5 text-[#0086FF]" />
              <span>Get in Touch</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Official Channel</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.12]">
              We&apos;d love to hear from{" "}
              <span className="bg-gradient-to-r from-[#0086FF] via-[#38bdf8] to-emerald-400 bg-clip-text text-transparent">
                you.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 leading-relaxed">
              Have questions about DeckPilotAI, partnership inquiries, startup discussions, or technical feedback? Our founding team is here to help.
            </p>
          </div>
        </section>

        {/* ================= CONTACT CONTENT ================= */}
        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Direct Info & Inquiries (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl border border-white/10 bg-[#0c1222]/90 p-6 sm:p-8 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-white">
                      Official Contact
                    </h2>
                    <span className="rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#38bdf8]">
                      Founded August 2025
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    Direct communications are monitored by our leadership and engineering team.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="mailto:contact@deckpilotai.com"
                      className="flex items-center gap-3 p-3.5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0086FF]/40 hover:bg-[#0086FF]/10 transition-colors group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0086FF]/20 text-[#38bdf8] group-hover:scale-105 transition-transform">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium">Email Address</div>
                        <div className="text-sm font-semibold text-white">contact@deckpilotai.com</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-white/5 bg-white/5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium">Response SLA</div>
                        <div className="text-xs font-semibold text-white">Within 24 business hours</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                      Inquiry Categories
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-3.5 w-3.5 text-[#38bdf8]" />
                        <span>Startup & Investor Inquiries</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Business & Enterprise Partnerships</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Product Feedback & Feature Requests</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                        <span>Technical Support & Generation Queries</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Security Note */}
                <div className="rounded-3xl border border-white/10 bg-[#0c1222]/60 p-6 flex items-start gap-3 text-xs text-slate-400">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Privacy First Communication</strong>
                    Inquiry information is never shared with third parties or used for commercial marketing lists.
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Contact Form (7 cols) */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-white/10 bg-[#0c1222]/90 p-6 sm:p-9 backdrop-blur-xl shadow-2xl">
                  <h2 className="text-xl font-bold text-white mb-1">
                    Send a Message
                  </h2>
                  <p className="text-xs text-slate-400 mb-6">
                    Fill out the form below. All submissions are processed through verified backend routing.
                  </p>

                  {successMessage ? (
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center animate-in fade-in duration-200">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Inquiry Received
                      </h3>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                        {successMessage}
                      </p>
                      <button
                        onClick={() => setSuccessMessage(null)}
                        className="mt-5 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {errorMessage && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300 flex items-start gap-2.5">
                          <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div>{errorMessage}</div>
                            <div className="mt-2">
                              <a
                                href={getMailtoUrl()}
                                className="underline hover:text-white inline-flex items-center gap-1 font-medium text-red-200"
                              >
                                Or send message directly via your email client →
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Honeypot field for anti-spam (hidden from users) */}
                      <input
                        type="text"
                        name="website_hp"
                        value={formData.honeypot}
                        onChange={(e) =>
                          setFormData({ ...formData, honeypot: e.target.value })
                        }
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden="true"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alex Mercer"
                            value={formData.full_name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                full_name: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#080d19] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#0086FF] transition-colors"
                          />
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="alex@company.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#080d19] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#0086FF] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Company / Organization */}
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Company or Organization <span className="text-slate-500">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Acme Ventures"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                company: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#080d19] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#0086FF] transition-colors"
                          />
                        </div>

                        {/* Inquiry Type */}
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Inquiry Type <span className="text-red-400">*</span>
                          </label>
                          <select
                            value={formData.inquiry_type}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                inquiry_type: e.target
                                  .value as ContactInquiryPayload["inquiry_type"],
                              })
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#080d19] px-3.5 py-2.5 text-xs text-white focus:border-[#0086FF] transition-colors"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="partnership">Business & Enterprise Partnership</option>
                            <option value="investor">Startup & Investor Inquiry</option>
                            <option value="feedback">Product Feedback</option>
                            <option value="support">Technical Support</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Message <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          rows={5}
                          required
                          placeholder="How can we help? Tell us about your use case, presentation requirements, or feedback..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-white/10 bg-[#080d19] p-3.5 text-xs text-white placeholder-slate-500 focus:border-[#0086FF] transition-colors leading-relaxed"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0086FF] py-3 text-xs font-semibold text-white shadow-xl shadow-[#0086FF]/25 hover:bg-[#0075ED] disabled:opacity-50 transition-all cursor-pointer"
                        >
                          {loading ? (
                            <span>Submitting Inquiry...</span>
                          ) : (
                            <>
                              <Send className="h-3.5 w-3.5" />
                              <span>Submit Inquiry</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 text-center pt-2">
                        You can also write to us directly at{" "}
                        <a
                          href="mailto:contact@deckpilotai.com"
                          className="text-[#38bdf8] underline hover:text-white"
                        >
                          contact@deckpilotai.com
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
