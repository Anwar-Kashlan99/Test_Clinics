import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useSetPermissionsMutation } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface PermissionsDialogProps {
  adminId: number;
  isOpen: boolean;
  onClose: () => void;
}

const PermissionsDialog: React.FC<PermissionsDialogProps> = ({
  adminId,
  isOpen,
  onClose,
}) => {
  const [permissions, setPermissions] = useState<{ [key: number]: boolean }>({
    5: false, // Update Clinic
    7: false, // Show Clinic
  });

  const { toast } = useToast(); // shadcn toast
  const [setPermissionsMutation, { isLoading, isSuccess, error }] =
    useSetPermissionsMutation();

  // Handle permissions change
  const handlePermissionChange = (permissionId: number) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permissionId]: !prevPermissions[permissionId],
    }));
  };

  // Submit permissions using FormData with dynamic keys like permissions[5], permissions[7]
  const handleSubmit = async () => {
    const formData = new FormData();

    // Add selected permissions to FormData
    if (permissions[5]) formData.append("permissions[5]", "6");
    if (permissions[7]) formData.append("permissions[7]", "8");

    try {
      // Using the FormData object for the mutation
      await setPermissionsMutation({
        adminId,
        permissions: formData, // Send FormData as the payload
      }).unwrap();

      toast({
        title: "Success!",
        description: "Permissions updated successfully.",
      });
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: "Error setting permissions. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Set Permissions for Admin {adminId}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <Checkbox
              checked={permissions[5]} // Check if permission[5] is selected
              onCheckedChange={() => handlePermissionChange(5)} // Toggle permission[5]
            />
            <label className="ml-2">Update Clinic</label>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={permissions[7]} // Check if permission[7] is selected
              onCheckedChange={() => handlePermissionChange(7)} // Toggle permission[7]
            />
            <label className="ml-2">Show Clinic</label>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            className="bg-blue-600 text-white"
            onClick={handleSubmit}
          >
            {isLoading ? "Saving..." : "Save Permissions"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsDialog;
