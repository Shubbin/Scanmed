import { Plus, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

export function MedicationSection() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Vitamin D", dosage: "1000 IU", time: "8:00 AM", taken: true },
    { id: "2", name: "Omega-3", dosage: "1000mg", time: "8:00 AM", taken: true },
    { id: "3", name: "Multivitamin", dosage: "1 tablet", time: "12:00 PM", taken: false },
  ]);

  const toggleMedication = (id: string) => {
    setMedications(meds =>
      meds.map(med => (med.id === id ? { ...med, taken: !med.taken } : med))
    );
  };

  return (
    <div className="medical-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Today's Medications</h2>
          <p className="text-sm text-muted-foreground">Track your daily medication schedule</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Medication
        </Button>
      </div>

      {medications.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Pill className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No medications added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {medications.map((med) => (
            <div
              key={med.id}
              className="flex items-center justify-between p-4 rounded-lg bg-accent/50 border border-border"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleMedication(med.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    med.taken
                      ? "bg-success border-success"
                      : "border-muted-foreground"
                  }`}
                >
                  {med.taken && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div>
                  <p className="font-medium text-foreground">{med.name}</p>
                  <p className="text-sm text-muted-foreground">{med.dosage}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{med.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
