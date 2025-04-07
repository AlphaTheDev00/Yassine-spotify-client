import styles from "./Logo.module.css";

export default function Logo({ size = 24, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
    >
      <circle cx="12" cy="12" r="12" fill="#1DB954" />
      <path
        d="M7 14.25v-4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0zm2.5 0v-4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0zm2.5 0v-4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0zm2.5 0v-4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0z"
        fill="white"
      />
    </svg>
  );
}
