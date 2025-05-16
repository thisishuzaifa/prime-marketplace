// app/routes/signup.tsx
import type { ActionFunctionArgs, MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation, Link } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up | My E-Commerce Marketplace" },
    { name: "description", content: "Create an account to get started." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // This loader doesn't need to load any specific data for the signup page
  // to render initially. So we can just return an empty object or null.
  // You could also add logic here, for example, to redirect logged-in users
  // away from the signup page.
  // Example:
  // const userId = await getUserId(request); // (Assuming you have a session utility)
  // if (userId) {
  //   return redirect("/dashboard");
  // }
  return json({}); // Or return json(null);
};

// This is where you would integrate with your database and authentication logic.
// For now, it's a placeholder.
async function createUserInDatabase(email: string, password: string) {
  console.log(
    "Attempting to create user:",
    email,
    password.substring(0, 2) + "..."
  ); // Don't log full password in real apps

  // --- !!! IMPORTANT !!! ---
  // In a real application:
  // 1. Validate email format thoroughly.
  // 2. Check if the email already exists in your database.
  //    If it does, return an error like: { error: "User already exists with this email." }
  // 3. Hash the password securely using a library like bcrypt before saving.
  //    NEVER store plain text passwords.
  // 4. Save the user (email, hashed password) to your database.
  //    If successful, return the user object or a success indicator.
  //    If there's a database error, return an appropriate error.
  // --- !!! IMPORTANT !!! ---

  // Simulate an existing user for demonstration
  if (email === "taken@example.com") {
    return { error: "User already exists with this email." };
  }

  // Simulate successful creation
  return { user: { id: Date.now().toString(), email: email } };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  } = {};

  // Validate email
  if (
    typeof email !== "string" ||
    !email.includes("@") ||
    email.trim().length < 5
  ) {
    errors.email = "Please enter a valid email address.";
  }

  // Strong password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (typeof password !== "string" || !passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  // If validation passes, attempt to create the user
  // Ensure email and password are strings before passing
  const result = await createUserInDatabase(String(email), String(password));

  if (result.error) {
    errors.form = result.error; // Or more specific like errors.email = result.error if applicable
    return json({ errors }, { status: 400 });
  }

  // User created successfully
  // Here you would typically:
  // 1. Create a user session (log them in)
  // 2. Redirect to their dashboard or the homepage
  // For now, we'll redirect to a login page with a success message (you'll need to create /login)
  return redirect("/login?status=signup_success");
};

export default function SignUpPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="max-w-md mx-auto my-10 p-8 border border-gray-200 rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
      <Form method="post" noValidate>
        {actionData?.errors?.form && (
          <p className="text-red-500 text-center mb-4" role="alert">
            {actionData.errors.form}
          </p>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(actionData?.errors?.email)}
            aria-describedby="email-error"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {actionData?.errors?.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
              {actionData.errors.email}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              required
              aria-invalid={Boolean(actionData?.errors?.password)}
              aria-describedby="password-error"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-2 text-sm text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {actionData?.errors?.password && (
            <p id="password-error" className="text-red-500 text-sm mt-1" role="alert">
              {actionData.errors.password}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              required
              aria-invalid={Boolean(actionData?.errors?.confirmPassword)}
              aria-describedby="confirmPassword-error"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-2 text-sm text-gray-500"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {actionData?.errors?.confirmPassword && (
            <p id="confirmPassword-error" className="text-red-500 text-sm mt-1" role="alert">
              {actionData.errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-emerald-600 text-white rounded-md font-semibold text-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </Form>
      <p className="text-center mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-emerald-600 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
