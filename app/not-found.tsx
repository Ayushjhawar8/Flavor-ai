import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-base-content mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-base-content/70 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back to exploring delicious recipes!
        </p>
        <Link href="/">
          <button className="btn btn-primary btn-lg">
            Go Home 🍽️
          </button>
        </Link>
      </div>
    </div>
  );
}
