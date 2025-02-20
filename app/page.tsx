"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input'; // 假設已設定
import { Button } from '@/components/ui/button';


export default function Home() {
  const [formData, setFormData] = useState({
    eventDate: '',
    memberCount: '',
    title: '',
    options: '',
    votesPerUser: '',
    showCount: '',
  });
  const [response, setResponse] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 呼叫 API 建立投票事件（這裡以模擬回應示範）
    setResponse({ event_id: '123456', message: '活動建立成功' });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">建立投票事件</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">活動日期:</label>
          <Input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium">會員人數:</label>
          <Input
            type="number"
            name="memberCount"
            value={formData.memberCount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium">投票標題:</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium">投票選項 (以逗號分隔):</label>
          <Input
            type="text"
            name="options"
            value={formData.options}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium">每人可投票數:</label>
          <Input
            type="number"
            name="votesPerUser"
            value={formData.votesPerUser}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium">結果顯示人數:</label>
          <Input
            type="number"
            name="showCount"
            value={formData.showCount}
            onChange={handleChange}
            required
          />
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
