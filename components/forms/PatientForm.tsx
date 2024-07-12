"use client";

import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      // const userData = {
      //   name,
      //   email,
      //   phone,
      // };
      // const newUser = await createUser(userData);
      // if (newUser) {
      //   router.push(`/patients/${newUser.$id}/register`);
      // }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there 👋</h1>
          <p className='text-dark-700'>Get started with appointments.</p>
        </section>

        {/*  */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='name'
          label='Full Name'
          placeholder='John Doe'
          iconSrc='/assets/icons/user.svg'
          iconAlt='User icon'
        />

        {/*  */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='email'
          label='Email Address'
          placeholder='johndoe@yahoo.com'
          iconSrc='/assets/icons/email.svg'
          iconAlt='Email icon'
        />

        {/*  */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name='phone'
          label='Phone Number'
          placeholder='(555) 555-5555'
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
