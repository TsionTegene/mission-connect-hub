
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, FileText, Trash2, Send } from "lucide-react";

type Registration = {
  id: string;
  event_id: string;
  event_title: string;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  created_at: string;
};

type RegistrationCardProps = {
  registration: Registration;
  onSendReminder: (registration: Registration) => void;
  onDelete: (registration: Registration) => void;
};

const RegistrationCard = ({
  registration,
  onSendReminder,
  onDelete,
}: RegistrationCardProps) => {
  return (
    <Card className="glass">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <h3 className="text-xl font-medium">{registration.name}</h3>
              <Badge variant="outline" className="whitespace-nowrap">
                {new Date(registration.created_at).toLocaleDateString()}
              </Badge>
            </div>
            
            <p className="text-sm text-primary font-medium">
              Registered for: {registration.event_title}
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{registration.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{registration.phone}</span>
              </div>
              
              {registration.notes && (
                <div className="pt-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Notes:</span>
                  </div>
                  <p className="mt-1 pl-6 text-foreground/80">{registration.notes}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 md:flex-auto"
              onClick={() => onSendReminder(registration)}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 md:flex-auto text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(registration)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationCard;
