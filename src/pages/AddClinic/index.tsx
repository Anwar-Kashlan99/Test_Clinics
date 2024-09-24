import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateClinicMutation } from "@/services/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const AddClinic = () => {
  const [createClinic, { isLoading }] = useCreateClinicMutation();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const initialValues = {
    name_ar: "",
    name_en: "",
    city_id: "",
    address_ar: "",
    address_en: "",
    url_name: "",
    color: "#000000",
    logo: null,
    requirements: [],
    contactInfos: {
      phone: "",
      whatsapp: "",
      facebook: "",
    },
  };

  const validationSchema = Yup.object({
    name_ar: Yup.string().required("Arabic name is required"),
    name_en: Yup.string().required("English name is required"),
    city_id: Yup.string().required("City ID is required"),
    address_ar: Yup.string().required("Address in Arabic is required"),
    address_en: Yup.string().required("Address in English is required"),
    url_name: Yup.string().required("URL Name is required"),
    color: Yup.string().required("Color is required"),
    logo: Yup.mixed().required("Logo is required"),
    requirements: Yup.array().min(
      1,
      "At least one requirement must be selected"
    ),
    contactInfos: Yup.object({
      phone: Yup.string().required("Phone number is required"),
      whatsapp: Yup.string().required("WhatsApp number is required"),
      facebook: Yup.string().required("Test is required"),
    }),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const formData = new FormData();
    formData.append("name_ar", values.name_ar);
    formData.append("name_en", values.name_en);
    formData.append("city_id", values.city_id);
    formData.append("address_ar", values.address_ar);
    formData.append("address_en", values.address_en);
    formData.append("url_name", values.url_name);
    formData.append("color", values.color);
    formData.append("logo", values.logo);

    values.requirements.forEach((requirement: string, idx: number) => {
      formData.append(`requirements[${idx}]`, requirement);
    });

    formData.append("contactInfos[1][value]", values.contactInfos.phone);
    formData.append("contactInfos[2][value]", values.contactInfos.whatsapp);
    formData.append("contactInfos[3][value]", values.contactInfos.facebook);

    try {
      const response = await createClinic(formData).unwrap();
      toast({
        title: "Success",
        description: response.message,
        variant: "default",
      });
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Failed to create the clinic";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  const handleLogoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create Clinic</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="space-y-4">
            {/* Name Arabic */}
            <div>
              <Label htmlFor="name_ar">Arabic Name</Label>
              <Field
                as={Input}
                name="name_ar"
                id="name_ar"
                placeholder="Enter Arabic Name"
                className="w-full"
              />
              <ErrorMessage
                name="name_ar"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Name English */}
            <div>
              <Label htmlFor="name_en">English Name</Label>
              <Field
                as={Input}
                name="name_en"
                id="name_en"
                placeholder="Enter English Name"
                className="w-full"
              />
              <ErrorMessage
                name="name_en"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* City ID */}
            <div>
              <Label htmlFor="city_id">City ID</Label>
              <Field
                as={Input}
                name="city_id"
                id="city_id"
                placeholder="City ID"
                className="w-full"
              />
              <ErrorMessage
                name="city_id"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Address Arabic */}
            <div>
              <Label htmlFor="address_ar">Address (Arabic)</Label>
              <Field
                as={Textarea}
                name="address_ar"
                id="address_ar"
                placeholder="Enter Address in Arabic"
                className="w-full"
              />
              <ErrorMessage
                name="address_ar"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Address English */}
            <div>
              <Label htmlFor="address_en">Address (English)</Label>
              <Field
                as={Textarea}
                name="address_en"
                id="address_en"
                placeholder="Enter Address in English"
                className="w-full"
              />
              <ErrorMessage
                name="address_en"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* URL Name */}
            <div>
              <Label htmlFor="url_name">URL Name</Label>
              <Field
                as={Input}
                name="url_name"
                id="url_name"
                placeholder="Enter URL Name"
                className="w-full"
              />
              <ErrorMessage
                name="url_name"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Color Picker */}
            <div>
              <Label htmlFor="color">Color</Label>
              <Field
                as={Input}
                name="color"
                id="color"
                type="color"
                className="w-36"
              />
              <ErrorMessage
                name="color"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Logo Upload */}
            <div>
              <Label htmlFor="logo">Logo</Label>
              <Input
                type="file"
                id="logo"
                onChange={(e) => handleLogoChange(e, setFieldValue)}
                className="w-full"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-md"
                />
              )}
              <ErrorMessage
                name="logo"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Requirements */}
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Field
                as="select"
                name="requirements"
                multiple
                className="w-full border p-2"
              >
                <option value="1">Posts</option>
                <option value="2">Advertisements</option>
                <option value="3">Consulting</option>
              </Field>
              <ErrorMessage
                name="requirements"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Contact Information */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Field
                as={Input}
                name="contactInfos.phone"
                id="phone"
                placeholder="Phone Number"
                className="w-full"
              />
              <ErrorMessage
                name="contactInfos.phone"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Field
                as={Input}
                name="contactInfos.whatsapp"
                id="whatsapp"
                placeholder="WhatsApp Number"
                className="w-full"
              />
              <ErrorMessage
                name="contactInfos.whatsapp"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="facebook">Facebook URL</Label>
              <Field
                as={Input}
                name="contactInfos.facebook"
                id="facebook"
                placeholder="facebook URL"
                className="w-full"
              />
              <ErrorMessage
                name="contactInfos.test"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Clinic..." : "Create Clinic"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddClinic;
