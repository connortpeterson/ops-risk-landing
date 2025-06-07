import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Lead {
  email: string;
  answers_json: string;
  submitted_at: string;
}

const SECRET_KEY = 'supersecret123';

const AdminPage: NextPage = () => {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const { key } = router.query;
    if (key !== SECRET_KEY) {
      setAuthorized(false);
      return;
    }
    setAuthorized(true);

    const fetchLeads = async () => {
      const { data } = await supabase
        .from('execution_leads')
        .select('email, answers_json, submitted_at')
        .order('submitted_at', { ascending: false })
        .limit(20);
      if (data) {
        setLeads(data as Lead[]);
      }
    };

    fetchLeads();
  }, [router]);

  if (!authorized) {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Latest Leads</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Answers</th>
            <th className="border px-4 py-2">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.submitted_at}>
              <td className="border px-4 py-2">{lead.email}</td>
              <td className="border px-4 py-2 whitespace-pre-wrap">{lead.answers_json}</td>
              <td className="border px-4 py-2">{new Date(lead.submitted_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
