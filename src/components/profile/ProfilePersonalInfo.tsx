import React from 'react';
import { User, Phone, Mail, MapPin, Clock, AlertCircle, Building2, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  name: string;
  phone: string;
  email: string;
  bio: string;
  location: string;
  businessHours: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  panNumber?: string;
  gstNumber?: string;
  businessName?: string;
  businessType?: string;
}

interface ProfilePersonalInfoProps {
  formData: FormData;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange?: (name: string, value: string) => void;
}

const ProfilePersonalInfo: React.FC<ProfilePersonalInfoProps> = ({
  formData,
  isEditing,
  handleInputChange,
  handleSelectChange
}) => {
  const handleBusinessTypeChange = (value: string) => {
    if (handleSelectChange) {
      handleSelectChange('businessType', value);
    }
  };

  return (
    <div className="bharose-card space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
        
        {/* Basic Information */}
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
            {!isEditing && !formData.bio && (
              <p className="text-xs text-muted-foreground mt-1">Not provided</p>
            )}
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
        </div>
      </div>

      {/* Address Section */}
      <div className="pt-6 border-t">
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <MapPin size={20} className="mr-2" /> Address Details
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter your street address"
            />
            {!isEditing && !formData.address && (
              <p className="text-xs text-muted-foreground mt-1">Not provided</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter city"
              />
              {!isEditing && !formData.city && (
                <p className="text-xs text-muted-foreground mt-1">Not provided</p>
              )}
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter state"
              />
              {!isEditing && !formData.state && (
                <p className="text-xs text-muted-foreground mt-1">Not provided</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              name="pincode"
              value={formData.pincode || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter postal code (6 digits)"
              maxLength={6}
            />
            {!isEditing && !formData.pincode && (
              <p className="text-xs text-muted-foreground mt-1">Not provided</p>
            )}
          </div>
        </div>
      </div>

      {/* Tax & Business Section */}
      <div className="pt-6 border-t">
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <Building2 size={20} className="mr-2" /> Tax & Business Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter your business name (optional)"
            />
            {!isEditing && !formData.businessName && (
              <p className="text-xs text-muted-foreground mt-1">Not provided</p>
            )}
          </div>

          <div>
            <Label htmlFor="businessType">Business Type</Label>
            {isEditing ? (
              <Select value={formData.businessType || ''} onValueChange={handleBusinessTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="pvt_ltd">Pvt Ltd</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                disabled
                value={formData.businessType ? formData.businessType.charAt(0).toUpperCase() + formData.businessType.slice(1) : 'Not specified'}
                className="bg-gray-50"
              />
            )}
          </div>

          <div>
            <Label htmlFor="panNumber">PAN Number</Label>
            <Input
              id="panNumber"
              name="panNumber"
              value={formData.panNumber || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="e.g., ABCDE1234F (optional)"
              maxLength={10}
              className="uppercase"
            />
            {!isEditing && !formData.panNumber && (
              <p className="text-xs text-muted-foreground mt-1">Not provided</p>
            )}
            {isEditing && (
              <p className="text-xs text-muted-foreground mt-1">
                Format: 10 alphanumeric characters (e.g., ABCDE1234F)
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="gstNumber">GST Number</Label>
            <Input
              id="gstNumber"
              name="gstNumber"
              value={formData.gstNumber || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="e.g., 27AABCT1234A1Z0 (optional)"
              maxLength={15}
              className="uppercase"
            />
            {!isEditing && !formData.gstNumber && (
              <p className="text-xs text-muted-foreground mt-1">Not provided</p>
            )}
            {isEditing && (
              <p className="text-xs text-muted-foreground mt-1">
                Format: 15 alphanumeric characters
              </p>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 flex items-start">
            <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Privacy:</strong> Your information is used for secure contract communications and will only be visible to users you transact with. Address and tax details help verify your identity for contract generation.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePersonalInfo;