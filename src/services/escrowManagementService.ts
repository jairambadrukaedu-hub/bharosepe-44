/**
 * EVIDENCE VERIFICATION & ESCROW MANAGEMENT SERVICE
 * Handles evidence collection, verification, and escrow release logic
 * All manual for now - admin dashboard controls everything
 */

import { supabase } from '@/integrations/supabase/client';

export interface EvidenceSubmission {
  transactionId: string;
  evidenceType: string;
  submittedBy: 'seller' | 'buyer';
  mediaUrl?: string;
  metadata?: Record<string, any>;
}

export interface EscrowReleaseRequest {
  escrowRecordId: string;
  adminDecision: 'approve' | 'reject' | 'hold';
  adminNotes: string;
  adminId: string;
}

/**
 * Submit evidence to Supabase
 */
export async function submitEvidence(submission: EvidenceSubmission) {
  try {
    const { data, error } = await supabase
      .from('evidence_collection')
      .insert({
        transaction_id: submission.transactionId,
        evidence_type: submission.evidenceType,
        submitted_by: submission.submittedBy,
        media_url: submission.mediaUrl,
        metadata: submission.metadata || {},
        verification_status: 'pending',
        submitted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      evidenceId: data.id,
      message: 'Evidence submitted successfully. Awaiting admin verification.'
    };
  } catch (error) {
    console.error('Error submitting evidence:', error);
    throw error;
  }
}

/**
 * Admin verifies evidence
 */
export async function verifyEvidence(
  evidenceId: string,
  status: 'verified' | 'rejected' | 'flagged',
  notes: string,
  adminId: string
) {
  try {
    const { data, error } = await supabase
      .from('evidence_collection')
      .update({
        verification_status: status,
        verification_notes: notes,
        verified_by: adminId,
        verified_at: new Date().toISOString()
      })
      .eq('id', evidenceId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: `Evidence ${status} by admin`,
      evidence: data
    };
  } catch (error) {
    console.error('Error verifying evidence:', error);
    throw error;
  }
}

/**
 * Get all evidence for a transaction
 */
export async function getTransactionEvidence(transactionId: string) {
  try {
    const { data, error } = await supabase
      .from('evidence_collection')
      .select('*')
      .eq('transaction_id', transactionId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching evidence:', error);
    return [];
  }
}

/**
 * Create escrow record for transaction
 */
export async function createEscrowRecord(
  transactionId: string,
  totalAmount: number,
  requiredEvidence: string[] = []
) {
  try {
    const platformFee = Math.floor(totalAmount * 0.01); // 1% fee
    const actualEscrowAmount = totalAmount - platformFee;
    const releaseEligibleAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days

    const { data, error } = await supabase
      .from('escrow_records')
      .insert({
        transaction_id: transactionId,
        total_amount: totalAmount,
        platform_fee_amount: platformFee,
        actual_escrow_amount: actualEscrowAmount,
        escrow_status: 'held',
        release_trigger_type: 'manual_admin_approval',
        required_evidence: requiredEvidence,
        held_at: new Date().toISOString(),
        release_eligible_at: releaseEligibleAt.toISOString(),
        auto_release_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString() // 72 hours
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      escrowId: data.id,
      escrowAmount: actualEscrowAmount,
      platformFee,
      message: `Escrow created. Funds held until manual admin approval.`
    };
  } catch (error) {
    console.error('Error creating escrow:', error);
    throw error;
  }
}

/**
 * Get escrow record by transaction
 */
export async function getEscrowByTransaction(transactionId: string) {
  try {
    const { data, error } = await supabase
      .from('escrow_records')
      .select('*')
      .eq('transaction_id', transactionId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data || null;
  } catch (error) {
    console.error('Error fetching escrow:', error);
    return null;
  }
}

/**
 * Admin queues escrow for release
 */
export async function queueEscrowForRelease(
  escrowRecordId: string,
  reason: string,
  priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal',
  assignToAdmin?: string
) {
  try {
    const { data, error } = await supabase
      .from('escrow_release_queue')
      .insert({
        escrow_record_id: escrowRecordId,
        transaction_id: (await supabase
          .from('escrow_records')
          .select('transaction_id')
          .eq('id', escrowRecordId)
          .single()).data?.transaction_id,
        status: 'pending',
        priority,
        reason_for_queue: reason,
        assigned_to_admin: assignToAdmin,
        queued_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      queueId: data.id,
      message: 'Escrow queued for admin review'
    };
  } catch (error) {
    console.error('Error queueing escrow:', error);
    throw error;
  }
}

/**
 * ADMIN DASHBOARD: Get pending escrow releases
 */
export async function getPendingEscrowReleases(adminId?: string) {
  try {
    let query = supabase
      .from('escrow_release_queue')
      .select(`
        *,
        escrow_records(*),
        transactions(*)
      `)
      .eq('status', 'pending')
      .order('priority', { ascending: false })
      .order('queued_at', { ascending: true });

    if (adminId) {
      query = query.eq('assigned_to_admin', adminId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching pending releases:', error);
    return [];
  }
}

/**
 * ADMIN DASHBOARD: Approve escrow release
 */
export async function approveEscrowRelease(
  queueId: string,
  escrowRecordId: string,
  adminId: string,
  adminNotes: string
) {
  try {
    // Get escrow record
    const escrow = await getEscrowByTransaction(
      (await supabase
        .from('escrow_release_queue')
        .select('transaction_id')
        .eq('id', queueId)
        .single()).data?.transaction_id
    );

    if (!escrow) throw new Error('Escrow record not found');

    // Update queue
    const { error: queueError } = await supabase
      .from('escrow_release_queue')
      .update({
        status: 'approved',
        admin_decided_by: adminId,
        admin_notes: adminNotes,
        admin_decision: 'Escrow released to seller',
        admin_decided_at: new Date().toISOString(),
        resolved_at: new Date().toISOString()
      })
      .eq('id', queueId);

    if (queueError) throw queueError;

    // Update escrow status
    const { error: escrowError } = await supabase
      .from('escrow_records')
      .update({
        escrow_status: 'fully_released',
        released_to_seller: true,
        released_at: new Date().toISOString()
      })
      .eq('id', escrowRecordId);

    if (escrowError) throw escrowError;

    return {
      success: true,
      message: 'Escrow released to seller',
      escrowAmount: escrow.actual_escrow_amount
    };
  } catch (error) {
    console.error('Error approving escrow release:', error);
    throw error;
  }
}

/**
 * ADMIN DASHBOARD: Reject escrow release (refund to buyer)
 */
export async function rejectEscrowRelease(
  queueId: string,
  escrowRecordId: string,
  adminId: string,
  reason: string,
  adminNotes: string
) {
  try {
    // Get escrow record
    const escrow = await supabase
      .from('escrow_records')
      .select('*')
      .eq('id', escrowRecordId)
      .single();

    if (escrow.error) throw escrow.error;

    // Update queue
    const { error: queueError } = await supabase
      .from('escrow_release_queue')
      .update({
        status: 'rejected',
        admin_decided_by: adminId,
        admin_notes: adminNotes,
        admin_decision: `Rejected: ${reason}`,
        admin_decided_at: new Date().toISOString(),
        resolved_at: new Date().toISOString()
      })
      .eq('id', queueId);

    if (queueError) throw queueError;

    // Update escrow - refund to buyer
    const { error: escrowError } = await supabase
      .from('escrow_records')
      .update({
        escrow_status: 'refunded',
        refunded_to_buyer: true,
        released_at: new Date().toISOString()
      })
      .eq('id', escrowRecordId);

    if (escrowError) throw escrowError;

    return {
      success: true,
      message: 'Escrow refunded to buyer',
      refundAmount: escrow.data.actual_escrow_amount
    };
  } catch (error) {
    console.error('Error rejecting escrow release:', error);
    throw error;
  }
}

/**
 * ADMIN DASHBOARD: Hold escrow for further review
 */
export async function holdEscrowForReview(
  queueId: string,
  adminId: string,
  reviewNotes: string
) {
  try {
    const { error } = await supabase
      .from('escrow_release_queue')
      .update({
        status: 'needs_review',
        admin_decided_by: adminId,
        admin_notes: reviewNotes,
        admin_decision: 'On hold - Awaiting further review'
      })
      .eq('id', queueId);

    if (error) throw error;

    return {
      success: true,
      message: 'Escrow held for further review'
    };
  } catch (error) {
    console.error('Error holding escrow:', error);
    throw error;
  }
}

/**
 * Create dispute log entry
 */
export async function createDisputeLog(
  transactionId: string,
  initiatedBy: 'buyer' | 'seller',
  reason: string,
  category: string,
  claimText: string
) {
  try {
    const { data, error } = await supabase
      .from('dispute_evidence_log')
      .insert({
        transaction_id: transactionId,
        dispute_initiated_by: initiatedBy,
        dispute_reason: reason,
        dispute_category: category,
        buyer_claim_text: initiatedBy === 'buyer' ? claimText : null,
        seller_response_text: initiatedBy === 'seller' ? claimText : null,
        buyer_claim_submitted_at: initiatedBy === 'buyer' ? new Date().toISOString() : null,
        seller_response_submitted_at: initiatedBy === 'seller' ? new Date().toISOString() : null,
        resolution_status: 'open'
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      disputeId: data.id,
      message: 'Dispute logged. Awaiting admin resolution.'
    };
  } catch (error) {
    console.error('Error creating dispute log:', error);
    throw error;
  }
}

/**
 * Track platform fees and liability
 */
export async function trackPlatformLiability(
  transactionId: string,
  transactionAmount: number
) {
  try {
    const platformFeePercentage = 1.0; // 1%
    const platformFeeCollected = Math.floor(transactionAmount * (platformFeePercentage / 100));
    const liabilityCap = Math.max(platformFeeCollected, 1000);

    const { data, error } = await supabase
      .from('platform_liability_tracking')
      .insert({
        transaction_id: transactionId,
        transaction_amount: transactionAmount,
        platform_fee_percentage: platformFeePercentage,
        platform_fee_collected: platformFeeCollected,
        liability_cap_amount: liabilityCap
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      platformFee: platformFeeCollected,
      liabilityCap,
      message: 'Platform liability tracked'
    };
  } catch (error) {
    console.error('Error tracking platform liability:', error);
    throw error;
  }
}

/**
 * Get platform fee from transaction amount
 */
export function calculatePlatformFee(transactionAmount: number): number {
  return Math.floor(transactionAmount * 0.01); // 1% fee
}

/**
 * Get platform liability cap
 */
export function calculateLiabilityCap(platformFee: number): number {
  return Math.max(platformFee, 1000); // Cap = max of platform fee or ₹1000
}

/**
 * ADMIN DASHBOARD: Get all pending disputes
 */
export async function getPendingDisputes() {
  try {
    const { data, error } = await supabase
      .from('dispute_evidence_log')
      .select(`
        *,
        transactions(*),
        evidence_collection(*)
      `)
      .eq('resolution_status', 'open')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching disputes:', error);
    return [];
  }
}

/**
 * ADMIN DASHBOARD: Resolve dispute
 */
export async function resolveDispute(
  disputeId: string,
  resolutionType: 'refund_issued' | 'replacement_offered' | 'partial_refund' | 'no_refund_sustained' | 'mediation_agreed',
  resolutionAmount: number,
  resolutionNotes: string
) {
  try {
    const { error } = await supabase
      .from('dispute_evidence_log')
      .update({
        resolution_status: 'resolved',
        resolution_type: resolutionType,
        resolution_amount: resolutionAmount,
        resolution_notes: resolutionNotes,
        resolution_date: new Date().toISOString()
      })
      .eq('id', disputeId);

    if (error) throw error;

    return {
      success: true,
      message: 'Dispute resolved',
      resolutionType,
      resolutionAmount
    };
  } catch (error) {
    console.error('Error resolving dispute:', error);
    throw error;
  }
}
