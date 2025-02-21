// pages/vote.tsx
'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface VoteInfo {
  event_id: string;
  title: string;
  options: string[];
  votes_per_user: number;
}

export default function VotePage() {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const vote_code = searchParams.get('vote_code'); // 從 URL 查詢字串取得票券編碼
  const [voteInfo, setVoteInfo] = useState<VoteInfo | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (vote_code) {
      fetch(`/api/vote-info?vote_code=${vote_code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message && data.message !== "活動建立成功") {
            setMessage(data.message);
          } else {
            setVoteInfo(data);
          }
        })
        .catch((err) => {
          setMessage("取得投票資訊失敗");
        });
    }
  }, [vote_code]);

  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const candidate = e.target.value;
    if (e.target.checked) {
      setSelectedCandidates([...selectedCandidates, candidate]);
    } else {
      setSelectedCandidates(selectedCandidates.filter((c) => c !== candidate));
    }
  };

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vote_code) return;
    if (voteInfo && selectedCandidates.length > voteInfo.votes_per_user) {
      setMessage(`最多只能選擇 ${voteInfo.votes_per_user} 人`);
      return;
    }
    const formData = new FormData();
    formData.append("vote_code", vote_code as string);
    formData.append("candidate_ids", selectedCandidates.join(","));
    const res = await fetch("/api/vote", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">投票頁面</h2>
        {message && <div className="mb-4 p-2 bg-orange-500">{message}</div>}
        {voteInfo ? (
          <div>
            <h3 className="text-2xl mb-2">{voteInfo.title}</h3>
            <p className="mb-4">
              請選擇候選人 (最多 {voteInfo.votes_per_user} 人):
            </p>
            <form onSubmit={handleVoteSubmit}>
              <div className="space-y-2">
                {voteInfo.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={option}
                      onChange={handleCandidateChange}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <Button type="submit" className="mt-4 ">
                送出投票
              </Button>
            </form>
          </div>
        ) : (
          <p>讀取投票資訊中...</p>
        )}
      </div>
    </>
  );
}
