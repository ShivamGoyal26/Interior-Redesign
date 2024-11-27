"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { designRoomSchema } from "../utils";
import RoomType from "./room-type";
import DesignType from "./design-type";
import { RegenerateImageProps } from "..";
import { Loader2 } from "lucide-react";

type RoomForm = {
  loading: boolean;
  regenerateImage: (params: RegenerateImageProps) => void;
};

const RoomForm = ({ regenerateImage, loading }: RoomForm) => {
  const form = useForm<z.infer<typeof designRoomSchema>>({
    resolver: zodResolver(designRoomSchema),
    mode: "all",
    defaultValues: {
      description: "",
      roomType: "", // Default value for roomType
      designType: "",
    },
  });

  const {
    formState: { isValid },
  } = form;

  async function onSubmit(data: z.infer<typeof designRoomSchema>) {
    regenerateImage(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col"
      >
        {/* Room Type Field */}
        <FormField
          control={form.control}
          name="roomType"
          render={({ field, fieldState }) => (
            <RoomType
              loading={loading}
              value={field.value}
              onRoomTypeChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <FormField
          control={form.control}
          name="designType"
          render={({ field, fieldState }) => (
            <DesignType
              loading={loading}
              value={field.value}
              onDesignTypeChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500 text-sm font-normal">
                {"Description"}{" "}
                <span className="text-destructive font-bold">*</span>
              </FormLabel>
              <FormControl className="focus-visible:ring-0 focus-visible:ring-offset-0">
                <Textarea
                  disabled={loading}
                  className="focus-visible:bg-secondary text-base"
                  placeholder="Additional Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          className="self-end"
          type="submit"
          disabled={loading}
          // disabled={!isValid}
        >
          {loading ? (
            <div className="flex flex-row gap-2">
              <h1>Generating...</h1>
              <Loader2 className="size-10 animate-spin text-white" />
            </div>
          ) : (
            "Submit"
          )}
        </Button>

        <div className="h-16" />
      </form>
    </Form>
  );
};

export default RoomForm;
