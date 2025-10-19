/**
 * Sample TypeScript code to demonstrate the ESLint configuration
 * This file should be linted with the shared configuration
 */

interface User {
  readonly id: number;
  name: string;
  email: string;
}

/**
 * Creates a new user with the given name and email
 * @param name - The user's name
 * @param email - The user's email address
 * @returns A new user object
 */
export function createUser(name: string, email: string): User {
  // This should trigger prettier formatting
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
  };
}

/**
 * Validates that an email address is properly formatted
 * @param email - The email to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Example usage
const user = createUser('John Doe', 'john@example.com');
console.log('Created user:', user);

if (isValidEmail(user.email)) {
  console.log('Email is valid');
} else {
  console.log('Email is invalid');
}
