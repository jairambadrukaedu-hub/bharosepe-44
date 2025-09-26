import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useUserRoles, UserRole } from '@/hooks/use-user-roles';
import { Shield, UserPlus, UserMinus, Search } from 'lucide-react';

interface UserWithRoles {
  id: string;
  email: string;
  full_name: string | null;
  roles: UserRole[];
}

export const AdminRoleManager: React.FC = () => {
  const { isAdmin } = useUserRoles();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');

  const fetchUsersWithRoles = async () => {
    try {
      setLoading(true);

      // Fetch users from profiles table (which has user_id from auth.users)
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        return;
      }

      // Fetch all user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        return;
      }

      // Combine data (note: we can't access auth.users directly, so we'll use available user_id)
      const userMap = new Map<string, UserWithRoles>();

      profiles?.forEach(profile => {
        userMap.set(profile.user_id, {
          id: profile.user_id,
          email: 'Email not accessible via client', // auth.users table is not accessible
          full_name: profile.full_name,
          roles: []
        });
      });

      roles?.forEach(role => {
        const user = userMap.get(role.user_id);
        if (user) {
          user.roles.push(role.role as UserRole);
        }
      });

      setUsers(Array.from(userMap.values()));
    } catch (error) {
      console.error('Error fetching users with roles:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const assignRole = async (userId: string, role: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: role
        });

      if (error) {
        console.error('Error assigning role:', error);
        toast.error('Failed to assign role');
        return;
      }

      toast.success(`Role "${role}" assigned successfully`);
      await fetchUsersWithRoles();
    } catch (error) {
      console.error('Error in assignRole:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const removeRole = async (userId: string, role: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) {
        console.error('Error removing role:', error);
        toast.error('Failed to remove role');
        return;
      }

      toast.success(`Role "${role}" removed successfully`);
      await fetchUsersWithRoles();
    } catch (error) {
      console.error('Error in removeRole:', error);
      toast.error('An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (isAdmin()) {
      fetchUsersWithRoles();
    }
  }, [isAdmin]);

  if (!isAdmin()) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <Shield className="mx-auto h-12 w-12 mb-4" />
            <p>Access denied. Admin privileges required.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchEmail.toLowerCase()) ||
    user.id.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          User Role Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or user ID..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Role Assignment */}
        <div className="flex gap-2">
          <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center text-muted-foreground">No users found</p>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{user.full_name || 'Unnamed User'}</h4>
                    <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {user.roles.length > 0 ? (
                        user.roles.map(role => (
                          <Badge key={role} variant="secondary" className="flex items-center gap-1">
                            {role}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => removeRole(user.id, role)}
                            >
                              <UserMinus className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline">No roles</Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => assignRole(user.id, selectedRole)}
                      disabled={user.roles.includes(selectedRole)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Add {selectedRole}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};