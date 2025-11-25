import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, XCircle, Clock, DollarSign, FileText, User } from 'lucide-react';
import {
  getPendingEscrowReleases,
  approveEscrowRelease,
  rejectEscrowRelease,
  holdEscrowForReview,
  getPendingDisputes,
  resolveDispute,
  getTransactionEvidence,
  verifyEvidence
} from '@/services/escrowManagementService';
import { toast } from 'sonner';

/**
 * ADMIN DASHBOARD FOR ESCROW MANAGEMENT
 * Manual control over all escrow releases, disputes, and evidence verification
 */

interface EscrowQueueItem {
  id: string;
  escrow_record_id: string;
  transaction_id: string;
  status: string;
  priority: string;
  reason_for_queue: string;
  queued_at: string;
  escrow_records: any;
  transactions: any;
}

interface DisputeItem {
  id: string;
  transaction_id: string;
  dispute_initiated_by: string;
  dispute_reason: string;
  dispute_category: string;
  buyer_claim_text: string;
  seller_response_text: string;
  resolution_status: string;
}

export const EscrowAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'escrow' | 'disputes' | 'evidence'>('escrow');
  const [pendingReleases, setPendingReleases] = useState<EscrowQueueItem[]>([]);
  const [pendingDisputes, setPendingDisputes] = useState<DisputeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');

  // Load pending releases
  useEffect(() => {
    loadPendingReleases();
    const interval = setInterval(loadPendingReleases, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadPendingReleases = async () => {
    try {
      setLoading(true);
      const data = await getPendingEscrowReleases();
      setPendingReleases(data || []);
    } catch (error) {
      console.error('Error loading releases:', error);
      toast.error('Failed to load escrow releases');
    } finally {
      setLoading(false);
    }
  };

  const loadPendingDisputes = async () => {
    try {
      setLoading(true);
      const data = await getPendingDisputes();
      setPendingDisputes(data || []);
    } catch (error) {
      console.error('Error loading disputes:', error);
      toast.error('Failed to load disputes');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRelease = async (item: EscrowQueueItem) => {
    if (!adminNotes.trim()) {
      toast.error('Please add admin notes before approving');
      return;
    }

    try {
      setLoading(true);
      const adminId = 'admin-id'; // TODO: Get from auth context
      
      await approveEscrowRelease(
        item.id,
        item.escrow_record_id,
        adminId,
        adminNotes
      );

      toast.success(`✓ Escrow released to seller`);
      setAdminNotes('');
      setSelectedItem(null);
      loadPendingReleases();
    } catch (error) {
      console.error('Error approving release:', error);
      toast.error('Failed to approve release');
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRelease = async (item: EscrowQueueItem, reason: string) => {
    if (!adminNotes.trim()) {
      toast.error('Please add admin notes before rejecting');
      return;
    }

    try {
      setLoading(true);
      const adminId = 'admin-id'; // TODO: Get from auth context
      
      await rejectEscrowRelease(
        item.id,
        item.escrow_record_id,
        adminId,
        reason,
        adminNotes
      );

      toast.success('✓ Escrow refunded to buyer');
      setAdminNotes('');
      setSelectedItem(null);
      loadPendingReleases();
    } catch (error) {
      console.error('Error rejecting release:', error);
      toast.error('Failed to reject release');
    } finally {
      setLoading(false);
    }
  };

  const handleHoldForReview = async (item: EscrowQueueItem) => {
    if (!adminNotes.trim()) {
      toast.error('Please add review notes');
      return;
    }

    try {
      setLoading(true);
      const adminId = 'admin-id';
      
      await holdEscrowForReview(item.id, adminId, adminNotes);
      
      toast.success('✓ Escrow held for further review');
      setAdminNotes('');
      setSelectedItem(null);
      loadPendingReleases();
    } catch (error) {
      console.error('Error holding escrow:', error);
      toast.error('Failed to hold escrow');
    } finally {
      setLoading(false);
    }
  };

  const handleResolveDispute = async (dispute: DisputeItem, resolution: string) => {
    try {
      setLoading(true);
      
      await resolveDispute(
        dispute.id,
        resolution as any,
        0, // amount - can be set based on resolution type
        adminNotes
      );

      toast.success('✓ Dispute resolved');
      setAdminNotes('');
      setSelectedItem(null);
      loadPendingDisputes();
    } catch (error) {
      console.error('Error resolving dispute:', error);
      toast.error('Failed to resolve dispute');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-8 h-8 text-blue-600" />
            Admin Dashboard - Escrow Management
          </h1>
          <p className="text-gray-600 mt-2">Manual control over escrow releases, disputes, and evidence verification</p>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setActiveTab('escrow');
              loadPendingReleases();
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === 'escrow'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pending Releases ({pendingReleases.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('disputes');
              loadPendingDisputes();
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === 'disputes'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Disputes (Beta)
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === 'evidence'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Evidence (Beta)
          </button>
        </div>

        {/* ESCROW RELEASES TAB */}
        {activeTab === 'escrow' && (
          <div className="space-y-6">
            {pendingReleases.length === 0 ? (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-green-700 font-semibold">All caught up! No pending releases.</p>
                </CardContent>
              </Card>
            ) : (
              pendingReleases.map((item) => (
                <Card key={item.id} className="border-l-4 border-l-amber-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          Transaction #{item.transaction_id?.slice(0, 8)}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.reason_for_queue}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge 
                          variant={item.priority === 'urgent' ? 'destructive' : 'secondary'}
                        >
                          {item.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {selectedItem?.id === item.id ? (
                      <div className="space-y-4">
                        {/* TRANSACTION DETAILS */}
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                          <h4 className="font-semibold text-gray-900">Escrow Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Total Amount</p>
                              <p className="font-bold">₹{item.escrow_records?.total_amount}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Platform Fee (1%)</p>
                              <p className="font-bold">₹{item.escrow_records?.platform_fee_amount}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Escrow Amount</p>
                              <p className="font-bold text-green-600">₹{item.escrow_records?.actual_escrow_amount}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Status</p>
                              <p className="font-bold">{item.escrow_records?.escrow_status}</p>
                            </div>
                          </div>
                        </div>

                        {/* REQUIRED EVIDENCE */}
                        <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Evidence Status
                          </h4>
                          <p className="text-sm text-gray-700">
                            {item.escrow_records?.all_evidence_verified 
                              ? '✓ All required evidence verified' 
                              : '⚠ Awaiting evidence verification'}
                          </p>
                        </div>

                        {/* ADMIN DECISION */}
                        <div className="space-y-3">
                          <label className="block">
                            <span className="text-sm font-semibold text-gray-700">Admin Notes</span>
                            <textarea
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                              placeholder="Add notes explaining your decision..."
                              className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-sm"
                              rows={4}
                            />
                          </label>

                          <div className="grid grid-cols-3 gap-3">
                            <Button
                              onClick={() => handleApproveRelease(item)}
                              disabled={loading}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve Release
                            </Button>
                            <Button
                              onClick={() => handleRejectRelease(item, 'Failed evidence verification')}
                              disabled={loading}
                              variant="outline"
                              className="border-red-300 text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject & Refund
                            </Button>
                            <Button
                              onClick={() => handleHoldForReview(item)}
                              disabled={loading}
                              variant="outline"
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              Hold for Review
                            </Button>
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setSelectedItem(null);
                            setAdminNotes('');
                          }}
                          variant="ghost"
                          className="w-full"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Amount to Release</p>
                          <p className="text-2xl font-bold text-green-600">
                            ₹{item.escrow_records?.actual_escrow_amount}
                          </p>
                        </div>
                        <Button
                          onClick={() => setSelectedItem(item)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Review & Decide
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* DISPUTES TAB */}
        {activeTab === 'disputes' && (
          <Card className="bg-yellow-50 border-yellow-300">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-yellow-900">Dispute Resolution (Beta)</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Full dispute resolution system coming soon. For now, use the Escrow tab to handle disputes through evidence review and manual decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* EVIDENCE TAB */}
        {activeTab === 'evidence' && (
          <Card className="bg-blue-50 border-blue-300">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-blue-900">Evidence Management (Beta)</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Full evidence verification dashboard coming soon. For now, verify evidence directly from the Escrow tab when reviewing releases.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EscrowAdminDashboard;
