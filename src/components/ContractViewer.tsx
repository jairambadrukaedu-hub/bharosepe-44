import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, CheckCircle, XCircle, Clock, User, Calendar,
  ChevronDown, ChevronUp, Download, Printer, Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useContracts, Contract } from '@/hooks/use-contracts';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
  awaiting_acceptance: {
    label: 'Awaiting Acceptance',
    bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', dot: 'bg-amber-400',
  },
  accepted_awaiting_payment: {
    label: 'Accepted',
    bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-300', dot: 'bg-green-500',
  },
  rejected: {
    label: 'Rejected',
    bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-300', dot: 'bg-red-500',
  },
  draft: {
    label: 'Draft',
    bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-300', dot: 'bg-gray-400',
  },
  expired: {
    label: 'Expired',
    bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-300', dot: 'bg-gray-400',
  },
};

const isHTML = (str: string) => /<[a-z][\s\S]*>/i.test(str);

interface ContractViewerProps {
  contractId: string;
}

export default function ContractViewer({ contractId }: ContractViewerProps) {
  const { user } = useAuth();
  const { contracts, respondToContract, loading: contractsLoading } = useContracts();
  const [contract, setContract] = useState<Contract | null>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showContract, setShowContract] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);

  useEffect(() => {
    if (contractsLoading) return;
    const found = contracts.find(c => c.id === contractId);
    setContract(found || null);
    setLoading(false);
  }, [contracts, contractId, contractsLoading]);

  const handleResponse = async (action: 'accept' | 'reject') => {
    if (!contract) return;
    setIsResponding(true);
    try {
      await respondToContract(contract.id, action, responseMessage || undefined);
      setHasResponded(true);
      setContract(prev =>
        prev
          ? {
              ...prev,
              status: action === 'accept' ? 'accepted_awaiting_payment' : 'rejected',
              response_message: responseMessage || prev.response_message,
              responded_at: new Date().toISOString(),
            }
          : prev,
      );
      toast.success(`Contract ${action === 'accept' ? 'accepted' : 'rejected'} successfully`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsResponding(false);
    }
  };

  const handleDownload = () => {
    if (!contract) return;
    const content = contract.contract_content || '';
    const blob = new Blob(
      [isHTML(content) ? content : `<pre style="font-family:sans-serif;padding:20px">${content}</pre>`],
      { type: 'text/html' },
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `contract-${contractId.slice(0, 8)}.html`;
    a.click();
  };

  const handlePrint = () => {
    if (!contract) return;
    const w = window.open('', '', 'width=900,height=700');
    if (w) {
      w.document.write(contract.contract_content || '');
      w.document.close();
      w.print();
    }
  };

  const isRecipient = contract && contract.recipient_id === user?.id;
  const canRespond = isRecipient && contract?.status === 'awaiting_acceptance' && !hasResponded;
  const statusCfg = contract ? (STATUS_CONFIG[contract.status] ?? STATUS_CONFIG.draft) : STATUS_CONFIG.draft;

  /* ── Loading ── */
  if (loading || contractsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-8 h-8 border-2 border-bharose-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading contract…</p>
      </div>
    );
  }

  /* ── Not found ── */
  if (!contract) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <FileText className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="font-medium text-muted-foreground">Contract not found</p>
        <p className="text-xs text-muted-foreground/70">It may still be loading or the link may be invalid.</p>
      </div>
    );
  }

  const html = contract.contract_content || '';
  const contractIsHTML = isHTML(html);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Status Banner ── */}
      <div className={`px-4 py-3 ${statusCfg.bg} border-b ${statusCfg.border} flex items-center gap-2`}>
        <span className={`w-2 h-2 rounded-full ${statusCfg.dot} shrink-0`} />
        <span className={`text-sm font-semibold ${statusCfg.text}`}>{statusCfg.label}</span>
        {contract.responded_at && (
          <span className="text-xs text-muted-foreground ml-auto">
            {new Date(contract.responded_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>

      <div className="p-4 space-y-5">
        {/* ── Title & action buttons ── */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bharose-primary/10 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-bharose-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">
                {contract.transaction?.title || 'Contract'}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                ID: {contract.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg border hover:bg-muted transition-colors"
              title="Download contract"
            >
              <Download className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg border hover:bg-muted transition-colors"
              title="Print contract"
            >
              <Printer className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* ── Party cards ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border bg-card p-3 space-y-1">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Created by</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-bharose-primary/15 flex items-center justify-center text-xs font-bold text-bharose-primary">
                {(contract.creator_name || 'U')[0].toUpperCase()}
              </div>
              <p className="text-sm font-semibold truncate">{contract.creator_name || '—'}</p>
            </div>
          </div>
          {contract.recipient_name && (
            <div className="rounded-xl border bg-card p-3 space-y-1">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Sent to</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">
                  {contract.recipient_name[0].toUpperCase()}
                </div>
                <p className="text-sm font-semibold truncate">{contract.recipient_name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Date / amount row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(contract.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          {contract.amount && (
            <span className="flex items-center gap-1 font-semibold text-foreground">
              ₹{Number(contract.amount).toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* ── Contract Document (collapsible) ── */}
        <div className="rounded-xl border overflow-hidden">
          <button
            onClick={() => setShowContract(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-bharose-primary" />
              View Contract Document
            </span>
            {showContract ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          <AnimatePresence>
            {showContract && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="border-t">
                  {contractIsHTML ? (
                    <div
                      className="w-full overflow-auto bg-white"
                      style={{ maxHeight: '70vh' }}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  ) : (
                    <pre className="p-4 text-xs leading-relaxed whitespace-pre-wrap text-foreground overflow-auto bg-white" style={{ maxHeight: '70vh' }}>
                      {html}
                    </pre>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Response note */}
        {contract.response_message && (
          <div className="rounded-xl border p-4 space-y-1 bg-muted/30">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Response note</p>
            <p className="text-sm">{contract.response_message}</p>
          </div>
        )}

        {/* ── Recipient: Accept / Reject ── */}
        {canRespond && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border-2 border-bharose-primary/30 bg-bharose-primary/5 p-4 space-y-4"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-bharose-primary" />
              <h4 className="font-semibold text-sm">Your Response Required</h4>
            </div>
            <Textarea
              value={responseMessage}
              onChange={e => setResponseMessage(e.target.value)}
              placeholder="Add a note (optional)…"
              className="resize-none text-sm bg-white"
              rows={3}
            />
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleResponse('reject')}
                disabled={isResponding}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 font-semibold"
              >
                {isResponding ? (
                  <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                Reject
              </Button>
              <Button
                onClick={() => handleResponse('accept')}
                disabled={isResponding}
                className="bg-green-600 hover:bg-green-700 font-semibold"
              >
                {isResponding ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Accept Contract
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── Sender: waiting notice ── */}
        {!isRecipient && contract.status === 'awaiting_acceptance' && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Waiting for acceptance</p>
              <p className="text-xs text-amber-700 mt-0.5">
                A notification was sent to <strong>{contract.recipient_name || 'the other party'}</strong>. You'll be notified when they respond.
              </p>
            </div>
          </div>
        )}

        {/* ── Accepted ── */}
        {contract.status === 'accepted_awaiting_payment' && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-800">Contract accepted!</p>
              <p className="text-xs text-green-700 mt-0.5">
                {isRecipient
                  ? 'You accepted this contract. The other party has been notified.'
                  : `${contract.recipient_name || 'The other party'} accepted this contract.`}
              </p>
            </div>
          </div>
        )}

        {/* ── Rejected ── */}
        {contract.status === 'rejected' && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">Contract rejected</p>
              <p className="text-xs text-red-700 mt-0.5">
                {isRecipient
                  ? 'You rejected this contract.'
                  : `${contract.recipient_name || 'The other party'} rejected this contract.`}
                {contract.response_message && ` Reason: "${contract.response_message}"`}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}