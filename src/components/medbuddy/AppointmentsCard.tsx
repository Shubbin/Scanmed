import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Okonkwo",
    specialty: "Optometrist",
    date: "Dec 15, 2025",
    time: "10:00 AM",
  },
  {
    id: "2",
    doctorName: "Dr. Adebayo",
    specialty: "General Physician",
    date: "Dec 22, 2025",
    time: "3:30 PM",
  },
];

export function AppointmentsCard() {
  return (
    <div className="medical-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Upcoming Appointments</h2>
          <p className="text-sm text-muted-foreground">Your scheduled visits</p>
        </div>
        <Button variant="outline" size="sm">
          Book New
        </Button>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="flex items-center justify-between p-4 rounded-lg bg-accent/50 border border-border"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {apt.doctorName.split(" ")[1]?.charAt(0) || "D"}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{apt.doctorName}</p>
                <p className="text-sm text-muted-foreground">{apt.specialty}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-foreground">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {apt.date}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {apt.time}
                </div>
              </div>
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
