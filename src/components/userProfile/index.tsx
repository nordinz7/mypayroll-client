"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import FormFieldMapper, {
  FormFieldItem,
} from "@/components/shared/form-field-mapper";
import { DatePicker } from "@/components/shared/date-picker";
import { FormMode } from "@/types/customGlobalTypes";
import { useMutation, useQuery } from "@apollo/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { authStore } from "@/stores/auth";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { pick, startCase } from "lodash";
import {
  UPDATE_USER_PROFILE,
  VIEW_USER_PROFILE,
} from "@/components/userProfile/schema";

const FormSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().min(3),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type UserProfileFormProps = {
  mode: FormMode;
  userId?: string;
};

export const UserProfileForm = ({ mode, userId }: UserProfileFormProps) => {
  const user = authStore((state) => state.user);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { ...user },
  });

  const [updateUser] = useMutation(UPDATE_USER_PROFILE, {
    onCompleted: (data) => {
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const { loading } = useQuery(VIEW_USER_PROFILE, {
    variables: { uuid: String(userId) },
    skip: mode === FormMode.create || !userId || !!user,
    onCompleted: (data) => {
      form.reset(data.user);
    },
  });

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    const input = pick(form.getValues(), ["uuid", "name", "email"]);

    await updateUser({ variables: { input } });
  };

  const items: FormFieldItem[] = [
    {
      name: "uuid",
      label: "Uuid",
      input: Input,
      hidden: true,
    },
    {
      name: "name",
      label: "Name",
      input: Input,
    },
    {
      name: "email",
      label: "Email",
      input: Input,
    },
    {
      name: "createdAt",
      label: "CreatedAt",
      input: DatePicker,
      disabled: true,
    },
    {
      name: "updatedAt",
      label: "UpdatedAt",
      input: DatePicker,
      disabled: true,
    },
  ];

  if (loading) {
    <LoadingSpinner />;
  }

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6" onSubmit={handleSubmit}>
        <FormFieldMapper form={form} items={items} />
        <Button type="submit">{startCase(mode)}</Button>
      </form>
    </Form>
  );
};
