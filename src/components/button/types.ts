type ButtonVariants = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

export type { ButtonProps, ButtonVariants };
