"use client";

import { useState } from "react";
import { X, Copy, Check } from "lucide-react";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const staffCategories = ["electrician", "plumber", "cleaner", "roomBoy", "carpenter", "civil"];

export default function AddStaffModal({ isOpen, onClose, onSuccess }: AddStaffModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const validateForm = () => {
    if (!name.trim()) return setError("Name is required"), false;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Valid email is required"), false;
    if (!category) return setError("Category is required"), false;
    if (!/^\d{10}$/.test(phoneNo)) return setError("Valid 10-digit phone number required"), false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/warden/staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          email,
          phone: phoneNo,
          staffType: category,
        }),
      });

      const data = await res.json();
      console.log("ADD STAFF RESPONSE:", data);

      if (res.ok) {
        setGeneratedPassword(data.password || data.generatedPassword || null);
        setName("");
        setEmail("");
        setCategory("");
        setPhoneNo("");
        onSuccess?.();
      } else {
        setError(data.message || "Error adding staff");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full max-h-screen overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Add Staff Member</h3>
          <button onClick={() => { setGeneratedPassword(null); onClose(); }} className="p-1 hover:bg-muted rounded transition">
            <X size={24} />
          </button>
        </div>

        {generatedPassword ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-100 border border-green-300 rounded text-sm text-green-800">
              <p className="font-medium">✓ Staff created successfully!</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Generated Password</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generatedPassword}
                  readOnly
                  className="flex-1 px-4 py-2 bg-input border border-border rounded-lg"
                />
                <button
                  onClick={handleCopyPassword}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Take a photo or note this password for staff login.
              </p>
            </div>

            <button
              onClick={() => { setGeneratedPassword(null); onClose(); }}
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800">{error}</div>}

            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg"
              >
                <option value="">Select category</option>
                {staffCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg"
                placeholder="9876543210"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
            >
              {isLoading ? "Adding..." : "Add Staff"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
