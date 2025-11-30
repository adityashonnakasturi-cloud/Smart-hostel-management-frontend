"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface Room {
  id: string
  number: string
  status: "available" | "occupied" | "maintenance"
  studentNames?: string[]
  usns?: string[]
  semesters?: string[]
  roomType?: string
}

interface RoomGridProps {
  isEditable?: boolean
  gridSize?: number
}

export default function RoomGrid({ isEditable = false, gridSize = 16 }: RoomGridProps) {
  const [rooms, setRooms] = useState<Room[]>(
    Array.from({ length: gridSize }, (_, i) => ({
      id: `room-${i + 1}`,
      number: `${100 + i + 1}`,
      status: i % 4 === 0 ? "occupied" : i % 4 === 1 ? "maintenance" : "available",
      studentNames: i % 4 === 0 ? ["John Doe", "Jane Smith", "Bob Wilson"] : undefined,
      usns: i % 4 === 0 ? [`USN00${i}`, `USN00${i + 1}`, `USN00${i + 2}`] : undefined,
      semesters: i % 4 === 0 ? ["1", "2", "3"] : undefined,
      roomType: ["Single", "Double", "Triple"][i % 3],
    })),
  )

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    studentNames: ["", "", ""],
    usns: ["", "", ""],
    semesters: ["", "", ""],
    roomType: "Double",
  })

  const gridSizeOptions = [
    { value: 9, label: "3×3" },
    { value: 16, label: "4×4" },
    { value: 36, label: "6×6" },
  ]

  const handleChangeGridSize = (newSize: number) => {
    setRooms(
      Array.from({ length: newSize }, (_, i) => ({
        id: `room-${i + 1}`,
        number: `${100 + i + 1}`,
        status: i % 4 === 0 ? "occupied" : i % 4 === 1 ? "maintenance" : "available",
        studentNames: i % 4 === 0 ? ["John Doe", "Jane Smith", "Bob Wilson"] : undefined,
        usns: i % 4 === 0 ? [`USN00${i}`, `USN00${i + 1}`, `USN00${i + 2}`] : undefined,
        semesters: i % 4 === 0 ? ["1", "2", "3"] : undefined,
        roomType: ["Single", "Double", "Triple"][i % 3],
      })),
    )
  }

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room)
    setFormData({
      studentNames: room.studentNames || ["", "", ""],
      usns: room.usns || ["", "", ""],
      semesters: room.semesters || ["", "", ""],
      roomType: room.roomType || "Double",
    })
    setShowModal(true)
  }

  const handleAllocate = () => {
    if (selectedRoom && isEditable) {
      const updatedRooms = rooms.map((r) =>
        r.id === selectedRoom.id
          ? {
              ...r,
              status: "occupied" as const,
              studentNames: formData.studentNames,
              usns: formData.usns,
              semesters: formData.semesters,
              roomType: formData.roomType,
            }
          : r,
      )
      setRooms(updatedRooms)
      setShowModal(false)
    }
  }

  const handleVacate = () => {
    if (selectedRoom && isEditable) {
      const updatedRooms = rooms.map((r) =>
        r.id === selectedRoom.id
          ? {
              ...r,
              status: "available" as const,
              studentNames: undefined,
              usns: undefined,
              semesters: undefined,
            }
          : r,
      )
      setRooms(updatedRooms)
      setShowModal(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-500"
      case "maintenance":
        return "bg-yellow-400"
      case "available":
        return "bg-emerald-500"
      default:
        return "bg-gray-400"
    }
  }

  const gridColsClass = {
    9: "grid-cols-3",
    16: "grid-cols-4",
    36: "grid-cols-6",
  }[gridSize]

  return (
    <div className="space-y-6">
      {/* Room Grid */}
      <div
        className={`grid ${gridColsClass} gap-3 p-6 bg-gradient-to-br from-background to-emerald-50 rounded-xl border border-border`}
      >
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => handleRoomClick(room)}
            className={`${getStatusColor(room.status)} p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group`}
          >
            <div className="text-white">
              <p className="font-bold text-lg group-hover:text-emerald-100">Room {room.number}</p>
              <p className="text-xs opacity-90">{room.roomType}</p>
              {room.studentNames && (
                <div className="mt-1">
                  {room.studentNames.map((name, index) => (
                    <p key={index} className="text-xs opacity-90 truncate">
                      {name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">{isEditable ? "Allocate Room" : "Room Details"}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-muted rounded-lg transition">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Room Number</label>
                <p className="text-foreground font-semibold">{selectedRoom.number}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                <p className="text-foreground font-semibold capitalize">{selectedRoom.status}</p>
              </div>

              {isEditable ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Student Names</label>
                    <div className="space-y-2">
                      {formData.studentNames.map((name, index) => (
                        <input
                          key={index}
                          type="text"
                          value={name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              studentNames: formData.studentNames.map((n, i) => (i === index ? e.target.value : n)),
                            })
                          }
                          placeholder={`Enter student name ${index + 1}`}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">USNs</label>
                    <div className="space-y-2">
                      {formData.usns.map((usn, index) => (
                        <input
                          key={index}
                          type="text"
                          value={usn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              usns: formData.usns.map((u, i) => (i === index ? e.target.value : u)),
                            })
                          }
                          placeholder={`Enter USN ${index + 1}`}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Semesters</label>
                    <div className="space-y-2">
                      {formData.semesters.map((semester, index) => (
                        <input
                          key={index}
                          type="text"
                          value={semester}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              semesters: formData.semesters.map((s, i) => (i === index ? e.target.value : s)),
                            })
                          }
                          placeholder={`Enter semester ${index + 1}`}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Room Type</label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
                    >
                      <option>Single</option>
                      <option>Double</option>
                      <option>Triple</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={handleAllocate}
                      className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition"
                    >
                      Confirm
                    </button>
                    {selectedRoom.status === "occupied" && (
                      <button
                        onClick={handleVacate}
                        className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition"
                      >
                        Vacate
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Student Names</label>
                    <div className="space-y-2">
                      {selectedRoom.studentNames?.map((name, index) => (
                        <p key={index} className="text-foreground font-semibold">
                          {name || "N/A"}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">USNs</label>
                    <div className="space-y-2">
                      {selectedRoom.usns?.map((usn, index) => (
                        <p key={index} className="text-foreground font-semibold">
                          {usn || "N/A"}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Semesters</label>
                    <div className="space-y-2">
                      {selectedRoom.semesters?.map((semester, index) => (
                        <p key={index} className="text-foreground font-semibold">
                          {semester || "N/A"}
                        </p>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-medium transition"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
