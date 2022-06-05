import "../styles/accountContent.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInputAccount {
  email: string;
  firstName: string;
  lastName: string;
}
interface AccountContentProps {
  disabled?: boolean;
}

export const AccountContent = ({ disabled = true }: AccountContentProps) => {
  return (
    <div className="account-content-container">
      <div className="personal-info-container">
        <h3> Active offers</h3>
        <div className="delivery-form-container"></div>
        <h3></h3>
      </div>
    </div>
  );
};
