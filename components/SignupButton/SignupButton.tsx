import style from "./SignupButton.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
  className: string;
}

export default function SignupButton({ children, className, ...props }: Props) {
	return (
		<button {...props} className={`${style.button} ${className}`}>
			{children}
		</button>
	);
}
