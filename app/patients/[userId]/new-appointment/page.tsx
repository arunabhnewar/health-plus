import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container '>
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
          <Link className='flex mb-12 h-10' href='/'>
            {/* Logo */}
            <Image
              src='/assets/icons/logo.jpg'
              alt='HealthPlus logo'
              width={40}
              height={40}
              className='w-fit'
            />
            {/* App name */}
            <p className='mt-1.5 ms-1 text-2xl font-bold'>HealthPlus</p>
          </Link>

          {/* Appointment form */}
          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type='create'
          />

          {/* Copyright */}
          <p className='copyright copyright mt-10 py-12'> © 2024 HealthPlus</p>
        </div>
      </section>

      <div>
        {/* Side image */}
        <Image
          src='/assets/images/appointment-img.png'
          alt='Register'
          width={1000}
          height={1000}
          className='side-img max-w-[390px] bg-bottom'
        />
      </div>
    </div>
  );
};

export default NewAppointment;
