import { Badge } from "@/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetClinicsQuery, useUpdateClinicMutation } from "@/services/api";
import clinicImg from "../../assets/a645bd147748671.62c7fe3d45dd3.jpg";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditClinicForm from "@/components/EditClinicForm";

const ShowClinic = () => {
  const { data, error, isLoading } = useGetClinicsQuery();
  const [updateClinic] = useUpdateClinicMutation();
  const [selectedClinic, setSelectedClinic] = useState(null);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <Skeleton key={idx} className="w-full bg-gray-100 h-96" />
          ))}
        </div>
      </div>
    );
  }

  // If there's an error, display an error message
  if (error) {
    return (
      <div className="text-red-500 text-center">
        Failed to load clinics. Please try again later.
      </div>
    );
  }

  // Extract clinics data
  const clinics = data?.data || [];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Clinics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinics.map((clinic) => (
          <Card key={clinic.id} className="bg-white shadow-md">
            <CardHeader className="relative">
              <img
                src={clinicImg}
                alt={clinic.name}
                className="w-full h-32 object-cover rounded-t-md"
              />
              <Badge className="absolute top-2 right-2">
                {clinic.is_active ? "Active" : "Inactive"}
              </Badge>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle>{clinic.name}</CardTitle>
              <CardDescription>{clinic.address}</CardDescription>
              <p className="text-gray-500 mt-2">City: {clinic.city_id?.name}</p>
              {clinic.contact_information?.map((contact) => (
                <p key={contact.id} className="text-sm text-gray-600">
                  <a href={contact.url} className="text-blue-500">
                    {contact.value}
                  </a>
                </p>
              ))}
            </CardContent>

            <div className="p-4 flex justify-between items-center">
              <Button variant="outline" className="text-xs cursor-default">
                Requirements ({clinic.requirements.length})
              </Button>
              <div
                className="w-10 h-4 rounded-3xl"
                style={{ backgroundColor: clinic.color }}
              ></div>
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => setSelectedClinic(clinic)}
              >
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Dialog
        open={!!selectedClinic}
        onOpenChange={() => setSelectedClinic(null)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-5xl w-full bg-white">
          <DialogHeader>
            <DialogTitle>Edit Clinic</DialogTitle>
          </DialogHeader>
          {selectedClinic && (
            <EditClinicForm
              clinic={selectedClinic}
              onClose={() => setSelectedClinic(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowClinic;
