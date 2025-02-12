"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { decryptKey, encryptKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PassKeyModal = () => {
  const [open, setOpen] = useState(true);
  const [passKey, setPassKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const path = usePathname();

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const validatePassKey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      localStorage.setItem("accessKey", encryptedKey);

      setOpen(false);
    } else {
      setError("Invalid passkey, please try again.");
    }
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between'>
            Admin Access Verification
            <Image
              src='/assets/icons/close.svg'
              alt='close'
              width={20}
              height={20}
              onClick={() => closeModal()}
              className='cursor-pointer'
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP
            maxLength={6}
            value={passKey}
            onChange={(value) => setPassKey(value)}>
            <InputOTPGroup className='shad-otp'>
              <InputOTPSlot className='shad-otp-slot' index={0} />
              <InputOTPSlot className='shad-otp-slot' index={1} />
              <InputOTPSlot className='shad-otp-slot' index={2} />
              <InputOTPSlot className='shad-otp-slot' index={3} />
              <InputOTPSlot className='shad-otp-slot' index={4} />
              <InputOTPSlot className='shad-otp-slot' index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className='shad-error mt-4 text-14-regular flex justify-center '>
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            className='shad-primary-btn w-full'
            onClick={(e) => validatePassKey(e)}>
            Enter Admin Pass Key
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
