"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
import Link from "next/link";

/* ---------------------- TYPES ADDED (FIX ALL RED UNDERLINES) ----------------------- */

type Staff = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  hostelId?: {
    _id: string;
    name: string;
  };
};

type Hostel = {
  _id: string;
  name: string;
};

type PasswordCardData = {
  role: string;
  name: string;
  password: string;
};

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/chief-warden" },
  { icon: <span>👥</span>, label: "Manage Wardens", href: "/dashboard/chief-warden/manage-wardens" },
  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/chief-warden/complaints" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/chief-warden/reports" },
];

export default function ManageWardensPage() {
  const [wardens, setWardens] = useState<Staff[]>([]);
  const [managers, setManagers] = useState<Staff[]>([]);
  const [hostels, setHostels] = useState<Hostel[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"warden" | "manager" | "">("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hostelId: "",
  });

  const [passwordCard, setPasswordCard] = useState<PasswordCardData | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ------------------------------ Fetch Wardens & Managers ----------------------------- */

  const fetchData = async () => {
    try {
      const wardenRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/wardens/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const managerRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/mess-managers/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const wardenJson = await wardenRes.json();
      const managerJson = await managerRes.json();

      setWardens(wardenJson.wardens || []);
      setManagers(managerJson.managers || []);
    } catch (err) {
      console.error("Fetch staff failed:", err);
    }
  };

  /* ------------------------------ Fetch Hostels ------------------------------ */

  const fetchHostels = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/hostels/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setHostels(data.hostels || []);
    } catch (err) {
      console.error("Fetch hostels failed:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchHostels();
  }, []);

  /* --------------------------- Form Handling --------------------------- */

  const openForm = (type: "warden" | "manager") => {
    setFormType(type);
    setShowForm(true);
    setFormData({ name: "", email: "", phone: "", hostelId: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* --------------------------- Submit Form --------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url =
      formType === "warden"
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth/chief/warden`
        : `${process.env.NEXT_PUBLIC_API_URL}/auth/chief/mess-manager`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error creating user");
        return;
      }

      // backend sends password as { password: "abc123" }
      setPasswordCard({
        role: formType,
        name: formData.name,
        password: data.password,
      });

      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  /* --------------------------- Delete Staff --------------------------- */

  const deleteStaff = async (type: "warden" | "manager", id: string) => {
    const url =
      type === "warden"
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth/wardens/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/auth/mess-managers/${id}`;

    if (!confirm("Are you sure you want to delete this account?")) return;

    try {
      await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* ----------------------------------- UI ------------------------------------ */

  return (
    <DashboardLayout menuItems={menuItems} role="Chief Warden" userName="Dr. Admin">
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/chief-warden" className="p-2 hover:bg-muted rounded-lg">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold">Manage Wardens & Mess Managers</h2>
          </div>
        </div>

        {/* Add Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => openForm("warden")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
          >
            <Plus size={18} /> Add Warden
          </button>

          <button
            onClick={() => openForm("manager")}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-black rounded-lg"
          >
            <Plus size={18} /> Add Mess Manager
          </button>
        </div>

        {/* Warden List */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Wardens</h3>

          {wardens.map((w) => (
            <div
              key={w._id}
              className="flex justify-between items-center p-4 border rounded-lg mb-3"
            >
              <div>
                <p className="font-semibold">{w.name}</p>
                <p className="text-sm text-muted-foreground">
                  {w.email} • {w.phone}
                </p>
                <p className="text-sm">Hostel: {w.hostelId?.name || "N/A"}</p>
              </div>

              <Trash2
                className="text-red-500 cursor-pointer"
                onClick={() => deleteStaff("warden", w._id)}
              />
            </div>
          ))}
        </div>

        {/* Mess Manager List */}
        <div className="bg-card border border-border rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Mess Managers</h3>

          {managers.map((m) => (
            <div
              key={m._id}
              className="flex justify-between items-center p-4 border rounded-lg mb-3"
            >
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-muted-foreground">
                  {m.email} • {m.phone}
                </p>
              </div>

              <Trash2
                className="text-red-500 cursor-pointer"
                onClick={() => deleteStaff("manager", m._id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Add {formType === "warden" ? "Warden" : "Mess Manager"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />

              {formType === "warden" && (
                <select
                  name="hostelId"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="">Select Hostel</option>
                  {hostels.map((h) => (
                    <option key={h._id} value={h._id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              )}

              <div className="flex gap-3">
                <button className="flex-1 bg-primary text-white py-2 rounded">
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-muted py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {passwordCard && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg w-full max-w-md text-center">
            <h3 className="text-xl font-semibold mb-4">Account Created</h3>

            <p className="font-medium text-lg">{passwordCard.name}</p>

            <p className="text-sm text-muted-foreground uppercase">
              {passwordCard.role}
            </p>

            <div className="bg-muted p-4 rounded-lg mt-4 mb-4">
              <p className="text-sm">Generated Password</p>
              <p className="font-bold text-xl">{passwordCard.password}</p>
            </div>

            <button
              onClick={() => setPasswordCard(null)}
              className="px-6 py-2 bg-primary text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import DashboardLayout from "@/components/layout/dashboard-layout";
// import { ArrowLeft, Trash2, Plus } from "lucide-react";
// import Link from "next/link";
// import AccountCreatedModal from "@/components/auth/account-created-modal";

// const API = process.env.NEXT_PUBLIC_API_URL;

// // -------------------------- Types ---------------------------
// interface Hostel {
//   _id: string;
//   name: string;
// }

// interface Warden {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   hostelId?: { _id: string; name: string }; // populated
// }

// interface MessManager {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
// }

// // -------------------------- Component ------------------------
// export default function ManageWardensPage() {
//   const [wardens, setWardens] = useState<Warden[]>([]);
//   const [messManagers, setMessManagers] = useState<MessManager[]>([]);
//   const [hostels, setHostels] = useState<Hostel[]>([]);
//   const [showWardenForm, setShowWardenForm] = useState(false);
//   const [showMMForm, setShowMMForm] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [generatedPassword, setGeneratedPassword] = useState("");
//   const [createdUsername, setCreatedUsername] = useState("");

//   // -------------------------- Form Data ------------------------
//   const [wardenForm, setWardenForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     hostelId: "",
//   });

//   const [mmForm, setMMForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   // -------------------------- Fetch Data ------------------------
//   const fetchAll = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const [wRes, mRes, hRes] = await Promise.all([
//         fetch(`${API}/auth/wardens/all`, { headers }).then((r) => r.json()),
//         fetch(`${API}/auth/mess-managers/all`, { headers }).then((r) => r.json()),
//         fetch(`${API}/hostels`, { headers }).then((r) => r.json()),
//       ]);

//       setWardens(wRes.wardens || []);
//       setMessManagers(mRes.managers || []);
//       setHostels(hRes.hostels || []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   // -------------------------- Form Handlers ------------------------
//   const handleWardenChange = (e: any) =>
//     setWardenForm({ ...wardenForm, [e.target.name]: e.target.value });

//   const handleMMChange = (e: any) =>
//     setMMForm({ ...mmForm, [e.target.name]: e.target.value });

//   // -------------------------- Add Warden ------------------------
//   const submitWarden = async (e: any) => {
//     e.preventDefault();

//     if (!wardenForm.hostelId) {
//       alert("Please select a hostel");
//       return;
//     }

//     try {
//       const res = await fetch(`${API}/auth/chief/warden`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(wardenForm),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setGeneratedPassword(data.password);
//         setCreatedUsername(wardenForm.email);
//         setModalOpen(true);
//         setShowWardenForm(false);
//         setWardenForm({ name: "", email: "", phone: "", hostelId: "" });
//         fetchAll();
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // -------------------------- Add Mess Manager ------------------------
//   const submitMM = async (e: any) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API}/auth/chief/mess-manager`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(mmForm),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setGeneratedPassword(data.password);
//         setCreatedUsername(mmForm.email);
//         setModalOpen(true);
//         setShowMMForm(false);
//         setMMForm({ name: "", email: "", phone: "" });
//         fetchAll();
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // -------------------------- Delete ------------------------
//   const deleteWarden = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this warden?")) return;

//     await fetch(`${API}/auth/wardens/${id}`, { method: "DELETE" });
//     fetchAll();
//   };

//   const deleteMM = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this mess manager?")) return;

//     await fetch(`${API}/auth/mess-managers/${id}`, { method: "DELETE" });
//     fetchAll();
//   };

//   return (
//     <DashboardLayout menuItems={[]} role="Chief Warden" userName="Admin">
//       <div className="p-6 space-y-8">
//         {/* Header */}
//         <div className="flex items-center gap-4">
//           <Link href="/dashboard/chief-warden" className="p-2 rounded-lg hover:bg-muted">
//             <ArrowLeft size={24} />
//           </Link>

//           <div>
//             <h2 className="text-3xl font-bold">Manage Wardens & Mess Manager</h2>
//             <p className="text-muted-foreground mt-1">
//               Create, view and remove hostel staff.
//             </p>
//           </div>
//         </div>

//         {/* Add Buttons */}
//         <div className="flex gap-4">
//           <button
//             onClick={() => setShowWardenForm(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
//           >
//             <Plus size={18} /> Add Warden
//           </button>

//           <button
//             onClick={() => setShowMMForm(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg"
//           >
//             <Plus size={18} /> Add Mess Manager
//           </button>
//         </div>

//         {/* Add Warden Form */}
//         {showWardenForm && (
//           <form onSubmit={submitWarden} className="p-6 border rounded-lg space-y-4 bg-card">
//             <h3 className="text-xl font-semibold">New Warden</h3>

//             <input name="name" onChange={handleWardenChange} placeholder="Name" required className="input" />
//             <input name="email" onChange={handleWardenChange} placeholder="Email" required className="input" />
//             <input name="phone" onChange={handleWardenChange} placeholder="Phone" required className="input" />

//             <select
//               name="hostelId"
//               required
//               value={wardenForm.hostelId}
//               onChange={handleWardenChange}
//               className="input"
//             >
//               <option value="">Select Hostel</option>
//               {hostels.map((h) => (
//                 <option key={h._id} value={h._id}>
//                   {h.name}
//                 </option>
//               ))}
//             </select>

//             <button type="submit" className="btn-primary w-full">
//               Create Warden
//             </button>
//           </form>
//         )}

//         {/* Add Mess Manager Form */}
//         {showMMForm && (
//           <form onSubmit={submitMM} className="p-6 border rounded-lg space-y-4 bg-card">
//             <h3 className="text-xl font-semibold">New Mess Manager</h3>

//             <input name="name" onChange={handleMMChange} placeholder="Name" required className="input" />
//             <input name="email" onChange={handleMMChange} placeholder="Email" required className="input" />
//             <input name="phone" onChange={handleMMChange} placeholder="Phone" required className="input" />

//             <button type="submit" className="btn-primary w-full">
//               Create Mess Manager
//             </button>
//           </form>
//         )}

//         {/* Wardens List */}
//         <div className="p-6 border rounded-lg">
//           <h3 className="text-xl font-semibold mb-4">Wardens</h3>

//           {wardens.map((w) => (
//             <div key={w._id} className="flex justify-between items-center p-4 border rounded-md mb-3">
//               <div>
//                 <p className="font-semibold">{w.name}</p>
//                 <p className="text-sm">{w.email}</p>
//                 <p className="text-sm">{w.phone}</p>
//                 <p className="text-sm text-muted-foreground">
//                   Hostel: {w.hostelId?.name || "N/A"}
//                 </p>
//               </div>

//               <button
//                 onClick={() => deleteWarden(w._id)}
//                 className="p-2 text-red-600 hover:bg-red-100 rounded-md"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Mess Managers List */}
//         <div className="p-6 border rounded-lg">
//           <h3 className="text-xl font-semibold mb-4">Mess Managers</h3>

//           {messManagers.map((m) => (
//             <div key={m._id} className="flex justify-between items-center p-4 border rounded-md mb-3">
//               <div>
//                 <p className="font-semibold">{m.name}</p>
//                 <p className="text-sm">{m.email}</p>
//                 <p className="text-sm">{m.phone}</p>
//               </div>

//               <button
//                 onClick={() => deleteMM(m._id)}
//                 className="p-2 text-red-600 hover:bg-red-100 rounded-md"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <AccountCreatedModal
//         isOpen={modalOpen}
//         title="Account Created"
//         username={createdUsername}
//         password={generatedPassword}
//         isStub={false}
//         onClose={() => setModalOpen(false)}
//       />
//     </DashboardLayout>
//   );
// }
