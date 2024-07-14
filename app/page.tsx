import { PatientForm } from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className='flex h-screen max-h-screen'>
      {isAdmin && <PassKeyModal />}
      {/* <PassKeyModal /> */}

      <section className='container  remove-scrollbar'>
        <div className='sub-container max-w-[460px]'>
          <div className='flex mb-12 h-10'>
            <Image
              src='/assets/icons/logo-icon.svg'
              alt='HealthPlus logo'
              width={40}
              height={40}
              className='w-fit'
            />
            <p className='mt-1.5 ms-1 text-2xl font-bold'>HealthPlus</p>
          </div>

          <PatientForm />

          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 HealthPlus
            </p>
            <Link href='/?admin=true' className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/onboarding-img.png'
        alt='Patient'
        width={500}
        height={500}
        className='side-img'
      />
    </div>
  );
}
