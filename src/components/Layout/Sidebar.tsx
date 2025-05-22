import React from 'react';
import CategoryManager from '../Category/CategoryManager';
import Statistics from '../Stats/Statistics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const Sidebar: React.FC = () => {
  return (
    <Tabs defaultValue="stats" className="w-full">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="stats" className="flex-1">Statistics</TabsTrigger>
        <TabsTrigger value="categories" className="flex-1">Categories</TabsTrigger>
      </TabsList>
      
      <TabsContent value="stats" className="mt-0">
        <Statistics />
      </TabsContent>
      
      <TabsContent value="categories" className="mt-0">
        <CategoryManager />
      </TabsContent>
    </Tabs>
  );
};

export default Sidebar;