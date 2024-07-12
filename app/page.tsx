import { PatientForm } from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

/**
 * Home component represents the homepage of the application.
 * It renders a patient form and other UI elements.
 *
 * @returns {JSX.Element} The Home component
 */
export default function Home() {
  return (
    // Container for the entire page
    <div className='flex h-screen max-h-screen'>
      {/* TODO: OTP verification */}

      {/* Main content */}
      <section className='container my-auto remove-scrollbar'>
        <div className='sub-container max-w-[460px]'>
          {/* Header */}
          <div className='flex mb-12 h-10'>
            {/* Logo */}
            <Image
              src='/assets/icons/logo-icon.svg'
              alt='HealthPlus logo'
              width={40}
              height={40}
              className='w-fit'
            />
            {/* App name */}
            <p className='mt-1.5 ms-1 text-2xl font-bold'>HealthPlus</p>
          </div>

          {/* Patient form */}
          <PatientForm />

          {/* Footer */}
          <div className='text-14-regular mt-20 flex justify-between'>
            {/* Copyright notice */}
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 HealthPlus
            </p>
            {/* Admin link */}
            <Link href='/?admin=true' className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Side image */}
      <Image
        src='/assets/images/onboarding-img.png'
        alt='Patient'
        width={1000}
        height={1000}
        className='side-img max-w-[50%]'
      />
    </div>
  );
}
