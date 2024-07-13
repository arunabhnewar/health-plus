"use client";

import { Form, FormControl } from "@/components/ui/form";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import FileUploader from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SelectItem } from "../ui/select";
import { FormFieldType } from "./PatientForm";

export const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
      };

      // @ts ignore this line
      const newPatient = await registerPatient(patientData);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-12 flex-1'>
        <section className=' space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Let us know more about yourself.</p>
        </section>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Personal Information</h2>
          </div>

          {/*  Name field */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='name'
            label='Full Name'
            placeholder='John Doe'
            iconSrc='/assets/icons/user.svg'
            iconAlt='User icon'
          />

          <div className='flex flex-col gap-6 xl:flex-row'>
            {/*email field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='email'
              label='Email Address'
              placeholder='johndoe@yahoo.com'
              iconSrc='/assets/icons/email.svg'
              iconAlt='Email icon'
            />

            {/* phone number field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name='phone'
              label='Phone Number'
              placeholder='(555) 555-5555'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            {/* Birth date field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name='birthDate'
              label='Birth Date'
            />

            {/* Gender  */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SKELETON}
              name='gender'
              label='Gender'
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className='flex h-11 gap-6 xl:justify-between'
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className='radio-group'>
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className='cursor-pointer'>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            {/*  Address field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='address'
              label='Address'
              placeholder='14 street, New york, NY - 5101'
            />

            {/*  Occupation field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='occupation'
              label='Occupation'
              placeholder='Web Developer'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            {/*  Emergency Contact Name field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='emergancyContactName'
              label='Emergency contact name'
              placeholder="Guardian's name"
            />

            {/*  Emergency contact number field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name='emergancyContactNumber'
              label='Emergency contact number'
              placeholder='(555) 123-4567'
            />
          </div>
        </section>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Medical Information</h2>
          </div>

          {/*  Primary care physician field */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name='primaryPhysician'
            label='Primary care physician'
            placeholder='Select a physician'>
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className='flex cursor-pointer items-center gap-2'>
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt='doctor'
                    className='rounded-full border border-dark-500'
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className='flex flex-col gap-6 xl:flex-row'>
            {/* Insurance Provider field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='insuranceProvider'
              label='Insurance provider'
              placeholder='BlueCross BlueShield'
            />

            {/* Insurance Policy Number field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='insurancePolicyNumber'
              label='Insurance policy number'
              placeholder='ABC123456789'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            {/* Allergies field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name='allergies'
              label='Allergies (if any)'
              placeholder='Peanuts, Penicillin, Pollen'
            />

            {/* Current medications field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name='currentMedication'
              label='Current medications'
              placeholder='Ibuprofen 200mg, Levothyroxine 50mcg'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            {/* Family medical history field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name='familyMedicalHistory'
              label=' Family medical history (if relevant)'
              placeholder='Mother had brain cancer, Father has hypertension'
            />

            {/* Past medical history field */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name='pastMedicalHistory'
              label='Past medical history'
              placeholder='Appendectomy in 2015, Asthma diagnosis in childhood'
            />
          </div>
        </section>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Identification and Verification</h2>
          </div>

          {/* Identification Type field */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name='identificationType'
            label='Identification Type'
            placeholder='Select identification type'>
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          {/* Identification Number field */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='identificationNumber'
            label='Identification Number'
            placeholder='123456789'
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name='identificationDocument'
            label='Scanned Copy of Identification Document'
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='treatmentConsent'
            label='I consent to receive treatment.'
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I consent to disclosure of information.'
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I agree to privacy policy'
          />
        </section>

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};
