import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateAdminMutation } from "@/services/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AddAdmin = () => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const initialValues = {
    username: "",
    password: "",
    city_id: "",
    role_id: "2",
    name_ar: "",
    name_en: "",
    phone_number: "",
    email: "",
    gender: "1",
    clinic_id: "",
    specialization_id: "",
    description: "",
    birth_date: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    city_id: Yup.string().required("City ID is required"),
    name_ar: Yup.string().required("Arabic Name is required"),
    name_en: Yup.string().required("English Name is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid Email").nullable(),
    gender: Yup.string().required("Gender is required"),
    clinic_id: Yup.string().required("Clinic ID is required"),
    specialization_id: Yup.string().required("Specialization ID is required"),
    description: Yup.string().required("Description is required"),
    birth_date: Yup.string()
      .required("Birth date is required")
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Birth date must be in the format YYYY-MM-DD"
      ),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await createAdmin(values).unwrap();
      toast({
        title: "Success",
        description: response.message,
        variant: "default",
      });
    } catch (err) {
      const errorMessage = err?.data?.message || "Failed to create the admin";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create Admin</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Field
                as={Input}
                name="username"
                id="username"
                placeholder="Username"
                className="w-full"
              />
              <ErrorMessage
                name="username"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Field
                as={Input}
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                className="w-full"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-600"
              />
            </div>

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

            <div>
              <Label htmlFor="name_ar">Name (Arabic)</Label>
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

            <div>
              <Label htmlFor="name_en">Name (English)</Label>
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

            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Field
                as={Input}
                name="phone_number"
                id="phone_number"
                placeholder="Phone Number"
                className="w-full"
              />
              <ErrorMessage
                name="phone_number"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Field
                as={Input}
                name="email"
                id="email"
                placeholder="Email (optional)"
                className="w-full"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Field as="select" name="gender" className="w-full border p-2">
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="birth_date">Birth Date</Label>
              <Field
                as={Input}
                name="birth_date"
                id="birth_date"
                type="date"
                placeholder="YYYY-MM-DD"
                className="w-full"
              />
              <ErrorMessage
                name="birth_date"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="clinic_id">Clinic ID</Label>
              <Field
                as={Input}
                name="clinic_id"
                id="clinic_id"
                placeholder="Clinic ID"
                className="w-full"
              />
              <ErrorMessage
                name="clinic_id"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="specialization_id">Specialization ID</Label>
              <Field
                as={Input}
                name="specialization_id"
                id="specialization_id"
                placeholder="Specialization ID"
                className="w-full"
              />
              <ErrorMessage
                name="specialization_id"
                component="span"
                className="text-red-600"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Field
                as={Textarea}
                name="description"
                id="description"
                placeholder="Enter a description"
                className="w-full"
              />
              <ErrorMessage
                name="description"
                component="span"
                className="text-red-600"
              />
            </div>

            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Admin..." : "Create Admin"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAdmin;
