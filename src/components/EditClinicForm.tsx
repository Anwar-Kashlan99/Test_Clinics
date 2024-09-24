import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useUpdateClinicMutation } from "@/services/api";
import { useState } from "react";

const EditClinicForm = ({ clinic, onClose }) => {
  const [updateClinic] = useUpdateClinicMutation();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const initialValues = {
    name_ar: clinic.name_ar || "",
    name_en: clinic.name_en || "",
    contactInfos: {
      phone:
        clinic.contact_information?.find(
          (info) => info.communication_type_id === 1
        )?.value || "",
      whatsapp:
        clinic.contact_information?.find(
          (info) => info.communication_type_id === 4
        )?.value || "",
      facebook:
        clinic.contact_information?.find(
          (info) => info.communication_type_id === 5
        )?.value || "",
    },
    city_id: clinic.city_id?.id || "",
    address_ar: clinic.address_ar || "",
    address_en: clinic.address_en || "",
    telephone: clinic.telephone || "",
    url_name: clinic.url_name || "",
    color: clinic.color || "#000000",
    logo: null,
    requirements: clinic.requirements || [],
  };

  const validationSchema = Yup.object({
    name_ar: Yup.string().required("Arabic name is required"),
    name_en: Yup.string().required("English name is required"),
    city_id: Yup.string().required("City ID is required"),
    address_ar: Yup.string().required("Address in Arabic is required"),
    address_en: Yup.string().required("Address in English is required"),
    url_name: Yup.string().required("URL Name is required"),
    color: Yup.string().required("Color is required"),
    contactInfos: Yup.object({
      phone: Yup.string().required("Phone number is required"),
      whatsapp: Yup.string().required("WhatsApp number is required"),
      facebook: Yup.string().required("Facebook URL is required"),
    }),
    logo: Yup.mixed(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name_ar", values.name_ar);
    formData.append("name_en", values.name_en);
    formData.append("city_id", values.city_id);
    formData.append("address_ar", values.address_ar);
    formData.append("address_en", values.address_en);
    formData.append("telephone", values.telephone);
    formData.append("url_name", values.url_name);
    formData.append("color", values.color);

    if (values.logo) {
      formData.append("logo", values.logo);
    }

    formData.append("contactInfos[1][value]", values.contactInfos.phone);
    formData.append("contactInfos[4][value]", values.contactInfos.whatsapp);
    formData.append("contactInfos[5][value]", values.contactInfos.facebook);

    values.requirements.forEach((requirement, idx) => {
      formData.append(`requirements[${idx}]`, requirement);
    });

    try {
      const response = await updateClinic({
        clinicId: clinic.id,
        formData,
      }).unwrap();
      toast({
        title: "Success",
        description: response.message,
        variant: "default",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the clinic",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const handleLogoChange = (e, setFieldValue) => {
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
    <div className="overflow-y-auto max-h-[80vh]">
      {" "}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            {/* Arabic Name */}
            <div>
              <Label htmlFor="name_ar">Arabic Name</Label>
              <Field
                as={Input}
                name="name_ar"
                placeholder="Enter Arabic Name"
              />
              <ErrorMessage
                name="name_ar"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* English Name */}
            <div>
              <Label htmlFor="name_en">English Name</Label>
              <Field
                as={Input}
                name="name_en"
                placeholder="Enter English Name"
              />
              <ErrorMessage
                name="name_en"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Contact Infos */}
            <div>
              <Label htmlFor="contactInfos.phone">Phone Number</Label>
              <Field
                as={Input}
                name="contactInfos.phone"
                placeholder="Phone Number"
              />
              <ErrorMessage
                name="contactInfos.phone"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="contactInfos.whatsapp">WhatsApp</Label>
              <Field
                as={Input}
                name="contactInfos.whatsapp"
                placeholder="WhatsApp Number"
              />
              <ErrorMessage
                name="contactInfos.whatsapp"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="contactInfos.facebook">Facebook</Label>
              <Field
                as={Input}
                name="contactInfos.facebook"
                placeholder="Facebook URL"
              />
              <ErrorMessage
                name="contactInfos.facebook"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* City ID */}
            <div>
              <Label htmlFor="city_id">City ID</Label>
              <Field as={Input} name="city_id" placeholder="Enter City ID" />
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
                placeholder="Enter Address in Arabic"
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
                placeholder="Enter Address in English"
              />
              <ErrorMessage
                name="address_en"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Telephone */}
            <div>
              <Label htmlFor="telephone">Telephone</Label>
              <Field
                as={Input}
                name="telephone"
                placeholder="Enter Telephone"
              />
              <ErrorMessage
                name="telephone"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* URL Name */}
            <div>
              <Label htmlFor="url_name">URL Name</Label>
              <Field as={Input} name="url_name" placeholder="Enter URL Name" />
              <ErrorMessage
                name="url_name"
                component="span"
                className="text-red-600"
              />
            </div>

            {/* Color Picker */}
            <div>
              <Label htmlFor="color">Color</Label>
              <Field as={Input} name="color" type="color" className="w-16" />
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
                onChange={(e) => handleLogoChange(e, setFieldValue)}
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-32 h-32 object-cover"
                />
              )}
            </div>

            {/* Requirements */}
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Field
                className="w-full"
                as="select"
                name="requirements"
                multiple
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

            {/* Submit Button */}
            <Button
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Clinic"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditClinicForm;
