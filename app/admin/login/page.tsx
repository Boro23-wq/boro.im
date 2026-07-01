import { SiGithub } from "@icons-pack/react-simple-icons";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES: Record<string, string> = {
  state: "Login expired, please try again.",
  token: "Could not sign in with GitHub, please try again.",
  forbidden: "This GitHub account isn't allowed to access this admin.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-sm border border-neutral-200 dark:border-neutral-800 rounded-sm bg-white dark:bg-neutral-900 p-8 text-center">
        <p className="newsreader-400-tall text-xl mb-2 dark:text-[#d4d4d4]">Admin</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          Sign in with GitHub to write and publish posts.
        </p>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">
            {ERROR_MESSAGES[error] ?? "Something went wrong, please try again."}
          </p>
        )}

        <a
          href="/api/auth/login"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors rounded-sm text-sm font-medium"
        >
          <SiGithub size={16} />
          Sign in with GitHub
        </a>
      </div>
    </div>
  );
}
