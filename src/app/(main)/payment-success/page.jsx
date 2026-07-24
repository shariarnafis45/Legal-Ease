import { payment } from "@/lib/actions/payment";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Mail,
  FileText,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const paymentResult = await payment({ ...metadata, session_id });
    console.log("Payment Processed: ", paymentResult);

    return (
      <main className="min-h-screen bg-slate-50 dark:bg-[#050B14] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Premium Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0F766E]/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Main Success Card */}
        <section className="relative w-full max-w-lg bg-white dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 text-center">
          {/* Animated Success Icon */}
          <div className="mx-auto w-24 h-24 mb-8 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-500/20 rounded-full animate-ping opacity-75" />
            <div className="relative bg-emerald-500 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]">
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>
          </div>

          {/* Typography */}
          <h1 className="font-syne text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Payment Successful!
          </h1>
          <p className="font-poppins text-slate-500 dark:text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
            Thank you for your business. Your transaction has been securely
            processed and completed.
          </p>

          {/* Transaction Details Box */}
          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-5 md:p-6 mb-8 text-left border border-slate-100 dark:border-white/5 font-poppins space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 bg-emerald-100 dark:bg-emerald-500/10 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-1">
                  Confirmation Email
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-200 break-all">
                  {customerEmail}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-slate-200 dark:bg-white/5" />

            <div className="flex items-start gap-4">
              <div className="mt-0.5 bg-[#0F766E]/10 dark:bg-teal-500/10 p-2 rounded-lg text-[#0F766E] dark:text-teal-400 flex-shrink-0">
                <FileText size={18} />
              </div>
              <div className="w-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-1 flex justify-between">
                  <span>Session Ref</span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10px]">
                    <ShieldCheck size={12} /> Secure
                  </span>
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-200 font-mono break-all">
                  {session_id.slice(0, 16)}...
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-poppins">
            <Link
              href="/dashboard/client"
              className="w-full flex-1 inline-flex justify-center items-center gap-2 px-6 py-4 bg-[#0F766E] hover:bg-[#0d635c] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/30 active:scale-95"
            >
              Go to Dashboard <ArrowRight size={18} />
            </Link>

            <Link
              href="/"
              className="w-full flex-1 inline-flex justify-center items-center px-6 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl transition-all duration-300 active:scale-95 border border-slate-200 dark:border-slate-700"
            >
              Return Home
            </Link>
          </div>

          {/* Support Link */}
          <p className="mt-8 text-xs font-poppins text-slate-400 dark:text-slate-500">
            Have a question?{" "}
            <a
              href="mailto:orders@example.com"
              className="text-[#0F766E] dark:text-emerald-400 hover:underline font-medium"
            >
              orders@example.com
            </a>
          </p>
        </section>
      </main>
    );
  }
}
