import StarCard from "@/components/StarCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAppointmentsList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";

const AdminPage = async () => {
  const appointments = await getAppointmentsList();
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link className='flex cursor-pointer' href='/'>
          <Image
            src='/assets/icons/logo-icon.svg'
            alt='HealthPlus logo'
            width={40}
            height={40}
            className='w-fit'
          />
          <p className='mt-1.5 ms-1 text-2xl font-bold'>HealthPlus</p>
        </Link>
        <p className='text-16-semibold'>Admin Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>
            Start the day with managing new appointments
          </p>
        </section>

        <section className='admin-stat'>
          <StarCard
            icon={"/assets/icons/appointments.svg"}
            type='appointments'
            count={appointments.scheduledCount}
            label='Scheduled appointments'
          />

          <StarCard
            type='pending'
            count={appointments.pendingCount}
            label='Pending appointments'
            icon={"/assets/icons/pending.svg"}
          />

          <StarCard
            type='cancelled'
            count={appointments.cancelledCount}
            label='Cancelled appointments'
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable data={appointments.documents} columns={columns} />
      </main>
    </div>
  );
};

export default AdminPage;
