"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ContentPreview from "./content-preview";
import { Alignment, LangCode, ContentDto } from "@/models/content";
import { contentApi } from "@/services/contentApi";

// Validation schema
const validationSchema = Yup.object({
  image: Yup.string().url("Must be a valid URL").required("Image is required"),
  text: Yup.string().required("Text is required"),
  textAlignment: Yup.string()
    .oneOf(["left", "center", "right"])
    .required("Text alignment required"),
  language: Yup.string()
    .oneOf(["en", "da", "sv"])
    .required("Select a language"),
});

// Initial values
const INITIAL_VALUES: ContentDto = {
  id: "", // optional if your backend generates it
  image: "",
  text: "",
  textAlignment: "left" as Alignment,
  language: "en" as LangCode,
};

export default function ShadcnForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ContentDto) => contentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await mutation.mutateAsync(values);
        resetForm();
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Form */}
          <Form className="flex flex-col gap-6 w-full max-w-md">
            {/* Language */}
            <div className="flex flex-col gap-1">
              <Label>Language</Label>
              <Select
                value={values.language}
                onValueChange={(v) => setFieldValue("language", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="da">DA</SelectItem>
                  <SelectItem value="sv">SV</SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage
                name="language"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Image */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="image">Image URL</Label>
              <Field as={Input} id="image" name="image" placeholder="https://..." />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="text">Text</Label>
              <Field as={Textarea} id="text" name="text" placeholder="Enter text..." />
              <ErrorMessage
                name="text"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Text Alignment */}
            <div className="flex flex-col gap-1">
              <Label>Text Alignment</Label>
              <Select
                value={values.textAlignment}
                onValueChange={(v) => setFieldValue("textAlignment", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage
                name="textAlignment"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <Button type="submit" disabled={isSubmitting || mutation.isPending}>
              {mutation.isPending ? "Submitting…" : "Submit"}
            </Button>
          </Form>

          {/* Preview */}
          <ContentPreview values={values} />
        </div>
      )}
    </Formik>
  );
}
