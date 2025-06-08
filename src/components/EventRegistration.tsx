import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { sendEventConfirmation } from "@/utils/email";
import { registerForEvent } from "@/services/registrationsService";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface EventRegistrationProps {
  eventId: number;
  eventTitle: string;
  onClose: () => void;
}

const EventRegistration = ({ eventId, eventTitle, onClose }: EventRegistrationProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }


    try {
      await registerForEvent({
        event_id: Number(eventId),
        eventTitle,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes || null,
      });

      await sendEventConfirmation(formData.name, formData.email, eventTitle);
      toast.success("You have successfully registered for this event!");
      onClose();
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("Failed to register for this event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <DialogTitle>Register for {eventTitle}</DialogTitle>
      <DialogDescription>Please complete the form below to join this event.</DialogDescription>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Full Name*</label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email Address*</label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone Number*</label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium">Additional Notes</label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special requirements or questions..."
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-3">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? "Registering..." : "Register Now"}</Button>
        </div>
      </form>
    </div>
  );
};

export default EventRegistration;
