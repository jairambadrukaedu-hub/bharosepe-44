import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { AlertTriangle, FileText, Download, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useDisputes } from '@/hooks/use-disputes';
import { useAuth } from '@/hooks/use-auth';
import { useUserModeContext } from '@/components/UserModeContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const Disputes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userMode } = useUserModeContext();
  const { disputes, loading, getActiveDisputes, getResolvedDisputes } = useDisputes();

  const activeDisputes = getActiveDisputes(userMode);
  const resolvedDisputes = getResolvedDisputes(userMode);

  const downloadEvidence = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('dispute-evidence')
        .download(fileName);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.split('/').pop() || 'evidence';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading evidence:', error);
      toast.error('Failed to download evidence');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-bharose-error';
      case 'resolved':
        return 'text-bharose-success';
      case 'escalated':
        return 'text-orange-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertTriangle size={16} />;
      case 'resolved':
        return <CheckCircle size={16} />;
      case 'escalated':
        return <Clock size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const renderDisputeCard = (dispute: any) => (
    <motion.div
      key={dispute.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bharose-card hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/dispute-resolution/${dispute.transaction_id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium">{dispute.transaction?.title || 'Transaction'}</h3>
          <p className="text-sm text-muted-foreground">
            Amount: ₹{dispute.transaction?.amount?.toLocaleString()}
          </p>
        </div>
        <div className={`flex items-center ${getStatusColor(dispute.status)}`}>
          {getStatusIcon(dispute.status)}
          <span className="ml-1 text-sm font-medium capitalize">{dispute.status}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div>
          <span className="text-sm font-medium">Reason: </span>
          <span className="text-sm">{dispute.dispute_reason}</span>
        </div>
        <div>
          <span className="text-sm font-medium">Description: </span>
          <p className="text-sm line-clamp-2">{dispute.description}</p>
        </div>
      </div>

      {dispute.evidence_files && dispute.evidence_files.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Evidence Files:</p>
          <div className="flex flex-wrap gap-2">
            {dispute.evidence_files.map((fileName: string, index: number) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  downloadEvidence(fileName);
                }}
                className="flex items-center text-xs bg-gray-100 rounded px-2 py-1 hover:bg-gray-200"
              >
                <FileText size={12} className="mr-1" />
                Evidence {index + 1}
                <Download size={10} className="ml-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Created {formatDistanceToNow(new Date(dispute.created_at), { addSuffix: true })}
        </span>
        {dispute.status === 'active' && (
          <div className="flex items-center text-bharose-primary">
            <MessageSquare size={14} className="mr-1" />
            Chat with Support
          </div>
        )}
      </div>

      {dispute.status === 'resolved' && dispute.resolution_notes && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm font-medium text-bharose-success">Resolution:</p>
          <p className="text-sm">{dispute.resolution_notes}</p>
        </div>
      )}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="bharose-container">
        <Header title="Disputes" showBack />
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-bharose-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bharose-container pb-8">
      <Header title="Disputes" showBack />
      
      {disputes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <AlertTriangle size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Disputes</h3>
          <p className="text-muted-foreground">
            You don't have any disputes at the moment.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Active Disputes Only - Resolved disputes are now shown in Completed Contracts */}
          {activeDisputes.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle size={20} className="text-bharose-error mr-2" />
                Active Disputes ({activeDisputes.length})
              </h2>
              <div className="space-y-4">
                {activeDisputes.map(renderDisputeCard)}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <CheckCircle size={48} className="text-bharose-success mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Active Disputes</h3>
              <p className="text-muted-foreground">
                All your disputes have been resolved. Resolved disputes can be found in your Completed Contracts.
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Disputes;