import { ReactNode } from "react";

type AlertProps = {
  children: ReactNode;
  showAlert: boolean;
  setShowAlert: Function;
};

const Alert: React.FC<AlertProps> = ({ showAlert, children }) => {
  return (
    <div style={showAlert ? { display: "block" } : { display: "none" }}>
      <p>{children}</p>
    </div>
  );
};

export default Alert;
