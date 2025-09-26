import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Star, ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface SavedParty {
  id: string;
  name: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  transactionCount?: number;
  lastTransaction?: string;
}

interface ModernSavedPartiesProps {
  userMode: 'Buyer' | 'Seller';
  parties: SavedParty[];
  onViewAll: () => void;
  onContactParty: (partyId: string) => void;
}

const ModernSavedParties: React.FC<ModernSavedPartiesProps> = ({
  userMode,
  parties,
  onViewAll,
  onContactParty
}) => {
  const isBuyer = userMode === 'Buyer';
  const title = isBuyer ? 'Saved Sellers' : 'Frequent Buyers';
  const emptyText = isBuyer ? 'No saved sellers yet' : 'No frequent buyers yet';
  const emptySubtext = isBuyer 
    ? 'Save trusted sellers for quick access to their products'
    : 'Your loyal customers will appear here automatically';

  // Mock data for demonstration
  const mockParties: SavedParty[] = parties.length > 0 ? parties : [
    {
      id: '1',
      name: 'Rajesh Electronics',
      phone: '+91 98765 43210',
      rating: 4.8,
      transactionCount: 12,
      lastTransaction: '2 days ago'
    },
    {
      id: '2', 
      name: 'Priya Fashion Store',
      phone: '+91 87654 32109',
      rating: 4.9,
      transactionCount: 8,
      lastTransaction: '1 week ago'
    },
    {
      id: '3',
      name: 'Kumar Enterprises', 
      phone: '+91 76543 21098',
      rating: 4.7,
      transactionCount: 5,
      lastTransaction: '3 days ago'
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (mockParties.length === 0) {
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        </div>
        
        <motion.div 
          className="bg-card rounded-2xl p-8 text-center border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            {isBuyer ? (
              <Heart className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Users className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          
          <h3 className="text-lg font-medium text-foreground mb-2">{emptyText}</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">{emptySubtext}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onViewAll}
          className="text-muted-foreground hover:text-foreground"
        >
          View All
        </Button>
      </div>
      
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="overflow-x-auto md:overflow-visible">
        <div className="flex gap-4 md:grid md:grid-cols-1 md:gap-3 min-w-max md:min-w-0">
          {mockParties.slice(0, 3).map((party, index) => (
            <motion.div
              key={party.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-72 md:w-full"
            >
              <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200 border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={party.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                        {getInitials(party.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {party.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {party.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{party.rating}</span>
                          </div>
                        )}
                        {party.transactionCount && (
                          <Badge variant="secondary" className="text-xs">
                            {party.transactionCount} deals
                          </Badge>
                        )}
                      </div>
                      {party.lastTransaction && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Last: {party.lastTransaction}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContactParty(party.id);
                      }}
                      className="p-2 h-8 w-8"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {mockParties.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-4"
        >
          <Button 
            variant="outline" 
            onClick={onViewAll}
            className="w-full"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            View All {title}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ModernSavedParties;