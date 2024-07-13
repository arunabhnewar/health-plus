import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
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

          {/* Register form */}
          <RegisterForm user={user} />

          {/* Copyright */}
          <p className='copyright text-dark-600 xl:text-left py-12'>
            {" "}
            © 2024 HealthPlus
          </p>
        </div>
      </section>

      {/* Side image */}
      <div>
        <Image
          src='/assets/images/register-img.png'
          alt='Register'
          width={1000}
          height={1000}
          className='side-img max-w-[390px]'
        />
      </div>
    </div>
  );
};

export default Register;
