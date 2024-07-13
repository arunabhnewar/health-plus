import Image from "next/image";

const NewAppointment = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
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

          {/* <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type='create'
          /> */}

          {/* Copyright */}
          <p className='copyright copyright mt-10 py-12'> © 2024 HealthPlus</p>
        </div>
      </section>

      {/* Side image */}

      <Image
        src='/assets/images/appointment-img.png'
        alt='Register'
        width={1000}
        height={1000}
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  );
};

export default NewAppointment;
