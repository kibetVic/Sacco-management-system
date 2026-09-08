import { DemoRequest } from '../types';

export interface EmailDispatchResult {
  success: boolean;
  messageId: string;
  recipient: string;
  subject: string;
  body: string;
  sentAt: string;
  mailtoUrl: string;
  whatsAppUrl: string;
}

export function sendDemoRequestEmail(request: Omit<DemoRequest, 'id' | 'submittedAt' | 'status'>): EmailDispatchResult {
  const recipient = 'kibetvic98@gmail.com';
  const subject = encodeURIComponent(`[SaccoMIS Live Demo Request] - ${request.organizationName}`);
  
  const bodyText = `Hello CompTech Solutions Engineering Team,

I would like to request a live demonstration and consultation for the SACCO Management System.

--- ORGANIZATION DETAILS ---
Organization / SACCO: ${request.organizationName}
Contact Person: ${request.contactPerson}
Email Address: ${request.email}
Phone / WhatsApp: ${request.phone}
Estimated Member Count: ${request.memberCount}

--- DEMO PREFERENCES ---
Preferred Demo Date: ${request.preferredDate}
Preferred Time Window: ${request.preferredTime}
Modules of Interest: ${request.modules.join(', ')}

--- SPECIFIC REQUIREMENTS / QUESTIONS ---
${request.message || 'We would like to see how blockchain verification, loan lifecycle tracking, and bulk M-Pesa contribution posting work for our cooperative.'}

Thank you,
${request.contactPerson}
${request.phone}`;

  const encodedBody = encodeURIComponent(bodyText);
  const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${encodedBody}`;

  const whatsAppText = encodeURIComponent(
    `Hello CompTech Solutions Team, I am ${request.contactPerson} from ${request.organizationName}. We would like to request a SaccoMIS Blockchain Demo. Modules: ${request.modules.join(', ')}. Contact: ${request.phone}`
  );
  const whatsAppUrl = `https://wa.me/254700276320?text=${whatsAppText}`;

  const messageId = `MSG-SACCO-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const sentAt = new Date().toISOString();

  // Try saving to local demo requests log
  try {
    const existing = JSON.parse(localStorage.getItem('easysacco_demo_requests') || '[]');
    existing.unshift({
      id: messageId,
      ...request,
      submittedAt: sentAt,
      status: 'Confirmed',
    });
    localStorage.setItem('easysacco_demo_requests', JSON.stringify(existing.slice(0, 20)));
  } catch {
    // ignore local storage errors
  }

  return {
    success: true,
    messageId,
    recipient,
    subject: `[SaccoMIS Live Demo Request] - ${request.organizationName}`,
    body: bodyText,
    sentAt,
    mailtoUrl,
    whatsAppUrl,
  };
}
