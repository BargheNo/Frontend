import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { vazir } from "@/lib/fonts";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import style from './phoneVerification.module.css'
import SignupButton from "@/components/SignupButton/SignupButton";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  open: boolean;
  onclick: () => void;
  onOtpChange: (otp: string) => void;
  onlinkClick?: () => void;
}

export default function PhoneVerification({ open, onclick, onOtpChange, onlinkClick }: Props) {
  const [otp, setOtp] = useState<string>("");

  return (
    <div className={vazir.className}>

      <Dialog open={open}>
        <DialogContent hidden={true} className={`${style.card} ${vazir.className}`}>
          <DialogHeader className="mt-4">
            <DialogTitle className="font-normal">
              کد تأیید ارسال‌ شده را در کادر زیر وارد کنید
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 mt-4">
              <InputOTP  maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={otp}
                onChange={(value) => {
                  setOtp(value);
                  onOtpChange(value);
                }}
              >
                <InputOTPGroup className="gap-3" >
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot  className={style.CustomInput} key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <div>
                <a className={style.link} onClick={onlinkClick}>
                  تغییر شماره تلفن همراه
                </a>
              </div>
              <div style={{ fontSize: "16px" }} className={`${'grid flex-1 justify-end ml-auto w-3/9 font-bold'} ${style.button}`}>
                <SignupButton>ارسال مجدد</SignupButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
