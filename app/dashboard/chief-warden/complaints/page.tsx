"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/dashboard/data-table";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/chief-warden" },
  { icon: <span>👥</span>, label: "Manage Wardens", href: "/dashboard/chief-warden/manage-wardens" },
  { icon: <span>🛠️</span>, label: "View Complaints", href: "/dashboard/chief-warden/complaints" },
  { icon: "📢", label: "Upload Notice", href: "/dashboard/chief-warden/noticeupload" },
{ icon: "⚠️", label: "Student Complaints", href: "/dashboard/chief-warden/student-complaints" },
];

export default function ChiefComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const HOSTEL_ID = "691e076ba2c5be3ba18a963d"; // you can change dynamically later

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/complaints/chief?hostelId=${HOSTEL_ID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      setComplaints(data.complaints || []);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "closed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "not-resolvable":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  if (loading) return <div className="p-6">Loading complaints...</div>;

  return (
    <DashboardLayout menuItems={menuItems} role="Chief Warden" userName="Dr. Admin">
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/chief-warden" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">All Complaints</h2>
            <p className="text-muted-foreground mt-1">View all student complaints in the hostel</p>
          </div>
        </div>

        {/* Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4 border border-border">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedComplaint.category}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Student: {selectedComplaint.createdBy?.name}
                  </p>
                  <p className="text-muted-foreground">
                    Room: {selectedComplaint.createdBy?.roomId?.roomNumber || "N/A"}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Description</p>
                  <p className="text-foreground mt-1">{selectedComplaint.description}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground font-medium">Warden Note</p>
                  <p className="text-foreground mt-1">
                    {selectedComplaint.wardenNote || "No note"}
                  </p>
                </div>

                {/* Staff Resolution Image */}
                {selectedComplaint.resolutionImageUrl && (
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Resolution Image</p>
                    <img
                      src={selectedComplaint.resolutionImageUrl}
                      alt="resolution"
                      className="rounded-lg border max-h-64 object-cover mt-2"
                    />
                  </div>
                )}

                {/* Status */}
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Status</p>
                  <span
                    className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      selectedComplaint.status
                    )}`}
                  >
                    {selectedComplaint.status}
                  </span>
                </div>

                {/* Staff who handled */}
                {selectedComplaint.handledBy && (
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Handled By</p>
                    <p className="text-foreground mt-1">
                      {selectedComplaint.handledBy.name} ({selectedComplaint.handledBy.staffType})
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedComplaint(null)}
                className="w-full px-4 py-2 bg-muted text-foreground rounded hover:bg-muted/80 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Complaint Table */}
        <DataTable
          columns={[
            { key: "student", label: "Student", sortable: true },
            { key: "room", label: "Room", sortable: true },
            { key: "category", label: "Category", sortable: true },
            { key: "description", label: "Description", sortable: false },
            { key: "status", label: "Status", sortable: true },
          ]}
          data={complaints.map((c) => ({
            id: c._id,
            student: c.createdBy?.name || "Unknown",
            room: c.createdBy?.roomId?.roomNumber || "N/A",
            category: c.category,
            description: c.description,
            status: c.status,
            raw: c, // keep full object for modal
          }))}

          actions={(row) => (
            <button
              onClick={() => setSelectedComplaint(row)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
            >
              View
            </button>
          )}
        />
      </div>
    </DashboardLayout>
  );
}
