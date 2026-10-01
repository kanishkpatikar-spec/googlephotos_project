import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, style, ...props }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {label && (
          <label
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={{
            padding: "6px 10px",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${error ? "var(--color-danger)" : "var(--color-border)"}`,
            fontSize: 13,
            color: "var(--color-text-primary)",
            background: "var(--color-surface)",
            outline: "none",
            transition: "border-color 0.15s ease",
            width: "100%",
            ...style,
          }}
          {...props}
        />
        {error && (
          <span
            style={{ fontSize: 11, color: "var(--color-danger)" }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
