import React from 'react';
import { User, Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  name: string;
  phone: string;
  email: string;
  bio: string;
  location: string;
  businessHours: string;
}

interface ProfilePersonalInfoProps {
  formData: FormData;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePersonalInfo: React.FC<ProfilePersonalInfoProps> = ({
  formData,
  isEditing,
  handleInputChange
}) => {
  return (
    <div className="bharose-card">
      <h3 className="font-medium mb-4">Personal Information</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <div className="flex items-center border rounded-md">
            <div className="px-3 py-2 text-muted-foreground">
              <User size={18} />
            </div>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="border-0"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex items-center border rounded-md">
            <div className="px-3 py-2 text-muted-foreground">
              <Phone size={18} />
            </div>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="border-0"
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
            />
          </div>
          {isEditing && (
            <p className="text-xs text-muted-foreground mt-1">
              This number will be used for contract searches and notifications
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="email">Email Address</Label>
          <div className="flex items-center border rounded-md">
            <div className="px-3 py-2 text-muted-foreground">
              <Mail size={18} />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="border-0"
              placeholder="Enter your email address"
            />
          </div>
          {isEditing && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
              <AlertCircle size={12} className="inline mr-1" />
              Changing email will require verification of the new address
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Tell others about yourself"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <div className="flex items-center border rounded-md">
            <div className="px-3 py-2 text-muted-foreground">
              <MapPin size={18} />
            </div>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="border-0"
              placeholder="Enter your city, state"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="businessHours">Business Hours</Label>
          <div className="flex items-center border rounded-md">
            <div className="px-3 py-2 text-muted-foreground">
              <Clock size={18} />
            </div>
            <Input
              id="businessHours"
              name="businessHours"
              value={formData.businessHours}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="border-0"
              placeholder="e.g., 9 AM - 6 PM"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <AlertCircle size={14} className="inline mr-1" />
              <strong>Privacy:</strong> Your phone number is used for secure contract communications and will only be visible to users you transact with.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePersonalInfo;