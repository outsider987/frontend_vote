"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DynamicOptionsInput from "@/app/components/DynamicOptionsInput";
import { DatePicker } from "@/components/ui/date-picker";

export default function Home() {
  const [formData, setFormData] = useState({
    eventDate: "",
    memberCount: "",
    title: "",
    votesPerUser: "",
    showCount: "",
  });
  const [options, setOptions] = useState<string[]>([]);
  const [response, setResponse] = useState<any>(null);

  // Handle the date change from the DatePicker.
  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      // Convert the date to an ISO string or set as empty string if no date.
      eventDate: date ? date.toISOString() : "",
    });
  };

  // Other form fields (excluding eventDate) are defined here.
  const formFields = [
    { name: "memberCount", label: "會員人數", type: "number" },
    { name: "title", label: "投票標題", type: "text" },
    { name: "votesPerUser", label: "每人可投票數", type: "number" },
    { name: "showCount", label: "結果顯示人數", type: "number" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Combine the form data with options.
    const payload = { ...formData, options };
    console.log("送出資料:", payload);
    // Simulate a response.
    setResponse({ event_id: "123456", message: "活動建立成功" });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">建立投票事件</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* DatePicker for event date */}
        <div>
          <label className="block font-medium pb-2 w-full">活動日期:</label>
          <DatePicker
            date={formData.eventDate ? new Date(formData.eventDate) : null}
            onChange={handleDateChange}
          />
        </div>
        {formFields.map((field) => (
          <div key={field.name}>
            <label className="block font-medium pb-2">
              {field.label}:
            </label>
            <Input
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div>
          <label className="block font-medium">投票選項:</label>
          <DynamicOptionsInput value={options} onChange={setOptions} />
        </div>
        <Button type="submit" className="mt-4">
          建立活動
        </Button>
      </form>
      {response && (
        <div className="mt-6 p-4 bg-green-50 border rounded">
          <h3 className="font-bold">回應:</h3>
          <p>活動ID: {response.event_id}</p>
          <p>{response.message}</p>
        </div>
      )}
    </div>
  );
}
