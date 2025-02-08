import React from "react";
import StatCard from "./StatCard";
import { Car, Activity } from "lucide-react";

const Overview = ({ spaces, spaceStatus }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Spaces"
        value={spaces.length}
        icon={Car}
        bgColor="bg-blue-100"
        textColor="text-blue-600"
      />
      <StatCard
        title="Available Spaces"
        value={spaceStatus.free_spaces}
        icon={Activity}
        bgColor="bg-green-100"
        textColor="text-green-600"
      />
      <StatCard
        title="Occupied Spaces"
        value={spaceStatus.occupied_spaces}
        icon={Car}
        bgColor="bg-red-100"
        textColor="text-red-600"
      />
      <StatCard
        title="Occupancy Rate"
        value={`${Math.round(
          (spaceStatus.occupied_spaces / spaces.length) * 100
        )}%`}
        icon={Activity}
        bgColor="bg-purple-100"
        textColor="text-purple-600"
      />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {spaces.map((space) => (
        <div
          key={space.id}
          className={`p-4 rounded-lg border ${
            space.is_occupied
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Space {space.space_number}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                space.is_occupied
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {space.is_occupied ? "Occupied" : "Available"}
            </span>
          </div>
          {space.current_vehicle && (
            <p className="text-sm text-gray-600">
              Vehicle: {space.current_vehicle}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Overview;
