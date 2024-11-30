import { cn } from "@/lib/utils";

export const LoadingSpinner = ({ className = "", text = "loading" }) => {
  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-spin"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      {text && (
        <div
          style={{
            marginLeft: "0.5rem",
            color: "currentColor",
            fontSize: "1rem",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};
