"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getVoteInfo } from "../api/vote";
import { useForm } from "react-hook-form";
import { VoteForm } from "./VoteForm";
import { Alert } from "@/components/ui/alert";

interface VoteInfo {
  event_id: string;
  title: string;
  votes_per_user: number;
  used: boolean;
  event: {
    options: string[];
    isVotingStarted: boolean;
  };
}

interface VoteFormData {
  candidates: string[];
}

export default function VotePage() {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const vote_code = searchParams.get("vote_code");
  const [voteInfo, setVoteInfo] = useState<VoteInfo | null>(null);
  const [message, setMessage] = useState("");
  const { GET_TICKET_VOTE_INFO } = getVoteInfo();

  useEffect(() => {
    const fetchVoteInfo = async () => {
      if (!vote_code) return;
      const res = await GET_TICKET_VOTE_INFO(vote_code);
      if (res.status !== 200) {
        setMessage(res.data.message);
        return;
      }
      setVoteInfo(res.data);
    };
    fetchVoteInfo();
  }, [vote_code]);

  const renderVoteStatus = () => {
    if (!voteInfo) return null;

    if (voteInfo.used) {
      return <VoteStatusMessage message="投票已使用" />;
    }

    if (!voteInfo.event.isVotingStarted) {
      return <VoteStatusMessage message="投票尚未開始" />;
    }

    return (
      <VoteForm 
        voteInfo={voteInfo} 
        vote_code={vote_code!} 
        onMessage={setMessage} 
      />
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 w-full">
      <h2 className="text-3xl font-bold text-center mb-6">投票頁面</h2>
      {message && <Alert variant="destructive">{message}</Alert>}
      {renderVoteStatus()}
    </div>
  );
}

const VoteStatusMessage = ({ message }: { message: string }) => (
  <div className="shadow-lg p-4">
    <p className="mb-4 text-gray-100">{message}</p>
  </div>
);
