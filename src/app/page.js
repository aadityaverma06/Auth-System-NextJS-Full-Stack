import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] justify-between">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center max-w-sm">
        <div className="flex flex-col gap-[32px] row-start-2 items-center justify-center mb-16 pl-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-700">
              Welcome to Auth System
            </span>
          </h1>
        </div>

        <ol className="list-outside list-disc text-base/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-8 pl-6">
          <li className="mb-2 tracking-[-.01em]">
            Get started by logging into your account.
          </li>
          <li className="tracking-[-.01em]">
            Or create a new one if not an existing user.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center text-white bg-gradient-to-r bg-clip-padding to-pink-500 from-purple-700 gap-2 hover:bg-gradient-to-r hover:from-purple-900 hover:to-pink-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href={`${process.env.DOMAIN}/login`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/login.svg"
              alt="Login logomark"
              width={20}
              height={20}
            />
            Login
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href={`${process.env.DOMAIN}/signup`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert mr-1.5"
              src="/signup.svg"
              alt="Signuplogomark"
              width={20}
              height={20}
            />
            Signup
          </a>
        </div>
      </main>
      <footer className="pr-4">
        © 2025 Auth System.
        <span className="pl-2">All rights reserved.</span>
      </footer>
    </div>
  );
}
