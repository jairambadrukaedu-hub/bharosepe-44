
import React, { useState, useEffect } from 'react';
import { Users, Phone, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactInfo } from '@/pages/TransactionSetup';
import { useAuth } from '@/hooks/use-auth';
import { useContactSearch } from '@/hooks/use-contact-search';

interface ContactSearchProps {
  selectedContact: ContactInfo | null;
  onContactSelect: (contact: ContactInfo) => void;
}

const ContactSearch: React.FC<ContactSearchProps> = ({
  selectedContact,
  onContactSelect
}) => {
  const { user } = useAuth();
  const { searchByPhone, contacts, loading } = useContactSearch();
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (phoneNumber.length >= 3) {
      searchByPhone(phoneNumber);
    }
  }, [phoneNumber]);

  const handleContactSelect = (contact: any) => {
    onContactSelect({
      id: contact.id,
      name: contact.full_name,
      phone: contact.phone
    });
  };

  if (selectedContact) {
    return (
      <div className="bharose-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-bharose-primary/10 rounded-full flex items-center justify-center mr-3">
              <Users className="h-6 w-6 text-bharose-primary" />
            </div>
            <div>
              <h3 className="font-medium">{selectedContact.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedContact.phone}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContactSelect(null)}
          >
            Change
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Search Registered Users</h3>
      
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter phone number to search"
          maxLength={10}
          className="bharose-input pl-10 pr-8"
        />
        {phoneNumber && (
          <button
            onClick={() => setPhoneNumber('')}
            className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center p-4">
          <div className="w-6 h-6 border-2 border-bharose-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {contacts.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-bharose-primary">Registered Users:</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {contacts.map(contact => (
              <div
                key={contact.id}
                onClick={() => handleContactSelect(contact)}
                className="p-3 border border-bharose-primary bg-bharose-primary/5 rounded-lg cursor-pointer hover:bg-bharose-primary/10 flex items-center"
              >
                <div className="w-10 h-10 bg-bharose-primary/20 rounded-full flex items-center justify-center mr-3">
                  <Phone className="h-4 w-4 text-bharose-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{contact.full_name}</p>
                  <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  <p className="text-xs text-bharose-primary">{contact.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {phoneNumber.length >= 3 && contacts.length === 0 && !loading && (
        <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
          <p className="text-sm text-yellow-800">
            No registered users found with this phone number. They need to sign up on Bharosepe first.
          </p>
        </div>
      )}

      {phoneNumber.length < 3 && (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600">
            Enter at least 3 digits to search for registered users.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactSearch;
