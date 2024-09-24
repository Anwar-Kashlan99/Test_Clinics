import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAdminsQuery } from "@/services/api";
import { Button } from "./ui/button";
import PermissionsDialog from "./PermissionsDialog";
import { useState } from "react";

const AdminsTable = () => {
  const { data, error, isLoading } = useGetAdminsQuery();
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="w-full h-8 mb-4" />
        {[...Array(5)].map((_, idx) => (
          <Skeleton key={idx} className="w-full h-12 mb-2" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Failed to load admins. Please try again later.
      </div>
    );
  }

  const admin = data?.data;
  const handleOpenPermissions = (adminId) => {
    setSelectedAdminId(adminId);
    setIsPermissionsDialogOpen(true);
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>Admin Details</CardTitle>
        <CardDescription>Information about the admin.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Admin Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Birth Date</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.city.name}</TableCell>
                <TableCell>{admin.role.name}</TableCell>
                <TableCell>{admin.details.phone_number}</TableCell>
                <TableCell>{admin.details.email}</TableCell>
                <TableCell>{admin.details.gender}</TableCell>
                <TableCell>{admin.details.birth_date}</TableCell>
                <TableCell>
                  <Button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => handleOpenPermissions(admin.id)}
                  >
                    Set Permissions
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {selectedAdminId && (
        <PermissionsDialog
          adminId={selectedAdminId}
          isOpen={isPermissionsDialogOpen}
          onClose={() => setIsPermissionsDialogOpen(false)}
        />
      )}
    </Card>
  );
};

export default AdminsTable;
