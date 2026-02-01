import AuthShell from "@/components/AuthShell";

export default function VerifyEmailPage() {
  return (
    <AuthShell
      title="Verify your email"
      subtitle="Ek last step. Email verify karo, then you can connect ads accounts."
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          We sent a verification link to your email. Please open it to verify.
        </div>

        <button
          type="button"
          className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Resend email
        </button>

        <div className="text-xs text-zinc-500">UI only (verification not wired yet).</div>
      </div>
    </AuthShell>
  );
}
