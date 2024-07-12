import Image from "next/image";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({
  isLoading,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
      type='submit'>
      {isLoading ? (
        <div className='flex items-center gap-4'>
          <Image
            src='/assets/icons/loader.svg'
            alt='loader'
            width={24}
            height={24}
          />{" "}
          Loading ...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
